const { ccclass, property } = cc._decorator;

@ccclass
export default class SoundManager extends cc.Component {
	@property([cc.AudioSource])
	sources: Array<cc.AudioSource> = [];

	onLoad() {
		this.scheduleOnce(() => {
			this.sources.forEach((source) => {
				if (source) {
					source.stop();
					source.volume = 1;
				}
			});
		}, 0.1);
	}

	public play(name: string) {
		const source = this.sources.find((s) => s.node.name === name);

		if (source) {
			if (source.isPlaying) {
				source.stop();
			}

			source.play();
		}
	}
}
