var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**足球或篮球数据类*/
var BakorfallData = (function () {
    function BakorfallData() {
    }
    Object.defineProperty(BakorfallData, "getInstance", {
        get: function () {
            if (BakorfallData._mInstance == undefined)
                BakorfallData._mInstance = new BakorfallData();
            return BakorfallData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**红色选择下滑线的逻辑处理*/
    BakorfallData.prototype.redxdecide = function () {
        var list = BakorfallViewMrg.getInstance.gettopList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (BakorfallViewMrg.inIndex == i) {
                    data.selectInfo();
                }
                else {
                    data.noselectInfo();
                }
            }
        }
        BakorfallViewMrg.getInstance.redXXTween();
    };
    /**每过30秒同步一下数据*/
    /** */
    BakorfallData.prototype.sendsynchronizationInfo = function () {
        FootballBFConfin.getInstance.sendHttp();
        basketballBFConfin.getInstance.sendHttp();
        FootandBaskGZConfin.getInstance.sendHttp(1);
        FootandBaskGZConfin.getInstance.sendHttp(2);
        // GTimerMag.getInstance.addTimerTask("BakorfallData", 99999999, 300000, () => {
        // 	if (BakorfallViewMrg.decideshow == true) {
        // 		FootballBFConfin.getInstance.sendHttp();
        // 		basketballBFConfin.getInstance.sendHttp();
        // 		FootandBaskGZConfin.getInstance.sendHttp(1);
        // 		FootandBaskGZConfin.getInstance.sendHttp(2);
        // 	}
        // }, this);
    };
    return BakorfallData;
}());
__reflect(BakorfallData.prototype, "BakorfallData");
//# sourceMappingURL=BakorfallData.js.map