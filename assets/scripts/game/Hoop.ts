import { ESide } from '../core/types/index';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Hoop extends cc.Component {
	@property(cc.Float)
	minY: number = 0;

	@property(cc.Float)
	maxY: number = 400;

	@property(cc.Node)
	netNode: cc.Node = null;

	private colliders: Array<cc.PhysicsBoxCollider> = [];
	private initialOffsets: Array<number> = [];

	onLoad() {
		this.colliders = this.getComponents(cc.PhysicsBoxCollider);
		this.initialOffsets = this.colliders.map((c) => c.offset.x);
	}

	public playGoalEffect() {
		if (!this.netNode) return;

		cc.tween(this.netNode)
			.delay(0.1)
			.to(0.1, { scaleX: 0.8, scaleY: 1.1 }, { easing: 'quadOut' })
			.to(0.2, { scaleX: 1.0, scaleY: 1.0 }, { easing: 'elasticOut' })
			.start();
	}

	public updatePosition(currentSide: ESide) {
		let widget = this.node.getComponent(cc.Widget);
		const rb = this.node.getComponent(cc.RigidBody);
		const randomY = this.minY + Math.random() * (this.maxY - this.minY);

		if (!widget) widget = this.node.addComponent(cc.Widget);

		this.node.y = randomY;

		if (currentSide === ESide.Left) {
			widget.isAlignRight = false;
			widget.isAlignLeft = true;
		} else {
			widget.isAlignLeft = false;
			widget.isAlignRight = true;
		}

		widget.updateAlignment();

		this.node.scaleX = -currentSide;

		this.colliders.forEach((collider, index) => {
			collider.offset = cc.v2(this.initialOffsets[index] * -currentSide, collider.offset.y);
			collider.apply();
		});

		rb?.syncPosition(true);
	}
}
