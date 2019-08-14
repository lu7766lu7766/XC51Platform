/**足球数据管理类 */
class JCFootBallDataMrg {
	private static _mInstance: JCFootBallDataMrg;
	public static get getInstance(): JCFootBallDataMrg {
		if (JCFootBallDataMrg._mInstance == undefined)
			JCFootBallDataMrg._mInstance = new JCFootBallDataMrg();
		return JCFootBallDataMrg._mInstance;
	}
	private _mAllList: GHashMap<JCFootBallData>;
	private constructor() {
		this._mAllList = new GHashMap<JCFootBallData>();
	}

	/**添加列表 */
	public addJCFootBallData(key: number, data: JCFootBallData): void {
		this._mAllList.Gput(key, data);
	}

	/**获取列表 */
	public getList(): GHashMap<JCFootBallData> {
		return this._mAllList;
	}

	/**清理列表*/
	public cleanAll(): void {
		this._mAllList.clear();
	}
}

class JCFootBallData {
	/**主队昵称 */
	public team_a_name: string;
	/**客队昵称 */
	public team_b_name: string;
	/**联赛昵称 */
	public league_name: string;
	/**半全场比分 */
	public ban: string;
	/**最终比分 */
	public fen: string;
	/**周几 */
	public time: string;
	/**周几 */
	public form: string[];
	/**color 1=>红色,2=>蓝色,3=>绿色（比分颜色)*/
	public color: number;
}