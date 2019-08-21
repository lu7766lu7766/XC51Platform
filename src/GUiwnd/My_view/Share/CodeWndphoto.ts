/**二维码 */
class CodeWndphoto extends egret.DisplayObjectContainer{
	private static _mInstance: CodeWndphoto;
    	public static get getInstance(): CodeWndphoto {
		if (CodeWndphoto._mInstance == undefined)
			CodeWndphoto._mInstance = new CodeWndphoto();
		return CodeWndphoto._mInstance;
	}
	public constructor() {
		super();

		this.setDB();
	}

	public show():void{
		if(this.parent==undefined){
			GUIManager.getInstance.mostLay.addChild(this);
			this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
			Alertpaner.getInstance.show("请截图保存，并分享给好友");
		}
	}
	
	private touchDown(e:egret.TouchEvent):void{
		if(e.target == this._mShareC){
			this.hide();
			this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		}
	}

	public hide():void{
		this.clearCode();
		this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		if(this.parent != undefined){
			this.parent.removeChild(this);
		}
	}

	// public changeY(num:number):void{
	// 	this._codeImg2.style.top = 1732+96+40 - num+"px";
	// 	// egret.log(this._codeRect2.y);
	// }

	private _codeImg2: HTMLImageElement;
	private _codeRect2: egret.Rectangle;
	public showCode():void{
		if(this._codeRect2 == undefined){
			this._codeRect2 = new egret.Rectangle(570,395+382+160, 170, 170);
		}
		if(this._codeImg2 == undefined){
			let gameDiv = document.getElementById("gameDiv");
			this._codeImg2 = document.createElement("img");
			if(GameValue.isDebug == false) {
				this._codeImg2.src = "data:image/png;base64," +GetShare.getInstance.imgs;
			} else {
				//this._codeImg2.src = "resource/assets/images/ui/kfCode.png";
				// this._codeImg2.src = "resource/assets/images/ui/ewm_online_mine.png";
			}
			this._codeImg2.style.position = "absolute";
			gameDiv.appendChild(this._codeImg2);
		}
		this._codeImg2.style.display = "inline";
		this.onResize();
		GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
	}
	
	private clearCode(): void {
		if (this._codeImg2) {
			this._codeImg2.style.display = "none";
		}
		GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
	}

	private onResize() {
		if (this._codeImg2 && this._codeRect2) {
			var wScale = document.body.clientWidth /750;
			var hScale = document.body.clientHeight / GameMain.getInstance.StageHeight;
			this._codeImg2.style.width = this._codeRect2.width * wScale + "px";
			this._codeImg2.style.height = this._codeRect2.height * hScale + "px";
			this._codeImg2.style.left = this._codeRect2.x * wScale + "px";
			this._codeImg2.style.top = this._codeRect2.y * hScale + "px";
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this._mShareC.touchEnabled = true;
	    // this.addChildAt(this._mShareC, 0);
	}
}