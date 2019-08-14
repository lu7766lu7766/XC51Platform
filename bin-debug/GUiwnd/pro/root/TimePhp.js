var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
//竞彩状态请求  time.php
返回
{
   res:0
   isJ:49897  // 截止时间    如果为0，就禁售期间   在售期间为截止时间
}
 */
var TimePhp = (function () {
    function TimePhp() {
        this.data = new HttpData();
        this.data.mKey = "TimePhp";
    }
    Object.defineProperty(TimePhp, "getInstance", {
        get: function () {
            if (TimePhp._mInstance == undefined)
                TimePhp._mInstance = new TimePhp();
            return TimePhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    TimePhp.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/time.php";
        var content = "v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    TimePhp.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(error);
                return;
            }
            if (text["res"] == "0") {
                GameValue.isJ = text["isJ"];
            }
        }
    };
    return TimePhp;
}());
__reflect(TimePhp.prototype, "TimePhp", ["IProHandle"]);
//# sourceMappingURL=TimePhp.js.map