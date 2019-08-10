var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
篮球下单:
http://129.204.53.154/other/test/bk_Order.php
参数
id:用户id
s:json数组

r:利润
d:宣言
type:0:不公开  1:公开  2:截止后公开  3:保密

t：1=>篮球串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
m:需要支付的金额(分)

返回
  res:0 成功下单   res等于其它都代表下单失败
 */
var BK_Order = (function () {
    function BK_Order() {
        this.data = new HttpData();
        this.data.mKey = "BK_Order";
    }
    Object.defineProperty(BK_Order, "getInstance", {
        get: function () {
            if (BK_Order._mInstance == undefined)
                BK_Order._mInstance = new BK_Order();
            return BK_Order._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     * 倍数 bs
     * 参数 t     1=>篮球串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
     */
    BK_Order.prototype.sendHttp = function (list, dryingData, t, select, czType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/bk_Order.php";
        var a = new Array();
        var zs = 0;
        var m = 0;
        var obj;
        for (var i = 0; i < list.length; i++) {
            obj = list[i];
            for (var j = 0; j < select.length; j++) {
                if (obj.injectionNum > 0 && list[i].typeStrand - 1 == select[j]) {
                    zs += obj.injectionNum;
                    for (var k = 0; k < obj.listStrand.length; k++) {
                        m += obj.listStrand[k][0][2] * 200;
                    }
                    if (a[obj.typeStrand] == undefined) {
                        a[obj.typeStrand] = [];
                    }
                    a[obj.typeStrand].push(obj.listStrand);
                }
            }
        }
        var jsonstr;
        jsonstr = "{";
        for (var i = 0; i < a.length; i++) {
            if (a[i] != undefined) {
                jsonstr += "\"" + i + "\":[";
                for (var j = 0; j < a[i].length; j++) {
                    for (var k = 0; k < a[i][j].length; k++) {
                        jsonstr += "[";
                        for (var l = 0; l < a[i][j][k].length; l++) {
                            jsonstr += "[" + a[i][j][k][l] + "],";
                        }
                        jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
                        jsonstr += "],";
                    }
                }
                jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
                jsonstr += "],";
            }
        }
        jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
        jsonstr += "}";
        var content = "id=" + UserData.getInstance.userId + "&s=" + jsonstr + "&r=" + dryingData.yltc + "&d=" + dryingData.faxy + "&type=" + dryingData.type + "&z=" + zs + "&m=" + m + "&t=" + t + "&mold=" + czType + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    BK_Order.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(httpObj.response);
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
                PaymentWnd.canPay = true;
            }
            else {
                Alertpaner.getInstance.show("下注成功");
                GD_List.getInstance.sendHttp();
                BasketBallWnd.getInstance.zfBack();
            }
        }
    };
    return BK_Order;
}());
__reflect(BK_Order.prototype, "BK_Order", ["IProHandle"]);
//# sourceMappingURL=BK_Order.js.map