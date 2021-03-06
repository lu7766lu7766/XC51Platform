/**篮球 */
class BasketballData {
	/**排列序号 */
	public code:string;
	/**id 标识*/
	public id:number;
	/** "time": "2019-07-03 周三",日期 */
	public time:string;
	/** 
	"0": "4.4",  //不让分主胜
	"1": "2.37", //不让分客胜
	"2": "1.96", //让分主胜
	"3": "1.57",  //让分客胜

	*5-18更多信息
	*/
	public listSX:number[] = [];
	/**大小分总和数据 */
	public dxFAll:number = 0;
	
	/**"day": "周三" */
	public day:string;
	/**联赛昵称 */
	public league_name:string;
	/**让球数 */
	public lot_lose:number;
	/**不让球数 */
	public no_lose:number;
	/**队伍A昵称 */
	public team_a_name:string;
	/**队伍B昵称 */
	public team_b_name:string;
	
	/**停止销售的时间 */
	public stop:string;
	/**停止销售时间戳 */
	public stopT:number;

	/**下标 */
	public xb:number = 0;
}