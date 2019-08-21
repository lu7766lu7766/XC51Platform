var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
足球和篮球关注
返回t和数据列表
 */
var BasketFootGZConfin = (function () {
    function BasketFootGZConfin() {
        this.data = new HttpData();
        this.data.mKey = "BasketFootGZConfin";
    }
    Object.defineProperty(BasketFootGZConfin, "getInstance", {
        get: function () {
            if (BasketFootGZConfin._mInstance == undefined)
                BasketFootGZConfin._mInstance = new BasketFootGZConfin();
            return BasketFootGZConfin._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * type 1 足球 2篮球
     */
    BasketFootGZConfin.prototype.sendHttp = function (uid, type) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'appoint.php';
        var content = "id=" + UserData.getInstance.userId + "&uid=" + uid + "&type=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
        console.log("关注id:" + uid + "类型==" + type);
    };
    BasketFootGZConfin.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var res1 = Number(text['res']);
            BasketFootGZConfin.uid = Number(text['uid']);
            if (res1 == 0) {
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_gzSuccess);
            }
            else if (res1 == 1003) {
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_gzdefeated);
            }
            // BakorfallViewMrg.getInstance.refreshallInfo();
            BakorfallViewMrg.getInstance.refreshlist();
            // FootandBaskGZConfin.getInstance.sendHttp(1);
            // FootandBaskGZConfin.getInstance.sendHttp(2);
            // FootballBFConfin.getInstance.sendHttp();
            // basketballBFConfin.getInstance.sendHttp();
        }
    };
    BasketFootGZConfin.uid = 0;
    return BasketFootGZConfin;
}());
__reflect(BasketFootGZConfin.prototype, "BasketFootGZConfin", ["IProHandle"]);
//# sourceMappingURL=BasketFootGZConfin.js.map