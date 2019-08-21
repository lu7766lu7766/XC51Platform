var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MNet;
(function (MNet) {
    var MSocketer = (function () {
        function MSocketer(url, handle) {
            this._mUrl = url;
            this._mHandle = handle;
            this._mCacheArr = new Array();
            this.connect();
        }
        MSocketer.prototype.sendByteArray = function (data) {
            this._mCacheArr.push(data);
            if (this.checkSocket() == false) {
                // this.connect();
                this._mHandle.closeCall();
            }
            else {
                this.write2Socket();
            }
        };
        MSocketer.prototype.write2Socket = function () {
            while (this.checkSocket() && this._mCacheArr.length > 0) {
                var temp = this._mCacheArr.shift();
                this._mSocket.writeBytes(temp);
                this._mSocket.flush();
            }
        };
        MSocketer.prototype.checkSocket = function () {
            if (this._mSocket == undefined || this._mSocket.connected === false)
                return false;
            return true;
        };
        MSocketer.prototype.connect = function () {
            if (this._mSocket == undefined) {
                this._mSocket = new egret.WebSocket();
                this._mSocket.type = egret.WebSocket.TYPE_BINARY;
                if (this._mSocket.hasEventListener(egret.Event.CONNECT) == false) {
                    this._mSocket.addEventListener(egret.Event.CONNECT, this.onComplete, this);
                    this._mSocket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
                    this._mSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onData, this);
                    this._mSocket.addEventListener(egret.Event.CLOSE, this.onClose, this);
                }
            }
            if (this._mSocket.connected === false)
                this._mSocket.connectByUrl(this._mUrl);
        };
        MSocketer.prototype.onClose = function (e) {
            egret.log("---------socket主动断开了-----------");
            this._mHandle.closeCall();
        };
        MSocketer.prototype.onComplete = function (e) {
            egret.log("成功连接服务器:" + this._mUrl);
            this._mHandle.completeCall();
        };
        MSocketer.prototype.onError = function (e) {
            egret.log("---------socket连接服务器IO错误------------");
            // if (this._mCacheArr.length > 0) {
            // 	this.connect();
            // }
        };
        MSocketer.prototype.onData = function (e) {
            var byteArr = new egret.ByteArray;
            this._mSocket.readBytes(byteArr);
            this._mHandle.handlePro(byteArr);
        };
        /**断开连接 */
        MSocketer.prototype.closeSocket = function () {
            this._mSocket.close;
        };
        /**重新连接 */
        MSocketer.prototype.connectSocket = function () {
            this.connect();
        };
        /**清空所有发送协议 */
        MSocketer.prototype.cleanCacheArr = function () {
            this._mCacheArr.splice(0, this._mCacheArr.length);
        };
        return MSocketer;
    }());
    MNet.MSocketer = MSocketer;
    __reflect(MSocketer.prototype, "MNet.MSocketer");
})(MNet || (MNet = {}));
//# sourceMappingURL=MSocketer.js.map