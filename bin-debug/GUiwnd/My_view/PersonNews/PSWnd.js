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
/**个人信息 */
var PSWnd = (function (_super) {
    __extends(PSWnd, _super);
    function PSWnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("个人信息");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.y = 96 + GameValue.adaptationScreen;
        _this.joinContain();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(PSWnd, "getInstance", {
        get: function () {
            if (PSWnd._mInstance == undefined)
                PSWnd._mInstance = new PSWnd();
            return PSWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    PSWnd.prototype.joinContain = function () {
        var _this = this;
        this._txLink = new egret.Shape();
        this._mContain.addChild(this._txLink);
        this._txLink.graphics.beginFill(0xffffff);
        this._txLink.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
        this._txLink.graphics.endFill();
        this._txLink.touchEnabled = true;
        this._nameLink = new egret.Shape();
        this._mContain.addChild(this._nameLink);
        this._nameLink.graphics.beginFill(0xffffff);
        this._nameLink.graphics.drawRect(0, 330, GameMain.getInstance.StageWidth, 108);
        this._nameLink.graphics.endFill();
        this._nameLink.touchEnabled = true;
        this._noBg = new egret.Shape();
        this._mContain.addChild(this._noBg);
        this._noBg.graphics.beginFill(0xffffff);
        this._noBg.graphics.drawRect(0, 440, GameMain.getInstance.StageWidth, 108);
        this._noBg.graphics.endFill();
        this._noBg.touchEnabled = true;
        this._pwdLink = new egret.Shape();
        this._mContain.addChild(this._pwdLink);
        this._pwdLink.graphics.beginFill(0xffffff);
        this._pwdLink.graphics.drawRect(0, 550, GameMain.getInstance.StageWidth, 108);
        this._pwdLink.graphics.endFill();
        this._pwdLink.touchEnabled = true;
        this._nameBG = new egret.Shape();
        this._mContain.addChild(this._nameBG);
        this._nameBG.graphics.beginFill(0xffffff);
        this._nameBG.graphics.drawRect(0, 660, GameMain.getInstance.StageWidth, 108);
        this._nameBG.graphics.endFill();
        this._nameBG.touchEnabled = true;
        this._accountBnt = new egret.Shape();
        this._mContain.addChild(this._accountBnt);
        this._accountBnt.graphics.beginFill(0xffffff);
        this._accountBnt.graphics.drawRect(0, 110, GameMain.getInstance.StageWidth, 108);
        this._accountBnt.graphics.endFill();
        this._accountBnt.touchEnabled = true;
        this._idBnt = new egret.Shape();
        this._mContain.addChild(this._idBnt);
        this._idBnt.graphics.beginFill(0xffffff);
        this._idBnt.graphics.drawRect(0, 220, GameMain.getInstance.StageWidth, 108);
        this._idBnt.graphics.endFill();
        this._idBnt.touchEnabled = true;
        var text1 = ToolMrg.getText(26, 0, 28, 0x333333);
        this._mContain.addChild(text1);
        text1.height = 108;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.text = "头像";
        var text2 = ToolMrg.getText(26, 330, 28, 0x333333);
        this._mContain.addChild(text2);
        text2.height = 108;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.text = "昵称";
        var text3 = ToolMrg.getText(26, 550, 28, 0x333333);
        this._mContain.addChild(text3);
        text3.height = 108;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.text = "修改密码";
        var text6 = ToolMrg.getText(26, 660, 28, 0x333333);
        this._mContain.addChild(text6);
        text6.height = 108;
        text6.verticalAlign = egret.VerticalAlign.MIDDLE;
        text6.text = "实名认证";
        var text7 = ToolMrg.getText(26, 440, 28, 0x333333);
        this._mContain.addChild(text7);
        text7.height = 108;
        text7.verticalAlign = egret.VerticalAlign.MIDDLE;
        text7.text = "手机号";
        var text4 = ToolMrg.getText(26, 110, 28, 0x333333);
        this._mContain.addChild(text4);
        text4.height = 108;
        text4.verticalAlign = egret.VerticalAlign.MIDDLE;
        text4.text = "账号";
        var text5 = ToolMrg.getText(26, 220, 28, 0x333333);
        this._mContain.addChild(text5);
        text5.height = 108;
        text5.verticalAlign = egret.VerticalAlign.MIDDLE;
        text5.text = "ID";
        this._txBtn = new egret.Bitmap();
        this._mContain.addChild(this._txBtn);
        this._txBtn.x = 712;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            _this._txBtn.$setBitmapData(e);
            _this._txBtn.y = 330 + (108 - _this._txBtn.height) * 0.5;
        }, this);
        // this._nameBtn = new egret.Bitmap();
        // this._mContain.addChild(this._nameBtn);
        // this._nameBtn.x = 712;
        // RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png",(e)=>{
        //     this._nameBtn.$setBitmapData(e); 
        //     this._nameBtn.y = (108 - this._nameBtn.height)*0.5;
        // },this);
        this._pwdBtn = new egret.Bitmap();
        this._mContain.addChild(this._pwdBtn);
        this._pwdBtn.x = 712;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            _this._pwdBtn.$setBitmapData(e);
            _this._pwdBtn.y = 550 + (108 - _this._txBtn.height) * 0.5;
        }, this);
        this._realNameJT = new egret.Bitmap();
        this._mContain.addChild(this._realNameJT);
        this._realNameJT.x = 712;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            _this._realNameJT.$setBitmapData(e);
            _this._realNameJT.y = 660 + (108 - _this._txBtn.height) * 0.5;
        }, this);
        this._noJT = new egret.Bitmap();
        this._mContain.addChild(this._noJT);
        this._noJT.x = 712;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            _this._noJT.$setBitmapData(e);
            _this._noJT.y = 440 + (108 - _this._txBtn.height) * 0.5;
        }, this);
        var txZZ = new egret.Shape();
        this._mContain.addChild(txZZ);
        txZZ.graphics.beginFill(0xffffff);
        txZZ.graphics.drawEllipse(608, 14, 80, 80);
        txZZ.graphics.endFill();
        this._tx = new egret.Bitmap();
        this._mContain.addChild(this._tx);
        this._tx.width = 80;
        this._tx.height = 80;
        this._tx.x = 608;
        this._tx.y = 14;
        this._tx.mask = txZZ;
        this._nameText = ToolMrg.getText(236 + 150, 330, 28, 0x333333, 300);
        this._mContain.addChild(this._nameText);
        this._nameText.height = 108;
        this._nameText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._nameText.textAlign = egret.HorizontalAlign.RIGHT;
        this._Noinfo = ToolMrg.getText(236 + 150, 440, 28, 0x333333, 300);
        this._mContain.addChild(this._Noinfo);
        this._Noinfo.height = 108;
        this._Noinfo.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._Noinfo.textAlign = egret.HorizontalAlign.RIGHT;
        this._account = ToolMrg.getText(236 + 166, 110, 28, 0x333333, 300);
        this._mContain.addChild(this._account);
        this._account.height = 108;
        // this._account.text = "53239646";
        this._account.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._account.textAlign = egret.HorizontalAlign.RIGHT;
        this._id = ToolMrg.getText(236 + 166, 220, 28, 0x333333, 300);
        this._mContain.addChild(this._id);
        this._id.height = 108;
        this._id.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._id.textAlign = egret.HorizontalAlign.RIGHT;
        this._nameVfBtn = new egret.Bitmap();
        this._mContain.addChild(this._nameVfBtn);
        this._nameVfBtn.x = 520;
        this._nameVfBtn.y = text6.y + 24;
        RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", function (e) {
            _this._nameVfBtn.$setBitmapData(e);
        }, this);
    };
    PSWnd.prototype.upData = function () {
        AmendName.getInstance.hide();
        xgPhone.getInstance.hide();
        this._account.text = UserData.getInstance.account;
        this._nameText.text = "" + UserData.getInstance.userName;
        this._id.text = "" + UserData.getInstance.userId;
        if (UserData.getInstance.photo == "" || UserData.getInstance.photo == undefined) {
            this._Noinfo.text = "未绑定";
        }
        else {
            var lll = UserData.getInstance.photo.substring(0, 6);
            this._Noinfo.text = lll + "*****";
        }
        // if (UserData.getInstance.userImgUrl == "") {//默认头像
        //     RES.getResByUrl("resource/assets/images/ui/user_default@2x.png", (e) => { this._tx.$setBitmapData(e); }, this);
        // }
        // else {
        //     LoadNetPic.getLoadNetPic.loadPic(`${UserData.getInstance.userImgUrl}`, (e) => { this._tx.$setTexture(e); }, this);
        // }
    };
    /**设置头像*/
    PSWnd.prototype.setHeadIcon = function () {
        RES.getResByUrl("resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
    };
    PSWnd.prototype.headIcon = function (data, url) {
        if (data != undefined && this._tx != undefined) {
            this._tx.$setBitmapData(data);
        }
    };
    PSWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.upData();
        this.setHeadIcon();
        this.setgvfBtn1();
    };
    PSWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    PSWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._txLink) {
            selectHeadIconMrf.getInstance.show();
        }
        else if (e.target == this._nameLink) {
            AmendName.getInstance.show();
        }
        else if (e.target == this._pwdLink) {
            // Alertpaner.getInstance.show("该功能暂未开放");
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            }
            else {
                ResetPassWnd.getInstance.show();
            }
        }
        else if (e.target == this._nameBG) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            }
            else {
                var type = UserData.getInstance.getused();
                if (type == 1)
                    return;
                realnameTest.getInstance.show();
            }
        }
        else if (e.target == this._noBg) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
            }
            else {
                xgPhone.getInstance.show();
            }
        }
    };
    PSWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._pwdLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._noBg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_GoldFresh, this.upData, this);
    };
    PSWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._pwdLink.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._nameBG.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._noBg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_GoldFresh, this.upData, this);
    };
    /**适配处理 */
    PSWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**设置实名认证图片*/
    PSWnd.prototype.setgvfBtn1 = function () {
        var type = UserData.getInstance.getused();
        if (type == 0) {
            RES.getResByUrl("resource/assets/images/ui/ljrz_home@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/renz.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    PSWnd.prototype.bgBack3 = function (data, url) {
        if (data != undefined && this._nameVfBtn != undefined) {
            this._nameVfBtn.$setBitmapData(data);
        }
    };
    return PSWnd;
}(egret.DisplayObjectContainer));
__reflect(PSWnd.prototype, "PSWnd");
//# sourceMappingURL=PSWnd.js.map