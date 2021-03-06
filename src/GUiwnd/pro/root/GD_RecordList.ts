/**跟单记录 
 * 跟单记录:gen.php
参数
id:用户ID
type:1  //1:全部 2:未中奖  3:已中奖
返回
{
    "res": 0,
    "data": [
        {
            "type": 1,  //1:竞足串关 2:竞足单关 3:竞篮串关 5:竞篮单关
            "money": 3000, //投注金额
            "reward": 1000, //中奖金额
            "name": "aftww", //用户昵称
            "time": 1563210000, //时间戳
            "mold": 3  //1:待开奖 2:未中奖 3:已中奖
        },
    ]
}
*/
class GD_RecordList implements IProHandle {
	private static _mInstance: GD_RecordList;
	public static get getInstance(): GD_RecordList {
		if (GD_RecordList._mInstance == undefined)
			GD_RecordList._mInstance = new GD_RecordList();
		return GD_RecordList._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "GD_RecordList";
	}

	public sendHttp(id,index): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/gen.php";
		let content = `id=${id}&type=${index}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
                Alertpaner.getInstance.show(text["msg"]);
            } else {
                GDRecordMrg.getInstance.GDRItem.clear();
                let objItem:Array<GHashMap<any>> = text["data"];
                if(objItem!=undefined && objItem.length>0){
                    for(let i=0;i<objItem.length;i++){
                        let obj = new GDRecordData();
                        let aaa = objItem[i];
                        obj.id = i;
                        obj._type = aaa["type"];
                        obj.buyMoney = aaa["money"];
                        obj._isWin = aaa["mold"];
                        obj.day = aaa["time"];
                        obj.sendName = aaa["name"];
                        obj.winMoney = aaa["reward"];
                        obj.order_id = aaa["order_id"];
                        GDRecordMrg.getInstance.GDRItem.Gput(i,obj);
                    }

                }
                if(GDRecordWnd.getInstance!=undefined && GDRecordWnd.getInstance.parent!=undefined)
                    GDRecordWnd.getInstance.updata();
			}
        }
    }
}