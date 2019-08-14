var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跟单列表

 */
var GD_List = (function () {
    function GD_List() {
        this.data = new HttpData();
        this.data.mKey = "GD_List";
    }
    Object.defineProperty(GD_List, "getInstance", {
        get: function () {
            if (GD_List._mInstance == undefined)
                GD_List._mInstance = new GD_List();
            return GD_List._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    GD_List.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/tie.php";
        var content = "v=" + GameValue.verPhp + "&id=" + UserData.getInstance.userId;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GD_List.prototype.backHTTP = function (res, httpObj, data) {
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
                DmC_infoMsg.getInstance.item.clear();
                var arr = text["data"];
                var objSub = void 0;
                if (arr != undefined && arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var aaa = arr[i];
                        var obj = new DmC_infoData();
                        obj.txSrc = aaa["icon"];
                        obj.oid = aaa["order_id"];
                        // obj.one = aaa["one"];
                        // obj.oneType = aaa["len_name"];
                        obj.mold = aaa["mold"];
                        obj.id = aaa["id"];
                        obj.content = aaa["declare"];
                        obj._type = aaa["type"];
                        obj.num = aaa["num"];
                        obj.GD_money = aaa["money"];
                        obj.money = aaa["total"];
                        obj.txName = aaa["name"];
                        obj.ticke = aaa["ticke"];
                        obj.z = aaa["z"] == undefined ? "0" : aaa["z"];
                        // obj.lv = aaa["lv"];
                        obj.multiple = aaa["hr"];
                        obj.time = aaa["time"];
                        obj.model = aaa["model"];
                        obj._status = aaa["t"] == undefined ? 0 : aaa["t"];
                        if (aaa["vip"] == undefined)
                            obj.vip = "1";
                        else
                            obj.vip = aaa["vip"];
                        DmC_infoMsg.getInstance.item.Gput(obj.oid, obj);
                        var item = aaa["team"];
                        if (item != undefined && item.length > 0) {
                            for (var k = 0; k < item.length; k++) {
                                var bbb = item[k];
                                objSub = new DmC_infoData_team();
                                objSub.team_a_name = bbb["team_a_name"];
                                objSub.team_b_name = bbb["team_b_name"];
                                objSub.len_name = bbb["len_name"];
                                objSub.day = bbb["day"];
                                obj.teamItem.Gput(k, objSub);
                            }
                        }
                    }
                }
                if (WorldWnd.getInstance != undefined && WorldWnd.getInstance.parent != undefined)
                    WorldWnd.getInstance.upDownData();
                if (DmWnd_2.getInstance != undefined && DmWnd_2.getInstance.parent != undefined)
                    DmWnd_2.getInstance.upData();
            }
        }
    };
    return GD_List;
}());
__reflect(GD_List.prototype, "GD_List", ["IProHandle"]);
//# sourceMappingURL=GD_List.js.map