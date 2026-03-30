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

	private scoreManager: ScoreManager = new ScoreManager();

	showStart() {
		const bestScore = this.scoreManager.getHighScore();

		this.startScreen.setBestScoreToLabel(bestScore);

		this.startScreen.show();
		this.gameScreen.hide();
		this.resultScreen.hide();
	}

	showGame() {
		this.startScreen.hide();
		this.gameScreen.show();
		this.resultScreen.hide();
	}

	showResult(currentScore: number) {
		const bestScore = this.scoreManager.getHighScore();

		this.resultScreen.setBestScoreToLabel(bestScore);
		this.resultScreen.setCurrentScoreToLabel(currentScore);

		this.startScreen.hide();
		this.gameScreen.hide();
		this.resultScreen.show();
	}

	updateScoreUI(count: number) {
		if (this.scoreLabel) {
			this.scoreLabel.string = count.toString();
		}
	}

	updateTimerUI(progress: number, isCritical: boolean) {
		if (!this.timerBar) return;

		this.timerBar.fillRange = progress;
		this.timerBar.node.color = isCritical
			? cc.Color.fromHEX(new cc.Color(), '#FF1493')
			: cc.Color.fromHEX(new cc.Color(), '#00FFFF');
	}
}
