/**加载网络图片 */
class LoadNetPic implements GIObjPool {
	/**获取本类 */
	public static get getLoadNetPic():LoadNetPic {
		let mallObj:LoadNetPic = GObjPool.getInstance.GgetObj(LoadNetPic);
		if(mallObj == undefined) {
			mallObj = new LoadNetPic();
		}
		return mallObj;
	}

	private constructor() {

	}

	private func:Function;
	private thisObj:any;
	//加载网络头像
	public loadPic(url:string, func:Function, thisObj:any):void {
		if(url == "" ||url == undefined) {
			GObjPool.getInstance.Gadd2Pool(this);
			this.clean();
			return;
		}
		this.func = func;
		this.thisObj = thisObj;

		var imgLoader: egret.ImageLoader = new egret.ImageLoader();
		imgLoader.crossOrigin = "anonymous";
		imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
		imgLoader.load(url);
	}

	private imgLoadHandler(evt: egret.Event): void {
		var loader: egret.ImageLoader = evt.currentTarget;
		// var bmd: egret.BitmapData = loader.data;
		let texture = new egret.Texture();
        texture._setBitmapData(loader.data);
		this.func.call(this.thisObj, texture);

		GObjPool.getInstance.Gadd2Pool(this);
		this.clean();
	}

	public clean():void {
		this.func = undefined;
		this.thisObj = undefined;
	}
}