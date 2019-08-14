var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跟单详情

 */
var GD_detail = (function () {
    function GD_detail() {
        this.data = new HttpData();
        this.data.mKey = "GD_detail";
    }
    Object.defineProperty(GD_detail, "getInstance", {
        get: function () {
            if (GD_detail._mInstance == undefined)
                GD_detail._mInstance = new GD_detail();
            return GD_detail._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    GD_detail.prototype.sendHttp = function (o, m) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/tie_two.php";
        var content = "o=" + o + "&m=" + m + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GD_detail.prototype.backHTTP = function (res, httpObj, data) {
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
                var obj = new GD_DetailData();
                var aaa = text["data"];
                obj.endTime = aaa["tl"];
                obj.txSrc = aaa["icon"];
                obj.oid = aaa["order_id"];
                obj.id = aaa["id"];
                obj.txName = aaa["name"];
                obj.ji = aaa["ji"];
                obj.zh = aaa["zh"];
                obj.endArr = aaa["ke"];
                obj.lv = aaa["lv"];
                obj.declare = aaa["declare"];
                obj.total = aaa["total"];
                obj.g_total = aaa["g_total"];
                obj.hr = aaa["hr"];
                obj.rate = aaa["rate"];
                obj._type = aaa["type"];
                obj.model = aaa["model"];
                obj.t = aaa["t"];
                obj.money = aaa["money"];
                obj.k = aaa["k"];
                obj._b = aaa["b"];
                if (aaa["vip"] == undefined) {
                    obj.vip = "1";
                }
                else {
                    obj.vip = aaa["vip"];
                }
                if (aaa["ql"] == 1) {
                    if (aaa["type"] == 1) {
                        obj._typeStatic = 2;
                    }
                    else {
                        obj._typeStatic = 1;
                    }
                }
                else if (aaa["ql"] == 2) {
                    if (aaa["type"] == 1) {
                        obj._typeStatic = 4;
                    }
                    else {
                        obj._typeStatic = 3;
                    }
                }
                var arr = aaa["fa"];
                if (arr != undefined && arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var objSub = new GD_detailSubdata();
                        var ccc = arr[i];
                        objSub._static = ccc["status"];
                        objSub.len_name = ccc["len_name"];
                        objSub.day = ccc["day"];
                        objSub.team_a_name = ccc["team_a_name"];
                        objSub.team_b_name = ccc["team_b_name"];
                        objSub.want = ccc["want"];
                        objSub.result = ccc["result"];
                        objSub._time = ccc["day"];
                        obj.GD_detailItem.Gput(i, objSub);
                    }
                }
                var list = aaa["num"];
                if (list != undefined && list.length > 0) {
                    for (var k = 0; k < list.length; k++) {
                        var ddd = list[k];
                        var userList = new GD_UserList();
                        userList.id = k;
                        userList.userName = ddd[0];
                        userList.userMoney = ddd[2];
                        userList.tx = ddd[1];
                        userList.timeNum = ddd[3];
                        obj.GD_UserItem.Gput(k, userList);
                    }
                    obj.num = list.length;
                }
                else {
                    obj.num = 0;
                }
                if (DmC_infoMsg.dmdetail != undefined && DmC_infoMsg.dmdetail.parent != undefined)
                    DmC_infoMsg.dmdetail.updata(obj);
            }
        }
    };
    return GD_detail;
}());
__reflect(GD_detail.prototype, "GD_detail", ["IProHandle"]);
//# sourceMappingURL=GD_detail.js.map