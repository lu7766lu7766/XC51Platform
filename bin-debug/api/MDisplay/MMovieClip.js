var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var MDisplay;
(function (MDisplay) {
    var MMovieClip = (function (_super) {
        __extends(MMovieClip, _super);
        function MMovieClip() {
            var _this = _super.call(this) || this;
            /**当前动画播放到的帧数 */
            _this._mCurrentFramIndex = 1;
            /**手动配置的动画起始帧数 如果为0 表示从第1帧开始播放*/
            _this._mStartFrameIndex = 0;
            /**手动配置的动画结束帧数 如果为0 表示播放到原始动画的最后一帧*/
            _this._mEndFrameIndex = 0;
            /**动画是否循环播放 */
            _this._mIsLoop = true;
            /**动画播放完后 是否自动清除 */
            _this._mAutoClean = false;
            /**动画当前是否暂停 */
            _this._mIsPause = true;
            return _this;
        }
        MMovieClip.prototype.MsetConfigData = function (data, start, end, isloop, isAutoClean) {
            this._mConfigData = data;
            this._mTotalFrames = data.mFrameTotal;
            this._mIsPause = false;
            this.GgoToAndPlay(start, end, isloop, isAutoClean);
            GMovieMag.getInstance.Madd2EnterFrame(this);
        };
        /**
         * 设置MC对象的相关属性
        * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
        * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
        * @param	isloop			动画是否循环播放
        * @param	isAutoClean		动画播放完后 是否自动添加到对象池
         */
        MMovieClip.prototype.GgoToAndPlay = function (start, end, isloop, isAutoClean) {
            this._mStartFrameIndex = start == undefined ? 0 : start;
            this._mEndFrameIndex = end == undefined ? 0 : end;
            this._mIsLoop = isloop == undefined ? true : isloop;
            this._mAutoClean = isAutoClean == undefined ? false : isAutoClean;
            this._mIsPause = false;
            this._mCurrentFramIndex = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
        };
        /**
         * 暂停动画播放 必须是在动画已经初始化完毕 暂停才有效
         */
        MMovieClip.prototype.GPause = function () {
            if (this._mConfigData.mIsInit)
                this._mIsPause = true;
        };
        /**
         * 播放动画 必须是在动画已经初始化完毕 播放才有效
         */
        MMovieClip.prototype.GPlay = function () {
            if (this._mConfigData.mIsInit)
                this._mIsPause = false;
        };
        MMovieClip.prototype.Mupdate = function () {
            if (this._mConfigData.mIsInit == false || this._mIsPause)
                return;
            var frame = this._mConfigData.GgetFrameData(this._mCurrentFramIndex);
            if (frame == null)
                return;
            var items = frame.displays;
            var childLen = this.numChildren;
            for (var i = 0, l = items.length; i < l; i++) {
                var item = items[i];
                var tempBm = void 0;
                if (i < childLen)
                    tempBm = this.getChildAt(i);
                else
                    tempBm = new egret.Bitmap();
                tempBm.$setBitmapData(GResCache.getRes(item.mImagePath, RES.ResourceItem.TYPE_IMAGE));
                tempBm.x = item.mX;
                tempBm.y = item.mY;
                tempBm.scaleX = item.mScaleX;
                tempBm.scaleY = item.mScaleY;
                tempBm.name = item.mName;
                if (item.mSkewX != item.mSkewY) {
                    tempBm.skewX = item.mSkewX;
                    tempBm.skewY = item.mSkewY;
                    tempBm.rotation = 0;
                }
                else {
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
        };
        MMovieClip.prototype.updateFrameIndex = function () {
            var end = this._mEndFrameIndex == 0 ? this._mConfigData.mFrameTotal : this._mEndFrameIndex;
            var start = this._mStartFrameIndex == 0 ? 1 : this._mStartFrameIndex;
            if (this._mCurrentFramIndex >= end) {
                if (this._mIsLoop) {
                    this._mCurrentFramIndex = start;
                }
                else {
                    this._mIsPause = true;
                    this.dispatchEventWith(GMovieClipEvent.played, false, this);
                    if (this._mAutoClean)
                        GObjPool.getInstance.Gadd2Pool(this);
                }
            }
            else
                this._mCurrentFramIndex++;
        };
        MMovieClip.prototype.clean = function () {
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
        };
        Object.defineProperty(MMovieClip.prototype, "mTotalFrames", {
            get: function () {
                return this._mTotalFrames;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(MMovieClip.prototype, "mCurrentFramIndex", {
            get: function () {
                return this._mCurrentFramIndex;
            },
            enumerable: true,
            configurable: true
        });
        return MMovieClip;
    }(egret.DisplayObjectContainer));
    MDisplay.MMovieClip = MMovieClip;
    __reflect(MMovieClip.prototype, "MDisplay.MMovieClip", ["GIObjPool"]);
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MMovieClip.js.map