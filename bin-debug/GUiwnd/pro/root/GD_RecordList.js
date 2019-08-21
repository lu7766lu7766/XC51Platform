var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**跟单记录
 * 跟单记录:gen.php
参数
id:用户ID
type:1  //1:全部 2:未中奖  3:已中奖
返回
{
    "res": 0,
    "data": [
        {
            "type": 1,  //1:竞足串关 2:竞足单关 3:竞篮串关 5:竞篮单关
            "money": 3000, //投注金额
            "reward": 1000, //中奖金额
            "name": "aftww", //用户昵称
            "time": 1563210000, //时间戳
            "mold": 3  //1:待开奖 2:未中奖 3:已中奖
        },
    ]
}
*/
var GD_RecordList = (function () {
    function GD_RecordList() {
        this.data = new HttpData();
        this.data.mKey = "GD_RecordList";
    }
    Object.defineProperty(GD_RecordList, "getInstance", {
        get: function () {
            if (GD_RecordList._mInstance == undefined)
                GD_RecordList._mInstance = new GD_RecordList();
            return GD_RecordList._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GD_RecordList.prototype.sendHttp = function (id, index) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/gen.php";
        var content = "id=" + id + "&type=" + index + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    GD_RecordList.prototype.backHTTP = function (res, httpObj, data) {
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
                GDRecordMrg.getInstance.GDRItem.clear();
                var objItem = text["data"];
                if (objItem != undefined && objItem.length > 0) {
                    for (var i = 0; i < objItem.length; i++) {
                        var obj = new GDRecordData();
                        var aaa = objItem[i];
                        obj.id = i;
                        obj._type = aaa["type"];
                        obj.buyMoney = aaa["money"];
                        obj._isWin = aaa["mold"];
                        obj.day = aaa["time"];
                        obj.sendName = aaa["name"];
                        obj.winMoney = aaa["reward"];
                        obj.order_id = aaa["order_id"];
                        GDRecordMrg.getInstance.GDRItem.Gput(i, obj);
                    }
                }
                if (GDRecordWnd.getInstance != undefined && GDRecordWnd.getInstance.parent != undefined)
                    GDRecordWnd.getInstance.updata();
            }
        }
    };
    return GD_RecordList;
}());
__reflect(GD_RecordList.prototype, "GD_RecordList", ["IProHandle"]);
//# sourceMappingURL=GD_RecordList.js.map