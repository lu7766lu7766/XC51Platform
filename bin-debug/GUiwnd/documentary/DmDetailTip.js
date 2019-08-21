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
var DmDetailTip = (function (_super) {
    __extends(DmDetailTip, _super);
    function DmDetailTip() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var btn = new egret.Bitmap();
        _this.addChild(btn);
        btn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/qyts_expert@2x.png", function (e) {
            btn.$setBitmapData(e);
            btn.x = (GameMain.getInstance.StageWidth - btn.width) * 0.5;
            btn.y = (GameMain.getInstance.StageHeight - btn.height) * 0.5;
        }, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(DmDetailTip, "getInstance", {
        get: function () {
            if (DmDetailTip._mInstance == undefined)
                DmDetailTip._mInstance = new DmDetailTip();
            return DmDetailTip._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DmDetailTip.prototype.touchDown = function (e) {
        if (e.target == this._mShareC) {
            this.hide();
        }
    };
    DmDetailTip.prototype.show = function () {
        GUIManager.getInstance.mostLay.addChild(this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    DmDetailTip.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    /**适配处理 */
    DmDetailTip.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return DmDetailTip;
}(egret.DisplayObjectContainer));
__reflect(DmDetailTip.prototype, "DmDetailTip");
//# sourceMappingURL=DmDetailTip.js.map