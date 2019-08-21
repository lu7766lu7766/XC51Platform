var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**足球数据管理类 */
var JCFootBallDataMrg = (function () {
    function JCFootBallDataMrg() {
        this._mAllList = new GHashMap();
    }
    Object.defineProperty(JCFootBallDataMrg, "getInstance", {
        get: function () {
            if (JCFootBallDataMrg._mInstance == undefined)
                JCFootBallDataMrg._mInstance = new JCFootBallDataMrg();
            return JCFootBallDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加列表 */
    JCFootBallDataMrg.prototype.addJCFootBallData = function (key, data) {
        this._mAllList.Gput(key, data);
    };
    /**获取列表 */
    JCFootBallDataMrg.prototype.getList = function () {
        return this._mAllList;
    };
    /**清理列表*/
    JCFootBallDataMrg.prototype.cleanAll = function () {
        this._mAllList.clear();
    };
    return JCFootBallDataMrg;
}());
__reflect(JCFootBallDataMrg.prototype, "JCFootBallDataMrg");
var JCFootBallData = (function () {
    function JCFootBallData() {
    }
    return JCFootBallData;
}());
__reflect(JCFootBallData.prototype, "JCFootBallData");
//# sourceMappingURL=JCFootBallDataMrg.js.map