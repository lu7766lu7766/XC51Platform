/**
 * 分享链接 shareLink.php
参数
id：用户ID
返回
{
  "res":0,
  "url":"https:\/\/www.baidu.com?id=1"
}

 */
class Share_Link implements IProHandle {
	private static _mInstance: Share_Link;
	public static get getInstance(): Share_Link {
		if (Share_Link._mInstance == undefined)
			Share_Link._mInstance = new Share_Link();
		return Share_Link._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "Share_Link";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(id): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/shareLink.php";
		let content = `id=${id}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	private _userLink:string;
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
               this._userLink = text["url"];
			   if(ShareWnd.getInstance!=undefined && ShareWnd.getInstance.parent!=undefined){
				   ShareWnd.getInstance.upLink(this._userLink);
			   }
			   if(ID3.getInstance!=undefined && ID3.getInstance.parent!=undefined)
			   		ID3.getInstance.setLink(this._userLink);
			}
        }
    }
}