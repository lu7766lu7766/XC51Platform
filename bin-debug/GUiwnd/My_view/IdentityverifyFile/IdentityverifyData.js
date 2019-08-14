var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**身份证信息数据类 */
var IdentityverifyData = (function () {
    function IdentityverifyData() {
    }
    Object.defineProperty(IdentityverifyData, "getInstance", {
        get: function () {
            if (IdentityverifyData._mInstance == undefined)
                IdentityverifyData._mInstance = new IdentityverifyData();
            return IdentityverifyData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    IdentityverifyData.realName = ""; //真实姓名
    IdentityverifyData.identitNum = ""; //身份证号码
    return IdentityverifyData;
}());
__reflect(IdentityverifyData.prototype, "IdentityverifyData");
/**身份证验证类*/
var IdentityverifyObj = (function () {
    function IdentityverifyObj() {
        this.a_idCard = [];
        this.Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子   
        this.ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; // 身份证验证位值.10代表X   
    }
    Object.defineProperty(IdentityverifyObj, "getInstance", {
        get: function () {
            if (IdentityverifyObj._mInstance == undefined)
                IdentityverifyObj._mInstance = new IdentityverifyObj();
            return IdentityverifyObj._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
 * 验证18位数身份证号码中的生日是否是有效生日
 * @param idCard 18位书身份证字符串
 * @return
*/
    IdentityverifyObj.prototype.isValidityBrithBy18IdCard = function (idCard18) {
        var year = idCard18.substring(6, 10);
        var month = idCard18.substring(10, 12);
        var day = idCard18.substring(12, 14);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 这里用getFullYear()获取年份，避免千年虫问题   
        if (temp_date.getFullYear() != parseFloat(year)
            || temp_date.getMonth() != parseFloat(month) - 1
            || temp_date.getDate() != parseFloat(day)) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
   * 验证15位数身份证号码中的生日是否是有效生日
   * @param idCard15 15位书身份证字符串
   * @return
*/
    IdentityverifyObj.prototype.isValidityBrithBy15IdCard = function (idCard15) {
        var year = idCard15.substring(6, 8);
        var month = idCard15.substring(8, 10);
        var day = idCard15.substring(10, 12);
        var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
        // 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
        if (temp_date.getFullYear() != parseFloat(year)
            || temp_date.getMonth() != parseFloat(month) - 1
            || temp_date.getDate() != parseFloat(day)) {
            return false;
        }
        else {
            return true;
        }
    };
    //去掉字符串头尾空格   
    IdentityverifyObj.prototype.trim = function (str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    };
    /**
 * 判断身份证号码为18位时最后的验证位是否正确
 * @param a_idCard 身份证号码数组
 * @return
*/
    IdentityverifyObj.prototype.isTrueValidateCodeBy18IdCard = function (a_idCard) {
        var sum = 0; // 声明加权求和变量   
        if (a_idCard[17].toString().toLowerCase() == 'x') {
            a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作   
        }
        for (var i = 0; i < 17; i++) {
            sum += this.Wi[i] * a_idCard[i]; // 加权求和   
        }
        var valCodePosition = sum % 11; // 得到验证码所位置   
        if (a_idCard[17] == this.ValideCode[valCodePosition]) {
            return true;
        }
        else {
            return false;
        }
    };
    IdentityverifyObj.prototype.IdCardValidate = function (idCard) {
        this.a_idCard = [];
        idCard = this.trim(idCard.replace(/ /g, "")); //去掉字符串头尾空格                     
        if (idCard.length == 15) {
            return this.isValidityBrithBy15IdCard(idCard); //进行15位身份证的验证    
        }
        else if (idCard.length == 18) {
            var strlist = idCard.split("");
            for (var i = 0; i < strlist.length; i++) {
                var idNum = Number(strlist[i]);
                var last = strlist[i];
                if (i == 17 && last == "X") {
                    idNum = 10;
                }
                this.a_idCard[i] = idNum;
            } // 得到身份证数组   
            if (this.isValidityBrithBy18IdCard(idCard) && this.isTrueValidateCodeBy18IdCard(this.a_idCard)) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    /**.............................................................................................................. */
    /**验证名字 */
    IdentityverifyObj.prototype.checkName = function (name) {
        // let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        var reg = /^[\u4e00-\u9fa5 ]{2,20}$/;
        return reg.test(name);
    };
    return IdentityverifyObj;
}());
__reflect(IdentityverifyObj.prototype, "IdentityverifyObj");
//# sourceMappingURL=IdentityverifyData.js.map