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
var SelectInfo = (function (_super) {
    __extends(SelectInfo, _super);
    function SelectInfo() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 140);
        shape.graphics.endFill();
        _this._bj = new egret.Bitmap();
        _this.addChild(_this._bj);
        _this._bj.touchEnabled = true;
        _this._bj.x = 28;
        RES.getResByUrl("resource/assets/images/ui/bdbg_mine@2x.png", function (e) { _this._bj.$setBitmapData(e); }, _this);
        _this._BankText = ToolMrg.getText(54, 0, 28, 0x333333);
        _this.addChild(_this._BankText);
        _this._BankText.height = 100;
        _this._BankText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._BankText.bold = true;
        _this._typeCard = ToolMrg.getText(422 + 84, 0, 28, 0x333333, 200);
        _this.addChild(_this._typeCard);
        _this._typeCard.height = 100;
        _this._typeCard.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._typeCard.textAlign = egret.HorizontalAlign.RIGHT;
        return _this;
    }
    SelectInfo.prototype.aa = function (data) {
        this._data = data;
        var of4 = "";
        if (data.cardNum.length > 4)
            of4 = data.cardNum.substring(data.cardNum.length - 4, data.cardNum.length);
        else
            of4 = data.cardNum;
        this._BankText.text = data.BankName + "(" + of4 + ")";
        this._typeCard.text = "" + data.typeName;
    };
    SelectInfo.prototype.touchDown = function () {
        egret.log(this._data);
    };
    SelectInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._bj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    SelectInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._bj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return SelectInfo;
}(egret.DisplayObjectContainer));
__reflect(SelectInfo.prototype, "SelectInfo");
var SelectDataMrg = (function () {
    function SelectDataMrg() {
        this._bankDataItem = new GHashMap();
    }
    Object.defineProperty(SelectDataMrg, "getInstance", {
        get: function () {
            if (SelectDataMrg._mInstance == undefined)
                SelectDataMrg._mInstance = new SelectDataMrg();
            return SelectDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SelectDataMrg.prototype.clearItem = function () {
        this._bankDataItem.clear();
    };
    SelectDataMrg.prototype.getItem = function () {
        return this._bankDataItem;
    };
    SelectDataMrg.prototype.addDataToItem = function (id, obj) {
        this._bankDataItem.Gput(id, obj);
    };
    return SelectDataMrg;
}());
__reflect(SelectDataMrg.prototype, "SelectDataMrg");
var SelectData_card = (function () {
    function SelectData_card() {
    }
    return SelectData_card;
}());
__reflect(SelectData_card.prototype, "SelectData_card");
//# sourceMappingURL=SelectInfo_card.js.map