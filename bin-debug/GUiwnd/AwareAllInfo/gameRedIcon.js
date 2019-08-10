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
/**红色数字类 */
var gameRedIcon = (function (_super) {
    __extends(gameRedIcon, _super);
    function gameRedIcon() {
        var _this = _super.call(this) || this;
        _this.redBg = new egret.Bitmap();
        _this.redBg.width = 44;
        _this.redBg.height = 44;
        _this.redBg.x = 0;
        _this.redBg.y = 0;
        _this.addChild(_this.redBg);
        RES.getResByUrl("resource/assets/images/ui/hmbg_home@2x.png", _this.bgBack2, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.numText = ToolMrg.getText(0, 0, 28, 0xffffff);
        _this.numText.width = 44;
        _this.numText.height = 44;
        _this.numText.textAlign = egret.HorizontalAlign.CENTER;
        _this.numText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.numText.text = "";
        _this.numText.fontFamily = "微软雅黑";
        _this.addChild(_this.numText);
        return _this;
    }
    gameRedIcon.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this.redBg != undefined) {
            this.redBg.$setBitmapData(data);
        }
    };
    /**设置号码 */
    gameRedIcon.prototype.setNumText = function (num) {
        this.numText.text = "" + num;
    };
    return gameRedIcon;
}(egret.DisplayObjectContainer));
__reflect(gameRedIcon.prototype, "gameRedIcon");
//# sourceMappingURL=gameRedIcon.js.map