var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ID:10001	S->C	登陆返回
    登陆结果(Byte 1:成功 2:失败) + 玩家对象ID--唯一(INT)
 */
var Pro10001 = (function () {
    function Pro10001() {
    }
    Pro10001.prototype.handleData = function (data) {
        var result = data.readByte();
        UserData.getInstance.userId = data.readInt().toString();
        if (result == 1) {
            if (ProManager.IsLog)
                console.log("登录成功");
        }
    };
    return Pro10001;
}());
__reflect(Pro10001.prototype, "Pro10001", ["GIProHandle"]);
//# sourceMappingURL=Pro10001.js.map