import Screen from './Screen';
import ScreenWithScore from './ScreenWithScore';
import StorageManager from './../core/StorageManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
	@property(ScreenWithScore) startScreen: ScreenWithScore = null;
	@property(Screen) gameScreen: Screen = null;
	@property(ScreenWithScore) resultScreen: ScreenWithScore = null;

	showStart() {
		const best = StorageManager.getBestScore();

		this.startScreen.setBestScoreToLabel(best);

		this.startScreen.show();
		this.gameScreen.hide();
		this.resultScreen.hide();
	}

	showGame() {
		this.startScreen.hide();
		this.gameScreen.show();
		this.resultScreen.hide();
	}

	showResult() {
		this.startScreen.hide();
		this.gameScreen.hide();
		this.resultScreen.show();
	}
}
