var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
//绑定手机 phone.php
参数:
id:用户id
n:手机号码
返回
{
   "res":0
   "phone":	1999
}
}
 */
var PhonePhp = (function () {
    function PhonePhp() {
        this.data = new HttpData();
        this.data.mKey = "PhonePhp";
    }
    Object.defineProperty(PhonePhp, "getInstance", {
        get: function () {
            if (PhonePhp._mInstance == undefined)
                PhonePhp._mInstance = new PhonePhp();
            return PhonePhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    PhonePhp.prototype.sendHttp = function (n) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/phone.php";
        var content = "id=" + UserData.getInstance.userId + "&n=" + n + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    PhonePhp.prototype.backHTTP = function (res, httpObj, data) {
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
                Alertpaner.getInstance.show(text["res"]);
            }
            else if (text["res"] == "0") {
                UserData.getInstance.photo = text["phone"];
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
        }
    };
    return PhonePhp;
}());
__reflect(PhonePhp.prototype, "PhonePhp", ["IProHandle"]);
//# sourceMappingURL=PhonePhp.js.map