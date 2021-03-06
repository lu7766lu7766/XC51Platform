/**足球或篮球数据类*/
class BakorfallData {
	private static _mInstance: BakorfallData;
	public static get getInstance(): BakorfallData {
		if (BakorfallData._mInstance == undefined)
			BakorfallData._mInstance = new BakorfallData();
		return BakorfallData._mInstance;
	}
	public constructor() {
	
	}
	/**红色选择下滑线的逻辑处理*/
	public redxdecide(): void {

		let list: GHashMap<TopInfo> = BakorfallViewMrg.getInstance.gettopList();
		let data: TopInfo;
		for (let i = 1; i <= list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (BakorfallViewMrg.inIndex == i) {
					data.selectInfo();
				} else {
					data.noselectInfo();
				}
			}
		}
		BakorfallViewMrg.getInstance.redXXTween();
	}


	/**每过30秒同步一下数据*/
	/** */
	public sendsynchronizationInfo(): void {
		FootballBFConfin.getInstance.sendHttp();
		basketballBFConfin.getInstance.sendHttp();
		FootandBaskGZConfin.getInstance.sendHttp(1);
		FootandBaskGZConfin.getInstance.sendHttp(2);
		// GTimerMag.getInstance.addTimerTask("BakorfallData", 99999999, 300000, () => {
		// 	if (BakorfallViewMrg.decideshow == true) {
		// 		FootballBFConfin.getInstance.sendHttp();
		// 		basketballBFConfin.getInstance.sendHttp();
		// 		FootandBaskGZConfin.getInstance.sendHttp(1);
		// 		FootandBaskGZConfin.getInstance.sendHttp(2);
		// 	}
		// }, this);
	}
}