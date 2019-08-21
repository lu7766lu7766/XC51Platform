var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
登陆
http://129.204.53.154/other/test/regist.php?username=&pass=&p=
username=>用户名   pass=>密码    p=>邀请码（如果邀请码不填，默认发0）
返回
{
     "res": 0,
        "id": "12", //用户ID
        "username": "1234",  //用户昵称同时是用户账号
        "pass": "1111234567891001",  //密码
        "award": "0",  //中奖余额
        "bmoney": "0",  //佣金余额
        "isb": 0   //是否霸占全部佣金 0:否 1:是
        "phone":10999 //电话号码

}
 */
var RegistPhp = (function () {
    function RegistPhp() {
        this.data = new HttpData();
        this.data.mKey = "RegistPhp";
    }
    Object.defineProperty(RegistPhp, "getInstance", {
        get: function () {
            if (RegistPhp._mInstance == undefined)
                RegistPhp._mInstance = new RegistPhp();
            return RegistPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    RegistPhp.prototype.sendHttp = function (username, pass, p) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/regist.php";
        var content = "username=" + username + "&pass=" + pass + "&p=" + p + "&v=" + GameValue.verPhp + "&r=1&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    RegistPhp.prototype.backHTTP = function (res, httpObj, data) {
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
                Alertpaner.getInstance.show(text["msg"]);
            }
            else if (text["res"] == "0") {
                UserData.getInstance.userName = text["username"];
                UserData.getInstance.setYJTime(text["id"], text["username"], text["pass"]);
                UserData.getInstance.setGold(text["money"] / 100);
                UserData.getInstance.setBonus(text["award"] / 100);
                UserData.getInstance.setYJGold(text["amoney"] / 100);
                UserData.getInstance.setDLGold(text["bmoney"] / 100);
                UserData.getInstance.setDJQGold(text["gift"] / 100);
                UserData.getInstance.setRetCash(text["rebate"] / 100);
                UserData.getInstance.setLSDefaultmoney(text["bcmoney"] / 100);
                UserData.getInstance.setLSxzmoney(text["blmoney"] / 100);
                GameValue.isBZQBYJ = Number(text["isb"]);
                GameValue.isDryingList = Number(text["type"]);
                GameValue.orderKey = text["rkey"];
                UserData.getInstance.userName = text["realname"];
                selectHeadIconData.userIconID = text["icon"];
                if (text["rate"] != undefined)
                    GameValue.fsRate = Number(text["rate"]);
                LoginWnd.getInstance.hide();
                RegisterWnd.getInstance.hide();
                Alertpaner.getInstance.show("注册成功");
                SetUpWnd.getInstance.hide();
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
        }
    };
    return RegistPhp;
}());
__reflect(RegistPhp.prototype, "RegistPhp", ["IProHandle"]);
//# sourceMappingURL=RegistPhp.js.map