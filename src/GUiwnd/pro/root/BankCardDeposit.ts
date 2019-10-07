
class BankCardDeposit implements IProHandle {
	private static _mInstance: BankCardDeposit;
	public static get getInstance(): BankCardDeposit {
		if (BankCardDeposit._mInstance == undefined)
			BankCardDeposit._mInstance = new BankCardDeposit();
		return BankCardDeposit._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "BankCardDeposit";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(bank_card_id:number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/bankcard";
		let content = `bank_card_id=${bank_card_id}&v=${GameValue.verPhp}`;
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
                Alertpaner.getInstance.show(text["msg"]);
            } else {
				console.log(text)
			}
        }
    }
}