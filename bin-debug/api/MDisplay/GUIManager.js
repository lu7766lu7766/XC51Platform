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
var GUIManager = (function (_super) {
    __extends(GUIManager, _super);
    function GUIManager() {
        var _this = _super.call(this) || this;
        _this._mUIBg = new egret.DisplayObjectContainer();
        _this._mUITop = new egret.DisplayObjectContainer();
        _this._mUITips = new egret.DisplayObjectContainer();
        _this._mUIMost = new egret.DisplayObjectContainer();
        _this.addChild(_this._mUIBg);
        _this.addChild(_this._mUITop);
        _this.addChild(_this._mUITips);
        _this.addChild(_this._mUIMost);
        return _this;
    }
    Object.defineProperty(GUIManager, "getInstance", {
        get: function () {
            if (GUIManager._mInstance == undefined)
                GUIManager._mInstance = new GUIManager();
            return GUIManager._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "bgLay", {
        get: function () {
            return this._mUIBg;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "topLay", {
        get: function () {
            return this._mUITop;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "tipLay", {
        get: function () {
            return this._mUITips;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GUIManager.prototype, "mostLay", {
        get: function () {
            return this._mUIMost;
        },
        enumerable: true,
        configurable: true
    });
    return GUIManager;
}(egret.DisplayObjectContainer));
__reflect(GUIManager.prototype, "GUIManager");
//# sourceMappingURL=GUIManager.js.map