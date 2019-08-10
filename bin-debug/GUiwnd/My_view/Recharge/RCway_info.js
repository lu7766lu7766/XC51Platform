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
/**支付方式 */
var RCway_info = (function (_super) {
    __extends(RCway_info, _super);
    function RCway_info() {
        var _this = _super.call(this) || this;
        _this._isEvent = false;
        var bj = new egret.Bitmap();
        _this.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 140;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { bj.$setBitmapData(e); }, _this);
        _this._link = new egret.Bitmap();
        _this.addChild(_this._link);
        _this._link.x = 40;
        _this._link.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/kuang2_mine@2x.png", function (e) { _this._link.$setBitmapData(e); }, _this);
        _this._click = new egret.Bitmap();
        _this.addChild(_this._click);
        _this._click.x = 590;
        _this._click.y = 40;
        // RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{this._click.$setBitmapData(e); },this);
        // RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{},this);
        _this._title = ToolMrg.getText(80, 14 + 6, 28, 0x333333);
        _this.addChild(_this._title);
        _this._content = ToolMrg.getText(80, 75, 24, 0xf72e52);
        _this.addChild(_this._content);
        return _this;
    }
    RCway_info.prototype.select = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/select_home@2x.png", function (e) { _this._click.$setBitmapData(e); }, this);
    };
    RCway_info.prototype.noselect = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png", function (e) { _this._click.$setBitmapData(e); }, this);
    };
    RCway_info.prototype.getData = function () {
        return this._data;
    };
    RCway_info.prototype.aa = function (data, id) {
        this._data = data;
        this._id = id;
        this._title.text = data._title;
        this._content.text = "\u5145\u503C\u8303\u56F4" + data.small + "\u5143~" + data.max + "\u5143";
    };
    RCway_info.prototype.touchDown = function () {
        if (this._data._titleType == 0)
            return;
        RechargeWnd.getInstance.changeWayNum(this._id);
    };
    RCway_info.prototype.addEvent = function () {
        if (!this._isEvent) {
            this._link.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEvent = true;
        }
    };
    RCway_info.prototype.removeEvent = function () {
        if (this._isEvent) {
            this._link.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEvent = false;
        }
    };
    return RCway_info;
}(egret.DisplayObjectContainer));
__reflect(RCway_info.prototype, "RCway_info");
//# sourceMappingURL=RCway_info.js.map