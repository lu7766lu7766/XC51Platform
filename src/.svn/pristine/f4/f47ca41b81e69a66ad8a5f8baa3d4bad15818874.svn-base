/**
 * ID:10001	S->C	登陆返回
	登陆结果(Byte 1:成功 2:失败) + 玩家对象ID--唯一(INT)
 */
class Pro10001 implements GIProHandle{
	public constructor() {
	}
	public handleData(data:egret.ByteArray):void{
		let result = data.readByte();
		UserData.getInstance.userId = data.readInt().toString();
		if(result == 1){
			if(ProManager.IsLog)
				console.log("登录成功");
		}
	}
}