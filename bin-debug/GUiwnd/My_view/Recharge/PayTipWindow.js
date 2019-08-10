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
var PayTipWindow = (function (_super) {
    __extends(PayTipWindow, _super);
    function PayTipWindow() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        var shape = new egret.Shape();
        _this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0, 0, 600, 340, 33);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        _this._title = ToolMrg.getText(0, 37, 36, 0x333333, 600);
        _this._mContain.addChild(_this._title);
        _this._title.bold = true;
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = "充值提示";
        _this._title.lineSpacing = 10;
        _this._content = ToolMrg.getText(50, 100, 28, 0x333333, 500);
        _this._mContain.addChild(_this._content);
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        _this._content.lineSpacing = 10;
        _this._content.text = "若您已完成支付流程并扣款成功，有可能存在延迟到账的情况，您可查看账户明细或联系客服。";
        _this._leftBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) {
            _this._leftBtn.$setBitmapData(e);
            _this._leftBtn.x = 14;
            _this._leftBtn.y = 224;
        }, _this);
        _this._leftBtn.touchEnabled = true;
        _this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        _this._rightBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) {
            _this._rightBtn.$setBitmapData(e);
            _this._rightBtn.x = 312;
            _this._rightBtn.y = 224;
        }, _this);
        _this._rightBtn.touchEnabled = true;
        _this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        var leftText = ToolMrg.getText(14, 250, 32, 0x333333, 276);
        _this._mContain.addChild(leftText);
        // leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        // leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "支付遇到问题";
        var rightText = ToolMrg.getText(312, 250, 32, 0xffffff, 276);
        _this._mContain.addChild(rightText);
        // rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        // rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "已完成支付";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(PayTipWindow, "getInstance", {
        get: function () {
            if (PayTipWindow._mInstance == undefined)
                PayTipWindow._mInstance = new PayTipWindow();
            return PayTipWindow._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    PayTipWindow.prototype.touchDown = function (e) {
        if (e.target == this._rightBtn) {
            RechargeWnd.getInstance.hide();
        }
        else if (e.target == this._leftBtn) {
            KeFuWnd.getInstance.show();
        }
        this.hide();
    };
    /**充值提示 hide会请求刷新一次数据 */
    PayTipWindow.prototype.show = function () {
        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    };
    PayTipWindow.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            UserInfoPhp.getInstance.sendHttp();
        }
    };
    /**适配处理 */
    PayTipWindow.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        // this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return PayTipWindow;
}(egret.DisplayObjectContainer));
__reflect(PayTipWindow.prototype, "PayTipWindow");
//# sourceMappingURL=PayTipWindow.js.map