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
class Order_ListO implements IProHandle {
	private static _mInstance: Order_ListO;
	public static get getInstance(): Order_ListO {
		if (Order_ListO._mInstance == undefined)
			Order_ListO._mInstance = new Order_ListO();
		return Order_ListO._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "Order_ListO";

	}


	/**
	 * 注数列表
	 */
	public sendHttp(o: number,t): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/order_ListO.php";
		let content = `o=${o}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}&t=${t}`;

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
				objData.id = listTTTT[0]["order_id"];
				objData.type = listTTTT[0]["itemid"];
				objData.lotteryType = listTTTT[0]["ifg"]

				objData._fs = listTTTT[0]["rebate"]/100;//返水
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
					if(objData.lotteryType==undefined||objData.lotteryType==0)
						FofBDetail.getInstance.show(objData);
					else
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
					if(objData.lotteryType==undefined || objData.lotteryType==0)
						FofBDetail.getInstance.show(objData);
					else
						fagxMrgView.getInstance.show(objData,objData.lotteryType);
				} else if (objData.type == 3) {
					let ddobj = new ThreeOrFive();
					let listThree = listTTTT[0]["three"];
					ddobj.kjNumList = listTTTT[0]["num"];
					ddobj.tzList = listThree["number"];
					ddobj.doubleNum = listThree["b"];
					ddobj.qs = listThree["qs"];
					if (listTTTT[0]["stop"] == undefined) {
						ddobj.openStr = "---"
					} else {
						ddobj.openStr = ToolMrg.getTime1(listTTTT[0]["stop"]);
					}
					ddobj.gettzList();
					objData.threeOrFive = ddobj;

					objData.title = "排列三";
					objData.url = "pl3_home@2x.png";

					FathreeViewMrg.getInstance.show(objData);
				} else if (objData.type == 4) {
					let ddobj = new ThreeOrFive();
					let listThree = listTTTT[0]["three"];
					ddobj.kjNumList = listTTTT[0]["num"];
					ddobj.tzList = listThree["number"];
					ddobj.doubleNum = listThree["b"];
					ddobj.qs = listThree["qs"];
					if (listTTTT[0]["stop"] == undefined) {
						ddobj.openStr = "---"
					} else {
						ddobj.openStr = ToolMrg.getTime1(listTTTT[0]["stop"]);
					}
					objData.threeOrFive = ddobj;

					objData.title = "排列五";
					objData.url = "pl5_home@2x.png";

					FathreeViewMrg.getInstance.show(objData);
				}

			}
		}
	}
}