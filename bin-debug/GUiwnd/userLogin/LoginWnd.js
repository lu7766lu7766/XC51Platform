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
/**
 * 登陆注册
 */
var LoginWnd = (function (_super) {
    __extends(LoginWnd, _super);
    function LoginWnd() {
        var _this = _super.call(this) || this;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y, undefined, "bg_login@2x.png");
        _this._topUI.changeTitle("登陆");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this.init();
        _this.setDB();
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(LoginWnd, "getInstance", {
        get: function () {
            if (LoginWnd._mInstance == undefined)
                LoginWnd._mInstance = new LoginWnd();
            return LoginWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    LoginWnd.prototype.init = function () {
        var link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(94, 568 - this.y, 560, 2);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        this.addChild(link1);
        link1.graphics.beginFill(0xdedede);
        link1.graphics.drawRect(94, 688 - this.y, 560, 2);
        link1.graphics.endFill();
        this._mZHIcon = new egret.Bitmap();
        this.setBit(this._mZHIcon, "phone_login@2x.png", 94, 508 - this.y);
        this._mMMIcon = new egret.Bitmap();
        this.setBit(this._mMMIcon, "password_login@2x.png", 94, 628 - this.y);
        this._mDLIcon = new egret.Bitmap();
        this._mDLIcon.touchEnabled = true;
        this.setBit(this._mDLIcon, "button_login@2x.png", 90, 834 - this.y);
        if (this._mQRZF == undefined)
            this._mQRZF = ToolMrg.getText(250, 866 - this.y, 36, 0xFFFFFF, 250);
        this._mQRZF.textAlign = egret.HorizontalAlign.CENTER;
        this._mQRZF.text = "登陆";
        this.addChild(this._mQRZF);
        // if (this._mZC == undefined)
        //     this._mZC = ToolMrg.getText(250, 992 - this.y, 28, 0xF72E52, 250);
        // this._mZC.height = 80;
        // this._mZC.textAlign = egret.HorizontalAlign.CENTER;
        // this._mZC.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this._mZC.text = "注册新账号";
        // this._mZC.touchEnabled = true;
        // this.addChild(this._mZC);
        if (this._mDLSR == undefined)
            this._mDLSR = ToolMrg.getText(140, 486 - this.y, 28, 0xA9A9A9, 500);
        this._mDLSR.height = 80;
        this._mDLSR.type = egret.TextFieldType.INPUT;
        this._mDLSR.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mDLSR.text = "输入账号";
        this.addChild(this._mDLSR);
        // this._mDLSR.border = true;
        if (this._mMMSR == undefined)
            this._mMMSR = ToolMrg.getText(140, 606 - this.y, 28, 0xA9A9A9, 500);
        this._mMMSR.height = 80;
        this._mMMSR.inputType = egret.TextFieldInputType.PASSWORD;
        this._mMMSR.displayAsPassword = true;
        this._mMMSR.type = egret.TextFieldType.INPUT;
        this._mMMSR.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mMMSR.text = "输入密码";
        this._mMMSR.alpha = 0.01;
        this.addChild(this._mMMSR);
        if (this._mTipMMSR == undefined)
            this._mTipMMSR = ToolMrg.getText(140, 606 - this.y, 28, 0xA9A9A9, 500);
        this._mTipMMSR.height = 80;
        this._mTipMMSR.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mTipMMSR.text = "输入密码";
        this.addChild(this._mTipMMSR);
    };
    LoginWnd.prototype.touchDown = function (e) {
        if (e.target == this._mDLIcon) {
            if (this._mDLSR.text == "输入账号") {
                Alertpaner.getInstance.show("请输入账号");
            }
            else if (this._mMMSR.text == "输入密码") {
                Alertpaner.getInstance.show("请输入密码");
            }
            else {
                LoginPhp.getInstance.sendHttp(this._mDLSR.text, this._mMMSR.text);
            }
        }
        else if (e.target == this._mZC) {
            RegisterWnd.getInstance.show();
        }
    };
    /**检测数字和字母组成 */
    LoginWnd.prototype.isZMOrZH = function (str) {
        var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
        var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
        if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
            return false;
        }
        //验证第三个字符串
        if (regNumber.test(str) && regString.test(str)) {
            return true;
        }
        else {
            return false;
        }
    };
    LoginWnd.prototype.setBit = function (icon, str, x, y) {
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) {
            icon.$setBitmapData(e);
            icon.x = x;
            icon.y = y;
        }, this);
        this.addChild(icon);
    };
    /**适配处理 */
    LoginWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    LoginWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._mDLIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mZC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mDLSR.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mDLSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        this._mMMSR.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this._mMMSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
        this._mDLSR.text = "输入账号";
        this._mDLSR.textColor = 0xA9A9A9;
        this._mMMSR.alpha = 0.01;
        this._mMMSR.text = "输入密码";
        this._mTipMMSR.text = "输入密码";
    };
    LoginWnd.prototype.textInput2 = function () {
        if (this._mDLSR != undefined && this._mDLSR.text == "输入账号") {
            this._mDLSR.text = "";
            this._mDLSR.textColor = 0x000000;
        }
        else if (this._mDLSR != undefined && this._mDLSR.text == "") {
            this._mDLSR.text = "输入账号";
            this._mDLSR.textColor = 0xA9A9A9;
        }
    };
    LoginWnd.prototype.textInput = function () {
        if (this._mMMSR != undefined && this._mMMSR.text == "输入密码") {
            this._mMMSR.text = "";
            this._mMMSR.textColor = 0x000000;
            this._mMMSR.alpha = 1;
            this._mTipMMSR.text = "";
        }
        else if (this._mMMSR != undefined && this._mMMSR.text == "") {
            this._mMMSR.text = "输入密码";
            this._mMMSR.textColor = 0xA9A9A9;
            this._mMMSR.alpha = 0.01;
            this._mTipMMSR.text = "输入密码";
        }
    };
    LoginWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this._mDLIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mZC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        this._mMMSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this._mMMSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
    };
    return LoginWnd;
}(egret.DisplayObjectContainer));
__reflect(LoginWnd.prototype, "LoginWnd");
//# sourceMappingURL=LoginWnd.js.map