import { ESide } from '../core/types/index';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Hoop extends cc.Component {
	@property(cc.Float)
	minY: number = 0;

	@property(cc.Float)
	maxY: number = 400;

	private colliders: Array<cc.PhysicsBoxCollider> = [];
	private initialOffsets: Array<number> = [];

	onLoad() {
		this.colliders = this.getComponents(cc.PhysicsBoxCollider);
		this.initialOffsets = this.colliders.map((c) => c.offset.x);
	}

	playGoalEffect() {
		cc.tween(this.node).to(0.2, { opacity: 0 }).delay(0.3).to(0.2, { opacity: 255 }).start();
	}

	updatePosition(currentSide: ESide) {
		const hoopHalfWidth = this.node.width / 2;
		const randomY = this.minY + Math.random() * (this.maxY - this.minY);
		const posX = (cc.winSize.width / 2 - hoopHalfWidth) * -currentSide;

		this.node.setPosition(posX, randomY);
		this.node.scaleX = currentSide;

		this.colliders.forEach((collider, index) => {
			collider.offset = cc.v2(this.initialOffsets[index] * currentSide, collider.offset.y);
			collider.apply();
		});
	}
}
