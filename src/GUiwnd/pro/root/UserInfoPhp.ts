/**
 * 
登陆
http://129.204.53.154/other/test/login.php?username=&pass=
返回
{
     "res": 0,
	
	"award": "0",  //中奖余额
    "bmoney": "0", //佣金余额
    "money":"0",//充值金额
    "gift":"0", //奖券金额
    "rebate":"0",//会员返水余额

}
 */
class UserInfoPhp implements IProHandle {
	private static _mInstance: UserInfoPhp;
	public static get getInstance(): UserInfoPhp {
		if (UserInfoPhp._mInstance == undefined)
			UserInfoPhp._mInstance = new UserInfoPhp();
		return UserInfoPhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "UserInfoPhp";
	}

	/**
	 * user
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/userInfo.php";

		let content = `id=${UserData.getInstance.userId}&v=${GameValue.verPhp}`;
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
				Alertpaner.getInstance.show(text["res"] + ":" + text["msg"]);
			} else if (text["res"] == "0") {
				UserData.getInstance.setGold(text["money"] / 100);
				UserData.getInstance.setBonus(text["award"] / 100);
				UserData.getInstance.setYJGold(text["amoney"] / 100);
				UserData.getInstance.setDJQGold(text["gift"] / 100);
				UserData.getInstance.setRetCash(text["rebate"] / 100);
				UserData.getInstance.setDLGold(text["bmoney"] / 100);
				UserData.getInstance.setLSDefaultmoney(text["bcmoney"] / 100);
				UserData.getInstance.setLSxzmoney(text["blmoney"] / 100);

				CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
			}

		}
	}
}