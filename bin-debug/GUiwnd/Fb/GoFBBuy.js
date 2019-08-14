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
/**足球 投 */
var GoFBBuy = (function (_super) {
    __extends(GoFBBuy, _super);
    function GoFBBuy() {
        var _this = _super.call(this) || this;
        /**当前类型 0足球 1篮球 2超级足彩 3超级篮球 */
        _this._comeType = 0;
        /**显示全部有可能的串数 */
        _this._allStrand = [];
        /**选中 传递数据 */
        _this._strandItem = [];
        /**时间数组 */
        _this._Timer = [];
        _this._XZNum = 0;
        _this._multipleNum = 1;
        _this._XZMNNum = 0;
        /**是否单关 */
        _this.isDanGuan = false;
        //支付时传该对象
        _this._mPayData = new PaymentData();
        _this.dryingData = new DryingData();
        //键盘
        _this._mData = new NumKeyData();
        _this.touchEnabled = true;
        _this._fbDataItem = new GHashMap();
        _this._bkDataItem = new GHashMap();
        _this._mItem = new GHashMap();
        _this._topUI = new TopUI("竞彩足球投注");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this.joinTop();
        _this.joinDown();
        _this._bsBtn = new egret.Bitmap();
        _this.addChild(_this._bsBtn);
        _this._bsBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bsyh_home@2x.png", function (e) {
            _this._bsBtn.$setBitmapData(e);
            _this._bsBtn.x = GameMain.getInstance.StageWidth - _this._bsBtn.width;
            _this._bsBtn.y = GameMain.getInstance.StageHeight - _this._bsBtn.height - 240;
        }, _this);
        _this.textbj = new egret.Bitmap();
        _this._mContain.addChild(_this.textbj);
        _this.textbj.height = 80 + 35;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { _this.textbj.$setBitmapData(e); }, _this);
        _this._lowText = ToolMrg.getText(28, 16, 22, 0x999999, 696);
        _this._lowText.text = "注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅 供参考，实际奖金以投注成功为准。";
        _this._lowText.lineSpacing = 12;
        _this._lowText.fontFamily = "微软雅黑";
        _this._lowText.bold = true;
        _this._mContain.addChild(_this._lowText);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(GoFBBuy, "getInstance", {
        get: function () {
            if (GoFBBuy._mInstance == undefined)
                GoFBBuy._mInstance = new GoFBBuy();
            return GoFBBuy._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**保存串数 */
    GoFBBuy.prototype.saveLeftText = function (data) {
        var itemx = [];
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            itemx = itemx.concat(data.Gget(key));
        }
        if (!this.isGoBeyond(itemx)) {
            return;
        }
        this._strandItem = itemx;
        for (var i = 0; i < this._strandItem.length; i++) {
            for (var j = 0; j < this._strandItem.length - i - 1; j++) {
                if (this._strandItem[j] > this._strandItem[j + 1]) {
                    var temp = this._strandItem[j + 1];
                    this._strandItem[j + 1] = this._strandItem[j];
                    this._strandItem[j] = temp;
                }
            }
        }
        this._downLeftText.text = "";
        for (var i = 0; i < this._strandItem.length; i++) {
            if (i != 0) {
                if (this._strandItem[i] == 0) {
                    this._downLeftText.text = this._downLeftText.text + ",单关";
                }
                else {
                    this._downLeftText.text = this._downLeftText.text + "," + (this._strandItem[i] + 1) + "\u4E321";
                }
            }
            else {
                if (this._strandItem[i] == 0) {
                    this._downLeftText.text = "单关";
                }
                else {
                    this._downLeftText.text = this._strandItem[i] + 1 + "\u4E321";
                }
            }
        }
        this._downLeftText.text = ToolMrg.nameMode2(14, this._downLeftText.text);
        this.changeDownText();
    };
    /**是否超出50W 单是否超20W 串是否超10W  false:return */
    GoFBBuy.prototype.isGoBeyond = function (strandItem) {
        var strandItem2 = [];
        if (strandItem != undefined)
            strandItem2 = strandItem;
        else
            strandItem2 = this._strandItem;
        var num = GuessingFootballMrg.getInstance.getAllZSByList(this._data, strandItem2);
        GuessingFootballMrg.getInstance.setGoldBS(this._data, Number(this._multipleText.text));
        var numJJ = GuessingFootballMrg.getInstance.getGoldByList(this._data, strandItem2, this._comeType, this.isDanGuan);
        var max = 0; //最高预测奖金 最高50W 
        // let money = 0;//投注金额 串10W 单20W
        this.isDanGuan; //当前 true：单关 false：串关
        var nowMoney = num * 2 * Number(this._multipleText.text); //当前投注金额
        if (!this.isDanGuan) {
            if (nowMoney > 100000) {
                Alertpaner.getInstance.show("串关下注上限为10万");
                this._multipleText.text = this._multipleNum + "";
                return false;
            }
        }
        else {
            if (nowMoney > 200000) {
                Alertpaner.getInstance.show("单关下注上限为20万");
                this._multipleText.text = this._multipleNum + "";
                return false;
            }
        }
        if (numJJ[1] > 500000) {
            Alertpaner.getInstance.show("最高赔付上限为50万");
            this._multipleText.text = this._multipleNum + "";
            return false;
        }
        return true;
    };
    /**所选数组 注数倍数改变时 */
    GoFBBuy.prototype.changeDownText = function () {
        var num = GuessingFootballMrg.getInstance.getAllZSByList(this._data, this._strandItem);
        GuessingFootballMrg.getInstance.setGoldBS(this._data, Number(this._multipleText.text));
        var numJJ = GuessingFootballMrg.getInstance.getGoldByList(this._data, this._strandItem, this._comeType, this.isDanGuan);
        var max = 0; //最高预测奖金 最高50W 
        // let money = 0;//投注金额 串10W 单20W
        this.isDanGuan; //当前 true：单关 false：串关
        var nowMoney = num * 2 * Number(this._multipleText.text); //当前投注金额
        if (!this.isDanGuan) {
            if (nowMoney > 100000) {
                Alertpaner.getInstance.show("串关下注上限为10万");
                this._multipleText.text = this._multipleNum + "";
                return;
            }
        }
        else {
            if (nowMoney > 200000) {
                Alertpaner.getInstance.show("单关下注上限为20万");
                this._multipleText.text = this._multipleNum + "";
                return;
            }
        }
        if (numJJ[1] > 500000) {
            Alertpaner.getInstance.show("最高赔付上限为50万");
            this._multipleText.text = this._multipleNum + "";
            return;
        }
        this._downContent.text = "\u9884\u6D4B\u5956\u91D1\uFF1A" + numJJ[0] + "\u5143\uFF5E" + numJJ[1] + "\u5143";
        this._XZNum = num;
        this._multipleNum = Number(this._multipleText.text);
        this._XZMNNum = num * 2 * this._multipleNum;
        this._downTitle.text = this._XZNum + "\u6CE8" + this._multipleNum + "\u500D" + this._XZMNNum + "\u5143";
    };
    /**点击删除 */
    GoFBBuy.prototype.clickRemove = function (id) {
        if (id != undefined) {
            var dataItem = [];
            for (var i = 0; i < this._dataItem.length; i++) {
                if (this._dataItem[i].dlxId != id)
                    dataItem = dataItem.concat(this._dataItem[i]);
            }
            this._dataItem = dataItem;
            if (this._comeType == 0) {
                if (FbWnd.inIndex == 0) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem);
                }
                else {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem, true);
                }
            }
            else if (this._comeType == 1) {
                if (BasketBallWnd.inIndex == 0) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem);
                }
                else {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem, true);
                }
            }
            else if (this._comeType == 2) {
                if (SPFbWnd.inIndex == 0) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem);
                }
                else {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem, true);
                }
            }
            else if (this._comeType == 3) {
                if (SPBasketBallWnd.inIndex == 0) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem);
                }
                else {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._dataItem, true);
                }
            }
        }
        else {
            this._data = [];
            this._dataItem = [];
        }
        this.updata();
        if (this._comeType == 0) {
            if (FbWnd.inIndex == 0) {
                G1Wnd.getInstance.ClickRemove(id);
            }
            else {
                OnePass.getInstance.ClickRemove(id);
            }
        }
        else if (this._comeType == 1) {
            BasketBallWnd.getInstance.ClickRemove(id);
        }
        else if (this._comeType == 2) {
            if (SPFbWnd.inIndex == 0) {
                SPG1Wnd.getInstance.ClickRemove(id);
            }
            else {
                SPOnePass.getInstance.ClickRemove(id);
            }
        }
        else if (this._comeType == 3) {
            SPBasketBallWnd.getInstance.ClickRemove(id);
        }
        this.changeDownText();
    };
    GoFBBuy.prototype.showData = function () {
        if (this._comeType == 0 && FbWnd.inIndex == 0) {
            this.isDanGuan = false;
            //弹出支付界面
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "竞足串关支付";
            this._mPayData.typeDesc = "竞足串关";
            this._mPayData.iconUrl = "jzcg_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.zqback;
        }
        else if (this._comeType == 0) {
            this.isDanGuan = true;
            //单关进行投注
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "竞足单关支付";
            this._mPayData.typeDesc = "竞足单关";
            this._mPayData.iconUrl = "jzdg_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.zqback;
        }
        else if (this._comeType == 1 && BasketBallWnd.inIndex == 0) {
            this.isDanGuan = false;
            //弹出支付界面
            this._mPayData.type = PaymentData.lqType;
            this._mPayData.title = "竞篮串关支付";
            this._mPayData.typeDesc = "竞篮串关";
            this._mPayData.iconUrl = "jlcg_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.lqback;
        }
        else if (this._comeType == 1) {
            this.isDanGuan = true;
            //单关进行投注
            this._mPayData.type = PaymentData.lqType;
            this._mPayData.title = "竞篮单关支付";
            this._mPayData.typeDesc = "竞篮单关";
            this._mPayData.iconUrl = "jldg_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.lqback;
        }
        else if (this._comeType == 2 && SPFbWnd.inIndex == 0) {
            this.isDanGuan = false;
            //弹出支付界面
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "超级足彩串关支付";
            this._mPayData.typeDesc = "超级足彩串关";
            this._mPayData.iconUrl = "cjzc_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.cjzqback;
        }
        else if (this._comeType == 2) {
            this.isDanGuan = true;
            //弹出支付界面
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "超级足彩单关支付";
            this._mPayData.typeDesc = "超级足彩单关";
            this._mPayData.iconUrl = "cjzc_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.cjzqback;
        }
        else if (this._comeType == 3 && SPBasketBallWnd.inIndex == 0) {
            this.isDanGuan = false;
            //弹出支付界面
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "超级篮彩串关支付";
            this._mPayData.typeDesc = "超级篮彩串关";
            this._mPayData.iconUrl = "cjjl_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.cjlqback;
        }
        else if (this._comeType == 3) {
            this.isDanGuan = true;
            //弹出支付界面
            this._mPayData.type = PaymentData.zqType;
            this._mPayData.title = "超级篮彩单关支付";
            this._mPayData.typeDesc = "超级篮彩单关";
            this._mPayData.iconUrl = "cjjl_home@2x.png";
            this._mPayData.xzM = this._XZMNNum;
            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.cjlqback;
        }
    };
    GoFBBuy.prototype.touchDown = function (e) {
        if (e.target == this._mGXK || e.target == this._mGXKText) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            if (UserData.getInstance.userName == ("彩友" + UserData.getInstance.userId)) {
                Alertpaner.getInstance.show("修改昵称后方可发单");
                return;
            }
            else if (UserData.getInstance.getLv() <= 4) {
                Alertpaner.getInstance.show("vip5以上才能正常发单哦");
                // if (UserData.getInstance.getused() == 0 || UserData.getInstance.userName == "51彩友") {//实名和改昵称后方可发单
                //     Alertpaner.getInstance.show("实名和改昵称后方可发单");
                return;
            }
            else {
                if (this._strandItem.length != 1 || this._strandItem[0] > 2 || this._data.length != this._strandItem[0] + 1) {
                    // Alertpaner.getInstance.show("发单只能单串 或 二串1 或3串1中选择");
                    Alertpaner.getInstance.show(" 推荐方案下, 仅支持3串1, 2串1, 单关玩法, 不支持组合玩法 ");
                }
                else {
                    this.changeGX(true);
                    DryingListWnd.getInstance.show(this._XZMNNum, this._multipleNum);
                }
            }
            return;
        }
        this.showData();
        if (e.target == this._return || e.target == this._topShape) {
            this.hide();
        }
        else if (e.target == this._downLeftText) {
            if (this._allStrand.length > 0) {
                FBselect.getInstance.show(this._allStrand, this._strandItem);
            }
            else {
                var tip = "";
                if (this._comeType == 0) {
                    if (FbWnd.inIndex == 0) {
                        tip = "串关至少选择两场比赛";
                    }
                    else {
                        tip = "单关至少选择一场比赛";
                    }
                }
                else if (this._comeType == 1) {
                    if (BasketBallWnd.inIndex == 0) {
                        tip = "串关至少选择两场比赛";
                    }
                    else {
                        tip = "单关至少选择一场比赛";
                    }
                }
                else if (this._comeType == 2) {
                    if (SPFbWnd.inIndex == 0) {
                        tip = "串关至少选择两场比赛";
                    }
                    else {
                        tip = "单关至少选择一场比赛";
                    }
                }
                else if (this._comeType == 3) {
                    if (SPBasketBallWnd.inIndex == 0) {
                        tip = "串关至少选择两场比赛";
                    }
                    else {
                        tip = "单关至少选择一场比赛";
                    }
                }
                Alertpaner.getInstance.show(tip);
            }
        }
        else if (e.target == this._goBtn) {
            if (!bankcardCheck.getInstance.checkAllNum(this._multipleText.text)) {
                Alertpaner.getInstance.show("倍数必须为整数");
                return;
            }
            if (this._strandItem.length < 1) {
                Alertpaner.getInstance.show("请选择投注方式");
                return;
            }
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            var index = void 0;
            // = this._comeType==0?FbWnd.inIndex:BasketBallWnd.inIndex;
            if (this._comeType == 0) {
                index = FbWnd.inIndex;
            }
            else if (this._comeType == 1) {
                index = BasketBallWnd.inIndex;
            }
            else if (this._comeType == 2) {
                index = SPFbWnd.inIndex;
            }
            else if (this._comeType == 3) {
                index = SPBasketBallWnd.inIndex;
            }
            if (index == 0) {
                if (this._mItem.size < 2)
                    Alertpaner.getInstance.show("至少选择两场比赛");
                else {
                    if (GoFBBuy.getInstance.dryingData.type > 0 && (this._strandItem.length != 1 || this._strandItem[0] > 2 || this._data.length != this._strandItem[0] + 1)) {
                        Alertpaner.getInstance.show(" 推荐方案下, 仅支持3串1, 2串1, 单关玩法, 不支持组合玩法 ");
                        return;
                    }
                    PaymentWnd.getInstance.show(this._mPayData);
                }
            }
            else {
                if (this._mItem.size < 1)
                    Alertpaner.getInstance.show("至少选择一场比赛");
                else {
                    PaymentWnd.getInstance.show(this._mPayData);
                }
            }
        }
        else if (e.target == this._bsBtn) {
            if (this._comeType == 0) {
                if (FbWnd.inIndex == 0) {
                    if (this._mItem.size < 2) {
                        Alertpaner.getInstance.show("至少选择两场赛事");
                        return;
                    }
                }
                else {
                    if (this._mItem.size < 1) {
                        Alertpaner.getInstance.show("至少选择一场赛事");
                        return;
                    }
                }
            }
            else if (this._comeType == 1) {
                if (BasketBallWnd.inIndex == 0) {
                    if (this._mItem.size < 2) {
                        Alertpaner.getInstance.show("至少选择两场赛事");
                        return;
                    }
                }
                else {
                    if (this._mItem.size < 1) {
                        Alertpaner.getInstance.show("至少选择一场赛事");
                        return;
                    }
                }
            }
            else if (this._comeType == 2) {
                if (SPFbWnd.inIndex == 0) {
                    if (this._mItem.size < 2) {
                        Alertpaner.getInstance.show("至少选择两场赛事");
                        return;
                    }
                }
                else {
                    if (this._mItem.size < 1) {
                        Alertpaner.getInstance.show("至少选择一场赛事");
                        return;
                    }
                }
            }
            else if (this._comeType == 3) {
                if (SPBasketBallWnd.inIndex == 0) {
                    if (this._mItem.size < 2) {
                        Alertpaner.getInstance.show("至少选择两场赛事");
                        return;
                    }
                }
                else {
                    if (this._mItem.size < 1) {
                        Alertpaner.getInstance.show("至少选择一场赛事");
                        return;
                    }
                }
            }
            if (this._XZNum > 99) {
                Alertpaner.getInstance.show("51彩站：仅支持100注以下");
                return;
            }
            MultiplierDetail.getInstance.show(this._data, this._strandItem, this._comeType, this._mPayData, this.isDanGuan, this._multipleNum);
        }
    };
    /**足球支付回调 */
    GoFBBuy.prototype.zqback = function () {
        if (this._XZNum >= 100) {
            FT_Order_One.getInstance.sendHttp(this._dataItem, this.dryingData, FbWnd.inIndex + 1, this._strandItem, this._multipleNum, this._XZMNNum, this._mPayData.mStr);
        }
        else {
            FT_Order.getInstance.sendHttp(this._data, this.dryingData, FbWnd.inIndex + 1, this._strandItem, this._mPayData.mStr);
        }
    };
    /**超级足球支付回调 */
    GoFBBuy.prototype.cjzqback = function () {
        var x = this.isDanGuan == true ? 1 : 0;
        if (this._XZNum >= 100) {
            Super_Ftc.getInstance.sendHttp(this._dataItem, this.dryingData, SPFbWnd.inIndex + 1, this._strandItem, this._multipleNum, this._XZMNNum, this._mPayData.mStr, x);
        }
        else {
            Super_Fto.getInstance.sendHttp(this._data, this.dryingData, SPFbWnd.inIndex + 1, this._strandItem, this._mPayData.mStr, x);
        }
    };
    /**篮球支付回调 */
    GoFBBuy.prototype.lqback = function () {
        if (this._XZNum >= 100) {
            BK_Order_One.getInstance.sendHttp(this._dataItem, this.dryingData, BasketBallWnd.inIndex + 1, this._strandItem, this._multipleNum, this._XZMNNum, this._mPayData.mStr);
        }
        else {
            BK_Order.getInstance.sendHttp(this._data, this.dryingData, BasketBallWnd.inIndex + 1, this._strandItem, this._mPayData.mStr);
        }
    };
    /**超级篮球支付回调 */
    GoFBBuy.prototype.cjlqback = function () {
        if (this._XZNum >= 100) {
            Super_BK_Order_One.getInstance.sendHttp(this._dataItem, this.dryingData, SPBasketBallWnd.inIndex + 1, this._strandItem, this._multipleNum, this._XZMNNum, this._mPayData.mStr);
        }
        else {
            Super_Bk_Order.getInstance.sendHttp(this._data, this.dryingData, SPBasketBallWnd.inIndex + 1, this._strandItem, this._mPayData.mStr);
        }
    };
    GoFBBuy.prototype.show = function (data, dataItem, comeType) {
        LoadtoWaitWnd.getInstance.hide();
        this._comeType = comeType;
        this._data = data;
        this._dataItem = dataItem;
        this.showData();
        this.addInterception();
        this._multipleText.text = "" + this._multipleNum;
        this.changeGX(false);
        this.updata();
        if (this.isGoBeyond()) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        else {
            return;
        }
        if (this._comeType == 0) {
            this._topUI.changeTitle("竞彩足球投注");
            this._mGXK.visible = true;
            this._mGXKText.visible = true;
        }
        else if (this._comeType == 1) {
            this._topUI.changeTitle("竞彩篮球投注");
            this._mGXK.visible = true;
            this._mGXKText.visible = true;
        }
        else if (this._comeType == 2) {
            this._topUI.changeTitle("超级足彩投注");
            this._mGXK.visible = false;
            this._mGXKText.visible = false;
        }
        else if (this._comeType == 3) {
            this._topUI.changeTitle("超级篮彩投注");
            this._mGXK.visible = false;
            this._mGXKText.visible = false;
        }
    };
    /**初始化 选中串几 以及 全部串几 */
    GoFBBuy.prototype.updata = function () {
        this._strandItem = [];
        this._allStrand = [];
        if (this._data == undefined) {
            this._data = [];
        }
        // let zhuNum=0;
        if (this._data.length > 0) {
            var num = 0;
            for (var i = 0; i < this._data.length; i++) {
                // zhuNum = zhuNum + this._data[i].injectionNum;
                if (this._data[0].typeStrand != undefined) {
                    this._allStrand = this._allStrand.concat(this._data[i].typeStrand - 1);
                    num = 1;
                    break;
                }
                if (this._data[i].typeStrand != undefined) {
                    this._allStrand = this._allStrand.concat(this._data[i].typeStrand - 1);
                    if (num < this._data[i].typeStrand)
                        num = this._data[i].typeStrand;
                }
            }
            this._strandItem = [num - 1];
            if (this._strandItem[0] != 0)
                this._downLeftText.text = this._strandItem[0] + 1 + "\u4E321";
            else
                this._downLeftText.text = "\u5355\u5173";
        }
        else {
            this._downLeftText.text = "请选择比赛";
        }
        this.changeDownText();
        this.showInfo();
    };
    /**展示选中比赛 */
    GoFBBuy.prototype.showInfo = function () {
        var item;
        var typeItem;
        if (this._comeType == 0) {
            this._fbDataItem.clear();
            if (FbWnd.inIndex == 0) {
                item = FootballDataMrg.getInstance._mZQLB;
            }
            else {
                item = FootballDataMrg.getInstance._mZQLBDG;
            }
            typeItem = this._fbDataItem;
        }
        else if (this._comeType == 1) {
            this._bkDataItem.clear();
            if (BasketBallWnd.inIndex == 0) {
                item = BasketballDataMrg.getInstance._mLQLB;
            }
            else {
                item = BasketballDataMrg.getInstance._mLQLBDG;
            }
            typeItem = this._bkDataItem;
        }
        else if (this._comeType == 2) {
            this._fbDataItem.clear();
            if (SPFbWnd.inIndex == 0) {
                item = FootballDataMrg.getInstance._mCJZQLB;
            }
            else {
                item = FootballDataMrg.getInstance._mCJZQLBDG;
            }
            typeItem = this._fbDataItem;
        }
        else if (this._comeType == 3) {
            this._bkDataItem.clear();
            if (SPBasketBallWnd.inIndex == 0) {
                item = BasketballDataMrg.getInstance._mCJLQLB;
            }
            else {
                item = BasketballDataMrg.getInstance._mCJLQLBDG;
            }
            typeItem = this._bkDataItem;
        }
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = item.Gget(key);
            for (var _b = 0, _c = obj.keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                if (this._dataItem.length > 0) {
                    for (var i = 0; i < this._dataItem.length; i++) {
                        if (obj.Gget(akey).id == this._dataItem[i].dlxId)
                            typeItem.Gput(obj.Gget(akey).id, obj.Gget(akey));
                    }
                }
            }
        }
        this._Timer = [];
        for (var _d = 0, _e = item.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            var obj = item.Gget(key);
            for (var _f = 0, _g = obj.keys; _f < _g.length; _f++) {
                var akey = _g[_f];
                for (var p = 0; p < this._dataItem.length; p++) {
                    if (this._dataItem[p].dlxId == akey) {
                        if (obj.Gget(akey).stopT != undefined)
                            this._Timer = this._Timer.concat(obj.Gget(akey).stopT);
                    }
                }
            }
        }
        var objInfo;
        var objInfoHeight = 0;
        for (var _h = 0, _j = typeItem.keys; _h < _j.length; _h++) {
            var key = _j[_h];
            if (this._mItem.GhasKey(key)) {
                objInfo = this._mItem.Gget(key);
            }
            else {
                objInfo = new GoFBBuyInfo();
                this._mItem.Gput(key, objInfo);
            }
            objInfo.aa(typeItem.Gget(key), this._dataItem, this._comeType);
            objInfo.y = objInfoHeight;
            objInfoHeight = objInfoHeight + objInfo.height;
            if (objInfo.parent == undefined)
                this._mContain.addChild(objInfo);
        }
        ToolMrg.upItemofGHashMap(this._mItem, typeItem);
        if (this._comeType == 0 || this._comeType == 2) {
            this._lowText.visible = true;
        }
        else {
            this._lowText.visible = false;
        }
        this._lowText.y = objInfoHeight + 34;
        this.textbj.y = objInfoHeight;
        this._topText.textFlow = [
            { "text": "继续选择比赛", style: { "textColor": 0x333333 } },
            { "text": "\uFF08\u5DF2\u9009", style: { "textColor": 0x999999 } },
            { "text": "" + this._mItem.size, style: { "textColor": 0xFA294E } },
            { "text": "\u573A\uFF09", style: { "textColor": 0x999999 } }
        ];
        this.setTimeOfText();
    };
    //更改时间 且保存时间
    GoFBBuy.prototype.setTimeOfText = function () {
        var timeText = "";
        if (this._Timer.length > 0) {
            var num = this._Timer[0];
            for (var i = 0; i < this._Timer.length; i++) {
                if (this._Timer[i] < num)
                    num = this._Timer[i];
            }
            timeText = ToolMrg.getTime1(num);
        }
        else {
            timeText = "--";
        }
        this._time.textFlow = [
            { "text": "投注截止时间：", style: { "textColor": 0x999999 } },
            { "text": timeText, style: { "textColor": 0xf72e52 } }
        ];
    };
    GoFBBuy.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._multipleNum = 1;
        }
    };
    GoFBBuy.prototype.joinTop = function () {
        this._topContain = new egret.DisplayObjectContainer();
        this.addChild(this._topContain);
        this._topContain.y = 96 + GameValue.adaptationScreen;
        this._topShape = new egret.Shape();
        this._topContain.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xffffff);
        this._topShape.graphics.drawRect(0, 0, 750, 140);
        this._topShape.graphics.endFill();
        this._topShape.touchEnabled = true;
        var topBtn = new egret.Bitmap();
        this._topContain.addChild(topBtn);
        topBtn.x = 192;
        topBtn.y = 26;
        RES.getResByUrl("resource/assets/images/ui/tj_home@2x.png", function (e) { topBtn.$setBitmapData(e); }, this);
        this._topText = ToolMrg.getText(238, 26, 28, 0x333333);
        this._topContain.addChild(this._topText);
        this._topText.text = "继续选中比赛";
        var topLink = new egret.Shape();
        this._topContain.addChild(topLink);
        topLink.graphics.beginFill(0xdedede);
        topLink.graphics.drawRect(0, 78.5, 750, 1.5);
        topLink.graphics.endFill();
        var topLink2 = new egret.Shape();
        this._topContain.addChild(topLink2);
        topLink2.graphics.beginFill(0xdedede);
        topLink2.graphics.drawRect(0, 138.5, 750, 1.5);
        topLink2.graphics.endFill();
        this._time = ToolMrg.getText(28, 80, 22, 0x999999);
        this._topContain.addChild(this._time);
        this._time.height = 60;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._time.text = "投注截止时间：";
    };
    GoFBBuy.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - 200 - this.y;
        var downBJ = new egret.Bitmap();
        this._downContain.addChild(downBJ);
        downBJ.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) { downBJ.$setBitmapData(e); }, this);
        var dowmShape = new egret.Shape();
        this._downContain.addChild(dowmShape);
        dowmShape.graphics.beginFill(0xdedede);
        dowmShape.graphics.drawRect(0, 98.5, 750, 1.5);
        dowmShape.graphics.endFill();
        this._downLeftText = ToolMrg.getText(0, 0, 28, 0x333333, 375);
        this._downContain.addChild(this._downLeftText);
        this._downLeftText.height = 100;
        this._downLeftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._downLeftText.textAlign = egret.HorizontalAlign.CENTER;
        this._downLeftText.touchEnabled = true;
        var downCenter = new egret.Shape();
        this._downContain.addChild(downCenter);
        downCenter.graphics.beginFill(0xdedede);
        downCenter.graphics.drawRect(374, 32, 2, 40);
        downCenter.graphics.endFill();
        var downText1 = ToolMrg.getText(450, 30, 28, 0x333333);
        this._downContain.addChild(downText1);
        downText1.height = 40;
        downText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText1.text = "投";
        var downText2 = ToolMrg.getText(450 + 160 + 38, 30, 28, 0x333333);
        this._downContain.addChild(downText2);
        downText2.height = 40;
        downText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText2.text = "倍";
        var shapeBox = new egret.Shape();
        this._downContain.addChild(shapeBox);
        shapeBox.graphics.beginFill(0xcacaca);
        shapeBox.graphics.drawRoundRect(486, 22, 160, 60, 12);
        shapeBox.graphics.endFill();
        var shapeContent = new egret.Shape();
        this._downContain.addChild(shapeContent);
        shapeContent.graphics.beginFill(0xffffff);
        shapeContent.graphics.drawRoundRect(487.5, 23.5, 157, 57, 12);
        shapeContent.graphics.endFill();
        this._multipleText = ToolMrg.getText(486, 30, 28, 0x333333, 160);
        this._downContain.addChild(this._multipleText);
        this._multipleText.touchEnabled = true;
        this._multipleText.height = 40;
        this._multipleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._multipleText.textAlign = egret.HorizontalAlign.CENTER;
        this._multipleText.text = "1";
        // this._multipleText.type = egret.TextFieldType.INPUT;
        // this._multipleText.inputType = egret.TextFieldInputType.TEXT;
        var leftBtn = new egret.Bitmap();
        this._downContain.addChild(leftBtn);
        leftBtn.x = 330;
        leftBtn.y = 44;
        RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) { leftBtn.$setBitmapData(e); }, this);
        this._downTitle = ToolMrg.getText(60, 112, 32, 0x333333, 556);
        this._downContain.addChild(this._downTitle);
        this._downTitle.textAlign = egret.HorizontalAlign.CENTER;
        this._downTitle.text = "0\u6CE80\u500D0\u5143";
        this._downContent = ToolMrg.getText(60, 164, 20, 0xf72e52, 556);
        this._downContain.addChild(this._downContent);
        this._downContent.textAlign = egret.HorizontalAlign.CENTER;
        this._downContent.text = "\u9884\u6D4B\u5956\u91D1\uFF1A0.00\u5143\uFF5E0.00\u5143";
        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.x = 556;
        this._goBtn.y = 110;
        this._goBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) { _this._goBtn.$setBitmapData(e); }, this);
        this._mGXK = new egret.Bitmap();
        this._downContain.addChild(this._mGXK);
        this._mGXK.touchEnabled = true;
        this._mGXKText = ToolMrg.getText(66, 135, 32, 0x333333, 200);
        this._downContain.addChild(this._mGXKText);
        this._mGXKText.text = "\u53D1\u5355";
        this._mGXKText.touchEnabled = true;
        var goText = ToolMrg.getText(612, 134, 32, 0xffffff);
        this._downContain.addChild(goText);
        goText.text = "投注";
    };
    /**改变勾选值 */
    GoFBBuy.prototype.changeGX = function (bool) {
        var _this = this;
        var str = "fadan_nor_home@2x.png";
        if (bool == true) {
            str = "fadan_home@2x.png";
        }
        else {
            GoFBBuy.getInstance.dryingData.type = 0;
            GoFBBuy.getInstance.dryingData.yltc = 0;
            GoFBBuy.getInstance.dryingData.faxy = "";
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) {
            _this._mGXK.$setBitmapData(e);
            _this._mGXK.x = 12;
            _this._mGXK.y = 120;
        }, this);
    };
    GoFBBuy.prototype.changeText = function () {
        this.changeDownText();
        // keyboard.getInstance.updata(this._multipleText.text);
    };
    GoFBBuy.prototype.textInput2 = function () {
        if (this._multipleNum < 1) {
            this._multipleNum = 1;
            this._multipleText.text = "" + this._multipleNum;
            this.changeDownText();
        }
        // this._multipleText.type = egret.TextFieldType.INPUT;
        document.removeEventListener("keydown", this.keyboard);
        keyboard.getInstance.hide();
    };
    /**键盘侦听 */
    GoFBBuy.prototype.keyboard = function (event) {
        var that = this;
        var num = event.keyCode;
        if (num == 13) {
            // GoFBBuy.getInstance._multipleText.type = egret.TextFieldType.DYNAMIC;
            GoFBBuy.getInstance.textInput2();
        }
    };
    GoFBBuy.prototype.addInterception = function () {
        this._mGXK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mGXKText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._bsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._downLeftText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._topShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._multipleText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._multipleText.addEventListener(egret.TouchEvent.CHANGE, this.changeText, this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    GoFBBuy.prototype.removeInterception = function () {
        this._mGXK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mGXKText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._bsBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._downLeftText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._topShape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._multipleText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._multipleText.removeEventListener(egret.TouchEvent.CHANGE, this.changeText, this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    GoFBBuy.prototype.textClick = function () {
        this._mData.str = this._multipleText.text;
        this._mData.strText = this._multipleText;
        this._mData.thisObj = this;
        this._mData.backFun = this.changeDownText;
        NumKeyBoard.getInstance.show(this._mData);
    };
    GoFBBuy.prototype.addScoll = function () {
        var mShape = new egret.Shape();
        mShape.graphics.beginFill(0xF5F5F7, 1);
        mShape.graphics.drawRect(0, 96 + GameValue.adaptationScreen + 40 + 60, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - 200 - 96 + GameValue.adaptationScreen + 40);
        mShape.graphics.endFill();
        this.addChild(mShape);
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 80 + 60;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 200 - this._scroView.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    GoFBBuy.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return GoFBBuy;
}(egret.DisplayObjectContainer));
__reflect(GoFBBuy.prototype, "GoFBBuy");
var GoFBBuyInfo = (function (_super) {
    __extends(GoFBBuyInfo, _super);
    function GoFBBuyInfo() {
        var _this = _super.call(this) || this;
        _this._box = new egret.Bitmap();
        _this.addChild(_this._box);
        _this._box.x = 30;
        _this._box.y = 84;
        var rect = new egret.Rectangle(20, 20, 510, 48);
        _this._box.scale9Grid = rect;
        RES.getResByUrl("resource/assets/images/ui/tzbg_home@2x.png", function (e) { _this._box.$setBitmapData(e); }, _this);
        _this._link = new egret.Shape();
        _this.addChild(_this._link);
        _this._contentItem = new GHashMap();
        _this._dayOfcode = ToolMrg.getText(28, 27, 24, 0x999999);
        _this.addChild(_this._dayOfcode);
        _this._team1 = ToolMrg.getText(34 + 24 * 3, 27, 24, 0x333333, 200);
        _this.addChild(_this._team1);
        _this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        _this._team1.bold = true;
        _this._team2 = ToolMrg.getText(444, 27, 24, 0x333333, 200);
        _this.addChild(_this._team2);
        _this._team2.bold = true;
        _this._vs = ToolMrg.getText(362, 27, 24, 0x999999);
        _this.addChild(_this._vs);
        _this._vs.text = "VS";
        _this._clickBtn = new egret.Bitmap();
        _this.addChild(_this._clickBtn);
        RES.getResByUrl("resource/assets/images/ui/scdd_home@2x.png", function (e) { _this._clickBtn.$setBitmapData(e); }, _this);
        _this._clickBtn.x = 692;
        _this._clickBtn.y = 84;
        _this._clickBtn.touchEnabled = true;
        _this._clickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        _this._contentText = ToolMrg.getText(60, 114, 28, 0x333333, 454);
        _this.addChild(_this._contentText);
        _this.setDB();
        return _this;
    }
    GoFBBuyInfo.prototype.touchDown = function (e) {
        GoFBBuy.getInstance.clickRemove(this._data.id);
    };
    GoFBBuyInfo.prototype.aa = function (data, item, comeType) {
        this._data = data;
        this._dayOfcode.text = data.day + " " + data.code;
        this._team1.text = "" + data.team_a_name;
        this._team2.text = "" + data.team_b_name;
        var textStr = [];
        for (var i = 0; i < item.length; i++) {
            if (item[i].dlxId == data.id) {
                textStr = item[i].xlxIdList;
            }
        }
        for (var i = 0; i < textStr.length; i++) {
            for (var j = 0; j < textStr.length - i - 1; j++) {
                if (textStr[j] > textStr[j + 1]) {
                    var temp = textStr[j + 1];
                    textStr[j + 1] = textStr[j];
                    textStr[j] = temp;
                }
            }
        }
        var aa = true;
        var bb = true;
        var cc = true;
        var dd = true;
        var ee = true;
        var cIndex = 0;
        var textItem = new GHashMap();
        var objText = new textObj();
        for (var i = 0; i < textStr.length; i++) {
            var cObj = new contentObj();
            if (comeType == 0 || comeType == 2) {
                if (textStr[i] < 3) {
                    if (aa) {
                        objText = new textObj();
                        aa = false;
                    }
                }
                else if (textStr[i] < 6) {
                    if (bb) {
                        objText = new textObj();
                        bb = false;
                    }
                }
                else if (textStr[i] < 37) {
                    if (cc) {
                        objText = new textObj();
                        cc = false;
                    }
                }
                else if (textStr[i] < 45) {
                    if (dd) {
                        objText = new textObj();
                        dd = false;
                    }
                }
                else if (textStr[i] < 54) {
                    if (ee) {
                        objText = new textObj();
                        ee = false;
                    }
                }
                cObj.content = FootballDataMrg.getInstance.fbNameItem[textStr[i]];
            }
            else {
                if (textStr[i] < 2) {
                    if (aa) {
                        objText = new textObj();
                        aa = false;
                    }
                }
                else if (textStr[i] < 4) {
                    if (bb) {
                        objText = new textObj();
                        bb = false;
                    }
                }
                else if (textStr[i] < 10) {
                    if (cc) {
                        objText = new textObj();
                        cc = false;
                    }
                }
                else if (textStr[i] < 16) {
                    if (dd) {
                        objText = new textObj();
                        dd = false;
                    }
                }
                else if (textStr[i] < 19) {
                    if (ee) {
                        objText = new textObj();
                        ee = false;
                    }
                }
                cObj.content = BasketballDataMrg.getInstance.BasketballList[textStr[i]];
            }
            var num = 0;
            if (data.listSX[textStr[i]] != undefined)
                num = data.listSX[textStr[i]];
            cObj.data = "(" + num + ")"; //例如 (1.52)
            // cObj.data = "";
            objText.contentArr.Gput(cIndex, cObj);
            cIndex += 1;
            if (comeType == 0 || comeType == 2) {
                if (textStr[i] < 3) {
                    objText.title = "胜平负";
                    textItem.Gput(0, objText);
                }
                else if (textStr[i] < 6) {
                    objText.title = "\u8BA9\u7403\u80DC\u5E73\u8D1F" + this._data.lot_lose;
                    textItem.Gput(1, objText);
                }
                else if (textStr[i] < 37) {
                    objText.title = "比分";
                    textItem.Gput(2, objText);
                }
                else if (textStr[i] < 45) {
                    objText.title = "总进球";
                    textItem.Gput(3, objText);
                }
                else if (textStr[i] < 54) {
                    objText.title = "半全场";
                    textItem.Gput(4, objText);
                }
            }
            else {
                if (textStr[i] < 2) {
                    objText.title = "非让";
                    textItem.Gput(0, objText);
                }
                else if (textStr[i] < 4) {
                    objText.title = "\u8BA9\u5206" + this._data.lot_lose;
                    textItem.Gput(1, objText);
                }
                else if (textStr[i] < 10) {
                    objText.title = "客胜";
                    textItem.Gput(2, objText);
                }
                else if (textStr[i] < 16) {
                    objText.title = "主胜";
                    textItem.Gput(3, objText);
                }
                else if (textStr[i] < 19) {
                    objText.title = "大小分";
                    textItem.Gput(4, objText);
                }
            }
        }
        var textHeight = 114;
        for (var _i = 0, _a = textItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._contentItem.GhasKey(key)) {
                obj = this._contentItem.Gget(key);
            }
            else {
                obj = ToolMrg.getText(60, textHeight, 28, 0xff7000, 470);
                this._contentItem.Gput(key, obj);
            }
            if (obj.parent == undefined)
                this.addChild(obj);
            obj.lineSpacing = 12;
            var str = "";
            for (var _b = 0, _c = textItem.Gget(key).contentArr.keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                str = str + textItem.Gget(key).contentArr.Gget(akey).content + textItem.Gget(key).contentArr.Gget(akey).data + ",";
            }
            str = str.substring(0, str.length - 1);
            obj.text = "[" + textItem.Gget(key).title + "] " + str;
            obj.y = textHeight;
            textHeight = textHeight + obj.height + 8;
        }
        ToolMrg.upItemofGHashMap(this._contentItem, textItem);
        textHeight = textHeight - 84;
        // this._box.graphics.drawRoundRect(30,84,520,textHeight+24,18);
        this._box.width = 520;
        this._box.height = textHeight + 24;
        this._link.graphics.clear();
        this._link.graphics.beginFill(0xDEDEDE);
        this._link.graphics.drawRect(0, 84 + textHeight + 52, 750, 2);
        this._link.graphics.endFill();
        this._mShareC.graphics.clear();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 84 + textHeight + 62);
        this._mShareC.graphics.endFill();
        // egret.log(textItem);
    };
    /**适配处理 */
    GoFBBuyInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 210);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return GoFBBuyInfo;
}(egret.DisplayObjectContainer));
__reflect(GoFBBuyInfo.prototype, "GoFBBuyInfo");
var textObj = (function () {
    function textObj() {
        this.contentArr = new GHashMap();
    }
    return textObj;
}());
__reflect(textObj.prototype, "textObj");
var contentObj = (function () {
    function contentObj() {
    }
    return contentObj;
}());
__reflect(contentObj.prototype, "contentObj");
/**晒单数据对象 */
var DryingData = (function () {
    function DryingData() {
        /**勾选状态 0没有选 1公开 2截止后公开 3保密 */
        this.type = 0;
        /**盈利提成 */
        this.yltc = 0;
        /**方案宣言 */
        this.faxy = "";
    }
    return DryingData;
}());
__reflect(DryingData.prototype, "DryingData");
//# sourceMappingURL=GoFBBuy.js.map