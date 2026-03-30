import { ESide } from '../core/types/index';

const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
	@property(cc.RigidBody)
	body: cc.RigidBody = null;

	@property(cc.Float)
	jumpForce: number = 4000;

	@property(cc.Float)
	forwardForce: number = -1000;

	private get jumpCoeff(): number {
		const frame = cc.view.getFrameSize();
		const design = cc.view.getDesignResolutionSize();

		return frame.width / frame.height / (design.width / design.height);
	}

	public jump(currentSide: ESide) {
		if (this.body) {
			this.body.linearVelocity = cc.v2(0, 0);

			const coeff = this.jumpCoeff;
			const impulse = cc.v2(this.forwardForce * coeff * currentSide, this.jumpForce * coeff);
			let worldCenter = this.body.getWorldCenter();

			this.body.applyLinearImpulse(impulse, worldCenter, true);
		}
	}

	public resetPhysics(position: cc.Vec2 = cc.v2(0, 0)) {
		const rb = this.getComponent(cc.RigidBody);

		if (rb) {
			rb.linearVelocity = cc.v2(0, 0);
			rb.angularVelocity = 0;

			this.node.setPosition(position);

			rb.syncPosition(true);
		}
	}
}
