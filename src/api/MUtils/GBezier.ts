/**贝塞尔曲线计算 */
class GBezier implements GIObjPool {
	public static getBezier(): GBezier {
		let obj: GBezier = GObjPool.getInstance.GgetObj(GBezier);
		if (obj == null)
			obj = new GBezier();
		return obj;
	}
	private _point: egret.Point;
	private _point0: egret.Point;
	private _point1: egret.Point;
	private _point2: egret.Point;
	private _callFun: Function;

	public constructor() {
		this._point = new egret.Point();
	}
	/**
	 * 曲线激活
	 * @param p0 开始点坐标
	 * @param p1 中间点坐标
	 * @param p2 结束点坐标
	 * @param time 过程时间
	 * @param callFun 执行回调
	 * @param thisObj
	 */
	public tween(p0: egret.Point, p1: egret.Point, p2: egret.Point, time: number, callFun: Function, thisObj?: any): void {
		this._point0 = p0;
		this._point1 = p1;
		this._point2 = p2;
		this._callFun = callFun;
		this.factor = 0;
		egret.Tween.get(this).to({ factor: 1 }, time).call(function (): void {
			GObjPool.getInstance.Gadd2Pool(this);
		});
	}

	private set factor(value: number) {
		this._point.x = (1 - value) * (1 - value) * this._point0.x + 2 * value * (1 - value) * this._point1.x + value * value * this._point2.x;
		this._point.y = (1 - value) * (1 - value) * this._point0.y + 2 * value * (1 - value) * this._point2.y + value * value * this._point2.y;
		this._callFun.call(this._point);
	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._callFun = null;
	}
}