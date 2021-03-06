/**
申请大神:okami_auth.php
参数
id：用户ID
identity：身份证号码
realName：真实姓名
返回
{
    "res": 
	1000 用户Id为空
	1001 身份证为空
	1002 姓名为空
	
	0提交申请成功 
	1你已是大神用户 
	2重复提交申请
	
}
 */
class identitycardConf implements IProHandle {
	private static _mInstance: identitycardConf;
	public static get getInstance(): identitycardConf {
		if (identitycardConf._mInstance == undefined)
			identitycardConf._mInstance = new identitycardConf();
		return identitycardConf._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "identitycardConf";
	}

	/**
	 * 
	 */
	public sendHttp(sfz: string, name: string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + 'okami_auth.php';
		let content = "id=" + UserData.getInstance.userId + "&identity=" + sfz + "&realName=" + name + "&v="+GameValue.verPhp+"&rkey="+GameValue.orderKey;
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
			let listlistArray: number = Number(text['res']);

			if (listlistArray == 1000) {//用户id为空

			} else if (listlistArray == 1001) {//身份证为空

			} else if (listlistArray == 1002) {//姓名为空

			} else if (listlistArray == 0) {//提交申请成功
				Alertpaner.getInstance.show("提交申请成功");
				Identityverify.getInstance.hide();
				GameValue.isDryingList = 2;
				// AccountNews.getInstance.setgvfBtn();
			} else if (listlistArray == 1) {//你已是大神用户

			} else if (listlistArray == 2) {//重复提交申请
				Alertpaner.getInstance.show("重复提交申请");
			}



		}
	}

}