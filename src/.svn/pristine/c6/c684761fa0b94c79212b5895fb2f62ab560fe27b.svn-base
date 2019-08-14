/**
 * ID:10099	S->C	登陆初始化数据发送完毕 返回
 */
class Pro10099 implements GIProHandle{
	public constructor() {
	}
	public handleData(data:egret.ByteArray):void{
		// LoadingWnd2.getInstance.onLoadEnd();
		this.sendHeartbeat();
	}

	/**5秒发送一次心跳 */
	private sendHeartbeat():void{
		GTimerMag.getInstance.addTimerTask("Heartbeat",99999999,5000,()=>{
			ProSendMagaer.sendHeartbeat();
		},this);
	}
}