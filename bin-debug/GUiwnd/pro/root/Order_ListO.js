var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 订单详情：order_ListO.php
参数
o:订单id
type:订单类型id
返回
{
    res:0
    "list": [
        {
            "order_id": "1615627619245180",  //订单ID
            "itemid": "1",  //1:竞足 2:竞篮 3:排三 4:排五 5：超级足彩 6：超级篮彩
            "total": "200", //投注金额（分）
            "type": "0" //0:待开奖 1:未中奖 2:中奖
            "money": "0" //中奖金额
            "time": "1562932722",//购买的时间戳
            "model": "1" //1=>串关 2=>单关
            "way":"1,2"  //(1:单关 2：2串一 以此类推 到8:8串一)   //如果属于排三或者排五 way:""
            "num":[3,4,5]; //排三排五开奖结果  []
            如果是竞蓝，竞足话，传下面
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
            如果是排三，排五
              "three": [  方案详情
            {
                 number:[
                 [721,1] (如果是排三 1:直选  3:组三  4:组六 ，排五 1：直选）
                 ];
                 b:1  //倍数
                 qs:19191 //期数
            },
        ]
}
}

 */
var Order_ListO = (function () {
    function Order_ListO() {
        this.data = new HttpData();
        this.data.mKey = "Order_ListO";
    }
    Object.defineProperty(Order_ListO, "getInstance", {
        get: function () {
            if (Order_ListO._mInstance == undefined)
                Order_ListO._mInstance = new Order_ListO();
            return Order_ListO._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Order_ListO.prototype.sendHttp = function (o) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/order_ListO.php";
        var content = "o=" + o + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Order_ListO.prototype.backHTTP = function (res, httpObj, data) {
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
                var objData = new MyLotteryData();
                var listTTTT = text["list"];
                objData.id = listTTTT[0]["order_id"];
                objData.type = listTTTT[0]["itemid"];
                objData.model = listTTTT[0]["model"];
                objData.x = listTTTT[0]["x"];
                objData._reward = listTTTT[0]["reward"] / 100;
                objData.xzMoney = listTTTT[0]["total"] / 100;
                objData.statue = Number(listTTTT[0]["type"]) + 1;
                objData.xjMoney = listTTTT[0]["money"] / 100;
                objData.time = listTTTT[0]["time"];
                if (objData.type == 1 || objData.type == 5) {
                    objData.passList = listTTTT[0]["way"];
                    var list = listTTTT[0]["fa"];
                    objData.yePriceList = listTTTT[0]["price"];
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
                        ddd._static = list[i]["status"];
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
                    FofBDetail.getInstance.show(objData);
                }
                else if (objData.type == 2 || objData.type == 6) {
                    objData.passList = listTTTT[0]["way"];
                    var list = listTTTT[0]["fa"];
                    objData.yePriceList = listTTTT[0]["price"];
                    objData.fbLotData.clear();
                    for (var i = 0; i < list.length; i++) {
                        var ddd = new FBLotData();
                        ddd.weekTime = list[i]["day"];
                        ddd.aName = list[i]["team_a_name"];
                        ddd.bName = list[i]["team_b_name"];
                        ddd.list = list[i]["want"];
                        ddd.fruitList = list[i]["result"];
                        ddd._time = list[i]["day"];
                        ddd._static = list[i]["status"];
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
                    FofBDetail.getInstance.show(objData);
                }
                else if (objData.type == 3) {
                    var ddobj = new ThreeOrFive();
                    var listThree = listTTTT[0]["three"];
                    ddobj.kjNumList = listTTTT[0]["num"];
                    ddobj.tzList = listThree["number"];
                    ddobj.doubleNum = listThree["b"];
                    ddobj.qs = listThree["qs"];
                    if (listTTTT[0]["stop"] == undefined) {
                        ddobj.openStr = "---";
                    }
                    else {
                        ddobj.openStr = ToolMrg.getTime1(listTTTT[0]["stop"]);
                    }
                    ddobj.gettzList();
                    objData.threeOrFive = ddobj;
                    objData.title = "排列三";
                    objData.url = "pl3_home@2x.png";
                    FathreeViewMrg.getInstance.show(objData);
                }
                else if (objData.type == 4) {
                    var ddobj = new ThreeOrFive();
                    var listThree = listTTTT[0]["three"];
                    ddobj.kjNumList = listTTTT[0]["num"];
                    ddobj.tzList = listThree["number"];
                    ddobj.doubleNum = listThree["b"];
                    ddobj.qs = listThree["qs"];
                    if (listTTTT[0]["stop"] == undefined) {
                        ddobj.openStr = "---";
                    }
                    else {
                        ddobj.openStr = ToolMrg.getTime1(listTTTT[0]["stop"]);
                    }
                    objData.threeOrFive = ddobj;
                    objData.title = "排列五";
                    objData.url = "pl5_home@2x.png";
                    FathreeViewMrg.getInstance.show(objData);
                }
            }
        }
    };
    return Order_ListO;
}());
__reflect(Order_ListO.prototype, "Order_ListO", ["IProHandle"]);
//# sourceMappingURL=Order_ListO.js.map