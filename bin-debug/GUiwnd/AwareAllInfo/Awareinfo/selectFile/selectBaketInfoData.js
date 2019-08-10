var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**比分篮球筛选数据类*/
var selectBaketInfoData = (function () {
    function selectBaketInfoData() {
        this._mListObj = new GHashMap();
    }
    Object.defineProperty(selectBaketInfoData, "getInstance", {
        get: function () {
            if (selectBaketInfoData._mInstance == undefined)
                selectBaketInfoData._mInstance = new selectBaketInfoData();
            return selectBaketInfoData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表(全部)*/
    selectBaketInfoData.prototype.getlist = function () {
        return this._mListObj;
    };
    /**根据id查找对应数据(全部)*/
    selectBaketInfoData.prototype.getInfo = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    /**根据名字寻找是否存在对应的数据*/
    selectBaketInfoData.prototype.getnameData = function (name) {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (name == data.name) {
                return data;
            }
        }
    };
    //清除对象数组
    selectBaketInfoData.prototype.hideData = function () {
        this._mListObj.clear();
    };
    return selectBaketInfoData;
}());
__reflect(selectBaketInfoData.prototype, "selectBaketInfoData");
//# sourceMappingURL=selectBaketInfoData.js.map