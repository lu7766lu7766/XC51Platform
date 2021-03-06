class DmDetailTip extends egret.DisplayObjectContainer{
    private static _mInstance: DmDetailTip;
    public static get getInstance(): DmDetailTip {
        if (DmDetailTip._mInstance == undefined)
            DmDetailTip._mInstance = new DmDetailTip();
        return DmDetailTip._mInstance;
    }

    constructor(){
        super();
        this.touchEnabled = true;

        let btn = new egret.Bitmap();
        this.addChild(btn);
        btn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/qyts_expert@2x.png",(e)=>{
            btn.$setBitmapData(e); 
            btn.x = (GameMain.getInstance.StageWidth - btn.width)*0.5;
            btn.y = (GameMain.getInstance.StageHeight - btn.height)*0.5;
        },this);

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._mShareC){
            this.hide();
        }
    }

    public show():void{
        GUIManager.getInstance.mostLay.addChild(this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }

}