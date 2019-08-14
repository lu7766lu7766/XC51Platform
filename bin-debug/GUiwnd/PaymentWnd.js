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
/**
 * 支付界面
 */
var PaymentWnd = (function (_super) {
    __extends(PaymentWnd, _super);
    function PaymentWnd() {
        var _this = _super.call(this) || this;
        // private _LsrcItem4 = ["余额: ", "奖金: ", "红包: "];
        _this._LsrcItem4 = [""];
        /**用户选中 */
        _this._mYHXZ = [];
        _this._mAllPay = 0;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        // this._mContainQB = new egret.DisplayObjectContainer();
        // this._scroViewQB = new egret.ScrollView();
        // this.addChild(this._scroViewQB)
        // this.addScoll(this._mContainQB,this._scroViewQB);
        _this.setDB();
        _this.touchEnabled = true;
        _this._mList = new GHashMap();
        _this._mListTiao1 = new GHashMap();
        _this._mBg = new egret.Shape();
        _this.addChild(_this._mBg);
        _this._mBg.graphics.beginFill(0xffffff);
        _this._mBg.graphics.drawRect(0, 136 - 40 - 96, GameMain.getInstance.StageWidth, 178);
        _this._mBg.graphics.endFill();
        // this._mGou = new egret.Bitmap();
        // this.addChild(this._mGou);
        _this._mIcon = new egret.Bitmap();
        _this.addChild(_this._mIcon);
        _this._mBuyBG = new egret.Bitmap();
        _this._mBuyBG.touchEnabled = true;
        _this.addChild(_this._mBuyBG);
        // RES.getResByUrl("resource/assets/images/ui/select2_home@2x.png", (e) => {
        // 	this._mGou.$setBitmapData(e);
        // 	this._mGou.x = 32;
        // 	this._mGou.y = 1002 - 40 - 96;
        // }, this);
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._mBuyBG.$setBitmapData(e);
            _this._mBuyBG.x = 20;
            _this._mBuyBG.y = 1064 - 40 - 96;
        }, _this);
        // if (this._mTip == undefined)
        // 	this._mTip = ToolMrg.getText(62, 1002 - 40 - 96, 24, 0x333333, 500);
        // this._mTip.textFlow = <Array<egret.ITextElement>>[
        // 	{ text: "我已满18周岁并同意", style: { "textColor": 0x333333 } },
        // 	{ text: "《彩票代购协议》", style: { "textColor": 0xff0000 } }
        // ];
        // this.addChild(this._mTip);
        if (_this._mQRZF == undefined)
            _this._mQRZF = ToolMrg.getText(304, 1094 - 40 - 96, 36, 0xFFFFFF, 184);
        _this._mQRZF.text = "确认支付";
        _this.addChild(_this._mQRZF);
        return _this;
    }
    Object.defineProperty(PaymentWnd, "getInstance", {
        get: function () {
            if (PaymentWnd._mInstance == undefined)
                PaymentWnd._mInstance = new PaymentWnd();
            return PaymentWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    PaymentWnd.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 0;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = 1334;
    };
    /**适配处理 */
    PaymentWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    PaymentWnd.prototype.touchDown = function (e) {
        if (e.target == this._mBuyBG) {
            if (PaymentWnd.canPay == false) {
                Alertpaner.getInstance.show("正在下单中...");
                return;
            }
            var num = Math.round(100 * (this._mData.xzM - this._mAllPay));
            if (num > 0) {
                // Alertpaner.getInstance.show("余额不足");
                TipWindow.getInstance.show("当前余额不足,请前往充值", 1);
                return;
            }
            PaymentWnd.canPay = false;
            // egret.Tween.get(this._mBuyBG).wait(3000).call(() => {
            // 	PaymentWnd.canPay = true;
            // })
            this._mData.mStr = "";
            for (var i = 0; i < this._mYHXZ.length; i++) {
                if (this._mYHXZ[i] != undefined) {
                    this._mData.mStr += this._mYHXZ[i];
                    if (i < this._mYHXZ.length - 1) {
                        this._mData.mStr += ",";
                    }
                }
            }
            // this._mData.mStr=this._mData.mStr.substring(0,this._mData.mStr.lastIndexOf(','));
            this._mData.backFun.call(this._mData.thisObj);
        }
        else if (e.target instanceof TiaoBoj2) {
            var obj = e.target;
            this.changeType(obj.id);
        }
    };
    /**条选中切换 */
    PaymentWnd.prototype.changeType = function (index) {
        this._mAllPay = 0;
        if (this._mYHXZ[index] == undefined) {
            var nowMoney = this.getMoneyById(index);
            if (nowMoney >= this._mData.xzM) {
                this._mYHXZ.length = 0;
                this._mYHXZ[index] = index;
            }
            else {
                var money = 0;
                for (var i = 0; i < this._mYHXZ.length; i++) {
                    money += this.getMoneyById(this._mYHXZ[i]);
                }
                if (this.getMoneyById(index) == 0) {
                    return;
                }
                else {
                    if (money >= this._mData.xzM) {
                        this._mYHXZ.length = 0;
                    }
                    this._mYHXZ[index] = index;
                }
            }
        }
        else {
            if (this.getMoneyById(index) >= this._mData.xzM) {
                return;
            }
            this._mYHXZ[index] = undefined;
        }
        var obj111;
        for (var _i = 0, _a = this._mListTiao1.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj111 = this._mListTiao1.Gget(key);
            if (this._mYHXZ[obj111.id] != undefined) {
                var money = this.xhMoney(obj111.id);
                this._mAllPay += money;
                // obj111.select(true, this.getMoneyById(obj111.id) - money);
                obj111.select(true, money);
            }
            else {
                obj111.select(false, 0);
            }
        }
        this.freshPay();
    };
    /**通过下标算出消耗多少钱 */
    PaymentWnd.prototype.xhMoney = function (index) {
        var yxh = 0;
        for (var i = 0; i < 3; i++) {
            if (this._mYHXZ[i] != undefined) {
                if (this._mYHXZ[index] != undefined && i == index) {
                    var now = this.getMoneyById(i);
                    if (now >= this._mData.xzM - yxh) {
                        return this._mData.xzM - yxh;
                    }
                    else if (now < this._mData.xzM - yxh) {
                        return now;
                    }
                }
                yxh += this.getMoneyById(this._mYHXZ[i]);
            }
        }
        return 0;
    };
    /**通过下标获取金额 */
    PaymentWnd.prototype.getMoneyById = function (index) {
        if (index == 0) {
            return UserData.getInstance.getGold();
        }
        else if (index == 1) {
            return UserData.getInstance.getBonus();
        }
        else if (index == 2) {
            return UserData.getInstance.getDJQGold();
        }
        return 0;
    };
    PaymentWnd.prototype.show = function (data) {
        var _this = this;
        if (data == undefined) {
            return;
        }
        PaymentWnd.canPay = true;
        if (this._mTiao1 == undefined) {
            this._mTiao1 = TiaoBoj1.getObj();
            this._mTiao1.init("实际支付: ");
            // this._mTiao1.y = 856 - 40 - 96;
            this._mTiao1.y = 414 - 40 - 96 + 140;
        }
        this.addChild(this._mTiao1);
        this._mData = data;
        this._mData.mStr = "";
        this._topUI.changeTitle(this._mData.title);
        RES.getResByUrl("resource/assets/images/ui/" + this._mData.iconUrl, function (e) {
            _this._mIcon.$setBitmapData(e);
            _this._mIcon.width = 96;
            _this._mIcon.height = 96;
            _this._mIcon.x = 28;
            _this._mIcon.y = 178 - 40 - 96;
        }, this);
        if (this._mTitle == undefined)
            this._mTitle = ToolMrg.getText(144, 213 - 40 - 96, 32, 0x333333, 200);
        this._mTitle.text = this._mData.typeDesc;
        this.addChild(this._mTitle);
        if (this._mXZDesc == undefined)
            this._mXZDesc = ToolMrg.getText(144, 234 - 40 - 96, 28, 0x999999, 200);
        // this._mXZDesc.text = this._mData.tz +"注 "+this._mData.bs+"倍 共￥"+this._mData.xzM;
        this.addChild(this._mXZDesc);
        if (this._mCanDK == undefined)
            this._mCanDK = ToolMrg.getText(26, 360 - 40 - 96, 28, 0x333333, 200);
        this._mCanDK.text = "可用余额:";
        this.addChild(this._mCanDK);
        // if (this._xzAllGold == undefined)
        // 	this._xzAllGold = ToolMrg.getText(520, 213 - 40 - 92, 28, 0x333333, 200);
        // this._xzAllGold.textFlow = <Array<egret.ITextElement>>[
        // 	{ "text": "", style: { "textColor": 0xF72F53, size: 28 } },
        // 	{ "text": "元", style: { "textColor": 0x999999, size: 26 } }
        // ];
        // this._xzAllGold.textAlign = egret.HorizontalAlign.RIGHT;
        // this.addChild(this._xzAllGold);
        if (this._mQH == undefined)
            this._mQH = ToolMrg.getText(250, 213 - 40 - 92, 26, 0x999999, 300);
        this._mQH.textAlign = egret.HorizontalAlign.LEFT;
        if (this._mData.qs > 0) {
            this._mQH.text = "期号: 第" + this._mData.qs + "期";
        }
        else {
            this._mQH.text = "";
        }
        this.addChild(this._mQH);
        var obj111;
        for (var i = 0; i < this._LsrcItem4.length; i++) {
            if (this._mListTiao1.GhasKey(i)) {
                obj111 = this._mListTiao1.Gget(i);
            }
            else {
                obj111 = TiaoBoj2.getObj();
                this._mListTiao1.Gput(i, obj111);
            }
            obj111.init(this._LsrcItem4[i], i, this.getMoneyById(i));
            obj111.y = 414 - 40 - 96 + 140 * i;
            this.addChild(obj111);
            // obj111.touchEnabled = true;
            // obj111.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        this.changeType(0);
        this.freshPay();
        this._mBuyBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this.setAllGold();
        GUIManager.getInstance.tipLay.addChild(this);
    };
    /**刷新实质支付 */
    PaymentWnd.prototype.freshPay = function () {
        // let num: number = Math.round(100 * (this._mData.xzM - this._mAllPay));
        var num = Math.round(100 * (this._mData.xzM));
        num = num < 0 ? 0 : num;
        num = num / 100;
        this._mTiao1.freshData(num);
    };
    PaymentWnd.prototype.hide = function () {
        this._mBuyBG.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mYHXZ.length = 0;
        this._mAllPay = 0;
        var obj111;
        for (var _i = 0, _a = this._mListTiao1.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj111 = this._mListTiao1.Gget(key);
            obj111.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**设置下注总金额 */
    PaymentWnd.prototype.setAllGold = function () {
        if (this._mData != undefined) {
            // this._xzAllGold.textFlow = <Array<egret.ITextElement>>[
            // 	{ "text":this._mData.xzM+" ", style: { "textColor": 0xF72F53, size: 28 } },
            // 	{ "text": "元", style: { "textColor": 0x999999, size: 28 } }
            // ];
        }
    };
    PaymentWnd.canPay = true;
    return PaymentWnd;
}(egret.DisplayObjectContainer));
__reflect(PaymentWnd.prototype, "PaymentWnd");
/**支付数据类 */
var PaymentData = (function () {
    function PaymentData() {
        /**下单类型 */
        this.mStr = "";
    }
    /**足球支付类型 */
    PaymentData.zqType = 1;
    /**篮球支付类型 */
    PaymentData.lqType = 2;
    /**组3支付类型 */
    PaymentData.z3Type = 3;
    /**组5支付类型 */
    PaymentData.z5Type = 4;
    return PaymentData;
}());
__reflect(PaymentData.prototype, "PaymentData");
/**一条对象 */
var TiaoBoj1 = (function (_super) {
    __extends(TiaoBoj1, _super);
    function TiaoBoj1() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var link2 = new egret.Shape();
        link2.graphics.beginFill(0xffffff);
        link2.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
        link2.graphics.endFill();
        _this.addChild(link2);
        return _this;
    }
    TiaoBoj1.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(TiaoBoj1);
        if (obj == null)
            obj = new TiaoBoj1();
        return obj;
    };
    TiaoBoj1.prototype.init = function (str) {
        if (this._mTitle == undefined)
            this._mTitle = ToolMrg.getText(26, 38, 28, 0x333333, 200);
        this._mTitle.text = str;
        this.addChild(this._mTitle);
        if (this._mJQ == undefined)
            this._mJQ = ToolMrg.getText(526, 40, 24, 0xF72E52, 200);
        this._mJQ.textAlign = egret.HorizontalAlign.RIGHT;
        this.addChild(this._mJQ);
    };
    /**刷新金额 */
    TiaoBoj1.prototype.freshData = function (m) {
        if (m > 0) {
            this._mJQ.textColor = 0xF72E52;
        }
        else {
            this._mJQ.textColor = 0x333333;
        }
        this._mJQ.text = "￥" + m + "元";
    };
    TiaoBoj1.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._mTitle.text = "";
        this._mJQ.text = "";
    };
    return TiaoBoj1;
}(egret.DisplayObjectContainer));
__reflect(TiaoBoj1.prototype, "TiaoBoj1", ["GIObjPool"]);
/**一条对象 */
var TiaoBoj2 = (function (_super) {
    __extends(TiaoBoj2, _super);
    function TiaoBoj2() {
        var _this = _super.call(this) || this;
        _this.id = 0;
        _this.touchEnabled = true;
        var link2 = new egret.Shape();
        link2.graphics.beginFill(0xffffff);
        link2.graphics.drawRect(28, 0, 696, 120);
        link2.graphics.endFill();
        _this.addChild(link2);
        _this._mGou = new egret.Bitmap();
        _this._mGou.x = 644;
        _this._mGou.y = 40;
        _this.addChild(_this._mGou);
        if (_this._mShengYText == undefined)
            _this._mShengYText = ToolMrg.getText(68, 76, 24, 0xF72E52, 300);
        return _this;
        // this._mShengYText.text = "剩余可用100元";
        // this.addChild(this._mShengYText);
    }
    TiaoBoj2.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(TiaoBoj2);
        if (obj == null)
            obj = new TiaoBoj2();
        return obj;
    };
    TiaoBoj2.prototype.init = function (ye, id, mn) {
        this.id = id;
        if (this._mYEText == undefined)
            this._mYEText = ToolMrg.getText(68, 43, 28, 0x333333, 300);
        this._mYEText.text = ye + (mn) + "元";
        this.addChild(this._mYEText);
        this.select(false, 0);
    };
    /**是否选中 */
    TiaoBoj2.prototype.select = function (isSelec, mn) {
        if (isSelec == true) {
            // this._mShengYText.text = "剩余可用" + mn + "元";
            this._mShengYText.text = "可抵扣" + mn + "元";
            this._mGou.$setBitmapData(GResCache.getRes("resource/assets/images/ui/select_home@2x.png"));
            // RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{
            // 	this._mGou.$setBitmapData(e);
            // 	this._mGou.x = 644;
            // 	this._mGou.y = 40;
            // },this);
        }
        else {
            this._mShengYText.text = "";
            this._mGou.$setBitmapData(GResCache.getRes("resource/assets/images/ui/select_nor_home@2x.png"));
            // RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{
            // 	this._mGou.$setBitmapData(e);
            // },this);
        }
    };
    TiaoBoj2.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._mYEText.text = "";
        this._mShengYText.text = "";
    };
    return TiaoBoj2;
}(egret.DisplayObjectContainer));
__reflect(TiaoBoj2.prototype, "TiaoBoj2", ["GIObjPool"]);
//# sourceMappingURL=PaymentWnd.js.map