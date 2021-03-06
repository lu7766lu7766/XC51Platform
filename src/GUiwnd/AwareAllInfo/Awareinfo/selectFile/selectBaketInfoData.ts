/**比分篮球筛选数据类*/
class selectBaketInfoData {
	private static _mInstance: selectBaketInfoData;
	public static get getInstance(): selectBaketInfoData {
		if (selectBaketInfoData._mInstance == undefined)
			selectBaketInfoData._mInstance = new selectBaketInfoData();
		return selectBaketInfoData._mInstance;
	}
	public constructor() {
		this._mListObj = new GHashMap<bfinfo>();
	}
	private _mListObj: GHashMap<bfinfo>;//足球筛选全部信息列表

	/**获取列表(全部)*/
	public getlist(): GHashMap<bfinfo> {
		return this._mListObj;
	}

	/**根据id查找对应数据(全部)*/
	public getInfo(id: number): bfinfo {
		let data: bfinfo;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据名字寻找是否存在对应的数据*/
	public getnameData(name: string): bfinfo {
		let data: bfinfo;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (name == data.name) {
				return data;
			}
		}
	}


	//清除对象数组
	public hideData(): void {
		this._mListObj.clear();
	}
}
