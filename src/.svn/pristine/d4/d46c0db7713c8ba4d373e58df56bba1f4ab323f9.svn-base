class PayTipWindow extends egret.DisplayObjectContainer {
    private static _mInstance: PayTipWindow;
    public static get getInstance(): PayTipWindow {
        if (PayTipWindow._mInstance == undefined)
            PayTipWindow._mInstance = new PayTipWindow();
        return PayTipWindow._mInstance;
    }

    private _mContain: egret.DisplayObjectContainer;
    private _title: egret.TextField;
    private _leftBtn: egret.Bitmap;
    private _rightBtn: egret.Bitmap;
    private _content:egret.TextField;

    constructor() {
        super();
        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);

        let shape = new egret.Shape();
        this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0, 0, 600, 340, 33);
        shape.graphics.endFill();
        shape.touchEnabled = true;

        this._title = ToolMrg.getText(0, 37, 36, 0x333333, 600);
        this._mContain.addChild(this._title);
        this._title.bold = true;
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        this._title.text = "充值提示";
        this._title.lineSpacing = 10;

        this._content = ToolMrg.getText(50,100,28,0x333333,500);
        this._mContain.addChild(this._content);
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        this._content.lineSpacing = 10;
        this._content.text = "若您已完成支付流程并扣款成功，有可能存在延迟到账的情况，您可查看账户明细或联系客服。"

        this._leftBtn = new egret.Bitmap();
        this._mContain.addChild(this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", (e) => {
            this._leftBtn.$setBitmapData(e);
            this._leftBtn.x = 14;
            this._leftBtn.y = 224;
        }, this);
        this._leftBtn.touchEnabled = true;
        this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        this._rightBtn = new egret.Bitmap();
        this._mContain.addChild(this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", (e) => {
            this._rightBtn.$setBitmapData(e);
            this._rightBtn.x = 312;
            this._rightBtn.y = 224;
        }, this);
        this._rightBtn.touchEnabled = true;
        this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        let leftText = ToolMrg.getText(14, 250, 32, 0x333333, 276);
        this._mContain.addChild(leftText);
        // leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        // leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "支付遇到问题";

        let rightText = ToolMrg.getText(312, 250, 32, 0xffffff, 276);
        this._mContain.addChild(rightText);
        // rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        // rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "已完成支付";

        this.setDB();
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._rightBtn) {
            RechargeWnd.getInstance.hide();
        } else if(e.target == this._leftBtn) {
            KeFuWnd.getInstance.show();
        }
        this.hide();
    }

    private _id: number;
    /**充值提示 hide会请求刷新一次数据 */
    public show(): void {
        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
			UserInfoPhp.getInstance.sendHttp();
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
        // this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }
}