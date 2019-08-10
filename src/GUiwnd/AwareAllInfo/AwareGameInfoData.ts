class AwareGameInfoData {
	/**id */
	public id: number;
	/**第几期 */
	public qs: number;
	/**开奖结果 */
	public kjjg: string;
	/**时间 */
	public time: string = "";
	/**比赛队伍和比分 */
	public teamstr:string="";

	public setlist(str: string) {
		let str1: string = str;

	}

	public getAwareList(): number[] {
		let awareList: number[] = [];
		let awareId: number = 0;
		if (this.kjjg.length > 1) {
			let str = this.kjjg.split(",");
			for (let i = 0; i < str.length; i++) {
				awareId = Number(str[i]);
				awareList[i] = awareId;
			}
		} else {
			awareList[0] = Number(this.kjjg);
		}
		return awareList;
	}
}
