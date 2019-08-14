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
/**发单或跟单投注信息(底部信息) */
var TwofaView = (function (_super) {
    __extends(TwofaView, _super);
    function TwofaView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.connetop = new egret.DisplayObjectContainer();
        _this.addChild(_this.connetop);
        var link2 = new egret.Bitmap();
        _this.connetop.addChild(link2);
        link2.x = 0;
        link2.y = 0;
        link2.height = 10;
        link2.width = 750;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link2.$setBitmapData(e); }, _this);
        var mtext7 = ToolMrg.getText(28, 32, 24, 0x333333);
        _this.connetop.addChild(mtext7);
        mtext7.text = "投注信息:";
        var mtext9 = ToolMrg.getText(28, 116 - 50, 24, 0x333333);
        _this.connetop.addChild(mtext9);
        mtext9.height = 50;
        mtext9.verticalAlign = egret.VerticalAlign.MIDDLE;
        mtext9.text = "预测奖金:";
        _this.yjaware2 = ToolMrg.getText(mtext9.x + mtext9.width + 10, mtext9.y, 20, 0x999999);
        _this.connetop.addChild(_this.yjaware2);
        _this.yjaware2.height = mtext9.height;
        _this.yjaware2.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.yjaware2.text = "1000元";
        _this.mtext7Img = new egret.Bitmap();
        _this.connetop.addChild(_this.mtext7Img);
        _this.mtext7Img.x = 152;
        _this.mtext7Img.y = 33;
        _this.mtext7Img.width = 72;
        _this.mtext7Img.height = 24;
        RES.getResByUrl("resource/assets/images/ui/fshi_mine@2x.png", function (e) {
            _this.mtext7Img.$setBitmapData(e);
        }, _this);
        var link = new egret.Shape();
        _this.connetop.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 130, GameMain.getInstance.StageWidth, 1.5);
        link.graphics.endFill();
        var text = ToolMrg.getText(28, 27 + 130, 22, 0x999999);
        _this.connetop.addChild(text);
        text.lineSpacing = 8;
        text.text = "注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅\n供参考，实际奖金以投注成功为准。";
        _this.mtextNum1 = ToolMrg.getText(_this.mtext7Img.x, _this.mtext7Img.y, 20, 0xFF7000);
        _this.connetop.addChild(_this.mtextNum1);
        _this.mtextNum1.height = _this.mtext7Img.height;
        _this.mtextNum1.width = _this.mtext7Img.width;
        _this.mtextNum1.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.mtextNum1.textAlign = egret.HorizontalAlign.CENTER;
        _this.mtextNum1.text = "3场";
        _this._checkBtn = new egret.Bitmap();
        _this.connetop.addChild(_this._checkBtn);
        _this._checkBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/checkDetail.png", function (e) {
            _this._checkBtn.$setBitmapData(e);
            _this._checkBtn.x = 584;
            _this._checkBtn.y = 33;
        }, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(TwofaView, "getInstance", {
        get: function () {
            if (TwofaView._mInstance == undefined)
                TwofaView._mInstance = new TwofaView();
            return TwofaView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    TwofaView.prototype.show = function (present, data, pointy) {
        this.y = pointy;
        this._data = data;
        if (this.parent == undefined) {
            present.addChild(this);
        }
        if (data != undefined) {
            if (data.lotteryType == 1) {
                Topcc.getInstance.hide();
                this.connetop.y = 0;
            }
            else if (data.lotteryType == 2) {
                Topcc.getInstance.show(this);
                this.connetop.y = 80;
            }
            Topcc.getInstance.setzhi(data.numGD + "", data.gtMoney + "");
        }
        this.setaware();
        this.addEvent();
    };
    TwofaView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        Topcc.getInstance.hide();
        this.removeEvent();
    };
    TwofaView.prototype.addEvent = function () {
        this._checkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    TwofaView.prototype.removeEvent = function () {
        this._checkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    TwofaView.prototype.touchDown = function (e) {
        if (e.target == this._checkBtn) {
            RewardPhp.getInstance.sendHttp(this._data.id, this._data.type);
        }
    };
    /**设置预测金额*/
    TwofaView.prototype.setaware = function () {
        var priceList = this._data.yePriceList;
        if (priceList != undefined) {
            if (priceList.length <= 0) {
                this.yjaware2.text = "";
            }
            else {
                this.yjaware2.text = ToolMrg.getDecimal(priceList[0] / 100, 2) + "~" + ToolMrg.getDecimal(priceList[1] / 100, 2) + "\u5143(\u4EE5\u5B9E\u9645\u7ED3\u679C\u4E3A\u51C6)";
            }
            this.setPass(this._data.passList);
        }
    };
    /**设置过关方式*/
    TwofaView.prototype.setPass = function (str) {
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
        this.mtextNum1.text = strN;
    };
    TwofaView.prototype.getStr = function (type) {
        if (type == 1) {
            return "单关";
        }
        else {
            return type + "串1";
        }
    };
    /**适配处理 */
    TwofaView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 292 - 50);
        this._mShareC.graphics.endFill();
        this.connetop.addChildAt(this._mShareC, 0);
    };
    return TwofaView;
}(egret.DisplayObjectContainer));
__reflect(TwofaView.prototype, "TwofaView");
var Topcc = (function (_super) {
    __extends(Topcc, _super);
    function Topcc() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var link1 = new egret.Bitmap();
        _this.addChild(link1);
        link1.x = 0;
        link1.y = 0;
        link1.height = 2;
        link1.width = 750;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { link1.$setBitmapData(e); }, _this);
        _this.gedNum = ToolMrg.getText(26, 0, 24, 0x999999);
        _this.addChild(_this.gedNum);
        // this.gedNum.width = 750;
        _this.gedNum.height = 80;
        // this.gedNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.gedNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.gedNum.text = "跟单1500人";
        _this.gedgoldnum = ToolMrg.getText(750 - 300 - 24, 0, 24, 0x999999);
        _this.addChild(_this.gedgoldnum);
        _this.gedgoldnum.width = 300;
        _this.gedgoldnum.height = 80;
        _this.gedgoldnum.textAlign = egret.HorizontalAlign.RIGHT;
        _this.gedgoldnum.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.gedgoldnum.text = "跟头9000元";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(Topcc, "getInstance", {
        get: function () {
            if (Topcc._mInstance == undefined)
                Topcc._mInstance = new Topcc();
            return Topcc._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**设置跟单人数和跟单金额*/
    Topcc.prototype.setzhi = function (one, two) {
        this.gedNum.text = "跟单" + one + "人";
        this.gedgoldnum.text = "跟投" + two + "元";
    };
    /**适配处理 */
    Topcc.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    Topcc.prototype.show = function (present) {
        if (this.parent == undefined) {
            present.addChild(this);
        }
    };
    Topcc.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return Topcc;
}(egret.DisplayObjectContainer));
__reflect(Topcc.prototype, "Topcc");
//# sourceMappingURL=TwofaView.js.map