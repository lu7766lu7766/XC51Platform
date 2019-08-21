class GResCache {
	private static _mTypeConfig: Object = {};
	private static _mInit: boolean = false;
	public static mIsDeBug: boolean = true;
	public static mResGroupConfig: Object;

	private static init(): void {
		if (GResCache._mInit === false) {
			GResCache._mInit = true;
			RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, GResCache.onLoadError, null);
		}
	}

	public static getResGroupConfig(name: string): Object {
		if (GResCache.mResGroupConfig == undefined || GResCache.mResGroupConfig[name] == undefined)
			return null;
		return GResCache.mResGroupConfig[name];
	}

	private static onLoadError(e: RES.ResourceEvent): void {
		egret.error("加载资源出错:" + e.resItem.name);
	}

	public static loadResByUrl(url: string, callFun: Function, thisObj: any, type?: string): void {
		GResCache.init();
		if (type == undefined) {
			if (GResCache._mTypeConfig[url])
				type = GResCache._mTypeConfig[url];
			else
				type = GResCache.getTypeByUrl(url);
		}
		if (type == '') {
			egret.error("加载资源:" + url + "类型有误");
			return;
		}
		if (GResCache.mIsDeBug)
			egret.log("请求加载游戏资源:" + url);
		GResCache._mTypeConfig[url] = type;
		RES.getResByUrl(GLoadModule.loadBaseUrl + url, callFun, thisObj, type);
	}

	public static delete(url: string): void {
		RES.destroyRes(url);
		delete GResCache._mTypeConfig[url];
	}

	public static getRes(url: string, type?: string): any {
		url = url.replace(GLoadModule.loadBaseUrl,'');
		let obj:any = GSheet.getInstance().getRes(url);
		if(obj != undefined) {
			return obj;
		} else {
			if (!GResCache._mTypeConfig[url])
			return null;
			if (type == undefined)
				type = GResCache._mTypeConfig[url];
			return this.getEgretRes(url,type);			
		}
	}

	public static getEgretRes(url:string,type?:string):any{
		if (type == undefined)
				type = this.getTypeByUrl(url);
			let mag: RES.AnalyzerBase = RES.getAnalyzer(type);
			let res = mag.getRes(url);
			if(res != undefined)
				return res;
			return mag.getRes(GLoadModule.loadBaseUrl + url);
	}

	public static getTypeByUrl(url: string): string {
		let index: number = url.lastIndexOf('.');
		if (index == -1)
			return '';
		let type: string = url.slice(index + 1);
		if (type == 'json')
			return RES.ResourceItem.TYPE_JSON;
		else if (type == 'png' || type == 'jpg')
			return RES.ResourceItem.TYPE_IMAGE;
		else if (type == 'fnt')
			return RES.ResourceItem.TYPE_FONT;
		else if (type == 'mp3' || type == 'wav')
			return RES.ResourceItem.TYPE_SOUND;
		return ''
	}
}
