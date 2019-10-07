/**
 * 地址: /p/pl.php


res:0 	//0成功
"lst_pay":[	//转账支付类型 列表 
	{
		"way_type":"2",	//支付方式
		"way_name":"微信转账支付",//支付名称
		"amt_minimum":"50",			//支付最小金额
		"amt_maximum":"3,000"		//支付最大金额
	}
]
"lst_qrcode":[	
	{
		"way_type":"0",
		"way_name":"支付宝扫码",
		"amt_minimum":"50",
		"amt_maximum":"3,000"
	}
]
 */
class PayPL implements IProHandle {
	private static _mInstance: PayPL;
	public static get getInstance(): PayPL {
		if (PayPL._mInstance == undefined)
			PayPL._mInstance = new PayPL();
		return PayPL._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "PayPL";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/p/pl.php";
		let content = `id=${UserData.getInstance.userId}&rkey=${GameValue.orderKey}&v=${GameValue.verPhp}`;
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

				RCway_Mrg.getInstance.clear();
				let lst_pay:Array<any> = text["info"];
				let rCway_Data:RCway_Data;
				for(let i=0;i<lst_pay.length;i++) {
					rCway_Data = new RCway_Data();
					rCway_Data.id = i;
					rCway_Data._title = lst_pay[i]["name"];
					rCway_Data._type = lst_pay[i]["type"];
					rCway_Data.small = ToolMrg.getStrNum(""+lst_pay[i]["min"]);
					rCway_Data.max = ToolMrg.getStrNum(""+lst_pay[i]["max"]);
					rCway_Data.money = [];
					for(let j=0;j<lst_pay[i]["money"].length;j++) {
						rCway_Data.money[j] = ToolMrg.getStrNum(""+lst_pay[i]["money"][j]);
					}
					rCway_Data.payType = 0;
					rCway_Data.class = lst_pay[i]["class"];
					rCway_Data.description = lst_pay[i]["description"];
					rCway_Data.bank_card_id = lst_pay[i]["bank_card_id"];

					RCway_Mrg.getInstance.addItem(i, rCway_Data);
				}
				// let lst_qrcode:Array<any> = text["lst_qrcode"];
				// let begin:number = RCway_Mrg.getInstance.getItem().size;
				// for(let i=0;i<lst_qrcode.length;i++) {
				// 	rCway_Data = new RCway_Data();
				// 	rCway_Data._title = lst_qrcode[i]["way_name"];
				// 	rCway_Data._type = lst_qrcode[i]["way_type"];
				// 	rCway_Data.small = ToolMrg.getStrNum(""+lst_qrcode[i]["amt_minimum"]);
				// 	rCway_Data.max = ToolMrg.getStrNum(""+lst_qrcode[i]["amt_maximum"]);
				// 	rCway_Data.payType = 1;

				// 	RCway_Mrg.getInstance.addItem(i+begin, rCway_Data);
				// }

				CustEventMrg.getInstance.dispatch(CustEventType.EventType_payList);
			}
        }
    }
}