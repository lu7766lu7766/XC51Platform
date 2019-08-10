class JCBasketBallDataMrg {
	private static _mInstance: JCBasketBallDataMrg;
	public static get getInstance(): JCBasketBallDataMrg {
		if (JCBasketBallDataMrg._mInstance == undefined)
			JCBasketBallDataMrg._mInstance = new JCBasketBallDataMrg();
		return JCBasketBallDataMrg._mInstance;
	}
	private _mAllList:GHashMap<JCBasketBallData>;
	private constructor() {
		this._mAllList = new GHashMap<JCBasketBallData>();
	}

	/**添加列表 */
	public addJCBasketBallData(key:number, data:JCBasketBallData):void {
		this._mAllList.Gput(key, data);
	}

	/**获取列表 */
	public getList():GHashMap<JCBasketBallData> {
		return this._mAllList;
	}

	/**清除列表*/
	public cleanall():void{
        this._mAllList.clear();
	}
}

class JCBasketBallData {
	/**主队昵称 */
	public team_a_name:string;
	/**客队昵称 */
	public team_b_name:string;
	/**联赛昵称 */
	public league_name:string;
	/**最终比分 */
	public fen:string;
	/**周几 */
	public time:string;
	/**周几 */
	public form:string[];
	/**color 1=>红色,2=>绿色（比分颜色)*/
	public color:number;
}