var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GTips = (function () {
    function GTips() {
    }
    GTips.confirm = function (massage) {
        return confirm(massage);
    };
    GTips.alert = function (message) {
        alert(message);
    };
    return GTips;
}());
__reflect(GTips.prototype, "GTips");
//# sourceMappingURL=GTips.js.map