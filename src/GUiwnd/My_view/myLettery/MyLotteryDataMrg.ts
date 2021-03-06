class MyLotteryDataMrg {
	private static _mInstance: MyLotteryDataMrg;
	public static get getInstance(): MyLotteryDataMrg {
		if (MyLotteryDataMrg._mInstance == undefined)
			MyLotteryDataMrg._mInstance = new MyLotteryDataMrg();
		return MyLotteryDataMrg._mInstance;
	}
	/**我的彩票列表 == 所有列表*/
	public _mList: Array<MyLotteryData>;
	/**待开奖 */
	private _mListDKJ: Array<MyLotteryData>;
	/**已开奖 */
	private _mListYKJ: Array<MyLotteryData>;
	/**已中奖 */
	private _mListYZJ: Array<MyLotteryData>;

	private constructor() {
		this._mList = new Array<MyLotteryData>();
		this._mListDKJ = new Array<MyLotteryData>();
		this._mListYKJ = new Array<MyLotteryData>();
		this._mListYZJ = new Array<MyLotteryData>();
	}

	/**添加列表 */
	public addData(data: MyLotteryData): void {
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined && this._mList[i].id == data.id) {
				this._mList[i] = data;
				return;
			}
		}
		this._mList.push(data);
	}

	/**通过id 获取对象 */
	public getDataById(id: number): MyLotteryData {
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined) {
				console.log("单个对象===" + this._mList[i]);
				return this._mList[i];
			}
		}

		return undefined;
	}

	/**获取全部 */
	public getAllList(): Array<MyLotteryData> {
		console.log("获取全部列表===" + this._mList.length);
		return this._mList;
	}

	/**获取待开奖列表 */
	public getDKJDataList(): Array<MyLotteryData> {
		this._mListDKJ.length = 0;
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined && this._mList[i].statue == 1) {
				this._mListDKJ.push(this._mList[i]);
			}
		}
		console.log("获取待开奖列表===" + this._mListDKJ.length);
		return this._mListDKJ;
	}

	/**获取已开奖列表 */
	public getYKJDataList(): Array<MyLotteryData> {
		this._mListYKJ.length = 0;
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined && this._mList[i].statue == 2) {
				this._mListYKJ.push(this._mList[i]);
			}
		}
		console.log("获已开奖列表" + this._mListYKJ.length);
		return this._mListYKJ;
	}

	/**获取已中奖列表 */
	public getYZJDataList(): Array<MyLotteryData> {
		this._mListYZJ.length = 0;
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined && this._mList[i].statue == 3) {
				this._mListYZJ.push(this._mList[i]);
			}
		}
		console.log("获已中奖列表" + this._mListYZJ.length);
		return this._mListYZJ;
	}

	/**清空列表 */
	public cleanData(): void {
		for (let i = 0; i < this._mList.length; i++) {
			if (this._mList[i] != undefined) {
				this._mList[i] = undefined;
			}
		}
		this._mList.length = 0;
	}
}