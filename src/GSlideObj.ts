/**
 * 滑动组件优化 滑动组件 优化滚动列表较多情况下，可以手动设置显示条数
 */
class GSlideObj {
	public constructor() {

	}

	private _mShowMax:number;
	private _mSpace:number;
	private _mScroView:egret.ScrollView;
	private _mScroCon:egret.DisplayObjectContainer;
	private _mGameList:GHashMap<any>;
	private _mThisObj:any;
	private _mFun:Function;
	private _mDirection:number = 2

	/**
	 * showMax 显示最大条数
	 * space 当前条间隔 
	 * scroView 滑动对象
	 * scroCon 滑动容器
	 * gameList 数据列表(map数组 下表key 要从0开始)
	 * thisObj(可传)
	 * fun (可传 egret.Event.CHANGE事件)滑动时回调
	 * direction = 2默认竖向(1横向 2竖向)
	 * 
	 */
	public showDataByMap(showMax:number, space:number, scroView:egret.ScrollView, scroCon:egret.DisplayObjectContainer,gameList:GHashMap<any>,thisObj?:any,fun?:Function,direction?:number):void {
		this._mShowMax = showMax;
		this._mSpace = space;
		this._mScroView = scroView;
		this._mScroCon = scroCon;
		this._mGameList = gameList
		this._mThisObj = thisObj;
		this._mFun = fun;
		if(direction != undefined) {
			this._mDirection = direction
		}

		this.onChange()
		this._mScroView.addEventListener(egret.Event.CHANGE, this.onChange, this);
	}

	/**
	 * showMax 显示最大条数
	 * space 当前条间隔 
	 * scroView 滑动对象
	 * scroCon 滑动容器
	 * gameList 数据列表(Array 数组)
	 * thisObj(可传)
	 * fun (可传 egret.Event.CHANGE事件)滑动时回调
	 * direction = 2默认竖向(1横向 2竖向)
	 * 
	 */
	public showDataByArray(showMax:number, space:number, scroView:egret.ScrollView, scroCon:egret.DisplayObjectContainer,gameList:Array<any>,thisObj?:any,fun?:Function,direction?:number):void {
		this._mShowMax = showMax;
		this._mSpace = space;
		this._mScroView = scroView;
		this._mScroCon = scroCon;
		if(this._mGameList == undefined) {
			this._mGameList = new GHashMap<any>();
		}
		for(let i=0;i<gameList.length;i++) {
			this._mGameList.Gput(i, gameList[i]) 
		}
		
		this._mThisObj = thisObj;
		this._mFun = fun;
		if(direction != undefined) {
			this._mDirection = direction
		}

		this.onChange()
		this._mScroView.addEventListener(egret.Event.CHANGE, this.onChange, this);
	}

	private onChange(event?: egret.Event) {
		let obj: any;
		let top: number = Math.floor(this._mScroView.scrollTop / this._mSpace);

		let begin: number = top;
		let end: number = top + this._mShowMax;
		for (let i = 0; i < this._mGameList.size; i++) {
			if (this._mGameList.GhasKey(i) && (i < begin || i > end)) {
				obj = this._mGameList.Gget(i);
				if (obj.parent != undefined) {
					obj.parent.removeChild(obj)
				}
			}
		}
		for (let i = begin; i < end; i++) {
			if (this._mGameList.GhasKey(i)) {
				obj = this._mGameList.Gget(i);
				if (obj.parent == undefined)
					this._mScroCon.addChild(obj);
			}
		}
		
		if(this._mDirection == 1) {
			let width: number = (top + this._mShowMax) * this._mSpace;
			this._mScroCon.width = (top + this._mShowMax) * this._mSpace;
			if (this._mScroCon.width > (this._mGameList.size * this._mSpace)) {
				width = this._mGameList.size * this._mSpace;
			}
			this._mScroCon.width = width;
		} else {
			let height: number = (top + this._mShowMax) * this._mSpace;
			this._mScroCon.height = (top + this._mShowMax) * this._mSpace;
			if (this._mScroCon.height > (this._mGameList.size * this._mSpace)) {
				height = this._mGameList.size * this._mSpace;
			}
			this._mScroCon.height = height;
		}
		

		if(this._mFun != undefined) {
			this._mFun.call(this._mThisObj,event);
		}
	}

	/**
	 * 移除事件
	 */
	public removeEven():void {
		this._mScroView.removeEventListener(egret.Event.CHANGE, this.onChange, this);
	}

}