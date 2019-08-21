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
    var MUIWnd = (function (_super) {
        __extends(MUIWnd, _super);
        function MUIWnd() {
            var _this = _super.call(this) || this;
            /**正在加载界面*/
            _this._mLoading = false;
            /**正在显示缓动*/
            _this._mActionShow = false;
            /**正在隐藏缓动*/
            _this._mActionHide = false;
            /**是否显示加载UI*/
            _this._mShowLoadUI = false;
            /**是否加遮罩 */
            _this._mIsOpenMask = false;
            /**遮罩显示对象 */
            _this._mUiMask = null;
            /**遮罩透明度*/
            _this._mMaskAlpha = 0.7;
            /**遮罩父类 */
            _this._mShowParent = null;
            /**tween 时间是否已结束 */
            _this._mTweenFinish = true;
            return _this;
        }
        MUIWnd.prototype.GWndConfig = function (wndName, parent, showType, showLoadUI, isMask) {
            if (isMask === void 0) { isMask = false; }
            this._mWndName = wndName;
            this._mShowParent = parent;
            this._mPater = parent;
            this._mShowType = showType == undefined ? WndShowType.NONE : showType;
            this._mShowLoadUI = showLoadUI == undefined ? false : showLoadUI;
            this._mIsOpenMask = isMask;
        };
        MUIWnd.prototype.loadWndRes = function () {
            _super.prototype.GinitUIConfig.call(this, this._mWndName);
        };
        MUIWnd.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            this._mLoading = false;
            this._mInit = true;
            if (this._mShowLoadUI)
                this.hideLoadingUI();
            this.addZH();
            this.actionShow();
        };
        MUIWnd.prototype.show = function () {
            if (this._mTweenFinish == false) {
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
        };
        /**添加遮罩 */
        MUIWnd.prototype.addZH = function () {
            if (this._mIsOpenMask && this._mUiMask == undefined) {
                this._mUiMask = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/heise.png'));
                this._mUiMask.width = GUIManager.getInstance.stage.stageWidth;
                this._mUiMask.height = GUIManager.getInstance.stage.stageHeight;
                this._mUiMask.touchEnabled = true;
                this.setMaskAlpha(this._mMaskAlpha);
            }
        };
        /**
         * 设置遮罩透明度
         * @param val 0- 1  默认 0.5
         */
        MUIWnd.prototype.setMaskAlpha = function (val) {
            var self = this;
            if (self._mUiMask == null)
                return;
            self._mMaskAlpha = val > 0 ? (val > 1 ? 1 : val) : 0;
            self._mUiMask.alpha = self._mMaskAlpha;
        };
        MUIWnd.prototype.actionShow = function () {
            if (this._mLoading)
                return;
            if (this._mPater != null && this._mPater.contains(this) == false) {
                if (this._mUiMask && !this._mUiMask.parent) {
                    this._mShowParent.addChild(this._mUiMask);
                }
                this._mPater.addChild(this);
            }
            egret.Tween.removeTweens(this);
            // this.x = (this.stage.width - this.width) * 0.5;
            // this.y = (this.stage.height - this.height) * 0.5;
            var tw;
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
                    var toY = this.y;
                    this.y = -this.height;
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
        };
        MUIWnd.prototype.endShow = function () {
            this._mActionShow = false;
            this.onShow();
            this.addEvent();
        };
        MUIWnd.prototype.removeChildMask = function () {
            if (this._mUiMask && this._mUiMask.parent)
                this._mUiMask.parent.removeChild(this._mUiMask);
        };
        MUIWnd.prototype.endHide = function () {
            this._mTweenFinish = true;
            this._mActionHide = false;
            if (this.parent != null) {
                this.parent.removeChild(this);
            }
            this.removeEvent();
            this.onHide();
        };
        MUIWnd.prototype.hide = function () {
            if (this._mActionHide)
                return;
            if (!this._mInit)
                return;
            egret.Tween.removeTweens(this);
            var tw;
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
                default:
                    this.endHide();
                    break;
            }
            this.removeChildMask();
        };
        MUIWnd.prototype.addEvent = function () { };
        MUIWnd.prototype.removeEvent = function () { };
        MUIWnd.prototype.onShow = function () { };
        MUIWnd.prototype.onHide = function () { };
        Object.defineProperty(MUIWnd.prototype, "getZZ", {
            /**获取遮罩层 */
            get: function () {
                return this._mUiMask;
            },
            enumerable: true,
            configurable: true
        });
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
        MUIWnd.prototype.showLoadingUI = function () {
            MLoadingUI.getInstance.show();
        };
        MUIWnd.prototype.hideLoadingUI = function () {
            MLoadingUI.getInstance.hide();
        };
        return MUIWnd;
    }(MDisplay.MUISprite));
    MDisplay.MUIWnd = MUIWnd;
    __reflect(MUIWnd.prototype, "MDisplay.MUIWnd");
    var WndShowType;
    (function (WndShowType) {
        WndShowType[WndShowType["NONE"] = 0] = "NONE";
        /** 从上面落下 */
        WndShowType[WndShowType["DROP"] = 1] = "DROP";
        /** 缩放 */
        WndShowType[WndShowType["SCALE"] = 2] = "SCALE";
        /**渐现**/
        WndShowType[WndShowType["ALPHA"] = 3] = "ALPHA";
    })(WndShowType = MDisplay.WndShowType || (MDisplay.WndShowType = {}));
    var MLoadingUI = (function (_super) {
        __extends(MLoadingUI, _super);
        function MLoadingUI() {
            var _this = _super.call(this) || this;
            _this._mLoadingBmp = new egret.Bitmap();
            return _this;
        }
        Object.defineProperty(MLoadingUI, "getInstance", {
            get: function () {
                if (MLoadingUI._mInstance == undefined)
                    MLoadingUI._mInstance = new MLoadingUI();
                return MLoadingUI._mInstance;
            },
            enumerable: true,
            configurable: true
        });
        MLoadingUI.prototype.show = function () {
            if (this._mLoadingBmp.$bitmapData == undefined)
                this._mLoadingBmp.$bitmapData = GResCache.getRes('resource/assets/egret_icon.png');
            GUIManager.getInstance.topLay.addChild(this._mLoadingBmp);
            if (this.stage != null) {
                this._mLoadingBmp.x = (this.stage.stageWidth - this._mLoadingBmp.width) * 0.5;
                this._mLoadingBmp.y = (this.stage.stageHeight - this._mLoadingBmp.height) * 0.5;
            }
        };
        MLoadingUI.prototype.hide = function () {
            if (this._mLoadingBmp.parent != null)
                this._mLoadingBmp.parent.removeChild(this._mLoadingBmp);
        };
        return MLoadingUI;
    }(MDisplay.MUISprite));
    MDisplay.MLoadingUI = MLoadingUI;
    __reflect(MLoadingUI.prototype, "MDisplay.MLoadingUI");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MUIWnd.js.map