var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *添加银行卡 care.php
参数
id：用户id
c：银行卡号
返回
{
  res:0    //除了res为0，其他的返回都是错误
  id:用户ID
  name:开户行
  care:银行卡
  type:1=>储蓄卡 2=>信用卡 3=>其他
}
 */
var BankCard_add = (function () {
    function BankCard_add() {
        this.data = new HttpData();
        this.data.mKey = "BankCard_add";
    }
    Object.defineProperty(BankCard_add, "getInstance", {
        get: function () {
            if (BankCard_add._mInstance == undefined)
                BankCard_add._mInstance = new BankCard_add();
            return BankCard_add._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    BankCard_add.prototype.sendHttp = function (id, c, n, r) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/care.php";
        var content = "id=" + id + "&c=" + c + "&n=" + n + "&r=" + r + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    BankCard_add.prototype.backHTTP = function (res, httpObj, data) {
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
                text["id"];
                text["name"]; //开户行
                text["care"]; //银行卡
                if (selectBankcard.getInstance != undefined && selectBankcard.getInstance.parent != undefined) {
                    var len = SelectDataMrg.getInstance.getItem().size;
                    if (len == 0) {
                        selectBankcard.getInstance.hide();
                        withdrawViewMrg.getInstance.show();
                    }
                }
                GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
                if (AddBankCard.getInstance.parent != undefined)
                    AddBankCard.getInstance.hide();
            }
        }
    };
    return BankCard_add;
}());
__reflect(BankCard_add.prototype, "BankCard_add", ["IProHandle"]);
//# sourceMappingURL=BankCard_add.js.map