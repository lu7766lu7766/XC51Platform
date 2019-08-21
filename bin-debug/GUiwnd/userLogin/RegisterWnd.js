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
 * 注册
 */
var RegisterWnd = (function (_super) {
    __extends(RegisterWnd, _super);
    function RegisterWnd() {
        var _this = _super.call(this) || this;
        _this._mYZMStr = "";
        _this._mContain = new egret.DisplayObjectContainer();
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", 0, undefined, "bg_login@2x.png");
        _this._topUI.changeTitle("注册");
        _this._mContain.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this.init();
        _this.setDB();
        _this.addScoll();
        _this.touchEnabled = true;
        return _this;
    }
    Object.defineProperty(RegisterWnd, "getInstance", {
        get: function () {
            if (RegisterWnd._mInstance == undefined)
                RegisterWnd._mInstance = new RegisterWnd();
            return RegisterWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    RegisterWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = -this.y;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        this.addChild(this._scroView);
    };
    RegisterWnd.prototype.init = function () {
        var link = new egret.Shape();
        this._mContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(94, 568 - this.y, 560, 2);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        this._mContain.addChild(link1);
        link1.graphics.beginFill(0xdedede);
        link1.graphics.drawRect(94, 688 - this.y, 360, 2);
        link1.graphics.endFill();
        var link2 = new egret.Shape();
        this._mContain.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(94, 808 - this.y, 560, 2);
        link2.graphics.endFill();
        var link3 = new egret.Shape();
        this._mContain.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(94, 928 - this.y, 560, 2);
        link3.graphics.endFill();
        this._mZHIcon = new egret.Bitmap();
        this.setBit(this._mZHIcon, "phone_login@2x.png", 94, 508 - this.y);
        this._mYZMIcon = new egret.Bitmap();
        this.setBit(this._mYZMIcon, "safe_login@2x.png", 94, 630 - this.y);
        this._mMMIcon1 = new egret.Bitmap();
        this.setBit(this._mMMIcon1, "password_login@2x.png", 94, 748 - this.y);
        this._mYQRIcon2 = new egret.Bitmap();
        this.setBit(this._mYQRIcon2, "user_login@2x.png", 94, 870 - this.y);
        this._mYQRBGIcon2 = new egret.Bitmap();
        this._mYQRBGIcon2.touchEnabled = true;
        this.setBit(this._mYQRBGIcon2, "yzm_login@2x.png", 496, 628 - this.y);
        this._mDLIcon = new egret.Bitmap();
        this._mDLIcon.touchEnabled = true;
        this.setBit(this._mDLIcon, "button_login@2x.png", 90, 1074 - this.y);
        if (this._mQRZF == undefined)
            this._mQRZF = ToolMrg.getText(250, 1106 - this.y, 36, 0xFFFFFF, 250);
        this._mQRZF.textAlign = egret.HorizontalAlign.CENTER;
        this._mQRZF.text = "注册";
        this._mContain.addChild(this._mQRZF);
        this._mDLSR = this.setTxt(this._mDLSR, 140, 486 - this.y, "输入账号(5-16位)");
        this._mDLSR.type = egret.TextFieldType.INPUT;
        this._mYZMSR = this.setTxt(this._mYZMSR, 140, 606 - this.y, "输入图形验证码(必填)");
        this._mYZMSR.width = 360;
        this._mYZMSR.type = egret.TextFieldType.INPUT;
        if (this._mYZM == undefined)
            this._mYZM = ToolMrg.getText(496, 628 - this.y, 36, 0xF72E52, 160);
        this._mYZM.textAlign = egret.HorizontalAlign.CENTER;
        this._mYZM.height = 60;
        this._mYZM.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mContain.addChild(this._mYZM);
        this.freshYZM();
        this._mMMSR1 = this.setTxt(this._mMMSR1, 140, 726 - this.y, "输入新密码");
        this._mMMSR1.alpha = 0.01;
        this._mMMSR1.inputType = egret.TextFieldInputType.PASSWORD;
        this._mMMSR1.displayAsPassword = true;
        this._mMMSR1.type = egret.TextFieldType.INPUT;
        this._mTipMMSR1 = this.setTxt(this._mTipMMSR1, 140, 726 - this.y, "输入新密码");
        this._mTJRSR2 = this.setTxt(this._mTJRSR2, 140, 846 - this.y, "请输入推荐人用户名或邀请码(选填)");
        this._mTJRSR2.type = egret.TextFieldType.INPUT;
    };
    /**刷新验证码 */
    RegisterWnd.prototype.freshYZM = function () {
        this._mYZMStr = "";
        var str = "";
        for (var i = 0; i < 4; i++) {
            var rand = GUtilMath.randomNum(0, 9);
            this._mYZMStr += "" + rand;
            str += rand;
            if (i < 3) {
                str += " ";
            }
        }
        this._mYZM.text = str;
    };
    RegisterWnd.prototype.touchDown = function (e) {
        if (e.target == this._mDLIcon) {
            if (this._mDLSR.text == "输入账号(5-16位)") {
                Alertpaner.getInstance.show("请输入账号(5-16位)");
            }
            else if (this._mDLSR.text.length < 5 || this._mDLSR.text.length > 16) {
                Alertpaner.getInstance.show("输入账号5位-16位区间");
            }
            else if (this.isZMOrZH(this._mDLSR.text) == false) {
                Alertpaner.getInstance.show("账号须要由英文+数字组成");
            }
            else if (this._mYZMSR.text == "输入图形验证码(必填)") {
                Alertpaner.getInstance.show("输入图形验证码");
            }
            else if (this._mMMSR1.text == "输入新密码") {
                Alertpaner.getInstance.show("输入新密码");
            }
            else if (this._mYZMSR.text != this._mYZMStr) {
                Alertpaner.getInstance.show("验证码不对");
            }
            else {
                RegistPhp.getInstance.sendHttp(this._mDLSR.text, this._mMMSR1.text, this._mTJRSR2.text);
            }
            this.freshYZM();
        }
        else if (e.target == this._mYQRBGIcon2) {
            this.freshYZM();
        }
    };
    /**检测数字和字母组成 */
    RegisterWnd.prototype.isZMOrZH = function (str) {
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
    RegisterWnd.prototype.setBit = function (icon, str, x, y) {
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) {
            icon.$setBitmapData(e);
            icon.x = x;
            icon.y = y;
        }, this);
        this._mContain.addChild(icon);
    };
    RegisterWnd.prototype.setTxt = function (txt, x, y, str) {
        if (txt == undefined)
            txt = ToolMrg.getText(x, y, 28, 0xA9A9A9, 500);
        txt.height = 80;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
        txt.text = "" + str;
        this._mContain.addChild(txt);
        return txt;
    };
    /**适配处理 */
    RegisterWnd.prototype.setDB = function () {
        var sss = new egret.Shape();
        sss.graphics.beginFill(0xffffff, 1);
        sss.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 1334);
        sss.graphics.endFill();
        this._mContain.addChildAt(sss, 0);
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    RegisterWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._mDLIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mYQRBGIcon2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mDLSR.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mDLSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        this._mYZMSR.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this._mYZMSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
        this._mMMSR1.addEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
        this._mMMSR1.addEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);
        this._mMMSR1.addEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
        this._mMMSR1.addEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);
        this._mTJRSR2.addEventListener(egret.Event.FOCUS_IN, this.textInput4, this);
        this._mTJRSR2.addEventListener(egret.Event.FOCUS_OUT, this.textInput4, this);
    };
    RegisterWnd.prototype.textInput2 = function () {
        if (this._mDLSR != undefined && this._mDLSR.text == "输入账号(5-16位)") {
            this._mDLSR.text = "";
            this._mDLSR.textColor = 0x000000;
        }
        else if (this._mDLSR != undefined && this._mDLSR.text == "") {
            this._mDLSR.text = "输入账号(5-16位)";
            this._mDLSR.textColor = 0xA9A9A9;
        }
    };
    RegisterWnd.prototype.textInput = function () {
        if (this._mYZMSR != undefined && this._mYZMSR.text == "输入图形验证码(必填)") {
            this._mYZMSR.text = "";
            this._mYZMSR.textColor = 0x000000;
        }
        else if (this._mYZMSR != undefined && this._mYZMSR.text == "") {
            this._mYZMSR.text = "输入图形验证码(必填)";
            this._mYZMSR.textColor = 0xA9A9A9;
        }
    };
    RegisterWnd.prototype.textInput3 = function () {
        if (this._mMMSR1 != undefined && this._mMMSR1.text == "输入新密码") {
            this._mMMSR1.text = "";
            this._mMMSR1.textColor = 0x000000;
            this._mMMSR1.alpha = 1;
            this._mTipMMSR1.text = "";
        }
        else if (this._mMMSR1 != undefined && this._mMMSR1.text == "") {
            this._mMMSR1.text = "输入新密码";
            this._mMMSR1.textColor = 0xA9A9A9;
            this._mMMSR1.alpha = 0.01;
            this._mTipMMSR1.text = "输入新密码";
        }
    };
    RegisterWnd.prototype.textInput4 = function () {
        if (this._mTJRSR2 != undefined && this._mTJRSR2.text == "请输入推荐人用户名或邀请码(选填)") {
            this._mTJRSR2.text = "";
            this._mTJRSR2.textColor = 0x000000;
        }
        else if (this._mTJRSR2 != undefined && this._mTJRSR2.text == "") {
            this._mTJRSR2.text = "请输入推荐人用户名或邀请码(选填)";
            this._mTJRSR2.textColor = 0xA9A9A9;
        }
    };
    RegisterWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this._mDLIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mYQRBGIcon2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        this._mYZMSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this._mYZMSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
        this._mMMSR1.removeEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
        this._mMMSR1.removeEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);
        this._mTJRSR2.removeEventListener(egret.Event.FOCUS_IN, this.textInput4, this);
        this._mTJRSR2.removeEventListener(egret.Event.FOCUS_OUT, this.textInput4, this);
    };
    return RegisterWnd;
}(egret.DisplayObjectContainer));
__reflect(RegisterWnd.prototype, "RegisterWnd");
//# sourceMappingURL=RegisterWnd.js.map