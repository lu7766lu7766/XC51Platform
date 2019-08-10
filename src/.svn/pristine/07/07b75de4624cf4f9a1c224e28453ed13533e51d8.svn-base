/**
 * 开奖记录筛选
参数
t:

如果t=1
{
    "res": 0,
    "list": [
        {
            "team_a_name": "洛城银河", //主队昵称
            "team_b_name": "圣何塞",  //客队昵称
            "league_name": "美职业",  //联赛昵称
            "ban": "1:0",  //半全场比分
            "fen": "1:3",  //最终比分
            "time": "周六", //周几
            "one": "客胜",  //表从左到右
            "two": "(-1)客胜",
            "three": "1:3",
            "four": "4球",
            "five": "胜负",
            "six": "2.98",
            "seven": "3.25",
            "eight": "22",
            "nine": "4.2",
            "ten": "14",
            "color": 3  //如果1=>红色,2=>蓝色,3=>绿色（比分颜色)
        },
    ]
}

如果t=2
{
    "res": 0,
    "list": [
        {
            "fen": "81:95", //比分
            "team_a_name": "风暴", //主队昵称
            "team_b_name": "飞马", //客队昵称
            "one": "主胜", //表从左到右
            "two": "让分主胜(-2.5)",
            "three": "大分(146.5)",
            "four": "主胜11-15",
            "five": "1.14",
            "six": "1.7",
            "seven": "1.65",
            "eight": "4.8",
            "color": 1 //如果1=>红色,2=>绿色（比分颜色)
        },
    ]
}
 */
class selectResultConf implements IProHandle {
	private static _mInstance: selectResultConf;
	public static get getInstance(): selectResultConf {
		if (selectResultConf._mInstance == undefined)
			selectResultConf._mInstance = new selectResultConf();
		return selectResultConf._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "selectResultConf";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(type: number, timer: string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "jqs_Choose.php";
		let content = "type=" + type + "&time=" + timer +"&v="+GameValue.verPhp;
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
				Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
			} else {
				let list: Array<any> = text["list"];
				let type: number = Number(text["type"]);
				if (type == 1) {//足球
					let footballData: JCFootBallData;
					JCFootBallDataMrg.getInstance.cleanAll();
					for (let k = 0; k < list.length; k++) {
						footballData = new JCFootBallData();
						footballData.team_a_name = list[k]["team_a_name"];
						footballData.team_b_name = list[k]["team_b_name"];
						footballData.league_name = list[k]["league_name"];
						footballData.ban = list[k]["ban"];
						footballData.fen = list[k]["fen"];
						footballData.time = list[k]["time"];
						footballData.form = list[k]["form"];
						footballData.color = list[k]["color"];

						JCFootBallDataMrg.getInstance.addJCFootBallData(k, footballData);
					}
					CustEventMrg.getInstance.dispatch(CustEventType.EventType_FT_List_HH);
				} else if (type == 2) {//篮球
					let jcBasketBallData: JCBasketBallData;
					JCBasketBallDataMrg.getInstance.cleanall();
					for (let k = 0; k < list.length; k++) {
						jcBasketBallData = new JCBasketBallData();
						jcBasketBallData.team_a_name = list[k]["team_a_name"];
						jcBasketBallData.team_b_name = list[k]["team_b_name"];
						jcBasketBallData.league_name = list[k]["league_name"];
						jcBasketBallData.fen = list[k]["fen"];
						jcBasketBallData.time = list[k]["time"];
						jcBasketBallData.form = list[k]["form"];
						jcBasketBallData.color = list[k]["color"];

						JCBasketBallDataMrg.getInstance.addJCBasketBallData(k, jcBasketBallData);
					}
					CustEventMrg.getInstance.dispatch(CustEventType.EventType_BK_List_HH);
				}
			}
		}
	}
}