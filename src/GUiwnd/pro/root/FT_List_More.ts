/**
 * 
 */
class FT_List_More implements IProHandle {
	private static _mInstance: FT_List_More;
	public static get getInstance(): FT_List_More {
		if (FT_List_More._mInstance == undefined)
			FT_List_More._mInstance = new FT_List_More();
		return FT_List_More._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "FT_List_More";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(id:number): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/ft_List_More.php";
		let content = `id=${id}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
				let id:number = text["id"];
				let arr:Array<any> = text["list"];
				let dd:FootballData = FootballDataMrg.getInstance.getDataById(Number(id));
				if(dd == undefined) {
					Alertpaner.getInstance.show("不存在对象");
					return;
				}
				dd.no_lose = text["no_lose"];
				dd.lot_lose = text["lot_lose"];
				for(let i=0;i<arr.length;i++) {
					dd.listSX[i] = arr[i];
				}
			}
			CustEventMrg.getInstance.dispatch(CustEventType.EventType_FT_List_More);
        }
    }
}