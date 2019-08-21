var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GObjPool = (function () {
    function GObjPool() {
    }
    Object.defineProperty(GObjPool, "getInstance", {
        get: function () {
            if (GObjPool._mInstance == undefined)
                GObjPool._mInstance = new GObjPool();
            return GObjPool._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GObjPool.prototype.Gadd2Pool = function (obj) {
        if (obj == undefined)
            return;
        var type = egret.getQualifiedClassName(obj);
        if (type.length == 0)
            return;
        var arr = this[type];
        if (arr == undefined) {
            arr = new Array();
            this[type] = arr;
        }
        if (GObjPool.mIsCheck) {
            var index = arr.indexOf(obj);
            if (index > -1) {
                egret.error("重复向对象池插入相同对象实例 类型:" + type);
                return;
            }
        }
        if (egret.is(obj, 'GIObjPool')) {
            obj.clean();
        }
        arr.push(obj);
    };
    GObjPool.prototype.GgetObj = function (obj) {
        if (obj == undefined)
            return null;
        var type = egret.getQualifiedClassName(obj);
        if (type.length == 0)
            return null;
        var arr = this[type];
        if (arr == undefined || arr.length <= 0)
            return null;
        return arr.pop();
    };
    /////////////////////////快速从对象池获取对象  如果对象池中没有该对象,则新建
    GObjPool.GgetMCObj = function () {
        var temp = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
        if (temp == null)
            temp = new MDisplay.MMovieClip();
        return temp;
    };
    GObjPool.GgetBmObj = function () {
        var temp = GObjPool.getInstance.GgetObj(egret.Bitmap);
        if (temp == null)
            temp = new egret.Bitmap();
        return temp;
    };
    GObjPool.GgetTimerTaskObj = function () {
        var temp = GObjPool.getInstance.GgetObj(MUtils.MTimerTask);
        if (temp == null)
            temp = new MUtils.MTimerTask();
        return temp;
    };
    GObjPool.mIsCheck = true;
    return GObjPool;
}());
__reflect(GObjPool.prototype, "GObjPool");
//# sourceMappingURL=GObjPool.js.map