/**充值页面 */
class RechargeWnd extends egret.DisplayObjectContainer {
    private static _mInstance: RechargeWnd;
    public static get getInstance(): RechargeWnd {
        if (RechargeWnd._mInstance == undefined)
            RechargeWnd._mInstance = new RechargeWnd();
        return RechargeWnd._mInstance;
    }

    private _topUI: TopUIWhite;
    private _return: egret.Shape;


    private _mContain: egret.DisplayObjectContainer;
    private _scroContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;
    /**实际支付 */
    private _payContain: egret.DisplayObjectContainer;
    private _payText: egret.TextField;
    /**支付方式 */
    private _payWayContain: egret.DisplayObjectContainer;
    /**下方提示 */
    private _downContain: egret.DisplayObjectContainer;

    /**支付按钮 */
    private _payBtn: egret.Bitmap;

    private _tipShape: egret.Shape;
    private tipText = "充值金额不可提现，只能用于购彩，中奖后的奖金可以提现";
    private moneyStr = [10, 50, 100, 300, 500, 1000];
    /**充值按钮子类 */
    private _moneyItem: GHashMap<RCmoney_info>;

    /**用户名 */
    private _useName: egret.TextField;
    /**余额 */
    private _moneyText: egret.TextField;

    /**选择支付最大最小值 */
    private _maxOfSmall: egret.TextField;
    /**输入文本框 */
    private _balanceText: egret.TextField;
    /**当前需要充值金额 */
    private _money: number;
    /**充值金额index -1时金额为输入文本 */
    private _index = 0;

    /**选中支付方式 */
    private _wayIndex = 0;
    /**当前选中支付方式data对象 */
    private _data: RCway_Data;
    /**是否手动输入金额*/
    private decideInput: boolean = false;

    /**支付方式子类 */
    private _infoItem: GHashMap<RCway_info>;

    // currentClass
    private _currentClass: string;
    private _classBtnContainer: egret.DisplayObjectContainer
    private _classObjContainer: Array<PayWay> = []
    private _payWayBtnContainer: egret.DisplayObjectContainer
    private _payWayObjContainer: Array<RCway_info> = []

    constructor() {
        super();

        this.y = 96 + GameValue.adaptationScreen;
        this.touchEnabled = true;

        this._topUI = new TopUIWhite("充值", -this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._topUI.hideTxText();

        this._moneyItem = new GHashMap<RCmoney_info>();
        this._infoItem = new GHashMap<RCway_info>();

        this._scroContain = new egret.DisplayObjectContainer();
        this._mContain = new egret.DisplayObjectContainer();
        this._mContain.y = 138;
        this._scroContain.addChild(this._mContain);

        this.addScoll();

        this.init();
        this.setDB();
    }

    private init(): void {

        //红色上层
        let topBJ = new egret.Bitmap();
        this._scroContain.addChild(topBJ);
        RES.getResByUrl("resource/assets/images/ui/cztop_mine@2x.png", (e) => { topBJ.$setBitmapData(e); }, this);

        this._useName = ToolMrg.getText(28, 18 + 10, 28, 0xffffff);
        this._scroContain.addChild(this._useName);

        this._balanceText = ToolMrg.getText(342 + 62, 27, 36, 0xffffff, 300);
        this._scroContain.addChild(this._balanceText);
        this._balanceText.textAlign = egret.HorizontalAlign.RIGHT;

        let yuan = ToolMrg.getText(704, 38, 20, 0xffffff);
        this._scroContain.addChild(yuan);
        yuan.text = "元";

        let nameTip = ToolMrg.getText(28, 76, 24, 0xffffff);
        this._scroContain.addChild(nameTip);
        nameTip.text = "当前用户";

        let moneyTip = ToolMrg.getText(630, 76, 24, 0xffffff);
        this._scroContain.addChild(moneyTip);
        moneyTip.text = "当前余额";

        let bj = new egret.Bitmap();
        this._mContain.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 750;
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { bj.$setBitmapData(e); }, this);
        //top
        this._tipShape = new egret.Shape();
        // this.addChild(this._tipShape);
        this._tipShape.graphics.beginFill(0xFF7000, 0.06);
        this._tipShape.graphics.drawRect(0, -5, GameMain.getInstance.StageWidth, 56 + 5);
        this._tipShape.graphics.endFill();
        this._tipShape.touchEnabled = true;

        let imgTip = new egret.Bitmap();
        // this.addChild(imgTip);
        imgTip.x = 28,
            imgTip.y = 10;
        RES.getResByUrl("resource/assets/images/ui/tip_mine@2x.png", (e) => { imgTip.$setBitmapData(e); }, this);

        let text = ToolMrg.getText(76, 0, 24, 0xff7000);
        // this.addChild(text);
        text.height = 56;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.text = this.tipText;

        //_mContain
        let text1 = ToolMrg.getText(40, 32 + 6, 28, 0x333333);
        this._mContain.addChild(text1);
        text1.text = "请输入充值金额：";

        this._maxOfSmall = ToolMrg.getText(40 + text1.textWidth, 32 + 6, 28, 0xf72e52);
        this._mContain.addChild(this._maxOfSmall);

        let textLink = new egret.Bitmap();
        this._mContain.addChild(textLink);
        RES.getResByUrl("resource/assets/images/ui/kuang_mine@2x.png", (e) => { textLink.$setBitmapData(e); }, this);
        textLink.x = 40;
        textLink.y = 92;

        this._moneyText = ToolMrg.getText(80, 92, 28, 0x999999, 600);
        this._moneyText.height = 80;
        this._mContain.addChild(this._moneyText);
        this._moneyText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moneyText.text = "";
        this._moneyText.type = egret.TextFieldType.INPUT;
        this._moneyText.inputType = egret.TextFieldInputType.TEXT;
        this._moneyText.touchEnabled = true;


        this._payContain = new egret.DisplayObjectContainer();
        this._payContain.y = 300 + 120;
        // this._payContain.y = 100+120;
        this._mContain.addChild(this._payContain);

        let payShape1 = new egret.Bitmap();
        this._payContain.addChild(payShape1);
        payShape1.width = GameMain.getInstance.StageWidth;
        payShape1.height = 10;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { payShape1.$setBitmapData(e); }, this);

        let payText = ToolMrg.getText(38, 10, 28, 0x333333);
        this._payContain.addChild(payText);
        payText.height = 80;
        payText.verticalAlign = egret.VerticalAlign.MIDDLE;
        payText.text = "实际支付：";

        this._payText = ToolMrg.getText(464 + 46, 10, 28, 0xf72e52, 200);
        this._payContain.addChild(this._payText);
        this._payText.height = 80;
        this._payText.textAlign = egret.HorizontalAlign.RIGHT;
        this._payText.verticalAlign = egret.VerticalAlign.MIDDLE;

        let payShape2 = new egret.Bitmap();
        this._payContain.addChild(payShape2);
        payShape2.y = 90;
        payShape2.width = GameMain.getInstance.StageWidth;
        payShape2.height = 10;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { payShape2.$setBitmapData(e); }, this);

        this._payWayContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._payWayContain);
        this._payWayContain.y = this._payContain.y + 100;

        let wayText = ToolMrg.getText(38, 38 + 5, 24, 0x333333);
        this._payWayContain.addChild(wayText);
        wayText.text = "选择支付方式";

        this._classBtnContainer = new egret.DisplayObjectContainer();
        this._classBtnContainer.y = 70;
        this._classBtnContainer.x = 30
        this._classBtnContainer.width = GameMain.getInstance.StageWidth - 60
        this._payWayContain.addChild(this._classBtnContainer);


        this._payWayBtnContainer = new egret.DisplayObjectContainer();
        // this._payWayBtnContainer.y = 70;
        // this._payWayBtnContainer.x = 0
        this._payWayBtnContainer.width = GameMain.getInstance.StageWidth - 60
        this._payWayContain.addChild(this._payWayBtnContainer);

        let warning = new egret.Bitmap();
        this._payWayBtnContainer.addChild(warning);
        warning.x = 42;
        warning.width = 27;
        warning.height = 27;
        RES.getResByUrl("resource/assets/images/pay/ic_warning.png", (e) => { warning.$setBitmapData(e); }, this);
        let wayText2 = ToolMrg.getText(75, 2, 24, 0xbbbbbb);
        this._payWayBtnContainer.addChild(wayText2);
        wayText2.text = "选择支付方式";
        let wayText3 = ToolMrg.getText(220, 2, 24, 0xe80707);
        this._payWayBtnContainer.addChild(wayText3);
        wayText3.text = "如有充值未到帐请联系【在线客服】";
        

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
        btnText.text = "立即充值";

        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._downContain);
        this._downContain.y = this._payWayContain.y + 100;

        let downBJ = new egret.Bitmap();
        this._downContain.addChild(downBJ);
        downBJ.width = GameMain.getInstance.StageWidth;
        downBJ.height = 100;
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { downBJ.$setBitmapData(e); }, this);

        // 0xF72E52 红色  0x333333 黑色  0x8b8b8b 黑色带灰
        let tipText = ToolMrg.getText(40, 0, 28, 0x8b8b8b);
        this._downContain.addChild(tipText);
        tipText.lineSpacing = 15;
        tipText.text = "因第三方充值问题，如遇充值10分钟后仍未到账的情\n况，请及时联系客服。";
    }

    /**获取当前充值金额 */
    private changeCss(): void {
        for (let key of this._moneyItem.keys) {

            if (key == this._index) {
                this._moneyItem.Gget(key).select();
            } else {
                this._moneyItem.Gget(key).noselect();
            }
        }

        this.setMoneyShowCss();
    }

    /**展示充值金额 */
    private setMoneyShowCss(): void {
        //判断当前是输入还是按钮
        if (this._index != -1) {//按钮
            this._money = this.moneyStr[this._index];
            if (this.moneyStr[this._index] < this._data.small)
                this._moneyText.text = "" + this._data.small;
            else if (this.moneyStr[this._index] > this._data.max)
                this._moneyText.text = "" + this._data.max;
            else
                this._moneyText.text = this.moneyStr[this._index] + "";
            // this._payText.text = this._money+"元";
        } else {//输入
            let num: number;
            if (this._moneyText.text == "" || this._moneyText.text == "请输入充值金额") {
                num = 0;
            } else {
                num = Number(this._moneyText.text);
            }
            this._money = num;
            this.decideInput = true;
        }
        this._payText.text = this._money + "元";
    }

    /**支付方式改变，获取当前支付方式数据对象 需回调当前输入判断方法*/
    private changeWayInfo(): void {
        for (let key of this._infoItem.keys) {
            if (key == this._wayIndex) {
                this._infoItem.Gget(key).select();
                this._data = this._infoItem.Gget(key).getData();
            } else {
                this._infoItem.Gget(key).noselect();
            }
        }
        this.moneyStr = this._data.money;
        let obj: RCmoney_info;
        //充值按钮选择
        for (let i = 0; i < this.moneyStr.length; i++) {
            if (i > 6) break;
            if (this._moneyItem.GhasKey(i)) {
                obj = this._moneyItem.Gget(i);
            } else {
                obj = new RCmoney_info();
                this._moneyItem.Gput(i, obj);
            }
            this._moneyItem.Gput(i, obj);
            obj.aa(i, this.moneyStr[i]);
            obj.addEvent();
            if (i < 3) {
                obj.x = 40 + 234 * i;
                obj.y = 200;
            } else {
                obj.x = 40 + 234 * (i - 3);
                obj.y = 300;
            }

            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofArray(this._moneyItem, this.moneyStr);

        if (this._moneyItem.GhasKey(this._index))
            this._index = 0;

        this.changeCss();
        this._maxOfSmall.text = `充值范围${this._data.small}元~${this._data.max}元`;
    }

    public changeNum(num: number): void {
        this._index = num;
        this.clearMoneyText();
        this.changeCss();
    }

    public changeWayNum(num: number): void {
        this._wayIndex = num;
        this.changeWayInfo();

        // if(this._money < this._data.small) {
        if (this.decideInput == false) {
            this._money = this._data.money[0];
        }
        this._moneyText.text = "" + this._money;
        this._payText.text = this._money + "元";
        // } else if(this._money > this._data.max) {
        //     this._money = this._data.max;
        //     this._moneyText.text = ""+this._money;
        //     this._payText.text = this._money+"元";
        // }
    }

    private updata(): void {
        let item = RCway_Mrg.getInstance.getItem()
        this._currentClass = item[item.keys[0]].class

        // draw class btn
        const classList = RCway_Mrg.getInstance.getItemClassList();
        let lastRWx = 0, rows = 0
        classList.forEach((className, index) => {
            let payWay = new PayWay(className)
            this._classBtnContainer.addChild(payWay)
            if ((lastRWx + payWay.width) > GameMain.getInstance.StageWidth) {
                lastRWx = 0
                rows++
            }
            payWay.x = lastRWx
            payWay.y = rows * (payWay.height + 20)
            payWay.touchEnabled = true
            // payWay.width = (this._classBtnContainer.width - 30) / 4
            // payWay.addEventListener(egret.TouchEvent.TOUCH_TAP, e => {
            //     console.log(className, payWay.getClass())
            // }, this)
            payWay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeClass, this)
            this._classObjContainer.push(payWay)
            if (className === this._currentClass) {
                payWay.select()
            }
            lastRWx = payWay.x + payWay.width + 15
        })
        this.drawPayWay()
    }

    private drawPayWay() {
        let objheight:number = 20
        let item = RCway_Mrg.getInstance.getItem()
        // draw payWay
        this._payWayBtnContainer.y = this._classBtnContainer.y + this._classBtnContainer.height +20
        for (let key of item.keys) {
            let obj: RCway_info;
            const realItem = item[key]
            if (this._currentClass === realItem.class) {
                if (this._infoItem.GhasKey(key)) {
                    obj = this._infoItem.Gget(key);
                } else {
                    obj = new RCway_info();
                    this._infoItem.Gput(key, obj);
                }
                obj.aa(item.Gget(key), key);
                obj.addEvent();
                obj.y = objheight + 20;
                objheight += obj.height;
                if (obj.parent == undefined) {
                    this._payWayBtnContainer.addChild(obj);
                }    
                this._payWayObjContainer.push(obj)
            }
        }
        
        ToolMrg.upItemofGHashMap(this._infoItem, item);

        this._downContain.y = this._payWayContain.y + this._payWayContain.height + 60;

        this.changeWayInfo();
        if (this.decideInput == false) {
            this._money = this._data.money[0];
        }
        this._moneyText.text = "" + this._money;
        this._payText.text = this._money + "元";
    }

    private changeClass(e) {
        this._classObjContainer.forEach(classObj => {
            classObj.noselect()
        })
        this._payWayObjContainer.forEach(payWay => {
            this._payWayBtnContainer.removeChild(payWay)
        })
        this._payWayObjContainer = []
        e.target.select()
        this._currentClass = e.target.getClass()
        this.changeWayNum(this.getWayNum(this._currentClass))
        this.drawPayWay()
    }

    private getWayNum(className) {
        let item = RCway_Mrg.getInstance.getItem()
        let res = 0
        for(const key of item.keys) {
            if(item[key].class === className) {
                res = +key
                break
            }
        }
        return res
    }

    private setUseNews(): void {
        this._useName.text = UserData.getInstance.userName;
        this._balanceText.text = UserData.getInstance.getGold() + "";
    }

    public show(): void {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addEvent();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_payList, this.updata, this);
        // this.updata();
        PayPL.getInstance.sendHttp();
        this.setUseNews();
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeEvent();
            this._index = 0;
            this._wayIndex = 0;
            this._data = null;
            this._money = 0;
        }
        this.decideInput = false;
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_payList, this.updata, this);
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._return) {
            this.hide();
        } else if (e.target == this._tipShape) {//头部提示

        } else if (e.target == this._payBtn) {//支付按钮
            let num = this._money;
            if (this._index == -1) {//当前为
                if (this._moneyText.text == "请输入充值金额") {
                    Alertpaner.getInstance.show("请输入金额");
                    return;
                }
                if (this._money < this._data.small) {
                    Alertpaner.getInstance.show("不能低于所选最少充值金额");
                    return;
                }
                if (!bankcardCheck.getInstance.checkAllNum(this._moneyText.text)) {
                    Alertpaner.getInstance.show("充值金额必须为整数");
                    return;
                }
            }
            // if(this._data._type==1){
            //     Alertpaner.getInstance.show(`支付宝充值:${num}元`);
            // }else if(this._data._type==2){
            //     Alertpaner.getInstance.show(`微信充值:${num}元`);
            // }else if(this._data._type==3){
            //     Alertpaner.getInstance.show(`银联充值:${num}元`);
            // }
            if (this._money < this._data.small) {
                Alertpaner.getInstance.show("不能低于所选最少充值金额");
                return;
            }
            if (this._money > this._data.max) {
                Alertpaner.getInstance.show("不能高于所选最大充值金额");
                return;
            }
            if (this._data.class === 'BankPay') {
                BankCardDepositWnd.getInstance.money = this._money
                BankCardInfoRequest.getInstance.sendHttp(this._data.bank_card_id);
            } else {
                PayGo.getInstance.sendHttp(this._money, this._data._type, this._data._type);
            }
            // if(window["go2Url"]) {
            //     window["go2Url"]("http://baidu.com");
            // }
        }
    }

    private addEvent(): void {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._moneyText.addEventListener(egret.Event.FOCUS_IN, this.focusIn, this);
        this._moneyText.addEventListener(egret.Event.FOCUS_OUT, this.focusOut, this);
        this._moneyText.addEventListener(egret.Event.CHANGE, this.focusChange, this);
    }

    private removeEvent(): void {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._moneyText.removeEventListener(egret.Event.FOCUS_IN, this.focusIn, this);
        this._moneyText.removeEventListener(egret.Event.FOCUS_OUT, this.focusOut, this);
        this._moneyText.removeEventListener(egret.Event.CHANGE, this.focusChange, this);
        for (let key of this._moneyItem.keys)
            this._moneyItem.Gget(key).removeEvent();
        for (let key of this._infoItem.keys)
            this._infoItem.Gget(key).removeEvent();
        this._classObjContainer.forEach(payWay => {
            payWay.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeClass, this)
        })
    }

    private clearMoneyText(): void {
        this._moneyText.text = "请输入充值金额";
        this._moneyText.textColor = 0xcacaca;
    }
    //点入
    private focusIn(): void {
        if (this._moneyText.text == "请输入充值金额") {
            this._moneyText.text = "";
        }
        this._index = -1
        this.changeCss();
        this._moneyText.textColor = 0x333333;
    }
    //浮点离开
    private focusOut(): void {
        if (this._moneyText.text == "") {
            this._moneyText.text = "请输入充值金额";
            this._moneyText.textColor = 0xcacaca;
        }
    }

    private focusChange(): void {
        let num = Number(this._moneyText.text);
        if (num > this._data.max) {
            this._moneyText.text = this._data.max + "";
        }
        this.setMoneyShowCss();
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
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

    public getMax(): number {
        return this._data.max;
    }

    public getSmall(): number {
        return this._data.small;
    }
}

/**金额按钮 */
class RCmoney_info extends egret.DisplayObjectContainer {

    private _img: egret.Bitmap;
    private _content: egret.TextField;

    private _id: number;
    constructor() {
        super();
        this.touchEnabled = true;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@2x.png", (e) => { }, this);
        RES.getResByUrl("resource/assets/images/ui/czxz_mine@2x.png", (e) => { }, this);

        this._content = ToolMrg.getText(0, 0, 28, 0x333333, 202);
        this.addChild(this._content);
        this._content.height = 80;
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        this._content.verticalAlign = egret.VerticalAlign.MIDDLE;

    }

    private _money: number;
    public aa(id, str: number): void {
        this._id = id;
        this._money = str;
        this._content.text = str + "元";
    }

    public select(): void {
        RES.getResByUrl("resource/assets/images/ui/czxz_mine@2x.png", (e) => { this._img.$setBitmapData(e); }, this);
        this._content.textColor = 0xf72e52;
    }

    public noselect(): void {
        RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@2x.png", (e) => { this._img.$setBitmapData(e); }, this);
        this._content.textColor = 0x333333;
    }

    private touchDown(): void {
        if (this._money > RechargeWnd.getInstance.getMax()) {//超出最大值
            Alertpaner.getInstance.show("不能高于所选最大充值金额");
            return;
        }
        if (this._money < RechargeWnd.getInstance.getSmall()) {//超出最小值
            Alertpaner.getInstance.show("不能低于所选最少充值金额");
            return;
        }
        RechargeWnd.getInstance.changeNum(this._id);
    }

    private _isEven = false;
    public addEvent(): void {
        if (!this._isEven) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEven = true;
        }
    }

    public removeEvent(): void {
        if (this._isEven) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEven = false;
        }
    }

}