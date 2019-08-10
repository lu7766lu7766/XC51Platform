/**
 * 地址: /p/pr.php
	请求参数:
		uid:用户ID
		m:充值金额
		rk:
		payType:
		wayType:




	res:0 	//0成功
	purl:	//充值跳转地址
 */
class PayGo implements IProHandle {
	private static _mInstance: PayGo;
	public static get getInstance(): PayGo {
		if (PayGo._mInstance == undefined)
			PayGo._mInstance = new PayGo();
		return PayGo._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "PayGo";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(m:number,payType:number,wayType:number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/p/pr.php";
		let content = `uid=${UserData.getInstance.userId}&rk=${GameValue.orderKey}&m=${m}&type=${payType}&v=${GameValue.verPhp}`;
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
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["res"]+":"+text["msg"]);
            } else {
				if(text["purl"] && window["go2Url"]) {
					window["go2Url"](text["purl"]);
					PayTipWindow.getInstance.show();
				}
			}
        }
    }
}