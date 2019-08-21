// /**
//  *	ID:11006	S->C	//玩家当前生命跟连赢数
// 	当天已经免费玩的次数(Byte) + 免费场当前生命值(Byte) + 免费场连赢数(Byte) + 付费场当前生命值(Byte) + 付费场当前连赢数(Byte) 
// 	+ 付费场2当前生命值(Byte) + 付费场2当前连赢数(Byte) + 付费场3当前生命值(Byte) + 付费场3当前连赢数(Byte)
//  */
// class Pro11006 implements GIProHandle{
// 	public constructor() {
// 	}
// 	public handleData(data:egret.ByteArray):void{
// 		GameValue.freeTimes = DZKOverData.getInstance.freeTime - data.readByte();
// 		ArenaWnd.life[ArenaMrg.Free_C] = data.readByte();
// 		ArenaWnd.cupWin[ArenaMrg.Free_C] = data.readByte();
// 		ArenaWnd.life[ArenaMrg.Spend1_C] = data.readByte();
// 		ArenaWnd.cupWin[ArenaMrg.Spend1_C] = data.readByte();
// 		ArenaWnd.life[ArenaMrg.Spend2_C] = data.readByte();
// 		ArenaWnd.cupWin[ArenaMrg.Spend2_C] = data.readByte();
// 		ArenaWnd.life[ArenaMrg.Spend3_C] = data.readByte();
// 		ArenaWnd.cupWin[ArenaMrg.Spend3_C] = data.readByte();
// 		// egret.Tween.get(this).wait(500).call(()=>{
// 		// 	CustEventMrg.getInstance.dispatch(CustEventType.EventType_GetJJC);
// 		// },this);
// 		if(ArenaWnd.getInstance.parent != undefined) {
// 			ArenaWnd.getInstance.showData();
// 		}
// 	}
// } 
//# sourceMappingURL=Pro11006.js.map