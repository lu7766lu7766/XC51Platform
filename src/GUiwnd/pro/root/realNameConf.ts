/**

参数
账户认证 true_Info.php
参数
id:用户id
c:身份证参数
n:真实姓名
}
 */
class realNameConf implements IProHandle {
	private static _mInstance: realNameConf;
	public static get getInstance(): realNameConf {
		if (realNameConf._mInstance == undefined)
			realNameConf._mInstance = new realNameConf();
		return realNameConf._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "realNameConf";
	}

	/**
	 * 
	 */
	public sendHttp(sfz: string, name: string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'true_Info.php';
		let content = "id=" + UserData.getInstance.userId + "&c=" + sfz + "&n=" + name +"&v="+GameValue.verPhp+"&rkey="+GameValue.orderKey;
		HTTPRequest.getInstance.proSend(url, content, this.data);

	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
		if (res == true && httpObj.response != "") {//请求成功
			let text: Object;
			try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				Alertpaner.getInstance.show(httpObj.response);
				return;
			}
			let resss: number = Number(text['res']);
			let name: string = text['name'];
			let care: string = text['care'];
			if (resss == 0) {
				UserData.getInstance.setrealName(name);
				UserData.getInstance.setcard(care);
				realnameTest.getInstance.hide();
				UserData.getInstance.setused(1);
				// withdrawData.getInstance.show();
				// AccountNews.getInstance.setgvfBtn1();
				PSWnd.getInstance.setgvfBtn1();

			} else {
				Alertpaner.getInstance.show(text["msg"]);
			}

		}
	}

}