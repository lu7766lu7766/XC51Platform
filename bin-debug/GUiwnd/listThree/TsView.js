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
/**温馨提示界面 */
var TsView = (function (_super) {
    __extends(TsView, _super);
    function TsView() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        // let shape = new egret.Shape();
        // this._mContain.addChild(shape);
        // shape.graphics.beginFill(0xffffff);
        // shape.graphics.drawRoundRect(0, 0, 600, 240, 33);
        // shape.graphics.endFill();
        // shape.touchEnabled = true;
        var BBG = new egret.Bitmap();
        _this._mContain.addChild(BBG);
        RES.getResByUrl("resource/assets/images/ui/tsbg_home@2x.png", function (e) {
            BBG.$setBitmapData(e);
            BBG.x = 0;
            BBG.y = 0;
        }, _this);
        _this._title = ToolMrg.getText(0, 30, 36, 0x333333, 496);
        _this._mContain.addChild(_this._title);
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = "温馨提示";
        _this._title.bold = true;
        _this._title.fontFamily = "微软雅黑";
        _this._leftBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/scdd_home@2x.png", function (e) {
            _this._leftBtn.$setBitmapData(e);
            _this._leftBtn.x = 436;
            _this._leftBtn.y = 20;
            _this._leftBtn.scaleX = 1.3;
            _this._leftBtn.scaleY = 1.3;
        }, _this);
        _this._leftBtn.touchEnabled = true;
        _this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        var leftText = ToolMrg.getText(40, 100, 22, 0x333333, 496);
        _this._mContain.addChild(leftText);
        leftText.textAlign = egret.HorizontalAlign.LEFT;
        leftText.fontFamily = "微软雅黑";
        leftText.text = "亲爱的彩友，根据国家竞彩销售时间的规\n定，以下时段，暂停售竞足、竞篮玩法：\n" +
            "周一至周五：22:00-9:00;" + "\n周六至周日：23:00-9:00;" + "\n超级竞彩仍可正常下注，祝您游戏愉快！";
        leftText.lineSpacing = 15;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(TsView, "getInstance", {
        get: function () {
            if (TsView._mInstance == undefined)
                TsView._mInstance = new TsView();
            return TsView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    TsView.prototype.touchDown = function (e) {
        this.hide();
    };
    TsView.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5 + 20;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5 - 50;
    };
    TsView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**适配处理 */
    TsView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        // this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return TsView;
}(egret.DisplayObjectContainer));
__reflect(TsView.prototype, "TsView");
//# sourceMappingURL=TsView.js.map