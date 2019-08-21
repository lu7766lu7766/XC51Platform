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
/**账号信息 */
var AccountNews = (function (_super) {
    __extends(AccountNews, _super);
    // /**大神认证 */
    // private _gVfBtn: egret.Bitmap;
    function AccountNews() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("账号信息");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this.joinContain();
        _this._nameText = ToolMrg.getText(236 + 166, 60, 28, 0x333333, 300);
        _this._mContain.addChild(_this._nameText);
        _this._nameText.height = 108;
        _this._nameText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._nameText.textAlign = egret.HorizontalAlign.RIGHT;
        _this._phoneText = ToolMrg.getText(236 + 166, 170, 28, 0x333333, 300);
        // this._mContain.addChild(this._phoneText);
        _this._phoneText.height = 108;
        _this._phoneText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._phoneText.textAlign = egret.HorizontalAlign.RIGHT;
        _this._nameVfBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._nameVfBtn);
        _this._nameVfBtn.x = 564;
        RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", function (e) {
            _this._nameVfBtn.$setBitmapData(e);
            _this._nameVfBtn.y = 340 - 110 + (108 - _this._nameVfBtn.height) * 0.5;
        }, _this);
        _this._nameVfBtn.touchEnabled = true;
        _this._nameVfBtn.visible = false;
        // this._gVfBtn = new egret.Bitmap();
        // this._mContain.addChild(this._gVfBtn);
        // this._gVfBtn.x = 564;
        // RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", (e) => {
        //     this._gVfBtn.$setBitmapData(e);
        //     this._gVfBtn.y = 510 - 110 + (108 - this._gVfBtn.height) * 0.5;
        // }, this);
        // this._gVfBtn.touchEnabled = true;
        // this._gVfBtn.visible = false;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(AccountNews, "getInstance", {
        get: function () {
            if (AccountNews._mInstance == undefined)
                AccountNews._mInstance = new AccountNews();
            return AccountNews._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    AccountNews.prototype.upData = function () {
        this._nameText.text = "" + UserData.getInstance.account;
        if (UserData.getInstance.photo == "" || UserData.getInstance.photo == undefined)
            this._phoneText.text = "\u672A\u7ED1\u5B9A";
        else
            this._phoneText.text = "" + UserData.getInstance.photo;
        this._nameVfBtn.visible = true;
        // this._gVfBtn.visible = true;
    };
    AccountNews.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.upData();
        // this.setgvfBtn();
        this.setgvfBtn1();
    };
    AccountNews.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    AccountNews.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._nameVfBtn) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            }
            else {
                if (UserData.getInstance.getused() == 0) {
                    realnameTest.getInstance.show();
                }
            }
        }
    };
    /**设置大神认证图片*/
    // public setgvfBtn(): void {
    //     let type: number = GameValue.isDryingList;
    //     if (type == 0) {
    //         RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
    //     } else if (type == 1) {
    //         RES.getResByUrl("resource/assets/images/ui/renz.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
    //     } else {
    //         RES.getResByUrl("resource/assets/images/ui/shenHe.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
    //     }
    // }
    /**设置实名认证图片*/
    AccountNews.prototype.setgvfBtn1 = function () {
        var type = UserData.getInstance.getused();
        if (type == 0) {
            RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/renz.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    // private bgBack2(data: any, url: string): void {
    //     if (data != undefined && this._gVfBtn != undefined) {
    //         this._gVfBtn.$setBitmapData(data);
    //     }
    // }
    AccountNews.prototype.bgBack3 = function (data, url) {
        if (data != undefined && this._nameVfBtn != undefined) {
            this._nameVfBtn.$setBitmapData(data);
        }
    };
    AccountNews.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameVfBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._gVfBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    AccountNews.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameVfBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._gVfBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    AccountNews.prototype.addScoll = function () {
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
    AccountNews.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    AccountNews.prototype.joinContain = function () {
        var shape1 = new egret.Shape();
        this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xffffff);
        shape1.graphics.drawRect(0, 60, GameMain.getInstance.StageWidth, 108);
        shape1.graphics.endFill();
        // let shape2 = new egret.Shape();
        // this._mContain.addChild(shape2);
        // shape2.graphics.beginFill(0xffffff);
        // shape2.graphics.drawRect(0, 170, GameMain.getInstance.StageWidth, 108);
        // shape2.graphics.endFill();
        var shape3 = new egret.Shape();
        this._mContain.addChild(shape3);
        shape3.graphics.beginFill(0xffffff);
        shape3.graphics.drawRect(0, 340 - 110, GameMain.getInstance.StageWidth, 108);
        shape3.graphics.endFill();
        // let shape4 = new egret.Shape();
        // this._mContain.addChild(shape4);
        // shape4.graphics.beginFill(0xffffff);
        // shape4.graphics.drawRect(0, 510 - 110, GameMain.getInstance.StageWidth, 108);
        // shape4.graphics.endFill();
        var text1 = ToolMrg.getText(26, 0, 28, 0x999999);
        this._mContain.addChild(text1);
        text1.height = 60;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.text = "基本信息";
        var text2 = ToolMrg.getText(26, 280 - 110, 28, 0x999999);
        this._mContain.addChild(text2);
        text2.height = 60;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.text = "实名信息";
        // let text3 = ToolMrg.getText(26, 450 - 110, 28, 0x999999);
        // this._mContain.addChild(text3);
        // text3.height = 60;
        // text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        // text3.text = "成为大神";
        var textShape1 = new egret.Shape();
        this._mContain.addChild(textShape1);
        textShape1.graphics.beginFill(0xdedede);
        textShape1.graphics.drawRect(0, 58, GameMain.getInstance.StageWidth, 2);
        textShape1.graphics.endFill();
        // let textShape2 = new egret.Shape();
        // this._mContain.addChild(textShape2);
        // textShape2.graphics.beginFill(0xdedede);
        // textShape2.graphics.drawRect(0, 168, GameMain.getInstance.StageWidth, 2);
        // textShape2.graphics.endFill();
        // let textShape3 = new egret.Shape();
        // this._mContain.addChild(textShape3);
        // textShape3.graphics.beginFill(0xdedede);
        // textShape3.graphics.drawRect(0, 278, GameMain.getInstance.StageWidth, 2);
        // textShape3.graphics.endFill();
        var textShape4 = new egret.Shape();
        this._mContain.addChild(textShape4);
        textShape4.graphics.beginFill(0xdedede);
        textShape4.graphics.drawRect(0, 338 - 110, GameMain.getInstance.StageWidth, 2);
        textShape4.graphics.endFill();
        var textShape5 = new egret.Shape();
        this._mContain.addChild(textShape5);
        textShape5.graphics.beginFill(0xdedede);
        textShape5.graphics.drawRect(0, 448 - 110, GameMain.getInstance.StageWidth, 2);
        textShape5.graphics.endFill();
        // let textShape6 = new egret.Shape();
        // this._mContain.addChild(textShape6);
        // textShape6.graphics.beginFill(0xdedede);
        // textShape6.graphics.drawRect(0, 508 - 110, GameMain.getInstance.StageWidth, 2);
        // textShape6.graphics.endFill();
        var titleText1 = ToolMrg.getText(26, 60, 28, 0x333333);
        this._mContain.addChild(titleText1);
        titleText1.height = 108;
        titleText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        titleText1.text = "昵称";
        // let titleText2 = ToolMrg.getText(26, 170, 28, 0x333333);
        // this._mContain.addChild(titleText2);
        // titleText2.height = 108;
        // titleText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        // titleText2.text = "手机号";
        var titleText3 = ToolMrg.getText(26, 340 - 110, 28, 0x333333);
        this._mContain.addChild(titleText3);
        titleText3.height = 108;
        titleText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        titleText3.text = "实名认证";
        // let titleText4 = ToolMrg.getText(26, 510 - 110, 28, 0x333333);
        // this._mContain.addChild(titleText4);
        // titleText4.height = 108;
        // titleText4.verticalAlign = egret.VerticalAlign.MIDDLE;
        // titleText4.text = "大神认证";
    };
    return AccountNews;
}(egret.DisplayObjectContainer));
__reflect(AccountNews.prototype, "AccountNews");
//# sourceMappingURL=AccountNews.js.map