class CacheMrg {
	private static _mInstance:CacheMrg;
	public static get getInstance():CacheMrg{
		if(CacheMrg._mInstance == undefined)
			CacheMrg._mInstance = new CacheMrg();
		return CacheMrg._mInstance;
	}

	/**看视频次数 */
	private _mVideoKey:string = "ssssvideo2";
	private _mVideoKeyHC:GHashMap<string>;

	/**永久数据 */
	private _mYJKey:string = "YJKey42";
	private _mYJHC:GHashMap<string>;

	/**上次登录时间 */
	private _mLastTimeKey:string = "LastTime";
	private _mLastTime:number = 0;

	private constructor() {
		this._mVideoKeyHC = new GHashMap<string>();
		this._mYJHC = new GHashMap<string>();

		this.init();
		this.checkOneDate(Date.parse(new Date().toString())/1000);
	}

	/**初始化 取缓存数据 */
	private init():void {
		let vSize:string = egret.localStorage.getItem(this._mVideoKey);
		if(vSize != undefined) {
			for(let i=0;i<Number(vSize);i++) {
				let val:string = egret.localStorage.getItem(this._mVideoKey + i);
				this._mVideoKeyHC.Gput((this._mVideoKey + i), val);
			}
		}

		let yjSize:string = egret.localStorage.getItem(this._mYJKey);
		if(yjSize != undefined) {
			for(let i=0;i<Number(yjSize);i++) {
				let val:string = egret.localStorage.getItem(this._mYJKey + i);
				this._mYJHC.Gput((this._mYJKey + i), val);
			}
		}

		//获取上次时间戳
		this._mLastTime = Number(egret.localStorage.getItem(this._mLastTimeKey));
		this._mLastTime = this._mLastTime == undefined?0:this._mLastTime;
	}

	/**保存缓存 (仅一天)*/
	public addVideoTime(val:string, times:number):void {
		let bool:boolean = false;
		for(let key of this._mVideoKeyHC.keys) {
			if(this._mVideoKeyHC.Gget(key) == val) {
				bool = true;
				break;
			}
		}
		if(bool == false) {
			this._mVideoKeyHC.Gput((this._mVideoKey + this._mVideoKeyHC.size), val);
			egret.localStorage.setItem(this._mVideoKey, ""+this._mVideoKeyHC.size);
			egret.localStorage.setItem((this._mVideoKey + (this._mVideoKeyHC.size - 1)), val);
		}
		
		egret.localStorage.setItem((this._mVideoKey + val), ""+times);
	}

	/**获取缓存 (仅一天) */
	public getVideoTime(val:string):number {
		let key:string;
		for(let i=0;i<this._mVideoKeyHC.size;i++) {
			key = this._mVideoKey + (i);
			if(this._mVideoKeyHC.GhasKey(key) && this._mVideoKeyHC.Gget(key) == val) {
				let aaa = egret.localStorage.getItem(this._mVideoKey + val);
				aaa = (aaa == undefined || aaa == "") ? "0" : aaa;
				return Number(aaa);
			}
		}
		return 0;
	}

	/**保存永久缓存 */
	public addYJTime(val:string, times:number | string):void {
		let bool:boolean = false;
		for(let key of this._mYJHC.keys) {
			if(this._mYJHC.Gget(key) == val) {
				bool = true;
				break;
			}
		}
		if(bool == false) {
			this._mYJHC.Gput((this._mYJKey + this._mYJHC.size), val);
			egret.localStorage.setItem(this._mYJKey, ""+this._mYJHC.size);
			egret.localStorage.setItem((this._mYJKey + (this._mYJHC.size - 1)), val);
		}
		
		egret.localStorage.setItem((this._mYJKey + val), ""+times);
	}

	/**获取永久次数 */
	public getYJTime(val:string): string {
		let key:string;
		for(let i=0;i<this._mYJHC.size;i++) {
			key = this._mYJKey + (i);
			if(this._mYJHC.GhasKey(key) && this._mYJHC.Gget(key) == val) {
				let aaa = egret.localStorage.getItem(this._mYJKey + val);
				aaa = (aaa == undefined || aaa == "") ? "0" : aaa;
				return aaa;
			}
		}
		return "0";
	}

	/**清空缓存数据(仅一天) */
	private cleanVideo():void {
		let key:string;
		for(let i=0;i<this._mVideoKeyHC.size;i++) {
			key = this._mVideoKey + i;
			if(this._mVideoKeyHC.GhasKey(key)) {
				egret.localStorage.removeItem(key);
				egret.localStorage.removeItem(this._mVideoKey + this._mVideoKeyHC.Gget(key));
				this._mVideoKeyHC.Gput(key, "0");
			}
		}

		egret.localStorage.removeItem(this._mVideoKey);
	}

	/**是否过了一天 */
	private checkOneDate(time:number):boolean {
		let now = new Date(time*1000).toDateString();
		let last = new Date(this._mLastTime*1000).toDateString();
		if(this._mLastTime > 0 && now == last) {//同一天
			return false;
		} else {
			egret.localStorage.setItem(this._mLastTimeKey, ""+time);
			this.cleanVideo();
			return true;
		}
	}
}