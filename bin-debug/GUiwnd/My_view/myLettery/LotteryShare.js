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
var LotteryShare = (function (_super) {
    __extends(LotteryShare, _super);
    function LotteryShare() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_fullsize_anim.png", function (e) {
            _this._img.$setBitmapData(e);
        }, _this);
        _this._click = new egret.Bitmap();
        _this.addChild(_this._click);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_click.png", function (e) {
            _this._click.$setBitmapData(e);
            _this._click.x = GameMain.getInstance.StageWidth - _this._click.width;
        }, _this);
        _this._click.touchEnabled = true;
        _this._tx = new egret.Bitmap();
        _this.addChild(_this._tx);
        _this._tx.width = 144;
        _this._tx.height = 144;
        _this._tx.y = 257;
        _this._name = ToolMrg.getText(0, 420, 30, 0xb8b8b8, GameMain.getInstance.StageWidth);
        _this.addChild(_this._name);
        _this._name.textAlign = egret.HorizontalAlign.CENTER;
        _this._rateText = ToolMrg.getText(0, 71 + 395, 24, 0xff1a06, GameMain.getInstance.StageWidth);
        _this.addChild(_this._rateText);
        _this._rateText.textAlign = egret.HorizontalAlign.CENTER;
        _this._rateText.text = "7日命中率";
        _this._rate = ToolMrg.getText(0, 116 + 393, 90, 0xff1a06, GameMain.getInstance.StageWidth);
        _this.addChild(_this._rate);
        _this._rate.textAlign = egret.HorizontalAlign.CENTER;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(LotteryShare, "getInstance", {
        get: function () {
            if (LotteryShare._mInstance == undefined)
                LotteryShare._mInstance = new LotteryShare();
            return LotteryShare._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    LotteryShare.prototype.touchDown = function (e) {
        if (e.target == this._click) {
            this.hide();
        }
    };
    LotteryShare.prototype.addEvent = function () {
        this._click.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    LotteryShare.prototype.removeEvent = function () {
        this._click.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**传入命中率 */
    LotteryShare.prototype.show = function (num) {
        var _this = this;
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
            CodeWndphoto.getInstance.show();
            GetShare.getInstance.sendHttp(UserData.getInstance.userId);
            this.addEvent();
            this._name.text = "" + ToolMrg.nameMode2(10, UserData.getInstance.userName);
            this._rate.text = num + "%";
            RES.getResByUrl("resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png", function (e) {
                _this._tx.$setBitmapData(e);
                _this._tx.x = (GameMain.getInstance.StageWidth - _this._tx.width) * 0.5;
            }, this);
        }
    };
    LotteryShare.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            CodeWndphoto.getInstance.hide();
            this.removeEvent();
        }
    };
    /**适配处理 */
    LotteryShare.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xC72559, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return LotteryShare;
}(egret.DisplayObjectContainer));
__reflect(LotteryShare.prototype, "LotteryShare");
//# sourceMappingURL=LotteryShare.js.map