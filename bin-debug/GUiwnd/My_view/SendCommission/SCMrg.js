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
var SCMrg = (function (_super) {
    __extends(SCMrg, _super);
    function SCMrg() {
        var _this = _super.call(this) || this;
        _this._AllScItem = new GHashMap();
        _this._unScItem = new GHashMap();
        _this._zScItem = new GHashMap();
        return _this;
    }
    Object.defineProperty(SCMrg, "getInstance", {
        get: function () {
            if (SCMrg._mInstance == undefined)
                SCMrg._mInstance = new SCMrg();
            return SCMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SCMrg.prototype.addunScItem = function (id, obj) {
        this._unScItem.Gput(id, obj);
    };
    SCMrg.prototype.addzScItem = function (id, obj) {
        this._zScItem.Gput(id, obj);
    };
    SCMrg.prototype.addAllSCitem = function (id, obj) {
        this._AllScItem.Gput(id, obj);
    };
    SCMrg.prototype.getAllSCitem = function () {
        return this._AllScItem;
    };
    SCMrg.prototype.getzScItem = function () {
        return this._zScItem;
    };
    SCMrg.prototype.getunScItem = function () {
        return this._unScItem;
    };
    SCMrg.prototype.clear = function () {
        this._zScItem.clear();
        this._unScItem.clear();
        this._AllScItem.clear();
    };
    return SCMrg;
}(egret.DisplayObjectContainer));
__reflect(SCMrg.prototype, "SCMrg");
//# sourceMappingURL=SCMrg.js.map