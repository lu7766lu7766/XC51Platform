/**
 * 跟单详情

 */
class GD_detail implements IProHandle {
	private static _mInstance: GD_detail;
	public static get getInstance(): GD_detail {
		if (GD_detail._mInstance == undefined)
			GD_detail._mInstance = new GD_detail();
		return GD_detail._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "GD_detail";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(o,m): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/tie_two.php";
		let content = `o=${o}&m=${m}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
				let obj = new GD_DetailData();
                let aaa = text["data"];
				
				obj.endTime = aaa["tl"];
				obj.txSrc = aaa["icon"];
				obj.oid = aaa["order_id"];
				obj.id = aaa["id"];
				obj.txName = aaa["name"];
				obj.ji = aaa["ji"];
				obj.zh = aaa["zh"];
				obj.endArr = aaa["ke"];
				obj.lv = aaa["lv"];
				obj.declare = aaa["declare"];
				obj.total = aaa["total"];
				obj.g_total = aaa["g_total"];
				obj.hr = aaa["hr"];
				obj.rate = aaa["rate"];
				obj._type = aaa["type"];
				obj.model = aaa["model"];
				obj.t = aaa["t"];
				obj.money = aaa["money"];
				obj.k = aaa["k"];
				obj._b = aaa["b"];
				if(aaa["vip"]==undefined){
					obj.vip = "1";
				}else{
					obj.vip = aaa["vip"];
				}

				if(aaa["ql"]==1){
					if(aaa["type"]==1){//足球单关
						obj._typeStatic = 2;
					}else{//足球串关
						obj._typeStatic = 1;
					}
				}else if(aaa["ql"]==2){
					if(aaa["type"]==1){//篮球单关
						obj._typeStatic = 4;
					}else{//篮球串关
						obj._typeStatic = 3;
					}
				}

				let arr:Array<GHashMap<any>> = aaa["fa"];
				if(arr!=undefined && arr.length>0){
					for(let i=0;i<arr.length;i++){
						let objSub = new GD_detailSubdata();
						let ccc = arr[i];

						objSub._static = ccc["status"];
						objSub.len_name = ccc["len_name"];
						objSub.day = ccc["day"];
						objSub.team_a_name = ccc["team_a_name"];
						objSub.team_b_name = ccc["team_b_name"];
						objSub.want = ccc["want"];
						objSub.result = ccc["result"];
						objSub._time = ccc["day"];
						obj.GD_detailItem.Gput(i,objSub);
					}
				}

				let list:Array<Array<any>> = aaa["num"];
				if(list!=undefined && list.length>0){
					for(let k=0;k<list.length;k++){
						let ddd = list[k];
						let userList = new GD_UserList();
						userList.id = k;
						userList.userName = ddd[0];
						userList.userMoney = ddd[2];
						userList.tx = ddd[1];
						userList.timeNum = ddd[3];
						obj.GD_UserItem.Gput(k,userList);
					}
					obj.num = list.length;
				}else{
					obj.num = 0;
				}
				if(DmC_infoMsg.dmdetail!=undefined && DmC_infoMsg.dmdetail.parent!=undefined)
					DmC_infoMsg.dmdetail.updata(obj);
			}
        }
    }
}