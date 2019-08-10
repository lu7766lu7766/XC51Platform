/**篮球选择日期数据类 */
class selectDayBasketBallData {
	private static _mInstance: selectDayBasketBallData;
	public static get getInstance(): selectDayBasketBallData {
		if (selectDayBasketBallData._mInstance == undefined)
			selectDayBasketBallData._mInstance = new selectDayBasketBallData();
		return selectDayBasketBallData._mInstance;
	}
	public constructor() {
	}

	public static defaultselectNum: number = 1;//当前选者期数id
	public static ifshow: boolean = false;//当前是否有显示选择列表
	private _mListObj: GHashMap<selectDayFootballData.Data>;//信息列表
	public static selectDay: number[] = [];//最近选择日期

	/**获取列表*/
	public getlist(): GHashMap<selectDayFootballData.Data> {
		return this._mListObj;
	}

	/**日期选择逻辑处理*/
	public selectqq(): void {
		let list: GHashMap<selectdayItem1> = selectDayBasketBall.getInstance.getlist();
		let len: number = list.size;
		for (let i = 1; i <= len; i++) {
			let dataobj: selectdayItem1 = list.Gget(i);
			if (dataobj != undefined) {
				if (selectDayBasketBallData.defaultselectNum == i) {
					dataobj.selcet(1);
				} else {
					dataobj.selcet(2);
				}
			}
		}
		jcbasketBallView.getInstance.setqq();
	}

	/**根据id查找对应数据*/
	public getInfo(id: number): selectDayFootballData.Data {
		let data: selectDayFootballData.Data;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	//清除对象数组
	public hideData(): void {
		this._mListObj.clear();
	}
}

module selectDayBasketBallData {
	export class Data {
		public day: string;//日期
		public teama: string;//队左
		public teamb: string;//队右
		public bfLeft: string;//总比分
		public bfban: string;//半比分

		public biaoList: string[] = [];//表格显示内容

		public setList(id: number, str: string): void {
			this.biaoList[id] = str;
		}

	}
}

