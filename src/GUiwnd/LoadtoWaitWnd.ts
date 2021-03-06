/**赛事数据等待加载 */
class LoadtoWaitWnd extends egret.DisplayObjectContainer{
    private static _mInstance: LoadtoWaitWnd;
    public static get getInstance(): LoadtoWaitWnd {
        if (LoadtoWaitWnd._mInstance == undefined)
            LoadtoWaitWnd._mInstance = new LoadtoWaitWnd();
        return LoadtoWaitWnd._mInstance;
    }

    private waitImg:egret.Bitmap;

    constructor(){
        super();

        this.waitImg = new egret.Bitmap();
        this.addChild(this.waitImg);
        RES.getResByUrl("resource/assets/images/ui/hsjjz_default@2x.png",(e)=>{
            this.waitImg.$setBitmapData(e);
            this.waitImg.x = (GameMain.getInstance.StageWidth - this.waitImg.width)*0.5;
            this.waitImg.y = (GameMain.getInstance.StageHeight - this.waitImg.height)*0.5;
        },this);
    }

    public show(isboom:boolean):void{
        if(this.parent==undefined){
            this.visible = false;
            GUIManager.getInstance.mostLay.addChild(this);
            egret.Tween.get(this).wait(500).call(()=>{
                this.visible = true;
            })
        }

    }

    public hide():void{
        this.visible = true;
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }
}