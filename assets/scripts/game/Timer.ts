export default class Timer {
	public timeLeft: number = 5;
	public isActive: boolean = false;

	private readonly maxTime: number = 5;
	private readonly criticalTime: number = 1.5;

	public update(dt: number): void {
		if (!this.isActive) return;

		this.timeLeft -= dt;

		if (this.timeLeft < 0) {
			this.timeLeft = 0;
		}
	}

	public reset(): void {
		this.timeLeft = this.maxTime;
		this.isActive = true;
	}

	public stop(): void {
		this.isActive = false;
	}

	public isCritical(): boolean {
		return this.timeLeft <= this.criticalTime;
	}

	public get progress(): number {
		return Math.max(0, this.timeLeft / this.maxTime);
	}
}
