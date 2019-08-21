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
/**单关串关齐加奖 */
var activitytwo = (function (_super) {
    __extends(activitytwo, _super);
    function activitytwo() {
        var _this = _super.call(this) || this;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("单关串关齐加奖");
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
        RES.getResByUrl("resource/assets/images/ui/jj1_find@2x.png", function (e) {
            _this.icon1.$setBitmapData(e);
        }, _this);
        _this.icon2 = new egret.Bitmap();
        _this._mContainQB.addChild(_this.icon2);
        _this.icon2.x = 0;
        _this.icon2.y = 709;
        RES.getResByUrl("resource/assets/images/ui/jj2_find.png", function (e) {
            _this.icon2.$setBitmapData(e);
        }, _this);
        _this.icon3 = new egret.Bitmap();
        _this._mContainQB.addChild(_this.icon3);
        _this.icon3.x = 0;
        _this.icon3.y = 1210;
        RES.getResByUrl("resource/assets/images/ui/jj3_find.png", function (e) {
            _this.icon3.$setBitmapData(e);
        }, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(activitytwo, "getInstance", {
        get: function () {
            if (activitytwo._mInstance == undefined)
                activitytwo._mInstance = new activitytwo();
            return activitytwo._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    activitytwo.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this._scroViewQB.setScrollTop(0);
    };
    activitytwo.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    activitytwo.prototype.addScoll = function (contain, scroView) {
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
    activitytwo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return activitytwo;
}(egret.DisplayObjectContainer));
__reflect(activitytwo.prototype, "activitytwo");
//# sourceMappingURL=activitytwo.js.map