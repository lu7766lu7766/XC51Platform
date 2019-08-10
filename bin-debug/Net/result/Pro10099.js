var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * ID:10099	S->C	登陆初始化数据发送完毕 返回
 */
var Pro10099 = (function () {
    function Pro10099() {
    }
    Pro10099.prototype.handleData = function (data) {
        // LoadingWnd2.getInstance.onLoadEnd();
        this.sendHeartbeat();
    };
    /**5秒发送一次心跳 */
    Pro10099.prototype.sendHeartbeat = function () {
        GTimerMag.getInstance.addTimerTask("Heartbeat", 99999999, 5000, function () {
            ProSendMagaer.sendHeartbeat();
        }, this);
    };
    return Pro10099;
}());
__reflect(Pro10099.prototype, "Pro10099", ["GIProHandle"]);
//# sourceMappingURL=Pro10099.js.map