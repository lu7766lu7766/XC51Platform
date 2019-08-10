/**选择银行卡数据管理类 */
class selectBankData {
	private static _mInstance: selectBankData;
	public static get getInstance(): selectBankData {
		if (selectBankData._mInstance == undefined)
			selectBankData._mInstance = new selectBankData();
		return selectBankData._mInstance;
	}
	public constructor() {
	}

	public static selectID: number = 1;//选择银行卡id

	/**选择银行卡需要处理的逻辑*/
	public selectBank(): void {
		let list = selectBankcard.getInstance.getList();
		let dataobj: selectBankItem;
		for (let i = 1; i <= list.size; i++) {
			dataobj = list.Gget(i);
			if (dataobj != undefined) {
				if (i == selectBankData.selectID) {
					dataobj.setjtSprite(1);
				} else {
					dataobj.setjtSprite(2);
				}
			}
		}
		withdrawViewMrg.getInstance.setconne();
	}
}