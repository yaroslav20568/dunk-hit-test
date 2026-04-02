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

	@property(cc.Float)
	rotationSpeed: number = 200;

	@property(cc.ParticleSystem)
	defaultParticles: cc.ParticleSystem = null;

	@property(cc.ParticleSystem)
	smokeParticles: cc.ParticleSystem = null;

	public hasTouchedHoop: boolean = false;

	update() {
		if (!this.body) return;

		const visibleWidth = cc.view.getVisibleSize().width;
		const halfWidth = visibleWidth / 2;
		const ballX = this.node.x;

		if (ballX > halfWidth) {
			this.node.x = -halfWidth;
		} else if (ballX < -halfWidth) {
			this.node.x = halfWidth;
		}

		this.body.syncPosition(true);
	}

	onBeginContact(
		contact: cc.PhysicsContact,
		selfCollider: cc.PhysicsCollider,
		otherCollider: cc.PhysicsCollider,
	) {
		if (otherCollider.node.name === 'HoopObj' && otherCollider.tag !== 1) {
			this.hasTouchedHoop = true;
		}
	}

	private get jumpCoeff(): number {
		const frame = cc.view.getFrameSize();
		const design = cc.view.getDesignResolutionSize();

		return frame.width / frame.height / (design.width / design.height);
	}

	public jump(currentSide: ESide) {
		if (!this.body) return;

		if (this.defaultParticles) {
			this.defaultParticles.resetSystem();
		}

		this.hasTouchedHoop = false;
		this.body.linearVelocity = cc.Vec2.ZERO;

		const coeff = this.jumpCoeff;
		const impulse = cc.v2(this.forwardForce * coeff * -currentSide, this.jumpForce * coeff);
		let worldCenter = this.body.getWorldCenter();

		this.body.angularVelocity = this.rotationSpeed * coeff * currentSide;
		this.body.applyLinearImpulse(impulse, worldCenter, true);
	}

	public resetPhysics(position: cc.Vec2 = cc.Vec2.ZERO) {
		const rb = this.getComponent(cc.RigidBody);

		if (!rb) return;

		rb.linearVelocity = cc.Vec2.ZERO;
		rb.angularVelocity = 0;

		this.node.setPosition(position);
		rb.syncPosition(true);
	}

	public setSmokeActive(active: boolean, isImmediate: boolean = false) {
		if (!this.smokeParticles) return;

		if (active) {
			this.smokeParticles.node.active = true;
			this.smokeParticles.resetSystem();
		} else {
			this.smokeParticles.stopSystem();

			if (isImmediate) {
				this.smokeParticles.node.active = false;
			}
		}
	}
}
