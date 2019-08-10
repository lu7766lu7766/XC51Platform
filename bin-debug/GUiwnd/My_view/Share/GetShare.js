var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 分享二维码：shareImg.php
 * 参数
id:用户ID
返回{
{
    "res": 0,
    "data": "iVBORw0KGgo" //base64
}
 */
var GetShare = (function () {
    function GetShare() {
        this.data = new HttpData();
        this.data.mKey = "GetShare";
    }
    Object.defineProperty(GetShare, "getInstance", {
        get: function () {
            if (GetShare._mInstance == undefined)
                GetShare._mInstance = new GetShare();
            return GetShare._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    GetShare.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/shareImg.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GetShare.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
            }
            else {
                this.imgs = text["data"];
                CodeWndphoto.getInstance.showCode();
            }
        }
    };
    return GetShare;
}());
__reflect(GetShare.prototype, "GetShare", ["IProHandle"]);
//# sourceMappingURL=GetShare.js.map