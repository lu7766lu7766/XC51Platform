class QuestionDropWnd extends egret.DisplayObjectContainer{
    private static _mInstance: QuestionDropWnd;
	public static get getInstance(): QuestionDropWnd {
		if (QuestionDropWnd._mInstance == undefined)
			QuestionDropWnd._mInstance = new QuestionDropWnd();
		return QuestionDropWnd._mInstance;
	}
	private _mList:GHashMap<QuestionDrop>;
	private constructor() {
		super();
		this._mList = new GHashMap<QuestionDrop>();
		this.setDB();
	}

	private _mListStr:string[];
	public show(strList:string[]):void {
		this._mListStr = strList;
		GUIManager.getInstance.tipLay.addChild(this);

		let data:QuestionDrop;
		for(let i=0;i<strList.length;i++) {
			if(this._mList.GhasKey(i)) {
				data = this._mList.Gget(i);
			} else {
				data = new QuestionDrop();
				this._mList.Gput(i,data);
			}
			this.addChild(data);
			data.setStr(strList[i],i);
			data.touchEnabled = true;
			data.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x000000, 0.1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChild(this._mShareC);
		this._mShareC.touchEnabled = true;
		this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

	private touchDown(e:egret.TouchEvent):void{
		if(e.target == this._mShareC) {
			this.hide();
		} else if(e.target instanceof QuestionDrop) {
			this.hide();
			let touch:QuestionDrop = e.target;
			if(touch.str == this._mListStr[0]) {
				HistoryAwardsWnd.getInstance.show(3);
			} 
		}
    }

	public hide():void {
		let data:QuestionDrop;
		for(let key of this._mList.keys) {
			data = this._mList.Gget(key);
			data.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
			if(data.parent != undefined) {
				data.parent.removeChild(data);
			}
		}

		if(this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

}

class QuestionDrop extends egret.DisplayObjectContainer{
	/**黑条背景 */
	private _mHei:egret.Shape;
	/**下划线 */
	private _mXHX:egret.Shape;
	/**显示内容 */
	private _mNR:egret.TextField;
	private ww:number = 180;
	private hh:number = 60;

	public str:string = "";
	public constructor() {
		super();

		this.init();
	}

	private init():void {
		this._mHei = new egret.Shape();
        this.addChild(this._mHei);
        this._mHei.graphics.beginFill(0x646464);
        this._mHei.graphics.drawRect(0,0,this.ww,this.hh);
		this._mHei.graphics.endFill();

		this._mNR = ToolMrg.getText(0,0,24,0xffffff,this.ww);
		this._mNR.height = this.hh;
		this._mNR.textAlign = egret.HorizontalAlign.CENTER;
		this._mNR.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._mNR.text = "";
		this.addChild(this._mNR);

		this._mXHX = new egret.Shape();
        this.addChild(this._mXHX);
        this._mXHX.graphics.beginFill(0xF5F5F7);
        this._mXHX.graphics.drawRect(0,this.hh,this.ww,1.5);
		this._mXHX.graphics.endFill();
	}

	/**设置内容 */
	public setStr(str:string, i:number):void {
		this.str = str;
		if(this._mNR != undefined) {
			this._mNR.text = str;
			
			this.x = GameMain.getInstance.StageWidth - this.ww;
			this.y = 138 + i * (this.hh + 2);
		}
	}
}