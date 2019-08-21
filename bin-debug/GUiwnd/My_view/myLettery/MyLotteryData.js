var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyLotteryData = (function () {
    function MyLotteryData() {
        /**篮球 足球 */
        this.fbLotData = new GHashMap();
        /** 预测金额数据*/
        this.yePriceList = [];
    }
    return MyLotteryData;
}());
__reflect(MyLotteryData.prototype, "MyLotteryData");
/**篮球 足球 */
var FBLotData = (function () {
    function FBLotData() {
        /**投注项 第一位下标id 第二位倍率*/
        // public list: Array<number[]> = new Array<number[]>();
        this.list = [];
        /**赛果列表 */
        this.fruitList = [];
    }
    return FBLotData;
}());
__reflect(FBLotData.prototype, "FBLotData");
/**排三排五 */
var ThreeOrFive = (function () {
    function ThreeOrFive() {
        /**预计今天开奖时间 */
        this.openStr = "";
        /**开奖号码 */
        this.kjNumList = [];
        /**类型*/
        this.type = 0;
        /**投注内容列表 */
        this.tzList = [];
        /**倍数*/
        this.doubleNum = 0;
    }
    /**获取类型字符串*/
    ThreeOrFive.prototype.getstr = function (type) {
        if (type == 1) {
            return "直选";
        }
        else if (type == 3) {
            return "组三";
        }
        else if (type == 4) {
            return "组六";
        }
    };
    /**获取投注列表*/
    ThreeOrFive.prototype.gettzList = function () {
        var strList = [];
        var list = this.tzList;
        for (var i = 0; i < list.length; i++) {
            var one = list[i];
            var newlist = [];
            newlist[1] = "(" + this.getstr(Number(one[1])) + ")";
            newlist[0] = one[0];
            strList[i] = newlist;
        }
        return strList;
    };
    return ThreeOrFive;
}());
__reflect(ThreeOrFive.prototype, "ThreeOrFive");
//# sourceMappingURL=MyLotteryData.js.map