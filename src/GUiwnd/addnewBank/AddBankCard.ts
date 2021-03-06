/**添加银行卡 */
class AddBankCard extends egret.DisplayObjectContainer {
    private static _mInstance: AddBankCard;
    public static get getInstance(): AddBankCard {
        if (AddBankCard._mInstance == undefined)
            AddBankCard._mInstance = new AddBankCard();
        return AddBankCard._mInstance;
    }

    private _topUI: TopUIWhite;
    private _return: egret.Shape;

    private _mContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;

    private _topContain: egret.DisplayObjectContainer;
    /**开户姓名 */
    private _realName: egret.TextField;
    /**开户银行 */
    private _bank: egret.TextField;
    /**卡号 */
    private _realNum: egret.TextField;
    /**再次确认卡号 */
    private _realNum2: egret.TextField;

    private _orderContain: egret.DisplayObjectContainer;
    private _goBtn: egret.Bitmap;

    constructor() {
        super();

        this._topUI = new TopUIWhite("添加银行卡");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._topUI.hideTxText();

        this._mContain = new egret.DisplayObjectContainer();
        this._topContain = new egret.DisplayObjectContainer;
        this._orderContain = new egret.DisplayObjectContainer;
        this._mContain.addChild(this._orderContain);
        this._mContain.addChild(this._topContain);
        this._orderContain.y = 110;
        this.joinTop();
        this.addScoll();

        this._goBtn = new egret.Bitmap();
        this._orderContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        this._goBtn.y = 474;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", (e) => {
            this._goBtn.$setBitmapData(e);
            this._goBtn.x = (GameMain.getInstance.StageWidth - this._goBtn.width) * 0.5;
        }, this);

        let goText = ToolMrg.getText(20, 474 + 27, 36, 0xffffff, 712);
        this._orderContain.addChild(goText);
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "确定添加";

        let tip = ToolMrg.getText(26, 384 + 5, 24, 0x999999);
        this._orderContain.addChild(tip);
        tip.textFlow = <Array<egret.ITextElement>>[
            { "text": "*", "style": { "textColor": 0xf72e52 } },
            { "text": "该账号将被设置为默认提款账号", "style": { "textColor": 0x999999 } },
        ];

        let leftShape = new egret.Shape();
        this._orderContain.addChild(leftShape);
        leftShape.graphics.beginFill(0xdedede);
        leftShape.graphics.drawRect(28, 680.5, 260, 1.5);
        leftShape.graphics.endFill();

        let rightShape = new egret.Shape();
        this._orderContain.addChild(rightShape);
        rightShape.graphics.beginFill(0xdedede);
        rightShape.graphics.drawRect(464, 680.5, 260, 1.5);
        rightShape.graphics.endFill();

        let textTitle = ToolMrg.getText(328, 664 + 5, 24, 0x999999);
        this._orderContain.addChild(textTitle);
        textTitle.text = "温馨提示";

        let textContent1 = ToolMrg.getText(106, 728 + 5, 24, 0x999999);
        this._orderContain.addChild(textContent1);
        textContent1.lineSpacing = 10;
        textContent1.text = "1. 建议您绑定工行、农行、建行、招行的银行账\n   户，提款更快到账；";

        let textContent2 = ToolMrg.getText(106, 814 + 5, 24, 0x999999);
        this._orderContain.addChild(textContent2);
        textContent2.lineSpacing = 10;
        textContent2.text = "2. 开户姓名必须与实名认证的姓名一致，否则提\n   款申请将被退回；";

        let textContent3 = ToolMrg.getText(106, 902 + 5, 24, 0x999999);
        this._orderContain.addChild(textContent3);
        textContent3.lineSpacing = 10;
        textContent3.text = "3. 目前暂不支持信用卡和存折账号提款，绑定时\n   请使用银行卡借记卡(储蓄卡)；";

        let textContent4 = ToolMrg.getText(106, 990 + 5, 24, 0x999999);
        this._orderContain.addChild(textContent4);
        textContent4.lineSpacing = 10;
        textContent4.text = "4. 银行卡绑定信息审核可能有延迟，请您耐心等\n   待几分钟；";

        let textContent5 = ToolMrg.getText(106, 1078 + 5, 24, 0x999999);
        this._orderContain.addChild(textContent5);
        textContent5.lineSpacing = 10;
        textContent5.text = "5. 若几分钟后未审核通过，请您重新绑定或联系\n   在线客服。 ";

        this.setDB();
    }

    public show(): void {
        GUIManager.getInstance.tipLay.addChild(this);

        // this._realName.text = UserData.getInstance.getrealName();
        this._realName.text = "***";

        this.addInterception();
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            // this._realName.text = "";
            this._bank.text = "";
            this._realNum.text = "";
            this._realNum2.text = "";
            this.sendName();
            this.sendBank();
            this.sendText();
            this.sendText2();
        }
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._return) {
            this.hide();
        } else if (e.target == this._goBtn) {//确定添加
            // if (this._realName.text == "请填写开户姓名" || this._bank.text == "") {
            //     Alertpaner.getInstance.show("请填写开户姓名");
            //     return;
            // }
            if (this._bank.text == "请填写开户银行" || this._bank.text == "") {
                Alertpaner.getInstance.show("请填写开户银行");
                return;
            }
            if (this._realNum.text == "" || this._realNum.text == "请输入您的卡号") {
                Alertpaner.getInstance.show("请填写银行卡号");
                return;
            }
            if (this._realNum2.text == "" || this._realNum2.text == "再次输入您的卡号") {
                Alertpaner.getInstance.show("请填写确认银行卡号");
                return;
            }

            if (this._realNum2.text != this._realNum.text) {
                Alertpaner.getInstance.show("两次填写银行卡账号必须一致");
                return;
            }
            // let checkName = bankcardCheck.getInstance.checkName(this._realName.text);
            // if (!checkName) {
            //     Alertpaner.getInstance.show("请正确填写开户姓名");
            //     return;
            // }

            let checkCN = bankcardCheck.getInstance.checkName(this._bank.text);
            // if(!checkCN){
            //     Alertpaner.getInstance.show("开户银行必须填写中文");
            //     return;
            // }
            let check1 = bankcardCheck.getInstance.checkAllNum(this._realNum.text);
            // let check1 = bankcardCheck.getInstance.twocheck(this._realNum.text);
            // let check2 = bankcardCheck.getInstance.onecheck(this._realNum.text);
            // if(check1&&check2){//银行卡验证正确 请求
            if (check1) {
                BankCard_add.getInstance.sendHttp(UserData.getInstance.userId, this._realNum.text, this._bank.text, this._realName.text);
            } else {//格式错误
                Alertpaner.getInstance.show("输入卡号格式不正确");
            }
        }
    }

    //银行卡号
    private sendText(): void {
        if (this._realNum.text == "") {//FOCUS_OUT
            this._realNum.text = "请输入您的卡号";
        } else if (this._realNum.text == "请输入您的卡号") {//FOCUS_IN
            this._realNum.text = "";
        }
    }

    //再次确认卡号
    private sendText2(): void {
        if (this._realNum2.text == "") {//FOCUS_OUT
            this._realNum2.text = "再次输入您的卡号";
        } else if (this._realNum2.text == "再次输入您的卡号") {//FOCUS_IN
            this._realNum2.text = "";
        }
    }

    //开户银行
    private sendBank(): void {
        if (this._bank.text == "") {//FOCUS_OUT
            this._bank.text = "请填写开户银行";
        } else if (this._bank.text == "请填写开户银行") {//FOCUS_IN
            this._bank.text = "";
        }
    }

    //开户姓名
    private sendName(): void {
        if (this._realName.text == "") {//FOCUS_OUT
            this._realName.text = "请填写开户姓名";
        } else if (this._realName.text == "请填写开户姓名") {//FOCUS_IN
            this._realName.text = "";
        } else if (this._realName.text.length < 2 || this._realName.text.length > 10) {
            this._realName.text = "请填写开户姓名";
        }
    }

    private addInterception(): void {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        this._realNum.addEventListener(egret.Event.FOCUS_IN, this.sendText, this);
        this._realNum.addEventListener(egret.Event.FOCUS_OUT, this.sendText, this);
        this._realNum2.addEventListener(egret.Event.FOCUS_IN, this.sendText2, this);
        this._realNum2.addEventListener(egret.Event.FOCUS_OUT, this.sendText2, this);
        this._bank.addEventListener(egret.Event.FOCUS_IN, this.sendBank, this);
        this._bank.addEventListener(egret.Event.FOCUS_OUT, this.sendBank, this);
        this._realName.addEventListener(egret.Event.FOCUS_IN, this.sendName, this);
        this._realName.addEventListener(egret.Event.FOCUS_OUT, this.sendName, this);
    }

    private removeInterception(): void {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

        this._realNum.removeEventListener(egret.Event.CHANGE, this.sendText, this);
        this._realNum.removeEventListener(egret.Event.FOCUS_OUT, this.sendText, this);
        this._realNum2.removeEventListener(egret.Event.CHANGE, this.sendText2, this);
        this._realNum2.removeEventListener(egret.Event.FOCUS_OUT, this.sendText2, this);
        this._bank.removeEventListener(egret.Event.FOCUS_IN, this.sendBank, this);
        this._bank.removeEventListener(egret.Event.FOCUS_OUT, this.sendBank, this);
        this._realName.removeEventListener(egret.Event.FOCUS_IN, this.sendName, this);
        this._realName.removeEventListener(egret.Event.FOCUS_OUT, this.sendName, this);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 1198);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
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
    }

    private joinTop(): void {
        let topShape1 = new egret.Shape();
        this._mContain.addChild(topShape1);
        topShape1.graphics.beginFill(0xffffff);
        topShape1.graphics.drawRect(0, 20, GameMain.getInstance.StageWidth, 108);
        topShape1.graphics.endFill();

        let topShape2 = new egret.Shape();
        this._mContain.addChild(topShape2);
        topShape2.graphics.beginFill(0xffffff);
        topShape2.graphics.drawRect(0, 130, GameMain.getInstance.StageWidth, 108);
        topShape2.graphics.endFill();

        let topShape3 = new egret.Shape();
        this._mContain.addChild(topShape3);
        topShape3.graphics.beginFill(0xffffff);
        topShape3.graphics.drawRect(0, 240, GameMain.getInstance.StageWidth, 108);
        topShape3.graphics.endFill();

        let topShape4 = new egret.Shape();
        this._mContain.addChild(topShape4);
        topShape4.graphics.beginFill(0xffffff);
        topShape4.graphics.drawRect(0, 350, GameMain.getInstance.StageWidth, 108);
        topShape4.graphics.endFill();

        let topTitle1 = ToolMrg.getText(26, 20, 28, 0x333333);
        this._mContain.addChild(topTitle1);
        topTitle1.height = 108;
        topTitle1.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle1.text = "开户姓名";

        let topTitle2 = ToolMrg.getText(26, 130, 28, 0x333333);
        this._mContain.addChild(topTitle2);
        topTitle2.height = 108;
        topTitle2.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle2.text = "开户银行";

        let topTitle3 = ToolMrg.getText(26, 240, 28, 0x333333);
        this._mContain.addChild(topTitle3);
        topTitle3.height = 108;
        topTitle3.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle3.text = "银行卡号";

        let topTitle4 = ToolMrg.getText(26, 350, 28, 0x333333);
        this._mContain.addChild(topTitle4);
        topTitle4.height = 108;
        topTitle4.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle4.text = "确认卡号";

        // 0x333333 0x999999
        this._realName = ToolMrg.getText(170, 20, 28, 0x999999, 500);
        this._mContain.addChild(this._realName);
        this._realName.height = 108;
        this._realName.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._realName.text = "请填写开户姓名";
        // this._realName.type = egret.TextFieldType.INPUT;
        this._realName.inputType = egret.TextFieldInputType.TEXT;

        this._bank = ToolMrg.getText(170, 130, 28, 0x999999, 500);
        this._mContain.addChild(this._bank);
        this._bank.height = 108;
        this._bank.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._bank.text = "请填写开户银行";
        this._bank.type = egret.TextFieldType.INPUT;
        this._bank.inputType = egret.TextFieldInputType.TEXT;

        this._realNum = ToolMrg.getText(170, 240, 28, 0x999999, 500);
        this._mContain.addChild(this._realNum);
        this._realNum.height = 108;
        this._realNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._realNum.text = "请输入您的卡号";
        this._realNum.type = egret.TextFieldType.INPUT;
        this._realNum.inputType = egret.TextFieldInputType.TEXT;

        this._realNum2 = ToolMrg.getText(170, 350, 28, 0x999999, 500);
        this._mContain.addChild(this._realNum2);
        this._realNum2.height = 108;
        this._realNum2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._realNum2.text = "再次输入您的卡号";
        this._realNum2.type = egret.TextFieldType.INPUT;
        this._realNum2.inputType = egret.TextFieldInputType.TEXT;
    }
}