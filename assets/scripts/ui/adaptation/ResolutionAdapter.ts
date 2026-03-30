import BoundaryAdapter from './BoundaryAdapter';
import Ball from '../../game/Ball';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResolutionAdapter extends cc.Component {
	@property(Ball)
	ball: Ball = null;

	start() {
		this.adapt();
		cc.view.setResizeCallback(() => this.adapt());
	}

	private adapt() {
		let canvas = this.node.getComponent(cc.Canvas);
		let frameSize = cc.view.getFrameSize();
		let deviceRatio = frameSize.width / frameSize.height;
		let designRatio = canvas.designResolution.width / canvas.designResolution.height;

		const boundaries = cc.director.getScene().getComponentsInChildren(BoundaryAdapter);

		if (deviceRatio > designRatio) {
			canvas.fitHeight = true;
			canvas.fitWidth = false;
		} else {
			canvas.fitHeight = false;
			canvas.fitWidth = true;
		}

		cc.director.getScene().walk(
			(node) => {
				let widget = node.getComponent(cc.Widget);

				if (widget) {
					widget.updateAlignment();
				}
			},
			() => {},
		);

		boundaries.forEach((b) => b.updateCollider());

		if (this.ball) {
			this.ball.resetPhysics();
		}
	}
}
