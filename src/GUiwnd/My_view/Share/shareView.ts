/**呼朋唤友分享图 */
class shareView extends egret.DisplayObjectContainer{
    private static _mInstance: shareView;
	public static get getInstance(): shareView {
		if (shareView._mInstance == undefined)
			shareView._mInstance = new shareView();
		return shareView._mInstance;
	}

    private _click:egret.Bitmap;
    private _img:egret.Bitmap;

    constructor(){
        super();

        this.touchEnabled = true;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        RES.getResByUrl("resource/assets/images/ui/img_share2.png",(e)=>{
            this._img.$setBitmapData(e);
        },this);

        this._click = new egret.Bitmap();
        this.addChild(this._click);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_click.png",(e)=>{
            this._click.$setBitmapData(e);
            this._click.x = GameMain.getInstance.StageWidth - this._click.width;
        },this);
        this._click.touchEnabled = true;

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._click){
            this.hide();
        }
    }

    public show():void{
        if(this.parent==undefined){
            GUIManager.getInstance.tipLay.addChild(this);
            ShareImg.getInstance.show();
            this._click.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            ShareImg.getInstance.hide();
            this._click.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x9F6942, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}