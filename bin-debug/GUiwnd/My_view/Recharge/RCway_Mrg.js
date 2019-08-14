var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RCway_Mrg = (function () {
    function RCway_Mrg() {
        this._infoItem = new GHashMap();
        // let a = new RCway_Data();
        // a.id = 1;
        // a._title = "支付宝";
        // a._content = "支付宝";
        // a.small = 10;
        // a.max = 200;
        // a._type = 1;
        // this._infoItem.Gput(0,a);
        // let b = new RCway_Data();
        // b.id = 2;
        // b._title = "微信";
        // b._content = "支付宝";
        // b.small = 10;
        // b.max = 300;
        // b._type = 2;
        // this._infoItem.Gput(1,b);
        // let c = new RCway_Data();
        // c.id = 3;
        // c._title = "银联";
        // c._content = "支付宝";
        // c.small = 100;
        // c.max = 300;
        // c._type = 3;
        // this._infoItem.Gput(2,c);
    }
    Object.defineProperty(RCway_Mrg, "getInstance", {
        get: function () {
            if (RCway_Mrg._mInstance == undefined)
                RCway_Mrg._mInstance = new RCway_Mrg();
            return RCway_Mrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /** key必须从0开始 */
    RCway_Mrg.prototype.addItem = function (id, data) {
        this._infoItem.Gput(id, data);
    };
    RCway_Mrg.prototype.getItem = function () {
        return this._infoItem;
    };
    RCway_Mrg.prototype.clear = function () {
        this._infoItem.clear();
    };
    return RCway_Mrg;
}());
__reflect(RCway_Mrg.prototype, "RCway_Mrg");
var RCway_Data = (function () {
    function RCway_Data() {
        this.money = [];
    }
    return RCway_Data;
}());
__reflect(RCway_Data.prototype, "RCway_Data");
//# sourceMappingURL=RCway_Mrg.js.map