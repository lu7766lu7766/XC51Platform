var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ID:11004 	s->c 	//返回结果
 *	结果(byte 1:退出成功)
 */
var Pro11004 = (function () {
    function Pro11004() {
    }
    Pro11004.prototype.handleData = function (data) {
        var res = data.readByte();
    };
    return Pro11004;
}());
__reflect(Pro11004.prototype, "Pro11004", ["GIProHandle"]);
//# sourceMappingURL=Pro11004.js.map