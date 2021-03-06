/**
 * 
开奖记录期数选择 jqs.php
参数
type:1=>足球 2=>篮球
 */
class TenConfon implements IProHandle {
	private static _mInstance: TenConfon;
	public static get getInstance(): TenConfon {
		if (TenConfon._mInstance == undefined)
			TenConfon._mInstance = new TenConfon();
		return TenConfon._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "TenConfon";
	}

	/**发送请求篮球和足球筛选列表*/
	public sentConnt() {
		this.sendHttp(1);
		this.sendHttp(2);
	}

	/**
	 * 
	 */
	public sendHttp(type: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'jqs.php';
		let content = "type=" + type + "&v=" + GameValue.verPhp+"&rkey="+GameValue.orderKey;
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
			let result: number = Number(text['res']);
			let typenum: number = Number(text['type']);
			let listlistArray: Array<any> = text['data'];

			if (result == 0) {
				if (typenum == 1) {
					if (listlistArray != undefined) {
						selectDayFootballData.selectDay = [];
						for (let i = 0; i < listlistArray.length; i++) {
							selectDayFootballData.selectDay[i] = listlistArray[i];
						}
					}

				} else if (typenum == 2) {
					if (listlistArray != undefined) {
						selectDayBasketBallData.selectDay = [];
						for (let i = 0; i < listlistArray.length; i++) {
							selectDayBasketBallData.selectDay[i] = listlistArray[i];
						}
					}

				}
			}
			if (selectDayBasketBall.getInstance != undefined && selectDayBasketBall.getInstance.parent != undefined) {
				selectDayBasketBall.getInstance.initAllRedBg();
			}

			if (selectDayFootball.getInstance != undefined && selectDayFootball.getInstance.parent != undefined) {
				selectDayFootball.getInstance.initAllRedBg();
			}


		}
	}

}