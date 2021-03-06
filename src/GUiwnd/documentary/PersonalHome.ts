/**个人主页 */
class PersonalHome extends egret.DisplayObjectContainer{
    private _bj:egret.Bitmap;
    private _returnShape:egret.Shape;
    private _tx:egret.Bitmap;
    private _txName:egret.TextField;
    private _txContent:egret.TextField;
    private _lookNum:egret.TextField;
    private _fanNum:egret.TextField;
    private _likeBtn:egret.Bitmap;
    /**跟单 */
    public statistics:DD_Statistics;
    /**回报率 */
    private _rate:egret.TextField;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _item:GHashMap<PHInfo>;

    public fan:FanWnd;
    public like:LikeWnd;

    constructor(){
        super();
        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this._item = new GHashMap<PHInfo>();
        this.fan = new FanWnd();
        this.like = new LikeWnd();

        this._bj = new egret.Bitmap();
        this.addChild(this._bj);
        RES.getResByUrl("resource/assets/images/ui/grbg_expert@2x.png",(e)=>{this._bj.$setBitmapData(e); },this);

        this._returnShape = new egret.Shape();
        this.addChild(this._returnShape);
        this._returnShape.graphics.beginFill(0x1cbf4f);
        this._returnShape.graphics.drawRect(0,30,110,110);
        this._returnShape.graphics.endFill();
        this._returnShape.touchEnabled = true;
        this._returnShape.alpha = 0.001;

        let returnBtn = new egret.Bitmap();
        this.addChild(returnBtn);
        returnBtn.x = 26;
        returnBtn.y = 68;
        RES.getResByUrl("resource/assets/images/ui/return_nav@2x.png",(e)=>{returnBtn.$setBitmapData(e); },this);

        let phTitle = ToolMrg.getText(0,60,36,0xffffff,750);
        this.addChild(phTitle);
        phTitle.height = 50;
        phTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        phTitle.textAlign = egret.HorizontalAlign.CENTER;
        phTitle.text = "个人主页";

        let txBox = new egret.Shape();
        this.addChild(txBox);
        txBox.graphics.beginFill(0xffffff);
        txBox.graphics.drawEllipse(28,156,96,96);
        txBox.graphics.endFill();

        this._tx = new egret.Bitmap();
        this.addChild(this._tx);
        this._tx.width = 88;
        this._tx.height = 88;
        this._tx.x = 32;
        this._tx.y = 160;
        RES.getResByUrl("resource/assets/images/ui/user_default@2x.png",(e)=>{this._tx.$setBitmapData(e);},this);

        this._txName = ToolMrg.getText(144,148,32,0xffffff);
        this.addChild(this._txName);
        this._txName.height = 44;
        this._txName.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._txContent = ToolMrg.getText(146,202,20,0xffffff,400);
        this.addChild(this._txContent);
        this._txContent.lineSpacing = 5;

        this._lookNum = ToolMrg.getText(146,272,20,0xffffff);
        this.addChild(this._lookNum);
        this._lookNum.height = 28;
        this._lookNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._lookNum.touchEnabled = true;

        this._fanNum = ToolMrg.getText(270,272,20,0xffffff);
        this.addChild(this._fanNum);
        this._fanNum.height = 28;
        this._fanNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._fanNum.touchEnabled = true;

        this._likeBtn = new egret.Bitmap();
        this.addChild(this._likeBtn);
        this._likeBtn.x = 624;
        this._likeBtn.y = 184;

        this.statistics = new DD_Statistics();
        this.addChild(this.statistics);
        this.statistics.y = 362;
        this.statistics.x = 28;

        let sevenText = ToolMrg.getText(528,362,24,0x999999);
        this.addChild(sevenText);
        sevenText.height = 34;
        sevenText.verticalAlign = egret.VerticalAlign.MIDDLE;
        sevenText.text = "7单回报率";

        this._rate = ToolMrg.getText(642,360,32,0xf72e52);
        this.addChild(this._rate);

        let cShape = new egret.Shape();
        this.addChild(cShape);
        cShape.graphics.beginFill(0xf5f5f7);
        cShape.graphics.drawRect(0,76+342,750,10);
        cShape.graphics.endFill();

        this.addScoll();
        this.setDB();
    }

    public updata():void{
        this._txName.text = "金陵数据方案";
        this._txContent.text = "通过人机理性分析胜负平、大小球走向，同路请加关注。";
        this._lookNum.text = `关注 12`;
        this._fanNum.text = `粉丝 116`;
        RES.getResByUrl("resource/assets/images/ui/gz2_expert@2x.png",(e)=>{this._likeBtn.$setBitmapData(e); },this);
        this._rate.textFlow = <Array<egret.ITextElement>>[
            {"text":`245`,"style":{"size":32}},
            {"text":`%`,"style":{"size":28}}
        ];

        let objHeight = 0;
        for(let key=0;key<7;key++){
            let obj:PHInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new PHInfo();
                this._item.Gput(key,obj);
            }
            obj.aa();
            obj.addInterception();
            obj.y = objHeight;
            objHeight = obj.height + objHeight;
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
            DmC_infoMsg.personalHome = null;

            for(let key of this._item.keys){
                this._item.Gget(key).removeInterception();
            }
        }
    }

    public addInterception():void{
        this._fanNum.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._lookNum.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._returnShape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public removeInterception():void{
        this._fanNum.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._lookNum.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._returnShape.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._fanNum){//粉丝页面
            this.fan.show();
        }else if(e.target == this._lookNum){//关注页面
            this.like.show();
        }else if(e.target == this._returnShape){
            this.hide();
        }
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 342+86;
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