var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**头像选择逻辑管理类 */
var selectHeadIconData = (function (_super) {
    __extends(selectHeadIconData, _super);
    function selectHeadIconData() {
        return _super.call(this) || this;
    }
    Object.defineProperty(selectHeadIconData, "getInstance", {
        get: function () {
            if (selectHeadIconData._mInstance == undefined)
                selectHeadIconData._mInstance = new selectHeadIconData();
            return selectHeadIconData._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**选择头像*/
    selectHeadIconData.setlectHeadIcon = function () {
        var list = selectHeadIconMrf.getInstance.getlistList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (i == selectHeadIconData.selectheadIconID) {
                    data.selectIcon(true);
                }
                else {
                    data.selectIcon(false);
                }
            }
        }
    };
    /**设置初始头像*/
    selectHeadIconData.prototype.setlectHeadIcon1 = function () {
        var list = selectHeadIconMrf.getInstance.getlistList();
        var data;
        for (var i = 1; i <= list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                if (i == selectHeadIconData.userIconID) {
                    data.selectIcon(true);
                }
                else {
                    data.selectIcon(false);
                }
            }
        }
    };
    /**获取当前头像*/
    selectHeadIconData.prototype.getdefault = function () {
        return "resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png";
    };
    selectHeadIconData.selectheadIconID = 1; //用户头像选择id
    selectHeadIconData.userIconID = 1; //用户在用id
    return selectHeadIconData;
}(egret.DisplayObjectContainer));
__reflect(selectHeadIconData.prototype, "selectHeadIconData");
//# sourceMappingURL=selectHeadIconData.js.map