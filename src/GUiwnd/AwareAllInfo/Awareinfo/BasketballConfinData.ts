/**篮球比分数据管理类 */
class BasketballConfinData {
	private static _mInstance: BasketballConfinData;
	public static get getInstance(): BasketballConfinData {
		if (BasketballConfinData._mInstance == undefined)
			BasketballConfinData._mInstance = new BasketballConfinData();
		return BasketballConfinData._mInstance;
	}

	private _mListObj: GHashMap<basketballCofObj>;//篮球即时信息列表
	// private _mListObj1: GHashMap<basketballCofObj>;//篮球赛果信息列表
	// private _mListObj2: GHashMap<basketballCofObj>;//篮球赛程信息列表
	private _mListObj3: GHashMap<basketballCofObj>;//篮球关注信息列表
	private _selectList: GHashMap<basketballCofObj>;//筛选列表
	public constructor() {
		this._mListObj = new GHashMap<basketballCofObj>();
		// this._mListObj1 = new GHashMap<basketballCofObj>();
		// this._mListObj2 = new GHashMap<basketballCofObj>();
		this._mListObj3 = new GHashMap<basketballCofObj>();
		this._selectList = new GHashMap<basketballCofObj>();
	}

	/**获取列表(即时)*/
	public getlist(): GHashMap<basketballCofObj> {
		return this._mListObj;
	}

	// /**获取列表(赛果)*/
	// public getlist1(): GHashMap<basketballCofObj> {
	// 	return this._mListObj1;
	// }

	// /**获取列表(赛程)*/
	// public getlist2(): GHashMap<basketballCofObj> {
	// 	return this._mListObj2;
	// }

	/**获取列表(关注)*/
	public getlist3(): GHashMap<basketballCofObj> {
		return this._mListObj3;
	}
	/**获取列表(筛选)*/
	public getselectlist(): GHashMap<basketballCofObj> {
		return this._selectList;
	}

	/**根据id查找对应数据(即时)*/
	public getInfo(id: number): basketballCofObj {
		let data: basketballCofObj;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据赛事id查找对应数据(即时)*/
	public getssInfo(id: number): basketballCofObj {
		let data: basketballCofObj;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == data.id) {
				return data;
			}
		}
	}


	// /**根据id查找对应数据(赛果)*/
	// public getInfo1(id: number): basketballCofObj {
	// 	let data: basketballCofObj;
	// 	for (let key of this._mListObj1.keys) {
	// 		data = this._mListObj1.Gget(key);
	// 		if (id == Number(key)) {
	// 			return data;
	// 		}
	// 	}
	// }

	// /**根据id查找对应数据(赛果)*/
	// public getInfo2(id: number): basketballCofObj {
	// 	let data: basketballCofObj;
	// 	for (let key of this._mListObj2.keys) {
	// 		data = this._mListObj2.Gget(key);
	// 		if (id == Number(key)) {
	// 			return data;
	// 		}
	// 	}
	// }

	/**根据id查找对应数据(关注)*/
	public getInfo3(id: number): basketballCofObj {
		let data: basketballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据赛事id查找对应数据(关注)*/
	public getssInfo3(id: number): basketballCofObj {
		let data: basketballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				return data;
			}
		}
	}

	/**根据赛事id查找对应key(关注)*/
	public getInfo33(id: number): number {
		let data: basketballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				return Number(key);
			}
		}
	}

	/**根据赛事id移除对应数据(关注)*/
	public removeInfo33(id: number): void {
		let data: basketballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				this._mListObj3.GremoveByKey(key);
				return;
			}
		}
	}

	//清除对象数组
	public hideData(): void {
		this._mListObj.clear();
	}

	// //清除对象数组
	// public hideData1(): void {
	// 	this._mListObj1.clear();
	// }

	// //清除对象数组
	// public hideData2(): void {
	// 	this._mListObj2.clear();
	// }

	//清除对象数组
	public hideData3(): void {
		this._mListObj3.clear();
	}
	//清除对象数组
	public hideDataselect(): void {
		this._selectList.clear();
	}


	/**根据类型获取对应筛选列表*/
	public selectList(type: number): void {
		selectBaketInfoData.getInstance.hideData();
		let lsList: GHashMap<bfinfo> = new GHashMap<bfinfo>();
		let id1: number = 1;
		let data: basketballCofObj;
		let datainfo: bfinfo;
		if (type != 0) return;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (data != undefined) {
				datainfo = new bfinfo();
				datainfo.id = data.id;
				datainfo.name = data.name;
				lsList.Gput(id1, datainfo);
				// selectBaketInfoData.getInstance.getlist().Gput(id1, datainfo);
				id1++;
			}
		}
		let kk: number = 1;
		let bfinfoobj: bfinfo;
		for (let key of lsList.keys) {
			bfinfoobj = lsList.Gget(key);
			if (bfinfoobj != undefined) {
				let gpdata: bfinfo = selectBaketInfoData.getInstance.getnameData(bfinfoobj.name);
				if (gpdata == undefined) {
					selectBaketInfoData.getInstance.getlist().Gput(kk, bfinfoobj);
					kk++;
				}
			}
		}
	}

	/**获取赛选后的列表*/
	public selectafterList(list: string[]) {
		this.hideDataselect();
		let id1: number = 1;
		let data: basketballCofObj;
		for (let i = 0; i < list.length; i++) {
			for (let key of this._mListObj.keys) {
				data = this._mListObj.Gget(key);
				if (data != undefined) {
					if (data.name == list[i]) {
						this._selectList.Gput(id1, data);
						id1++;
					}
				}
			}
		}
	}


}

class basketballCofObj {
	public id: number;//id
	public color: string;//联赛颜色
	public name: string;//联赛名字
	public timer: string;//开赛时间
	public leftname: string;//国家主名字
	public rightname: string;//国家客名字
	public bfText: string;//总比分
	public team_a_score: string;//主总分
	public team_b_score: string;//客总分
	public fc: string;//分差
	public rf: string;//让分
	public ifgz: number;//是否关注(0未关注 1关注) 
	public status: number = 0;//赛事状态

	public zhujie1: string;//主第一节得分
	public zhujie2: string;//主第二节得分
	public zhujie3: string;//主第三节得分
	public zhujie4: string;//主第四节得分

	public kejie1: string;//客第一节得分
	public kejie2: string;//客第二节得分
	public kejie3: string;//客第三节得分
	public kejie4: string;//客第四节得分


	/**获取对应赛事状态*/
	public getstatus(): string {
		if (this.status == 0) {
			return "未开赛";
		} else if (this.status == 1) {
			return "一节";
		} else if (this.status == 2) {
			return "二节";
		} else if (this.status == 3) {
			return "三节";
		} else if (this.status == 4) {
			return "四节";
		} else if (this.status == 5) {
			return "1'OT";
		} else if (this.status == -1) {
			return "完场";
		} else if (this.status == -2) {
			return "待定";
		} else if (this.status == -3) {
			return "中断";
		} else if (this.status == -4) {
			return "取消";
		} else if (this.status == -5) {
			return "推迟";
		} else if (this.status == 50) {
			return "中场";
		}
	}
}