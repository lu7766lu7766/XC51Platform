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
/**方案详情 */
var DmDetails = (function (_super) {
    __extends(DmDetails, _super);
    function DmDetails() {
        var _this = _super.call(this) || this;
        /**0方案详情 1跟单用户 */
        _this._index = 0;
        _this._mData = new NumKeyData();
        _this._mPayData = new PaymentData();
        _this.y = GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("方案详情", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._tx = new egret.Bitmap();
        _this._mContain.addChild(_this._tx);
        _this._tx.touchEnabled = true;
        _this._tx.width = 84;
        _this._tx.height = 84;
        _this._tx.x = 28;
        _this._tx.y = 30;
        _this._txName = ToolMrg.getText(130, 24, 32, 0x333333);
        _this._mContain.addChild(_this._txName);
        _this._vipBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._vipBtn);
        _this._vipBtn.y = 30;
        _this._vipBtn.x = 360;
        RES.getResByUrl("resource/assets/images/ui/hydj_expert@2x.png", function (e) { _this._vipBtn.$setBitmapData(e); }, _this);
        _this._LvText = ToolMrg.getText(150, 30, 16, 0xffffff);
        _this._mContain.addChild(_this._LvText);
        _this._LvText.height = 24;
        _this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._LvText.text = "Lv 1";
        // this._rate = ToolMrg.getText(378+128,22,48,0xf72e52,200);
        // this._mContain.addChild(this._rate);
        // this._rate.textAlign = egret.HorizontalAlign.RIGHT;
        _this._rate = FontMgr.getText(FontMgr.FONT_3);
        _this._mContain.addChild(_this._rate);
        _this._rate.x = 378 + 128;
        _this._rate.y = 30;
        _this._rate.width = 200;
        _this._rate.textAlign = egret.HorizontalAlign.RIGHT;
        _this._rateA = ToolMrg.getText(708, 46, 20, 0xf72e52);
        _this._mContain.addChild(_this._rateA);
        _this._rateA.text = "%";
        _this._rateText = ToolMrg.getText(622, 78, 20, 0xF72E52);
        _this._mContain.addChild(_this._rateText);
        _this._rateText.text = "命中率";
        _this.statistics = new DD_Statistics();
        _this._mContain.addChild(_this.statistics);
        _this.statistics.y = 86;
        _this.statistics.x = 130;
        var topShape = new egret.Shape();
        _this._mContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0, 142, 750, 1.5);
        topShape.graphics.endFill();
        _this._typeImg = new egret.Bitmap();
        _this._mContain.addChild(_this._typeImg);
        _this._typeImg.width = 32;
        _this._typeImg.height = 32;
        _this._typeImg.x = 28;
        _this._typeImg.y = 170;
        _this._typeText = ToolMrg.getText(66, 166, 28, 0x333333);
        _this._mContain.addChild(_this._typeText);
        _this._typeText.height = 50;
        _this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._guoBJ = new egret.Bitmap();
        _this._mContain.addChild(_this._guoBJ);
        _this._guoBJ.x = 196;
        _this._guoBJ.y = 174;
        RES.getResByUrl("resource/assets/images/ui/czbg_expert@2x.png", function (e) { _this._guoBJ.$setBitmapData(e); }, _this);
        _this._moneyTake = ToolMrg.getText(196, 174, 20, 0xFF7000, 72);
        _this._mContain.addChild(_this._moneyTake);
        _this._moneyTake.height = 24;
        _this._moneyTake.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._moneyTake.textAlign = egret.HorizontalAlign.CENTER;
        // this._moneyTake.text = "过关方式：";
        _this._content = ToolMrg.getText(28, 226, 24, 0x333333, 694);
        _this._mContain.addChild(_this._content);
        _this._content.lineSpacing = 14;
        _this._zgje = ToolMrg.getText(28, 268, 24, 0x333333);
        _this._mContain.addChild(_this._zgje);
        _this._zgje.height = 34;
        _this._zgje.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._zgje.text = "自购金额：";
        _this._gdje = ToolMrg.getText(368, 268, 24, 0x333333);
        _this._mContain.addChild(_this._gdje);
        _this._gdje.height = 34;
        _this._gdje.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._gdje.text = "跟单金额：";
        _this._yjhb = ToolMrg.getText(28, 310, 24, 0x333333);
        _this._mContain.addChild(_this._yjhb);
        _this._yjhb.height = 34;
        _this._yjhb.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._yjhb.text = "预计回报：";
        _this._gdyj = ToolMrg.getText(368, 310, 24, 0x333333);
        _this._mContain.addChild(_this._gdyj);
        _this._gdyj.height = 34;
        _this._gdyj.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._gdyj.text = "跟单佣金：";
        _this._endTime = ToolMrg.getText(308 + 168, 174, 20, 0x999999, 250);
        _this._mContain.addChild(_this._endTime);
        _this._endTime.textAlign = egret.HorizontalAlign.RIGHT;
        _this._gdyjImg = new egret.Bitmap();
        _this._mContain.addChild(_this._gdyjImg);
        RES.getResByUrl("resource/assets/images/ui/wt_expert@2x.png", function (e) {
            _this._gdyjImg.$setBitmapData(e);
        }, _this);
        _this._gdyjImg.touchEnabled = true;
        // this._gdyjImg.visible = false;
        _this._gdyjImg.x = 526;
        _this._gdyjImg.y = 314;
        _this._staticImg = new egret.Bitmap();
        _this._mContain.addChild(_this._staticImg);
        _this._staticImg.x = 546;
        _this._staticImg.y = 120;
        _this._staticText = ToolMrg.getText(519, 126, 20, 0xf72e52, 150);
        _this._mContain.addChild(_this._staticText);
        _this._staticText.height = 94;
        _this._staticText.textAlign = egret.HorizontalAlign.CENTER;
        _this._staticText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._staticText.skewY = -23.5;
        _this._staticText.skewX = -23.5;
        _this.joinCenter();
        _this.joinDown();
        _this._share = new egret.Bitmap();
        _this.addChild(_this._share);
        _this._share.y = 28 + GameValue.adaptationScreen;
        _this._share.x = 670;
        RES.getResByUrl("resource/assets/images/ui/share_nav@2x.png", function (e) { _this._share.$setBitmapData(e); }, _this);
        _this._share.touchEnabled = true;
        _this.setDB();
        return _this;
    }
    DmDetails.prototype.updata = function (data) {
        var _this = this;
        if (this._oid != data.oid)
            return;
        this._data = data;
        if (data.txSrc == undefined || data.txSrc == "")
            RES.getResByUrl("resource/assets/images/ui/user1_default.png", function (e) { _this._tx.$setBitmapData(e); }, this);
        else
            // LoadNetPic.getLoadNetPic.loadPic(`${data.txSrc}`,(e)=>{this._tx.$setTexture(e); },this);
            RES.getResByUrl("resource/assets/images/ui/tou" + data.txSrc + ".png", function (e) { _this._tx.$setTexture(e); }, this);
        this.statistics.updata(data.ji, data.zh, data.endArr);
        this._txName.text = data.txName;
        this._vipBtn.x = this._txName.x + this._txName.textWidth + 8;
        this._LvText.x = this._txName.x + this._txName.textWidth + 8 + 30;
        this._LvText.text = "vip " + data.vip;
        this._endTime.text = "\u622A\u6B62 " + ToolMrg.getTime7(data.endTime);
        var str = "";
        if (data._type == 1) {
            str = "单关";
        }
        else {
            str = data._type + "\u4E321";
        }
        this._moneyTake.text = str;
        data.model;
        if (data._typeStatic == 1) {
            this._typeText.text = "竞足串关";
            RES.getResByUrl("resource/assets/images/ui/jzcg_home@2x.png", function (e) { _this._typeImg.$setBitmapData(e); }, this);
        }
        else if (data._typeStatic == 2) {
            this._typeText.text = "竞足单关";
            RES.getResByUrl("resource/assets/images/ui/jzdg_home@2x.png", function (e) { _this._typeImg.$setBitmapData(e); }, this);
        }
        else if (data._typeStatic == 4) {
            this._typeText.text = "竞篮单关";
            RES.getResByUrl("resource/assets/images/ui/jldg_home@2x.png", function (e) { _this._typeImg.$setBitmapData(e); }, this);
        }
        else if (data._typeStatic == 3) {
            this._typeText.text = "竞篮串关";
            RES.getResByUrl("resource/assets/images/ui/jlcg_home@2x.png", function (e) { _this._typeImg.$setBitmapData(e); }, this);
        }
        var toF = Number(data.lv);
        this._rate.text = toF == 0 ? "0.00" : ToolMrg.getDecimal(toF, 2).toFixed(2);
        // this._rate.text = data.lv;
        this._content.text = ToolMrg.nameMode2(60, data.declare);
        ;
        this._money = ToolMrg.getDecimal(data.total / 100 / data._b, 2);
        this._multiple = 1;
        this._zgje.y = this._content.y + this._content.textHeight + 10;
        this._yjhb.y = this._content.y + this._content.textHeight + 52;
        this._gdje.y = this._content.y + this._content.textHeight + 10;
        this._gdyj.y = this._content.y + this._content.textHeight + 52;
        this._centerContain.y = this._content.y + this._content.textHeight + 108;
        this._zgje.textFlow = [
            { "text": "自购金额：", style: { "textColor": 0x333333 } },
            { "text": ToolMrg.getDecimal((data.total / 100), 2).toFixed(0) + "\u5143", style: { "textColor": 0xf72f53 } }
        ];
        this._gdje.textFlow = [
            { "text": "跟单金额：", style: { "textColor": 0x333333 } },
            { "text": ToolMrg.getDecimal((data.g_total / 100), 2) + "\u5143", style: { "textColor": 0xf72f53 } }
        ];
        this._yjhb.textFlow = [
            { "text": "预计回报：", style: { "textColor": 0x333333 } },
            { "text": ToolMrg.getDecimal((data.hr / 100), 2).toFixed(0) + "\u5143", style: { "textColor": 0xf72f53 } }
        ];
        this._gdyj.textFlow = [
            { "text": "跟单佣金：", style: { "textColor": 0x333333 } },
            { "text": data.rate + "%", style: { "textColor": 0xf72f53 } }
        ];
        this._gdyjImg.y = this._gdyj.y + 4;
        this._gdyjImg.x = this._gdyj.x + this._gdyj.textWidth + 10;
        /**跟单用户数 */
        this._withNum.text = "" + data.num;
        this.changeTextCss();
        if (this.details.visible)
            this.details.updata(data);
        if (this.user.visible)
            this.user.updata(data);
        if (data.t == 0) {
            RES.getResByUrl(null, function (e) { _this._staticImg.$setBitmapData(e); }, this);
            this._staticText.text = "";
        }
        else if (data.t == 1) {
            RES.getResByUrl("resource/assets/images/ui/wzj_expert@2x.png", function (e) { _this._staticImg.$setBitmapData(e); }, this);
            this._staticText.text = "";
        }
        else if (data.t == 2) {
            RES.getResByUrl("resource/assets/images/ui/yzj_expert@2x.png", function (e) { _this._staticImg.$setBitmapData(e); }, this);
            this._staticText.text = (data.money / 100).toFixed(2) + "\u5143";
        }
    };
    /**订单号 类型 是否截止购买：有参就为截止 传入发单人个人 */
    DmDetails.prototype.show = function (oid, type, psId, isEnd) {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this._oid = oid;
        this._type = type;
        // this.updata();
        this.changeCenter();
        if (isEnd != undefined) {
            this._downContain.visible = false;
            this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        }
        else {
            if (psId == UserData.getInstance.userId) {
                this._downContain.visible = false;
                this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
                this._share.visible = true;
            }
            else {
                this._downContain.visible = true;
                this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 218;
                this._share.visible = false;
            }
        }
    };
    DmDetails.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    DmDetails.prototype.touchDown = function (e) {
        if (e.target == this._gdyjImg) {
            DmDetailTip.getInstance.show();
        }
        else if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._share) {
            var toF = Number(this._data.lv);
            LotteryShare.getInstance.show(toF == 0 ? "0.00" : ToolMrg.getDecimal(toF, 2).toFixed(2));
        }
        else if (e.target == this._tx) {
            // if(DmC_infoMsg.phID!=undefined && this._data.id!=DmC_infoMsg.phID){
            //     this.hide();
            // }else{
            //     DmC_infoMsg.personalHome = new PersonalHome();
            //     DmC_infoMsg.personalHome.show();
            // }
        }
        else if (e.target == this._downClick) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            if (!bankcardCheck.getInstance.checkAllNum(this._downRightText.text)) {
                Alertpaner.getInstance.show("倍数必须为整数");
                return;
            }
            if (this._data._typeStatic == 2 || this._data._typeStatic == 4) {
                if ((this._money) * this._multiple > 200000) {
                    Alertpaner.getInstance.show("单关下注上限为20万");
                    return;
                }
            }
            else {
                if ((this._money) * this._multiple > 100000) {
                    Alertpaner.getInstance.show("串关下注上限为10万");
                    return;
                }
            }
            this._multiple; //当前倍数
            this._money; //当前单倍跟单金额
            if (this._data._typeStatic == 1) {
                this._mPayData.type = 1;
                this._mPayData.title = "竞足串关支付";
                this._mPayData.typeDesc = "竞足串关";
                this._mPayData.iconUrl = "jzcg_home@2x.png";
            }
            else if (this._data._typeStatic == 2) {
                this._mPayData.type = 1;
                this._mPayData.title = "竞足单关支付";
                this._mPayData.typeDesc = "竞足单关";
                this._mPayData.iconUrl = "jzdg_home@2x.png";
            }
            else if (this._data._typeStatic == 3) {
                this._mPayData.type = 2;
                this._mPayData.title = "篮球串关支付";
                this._mPayData.typeDesc = "篮球串关";
                this._mPayData.iconUrl = "jlcg_home@2x.png";
            }
            else if (this._data._typeStatic == 4) {
                this._mPayData.type = 2;
                this._mPayData.title = "篮球单关支付";
                this._mPayData.typeDesc = "篮球单关";
                this._mPayData.iconUrl = "jldg_home@2x.png";
            }
            this._mPayData.xzM = ToolMrg.getDecimal(this._money * this._multiple, 2);
            if (this._mPayData.xzM < 30) {
                Alertpaner.getInstance.show("跟单金额最低30元起");
                return;
            }
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.gdback;
            PaymentWnd.getInstance.show(this._mPayData);
        }
    };
    /**跟单回调支付 */
    DmDetails.prototype.gdback = function () {
        var num;
        if (this._data._typeStatic == 1 || this._data._typeStatic == 2)
            num = 1;
        else if (this._data._typeStatic == 3 || this._data._typeStatic == 4)
            num = 2;
        else if (this._data._typeStatic == 5)
            num = 3;
        else
            num = 4;
        SetGD_Buy.getInstance.sendHttp(UserData.getInstance.userId, num, this._data.oid, this._multiple, this._money * 100 * this._multiple, this._mPayData.mStr);
    };
    DmDetails.prototype.addInterception = function () {
        this._detail.addEventListener(egret.TouchEvent.TOUCH_TAP, this.centerClick, this);
        this._user.addEventListener(egret.TouchEvent.TOUCH_TAP, this.centerClick, this);
        this._gdyjImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._downClick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._downRightText.addEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        this._downRightText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._downRightText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._downRightText.addEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    DmDetails.prototype.removeInterception = function () {
        this._detail.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.centerClick, this);
        this._user.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.centerClick, this);
        this._gdyjImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._downClick.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._downRightText.removeEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        this._downRightText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._downRightText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._downRightText.removeEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    DmDetails.prototype.textClick = function () {
        this._mData.str = this._downRightText.text;
        this._mData.strText = this._downRightText;
        this._mData.thisObj = this;
        this._mData.backFun = this.changeTextCss;
        NumKeyBoard.getInstance.show(this._mData);
    };
    DmDetails.prototype.changeText = function () {
        this.changeTextCss();
        // keyboard.getInstance.updata(this._downRightText.text);
    };
    DmDetails.prototype.textInput2 = function () {
        if (this._multiple < 1) {
            this._multiple = 1;
            this._downRightText.text = "" + this._multiple;
            this.changeTextCss();
        }
        // this._downRightText.type = egret.TextFieldType.INPUT;
        document.removeEventListener("keydown", this.keyboard);
        keyboard.getInstance.hide();
    };
    /**键盘侦听 */
    DmDetails.prototype.keyboard = function (event) {
        var that = this;
        var num = event.keyCode;
        if (num == 13) {
            // DmC_infoMsg.dmdetail._downRightText.type = egret.TextFieldType.DYNAMIC;
            DmC_infoMsg.dmdetail.textInput2();
        }
    };
    DmDetails.prototype.changeTextCss = function () {
        this._multiple = Number(this._downRightText.text);
        this._downLetfText.textFlow = [
            { "text": this._multiple + "\u500D, ", "style": { "textColor": 0x333333 } },
            { "text": ((this._money) * this._multiple).toFixed(2) + "\u5143", "style": { "textColor": 0xf72e52 } }
        ];
    };
    DmDetails.prototype.joinCenter = function () {
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 366;
        var centerShape = new egret.Shape();
        this._centerContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xf5f5f7);
        centerShape.graphics.drawRect(0, 0, 750, 10);
        centerShape.graphics.endFill();
        this._detail = ToolMrg.getText(0, 10, 28, 0x999999, 375);
        this._centerContain.addChild(this._detail);
        this._detail.height = 64;
        this._detail.textAlign = egret.HorizontalAlign.CENTER;
        this._detail.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._detail.text = "方案详情";
        this._detail.touchEnabled = true;
        this._user = ToolMrg.getText(375, 10, 28, 0x999999, 375);
        this._centerContain.addChild(this._user);
        this._user.height = 64;
        this._user.textAlign = egret.HorizontalAlign.CENTER;
        this._user.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._user.text = "跟单用户";
        this._user.touchEnabled = true;
        this._centerLink = new egret.Shape();
        this._centerContain.addChild(this._centerLink);
        this._centerLink.graphics.beginFill(0xF96D67);
        this._centerLink.graphics.drawRoundRect(133.5, 60, 108, 4, 4);
        this._centerLink.graphics.endFill();
        this._withShape = new egret.Shape();
        this._centerContain.addChild(this._withShape);
        this._withShape.graphics.beginFill(0xF72E52);
        this._withShape.graphics.drawEllipse(622, 18, 26, 26);
        this._withShape.graphics.endFill();
        this._withNum = ToolMrg.getText(622, 18, 16, 0xffffff);
        this._centerContain.addChild(this._withNum);
        this._withNum.bold = true;
        this._withNum.width = 26;
        this._withNum.height = 26;
        this._withNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._withNum.textAlign = egret.HorizontalAlign.CENTER;
        this._withNum.text = "0";
        var ctLink = new egret.Shape();
        this._centerContain.addChild(ctLink);
        ctLink.graphics.beginFill(0xdedede);
        ctLink.graphics.drawRect(0, 64, 750, 1.5);
        ctLink.graphics.endFill();
        this.details = new DD_Detail();
        this._centerContain.addChild(this.details);
        this.details.y = 65.5;
        this.user = new DD_user();
        this._centerContain.addChild(this.user);
        this.user.y = 65.5;
    };
    DmDetails.prototype.centerClick = function (e) {
        if (e.target == this._detail) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._user) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        this.changeCenter();
    };
    DmDetails.prototype.changeCenter = function () {
        if (this._index == 0) {
            this._detail.textColor = 0xf72d52;
            this._user.textColor = 0x999999;
            this._centerLink.x = 0;
            this.details.show(this._data);
            this.user.hide();
            this._mContain.height = 426 + this.details.height;
        }
        else if (this._index == 1) {
            this._detail.textColor = 0x999999;
            this._user.textColor = 0xf72d52;
            this._centerLink.x = 375;
            this.details.hide();
            this.user.show(this._data);
            this._mContain.height = 426 + this.user.height + 20;
        }
    };
    DmDetails.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 218;
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
            var rect = new egret.Rectangle(0, 50, 750, 60);
            bj.scale9Grid = rect;
            bj.y = -10;
            bj.height = 218;
        }, this);
        this._downLetfText = ToolMrg.getText(28, 28, 28, 0x333333, 500);
        this._downContain.addChild(this._downLetfText);
        this._downLetfText.textFlow = [
            { "text": "1倍, ", "style": { "textColor": 0x333333 } },
            { "text": " 元", "style": { "textColor": 0xf72e52 } }
        ];
        var downText1 = ToolMrg.getText(544, 28, 28, 0x333333);
        this._downContain.addChild(downText1);
        downText1.text = "投";
        var downText2 = ToolMrg.getText(544 + 112 + 38, 28, 28, 0x333333);
        this._downContain.addChild(downText2);
        downText2.text = "倍";
        var downBox = new egret.Shape();
        this._downContain.addChild(downBox);
        downBox.graphics.beginFill(0xdedede);
        downBox.graphics.drawRoundRect(578, 22, 112, 40, 15);
        downBox.graphics.endFill();
        var downBoxZZ = new egret.Shape();
        this._downContain.addChild(downBoxZZ);
        downBoxZZ.graphics.beginFill(0xffffff);
        downBoxZZ.graphics.drawRoundRect(579.5, 23.5, 109, 37, 15);
        downBoxZZ.graphics.endFill();
        this._downClick = new egret.Bitmap();
        this._downContain.addChild(this._downClick);
        this._downClick.touchEnabled = true;
        this._downClick.y = 92;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._downClick.$setBitmapData(e);
            _this._downClick.x = (750 - _this._downClick.width) * 0.5;
        }, this);
        this._downRightText = ToolMrg.getText(578, 22, 28, 0x333333, 112);
        this._downContain.addChild(this._downRightText);
        this._downRightText.height = 40;
        this._downRightText.textAlign = egret.HorizontalAlign.CENTER;
        this._downRightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._downRightText.text = "1";
        // this._downRightText.type = egret.TextFieldType.INPUT;
        // this._downRightText.inputType = egret.TextFieldInputType.TEXT;
        this._downRightText.touchEnabled = true;
        this._downBtnText = ToolMrg.getText(0, 122, 36, 0xffffff, 750);
        this._downContain.addChild(this._downBtnText);
        this._downBtnText.textAlign = egret.HorizontalAlign.CENTER;
        this._downBtnText.text = "果断跟单";
    };
    DmDetails.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96;
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
    /**适配处理 */
    DmDetails.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 400);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
        var zz = new egret.Shape();
        this.addChildAt(zz, 0);
        zz.graphics.beginFill(0xffffff);
        zz.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        zz.graphics.endFill();
    };
    return DmDetails;
}(egret.DisplayObjectContainer));
__reflect(DmDetails.prototype, "DmDetails");
//# sourceMappingURL=DmDetails.js.map