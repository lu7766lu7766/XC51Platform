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
/**充值页面 */
var RechargeWnd = (function (_super) {
    __extends(RechargeWnd, _super);
    function RechargeWnd() {
        var _this = _super.call(this) || this;
        _this.tipText = "充值金额不可提现，只能用于购彩，中奖后的奖金可以提现";
        _this.moneyStr = [10, 50, 100, 300, 500, 1000];
        /**充值金额index -1时金额为输入文本 */
        _this._index = 0;
        /**选中支付方式 */
        _this._wayIndex = 0;
        /**是否手动输入金额*/
        _this.decideInput = false;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._topUI = new TopUIWhite("充值", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._topUI.hideTxText();
        _this._moneyItem = new GHashMap();
        _this._infoItem = new GHashMap();
        _this._scroContain = new egret.DisplayObjectContainer();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._mContain.y = 138;
        _this._scroContain.addChild(_this._mContain);
        _this.addScoll();
        _this.init();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(RechargeWnd, "getInstance", {
        get: function () {
            if (RechargeWnd._mInstance == undefined)
                RechargeWnd._mInstance = new RechargeWnd();
            return RechargeWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    RechargeWnd.prototype.init = function () {
        var _this = this;
        //红色上层
        var topBJ = new egret.Bitmap();
        this._scroContain.addChild(topBJ);
        RES.getResByUrl("resource/assets/images/ui/cztop_mine@2x.png", function (e) { topBJ.$setBitmapData(e); }, this);
        this._useName = ToolMrg.getText(28, 18 + 10, 28, 0xffffff);
        this._scroContain.addChild(this._useName);
        this._balanceText = ToolMrg.getText(342 + 62, 27, 36, 0xffffff, 300);
        this._scroContain.addChild(this._balanceText);
        this._balanceText.textAlign = egret.HorizontalAlign.RIGHT;
        var yuan = ToolMrg.getText(704, 38, 20, 0xffffff);
        this._scroContain.addChild(yuan);
        yuan.text = "元";
        var nameTip = ToolMrg.getText(28, 76, 24, 0xffffff);
        this._scroContain.addChild(nameTip);
        nameTip.text = "当前用户";
        var moneyTip = ToolMrg.getText(630, 76, 24, 0xffffff);
        this._scroContain.addChild(moneyTip);
        moneyTip.text = "当前余额";
        var bj = new egret.Bitmap();
        this._mContain.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 750;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { bj.$setBitmapData(e); }, this);
        //top
        this._tipShape = new egret.Shape();
        // this.addChild(this._tipShape);
        this._tipShape.graphics.beginFill(0xFF7000, 0.06);
        this._tipShape.graphics.drawRect(0, -5, GameMain.getInstance.StageWidth, 56 + 5);
        this._tipShape.graphics.endFill();
        this._tipShape.touchEnabled = true;
        var imgTip = new egret.Bitmap();
        // this.addChild(imgTip);
        imgTip.x = 28,
            imgTip.y = 10;
        RES.getResByUrl("resource/assets/images/ui/tip_mine@2x.png", function (e) { imgTip.$setBitmapData(e); }, this);
        var text = ToolMrg.getText(76, 0, 24, 0xff7000);
        // this.addChild(text);
        text.height = 56;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.text = this.tipText;
        //_mContain
        var text1 = ToolMrg.getText(40, 32 + 6, 28, 0x333333);
        this._mContain.addChild(text1);
        text1.text = "请输入充值金额：";
        this._maxOfSmall = ToolMrg.getText(40 + text1.textWidth, 32 + 6, 28, 0xf72e52);
        this._mContain.addChild(this._maxOfSmall);
        var textLink = new egret.Bitmap();
        this._mContain.addChild(textLink);
        RES.getResByUrl("resource/assets/images/ui/kuang_mine@2x.png", function (e) { textLink.$setBitmapData(e); }, this);
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
        var payShape1 = new egret.Bitmap();
        this._payContain.addChild(payShape1);
        payShape1.width = GameMain.getInstance.StageWidth;
        payShape1.height = 10;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { payShape1.$setBitmapData(e); }, this);
        var payText = ToolMrg.getText(38, 10, 28, 0x333333);
        this._payContain.addChild(payText);
        payText.height = 80;
        payText.verticalAlign = egret.VerticalAlign.MIDDLE;
        payText.text = "实际支付：";
        this._payText = ToolMrg.getText(464 + 46, 10, 28, 0xf72e52, 200);
        this._payContain.addChild(this._payText);
        this._payText.height = 80;
        this._payText.textAlign = egret.HorizontalAlign.RIGHT;
        this._payText.verticalAlign = egret.VerticalAlign.MIDDLE;
        var payShape2 = new egret.Bitmap();
        this._payContain.addChild(payShape2);
        payShape2.y = 90;
        payShape2.width = GameMain.getInstance.StageWidth;
        payShape2.height = 10;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { payShape2.$setBitmapData(e); }, this);
        this._payWayContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._payWayContain);
        this._payWayContain.y = this._payContain.y + 100;
        var wayText = ToolMrg.getText(38, 38 + 5, 24, 0x333333);
        this._payWayContain.addChild(wayText);
        wayText.text = "选择支付方式";
        //底部按钮
        this._payBtn = new egret.Bitmap();
        this.addChild(this._payBtn);
        this._payBtn.touchEnabled = true;
        this._payBtn.y = GameMain.getInstance.StageHeight - this.y - 130;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._payBtn.$setBitmapData(e);
            _this._payBtn.x = (GameMain.getInstance.StageWidth - _this._payBtn.width) * 0.5;
        }, this);
        var btnText = ToolMrg.getText(0, this._payBtn.y + 32, 34, 0xffffff, GameMain.getInstance.StageWidth);
        this.addChild(btnText);
        btnText.textAlign = egret.HorizontalAlign.CENTER;
        btnText.text = "立即充值";
        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._downContain);
        this._downContain.y = this._payWayContain.y + 100;
        var downBJ = new egret.Bitmap();
        this._downContain.addChild(downBJ);
        downBJ.width = GameMain.getInstance.StageWidth;
        downBJ.height = 100;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { downBJ.$setBitmapData(e); }, this);
        // 0xF72E52 红色  0x333333 黑色  0x8b8b8b 黑色带灰
        var tipText = ToolMrg.getText(40, 0, 28, 0x8b8b8b);
        this._downContain.addChild(tipText);
        tipText.lineSpacing = 15;
        tipText.text = "因第三方充值问题，如遇充值10分钟后仍未到账的情\n况，请及时联系客服。";
    };
    /**获取当前充值金额 */
    RechargeWnd.prototype.changeCss = function () {
        for (var _i = 0, _a = this._moneyItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == this._index) {
                this._moneyItem.Gget(key).select();
            }
            else {
                this._moneyItem.Gget(key).noselect();
            }
        }
        this.setMoneyShowCss();
    };
    /**展示充值金额 */
    RechargeWnd.prototype.setMoneyShowCss = function () {
        //判断当前是输入还是按钮
        if (this._index != -1) {
            this._money = this.moneyStr[this._index];
            if (this.moneyStr[this._index] < this._data.small)
                this._moneyText.text = "" + this._data.small;
            else if (this.moneyStr[this._index] > this._data.max)
                this._moneyText.text = "" + this._data.max;
            else
                this._moneyText.text = this.moneyStr[this._index] + "";
            // this._payText.text = this._money+"元";
        }
        else {
            var num = void 0;
            if (this._moneyText.text == "" || this._moneyText.text == "请输入充值金额") {
                num = 0;
            }
            else {
                num = Number(this._moneyText.text);
            }
            this._money = num;
            this.decideInput = true;
        }
        this._payText.text = this._money + "元";
    };
    /**支付方式改变，获取当前支付方式数据对象 需回调当前输入判断方法*/
    RechargeWnd.prototype.changeWayInfo = function () {
        for (var _i = 0, _a = this._infoItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == this._wayIndex) {
                this._infoItem.Gget(key).select();
                this._data = this._infoItem.Gget(key).getData();
            }
            else {
                this._infoItem.Gget(key).noselect();
            }
        }
        this.moneyStr = this._data.money;
        var obj;
        //充值按钮选择
        for (var i = 0; i < this.moneyStr.length; i++) {
            if (i > 6)
                break;
            if (this._moneyItem.GhasKey(i)) {
                obj = this._moneyItem.Gget(i);
            }
            else {
                obj = new RCmoney_info();
                this._moneyItem.Gput(i, obj);
            }
            this._moneyItem.Gput(i, obj);
            obj.aa(i, this.moneyStr[i]);
            obj.addEvent();
            if (i < 3) {
                obj.x = 40 + 234 * i;
                obj.y = 200;
            }
            else {
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
        this._maxOfSmall.text = "\u5145\u503C\u8303\u56F4" + this._data.small + "\u5143~" + this._data.max + "\u5143";
    };
    RechargeWnd.prototype.changeNum = function (num) {
        this._index = num;
        this.clearMoneyText();
        this.changeCss();
    };
    RechargeWnd.prototype.changeWayNum = function (num) {
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
    };
    RechargeWnd.prototype.updata = function () {
        var item = RCway_Mrg.getInstance.getItem();
        var objheight = 92;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._infoItem.GhasKey(key)) {
                obj = this._infoItem.Gget(key);
            }
            else {
                obj = new RCway_info();
                this._infoItem.Gput(key, obj);
            }
            obj.aa(item.Gget(key), key);
            obj.addEvent();
            obj.y = objheight;
            objheight = objheight + obj.height;
            if (obj.parent == undefined)
                this._payWayContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._infoItem, item);
        this._downContain.y = this._payWayContain.y + objheight;
        this.changeWayInfo();
        if (this.decideInput == false) {
            this._money = this._data.money[0];
        }
        this._moneyText.text = "" + this._money;
        this._payText.text = this._money + "元";
    };
    RechargeWnd.prototype.setUseNews = function () {
        this._useName.text = UserData.getInstance.userName;
        this._balanceText.text = UserData.getInstance.getGold() + "";
    };
    RechargeWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addEvent();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_payList, this.updata, this);
        // this.updata();
        PayPL.getInstance.sendHttp();
        this.setUseNews();
    };
    RechargeWnd.prototype.hide = function () {
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
    };
    RechargeWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._tipShape) {
        }
        else if (e.target == this._payBtn) {
            var num = this._money;
            if (this._index == -1) {
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
            PayGo.getInstance.sendHttp(this._money, this._data._type, this._data._type);
            // if(window["go2Url"]) {
            //     window["go2Url"]("http://baidu.com");
            // }
        }
    };
    RechargeWnd.prototype.addEvent = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._moneyText.addEventListener(egret.Event.FOCUS_IN, this.focusIn, this);
        this._moneyText.addEventListener(egret.Event.FOCUS_OUT, this.focusOut, this);
        this._moneyText.addEventListener(egret.Event.CHANGE, this.focusChange, this);
    };
    RechargeWnd.prototype.removeEvent = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._payBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._moneyText.removeEventListener(egret.Event.FOCUS_IN, this.focusIn, this);
        this._moneyText.removeEventListener(egret.Event.FOCUS_OUT, this.focusOut, this);
        this._moneyText.removeEventListener(egret.Event.CHANGE, this.focusChange, this);
        for (var _i = 0, _a = this._moneyItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._moneyItem.Gget(key).removeEvent();
        }
        for (var _b = 0, _c = this._infoItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._infoItem.Gget(key).removeEvent();
        }
    };
    RechargeWnd.prototype.clearMoneyText = function () {
        this._moneyText.text = "请输入充值金额";
        this._moneyText.textColor = 0xcacaca;
    };
    //点入
    RechargeWnd.prototype.focusIn = function () {
        if (this._moneyText.text == "请输入充值金额") {
            this._moneyText.text = "";
        }
        this._index = -1;
        this.changeCss();
        this._moneyText.textColor = 0x333333;
    };
    //浮点离开
    RechargeWnd.prototype.focusOut = function () {
        if (this._moneyText.text == "") {
            this._moneyText.text = "请输入充值金额";
            this._moneyText.textColor = 0xcacaca;
        }
    };
    RechargeWnd.prototype.focusChange = function () {
        var num = Number(this._moneyText.text);
        if (num > this._data.max) {
            this._moneyText.text = this._data.max + "";
        }
        this.setMoneyShowCss();
    };
    /**适配处理 */
    RechargeWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    RechargeWnd.prototype.addScoll = function () {
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
    };
    RechargeWnd.prototype.getMax = function () {
        return this._data.max;
    };
    RechargeWnd.prototype.getSmall = function () {
        return this._data.small;
    };
    return RechargeWnd;
}(egret.DisplayObjectContainer));
__reflect(RechargeWnd.prototype, "RechargeWnd");
/**金额按钮 */
var RCmoney_info = (function (_super) {
    __extends(RCmoney_info, _super);
    function RCmoney_info() {
        var _this = _super.call(this) || this;
        _this._isEven = false;
        _this.touchEnabled = true;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@2x.png", function (e) { }, _this);
        RES.getResByUrl("resource/assets/images/ui/czxz_mine@2x.png", function (e) { }, _this);
        _this._content = ToolMrg.getText(0, 0, 28, 0x333333, 202);
        _this.addChild(_this._content);
        _this._content.height = 80;
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        _this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    RCmoney_info.prototype.aa = function (id, str) {
        this._id = id;
        this._money = str;
        this._content.text = str + "元";
    };
    RCmoney_info.prototype.select = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/czxz_mine@2x.png", function (e) { _this._img.$setBitmapData(e); }, this);
        this._content.textColor = 0xf72e52;
    };
    RCmoney_info.prototype.noselect = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@2x.png", function (e) { _this._img.$setBitmapData(e); }, this);
        this._content.textColor = 0x333333;
    };
    RCmoney_info.prototype.touchDown = function () {
        if (this._money > RechargeWnd.getInstance.getMax()) {
            Alertpaner.getInstance.show("不能高于所选最大充值金额");
            return;
        }
        if (this._money < RechargeWnd.getInstance.getSmall()) {
            Alertpaner.getInstance.show("不能低于所选最少充值金额");
            return;
        }
        RechargeWnd.getInstance.changeNum(this._id);
    };
    RCmoney_info.prototype.addEvent = function () {
        if (!this._isEven) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEven = true;
        }
    };
    RCmoney_info.prototype.removeEvent = function () {
        if (this._isEven) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEven = false;
        }
    };
    return RCmoney_info;
}(egret.DisplayObjectContainer));
__reflect(RCmoney_info.prototype, "RCmoney_info");
//# sourceMappingURL=RechargeWnd.js.map