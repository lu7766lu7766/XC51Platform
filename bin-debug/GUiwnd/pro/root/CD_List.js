var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 资金明细列表

 */
var CD_List = (function () {
    function CD_List() {
        this.data = new HttpData();
        this.data.mKey = "CD_List";
    }
    Object.defineProperty(CD_List, "getInstance", {
        get: function () {
            if (CD_List._mInstance == undefined)
                CD_List._mInstance = new CD_List();
            return CD_List._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    CD_List.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/money.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    CD_List.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                var obj = new CDData();
                obj.b = text["b"]["total"];
                obj.p = text["p"]["total"];
                obj.j = text["j"]["total"];
                obj.t = text["t"]["total"];
                obj.w = text["w"]["total"];
                obj.f = text["f"]["total"];
                // obj.o = text["o"]["total"];
                var bitem = text["b"]["list"];
                if (bitem != undefined && bitem.length > 0) {
                    for (var i = 0; i < bitem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = bitem[i];
                        sub.typemax = 1;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.bItem.Gput(sub.id, sub);
                    }
                }
                var pitem = text["p"]["list"];
                if (pitem != undefined && pitem.length > 0) {
                    for (var i = 0; i < pitem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = pitem[i];
                        sub.typemax = 2;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.pItem.Gput(sub.id, sub);
                    }
                }
                var jitem = text["j"]["list"];
                if (jitem != undefined && jitem.length > 0) {
                    for (var i = 0; i < jitem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = jitem[i];
                        sub.typemax = 3;
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.jItem.Gput(sub.id, sub);
                    }
                }
                var titem = text["t"]["list"];
                if (titem != undefined && titem.length > 0) {
                    for (var i = 0; i < titem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = titem[i];
                        sub.id = i;
                        sub.typemax = 4;
                        sub.status = aaa["status"];
                        sub.type = aaa["type"];
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.tItem.Gput(sub.id, sub);
                    }
                }
                var witem = text["w"]["list"];
                if (witem != undefined && witem.length > 0) {
                    for (var i = 0; i < witem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = witem[i];
                        sub.typemax = 5;
                        sub.type = aaa["type"];
                        sub.id = i;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        obj.wItem.Gput(sub.id, sub);
                    }
                }
                var fitem = text["f"]["list"];
                if (fitem != undefined && fitem.length > 0) {
                    for (var i = 0; i < fitem.length; i++) {
                        var sub = new CDDataSub();
                        var aaa = fitem[i];
                        sub.id = i;
                        sub.typemax = 6;
                        sub._money = aaa["money"];
                        sub._dateTime = aaa["time"];
                        sub.type = aaa["type"];
                        obj.fItem.Gput(sub.id, sub);
                    }
                }
                // let oitem: Array<GHashMap<any>> = text["o"]["list"];
                // if (oitem != undefined && oitem.length > 0) {
                //     for (let i = 0; i < oitem.length; i++) {
                //         let sub = new CDDataSub();
                //         let aaa = oitem[i];
                //         sub.id = i;
                //         sub.typemax = 7;
                //         sub._money = aaa["money"];
                //         sub._dateTime = aaa["time"];
                //         obj.oItem.Gput(sub.id, sub);
                //     }
                // }
                CDMrg.getInstance._AllZJ = obj;
                if (CapitalWnd.getInstance != undefined && CapitalWnd.getInstance.parent != undefined)
                    CapitalWnd.getInstance.upData();
            }
        }
    };
    return CD_List;
}());
__reflect(CD_List.prototype, "CD_List", ["IProHandle"]);
//# sourceMappingURL=CD_List.js.map