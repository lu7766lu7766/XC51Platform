class TipWindow extends egret.DisplayObjectContainer {
    private static _mInstance: TipWindow;
    public static get getInstance(): TipWindow {
        if (TipWindow._mInstance == undefined)
            TipWindow._mInstance = new TipWindow();
        return TipWindow._mInstance;
    }

    private _mContain: egret.DisplayObjectContainer;
    private _title: egret.TextField;
    private _leftBtn: egret.Bitmap;
    private _rightBtn: egret.Bitmap;

    constructor() {
        super();
        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);

        let shape = new egret.Shape();
        this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0, 0, 600, 240, 33);
        shape.graphics.endFill();
        shape.touchEnabled = true;

        this._title = ToolMrg.getText(0, 37, 36, 0x333333, 600);
        this._mContain.addChild(this._title);
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        this._title.lineSpacing = 10;

        this._leftBtn = new egret.Bitmap();
        this._mContain.addChild(this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", (e) => {
            this._leftBtn.$setBitmapData(e);
            this._leftBtn.x = 14;
            this._leftBtn.y = 132;
        }, this);
        this._leftBtn.touchEnabled = true;
        this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        this._rightBtn = new egret.Bitmap();
        this._mContain.addChild(this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", (e) => {
            this._rightBtn.$setBitmapData(e);
            this._rightBtn.x = 312;
            this._rightBtn.y = 132;
        }, this);
        this._rightBtn.touchEnabled = true;
        this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        let leftText = ToolMrg.getText(14, 132, 32, 0x333333, 276);
        this._mContain.addChild(leftText);
        leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "取消";

        let rightText = ToolMrg.getText(312, 132, 32, 0xffffff, 276);
        this._mContain.addChild(rightText);
        rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "确定";

        this.setDB();
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._rightBtn) {
            if (this._id == 0) {//清除缓存
                UserData.getInstance.setYJTime("0", "0", "0");
                UserData.getInstance.userName = "未登录";
                UserData.getInstance.setGold(0);
                UserData.getInstance.setBonus(0);
                UserData.getInstance.setYJGold(0);
                UserData.getInstance.setDJQGold(0);
                UserData.getInstance.setRetCash(0);
                UserData.getInstance.setLv(0);
                UserData.getInstance.photo = "";
                GameValue.isBZQBYJ = 0;
                GameValue.isDryingList = 0;
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);

                Alertpaner.getInstance.show("清除成功");

                MyViewWnd.getInstance.removeInterception();
                MyViewWnd.getInstance.addInterception();

                SetUpWnd.getInstance.hide();
                MyLotteryDataMrg.getInstance.cleanData();
                MyViewWnd.getInstance.refreshallInfo();
                UserData.getInstance.setused(0);
                withdrawData.getInstance.cleanall();
            } if (this._id == 1) {
                RechargeWnd.getInstance.show();
            }
        }
        this.hide();
    }

    public cleaall() {
        UserData.getInstance.setYJTime("0", "0", "0");
        UserData.getInstance.userName = "未登录";
        UserData.getInstance.setrealName("");
        UserData.getInstance.setGold(0);
        UserData.getInstance.setBonus(0);
        UserData.getInstance.setYJGold(0);
        UserData.getInstance.setDJQGold(0);
        UserData.getInstance.setRetCash(0);
        UserData.getInstance.setLv(0);
        UserData.getInstance.photo = "";
        GameValue.isBZQBYJ = 0;
        GameValue.isDryingList = 0;
        CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
        SelectDataMrg.getInstance.clearItem();
        
        Alertpaner.getInstance.show("注销成功");
        MyViewWnd.getInstance.removeInterception();
        MyViewWnd.getInstance.addInterception();
    }

    private _id: number;
    /**传入文本 id 根据id处理事件 (取消与确定) */
    public show(text: string, id: number): void {
        this._id = id;
        this._title.text = text;

        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }
}