/**
 * 
修改用户名:resetName.php
参数
id:用户ID
n:用户新昵称
返回
{
    "res": 0, 
    "name":新昵称
}
 */
class ResetName implements IProHandle {
	private static _mInstance: ResetName;
	public static get getInstance(): ResetName {
		if (ResetName._mInstance == undefined)
			ResetName._mInstance = new ResetName();
		return ResetName._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "ResetName";
	}

	/**
	 * user
	 */
	public sendHttp(nnn:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/resetName.php";

		let content = `id=${UserData.getInstance.userId}&n=${nnn}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["msg"]);
			} else if(text["res"] == "0"){
				UserData.getInstance.userName = text["name"];
				CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
			}
			
        }
    }
}