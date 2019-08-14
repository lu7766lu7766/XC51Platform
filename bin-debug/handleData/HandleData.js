var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HandleData = (function () {
    function HandleData() {
    }
    Object.defineProperty(HandleData, "getInstance", {
        get: function () {
            if (HandleData._mInstance == null) {
                HandleData._mInstance = new HandleData();
            }
            return HandleData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**数据读取 */
    HandleData.prototype.readData = function (data) {
        //设置读取配置完成 (必须要加上)
        GXcelConfig.getInstance.setFinishLoad(true);
    };
    HandleData._mInstance = null;
    return HandleData;
}());
__reflect(HandleData.prototype, "HandleData", ["GXcelConfigIn"]);
//# sourceMappingURL=HandleData.js.map