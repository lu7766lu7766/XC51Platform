/**大图加载器 */
class GSheet {
	private static _mInstance:GSheet = null;
	public static getInstance():GSheet{
		if(GSheet._mInstance == null){
			GSheet._mInstance = new GSheet();
		}
		return GSheet._mInstance;
	}
	/**默认路径 */
	public static pathSheetFlash:string = "resource/assets/images/sheet/flash/";
	public static pathSheetUI:string = "resource/assets/images/sheet/ui/";

	/**flash大图缓存图片map */
	private flashMap:GHashMap<egret.Texture>;
	/**ui大图缓存图片map */
	private uiMap:GHashMap<egret.Texture>;

	private constructor() {
		RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onLoadError, null);

		this.flashMap = new GHashMap<egret.Texture>();
		this.uiMap = new GHashMap<egret.Texture>();
	}

	/**存储flash大图 */
	public saveFlash(key:string, texture:egret.Texture):void {
		this.flashMap.Gput(key, texture);
	}

	/**存储flash大图 */
	public saveUi(key:string, texture:egret.Texture):void {
		this.uiMap.Gput(key, texture);
	}

	private onLoadError(e: RES.ResourceEvent): void {
		egret.error("加载大图出错:" + e.resItem.name);
	}

	/**大图预加载 */
	public getResByUrl(groupName : string, callFun: Function, thisObj: any, type?: string): void {
		if (GResCache.mIsDeBug)
			egret.log("请求加载游戏资源:" + groupName);
		RES.getResByUrl(GLoadModule.loadBaseUrl + groupName, callFun, thisObj, RES.ResourceItem.TYPE_SHEET);
	}

	/**获取大图资源 */
	public getRes(url : string): any {
		let index: number = url.lastIndexOf('/');
		let textrueName:string = url.slice(index + 1).split(".")[0];
		if (index == -1) {
			return null;
		}

		if(url.indexOf("flash") >= 0 && this.flashMap.GhasKey(textrueName)) {
			return this.flashMap.Gget(textrueName);
		} else if(this.uiMap.GhasKey(textrueName)) {
			return this.uiMap.Gget(textrueName);
		} else {
			return null;
		}
	}

}