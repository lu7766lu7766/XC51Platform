/**他的粉丝 */
class FanWnd extends egret.DisplayObjectContainer{

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

        this._topUI = new TopUI("他的粉丝",-this.y);
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

class FanofLikeInfo extends egret.DisplayObjectContainer{
    private _tx:egret.Bitmap;
    private _txNane:egret.TextField;
    private _likeBtn:egret.Bitmap;
    /**料 */
    private _l:egret.Bitmap;
    private _rate:egret.TextField;
    private _likeImg:egret.Bitmap;
    private _likeText:egret.TextField;
    private _lookImg:egret.Bitmap;
    private _lookText:egret.TextField;
    private _img3:egret.Bitmap;
    private _text3:egret.TextField;

    public statistics:DD_Statistics;

    constructor(){
        super();

        this._tx = new egret.Bitmap;
        this.addChild(this._tx);
        this._tx.width = 84;
        this._tx.height = 84;
        this._tx.x = 26;
        this._tx.y = 28;
        this._tx.touchEnabled = true;

        this._txNane = ToolMrg.getText(128,20,32,0x333333);
        this.addChild(this._txNane);

        this._likeBtn = new egret.Bitmap;
        this.addChild(this._likeBtn);
        this._likeBtn.x = 622;
        this._likeBtn.y = 28;
        this._likeBtn.touchEnabled = true;
        
        this._l = new egret.Bitmap();
        this.addChild(this._l);
        this._l.x = 692,
        this._l.y = 88;

        this.statistics = new DD_Statistics();
        this.addChild(this.statistics);
        this.statistics.y = 84;
        this.statistics.x = 128;

        this._rate = ToolMrg.getText(128,138,24,0x999999);
        this.addChild(this._rate);

        this._likeImg = new egret.Bitmap();
        this.addChild(this._likeImg);
        this._likeImg.x = 521;
        this._likeImg.y = 145;
        RES.getResByUrl("resource/assets/images/ui/fss_expert@2x.png",(e)=>{this._likeImg.$setBitmapData(e); },this);

        this._lookImg = new egret.Bitmap();
        this.addChild(this._lookImg);
        this._lookImg.x = 600;
        this._lookImg.y = 146;
        RES.getResByUrl("resource/assets/images/ui/gzs_expert@2x.png",(e)=>{this._lookImg.$setBitmapData(e); },this);

        this._img3 = new egret.Bitmap();
        this.addChild(this._img3);
        this._img3.x = 683;
        this._img3.y = 145;
        RES.getResByUrl("resource/assets/images/ui/fas_expert@2x.png",(e)=>{this._img3.$setBitmapData(e); },this);

        this._likeText = ToolMrg.getText(546,143,20,0xa9a9a9);
        this.addChild(this._likeText);

        this._lookText = ToolMrg.getText(628,143,20,0xa9a9a9);
        this.addChild(this._lookText);

        this._text3 = ToolMrg.getText(704,143,20,0xa9a9a9);
        this.addChild(this._text3);

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0,192,750,10);
        shape.graphics.endFill();

        this.setDB();
    }

    public aa():void{
        this._txNane.text = "红红火火";
        RES.getResByUrl("resource/assets/images/ui/user_default@2x.png",(e)=>{this._tx.$setBitmapData(e);},this);
        RES.getResByUrl("resource/assets/images/ui/gz1_expert@2x.png",(e)=>{this._likeBtn.$setBitmapData(e);},this);
        // RES.getResByUrl("resource/assets/images/ui/liao_expert@2x.png",(e)=>{this._l.$setBitmapData(e); },this);
        
        this._rate.textFlow = <Array<egret.ITextElement>>[
            {"text":`七单回报率 `,"style":{"textColor":0x999999,"size":24}},
            {"text":`2459%`,"style":{"textColor":0xF72E52,"size":32}}
        ];

        this._likeText.text = "128";
        this._lookText.text = "12";
        this._text3.text = "123";
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 202);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._mShareC){//查看别人个人主页
            DmC_infoMsg.personalHome = new PersonalHome();
            DmC_infoMsg.personalHome.show();
        }else if(e.target == this._likeBtn){//点赞或者取消点赞(关注或者取消关注)

        }
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this._likeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        if(this._isInterception){
            this._likeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }
}