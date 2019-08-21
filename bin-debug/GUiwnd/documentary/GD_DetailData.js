var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**跟单数据表 */
var GD_DetailData = (function () {
    function GD_DetailData() {
        this.GD_detailItem = new GHashMap();
        this.GD_UserItem = new GHashMap();
    }
    return GD_DetailData;
}());
__reflect(GD_DetailData.prototype, "GD_DetailData");
/**详情 */
var GD_detailSubdata = (function () {
    function GD_detailSubdata() {
    }
    return GD_detailSubdata;
}());
__reflect(GD_detailSubdata.prototype, "GD_detailSubdata");
/**跟单用户 */
var GD_UserList = (function () {
    function GD_UserList() {
    }
    return GD_UserList;
}());
__reflect(GD_UserList.prototype, "GD_UserList");
//# sourceMappingURL=GD_DetailData.js.map