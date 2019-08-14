var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *	ID:11007	s->c 	//取消匹配结果返回
    结果(Byte 1:成功/0:失败)
 */
var Pro11007 = (function () {
    function Pro11007() {
    }
    Pro11007.prototype.handleData = function (data) {
        var res = data.readByte();
        if (res == 1) {
            GameMain.getInstance.setGameState(GStatus.CommonStatus.getInstance);
        }
    };
    return Pro11007;
}());
__reflect(Pro11007.prototype, "Pro11007", ["GIProHandle"]);
//# sourceMappingURL=Pro11007.js.map