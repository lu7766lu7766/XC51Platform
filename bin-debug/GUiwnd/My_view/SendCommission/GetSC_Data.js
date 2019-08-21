var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 跟单列表

 */
var GetSC_Data = (function () {
    function GetSC_Data() {
        this.data = new HttpData();
        this.data.mKey = "GetSC_Data";
    }
    Object.defineProperty(GetSC_Data, "getInstance", {
        get: function () {
            if (GetSC_Data._mInstance == undefined)
                GetSC_Data._mInstance = new GetSC_Data();
            return GetSC_Data._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    GetSC_Data.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/Yj.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GetSC_Data.prototype.backHTTP = function (res, httpObj, data) {
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
                SCMrg.getInstance.clear();
                var arr1 = text["all"];
                var arr2 = text["w"];
                var arr3 = text["y"];
                var index = 0;
                if (arr1 != undefined && arr1.length > 0) {
                    for (var i = 0; i < arr1.length; i++) {
                        var obj = new SCData();
                        var aaa = arr1[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        SCMrg.getInstance.addAllSCitem(obj.id, obj);
                    }
                }
                if (arr2 != undefined && arr2.length > 0) {
                    for (var i = 0; i < arr2.length; i++) {
                        var obj = new SCData();
                        var aaa = arr2[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        SCMrg.getInstance.addunScItem(obj.id, obj);
                    }
                }
                if (arr3 != undefined && arr3.length > 0) {
                    for (var i = 0; i < arr3.length; i++) {
                        var obj = new SCData();
                        var aaa = arr3[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        SCMrg.getInstance.addzScItem(obj.id, obj);
                    }
                }
                if (SCWnd.getInstance.parent != undefined)
                    SCWnd.getInstance.updata();
            }
        }
    };
    return GetSC_Data;
}());
__reflect(GetSC_Data.prototype, "GetSC_Data", ["IProHandle"]);
//# sourceMappingURL=GetSC_Data.js.map