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
/**
 * 置顶按钮
 */
var TopBtn = (function (_super) {
    __extends(TopBtn, _super);
    function TopBtn() {
        var _this = _super.call(this) || this;
        GResCache.loadResByUrl("resource/assets/images/ui/today_match@2x.png", _this.onLoaded, _this);
        return _this;
    }
    Object.defineProperty(TopBtn, "getInstance", {
        get: function () {
            if (TopBtn._mInstance == undefined)
                TopBtn._mInstance = new TopBtn();
            return TopBtn._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    TopBtn.prototype.onLoaded = function (data, url) {
        if (data == undefined)
            return;
        this.texture = GResCache.getRes(url);
    };
    TopBtn.prototype.show = function (parent, scroll, y) {
        if (this.parent != parent)
            parent.addChild(this);
        this.scroll = scroll;
        // this.x = GameMain.getInstance.StageWidth - 63;
        this.x = 304;
        this.y = y != undefined ? y : GameMain.getInstance.StageHeight - 320;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtn, this);
        this.scroll.addEventListener(egret.Event.CHANGE, this.onScrollChange, this);
        this.visible = false;
    };
    TopBtn.prototype.hide = function () {
        if (this.parent)
            this.parent.removeChild(this);
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtn, this);
        if (this.scroll) {
            this.scroll.removeEventListener(egret.Event.CHANGE, this.onScrollChange, this);
            this.scroll = null;
        }
    };
    TopBtn.prototype.touchBtn = function (e) {
        if (this.scroll)
            this.scroll.setScrollTop(0, 300);
    };
    TopBtn.prototype.onScrollChange = function (e) {
        if (this.scroll)
            this.visible = this.scroll.scrollTop > 200;
    };
    return TopBtn;
}(egret.Bitmap));
__reflect(TopBtn.prototype, "TopBtn");
//# sourceMappingURL=TopBtn.js.map