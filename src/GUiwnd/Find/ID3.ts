class ID3 extends egret.DisplayObjectContainer{
    private static _mInstance: ID3;
    public static get getInstance(): ID3 {
        if (ID3._mInstance == undefined)
            ID3._mInstance = new ID3();
        return ID3._mInstance;
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
        RES.getResByUrl(`resource/assets/images/ui/hphy1.png`,(e)=>{btn1.$setBitmapData(e); },this);

        let btn2 = new egret.Bitmap();
        this._mContain.addChild(btn2);
        btn2.y =1110;
        RES.getResByUrl(`resource/assets/images/ui/hphy2.png`,(e)=>{btn2.$setBitmapData(e); },this);

        // let btn3 = new egret.Bitmap();
        // this._mContain.addChild(btn3);
        // btn3.y = 744+626;
        // RES.getResByUrl(`resource/assets/images/ui/zhuli3.png`,(e)=>{btn3.$setBitmapData(e); },this);

        this._btn = new egret.Bitmap();
        this._mContain.addChild(this._btn);
        this._btn.y = 2162-155;
        this._btn.touchEnabled = true;
        RES.getResByUrl(`resource/assets/images/ui/bg_button@2x.png`,(e)=>{
            this._btn.$setBitmapData(e); 
        this._btn.x = (GameMain.getInstance.StageWidth - this._btn.width)*0.5;
        },this);

        let text = ToolMrg.getText(0,2162-155+30,34,0xffffff,GameMain.getInstance.StageWidth);
        this._mContain.addChild(text);
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "复制分享链接";

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._btn){//复制
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this._link;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);

            Alertpaner.getInstance.show("复制成功");
        }
    }

    private _link:string;
    public setLink(str):void{
        this._link = str;
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);

        Share_Link.getInstance.sendHttp(UserData.getInstance.userId);

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