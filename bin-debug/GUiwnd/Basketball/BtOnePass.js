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
var BtOnePass = (function (_super) {
    __extends(BtOnePass, _super);
    function BtOnePass() {
        var _this = _super.call(this) || this;
        _this._topStr = ["让分胜负", "胜负", "大小分", "胜分差"];
        /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
        _this._index = 0;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topInfo = new GHashMap();
        for (var i = 0; i < _this._topStr.length; i++) {
            var obj = new OnePassTopInfo(_this._topStr[i]);
            _this._topInfo.Gput(i, obj);
            obj.x = 187.5 * i;
            obj.touchEnabled = true;
            _this.addChild(obj);
        }
        _this._topShape = new egret.Shape();
        _this.addChild(_this._topShape);
        _this._topShape.graphics.beginFill(0xf96d67);
        _this._topShape.graphics.drawRoundRect(74.5, 76, 48, 4, 8);
        _this._topShape.graphics.endFill();
        var topShape = new egret.Shape();
        _this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0, 78.5, 750, 1.5);
        topShape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(BtOnePass, "getInstance", {
        get: function () {
            if (BtOnePass._mInstance == undefined)
                BtOnePass._mInstance = new BtOnePass();
            return BtOnePass._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    BtOnePass.prototype.show = function () {
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_List, this.updata, this);
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.showWnd();
        this.requestData(this._index + 2);
    };
    BtOnePass.prototype.hide = function () {
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_List, this.updata, this);
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._topShape.x = 0;
            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }
    };
    BtOnePass.prototype.requestData = function (type) {
        BK_One.getInstance.sendHttp(type, this._mContern);
    };
    BtOnePass.prototype.selectOn = function (e) {
        if (e.target == this._topInfo.Gget(0)) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._topInfo.Gget(1)) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        else if (e.target == this._topInfo.Gget(2)) {
            if (this._index == 2)
                return;
            this._index = 2;
        }
        else if (e.target == this._topInfo.Gget(3)) {
            if (this._index == 3)
                return;
            this._index = 3;
        }
        this.showWnd();
        this.requestData(this._index + 2);
    };
    /**获取单场数据列表 */
    BtOnePass.prototype.getDGList = function (id) {
        var mitem;
        if (id == 2) {
            mitem = B2Wnd.getInstance.GetItem();
        }
        else if (id == 3) {
            mitem = B3Wnd.getInstance.GetItem();
        }
        else if (id == 4) {
            mitem = B4Wnd.getInstance.GetItem();
        }
        else if (id == 5) {
            mitem = B5Wnd.getInstance.GetItem();
        }
        return mitem;
    };
    BtOnePass.prototype.updata = function (e) {
        if (e.data != undefined) {
            var mitem = void 0;
            if (BasketBallWnd.inIndex == 1) {
                mitem = B2Wnd.getInstance.GetItem();
            }
            else if (BasketBallWnd.inIndex == 2) {
                mitem = B3Wnd.getInstance.GetItem();
            }
            else if (BasketBallWnd.inIndex == 3) {
                mitem = B4Wnd.getInstance.GetItem();
            }
            else if (BasketBallWnd.inIndex == 4) {
                mitem = B5Wnd.getInstance.GetItem();
            }
            if (e.data.cf == 1) {
                BasketBallWnd.getInstance.clearAllData();
                this.showWnd();
            }
            else if (e.data.value == 1 && mitem.size > 0) {
                this.freshNow();
            }
            else {
                this.showWnd();
            }
        }
    };
    BtOnePass.prototype.showWnd = function () {
        BasketBallWnd.getInstance.clearAllData();
        if (this._index == 0) {
            this._mContern = B2Wnd.getInstance;
            B2Wnd.getInstance.show();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }
        else if (this._index == 1) {
            this._mContern = B3Wnd.getInstance;
            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.show();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }
        else if (this._index == 2) {
            this._mContern = B4Wnd.getInstance;
            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.show();
            B5Wnd.getInstance.hide();
        }
        else if (this._index == 3) {
            this._mContern = B5Wnd.getInstance;
            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.show();
        }
        egret.Tween.get(this._topShape).to({ x: 187.5 * this._index }, 200, egret.Ease.circOut);
        BasketBallWnd.inIndex = this._index + 1;
    };
    /**不清除刷新界面 */
    BtOnePass.prototype.freshNow = function () {
        if (this._index == 0) {
            B2Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 1) {
            B3Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 2) {
            B4Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 3) {
            B5Wnd.getInstance.onlyFreshData();
        }
    };
    BtOnePass.prototype.addInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    BtOnePass.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    /**适配处理 */
    BtOnePass.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return BtOnePass;
}(egret.DisplayObjectContainer));
__reflect(BtOnePass.prototype, "BtOnePass");
//# sourceMappingURL=BtOnePass.js.map