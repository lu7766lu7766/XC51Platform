var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**银行卡号验证类 */
var bankcardCheck = (function () {
    function bankcardCheck() {
    }
    Object.defineProperty(bankcardCheck, "getInstance", {
        get: function () {
            if (bankcardCheck._mInstance == undefined)
                bankcardCheck._mInstance = new bankcardCheck();
            return bankcardCheck._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**bankno为银行卡号 */
    bankcardCheck.prototype.onecheck = function (bankno) {
        var lastNum = bankno.substr(bankno.length - 1, 1); //取出最后一位
        var first15Num = bankno.substr(0, bankno.length - 1); //前15或18位
        var newArr = new Array();
        for (var i = first15Num.length - 1; i > -1; i--) {
            newArr.push(first15Num.substr(i, 1));
        }
        var arrJiShu = new Array(); //奇数位*2的积 <9
        var arrJiShu2 = new Array(); //奇数位*2的积 >9
        var arrOuShu = new Array(); //偶数位数组
        for (var j = 0; j < newArr.length; j++) {
            if ((j + 1) % 2 == 1) {
                if (parseInt(newArr[j]) * 2 < 9)
                    arrJiShu.push(parseInt(newArr[j]) * 2);
                else
                    arrJiShu2.push(parseInt(newArr[j]) * 2);
            }
            else
                arrOuShu.push(newArr[j]);
        }
        var jishu_child1 = new Array(); //奇数位*2 >9 的分割之后的数组个位数
        var jishu_child2 = new Array(); //奇数位*2 >9 的分割之后的数组十位数
        for (var h = 0; h < arrJiShu2.length; h++) {
            jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
            jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
        }
        var sumJiShu = 0; //奇数位*2 < 9 的数组之和
        var sumOuShu = 0; //偶数位数组之和
        var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
        var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
        var sumTotal = 0;
        for (var m = 0; m < arrJiShu.length; m++) {
            sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
        }
        for (var n = 0; n < arrOuShu.length; n++) {
            sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
        }
        for (var p = 0; p < jishu_child1.length; p++) {
            sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
            sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
        }
        //计算总和
        sumTotal = sumJiShu + sumOuShu + sumJiShuChild1 + sumJiShuChild2;
        //计算luhn值
        var k = sumTotal % 10 == 0 ? 10 : sumTotal % 10;
        var luhn = 10 - k;
        if (Number(lastNum) == luhn) {
            console.log("验证通过");
            return true;
        }
        else {
            console.log("银行卡号必须符合luhn校验");
            return false;
        }
    };
    bankcardCheck.prototype.twocheck = function (bankno) {
        var banknoret = bankno.replace(/\s/g, '');
        if (banknoret == "") {
            return false;
        }
        if (banknoret.length < 16 || banknoret.length > 19) {
            return false;
        }
        var num = /^\d*$/; //全数字
        if (!num.exec(banknoret)) {
            return false;
        }
        return true;
    };
    /*************************************************************** */
    /**检验前缀是否为数字*/
    bankcardCheck.prototype.checkNum = function (input) {
        if (parseFloat(input).toString() == "NaN") {
            //alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
            return false;
        }
        else {
            return true;
        }
    };
    /**检查是否为纯数字*/
    bankcardCheck.prototype.checkAllNum = function (obj) {
        var reg = /^[0-9]*$/;
        return reg.test(obj);
    };
    /**验证中文*/
    bankcardCheck.prototype.checkName = function (name) {
        // let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        var reg = /^[\u4e00-\u9fa5 ]{2,20}$/;
        return reg.test(name);
    };
    return bankcardCheck;
}());
__reflect(bankcardCheck.prototype, "bankcardCheck");
//# sourceMappingURL=bankcardCheck.js.map