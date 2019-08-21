var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**实名认证数据类 */
var realnameData = (function () {
    function realnameData() {
    }
    Object.defineProperty(realnameData, "getInstance", {
        get: function () {
            if (realnameData._mInstance == undefined)
                realnameData._mInstance = new realnameData();
            return realnameData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**取字符串前三位和后四位*/
    realnameData.prototype.getstr = function (str) {
        if (str.length < 8)
            return str;
        var str1 = str;
        var str2 = str;
        var result = "";
        str1 = str1.slice(0, 3);
        str2 = str2.slice(str2.length - 4, str2.length);
        result = str1 + "****" + str2;
        return result;
    };
    realnameData.realName = ""; //真实姓名
    realnameData.identitNum = ""; //身份证号码
    return realnameData;
}());
__reflect(realnameData.prototype, "realnameData");
//# sourceMappingURL=realnameData.js.map