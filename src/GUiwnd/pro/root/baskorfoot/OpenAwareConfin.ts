/**
 * 

http://192.168.20.23/ticket/api/P10800.php

返回t和数据列表
 */
class OpenAwareConfin implements IProHandle {
	private static _mInstance: OpenAwareConfin;
	public static get getInstance(): OpenAwareConfin {
		if (OpenAwareConfin._mInstance == undefined)
			OpenAwareConfin._mInstance = new OpenAwareConfin();
		return OpenAwareConfin._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "OpenAwareConfin";
	}

	/**
	 * 
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'result.php';
		let content = "v="+GameValue.verPhp;
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
			text = text['list'];
			let three: Array<any> = text['three'];
			let five: Array<any> = text["five"];
			let ft: Array<any> = text["ft"];
			let bk: Array<any> = text["bk"];

			if (three != undefined) {
				let data1: AwareGameInfoData = new AwareGameInfoData();
				data1.qs = Number(three[0]);
				data1.time = three[1];
				data1.kjjg = three[2];
				AwareInfoData.getInstance.getlist().Gput(1, data1);
			}

			if (five != undefined) {
				let data1: AwareGameInfoData = new AwareGameInfoData();
				data1.qs = Number(five[0]);
				data1.time = five[1];
				data1.kjjg = five[2];
				AwareInfoData.getInstance.getlist().Gput(2, data1);
			}

			if (ft != undefined) {
				let data1: AwareGameInfoData = new AwareGameInfoData();
				data1.time = String(ft[0]);
				data1.teamstr = ft[1];
				AwareInfoData.getInstance.getlist().Gput(3, data1);
			}

			if (bk != undefined) {
				let data1: AwareGameInfoData = new AwareGameInfoData();
				data1.time = String(bk[0]);
				data1.teamstr = bk[1];
				AwareInfoData.getInstance.getlist().Gput(4, data1);
			}

			AwareInfoData.decidecom = true;
			AwareInfoMgr.getInstance.initAllgameInfo();

		}
	}

}