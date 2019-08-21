class LotteryShare extends egret.DisplayObjectContainer{
    private static _mInstance: LotteryShare;
    public static get getInstance(): LotteryShare {
        if (LotteryShare._mInstance == undefined)
            LotteryShare._mInstance = new LotteryShare();
        return LotteryShare._mInstance;
    }

    private _img:egret.Bitmap;
    private _tx:egret.Bitmap;
    private _click:egret.Bitmap;
    /**名字 */
    private _name:egret.TextField;
    /**命中率文本 */
    private _rateText:egret.TextField;
    /**命中率 */
    private _rate:egret.TextField;

    constructor(){
        super();

        this.touchEnabled = true;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_fullsize_anim.png",(e)=>{
            this._img.$setBitmapData(e);
        },this);

        this._click = new egret.Bitmap();
        this.addChild(this._click);
        RES.getResByUrl("resource/assets/images/ui/imgpsh_click.png",(e)=>{
            this._click.$setBitmapData(e);
            this._click.x = GameMain.getInstance.StageWidth - this._click.width;
        },this);
        this._click.touchEnabled = true;

        this._tx = new egret.Bitmap();
        this.addChild(this._tx);
        this._tx.width = 144;
        this._tx.height = 144;
        this._tx.y = 257;

        this._name = ToolMrg.getText(0,420,30,0xb8b8b8,GameMain.getInstance.StageWidth);
        this.addChild(this._name);
        this._name.textAlign = egret.HorizontalAlign.CENTER;
        
        this._rateText = ToolMrg.getText(0,71+395,24,0xff1a06,GameMain.getInstance.StageWidth);
        this.addChild(this._rateText);
        this._rateText.textAlign = egret.HorizontalAlign.CENTER;
        this._rateText.text = "7日命中率";

        this._rate = ToolMrg.getText(0,116+393,90,0xff1a06,GameMain.getInstance.StageWidth);
        this.addChild(this._rate);
        this._rate.textAlign = egret.HorizontalAlign.CENTER;

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._click){
            this.hide();
        }
    }

    private addEvent():void{
        this._click.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeEvent():void{
        this._click.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    /**传入命中率 */
    public show(num:string):void{
        if(this.parent==undefined){
            GUIManager.getInstance.mostLay.addChild(this);
            CodeWndphoto.getInstance.show();
            GetShare.getInstance.sendHttp(UserData.getInstance.userId);
            this.addEvent();
            this._name.text = `${ToolMrg.nameMode2(10,UserData.getInstance.userName)}`;
            this._rate.text = `${num}%`;
            RES.getResByUrl("resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png",(e)=>{
                this._tx.$setBitmapData(e); 
                this._tx.x = (GameMain.getInstance.StageWidth - this._tx.width)*0.5;
            }, this);
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            CodeWndphoto.getInstance.hide();
            this.removeEvent();
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xC72559, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}