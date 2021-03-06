/**
 * 

http://192.168.20.23/ticket/api/P10900.php
足球即时显示数据
返回t和数据列表
 */
class FootballBFConfin implements IProHandle {
	private static _mInstance: FootballBFConfin;
	public static get getInstance(): FootballBFConfin {
		if (FootballBFConfin._mInstance == undefined)
			FootballBFConfin._mInstance = new FootballBFConfin();
		return FootballBFConfin._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "FootballBFConfin";
	}

	/**
	 * 
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'ft_Time.php';
		let content = "id=" + UserData.getInstance.userId+"&v="+GameValue.verPhp+"&rkey="+GameValue.orderKey;
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
			// FootballConfinData.getInstance.hideData();
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
					mainBBfen = "半场" + bcFena + ":" + bcFenb;
				}
				let bstimer: string = objdata["to"];
				let team_a_red_card = objdata["team_a_red_card"];
				let team_b_red_card = objdata["team_b_red_card"];
				let team_a_yellow_card = objdata["team_a_yellow_card"];
				let team_b_yellow_card = objdata["team_b_yellow_card"];
				let isAppoint = objdata["isAppoint"];
				let day = objdata["day"];
				let clolr = objdata["color"];
				data1.type = objdata["type"];
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
				data1.color = clolr;

				FootballConfinData.getInstance.getlist().Gput(i, data1);

			}
			football1.getInstance.initallInfo();
			BakorfallViewMrg.getInstance.setGUSN();
		}
	}

}