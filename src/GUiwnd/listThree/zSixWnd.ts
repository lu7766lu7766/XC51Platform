/**组六 */
class zSixWnd extends egret.DisplayObjectContainer{
    private static _mInstance: zSixWnd;
	public static get getInstance(): zSixWnd {
		if (zSixWnd._mInstance == undefined)
			zSixWnd._mInstance = new zSixWnd();
		return zSixWnd._mInstance;
	}
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _boxImg:egret.Bitmap;
    private _downBox:egret.Bitmap;
    private _randomBtn:egret.Bitmap;

    private _item:GHashMap<Circle>;
    
    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;
        this.touchEnabled = true;
        this._item = new GHashMap<Circle>();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        this._downBox = new egret.Bitmap;
        this._mContain.addChild(this._downBox);
        this._downBox.y = -1;
        RES.getResByUrl("resource/assets/images/ui/xla_home@2x.png",(e)=>{
            this._downBox.$setBitmapData(e);
            this._downBox.x = (750-this._downBox.width)*0.5;
        },this);
        this._downBox.touchEnabled = true;
        this._downBox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeBox,this);

        this._boxImg = new egret.Bitmap();
        this._mContain.addChild(this._boxImg);
        RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png",(e)=>{
            this._boxImg.$setBitmapData(e);
            this._boxImg.x = 363;
            this._boxImg.y = 14;
        },this);

        let text = ToolMrg.getText(20,66,28,0x333333);
        this._mContain.addChild(text);
        text.text = "每位至少选择3个号码，奖金173元";

        this._randomBtn = new egret.Bitmap();
        this._mContain.addChild(this._randomBtn);
        RES.getResByUrl("resource/assets/images/ui/jxyz_home@2x.png",(e)=>{
            this._randomBtn.$setBitmapData(e); 
            this._randomBtn.x = GameMain.getInstance.StageWidth - this._randomBtn.width;
            this._randomBtn.y = 58;
        },this);
        this._randomBtn.touchEnabled = true;
        this._randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.randomNum,this);

        this.joinCss();
        this.setDB();
    }

    //随机
    private randomNum():void{
        ThreeBox.getInstance.ClickClear();

        let src = "0123456789";
        let a = Math.floor(Math.random()*src.length);
        let aa = Number(src.charAt(a));
        src = src.replace(src.charAt(a),"");

        let b = Math.floor(Math.random()*src.length);
        let bb = Number(src.charAt(b));
        src = src.replace(src.charAt(b),"");

        let c = Math.floor(Math.random()*src.length);
        let cc = Number(src.charAt(c));

        // egret.log(aa+":"+bb+":"+cc);
        this._item.Gget(aa).selectInfo();
        this._item.Gget(bb).selectInfo();
        this._item.Gget(cc).selectInfo();
    }

    public clearItem():void{
        for(let key of this._item.keys){
            this._item.Gget(key).clearInfo();
        }
    }

    //查看历史记录
    private changeBox():void{
        if(ThreeBox.historyType){
            egret.Tween.get(this._scroView).to({y:0},300,egret.Ease.circInOut);
            egret.Tween.get(this._boxImg).to({rotation:0,x:363,y:14},300,egret.Ease.circInOut);
            ThreeBox.getInstance.hideHistoryList();
        }else{
            egret.Tween.get(this._scroView).to({y:502},300,egret.Ease.circInOut);
            egret.Tween.get(this._boxImg).to({rotation:180,x:385,y:26},300,egret.Ease.circInOut);
            ThreeBox.getInstance.showHistoryList();
        }
    }

    public show():void{
        GUIManager.getInstance.bgLay.addChild(this);
        this.addInterception();
        this._boxImg.rotation=0;
        this._boxImg.x = 363;
        this._boxImg.y = 14;
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._scroView.y = 0;
            this._boxImg.rotation = 0;
        }
    }

    private addInterception():void{
        for(let key of this._item.keys){
            this._item.Gget(key).addInterception();
        }
    }

    private removeInterception():void{
        for(let key of this._item.keys){
            this._item.Gget(key).removeInterception();
        }
    }

    private _bai:egret.TextField;
    private _shi:egret.TextField;
    private _ge:egret.TextField;
    private joinCss():void{
        for(let i=0;i<10;i++){
            let obj = new Circle(i,0);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            if(i<5){
                obj.y = 144+40;
                obj.x = 116+120*i+40;
            }else{
                obj.y = 244+40;
                obj.x = 116+120*(i-5)+40;
            }
        }
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 0;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - 195;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._scroView.height);
        this._mShareC.graphics.endFill();
		this._mContain.addChildAt(this._mShareC, 0);
    }
}