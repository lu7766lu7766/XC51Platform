var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排列五
    http://192.168.20.23/ticket/test/Arrangement_Five.php?id=&s=&b=&z=&m=

    id=>用户ID，s=>json数组,b=>倍数，z=>注数，m=>金额（分）
 */
var Arrangement_Five = (function () {
    function Arrangement_Five() {
        this.data = new HttpData();
        this.data.mKey = "Arrangement_Five";
    }
    Object.defineProperty(Arrangement_Five, "getInstance", {
        get: function () {
            if (Arrangement_Five._mInstance == undefined)
                Arrangement_Five._mInstance = new Arrangement_Five();
            return Arrangement_Five._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Arrangement_Five.prototype.sendHttp = function (list, bs, czType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/Arrangement_Five.php";
        var a = new Array();
        var zs = 0;
        var m = 0;
        var obj;
        for (var i = 0; i < list.length; i++) {
            obj = list[i];
            zs += obj.injectionNum;
            if (a[obj.type] == undefined) {
                a[obj.type] = [];
            }
            a[obj.type].push(obj.result);
        }
        m = zs * bs * 200;
        var jsonstr;
        jsonstr = "{";
        for (var i = 0; i < a.length; i++) {
            if (a[i] != undefined) {
                jsonstr += "\"" + i + "\":[";
                for (var j = 0; j < a[i].length; j++) {
                    jsonstr += "\"" + a[i][j] + "\",";
                }
                jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
                jsonstr += "],";
            }
        }
        jsonstr = jsonstr.substring(0, jsonstr.lastIndexOf(','));
        jsonstr += "}";
        var content = "id=" + UserData.getInstance.userId + "&s=" + jsonstr + "&b=" + bs + "&z=" + zs + "&m=" + m + "&mold=" + czType + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Arrangement_Five.prototype.backHTTP = function (res, httpObj, data) {
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
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                Alertpaner.getInstance.show("下注成功");
                fiveWnd.getInstance.zfBack();
            }
        }
    };
    return Arrangement_Five;
}());
__reflect(Arrangement_Five.prototype, "Arrangement_Five", ["IProHandle"]);
//# sourceMappingURL=Arrangement_Five.js.map