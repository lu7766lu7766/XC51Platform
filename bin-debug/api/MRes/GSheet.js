var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**大图加载器 */
var GSheet = (function () {
    function GSheet() {
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onLoadError, null);
        this.flashMap = new GHashMap();
        this.uiMap = new GHashMap();
    }
    GSheet.getInstance = function () {
        if (GSheet._mInstance == null) {
            GSheet._mInstance = new GSheet();
        }
        return GSheet._mInstance;
    };
    /**存储flash大图 */
    GSheet.prototype.saveFlash = function (key, texture) {
        this.flashMap.Gput(key, texture);
    };
    /**存储flash大图 */
    GSheet.prototype.saveUi = function (key, texture) {
        this.uiMap.Gput(key, texture);
    };
    GSheet.prototype.onLoadError = function (e) {
        egret.error("加载大图出错:" + e.resItem.name);
    };
    /**大图预加载 */
    GSheet.prototype.getResByUrl = function (groupName, callFun, thisObj, type) {
        if (GResCache.mIsDeBug)
            egret.log("请求加载游戏资源:" + groupName);
        RES.getResByUrl(GLoadModule.loadBaseUrl + groupName, callFun, thisObj, RES.ResourceItem.TYPE_SHEET);
    };
    /**获取大图资源 */
    GSheet.prototype.getRes = function (url) {
        var index = url.lastIndexOf('/');
        var textrueName = url.slice(index + 1).split(".")[0];
        if (index == -1) {
            return null;
        }
        if (url.indexOf("flash") >= 0 && this.flashMap.GhasKey(textrueName)) {
            return this.flashMap.Gget(textrueName);
        }
        else if (this.uiMap.GhasKey(textrueName)) {
            return this.uiMap.Gget(textrueName);
        }
        else {
            return null;
        }
    };
    GSheet._mInstance = null;
    /**默认路径 */
    GSheet.pathSheetFlash = "resource/assets/images/sheet/flash/";
    GSheet.pathSheetUI = "resource/assets/images/sheet/ui/";
    return GSheet;
}());
__reflect(GSheet.prototype, "GSheet");
//# sourceMappingURL=GSheet.js.map