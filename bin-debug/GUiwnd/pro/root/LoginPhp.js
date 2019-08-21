var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
登陆
http://129.204.53.154/other/test/login.php?username=&pass=
username=>用户名   pass=>密码    p=>邀请码（如果邀请码不填，默认发0）
返回
{
     "res": 0,
    "id": "12", //用户ID
    "username": "1234",  //用户昵称同时是用户账号
    "pass": "1111234567891001",  //密码
    
    "award": "0",  //中奖余额
    "bmoney": "0", //佣金余额
    "money":"0",//充值金额
    "gift":"0", //奖券金额
    "rebate":"0",//会员返水余额
    "type":"0", //0:普通用户   1:认证大神
    "isb": 0   //是否霸占全部佣金 0:否 1:是
    "isz": 0   //0:没有认证用户 1:认证用户
    "lv": 0   //用户vip等级
    "rkey": 1235 //下单需要的参数
}
 */
var LoginPhp = (function () {
    function LoginPhp() {
        this.data = new HttpData();
        this.data.mKey = "LoginPhp";
    }
    Object.defineProperty(LoginPhp, "getInstance", {
        get: function () {
            if (LoginPhp._mInstance == undefined)
                LoginPhp._mInstance = new LoginPhp();
            return LoginPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    LoginPhp.prototype.sendHttp = function (username, pass) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/login.php";
        var content = "username=" + username + "&pass=" + pass + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    LoginPhp.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(error);
                return;
            }
            if (text["res"] == "1003") {
                UserData.getInstance.setYJTime("0", "0", "0");
                Alertpaner.getInstance.show("账号与密码不对");
            }
            else if (text["res"] != "0") {
                UserData.getInstance.setYJTime("0", "0", "0");
                Alertpaner.getInstance.show(text["msg"]);
            }
            else if (text["res"] == "0") {
                LoginWnd.getInstance.hide();
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
                UserData.getInstance.photo = text["phone"];
                //等级
                UserData.getInstance.setLv(text["lv"]);
                GameValue.isBZQBYJ = Number(text["isb"]);
                GameValue.isDryingList = Number(text["type"]);
                UserData.getInstance.setused(text["isz"]);
                UserData.getInstance.userName = text["realname"];
                GameValue.orderKey = text["rkey"];
                selectHeadIconData.userIconID = text["icon"];
                if (text["rate"] != undefined)
                    GameValue.fsRate = Number(text["rate"]);
                SetUpWnd.getInstance.hide();
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
                Order_List.getInstance.sendHttp();
                GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
            }
        }
    };
    return LoginPhp;
}());
__reflect(LoginPhp.prototype, "LoginPhp", ["IProHandle"]);
//# sourceMappingURL=LoginPhp.js.map