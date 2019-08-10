var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地址: /p/pr.php
    请求参数:
        uid:用户ID
        m:充值金额
        rk:
        payType:
        wayType:




    res:0 	//0成功
    purl:	//充值跳转地址
 */
var PayGo = (function () {
    function PayGo() {
        this.data = new HttpData();
        this.data.mKey = "PayGo";
    }
    Object.defineProperty(PayGo, "getInstance", {
        get: function () {
            if (PayGo._mInstance == undefined)
                PayGo._mInstance = new PayGo();
            return PayGo._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    PayGo.prototype.sendHttp = function (m, payType, wayType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/p/pr.php";
        var content = "uid=" + UserData.getInstance.userId + "&rk=" + GameValue.orderKey + "&m=" + m + "&type=" + payType + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    PayGo.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
            }
            else {
                if (text["purl"] && window["go2Url"]) {
                    window["go2Url"](text["purl"]);
                    PayTipWindow.getInstance.show();
                }
            }
        }
    };
    return PayGo;
}());
__reflect(PayGo.prototype, "PayGo", ["IProHandle"]);
//# sourceMappingURL=PayGo.js.map