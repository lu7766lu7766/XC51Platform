namespace GStatus {
	export class GameStatus implements GIGameStatus {
		private static _mInstance: GameStatus;
		public static get getInstance(): GameStatus {
			if (GameStatus._mInstance == undefined)
				GameStatus._mInstance = new GameStatus();
			return GameStatus._mInstance;
		}

		private constructor() {
			
		}

		public enterStatus(): void {
			if (UserData.getInstance.isLogin() == true) {
				LoginPhp.getInstance.sendHttp(UserData.getInstance.account, UserData.getInstance.password);
				GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
			}
			TenConfon.getInstance.sentConnt();
			DownWnd.getInstance.show();
			QsPhp.getInstance.sendHttp();
			GD_List.getInstance.sendHttp();
		}

		public update(it: number): void {
			FiveBox.getInstance.EndOfTime();
			ThreeBox.getInstance.EndOfTime();
		}

		public exitStatus(): void {
			DownWnd.getInstance.hide();
		}
	}
}