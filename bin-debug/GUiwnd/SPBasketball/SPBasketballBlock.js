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
/**篮球引用 方块Block */
var SPBasketballBlock = (function (_super) {
    __extends(SPBasketballBlock, _super);
    /** 当前所属下标 颜色类型 宽度 高度 toGo点击传递数据页面 titley不填默认 contenty不填默认 */
    function SPBasketballBlock(index, typeColor, width, height, toGo, titleTop, contentTop) {
        var _this = _super.call(this) || this;
        /**是否侦听 */
        _this._isInterception = false;
        /**是否选中 */
        _this.selectType = false;
        /**当前模块所属下标 */
        _this._blockIndex = 0;
        _this._width = 0;
        _this._height = 0;
        _this.touchEnabled = true;
        _this._height = height;
        _this._width = width;
        _this._blockIndex = index;
        _this._typeColor = typeColor;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        _this._img.width = width;
        _this._img.height = height;
        var rect = new egret.Rectangle(10, 10, 140, 60);
        _this._img.scale9Grid = rect;
        _this._title = ToolMrg.getText(0, 21, 24, 0x333333, width);
        _this.addChild(_this._title);
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        if (titleTop != undefined)
            _this._title.y = titleTop;
        _this._content = ToolMrg.getText(0, 55, 24, 0x999999, width);
        _this.addChild(_this._content);
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        if (contentTop != undefined)
            _this._content.y = contentTop;
        if (toGo != null)
            _this._toGo = toGo;
        RES.getResByUrl("resource/assets/images/ui/lqan1_home@2x.png", function (e) { }, _this);
        _this.changeCss();
        return _this;
    }
    /**当前所属id */
    SPBasketballBlock.prototype.aa = function (id, num, topText, downText) {
        this._id = id;
        this._dataNum = num;
        if (topText != null)
            this._title.text = topText;
        if (downText != null)
            this._content.text = downText;
    };
    SPBasketballBlock.prototype.changeCss = function () {
        var _this = this;
        var str = "";
        if (this.selectType) {
            this._title.textColor = 0xffffff;
            this._content.textColor = 0xffffff;
            str = "lqan1_home@2x.png";
        }
        else {
            this._title.textColor = 0x333333;
            this._content.textColor = 0x999999;
            str = this._typeColor == 0 ? "lqan2_home@2x.png" : "lqan3_home@2x.png";
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._img.$setBitmapData(e); }, this);
    };
    SPBasketballBlock.prototype.clear = function () {
        this.selectType = false;
        this.changeCss();
    };
    SPBasketballBlock.prototype.touchDown = function (e) {
        if (this._dataNum == 0) {
            Alertpaner.getInstance.show("暂未开盘");
            return;
        }
        var item1 = SPBasketBallWnd.getInstance.getArrSize();
        var aa = true;
        for (var i = 0; i < item1.length; i++) {
            if (this._id == item1[i].dlxId)
                aa = false;
        }
        if (item1.length == 8) {
            if (aa) {
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
        }
        this.selectType = !this.selectType;
        if (this._toGo == 0) {
            SPB1more.getInstance.addData(this._blockIndex, this.selectType);
        }
        else if (this._toGo == 1) {
            SPB5more.getInstance.addData(this._blockIndex, this.selectType);
        }
        else
            SPBasketBallWnd.getInstance.changeTextAndData(this._id, this._blockIndex, this.selectType);
        this.changeCss();
    };
    SPBasketballBlock.prototype.addInterception = function () {
        if (!this._isInterception) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    SPBasketballBlock.prototype.removeInterception = function () {
        if (this._isInterception) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return SPBasketballBlock;
}(egret.DisplayObjectContainer));
__reflect(SPBasketballBlock.prototype, "SPBasketballBlock");
//# sourceMappingURL=SPBasketballBlock.js.map