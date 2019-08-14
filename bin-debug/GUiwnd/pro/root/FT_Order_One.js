var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
超过100注足球下单 ft_Order_One.php
参数：
id:用户id
s:json数组
b:倍数
t：1=>串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
m:需要支付的金额(分)
mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
type:发单类型 0:不公开  1:公开  2:截止后公开  3:保密 （下面的参数只有type！=0才需要发）
d:宣言
r：发单利润
l: 1-8   （1=>单关，2-8  几串几  ）多个用逗号隔开
返回
{
    res：0；  （返回其他都是错误）
}
 */
var FT_Order_One = (function () {
    function FT_Order_One() {
        this.data = new HttpData();
        this.data.mKey = "FT_Order_One";
    }
    Object.defineProperty(FT_Order_One, "getInstance", {
        get: function () {
            if (FT_Order_One._mInstance == undefined)
                FT_Order_One._mInstance = new FT_Order_One();
            return FT_Order_One._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     * 倍数 bs
     * 参数 t     1=>串关    2=>单关胜平负    3=>单关进球数    4=>单关比分    5=>单关半全场
     * mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
     */
    FT_Order_One.prototype.sendHttp = function (dataItem, dryingData, t, select, b, m, czType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/ft_Order_One.php";
        var strChuan = "";
        for (var i = 0; i < select.length; i++) {
            strChuan += (select[i] + 1);
            if (i < select.length - 1) {
                strChuan += ",";
            }
        }
        var jsonstr;
        jsonstr = "{";
        for (var i = 0; i < dataItem.length; i++) {
            if (dataItem[i] != undefined) {
                jsonstr += "\"" + dataItem[i].dlxId + "\":[";
                for (var j = 0; j < dataItem[i].xlxIdList.length; j++) {
                    jsonstr += "" + dataItem[i].xlxIdList[j] + ",";
                }
                jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
                jsonstr += "],";
            }
        }
        jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
        jsonstr += "}";
        var content = "id=" + UserData.getInstance.userId + "&s=" + jsonstr + "&r=" + dryingData.yltc + "&d=" + dryingData.faxy + "&type=" + dryingData.type + "&b=" + b + "&m=" + m * 100 + "&t=" + t + "&mold=" + czType + "&l=" + strChuan + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    FT_Order_One.prototype.backHTTP = function (res, httpObj, data) {
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
                if (text["res"] == "1000") {
                    Alertpaner.getInstance.show(text["msg"]);
                }
                else if (text["res"] == "1001") {
                    Alertpaner.getInstance.show(text["msg"]);
                    FT_List.getInstance.sendHttp(G1Wnd.getInstance);
                }
                PaymentWnd.canPay = true;
            }
            else {
                Alertpaner.getInstance.show("下注成功");
                FbWnd.getInstance.zfBack();
                GD_List.getInstance.sendHttp();
            }
        }
    };
    return FT_Order_One;
}());
__reflect(FT_Order_One.prototype, "FT_Order_One", ["IProHandle"]);
//# sourceMappingURL=FT_Order_One.js.map