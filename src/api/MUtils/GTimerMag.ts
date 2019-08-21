class GTimerMag {
	private static _mInstance: GTimerMag;
	public static get getInstance(): GTimerMag {
		if (GTimerMag._mInstance == undefined)
			GTimerMag._mInstance = new GTimerMag;
		return GTimerMag._mInstance;
	}

	private _mTaskMap: GHashMap<MUtils.MTimerTask>;
	private _mLastTime: number;
	private _mCurrTime: number;
	private constructor() {
		this._mLastTime = egret.getTimer();
		this._mTaskMap = new GHashMap<MUtils.MTimerTask>();
	}

	public addTimerTask(name: string, total: number, delayed: number, callFun: Function, thisObj: any): void {
		let temp: MUtils.MTimerTask = GObjPool.GgetTimerTaskObj();
		temp.Minit(name, total, delayed, callFun, thisObj);
		this._mTaskMap.Gput(name, temp);
	}

	public GremoveTimerTask(name: string): void {
		let temp: MUtils.MTimerTask = this._mTaskMap.GremoveByKey(name);
		if (temp != undefined)
			GObjPool.getInstance.Gadd2Pool(temp);
	}

	public update(): number {
		this._mCurrTime = egret.getTimer();
		let it = this._mCurrTime - this._mLastTime;
		let keys: Array<any> = this._mTaskMap.keys;
		for (let i = keys.length - 1; i >= 0; i--) {
			let temp: MUtils.MTimerTask = this._mTaskMap.Gget(keys[i]);
			if(temp != undefined)
				temp.Mupdate(it);
		}
		this._mLastTime = this._mCurrTime;
		return it;
	}

	public getCurrTime(): number {
		return this._mCurrTime;
	}
}