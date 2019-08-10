class BkExplain extends egret.DisplayObjectContainer{
    private static _mInstance: BkExplain;
    public static get getInstance(): BkExplain {
        if (BkExplain._mInstance == undefined)
            BkExplain._mInstance = new BkExplain();
        return BkExplain._mInstance;
    }

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _topUI:TopUI;
    private _return:egret.Shape;

    private imgItem = [];

    constructor(){
        super();

        this._topUI = new TopUI("竞彩篮球玩法介绍");
        
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        let btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        RES.getResByUrl(`resource/assets/images/ui/jclq1.png`,(e)=>{btn1.$setBitmapData(e); },this);

        let btn2 = new egret.Bitmap();
        this._mContain.addChild(btn2);
        btn2.y = 750;
        RES.getResByUrl(`resource/assets/images/ui/jclq2..png`,(e)=>{btn2.$setBitmapData(e); },this);

        let btn3 = new egret.Bitmap();
        this._mContain.addChild(btn3);
        btn3.y = 750+720;
        RES.getResByUrl(`resource/assets/images/ui/jclq3..png`,(e)=>{btn3.$setBitmapData(e); },this);

        // let btn4 = new egret.Bitmap();
        // this._mContain.addChild(btn4);
        // btn4.y = 800+740+720;
        // RES.getResByUrl(`resource/assets/images/ui/jczq4.png`,(e)=>{btn4.$setBitmapData(e); },this);

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._scroView.setScrollTop(0);
        }
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96+GameValue.adaptationScreen;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y ;
        this.addChild(this._scroView);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xf5f5f7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}