var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**足球数据类 */
var FootballData = (function () {
    function FootballData() {
        /**
        "0": "4.4",  //不让球的赢赔率
        "1": "2.37", //不让球的平赔率
        "2": "1.96", //不让球的负赔率
        "3": "1.57",  //让球的赢赔率
        "4": "3.35",  //让球的平赔率
        "5": "4.5",   //让球的负赔率
    
        *6-54更多信息
        */
        this.listSX = [];
        /**下标 */
        this.xb = 0;
    }
    return FootballData;
}());
__reflect(FootballData.prototype, "FootballData");
//# sourceMappingURL=FootballData.js.map