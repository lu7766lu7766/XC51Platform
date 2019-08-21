/**
 * 分享二维码：shareImg.php
 * 参数
id:用户ID
返回{
{
    "res": 0,
    "data": "iVBORw0KGgo" //base64
}
 */
class GetShare implements IProHandle {
	private static _mInstance: GetShare;
	public static get getInstance(): GetShare {
		if (GetShare._mInstance == undefined)
			GetShare._mInstance = new GetShare();
		return GetShare._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "GetShare";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(id): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/shareImg.php";
		let content = `id=${id}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}


    public imgs:any;
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
               	this.imgs = text["data"];
				if(CodeWndphoto.getInstance!=undefined && CodeWndphoto.getInstance.parent!=undefined)
            		CodeWndphoto.getInstance.showCode();
				if(ShareImg.getInstance!=undefined && ShareImg.getInstance.parent!=undefined)
            		ShareImg.getInstance.showCode();
			}
        }
    }
}