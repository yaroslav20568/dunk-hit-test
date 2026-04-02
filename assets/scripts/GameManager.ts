import UIManager from './ui/UIManager';
import Ball from './game/Ball';
import Hoop from './game/Hoop';
import { ESide } from './core/types/index';
import Timer from './game/Timer';
import ScoreManager from './core/managers/ScoreManager';
import SoundManager from './core/managers/SoundManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
	@property(UIManager)
	ui: UIManager = null;

	@property(Ball)
	ball: Ball = null;

	@property(Hoop)
	hoop: Hoop = null;

	@property(SoundManager)
	soundManager: SoundManager = null;

	private currentSide: ESide = ESide.Right;
	private timer: Timer = new Timer();
	private scoreManager = ScoreManager.instance;

	onLoad() {
		cc.director.getPhysicsManager().enabled = true;
		this.ui.showStart();

		this.hoop.node.on('goal', this.handleGoal, this);
		this.node.on(cc.Node.EventType.TOUCH_START, this.onScreenTouch, this);
	}

	update(dt: number) {
		if (!this.timer.isActive) return;

		this.timer.update(dt);
		this.ui.updateTimerUI(this.timer.progress, this.timer.isCritical());

		if (this.timer.timeLeft <= 0) {
			this.endGame();
		}
	}

	onDestroy() {
		this.hoop.node.off('goal', this.handleGoal, this);
		this.node.off(cc.Node.EventType.TOUCH_START, this.onScreenTouch, this);
	}

	private onScreenTouch() {
		if (this.ui.startScreen.node.active) {
			this.startGame();
		} else if (this.ui.gameScreen.node.active) {
			this.ball.jump(this.currentSide);
		}
	}

	private handleGoal() {
		const isPerfect = !this.ball.hasTouchedHoop;
		const isHardModeActive = this.scoreManager.currentScore >= 0;

		this.soundManager.play(isPerfect ? 'LoudApplauseAudio' : 'QuietApplauseAudio');

		if (isPerfect) {
			this.scoreManager.perfectStreak++;
		} else {
			this.scoreManager.perfectStreak = 0;
		}

		if (this.scoreManager.perfectStreak >= 1 && isHardModeActive) {
			this.ball.setSmokeActive(true);
		} else if (!isPerfect) {
			this.ball.setSmokeActive(false);
		}

		this.hoop.playGoalEffect();
		this.scoreManager.addPoint(isPerfect ? 2 : 1);
		this.ui.updateScoreUI(this.scoreManager.currentScore);

		if (this.scoreManager.currentScore === 1) {
			this.timer.isActive = true;
		}

		this.timer.reset();

		this.currentSide = this.currentSide === ESide.Left ? ESide.Right : ESide.Left;

		this.scheduleOnce(() => {
			if (isHardModeActive) {
				this.hoop.setMoving(true);
			}

			this.hoop.updatePosition(this.currentSide);
			this.hoop.getComponent(cc.RigidBody).syncPosition(true);
		}, 0.5);
	}

	private startGame() {
		this.scoreManager.reset();
		this.timer.stop();
		this.timer.timeLeft = 5;
		this.ball.resetPhysics();
		this.ball.setSmokeActive(false);

		this.ui.updateScoreUI(0);
		this.ui.updateTimerUI(1, false);
		this.ui.showGame();

		this.hoop.updatePosition(this.currentSide);
		this.hoop.getComponent(cc.RigidBody).syncPosition(true);
	}

	private showStartScreenWithRecord() {
		this.ball.resetPhysics();

		this.ui.showStart();
	}

	private endGame() {
		this.timer.stop();
		this.scoreManager.saveIfRecord();
		this.hoop.setMoving(false);

		this.ui.showResult(this.scoreManager.currentScore);
	}

	public onTryAgainBtnClick() {
		this.showStartScreenWithRecord();
	}
}
