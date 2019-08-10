class HistoryAwardsDataMrg {
	private static _mInstance: HistoryAwardsDataMrg;
	public static get getInstance(): HistoryAwardsDataMrg {
		if (HistoryAwardsDataMrg._mInstance == undefined)
			HistoryAwardsDataMrg._mInstance = new HistoryAwardsDataMrg();
		return HistoryAwardsDataMrg._mInstance;
	}
	/**订单列表 */
	private History3List:GHashMap<HistoryAwardsData>;
	private History5List:GHashMap<HistoryAwardsData>;
	private constructor() {
		this.History3List = new GHashMap<HistoryAwardsData>();
		this.History5List = new GHashMap<HistoryAwardsData>();
	}

	/**添加列表 */
	public addHistory3List(data:HistoryAwardsData):void {
		this.History3List.Gput(data.id, data);
	}

	/**获取组3列表 */
	public getHistory3List():GHashMap<HistoryAwardsData> {
		return this.History3List;
	}

	/**添加列表 */
	public addHistory5List(data:HistoryAwardsData):void {
		this.History5List.Gput(data.id, data);
	}

	/**获取组5列表 */
	public getHistory5List():GHashMap<HistoryAwardsData> {
		return this.History5List;
	}

}