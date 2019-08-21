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
var DmCenterWnd = (function (_super) {
    __extends(DmCenterWnd, _super);
    function DmCenterWnd() {
        var _this = _super.call(this) || this;
        _this._item = new GHashMap();
        return _this;
        //send协议
    }
    DmCenterWnd.prototype.getItem = function () {
        return this._item;
    };
    DmCenterWnd.prototype.upData = function () {
        var item = DmC_infoMsg.getInstance.item;
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new DmC_info();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
    };
    return DmCenterWnd;
}(egret.DisplayObjectContainer));
__reflect(DmCenterWnd.prototype, "DmCenterWnd");
//# sourceMappingURL=DmCenterWnd.js.map