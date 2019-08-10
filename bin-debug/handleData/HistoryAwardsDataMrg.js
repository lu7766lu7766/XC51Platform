var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HistoryAwardsDataMrg = (function () {
    function HistoryAwardsDataMrg() {
        this.History3List = new GHashMap();
        this.History5List = new GHashMap();
    }
    Object.defineProperty(HistoryAwardsDataMrg, "getInstance", {
        get: function () {
            if (HistoryAwardsDataMrg._mInstance == undefined)
                HistoryAwardsDataMrg._mInstance = new HistoryAwardsDataMrg();
            return HistoryAwardsDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加列表 */
    HistoryAwardsDataMrg.prototype.addHistory3List = function (data) {
        this.History3List.Gput(data.id, data);
    };
    /**获取组3列表 */
    HistoryAwardsDataMrg.prototype.getHistory3List = function () {
        return this.History3List;
    };
    /**添加列表 */
    HistoryAwardsDataMrg.prototype.addHistory5List = function (data) {
        this.History5List.Gput(data.id, data);
    };
    /**获取组5列表 */
    HistoryAwardsDataMrg.prototype.getHistory5List = function () {
        return this.History5List;
    };
    return HistoryAwardsDataMrg;
}());
__reflect(HistoryAwardsDataMrg.prototype, "HistoryAwardsDataMrg");
//# sourceMappingURL=HistoryAwardsDataMrg.js.map