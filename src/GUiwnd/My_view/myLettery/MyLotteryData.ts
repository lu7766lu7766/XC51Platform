class MyLotteryData {
	/**id 标识*/
	public id: number;
	/**类型 1(竞足) 2(竞篮) 3(组三) 4(组5) 5(超级足彩) 6(超级篮球)*/
	public type: number;
	/**串关类型 1串关 2单关 */
	public clType: number;
	/**标题 */
	public title: string;
	/**下注金额 */
	public xzMoney: number;
	/**中奖金额 */
	public xjMoney: number;
	/**状态  1待开奖 2未中奖 3已中奖 */
	public statue: number;
	/**时间 */
	public time: number;
	/**单关 串关 */
	public model: number;
	/**过关方式 1(单关) 2(2串1) 3(3串1)...*/
	public passList: string;
	/**加奖金额 如果不为0的话，则加进去(已除100) */
	public _reward:number;
	/**购买时间 */
	public x:number;
	/**命中率 */
	public rate:string;


	/**单子状态  0=>普通订单 1=>跟单订单 2=>发单订单 -----新添加*/
	public lotteryType:number;
	/**推荐人或发单人 姓名 */
	public _mName:string;
	/**vip */
	public vip:string;
	/**跟单奖金 */
	public _gdje:number;
	/**抽佣比例 */
	public _cybl:number;
	/**抽佣金额 */
	public _cyje:number;
	/**返水 */
	public _fs:number;
	/**跟单人数 */
	public numGD:string;
	/**跟投金额 跟单金额 (对应跟单人数) */
	public gtMoney:number;
	/**当前是否有加奖 0不加 1加 (如果statue非==1 则为0 只要待开奖才有出现) */
	public isjia:number;
	//-----新添加

	public url: string;

	/**篮球 足球 */
	public fbLotData: GHashMap<FBLotData> = new GHashMap<FBLotData>();
	/**排三排五 */
	public threeOrFive: ThreeOrFive;

	/** 预测金额数据*/
	public yePriceList: number[] = [];
}

/**篮球 足球 */
class FBLotData {
	/**联赛名字*/
	public nameT: string;
	/**周几 */
	public weekTime: string;
	/**对阵信息 主*/
	public aName: string;
	/**对阵信息 客*/
	public bName: string;
	/**过关方式 1(单关) 2(2串1) 3(3串1)...*/
	public passList: string;
	/**投注项 第一位下标id 第二位倍率*/
	// public list: Array<number[]> = new Array<number[]>();
	public list: string[][] = [];
	/**赛果列表 */
	public fruitList: string[] = [];
	/**时间 */
	public _time: number;
	/**状态 */
	public _static: number;
}


/**排三排五 */
class ThreeOrFive {
	/**期数 */
	public qs: number;
	/**预计今天开奖时间 */
	public openStr: string = "";
	/**开奖号码 */
	public kjNumList: number[] = [];
	/**类型*/
	public type: number = 0;
	/**投注内容列表 */
	public tzList: string[][] = [];
	/**倍数*/
	public doubleNum: number = 0;
	/**获取类型字符串*/
	public getstr(type: number): string {
		if (type == 1) {
			return "直选"
		} else if (type == 3) {
			return "组三";
		} else if (type == 4) {
			return "组六";
		}
	}
	/**获取投注列表*/
	public gettzList(): string[][] {
		let strList: string[][] = [];
		let list = this.tzList;
		for (let i = 0; i < list.length; i++) {
			let one: string[] = list[i];
			let newlist: string[] = [];
			newlist[1] = "(" + this.getstr(Number(one[1])) + ")";
			newlist[0] = one[0];
			strList[i] = newlist;
		}
		return strList;
	}

}