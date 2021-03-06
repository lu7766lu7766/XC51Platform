/**优惠券 */
class CouponWnd extends egret.DisplayObjectContainer{
    private static _mInstance: CouponWnd;
	public static get getInstance(): CouponWnd {
		if (CouponWnd._mInstance == undefined)
			CouponWnd._mInstance = new CouponWnd();
		return CouponWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;
    private _scroView:egret.ScrollView;
    private _mContain:egret.DisplayObjectContainer;

    constructor(){
        super();
        this.touchEnabled = true;
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 115);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

    public addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}