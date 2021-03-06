/**
 *添加银行卡 care.php
参数
id：用户id
c：银行卡号
返回
{
  res:0    //除了res为0，其他的返回都是错误
  id:用户ID
  name:开户行
  care:银行卡
  type:1=>储蓄卡 2=>信用卡 3=>其他
}
 */
class BankCard_add implements IProHandle {
	private static _mInstance: BankCard_add;
	public static get getInstance(): BankCard_add {
		if (BankCard_add._mInstance == undefined)
			BankCard_add._mInstance = new BankCard_add();
		return BankCard_add._mInstance;
	}
	/**对象key */
	private data: HttpData;
	private constructor() {
		this.data = new HttpData();
		this.data.mKey = "BankCard_add";
	}

	/**
	 * 注数列表
	 */
	public sendHttp(id, c: string,n:string,r:string): void {
		let url: string = HTTPRequest.getInstance.httpHeadUrl + "/care.php";
		let content = `id=${id}&c=${c}&n=${n}&r=${r}&v=${GameValue.verPhp}&rkey=${GameValue.orderKey}`;
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
			if (text["res"] != "0") {
				Alertpaner.getInstance.show(text["msg"]);
			} else {
				text["id"];
				text["name"];//开户行
				text["care"];//银行卡
				
				
				if (selectBankcard.getInstance != undefined && selectBankcard.getInstance.parent != undefined) {
					let len: number = SelectDataMrg.getInstance.getItem().size;
					if (len == 0) {
						selectBankcard.getInstance.hide();
						withdrawViewMrg.getInstance.show();
					}
				}

				GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
				if (AddBankCard.getInstance.parent != undefined)
					AddBankCard.getInstance.hide();

			}
		}
	}
}