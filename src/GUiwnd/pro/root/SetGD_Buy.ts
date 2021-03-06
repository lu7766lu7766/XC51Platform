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
class SetGD_Buy implements IProHandle {
	private static _mInstance: SetGD_Buy;
	public static get getInstance(): SetGD_Buy {
		if (SetGD_Buy._mInstance == undefined)
			SetGD_Buy._mInstance = new SetGD_Buy();
		return SetGD_Buy._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "SetGD_Buy";
	}


	public sendHttp(id,type,o,b,m,mold): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/gen_Order.php";
		let content = `id=${id}&type=${type}&o=${o}&b=${b}&m=${m}&mold=${mold}&rkey=${GameValue.orderKey}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
            if(text["res"]==0){
                DmC_infoMsg.dmdetail.hide();
                PaymentWnd.getInstance.hide();
                Order_List.getInstance.sendHttp();
                MyLotteryWnd.getInstance.show(1);
				GD_List.getInstance.sendHttp();
				UserInfoPhp.getInstance.sendHttp();
				Alertpaner.getInstance.show("跟单成功");
            } else {
				Alertpaner.getInstance.show(text["msg"]);
				PaymentWnd.canPay = true;
			}
        }
    }
}