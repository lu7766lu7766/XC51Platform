/**比分足球筛选数据类*/
class selectFootInfoData {
	private static _mInstance: selectFootInfoData;
	public static get getInstance(): selectFootInfoData {
		if (selectFootInfoData._mInstance == undefined)
			selectFootInfoData._mInstance = new selectFootInfoData();
		return selectFootInfoData._mInstance;
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

class bfinfo {
	public id: number;//联赛id
	public name: string;//联赛昵称
	public type: number = 0;//1：一级联赛 2：竞彩 3：足彩  4：单场 
}