/**佣金或者零钱数据类*/
class withdrawData {
	private static _mInstance: withdrawData;
	public static get getInstance(): withdrawData {
		if (withdrawData._mInstance == undefined)
			withdrawData._mInstance = new withdrawData();
		return withdrawData._mInstance;
	}
	public constructor() {
	}

	public static defauleid: number = 1;//当前点击类型id
	public static bankName: string = "";//银行卡名字
	public static bankNum: string = "";//银行卡号
	public static bangtk: string = "";//提款金额

	/**选择逻辑处理*/
	public selectdecide(): void {
		let list: GHashMap<withdrawObj> = withdrawViewMrg.getInstance.getlist1();
		let data: withdrawObj;
		for (let i = 1; i <= list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (withdrawData.defauleid == i) {
					data.selectSprite(1);
				} else {
					data.selectSprite(2);
				}
			}
		}
		withdrawData.getInstance.setAllMoney()
	}

	/**设置全部可转出金额*/
	public setAllMoney(): void {
		let list = withdrawViewMrg.getInstance.getlist();
		let data: bgxianTx;
		let type: number = withdrawData.defauleid;
		data = list.Gget(3);
		if (data != undefined) {
			if (type == 1) {
				data.setInpText("可提取" + UserData.getInstance.getGold() + "元");
			} else {
				data.setInpText("可提取" + UserData.getInstance.getYJGold() + "元");
			}
			data.setcolor();
		}
	}

	public getAllMoney(): string {
		let list = withdrawViewMrg.getInstance.getlist();
		let data: bgxianTx;
		let type: number = withdrawData.defauleid;
		data = list.Gget(2);
		if (data != undefined) {
			if (type == 1) {
				return "可提取" + UserData.getInstance.getGold() + "元";
			} else {
				return "可提取" + UserData.getInstance.getYJGold() + "元";
			}
		}
	}


	/**提款流程顺序*/
	public show() {
		let len: number = SelectDataMrg.getInstance.getItem().size;
		if (len == 0) {
			selectBankcard.getInstance.show();
		} else {
			withdrawViewMrg.getInstance.show();
		}
	}

	/**退出登录的时候清除所有银行卡列表信息*/
	public cleanall() {
		SelectDataMrg.getInstance.clearItem();
	}
}