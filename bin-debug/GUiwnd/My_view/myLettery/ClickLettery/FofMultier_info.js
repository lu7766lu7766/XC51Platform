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
/**投注内容 new */
var FofMultier_info = (function (_super) {
    __extends(FofMultier_info, _super);
    function FofMultier_info() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xDEDEDE);
        link1.graphics.drawRect(0, 158.5, 750, 1.5);
        link1.graphics.endFill();
        var link2 = new egret.Shape();
        _this.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(372, 0, 1.5, 160);
        link2.graphics.endFill();
        var link3 = new egret.Shape();
        _this.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(592, 0, 1.5, 160);
        link3.graphics.endFill();
        _this._topText = ToolMrg.getText(20, 0, 24, 0xff7000, 40);
        _this.addChild(_this._topText);
        _this._topText.lineSpacing = 4;
        _this._topText.height = 160;
        _this._topText.textAlign = egret.HorizontalAlign.CENTER;
        _this._topText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._centerText = ToolMrg.getText(48, 0, 22, 0x333333, 326);
        _this.addChild(_this._centerText);
        _this._centerText.lineSpacing = 5;
        _this._centerText.height = 160;
        _this._centerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._centerText.textAlign = egret.HorizontalAlign.CENTER;
        _this._moneyText = ToolMrg.getText(592, 0, 32, 0xf72e52, 158);
        _this.addChild(_this._moneyText);
        _this._moneyText.height = 160;
        _this._moneyText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._moneyText.textAlign = egret.HorizontalAlign.CENTER;
        _this._MultiplierText = ToolMrg.getText(394, 52, 32, 0x333333, 180);
        _this.addChild(_this._MultiplierText);
        _this._MultiplierText.height = 60;
        _this._MultiplierText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._MultiplierText.textAlign = egret.HorizontalAlign.CENTER;
        _this._MultiplierText.text = "1";
        _this.setDB();
        return _this;
    }
    /**适配处理 */
    FofMultier_info.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        // this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        // this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,160);
        // this._mShareC.graphics.endFill();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 160;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { _this._mShareC.$setBitmapData(e); }, this);
        this.addChildAt(this._mShareC, 0);
    };
    /** listType传入足篮类型 1 5足 2 6篮 */
    FofMultier_info.prototype.aa = function (data) {
        var list = [];
        if (data.m == 1 || data.m == 5) {
            list = FootballDataMrg.getInstance.fbNameItem;
        }
        else if (data.m == 2 || data.m == 6) {
            list = BasketballDataMrg.getInstance.BasketballList;
        }
        this._data = data;
        if (data.type == 1)
            this._topText.text = "单\n关";
        else
            this._topText.text = data.type + "\n串\n1";
        var str = "";
        for (var i = 0; i < data.team.length; i++) {
            data.team[i][1];
            str = "" + str + ToolMrg.nameMode2(6, data.team[i][0]) + "=" + list[Number(data.team[i][1])] + "[" + data.team[i][2] + "]\n";
        }
        if (data.team.length > 5) {
            str = "......";
        }
        else {
            str = str.substring(0, str.length - 1);
        }
        this._centerText.text = str;
        this._moneyText.text = ToolMrg.getDecimal(data.reward / 100, 2) + "元";
        this._MultiplierText.text = data.b + "倍";
        this.setclore();
    };
    /**设置投注内容颜色*/
    FofMultier_info.prototype.setclore = function () {
        if (this._data.awareType == 1) {
            this._centerText.textColor = 0xf72e52;
            this._MultiplierText.textColor = 0xf72e52;
            this._moneyText.textColor = 0xf72e52;
        }
        else {
            this._centerText.textColor = 0x333333;
            this._MultiplierText.textColor = 0x333333;
            this._moneyText.textColor = 0x333333;
        }
    };
    return FofMultier_info;
}(egret.DisplayObjectContainer));
__reflect(FofMultier_info.prototype, "FofMultier_info");
//# sourceMappingURL=FofMultier_info.js.map