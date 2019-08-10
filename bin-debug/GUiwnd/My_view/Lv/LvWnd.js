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
/**等级中心 */
var LvWnd = (function (_super) {
    __extends(LvWnd, _super);
    function LvWnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("VIP等级");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._btn = new egret.Bitmap();
        _this._mContain.addChild(_this._btn);
        RES.getResByUrl("resource/assets/images/ui/Lv.png", function (e) { _this._btn.$setBitmapData(e); }, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(LvWnd, "getInstance", {
        get: function () {
            if (LvWnd._mInstance == undefined)
                LvWnd._mInstance = new LvWnd();
            return LvWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    LvWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
    };
    LvWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    LvWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    LvWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    LvWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    LvWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    LvWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return LvWnd;
}(egret.DisplayObjectContainer));
__reflect(LvWnd.prototype, "LvWnd");
//# sourceMappingURL=LvWnd.js.map