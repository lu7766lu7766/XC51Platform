var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 */
var FT_List_More = (function () {
    function FT_List_More() {
        this.data = new HttpData();
        this.data.mKey = "FT_List_More";
    }
    Object.defineProperty(FT_List_More, "getInstance", {
        get: function () {
            if (FT_List_More._mInstance == undefined)
                FT_List_More._mInstance = new FT_List_More();
            return FT_List_More._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    FT_List_More.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/ft_List_More.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    FT_List_More.prototype.backHTTP = function (res, httpObj, data) {
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
                var dd = FootballDataMrg.getInstance.getDataById(Number(id));
                if (dd == undefined) {
                    Alertpaner.getInstance.show("不存在对象");
                    return;
                }
                dd.no_lose = text["no_lose"];
                dd.lot_lose = text["lot_lose"];
                for (var i = 0; i < arr.length; i++) {
                    dd.listSX[i] = arr[i];
                }
            }
            CustEventMrg.getInstance.dispatch(CustEventType.EventType_FT_List_More);
        }
    };
    return FT_List_More;
}());
__reflect(FT_List_More.prototype, "FT_List_More", ["IProHandle"]);
//# sourceMappingURL=FT_List_More.js.map