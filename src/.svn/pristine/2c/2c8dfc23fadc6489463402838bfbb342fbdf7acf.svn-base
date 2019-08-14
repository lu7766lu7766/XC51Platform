/**我的关注 */
class LikeWnd extends egret.DisplayObjectContainer{
    private _topUI:TopUI;
    private _return:egret.Shape;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView
    private _fanItem:GHashMap<FanofLikeInfo>;
    constructor(){
        super();
        this.y = GameValue.adaptationScreen;
        this.touchEnabled = true;

        this._mContain = new egret.DisplayObjectContainer();
        this._fanItem = new GHashMap<FanofLikeInfo>();

        this._topUI = new TopUI("我的关注",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this.addScoll();
        this.setDB();
    }

    public updata():void{
        let objHeight = 0;
        for(let key=0;key<5;key++){
            let obj:FanofLikeInfo;
            if(this._fanItem.GhasKey(key)){
                obj = this._fanItem.Gget(key);
            }else{
                obj = new FanofLikeInfo();
            }
            obj.aa();
            obj.addInterception();
            obj.y = objHeight; 
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
        }

    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.updata();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            for(let key of this._fanItem.keys){
                this._fanItem.Gget(key).removeInterception();
            }
        }
    }
    public addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96;
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
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}