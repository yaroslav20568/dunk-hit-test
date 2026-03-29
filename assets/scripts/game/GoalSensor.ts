const { ccclass } = cc._decorator;

@ccclass
export default class GoalSensor extends cc.Component {
	onBeginContact(
		contact: cc.PhysicsContact,
		selfCollider: cc.PhysicsCollider,
		otherCollider: cc.PhysicsCollider,
	) {
		if (selfCollider.tag === 1) {
			const velocity = otherCollider.body.linearVelocity;

			if (velocity.y < 0) {
				this.node.dispatchEvent(new cc.Event.EventCustom('goal', true));
			}
		}
	}
}
