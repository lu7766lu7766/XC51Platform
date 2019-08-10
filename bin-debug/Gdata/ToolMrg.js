var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var ToolMrg = (function () {
    function ToolMrg() {
    }
    /**返回显示 */
    ToolMrg.showTip = function (num, len) {
        if (num < 1000) {
            return "" + num;
        }
        var tempNum = ("" + num);
        var nn = Math.floor((len - 1) / 3) - 1;
        var str = ToolMrg.nick[nn];
        return (this.numBack(num, len) + str);
    };
    ToolMrg.showBigNum = function (value) {
        return ToolMrg.showTip(value.value, value.lenth);
    };
    /**返回几位小数 */
    ToolMrg.numBack = function (num, len) {
        var tempNum = ("" + num);
        var max = 4;
        var zsLen = len - Math.floor((len - 1) / 3) * 3;
        var xs;
        if (zsLen >= len) {
            xs = "0";
        }
        else {
            xs = tempNum.substring(zsLen, zsLen + 2);
            if (xs == "0") {
                xs = "0";
            }
        }
        return tempNum.substring(0, zsLen) + "." + xs;
    };
    /**获取min-max的随机数
     * @param min 起始数 从哪个数开始
     * @param max 结束数 到哪个数结束
     */
    ToolMrg.randomNum = function (min, max) {
        var c = max - min + 1;
        return Math.floor(Math.random() * c + min);
    };
    /**设置缩放中心点 */
    ToolMrg.setZoom = function (btn, x, y) {
        btn.anchorOffsetX = btn.width / 2;
        btn.anchorOffsetY = btn.height / 2;
        if (x != undefined) {
            btn.x = x + btn.width / 2;
        }
        else {
            btn.x = btn.x + btn.width / 2;
        }
        if (y != undefined) {
            btn.y = y + btn.height / 2;
        }
        else {
            btn.y = btn.y + btn.height / 2;
        }
    };
    ToolMrg.initByStr = function (str) {
        str = str.toString();
        var len = str.length;
        var big;
        if (len <= 9) {
            big = BigNumber.getBigNum(Number(str), (len == 0 ? 1 : len));
        }
        else {
            big = BigNumber.getBigNum(Number(str.substring(0, 9)), len);
        }
        return big;
    };
    /**等级小于200 指数用程序指数方式取整保留 */
    ToolMrg.getPowNum = function (lv, zs, js) {
        var big = BigNumber.getBigNum(1, 1);
        var jb1 = BigNumber.getBigNum(js.value, js.lenth);
        if (lv < 100) {
            var num = Math.pow(zs, lv - 1);
            num = Math.floor(num * 100);
            var jb2 = BigNumber.getBigNum(num, ("" + num).length);
            big.mult(jb1);
            big.mult(jb2);
            big.divFromNum(100);
        }
        else {
            var jb2 = BigNumber.pow(zs, lv - 1);
            big.mult(jb1);
            big.mult(jb2);
        }
        return big;
    };
    ToolMrg.getTime = function (n) {
        var hour = "0";
        var min = "0";
        var second = "0";
        var b = "0";
        if (n >= 3600) {
            hour = (Math.floor(n / 3600)).toString();
            if (Number(hour) < 10) {
                hour = b + hour;
            }
            min = (Math.floor((n - Number(hour) * 3600) / 60)).toString();
            if (Number(min) < 10) {
                min = b + min;
            }
            second = (n - Number(hour) * 3600 - Number(min) * 60).toString();
            if (Number(second) < 10) {
                second = b + second;
            }
        }
        else {
            hour = "00";
            min = (Math.floor(n / 60)).toString();
            if (Number(min) < 10) {
                min = b + min;
            }
            second = (n - Number(min) * 60).toString();
            if (Number(second) < 10) {
                second = b + second;
            }
            if (n < 60) {
                second = n.toString();
                if (Number(second) < 10) {
                    second = b + second;
                }
            }
        }
        var str = hour + "" + "小时" + min + "分" + second + "秒";
        return str;
    };
    /**单参 与本地时间对比 双参 与服务器时间对比
     * 相差 60s 刚刚 <1小时 分钟 >1小时 小时
     */
    ToolMrg.getDisparity = function (t, ft) {
        if (t == undefined)
            return;
        var time;
        if (ft != undefined) {
            time = ft * 1000;
        }
        else {
            time = new Date().getTime();
        }
        time = (time - t * 1000) / 1000;
        // egret.log(new Date(t*1000).getMonth()+1 + " - " + new Date(t*1000).getDate());
        var cDay = time / 3600 / 24;
        if (cDay > 1.5) {
            var mDate = new Date(t * 1000);
            return this.getNumberDate(mDate.getMonth() + 1) + "-" + this.getNumberDate(mDate.getDate());
        }
        else if (cDay < 1.5 && cDay > 1) {
            return "昨天";
            // let mDate = new Date(t*1000);
            // return this.getNumberDate(mDate.getMonth() + 1) + ' -' + this.getNumberDate(mDate.getDate());
        }
        if (time > 60 * 60 * 2) {
            return "昨天";
        }
        else if (time > 60 * 60 && time < 60 * 60 * 2) {
            time = time / 60 / 60;
            return Math.floor(time) + "\u5C0F\u65F6\u524D";
        }
        else if (time > 60 && time < 60 * 60) {
            time = time / 60;
            // egret.log(time)
            return Math.floor(time) + "\u5206\u949F\u524D";
        }
        else if (time < 60 || time == 0) {
            return "刚刚";
        }
        return "";
    };
    /**刷新数组 传入GHashMap info实体类 data数据类 */
    ToolMrg.upItemofGHashMap = function (infoItem, dataItem) {
        var str = [];
        for (var _i = 0, _a = infoItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (!dataItem.GhasKey(key)) {
                str = str.concat(key);
            }
        }
        if (str != []) {
            for (var i = 0; i < str.length; i++) {
                if (infoItem.GhasKey(str[i])) {
                    var obj = infoItem.Gget(str[i]);
                    if (obj.parent != undefined)
                        obj.parent.removeChild(obj);
                    infoItem.GremoveByKey(str[i]);
                }
            }
        }
    };
    /**刷新数组 传入GHashMap info实体类 data数据类 */
    ToolMrg.upItemofArray = function (infoItem, dataItem) {
        var str = [];
        for (var _i = 0, _a = infoItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (dataItem[key] == undefined) {
                str = str.concat(key);
            }
        }
        if (str != []) {
            for (var i = 0; i < str.length; i++) {
                if (infoItem.GhasKey(str[i])) {
                    var obj = infoItem.Gget(str[i]);
                    if (obj.parent != undefined)
                        obj.parent.removeChild(obj);
                    infoItem.GremoveByKey(str[i]);
                }
            }
        }
    };
    /**名字太长，显示... */
    ToolMrg.nameMode = function (len, n) {
        if (n == null || n == undefined)
            n = "";
        var str;
        if (n.length >= len) {
            str = n.substring(0, len - 1) + "...";
        }
        else {
            str = n;
        }
        return str;
    };
    /**名字太长，显示指定长度*/
    ToolMrg.nameMode2 = function (len, n) {
        if (n == null || n == undefined)
            n = "";
        var str;
        if (n.length >= len) {
            str = n.substring(0, len - 1) + "…";
        }
        else {
            str = n;
        }
        return str;
    };
    ToolMrg.getText = function (x, y, size, color, width, isbold) {
        var text = new egret.TextField();
        // if(isbold!=undefined&&isbold==true){
        // 	text.fontFamily = "text";
        // 	text.bold = isbold;
        // }else{
        // 	text.bold = false;
        // 	text.fontFamily = "text";
        // }
        text.x = x;
        text.y = y;
        text.size = size;
        text.textColor = color;
        if (width != undefined)
            text.width = width;
        return text;
    };
    ToolMrg.getLink = function (w, h, color, a) {
        if (a === void 0) { a = 1; }
        var link = new egret.Shape();
        link.graphics.beginFill(color, a);
        link.graphics.drawRect(0, 0, w, h);
        link.graphics.endFill();
        return link;
    };
    ToolMrg.getRoundRect = function (x, y, w, h, a, ew, eh, color) {
        if (a === void 0) { a = 1; }
        var link = new egret.Shape();
        link.graphics.beginFill(color, a);
        link.graphics.drawRoundRect(x, y, w, h, ew, eh);
        link.graphics.endFill();
        return link;
    };
    /** 根据时间戳获取时间串
 * t:	时间戳（秒）
 */
    ToolMrg.getTime1 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() + '-' +
            this.getNumberDate(mDate.getMonth() + 1) + '-' +
            this.getNumberDate(mDate.getDate()) + ' ' +
            this.getNumberDate(mDate.getHours()) + ':' +
            this.getNumberDate(mDate.getMinutes());
        return time;
    };
    /** 根据时间戳获取时间串
* t:	获取年月日 时分秒
*/
    ToolMrg.getTime11 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() + '-' +
            this.getNumberDate(mDate.getMonth() + 1) + '-' +
            this.getNumberDate(mDate.getDate()) + ' ' +
            this.getNumberDate(mDate.getHours()) + ':' +
            this.getNumberDate(mDate.getMinutes()) + ":" +
            this.getNumberDate(mDate.getSeconds());
        return time;
    };
    /** 根据时间戳获取时间串
 * t:	时间戳（秒）
 */
    ToolMrg.getTime2 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() + '.' +
            this.getNumberDate(mDate.getMonth() + 1) + '.' +
            this.getNumberDate(mDate.getDate()) + ' ' +
            this.getNumberDate(mDate.getHours()) + ':' +
            this.getNumberDate(mDate.getMinutes()) + ':' +
            this.getNumberDate(mDate.getSeconds());
        return time;
    };
    /** 根据时间戳获取时间串
 * t:	时间戳(年月日)
 */
    ToolMrg.getTime3 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() + '.' +
            this.getNumberDate(mDate.getMonth() + 1) + '.' +
            this.getNumberDate(mDate.getDate());
        return time;
    };
    /** 根据时间戳获取时间串
 * t:	时间戳(年月日)+一个月
 */
    ToolMrg.getTime4 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() + '.' +
            this.getNumberDate(mDate.getMonth() + 2) + '.' +
            this.getNumberDate(mDate.getDate());
        return time;
    };
    /** 根据时间戳获取时间串
 * t:	时间戳 毫秒  返回 ： 06-17\n21:45
 */
    ToolMrg.getTime5 = function (t) {
        var mDate = new Date(t * 1000);
        var time = this.getNumberDate(mDate.getMonth() + 1) + '-' +
            this.getNumberDate(mDate.getDate()) + '\n' +
            this.getNumberDate(mDate.getHours()) + ':' +
            this.getNumberDate(mDate.getMinutes());
        return time;
    };
    /** 根据时间戳获取时间串
* t:	时间戳(年月日)
*/
    ToolMrg.getTime6 = function (t) {
        var mDate = new Date(t * 1000);
        var time = mDate.getFullYear() +
            this.getNumberDate(mDate.getMonth() + 1) +
            this.getNumberDate(mDate.getDate());
        return time;
    };
    /** 根据时间戳获取时间串
* t:	时间戳 毫秒  返回 ： 06-17 21:45
*/
    ToolMrg.getTime7 = function (t) {
        var mDate = new Date(t * 1000);
        var time = this.getNumberDate(mDate.getMonth() + 1) + '-' +
            this.getNumberDate(mDate.getDate()) + ' ' +
            this.getNumberDate(mDate.getHours()) + ':' +
            this.getNumberDate(mDate.getMinutes());
        return time;
    };
    /**如果数字小于10就在前面补个0 */
    ToolMrg.getNumberDate = function (num) {
        var mouth;
        if (num < 10) {
            mouth = '0' + num;
            return mouth;
        }
        else {
            return num;
        }
    };
    ToolMrg.getNowTime = function () {
        this._mData = new Date();
        return Date.parse(ToolMrg._mData.toString()) / 1000;
    };
    /**json解析 */
    ToolMrg.AnalysisJson = function (httpObj) {
        var text;
        try {
            text = JSON.parse(httpObj.response);
        }
        catch (error) {
            Alertpaner.getInstance.show("获取失败");
        }
    };
    /**取几位小数
     * temp 当前数
     * ws 位数
    */
    ToolMrg.getDecimal = function (temp, ws) {
        var ttt = 1;
        for (var i = 0; i < ws; i++) {
            ttt *= 10;
        }
        temp = Math.round(temp * ttt);
        temp /= ttt;
        return temp;
    };
    /**取字符串数字 */
    ToolMrg.getStrNum = function (str) {
        var strT = "";
        for (var i = 0; i < str.length; i++) {
            if (Number(str[i]) >= 0) {
                strT += str[i];
            }
        }
        if (strT.length <= 0) {
            return 0;
        }
        else {
            return Number(strT);
        }
    };
    /**k(3) m(6) b(9) t(12) aa(15) ab(18) ac(21) ad(24) ae(27) af(30) ag(33) ah(36) ai(39) aj(42) ak(45) ...*/
    ToolMrg.nick = ["k", "m", "b", "t", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
        "ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
        "ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
        "da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
        "ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "eu", "ev", "ew", "ex", "ey", "ez",
        "fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
        "ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
        "ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
        "ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
    ];
    /**间隔 */
    ToolMrg._mJG = 9;
    return ToolMrg;
}());
__reflect(ToolMrg.prototype, "ToolMrg");
//# sourceMappingURL=ToolMrg.js.map