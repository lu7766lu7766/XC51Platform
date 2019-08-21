var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 分享链接 shareLink.php
参数
id：用户ID
返回
{
  "res":0,
  "url":"https:\/\/www.baidu.com?id=1"
}

 */
var Share_Link = (function () {
    function Share_Link() {
        this.data = new HttpData();
        this.data.mKey = "Share_Link";
    }
    Object.defineProperty(Share_Link, "getInstance", {
        get: function () {
            if (Share_Link._mInstance == undefined)
                Share_Link._mInstance = new Share_Link();
            return Share_Link._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Share_Link.prototype.sendHttp = function (id) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/shareLink.php";
        var content = "id=" + id + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Share_Link.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                this._userLink = text["url"];
                if (ShareWnd.getInstance != undefined && ShareWnd.getInstance.parent != undefined) {
                    ShareWnd.getInstance.upLink(this._userLink);
                }
                if (ID3.getInstance != undefined && ID3.getInstance.parent != undefined)
                    ID3.getInstance.setLink(this._userLink);
            }
        }
    };
    return Share_Link;
}());
__reflect(Share_Link.prototype, "Share_Link", ["IProHandle"]);
//# sourceMappingURL=Share_Link.js.map