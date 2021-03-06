 class JiaZaiWnd extends MDisplay.MUIWnd {
		private static _mInstance: JiaZaiWnd;
		public static get getInstance(): JiaZaiWnd {
			if (JiaZaiWnd._mInstance == undefined)
				JiaZaiWnd._mInstance = new JiaZaiWnd();
			return JiaZaiWnd._mInstance;
		}
		private _mLoadMod1: GLoadModule;
		/**初始化完成 */
		private _mInitSuc: boolean = false;
		private _mLoadTotal: number = 0;

		public constructor() {
			super();
			this.GWndConfig("", GUIManager.getInstance.bgLay, MDisplay.WndShowType.NONE);
			this._mLoadMod1 = new GLoadModule();
		}

		protected onInit(): void {
			super.onInit();
			this._mInitSuc = true;
			this.resourcesLoad();
		}

		/**资源加载 */
		private resourcesLoad(): void {
			egret.log("开始资源加载");
			this._mLoadMod1.GaddItem('resource/assets/images/ui/qd_default@2x.png');
			this._mLoadMod1.GaddItem('resource/assets/images/ui/select_home@2x.png');
			this._mLoadMod1.GaddItem('resource/assets/images/ui/select_nor_home@2x.png');
			this._mLoadMod1.Gbegin(this.onLoaded, this);
		}

		public show():void {
			if(this._mInit == false) {
				this.onInit();
			}
			super.show();
		}

		private onLoaded(): void {
			if (GResCache.mIsDeBug)
				egret.log("所有预加载的资源已经加载完毕");
		}


		public hide(): void {
			super.hide();
			if (this.parent != undefined) {
				this.parent.removeChild(this);
			}
		}
	}
