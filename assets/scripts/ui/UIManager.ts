import Screen from './Screen';

const { ccclass, property } = cc._decorator;

@ccclass
export default class UIManager extends cc.Component {
	@property(Screen) startScreen: Screen = null;
	@property(Screen) gameScreen: Screen = null;
	@property(Screen) resultScreen: Screen = null;

	showStart() {
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
