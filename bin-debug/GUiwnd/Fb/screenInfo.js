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
var screenInfo = (function (_super) {
    __extends(screenInfo, _super);
    function screenInfo() {
        var _this = _super.call(this) || this;
        _this.selectType = false;
        _this._isInterception = false;
        var bj = new egret.Bitmap();
        _this.addChild(bj);
        bj.height = 92;
        bj.width = 208;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { bj.$setBitmapData(e); }, _this);
        _this._box = new egret.Shape();
        _this.addChild(_this._box);
        _this._box.graphics.beginFill(0xf5f5f8);
        _this._box.graphics.drawRoundRect(0, 0, 160, 72, 20);
        _this._box.graphics.endFill();
        _this._box.touchEnabled = false;
        // this._boxShape = new egret.Shape();
        // this.addChild(this._boxShape);
        // this._boxShape.graphics.beginFill(0xF5F5F7);
        // this._boxShape.graphics.drawRoundRect(2,2,156,68,20);
        // this._boxShape.graphics.endFill();
        _this._content = ToolMrg.getText(0, 0, 28, 0x999999, 160);
        _this.addChild(_this._content);
        _this._content.height = 72;
        _this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        _this._content.touchEnabled = true;
        return _this;
    }
    screenInfo.prototype.aa = function (data, type) {
        this.str = data;
        this._type = type;
        this._content.text = data;
    };
    screenInfo.prototype.getDataId = function () {
        return this.str;
    };
    screenInfo.prototype.changeCss = function () {
        this._box.graphics.clear();
        if (this.selectType) {
            this._box.graphics.beginFill(0xff004c);
            // this._boxShape.alpha = 1;
            this._content.textColor = 0xffffff;
        }
        else {
            this._box.graphics.beginFill(0xf5f5f8);
            // this._boxShape.alpha = 0.98;
            this._content.textColor = 0x999999;
        }
        this._box.graphics.drawRoundRect(0, 0, 160, 72, 20);
        this._box.graphics.endFill();
    };
    screenInfo.prototype.touchDown = function (e) {
        this.selectType = !this.selectType;
        this.changeCss();
        if (this._type == 0) {
            FBscreen.getInstance.addOfremoveToSelectItem(this.str, this.selectType);
        }
        else if (this._type == 1) {
            BasketScreen.getInstance.addOfremoveToSelectItem(this.str, this.selectType);
        }
        else if (this._type == 2) {
            SPFBscreen.getInstance.addOfremoveToSelectItem(this.str, this.selectType);
        }
        else if (this._type == 3) {
            SPBasketScreen.getInstance.addOfremoveToSelectItem(this.str, this.selectType);
        }
    };
    screenInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._content.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    screenInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._content.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return screenInfo;
}(egret.DisplayObjectContainer));
__reflect(screenInfo.prototype, "screenInfo");
var screenMrg = (function () {
    function screenMrg() {
        this._fbSelectItem = new GHashMap();
        var obj = new screenData();
        obj.id = "1";
        obj.titile = "女世界杯";
        this._fbSelectItem.Gput(0, obj);
        var a = new screenData();
        a.id = "2";
        a.titile = "美洲杯";
        this._fbSelectItem.Gput(1, a);
        var b = new screenData();
        b.id = "3";
        b.titile = "日职";
        this._fbSelectItem.Gput(2, b);
        var c = new screenData();
        c.id = "4";
        c.titile = "非洲杯";
        this._fbSelectItem.Gput(3, c);
        var d = new screenData();
        d.id = "5";
        d.titile = "挪威";
        this._fbSelectItem.Gput(4, d);
    }
    Object.defineProperty(screenMrg, "getInstance", {
        get: function () {
            if (screenMrg._mInstance == undefined)
                screenMrg._mInstance = new screenMrg();
            return screenMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    return screenMrg;
}());
__reflect(screenMrg.prototype, "screenMrg");
var screenData = (function () {
    function screenData() {
    }
    return screenData;
}());
__reflect(screenData.prototype, "screenData");
//# sourceMappingURL=screenInfo.js.map