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
/**足球头部 底部则重新构写单独控制 */
var SPFbWnd = (function (_super) {
    __extends(SPFbWnd, _super);
    function SPFbWnd() {
        var _this = _super.call(this) || this;
        /**页面下标 0串关 1单关 */
        _this._index = 0;
        _this._mFirst = true;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._topContain = new egret.DisplayObjectContainer();
        _this.addTop();
        return _this;
    }
    Object.defineProperty(SPFbWnd, "getInstance", {
        get: function () {
            if (SPFbWnd._mInstance == undefined)
                SPFbWnd._mInstance = new SPFbWnd();
            return SPFbWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPFbWnd.prototype.addTop = function () {
        var _this = this;
        this.addChild(this._topContain);
        this._topContain.y = 16;
        var bjBox = new egret.Bitmap();
        this._topContain.addChild(bjBox);
        RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png", function (e) {
            bjBox.$setBitmapData(e);
            bjBox.x = 256;
            bjBox.y = 0;
        }, this);
        this._screen = new egret.Bitmap();
        this._topContain.addChild(this._screen);
        this._screen.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png", function (e) {
            _this._screen.$setBitmapData(e);
            _this._screen.y = 12;
            _this._screen.x = 604;
        }, this);
        this._questions = new egret.Bitmap();
        this._questions.touchEnabled = true;
        this._topContain.addChild(this._questions);
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png", function (e) {
            _this._questions.$setBitmapData(e);
            _this._questions.y = 8;
            _this._questions.x = 676;
        }, this);
        this._gShape = new egret.Shape();
        this._topContain.addChild(this._gShape);
        this._gShape.graphics.beginFill(0xffffff);
        this._gShape.graphics.drawRoundRect(256, 0, 120, 64, 33);
        this._gShape.graphics.endFill();
        this._g1 = ToolMrg.getText(256, 0, 32, 0xffffff, 120);
        this._g1.height = 64;
        this._topContain.addChild(this._g1);
        this._g1.textAlign = egret.HorizontalAlign.CENTER;
        this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g1.text = "串关";
        this._g1.touchEnabled = true;
        this._g2 = ToolMrg.getText(256 + 120, 0, 32, 0xffffff, 120);
        this._g2.height = 64;
        this._topContain.addChild(this._g2);
        this._g2.textAlign = egret.HorizontalAlign.CENTER;
        this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g2.text = "单关";
        this._g2.touchEnabled = true;
    };
    SPFbWnd.prototype.touchDown = function (e) {
        // Alertpaner.getInstance.show("单关暂未开放");
        if (e.target == this._g1) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._g2) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        this.changeTop();
    };
    SPFbWnd.prototype.changeTop = function () {
        if (this._index == 0) {
            this._g1.textColor = 0xF72F52;
            this._g2.textColor = 0xffffff;
            egret.Tween.get(this._gShape).to({ x: 0 }, 200);
            SPG1Wnd.getInstance.show();
            SPOnePass.getInstance.hide();
            SPFbWnd.inIndex = 0;
        }
        else if (this._index == 1) {
            this._g1.textColor = 0xffffff;
            this._g2.textColor = 0xF72F52;
            egret.Tween.get(this._gShape).to({ x: 120 }, 200);
            SPG1Wnd.getInstance.hide();
            SPOnePass.getInstance.show();
        }
    };
    /**篮球支付成功回调 关闭支付界面 单开订单*/
    SPFbWnd.prototype.zfBack = function () {
        MultiplierDetail.getInstance.hide();
        PaymentWnd.getInstance.hide();
        GoFBBuy.getInstance.hide();
        SPG1Wnd.getInstance.clearAllData();
        this.changeTop();
        UserInfoPhp.getInstance.sendHttp();
        Order_List.getInstance.sendHttp();
        MyLotteryWnd.getInstance.show(1);
    };
    SPFbWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.changeTop();
        if (UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
    };
    SPFbWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            SPG1Wnd.getInstance.hide();
            SPOnePass.getInstance.hide();
            this._index = 0;
            SPFbWnd.inIndex = 0;
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    SPFbWnd.prototype.addInterception = function () {
        this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._questions.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SPFbWnd.prototype.removeInterception = function () {
        this._screen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._questions.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickBtn, this);
        this._g1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._g2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SPFbWnd.prototype.clickBtn = function (e) {
        if (e.target == this._screen) {
            SPFBscreen.getInstance.show();
        }
        else if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._questions) {
            SPFbExplain.getInstance.show();
        }
    };
    /**当前所处页面 0串关 1胜平负 2进球数 3比分 4半全场 */
    SPFbWnd.inIndex = 0;
    return SPFbWnd;
}(egret.DisplayObjectContainer));
__reflect(SPFbWnd.prototype, "SPFbWnd");
//# sourceMappingURL=SPFbWnd.js.map