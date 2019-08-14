var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
//奖金方案  reward.php
参数：
o:订单id
返回
{
    "res":0
    "data":[
        {
           "type":1 //1=>单关 2=>2串一 以此类推 到8=>8串一
           "team":[
               [庆南FC,1,4.05], //球队名，类型，赔率
               [庆南FC,1,4.05],
               [庆南FC,1,4.05],
           ]
           "b":1  //倍数
           "reward":766.26  //预测奖金
           "m":1竞足 2竟篮 5超级竞足 6超级竟篮
        }

    ]
}
 */
var RewardPhp = (function () {
    function RewardPhp() {
        this._mlll = new Array();
        this.data = new HttpData();
        this.data.mKey = "RewardPhp";
    }
    Object.defineProperty(RewardPhp, "getInstance", {
        get: function () {
            if (RewardPhp._mInstance == undefined)
                RewardPhp._mInstance = new RewardPhp();
            return RewardPhp._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    RewardPhp.prototype.sendHttp = function (oid, type) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/reward.php";
        var content = "o=" + oid + "&t=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    RewardPhp.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(error);
                return;
            }
            if (text["res"] == "1001") {
                Alertpaner.getInstance.show("超过100注无法查看方案详情");
            }
            else if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else if (text["res"] == "0") {
                var arr = text["data"];
                var re = void 0;
                this._mlll.length = 0;
                for (var i = 0; i < arr.length; i++) {
                    re = new RewardData();
                    re.type = arr[i]["type"];
                    re.team = arr[i]["team"];
                    re.b = arr[i]["b"];
                    re.reward = arr[i]["reward"];
                    re.awareType = arr[i]["mold"];
                    re.m = text["m"];
                    this._mlll[i] = re;
                }
                FofMultier.getInstance.show(this._mlll);
            }
        }
    };
    return RewardPhp;
}());
__reflect(RewardPhp.prototype, "RewardPhp", ["IProHandle"]);
var RewardData = (function () {
    function RewardData() {
        /**类型(0:待开奖  1:已中奖  2:未中奖) */
        this.awareType = 0;
    }
    return RewardData;
}());
__reflect(RewardData.prototype, "RewardData");
//# sourceMappingURL=RewardPhp.js.map