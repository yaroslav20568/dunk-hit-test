import { ESide } from '../core/types/index';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Hoop extends cc.Component {
	@property(cc.Float)
	minY: number = 0;

	@property(cc.Float)
	maxY: number = 400;

	onBeginContact(contact, selfCollider, otherCollider) {
		if (selfCollider.tag === 1) {
		}
	}

	updatePosition(currentSide: ESide) {
		const hoopHalfWidth = this.node.width / 2;
		const randomY = this.minY + Math.random() * (this.maxY - this.minY);
		const posX = (cc.winSize.width / 2 - hoopHalfWidth) * -currentSide;

		this.node.setPosition(posX, randomY);
		this.node.scaleX = currentSide;
	}
}
