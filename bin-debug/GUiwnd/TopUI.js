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
var TopUI = (function (_super) {
    __extends(TopUI, _super);
    function TopUI(text, thisy, isleft, isLogin) {
        var _this = _super.call(this) || this;
        if (thisy != undefined)
            _this.y = thisy;
        var num = GameValue.adaptationScreen;
        _this._bjImg = new egret.Bitmap();
        _this.addChild(_this._bjImg);
        if (isLogin != undefined) {
            RES.getResByUrl("resource/assets/images/ui/" + isLogin, function (e) {
                _this._bjImg.$setBitmapData(e);
            }, _this);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/bg_nav@2x.png", function (e) {
                _this._bjImg.$setBitmapData(e);
                _this._bjImg.height = 96 + num;
            }, _this);
        }
        if (isleft == undefined) {
            _this._Img = new egret.Bitmap();
            _this.addChild(_this._Img);
            RES.getResByUrl("resource/assets/images/ui/return_nav@2x.png", function (e) {
                _this._Img.$setBitmapData(e);
                _this._Img.x = 26;
                _this._Img.y = 28 + num;
            }, _this);
        }
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0x1cbf4f);
        _this._shape.graphics.drawRect(0, 0, 150, 96 + num);
        _this._shape.graphics.endFill();
        _this._shape.touchEnabled = true;
        _this._shape.alpha = 0.001;
        _this._text = ToolMrg.getText(0, num, 36, 0xffffff, 750);
        _this.addChild(_this._text);
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._text.height = 96;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._text.text = text;
        return _this;
    }
    TopUI.prototype.changeTitle = function (str) {
        this._text.text = str;
    };
    TopUI.prototype.getReturn = function () {
        return this._shape;
    };
    TopUI.prototype.getreturnSprite = function () {
        return this._Img;
    };
    return TopUI;
}(egret.DisplayObjectContainer));
__reflect(TopUI.prototype, "TopUI");
//# sourceMappingURL=TopUI.js.map