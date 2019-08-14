/**头像选择逻辑管理类 */
class selectHeadIconData extends egret.DisplayObjectContainer {
	private static _mInstance: selectHeadIconData;
	public static get getInstance(): selectHeadIconData {
		if (selectHeadIconData._mInstance == undefined)
			selectHeadIconData._mInstance = new selectHeadIconData();
		return selectHeadIconData._mInstance;
	}
	public constructor() {
		super();
	}

	public static selectheadIconID: number = 1;//用户头像选择id
	public static userIconID: number =1;//用户在用id

	/**选择头像*/
	public static setlectHeadIcon(): void {
		let list = selectHeadIconMrf.getInstance.getlistList();
		let data: selectHeadIconItem;
		for (let i = 1;i<=list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (i == selectHeadIconData.selectheadIconID) {
					data.selectIcon(true);
				} else {
					data.selectIcon(false);
				}
			}
		}
	}

	/**设置初始头像*/
	public  setlectHeadIcon1(): void {
		let list = selectHeadIconMrf.getInstance.getlistList();
		let data: selectHeadIconItem;
		for (let i = 1;i<=list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (i == selectHeadIconData.userIconID) {
					data.selectIcon(true);
				} else {
					data.selectIcon(false);
				}
			}
		}
	}

	/**获取当前头像*/
	public getdefault(): string {
		return "resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png";
	}
}