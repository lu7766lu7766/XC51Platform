var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 排列5 排列3 管理类
 */
var GroupDataMrg = (function () {
    function GroupDataMrg() {
        this._mListGroup = new Array();
        this.group3double([1, 2, 3]);
    }
    Object.defineProperty(GroupDataMrg, "getInstance", {
        get: function () {
            if (GroupDataMrg._mInstance == undefined)
                GroupDataMrg._mInstance = new GroupDataMrg();
            return GroupDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**排列组合5 */
    GroupDataMrg.prototype.group5 = function (listNum1, listNum2, listNum3, listNum4, listNum5) {
        if (listNum1.length <= 0 || listNum2.length <= 0 || listNum3.length <= 0 || listNum4.length <= 0 || listNum5.length <= 0) {
            return undefined;
        }
        var data = new InjectionCode();
        data.type = 1;
        data.result = this.zzfc(listNum1) + "," + this.zzfc(listNum2) + "," + this.zzfc(listNum3) + "," + this.zzfc(listNum4) + "," + this.zzfc(listNum5);
        for (var i = 0; i < listNum1.length; i++) {
            for (var j = 0; j < listNum2.length; j++) {
                for (var k = 0; k < listNum3.length; k++) {
                    for (var l = 0; l < listNum4.length; l++) {
                        for (var m = 0; m < listNum5.length; m++) {
                            data.injectionNum += 1;
                            data.combinationList.push([listNum1[i], listNum2[j], listNum3[k], listNum4[l], listNum5[m]]);
                        }
                    }
                }
            }
        }
        return data;
    };
    /**排列组合3 直选*/
    GroupDataMrg.prototype.group3 = function (listNum1, listNum2, listNum3) {
        if (listNum1.length <= 0 || listNum2.length <= 0 || listNum3.length <= 0) {
            return undefined;
        }
        var data = new InjectionCode();
        data.type = 1;
        data.result = this.zzfc(listNum1) + "," + this.zzfc(listNum2) + "," + this.zzfc(listNum3);
        for (var i = 0; i < listNum1.length; i++) {
            for (var j = 0; j < listNum2.length; j++) {
                for (var k = 0; k < listNum3.length; k++) {
                    data.injectionNum += 1;
                    data.combinationList.push([listNum1[i], listNum2[j], listNum3[k]]);
                }
            }
        }
        return data;
    };
    /**排列组合3 组合单式
     * listNum1 重复的数
     * listNum2 不重复
    */
    GroupDataMrg.prototype.group3Single = function (num1, num2) {
        if (num1 == undefined || num2 == undefined || num1 == num2) {
            return undefined;
        }
        var data = new InjectionCode();
        data.type = 2;
        data.result = num1 + "," + num2;
        data.combinationList.push([num1, num1, num2]);
        return data;
    };
    /**排列组合3 组合复式
     * 至少选中两个号
    */
    GroupDataMrg.prototype.group3double = function (listNum1) {
        if (listNum1.length < 2) {
            return undefined;
        }
        var data = new InjectionCode();
        data.type = 3;
        data.result = this.zzfc(listNum1, true);
        for (var i = 0; i < listNum1.length; i++) {
            for (var j = 0; j < listNum1.length; j++) {
                if (i != j) {
                    data.injectionNum += 1;
                    data.combinationList.push([listNum1[i], listNum1[i], listNum1[j]]);
                }
            }
        }
        return data;
    };
    /**排列组合3 组六
     * 至少选中3个号
    */
    GroupDataMrg.prototype.group3Six = function (listNum1) {
        if (listNum1.length < 3) {
            return undefined;
        }
        var data = new InjectionCode();
        data.type = 4;
        data.result = this.zzfc(listNum1, true);
        for (var i = 0; i < listNum1.length; i++) {
            for (var j = i + 1; j < listNum1.length; j++) {
                for (var k = j + 1; k < listNum1.length; k++) {
                    if (i != j && i != k && j != k) {
                        data.injectionNum += 1;
                        data.combinationList.push([listNum1[i], listNum1[j], listNum1[k]]);
                    }
                }
            }
        }
        return data;
    };
    /**组字符串 */
    GroupDataMrg.prototype.zzfc = function (list, isDou) {
        var str = "";
        for (var i = 0; i < list.length; i++) {
            if (isDou == true && i != 0) {
                str += ("," + list[i]);
            }
            else {
                str += list[i];
            }
        }
        return str;
    };
    return GroupDataMrg;
}());
__reflect(GroupDataMrg.prototype, "GroupDataMrg");
/**注码对象 */
var InjectionCode = (function () {
    function InjectionCode() {
        /**注数 */
        this.injectionNum = 0;
        /**投注倍数 默认为1*/
        this.injectionMul = 1;
        /**类型 直选:1 组3单式:2 组三复式:3 组六:4*/
        this.type = 1;
        /**显示结果 */
        this.result = "";
        /**组合列表 */
        this.combinationList = new Array();
    }
    return InjectionCode;
}());
__reflect(InjectionCode.prototype, "InjectionCode");
//# sourceMappingURL=GroupDataMrg.js.map