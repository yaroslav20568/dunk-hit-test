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

		if (!canvas) return;

		const frameSize = cc.view.getFrameSize();
		const deviceRatio = frameSize.width / frameSize.height;
		const designRatio = canvas.designResolution.width / canvas.designResolution.height;

		const boundaries = cc.director.getScene().getComponentsInChildren(BoundaryAdapter);

		const isWide = deviceRatio > designRatio;

		canvas.fitHeight = isWide;
		canvas.fitWidth = !isWide;
		cc.director.getScene().walk(
			(node) => node.getComponent(cc.Widget)?.updateAlignment(),
			() => {},
		);

		boundaries.forEach((b) => b.updateCollider());

		this.ball?.resetPhysics();
	}
}
