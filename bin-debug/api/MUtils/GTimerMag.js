var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GTimerMag = (function () {
    function GTimerMag() {
        this._mLastTime = egret.getTimer();
        this._mTaskMap = new GHashMap();
    }
    Object.defineProperty(GTimerMag, "getInstance", {
        get: function () {
            if (GTimerMag._mInstance == undefined)
                GTimerMag._mInstance = new GTimerMag;
            return GTimerMag._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GTimerMag.prototype.addTimerTask = function (name, total, delayed, callFun, thisObj) {
        var temp = GObjPool.GgetTimerTaskObj();
        temp.Minit(name, total, delayed, callFun, thisObj);
        this._mTaskMap.Gput(name, temp);
    };
    GTimerMag.prototype.GremoveTimerTask = function (name) {
        var temp = this._mTaskMap.GremoveByKey(name);
        if (temp != undefined)
            GObjPool.getInstance.Gadd2Pool(temp);
    };
    GTimerMag.prototype.update = function () {
        this._mCurrTime = egret.getTimer();
        var it = this._mCurrTime - this._mLastTime;
        var keys = this._mTaskMap.keys;
        for (var i = keys.length - 1; i >= 0; i--) {
            var temp = this._mTaskMap.Gget(keys[i]);
            if (temp != undefined)
                temp.Mupdate(it);
        }
        this._mLastTime = this._mCurrTime;
        return it;
    };
    GTimerMag.prototype.getCurrTime = function () {
        return this._mCurrTime;
    };
    return GTimerMag;
}());
__reflect(GTimerMag.prototype, "GTimerMag");
//# sourceMappingURL=GTimerMag.js.map