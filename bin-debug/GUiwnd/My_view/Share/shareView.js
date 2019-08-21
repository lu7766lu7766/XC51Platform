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
/**呼朋唤友分享图 */
var shareView = (function (_super) {
    __extends(shareView, _super);
    function shareView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        RES.getResByUrl("resource/assets/images/ui/img_share2.png", function (e) {
            _this._img.$setBitmapData(e);
        }, _this);
        _this._click = new egret.Bitmap();
        _this.addChild(_this._click);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_click.png", function (e) {
            _this._click.$setBitmapData(e);
            _this._click.x = GameMain.getInstance.StageWidth - _this._click.width;
        }, _this);
        _this._click.touchEnabled = true;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(shareView, "getInstance", {
        get: function () {
            if (shareView._mInstance == undefined)
                shareView._mInstance = new shareView();
            return shareView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    shareView.prototype.touchDown = function (e) {
        if (e.target == this._click) {
            this.hide();
        }
    };
    shareView.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
            ShareImg.getInstance.show();
            this._click.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    shareView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            ShareImg.getInstance.hide();
            this._click.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    /**适配处理 */
    shareView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x9F6942, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return shareView;
}(egret.DisplayObjectContainer));
__reflect(shareView.prototype, "shareView");
//# sourceMappingURL=shareView.js.map