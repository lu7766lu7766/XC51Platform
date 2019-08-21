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
var TipWindow = (function (_super) {
    __extends(TipWindow, _super);
    function TipWindow() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        var shape = new egret.Shape();
        _this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0, 0, 600, 240, 33);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        _this._title = ToolMrg.getText(0, 37, 36, 0x333333, 600);
        _this._mContain.addChild(_this._title);
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.lineSpacing = 10;
        _this._leftBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) {
            _this._leftBtn.$setBitmapData(e);
            _this._leftBtn.x = 14;
            _this._leftBtn.y = 132;
        }, _this);
        _this._leftBtn.touchEnabled = true;
        _this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        _this._rightBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) {
            _this._rightBtn.$setBitmapData(e);
            _this._rightBtn.x = 312;
            _this._rightBtn.y = 132;
        }, _this);
        _this._rightBtn.touchEnabled = true;
        _this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        var leftText = ToolMrg.getText(14, 132, 32, 0x333333, 276);
        _this._mContain.addChild(leftText);
        leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "取消";
        var rightText = ToolMrg.getText(312, 132, 32, 0xffffff, 276);
        _this._mContain.addChild(rightText);
        rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "确定";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(TipWindow, "getInstance", {
        get: function () {
            if (TipWindow._mInstance == undefined)
                TipWindow._mInstance = new TipWindow();
            return TipWindow._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    TipWindow.prototype.touchDown = function (e) {
        if (e.target == this._rightBtn) {
            if (this._id == 0) {
                UserData.getInstance.setYJTime("0", "0", "0");
                UserData.getInstance.userName = "未登录";
                UserData.getInstance.setGold(0);
                UserData.getInstance.setBonus(0);
                UserData.getInstance.setYJGold(0);
                UserData.getInstance.setDJQGold(0);
                UserData.getInstance.setRetCash(0);
                UserData.getInstance.setLv(0);
                UserData.getInstance.photo = "";
                GameValue.isBZQBYJ = 0;
                GameValue.isDryingList = 0;
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
                Alertpaner.getInstance.show("清除成功");
                MyViewWnd.getInstance.removeInterception();
                MyViewWnd.getInstance.addInterception();
                SetUpWnd.getInstance.hide();
                MyLotteryDataMrg.getInstance.cleanData();
                MyViewWnd.getInstance.refreshallInfo();
                UserData.getInstance.setused(0);
                withdrawData.getInstance.cleanall();
            }
            if (this._id == 1) {
                RechargeWnd.getInstance.show();
            }
        }
        this.hide();
    };
    TipWindow.prototype.cleaall = function () {
        UserData.getInstance.setYJTime("0", "0", "0");
        UserData.getInstance.userName = "未登录";
        UserData.getInstance.setrealName("");
        UserData.getInstance.setGold(0);
        UserData.getInstance.setBonus(0);
        UserData.getInstance.setYJGold(0);
        UserData.getInstance.setDJQGold(0);
        UserData.getInstance.setRetCash(0);
        UserData.getInstance.setLv(0);
        UserData.getInstance.photo = "";
        GameValue.isBZQBYJ = 0;
        GameValue.isDryingList = 0;
        CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
        SelectDataMrg.getInstance.clearItem();
        Alertpaner.getInstance.show("注销成功");
        MyViewWnd.getInstance.removeInterception();
        MyViewWnd.getInstance.addInterception();
    };
    /**传入文本 id 根据id处理事件 (取消与确定) */
    TipWindow.prototype.show = function (text, id) {
        this._id = id;
        this._title.text = text;
        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    };
    TipWindow.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**适配处理 */
    TipWindow.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return TipWindow;
}(egret.DisplayObjectContainer));
__reflect(TipWindow.prototype, "TipWindow");
//# sourceMappingURL=TipWindow.js.map