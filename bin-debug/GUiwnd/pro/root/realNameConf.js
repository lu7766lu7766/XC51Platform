var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**

参数
账户认证 true_Info.php
参数
id:用户id
c:身份证参数
n:真实姓名
}
 */
var realNameConf = (function () {
    function realNameConf() {
        this.data = new HttpData();
        this.data.mKey = "realNameConf";
    }
    Object.defineProperty(realNameConf, "getInstance", {
        get: function () {
            if (realNameConf._mInstance == undefined)
                realNameConf._mInstance = new realNameConf();
            return realNameConf._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    realNameConf.prototype.sendHttp = function (sfz, name) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'true_Info.php';
        var content = "id=" + UserData.getInstance.userId + "&c=" + sfz + "&n=" + name + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    realNameConf.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(httpObj.response);
                return;
            }
            var resss = Number(text['res']);
            var name_1 = text['name'];
            var care = text['care'];
            if (resss == 0) {
                UserData.getInstance.setrealName(name_1);
                UserData.getInstance.setcard(care);
                realnameTest.getInstance.hide();
                UserData.getInstance.setused(1);
                // withdrawData.getInstance.show();
                // AccountNews.getInstance.setgvfBtn1();
                PSWnd.getInstance.setgvfBtn1();
            }
            else {
                Alertpaner.getInstance.show(text["msg"]);
            }
        }
    };
    return realNameConf;
}());
__reflect(realNameConf.prototype, "realNameConf", ["IProHandle"]);
//# sourceMappingURL=realNameConf.js.map