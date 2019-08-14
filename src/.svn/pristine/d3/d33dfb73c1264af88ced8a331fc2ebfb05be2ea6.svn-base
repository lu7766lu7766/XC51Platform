/**
 * 
修改头像:SelectHeadIconPhP.php
参数
id:用户id
t：头像类型id
返回
{
 res:0;
 t:1; //新的头像id
}
 */
class SelectHeadIconPhP implements IProHandle {
	private static _mInstance: SelectHeadIconPhP;
	public static get getInstance(): SelectHeadIconPhP {
		if (SelectHeadIconPhP._mInstance == undefined)
			SelectHeadIconPhP._mInstance = new SelectHeadIconPhP();
		return SelectHeadIconPhP._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "SelectHeadIconPhP";
	}

	/**
	 * user
	 */
	public sendHttp(ntype: number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/resetIcon.php";

		let content = `id=${UserData.getInstance.userId}&t=${ntype}&v=${GameValue.verPhp}`;
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
				selectHeadIconData.userIconID = Number(text["t"]);
				selectHeadIconMrf.getInstance.setdefaultIcon(selectHeadIconData.userIconID);
				PSWnd.getInstance.setHeadIcon();
				MyViewWnd.getInstance.setHeadIcon();
				// CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
			}
		}
	}
}