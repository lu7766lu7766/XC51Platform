var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**佣金或者零钱数据类*/
var withdrawData = (function () {
    function withdrawData() {
    }
    Object.defineProperty(withdrawData, "getInstance", {
        get: function () {
            if (withdrawData._mInstance == undefined)
                withdrawData._mInstance = new withdrawData();
            return withdrawData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**选择逻辑处理*/
    withdrawData.prototype.selectdecide = function () {
        var list = withdrawViewMrg.getInstance.getlist1();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (withdrawData.defauleid == i) {
                    data.selectSprite(1);
                }
                else {
                    data.selectSprite(2);
                }
            }
        }
        withdrawData.getInstance.setAllMoney();
    };
    /**设置全部可转出金额*/
    withdrawData.prototype.setAllMoney = function () {
        var list = withdrawViewMrg.getInstance.getlist();
        var data;
        var type = withdrawData.defauleid;
        data = list.Gget(3);
        if (data != undefined) {
            if (type == 1) {
                data.setInpText("可提取" + UserData.getInstance.getGold() + "元");
            }
            else {
                data.setInpText("可提取" + UserData.getInstance.getYJGold() + "元");
            }
            data.setcolor();
        }
    };
    withdrawData.prototype.getAllMoney = function () {
        var list = withdrawViewMrg.getInstance.getlist();
        var data;
        var type = withdrawData.defauleid;
        data = list.Gget(2);
        if (data != undefined) {
            if (type == 1) {
                return "可提取" + UserData.getInstance.getGold() + "元";
            }
            else {
                return "可提取" + UserData.getInstance.getYJGold() + "元";
            }
        }
    };
    /**提款流程顺序*/
    withdrawData.prototype.show = function () {
        var len = SelectDataMrg.getInstance.getItem().size;
        if (len == 0) {
            selectBankcard.getInstance.show();
        }
        else {
            withdrawViewMrg.getInstance.show();
        }
    };
    /**退出登录的时候清除所有银行卡列表信息*/
    withdrawData.prototype.cleanall = function () {
        SelectDataMrg.getInstance.clearItem();
    };
    withdrawData.defauleid = 1; //当前点击类型id
    withdrawData.bankName = ""; //银行卡名字
    withdrawData.bankNum = ""; //银行卡号
    withdrawData.bangtk = ""; //提款金额
    return withdrawData;
}());
__reflect(withdrawData.prototype, "withdrawData");
//# sourceMappingURL=withdrawData.js.map