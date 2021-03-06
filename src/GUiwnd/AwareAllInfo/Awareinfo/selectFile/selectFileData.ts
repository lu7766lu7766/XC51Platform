/**赛事筛选数据 */
class selectFileData {
	private static _mInstance: selectFileData;
	public static get getInstance(): selectFileData {
		if (selectFileData._mInstance == undefined)
			selectFileData._mInstance = new selectFileData();
		return selectFileData._mInstance;
	}
	public constructor() {
	}

	/**红色选择下滑线的逻辑处理*/
	public redxdecide(): void {
		let list: GHashMap<TopInfoThree> = SelectMrg.getInstance.gettopList();
		let data: TopInfoThree;
		for (let i = 1; i <= list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (SelectMrg.inIndex == i) {
					data.selectInfo();
				} else {
					data.noselectInfo();
				}
			}
		}
		LowSelectBnt.getInstance.initSelect();
		AllSelectSS.getInstance.show();
		SelectMrg.getInstance.redXXTween();
	}

	/**重置红色选择*/
	public resetAllredx() {
		let list: GHashMap<TopInfoThree> = SelectMrg.getInstance.gettopList();
		let data: TopInfoThree;
		for (let i = 1; i <= list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (SelectMrg.inIndex == i) {
					data.selectInfo();
				} else {
					data.noselectInfo();
				}
			}
		}
	}

	/**足球显示 "全部", "一级", "竞彩", "足彩", "单场"   篮球只显示 全部 */
	public shouhide() {
		let type: number = BakorfallViewMrg.stateIndex;
		let list: GHashMap<TopInfoThree> = SelectMrg.getInstance.gettopList();
		let data: TopInfoThree;
		for (let i = 1; i <= list.size; i++) {
			data = list.Gget(i);
			if (data != undefined) {
				if (type == 0) {//足球
					data.gettatile().visible = true;
					data.setonclick(true);
				} else {
					if (i == 1) {
						data.gettatile().visible = true;
						data.setonclick(true);
					} else {
						data.gettatile().visible = false;
						data.setonclick(false);
					}
				}
			}
		}
	}

	/**全选或反选(1 全选 2返选)*/
	public selectall(type: number) {
		let list = AllSelectSS.getInstance.getlist();
		let dataobj: selectssItem;
		for (let key of list.keys) {
			dataobj = list.Gget(key);
			if (dataobj != undefined) {
				if (type == 1) {//全选
					dataobj.setSTatusID(1)
				} else if (type == 2) {//反选
					dataobj.setSTatusID(2)
				}
			}
		}
	}

	/**获取当前赛事隐藏场数*/
	public gethideNum(): number {
		let numType: number = 0;
		let list = AllSelectSS.getInstance.getlist();
		let dataobj: selectssItem;
		for (let key of list.keys) {
			dataobj = list.Gget(key);
			if (dataobj != undefined && dataobj.parent != undefined) {
				if (dataobj.getstatusID() == 2) {
					numType++;
				}
			}
		}
		return numType;
	}

	/**获取当前是否有选择赛事*/
	public ifholdss(): boolean {
		let list = AllSelectSS.getInstance.getlist();
		let decide: boolean = false;
		let dataobj: selectssItem;
		for (let key of list.keys) {
			dataobj = list.Gget(key);
			if (dataobj != undefined && dataobj.parent != undefined) {
				if (dataobj.getstatusID() == 1) {
					return true;
				}
			}
		}
		return decide;
	}

	/**点确定时获取全部赛事id列表*/
	public setList(): string[] {
		let type = BakorfallViewMrg.stateIndex;
		let list = AllSelectSS.getInstance.getlist();
		let dataobj: selectssItem;
		let sslist: string[] = [];
		let id: number = 0;
		for (let key of list.keys) {
			dataobj = list.Gget(key);
			if (dataobj != undefined) {
				if (dataobj.parent != undefined) {
					if (type == 0) {//足球
						if (dataobj.getstatusID() == 1) {
							sslist[id] = dataobj.getssName();
							id++;
						}
					} else if (type == 1) {//篮球
						if (dataobj.getstatusID() == 1) {
							sslist[id] = dataobj.getssName();
							id++;
						}
					}
				}
			}
		}
		return sslist;
	}
}