
class BankCardDepositWnd extends egret.DisplayObjectContainer {
    private static _mInstance: BankCardDepositWnd;
    public static get getInstance(): BankCardDepositWnd {
        if (BankCardDepositWnd._mInstance == undefined)
            BankCardDepositWnd._mInstance = new BankCardDepositWnd();
        return BankCardDepositWnd._mInstance;
    }

    private _topUI: TopUIWhite;
    private _return: egret.Shape;


    private _mContain: egret.DisplayObjectContainer;
    private _scroContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;

    private _payBtn: egret.Bitmap;

    private data: BankCardInfo
    public money: number

    private transferSaverInput: JacText
    private depositTimeInput: JacText

    // currentClass
    
    constructor() {
        super();
        this.y = 96 + GameValue.adaptationScreen;
        this.touchEnabled = true;

        this._topUI = new TopUIWhite("充值", -this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._topUI.hideTxText();

        this._scroContain = new egret.DisplayObjectContainer();
        this._mContain = new egret.DisplayObjectContainer();
        this._mContain.y = 0;
        this._scroContain.addChild(this._mContain);

        this.addScoll();
    }

    private init(): void {
        const bg = new egret.Shape();
        // this.addChild(this._tipShape);
        bg.graphics.beginFill(0xf3f3f3, 1);
        bg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight- 120);
        bg.graphics.endFill();
        this._mContain.addChild(bg)
        
        // depositContainer
        const depositContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        this._mContain.addChild(depositContainer)

        let depositIcon = new egret.Bitmap();
        depositIcon.y = 30
        depositIcon.x = 60
        depositIcon.width = 55;
        depositIcon.height = 40;
        RES.getResByUrl("resource/assets/images/bank_card/ic_rechargeicon1.png", (e) => { depositIcon.$setBitmapData(e); }, this);
        depositContainer.addChild(depositIcon);

        let depositTitle = ToolMrg.getText(128, 35, 30, 0x333333);
        depositTitle.text = "入款确认信息";
        depositContainer.addChild(depositTitle);

        const depositBG = new egret.Shape();
        depositBG.graphics.beginFill(0xffffff, 1);
        depositBG.graphics.drawRect(20, 90, GameMain.getInstance.StageWidth - 40, 195);
        depositBG.graphics.endFill();
        depositContainer.addChild(depositBG)

        // 存款时间 input
        let depositTimeTitle = ToolMrg.getText(60, PositionTool.getBelow(depositTitle) + 50, 28, 0x333333);
        depositTimeTitle.text = "存款时间:";
        depositContainer.addChild(depositTimeTitle);
        
        const now = new Date()
        this.depositTimeInput = ToolMrg.getText(200, PositionTool.getBelow(depositTitle) + 50, 28, 0x333333, 500);
        this.depositTimeInput.type = egret.TextFieldType.INPUT;
        this.depositTimeInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        // depositTimeInput.placeholder = '2019-01-01 12:00:00'
        this.depositTimeInput.text = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        depositContainer.addChild(this.depositTimeInput);

        const depositTimeHR = new egret.Shape();
        depositTimeHR.graphics.beginFill(0xcccccc, 1);
        depositTimeHR.graphics.drawRect(60, PositionTool.getBelow(depositTimeTitle) + 10, depositBG.width - 80, 3);
        depositTimeHR.graphics.endFill();
        depositContainer.addChild(depositTimeHR)

        // 存款金额 input
        let depositAmountTitle = ToolMrg.getText(60, PositionTool.getBelow(depositTimeTitle) + 40, 28, 0x333333);
        depositAmountTitle.text = "存款金额:";
        depositContainer.addChild(depositAmountTitle);
        
        const depositAmounteInput = ToolMrg.getText(200, PositionTool.getBelow(depositTimeTitle) + 40, 28, 0xe62222, 500);
        depositAmounteInput.text = this.money.toString()
        depositContainer.addChild(depositAmounteInput);

        const depositAmountCopyBtn = new CopyBtn(16, this.money.toString())
        depositAmountCopyBtn.x = GameMain.getInstance.StageWidth - 120
        depositAmountCopyBtn.y = PositionTool.getBelow(depositTimeTitle) + 38
        depositContainer.addChild(depositAmountCopyBtn);

        // const depositAmountHR = new egret.Shape();
        // depositAmountHR.graphics.beginFill(0xcccccc, 1);
        // depositAmountHR.graphics.drawRect(60, PositionTool.getBelow(depositAmountTitle) + 20, depositBG.width - 80, 3);
        // depositAmountHR.graphics.endFill();
        // depositContainer.addChild(depositAmountHR)

        // deposit tip
        const depositTip = ToolMrg.getText(60, PositionTool.getBelow(depositAmountTitle) + 25, 20, 0xe62222);
        depositTip.text = '＊复制实际存入金额进行入款，就可以快速到帐喔'
        depositContainer.addChild(depositTip);

        //////////////////////////////////////
        // depositContainer
        const bankInfoContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        bankInfoContainer.y = PositionTool.getBelow(depositContainer) + 20
        this._mContain.addChild(bankInfoContainer)

        let bankInfoIcon = new egret.Bitmap();
        bankInfoIcon.y = 30
        bankInfoIcon.x = 65
        bankInfoIcon.width = 45;
        bankInfoIcon.height = 40;
        RES.getResByUrl("resource/assets/images/bank_card/ic_rechargeicon2.png", (e) => { bankInfoIcon.$setBitmapData(e); }, this);
        bankInfoContainer.addChild(bankInfoIcon);
        
        let bankInfoTitle = ToolMrg.getText(128, 35, 30, 0x333333);
        bankInfoTitle.text = '转帐收款银行信息'
        bankInfoContainer.addChild(bankInfoTitle);

        const bankInfoBG = new egret.Shape();
        bankInfoBG.graphics.beginFill(0xffffff, 1);
        bankInfoBG.graphics.drawRect(20, 90, GameMain.getInstance.StageWidth - 40, 300);
        bankInfoBG.graphics.endFill();
        bankInfoContainer.addChild(bankInfoBG)

        // 收款人 input
        let accountNameTitle = ToolMrg.getText(60, PositionTool.getBelow(bankInfoTitle) + 50, 28, 0x333333);
        accountNameTitle.text = '收款人:';
        bankInfoContainer.addChild(accountNameTitle);
        
        const accountNameContent = ToolMrg.getText(200, PositionTool.getBelow(bankInfoTitle) + 50, 28, 0xe62222, 500);
        accountNameContent.text = this.data.account_name
        accountNameContent.textColor = 0x919090
        bankInfoContainer.addChild(accountNameContent);

        const accountNameCopyBtn = new CopyBtn(16, this.data.account_name)
        accountNameCopyBtn.x = GameMain.getInstance.StageWidth - 120
        accountNameCopyBtn.y = PositionTool.getBelow(bankInfoTitle) + 48
        bankInfoContainer.addChild(accountNameCopyBtn);

        // 收款帐号 input
        let accountTitle = ToolMrg.getText(60, PositionTool.getBelow(accountNameTitle) + 30, 28, 0x333333);
        accountTitle.text = '收款帐号:';
        bankInfoContainer.addChild(accountTitle);
        
        const accountContent = ToolMrg.getText(200, PositionTool.getBelow(accountNameTitle) + 30, 28, 0xe62222, 500);
        accountContent.text = this.data.account
        accountContent.textColor = 0x919090
        bankInfoContainer.addChild(accountContent);

        const accountCopyBtn = new CopyBtn(16, this.data.account)
        accountCopyBtn.x = GameMain.getInstance.StageWidth - 120
        accountCopyBtn.y = PositionTool.getBelow(accountNameTitle) + 28
        bankInfoContainer.addChild(accountCopyBtn);

        // 开户支行 input
        let bankLocationTitle = ToolMrg.getText(60, PositionTool.getBelow(accountTitle) + 30, 28, 0x333333);
        bankLocationTitle.text = '开户支行:';
        bankInfoContainer.addChild(bankLocationTitle);
        
        const bankLocationContent = ToolMrg.getText(200, PositionTool.getBelow(accountTitle) + 30, 28, 0xe62222, 500);
        bankLocationContent.text = this.data.bank_location
        bankLocationContent.textColor = 0x919090
        bankInfoContainer.addChild(bankLocationContent);

        const bankLocationCopyBtn = new CopyBtn(16, this.data.bank_location)
        bankLocationCopyBtn.x = GameMain.getInstance.StageWidth - 120
        bankLocationCopyBtn.y = PositionTool.getBelow(accountTitle) + 28
        bankInfoContainer.addChild(bankLocationCopyBtn);

        // 开户银行 input
        let bankNameTitle = ToolMrg.getText(60, PositionTool.getBelow(bankLocationTitle) + 30, 28, 0x333333);
        bankNameTitle.text = '开户银行:';
        bankInfoContainer.addChild(bankNameTitle);
        
        const bankNameContent = ToolMrg.getText(200, PositionTool.getBelow(bankLocationTitle) + 30, 28, 0xe62222, 500);
        bankNameContent.text = this.data.bank_name
        bankNameContent.textColor = 0x919090
        bankInfoContainer.addChild(bankNameContent);

        const bankNameCopyBtn = new CopyBtn(16, this.data.bank_name)
        bankNameCopyBtn.x = GameMain.getInstance.StageWidth - 120
        bankNameCopyBtn.y = PositionTool.getBelow(bankLocationTitle) + 28
        bankInfoContainer.addChild(bankNameCopyBtn);

        // bank info tip
        const bankInfoTip = ToolMrg.getText(60, PositionTool.getBelow(bankNameTitle) + 25, 20, 0xe62222);
        bankInfoTip.text = '转帐前规范仔细核对银行帐号，转帐金额必须与提交金额一至'
        bankInfoContainer.addChild(bankInfoTip);

        //////////////////////////////////////
        // depositContainer
        const transferContainer:egret.DisplayObjectContainer = new egret.DisplayObjectContainer()
        transferContainer.y = PositionTool.getBelow(bankInfoContainer) + 20
        this._mContain.addChild(transferContainer)

        let transferIcon = new egret.Bitmap();
        transferIcon.y = 30
        transferIcon.x = 65
        transferIcon.width = 40;
        transferIcon.height = 40;
        RES.getResByUrl("resource/assets/images/bank_card/ic_rechargeicon3.png", (e) => { transferIcon.$setBitmapData(e); }, this);
        transferContainer.addChild(transferIcon);
        
        let transferTitle = ToolMrg.getText(128, 35, 30, 0x333333);
        transferTitle.text = '转帐收款银行信息'
        transferContainer.addChild(transferTitle);

        const transferBG = new egret.Shape();
        transferBG.graphics.beginFill(0xffffff, 1);
        transferBG.graphics.drawRect(20, 90, GameMain.getInstance.StageWidth - 40, 100);
        transferBG.graphics.endFill();
        transferContainer.addChild(transferBG)

        // 存款人姓名 input
        let transferSaverTitle = ToolMrg.getText(60, PositionTool.getBelow(transferTitle) + 50, 28, 0x333333);
        transferSaverTitle.text = "存款人姓名:";
        transferContainer.addChild(transferSaverTitle);
        
        this.transferSaverInput = ToolMrg.getText(240, PositionTool.getBelow(transferTitle) + 50, 28, 0x333333, 500);
        this.transferSaverInput.type = egret.TextFieldType.INPUT;
        this.transferSaverInput.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.transferSaverInput.placeholder = '王小明'
        transferContainer.addChild(this.transferSaverInput);

        const transferSaverHR = new egret.Shape();
        transferSaverHR.graphics.beginFill(0xcccccc, 1);
        transferSaverHR.graphics.drawRect(60, PositionTool.getBelow(transferSaverTitle) + 10, depositBG.width - 80, 3);
        transferSaverHR.graphics.endFill();
        transferContainer.addChild(transferSaverHR)

        //底部按钮
        this._payBtn = new egret.Bitmap();
        this.addChild(this._payBtn);
        this._payBtn.touchEnabled = true;
        this._payBtn.y = GameMain.getInstance.StageHeight - this.y - 130;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", (e) => {
            this._payBtn.$setBitmapData(e);
            this._payBtn.x = (GameMain.getInstance.StageWidth - this._payBtn.width) * 0.5;
        }, this);

        let btnText = ToolMrg.getText(0, this._payBtn.y + 32, 34, 0xffffff, GameMain.getInstance.StageWidth);
        this.addChild(btnText);
        btnText.textAlign = egret.HorizontalAlign.CENTER;
        btnText.text = "已确认付款";
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 0;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._scroContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 130;
        this.addChild(this._scroView);
    }

    public setData(_data: BankCardInfo) {
        this.data = _data
    }

    public show(): void {
        this.init();
        GUIManager.getInstance.tipLay.addChild(this);
        this.addEvent();
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeEvent();
        }
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._return) {
            this.hide();
        } else if (e.target == this._payBtn) {
            if (this.transferSaverInput.getText() === '') {
                Alertpaner.getInstance.show("存款人姓名不能空白");
            } else if (this.depositTimeInput.getText() === '') {
                Alertpaner.getInstance.show("存款时间不能空白");
            } else {
                BankCardDepositRequest.getInstance.sendHttp(
                    this.transferSaverInput.getText(), 
                    this.depositTimeInput.getText(), 
                    this.money.toString(),
                    this.data.id,
                    UserData.getInstance.userId,
                    GameValue.orderKey)
            }
        }
    }

    private addEvent(): void {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    private removeEvent(): void {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }
}

class BankCardInfo 
{
    public id: string;
    public account: string;
    public account_name: string;
    public bank_location: string;
    public bank_name: string;
    public create_time: string;
    public delete_time: string;
    public status: string;
    public update_time: string;
}