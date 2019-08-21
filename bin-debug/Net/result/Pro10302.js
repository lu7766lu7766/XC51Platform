var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ID:10302	s->c
    玩家当天已免费玩的次数(INT)
 */
var Pro10302 = (function () {
    function Pro10302() {
    }
    Pro10302.prototype.handleData = function (data) {
        // GameValue.wkFreeTimes = data.readInt();
    };
    return Pro10302;
}());
__reflect(Pro10302.prototype, "Pro10302", ["GIProHandle"]);
//# sourceMappingURL=Pro10302.js.map