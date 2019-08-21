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
// TypeScript file
var Alertpaner = (function (_super) {
    __extends(Alertpaner, _super);
    function Alertpaner() {
        var _this = _super.call(this) || this;
        _this.onInit();
        return _this;
    }
    Object.defineProperty(Alertpaner, "getInstance", {
        get: function () {
            if (Alertpaner._mInstance == undefined)
                Alertpaner._mInstance = new Alertpaner();
            return Alertpaner._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    Alertpaner.prototype.onInit = function () {
        this.alertGroup = new egret.DisplayObjectContainer();
        this.alertGroup.x = (GameMain.getInstance.StageWidth - 348) * 0.5;
        this.alertGroup.y = (GameMain.getInstance.StageHeight - 98) * 0.5;
        this.alertGroup.width = 348;
        this.alertGroup.height = 98;
        this.addChild(this.alertGroup);
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0x949494, 0.9);
        this.shape.graphics.drawRoundRect(0, 0, 348, 98, 10, 10);
        this.shape.graphics.endFill();
        this.text = this.getText(0, 0, 24, 0xffffff, 348);
        this.text.bold = true;
        this.text.height = 98;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
        this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.text.lineSpacing = 10;
        this.alertGroup.addChild(this.shape);
        this.alertGroup.addChild(this.text);
    };
    //显示
    Alertpaner.prototype.show = function (str) {
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
            setTimeout(function () {
                Alertpaner.getInstance.hide();
            }, 1300);
        }
        this.text.text = str;
    };
    Alertpaner.prototype.getText = function (x, y, size, color, width) {
        var text = new egret.TextField();
        text.x = x - this.x;
        text.y = y - this.y;
        text.fontFamily = "微软雅黑";
        text.size = size;
        text.textColor = color;
        if (width != undefined)
            text.width = width;
        return text;
    };
    //隐藏
    Alertpaner.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return Alertpaner;
}(egret.DisplayObjectContainer));
__reflect(Alertpaner.prototype, "Alertpaner");
//# sourceMappingURL=Alertpaner.js.map