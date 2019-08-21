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
/**我的关注 */
var LikeWnd = (function (_super) {
    __extends(LikeWnd, _super);
    function LikeWnd() {
        var _this = _super.call(this) || this;
        _this.y = GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._fanItem = new GHashMap();
        _this._topUI = new TopUI("我的关注", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    LikeWnd.prototype.updata = function () {
        var objHeight = 0;
        for (var key = 0; key < 5; key++) {
            var obj = void 0;
            if (this._fanItem.GhasKey(key)) {
                obj = this._fanItem.Gget(key);
            }
            else {
                obj = new FanofLikeInfo();
            }
            obj.aa();
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
    };
    LikeWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.updata();
    };
    LikeWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            for (var _i = 0, _a = this._fanItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._fanItem.Gget(key).removeInterception();
            }
        }
    };
    LikeWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    LikeWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    LikeWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    LikeWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96;
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
    LikeWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return LikeWnd;
}(egret.DisplayObjectContainer));
__reflect(LikeWnd.prototype, "LikeWnd");
//# sourceMappingURL=LikeWnd.js.map