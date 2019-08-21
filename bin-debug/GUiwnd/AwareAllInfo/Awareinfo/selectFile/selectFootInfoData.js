var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**比分足球筛选数据类*/
var selectFootInfoData = (function () {
    function selectFootInfoData() {
        this._mListObj = new GHashMap();
    }
    Object.defineProperty(selectFootInfoData, "getInstance", {
        get: function () {
            if (selectFootInfoData._mInstance == undefined)
                selectFootInfoData._mInstance = new selectFootInfoData();
            return selectFootInfoData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表(全部)*/
    selectFootInfoData.prototype.getlist = function () {
        return this._mListObj;
    };
    /**根据id查找对应数据(全部)*/
    selectFootInfoData.prototype.getInfo = function (id) {
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
    selectFootInfoData.prototype.getnameData = function (name) {
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
    selectFootInfoData.prototype.hideData = function () {
        this._mListObj.clear();
    };
    return selectFootInfoData;
}());
__reflect(selectFootInfoData.prototype, "selectFootInfoData");
var bfinfo = (function () {
    function bfinfo() {
        this.type = 0; //1：一级联赛 2：竞彩 3：足彩  4：单场 
    }
    return bfinfo;
}());
__reflect(bfinfo.prototype, "bfinfo");
//# sourceMappingURL=selectFootInfoData.js.map