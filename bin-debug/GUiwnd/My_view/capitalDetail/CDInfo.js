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
var CDInfo = (function (_super) {
    __extends(CDInfo, _super);
    function CDInfo() {
        var _this = _super.call(this) || this;
        _this._title = ToolMrg.getText(28, 6, 28, 0x333333);
        _this.addChild(_this._title);
        _this._title.height = 50;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.status = ToolMrg.getText(28, 65, 22, 0x333333);
        _this.addChild(_this.status);
        _this.status.height = 50;
        _this.status.bold = true;
        _this.status.text = "";
        _this._dateText = ToolMrg.getText(376 + 150, 80, 20, 0x999999, 200);
        _this.addChild(_this._dateText);
        _this._dateText.height = 28;
        _this._dateText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._dateText.textAlign = egret.HorizontalAlign.RIGHT;
        _this._yeText = ToolMrg.getText(476, 18, 28, 0x333333, 250);
        _this.addChild(_this._yeText);
        _this._yeText.height = 34;
        _this._yeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._yeText.textAlign = egret.HorizontalAlign.RIGHT;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 118.5, GameMain.getInstance.StageWidth, 1.5);
        shape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    CDInfo.prototype.aa = function (data, index) {
        this._data = data;
        var num = 0;
        var str = "";
        if (index == 0) {
            str = "发起认购";
            num = -this._data._money;
        }
        else if (index == 1) {
            str = "账户充值";
            num = this._data._money;
        }
        else if (index == 2) {
            str = "彩金收入";
            num = this._data._money;
        }
        else if (index == 3) {
            str = "账户提现";
            num = -this._data._money;
        }
        else if (index == 4) {
            str = "佣金收入";
            num = this._data._money;
        }
        else if (index == 5) {
            str = "返水收入";
            num = this._data._money;
        }
        else if (index == 6) {
            str = "奖励收入";
            num = this._data._money;
        }
        this._title.text = "" + str;
        this._title.text = this._data.gettatleName();
        this.status.text = this._data.gettatle();
        this._dateText.text = "" + ToolMrg.getTime11(data._dateTime);
        if (num > 0) {
            this._yeText.textColor = 0xF72E52;
            this._yeText.text = "+" + ToolMrg.getDecimal(num / 100, 2) + "\u5143";
        }
        else {
            this._yeText.textColor = 0x17B22C;
            this._yeText.text = ToolMrg.getDecimal(num / 100, 2) + "\u5143";
        }
    };
    /**适配处理 */
    CDInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 120);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return CDInfo;
}(egret.DisplayObjectContainer));
__reflect(CDInfo.prototype, "CDInfo");
var CDMrg = (function () {
    function CDMrg() {
        this._AllZJ = new CDData();
    }
    Object.defineProperty(CDMrg, "getInstance", {
        get: function () {
            if (CDMrg._mInstance == undefined)
                CDMrg._mInstance = new CDMrg();
            return CDMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    return CDMrg;
}());
__reflect(CDMrg.prototype, "CDMrg");
var CDData = (function () {
    function CDData() {
        this.bItem = new GHashMap();
        this.pItem = new GHashMap();
        this.jItem = new GHashMap();
        this.tItem = new GHashMap();
        this.wItem = new GHashMap();
        this.fItem = new GHashMap();
        this.oItem = new GHashMap();
    }
    return CDData;
}());
__reflect(CDData.prototype, "CDData");
var CDDataSub = (function () {
    function CDDataSub() {
        this.status = -1; //类型(提款 特有类型  提款  0:待审核 1:审核通过 2:审核不通过)
        this.type = 0; //名字类型(4 1:佣金 2:中奖金额  5 1:发单奖励  3:佣金  )
    }
    /**提取特有审核状态 */
    CDDataSub.prototype.gettatle = function () {
        var str = "";
        if (this.typemax == 4) {
            if (this.status == 0) {
                str = "待审核";
            }
            else if (this.status == 1) {
                str = "审核通过";
            }
            else if (this.status == 2) {
                str = "审核不通过";
            }
        }
        return str;
    };
    /**类型名字*/
    CDDataSub.prototype.gettatleName = function () {
        var str = "";
        if (this.typemax == 1) {
            str = "发起认购";
        }
        else if (this.typemax == 2) {
            str = "账户充值";
        }
        else if (this.typemax == 3) {
            str = "彩金收入";
        }
        else if (this.typemax == 4) {
            str = "账户提现";
            if (this.type == 1) {
                str = "余额";
            }
            else if (this.type == 2) {
                str = "跟单佣金";
            }
            else if (this.type == 3) {
                str = "代理佣金";
            }
        }
        else if (this.typemax == 5) {
            str = "佣金收入";
            if (this.type == 1) {
                str = "发单奖励";
            }
            else if (this.type == 3) {
                str = "佣金";
            }
        }
        else if (this.typemax == 6) {
            str = "返水收入";
        }
        else if (this.typemax == 7) {
            str = "奖励收入";
        }
        return str;
    };
    return CDDataSub;
}());
__reflect(CDDataSub.prototype, "CDDataSub");
//# sourceMappingURL=CDInfo.js.map