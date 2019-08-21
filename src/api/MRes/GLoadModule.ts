class GLoadModule {
	public static GroupType_UI:string = 'GroupLoadType_UI';
	public static GroupType_Flash:string = 'GroupLoadType_Flash';
	public static GroupType_SheetFlash:string = 'GroupLoadType_SheetFlash';
	public static GroupType_SheetUI:string = 'GroupLoadType_SheetUI';

	public static loadBaseUrl:string = '';
	/**普通加载 */
	private _mLoadArr:Array<string>;
	/**大图加载 */
	private _mLoadSheetArr:Array<string>;

	private _mCallBackFun:Function;
	private _mThisObj:any;
	private _mLoadTotal:number;
	public constructor() {
		this._mLoadArr = new Array();
		this._mLoadSheetArr = new Array();
	}

	public GaddItem(Url:string):void{
		if(GResCache.getRes(Url) != null)
			return;
		this._mLoadArr.push(Url);
	}

	public GaddGroupRes(groupName:string,type?:string):boolean{
		if(type != undefined && type == GLoadModule.GroupType_SheetFlash) {
			this._mLoadSheetArr.push(GSheet.pathSheetFlash + groupName);
		} else if(type != undefined && type == GLoadModule.GroupType_SheetUI) {
			this._mLoadSheetArr.push(GSheet.pathSheetUI + groupName);
		} else {
			let data:Object = GResCache.getResGroupConfig(groupName);		
			if(data == null){
				egret.error('加载组资源时出错 不存在对应命名的配置:' + groupName);
				return false;
			}
			let images:Array<string> = data['images'];
			let baseUrl:string = data['base'];
			for(let image of images){
				this.GaddItem(baseUrl + image);
			}
			if(type == GLoadModule.GroupType_UI){
				this.GaddItem(MDisplay.MUISprite.UIConfigUrl + groupName);
			}else if(type == GLoadModule.GroupType_Flash)
				this.GaddItem(MDisplay.MMovieClipData.configFileBaseUrl + groupName);
		}
		return true;
	}
	
	private removeItem(Url:string):void{
		let index:number = this._mLoadArr.indexOf(Url);
		if(index > -1)
			this._mLoadArr.splice(index,1);
	} 

	/**移除大图列表 */
	private removeSheetItem(Url:string):void {
		Url = Url.replace(GLoadModule.loadBaseUrl,'');
		let index:number = this._mLoadSheetArr.indexOf(Url);
		if(index > -1)
			this._mLoadSheetArr.splice(index,1);
	}

	public Gbegin(callFun:Function,thisObj:any):void{
		this._mCallBackFun = callFun;
		this._mThisObj = thisObj;
		this._mLoadTotal = this._mLoadArr.length + this._mLoadSheetArr.length;
		if(this._mLoadTotal == 0){
			this._mCallBackFun.call(this._mThisObj);
			return;
		}

		this.loadSheet();
	}

	/**优先处理 预加载大图 */
	private loadSheet():void {
		let total:number = 0;
		for(let temp of this._mLoadSheetArr){
			GSheet.getInstance().getResByUrl(temp,this.onLoadSheet,this);
			total ++;
		}
		if(total == 0)
			this.checkIsEndSheet();
	}

	/**大图加载完毕 回调*/
	private onLoadSheet(data:any,url:string):void {
		if(data == undefined)
			return;
		if(url.indexOf("flash") >= 0) {
			//存储大图
			for(const key in data._textureMap) {
				GSheet.getInstance().saveFlash(key, data._textureMap[key]);
			}
		}

		if(url.indexOf("ui") >= 0) {
			//存储大图
			for(const key in data._textureMap) {
				GSheet.getInstance().saveUi(key, data._textureMap[key]);
			}
		}
		
		this.removeSheetItem(url);
		this.checkIsEndSheet();
	}

	/**大图加载完毕检测 */
	private checkIsEndSheet():void {
		if(this._mLoadSheetArr.length <= 0 && this._mCallBackFun !== undefined){
			this.loadOrdinary();
		}
	}

	/**普通加载 */
	private loadOrdinary():void {
		let total:number = 0;
		let temp;
		for (let i:number = this._mLoadArr.length - 1; i >= 0; i--) {
			temp = this._mLoadArr[i];
			if(GResCache.getRes(temp) != null){
				this.removeItem(temp);
			}else{
				GResCache.loadResByUrl(temp,this.onLoaded,this);
				total ++;
			}
		}
		if(total == 0)
			this.checkIsEnd();
	}

	private onLoaded(data:any,url:string){
		if(data == undefined)
			return;
		url = url.replace(GLoadModule.loadBaseUrl,'');
		this.removeItem(url);
		this.checkIsEnd();
	}

	private checkIsEnd():void{
		if(this._mLoadArr.length <= 0 && this._mCallBackFun !== undefined){
			this._mLoadTotal = 0;
			this._mCallBackFun.call(this._mThisObj);
		}
	}

	public get loadTotal():number{
		return this._mLoadTotal;
	}

	/**
	 * 当前还剩待加载的资源数
	* @returns  		剩待加载的资源数
	*/
	public get loadOverplus():number{
		return this._mLoadArr.length + this._mLoadSheetArr.length;
	}
}
