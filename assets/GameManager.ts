const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
	@property(cc.Node)
	startScreen: cc.Node = null;

	@property(cc.Node)
	gameScreen: cc.Node = null;

	@property(cc.Node)
	resultScreen: cc.Node = null;

	onLoad() {
		this.showStartScreen();
	}

	showStartScreen() {
		this.startScreen.active = true;
		this.gameScreen.active = false;
		this.resultScreen.active = false;
	}

	showGameScreen() {
		this.startScreen.active = false;
		this.gameScreen.active = true;
		this.resultScreen.active = false;
	}

	showResultScreen() {
		this.startScreen.active = false;
		this.gameScreen.active = false;
		this.resultScreen.active = true;
	}
}
