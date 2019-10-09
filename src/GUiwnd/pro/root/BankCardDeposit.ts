
class BankCardInfoRequest implements IProHandle {
	private static _mInstance: BankCardInfoRequest;
	public static get getInstance(): BankCardInfoRequest {
		if (BankCardInfoRequest._mInstance == undefined)
			BankCardInfoRequest._mInstance = new BankCardInfoRequest();
		return BankCardInfoRequest._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "BankCardInfo";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(bank_card_id:string): void {
		let url: string = HTTPRequest.getInstance.getApiUrl('bankcard');
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
			if(text["code"] != "200"){
                Alertpaner.getInstance.show("查无银行卡");
            } else {
				let data:any = text["data"];
				let d:BankCardInfo = new BankCardInfo();;
				d.id = data.id;
				d.account = data.account;
				d.account_name = data.account_name;
				d.bank_location = data.bank_location;
				d.bank_name = data.bank_name;
				d.create_time = data.create_time;
				d.delete_time = data.delete_time;
				d.status = data.status;
				d.update_time = data.update_time;
				const wnd = BankCardDepositWnd.getInstance
				wnd.setData(d);
				wnd.show();
			}
        }
    }
}


class BankCardDepositRequest implements IProHandle {
	private static _mInstance: BankCardDepositRequest;
	public static get getInstance(): BankCardDepositRequest {
		if (BankCardDepositRequest._mInstance == undefined)
			BankCardDepositRequest._mInstance = new BankCardDepositRequest();
		return BankCardDepositRequest._mInstance;
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
	public sendHttp(name: string, time: string, amount: string, bank_card_id: string, user_id: string, r_key: string): void {
		let url: string = HTTPRequest.getInstance.getApiUrl('bankcard/deposit');
		let content = `name=${name}&time=${time}&amount=${amount}&bank_card_id=${bank_card_id}&user_id=${user_id}&r_key=${r_key}`;
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
			if([200, 201].indexOf(text["code"]) === -1){
                Alertpaner.getInstance.show("申請失败");
            } else {
				Alertpaner.getInstance.show("申请成功");
				BankCardDepositWnd.getInstance.hide()
				RechargeWnd.getInstance.hide()
			}
        }
    }
}