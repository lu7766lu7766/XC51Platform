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
/**添加银行卡 */
var AddBankCard = (function (_super) {
    __extends(AddBankCard, _super);
    function AddBankCard() {
        var _this = _super.call(this) || this;
        _this._topUI = new TopUIWhite("添加银行卡");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._topUI.hideTxText();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._topContain = new egret.DisplayObjectContainer;
        _this._orderContain = new egret.DisplayObjectContainer;
        _this._mContain.addChild(_this._orderContain);
        _this._mContain.addChild(_this._topContain);
        _this._orderContain.y = 110;
        _this.joinTop();
        _this.addScoll();
        _this._goBtn = new egret.Bitmap();
        _this._orderContain.addChild(_this._goBtn);
        _this._goBtn.touchEnabled = true;
        _this._goBtn.y = 474;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._goBtn.$setBitmapData(e);
            _this._goBtn.x = (GameMain.getInstance.StageWidth - _this._goBtn.width) * 0.5;
        }, _this);
        var goText = ToolMrg.getText(20, 474 + 27, 36, 0xffffff, 712);
        _this._orderContain.addChild(goText);
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "确定添加";
        var tip = ToolMrg.getText(26, 384 + 5, 24, 0x999999);
        _this._orderContain.addChild(tip);
        tip.textFlow = [
            { "text": "*", "style": { "textColor": 0xf72e52 } },
            { "text": "该账号将被设置为默认提款账号", "style": { "textColor": 0x999999 } },
        ];
        var leftShape = new egret.Shape();
        _this._orderContain.addChild(leftShape);
        leftShape.graphics.beginFill(0xdedede);
        leftShape.graphics.drawRect(28, 680.5, 260, 1.5);
        leftShape.graphics.endFill();
        var rightShape = new egret.Shape();
        _this._orderContain.addChild(rightShape);
        rightShape.graphics.beginFill(0xdedede);
        rightShape.graphics.drawRect(464, 680.5, 260, 1.5);
        rightShape.graphics.endFill();
        var textTitle = ToolMrg.getText(328, 664 + 5, 24, 0x999999);
        _this._orderContain.addChild(textTitle);
        textTitle.text = "温馨提示";
        var textContent1 = ToolMrg.getText(106, 728 + 5, 24, 0x999999);
        _this._orderContain.addChild(textContent1);
        textContent1.lineSpacing = 10;
        textContent1.text = "1. 建议您绑定工行、农行、建行、招行的银行账\n   户，提款更快到账；";
        var textContent2 = ToolMrg.getText(106, 814 + 5, 24, 0x999999);
        _this._orderContain.addChild(textContent2);
        textContent2.lineSpacing = 10;
        textContent2.text = "2. 开户姓名必须与实名认证的姓名一致，否则提\n   款申请将被退回；";
        var textContent3 = ToolMrg.getText(106, 902 + 5, 24, 0x999999);
        _this._orderContain.addChild(textContent3);
        textContent3.lineSpacing = 10;
        textContent3.text = "3. 目前暂不支持信用卡和存折账号提款，绑定时\n   请使用银行卡借记卡(储蓄卡)；";
        var textContent4 = ToolMrg.getText(106, 990 + 5, 24, 0x999999);
        _this._orderContain.addChild(textContent4);
        textContent4.lineSpacing = 10;
        textContent4.text = "4. 银行卡绑定信息审核可能有延迟，请您耐心等\n   待几分钟；";
        var textContent5 = ToolMrg.getText(106, 1078 + 5, 24, 0x999999);
        _this._orderContain.addChild(textContent5);
        textContent5.lineSpacing = 10;
        textContent5.text = "5. 若几分钟后未审核通过，请您重新绑定或联系\n   在线客服。 ";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(AddBankCard, "getInstance", {
        get: function () {
            if (AddBankCard._mInstance == undefined)
                AddBankCard._mInstance = new AddBankCard();
            return AddBankCard._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    AddBankCard.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        // this._realName.text = UserData.getInstance.getrealName();
        this._realName.text = "***";
        this.addInterception();
    };
    AddBankCard.prototype.hide = function () {
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
    };
    AddBankCard.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._goBtn) {
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
            var checkCN = bankcardCheck.getInstance.checkName(this._bank.text);
            // if(!checkCN){
            //     Alertpaner.getInstance.show("开户银行必须填写中文");
            //     return;
            // }
            var check1 = bankcardCheck.getInstance.checkAllNum(this._realNum.text);
            // let check1 = bankcardCheck.getInstance.twocheck(this._realNum.text);
            // let check2 = bankcardCheck.getInstance.onecheck(this._realNum.text);
            // if(check1&&check2){//银行卡验证正确 请求
            if (check1) {
                BankCard_add.getInstance.sendHttp(UserData.getInstance.userId, this._realNum.text, this._bank.text, this._realName.text);
            }
            else {
                Alertpaner.getInstance.show("输入卡号格式不正确");
            }
        }
    };
    //银行卡号
    AddBankCard.prototype.sendText = function () {
        if (this._realNum.text == "") {
            this._realNum.text = "请输入您的卡号";
        }
        else if (this._realNum.text == "请输入您的卡号") {
            this._realNum.text = "";
        }
    };
    //再次确认卡号
    AddBankCard.prototype.sendText2 = function () {
        if (this._realNum2.text == "") {
            this._realNum2.text = "再次输入您的卡号";
        }
        else if (this._realNum2.text == "再次输入您的卡号") {
            this._realNum2.text = "";
        }
    };
    //开户银行
    AddBankCard.prototype.sendBank = function () {
        if (this._bank.text == "") {
            this._bank.text = "请填写开户银行";
        }
        else if (this._bank.text == "请填写开户银行") {
            this._bank.text = "";
        }
    };
    //开户姓名
    AddBankCard.prototype.sendName = function () {
        if (this._realName.text == "") {
            this._realName.text = "请填写开户姓名";
        }
        else if (this._realName.text == "请填写开户姓名") {
            this._realName.text = "";
        }
        else if (this._realName.text.length < 2 || this._realName.text.length > 10) {
            this._realName.text = "请填写开户姓名";
        }
    };
    AddBankCard.prototype.addInterception = function () {
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
    };
    AddBankCard.prototype.removeInterception = function () {
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
    };
    /**适配处理 */
    AddBankCard.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 1198);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    };
    AddBankCard.prototype.addScoll = function () {
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
    };
    AddBankCard.prototype.joinTop = function () {
        var topShape1 = new egret.Shape();
        this._mContain.addChild(topShape1);
        topShape1.graphics.beginFill(0xffffff);
        topShape1.graphics.drawRect(0, 20, GameMain.getInstance.StageWidth, 108);
        topShape1.graphics.endFill();
        var topShape2 = new egret.Shape();
        this._mContain.addChild(topShape2);
        topShape2.graphics.beginFill(0xffffff);
        topShape2.graphics.drawRect(0, 130, GameMain.getInstance.StageWidth, 108);
        topShape2.graphics.endFill();
        var topShape3 = new egret.Shape();
        this._mContain.addChild(topShape3);
        topShape3.graphics.beginFill(0xffffff);
        topShape3.graphics.drawRect(0, 240, GameMain.getInstance.StageWidth, 108);
        topShape3.graphics.endFill();
        var topShape4 = new egret.Shape();
        this._mContain.addChild(topShape4);
        topShape4.graphics.beginFill(0xffffff);
        topShape4.graphics.drawRect(0, 350, GameMain.getInstance.StageWidth, 108);
        topShape4.graphics.endFill();
        var topTitle1 = ToolMrg.getText(26, 20, 28, 0x333333);
        this._mContain.addChild(topTitle1);
        topTitle1.height = 108;
        topTitle1.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle1.text = "开户姓名";
        var topTitle2 = ToolMrg.getText(26, 130, 28, 0x333333);
        this._mContain.addChild(topTitle2);
        topTitle2.height = 108;
        topTitle2.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle2.text = "开户银行";
        var topTitle3 = ToolMrg.getText(26, 240, 28, 0x333333);
        this._mContain.addChild(topTitle3);
        topTitle3.height = 108;
        topTitle3.verticalAlign = egret.VerticalAlign.MIDDLE;
        topTitle3.text = "银行卡号";
        var topTitle4 = ToolMrg.getText(26, 350, 28, 0x333333);
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
    };
    return AddBankCard;
}(egret.DisplayObjectContainer));
__reflect(AddBankCard.prototype, "AddBankCard");
//# sourceMappingURL=AddBankCard.js.map