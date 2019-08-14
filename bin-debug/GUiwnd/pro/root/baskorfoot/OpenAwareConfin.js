var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *

http://192.168.20.23/ticket/api/P10800.php

返回t和数据列表
 */
var OpenAwareConfin = (function () {
    function OpenAwareConfin() {
        this.data = new HttpData();
        this.data.mKey = "OpenAwareConfin";
    }
    Object.defineProperty(OpenAwareConfin, "getInstance", {
        get: function () {
            if (OpenAwareConfin._mInstance == undefined)
                OpenAwareConfin._mInstance = new OpenAwareConfin();
            return OpenAwareConfin._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    OpenAwareConfin.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'result.php';
        var content = "v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    OpenAwareConfin.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            text = text['list'];
            var three = text['three'];
            var five = text["five"];
            var ft = text["ft"];
            var bk = text["bk"];
            if (three != undefined) {
                var data1 = new AwareGameInfoData();
                data1.qs = Number(three[0]);
                data1.time = three[1];
                data1.kjjg = three[2];
                AwareInfoData.getInstance.getlist().Gput(1, data1);
            }
            if (five != undefined) {
                var data1 = new AwareGameInfoData();
                data1.qs = Number(five[0]);
                data1.time = five[1];
                data1.kjjg = five[2];
                AwareInfoData.getInstance.getlist().Gput(2, data1);
            }
            if (ft != undefined) {
                var data1 = new AwareGameInfoData();
                data1.time = String(ft[0]);
                data1.teamstr = ft[1];
                AwareInfoData.getInstance.getlist().Gput(3, data1);
            }
            if (bk != undefined) {
                var data1 = new AwareGameInfoData();
                data1.time = String(bk[0]);
                data1.teamstr = bk[1];
                AwareInfoData.getInstance.getlist().Gput(4, data1);
            }
            AwareInfoData.decidecom = true;
            AwareInfoMgr.getInstance.initAllgameInfo();
        }
    };
    return OpenAwareConfin;
}());
__reflect(OpenAwareConfin.prototype, "OpenAwareConfin", ["IProHandle"]);
//# sourceMappingURL=OpenAwareConfin.js.map