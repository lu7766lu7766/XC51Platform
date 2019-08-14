class LotteryShare extends egret.DisplayObjectContainer{
    private static _mInstance: LotteryShare;
    public static get getInstance(): LotteryShare {
        if (LotteryShare._mInstance == undefined)
            LotteryShare._mInstance = new LotteryShare();
        return LotteryShare._mInstance;
    }

    constructor(){
        super();

        this.touchEnabled = true;
    }

    public show():void{
        if(this.parent==undefined){
            GUIManager.getInstance.mostLay.addChild(this);
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }
}