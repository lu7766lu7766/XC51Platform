var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 公告信息  notice.php
返回
{
    "res": 0,
    "data": [
        [
            1,
            "夏日激情活动火热上线，福利多多，优惠多多，更多精彩活动等你来。"
        ],
        [
            2,
            "全新51彩店震撼来袭，返奖快，返水高，易查询。"
        ]
    ]
}

 */
var NoticePhp = (function () {
    function NoticePhp() {
        this.data = new HttpData();
        this.data.mKey = "NoticePhp";
    }
    Object.defineProperty(NoticePhp, "getInstance", {
        get: function () {
            if (NoticePhp._mInstance == undefined)
                NoticePhp._mInstance = new NoticePhp();
            return NoticePhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    NoticePhp.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/notice.php";
        var content = "id=" + UserData.getInstance.userId + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    NoticePhp.prototype.backHTTP = function (res, httpObj, data) {
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
                var arr = text["data"];
                var ooo = void 0;
                for (var i = 0; i < arr.length; i++) {
                    ooo = new NoticeData();
                    ooo.id = arr[i][0];
                    ooo.conten = arr[i][1];
                    WorldTip.getInstance.addGGxxList(ooo);
                }
            }
        }
    };
    return NoticePhp;
}());
__reflect(NoticePhp.prototype, "NoticePhp", ["IProHandle"]);
//# sourceMappingURL=NoticePhp.js.map