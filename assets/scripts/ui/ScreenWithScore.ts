import Screen from './Screen';

const { ccclass, property } = cc._decorator;

@ccclass
export default class ScreenWithScore extends Screen {
	@property(cc.Label)
	bestScoreLabel: cc.Label = null;

	setBestScoreToLabel(value: number) {
		if (this.bestScoreLabel) {
			this.bestScoreLabel.string = `Best ${value}`;
		}
	}
}
