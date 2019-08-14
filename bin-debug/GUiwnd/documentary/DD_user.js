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
/**跟单用户 */
var DD_user = (function (_super) {
    __extends(DD_user, _super);
    function DD_user() {
        var _this = _super.call(this) || this;
        _this.hide();
        _this._item = new GHashMap();
        _this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._tipText.$setBitmapData(e);
            _this._tipText.x = (GameMain.getInstance.StageWidth - _this._tipText.width) * 0.5;
            _this._tipText.y = 100;
        }, _this);
        // this._tipText = ToolMrg.getText(0,200,30,0x000000);
        _this.addChild(_this._tipText);
        _this._tipText.visible = false;
        _this.setDB();
        return _this;
    }
    DD_user.prototype.updata = function (data) {
        if (data == undefined)
            data = new GD_DetailData();
        var item = data.GD_UserItem;
        var objheight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new UserInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.y = objheight;
            objheight = objheight + obj.height;
            if (obj.parent == undefined)
                this.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
        if (item.size > 0) {
            this._tipText.visible = false;
        }
        else {
            this._tipText.visible = true;
        }
    };
    DD_user.prototype.show = function (data) {
        this.visible = true;
        this.updata(data);
    };
    DD_user.prototype.hide = function () {
        this.visible = false;
    };
    DD_user.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 300);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return DD_user;
}(egret.DisplayObjectContainer));
__reflect(DD_user.prototype, "DD_user");
var UserInfo = (function (_super) {
    __extends(UserInfo, _super);
    function UserInfo() {
        var _this = _super.call(this) || this;
        _this._tx = new egret.Bitmap();
        _this.addChild(_this._tx);
        _this._tx.x = 28;
        _this._tx.y = 32;
        _this._tx.width = 36;
        _this._tx.height = 36;
        _this._userName = ToolMrg.getText(68, 0, 28, 0x333333);
        _this.addChild(_this._userName);
        _this._userName.height = 100;
        _this._userName.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._money = ToolMrg.getText(304, 0, 28, 0xff7000);
        _this.addChild(_this._money);
        _this._money.height = 100;
        _this._money.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._time = ToolMrg.getText(480, 0, 24, 0x999999);
        _this.addChild(_this._time);
        _this._time.height = 100;
        _this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 98.5, 750, 1.5);
        link.graphics.endFill();
        _this.setDB();
        return _this;
    }
    UserInfo.prototype.aa = function (data) {
        var _this = this;
        this._data = data;
        RES.getResByUrl("resource/assets/images/ui/tou" + data.tx + ".png", function (e) { _this._tx.$setBitmapData(e); }, this);
        this._userName.text = "" + data.userName;
        this._money.text = ToolMrg.getDecimal(data.userMoney / 100, 2) + "\u5143";
        this._time.text = "" + ToolMrg.getTime1(data.timeNum);
    };
    UserInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return UserInfo;
}(egret.DisplayObjectContainer));
__reflect(UserInfo.prototype, "UserInfo");
//# sourceMappingURL=DD_user.js.map