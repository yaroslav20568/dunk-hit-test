const { ccclass } = cc._decorator;

@ccclass
export default class Screen extends cc.Component {
	public show() {
		this.node.active = true;
	}

	public hide() {
		this.node.active = false;
	}
}
