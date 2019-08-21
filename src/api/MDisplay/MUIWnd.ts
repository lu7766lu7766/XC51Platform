namespace MDisplay {
	export class MUIWnd extends MUISprite {
		private _mWndName: string;
		private _mShowType: WndShowType;
		/**正在加载界面*/
		private _mLoading: boolean = false;
		/**正在显示缓动*/
		private _mActionShow: boolean = false;
		/**正在隐藏缓动*/
		private _mActionHide: boolean = false;
		/**是否显示加载UI*/
		private _mShowLoadUI: boolean = false;
		/**是否加遮罩 */
		private _mIsOpenMask:boolean = false;
		/**遮罩显示对象 */
		private _mUiMask:egret.Bitmap = null;
		/**遮罩透明度*/
        private _mMaskAlpha:number = 0.7;
		/**遮罩父类 */
		private _mShowParent:egret.DisplayObjectContainer = null;
		/**tween 时间是否已结束 */
		private _mTweenFinish:boolean = true;
		public constructor() {
			super();
		}
		
		public GWndConfig(wndName: string, parent: egret.DisplayObjectContainer, showType?: WndShowType, showLoadUI?: boolean, isMask:boolean = false): void {
			this._mWndName = wndName;
			this._mShowParent = parent;
			this._mPater = parent;
			this._mShowType = showType == undefined ? WndShowType.NONE : showType;
			this._mShowLoadUI = showLoadUI == undefined ? false : showLoadUI;
			this._mIsOpenMask = isMask;
		}

		private loadWndRes(): void {
			super.GinitUIConfig(this._mWndName);
		}

		protected onInit(): void {
			super.onInit();
			this._mLoading = false;
			this._mInit = true;
			if (this._mShowLoadUI)
				this.hideLoadingUI();
			this.addZH();
			this.actionShow();
		}

		public show(): void {
			if(this._mTweenFinish == false) {
				return;
			}
			this._mTweenFinish = false;
			if (this._mInit == false) {
				if (this._mShowLoadUI)
					this.showLoadingUI();
				this._mLoading = true;
				this.loadWndRes();
				return;
			} 
			this.addZH();
			this.actionShow();
		}

		/**添加遮罩 */
		private addZH():void {
			if(this._mIsOpenMask && this._mUiMask == undefined){//初始化遮罩
                this._mUiMask = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/heise.png'));
				this._mUiMask.width = GUIManager.getInstance.stage.stageWidth;
				this._mUiMask.height = GUIManager.getInstance.stage.stageHeight;
                this._mUiMask.touchEnabled = true;
                this.setMaskAlpha(this._mMaskAlpha);
            }
		}

		/**
         * 设置遮罩透明度
         * @param val 0- 1  默认 0.5
         */
        public setMaskAlpha(val:number):void{
            let self = this;
            if(self._mUiMask == null) return;
            self._mMaskAlpha = val > 0 ? ( val > 1 ? 1 : val) : 0;
            self._mUiMask.alpha = self._mMaskAlpha;
        }

		private actionShow() {
			if (this._mLoading)
				return;
			if (this._mPater != null && this._mPater.contains(this) == false) {
				if(this._mUiMask && !this._mUiMask.parent) {//遮罩层添加
					this._mShowParent.addChild(this._mUiMask);
				}
				this._mPater.addChild(this);
			}
			egret.Tween.removeTweens(this);
			// this.x = (this.stage.width - this.width) * 0.5;
			// this.y = (this.stage.height - this.height) * 0.5;
			let tw;
			switch (this._mShowType) {
				case WndShowType.ALPHA:
					this._mActionShow = true;
					this.alpha = 0.1;
					tw = egret.Tween.get(this);
					tw.to({ alpha: 1 }, 300);
					tw.call(this.endShow, this);
					break;
				case WndShowType.DROP:
					this._mActionShow = true;
					let toY: number = this.y;
					this.y = - this.height;
					tw = egret.Tween.get(this);
					tw.to({ y: toY }, 250, egret.Ease.backIn);
					tw.call(this.endShow, this);
					break;
				case WndShowType.SCALE:
					this._mActionShow = true;
					this.anchorOffsetX = this.width * 0.5;
					this.anchorOffsetY = this.height * 0.5;
					this.scaleX = 0.1;
					this.scaleY = 0.1;
					tw = egret.Tween.get(this);
					tw.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.getBackInOut(1));
					tw.call(this.endShow, this);
					break;
				default:
					tw = egret.Tween.get(this);
					tw.wait(80);
					tw.call(this.endShow, this);
					break;
			}
		}

		private endShow(): void {
			this._mActionShow = false;
			this.onShow();
			this.addEvent();
		}

		private removeChildMask(){
            if(this._mUiMask && this._mUiMask.parent)
                this._mUiMask.parent.removeChild(this._mUiMask);
        }

		private endHide(): void {
			this._mTweenFinish = true;
			this._mActionHide = false;
			if (this.parent != null) {
				this.parent.removeChild(this);
			}
			this.removeEvent();
			this.onHide();
		}

		public hide(): void {
			if (this._mActionHide)
				return;
			if (!this._mInit)
				return;
			egret.Tween.removeTweens(this);
			let tw;
			switch (this._mShowType) {
				case WndShowType.SCALE:
					this._mActionHide = true;
					this.scaleX = 1;
					this.scaleY = 1;
					tw = egret.Tween.get(this);
					tw.to({ scaleX: 0.1, scaleY: 0.1 }, 200);
					tw.call(this.endHide, this);
					break;
				case WndShowType.DROP:
				case WndShowType.ALPHA:
					this._mActionHide = true;
					this.alpha = 1;
					tw = egret.Tween.get(this);
					tw.to({ alpha: 0.1 }, 300);
					tw.call(this.endHide, this);
					break;
				default: this.endHide();
					break;
			}

			this.removeChildMask();
		}

		protected addEvent(): void {}
		protected removeEvent(): void {}
		protected onShow(): void {}
		protected onHide(): void {}

		/**获取遮罩层 */
		public get getZZ():egret.Bitmap {
			return this._mUiMask;
		}

		// /**
		//  * 销毁
		//  * 如需要销毁界面，重写此方法
		//  * 因UI界面会有消失的动画
		//  * 所以destory()必须在动画播放完之后调用
		//  * 最后要手动把单例设成null
		//  */
		// public static destory(){
		// 	GUtil.removeAllChildrens(this);
		// }

		private showLoadingUI(): void {
			MLoadingUI.getInstance.show();
		}

		private hideLoadingUI(): void {
			MLoadingUI.getInstance.hide();
		}

	}
	export enum WndShowType {
		NONE,
		/** 从上面落下 */
		DROP,
		/** 缩放 */
		SCALE,
		/**渐现**/
		ALPHA,
	}
	export class MLoadingUI extends MUISprite {
		private static _mInstance: MLoadingUI;
		public static get getInstance(): MLoadingUI {
			if (MLoadingUI._mInstance == undefined)
				MLoadingUI._mInstance = new MLoadingUI();
			return MLoadingUI._mInstance;
		}
		private _mLoadingBmp: egret.Bitmap;

		public constructor() {
			super();
			this._mLoadingBmp = new egret.Bitmap();
		}

		public show(): void {
			if (this._mLoadingBmp.$bitmapData == undefined)
				this._mLoadingBmp.$bitmapData = GResCache.getRes('resource/assets/egret_icon.png')
			GUIManager.getInstance.topLay.addChild(this._mLoadingBmp);
			if(this.stage != null){
				this._mLoadingBmp.x = (this.stage.stageWidth - this._mLoadingBmp.width) * 0.5;
				this._mLoadingBmp.y = (this.stage.stageHeight - this._mLoadingBmp.height) * 0.5;
			}
			
		}

		public hide(): void {
			if (this._mLoadingBmp.parent != null)
				this._mLoadingBmp.parent.removeChild(this._mLoadingBmp);
		}
	}
}