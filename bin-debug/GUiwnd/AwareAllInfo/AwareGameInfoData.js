var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AwareGameInfoData = (function () {
    function AwareGameInfoData() {
        /**时间 */
        this.time = "";
        /**比赛队伍和比分 */
        this.teamstr = "";
    }
    AwareGameInfoData.prototype.setlist = function (str) {
        var str1 = str;
    };
    AwareGameInfoData.prototype.getAwareList = function () {
        var awareList = [];
        var awareId = 0;
        if (this.kjjg.length > 1) {
            var str = this.kjjg.split(",");
            for (var i = 0; i < str.length; i++) {
                awareId = Number(str[i]);
                awareList[i] = awareId;
            }
        }
        else {
            awareList[0] = Number(this.kjjg);
        }
        return awareList;
    };
    return AwareGameInfoData;
}());
__reflect(AwareGameInfoData.prototype, "AwareGameInfoData");
//# sourceMappingURL=AwareGameInfoData.js.map