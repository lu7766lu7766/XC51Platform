/**合营计划 */
class PlanWnd extends egret.DisplayObjectContainer{
    private static _mInstance: PlanWnd;
	public static get getInstance(): PlanWnd {
		if (PlanWnd._mInstance == undefined)
			PlanWnd._mInstance = new PlanWnd();
		return PlanWnd._mInstance;
	}

    private _topUI:TopUI
    private _return:egret.Shape;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView
    // private _img:egret.Bitmap;

    constructor(){
        super();
        
        this.touchEnabled = true;
        this._topUI = new TopUI("合营计划");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        // this.addChildAt(this._mContain, 1);
        this.addScoll();

        // this._img = new egret.Bitmap();
        // this._mContain.addChild(this._img);
        // RES.getResByUrl("resource/assets/images/ui/plan.png",(e)=>{this._img.$setBitmapData(e); },this);

        // this.setDB();
    }

    private touchDown():void{
        this.hide();
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        ImgRace1.getInstance.show();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }

        ImgRace1.getInstance.hide();
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
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
	}
}