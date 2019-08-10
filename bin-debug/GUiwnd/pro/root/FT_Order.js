var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
//足球下单

http://192.168.20.23/ticket/test/ft_Order.php?s=&id=&b=&m=&z=
mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
id=>用户ID，s=>json数组,b=>倍数，z=>注数，m=>金额（分）

$a=[
    2=>[
        [[1702567,1],[1716418,2]],
        [[1702567,1],[1656676,2]],
        [[1716418,2],[1656676,2]]
    ],
    3=>[
        [[1702567,1],[1716418,2],[1656676,2]],
    ],
];
 */
var FT_Order = (function () {
    function FT_Order() {
        this.data = new HttpData();
        this.data.mKey = "FT_Order";
    }
    Object.defineProperty(FT_Order, "getInstance", {
        get: function () {
            if (FT_Order._mInstance == undefined)
                FT_Order._mInstance = new FT_Order();
            return FT_Order._mInstance;
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
    FT_Order.prototype.sendHttp = function (list, dryingData, t, select, czType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/ft_Order.php";
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
    FT_Order.prototype.backHTTP = function (res, httpObj, data) {
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
                FbWnd.getInstance.zfBack();
                GD_List.getInstance.sendHttp();
            }
        }
    };
    return FT_Order;
}());
__reflect(FT_Order.prototype, "FT_Order", ["IProHandle"]);
//# sourceMappingURL=FT_Order.js.map