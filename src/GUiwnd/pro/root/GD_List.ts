/**
 * 跟单列表

 */
class GD_List implements IProHandle {
	private static _mInstance: GD_List;
	public static get getInstance(): GD_List {
		if (GD_List._mInstance == undefined)
			GD_List._mInstance = new GD_List();
		return GD_List._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "GD_List";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/tie.php";
		let content = `v=${GameValue.verPhp}&id=${UserData.getInstance.userId}`;
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
                DmC_infoMsg.getInstance.item.clear();
				let arr:Array<GHashMap<any>> = text["data"];
                let objSub:DmC_infoData_team;
				if(arr!=undefined && arr.length>0){
                    for(let i=0;i<arr.length;i++){
                        let aaa = arr[i];
                        let obj = new DmC_infoData();
                        

                        obj.txSrc = aaa["icon"];
                        obj.oid = aaa["order_id"];
                        // obj.one = aaa["one"];
                        // obj.oneType = aaa["len_name"];
                        obj.mold = aaa["mold"];
                        obj.id = aaa["id"];
                        obj.content = aaa["declare"];
                        obj._type = aaa["type"];
                        obj.num = aaa["num"];
                        obj.GD_money = aaa["money"];
                        obj.money = aaa["total"];
                        obj.txName = aaa["name"];
                        obj.ticke = aaa["ticke"];
                        obj.z = aaa["z"]==undefined?"0":aaa["z"];
                        // obj.lv = aaa["lv"];
                        obj.multiple = aaa["hr"];
                        obj.time = aaa["time"];
                        obj.model = aaa["model"]
                        obj._status = aaa["t"]==undefined?0:aaa["t"];
                        if(aaa["vip"]==undefined)
                            obj.vip = "1";
                        else
                            obj.vip = aaa["vip"];
                        DmC_infoMsg.getInstance.item.Gput(obj.oid,obj);

                        let item:Array<GHashMap<any>> = aaa["team"];
                        if(item!=undefined && item.length>0){
                            for(let k=0;k<item.length;k++){
                                let bbb = item[k];
                                objSub = new DmC_infoData_team();
                                objSub.team_a_name = bbb["team_a_name"];
                                objSub.team_b_name = bbb["team_b_name"];
                                objSub.len_name = bbb["len_name"];
                                objSub.day = bbb["day"];

                                obj.teamItem.Gput(k,objSub);
                            }
                        }

                    }
                }
                if(WorldWnd.getInstance!=undefined && WorldWnd.getInstance.parent!=undefined)
                    WorldWnd.getInstance.upDownData();
                if(DmWnd_2.getInstance!=undefined && DmWnd_2.getInstance.parent!=undefined)
                    DmWnd_2.getInstance.upData();
			}
        }
    }
}