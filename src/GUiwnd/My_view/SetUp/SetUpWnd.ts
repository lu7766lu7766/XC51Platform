/**设置 */
class SetUpWnd extends egret.DisplayObjectContainer {
    private static _mInstance: SetUpWnd;
    public static get getInstance(): SetUpWnd {
        if (SetUpWnd._mInstance == undefined)
            SetUpWnd._mInstance = new SetUpWnd();
        return SetUpWnd._mInstance;
    }

    private _topUI: TopUI;
    private _return: egret.Shape;

    private _mContain: egret.DisplayObjectContainer;
    private _aboutLink: egret.Shape;
    private _clearLink: egret.Shape;
    private _logOut: egret.Bitmap;

    constructor() {
        super();

        this.touchEnabled = true;
        this._topUI = new TopUI("设置");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.y = 96 + GameValue.adaptationScreen;

        this.joinCenter();
        this.setDB();
    }

    private logOutText:egret.TextField;
    private joinCenter(): void {
        this._aboutLink = new egret.Shape();
        this._mContain.addChild(this._aboutLink);
        this._aboutLink.graphics.beginFill(0xffffff);
        this._aboutLink.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
        this._aboutLink.graphics.endFill();
        this._aboutLink.touchEnabled = true;

        let title1 = ToolMrg.getText(26, 0, 28, 0x333333);
        this._mContain.addChild(title1);
        title1.height = 108;
        title1.verticalAlign = egret.VerticalAlign.MIDDLE;
        title1.text = "关于51彩站";

        let img1 = new egret.Bitmap();
        this._mContain.addChild(img1);
        img1.x = 708;
        img1.y = 38;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", (e) => { img1.$setBitmapData(e); }, this);

        this._clearLink = new egret.Shape();
        this._mContain.addChild(this._clearLink);
        this._clearLink.graphics.beginFill(0xffffff);
        this._clearLink.graphics.drawRect(0, 110, GameMain.getInstance.StageWidth, 108);
        this._clearLink.graphics.endFill();
        this._clearLink.touchEnabled = true;

        let title2 = ToolMrg.getText(26, 110, 28, 0x333333);
        this._mContain.addChild(title2);
        title2.height = 108;
        title2.verticalAlign = egret.VerticalAlign.MIDDLE;
        title2.text = "清除缓存 " + GameValue.gameVer;

        let img2 = new egret.Bitmap();
        this._mContain.addChild(img2);
        img2.x = 708;
        img2.y = 38 + 110;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", (e) => { img2.$setBitmapData(e); }, this);

        this._logOut = new egret.Bitmap();
        this._mContain.addChild(this._logOut);
        this._logOut.y = 270;
        this._logOut.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", (e) => {
            this._logOut.$setBitmapData(e);
            this._logOut.x = (GameMain.getInstance.StageWidth - this._logOut.width) * 0.5;
        }, this);

        this.logOutText = ToolMrg.getText(0, 270, 36, 0xffffff, 750);
        this._mContain.addChild(this.logOutText);
        this.logOutText.height = 100;
        this.logOutText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.logOutText.textAlign = egret.HorizontalAlign.CENTER;
        this.logOutText.text = "退出登录";
    }

    public show(): void {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();

        if(UserData.getInstance.isLogin() == false) {
            this.logOutText.text = "登陆";
        } else {
            this.logOutText.text = "退出登录";
        }
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._return) {
            this.hide();
        } else if (e.target == this._clearLink) {//清除缓存
            TipWindow.getInstance.show("是否清除账号缓存数据", 0);
        } else if (e.target == this._aboutLink) {//关于
            AboutWnd.getInstance.show();
        } else if (e.target == this._logOut) {//注销登录
            // TipWindow.getInstance.cleaall();
            if(UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            } else {
                TipWindow.getInstance.show("是否清除账号缓存数据", 0);
            }
            // this.hide();
        }
    }

    private addInterception(): void {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._aboutLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._logOut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    private removeInterception(): void {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._aboutLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._logOut.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}