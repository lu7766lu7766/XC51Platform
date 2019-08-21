namespace MNet {
	export class MSocketer {
		private _mCacheArr: Array<egret.ByteArray>;
		private _mSocket: egret.WebSocket;
		private _mUrl: string;
		private _mHandle: GISocketHandle;

		public constructor(url: string, handle: GISocketHandle) {
			this._mUrl = url;
			this._mHandle = handle;
			this._mCacheArr = new Array();
			this.connect();
		}

		public sendByteArray(data: egret.ByteArray) {
			this._mCacheArr.push(data);
			if (this.checkSocket() == false) {
				// this.connect();
				this._mHandle.closeCall();
			} else {
				this.write2Socket();
			}

		}

		private write2Socket() {
			while (this.checkSocket() && this._mCacheArr.length > 0) {
				let temp: egret.ByteArray = this._mCacheArr.shift();
				this._mSocket.writeBytes(temp);
				this._mSocket.flush();
			}
		}


		private checkSocket() {
			if (this._mSocket == undefined || this._mSocket.connected === false)
				return false;
			return true;
		}

		private connect() {
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
		}

		private onClose(e: egret.Event) {
			egret.log("---------socket主动断开了-----------");
			this._mHandle.closeCall();
		}

		private onComplete(e: egret.Event) {
			egret.log("成功连接服务器:" + this._mUrl);
			this._mHandle.completeCall();
		}

		private onError(e: egret.IOErrorEvent) {
			egret.log("---------socket连接服务器IO错误------------");
			// if (this._mCacheArr.length > 0) {
			// 	this.connect();
			// }
		}

		private onData(e: egret.ProgressEvent) {
			let byteArr = new egret.ByteArray;
			this._mSocket.readBytes(byteArr);
			this._mHandle.handlePro(byteArr);
		}

		/**断开连接 */
		public closeSocket():void {
			this._mSocket.close;
		}

		/**重新连接 */
		public connectSocket():void {
			this.connect();
		}

		/**清空所有发送协议 */
		public cleanCacheArr():void {
			this._mCacheArr.splice(0,this._mCacheArr.length);
		}
	}
}