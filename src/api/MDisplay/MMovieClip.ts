namespace MDisplay {
	export class MMovieClip extends egret.DisplayObjectContainer implements GIObjPool {
		/**动画配置数据 */
		private _mConfigData: MMovieClipData;
		/**当前动画播放到的帧数 */
		private _mCurrentFramIndex: number = 1;
		/**手动配置的动画起始帧数 如果为0 表示从第1帧开始播放*/
		private _mStartFrameIndex: number = 0;
		/**手动配置的动画结束帧数 如果为0 表示播放到原始动画的最后一帧*/
		private _mEndFrameIndex: number = 0;
		/**动画是否循环播放 */
		private _mIsLoop: boolean = true;
		/**动画播放完后 是否自动清除 */
		private _mAutoClean: boolean = false;
		/**动画当前是否暂停 */
		private _mIsPause: boolean = true;
		/**动画总帧数 */
		private _mTotalFrames: number;

		public constructor() {
			super();
		}

		public MsetConfigData(data: MMovieClipData, start?: number, end?: number, isloop?: boolean, isAutoClean?: boolean): void {
			this._mConfigData = data;
			this._mTotalFrames = data.mFrameTotal;
			this._mIsPause = false;
			this.GgoToAndPlay(start, end, isloop, isAutoClean);
			GMovieMag.getInstance.Madd2EnterFrame(this);
		}

		/**
		 * 设置MC对象的相关属性
		* @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
		* @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
		* @param	isloop			动画是否循环播放
		* @param	isAutoClean		动画播放完后 是否自动添加到对象池
		 */
		public GgoToAndPlay(start?: number, end?: number, isloop?: boolean, isAutoClean?: boolean): void {
			this._mStartFrameIndex = start == undefined ? 0 : start;
			this._mEndFrameIndex = end == undefined ? 0 : end;
			this._mIsLoop = isloop == undefined ? true : isloop;
			this._mAutoClean = isAutoClean == undefined ? false : isAutoClean;
			this._mIsPause = false;
			this._mCurrentFramIndex = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
		}

		/**
		 * 暂停动画播放 必须是在动画已经初始化完毕 暂停才有效
		 */
		public GPause(){
			if(this._mConfigData.mIsInit)
				this._mIsPause = true;				
		}

		/**
		 * 播放动画 必须是在动画已经初始化完毕 播放才有效
		 */
		public GPlay(){
			if(this._mConfigData.mIsInit)
				this._mIsPause = false;	
		}

		public Mupdate(): void {
			if (this._mConfigData.mIsInit == false || this._mIsPause)
				return;
			let frame: MFramData = this._mConfigData.GgetFrameData(this._mCurrentFramIndex);
			if (frame == null)
				return;
			let items: Array<MDisplayConfig> = frame.displays;
			let childLen: number = this.numChildren;
			for (let i = 0, l = items.length; i < l; i++) {
				let item: MDisplayConfig = items[i];
				let tempBm: egret.Bitmap;
				if (i < childLen)
					tempBm = <egret.Bitmap>this.getChildAt(i);
				else
					tempBm = new egret.Bitmap();
				tempBm.$setBitmapData (GResCache.getRes(item.mImagePath, RES.ResourceItem.TYPE_IMAGE));
				tempBm.x = item.mX;
				tempBm.y = item.mY;
				tempBm.scaleX = item.mScaleX;
				tempBm.scaleY = item.mScaleY;
				tempBm.name = item.mName;
				if (item.mSkewX != item.mSkewY) {
					tempBm.skewX = item.mSkewX;
					tempBm.skewY = item.mSkewY;
					tempBm.rotation = 0;
				} else {
					tempBm.rotation = item.mRotation;
					tempBm.skewX = 0;
					tempBm.skewY = 0;
				}
				tempBm.alpha = item.mAlpha;
				if (i >= childLen)
					this.addChild(tempBm);
			}
			if (this.hasEventListener(GMovieClipEvent.playing))
				this.dispatchEventWith(GMovieClipEvent.playing, false, this);
			while (this.numChildren > items.length)
				this.removeChildAt(this.numChildren - 1);
			this.updateFrameIndex();
		}

		private updateFrameIndex(): void {
			let end: number = this._mEndFrameIndex == 0 ? this._mConfigData.mFrameTotal : this._mEndFrameIndex;
			let start: number = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
			if (this._mCurrentFramIndex >= end) {
				if (this._mIsLoop) {
					this._mCurrentFramIndex = start;
				} else {
					this._mIsPause = true;
					this.dispatchEventWith(GMovieClipEvent.played, false, this);
					if (this._mAutoClean)
						GObjPool.getInstance.Gadd2Pool(this);
				}
			} else
				this._mCurrentFramIndex++;
		}

		public clean(): void {
			GMovieMag.getInstance.MremoveEnterFrame(this);
			if (this.parent != null)
				this.parent.removeChild(this);
			this.removeChildren();
			this.x = 0;
			this.y = 0;
			this.anchorOffsetX = 0;
			this.anchorOffsetY = 0;
			this.scaleX = 1;
			this.scaleY = 1;
			this.alpha = 1;
		}

		public get mTotalFrames(): number {
			return this._mTotalFrames;
		}

		public get mCurrentFramIndex(): number {
			return this._mCurrentFramIndex;
		}
	}
}