/**开奖信息管理类 */
class AwareInfoData {
	private static _mInstance: AwareInfoData;
	public static get getInstance(): AwareInfoData {
		if (AwareInfoData._mInstance == undefined)
			AwareInfoData._mInstance = new AwareInfoData();
		return AwareInfoData._mInstance;
	}
	public constructor() {
		this._mListObj = new GHashMap<AwareGameInfoData>();
	}

	public static decidecom: boolean = false;//协议是否返回

	private _mListObj: GHashMap<AwareGameInfoData>;//开奖信息列表

	/**获取列表*/
	public getlist(): GHashMap<AwareGameInfoData> {
		return this._mListObj;
	}

	/**根据id查找对应数据*/
	public getInfo(id: number): AwareGameInfoData {
		let data: AwareGameInfoData;
		for (let i = 0; i <= this._mListObj.size; i++) {
			if (id == i) {
				data = this._mListObj.Gget(i);
				return data;
			}
		}
	}
}