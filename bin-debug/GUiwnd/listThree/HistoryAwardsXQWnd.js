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
/**
 * 开奖详情
 */
var HistoryAwardsXQWnd = (function (_super) {
    __extends(HistoryAwardsXQWnd, _super);
    function HistoryAwardsXQWnd() {
        var _this = _super.call(this) || this;
        _this._srcItem = ["奖项", "中奖注数", "单注奖金"];
        _this._LsrcItem3 = ["直选", "组三", "组六"];
        _this._LsrcItem5 = ["一等奖"];
        _this._mList = new GHashMap();
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("开奖详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this.setDB();
        _this.touchEnabled = true;
        var link = new egret.Shape();
        link.graphics.beginFill(0xF5F5F7);
        link.graphics.drawRect(0, 286 - 40 - 96, GameMain.getInstance.StageWidth, 10);
        link.graphics.endFill();
        _this.addChild(link);
        for (var i = 0; i < _this._srcItem.length; i++) {
            var text = ToolMrg.getText(i * 250, 296 - 40 - 96, 32, 0x999999, 250);
            text.height = 90;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.text = _this._srcItem[i];
            _this.addChild(text);
            text.touchEnabled = true;
        }
        var link1 = new egret.Shape();
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 396 - 40 - 96, GameMain.getInstance.StageWidth, 2);
        link1.graphics.endFill();
        _this.addChild(link1);
        return _this;
    }
    Object.defineProperty(HistoryAwardsXQWnd, "getInstance", {
        get: function () {
            if (HistoryAwardsXQWnd._mInstance == undefined)
                HistoryAwardsXQWnd._mInstance = new HistoryAwardsXQWnd();
            return HistoryAwardsXQWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**适配处理 */
    HistoryAwardsXQWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    HistoryAwardsXQWnd.prototype.show = function (data, type) {
        GUIManager.getInstance.tipLay.addChild(this);
        if (this._mObj == undefined)
            this._mObj = HistoryAwardsObj.getObj();
        this._mObj.init(data);
        // this._mObj.y = 96+GameValue.adaptationScreen - 40 - 96;
        this.addChildAt(this._mObj, 1);
        var list = this._LsrcItem3;
        if (type == 5) {
            list = this._LsrcItem5;
        }
        var obj;
        for (var i = 0; i < list.length; i++) {
            if (this._mList.GhasKey(i)) {
                obj = this._mList.Gget(i);
            }
            else {
                obj = TiaoBoj.getObj();
                this._mList.Gput(i, obj);
            }
            obj.init(list[i], data.sz[i * 2], data.sz[(i) * 2 + 1]);
            obj.y = 406 - 40 - 96 + i * 100;
            this.addChild(obj);
        }
    };
    HistoryAwardsXQWnd.prototype.hide = function () {
        GObjPool.getInstance.Gadd2Pool(this._mObj);
        if (this._mObj.parent != undefined) {
            this._mObj.parent.removeChild(this._mObj);
        }
        var obj;
        for (var _i = 0, _a = this._mList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._mList.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
        }
        this._mObj = undefined;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return HistoryAwardsXQWnd;
}(egret.DisplayObjectContainer));
__reflect(HistoryAwardsXQWnd.prototype, "HistoryAwardsXQWnd");
/**一条对象 */
var TiaoBoj = (function (_super) {
    __extends(TiaoBoj, _super);
    function TiaoBoj() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var link2 = new egret.Shape();
        link2.graphics.beginFill(0xffffff);
        link2.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        link2.graphics.endFill();
        _this.addChild(link2);
        var link1 = new egret.Shape();
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(20, 98, GameMain.getInstance.StageWidth - 40, 2);
        link1.graphics.endFill();
        _this.addChild(link1);
        return _this;
    }
    TiaoBoj.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(TiaoBoj);
        if (obj == null)
            obj = new TiaoBoj();
        return obj;
    };
    TiaoBoj.prototype.init = function (str, zs, m) {
        if (this._mTitle == undefined)
            this._mTitle = ToolMrg.getText(100, 26, 32, 0x333333, 200);
        this._mTitle.text = str;
        this.addChild(this._mTitle);
        if (this._mXZ == undefined)
            this._mXZ = ToolMrg.getText(274, 32, 24, 0x333333, 200);
        this._mXZ.textAlign = egret.HorizontalAlign.CENTER;
        this._mXZ.text = "" + zs;
        this.addChild(this._mXZ);
        if (this._mJQ == undefined)
            this._mJQ = ToolMrg.getText(524, 32, 24, 0xF72E52, 200);
        this._mJQ.textAlign = egret.HorizontalAlign.CENTER;
        this._mJQ.text = "" + m;
        this.addChild(this._mJQ);
    };
    TiaoBoj.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._mTitle.text = "";
        this._mXZ.text = "";
        this._mJQ.text = "";
    };
    return TiaoBoj;
}(egret.DisplayObjectContainer));
__reflect(TiaoBoj.prototype, "TiaoBoj", ["GIObjPool"]);
//# sourceMappingURL=HistoryAwardsXQWnd.js.map