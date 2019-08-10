/**
 *	ID:11007	s->c 	//取消匹配结果返回
	结果(Byte 1:成功/0:失败)	
 */
class Pro11007 implements GIProHandle{
	public constructor() {
	}
	public handleData(data:egret.ByteArray):void{
		let res = data.readByte();
		if(res == 1) {
			GameMain.getInstance.setGameState(GStatus.CommonStatus.getInstance);
		}
	}
}