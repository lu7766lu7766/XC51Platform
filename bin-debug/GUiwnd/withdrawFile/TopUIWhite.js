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
var TopUIWhite = (function (_super) {
    __extends(TopUIWhite, _super);
    function TopUIWhite(text, thisy, isleft, isLogin) {
        var _this = _super.call(this) || this;
        if (thisy != undefined)
            _this.y = thisy;
        var num = GameValue.adaptationScreen;
        _this._bjImg = new egret.Bitmap();
        _this.addChild(_this._bjImg);
        var rect = new egret.Rectangle(0, 0, 0, 96);
        _this._bjImg.scale9Grid = rect;
        // if (isLogin != undefined) {
        // 	RES.getResByUrl(`resource/assets/images/ui/` + isLogin, (e) => {
        // 		this._bjImg.$setBitmapData(e);
        // 	}, this);
        // } else {
        RES.getResByUrl("resource/assets/images/ui/bg2_nav@2x.png", function (e) {
            _this._bjImg.$setBitmapData(e);
            _this._bjImg.height = 96 + num;
        }, _this);
        // }
        // let link = new egret.Shape();
        // this.addChild(link);
        // link.graphics.beginFill(0xffffff);
        // link.graphics.drawRect(0, 0, 750, 96 + num);
        // link.graphics.endFill();
        // link.alpha = 1;
        if (isleft == undefined) {
            _this._Img = new egret.Bitmap();
            _this.addChild(_this._Img);
            RES.getResByUrl("resource/assets/images/ui/returnWhite.png", function (e) {
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
        _this._text = ToolMrg.getText(0, num, 36, 0x333333, 750);
        _this.addChild(_this._text);
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._text.height = 96;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._text.text = text;
        _this._text.bold = true;
        _this._tkrecordText = ToolMrg.getText(614, num, 28, 0x333333, 160);
        _this.addChild(_this._tkrecordText);
        _this._tkrecordText.height = 96;
        _this._tkrecordText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._tkrecordText.text = text;
        _this._tkrecordText.bold = true;
        _this._tkrecordText.text = "提款记录";
        _this._tkrecordText.touchEnabled = true;
        return _this;
    }
    TopUIWhite.prototype.changeTitle = function (str) {
        this._text.text = str;
    };
    TopUIWhite.prototype.getReturn = function () {
        return this._shape;
    };
    TopUIWhite.prototype.getreturnSprite = function () {
        return this._Img;
    };
    /**提款记录text按钮 */
    TopUIWhite.prototype.gettkrecordBnt = function () {
        return this._tkrecordText;
    };
    TopUIWhite.prototype.hideTxText = function () {
        this._tkrecordText.visible = false;
    };
    return TopUIWhite;
}(egret.DisplayObjectContainer));
__reflect(TopUIWhite.prototype, "TopUIWhite");
//# sourceMappingURL=TopUIWhite.js.map