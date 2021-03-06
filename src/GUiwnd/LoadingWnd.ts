namespace GUiwnd {
	export class LoadingWnd extends MDisplay.MUIWnd {
		private static _mInstance: LoadingWnd;
		public static get getInstance(): LoadingWnd {
			if (LoadingWnd._mInstance == undefined)
				LoadingWnd._mInstance = new LoadingWnd();
			return LoadingWnd._mInstance;
		}
		private _mLoadMod1: GLoadModule;
		/**资源加载完毕 */
		private _mResourcesFinish: boolean = false;
		/**HTTP游戏数据请求完毕 */
		private _mHTTPDataFinish: boolean = false;
		/**是否非法用户 */
		private _mIllegalUser: boolean = false;
		/**至少2秒时间进入游戏 */
		private _mTime: number = 10;
		/**初始化完成 */
		private _mInitSuc: boolean = false;
		private _mLoadTotal: number = 0;

		/**进度条 */
		private link: egret.Bitmap;

		private ui: MDisplay.MUISprite;

		public constructor() {
			super();

			// this.ui = new MDisplay.MUISprite();
			// this.ui.GinitUIConfig("loadWnd");
			// this.addChild(this.ui);

			// this.link = new egret.Bitmap();
			// RES.getResByUrl("resource/assets/images/ui/jdt2_loading.png", this.setLink, this, RES.ResourceItem.TYPE_IMAGE);
			// this.addChild(this.link);
			this.setDB();
			// this.GWndConfig("", GUIManager.getInstance.bgLay, MDisplay.WndShowType.ALPHA);
			this._mLoadMod1 = new GLoadModule();
   
		}

		protected onInit(): void {
			super.onInit();
			if (window["onLoadInit"] != undefined)
				window["onLoadInit"]();
			JiaZaiWnd.getInstance.show();

			this._mLoadMod1.Gbegin(this.playLoading, this);
			GUIManager.getInstance.bgLay.addChild(this);
			this._mInitSuc = true;
			this.loadingNum();

			this.resourcesLoad();
		}
		private setLink(data: any, url: string): void {
			if (data != undefined) {
				this.link.$setBitmapData(data);
				this.link.x = 218;
				this.link.y = 589;
				this.link.width = 0;
			}
		}

		private changeWidth(cw: number): void {
			// egret.Tween.get(this.link).to( {width:cw}, 100, egret.Ease.sineIn );
			// this.link.width = cw;
		}

		public show(): void {
			if (this._mInit == false) {
				this.onInit();
			}
			super.show();
		}

		/**开始播放loading动画 */
		private playLoading(): void {
			if (UserData.getInstance.userId != "-1") {//不是非法用户
				this._mIllegalUser = true;
			}
			// GSocketMager.getInstance.createSocket(GameValue.socketUrl, ProManager.getInstance);
			// GSocketMager.getInstance.createSocket("echo.websocket.org", ProManager.getInstance);
		}

		private loadingNum() {
		}

		/**资源加载 */
		private resourcesLoad(): void {
			// this._mLoadMod1.GaddItem('resource/assets/images/ui/qd_default@2x.png');
			//底部
			// this._mLoadMod1.GaddGroupRes('DownWnd.json', GLoadModule.GroupType_UI);

			//声音和字体加载
			// SoundMgr.preloadRes(this._mLoadMod1);
			// FontMgr.preloadRes(this._mLoadMod1);
			//加载字体
			// RES.getResByUrl("resource/assets/font/sc.ttf",()=>{},this);

			this._mLoadMod1.Gbegin(this.onLoaded, this);
			this._mLoadTotal = this._mLoadMod1.loadTotal;

		}

		private onLoaded(): void {
			if (GResCache.mIsDeBug) {
				egret.log("所有预加载的资源已经加载完毕");
				this.changeWidth(900);
			}

			this._mResourcesFinish = true;
		}
		public isLoad: boolean = false;
		public update(it: number): void {
			if (this._mLoadMod1.loadOverplus > 0 && GResCache.mIsDeBug) {
				egret.log('当前还剩余的加载数量为:' + this._mLoadMod1.loadOverplus);

				// (this._mLoadTotal - this._mLoadMod1.loadOverplus)*900/this._mLoadTotal;
				this.changeWidth((this._mLoadTotal - this._mLoadMod1.loadOverplus) * 900 / this._mLoadTotal);
			}
			this._mTime -= it;
			if (this._mInitSuc) {
				let process = 1 - this._mLoadMod1.loadOverplus / this._mLoadTotal;
				process = process > 1 ? 1 : process;
				let posX = -229 + process * 398;
				let num = Math.floor(process * 100);

				if (this._mResourcesFinish == false && num == 100) {
					this._mResourcesFinish = true;
				}
			}
			if (this._mResourcesFinish == true && this.isLoad == false && this._mTime <= 0 && this._mIllegalUser == true && GXcelConfig.getInstance.getLoadFinish() == true) {
				this.isLoad = true;
				// window["hideAppBg"]();
			}
		}

		public hide(): void {
			super.hide();
			if (this.parent != undefined) {
				this.parent.removeChild(this);
			}
		}

		private _mShareC: egret.Shape;
		/**适配处理 */
		private setDB(): void {
			this._mShareC = new egret.Shape();
			this._mShareC.graphics.beginFill(0xffffff, 1);
			this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
			this._mShareC.graphics.endFill();
			this.addChildAt(this._mShareC, 0);
		}
	}
}