var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**足球比分数据管理类 */
var FootballConfinData = (function () {
    function FootballConfinData() {
        this._mListObj = new GHashMap();
        this._mListObj1 = new GHashMap();
        this._mListObj2 = new GHashMap();
        this._mListObj3 = new GHashMap();
        this._selectList = new GHashMap();
        this.initgz();
    }
    Object.defineProperty(FootballConfinData, "getInstance", {
        get: function () {
            if (FootballConfinData._mInstance == undefined)
                FootballConfinData._mInstance = new FootballConfinData();
            return FootballConfinData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表(筛选)*/
    FootballConfinData.prototype.getselectlist = function () {
        return this._selectList;
    };
    /**获取列表(即时)*/
    FootballConfinData.prototype.getlist = function () {
        return this._mListObj;
    };
    /**获取列表(赛果)*/
    FootballConfinData.prototype.getlist1 = function () {
        return this._mListObj1;
    };
    /**获取列表(赛程)*/
    FootballConfinData.prototype.getlist2 = function () {
        return this._mListObj2;
    };
    /**获取列表(关注)*/
    FootballConfinData.prototype.getlist3 = function () {
        return this._mListObj3;
    };
    /**根据类型获取对应筛选列表*/
    FootballConfinData.prototype.selectList = function (type) {
        var lsList = new GHashMap();
        this.hideDataselect();
        selectFootInfoData.getInstance.hideData();
        var id1 = 1;
        var data;
        var datainfo;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (data != undefined) {
                if (type == 0) {
                    datainfo = new bfinfo();
                    datainfo.id = data.id;
                    datainfo.name = data.name;
                    datainfo.type = data.type;
                    lsList.Gput(id1, datainfo);
                    // selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
                    id1++;
                }
                else {
                    if (data.type == type) {
                        datainfo = new bfinfo();
                        datainfo.id = data.id;
                        datainfo.name = data.name;
                        datainfo.type = data.type;
                        lsList.Gput(id1, datainfo);
                        // selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
                        id1++;
                    }
                }
            }
        }
        var kk = 1;
        var bfinfoobj;
        for (var _b = 0, _c = lsList.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            bfinfoobj = lsList.Gget(key);
            if (bfinfoobj != undefined) {
                var gpdata = selectFootInfoData.getInstance.getnameData(bfinfoobj.name);
                if (gpdata == undefined) {
                    selectFootInfoData.getInstance.getlist().Gput(kk, bfinfoobj);
                    kk++;
                }
            }
        }
    };
    /**获取筛选后的列表*/
    FootballConfinData.prototype.selectafterList = function (list) {
        this.hideDataselect();
        var id1 = 1;
        var data;
        for (var i = 0; i < list.length; i++) {
            for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                data = this._mListObj.Gget(key);
                if (data != undefined) {
                    if (data.name == list[i]) {
                        this._selectList.Gput(id1, data);
                        id1++;
                    }
                }
            }
        }
    };
    /**根据id查找对应数据(筛选)*/
    FootballConfinData.prototype.getselectInfo = function (id) {
        var data;
        for (var _i = 0, _a = this._selectList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._selectList.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    /**根据id查找对应数据(即时)*/
    FootballConfinData.prototype.getInfo = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    /**根据赛事id查找对应数据(即时)*/
    FootballConfinData.prototype.getInfoss = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (id == data.id) {
                return data;
            }
        }
    };
    // /**根据id查找对应数据(赛果)*/
    // public getInfo1(id: number): footballCofObj {
    // 	let data: footballCofObj;
    // 	for (let key of this._mListObj1.keys) {
    // 		data = this._mListObj1.Gget(key);
    // 		if (id == Number(key)) {
    // 			return data;
    // 		}
    // 	}
    // }
    // /**根据id查找对应数据(赛程)*/
    // public getInfo2(id: number): footballCofObj {
    // 	let data: footballCofObj;
    // 	for (let key of this._mListObj2.keys) {
    // 		data = this._mListObj2.Gget(key);
    // 		if (id == Number(key)) {
    // 			return data;
    // 		}
    // 	}
    // }
    /**根据id查找对应数据(关注)*/
    FootballConfinData.prototype.getInfo3 = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    /**根据id查找对应数据(关注)*/
    FootballConfinData.prototype.getInfo3ss = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == data.id) {
                return data;
            }
        }
    };
    /**根据赛事id移除对应数据(关注)*/
    FootballConfinData.prototype.removInfo3ss = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == data.id) {
                this._mListObj3.GremoveByKey(key);
                return;
            }
        }
    };
    /**根据赛事id查找对应key(关注)*/
    FootballConfinData.prototype.getInfo33 = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == data.id) {
                return Number(key);
            }
        }
    };
    //清除对象数组
    FootballConfinData.prototype.hideDataselect = function () {
        this._selectList.clear();
    };
    //清除对象数组
    FootballConfinData.prototype.hideData = function () {
        this._mListObj.clear();
    };
    //清除对象数组
    FootballConfinData.prototype.hideData1 = function () {
        this._mListObj1.clear();
    };
    //清除对象数组
    FootballConfinData.prototype.hideData2 = function () {
        this._mListObj2.clear();
    };
    //清除对象数组
    FootballConfinData.prototype.hideData3 = function () {
        this._mListObj3.clear();
    };
    /**保存关注列表永久列表（id 排序 赛事id typeid）*/
    FootballConfinData.prototype.savegz = function (id, typeid) {
        CacheMrg.getInstance.addYJTime("FootballConfinData" + id, typeid);
    };
    /**获取初始化关注列表*/
    FootballConfinData.prototype.initgz = function () {
        var allList = this.getallNum();
        for (var i = 1; i <= allList; i++) {
            var id = Number(CacheMrg.getInstance.getYJTime("FootballConfinData" + i));
            FootballConfinData.numList[i - 1];
        }
    };
    /**保存关注列表总个数*/
    FootballConfinData.prototype.saveallNum = function (id) {
        CacheMrg.getInstance.addYJTime("FootballConfinData", id);
    };
    /**保存关注列表总个数*/
    FootballConfinData.prototype.getallNum = function () {
        var alllist = CacheMrg.getInstance.getYJTime("FootballConfinData");
        return Number(alllist);
    };
    FootballConfinData.gzNum = 0; //关注列表个数
    FootballConfinData.numList = []; //关注赛事id列表
    return FootballConfinData;
}());
__reflect(FootballConfinData.prototype, "FootballConfinData");
var footballCofObj = (function () {
    function footballCofObj() {
        this.status = 0; //赛事状态
    }
    /**获取对应赛事状态*/
    footballCofObj.prototype.getstatus = function () {
        if (this.status == 0) {
            return "未开";
        }
        else if (this.status == 1) {
            return "上半场";
        }
        else if (this.status == 2) {
            return "中场";
        }
        else if (this.status == 3) {
            return "下半场";
        }
        else if (this.status == 4) {
            return "加时";
        }
        else if (this.status == 5) {
            return "点球";
        }
        else if (this.status == -11) {
            return "待定";
        }
        else if (this.status == -12) {
            return "腰斩";
        }
        else if (this.status == -13) {
            return "中断";
        }
        else if (this.status == -14) {
            return "推迟";
        }
        else if (this.status == -1) {
            return "完场";
        }
        else if (this.status == -10) {
            return "取消";
        }
    };
    return footballCofObj;
}());
__reflect(footballCofObj.prototype, "footballCofObj");
//# sourceMappingURL=FootballConfinData.js.map