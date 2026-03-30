import Screen from './Screen';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScreenWithScore extends Screen {
	@property(cc.Label)
	currentScoreLabel: cc.Label = null;

	@property(cc.Label)
	bestScoreLabel: cc.Label = null;

	public setCurrentScoreToLabel(value: number) {
		if (this.currentScoreLabel) {
			this.currentScoreLabel.string = value.toString();
		}
	}

	public setBestScoreToLabel(value: number) {
		if (this.bestScoreLabel) {
			this.bestScoreLabel.string = `Best ${value}`;
		}
	}
}
