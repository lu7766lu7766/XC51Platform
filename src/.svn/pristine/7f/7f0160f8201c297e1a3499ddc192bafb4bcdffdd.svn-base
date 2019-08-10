// /**
//  * ID:11005	S->C	//场次结算
//  * 赢(Byte 1:赢/0:输) + 本场是否有人使用了复活卡 (Byte 1:有人使用/0:没人使用)+ 游戏用时(INT)
//  */
// class Pro11005 implements GIProHandle{
// 	public constructor() {
// 	}
// 	public handleData(data:egret.ByteArray):void{
// 		if(XSNData.requestGame == false) {
// 			return;
// 		}
		
// 		if(XSNData.enterGame == false) {
// 				if(MatchingWnd.getInstance.parent != undefined) {
// 					XSNData.beginGame = false;
// 					GameMain.getInstance.setGameState(GStatus.CommonStatus.getInstance);
// 				}
// 				return;
// 		}
// 		let wOrf:number = data.readByte();
// 		GameValue.useLife = data.readByte();
// 		XSNData.succOrFail = wOrf;
// 		SuccOrFailUI.getInstance.show();
// 		XSNData.enterGame = false;

// 		if(wOrf == 0) {
// 			egret.Tween.get(this).wait(2500).call(()=>{
// 				XSNData.finish = true;
// 			});
// 			ArenaWnd.isWin[ArenaMrg.typeGame] = 1;
// 		} else {
// 			XSNData.finish = true;
// 			XSNData.move_BG = false;
// 			ArenaWnd.isWin[ArenaMrg.typeGame] = 2;
// 		}
// 	}
// }