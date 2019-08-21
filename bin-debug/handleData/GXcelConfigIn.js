var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**xcel配置文件读取 */
var GXcelConfig = (function () {
    function GXcelConfig() {
        this._mUrl = "resource/assets/fy.txt";
        /**类型 */
        this.mType = RES.ResourceItem.TYPE_JSON;
        /**是否加载完 */
        this.mLoadFinish = true;
    }
    Object.defineProperty(GXcelConfig, "getInstance", {
        get: function () {
            if (GXcelConfig._mInstance == null) {
                GXcelConfig._mInstance = new GXcelConfig();
            }
            return GXcelConfig._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**配置文件进行加载 */
    GXcelConfig.prototype.beginLoadConfig = function (configIn) {
        this.configIn = configIn;
        this.mLoadFinish = false;
        RES.getResByUrl(GLoadModule.loadBaseUrl + this._mUrl, this.loadBack, this, this.mType);
    };
    /**加载完毕返回 */
    GXcelConfig.prototype.loadBack = function (data, url) {
        if (data == undefined) {
            this.mLoadFinish = true;
            return;
        }
        /**数据读取 */
        this.configIn.readData(data);
    };
    /**设置加载完成*/
    GXcelConfig.prototype.setFinishLoad = function (bool) {
        this.mLoadFinish = bool;
    };
    /**获取加载进度参数 */
    GXcelConfig.prototype.getLoadFinish = function () {
        return this.mLoadFinish;
    };
    GXcelConfig._mInstance = null;
    return GXcelConfig;
}());
__reflect(GXcelConfig.prototype, "GXcelConfig");
//# sourceMappingURL=GXcelConfigIn.js.map