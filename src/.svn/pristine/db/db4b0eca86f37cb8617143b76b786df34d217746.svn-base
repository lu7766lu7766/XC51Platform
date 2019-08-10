namespace GStatus {
	export class LoadingStatus implements GIGameStatus {
		private static _mInstance:LoadingStatus;
		public static get getInstance():LoadingStatus{
			if(LoadingStatus._mInstance == undefined)
				LoadingStatus._mInstance = new LoadingStatus();
			return LoadingStatus._mInstance;
		}

		/**0:初始化状态(展示背景页面) 
		 * 
		 * 10:正在处理微信登陆 11:登陆微信已经完成 
		 * 20:php请求  21php请求成功 php请求失败
		 * 30:获取userInfo 
		 * 40:解析query 
		 * 70:视频初始化
		 * 
		 * 50:加载界面已显示 51等待加载完成  
		 * 60: 61:socket连接服务器 70:全部准备就绪
		 * 
		 * */
		private _mStatue:number = 0;

		private constructor() {
		}

		public enterStatus():void{
			this._mStatue = 0;
		}

		private _mPHPTimes:number = 3;
		private _mJavaTimes:number = 5;
		public update(it:number):void{
			if(this._mStatue == 0) {
				this._mStatue = 50;
			} else if(this._mStatue == 50) {
				GUiwnd.LoadingWnd.getInstance.show();
				this._mStatue = 51;
				egret.log("php请求返回 进行资源加载");
			} else if(this._mStatue == 51) {
				if(GUiwnd.LoadingWnd.getInstance.parent != undefined)
					GUiwnd.LoadingWnd.getInstance.update(it);

				if(GUiwnd.LoadingWnd.getInstance.isLoad == true) {
					this._mStatue = 60;
				}
			} else if(this._mStatue == 60) {
				GameMain.getInstance.setGameState(GStatus.GameStatus.getInstance);
				
				// GSocketMager.getInstance.createSocket(GameValue.socketUrl, ProManager.getInstance);
				// egret.log("资源加载完成 请求java服务器 ");
				// this._mStatue = 61;
			} else if(this._mStatue == 61) {
				if(GameValue.severType == 3) {//进入游戏
					GameMain.getInstance.setGameState(GStatus.GameStatus.getInstance);
					egret.log("java服务登陆成功 进入游戏");
				} else if(GameValue.severType == 2) {
					this._mJavaTimes--;
					if(this._mJavaTimes > 0) {
						this._mStatue = 60;
					} else {//真正请求失败

					}
				}
			}
		}

		/**微信登陆成功 */
		public wxLoginFinish():void {
			this._mStatue = 50;
		}

		public exitStatus():void{
			GUiwnd.LoadingWnd.getInstance.hide();
		}
	}
}