var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 滑动组件优化 滑动组件 优化滚动列表较多情况下，可以手动设置显示条数
 */
var GSlideObj = (function () {
    function GSlideObj() {
        this._mDirection = 2;
    }
    /**
     * showMax 显示最大条数
     * space 当前条间隔
     * scroView 滑动对象
     * scroCon 滑动容器
     * gameList 数据列表(map数组 下表key 要从0开始)
     * thisObj(可传)
     * fun (可传 egret.Event.CHANGE事件)滑动时回调
     * direction = 2默认竖向(1横向 2竖向)
     *
     */
    GSlideObj.prototype.showDataByMap = function (showMax, space, scroView, scroCon, gameList, thisObj, fun, direction) {
        this._mShowMax = showMax;
        this._mSpace = space;
        this._mScroView = scroView;
        this._mScroCon = scroCon;
        this._mGameList = gameList;
        this._mThisObj = thisObj;
        this._mFun = fun;
        if (direction != undefined) {
            this._mDirection = direction;
        }
        this.onChange();
        this._mScroView.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    /**
     * showMax 显示最大条数
     * space 当前条间隔
     * scroView 滑动对象
     * scroCon 滑动容器
     * gameList 数据列表(Array 数组)
     * thisObj(可传)
     * fun (可传 egret.Event.CHANGE事件)滑动时回调
     * direction = 2默认竖向(1横向 2竖向)
     *
     */
    GSlideObj.prototype.showDataByArray = function (showMax, space, scroView, scroCon, gameList, thisObj, fun, direction) {
        this._mShowMax = showMax;
        this._mSpace = space;
        this._mScroView = scroView;
        this._mScroCon = scroCon;
        if (this._mGameList == undefined) {
            this._mGameList = new GHashMap();
        }
        for (var i = 0; i < gameList.length; i++) {
            this._mGameList.Gput(i, gameList[i]);
        }
        this._mThisObj = thisObj;
        this._mFun = fun;
        if (direction != undefined) {
            this._mDirection = direction;
        }
        this.onChange();
        this._mScroView.addEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    GSlideObj.prototype.onChange = function (event) {
        var obj;
        var top = Math.floor(this._mScroView.scrollTop / this._mSpace);
        var begin = top;
        var end = top + this._mShowMax;
        for (var i = 0; i < this._mGameList.size; i++) {
            if (this._mGameList.GhasKey(i) && (i < begin || i > end)) {
                obj = this._mGameList.Gget(i);
                if (obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
        for (var i = begin; i < end; i++) {
            if (this._mGameList.GhasKey(i)) {
                obj = this._mGameList.Gget(i);
                if (obj.parent == undefined)
                    this._mScroCon.addChild(obj);
            }
        }
        if (this._mDirection == 1) {
            var width = (top + this._mShowMax) * this._mSpace;
            this._mScroCon.width = (top + this._mShowMax) * this._mSpace;
            if (this._mScroCon.width > (this._mGameList.size * this._mSpace)) {
                width = this._mGameList.size * this._mSpace;
            }
            this._mScroCon.width = width;
        }
        else {
            var height = (top + this._mShowMax) * this._mSpace;
            this._mScroCon.height = (top + this._mShowMax) * this._mSpace;
            if (this._mScroCon.height > (this._mGameList.size * this._mSpace)) {
                height = this._mGameList.size * this._mSpace;
            }
            this._mScroCon.height = height;
        }
        if (this._mFun != undefined) {
            this._mFun.call(this._mThisObj, event);
        }
    };
    /**
     * 移除事件
     */
    GSlideObj.prototype.removeEven = function () {
        this._mScroView.removeEventListener(egret.Event.CHANGE, this.onChange, this);
    };
    return GSlideObj;
}());
__reflect(GSlideObj.prototype, "GSlideObj");
//# sourceMappingURL=GSlideObj.js.map