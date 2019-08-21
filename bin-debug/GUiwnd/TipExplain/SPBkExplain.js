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
var SPBkExplain = (function (_super) {
    __extends(SPBkExplain, _super);
    function SPBkExplain() {
        var _this = _super.call(this) || this;
        _this.imgItem = [];
        _this._topUI = new TopUI("超级篮彩玩法介绍");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        var btn1 = new egret.Bitmap();
        _this._mContain.addChild(btn1);
        RES.getResByUrl("resource/assets/images/ui/jclq1.png", function (e) { btn1.$setBitmapData(e); }, _this);
        var btn2 = new egret.Bitmap();
        _this._mContain.addChild(btn2);
        btn2.y = 750;
        RES.getResByUrl("resource/assets/images/ui/jclq2..png", function (e) { btn2.$setBitmapData(e); }, _this);
        var btn3 = new egret.Bitmap();
        _this._mContain.addChild(btn3);
        btn3.y = 750 + 720;
        RES.getResByUrl("resource/assets/images/ui/jclq3..png", function (e) { btn3.$setBitmapData(e); }, _this);
        // let btn4 = new egret.Bitmap();
        // this._mContain.addChild(btn4);
        // btn4.y = 800+740+720;
        // RES.getResByUrl(`resource/assets/images/ui/jczq4.png`,(e)=>{btn4.$setBitmapData(e); },this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SPBkExplain, "getInstance", {
        get: function () {
            if (SPBkExplain._mInstance == undefined)
                SPBkExplain._mInstance = new SPBkExplain();
            return SPBkExplain._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPBkExplain.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    SPBkExplain.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SPBkExplain.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._scroView.setScrollTop(0);
        }
    };
    SPBkExplain.prototype.addScoll = function () {
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
    SPBkExplain.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xf5f5f7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return SPBkExplain;
}(egret.DisplayObjectContainer));
__reflect(SPBkExplain.prototype, "SPBkExplain");
//# sourceMappingURL=SPBkExplain.js.map