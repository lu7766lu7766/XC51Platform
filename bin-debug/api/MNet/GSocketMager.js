var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GSocketMager = (function () {
    function GSocketMager() {
        this._mSocketMap = new GHashMap();
    }
    Object.defineProperty(GSocketMager, "getInstance", {
        get: function () {
            if (GSocketMager._mInstance == undefined)
                GSocketMager._mInstance = new GSocketMager();
            return GSocketMager._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GSocketMager.prototype.createSocket = function (url, handle, id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp === null) {
            temp = new MNet.MSocketer(url, handle);
            this._mSocketMap.Gput(id, temp);
        }
    };
    GSocketMager.prototype.sendByteArr = function (Ba, id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.sendByteArray(Ba);
        }
    };
    /**断开连接 */
    GSocketMager.prototype.closeSocket = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.closeSocket();
        }
    };
    /**重新连接 */
    GSocketMager.prototype.connectSocket = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.connectSocket();
        }
    };
    /**清空发送缓存协议 */
    GSocketMager.prototype.cleanCacheArr = function (id) {
        if (id === void 0) { id = 1; }
        var temp = this._mSocketMap.Gget(id);
        if (temp != null) {
            temp.cleanCacheArr();
        }
    };
    return GSocketMager;
}());
__reflect(GSocketMager.prototype, "GSocketMager");
//# sourceMappingURL=GSocketMager.js.map