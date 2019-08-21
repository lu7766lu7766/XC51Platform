class GMovieMag {
	private static _mInstance:GMovieMag;
	public static get getInstance():GMovieMag{
		if(GMovieMag._mInstance == undefined)
			GMovieMag._mInstance = new GMovieMag();
		return GMovieMag._mInstance;
	}
	/**动画配置数据列表 */
	private _mConfigDataMap:GHashMap<MDisplay.MMovieClipData>;
	/**每帧更新的MC列表 */
	private _mEnterFrameItems:GHashMap<MDisplay.MMovieClip>;
	private constructor() {
		this._mConfigDataMap = new GHashMap<MDisplay.MMovieClipData>();
		this._mEnterFrameItems = new GHashMap<MDisplay.MMovieClip>();
	}

	public GonEnterFrame():void{
		let keys:Array<any> = this._mEnterFrameItems.keys;
		for(let key of keys){
			let temp:MDisplay.MMovieClip = this._mEnterFrameItems.Gget(key);
			temp.Mupdate();
		}
	}

	public Madd2EnterFrame(mc:MDisplay.MMovieClip):void{
		if(mc == undefined)
			return;
		this._mEnterFrameItems.Gput(mc.hashCode,mc);
	}

	public MremoveEnterFrame(mc:MDisplay.MMovieClip):void{
		if(mc == undefined)
			return;
		this._mEnterFrameItems.GremoveByKey(mc.hashCode);
	}

	/**
	 * 获取MC对象
	 * @param 	url				MC动画配置文件名 不包含.json后缀名
	 * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
	 * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
	 * @param	isloop			动画是否循环播放
	 * @param	isAutoClean		动画播放完后 是否自动添加到对象池
	 * @returns					最终MC结果对象
	 */
	public GgetMovieClip(url:string,start?:number,end?:number,isloop?:boolean,isAutoClean?:boolean):MDisplay.MMovieClip{
		let data:MDisplay.MMovieClipData = this._mConfigDataMap.Gget(url);
		if(data == null){
			data = new MDisplay.MMovieClipData();
			this._mConfigDataMap.Gput(url,data);
		}
		data.MloadConfig(url);
		let mc:MDisplay.MMovieClip = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
		if(mc == null)
			mc = new MDisplay.MMovieClip();
		mc.MsetConfigData(data,start,end,isloop,isAutoClean);	
		return mc;		
	}

	
}
