var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**篮球比分数据管理类 */
var BasketballConfinData = (function () {
    function BasketballConfinData() {
        this._mListObj = new GHashMap();
        // this._mListObj1 = new GHashMap<basketballCofObj>();
        // this._mListObj2 = new GHashMap<basketballCofObj>();
        this._mListObj3 = new GHashMap();
        this._selectList = new GHashMap();
    }
    Object.defineProperty(BasketballConfinData, "getInstance", {
        get: function () {
            if (BasketballConfinData._mInstance == undefined)
                BasketballConfinData._mInstance = new BasketballConfinData();
            return BasketballConfinData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表(即时)*/
    BasketballConfinData.prototype.getlist = function () {
        return this._mListObj;
    };
    // /**获取列表(赛果)*/
    // public getlist1(): GHashMap<basketballCofObj> {
    // 	return this._mListObj1;
    // }
    // /**获取列表(赛程)*/
    // public getlist2(): GHashMap<basketballCofObj> {
    // 	return this._mListObj2;
    // }
    /**获取列表(关注)*/
    BasketballConfinData.prototype.getlist3 = function () {
        return this._mListObj3;
    };
    /**获取列表(筛选)*/
    BasketballConfinData.prototype.getselectlist = function () {
        return this._selectList;
    };
    /**根据id查找对应数据(即时)*/
    BasketballConfinData.prototype.getInfo = function (id) {
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
    BasketballConfinData.prototype.getssInfo = function (id) {
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
    // public getInfo1(id: number): basketballCofObj {
    // 	let data: basketballCofObj;
    // 	for (let key of this._mListObj1.keys) {
    // 		data = this._mListObj1.Gget(key);
    // 		if (id == Number(key)) {
    // 			return data;
    // 		}
    // 	}
    // }
    // /**根据id查找对应数据(赛果)*/
    // public getInfo2(id: number): basketballCofObj {
    // 	let data: basketballCofObj;
    // 	for (let key of this._mListObj2.keys) {
    // 		data = this._mListObj2.Gget(key);
    // 		if (id == Number(key)) {
    // 			return data;
    // 		}
    // 	}
    // }
    /**根据id查找对应数据(关注)*/
    BasketballConfinData.prototype.getInfo3 = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == Number(key)) {
                return data;
            }
        }
    };
    /**根据赛事id查找对应数据(关注)*/
    BasketballConfinData.prototype.getssInfo3 = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == data.id) {
                return data;
            }
        }
    };
    /**根据赛事id查找对应key(关注)*/
    BasketballConfinData.prototype.getInfo33 = function (id) {
        var data;
        for (var _i = 0, _a = this._mListObj3.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj3.Gget(key);
            if (id == data.id) {
                return Number(key);
            }
        }
    };
    /**根据赛事id移除对应数据(关注)*/
    BasketballConfinData.prototype.removeInfo33 = function (id) {
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
    //清除对象数组
    BasketballConfinData.prototype.hideData = function () {
        this._mListObj.clear();
    };
    // //清除对象数组
    // public hideData1(): void {
    // 	this._mListObj1.clear();
    // }
    // //清除对象数组
    // public hideData2(): void {
    // 	this._mListObj2.clear();
    // }
    //清除对象数组
    BasketballConfinData.prototype.hideData3 = function () {
        this._mListObj3.clear();
    };
    //清除对象数组
    BasketballConfinData.prototype.hideDataselect = function () {
        this._selectList.clear();
    };
    /**根据类型获取对应筛选列表*/
    BasketballConfinData.prototype.selectList = function (type) {
        selectBaketInfoData.getInstance.hideData();
        var lsList = new GHashMap();
        var id1 = 1;
        var data;
        var datainfo;
        if (type != 0)
            return;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (data != undefined) {
                datainfo = new bfinfo();
                datainfo.id = data.id;
                datainfo.name = data.name;
                lsList.Gput(id1, datainfo);
                // selectBaketInfoData.getInstance.getlist().Gput(id1, datainfo);
                id1++;
            }
        }
        var kk = 1;
        var bfinfoobj;
        for (var _b = 0, _c = lsList.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            bfinfoobj = lsList.Gget(key);
            if (bfinfoobj != undefined) {
                var gpdata = selectBaketInfoData.getInstance.getnameData(bfinfoobj.name);
                if (gpdata == undefined) {
                    selectBaketInfoData.getInstance.getlist().Gput(kk, bfinfoobj);
                    kk++;
                }
            }
        }
    };
    /**获取赛选后的列表*/
    BasketballConfinData.prototype.selectafterList = function (list) {
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
    return BasketballConfinData;
}());
__reflect(BasketballConfinData.prototype, "BasketballConfinData");
var basketballCofObj = (function () {
    function basketballCofObj() {
        this.status = 0; //赛事状态
    }
    /**获取对应赛事状态*/
    basketballCofObj.prototype.getstatus = function () {
        if (this.status == 0) {
            return "未开赛";
        }
        else if (this.status == 1) {
            return "一节";
        }
        else if (this.status == 2) {
            return "二节";
        }
        else if (this.status == 3) {
            return "三节";
        }
        else if (this.status == 4) {
            return "四节";
        }
        else if (this.status == 5) {
            return "1'OT";
        }
        else if (this.status == -1) {
            return "完场";
        }
        else if (this.status == -2) {
            return "待定";
        }
        else if (this.status == -3) {
            return "中断";
        }
        else if (this.status == -4) {
            return "取消";
        }
        else if (this.status == -5) {
            return "推迟";
        }
        else if (this.status == 50) {
            return "中场";
        }
    };
    return basketballCofObj;
}());
__reflect(basketballCofObj.prototype, "basketballCofObj");
//# sourceMappingURL=BasketballConfinData.js.map