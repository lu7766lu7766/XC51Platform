var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排列三或者排列五期数和截止时间：qs.php
返回
{
    "res": 0,
    "three": "20190701",//排列三期数
    "five":"20190701",//排列五期数
    "time": 1563191700 //截止时间
    "type":1销售中 2停止销售
    "isJ":0不能打开 1可打开
}
 */
var QsPhp = (function () {
    function QsPhp() {
        this.data = new HttpData();
        this.data.mKey = "QsPhp";
    }
    Object.defineProperty(QsPhp, "getInstance", {
        get: function () {
            if (QsPhp._mInstance == undefined)
                QsPhp._mInstance = new QsPhp();
            return QsPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    QsPhp.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/qs.php";
        var content = "v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    QsPhp.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                if (text["res"] != 1000)
                    Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                GameValue.threeQS = text["three"];
                GameValue.fiveQS = text["five"];
                GameValue.stopTime = text["time"];
                GameValue.typeQS = text["type"];
                GameValue.isJ = text["isJ"];
            }
        }
    };
    return QsPhp;
}());
__reflect(QsPhp.prototype, "QsPhp", ["IProHandle"]);
//# sourceMappingURL=QsPhp.js.map