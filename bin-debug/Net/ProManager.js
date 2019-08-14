var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**协议管理器 */
var ProManager = (function () {
    function ProManager() {
        this._mIsConnect = false;
        this._mEnterConn = false;
        /**启动定时器 */
        this._mBeginTime = false;
        /**联网成功次数 */
        this._mTimesSucc = 0;
        this.initProto();
    }
    Object.defineProperty(ProManager, "getInstance", {
        get: function () {
            if (this._instance == undefined)
                this._instance = new ProManager;
            return this._instance;
        },
        enumerable: true,
        configurable: true
    });
    ProManager.prototype.handlePro = function (data) {
        if (data.bytesAvailable > 0) {
            var length_1 = data.readShort();
            if (length_1 == data.bytesAvailable) {
                var proId = data.readShort();
                if (ProManager.IsLog)
                    egret.log("..收到协议 " + proId);
                if (this._proHandleMap.GhasKey(proId))
                    this._proHandleMap.Gget(proId).handleData(data);
            }
            else {
                var proId = data.readShort();
                if (ProManager.IsLog)
                    egret.log("..接收长度错误,断开连接" + proId);
                GSocketMager.getInstance.closeSocket();
            }
        }
    };
    ProManager.prototype.initProto = function () {
        this._proHandleMap = new GHashMap();
        this._proHandleMap.Gput(10099, new Pro10099());
        this._proHandleMap.Gput(10001, new Pro10001());
        this._proHandleMap.Gput(10002, new Pro10002());
        // this._proHandleMap.Gput(11001, new Pro11001());
        // this._proHandleMap.Gput(11002, new Pro11002());
        // this._proHandleMap.Gput(11004, new Pro11004());
        // this._proHandleMap.Gput(11005, new Pro11005());
        // this._proHandleMap.Gput(11006, new Pro11006());
        this._proHandleMap.Gput(11007, new Pro11007());
        this._proHandleMap.Gput(10302, new Pro10302());
    };
    /**从字节数组中读取一段UTF字符串 */
    ProManager.readUTFStr = function (data) {
        var len = data.readShort();
        return data.readUTFBytes(len);
    };
    /**从字节数组中读取一个8字节数字 */
    ProManager.read8Bytes = function (data) {
        var long_h = data.readUnsignedInt();
        var long_l = data.readUnsignedInt();
        var result = long_h * 4294967296 + long_l;
        return result;
    };
    /**
     * 发送
     * @param data
     * @param pid 协议id
     */
    ProManager.prototype.sendPro = function (data, pid) {
        GSocketMager.getInstance.sendByteArr(data);
        if (pid != undefined && ProManager.IsLog)
            egret.log("发送协议请求 " + pid);
    };
    /**返回一个32位字符串 */
    ProManager.getStr32 = function (name) {
        var bytes = new egret.ByteArray();
        bytes.writeUTFBytes(name);
        for (var i = bytes.length; i < 32; i++) {
            bytes.writeByte(0);
        }
        return bytes;
    };
    /**断开连接回调 */
    ProManager.prototype.closeCall = function () {
        this._mIsConnect = false;
        console.log("网络断开");
        GTimerMag.getInstance.GremoveTimerTask("Heartbeat");
        GSocketMager.getInstance.cleanCacheArr();
        /**五秒自动链接 */
        if (this._mEnterConn == false) {
            GTimerMag.getInstance.addTimerTask("connetTime", 5, 1000, this.connect, this);
        }
        this.isTimeThree();
    };
    /**进行链接 */
    ProManager.prototype.connect = function () {
        if (this._mIsConnect == true || this._mTimesSucc > 3) {
            return;
        }
        ProManager._mConnectTimes++;
        if (ProManager._mConnectTimes >= 2) {
            // OffNet.getInstance.show();
        }
        if (ProManager._mConnectTimes >= 5) {
            GTips.confirm("网络不稳定，请重新登陆...");
            ProManager._mConnectTimes = 0;
            this._mEnterConn = false;
            GSocketMager.getInstance.connectSocket();
        }
        else {
            GSocketMager.getInstance.connectSocket();
        }
    };
    /**如果10s内断网3次 延迟链接*/
    ProManager.prototype.isTimeThree = function () {
        var _this = this;
        if (this._mBeginTime == true) {
            // OffNet.getInstance.show();
            return;
        }
        this._mBeginTime = true;
        GTimerMag.getInstance.addTimerTask("isTimeThree", 1, 3000, function () {
            _this._mTimesSucc = 0;
            _this._mBeginTime = false;
            GTimerMag.getInstance.addTimerTask("connetTime", 5, 1000, _this.connect, _this);
        }, this);
    };
    /**连接成功回调 */
    ProManager.prototype.completeCall = function () {
        // GTimerMag.getInstance.GremoveTimerTask("connetTime");
        // OffNet.getInstance.hide();
        // this._mIsConnect = true;
        // this._mEnterConn = false;
        // ProManager._mConnectTimes = 0;
        // this._mTimesSucc++;
        // ProSendMagaer.sendLogin();
    };
    /**是否打印协议log */
    ProManager.IsLog = true;
    /**链接次数 */
    ProManager._mConnectTimes = 0;
    return ProManager;
}());
__reflect(ProManager.prototype, "ProManager", ["GISocketHandle"]);
//# sourceMappingURL=ProManager.js.map