var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**加载网络图片 */
var LoadNetPic = (function () {
    function LoadNetPic() {
    }
    Object.defineProperty(LoadNetPic, "getLoadNetPic", {
        /**获取本类 */
        get: function () {
            var mallObj = GObjPool.getInstance.GgetObj(LoadNetPic);
            if (mallObj == undefined) {
                mallObj = new LoadNetPic();
            }
            return mallObj;
        },
        enumerable: true,
        configurable: true
    });
    //加载网络头像
    LoadNetPic.prototype.loadPic = function (url, func, thisObj) {
        if (url == "" || url == undefined) {
            GObjPool.getInstance.Gadd2Pool(this);
            this.clean();
            return;
        }
        this.func = func;
        this.thisObj = thisObj;
        var imgLoader = new egret.ImageLoader();
        imgLoader.crossOrigin = "anonymous";
        imgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
        imgLoader.load(url);
    };
    LoadNetPic.prototype.imgLoadHandler = function (evt) {
        var loader = evt.currentTarget;
        // var bmd: egret.BitmapData = loader.data;
        var texture = new egret.Texture();
        texture._setBitmapData(loader.data);
        this.func.call(this.thisObj, texture);
        GObjPool.getInstance.Gadd2Pool(this);
        this.clean();
    };
    LoadNetPic.prototype.clean = function () {
        this.func = undefined;
        this.thisObj = undefined;
    };
    return LoadNetPic;
}());
__reflect(LoadNetPic.prototype, "LoadNetPic", ["GIObjPool"]);
//# sourceMappingURL=LoadNetPic.js.map