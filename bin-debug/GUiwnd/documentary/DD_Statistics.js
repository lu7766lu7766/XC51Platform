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
/**战绩 近几中几 */
var DD_Statistics = (function (_super) {
    __extends(DD_Statistics, _super);
    function DD_Statistics() {
        var _this = _super.call(this) || this;
        _this._item = new GHashMap();
        _this._content = ToolMrg.getText(0, 4, 24, 0x999999);
        _this.addChild(_this._content);
        _this._link = new egret.Shape();
        _this.addChild(_this._link);
        _this._link.graphics.beginFill(0xcacaca);
        _this._link.graphics.drawRect(106, 10, 192, 2);
        _this._link.graphics.endFill();
        return _this;
    }
    /** 最近场数 最近中场数 7场结果 */
    DD_Statistics.prototype.updata = function (ji, zh, arr) {
        // this._content.text = "";
        if (arr.length > 0)
            this._link.visible = true;
        else
            this._link.visible = false;
        this._content.textFlow = [
            { "text": "近", style: { "textColor": 0x999999 } },
            { "text": ji + "\u4E2D" + zh, style: { "textColor": 0xF72F53 } }
        ];
        var objWidth = 76 + 18;
        for (var i = 0; i < arr.length; i++) {
            var obj = void 0;
            if (this._item.GhasKey(i)) {
                obj = this._item.Gget(i);
            }
            else {
                obj = new StatisticsInfo();
                this._item.Gput(i, obj);
            }
            obj.aa(arr[i]);
            obj.y = 0;
            obj.x = objWidth;
            objWidth = objWidth + obj.width + 4;
            if (obj.parent == undefined)
                this.addChild(obj);
        }
    };
    return DD_Statistics;
}(egret.DisplayObjectContainer));
__reflect(DD_Statistics.prototype, "DD_Statistics");
var StatisticsInfo = (function (_super) {
    __extends(StatisticsInfo, _super);
    function StatisticsInfo() {
        var _this = _super.call(this) || this;
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0xcacaca);
        _this._shape.graphics.drawEllipse(0, 0, 25, 25);
        _this._shape.graphics.endFill();
        _this._content = ToolMrg.getText(0, 0, 16, 0xffffff, 25);
        _this.addChild(_this._content);
        _this._content.height = 25;
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        _this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    StatisticsInfo.prototype.aa = function (num) {
        this._shape.graphics.clear();
        if (num == 1) {
            this._shape.graphics.beginFill(0xE72E52);
            this._content.text = "赢";
        }
        else {
            this._shape.graphics.beginFill(0xcacaca);
            this._content.text = "输";
        }
        this._shape.graphics.drawEllipse(0, 0, 25, 25);
        this._shape.graphics.endFill();
    };
    return StatisticsInfo;
}(egret.DisplayObjectContainer));
__reflect(StatisticsInfo.prototype, "StatisticsInfo");
//# sourceMappingURL=DD_Statistics.js.map