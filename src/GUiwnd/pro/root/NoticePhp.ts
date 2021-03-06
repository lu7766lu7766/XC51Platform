/**
 * 公告信息  notice.php
返回
{
    "res": 0,
    "data": [
        [
            1,
            "夏日激情活动火热上线，福利多多，优惠多多，更多精彩活动等你来。"
        ],
        [
            2,
            "全新51彩店震撼来袭，返奖快，返水高，易查询。"
        ]
    ]
}

 */
class NoticePhp implements IProHandle {
	private static _mInstance: NoticePhp;
	public static get getInstance(): NoticePhp {
		if (NoticePhp._mInstance == undefined)
			NoticePhp._mInstance = new NoticePhp();
		return NoticePhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "NoticePhp";

	}


	/**
	 * 注数列表
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/notice.php";
		let content = `id=${UserData.getInstance.userId}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;

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
			if (text["res"] != "0") {
				Alertpaner.getInstance.show(text["msg"]);
			} else {
				let arr:Array<GHashMap<any>> = text["data"];
				let ooo:NoticeData;
				for(let i=0;i<arr.length;i++) {
					ooo = new NoticeData();
					ooo.id = arr[i][0];
					ooo.conten = arr[i][1];
					WorldTip.getInstance.addGGxxList(ooo);
				}
				
			}
		}
	}
}