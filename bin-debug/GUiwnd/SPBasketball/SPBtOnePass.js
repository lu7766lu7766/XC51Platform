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
var SPBtOnePass = (function (_super) {
    __extends(SPBtOnePass, _super);
    function SPBtOnePass() {
        var _this = _super.call(this) || this;
        // private _topStr = ["让分胜负","胜负","大小分","胜分差"];
        _this._topStr = ["让分胜负", "大小分"];
        /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
        _this._index = 0;
        _this.num = 0;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topInfo = new GHashMap();
        _this.num = GameMain.getInstance.StageWidth / _this._topStr.length;
        for (var i = 0; i < _this._topStr.length; i++) {
            var obj = new SPBtOnePassTopInfo(_this._topStr[i]);
            // if()
            _this._topInfo.Gput(i, obj);
            obj.x = _this.num * i;
            obj.touchEnabled = true;
            _this.addChild(obj);
        }
        _this._topShape = new egret.Shape();
        _this.addChild(_this._topShape);
        _this._topShape.graphics.beginFill(0xf96d67);
        _this._topShape.graphics.drawRoundRect((_this.num - 48) / 2, 76, 48, 4, 8);
        _this._topShape.graphics.endFill();
        var topShape = new egret.Shape();
        _this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0, 78.5, 750, 1.5);
        topShape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SPBtOnePass, "getInstance", {
        get: function () {
            if (SPBtOnePass._mInstance == undefined)
                SPBtOnePass._mInstance = new SPBtOnePass();
            return SPBtOnePass._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPBtOnePass.prototype.show = function () {
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_CJList, this.updata, this);
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.showWnd();
        this.requestData(this._index + 2);
    };
    SPBtOnePass.prototype.hide = function () {
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_CJList, this.updata, this);
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._topShape.x = 0;
            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }
    };
    SPBtOnePass.prototype.requestData = function (type) {
        SPBK_One.getInstance.sendHttp(type, this._mContern);
    };
    SPBtOnePass.prototype.selectOn = function (e) {
        if (e.target == this._topInfo.Gget(0)) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._topInfo.Gget(1)) {
            if (this._index == 2)
                return;
            this._index = 2;
        }
        // else if(e.target == this._topInfo.Gget(1)){
        //     if(this._index==1)return;
        //     this._index = 1;
        // }else if(e.target == this._topInfo.Gget(2)){
        //     if(this._index==2)return;
        //     this._index = 2;
        // }else if(e.target == this._topInfo.Gget(3)){
        //     if(this._index==3)return;
        //     this._index = 3;
        // }
        this.showWnd();
        this.requestData(this._index + 2);
    };
    /**获取单场数据列表 */
    SPBtOnePass.prototype.getDGList = function (id) {
        var mitem;
        if (id == 2) {
            mitem = SPB2Wnd.getInstance.GetItem();
        }
        else if (id == 3) {
            mitem = SPB3Wnd.getInstance.GetItem();
        }
        else if (id == 4) {
            mitem = SPB4Wnd.getInstance.GetItem();
        }
        else if (id == 5) {
            mitem = SPB5Wnd.getInstance.GetItem();
        }
        return mitem;
    };
    SPBtOnePass.prototype.updata = function (e) {
        if (e.data != undefined) {
            var mitem = void 0;
            if (SPBasketBallWnd.inIndex == 1) {
                mitem = SPB2Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 2) {
                mitem = SPB3Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 3) {
                mitem = SPB4Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 4) {
                mitem = SPB5Wnd.getInstance.GetItem();
            }
            if (e.data.cf == 1) {
                // SPBasketBallWnd.getInstance.clearAllData();
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
    SPBtOnePass.prototype.showWnd = function () {
        SPBasketBallWnd.getInstance.clearAllData();
        if (this._index == 0) {
            this._mContern = SPB2Wnd.getInstance;
            SPB2Wnd.getInstance.show();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }
        else if (this._index == 1) {
            this._mContern = SPB3Wnd.getInstance;
            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.show();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }
        else if (this._index == 2) {
            this._mContern = SPB4Wnd.getInstance;
            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.show();
            SPB5Wnd.getInstance.hide();
        }
        else if (this._index == 3) {
            this._mContern = SPB5Wnd.getInstance;
            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.show();
        }
        if (this._index == 0)
            egret.Tween.get(this._topShape).to({ x: this.num * this._index }, 200, egret.Ease.circOut);
        else
            egret.Tween.get(this._topShape).to({ x: this.num * (this._index - 1) }, 200, egret.Ease.circOut);
        SPBasketBallWnd.inIndex = this._index + 1;
    };
    /**不清除刷新界面 */
    SPBtOnePass.prototype.freshNow = function () {
        if (this._index == 0) {
            SPB2Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 1) {
            SPB3Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 2) {
            SPB4Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 3) {
            SPB5Wnd.getInstance.onlyFreshData();
        }
    };
    SPBtOnePass.prototype.addInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    SPBtOnePass.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    /**适配处理 */
    SPBtOnePass.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return SPBtOnePass;
}(egret.DisplayObjectContainer));
__reflect(SPBtOnePass.prototype, "SPBtOnePass");
var SPBtOnePassTopInfo = (function (_super) {
    __extends(SPBtOnePassTopInfo, _super);
    function SPBtOnePassTopInfo(str) {
        var _this = _super.call(this) || this;
        _this._title = ToolMrg.getText(0, 0, 28, 0x333333, 375);
        _this.addChild(_this._title);
        _this._title.height = 80;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = str;
        return _this;
    }
    SPBtOnePassTopInfo.prototype.selectInfo = function () {
        this._title.textColor = 0xF72F52;
    };
    SPBtOnePassTopInfo.prototype.noselectInfo = function () {
        this._title.textColor = 0x333333;
    };
    return SPBtOnePassTopInfo;
}(egret.DisplayObjectContainer));
__reflect(SPBtOnePassTopInfo.prototype, "SPBtOnePassTopInfo");
//# sourceMappingURL=SPBtOnePass.js.map