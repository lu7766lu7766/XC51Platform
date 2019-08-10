/**
 * 

http://192.168.20.23/ticket/api/self_Appoint.php
足球和篮球 关注显示数据
返回t和数据列表
 */
class FootandBaskGZConfin implements IProHandle {
	private static _mInstance: FootandBaskGZConfin;
	public static get getInstance(): FootandBaskGZConfin {
		if (FootandBaskGZConfin._mInstance == undefined)
			FootandBaskGZConfin._mInstance = new FootandBaskGZConfin();
		return FootandBaskGZConfin._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "FootandBaskGZConfin";
	}

	/**
	 * type 1 足球 2篮球
	 */
	public sendHttp(type: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'self_Appoint.php';
		let content = "id=" + UserData.getInstance.userId + "&type=" + type+"&v="+GameValue.verPhp;
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
			let listlistArray: Array<any> = text['data'];
			let type: number = Number(text['type']);
			if (type == 1) {
				FootballConfinData.getInstance.hideData3();
				for (let i = 1; i <= listlistArray.length; i++) {
					let objdata = listlistArray[i - 1];
					let data1: footballCofObj = new footballCofObj();

					let id: number = Number(objdata['id']);
					let timer: string = objdata["time"];
					let leftname: string = objdata["team_a_name"];
					let leftteam_a_icon: string = objdata["team_a_icon"];
					let rightname: string = objdata["team_b_name"];
					let rightteam_a_icon: string = objdata["team_b_icon"];

					let bfa: string = objdata["team_a_score"];
					let bfb: string = objdata["team_b_score"];
					let zbfen: string = "";
					if (bfa != "-" || bfb != "-") {
						zbfen = bfa + ":" + bfb;
					} else {
						zbfen = "";
					}
					let lsaiName: string = objdata["league_name"];
					let statezt: number = Number(objdata["status"]);
					let mainBBfen: string = "";
					let bcFena: string = objdata["h_score_a"];
					let bcFenb: string = objdata["h_score_b"];
					if (bcFena != "" && bcFenb != "") {
						mainBBfen = bcFena + ":" + bcFenb;
					}
					let bstimer: string = objdata["to"];
					let team_a_red_card = objdata["team_a_red_card"];
					let team_b_red_card = objdata["team_b_red_card"];
					let team_a_yellow_card = objdata["team_a_yellow_card"];
					let team_b_yellow_card = objdata["team_b_yellow_card"];
					let isAppoint = objdata["isAppoint"];
					let day = objdata["day"];

					data1.id = id;
					data1.timer = timer;
					data1.name = lsaiName;
					data1.leftIcon = leftteam_a_icon;
					data1.rightIcon = rightteam_a_icon;
					data1.leftname = leftname;
					data1.rightname = rightname;
					data1.bfText = zbfen;
					data1.status = statezt;
					data1.touding = bstimer;
					data1.bcBF = mainBBfen;
					data1.leftrednum = team_a_red_card;
					data1.leftyellownum = team_a_yellow_card;
					data1.rightrednum = team_b_red_card;
					data1.rightyellownum = team_b_yellow_card;
					data1.ifgz = isAppoint;
					data1.rqday = day;

					FootballConfinData.getInstance.getlist3().Gput(i, data1);

				}

			} else {
				BasketballConfinData.getInstance.hideData3();
				for (let i = 1; i <= listlistArray.length; i++) {
					let objdata = listlistArray[i - 1];
					let data1: basketballCofObj = new basketballCofObj();

					let id: number = Number(objdata['id']);
					let timer: string = objdata["time"];
					let team_a_name: string = objdata["team_a_name"];
					let team_b_name: string = objdata["team_b_name"];

					let team_a_score: string = objdata["team_a_score"];
					let team_b_score: string = objdata["team_b_score"];
					let total_score: string = objdata["total_score"];
					let fc: string = objdata["fc"];
					let lot_lose: string = objdata["lot_lose"];

					if (team_a_score == "-") {
						team_a_score = "";
					}
					if (team_b_score == "-") {
						team_b_score = "";
					}

					let league_name: string = objdata["league_name"];
					let status: number = Number(objdata["status"]);
					let isAppoint = objdata["isAppoint"];

					let a1: string = objdata["team_a_1_score"]; if (a1 == "0") a1 = "";
					let a2: string = objdata["team_a_2_score"]; if (a2 == "0") a2 = "";
					let a3: string = objdata["team_a_3_score"]; if (a3 == "0") a3 = "";
					let a4: string = objdata["team_a_4_score"]; if (a4 == "0") a4 = "";

					let b1: string = objdata["team_a_1_score"]; if (b1 == "0") b1 = "";
					let b2: string = objdata["team_a_2_score"]; if (b2 == "0") b2 = "";
					let b3: string = objdata["team_a_3_score"]; if (b3 == "0") b3 = "";
					let b4: string = objdata["team_a_4_score"]; if (b4 == "0") b4 = "";

					data1.id = id;
					data1.timer = timer;
					data1.name = league_name;
					data1.leftname = team_a_name;
					data1.rightname = team_b_name;
					data1.team_a_score = team_a_score;
					data1.team_b_score = team_b_score;
					data1.bfText = total_score;
					data1.fc = fc;
					data1.rf = lot_lose;
					data1.ifgz = Number(isAppoint);
					data1.status = Number(status);

					data1.zhujie1 = a1;
					data1.zhujie2 = a2;
					data1.zhujie3 = a3;
					data1.zhujie4 = a4;

					data1.kejie1 = b1;
					data1.kejie2 = b2;
					data1.kejie3 = b3;
					data1.kejie4 = b4;

					BasketballConfinData.getInstance.getlist3().Gput(i, data1);

				}
			}
		}
		BakorfallViewMrg.getInstance.refreshallInfo();
	}

}