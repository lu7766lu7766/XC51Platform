class FootballDataMrg {
	private static _mInstance: FootballDataMrg;
	public static get getInstance(): FootballDataMrg {
		if (FootballDataMrg._mInstance == undefined)
			FootballDataMrg._mInstance = new FootballDataMrg();
		return FootballDataMrg._mInstance;
	}
	/**足球列表 串关*/
	public _mZQLB:GHashMap<GHashMap<FootballData>>;
	/**足球列表 单关*/
	public _mZQLBDG:GHashMap<GHashMap<FootballData>>;

	/**超级足球 串关*/
	public _mCJZQLB:GHashMap<GHashMap<FootballData>>;
	/**足球列表 单关*/
	public _mCJZQLBDG:GHashMap<GHashMap<FootballData>>;

	/**足球对应名称 0-53 */
	public fbNameItem = ["胜","平","负","胜","平","负","1:0","2:0","2:1","3:0","3:1","3:2","4:0","4:1","4:2","5:0","5:1","5:2","胜其他","0:0","1:1","2:2","3:3","平其他","0:1","0:2","1:2","0:3","1:3","2:3","0:4","1:4","2:4","0:5","1:5","2:5","负其他","0球","1球",
	"2球","3球","4球","5球","6球","7+球","胜胜","胜平","胜负","平胜","平平","平负","负胜","负平","负负"];

	private constructor() {
		this._mZQLB = new GHashMap<GHashMap<FootballData>>();
		this._mCJZQLB = new GHashMap<GHashMap<FootballData>>();
		
		this._mZQLBDG = new GHashMap<GHashMap<FootballData>>();
		this._mZQLBDG2 = new GHashMap<GHashMap<FootballData>>();
		this._mZQLBDG3 = new GHashMap<GHashMap<FootballData>>();
		this._mZQLBDG4 = new GHashMap<GHashMap<FootballData>>();
		this._mZQLBDG5 = new GHashMap<GHashMap<FootballData>>();

		this._mCJZQLBDG = new GHashMap<GHashMap<FootballData>>();
		this._mCJZQLBDG2 = new GHashMap<GHashMap<FootballData>>();
		this._mCJZQLBDG3 = new GHashMap<GHashMap<FootballData>>();
		this._mCJZQLBDG4 = new GHashMap<GHashMap<FootballData>>();
		this._mCJZQLBDG5 = new GHashMap<GHashMap<FootballData>>();
	}

	/**
	 * 获取单关对象数据列表 
	 * 2=>单关胜平负 0 6
	 * 3=>单关进球数 37 44
	 * 4=>单关比分 6 36
	 * 5=>单关半全场 45 53
	*/
	public _mZQLBDG2:GHashMap<GHashMap<FootballData>>;
	public _mZQLBDG3:GHashMap<GHashMap<FootballData>>;
	public _mZQLBDG4:GHashMap<GHashMap<FootballData>>;
	public _mZQLBDG5:GHashMap<GHashMap<FootballData>>;

	private _mList:number[] = [0,0,0,37,6,45];
	public getDGList(type:number):GHashMap<GHashMap<FootballData>> {
		let list:GHashMap<GHashMap<FootballData>>;
		if(type == 2) {
			this._mZQLBDG2.clear();
			list = this._mZQLBDG2;
		} else if(type == 3) {
			this._mZQLBDG3.clear();
			list = this._mZQLBDG3;
		} else if(type == 4) {
			this._mZQLBDG4.clear();
			list = this._mZQLBDG4;
		} else if(type == 5) {
			this._mZQLBDG5.clear();
			list = this._mZQLBDG5;
		}

		let data:GHashMap<FootballData>;
		let fbData:FootballData;
		for(let key of this._mZQLBDG.keys) {
			data = this._mZQLBDG.Gget(key);
			for(let key1 of data.keys) {
				fbData = data.Gget(key1);
				if(fbData.listSX[this._mList[type]] != undefined) {
					list.Gput(""+key, data)
					break;
				}
			}
		}
		return list;
	}

	/**
	 * 超级获取单关对象数据列表 
	 * 2=>单关胜平负 0 6
	 * 3=>单关进球数 37 44
	 * 4=>单关比分 6 36
	 * 5=>单关半全场 45 53
	*/
	public _mCJZQLBDG2:GHashMap<GHashMap<FootballData>>;
	public _mCJZQLBDG3:GHashMap<GHashMap<FootballData>>;
	public _mCJZQLBDG4:GHashMap<GHashMap<FootballData>>;
	public _mCJZQLBDG5:GHashMap<GHashMap<FootballData>>;

	public getCJDGList(type:number):GHashMap<GHashMap<FootballData>> {
		let list:GHashMap<GHashMap<FootballData>>;
		if(type == 2) {
			this._mCJZQLBDG2.clear();
			list = this._mCJZQLBDG2;
		} else if(type == 3) {
			this._mCJZQLBDG3.clear();
			list = this._mCJZQLBDG3;
		} else if(type == 4) {
			this._mCJZQLBDG4.clear();
			list = this._mCJZQLBDG4;
		} else if(type == 5) {
			this._mCJZQLBDG5.clear();
			list = this._mCJZQLBDG5;
		}

		let data:GHashMap<FootballData>;
		let fbData:FootballData;
		for(let key of this._mCJZQLBDG.keys) {
			data = this._mCJZQLBDG.Gget(key);
			for(let key1 of data.keys) {
				fbData = data.Gget(key1);
				if(fbData.listSX[this._mList[type]] != undefined) {
					list.Gput(""+key, data)
					break;
				}
			}
		}
		return list;
	}

	

	/**添加数据 */
	public addData(time:string,fb:GHashMap<FootballData>):void {
		if(fb != undefined) {
			this._mZQLB.Gput(time,fb);
		}
	}	

	/**添加超级数据 */
	public addCJData(time:string,fb:GHashMap<FootballData>):void {
		if(fb != undefined) {
			this._mCJZQLB.Gput(time,fb);
		}
	}

	/**添加单关足球数据 */
	public addDGData(time:string,fb:GHashMap<FootballData>):void {
		if(fb != undefined) {
			this._mZQLBDG.Gput(time,fb);
		}
	}

	/**添加超级单关足球数据 */
	public addCJDGData(time:string,fb:GHashMap<FootballData>):void {
		if(fb != undefined) {
			this._mCJZQLBDG.Gput(time,fb);
		}
	}

	/**通过当天time 和 场次id获取对象 */
	public getData(time:string,id:number):FootballData {
		if(this._mZQLB[time] != undefined) {
			return this._mZQLB[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**超级通过当天time 和 场次id获取对象 */
	public getCJData(time:string,id:number):FootballData {
		if(this._mCJZQLB[time] != undefined) {
			return this._mCJZQLB[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**通过单关当天time获取对象*/
	public getDataByTime(time:string):GHashMap<FootballData> {
		return this._mZQLB[time];
	}

	/**超级通过单关当天time获取对象*/
	public getCJDataByTime(time:string):GHashMap<FootballData> {
		return this._mCJZQLB[time];
	}

	/**通过单关当天time获取对象*/
	public getDGDataByTime(time:string):GHashMap<FootballData> {
		return this._mZQLBDG[time];
	}

	/**通过超级单关当天time获取对象*/
	public getCJDGDataByTime(time:string):GHashMap<FootballData> {
		return this._mCJZQLBDG[time];
	}

	/**通过当天time 和 场次id获取单关足球对象 */
	public getDGData(time:string,id:number):FootballData {
		if(this._mZQLBDG[time] != undefined) {
			return this._mZQLBDG[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**通过超级当天time 和 场次id获取单关足球对象 */
	public getCJDGData(time:string,id:number):FootballData {
		if(this._mCJZQLBDG[time] != undefined) {
			return this._mCJZQLBDG[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**通过id获取对象 */
	public getDataById(id:number):FootballData {
		let fb:GHashMap<FootballData>;
		for(let key of this._mZQLB.keys) {
			fb = this._mZQLB.Gget(key);
			if(fb.Gget(id) != undefined) {
				return fb.Gget(id);
			}
		}

		return undefined;
	}

	/**超级通过id获取对象 */
	public getCJDataById(id:number):FootballData {
		let fb:GHashMap<FootballData>;
		for(let key of this._mCJZQLB.keys) {
			fb = this._mCJZQLB.Gget(key);
			if(fb.Gget(id) != undefined) {
				return fb.Gget(id);
			}
		}

		return undefined;
	}

	/**通过id获取对象 */
	public getDataDGById(id:number):FootballData {
		let fb:GHashMap<FootballData>;
		for(let key of this._mZQLBDG.keys) {
			fb = this._mZQLBDG.Gget(key);
			if(fb.Gget(id) != undefined) {
				return fb.Gget(id);
			}
		}

		return undefined;
	}

	/**通过超级id获取对象 */
	public getCJDataDGById(id:number):FootballData {
		let fb:GHashMap<FootballData>;
		for(let key of this._mCJZQLBDG.keys) {
			fb = this._mCJZQLBDG.Gget(key);
			if(fb.Gget(id) != undefined) {
				return fb.Gget(id);
			}
		}

		return undefined;
	}

	/**通过id和下标取对象 */
	public getDataByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<FootballData>;
		for(let key of this._mZQLB.keys) {
			fb = this._mZQLB.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**超级通过id和下标取对象 */
	public getCJDataByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<FootballData>;
		for(let key of this._mCJZQLB.keys) {
			fb = this._mCJZQLB.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**通过id和下标取对象 */
	public getDataDGByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<FootballData>;
		for(let key of this._mZQLBDG.keys) {
			fb = this._mZQLBDG.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**超级通过id和下标取对象 */
	public getCJDataDGByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<FootballData>;
		for(let key of this._mCJZQLBDG.keys) {
			fb = this._mCJZQLBDG.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}
}