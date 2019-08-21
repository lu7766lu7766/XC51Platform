var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**赛事筛选数据 */
var selectFileData = (function () {
    function selectFileData() {
    }
    Object.defineProperty(selectFileData, "getInstance", {
        get: function () {
            if (selectFileData._mInstance == undefined)
                selectFileData._mInstance = new selectFileData();
            return selectFileData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**红色选择下滑线的逻辑处理*/
    selectFileData.prototype.redxdecide = function () {
        var list = SelectMrg.getInstance.gettopList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (SelectMrg.inIndex == i) {
                    data.selectInfo();
                }
                else {
                    data.noselectInfo();
                }
            }
        }
        LowSelectBnt.getInstance.initSelect();
        AllSelectSS.getInstance.show();
        SelectMrg.getInstance.redXXTween();
    };
    /**重置红色选择*/
    selectFileData.prototype.resetAllredx = function () {
        var list = SelectMrg.getInstance.gettopList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (SelectMrg.inIndex == i) {
                    data.selectInfo();
                }
                else {
                    data.noselectInfo();
                }
            }
        }
    };
    /**足球显示 "全部", "一级", "竞彩", "足彩", "单场"   篮球只显示 全部 */
    selectFileData.prototype.shouhide = function () {
        var type = BakorfallViewMrg.stateIndex;
        var list = SelectMrg.getInstance.gettopList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (type == 0) {
                    data.gettatile().visible = true;
                    data.setonclick(true);
                }
                else {
                    if (i == 1) {
                        data.gettatile().visible = true;
                        data.setonclick(true);
                    }
                    else {
                        data.gettatile().visible = false;
                        data.setonclick(false);
                    }
                }
            }
        }
    };
    /**全选或反选(1 全选 2返选)*/
    selectFileData.prototype.selectall = function (type) {
        var list = AllSelectSS.getInstance.getlist();
        var dataobj;
        for (var _i = 0, _a = list.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataobj = list.Gget(key);
            if (dataobj != undefined) {
                if (type == 1) {
                    dataobj.setSTatusID(1);
                }
                else if (type == 2) {
                    dataobj.setSTatusID(2);
                }
            }
        }
    };
    /**获取当前赛事隐藏场数*/
    selectFileData.prototype.gethideNum = function () {
        var numType = 0;
        var list = AllSelectSS.getInstance.getlist();
        var dataobj;
        for (var _i = 0, _a = list.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataobj = list.Gget(key);
            if (dataobj != undefined && dataobj.parent != undefined) {
                if (dataobj.getstatusID() == 2) {
                    numType++;
                }
            }
        }
        return numType;
    };
    /**获取当前是否有选择赛事*/
    selectFileData.prototype.ifholdss = function () {
        var list = AllSelectSS.getInstance.getlist();
        var decide = false;
        var dataobj;
        for (var _i = 0, _a = list.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataobj = list.Gget(key);
            if (dataobj != undefined && dataobj.parent != undefined) {
                if (dataobj.getstatusID() == 1) {
                    return true;
                }
            }
        }
        return decide;
    };
    /**点确定时获取全部赛事id列表*/
    selectFileData.prototype.setList = function () {
        var type = BakorfallViewMrg.stateIndex;
        var list = AllSelectSS.getInstance.getlist();
        var dataobj;
        var sslist = [];
        var id = 0;
        for (var _i = 0, _a = list.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataobj = list.Gget(key);
            if (dataobj != undefined) {
                if (dataobj.parent != undefined) {
                    if (type == 0) {
                        if (dataobj.getstatusID() == 1) {
                            sslist[id] = dataobj.getssName();
                            id++;
                        }
                    }
                    else if (type == 1) {
                        if (dataobj.getstatusID() == 1) {
                            sslist[id] = dataobj.getssName();
                            id++;
                        }
                    }
                }
            }
        }
        return sslist;
    };
    return selectFileData;
}());
__reflect(selectFileData.prototype, "selectFileData");
//# sourceMappingURL=selectFileData.js.map