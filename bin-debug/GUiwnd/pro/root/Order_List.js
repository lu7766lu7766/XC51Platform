var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 订单：order_List.php
参数
id:用户ID
返回
{
    "res": 0,
    "dk": [ //待开奖
        {
            "order_id": "1615627619245180",  //订单ID
            "itemid": "1004",  //1002:排列三订单   1003:排列五订单  1004:竞足订单   1005:竞篮订单
            "total": "200", //投注金额（分）
            "type": "0" //0:待开奖 1:未中奖 2:中奖
           "money": "0"
           
        },
    ],
    "wz": [ //未中奖
        {
            "order_id": "16156264074572628",
            "itemid": "1003",
            "total": "200",
            "type": "1"
           "money": "0"
        },
    ],
    "zj": [  //中奖
          {
            "order_id": "16156264491449010",
            "itemid": "1003",
            "total": "400",
            "type": "2",
            "money": "100"
        },
        {
            "order_id": "16156264491449010",
            "itemid": "1003",
            "total": "400",
            "type": "2",
            "money": "核对中"  //如果类型为2，核对中说明中奖金额正在核对
        }
    ]
}

 */
var Order_List = (function () {
    function Order_List() {
        this.data = new HttpData();
        this.data.mKey = "Order_List";
    }
    Object.defineProperty(Order_List, "getInstance", {
        get: function () {
            if (Order_List._mInstance == undefined)
                Order_List._mInstance = new Order_List();
            return Order_List._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Order_List.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/order_List.php";
        var content = "id=" + UserData.getInstance.userId + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Order_List.prototype.backHTTP = function (res, httpObj, data) {
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
                MyLotteryDataMrg.getInstance._mList.length = 0;
                this.addList(text["dk"]);
                this.addList(text["wz"]);
                this.addList(text["zj"]);
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_orderList);
                MyLotteryWnd.first = false;
            }
        }
    };
    Order_List.prototype.addList = function (arr) {
        // let arr:Array<GHashMap<any>> = text["dk"];
        var objData;
        for (var i = 0; i < arr.length; i++) {
            objData = new MyLotteryData();
            objData.id = arr[i]["order_id"];
            objData.type = arr[i]["itemid"];
            objData.lotteryType = arr[i]["ifg"];
            objData.model = arr[i]["model"];
            if (objData.type == 1 || objData.type == 5) {
                objData.passList = arr[i]["way"];
                // let list: Array<any> = arr[i]["fa"];
                // objData.fbLotData.clear();
                // for (let i = 0; i < list.length; i++) {
                // 	let ddd: FBLotData = new FBLotData();
                // 	ddd.weekTime = list[i]["day"];
                // 	ddd.nameT = list[i]["len_name"];
                // 	ddd.aName = list[i]["team_a_name"];
                // 	ddd.bName = list[i]["team_b_name"];
                // 	ddd.list = list[i]["want"];
                // 	ddd.fruitList = list[i]["result"];
                // 	ddd._time = list[i]["day"];
                // 	ddd._static = list[i]["status"];
                // 	objData.fbLotData.Gput(i, ddd);
                // }
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
                objData.passList = arr[i]["way"];
                // let list: Array<any> = arr[i]["fa"];
                // objData.fbLotData.clear();
                // for (let i = 0; i < list.length; i++) {
                // 	let ddd: FBLotData = new FBLotData();
                // 	ddd.weekTime = list[i]["day"];
                // 	ddd.aName = list[i]["team_a_name"];
                // 	ddd.bName = list[i]["team_b_name"];
                // 	ddd.list = list[i]["want"];
                // 	ddd.fruitList = list[i]["result"];
                // 	ddd._time = list[i]["day"];
                // 	ddd._static = list[i]["status"];
                // 	objData.fbLotData.Gput(i, ddd);
                // }
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
            else if (objData.type == 3) {
                // let ddobj = new ThreeOrFive();
                // let listThree = arr[i]["three"];
                // ddobj.kjNumList = arr[i]["num"];
                // ddobj.tzList = listThree["number"];
                // ddobj.doubleNum = listThree["b"];
                // ddobj.qs = listThree["qs"];
                // if(arr[i]["stop"] == undefined) {
                // 	ddobj.openStr = "---"
                // } else {
                // 	ddobj.openStr = ToolMrg.getTime1(arr[i]["stop"]);	
                // }
                // ddobj.gettzList();
                // objData.threeOrFive = ddobj;
                objData.title = "排列三";
                objData.url = "pl3_home@2x.png";
            }
            else if (objData.type == 4) {
                // let ddobj = new ThreeOrFive();
                // let listThree = arr[i]["three"];
                // ddobj.kjNumList = arr[i]["num"];
                // ddobj.tzList = listThree["number"];
                // ddobj.doubleNum = listThree["b"];
                // ddobj.qs = listThree["qs"];
                // if(arr[i]["stop"] == undefined) {
                // 	ddobj.openStr = "---"
                // } else {
                // 	ddobj.openStr = ToolMrg.getTime1(arr[i]["stop"]);	
                // }
                // objData.threeOrFive = ddobj;
                objData.title = "排列五";
                objData.url = "pl5_home@2x.png";
            }
            // objData.x = arr[i]["x"];
            // objData._reward = arr[i]["reward"]/100;
            objData.xzMoney = arr[i]["total"] / 100;
            objData.statue = Number(arr[i]["type"]) + 1;
            objData.xjMoney = arr[i]["money"] / 100;
            objData.time = arr[i]["time"];
            MyLotteryDataMrg.getInstance.addData(objData);
        }
    };
    return Order_List;
}());
__reflect(Order_List.prototype, "Order_List", ["IProHandle"]);
//# sourceMappingURL=Order_List.js.map