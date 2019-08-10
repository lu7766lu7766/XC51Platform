var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var OffNet = (function (_super) {
    __extends(OffNet, _super);
    function OffNet() {
        var _this = _super.call(this) || this;
        _this.mBg = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/heise.png'));
        _this.mBg.alpha = 0.7;
        _this.addChildAt(_this.mBg, 0);
        return _this;
    }
    Object.defineProperty(OffNet, "getInstance", {
        get: function () {
            if (this.mInstance == undefined)
                this.mInstance = new OffNet();
            return this.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    OffNet.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
        }
        this.playLoading();
    };
    /**播放宝箱动画 */
    OffNet.prototype.playLoading = function () {
        if (this._mLoadingMC != undefined)
            return;
        this.cleanLoading1();
        this._mLoadingMC = GMovieMag.getInstance.GgetMovieClip('mcNetLoading', undefined, undefined, true);
        this._mLoadingMC.x = 270;
        this._mLoadingMC.y = 439;
        this.addChild(this._mLoadingMC);
    };
    /**清除laoding动画 */
    OffNet.prototype.cleanLoading1 = function () {
        if (this._mLoadingMC != undefined) {
            GObjPool.getInstance.Gadd2Pool(this._mLoadingMC);
            if (this._mLoadingMC.parent != undefined) {
                this._mLoadingMC.parent.removeChild(this._mLoadingMC);
            }
            delete this._mLoadingMC;
        }
    };
    OffNet.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this.cleanLoading1();
    };
    return OffNet;
}(MDisplay.MUISprite));
__reflect(OffNet.prototype, "OffNet");
//# sourceMappingURL=OffNet.js.map