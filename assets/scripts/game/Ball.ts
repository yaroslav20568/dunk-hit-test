const { ccclass, property } = cc._decorator;

@ccclass
export default class Ball extends cc.Component {
	@property(cc.RigidBody)
	body: cc.RigidBody = null;

	@property(cc.Float)
	jumpForce: number = 2500;

	@property(cc.Float)
	forwardForce: number = -400;

	jump() {
		if (this.body) {
			this.body.linearVelocity = cc.v2(0, 0);

			let impulse = cc.v2(this.forwardForce, this.jumpForce);
			let worldCenter = this.body.getWorldCenter();

			this.body.applyLinearImpulse(impulse, worldCenter, true);
		}
	}
}
