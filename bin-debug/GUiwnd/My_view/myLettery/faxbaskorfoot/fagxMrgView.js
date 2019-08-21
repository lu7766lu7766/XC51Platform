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
/**篮球和足球跟单详情 */
var fagxMrgView = (function (_super) {
    __extends(fagxMrgView, _super);
    function fagxMrgView() {
        var _this = _super.call(this) || this;
        _this.downObj = new TwofaView();
        _this.touchEnabled = true;
        _this._infoItem = new GHashMap();
        _this._topUI = new TopUI("方案详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this.init();
        var tipLink = new egret.Bitmap();
        _this.addChild(tipLink);
        tipLink.y = GameMain.getInstance.StageHeight - 172;
        tipLink.width = GameMain.getInstance.StageWidth;
        tipLink.height = 2;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { tipLink.$setBitmapData(e); }, _this);
        _this._tipText = ToolMrg.getText(28, GameMain.getInstance.StageHeight - 172 + 28, 22, 0x999999);
        // this.addChild(this._tipText);
        _this._tipText.lineSpacing = 8;
        _this._tipText.text = "注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅\n供参考，实际奖金以投注成功为准。";
        _this._share = new egret.Bitmap();
        _this.addChild(_this._share);
        _this._share.y = 28 + GameValue.adaptationScreen;
        _this._share.x = 670;
        RES.getResByUrl("resource/assets/images/ui/share_nav@2x.png", function (e) { _this._share.$setBitmapData(e); }, _this);
        _this._share.touchEnabled = true;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(fagxMrgView, "getInstance", {
        get: function () {
            if (fagxMrgView._mInstance == undefined)
                fagxMrgView._mInstance = new fagxMrgView();
            return fagxMrgView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    fagxMrgView.prototype.init = function () {
        var _this = this;
        this._mContain = new egret.DisplayObjectContainer();
        var shape1 = new egret.Bitmap();
        this._mContain.addChild(shape1);
        shape1.width = GameMain.getInstance.StageWidth;
        shape1.height = 740;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { shape1.$setBitmapData(e); }, this);
        this._dataInfoContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._dataInfoContain);
        this._dataInfoContain.y = 646;
        this.addScoll();
        this._jiaBtn = new egret.Bitmap();
        this._mContain.addChild(this._jiaBtn);
        this._jiaBtn.x = 594;
        this._jiaBtn.y = 268;
        this._jiaj2 = new egret.Bitmap();
        this._mContain.addChild(this._jiaj2);
        this._jiaj2.x = 590;
        this._jiaj2.y = 26;
        this._jiaj2.visible = false;
        RES.getResByUrl("resource/assets/images/ui/hdjjbq_mine@2x.png", function (e) { _this._jiaj2.$setBitmapData(e); }, this);
        this._typeImg = new egret.Bitmap();
        this._mContain.addChild(this._typeImg);
        this._typeImg.width = 96;
        this._typeImg.height = 96;
        this._typeImg.x = 28;
        this._typeImg.y = 24;
        this._typeName = ToolMrg.getText(152, 26 + 11 + 22, 28, 0x333333);
        this._mContain.addChild(this._typeName);
        this._timer = ToolMrg.getText(152, 68, 24, 0x999999);
        this._mContain.addChild(this._timer);
        this._timer.height = 50;
        this._timer.verticalAlign = egret.VerticalAlign.MIDDLE;
        var mtext1 = ToolMrg.getText(158, 158, 24, 0x333333);
        this._mContain.addChild(mtext1);
        mtext1.height = 50;
        mtext1.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext1.text = "方案编号：";
        var mtext2 = ToolMrg.getText(158, 202, 24, 0x333333);
        this._mContain.addChild(mtext2);
        mtext2.height = 50;
        mtext2.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext2.text = "投注时间：";
        this.mtext3 = ToolMrg.getText(158, 248, 24, 0x333333);
        this._mContain.addChild(this.mtext3);
        this.mtext3.height = 50;
        this.mtext3.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.mtext3.text = "";
        var mtext4 = ToolMrg.getText(158, 292, 24, 0x333333);
        this._mContain.addChild(mtext4);
        mtext4.height = 50;
        mtext4.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext4.text = "中奖金额：";
        var mtext5 = ToolMrg.getText(158, 338, 24, 0x333333);
        this._mContain.addChild(mtext5);
        mtext5.height = 50;
        mtext5.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext5.text = "返水金额：";
        this._fsText = ToolMrg.getText(158 + mtext1.textWidth, 338, 24, 0x333333);
        this._mContain.addChild(this._fsText);
        this._fsText.height = 50;
        this._fsText.verticalAlign = egret.VerticalAlign.MIDDLE;
        var dd = ToolMrg.getText(158, 384, 24, 0x333333);
        this._mContain.addChild(dd);
        dd.height = 50;
        dd.verticalAlign = egret.VerticalAlign.MIDDLE;
        dd.text = "订单状态：";
        this._codeType = ToolMrg.getText(158 + mtext1.textWidth, 384, 24, 0x333333);
        this._mContain.addChild(this._codeType);
        this._codeType.height = 50;
        this._codeType.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._codeNum = ToolMrg.getText(158 + mtext1.textWidth, 158, 24, 0x999999);
        this._mContain.addChild(this._codeNum);
        this._codeNum.height = 50;
        this._codeNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._dateText = ToolMrg.getText(158 + mtext1.textWidth, 202, 24, 0x999999);
        this._mContain.addChild(this._dateText);
        this._dateText.height = 50;
        this._dateText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._tzMoney = ToolMrg.getText(158 + mtext1.textWidth, 248, 24, 0x333333);
        this._mContain.addChild(this._tzMoney);
        this._tzMoney.height = 50;
        this._tzMoney.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._zjMoney = ToolMrg.getText(158 + mtext1.textWidth, 292, 24, 0xFF004D);
        this._zjMoney.height = 50;
        this._zjMoney.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mContain.addChild(this._zjMoney);
        this._jiaMoney = ToolMrg.getText(158 + mtext1.textWidth, 308, 20, 0xFF004D);
        this._mContain.addChild(this._jiaMoney);
        var texta = ToolMrg.getText(0, 144, 28, 0x333333, 118);
        this._mContain.addChild(texta);
        texta.height = 304;
        texta.verticalAlign = egret.VerticalAlign.MIDDLE;
        texta.textAlign = egret.HorizontalAlign.CENTER;
        texta.text = "投\n注\n详\n情";
        var link1 = new egret.Bitmap();
        this._mContain.addChild(link1);
        link1.x = 0;
        link1.y = 144;
        link1.height = 1.5;
        link1.width = GameMain.getInstance.StageWidth;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link1.$setBitmapData(e); }, this);
        var link2 = new egret.Bitmap();
        this._mContain.addChild(link2);
        link2.x = 118;
        link2.y = 164;
        link2.height = 248;
        link2.width = 2;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link2.$setBitmapData(e); }, this);
        var link3 = new egret.Bitmap();
        this._mContain.addChild(link3);
        link3.x = 0;
        link3.y = 448;
        link3.height = 10;
        link3.width = GameMain.getInstance.StageWidth;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link3.$setBitmapData(e); }, this);
        var link4 = new egret.Bitmap();
        this._mContain.addChild(link4);
        link4.x = 0;
        link4.y = 636;
        link4.height = 10;
        link4.width = GameMain.getInstance.StageWidth;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link4.$setBitmapData(e); }, this);
        var mC1 = ToolMrg.getText(30, 0, 20, 0x646464);
        this._dataInfoContain.addChild(mC1);
        mC1.height = 80;
        mC1.verticalAlign = egret.VerticalAlign.MIDDLE;
        mC1.text = "场次";
        var mC2 = ToolMrg.getText(214, 0, 20, 0x646464);
        this._dataInfoContain.addChild(mC2);
        mC2.height = 80;
        mC2.verticalAlign = egret.VerticalAlign.MIDDLE;
        mC2.text = "对阵";
        var mC3 = ToolMrg.getText(464, 0, 20, 0x646464);
        this._dataInfoContain.addChild(mC3);
        mC3.height = 80;
        mC3.verticalAlign = egret.VerticalAlign.MIDDLE;
        mC3.text = "投注项";
        var mC4 = ToolMrg.getText(660, 0, 20, 0x646464);
        this._dataInfoContain.addChild(mC4);
        mC4.height = 80;
        mC4.verticalAlign = egret.VerticalAlign.MIDDLE;
        mC4.text = "赛果";
        var link5 = new egret.Bitmap();
        this._dataInfoContain.addChild(link5);
        link5.x = 0;
        link5.y = 80 - 1.5;
        link5.height = 1.5;
        link5.width = GameMain.getInstance.StageWidth;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link5.$setBitmapData(e); }, this);
        this._fzhiBnt = new egret.Bitmap();
        this._mContain.addChild(this._fzhiBnt);
        this._fzhiBnt.y = 170;
        this._fzhiBnt.x = 484;
        this._fzhiBnt.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/fzhiBnt.png", function (e) { _this._fzhiBnt.$setBitmapData(e); }, this);
        var mtext6 = ToolMrg.getText(28, 480, 24, 0x999999);
        this._mContain.addChild(mtext6);
        mtext6.height = 34;
        mtext6.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext6.text = "发单人：";
        var mtext7 = ToolMrg.getText(76, 560 + 13, 24, 0x999999);
        this._mContain.addChild(mtext7);
        mtext7.text = "跟单奖金";
        var mtext8 = ToolMrg.getText(0, 560 + 13, 24, 0x999999);
        this._mContain.addChild(mtext8);
        mtext8.width = 750;
        mtext8.textAlign = egret.HorizontalAlign.CENTER;
        mtext8.text = "抽佣比例";
        var mtext9 = ToolMrg.getText(582, 560 + 13, 24, 0x999999);
        this._mContain.addChild(mtext9);
        mtext9.text = "抽佣金额";
        this._gdawareText1 = ToolMrg.getText(76, 526, 24, 0xF72E52);
        this._mContain.addChild(this._gdawareText1);
        this._gdawareText1.width = mtext7.width;
        this._gdawareText1.height = 50;
        this._gdawareText1.textAlign = egret.HorizontalAlign.CENTER;
        this._gdawareText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._gdawareText1.text = "100";
        this._gdawareText2 = ToolMrg.getText(0, 526, 24, 0x333333);
        this._mContain.addChild(this._gdawareText2);
        this._gdawareText2.width = 750;
        this._gdawareText2.height = 50;
        this._gdawareText2.textAlign = egret.HorizontalAlign.CENTER;
        this._gdawareText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._gdawareText2.text = "10%";
        this._gdawareText3 = ToolMrg.getText(582, 526, 24, 0xF72E52);
        this._mContain.addChild(this._gdawareText3);
        this._gdawareText3.width = mtext7.width;
        this._gdawareText3.height = 50;
        this._gdawareText3.textAlign = egret.HorizontalAlign.CENTER;
        this._gdawareText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._gdawareText3.text = "+100";
        var link6 = new egret.Bitmap();
        this._mContain.addChild(link6);
        link6.x = 250;
        link6.y = 536;
        link6.height = 60;
        link6.width = 3;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link6.$setBitmapData(e); }, this);
        var link7 = new egret.Bitmap();
        this._mContain.addChild(link7);
        link7.x = 500;
        link7.y = 536;
        link7.height = 60;
        link7.width = 3;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link7.$setBitmapData(e); }, this);
        this.mtext7Img = new egret.Bitmap();
        this._mContain.addChild(this.mtext7Img);
        this.mtext7Img.x = 152;
        this.mtext7Img.y = 484;
        // var rect: egret.Rectangle = new egret.Rectangle(20, 0, 30, 0);
        // this.mtext7Img.scale9Grid = rect;
        RES.getResByUrl("resource/assets/images/ui/hydj_expert@2x.png", function (e) {
            _this.mtext7Img.$setBitmapData(e);
        }, this);
        this._wayText = ToolMrg.getText(116, 480, 20, 0x333333);
        this._mContain.addChild(this._wayText);
        this._wayText.height = 34;
        this._wayText.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this._wayText.textAlign = egret.HorizontalAlign.CENTER;
        this.vipLv = ToolMrg.getText(116, 484, 18, 0xffffff);
        this._mContain.addChild(this.vipLv);
        this.vipLv.height = 24;
        // this.vipLv.text = "Lv5"
        this.vipLv.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._typeState = ToolMrg.getText(28 + mtext7.textWidth, 474, 24, 0x999999);
        this._mContain.addChild(this._typeState);
        this._typeState.height = 34;
        this._typeState.verticalAlign = egret.VerticalAlign.MIDDLE;
    };
    fagxMrgView.prototype.updata = function () {
        var _this = this;
        this._typeName.text = this._data.title;
        RES.getResByUrl("resource/assets/images/ui/" + this._data.url, function (e) { _this._typeImg.$setBitmapData(e); }, this);
        if (this._data.isjia == 1)
            this._jiaj2.visible = true;
        else
            this._jiaj2.visible = false;
        var src = "";
        this._jiaMoney.text = "";
        if (this._data.statue == 1) {
            src = "dkj_mine@2x";
            this._codeType.text = "待开奖";
            this._zjMoney.text = "待开奖";
        }
        else if (this._data.statue == 2) {
            src = "wzj_mine@2x";
            this._codeType.text = "已结算";
            this._zjMoney.text = "未中奖";
        }
        else if (this._data.statue == 3) {
            src = "yzj_mine@2x";
            this._codeType.text = "已结算";
            this._zjMoney.text = "\uFFE5" + this._data.xjMoney;
            if (this._data._reward != undefined && this._data._reward != 0) {
                src = "ykj_mine@2x";
                this._jiaMoney.text = "(+" + ToolMrg.getDecimal(this._data._reward, 2) + ")";
                this._jiaMoney.x = this._zjMoney.x + this._zjMoney.textWidth + 3;
            }
        }
        //加奖 未开奖 中奖 未中奖 图片
        RES.getResByUrl("resource/assets/images/ui/" + src + ".png", function (e) { _this._jiaBtn.$setBitmapData(e); }, this);
        //购买时间
        // this._timer.text = ToolMrg.getTime1(this._data.x);
        this._data._reward;
        var priceList = this._data.yePriceList;
        if (priceList != undefined) {
            if (priceList.length <= 0) {
                this._typeState.text = "";
            }
            else {
                // this._typeState.text = `${ToolMrg.getDecimal(priceList[0] / 100, 2)}~${ToolMrg.getDecimal(priceList[1] / 100, 2)}元(以实际结果为准)`;
            }
        }
        this._tzMoney.text = "\uFFE5" + this._data.xzMoney + "\u5143";
        this._codeNum.text = "" + this._data.id;
        this._dateText.text = ToolMrg.getTime11(this._data.time);
        this._fzhiBnt.x = this._codeNum.x + this._codeNum.textWidth + 18;
        var objheight = 80;
        var data = this._data.fbLotData;
        var len = 0;
        var dataobj;
        if (data != undefined) {
            len = data.size;
        }
        this.cleanList();
        for (var i = 0; i < len; i++) {
            var obj = void 0;
            dataobj = data.Gget(i);
            if (this._infoItem.Gget(i)) {
                obj = this._infoItem.Gget(i);
            }
            else {
                obj = new FofB_Info();
                this._infoItem.Gput(i, obj);
            }
            // obj.aa();
            obj.cleanall();
            if (dataobj != undefined) {
                obj.setdayName(dataobj.nameT, i + 1, dataobj.aName, dataobj.bName, dataobj._time);
                obj.setAllX(dataobj.list);
                if (dataobj.fruitList.length > 0) {
                    obj.setBf(dataobj.fruitList, this._data.type);
                }
                else {
                    obj.setBFF(dataobj._static);
                }
            }
            obj.y = objheight;
            objheight = objheight + obj.height;
            // if (obj.parent == undefined)
            // 	this._dataInfoContain.addChild(obj);
        }
        this.isadd();
        this._fsText.text = "\uFFE5" + ToolMrg.getDecimal(this._data._fs, 2);
        this._gdawareText2.text = this._data._cybl + "%";
        this._gdawareText3.textColor = 0xF72E52;
        if (this._data.statue == 1) {
            this._gdawareText3.text = "--";
            this._gdawareText1.text = "--";
        }
        else {
            if (this._data.lotteryType == 2) {
                this._gdawareText3.textColor = 0xF72E52;
                this._gdawareText3.text = "+" + ToolMrg.getDecimal(this._data._cyje, 2);
            }
            else {
                this._gdawareText3.textColor = 0x1BA22C;
                this._gdawareText3.text = "-" + ToolMrg.getDecimal(this._data._cyje, 2);
            }
            this._gdawareText1.text = "" + ToolMrg.getDecimal(this._data._gdje, 2);
        }
        // this.setPass(this._data.passList);
        this._wayText.text = this._data._mName;
        this.mtext7Img.x = this._wayText.textWidth + 116 + 3;
        this.vipLv.text = "Lv" + (this._data.vip == undefined ? 0 : this._data.vip);
        this.vipLv.x = this.mtext7Img.x + 30;
    };
    fagxMrgView.prototype.cleanList = function () {
        var obj;
        for (var _i = 0, _a = this._infoItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._infoItem.Gget(key);
            if (obj != undefined) {
                if (obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    fagxMrgView.prototype.show = function (data, type) {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addEvent();
        this._data = data;
        this.updata();
        if (type == 1) {
            this.mtext3.text = "跟投金额：";
            this.downObj.show(this, data, GameMain.getInstance.StageHeight - 260);
            this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 260;
            this._share.visible = false;
        }
        else {
            this.mtext3.text = "自购金额：";
            this.downObj.show(this, data, GameMain.getInstance.StageHeight - 340);
            this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 340;
            this._share.visible = true;
        }
    };
    fagxMrgView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.downObj.hide();
            this.removeEvent();
            this.clearData();
        }
    };
    fagxMrgView.prototype.clearData = function () {
        this._jiaMoney.text = "";
        this._typeName.text = "";
        this._typeState.text = "";
        this._tzMoney.text = "";
        this._zjMoney.text = "";
        this._codeNum.text = "";
        this._dateText.text = "";
        this.vipLv.text = "";
        this._typeState.text = "";
        this._scroView.setScrollTop(0);
        for (var _i = 0, _a = this._infoItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._infoItem.Gget(key).parent != undefined)
                this._infoItem.Gget(key).parent.removeChild(this._infoItem.Gget(key));
        }
        this._infoItem.clear();
    };
    /**设置过关方式*/
    fagxMrgView.prototype.setPass = function (str) {
        var strN = "";
        var one = [];
        one = str.split(",");
        if (one.length > 1) {
            for (var i = 0; i < one.length; i++) {
                strN += this.getStr(Number(one[i])) + " ";
            }
        }
        else {
            strN += this.getStr(Number(one[0])) + "";
        }
        this._wayText.text = strN;
    };
    fagxMrgView.prototype.getStr = function (type) {
        if (type == 1) {
            return "单关";
        }
        else {
            return type + "串1";
        }
    };
    fagxMrgView.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._fzhiBnt) {
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this._codeNum.text;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            Alertpaner.getInstance.show("复制成功");
        }
        else if (e.target == this._share) {
            LotteryShare.getInstance.show(this._data.rate == "0" ? "0.00" : this._data.rate);
        }
    };
    fagxMrgView.prototype.isadd = function () {
        var svTop = this._scroView.scrollTop;
        if (this._infoItem != undefined && this._infoItem.size > 0) {
            for (var _i = 0, _a = this._infoItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._infoItem.Gget(key);
                var obj = this._infoItem.Gget(key);
                var objNum = (this._dataInfoContain.y + obj.y) - this._scroView.scrollTop;
                if (objNum > -200 && objNum < GameMain.getInstance.StageHeight + 200) {
                    if (obj.parent == undefined) {
                        this._dataInfoContain.addChild(obj);
                    }
                }
                else {
                    if (obj.parent != undefined)
                        obj.parent.removeChild(obj);
                }
            }
        }
    };
    fagxMrgView.prototype.addEvent = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._fzhiBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._share.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._scroView.addEventListener(egret.TouchEvent.CHANGE, this.isadd, this);
    };
    fagxMrgView.prototype.removeEvent = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._fzhiBnt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._share.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._scroView.removeEventListener(egret.TouchEvent.CHANGE, this.isadd, this);
    };
    /**适配处理 */
    fagxMrgView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    fagxMrgView.prototype.addScoll = function () {
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 172;
        this.addChild(this._scroView);
    };
    return fagxMrgView;
}(egret.DisplayObjectContainer));
__reflect(fagxMrgView.prototype, "fagxMrgView");
//# sourceMappingURL=fagxMrgView.js.map