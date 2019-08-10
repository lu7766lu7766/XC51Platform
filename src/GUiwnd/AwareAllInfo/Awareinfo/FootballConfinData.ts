/**足球比分数据管理类 */
class FootballConfinData {
	private static _mInstance: FootballConfinData;
	public static get getInstance(): FootballConfinData {
		if (FootballConfinData._mInstance == undefined)
			FootballConfinData._mInstance = new FootballConfinData();
		return FootballConfinData._mInstance;
	}

	public static gzNum: number = 0;//关注列表个数
	public static numList: number[] = [];//关注赛事id列表
	private _mListObj: GHashMap<footballCofObj>;//足球即时信息列表
	private _mListObj1: GHashMap<footballCofObj>;//足球赛果信息列表
	private _mListObj2: GHashMap<footballCofObj>;//足球赛程信息列表
	private _mListObj3: GHashMap<footballCofObj>;//足球关注信息列表
	private _selectList: GHashMap<footballCofObj>;//筛选列表
	public constructor() {
		this._mListObj = new GHashMap<footballCofObj>();
		this._mListObj1 = new GHashMap<footballCofObj>();
		this._mListObj2 = new GHashMap<footballCofObj>();
		this._mListObj3 = new GHashMap<footballCofObj>();
		this._selectList = new GHashMap<footballCofObj>();
		this.initgz();
	}
	/**获取列表(筛选)*/
	public getselectlist(): GHashMap<footballCofObj> {
		return this._selectList;
	}


	/**获取列表(即时)*/
	public getlist(): GHashMap<footballCofObj> {
		return this._mListObj;
	}

	/**获取列表(赛果)*/
	public getlist1(): GHashMap<footballCofObj> {
		return this._mListObj1;
	}

	/**获取列表(赛程)*/
	public getlist2(): GHashMap<footballCofObj> {
		return this._mListObj2;
	}

	/**获取列表(关注)*/
	public getlist3(): GHashMap<footballCofObj> {
		return this._mListObj3;
	}

	/**根据类型获取对应筛选列表*/
	public selectList(type: number): void {
		let lsList: GHashMap<bfinfo> = new GHashMap<bfinfo>();
		this.hideDataselect();
		selectFootInfoData.getInstance.hideData();
		let id1: number = 1;
		let data: footballCofObj;
		let datainfo: bfinfo;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (data != undefined) {
				if (type == 0) {
					datainfo = new bfinfo();
					datainfo.id = data.id;
					datainfo.name = data.name;
					datainfo.type = data.type;
					lsList.Gput(id1, datainfo);
					// selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
					id1++;
				} else {
					if (data.type == type) {
						datainfo = new bfinfo();
						datainfo.id = data.id;
						datainfo.name = data.name;
						datainfo.type = data.type;
						lsList.Gput(id1, datainfo);
						// selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
						id1++;
					}
				}
			}
		}
		let kk: number = 1;
		let bfinfoobj: bfinfo;
		for (let key of lsList.keys) {
			bfinfoobj = lsList.Gget(key);
			if (bfinfoobj != undefined) {
				let gpdata: bfinfo = selectFootInfoData.getInstance.getnameData(bfinfoobj.name);
				if (gpdata == undefined) {
					selectFootInfoData.getInstance.getlist().Gput(kk, bfinfoobj);
					kk++;
				}
			}
		}
	}


	/**获取筛选后的列表*/
	public selectafterList(list: string[]) {
		this.hideDataselect();
		let id1: number = 1;
		let data: footballCofObj;
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


	/**根据id查找对应数据(筛选)*/
	public getselectInfo(id: number): footballCofObj {
		let data: footballCofObj;
		for (let key of this._selectList.keys) {
			data = this._selectList.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据id查找对应数据(即时)*/
	public getInfo(id: number): footballCofObj {
		let data: footballCofObj;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据赛事id查找对应数据(即时)*/
	public getInfoss(id: number): footballCofObj {
		let data: footballCofObj;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (id == data.id) {
				return data;
			}
		}
	}

	// /**根据id查找对应数据(赛果)*/
	// public getInfo1(id: number): footballCofObj {
	// 	let data: footballCofObj;
	// 	for (let key of this._mListObj1.keys) {
	// 		data = this._mListObj1.Gget(key);
	// 		if (id == Number(key)) {
	// 			return data;
	// 		}
	// 	}
	// }

	// /**根据id查找对应数据(赛程)*/
	// public getInfo2(id: number): footballCofObj {
	// 	let data: footballCofObj;
	// 	for (let key of this._mListObj2.keys) {
	// 		data = this._mListObj2.Gget(key);
	// 		if (id == Number(key)) {
	// 			return data;
	// 		}
	// 	}
	// }

	/**根据id查找对应数据(关注)*/
	public getInfo3(id: number): footballCofObj {
		let data: footballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == Number(key)) {
				return data;
			}
		}
	}

	/**根据id查找对应数据(关注)*/
	public getInfo3ss(id: number): footballCofObj {
		let data: footballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				return data;
			}
		}
	}

	/**根据赛事id移除对应数据(关注)*/
	public removInfo3ss(id: number) {
		let data: footballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				this._mListObj3.GremoveByKey(key);
				return ;
			}
		}
	}

	/**根据赛事id查找对应key(关注)*/
	public getInfo33(id: number): number {
		let data: footballCofObj;
		for (let key of this._mListObj3.keys) {
			data = this._mListObj3.Gget(key);
			if (id == data.id) {
				return Number(key);
			}
		}
	}

	//清除对象数组
	public hideDataselect(): void {
		this._selectList.clear();
	}



	//清除对象数组
	public hideData(): void {
		this._mListObj.clear();
	}

	//清除对象数组
	public hideData1(): void {
		this._mListObj1.clear();
	}

	//清除对象数组
	public hideData2(): void {
		this._mListObj2.clear();
	}

	//清除对象数组
	public hideData3(): void {
		this._mListObj3.clear();
	}


	/**保存关注列表永久列表（id 排序 赛事id typeid）*/
	public savegz(id: number, typeid: number): void {
		CacheMrg.getInstance.addYJTime("FootballConfinData" + id, typeid);
	}

	/**获取初始化关注列表*/
	public initgz(): void {
		let allList: number = this.getallNum();
		for (let i = 1; i <= allList; i++) {
			let id: number = Number(CacheMrg.getInstance.getYJTime("FootballConfinData" + i));
			FootballConfinData.numList[i - 1];
		}
	}

	/**保存关注列表总个数*/
	public saveallNum(id: number): void {
		CacheMrg.getInstance.addYJTime("FootballConfinData", id);
	}

	/**保存关注列表总个数*/
	public getallNum(): number {
		let alllist: string = CacheMrg.getInstance.getYJTime("FootballConfinData");
		return Number(alllist);
	}

}

class footballCofObj {
	public id: number;//id
	public color: string;//联赛颜色
	public name: string;//名字
	public timer: string;//时间
	public leftIcon: string;//国家左图标
	public rightIcon: string;//国家右图标
	public leftname: string;//国家左名字
	public rightname: string;//国家右名字
	public bfText: string;//比分
	public bcBF: string;//半场比分
	public touding: string;//中间头顶赛事时间
	public ifgz: number;//是否关注(0为关注 1关注) 
	public rqday: string;//日期
	public status: number = 0;//赛事状态
	public statusxians: string;//赛事状态显示
	public leftrednum: number;//左红牌
	public leftyellownum: number;//左黄牌
	public rightrednum: number;//右红牌
	public rightyellownum: number;//右黄牌
	public type: number;//1：一级联赛 2：竞彩 3：足彩  4：单场 

	/**获取对应赛事状态*/
	public getstatus(): string {
		if (this.status == 0) {
			return "未开";
		} else if (this.status == 1) {
			return "上半场";
		} else if (this.status == 2) {
			return "中场";
		} else if (this.status == 3) {
			return "下半场";
		} else if (this.status == 4) {
			return "加时";
		} else if (this.status == 5) {
			return "点球";
		} else if (this.status == -11) {
			return "待定";
		} else if (this.status == -12) {
			return "腰斩";
		} else if (this.status == -13) {
			return "中断";
		} else if (this.status == -14) {
			return "推迟";
		} else if (this.status == -1) {
			return "完场";
		} else if (this.status == -10) {
			return "取消";
		}
	}
}