var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
开奖记录期数选择 jqs.php
参数
type:1=>足球 2=>篮球
 */
var TenConfon = (function () {
    function TenConfon() {
        this.data = new HttpData();
        this.data.mKey = "TenConfon";
    }
    Object.defineProperty(TenConfon, "getInstance", {
        get: function () {
            if (TenConfon._mInstance == undefined)
                TenConfon._mInstance = new TenConfon();
            return TenConfon._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**发送请求篮球和足球筛选列表*/
    TenConfon.prototype.sentConnt = function () {
        this.sendHttp(1);
        this.sendHttp(2);
    };
    /**
     *
     */
    TenConfon.prototype.sendHttp = function (type) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'jqs.php';
        var content = "type=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    TenConfon.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var result = Number(text['res']);
            var typenum = Number(text['type']);
            var listlistArray = text['data'];
            if (result == 0) {
                if (typenum == 1) {
                    if (listlistArray != undefined) {
                        selectDayFootballData.selectDay = [];
                        for (var i = 0; i < listlistArray.length; i++) {
                            selectDayFootballData.selectDay[i] = listlistArray[i];
                        }
                    }
                }
                else if (typenum == 2) {
                    if (listlistArray != undefined) {
                        selectDayBasketBallData.selectDay = [];
                        for (var i = 0; i < listlistArray.length; i++) {
                            selectDayBasketBallData.selectDay[i] = listlistArray[i];
                        }
                    }
                }
            }
            if (selectDayBasketBall.getInstance != undefined && selectDayBasketBall.getInstance.parent != undefined) {
                selectDayBasketBall.getInstance.initAllRedBg();
            }
            if (selectDayFootball.getInstance != undefined && selectDayFootball.getInstance.parent != undefined) {
                selectDayFootball.getInstance.initAllRedBg();
            }
        }
    };
    return TenConfon;
}());
__reflect(TenConfon.prototype, "TenConfon", ["IProHandle"]);
//# sourceMappingURL=TenConfon.js.map