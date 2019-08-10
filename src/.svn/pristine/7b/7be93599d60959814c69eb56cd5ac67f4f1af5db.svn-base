/**
 * 
登陆
http://129.204.53.154/other/test/login.php?username=&pass=
username=>用户名   pass=>密码    p=>邀请码（如果邀请码不填，默认发0）
返回
{
     重置密码：resetPass.php
	参数
	id:用户ID
	o:旧密码
	n:新密码
	返回
	{
		"res": 0, 
		"new":新密码
	}
}
 */
class ResetPassPhp implements IProHandle {
	private static _mInstance: ResetPassPhp;
	public static get getInstance(): ResetPassPhp {
		if (ResetPassPhp._mInstance == undefined)
			ResetPassPhp._mInstance = new ResetPassPhp();
		return ResetPassPhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "ResetPassPhp";
	}

	/**
	 * user
	 */
	public sendHttp(passOld:string,passNew:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/resetPass.php";

		let content = `id=${UserData.getInstance.userId}&o=${passOld}&n=${passNew}&v=${GameValue.verPhp}`;
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
				Alertpaner.getInstance.show("修改密码失败");
			} else if(text["res"] == "0"){
				ResetPassWnd.getInstance.hide();
				Alertpaner.getInstance.show("修改密码成功");
				CacheMrg.getInstance.addYJTime("password", text["new"]);
			}
			
        }
    }
}