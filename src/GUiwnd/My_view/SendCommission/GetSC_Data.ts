/**
 * 跟单列表

 */
class GetSC_Data implements IProHandle {
	private static _mInstance: GetSC_Data;
	public static get getInstance(): GetSC_Data {
		if (GetSC_Data._mInstance == undefined)
			GetSC_Data._mInstance = new GetSC_Data();
		return GetSC_Data._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "GetSC_Data";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(id): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/Yj.php";
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
                SCMrg.getInstance.clear();
				let arr1:Array<GHashMap<any>> = text["all"];
				let arr2:Array<GHashMap<any>> = text["w"];
                let arr3:Array<GHashMap<any>> = text["y"];

                let index = 0;
                if(arr1!=undefined && arr1.length>0){
                    for(let i=0;i<arr1.length;i++){
                        let obj = new SCData();
                        let aaa = arr1[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        
                        SCMrg.getInstance.addAllSCitem(obj.id,obj);
                    }
                }
                if(arr2!=undefined && arr2.length>0){
                    for(let i=0;i<arr2.length;i++){
                        let obj = new SCData();
                        let aaa = arr2[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        
                        SCMrg.getInstance.addunScItem(obj.id,obj);
                    }
                }
                if(arr3!=undefined && arr3.length>0){
                    for(let i=0;i<arr3.length;i++){
                        let obj = new SCData();
                        let aaa = arr3[i];
                        obj.id = aaa["orderid"];
                        obj._CMmoney = aaa["yj"];
                        obj._type = aaa["type"];
                        obj._rate = aaa["rate"];
                        obj._dateTime = aaa["time"];
                        obj._GDmoney = aaa["money"];
                        obj._GDNum = aaa["num"];
                        
                        SCMrg.getInstance.addzScItem(obj.id,obj);
                    }
                }

                if(SCWnd.getInstance.parent!=undefined)
                    SCWnd.getInstance.updata();
			}
        }
    }
}