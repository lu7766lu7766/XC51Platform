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
/**设置 */
var SetUpWnd = (function (_super) {
    __extends(SetUpWnd, _super);
    function SetUpWnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("设置");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.y = 96 + GameValue.adaptationScreen;
        _this.joinCenter();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SetUpWnd, "getInstance", {
        get: function () {
            if (SetUpWnd._mInstance == undefined)
                SetUpWnd._mInstance = new SetUpWnd();
            return SetUpWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SetUpWnd.prototype.joinCenter = function () {
        var _this = this;
        this._aboutLink = new egret.Shape();
        this._mContain.addChild(this._aboutLink);
        this._aboutLink.graphics.beginFill(0xffffff);
        this._aboutLink.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
        this._aboutLink.graphics.endFill();
        this._aboutLink.touchEnabled = true;
        var title1 = ToolMrg.getText(26, 0, 28, 0x333333);
        this._mContain.addChild(title1);
        title1.height = 108;
        title1.verticalAlign = egret.VerticalAlign.MIDDLE;
        title1.text = "关于51彩站";
        var img1 = new egret.Bitmap();
        this._mContain.addChild(img1);
        img1.x = 708;
        img1.y = 38;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) { img1.$setBitmapData(e); }, this);
        this._clearLink = new egret.Shape();
        this._mContain.addChild(this._clearLink);
        this._clearLink.graphics.beginFill(0xffffff);
        this._clearLink.graphics.drawRect(0, 110, GameMain.getInstance.StageWidth, 108);
        this._clearLink.graphics.endFill();
        this._clearLink.touchEnabled = true;
        var title2 = ToolMrg.getText(26, 110, 28, 0x333333);
        this._mContain.addChild(title2);
        title2.height = 108;
        title2.verticalAlign = egret.VerticalAlign.MIDDLE;
        title2.text = "清除缓存 " + GameValue.gameVer;
        var img2 = new egret.Bitmap();
        this._mContain.addChild(img2);
        img2.x = 708;
        img2.y = 38 + 110;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) { img2.$setBitmapData(e); }, this);
        this._logOut = new egret.Bitmap();
        this._mContain.addChild(this._logOut);
        this._logOut.y = 270;
        this._logOut.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._logOut.$setBitmapData(e);
            _this._logOut.x = (GameMain.getInstance.StageWidth - _this._logOut.width) * 0.5;
        }, this);
        this.logOutText = ToolMrg.getText(0, 270, 36, 0xffffff, 750);
        this._mContain.addChild(this.logOutText);
        this.logOutText.height = 100;
        this.logOutText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.logOutText.textAlign = egret.HorizontalAlign.CENTER;
        this.logOutText.text = "退出登录";
    };
    SetUpWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        if (UserData.getInstance.isLogin() == false) {
            this.logOutText.text = "登陆";
        }
        else {
            this.logOutText.text = "退出登录";
        }
    };
    SetUpWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    SetUpWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._clearLink) {
            TipWindow.getInstance.show("是否清除账号缓存数据", 0);
        }
        else if (e.target == this._aboutLink) {
            AboutWnd.getInstance.show();
        }
        else if (e.target == this._logOut) {
            // TipWindow.getInstance.cleaall();
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            }
            else {
                TipWindow.getInstance.show("是否清除账号缓存数据", 0);
            }
            // this.hide();
        }
    };
    SetUpWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._aboutLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._logOut.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SetUpWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._aboutLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._logOut.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**适配处理 */
    SetUpWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return SetUpWnd;
}(egret.DisplayObjectContainer));
__reflect(SetUpWnd.prototype, "SetUpWnd");
//# sourceMappingURL=SetUpWnd.js.map