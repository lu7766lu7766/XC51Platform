/**
 * 
超过100注足球下单 Super_BK_Order_One.php
参数：
id:用户id
s:json数组
b:倍数
t：1=>串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
m:需要支付的金额(分)
mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
type:发单类型 0:不公开  1:公开  2:截止后公开  3:保密 （下面的参数只有type！=0才需要发）
d:宣言
r：发单利润
l: 1-8   （1=>单关，2-8  几串几  ）多个用逗号隔开
返回
{
	res：0；  （返回其他都是错误）
}
 */
class Super_BK_Order_One implements IProHandle {
	private static _mInstance: Super_BK_Order_One;
	public static get getInstance(): Super_BK_Order_One {
		if (Super_BK_Order_One._mInstance == undefined)
			Super_BK_Order_One._mInstance = new Super_BK_Order_One();
		return Super_BK_Order_One._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "Super_BK_Order_One";
	}

	/**
	 * 注数列表
	 * 倍数 bs
	 * 参数 t     1=>串关    2=>单关胜平负    3=>单关进球数    4=>单关比分    5=>单关半全场
	 * mold:金额类型(多个用逗号隔开,1=>充值金额 2=>中奖金额  3=>优惠金额）
	 */
	public sendHttp(dataItem:Array<zqObjData>,dryingData:DryingData,t:number, select:number[],b:number,m:number,czType:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/super_BK_Order_One.php";
		let strChuan:string = "";
		for(let i=0;i<select.length;i++) {
			strChuan += (select[i] + 1);
			if(i <select.length - 1) {
				strChuan += ",";
			}
		}

		let jsonstr;
		jsonstr="{";
		for(let i=0;i<dataItem.length;i++) {
			if(dataItem[i] != undefined) {
				jsonstr += "\""+dataItem[i].dlxId+"\":[";
				for(let j=0;j<dataItem[i].xlxIdList.length;j++) {
					jsonstr += ""+dataItem[i].xlxIdList[j]+",";
				}
				jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
				jsonstr += "],";
			}
		}
		jsonstr=jsonstr.substring(0,jsonstr.lastIndexOf(','));
		jsonstr+="}";

		let content = `id=${UserData.getInstance.userId}&s=${jsonstr}&r=${dryingData.yltc}&d=${dryingData.faxy}&type=${dryingData.type}&b=${b}&m=${m * 100}&t=${t}&mold=${czType}&l=${strChuan}&rkey=${GameValue.orderKey}&v=${GameValue.verPhp}`;
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
				SPBasketBallWnd.getInstance.zfBack();
				GD_List.getInstance.sendHttp();
			}
			
        }
    }
}