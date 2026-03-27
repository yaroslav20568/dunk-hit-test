const { ccclass } = cc._decorator;

@ccclass
export default class Screen extends cc.Component {
	show() {
		this.node.active = true;
	}

	hide() {
		this.node.active = false;
	}
}
