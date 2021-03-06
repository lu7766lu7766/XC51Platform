/**
 * 
篮球下单:
http://129.204.53.154/other/test/bk_Order.php
参数
id:用户id
s:json数组

r:利润
d:宣言
type:0:不公开  1:公开  2:截止后公开  3:保密

t：1=>篮球串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
m:需要支付的金额(分)

返回
  res:0 成功下单   res等于其它都代表下单失败
 */
class BK_Order implements IProHandle {
	private static _mInstance: BK_Order;
	public static get getInstance(): BK_Order {
		if (BK_Order._mInstance == undefined)
			BK_Order._mInstance = new BK_Order();
		return BK_Order._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "BK_Order";
	}

	/**
	 * 注数列表
	 * 倍数 bs
	 * 参数 t     1=>篮球串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
	 */
	public sendHttp(list:Array<Strand>,dryingData:DryingData,t:number, select:number[],czType:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/bk_Order.php";
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
                Alertpaner.getInstance.show(text["msg"]);
				PaymentWnd.canPay = true;
            } else {
				Alertpaner.getInstance.show("下注成功");
				GD_List.getInstance.sendHttp();
				BasketBallWnd.getInstance.zfBack();
			}
			
        }
    }
}