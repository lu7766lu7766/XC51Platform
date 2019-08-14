var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**篮球 */
var BasketballData = (function () {
    function BasketballData() {
        /**
        "0": "4.4",  //不让分主胜
        "1": "2.37", //不让分客胜
        "2": "1.96", //让分主胜
        "3": "1.57",  //让分客胜
    
        *5-18更多信息
        */
        this.listSX = [];
        /**大小分总和数据 */
        this.dxFAll = 0;
        /**下标 */
        this.xb = 0;
    }
    return BasketballData;
}());
__reflect(BasketballData.prototype, "BasketballData");
//# sourceMappingURL=BasketballData.js.map