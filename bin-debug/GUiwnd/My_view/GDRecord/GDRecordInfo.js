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
var GDRecordInfo = (function (_super) {
    __extends(GDRecordInfo, _super);
    function GDRecordInfo() {
        var _this = _super.call(this) || this;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        _this._img.width = 28;
        _this._img.height = 28;
        _this._img.x = 28;
        _this._img.y = 20;
        _this._typeText = ToolMrg.getText(62, 19, 28, 0x333333);
        _this.addChild(_this._typeText);
        _this._buyText = ToolMrg.getText(202, 20, 28, 0x72e52);
        _this.addChild(_this._buyText);
        _this._sendNameText = ToolMrg.getText(28, 66, 20, 0x999999);
        _this.addChild(_this._sendNameText);
        _this._isWin = ToolMrg.getText(404 + 72, 20, 24, 0xff7000, 250);
        _this.addChild(_this._isWin);
        _this._isWin.textAlign = egret.HorizontalAlign.RIGHT;
        _this._timeText = ToolMrg.getText(404 + 72, 70, 20, 0x999999, 250);
        _this.addChild(_this._timeText);
        _this._timeText.textAlign = egret.HorizontalAlign.RIGHT;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 108, GameMain.getInstance.StageWidth, 2);
        shape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    GDRecordInfo.prototype.aa = function (data) {
        var _this = this;
        this._data = data;
        var str = "";
        if (data._type == 1) {
            str = "jzcg_home@2x.png";
            this._typeText.text = "竞足串关";
        }
        else if (data._type == 2) {
            str = "jzdg_home@2x.png";
            this._typeText.text = "竞足单关";
        }
        else if (data._type == 3) {
            str = "jlcg_home@2x.png";
            this._typeText.text = "竞篮串关";
        }
        else if (data._type == 4) {
            str = "jldg_home@2x.png";
            this._typeText.text = "竞篮单关";
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._img.$setBitmapData(e); }, this);
        if (data._isWin == 1) {
            this._isWin.textColor = 0xff7000;
            this._isWin.text = "待开奖";
        }
        else if (data._isWin == 2) {
            this._isWin.textColor = 0x999999;
            this._isWin.text = "未中奖";
        }
        else if (data._isWin == 3) {
            this._isWin.textColor = 0xF72E52;
            this._isWin.text = "已中奖";
        }
        this._buyText.text = (data.buyMoney / 100).toFixed(2) + "\u5143";
        this._sendNameText.text = "\u53D1\u5355\u8005\uFF1A" + ToolMrg.nameMode2(6, data.sendName);
        this._timeText.text = "" + ToolMrg.getTime1(data.day);
    };
    /**适配处理 */
    GDRecordInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 110);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return GDRecordInfo;
}(egret.DisplayObjectContainer));
__reflect(GDRecordInfo.prototype, "GDRecordInfo");
var GDRecordMrg = (function () {
    function GDRecordMrg() {
        this.GDRItem = new GHashMap();
    }
    Object.defineProperty(GDRecordMrg, "getInstance", {
        get: function () {
            if (GDRecordMrg._mInstance == undefined)
                GDRecordMrg._mInstance = new GDRecordMrg();
            return GDRecordMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    return GDRecordMrg;
}());
__reflect(GDRecordMrg.prototype, "GDRecordMrg");
var GDRecordData = (function () {
    function GDRecordData() {
    }
    return GDRecordData;
}());
__reflect(GDRecordData.prototype, "GDRecordData");
//# sourceMappingURL=GDRecordInfo.js.map