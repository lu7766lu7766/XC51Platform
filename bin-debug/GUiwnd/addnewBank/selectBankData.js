var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**选择银行卡数据管理类 */
var selectBankData = (function () {
    function selectBankData() {
    }
    Object.defineProperty(selectBankData, "getInstance", {
        get: function () {
            if (selectBankData._mInstance == undefined)
                selectBankData._mInstance = new selectBankData();
            return selectBankData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**选择银行卡需要处理的逻辑*/
    selectBankData.prototype.selectBank = function () {
        var list = selectBankcard.getInstance.getList();
        var dataobj;
        for (var i = 1; i <= list.size; i++) {
            dataobj = list.Gget(i);
            if (dataobj != undefined) {
                if (i == selectBankData.selectID) {
                    dataobj.setjtSprite(1);
                }
                else {
                    dataobj.setjtSprite(2);
                }
            }
        }
        withdrawViewMrg.getInstance.setconne();
    };
    selectBankData.selectID = 1; //选择银行卡id
    return selectBankData;
}());
__reflect(selectBankData.prototype, "selectBankData");
//# sourceMappingURL=selectBankData.js.map