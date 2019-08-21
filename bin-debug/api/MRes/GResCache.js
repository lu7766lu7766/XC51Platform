var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GResCache = (function () {
    function GResCache() {
    }
    GResCache.init = function () {
        if (GResCache._mInit === false) {
            GResCache._mInit = true;
            RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, GResCache.onLoadError, null);
        }
    };
    GResCache.getResGroupConfig = function (name) {
        if (GResCache.mResGroupConfig == undefined || GResCache.mResGroupConfig[name] == undefined)
            return null;
        return GResCache.mResGroupConfig[name];
    };
    GResCache.onLoadError = function (e) {
        egret.error("加载资源出错:" + e.resItem.name);
    };
    GResCache.loadResByUrl = function (url, callFun, thisObj, type) {
        GResCache.init();
        if (type == undefined) {
            if (GResCache._mTypeConfig[url])
                type = GResCache._mTypeConfig[url];
            else
                type = GResCache.getTypeByUrl(url);
        }
        if (type == '') {
            egret.error("加载资源:" + url + "类型有误");
            return;
        }
        if (GResCache.mIsDeBug)
            egret.log("请求加载游戏资源:" + url);
        GResCache._mTypeConfig[url] = type;
        RES.getResByUrl(GLoadModule.loadBaseUrl + url, callFun, thisObj, type);
    };
    GResCache.delete = function (url) {
        RES.destroyRes(url);
        delete GResCache._mTypeConfig[url];
    };
    GResCache.getRes = function (url, type) {
        url = url.replace(GLoadModule.loadBaseUrl, '');
        var obj = GSheet.getInstance().getRes(url);
        if (obj != undefined) {
            return obj;
        }
        else {
            if (!GResCache._mTypeConfig[url])
                return null;
            if (type == undefined)
                type = GResCache._mTypeConfig[url];
            return this.getEgretRes(url, type);
        }
    };
    GResCache.getEgretRes = function (url, type) {
        if (type == undefined)
            type = this.getTypeByUrl(url);
        var mag = RES.getAnalyzer(type);
        var res = mag.getRes(url);
        if (res != undefined)
            return res;
        return mag.getRes(GLoadModule.loadBaseUrl + url);
    };
    GResCache.getTypeByUrl = function (url) {
        var index = url.lastIndexOf('.');
        if (index == -1)
            return '';
        var type = url.slice(index + 1);
        if (type == 'json')
            return RES.ResourceItem.TYPE_JSON;
        else if (type == 'png' || type == 'jpg')
            return RES.ResourceItem.TYPE_IMAGE;
        else if (type == 'fnt')
            return RES.ResourceItem.TYPE_FONT;
        else if (type == 'mp3' || type == 'wav')
            return RES.ResourceItem.TYPE_SOUND;
        return '';
    };
    GResCache._mTypeConfig = {};
    GResCache._mInit = false;
    GResCache.mIsDeBug = true;
    return GResCache;
}());
__reflect(GResCache.prototype, "GResCache");
//# sourceMappingURL=GResCache.js.map