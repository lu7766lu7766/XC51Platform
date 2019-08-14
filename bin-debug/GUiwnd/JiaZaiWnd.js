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
var JiaZaiWnd = (function (_super) {
    __extends(JiaZaiWnd, _super);
    function JiaZaiWnd() {
        var _this = _super.call(this) || this;
        /**初始化完成 */
        _this._mInitSuc = false;
        _this._mLoadTotal = 0;
        _this.GWndConfig("", GUIManager.getInstance.bgLay, MDisplay.WndShowType.NONE);
        _this._mLoadMod1 = new GLoadModule();
        return _this;
    }
    Object.defineProperty(JiaZaiWnd, "getInstance", {
        get: function () {
            if (JiaZaiWnd._mInstance == undefined)
                JiaZaiWnd._mInstance = new JiaZaiWnd();
            return JiaZaiWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    JiaZaiWnd.prototype.onInit = function () {
        _super.prototype.onInit.call(this);
        this._mInitSuc = true;
        this.resourcesLoad();
    };
    /**资源加载 */
    JiaZaiWnd.prototype.resourcesLoad = function () {
        egret.log("开始资源加载");
        this._mLoadMod1.GaddItem('resource/assets/images/ui/qd_default@2x.png');
        this._mLoadMod1.GaddItem('resource/assets/images/ui/select_home@2x.png');
        this._mLoadMod1.GaddItem('resource/assets/images/ui/select_nor_home@2x.png');
        this._mLoadMod1.Gbegin(this.onLoaded, this);
    };
    JiaZaiWnd.prototype.show = function () {
        if (this._mInit == false) {
            this.onInit();
        }
        _super.prototype.show.call(this);
    };
    JiaZaiWnd.prototype.onLoaded = function () {
        if (GResCache.mIsDeBug)
            egret.log("所有预加载的资源已经加载完毕");
    };
    JiaZaiWnd.prototype.hide = function () {
        _super.prototype.hide.call(this);
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return JiaZaiWnd;
}(MDisplay.MUIWnd));
__reflect(JiaZaiWnd.prototype, "JiaZaiWnd");
//# sourceMappingURL=JiaZaiWnd.js.map