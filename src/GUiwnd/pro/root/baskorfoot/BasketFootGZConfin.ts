/**
足球和篮球关注
返回t和数据列表
 */
class BasketFootGZConfin implements IProHandle {
	private static _mInstance: BasketFootGZConfin;
	public static get getInstance(): BasketFootGZConfin {
		if (BasketFootGZConfin._mInstance == undefined)
			BasketFootGZConfin._mInstance = new BasketFootGZConfin();
		return BasketFootGZConfin._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "BasketFootGZConfin";
	}
	public static uid: number = 0;

	/**
	 * type 1 足球 2篮球
	 */
	public sendHttp(uid: number, type: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'appoint.php';
		let content = "id=" + UserData.getInstance.userId + "&uid=" + uid + "&type=" + type + "&v=" + GameValue.verPhp+"&rkey="+GameValue.orderKey;
		HTTPRequest.getInstance.proSend(url, content, this.data);
		console.log("关注id:" + uid + "类型==" + type);

	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
		if (res == true && httpObj.response != "") {//请求成功
			let text: Object;
			try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				return;
			}
			let res1: number = Number(text['res']);
			BasketFootGZConfin.uid = Number(text['uid']);
			if (res1 == 0) {//关注成功
				CustEventMrg.getInstance.dispatch(CustEventType.EventType_gzSuccess);
			} else if (res1 == 1003) {//取消关注
				CustEventMrg.getInstance.dispatch(CustEventType.EventType_gzdefeated);
			}
			// BakorfallViewMrg.getInstance.refreshallInfo();
			BakorfallViewMrg.getInstance.refreshlist();
			// FootandBaskGZConfin.getInstance.sendHttp(1);
			// FootandBaskGZConfin.getInstance.sendHttp(2);
			// FootballBFConfin.getInstance.sendHttp();
			// basketballBFConfin.getInstance.sendHttp();
		}
	}
}