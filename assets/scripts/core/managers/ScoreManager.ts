import StorageManager from './StorageManager';

export default class ScoreManager {
	private static _instance: ScoreManager = null;

	public static get instance(): ScoreManager {
		if (!this._instance) {
			this._instance = new ScoreManager();
		}

		return this._instance;
	}

	public currentScore: number = 0;

	public addPoint(): void {
		this.currentScore++;
	}

	public reset(): void {
		this.currentScore = 0;
	}

	public saveIfRecord(): void {
		const bestScore = StorageManager.getItem('best_score', 0);

		if (this.currentScore > bestScore) {
			StorageManager.setItem('best_score', this.currentScore);
		}
	}

	public getBestScore(): number {
		return StorageManager.getItem('best_score', 0);
	}
}
