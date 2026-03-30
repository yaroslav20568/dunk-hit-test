const { ccclass } = cc._decorator;

@ccclass
export default class BoundaryAdapter extends cc.Component {
	public updateCollider() {
		const collider = this.getComponent(cc.PhysicsBoxCollider);

		if (collider) {
			collider.size.width = this.node.width;

			collider.apply();
		}
	}
}
