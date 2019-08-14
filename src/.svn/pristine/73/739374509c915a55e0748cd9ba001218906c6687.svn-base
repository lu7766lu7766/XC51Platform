/**
 * 
//绑定手机 phone.php
参数:
id:用户id
n:手机号码
返回
{
   "res":0
   "phone":	1999
}
}
 */
class PhonePhp implements IProHandle {
	private static _mInstance: PhonePhp;
	public static get getInstance(): PhonePhp {
		if (PhonePhp._mInstance == undefined)
			PhonePhp._mInstance = new PhonePhp();
		return PhonePhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "PhonePhp";
	}

	/**
	 * user
	 */
	public sendHttp(n: string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/phone.php";

		let content = `id=${UserData.getInstance.userId}&n=${n}&v=${GameValue.verPhp}`;
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
				UserData.getInstance.photo = text["phone"];
				CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
			}
		}
	}
}