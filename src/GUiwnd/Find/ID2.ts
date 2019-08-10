class ID2 extends egret.DisplayObjectContainer{
    private static _mInstance: ID2;
    public static get getInstance(): ID2 {
        if (ID2._mInstance == undefined)
            ID2._mInstance = new ID2();
        return ID2._mInstance;
    }

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _topUI:TopUI;
    private _return:egret.Shape;
    private _btn:egret.Bitmap;

    private imgItem = [];

    constructor(){
        super();

        this._topUI = new TopUI("活动详情");
        
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        let btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        RES.getResByUrl(`resource/assets/images/ui/zhuli1.png`,(e)=>{btn1.$setBitmapData(e); },this);

        let btn2 = new egret.Bitmap();
        this._mContain.addChild(btn2);
        btn2.y =744;
        RES.getResByUrl(`resource/assets/images/ui/zhuli2.png`,(e)=>{btn2.$setBitmapData(e); },this);

        let btn3 = new egret.Bitmap();
        this._mContain.addChild(btn3);
        btn3.y = 744+626;
        RES.getResByUrl(`resource/assets/images/ui/zhuli3.png`,(e)=>{btn3.$setBitmapData(e); },this);

        this._btn = new egret.Bitmap();
        this.addChild(this._btn);
        this._btn.y = GameMain.getInstance.StageHeight-120;
        this._btn.touchEnabled = true;
        RES.getResByUrl(`resource/assets/images/ui/bg_button@2x.png`,(e)=>{
            this._btn.$setBitmapData(e); 
            this._btn.x = (GameMain.getInstance.StageWidth - this._btn.width)*0.5;
        },this);

        let text = ToolMrg.getText(0,GameMain.getInstance.StageHeight-120+30,34,0xffffff,GameMain.getInstance.StageWidth);
        this.addChild(text);
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "申请活动优惠";

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._btn){
            KeFuWnd.getInstance.show();
        }
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

            this._scroView.setScrollTop(0);
            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 150;
        this.addChild(this._scroView);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}