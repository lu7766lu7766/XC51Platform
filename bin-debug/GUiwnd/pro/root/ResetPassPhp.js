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
     重置密码：resetPass.php
    参数
    id:用户ID
    o:旧密码
    n:新密码
    返回
    {
        "res": 0,
        "new":新密码
    }
}
 */
var ResetPassPhp = (function () {
    function ResetPassPhp() {
        this.data = new HttpData();
        this.data.mKey = "ResetPassPhp";
    }
    Object.defineProperty(ResetPassPhp, "getInstance", {
        get: function () {
            if (ResetPassPhp._mInstance == undefined)
                ResetPassPhp._mInstance = new ResetPassPhp();
            return ResetPassPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    ResetPassPhp.prototype.sendHttp = function (passOld, passNew) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/resetPass.php";
        var content = "id=" + UserData.getInstance.userId + "&o=" + passOld + "&n=" + passNew + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    ResetPassPhp.prototype.backHTTP = function (res, httpObj, data) {
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
                Alertpaner.getInstance.show("修改密码失败");
            }
            else if (text["res"] == "0") {
                ResetPassWnd.getInstance.hide();
                Alertpaner.getInstance.show("修改密码成功");
                CacheMrg.getInstance.addYJTime("password", text["new"]);
            }
        }
    };
    return ResetPassPhp;
}());
__reflect(ResetPassPhp.prototype, "ResetPassPhp", ["IProHandle"]);
//# sourceMappingURL=ResetPassPhp.js.map