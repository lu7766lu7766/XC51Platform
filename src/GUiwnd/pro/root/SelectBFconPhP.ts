/**
 * 
筛选赛事界面
参数
type:1 //1=>足球 2=>篮球
返回
{
    "res": 0,
    "data": [
            {
                "id": "628", //联赛id
                "name": "挪威U19" //联赛昵称
                "type":1  // 1：一级联赛 2：竞彩 3：足彩  4：单场 
            },
            {
                "id": "628",
                "name": "挪威U19"
                "type":1  // 1：一级联赛 2：竞彩 3：足彩  4：单场 
            },
           ]
     "t":返回请求的type
}
 */
class SelectBFconPhP implements IProHandle {
	private static _mInstance: SelectBFconPhP;
	public static get getInstance(): SelectBFconPhP {
		if (SelectBFconPhP._mInstance == undefined)
			SelectBFconPhP._mInstance = new SelectBFconPhP();
		return SelectBFconPhP._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "SelectBFconPhP";
	}

	/**
	 * user
	 */
	public sendHttp(ntype: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/resetIcon.php";
		let content = `&type=${ntype}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
		if (res == true && httpObj.response != "") {//请求成功
			let text: Object;
			try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				Alertpaner.getInstance.show(error);
				return;
			}
			if (text["res"] != "0") {
				Alertpaner.getInstance.show(text["res"]);
			} else if (text["res"] == "0") {
				let type = text["t"];
				let list: Array<any> = text["data"];
				let datainfo: bfinfo;

				if (type == 1) {//足球
					let id1: number = 1;
					let id2: number = 1;
					let id3: number = 1;
					let id4: number = 1;
					let id5: number = 1;
					// for (let i: number = 0; i < list.length; i++) {
					// 	datainfo = new bfinfo();
					// 	datainfo.id = list[i]["id"];
					// 	datainfo.name = list[i]["name"];
					// 	datainfo.type = list[i]["type"];
					// 	if (datainfo.type != undefined) {
					// 		if (datainfo.type == 1) {//一级联赛
					// 			selectFootInfoData.getInstance.getlist1().Gput(id2, datainfo);
					// 			id2++;
					// 		} else if (datainfo.type == 2) {//2：竞彩
					// 			selectFootInfoData.getInstance.getlist2().Gput(id3, datainfo);
					// 			id3++;
					// 		} else if (datainfo.type == 3) {//3：足彩 
					// 			selectFootInfoData.getInstance.getlist3().Gput(id4, datainfo);
					// 			id4++;
					// 		} else if (datainfo.type == 4) {//4：单场
					// 			selectFootInfoData.getInstance.getlist4().Gput(id5, datainfo);
					// 			id5++;
					// 		}
					// 		selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
					// 		id1++;
					// 	}
					// }
				} else if (type == 2) {//篮球
					for (let i: number = 0; i < list.length; i++) {
						datainfo = new bfinfo();
						datainfo.id = list[i]["id"];
						datainfo.name = list[i]["name"];
						datainfo.type = list[i]["type"];
						let id1: number = 1;
						if (datainfo.type != undefined) {
							selectBaketInfoData.getInstance.getlist().Gput(id1, datainfo);
							id1++;
						}
					}
				}
			}
		}
	}
}