var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GameValue = (function () {
    function GameValue() {
    }
    Object.defineProperty(GameValue, "getInstance", {
        get: function () {
            if (GameValue._mInstance == undefined)
                GameValue._mInstance = new GameValue();
            return GameValue._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**服务器是否为调试模式 true:测试服 false:正式服 ===重点===*/
    GameValue.isDebug = false;
    /**游戏版本 */
    GameValue.gameVer = "9.4";
    /**php版本 */
    GameValue.verPhp = "1.1";
    /**socket地址 */
    GameValue.socketUrl = "ws://106.75.130.10:8880/dddddd";
    /**连接服务器成功 1成功 2失败 3(99初始化)*/
    GameValue.severType = 1;
    /**屏幕适配值(顶部) */
    GameValue.adaptationScreen = 0;
    /**客服二维码路径 */
    GameValue.codeURL = "";
    /**当前键盘所在位置 */
    GameValue.keydownNum = 0;
    /**霸占全部佣金 0:否 1:是*/
    GameValue.isBZQBYJ = 0;
    /**0:普通用户   1:认证大神 2正在申请 */
    GameValue.isDryingList = 0;
    /**请求间隔 10s*/
    GameValue.httpSendTime = 10000;
    /**支付订单key */
    GameValue.orderKey = "";
    /**排三期数 */
    GameValue.threeQS = 0;
    /**排五期数 */
    GameValue.fiveQS = 0;
    /**截止时间 */
    GameValue.stopTime = 0;
    /**1销售中 0停止销售 */
    GameValue.typeQS = 0;
    /**是否可以打开竞猜 0不能打开 1可打开*/
    GameValue.isJ = 1;
    /**单倍下注 反水比例*/
    GameValue.fsRate = 10;
    /**客服跳转 */
    GameValue.kfUrl = "https://vm.providesupport.com/0o9t1ktmxghcq1oagixycxoww1";
    return GameValue;
}());
__reflect(GameValue.prototype, "GameValue");
//# sourceMappingURL=GameValue.js.map