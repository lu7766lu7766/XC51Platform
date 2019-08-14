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
/**优惠券 */
var CouponWnd = (function (_super) {
    __extends(CouponWnd, _super);
    function CouponWnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(CouponWnd, "getInstance", {
        get: function () {
            if (CouponWnd._mInstance == undefined)
                CouponWnd._mInstance = new CouponWnd();
            return CouponWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    CouponWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
    };
    CouponWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    CouponWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    /**适配处理 */
    CouponWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 115);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    CouponWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    CouponWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return CouponWnd;
}(egret.DisplayObjectContainer));
__reflect(CouponWnd.prototype, "CouponWnd");
//# sourceMappingURL=CouponWnd.js.map