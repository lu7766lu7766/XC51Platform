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
var SPOnePass = (function (_super) {
    __extends(SPOnePass, _super);
    function SPOnePass() {
        var _this = _super.call(this) || this;
        _this._topStr = ["胜平负", "进球数", "比分", "半全场"];
        /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
        _this._index = 0;
        /**所选数组 */
        _this._arr = [];
        _this.y = 96 + GameValue.adaptationScreen;
        _this.allItem = new GHashMap();
        _this._topInfo = new GHashMap();
        for (var i = 0; i < _this._topStr.length; i++) {
            var obj = new SPOnePassTopInfo(_this._topStr[i]);
            _this._topInfo.Gput(i, obj);
            obj.x = 187.5 * i;
            obj.touchEnabled = true;
            // this.addChild(obj);
        }
        _this._topShape = new egret.Shape();
        // this.addChild(this._topShape);
        _this._topShape.graphics.beginFill(0xf96d67);
        _this._topShape.graphics.drawRoundRect(74.5, 76, 48, 4, 8);
        _this._topShape.graphics.endFill();
        var topShape = new egret.Shape();
        // this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0, 78.5, 750, 1.5);
        topShape.graphics.endFill();
        _this.joinDown();
        return _this;
        // this.setDB();
    }
    Object.defineProperty(SPOnePass, "getInstance", {
        get: function () {
            if (SPOnePass._mInstance == undefined)
                SPOnePass._mInstance = new SPOnePass();
            return SPOnePass._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPOnePass.prototype.getArrSize = function () {
        return this._arr;
    };
    SPOnePass.prototype.ClickRemove = function (id) {
        if (id != undefined) {
            var mitem = void 0;
            if (SPFbWnd.inIndex == 1) {
                mitem = SPG2Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 2) {
                mitem = SPG3Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 3) {
                mitem = SPG4Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 4) {
                mitem = SPG5Wnd.getInstance.GetItem();
            }
            for (var _i = 0, _a = mitem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = mitem.Gget(key).getSubItem();
                for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    if (item.Gget(akey).id == id)
                        item.Gget(akey).clear();
                }
            }
            var arr = [];
            for (var i = 0; i < this._arr.length; i++) {
                if (this._arr[i].dlxId != id)
                    arr = arr.concat(this._arr[i]);
            }
            this._arr = arr;
            this._selectText.text = "" + arr.length;
            if (this.allItem.GhasKey(id))
                this.allItem.GremoveByKey(id);
        }
        else {
            this.clearAllData();
        }
    };
    /**传入当前id 以及足球表对象 */
    SPOnePass.prototype.changeTextAndData = function (id, index, isboom) {
        if (isboom) {
            var obj = void 0;
            if (this.allItem.GhasKey(id)) {
                obj = this.allItem.Gget(id);
            }
            else {
                obj = new zqObjData();
                obj.dlxId = id;
                this.allItem.Gput(id, obj);
            }
            if (obj.xlxIdList.length > 0) {
                obj.xlxIdList = obj.xlxIdList.concat(index);
            }
            else {
                obj.xlxIdList = [index];
            }
        }
        else {
            if (this.allItem.Gget(id)) {
                var obj = this.allItem.Gget(id);
                if (obj.xlxIdList.length > 0) {
                    var arr = [];
                    for (var i = 0; i < obj.xlxIdList.length; i++) {
                        if (obj.xlxIdList[i] != index)
                            arr = arr.concat(obj.xlxIdList[i]);
                    }
                    obj.xlxIdList = arr;
                }
            }
        }
        this.setitemToArr();
    };
    /**map转换arr */
    SPOnePass.prototype.setitemToArr = function () {
        var arr = [];
        for (var _i = 0, _a = this.allItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.allItem.Gget(key).xlxIdList.length != 0)
                arr = arr.concat(this.allItem.Gget(key));
        }
        this._arr = arr;
        this._selectText.text = "" + this._arr.length;
        // egret.log(this.allItem);
        // egret.log(this._arr);
    };
    /**id:赛事id */
    SPOnePass.prototype.upChangeSubMore = function (id, data) {
        var obj = new zqObjData();
        obj.dlxId = id;
        obj.xlxIdList = [];
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj.xlxIdList = obj.xlxIdList.concat(data.Gget(key));
        }
        this.allItem.Gput(id, obj);
        this.setitemToArr();
        for (var _b = 0, _c = SPG4Wnd.getInstance.GetItem().keys; _b < _c.length; _b++) {
            var key = _c[_b];
            var obj_1 = SPG4Wnd.getInstance.GetItem().Gget(key);
            for (var _d = 0, _e = obj_1.getSubItem().keys; _d < _e.length; _d++) {
                var akey = _e[_d];
                if (akey == id) {
                    obj_1.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
        }
    };
    /**清除G1所有数据 */
    SPOnePass.prototype.clearAllData = function () {
        var mitem;
        if (SPFbWnd.inIndex == 1) {
            mitem = SPG2Wnd.getInstance.GetItem();
        }
        else if (SPFbWnd.inIndex == 2) {
            mitem = SPG3Wnd.getInstance.GetItem();
        }
        else if (SPFbWnd.inIndex == 3) {
            mitem = SPG4Wnd.getInstance.GetItem();
        }
        else if (SPFbWnd.inIndex == 4) {
            mitem = SPG5Wnd.getInstance.GetItem();
        }
        this._arr = [];
        this._selectText.text = "0";
        this.allItem.clear();
        if (mitem != undefined) {
            for (var _i = 0, _a = mitem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = mitem.Gget(key).getSubItem();
                for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    item.Gget(akey).clear();
                }
            }
        }
    };
    SPOnePass.prototype.GoChange = function (e) {
        if (e.target == this._clearBtn) {
            this.clearAllData();
        }
        else if (e.target == this._goBtn) {
            if (this._arr != undefined && this._arr.length > 0 && this._arr.length < 9) {
                this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr, true);
                GoFBBuy.getInstance.show(this._data, this._arr, 2);
            }
            else
                Alertpaner.getInstance.show("请选择1场以上赛事");
        }
    };
    /**获取单场数据列表 */
    SPOnePass.prototype.getDGList = function (id) {
        var mitem;
        if (id == 2) {
            mitem = SPG2Wnd.getInstance.GetItem();
        }
        else if (id == 3) {
            mitem = SPG3Wnd.getInstance.GetItem();
        }
        else if (id == 4) {
            mitem = SPG4Wnd.getInstance.GetItem();
        }
        else if (id == 5) {
            mitem = SPG5Wnd.getInstance.GetItem();
        }
        return mitem;
    };
    SPOnePass.prototype.updata = function (e) {
        if (e.data != undefined) {
            var mitem = void 0;
            if (SPFbWnd.inIndex == 1) {
                mitem = SPG2Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 2) {
                mitem = SPG3Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 3) {
                mitem = SPG4Wnd.getInstance.GetItem();
            }
            else if (SPFbWnd.inIndex == 4) {
                mitem = SPG5Wnd.getInstance.GetItem();
            }
            if (e.data.cf == 1) {
                // this.clearAllData();
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
    SPOnePass.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.showWnd();
        this.requestData(this._index + 2);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_CJFTDG_List, this.updata, this);
    };
    SPOnePass.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._data = [];
            this.clearAllData();
            this._topShape.x = 0;
            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_CJFTDG_List, this.updata, this);
    };
    SPOnePass.prototype.requestData = function (type) {
        SPFT_One.getInstance.sendHttp(type, this._mContern);
    };
    SPOnePass.prototype.selectOn = function (e) {
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
    SPOnePass.prototype.showWnd = function () {
        this.clearAllData();
        if (this._index == 0) {
            this._mContern = SPG2Wnd.getInstance;
            SPG2Wnd.getInstance.show();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }
        else if (this._index == 1) {
            this._mContern = SPG3Wnd.getInstance;
            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.show();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }
        else if (this._index == 2) {
            this._mContern = SPG4Wnd.getInstance;
            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.show();
            SPG5Wnd.getInstance.hide();
        }
        else if (this._index == 3) {
            this._mContern = SPG5Wnd.getInstance;
            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.show();
        }
        egret.Tween.get(this._topShape).to({ x: 187.5 * this._index }, 200, egret.Ease.circOut);
        SPFbWnd.inIndex = this._index + 1;
    };
    /**不清除刷新界面 */
    SPOnePass.prototype.freshNow = function () {
        if (this._index == 0) {
            SPG2Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 1) {
            SPG3Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 2) {
            SPG4Wnd.getInstance.onlyFreshData();
        }
        else if (this._index == 3) {
            SPG5Wnd.getInstance.onlyFreshData();
        }
    };
    SPOnePass.prototype.addInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    SPOnePass.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._topInfo.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topInfo.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectOn, this);
        }
    };
    SPOnePass.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._downContain);
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
            bj.y = -10;
        }, this);
        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.x = 26;
        this._clearBtn.y = 20;
        this._clearBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png", function (e) {
            _this._clearBtn.$setBitmapData(e);
        }, this);
        var downT1 = ToolMrg.getText(0, 10, 32, 0x333333, 750);
        this._downContain.addChild(downT1);
        downT1.textAlign = egret.HorizontalAlign.CENTER;
        downT1.text = "已选择   场比赛";
        this._selectText = ToolMrg.getText(0, 10, 32, 0xF72E52, 750);
        this._downContain.addChild(this._selectText);
        this._selectText.textAlign = egret.HorizontalAlign.CENTER;
        this._selectText.text = "0";
        var downT2 = ToolMrg.getText(0, 58, 24, 0x999999, 750);
        this._downContain.addChild(downT2);
        downT2.textAlign = egret.HorizontalAlign.CENTER;
        downT2.text = "请至少选择1场比赛";
        this._selectBtn = new egret.Bitmap();
        this._downContain.addChild(this._selectBtn);
        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) {
            _this._goBtn.$setBitmapData(e);
            _this._goBtn.x = 556;
            _this._goBtn.y = 8;
        }, this);
        var goText = ToolMrg.getText(556, 28, 32, 0xFFFFFF, 176);
        this._downContain.addChild(goText);
        goText.height = 44;
        goText.verticalAlign = egret.VerticalAlign.MIDDLE;
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "选好了";
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
    };
    /**适配处理 */
    SPOnePass.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return SPOnePass;
}(egret.DisplayObjectContainer));
__reflect(SPOnePass.prototype, "SPOnePass");
var SPOnePassTopInfo = (function (_super) {
    __extends(SPOnePassTopInfo, _super);
    function SPOnePassTopInfo(str) {
        var _this = _super.call(this) || this;
        _this._title = ToolMrg.getText(0, 0, 28, 0x333333, 187.5);
        _this.addChild(_this._title);
        _this._title.height = 80;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = str;
        return _this;
    }
    SPOnePassTopInfo.prototype.selectInfo = function () {
        this._title.textColor = 0xF72F52;
    };
    SPOnePassTopInfo.prototype.noselectInfo = function () {
        this._title.textColor = 0x333333;
    };
    return SPOnePassTopInfo;
}(egret.DisplayObjectContainer));
__reflect(SPOnePassTopInfo.prototype, "SPOnePassTopInfo");
//# sourceMappingURL=SPOnePass.js.map