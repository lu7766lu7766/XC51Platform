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
/**活动8388红利 */
var activityone = (function (_super) {
    __extends(activityone, _super);
    function activityone() {
        var _this = _super.call(this) || this;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("首存8388元红利");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.icon1 = new egret.Bitmap();
        _this._mContainQB.addChild(_this.icon1);
        _this.icon1.x = 0;
        _this.icon1.y = 0;
        RES.getResByUrl("resource/assets/images/ui/sc1_find@2x.png", function (e) {
            _this.icon1.$setBitmapData(e);
        }, _this);
        _this.icon2 = new egret.Bitmap();
        _this._mContainQB.addChild(_this.icon2);
        _this.icon2.x = 0;
        _this.icon2.y = 709;
        RES.getResByUrl("resource/assets/images/ui/sc2_find@2x.png", function (e) {
            _this.icon2.$setBitmapData(e);
        }, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(activityone, "getInstance", {
        get: function () {
            if (activityone._mInstance == undefined)
                activityone._mInstance = new activityone();
            return activityone._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    activityone.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this._scroViewQB.setScrollTop(0);
    };
    activityone.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    activityone.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 0;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 96 + GameValue.adaptationScreen;
        // scroView.bounces = true;
    };
    /**适配处理 */
    activityone.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return activityone;
}(egret.DisplayObjectContainer));
__reflect(activityone.prototype, "activityone");
//# sourceMappingURL=activityone.js.map