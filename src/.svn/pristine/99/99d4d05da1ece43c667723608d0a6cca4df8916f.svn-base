/**xcel配置文件读取 */
class GXcelConfig {
	private static _mInstance:GXcelConfig = null;
	public static get getInstance():GXcelConfig{
		if(GXcelConfig._mInstance == null){
			GXcelConfig._mInstance = new GXcelConfig();
		}
		return GXcelConfig._mInstance;
	}
	private _mUrl:string = "resource/assets/fy.txt";
	/**类型 */
	private mType:string = RES.ResourceItem.TYPE_JSON;
	/**是否加载完 */
	private mLoadFinish:boolean = true;
	/**读取数据时返回类 */
	private configIn:GXcelConfigIn;

	private constructor() {
	}

	/**配置文件进行加载 */
	public beginLoadConfig(configIn:GXcelConfigIn):void {
		this.configIn = configIn;
		this.mLoadFinish = false;
		RES.getResByUrl(GLoadModule.loadBaseUrl + this._mUrl, this.loadBack, this, this.mType);
	}

	/**加载完毕返回 */
	private loadBack(data:any,url:string): void {
		if(data == undefined) {
			this.mLoadFinish = true;
			return;
		}
		/**数据读取 */
		this.configIn.readData(data);
	}

	/**设置加载完成*/
	public setFinishLoad(bool:boolean):void {
		this.mLoadFinish = bool;
	}

	/**获取加载进度参数 */
	public getLoadFinish():boolean {
		return this.mLoadFinish;
	}
}

interface GXcelConfigIn {
	readData(data);
}