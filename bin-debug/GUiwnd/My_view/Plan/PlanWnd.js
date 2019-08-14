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
/**合营计划 */
var PlanWnd = (function (_super) {
    __extends(PlanWnd, _super);
    // private _img:egret.Bitmap;
    function PlanWnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("合营计划");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        // this.addChildAt(this._mContain, 1);
        _this.addScoll();
        return _this;
        // this._img = new egret.Bitmap();
        // this._mContain.addChild(this._img);
        // RES.getResByUrl("resource/assets/images/ui/plan.png",(e)=>{this._img.$setBitmapData(e); },this);
        // this.setDB();
    }
    Object.defineProperty(PlanWnd, "getInstance", {
        get: function () {
            if (PlanWnd._mInstance == undefined)
                PlanWnd._mInstance = new PlanWnd();
            return PlanWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    PlanWnd.prototype.touchDown = function () {
        this.hide();
    };
    PlanWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        ImgRace1.getInstance.show();
    };
    PlanWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
        ImgRace1.getInstance.hide();
    };
    PlanWnd.prototype.addScoll = function () {
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
    PlanWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return PlanWnd;
}(egret.DisplayObjectContainer));
__reflect(PlanWnd.prototype, "PlanWnd");
//# sourceMappingURL=PlanWnd.js.map