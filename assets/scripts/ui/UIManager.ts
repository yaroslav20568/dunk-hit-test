import Screen from './Screen';
import ScreenWithScore from './ScreenWithScore';
import ScoreManager from '../core/managers/ScoreManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
	@property(ScreenWithScore)
	startScreen: ScreenWithScore = null;

	@property(Screen)
	gameScreen: Screen = null;

	@property(ScreenWithScore)
	resultScreen: ScreenWithScore = null;

	@property(cc.Sprite)
	timerBar: cc.Sprite = null;

	@property(cc.Label)
	scoreLabel: cc.Label = null;

	private scoreManager = ScoreManager.instance;
	private timerTween: cc.Tween = null;
	private lastCriticalState: boolean = false;

	public showStart() {
		const bestScore = this.scoreManager.getBestScore();

		this.startScreen.setBestScoreToLabel(bestScore);

		this.startScreen.show();
		this.gameScreen.hide();
		this.resultScreen.hide();

		this.stopTimerAnimation();
	}

	public showGame() {
		this.startScreen.hide();
		this.gameScreen.show();
		this.resultScreen.hide();
	}

	public showResult(currentScore: number) {
		this.stopTimerAnimation();

		const bestScore = this.scoreManager.getBestScore();

		this.resultScreen.setBestScoreToLabel(bestScore);
		this.resultScreen.setCurrentScoreToLabel(currentScore);

		this.startScreen.hide();
		this.gameScreen.hide();
		this.resultScreen.show();
	}

	public updateScoreUI(count: number) {
		const bestScore = this.scoreManager.getBestScore();
		const displayBestScore = Math.max(count, bestScore);

		if (this.scoreLabel) {
			this.scoreLabel.string = `Current: ${count} / Best: ${displayBestScore}`;
		}
	}

	public updateTimerUI(progress: number, isCritical: boolean) {
		if (!this.timerBar) return;

		this.timerBar.fillRange = progress;

		if (isCritical === this.lastCriticalState) return;

		this.lastCriticalState = isCritical;

		if (isCritical) {
			this.timerBar.node.color = cc.Color.fromHEX(new cc.Color(), '#FF1493');

			if (!this.timerTween) {
				this.timerTween = cc
					.tween(this.timerBar.node.parent)
					.to(0.15, { scale: 0.95 })
					.to(0.15, { scale: 1.0 })
					.union()
					.repeatForever()
					.start();
			}
		} else {
			this.stopTimerAnimation();
		}
	}

	private stopTimerAnimation() {
		if (this.timerTween) {
			this.timerTween.stop();
			this.timerTween = null;
		}

		if (this.timerBar) {
			const containerNode = this.timerBar.node.parent;

			containerNode.scale = 1.0;
			this.timerBar.node.color = cc.Color.fromHEX(new cc.Color(), '#00FFFF');
		}

		this.lastCriticalState = false;
	}
}
