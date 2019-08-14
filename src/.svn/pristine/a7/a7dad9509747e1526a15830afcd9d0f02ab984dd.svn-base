/**
 * 
//足球下单

http://192.168.20.23/ticket/test/ft_Order.php?s=&id=&b=&m=&z=
mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
id=>用户ID，s=>json数组,b=>倍数，z=>注数，m=>金额（分）

$a=[
    2=>[
        [[1702567,1],[1716418,2]],
        [[1702567,1],[1656676,2]],
        [[1716418,2],[1656676,2]]
    ],
    3=>[
        [[1702567,1],[1716418,2],[1656676,2]],
    ],
];
 */
class FT_Order implements IProHandle {
	private static _mInstance: FT_Order;
	public static get getInstance(): FT_Order {
		if (FT_Order._mInstance == undefined)
			FT_Order._mInstance = new FT_Order();
		return FT_Order._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "FT_Order";
	}

	/**
	 * 注数列表
	 * 倍数 bs
	 * 参数 t     1=>串关    2=>单关胜平负    3=>单关进球数    4=>单关比分    5=>单关半全场
	 * mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
	 */
	public sendHttp(list:Array<Strand>,dryingData:DryingData,t:number, select:number[],czType:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/ft_Order.php";
		let a = new Array();
		let zs:number = 0;
		let m:number = 0;
		let obj:Strand;
		for(let i=0;i<list.length;i++) {
			obj = list[i];
			for(let j=0;j<select.length;j++) {
				if(obj.injectionNum > 0 && list[i].typeStrand - 1 == select[j]) {
					zs += obj.injectionNum;
					for(let k=0;k<obj.listStrand.length;k++) {
						m += obj.listStrand[k][0][2]*200;
					}
					if(a[obj.typeStrand] == undefined) {
						a[obj.typeStrand] = [];
					}
					a[obj.typeStrand].push(obj.listStrand);
				}
			}
		}
		
		let jsonstr;
		jsonstr="{";
		for(let i=0;i<a.length;i++) {
			if(a[i] != undefined) {
				jsonstr += "\""+i+"\":[";
				for(let j=0;j<a[i].length;j++) {
					for(let k=0;k<a[i][j].length;k++) {
						jsonstr += "[";
						for(let l=0;l<a[i][j][k].length;l++) {
							jsonstr += "["+a[i][j][k][l]+"],";
						}
						jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
						jsonstr += "],";

					}
				}
				jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
				jsonstr += "],";
			}
		}
		jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
		jsonstr+="}";

		let content = `id=${UserData.getInstance.userId}&s=${jsonstr}&r=${dryingData.yltc}&d=${dryingData.faxy}&type=${dryingData.type}&z=${zs}&m=${m}&t=${t}&mold=${czType}&rkey=${GameValue.orderKey}&v=${GameValue.verPhp}`;
		HTTPRequest.getInstance.proSend(url, content, this.data);
	}

	public backHTTP(res: boolean, httpObj: egret.HttpRequest, data: HttpData): void {
        if (res == true && httpObj.response != "") {//请求成功
            let text: Object;
            try {
				text = JSON.parse(httpObj.response);
			} catch (error) {
				Alertpaner.getInstance.show(httpObj.response);
				return;
			}
            if(text["res"]!="0"){
                Alertpaner.getInstance.show(text["res"]+":"+text["msg"]);
				PaymentWnd.canPay = true;
            } else {
				Alertpaner.getInstance.show("下注成功");
				FbWnd.getInstance.zfBack();
				GD_List.getInstance.sendHttp();
			}
			
        }
    }
}