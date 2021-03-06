/**
提现申请：withdraw.php
参数
id:用户ID
m:钱数（分）
c:卡号
t:1=>中奖余额 2=>发单佣金
 */
class withdrawConf implements IProHandle {
	private static _mInstance: withdrawConf;
	public static get getInstance(): withdrawConf {
		if (withdrawConf._mInstance == undefined)
			withdrawConf._mInstance = new withdrawConf();
		return withdrawConf._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "withdrawConf";
	}

	/**
	 * 
	 */
	public sendHttp(money: number, numID: string, tyep: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'withdraw.php';
		let content = "id=" + UserData.getInstance.userId + "&m=" + money + "&c=" + numID + "&t=" + tyep+ "&rkey=" + GameValue.orderKey +"&v="+GameValue.verPhp+"&rkey="+GameValue.orderKey;
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
			let msg: string = (text['msg']);
			if (result == 0) {
				let tyep: number = Number(text['type']);
				let money: number = Number(text['money']);
				money = money / 100;
				if (tyep == 1) {
					UserData.getInstance.setGold(money);
				} else {
					UserData.getInstance.setYJGold(money);
				}
				withdrawViewMrg.getInstance.initallInfo1();
				withdrawViewMrg.getInstance.hide();
				Alertpaner.getInstance.show("申请成功，请等待审核");

				CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
			} else {
				decideTKObj.canTiXian = true;
				if (msg != undefined) {
					Alertpaner.getInstance.show(msg);
				}
			}

		}
	}

}