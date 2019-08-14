/**
 * 
//竞彩状态请求  time.php
返回
{
   res:0
   isJ:49897  // 截止时间    如果为0，就禁售期间   在售期间为截止时间    
}
 */
class TimePhp implements IProHandle {
	private static _mInstance: TimePhp;
	public static get getInstance(): TimePhp {
		if (TimePhp._mInstance == undefined)
			TimePhp._mInstance = new TimePhp();
		return TimePhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "TimePhp";
	}

	/**
	 * user
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/time.php";

		let content = `v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
			if (text["res"] == "0") {
				GameValue.isJ = text["isJ"];
			}
		}
	}
}