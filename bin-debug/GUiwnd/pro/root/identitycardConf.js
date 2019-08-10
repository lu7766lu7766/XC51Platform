var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
申请大神:okami_auth.php
参数
id：用户ID
identity：身份证号码
realName：真实姓名
返回
{
    "res":
    1000 用户Id为空
    1001 身份证为空
    1002 姓名为空
    
    0提交申请成功
    1你已是大神用户
    2重复提交申请
    
}
 */
var identitycardConf = (function () {
    function identitycardConf() {
        this.data = new HttpData();
        this.data.mKey = "identitycardConf";
    }
    Object.defineProperty(identitycardConf, "getInstance", {
        get: function () {
            if (identitycardConf._mInstance == undefined)
                identitycardConf._mInstance = new identitycardConf();
            return identitycardConf._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    identitycardConf.prototype.sendHttp = function (sfz, name) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'okami_auth.php';
        var content = "id=" + UserData.getInstance.userId + "&identity=" + sfz + "&realName=" + name + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    identitycardConf.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var listlistArray = Number(text['res']);
            if (listlistArray == 1000) {
            }
            else if (listlistArray == 1001) {
            }
            else if (listlistArray == 1002) {
            }
            else if (listlistArray == 0) {
                Alertpaner.getInstance.show("提交申请成功");
                Identityverify.getInstance.hide();
                GameValue.isDryingList = 2;
                // AccountNews.getInstance.setgvfBtn();
            }
            else if (listlistArray == 1) {
            }
            else if (listlistArray == 2) {
                Alertpaner.getInstance.show("重复提交申请");
            }
        }
    };
    return identitycardConf;
}());
__reflect(identitycardConf.prototype, "identitycardConf", ["IProHandle"]);
//# sourceMappingURL=identitycardConf.js.map