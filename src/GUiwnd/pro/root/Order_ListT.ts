/**
 * //订单详情（发单和跟单） order_ListT.php
参数：
o：订单id
type：1=>跟单订单 2=>发单订单
返回
{
    {
    "res": 0,
    "list": [
        {
            "order_id": "765617156559034141618",
            "itemid": "1",
            "total": "600",
            "type": 0,
            "reward": "0",
            "money": "0",
            "time": "1565590341",
            "rebate": "0",
            "model": 1,
            "way": "2",
            "num": [],
            "fa": [
                {
                    "result": [],
                    "status": 1,
                    "day": 1565629200,
                    "team_a_name": "哥德堡",
                    "team_b_name": "法尔肯堡",
                    "want": [
                        [
                            "(-1)让分平(3.4)",
                            0
                        ]
                    ],
                    "len_name": "瑞典超"
                },
                {
                    "result": [],
                    "status": 1,
                    "day": 1565624400,
                    "team_a_name": "艾维赫达",
                    "team_b_name": "艾纳斯",
                    "want": [
                        [
                            "不让主胜(2.55)",
                            0
                        ],
                    ],
                    "len_name": "亚冠杯"
                }
            ],
            "price": [
                1006.4,
                5528.4
            ],
            "name": "彩友765617",  //发单者名称
            "lv": 5,  //发单者等级
            "rate": 10, //佣金比例
            "number": 3, //跟单人数 （只有type=2时候才返回）
            "allmoney": 142200,  //跟单金额  （只有type=2时候才返回）
            "yj": 0,  // 抽取佣金 
            "g": "0"  //跟单奖金
        }
    ],
    "type": "2"
}
}
 */
class Order_ListT implements IProHandle {
	private static _mInstance: Order_ListT;
	public static get getInstance(): Order_ListT {
		if (Order_ListT._mInstance == undefined)
			Order_ListT._mInstance = new Order_ListT();
		return Order_ListT._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "Order_ListT";

	}


	/**
	 * 注数列表
	 */
	public sendHttp(o:any,t): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/order_ListT.php";
		let content = `o=${o}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}&t=${t}&id=${UserData.getInstance.userId}`;

		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
		if (res == true && httpObj.response != "") {//请求成功
			let text: Object;
			try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				return;
			}
			if (text["res"] != "0") {
				Alertpaner.getInstance.show(text["msg"]);
            } else {
                let objData: MyLotteryData = new MyLotteryData();
				let listTTTT: any = text["list"]

				objData.rate = text["slv"];

				objData.id = listTTTT[0]["order_id"];
				objData.type = listTTTT[0]["itemid"];
				objData.lotteryType = listTTTT[0]["ifg"]

				objData.model = listTTTT[0]["model"];
				objData.x = listTTTT[0]["x"];
				objData._reward = listTTTT[0]["reward"]/100;
				objData.xzMoney = listTTTT[0]["total"] / 100;
				objData.statue = Number(listTTTT[0]["type"]) + 1;

				if(objData.statue!=1){//已有结果
					objData.isjia = 0;
				}else{//待开奖
					objData.isjia = listTTTT[0]["isJa"];
				}

				objData.xjMoney = listTTTT[0]["money"] / 100;
				objData.time = listTTTT[0]["time"];

                objData._fs = listTTTT[0]["rebate"]/100;//返水
                objData._mName = listTTTT[0]["name"];//发单者名称
                objData.vip = listTTTT[0]["lv"];//发单者等级
                objData._cybl = listTTTT[0]["rate"];//佣金比例
                objData.numGD = listTTTT[0]["number"];//跟单人数 （只有type=2时候才返回）
                objData.gtMoney = listTTTT[0]["allmoney"]/100;//跟单金额 （只有type=2时候才返回）
                objData._cyje = listTTTT[0]["yj"]/100;//抽取佣金
                objData._gdje = listTTTT[0]["g"]/100;//跟单奖金
                objData.lotteryType = listTTTT[0]["t"];

				if (objData.type == 1 || objData.type == 5) {
					objData.passList = listTTTT[0]["way"];
					let list: Array<any> = listTTTT[0]["fa"];
					objData.yePriceList = listTTTT[0]["price"];
					objData.fbLotData.clear();
					for (let i = 0; i < list.length; i++) {
						let ddd: FBLotData = new FBLotData();
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
					} else if (objData.model == 1) {//串关
						objData.title = "竞足串关";
						objData.url = "jzcg_home@2x.png";
					} else {
						objData.title = "竞足单关";
						objData.url = "jzdg_home@2x.png";
					}
					// if(objData.lotteryType==undefined||objData.lotteryType==0)//order_listO 进入
					// 	FofBDetail.getInstance.show(objData);
					// else //order_listT进入
						fagxMrgView.getInstance.show(objData,objData.lotteryType);
				} else if (objData.type == 2 || objData.type == 6) {
					objData.passList = listTTTT[0]["way"];
					let list: Array<any> = listTTTT[0]["fa"];
					objData.yePriceList = listTTTT[0]["price"];
					objData.fbLotData.clear();
					for (let i = 0; i < list.length; i++) {
						let ddd: FBLotData = new FBLotData();
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
					} else if (objData.model == 1) {//串关
						objData.title = "竞篮串关";
						objData.url = "jlcg_home@2x.png";
					} else {
						objData.title = "竞篮单关";
						objData.url = "jldg_home@2x.png";
					}
					// if(objData.lotteryType==undefined || objData.lotteryType==0)
					// 	FofBDetail.getInstance.show(objData);
					// else
						fagxMrgView.getInstance.show(objData,objData.lotteryType);
				} 

            }
        }
    }

}