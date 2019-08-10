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
var GUiwnd;
(function (GUiwnd) {
    var LoadingWnd = (function (_super) {
        __extends(LoadingWnd, _super);
        function LoadingWnd() {
            var _this = _super.call(this) || this;
            /**资源加载完毕 */
            _this._mResourcesFinish = false;
            /**HTTP游戏数据请求完毕 */
            _this._mHTTPDataFinish = false;
            /**是否非法用户 */
            _this._mIllegalUser = false;
            /**至少2秒时间进入游戏 */
            _this._mTime = 10;
            /**初始化完成 */
            _this._mInitSuc = false;
            _this._mLoadTotal = 0;
            _this.isLoad = false;
            // this.ui = new MDisplay.MUISprite();
            // this.ui.GinitUIConfig("loadWnd");
            // this.addChild(this.ui);
            // this.link = new egret.Bitmap();
            // RES.getResByUrl("resource/assets/images/ui/jdt2_loading.png", this.setLink, this, RES.ResourceItem.TYPE_IMAGE);
            // this.addChild(this.link);
            _this.setDB();
            // this.GWndConfig("", GUIManager.getInstance.bgLay, MDisplay.WndShowType.ALPHA);
            _this._mLoadMod1 = new GLoadModule();
            return _this;
        }
        Object.defineProperty(LoadingWnd, "getInstance", {
            get: function () {
                if (LoadingWnd._mInstance == undefined)
                    LoadingWnd._mInstance = new LoadingWnd();
                return LoadingWnd._mInstance;
            },
            enumerable: true,
            configurable: true
        });
        LoadingWnd.prototype.onInit = function () {
            _super.prototype.onInit.call(this);
            if (window["onLoadInit"] != undefined)
                window["onLoadInit"]();
            JiaZaiWnd.getInstance.show();
            this._mLoadMod1.Gbegin(this.playLoading, this);
            GUIManager.getInstance.bgLay.addChild(this);
            this._mInitSuc = true;
            this.loadingNum();
            this.resourcesLoad();
        };
        LoadingWnd.prototype.setLink = function (data, url) {
            if (data != undefined) {
                this.link.$setBitmapData(data);
                this.link.x = 218;
                this.link.y = 589;
                this.link.width = 0;
            }
        };
        LoadingWnd.prototype.changeWidth = function (cw) {
            // egret.Tween.get(this.link).to( {width:cw}, 100, egret.Ease.sineIn );
            // this.link.width = cw;
        };
        LoadingWnd.prototype.show = function () {
            if (this._mInit == false) {
                this.onInit();
            }
            _super.prototype.show.call(this);
        };
        /**开始播放loading动画 */
        LoadingWnd.prototype.playLoading = function () {
            if (UserData.getInstance.userId != "-1") {
                this._mIllegalUser = true;
            }
            // GSocketMager.getInstance.createSocket(GameValue.socketUrl, ProManager.getInstance);
            // GSocketMager.getInstance.createSocket("echo.websocket.org", ProManager.getInstance);
        };
        LoadingWnd.prototype.loadingNum = function () {
        };
        /**资源加载 */
        LoadingWnd.prototype.resourcesLoad = function () {
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
        };
        LoadingWnd.prototype.onLoaded = function () {
            if (GResCache.mIsDeBug) {
                egret.log("所有预加载的资源已经加载完毕");
                this.changeWidth(900);
            }
            this._mResourcesFinish = true;
        };
        LoadingWnd.prototype.update = function (it) {
            if (this._mLoadMod1.loadOverplus > 0 && GResCache.mIsDeBug) {
                egret.log('当前还剩余的加载数量为:' + this._mLoadMod1.loadOverplus);
                // (this._mLoadTotal - this._mLoadMod1.loadOverplus)*900/this._mLoadTotal;
                this.changeWidth((this._mLoadTotal - this._mLoadMod1.loadOverplus) * 900 / this._mLoadTotal);
            }
            this._mTime -= it;
            if (this._mInitSuc) {
                var process = 1 - this._mLoadMod1.loadOverplus / this._mLoadTotal;
                process = process > 1 ? 1 : process;
                var posX = -229 + process * 398;
                var num = Math.floor(process * 100);
                if (this._mResourcesFinish == false && num == 100) {
                    this._mResourcesFinish = true;
                }
            }
            if (this._mResourcesFinish == true && this.isLoad == false && this._mTime <= 0 && this._mIllegalUser == true && GXcelConfig.getInstance.getLoadFinish() == true) {
                this.isLoad = true;
                // window["hideAppBg"]();
            }
        };
        LoadingWnd.prototype.hide = function () {
            _super.prototype.hide.call(this);
            if (this.parent != undefined) {
                this.parent.removeChild(this);
            }
        };
        /**适配处理 */
        LoadingWnd.prototype.setDB = function () {
            this._mShareC = new egret.Shape();
            this._mShareC.graphics.beginFill(0xffffff, 1);
            this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
            this._mShareC.graphics.endFill();
            this.addChildAt(this._mShareC, 0);
        };
        return LoadingWnd;
    }(MDisplay.MUIWnd));
    GUiwnd.LoadingWnd = LoadingWnd;
    __reflect(LoadingWnd.prototype, "GUiwnd.LoadingWnd");
})(GUiwnd || (GUiwnd = {}));
//# sourceMappingURL=LoadingWnd.js.map