var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**贝塞尔曲线计算 */
var GBezier = (function () {
    function GBezier() {
        this._point = new egret.Point();
    }
    GBezier.getBezier = function () {
        var obj = GObjPool.getInstance.GgetObj(GBezier);
        if (obj == null)
            obj = new GBezier();
        return obj;
    };
    /**
     * 曲线激活
     * @param p0 开始点坐标
     * @param p1 中间点坐标
     * @param p2 结束点坐标
     * @param time 过程时间
     * @param callFun 执行回调
     * @param thisObj
     */
    GBezier.prototype.tween = function (p0, p1, p2, time, callFun, thisObj) {
        this._point0 = p0;
        this._point1 = p1;
        this._point2 = p2;
        this._callFun = callFun;
        this.factor = 0;
        egret.Tween.get(this).to({ factor: 1 }, time).call(function () {
            GObjPool.getInstance.Gadd2Pool(this);
        });
    };
    Object.defineProperty(GBezier.prototype, "factor", {
        set: function (value) {
            this._point.x = (1 - value) * (1 - value) * this._point0.x + 2 * value * (1 - value) * this._point1.x + value * value * this._point2.x;
            this._point.y = (1 - value) * (1 - value) * this._point0.y + 2 * value * (1 - value) * this._point2.y + value * value * this._point2.y;
            this._callFun.call(this._point);
        },
        enumerable: true,
        configurable: true
    });
    GBezier.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._callFun = null;
    };
    return GBezier;
}());
__reflect(GBezier.prototype, "GBezier", ["GIObjPool"]);
//# sourceMappingURL=GBezier.js.map