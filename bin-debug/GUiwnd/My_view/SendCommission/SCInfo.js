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
var SCInfo = (function (_super) {
    __extends(SCInfo, _super);
    function SCInfo() {
        var _this = _super.call(this) || this;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        _this._img.width = 28;
        _this._img.height = 28;
        _this._img.x = 28;
        _this._img.y = 20;
        _this._title = ToolMrg.getText(62, 8 + 11, 28, 0x333333);
        _this.addChild(_this._title);
        _this._chuanText = ToolMrg.getText(130, 16 + 5, 24, 0x999999);
        _this.addChild(_this._chuanText);
        _this._dateText = ToolMrg.getText(28, 66 + 4, 20, 0x999999);
        _this.addChild(_this._dateText);
        _this._GDNumText = ToolMrg.getText(236 + 42, 20 + 4, 20, 0x333333, 200);
        _this.addChild(_this._GDNumText);
        _this._GDNumText.textAlign = egret.HorizontalAlign.CENTER;
        _this._rateText = ToolMrg.getText(236 + 42, 70, 20, 0x999999, 200);
        _this.addChild(_this._rateText);
        _this._rateText.textAlign = egret.HorizontalAlign.CENTER;
        _this._GDmoney = ToolMrg.getText(378 + 148, 20 + 4, 20, 0x333333, 200);
        _this.addChild(_this._GDmoney);
        _this._GDmoney.textAlign = egret.HorizontalAlign.RIGHT;
        _this._CMmoney = ToolMrg.getText(350 + 126, 59 + 5, 24, 0xF72E52, 250);
        _this.addChild(_this._CMmoney);
        _this._CMmoney.textAlign = egret.HorizontalAlign.RIGHT;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 108, GameMain.getInstance.StageWidth, 2);
        shape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    SCInfo.prototype.aa = function (data) {
        var _this = this;
        this._data = data;
        var str = "";
        if (data._type == 1) {
            str = "jzcg_home@2x";
            this._title.text = "\u7ADE\u8DB3";
            this._chuanText.text = "\u5355\u5173";
        }
        else if (data._type == 2) {
            str = "jzdg_home@2x";
            this._title.text = "\u7ADE\u8DB3";
            this._chuanText.text = "\u4E32\u5173";
        }
        else if (data._type == 3) {
            str = "jlcg_home@2x";
            this._title.text = "\u7ADE\u7BEE";
            this._chuanText.text = "\u4E32\u5173";
        }
        else if (data._type == 4) {
            str = "jldg_home@2x";
            this._title.text = "\u7ADE\u7BEE";
            this._chuanText.text = "\u5355\u5173";
        }
        RES.getResByUrl("resource/assets/images/ui/" + str + ".png", function (e) { _this._img.$setBitmapData(e); }, this);
        this._dateText.text = ToolMrg.getTime11(data._dateTime);
        this._GDNumText.text = data._GDNum + "\u4EBA\u8DDF\u5355";
        this._rateText.text = "\u4F63\u91D1\u6BD4\u4F8B\uFF1A" + data._rate + "%";
        this._GDmoney.text = "\u8DDF\u5355\u91D1\u989D\uFF1A" + ToolMrg.getDecimal(data._GDmoney / 100, 2) + "\u5143";
        this._CMmoney.text = "\u4F63\u91D1\uFF1A" + ToolMrg.getDecimal(data._CMmoney / 100, 2) + "\u5143";
    };
    /**适配处理 */
    SCInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 110);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return SCInfo;
}(egret.DisplayObjectContainer));
__reflect(SCInfo.prototype, "SCInfo");
var SCData = (function () {
    function SCData() {
    }
    return SCData;
}());
__reflect(SCData.prototype, "SCData");
//# sourceMappingURL=SCInfo.js.map