export default class StorageManager {
	private static readonly prefix = '@';

	public static setItem<T>(key: string, value: T): void {
		const data = typeof value === 'string' ? value : JSON.stringify(value);
		cc.sys.localStorage.setItem(this.prefix + key, data);
	}

	public static getItem<T>(key: string, defaultValue: T): T {
		const data = cc.sys.localStorage.getItem(this.prefix + key);

		if (data === null) {
			return defaultValue;
		}

		try {
			return JSON.parse(data) as T;
		} catch (e) {
			return data as unknown as T;
		}
	}
}
