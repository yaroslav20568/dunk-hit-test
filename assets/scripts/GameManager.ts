import UIManager from './ui/UIManager';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
	@property(UIManager)
	ui: UIManager = null;

	onLoad() {
		this.ui.showStart();
		this.node.on(cc.Node.EventType.TOUCH_START, this.onNavigateToGameScreen, this);
	}

	private onNavigateToGameScreen() {
		if (this.ui.startScreen.node.active) {
			this.startGame();
		}
	}

	startGame() {
		this.ui.showGame();
	}

	endGame() {
		this.ui.showResult();
	}

	onDestroy() {
		this.node.off(cc.Node.EventType.TOUCH_START, this.onNavigateToGameScreen, this);
	}
}
