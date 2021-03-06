/**足球头部 底部则重新构写单独控制 */
class SPFbWnd extends egret.DisplayObjectContainer{
    private static _mInstance: SPFbWnd;
	public static get getInstance(): SPFbWnd {
		if (SPFbWnd._mInstance == undefined)
			SPFbWnd._mInstance = new SPFbWnd();
		return SPFbWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _topContain:egret.DisplayObjectContainer;
    /**页面下标 0串关 1单关 */
    public _index = 0;
    /**当前所处页面 0串关 1胜平负 2进球数 3比分 4半全场 */
    public static inIndex=0;

    constructor(){
        super();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._topContain = new egret.DisplayObjectContainer();
        this.addTop();
    }

    /**筛选 */
    private _screen:egret.Bitmap;
    /**问题 */
    private _questions:egret.Bitmap;
    /**串关 */
    private _g1:egret.TextField;
    /**单关 */
    private _g2:egret.TextField;
    private _gShape:egret.Shape;

    private addTop():void{
        this.addChild(this._topContain);
        this._topContain.y = 16;

        let bjBox = new egret.Bitmap();
        this._topContain.addChild(bjBox);
        RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png",(e)=>{
            bjBox.$setBitmapData(e);
            bjBox.x = 256;
            bjBox.y = 0;
        },this);

        this._screen = new egret.Bitmap();
        this._topContain.addChild(this._screen);
        this._screen.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png",(e)=>{
            this._screen.$setBitmapData(e);
            this._screen.y = 12;
            this._screen.x = 604;
        },this);

        this._questions = new egret.Bitmap();
        this._questions.touchEnabled = true;
        this._topContain.addChild(this._questions);
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png",(e)=>{
            this._questions.$setBitmapData(e);
            this._questions.y = 8;
            this._questions.x = 676;
        },this);

        this._gShape = new egret.Shape();
        this._topContain.addChild(this._gShape);
        this._gShape.graphics.beginFill(0xffffff);
        this._gShape.graphics.drawRoundRect(256,0,120,64,33);
        this._gShape.graphics.endFill();

        this._g1 = ToolMrg.getText(256,0,32,0xffffff,120);
        this._g1.height = 64;
        this._topContain.addChild(this._g1);
        this._g1.textAlign = egret.HorizontalAlign.CENTER;
        this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g1.text = "串关";
        this._g1.touchEnabled = true;

        this._g2 = ToolMrg.getText(256+120,0,32,0xffffff,120);
        this._g2.height = 64;
        this._topContain.addChild(this._g2);
        this._g2.textAlign = egret.HorizontalAlign.CENTER;
        this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g2.text = "单关";
        this._g2.touchEnabled = true;
    }

    private touchDown(e:egret.TouchEvent):void{
        // Alertpaner.getInstance.show("单关暂未开放");
        if(e.target == this._g1){
            if(this._index==0)return;
            this._index = 0;
        }else if(e.target == this._g2){
            if(this._index==1)return;
            this._index = 1;
        }
        this.changeTop();
    }

    private changeTop():void{
        if(this._index==0){
            this._g1.textColor = 0xF72F52;
            this._g2.textColor = 0xffffff;
            egret.Tween.get(this._gShape).to({x:0},200);
            SPG1Wnd.getInstance.show();
            SPOnePass.getInstance.hide();
            SPFbWnd.inIndex=0;
        }else if(this._index==1){
            this._g1.textColor = 0xffffff;
            this._g2.textColor = 0xF72F52;
            egret.Tween.get(this._gShape).to({x:120},200);
            SPG1Wnd.getInstance.hide();
            SPOnePass.getInstance.show();
        }
    }

    /**篮球支付成功回调 关闭支付界面 单开订单*/
    public zfBack():void {
        MultiplierDetail.getInstance.hide();
        PaymentWnd.getInstance.hide();
        GoFBBuy.getInstance.hide();
        SPG1Wnd.getInstance.clearAllData();
        this.changeTop();
        UserInfoPhp.getInstance.sendHttp();
        Order_List.getInstance.sendHttp();
        MyLotteryWnd.getInstance.show(1);
    }
    private _mFirst:boolean = true
    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.changeTop();
        if(UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            SPG1Wnd.getInstance.hide();
            SPOnePass.getInstance.hide();
            this._index = 0;
            SPFbWnd.inIndex = 0;

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    private addInterception():void{
        this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._questions.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._screen.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._questions.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickBtn,this);
        this._g1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._g2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private clickBtn(e:egret.TouchEvent):void{
        if(e.target == this._screen){
            SPFBscreen.getInstance.show();
        }else if(e.target == this._return){
            this.hide();
        }else if(e.target == this._questions){
            SPFbExplain.getInstance.show();
        }
    }
}