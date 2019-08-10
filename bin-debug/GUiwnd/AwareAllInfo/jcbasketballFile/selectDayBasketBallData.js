var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**篮球选择日期数据类 */
var selectDayBasketBallData = (function () {
    function selectDayBasketBallData() {
    }
    Object.defineProperty(selectDayBasketBallData, "getInstance", {
        get: function () {
            if (selectDayBasketBallData._mInstance == undefined)
                selectDayBasketBallData._mInstance = new selectDayBasketBallData();
            return selectDayBasketBallData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表*/
    selectDayBasketBallData.prototype.getlist = function () {
        return this._mListObj;
    };
    /**日期选择逻辑处理*/
    selectDayBasketBallData.prototype.selectqq = function () {
        var list = selectDayBasketBall.getInstance.getlist();
        var len = list.size;
        for (var i = 1; i <= len; i++) {
            var dataobj = list.Gget(i);
            if (dataobj != undefined) {
                if (selectDayBasketBallData.defaultselectNum == i) {
                    dataobj.selcet(1);
                }
                else {
                    dataobj.selcet(2);
                }
            }
        }
        jcbasketBallView.getInstance.setqq();
    };
    /**根据id查找对应数据*/
    selectDayBasketBallData.prototype.getInfo = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    //清除对象数组
    selectDayBasketBallData.prototype.hideData = function () {
        this._mListObj.clear();
    };
    selectDayBasketBallData.defaultselectNum = 1; //当前选者期数id
    selectDayBasketBallData.ifshow = false; //当前是否有显示选择列表
    selectDayBasketBallData.selectDay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; //最近选择日期
    return selectDayBasketBallData;
}());
__reflect(selectDayBasketBallData.prototype, "selectDayBasketBallData");
(function (selectDayBasketBallData) {
    var Data = (function () {
        function Data() {
            this.biaoList = []; //表格显示内容
        }
        Data.prototype.setList = function (id, str) {
            this.biaoList[id] = str;
        };
        return Data;
    }());
    selectDayBasketBallData.Data = Data;
    __reflect(Data.prototype, "selectDayBasketBallData.Data");
})(selectDayBasketBallData || (selectDayBasketBallData = {}));
//# sourceMappingURL=selectDayBasketBallData.js.map