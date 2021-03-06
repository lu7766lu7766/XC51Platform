/**
 * 排列三或者排列五期数和截止时间：qs.php
返回
{
    "res": 0,
    "three": "20190701",//排列三期数
    "five":"20190701",//排列五期数
    "time": 1563191700 //截止时间
	"type":1销售中 2停止销售
	"isJ":0不能打开 1可打开
}
 */
class QsPhp implements IProHandle {
	private static _mInstance: QsPhp;
	public static get getInstance(): QsPhp {
		if (QsPhp._mInstance == undefined)
			QsPhp._mInstance = new QsPhp();
		return QsPhp._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "QsPhp";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/qs.php";
		let content = `v=${GameValue.verPhp}`;
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
            if(text["res"]!="0"){
				if(text["res"] != 1000)
                	Alertpaner.getInstance.show(text["msg"]);
            } else {
				GameValue.threeQS = text["three"];
				GameValue.fiveQS = text["five"];
				GameValue.stopTime = text["time"];
				GameValue.typeQS = text["type"];
				GameValue.isJ = text["isJ"];
			}
        }

    }
}