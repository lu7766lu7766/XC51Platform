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
class Gen_Info implements IProHandle {
    private static _mInstance: Gen_Info;
    public static get getInstance(): Gen_Info {
        if (Gen_Info._mInstance == undefined)
            Gen_Info._mInstance = new Gen_Info();
        return Gen_Info._mInstance;
    }
    /**对象key */
    private data: HttpData;
    private constructor() {
        this.data = new HttpData(); 
        this.data.mKey = "Gen_Info";
    }

    public sendHttp(orderId: string, type: number,t): void {
        let url: string = HTTPRequest.getInstance.httpHeadUrl + "/gen_Info.php";
        let content = `o=${orderId}&type=${type}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}&t=${t}`;
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
                objData.id = text["order_id"];
                objData.type = text["itemid"];
                objData.lotteryType = text["ifg"];

                objData.model = text["model"];
                if (objData.type == 1 || objData.type == 5) {
                    objData.passList = text["way"];
                    let list: Array<any> = text["fa"];
                    objData.yePriceList = text["price"];
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
                } else if (objData.type == 2 || objData.type == 6) {
                    objData.passList = text["way"];
                    let list: Array<any> = text["fa"];
                    objData.yePriceList = text["price"];
                    objData.fbLotData.clear();
                    for (let i = 0; i < list.length; i++) {
                        let ddd: FBLotData = new FBLotData();
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
                    } else if (objData.model == 1) {//串关
                        objData.title = "竞篮串关";
                        objData.url = "jlcg_home@2x.png";
                    } else {
                        objData.title = "竞篮单关";
                        objData.url = "jldg_home@2x.png";
                    }
                }
                objData.x = text["x"];
                objData._reward = text["reward"]/100;
                objData.xzMoney = text["total"] / 100;
                objData.statue = Number(text["type"]) + 1;
                objData.xjMoney = text["money"] / 100;
                objData.time = text["time"];

                if(objData.lotteryType==undefined || objData.lotteryType==0)
                    FofBDetail.getInstance.show(objData);
                    // fagxMrgView.getInstance.show(objData);
                else
                    fagxMrgView.getInstance.show(objData,objData.lotteryType);
            }
        }
    }
}