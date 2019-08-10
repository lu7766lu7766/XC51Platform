var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 获取用户全部银行卡
参数
id:用户id
返回
{
    "res": 0,
    "care": [
        {
            "name": "建设银行",
            "care": "6217003320014891389"
        },
        {
            "name": "建设银行",
            "care": "6217003320014891340"
        }
    ]
}
 */
var GetBank_allLIst = (function () {
    function GetBank_allLIst() {
        this.data = new HttpData();
        this.data.mKey = "GetBank_allLIst";
    }
    Object.defineProperty(GetBank_allLIst, "getInstance", {
        get: function () {
            if (GetBank_allLIst._mInstance == undefined)
                GetBank_allLIst._mInstance = new GetBank_allLIst();
            return GetBank_allLIst._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    GetBank_allLIst.prototype.sendHttp = function (id) {
        if (UserData.getInstance.isLogin() == false) {
            return;
        }
        var url = HTTPRequest.getInstance.httpHeadUrl + "/showCare.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GetBank_allLIst.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
            }
            else {
                SelectDataMrg.getInstance.clearItem();
                var arr = text["care"];
                if (arr != undefined && arr.length > 0) {
                    for (var i = 0; i < arr.length; i++) {
                        var obj = new SelectData_card();
                        var aaa = arr[i];
                        obj.id = i;
                        obj.BankName = aaa["name"];
                        obj.cardNum = aaa["care"];
                        obj.userName = aaa["r"];
                        var num = aaa["type"];
                        if (num == 1) {
                            obj.typeName = "储蓄卡";
                        }
                        else if (num == 2) {
                            obj.typeName = "信用卡";
                        }
                        else {
                            obj.typeName = "其他";
                        }
                        SelectDataMrg.getInstance.addDataToItem(i, obj);
                    }
                }
                if (CardAddtoSelect.getInstance != undefined && CardAddtoSelect.getInstance.parent != undefined)
                    CardAddtoSelect.getInstance.updata();
                if (selectBankcard.getInstance != undefined && selectBankcard.getInstance.parent != undefined) {
                    selectBankcard.getInstance.initallInfo();
                    // selectBankcard.getInstance.hide();
                    // withdrawData.getInstance.show();
                }
                if (withdrawViewMrg.getInstance != undefined && withdrawViewMrg.getInstance.parent != undefined) {
                    withdrawViewMrg.getInstance.initallInfo();
                    withdrawViewMrg.getInstance.initallInfo1();
                }
            }
        }
    };
    return GetBank_allLIst;
}());
__reflect(GetBank_allLIst.prototype, "GetBank_allLIst", ["IProHandle"]);
//# sourceMappingURL=GetBank_allLIst.js.map