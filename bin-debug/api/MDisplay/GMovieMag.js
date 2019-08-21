var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GMovieMag = (function () {
    function GMovieMag() {
        this._mConfigDataMap = new GHashMap();
        this._mEnterFrameItems = new GHashMap();
    }
    Object.defineProperty(GMovieMag, "getInstance", {
        get: function () {
            if (GMovieMag._mInstance == undefined)
                GMovieMag._mInstance = new GMovieMag();
            return GMovieMag._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GMovieMag.prototype.GonEnterFrame = function () {
        var keys = this._mEnterFrameItems.keys;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var temp = this._mEnterFrameItems.Gget(key);
            temp.Mupdate();
        }
    };
    GMovieMag.prototype.Madd2EnterFrame = function (mc) {
        if (mc == undefined)
            return;
        this._mEnterFrameItems.Gput(mc.hashCode, mc);
    };
    GMovieMag.prototype.MremoveEnterFrame = function (mc) {
        if (mc == undefined)
            return;
        this._mEnterFrameItems.GremoveByKey(mc.hashCode);
    };
    /**
     * 获取MC对象
     * @param 	url				MC动画配置文件名 不包含.json后缀名
     * @param	start			动画开始帧数 如果设置为0 则默认从动画第一帧开始播放
     * @param	end				动画结束帧数 如果设置为0 则默认完全播放结束
     * @param	isloop			动画是否循环播放
     * @param	isAutoClean		动画播放完后 是否自动添加到对象池
     * @returns					最终MC结果对象
     */
    GMovieMag.prototype.GgetMovieClip = function (url, start, end, isloop, isAutoClean) {
        var data = this._mConfigDataMap.Gget(url);
        if (data == null) {
            data = new MDisplay.MMovieClipData();
            this._mConfigDataMap.Gput(url, data);
        }
        data.MloadConfig(url);
        var mc = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
        if (mc == null)
            mc = new MDisplay.MMovieClip();
        mc.MsetConfigData(data, start, end, isloop, isAutoClean);
        return mc;
    };
    return GMovieMag;
}());
__reflect(GMovieMag.prototype, "GMovieMag");
//# sourceMappingURL=GMovieMag.js.map