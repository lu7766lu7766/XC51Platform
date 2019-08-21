var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BigNumber = (function () {
    function BigNumber() {
    }
    Object.defineProperty(BigNumber, "zero", {
        get: function () {
            var temp = new BigNumber();
            temp.init(0, 1);
            return temp;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber, "ten", {
        get: function () {
            if (BigNumber._ten != null)
                return BigNumber._ten;
            BigNumber._ten = new BigNumber();
            BigNumber._ten.init(10, 2);
            return BigNumber._ten;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber, "max", {
        get: function () {
            if (BigNumber._max != null)
                return BigNumber._max;
            BigNumber._max = new BigNumber();
            BigNumber._max.init(999999999, 1000);
            return BigNumber._max;
        },
        enumerable: true,
        configurable: true
    });
    BigNumber.getBigNum = function (value, len) {
        if (len <= 0)
            return BigNumber.zero;
        var temp = new BigNumber();
        temp.init(value, len);
        return temp;
    };
    BigNumber.getBigNumByStr = function (str) {
        var temp = new BigNumber();
        temp.initByStr(str);
        return temp;
    };
    BigNumber.prototype.init = function (value, len) {
        this._value = Math.floor(value);
        this._len = len;
    };
    BigNumber.prototype.initByStr = function (str) {
        this._len = str.length;
        if (this._len <= 9)
            this._value = Number(str);
        else
            this._value = Number(str.slice(0, 9));
    };
    /**
     * 与目标对象比较大小 当前对象大于目标对象 返回1  相等返回0 否则返回 -1
     */
    BigNumber.prototype.compareTo = function (res) {
        if (this._len == res._len && this._value == res._value)
            return 0;
        if (this._len > res._len || (this._len == res._len && this._value > res._value))
            return 1;
        return -1;
    };
    /**将目标对象赋值于自身 */
    BigNumber.prototype.write = function (v) {
        this._value = v._value;
        this._len = v._len;
    };
    /**复制当前对象有值生成新的对象 */
    BigNumber.prototype.clone = function () {
        var temp = new BigNumber();
        temp._value = this._value;
        temp._len = this._len;
        return temp;
    };
    BigNumber.prototype.add = function (res) {
        if (this.compareTo(res) == -1) {
            BigNumber._temp.write(this);
            this.write(res);
            res = BigNumber._temp;
        }
        var len = this._len;
        var value = this._value;
        if ((this._len <= 9 && res._len <= 9) || this._len == res._len) {
            this._value += res._value;
            this.repair(len, value);
        }
        else if (this._len >= (res._len + 9)) {
            return;
        }
        else if (this._len <= (res._len - 9)) {
            this._len = res._len;
            this._value = res._value;
            return;
        }
        else {
            var l = Math.abs(len - this._value.toString().length - (res._len - res._value.toString().length));
            var cv = this._value, resv = res._value;
            if (len > res._len) {
                resv = res._value / Math.pow(10, l);
            }
            else {
                cv = this._value / Math.pow(10, l);
            }
            this._value = cv + resv;
            this.repair(len, value);
        }
    };
    BigNumber.prototype.sub = function (res) {
        if (this.compareTo(res) <= 0) {
            this._len = 1;
            this._value = 0;
            return;
        }
        if ((this._len - res._len) >= 9)
            return;
        var len = this._len;
        var value = this._value;
        var subL = this._len - this._value.toString().length - (res._len - res._value.toString().length);
        var resv = res._value;
        if (subL > 0) {
            resv = res._value / Math.pow(10, subL);
        }
        this._value -= resv;
        this.repair(len, value);
    };
    BigNumber.prototype.mult = function (res) {
        if (res.compareTo(BigNumber._zero) <= 0) {
            this._len = 1;
            this._value = 0;
            return;
        }
        var len = this._len;
        var value = this._value;
        this._len += (res._len - Math.floor(res._value).toString().length);
        this._value = Math.floor(this._value * res._value);
        this.repair(len, value);
    };
    BigNumber.prototype.sqrt = function () {
        if (this._len <= 9) {
            this.initByStr(Math.floor(Math.sqrt(this._value)).toString());
            return;
        }
        var len = this._len - 9;
        var isOdd = !((len % 2) == 0);
        len = (isOdd ? len - 1 : len) / 2;
        var value = isOdd ? this._value * 10 : this._value;
        value = Math.sqrt(value);
        var newLen = Math.floor(value).toString().length;
        if (len <= (9 - newLen)) {
            value *= Math.pow(10, len);
            this.initByStr(Math.floor(value).toString());
            return;
        }
        else {
            len -= (9 - newLen);
            value *= Math.pow(10, 9 - newLen);
            this.init(value, len + 9);
        }
    };
    BigNumber.prototype.multFromNum = function (value) {
        value = Math.floor(value);
        var temp = BigNumber._temp;
        if (value > 999999999)
            temp.initByStr(value.toString(10));
        else
            temp.init(value, value.toString(10).length);
        this.mult(temp);
    };
    BigNumber.prototype.divFromNum = function (value) {
        value = Math.floor(value);
        var temp = BigNumber._temp;
        if (value > 999999999)
            temp.initByStr(value.toString(10));
        else
            temp.init(value, value.toString(10).length);
        this.div(temp);
    };
    BigNumber.prototype.div = function (res) {
        if (res.compareTo(BigNumber._zero) <= 0) {
            this._len = this._value = 0;
            return;
        }
        var len = this._len;
        var value = this._value;
        var cl = this._len - this._value.toString(10).length - (res._len - res._value.toString(10).length);
        var div = this._value / res._value;
        if (div < 1) {
            var y = cl <= 9 ? cl : 9;
            div *= Math.pow(10, y);
            cl -= y;
        }
        else if (div < 100000000 && cl > 0) {
            var temp = Math.floor(div).toString(10).length;
            var y = cl <= (9 - temp) ? cl : (9 - temp);
            div *= Math.pow(10, y);
            cl -= y;
        }
        div = Math.floor(div);
        this._len = cl + div.toString(10).length;
        this._value = div;
        //this.repair(len,value);
    };
    BigNumber.pow = function (x, y) {
        var addV = BigNumber._powAddv;
        var resV = BigNumber._powRes;
        resV.init(1, 1);
        addV.init(0, 1);
        if (x >= BigNumber.powMaxNum) {
            egret.error("求次幂的原值不得大于999999999");
        }
        var total = 0;
        var ct = x;
        while (true) {
            ct = x;
            total++;
            for (; total < y;) {
                ct *= x;
                total++;
                if (ct >= 999999999999999999)
                    break;
            }
            addV.initByStr(Math.floor(ct).toString(10));
            if (resV._value == 1)
                resV.write(addV);
            else {
                var fix = Number(ct.toFixed(7)) - Math.floor(ct);
                addV._value += fix;
                resV.mult(addV);
            }
            if (total >= y)
                break;
        }
        return resV;
    };
    BigNumber.prototype.repair = function (oldlen, oldvalue) {
        var cv = this._value = Math.floor(this._value);
        var ol = Math.floor(oldvalue).toString().length;
        var nl = cv.toString().length;
        this._len = this._len - (ol - nl);
        if (nl > 9) {
            this._value = Number(cv.toString().slice(0, 9));
        }
        if (nl < 9 && this._len >= 9) {
            this._value = this._value * Math.pow(10, 9 - nl);
        }
        var valueLen = this._value.toString().length;
        if (valueLen < 9 && valueLen < this._len) {
            this._value *= Math.pow(10, this._len - valueLen);
        }
    };
    Object.defineProperty(BigNumber.prototype, "value", {
        get: function () {
            return this._value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BigNumber.prototype, "lenth", {
        get: function () {
            return this._len;
        },
        enumerable: true,
        configurable: true
    });
    BigNumber._ten = null;
    BigNumber._max = null;
    BigNumber._temp = BigNumber.zero;
    BigNumber._zero = BigNumber.zero;
    BigNumber.powMaxNum = 999999999;
    BigNumber._powRes = BigNumber.zero;
    BigNumber._powAddv = BigNumber.zero;
    return BigNumber;
}());
__reflect(BigNumber.prototype, "BigNumber");
//# sourceMappingURL=BigNumber.js.map