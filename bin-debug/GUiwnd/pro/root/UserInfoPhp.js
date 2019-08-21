var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
登陆
http://129.204.53.154/other/test/login.php?username=&pass=
返回
{
     "res": 0,
    
    "award": "0",  //中奖余额
    "bmoney": "0", //佣金余额
    "money":"0",//充值金额
    "gift":"0", //奖券金额
    "rebate":"0",//会员返水余额

}
 */
var UserInfoPhp = (function () {
    function UserInfoPhp() {
        this.data = new HttpData();
        this.data.mKey = "UserInfoPhp";
    }
    Object.defineProperty(UserInfoPhp, "getInstance", {
        get: function () {
            if (UserInfoPhp._mInstance == undefined)
                UserInfoPhp._mInstance = new UserInfoPhp();
            return UserInfoPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    UserInfoPhp.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/userInfo.php";
        var content = "id=" + UserData.getInstance.userId + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    UserInfoPhp.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(error);
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
            }
            else if (text["res"] == "0") {
                UserData.getInstance.setGold(text["money"] / 100);
                UserData.getInstance.setBonus(text["award"] / 100);
                UserData.getInstance.setYJGold(text["amoney"] / 100);
                UserData.getInstance.setDJQGold(text["gift"] / 100);
                UserData.getInstance.setRetCash(text["rebate"] / 100);
                UserData.getInstance.setDLGold(text["bmoney"] / 100);
                UserData.getInstance.setLSDefaultmoney(text["bcmoney"] / 100);
                UserData.getInstance.setLSxzmoney(text["blmoney"] / 100);
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
        }
    };
    return UserInfoPhp;
}());
__reflect(UserInfoPhp.prototype, "UserInfoPhp", ["IProHandle"]);
//# sourceMappingURL=UserInfoPhp.js.map