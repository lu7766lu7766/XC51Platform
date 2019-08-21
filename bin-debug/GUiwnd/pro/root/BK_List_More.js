var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var BK_List_More = (function () {
    function BK_List_More() {
        this.data = new HttpData();
        this.data.mKey = "BK_List_More";
    }
    Object.defineProperty(BK_List_More, "getInstance", {
        get: function () {
            if (BK_List_More._mInstance == undefined)
                BK_List_More._mInstance = new BK_List_More();
            return BK_List_More._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    BK_List_More.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/bk_List_More.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    BK_List_More.prototype.backHTTP = function (res, httpObj, data) {
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
                var id = text["id"];
                var arr = text["list"];
                var dd = BasketballDataMrg.getInstance.getDataById(Number(id));
                if (dd == undefined) {
                    Alertpaner.getInstance.show("不存在对象");
                    return;
                }
                dd.dxFAll = text["mid"];
                dd.no_lose = text["no_lose"];
                dd.lot_lose = text["lot_lose"];
                for (var i = 0; i < arr.length; i++) {
                    dd.listSX[i] = arr[i];
                }
            }
            CustEventMrg.getInstance.dispatch(CustEventType.EventType_BK_List_More);
        }
    };
    return BK_List_More;
}());
__reflect(BK_List_More.prototype, "BK_List_More", ["IProHandle"]);
//# sourceMappingURL=BK_List_More.js.map