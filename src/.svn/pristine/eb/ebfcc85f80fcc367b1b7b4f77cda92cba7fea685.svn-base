class OffNet extends MDisplay.MUISprite {
	private static mInstance:OffNet;
	public static get getInstance():OffNet{
		if(this.mInstance == undefined)
			this.mInstance = new OffNet();
		return this.mInstance;
	}

	/**播放loading动画 */
	private _mLoadingMC:MDisplay.MMovieClip;
	private mBg: egret.Bitmap;

	private constructor() {
		super();
		
		this.mBg = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/heise.png'));
		this.mBg.alpha = 0.7;
		this.addChildAt(this.mBg, 0);
	}

	public show():void{
		if(this.parent == undefined) {
			GUIManager.getInstance.mostLay.addChild(this);
		}
		this.playLoading();
	}

	/**播放宝箱动画 */
	private playLoading():void {
		if(this._mLoadingMC != undefined)
			return;
		this.cleanLoading1();
		this._mLoadingMC = GMovieMag.getInstance.GgetMovieClip('mcNetLoading',undefined, undefined, true);
		this._mLoadingMC.x = 270;
		this._mLoadingMC.y = 439;

		this.addChild(this._mLoadingMC);
	}

	/**清除laoding动画 */
	private cleanLoading1() {
		if(this._mLoadingMC != undefined) {
			GObjPool.getInstance.Gadd2Pool(this._mLoadingMC);
			if(this._mLoadingMC.parent != undefined) {
				this._mLoadingMC.parent.removeChild(this._mLoadingMC);
			}
			delete this._mLoadingMC;
		}
	}

	public hide():void{
		if(this.parent != undefined) {
			this.parent.removeChild(this);
		}
		this.cleanLoading1();
	}
}