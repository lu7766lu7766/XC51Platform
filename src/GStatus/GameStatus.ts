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
			}
			TenConfon.getInstance.sentConnt();
			DownWnd.getInstance.show();
			QsPhp.getInstance.sendHttp();
			GD_List.getInstance.sendHttp();
			TimePhp.getInstance.sendHttp();
		}

		private _mTime:number = 0;
		public update(it: number): void {
			FiveBox.getInstance.EndOfTime();
			ThreeBox.getInstance.EndOfTime();

			this._mTime += it;
			if(this._mTime > 1000 && GameValue.isJ > 0) {
				this._mTime = 0;
				GameValue.isJ -= 1;
			} else if(this._mTime > 10000) {
				this._mTime = 0;
				TimePhp.getInstance.sendHttp();
			}
		}

		public exitStatus(): void {
			DownWnd.getInstance.hide();
		}
	}
}