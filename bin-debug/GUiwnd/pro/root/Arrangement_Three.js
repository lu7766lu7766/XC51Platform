var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排列三
    http://192.168.20.23/ticket/test/Arrangement_Three.php?id=&s=&b=&z=&m=

    id=>用户ID，s=>json数组,b=>倍数，z=>注数，m=>金额（分）
 */
var Arrangement_Three = (function () {
    function Arrangement_Three() {
        this.data = new HttpData();
        this.data.mKey = "Arrangement_Three";
    }
    Object.defineProperty(Arrangement_Three, "getInstance", {
        get: function () {
            if (Arrangement_Three._mInstance == undefined)
                Arrangement_Three._mInstance = new Arrangement_Three();
            return Arrangement_Three._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Arrangement_Three.prototype.sendHttp = function (list, bs, czType) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/Arrangement_Three.php";
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
    Arrangement_Three.prototype.backHTTP = function (res, httpObj, data) {
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
                ThreeBox.getInstance.zfBack();
            }
        }
    };
    return Arrangement_Three;
}());
__reflect(Arrangement_Three.prototype, "Arrangement_Three", ["IProHandle"]);
//# sourceMappingURL=Arrangement_Three.js.map