var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var FootballDataMrg = (function () {
    function FootballDataMrg() {
        /**足球对应名称 0-53 */
        this.fbNameItem = ["胜", "平", "负", "胜", "平", "负", "1:0", "2:0", "2:1", "3:0", "3:1", "3:2", "4:0", "4:1", "4:2", "5:0", "5:1", "5:2", "胜其他", "0:0", "1:1", "2:2", "3:3", "平其他", "0:1", "0:2", "1:2", "0:3", "1:3", "2:3", "0:4", "1:4", "2:4", "0:5", "1:5", "2:5", "负其他", "0球", "1球",
            "2球", "3球", "4球", "5球", "6球", "7+球", "胜胜", "胜平", "胜负", "平胜", "平平", "平负", "负胜", "负平", "负负"];
        this._mList = [0, 0, 0, 37, 6, 45];
        this._mZQLB = new GHashMap();
        this._mCJZQLB = new GHashMap();
        this._mZQLBDG = new GHashMap();
        this._mZQLBDG2 = new GHashMap();
        this._mZQLBDG3 = new GHashMap();
        this._mZQLBDG4 = new GHashMap();
        this._mZQLBDG5 = new GHashMap();
        this._mCJZQLBDG = new GHashMap();
        this._mCJZQLBDG2 = new GHashMap();
        this._mCJZQLBDG3 = new GHashMap();
        this._mCJZQLBDG4 = new GHashMap();
        this._mCJZQLBDG5 = new GHashMap();
    }
    Object.defineProperty(FootballDataMrg, "getInstance", {
        get: function () {
            if (FootballDataMrg._mInstance == undefined)
                FootballDataMrg._mInstance = new FootballDataMrg();
            return FootballDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FootballDataMrg.prototype.getDGList = function (type) {
        var list;
        if (type == 2) {
            this._mZQLBDG2.clear();
            list = this._mZQLBDG2;
        }
        else if (type == 3) {
            this._mZQLBDG3.clear();
            list = this._mZQLBDG3;
        }
        else if (type == 4) {
            this._mZQLBDG4.clear();
            list = this._mZQLBDG4;
        }
        else if (type == 5) {
            this._mZQLBDG5.clear();
            list = this._mZQLBDG5;
        }
        var data;
        var fbData;
        for (var _i = 0, _a = this._mZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mZQLBDG.Gget(key);
            for (var _b = 0, _c = data.keys; _b < _c.length; _b++) {
                var key1 = _c[_b];
                fbData = data.Gget(key1);
                if (fbData.listSX[this._mList[type]] != undefined) {
                    list.Gput("" + key, data);
                    break;
                }
            }
        }
        return list;
    };
    FootballDataMrg.prototype.getCJDGList = function (type) {
        var list;
        if (type == 2) {
            this._mCJZQLBDG2.clear();
            list = this._mCJZQLBDG2;
        }
        else if (type == 3) {
            this._mCJZQLBDG3.clear();
            list = this._mCJZQLBDG3;
        }
        else if (type == 4) {
            this._mCJZQLBDG4.clear();
            list = this._mCJZQLBDG4;
        }
        else if (type == 5) {
            this._mCJZQLBDG5.clear();
            list = this._mCJZQLBDG5;
        }
        var data;
        var fbData;
        for (var _i = 0, _a = this._mCJZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mCJZQLBDG.Gget(key);
            for (var _b = 0, _c = data.keys; _b < _c.length; _b++) {
                var key1 = _c[_b];
                fbData = data.Gget(key1);
                if (fbData.listSX[this._mList[type]] != undefined) {
                    list.Gput("" + key, data);
                    break;
                }
            }
        }
        return list;
    };
    /**添加数据 */
    FootballDataMrg.prototype.addData = function (time, fb) {
        if (fb != undefined) {
            this._mZQLB.Gput(time, fb);
        }
    };
    /**添加超级数据 */
    FootballDataMrg.prototype.addCJData = function (time, fb) {
        if (fb != undefined) {
            this._mCJZQLB.Gput(time, fb);
        }
    };
    /**添加单关足球数据 */
    FootballDataMrg.prototype.addDGData = function (time, fb) {
        if (fb != undefined) {
            this._mZQLBDG.Gput(time, fb);
        }
    };
    /**添加超级单关足球数据 */
    FootballDataMrg.prototype.addCJDGData = function (time, fb) {
        if (fb != undefined) {
            this._mCJZQLBDG.Gput(time, fb);
        }
    };
    /**通过当天time 和 场次id获取对象 */
    FootballDataMrg.prototype.getData = function (time, id) {
        if (this._mZQLB[time] != undefined) {
            return this._mZQLB[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**超级通过当天time 和 场次id获取对象 */
    FootballDataMrg.prototype.getCJData = function (time, id) {
        if (this._mCJZQLB[time] != undefined) {
            return this._mCJZQLB[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**通过单关当天time获取对象*/
    FootballDataMrg.prototype.getDataByTime = function (time) {
        return this._mZQLB[time];
    };
    /**超级通过单关当天time获取对象*/
    FootballDataMrg.prototype.getCJDataByTime = function (time) {
        return this._mCJZQLB[time];
    };
    /**通过单关当天time获取对象*/
    FootballDataMrg.prototype.getDGDataByTime = function (time) {
        return this._mZQLBDG[time];
    };
    /**通过超级单关当天time获取对象*/
    FootballDataMrg.prototype.getCJDGDataByTime = function (time) {
        return this._mCJZQLBDG[time];
    };
    /**通过当天time 和 场次id获取单关足球对象 */
    FootballDataMrg.prototype.getDGData = function (time, id) {
        if (this._mZQLBDG[time] != undefined) {
            return this._mZQLBDG[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**通过超级当天time 和 场次id获取单关足球对象 */
    FootballDataMrg.prototype.getCJDGData = function (time, id) {
        if (this._mCJZQLBDG[time] != undefined) {
            return this._mCJZQLBDG[time].Gget(id);
        }
        else {
            return undefined;
        }
    };
    /**通过id获取对象 */
    FootballDataMrg.prototype.getDataById = function (id) {
        var fb;
        for (var _i = 0, _a = this._mZQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mZQLB.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id);
            }
        }
        return undefined;
    };
    /**超级通过id获取对象 */
    FootballDataMrg.prototype.getCJDataById = function (id) {
        var fb;
        for (var _i = 0, _a = this._mCJZQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mCJZQLB.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id);
            }
        }
        return undefined;
    };
    /**通过id获取对象 */
    FootballDataMrg.prototype.getDataDGById = function (id) {
        var fb;
        for (var _i = 0, _a = this._mZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mZQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id);
            }
        }
        return undefined;
    };
    /**通过超级id获取对象 */
    FootballDataMrg.prototype.getCJDataDGById = function (id) {
        var fb;
        for (var _i = 0, _a = this._mCJZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mCJZQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id);
            }
        }
        return undefined;
    };
    /**通过id和下标取对象 */
    FootballDataMrg.prototype.getDataByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mZQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mZQLB.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**超级通过id和下标取对象 */
    FootballDataMrg.prototype.getCJDataByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mCJZQLB.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mCJZQLB.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**通过id和下标取对象 */
    FootballDataMrg.prototype.getDataDGByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mZQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    /**超级通过id和下标取对象 */
    FootballDataMrg.prototype.getCJDataDGByIdAndXB = function (id, xb) {
        var fb;
        for (var _i = 0, _a = this._mCJZQLBDG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            fb = this._mCJZQLBDG.Gget(key);
            if (fb.Gget(id) != undefined) {
                return fb.Gget(id).listSX[xb];
            }
        }
        return undefined;
    };
    return FootballDataMrg;
}());
__reflect(FootballDataMrg.prototype, "FootballDataMrg");
//# sourceMappingURL=FootballDataMrg.js.map