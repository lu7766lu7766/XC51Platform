/**
 * 登陆注册
 */
class LoginWnd extends egret.DisplayObjectContainer {
    private static _mInstance: LoginWnd;
    public static get getInstance(): LoginWnd {
        if (LoginWnd._mInstance == undefined)
            LoginWnd._mInstance = new LoginWnd();
        return LoginWnd._mInstance;
    }

    private _topUI: TopUI;
    private _return: egret.Shape;

    /**账号图标 */
    private _mZHIcon: egret.Bitmap;
    /**密码图标 */
    private _mMMIcon: egret.Bitmap;
    /**登陆图标 */
    private _mDLIcon: egret.Bitmap;
    /**登陆 */
    private _mQRZF: egret.TextField;

    /**账号输入文本 */
    private _mDLSR: egret.TextField;
    /**密码输入文本 */
    private _mMMSR: egret.TextField;
    private _mTipMMSR: egret.TextField;

    /**注册 */
    private _mZC: egret.TextField;

    constructor() {
        super();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("", -this.y, undefined, "bg_login@2x.png");
        this._topUI.changeTitle("登陆");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
            this.hide();
        }, this);

        this.init();
        this.setDB()

        this.touchEnabled = true;
    }

    private init(): void {
        let link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(94, 568 - this.y, 560, 2);
        link.graphics.endFill();

        let link1 = new egret.Shape();
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

        if (this._mZC == undefined)
            this._mZC = ToolMrg.getText(250, 992 - this.y, 28, 0xF72E52, 250);
        this._mZC.height = 80;
        this._mZC.textAlign = egret.HorizontalAlign.CENTER;
        this._mZC.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mZC.text = "注册新账号";
        this._mZC.touchEnabled = true;
        this.addChild(this._mZC);

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

    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._mDLIcon) {
            if (this._mDLSR.text == "输入账号") {
                Alertpaner.getInstance.show("请输入账号");
            } else if (this._mMMSR.text == "输入密码") {
                Alertpaner.getInstance.show("请输入密码");
            } else {
                LoginPhp.getInstance.sendHttp(this._mDLSR.text, this._mMMSR.text);
            }
        } else if (e.target == this._mZC) {
            RegisterWnd.getInstance.show();
        }
    }

    /**检测数字和字母组成 */
    private isZMOrZH(str: string): boolean {
        var regNumber = /\d+/; //验证0-9的任意数字最少出现1次。
        var regString = /[a-zA-Z]+/; //验证大小写26个字母任意字母最少出现1次。
        if (/.*[\u4e00-\u9fa5]+.*$/.test(str)) {
            return false;
        }
        //验证第三个字符串
        if (regNumber.test(str) && regString.test(str)) {
            return true;
        } else {
            return false;
        }
    }

    private setBit(icon: egret.Bitmap, str: string, x, y): void {
        RES.getResByUrl("resource/assets/images/ui/" + str, (e) => {
            icon.$setBitmapData(e);
            icon.x = x;
            icon.y = y;
        }, this);
        this.addChild(icon);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }

    public show(): void {
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
    }

    private textInput2() {
        if (this._mDLSR != undefined && this._mDLSR.text == "输入账号") {
            this._mDLSR.text = "";
            this._mDLSR.textColor = 0x000000;
        } else if (this._mDLSR != undefined && this._mDLSR.text == "") {
            this._mDLSR.text = "输入账号";
            this._mDLSR.textColor = 0xA9A9A9;
        }
    }

    private textInput() {
        if (this._mMMSR != undefined && this._mMMSR.text == "输入密码") {
            this._mMMSR.text = "";
            this._mMMSR.textColor = 0x000000;
            this._mMMSR.alpha = 1;
            this._mTipMMSR.text = "";
        } else if (this._mMMSR != undefined && this._mMMSR.text == "") {
            this._mMMSR.text = "输入密码";
            this._mMMSR.textColor = 0xA9A9A9;
            this._mMMSR.alpha = 0.01;
            this._mTipMMSR.text = "输入密码";
        }
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }

        this._mDLIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mZC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);

        this._mMMSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this._mMMSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
    }
}