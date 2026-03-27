export default class StorageManager {
	private static readonly BEST_SCORE_KEY = 'best_score';

	public static setBestScore(score: number): void {
		cc.sys.localStorage.setItem(this.BEST_SCORE_KEY, score.toString());
	}

	public static getBestScore(): number {
		const score: string | null = cc.sys.localStorage.getItem(this.BEST_SCORE_KEY);

		return score ? parseInt(score) : 0;
	}
}
