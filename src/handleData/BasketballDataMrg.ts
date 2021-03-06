class BasketballDataMrg {
	private static _mInstance: BasketballDataMrg;
	public static get getInstance(): BasketballDataMrg {
		if (BasketballDataMrg._mInstance == undefined)
			BasketballDataMrg._mInstance = new BasketballDataMrg();
		return BasketballDataMrg._mInstance;
	}
	/**篮球列表 串关*/
	public _mLQLB:GHashMap<GHashMap<BasketballData>>;
	/**篮球列表 单关*/
	public _mLQLBDG:GHashMap<GHashMap<BasketballData>>;

	/**超级篮球列表 */
	public _mCJLQLB:GHashMap<GHashMap<BasketballData>>;
	/**超级篮球列表 单关*/
	public _mCJLQLBDG:GHashMap<GHashMap<BasketballData>>;

	/**篮球 0-17 */
	public BasketballList = ["客胜","主胜","客胜","主胜","1-5","6-10","11-15","16-20","21-25","26+","1-5","6-10","11-15","16-20","21-25","26+","大分","小分"];
	private constructor() {
		this._mLQLB = new GHashMap<GHashMap<BasketballData>>();
		this._mLQLBDG = new GHashMap<GHashMap<BasketballData>>();

		this._mLQLBDG2 = new GHashMap<GHashMap<BasketballData>>();
		this._mLQLBDG3 = new GHashMap<GHashMap<BasketballData>>();
		this._mLQLBDG4 = new GHashMap<GHashMap<BasketballData>>();
		this._mLQLBDG5 = new GHashMap<GHashMap<BasketballData>>();

		this._mCJLQLB = new GHashMap<GHashMap<BasketballData>>();
		this._mCJLQLBDG = new GHashMap<GHashMap<BasketballData>>();

		this._mCJLQLBDG2 = new GHashMap<GHashMap<BasketballData>>();
		this._mCJLQLBDG3 = new GHashMap<GHashMap<BasketballData>>();
		this._mCJLQLBDG4 = new GHashMap<GHashMap<BasketballData>>();
		this._mCJLQLBDG5 = new GHashMap<GHashMap<BasketballData>>();
	}

	/**
	 * 篮球单关
	 * 2=>单关让分胜负 2 - 3
	 * 3=>单关胜负 0 - 1
	 * 4=>单关大小分 16 - 17
	 * 5=>单关胜分差 4 - 15
	*/
	public _mLQLBDG2:GHashMap<GHashMap<BasketballData>>;
	public _mLQLBDG3:GHashMap<GHashMap<BasketballData>>;
	public _mLQLBDG4:GHashMap<GHashMap<BasketballData>>;
	public _mLQLBDG5:GHashMap<GHashMap<BasketballData>>;

	private _mList:number[] = [0,0,2,0,16,15];
	public getDGList(type:number):GHashMap<GHashMap<BasketballData>> {
		let list:GHashMap<GHashMap<BasketballData>>;
		if(type == 2) {
			this._mLQLBDG2.clear();
			list = this._mLQLBDG2;
		} else if(type == 3) {
			this._mLQLBDG3.clear();
			list = this._mLQLBDG3;
		} else if(type == 4) {
			this._mLQLBDG4.clear();
			list = this._mLQLBDG4;
		} else if(type == 5) {
			this._mLQLBDG5.clear();
			list = this._mLQLBDG5;
		}

		let data:GHashMap<BasketballData>;
		let fbData:BasketballData;
		for(let key of this._mLQLBDG.keys) {
			data = this._mLQLBDG.Gget(key);
			for(let key1 of data.keys) {
				fbData = data.Gget(key1);
				if(fbData.listSX[this._mList[type]] != undefined) {
					list.Gput(key, data)
					break;
				}
			}
		}
		return list;
	}

	/**
	 * 篮球单关
	 * 2=>单关让分胜负 2 - 3
	 * 3=>单关胜负 0 - 1
	 * 4=>单关大小分 16 - 17
	 * 5=>单关胜分差 4 - 15
	*/
	public _mCJLQLBDG2:GHashMap<GHashMap<BasketballData>>;
	public _mCJLQLBDG3:GHashMap<GHashMap<BasketballData>>;
	public _mCJLQLBDG4:GHashMap<GHashMap<BasketballData>>;
	public _mCJLQLBDG5:GHashMap<GHashMap<BasketballData>>;

	public getCJDGList(type:number):GHashMap<GHashMap<BasketballData>> {
		let list:GHashMap<GHashMap<BasketballData>>;
		if(type == 2) {
			this._mCJLQLBDG2.clear();
			list = this._mCJLQLBDG2;
		} else if(type == 3) {
			this._mCJLQLBDG3.clear();
			list = this._mCJLQLBDG3;
		} else if(type == 4) {
			this._mCJLQLBDG4.clear();
			list = this._mCJLQLBDG4;
		} else if(type == 5) {
			this._mCJLQLBDG5.clear();
			list = this._mCJLQLBDG5;
		}

		let data:GHashMap<BasketballData>;
		let fbData:BasketballData;
		for(let key of this._mCJLQLBDG.keys) {
			data = this._mCJLQLBDG.Gget(key);
			for(let key1 of data.keys) {
				fbData = data.Gget(key1);
				if(fbData.listSX[this._mList[type]] != undefined) {
					list.Gput(key, data)
					break;
				}
			}
		}
		return list;
	}

	/**添加数据 */
	public addData(time:string,lq:GHashMap<BasketballData>):void {
		if(lq != undefined) {
			this._mLQLB.Gput(time,lq);
		}	
	}	

	/**超级添加数据 */
	public addCJData(time:string,lq:GHashMap<BasketballData>):void {
		if(lq != undefined) {
			this._mCJLQLB.Gput(time,lq);
		}
	}

	/**添加单关篮球数据 */
	public addDGData(time:string,fb:GHashMap<BasketballData>):void {
		if(fb != undefined) {
			this._mLQLBDG.Gput(time,fb);
		}
	}

	/**超级添加单关篮球数据 */
	public addCJDGData(time:string,fb:GHashMap<BasketballData>):void {
		if(fb != undefined) {
			this._mCJLQLBDG.Gput(time,fb);
		}
	}

	/**通过id获取对象 */
	public getData(time:string,id:number):BasketballData {
		if(this._mLQLB[time] != undefined) {
			return this._mLQLB[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**超级通过id获取对象 */
	public getCJData(time:string,id:number):BasketballData {
		if(this._mCJLQLB[time] != undefined) {
			return this._mCJLQLB[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**通过id获取对象 */
	public getDataById(id:number):BasketballData {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mLQLB.keys) {
			lq = this._mLQLB.Gget(key);
			if(lq.Gget(id) != undefined) {//
				return lq.Gget(id);
			}
		}

		return undefined;
	}

	/**超级通过id获取对象 */
	public getCJDataById(id:number):BasketballData {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mCJLQLB.keys) {
			lq = this._mCJLQLB.Gget(key);
			if(lq.Gget(id) != undefined) {//
				return lq.Gget(id);
			}
		}

		return undefined;
	}

	/**通过id获取对象 */
	public getDataDGById(id:number):BasketballData {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mLQLBDG.keys) {
			lq = this._mLQLBDG.Gget(key);
			if(lq.Gget(id) != undefined) {//
				return lq.Gget(id);
			}
		}

		return undefined;
	}

	/**超级通过id获取对象 */
	public getCJDataDGById(id:number):BasketballData {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mCJLQLBDG.keys) {
			lq = this._mCJLQLBDG.Gget(key);
			if(lq.Gget(id) != undefined) {//
				return lq.Gget(id);
			}
		}

		return undefined;
	}

	/**通过单关当天time获取对象*/
	public getDataByTime(time:string):GHashMap<BasketballData> {
		return this._mLQLB[time];
	}

	/**超级通过单关当天time获取对象*/
	public getCJDataByTime(time:string):GHashMap<BasketballData> {
		return this._mCJLQLB[time];
	}

	/**通过单关当天time获取对象*/
	public getDGDataByTime(time:string):GHashMap<BasketballData> {
		return this._mLQLBDG[time];
	}

	/**超级通过单关当天time获取对象*/
	public getCJDGDataByTime(time:string):GHashMap<BasketballData> {
		return this._mCJLQLBDG[time];
	}

	/**通过当天time 和 场次id获取单关足球对象 */
	public getDGData(time:string,id:number):BasketballData {
		if(this._mLQLBDG[time] != undefined) {
			return this._mLQLBDG[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**超级通过当天time 和 场次id获取单关足球对象 */
	public getCJDGData(time:string,id:number):BasketballData {
		if(this._mCJLQLBDG[time] != undefined) {
			return this._mCJLQLBDG[time].Gget(id);
		} else {
			return undefined;
		}
	}

	/**通过id和下标取对象 */
	public getDataByIdAndXB(id:number,xb:number):number {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mLQLB.keys) {
			lq = this._mLQLB.Gget(key);
			if(lq.Gget(id) != undefined ) {//
				return lq.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**超级 通过id和下标取对象 */
	public getCJDataByIdAndXB(id:number,xb:number):number {
		let lq:GHashMap<BasketballData>;
		for(let key of this._mCJLQLB.keys) {
			lq = this._mCJLQLB.Gget(key);
			if(lq.Gget(id) != undefined ) {//
				return lq.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**通过id和下标取对象 */
	public getDataDGByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<BasketballData>;
		for(let key of this._mLQLBDG.keys) {
			fb = this._mLQLBDG.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}

	/**超级 通过id和下标取对象 */
	public getCJDataDGByIdAndXB(id:number,xb:number):number {
		let fb:GHashMap<BasketballData>;
		for(let key of this._mCJLQLBDG.keys) {
			fb = this._mCJLQLBDG.Gget(key);
			if(fb.Gget(id) != undefined ) {//
				return fb.Gget(id).listSX[xb];
			}
		}
		return undefined;
	}
}