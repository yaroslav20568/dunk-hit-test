import UIManager from './ui/UIManager';
import Ball from './game/Ball';

const { ccclass, property } = cc._decorator;

@ccclass
export default class GameManager extends cc.Component {
	@property(UIManager)
	ui: UIManager = null;
	@property(Ball)
	ball: Ball = null;

	onLoad() {
		cc.director.getPhysicsManager().enabled = true;

		this.ui.showStart();
		this.node.on(cc.Node.EventType.TOUCH_START, this.onScreenTouch, this);
	}

	private onScreenTouch() {
		if (this.ui.startScreen.node.active) {
			this.startGame();
		}

		if (this.ui.gameScreen.node.active) {
			this.ball.jump();
		}
	}

	startGame() {
		this.ui.showGame();
	}

	endGame() {
		this.ui.showResult();
	}

	onDestroy() {
		this.node.off(cc.Node.EventType.TOUCH_START, this.onScreenTouch, this);
	}
}
