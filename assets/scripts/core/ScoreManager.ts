import StorageManager from './StorageManager';

export default class ScoreManager {
	public currentScore: number = 0;

	public addPoint(): void {
		this.currentScore++;
	}

	public reset(): void {
		this.currentScore = 0;
	}

	public saveIfRecord(): void {
		StorageManager.setBestScore(this.currentScore);
	}

	public getHighScore(): number {
		return StorageManager.getBestScore();
	}
}
