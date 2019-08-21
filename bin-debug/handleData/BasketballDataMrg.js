var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var BasketballDataMrg = (function () {
    function BasketballDataMrg() {
        /**篮球 0-17 */
        this.BasketballList = ["客胜", "主胜", "客胜", "主胜", "1-5", "6-10", "11-15", "16-20", "21-25", "26+", "1-5", "6-10", "11-15", "16-20", "21-25", "26+", "大分", "小分"];
        this._mList = [0, 0, 2, 0, 16, 15];
        this._mLQLB = new GHashMap();
        this._mLQLBDG = new GHashMap();
        this._mLQLBDG2 = new GHashMap();
        this._mLQLBDG3 = new GHashMap();
        this._mLQLBDG4 = new GHashMap();
        this._mLQLBDG5 = new GHashMap();
        this._mCJLQLB = new GHashMap();
        this._mCJLQLBDG = new GHashMap();
        this._mCJLQLBDG2 = new GHashMap();
        this._mCJLQLBDG3 = new GHashMap();
        this._mCJLQLBDG4 = new GHashMap();
        this._mCJLQLBDG5 = new GHashMap();
    }
    Object.defineProperty(BasketballDataMrg, "getInstance", {
        get: function () {
            if (BasketballDataMrg._mInstance == undefined)
                BasketballDataMrg._mInstance = new BasketballDataMrg();
            return BasketballDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    BasketballDataMrg.prototype.getDGList = function (type) {
        var list;
        if (type == 2) {
            this._mLQLBDG2.clear();
            list = this._mLQLBDG2;
        }
        else if (type == 3) {
            this._mLQLBDG3.clear();
            list = this._mLQLBDG3;
        }
        else if (type == 4) {
            this._mLQLBDG4.clear();
            list = this._mLQLBDG4;
        }
        else if (type == 5) {
            this._mLQLBDG5.clear();
            list = this._mLQLBDG5;
        }
        var data;
        var fbData;
        for (var _i = 0, _a = this._mLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mLQLBDG.Gget(key);
            for (var _b = 0, _c = data.keys; _b < _c.length; _b++) {
                var key1 = _c[_b];
                fbData = data.Gget(key1);
                if (fbData.listSX[this._mList[type]] != undefined) {
                    list.Gput(key, data);
                    break;
                }
            }
        }
        return list;
    };
    BasketballDataMrg.prototype.getCJDGList = function (type) {
        var list;
        if (type == 2) {
            this._mCJLQLBDG2.clear();
            list = this._mCJLQLBDG2;
        }
        else if (type == 3) {
            this._mCJLQLBDG3.clear();
            list = this._mCJLQLBDG3;
        }
        else if (type == 4) {
            this._mCJLQLBDG4.clear();
            list = this._mCJLQLBDG4;
        }
        else if (type == 5) {
            this._mCJLQLBDG5.clear();
            list = this._mCJLQLBDG5;
        }
        var data;
        var fbData;
        for (var _i = 0, _a = this._mCJLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mCJLQLBDG.Gget(key);
            for (var _b = 0, _c = data.keys; _b < _c.length; _b++) {
                var key1 = _c[_b];
                fbData = data.Gget(key1);
                if (fbData.listSX[this._mList[type]] != undefined) {
                    list.Gput(key, data);
                    break;
                }
            }
        }
        return list;
    };
    /**添加数据 */
    BasketballDataMrg.prototype.addData = function (time, lq) {
        if (lq != undefined) {
            this._mLQLB.Gput(time, lq);
        }
    };
    /**超级添加数据 */
    BasketballDataMrg.prototype.addCJData = function (time, lq) {
        if (lq != undefined) {
            this._mCJLQLB.Gput(time, lq);
        }
    };
    /**添加单关篮球数据 */
    BasketballDataMrg.prototype.addDGData = function (time, fb) {
        if (fb != undefined) {
            this._mLQLBDG.Gput(time, fb);
        }
    };
    /**超级添加单关篮球数据 */
    BasketballDataMrg.prototype.addCJDGData = function (time, fb) {
        if (fb != undefined) {
            this._mCJLQLBDG.Gput(time, fb);
        }
    };
    /**通过id获取对象 */
    BasketballDataMrg.prototype.getData = function (time, id) {
        if (this._mLQLB[time] != undefined) {
            return this._mLQLB[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**超级通过id获取对象 */
    BasketballDataMrg.prototype.getCJData = function (time, id) {
        if (this._mCJLQLB[time] != undefined) {
            return this._mCJLQLB[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**通过id获取对象 */
    BasketballDataMrg.prototype.getDataById = function (id) {
        var lq;
        for (var _i = 0, _a = this._mLQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mLQLB.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id);
            }
        }
        return undefined;
    };
    /**超级通过id获取对象 */
    BasketballDataMrg.prototype.getCJDataById = function (id) {
        var lq;
        for (var _i = 0, _a = this._mCJLQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mCJLQLB.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id);
            }
        }
        return undefined;
    };
    /**通过id获取对象 */
    BasketballDataMrg.prototype.getDataDGById = function (id) {
        var lq;
        for (var _i = 0, _a = this._mLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mLQLBDG.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id);
            }
        }
        return undefined;
    };
    /**超级通过id获取对象 */
    BasketballDataMrg.prototype.getCJDataDGById = function (id) {
        var lq;
        for (var _i = 0, _a = this._mCJLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mCJLQLBDG.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id);
            }
        }
        return undefined;
    };
    /**通过单关当天time获取对象*/
    BasketballDataMrg.prototype.getDataByTime = function (time) {
        return this._mLQLB[time];
    };
    /**超级通过单关当天time获取对象*/
    BasketballDataMrg.prototype.getCJDataByTime = function (time) {
        return this._mCJLQLB[time];
    };
    /**通过单关当天time获取对象*/
    BasketballDataMrg.prototype.getDGDataByTime = function (time) {
        return this._mLQLBDG[time];
    };
    /**超级通过单关当天time获取对象*/
    BasketballDataMrg.prototype.getCJDGDataByTime = function (time) {
        return this._mCJLQLBDG[time];
    };
    /**通过当天time 和 场次id获取单关足球对象 */
    BasketballDataMrg.prototype.getDGData = function (time, id) {
        if (this._mLQLBDG[time] != undefined) {
            return this._mLQLBDG[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**超级通过当天time 和 场次id获取单关足球对象 */
    BasketballDataMrg.prototype.getCJDGData = function (time, id) {
        if (this._mCJLQLBDG[time] != undefined) {
            return this._mCJLQLBDG[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**通过id和下标取对象 */
    BasketballDataMrg.prototype.getDataByIdAndXB = function (id, xb) {
        var lq;
        for (var _i = 0, _a = this._mLQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mLQLB.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**超级 通过id和下标取对象 */
    BasketballDataMrg.prototype.getCJDataByIdAndXB = function (id, xb) {
        var lq;
        for (var _i = 0, _a = this._mCJLQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            lq = this._mCJLQLB.Gget(key);
            if (lq.Gget(id) != undefined) {
                return lq.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**通过id和下标取对象 */
    BasketballDataMrg.prototype.getDataDGByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mLQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**超级 通过id和下标取对象 */
    BasketballDataMrg.prototype.getCJDataDGByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mCJLQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mCJLQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    return BasketballDataMrg;
}());
__reflect(BasketballDataMrg.prototype, "BasketballDataMrg");
//# sourceMappingURL=BasketballDataMrg.js.map