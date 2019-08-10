/**协议管理器 */
class ProManager implements GISocketHandle {
	private static _instance: ProManager;
	public static get getInstance(): ProManager {
		if (this._instance == undefined)
			this._instance = new ProManager;
		return this._instance;
	}
	/**是否打印协议log */
	public static IsLog: boolean = true;
	private _proHandleMap: GHashMap<GIProHandle>;

	public constructor() {
		this.initProto();
	}
	public handlePro(data: egret.ByteArray) {
		if (data.bytesAvailable > 0) {
			let length:number = data.readShort();
			if(length == data.bytesAvailable) {//协议正确
				let proId:number = data.readShort();
				if (ProManager.IsLog)
					egret.log("..收到协议 " + proId);
				if (this._proHandleMap.GhasKey(proId))
					this._proHandleMap.Gget(proId).handleData(data);
			} else {//协议长度不对 断开连接
				let proId:number = data.readShort();
				if (ProManager.IsLog)
					egret.log("..接收长度错误,断开连接" + proId);
				GSocketMager.getInstance.closeSocket();
			}
		}
	}
	private initProto(){
		this._proHandleMap = new GHashMap<GIProHandle>();
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
	}
	/**从字节数组中读取一段UTF字符串 */
	public static readUTFStr(data: egret.ByteArray): string {
		let len = data.readShort();
		return data.readUTFBytes(len);	
	}

	/**从字节数组中读取一个8字节数字 */
	public static read8Bytes(data: egret.ByteArray): number {
		var long_h: number = data.readUnsignedInt();
		var long_l: number = data.readUnsignedInt();
		var result: number = long_h * 4294967296 + long_l;
		return result;
	}

	/**
	 * 发送
	 * @param data
	 * @param pid 协议id
	 */
	public sendPro(data: egret.ByteArray, pid?: number) {
		GSocketMager.getInstance.sendByteArr(data);
		if (pid != undefined && ProManager.IsLog)
			egret.log("发送协议请求 " + pid);
	}

	/**返回一个32位字符串 */
	public static getStr32(name:string):egret.ByteArray {
		let bytes: egret.ByteArray = new egret.ByteArray();
		bytes.writeUTFBytes(name);
		for(let i = bytes.length; i < 32; i++) {
			bytes.writeByte(0);
		}
		return bytes;
	}

	/**链接次数 */
	private static _mConnectTimes:number = 0;
	public _mIsConnect:boolean = false;
	private _mEnterConn:boolean = false;
	/**启动定时器 */
	private _mBeginTime:boolean = false;
	/**联网成功次数 */
	private _mTimesSucc:number = 0;

	/**断开连接回调 */
	public closeCall(): void {//网络断开
		this._mIsConnect = false;
		console.log("网络断开");
		GTimerMag.getInstance.GremoveTimerTask("Heartbeat");
		GSocketMager.getInstance.cleanCacheArr();
		/**五秒自动链接 */
		if(this._mEnterConn == false) {
			GTimerMag.getInstance.addTimerTask("connetTime", 5,1000,this.connect,this);
		}

		this.isTimeThree();
	}

	/**进行链接 */
	private connect():void {
		if(this._mIsConnect == true || this._mTimesSucc > 3) {
			return;
		}

		ProManager._mConnectTimes ++;
		if(ProManager._mConnectTimes >= 2) {
			// OffNet.getInstance.show();
		}
		if(ProManager._mConnectTimes >= 5) {
			GTips.confirm("网络不稳定，请重新登陆...")
			ProManager._mConnectTimes = 0;
			this._mEnterConn = false;
			GSocketMager.getInstance.connectSocket();
		} else {
			GSocketMager.getInstance.connectSocket();
		}
	}

	/**如果10s内断网3次 延迟链接*/
	private isTimeThree():void {
		if(this._mBeginTime == true) {
			// OffNet.getInstance.show();
			return;
		}
		this._mBeginTime = true;
		GTimerMag.getInstance.addTimerTask("isTimeThree",1,3000,()=>{
			this._mTimesSucc = 0;
			this._mBeginTime = false;
			GTimerMag.getInstance.addTimerTask("connetTime", 5,1000,this.connect,this);
		},this);
	}

	/**连接成功回调 */
	public completeCall(): void {
		// GTimerMag.getInstance.GremoveTimerTask("connetTime");
		// OffNet.getInstance.hide();
		// this._mIsConnect = true;
		// this._mEnterConn = false;
		// ProManager._mConnectTimes = 0;
		// this._mTimesSucc++;
		// ProSendMagaer.sendLogin();
	}
}