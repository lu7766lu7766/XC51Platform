var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**跟单记录详情
参数：  gen_Info.php
o:订单id
返回
{
    res:0;
    "list": [
        {
            "order_id": "1615627619245180",  //订单ID
            "itemid": "1",  //1:竞足 2:竞篮 3:组三 4:组六 5：超级足彩 6：超级篮彩
            "total": "200", //投注金额（分）
            "type": "0" //0:待开奖 1:未中奖 2:中奖
            "money": "0" //中奖金额
            "time": "1562932722",//购买的时间戳
            "model": "1" //1=>串关 2=>单关
            "way":"1,2"  //(1:单关 2：2串一 以此类推 到8:8串一)   //如果属于排三或者排五 way:""
            "fa": [  方案详情
            {
                "len_name": "女世界杯",  //联赛昵称
                "day": "周一",  //周几
                "team_a_name": "南飞女",  //主队A昵称
                "team_b_name": "西班牙女",  //客队A昵称
                "want": [主胜,客胜]  //投注象
                "result": []  //结果
            },
            {
                "len_name": "女世界杯",
                "day": "周一",
                "team_a_name": "南飞女",
                "team_b_name": "西班牙女",
                "want": [主胜,客胜]  //投注象
                "result": [] //空就是待定
            }
      ]
}
*/
var Gen_Info = (function () {
    function Gen_Info() {
        this.data = new HttpData();
        this.data.mKey = "Gen_Info";
    }
    Object.defineProperty(Gen_Info, "getInstance", {
        get: function () {
            if (Gen_Info._mInstance == undefined)
                Gen_Info._mInstance = new Gen_Info();
            return Gen_Info._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    Gen_Info.prototype.sendHttp = function (orderId, type, t) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/gen_Info.php";
        var content = "o=" + orderId + "&type=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey + "&t=" + t;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Gen_Info.prototype.backHTTP = function (res, httpObj, data) {
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
                var objData = new MyLotteryData();
                objData.id = text["order_id"];
                objData.type = text["itemid"];
                objData.lotteryType = text["ifg"];
                objData.model = text["model"];
                if (objData.type == 1 || objData.type == 5) {
                    objData.passList = text["way"];
                    var list = text["fa"];
                    objData.yePriceList = text["price"];
                    objData.fbLotData.clear();
                    for (var i = 0; i < list.length; i++) {
                        var ddd = new FBLotData();
                        ddd.weekTime = list[i]["day"];
                        ddd.nameT = list[i]["len_name"];
                        ddd.aName = list[i]["team_a_name"];
                        ddd.bName = list[i]["team_b_name"];
                        ddd.list = list[i]["want"];
                        ddd.fruitList = list[i]["result"];
                        ddd._time = list[i]["day"];
                        objData.fbLotData.Gput(i, ddd);
                    }
                    if (objData.type == 5) {
                        objData.title = "超级足彩";
                        objData.url = "cjzc_home@2x.png";
                    }
                    else if (objData.model == 1) {
                        objData.title = "竞足串关";
                        objData.url = "jzcg_home@2x.png";
                    }
                    else {
                        objData.title = "竞足单关";
                        objData.url = "jzdg_home@2x.png";
                    }
                }
                else if (objData.type == 2 || objData.type == 6) {
                    objData.passList = text["way"];
                    var list = text["fa"];
                    objData.yePriceList = text["price"];
                    objData.fbLotData.clear();
                    for (var i = 0; i < list.length; i++) {
                        var ddd = new FBLotData();
                        ddd.weekTime = list[i]["day"];
                        ddd.aName = list[i]["team_a_name"];
                        ddd.bName = list[i]["team_b_name"];
                        ddd.list = list[i]["want"];
                        ddd.fruitList = list[i]["result"];
                        ddd._time = list[i]["day"];
                        objData.fbLotData.Gput(i, ddd);
                    }
                    if (objData.type == 6) {
                        objData.title = "超级篮彩";
                        objData.url = "cjjl_home@2x.png";
                    }
                    else if (objData.model == 1) {
                        objData.title = "竞篮串关";
                        objData.url = "jlcg_home@2x.png";
                    }
                    else {
                        objData.title = "竞篮单关";
                        objData.url = "jldg_home@2x.png";
                    }
                }
                objData.x = text["x"];
                objData._reward = text["reward"] / 100;
                objData.xzMoney = text["total"] / 100;
                objData.statue = Number(text["type"]) + 1;
                objData.xjMoney = text["money"] / 100;
                objData.time = text["time"];
                if (objData.lotteryType == undefined || objData.lotteryType == 0)
                    FofBDetail.getInstance.show(objData);
                else
                    fagxMrgView.getInstance.show(objData, objData.lotteryType);
            }
        }
    };
    return Gen_Info;
}());
__reflect(Gen_Info.prototype, "Gen_Info", ["IProHandle"]);
//# sourceMappingURL=Gen_Info.js.map