var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**开奖信息管理类 */
var AwareInfoData = (function () {
    function AwareInfoData() {
        this._mListObj = new GHashMap();
    }
    Object.defineProperty(AwareInfoData, "getInstance", {
        get: function () {
            if (AwareInfoData._mInstance == undefined)
                AwareInfoData._mInstance = new AwareInfoData();
            return AwareInfoData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表*/
    AwareInfoData.prototype.getlist = function () {
        return this._mListObj;
    };
    /**根据id查找对应数据*/
    AwareInfoData.prototype.getInfo = function (id) {
        var data;
        for (var i = 0; i <= this._mListObj.size; i++) {
            if (id == i) {
                data = this._mListObj.Gget(i);
                return data;
            }
        }
    };
    AwareInfoData.decidecom = false; //协议是否返回
    return AwareInfoData;
}());
__reflect(AwareInfoData.prototype, "AwareInfoData");
//# sourceMappingURL=AwareInfoData.js.map