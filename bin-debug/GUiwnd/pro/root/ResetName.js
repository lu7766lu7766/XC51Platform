var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
修改用户名:resetName.php
参数
id:用户ID
n:用户新昵称
返回
{
    "res": 0,
    "name":新昵称
}
 */
var ResetName = (function () {
    function ResetName() {
        this.data = new HttpData();
        this.data.mKey = "ResetName";
    }
    Object.defineProperty(ResetName, "getInstance", {
        get: function () {
            if (ResetName._mInstance == undefined)
                ResetName._mInstance = new ResetName();
            return ResetName._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    ResetName.prototype.sendHttp = function (nnn) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/resetName.php";
        var content = "id=" + UserData.getInstance.userId + "&n=" + nnn + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    ResetName.prototype.backHTTP = function (res, httpObj, data) {
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
                UserData.getInstance.userName = text["name"];
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
        }
    };
    return ResetName;
}());
__reflect(ResetName.prototype, "ResetName", ["IProHandle"]);
//# sourceMappingURL=ResetName.js.map