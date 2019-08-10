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
/**方块id 长度 高度 居中内容 上、下内容 上内容y轴 下内容y轴 */
var SPBlock = (function (_super) {
    __extends(SPBlock, _super);
    function SPBlock(index, width, height, topY, downY, special, typeImg) {
        var _this = _super.call(this) || this;
        _this.selectType = false;
        _this._isInterception = false;
        _this.touchEnabled = true;
        _this.index = index;
        _this._width = width;
        _this._height = height;
        _this._special = special;
        // this._typeImg = typeImg;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        _this._img.width = width;
        _this._img.height = height;
        var rect = new egret.Rectangle(20, 27, 380, 50);
        _this._img.scale9Grid = rect;
        if (_this._typeImg == undefined)
            RES.getResByUrl("resource/assets/images/ui/bfbg_nor_home@2x.png", function (e) { _this._img.$setBitmapData(e); }, _this);
        else
            RES.getResByUrl("resource/assets/images/ui/xx_nor_home@2x.png", function (e) { _this._img.$setBitmapData(e); }, _this);
        RES.getResByUrl("resource/assets/images/ui/bfbg_home@2x.png", function (e) { }, _this);
        _this._text = ToolMrg.getText(1.5, 1.5, 24, 0x333333, width - 3);
        _this.addChild(_this._text);
        _this._text.height = height - 3;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._topText = ToolMrg.getText(1.5, 7, 24, 0x333333, width - 3);
        _this.addChild(_this._topText);
        _this._topText.textAlign = egret.HorizontalAlign.CENTER;
        if (topY != undefined)
            _this._topText.y = topY;
        _this._downText = ToolMrg.getText(1.5, 36, 20, 0x333333, width - 3);
        _this.addChild(_this._downText);
        _this._downText.textAlign = egret.HorizontalAlign.CENTER;
        if (downY != undefined)
            _this._downText.y = downY;
        return _this;
    }
    SPBlock.prototype.aa = function (id, num, text, top, down) {
        this._dataNum = num;
        this.id = id;
        if (text != undefined)
            this._text.text = text;
        if (top != undefined)
            this._topText.text = top;
        if (down != undefined)
            this._downText.text = down;
    };
    SPBlock.prototype.clear = function () {
        this.selectType = false;
        this.changeCss();
    };
    SPBlock.prototype.changeCss = function () {
        var _this = this;
        var num;
        if (this.selectType) {
            num = 0xffffff;
        }
        else {
            num = 0x333333;
        }
        var str = "";
        if (this.selectType) {
            str = "bfbg_home@2x.png";
        }
        else {
            if (this._typeImg != undefined) {
                str = "xx_nor_home@2x.png";
            }
            else {
                str = "bfbg_nor_home@2x.png";
            }
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._img.$setBitmapData(e); }, this);
        this._topText.textColor = num;
        this._downText.textColor = num;
        this._text.textColor = num;
    };
    SPBlock.prototype.touchDown = function (e) {
        if (this._dataNum == 0) {
            Alertpaner.getInstance.show("暂未开盘");
            return;
        }
        var item1 = SPG1Wnd.getInstance.getArrSize();
        var item2 = SPOnePass.getInstance.getArrSize();
        var aa = true;
        for (var i = 0; i < item1.length; i++) {
            if (this.id == item1[i].dlxId)
                aa = false;
        }
        for (var i = 0; i < item2.length; i++) {
            if (this.id == item2[i].dlxId)
                aa = false;
        }
        if (item1.length == 8 || item2.length == 8) {
            if (aa) {
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
        }
        this.selectType = !this.selectType;
        this.changeCss();
        if (this._special == 0) {
            SPG1more.getInstance.changeNumItem(this.index, this.selectType);
        }
        else if (this._special == 1) {
            SPG4more.getInstance.changeNumItem(this.index, this.selectType);
        }
        else if (this._special == null) {
            if (SPFbWnd.inIndex == 0) {
                SPG1Wnd.getInstance.changeTextAndData(this.id, this.index, this.selectType);
            }
            else {
                SPOnePass.getInstance.changeTextAndData(this.id, this.index, this.selectType);
            }
        }
    };
    SPBlock.prototype.addInterception = function () {
        if (!this._isInterception) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    SPBlock.prototype.removeInterception = function () {
        if (this._isInterception) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return SPBlock;
}(egret.DisplayObjectContainer));
__reflect(SPBlock.prototype, "SPBlock");
//# sourceMappingURL=SPBlock.js.map