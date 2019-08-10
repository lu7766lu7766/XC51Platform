var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MyLotteryDataMrg = (function () {
    function MyLotteryDataMrg() {
        this._mList = new Array();
        this._mListDKJ = new Array();
        this._mListYKJ = new Array();
        this._mListYZJ = new Array();
    }
    Object.defineProperty(MyLotteryDataMrg, "getInstance", {
        get: function () {
            if (MyLotteryDataMrg._mInstance == undefined)
                MyLotteryDataMrg._mInstance = new MyLotteryDataMrg();
            return MyLotteryDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加列表 */
    MyLotteryDataMrg.prototype.addData = function (data) {
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined && this._mList[i].id == data.id) {
                this._mList[i] = data;
                return;
            }
        }
        this._mList.push(data);
    };
    /**通过id 获取对象 */
    MyLotteryDataMrg.prototype.getDataById = function (id) {
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined) {
                console.log("单个对象===" + this._mList[i]);
                return this._mList[i];
            }
        }
        return undefined;
    };
    /**获取全部 */
    MyLotteryDataMrg.prototype.getAllList = function () {
        console.log("获取全部列表===" + this._mList.length);
        return this._mList;
    };
    /**获取待开奖列表 */
    MyLotteryDataMrg.prototype.getDKJDataList = function () {
        this._mListDKJ.length = 0;
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined && this._mList[i].statue == 1) {
                this._mListDKJ.push(this._mList[i]);
            }
        }
        console.log("获取待开奖列表===" + this._mListDKJ.length);
        return this._mListDKJ;
    };
    /**获取已开奖列表 */
    MyLotteryDataMrg.prototype.getYKJDataList = function () {
        this._mListYKJ.length = 0;
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined && this._mList[i].statue == 2) {
                this._mListYKJ.push(this._mList[i]);
            }
        }
        console.log("获已开奖列表" + this._mListYKJ.length);
        return this._mListYKJ;
    };
    /**获取已中奖列表 */
    MyLotteryDataMrg.prototype.getYZJDataList = function () {
        this._mListYZJ.length = 0;
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined && this._mList[i].statue == 3) {
                this._mListYZJ.push(this._mList[i]);
            }
        }
        console.log("获已中奖列表" + this._mListYZJ.length);
        return this._mListYZJ;
    };
    /**清空列表 */
    MyLotteryDataMrg.prototype.cleanData = function () {
        for (var i = 0; i < this._mList.length; i++) {
            if (this._mList[i] != undefined) {
                this._mList[i] = undefined;
            }
        }
        this._mList.length = 0;
    };
    return MyLotteryDataMrg;
}());
__reflect(MyLotteryDataMrg.prototype, "MyLotteryDataMrg");
//# sourceMappingURL=MyLotteryDataMrg.js.map