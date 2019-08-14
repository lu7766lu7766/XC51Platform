var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var JCBasketBallDataMrg = (function () {
    function JCBasketBallDataMrg() {
        this._mAllList = new GHashMap();
    }
    Object.defineProperty(JCBasketBallDataMrg, "getInstance", {
        get: function () {
            if (JCBasketBallDataMrg._mInstance == undefined)
                JCBasketBallDataMrg._mInstance = new JCBasketBallDataMrg();
            return JCBasketBallDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加列表 */
    JCBasketBallDataMrg.prototype.addJCBasketBallData = function (key, data) {
        this._mAllList.Gput(key, data);
    };
    /**获取列表 */
    JCBasketBallDataMrg.prototype.getList = function () {
        return this._mAllList;
    };
    /**清除列表*/
    JCBasketBallDataMrg.prototype.cleanall = function () {
        this._mAllList.clear();
    };
    return JCBasketBallDataMrg;
}());
__reflect(JCBasketBallDataMrg.prototype, "JCBasketBallDataMrg");
var JCBasketBallData = (function () {
    function JCBasketBallData() {
    }
    return JCBasketBallData;
}());
__reflect(JCBasketBallData.prototype, "JCBasketBallData");
//# sourceMappingURL=JCBasketBallDataMrg.js.map