/**直选 */
class zxWnd extends egret.DisplayObjectContainer{
    private static _mInstance: zxWnd;
	public static get getInstance(): zxWnd {
		if (zxWnd._mInstance == undefined)
			zxWnd._mInstance = new zxWnd();
		return zxWnd._mInstance;
	}
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _boxImg:egret.Bitmap;
    private _downBox:egret.Bitmap;
    private _randomBtn:egret.Bitmap;

    private _baiItem:GHashMap<Circle>;
    private _shiItem:GHashMap<Circle>;
    private _geItem:GHashMap<Circle>;

    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;
        this.touchEnabled = true;
        this._baiItem = new GHashMap<Circle>();
        this._shiItem = new GHashMap<Circle>();
        this._geItem = new GHashMap<Circle>();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();
        this.joinCss();

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
        text.text = "每位至少选择1个号码，奖金1040元";

        this._randomBtn = new egret.Bitmap();
        this._mContain.addChild(this._randomBtn);
        RES.getResByUrl("resource/assets/images/ui/jxyz_home@2x.png",(e)=>{
            this._randomBtn.$setBitmapData(e); 
            this._randomBtn.x = GameMain.getInstance.StageWidth - this._randomBtn.width;
            this._randomBtn.y = 58;
        },this);
        this._randomBtn.touchEnabled = true;
        this._randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.randomNum,this);

        this.setDB();
    }

    //随机
    private randomNum():void{
        ThreeBox.getInstance.ClickClear();
        let a = Math.floor(Math.random()*10);
        let b = Math.floor(Math.random()*10);
        let c = Math.floor(Math.random()*10);
        // egret.log(`${a} : ${b} : ${c}`);
        // let item = [a,b,c];
        // for(let i=0;i<item.length;i++){
            // let obj:Circle = new Circle(item[i],i);
            // obj.y
        // }
        this._baiItem.Gget(a).selectInfo();
        this._shiItem.Gget(b).selectInfo();
        this._geItem.Gget(c).selectInfo();
    }

    public clearItem():void{
        for(let key of this._baiItem.keys){
            this._baiItem.Gget(key).clearInfo();
        }
        for(let key of this._shiItem.keys){
            this._shiItem.Gget(key).clearInfo();
        }
        for(let key of this._geItem.keys){
            this._geItem.Gget(key).clearInfo();
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
        for(let key of this._baiItem.keys){
            this._baiItem.Gget(key).addInterception();
        }
        for(let key of this._shiItem.keys){
            this._shiItem.Gget(key).addInterception();
        }
        for(let key of this._geItem.keys){
            this._geItem.Gget(key).addInterception();
        }
    }

    private removeInterception():void{
        for(let key of this._baiItem.keys){
            this._baiItem.Gget(key).removeInterception();
        }
        for(let key of this._shiItem.keys){
            this._shiItem.Gget(key).removeInterception();
        }
        for(let key of this._geItem.keys){
            this._geItem.Gget(key).removeInterception();
        }
    }

    private _bai:egret.TextField;
    private _shi:egret.TextField;
    private _ge:egret.TextField;
    private joinCss():void{
        let bai = new egret.Shape();
        this._mContain.addChild(bai);
        bai.graphics.beginFill(0x3894ef);
        bai.graphics.drawRoundRect(28,144,40,180,15);
        bai.graphics.endFill();

        let shi = new egret.Shape();
        this._mContain.addChild(shi);
        shi.graphics.beginFill(0x6EC858);
        shi.graphics.drawRoundRect(28,380,40,180,15);
        shi.graphics.endFill();

        let ge = new egret.Shape();
        this._mContain.addChild(ge);
        ge.graphics.beginFill(0xFF8548);
        ge.graphics.drawRoundRect(28,618,40,180,15);
        ge.graphics.endFill();

        let baiLink = new egret.Shape();
        this._mContain.addChild(baiLink);
        baiLink.graphics.beginFill(0xdedede);
        baiLink.graphics.drawRect(27,352,696,1.5);
        baiLink.graphics.endFill();

        let shiLink = new egret.Shape();
        this._mContain.addChild(shiLink);
        shiLink.graphics.beginFill(0xdedede);
        shiLink.graphics.drawRect(27,588,696,1.5);
        shiLink.graphics.endFill();

        let geLink = new egret.Shape();
        this._mContain.addChild(geLink);
        geLink.graphics.beginFill(0xdedede);
        geLink.graphics.drawRect(27,826,696,1.5);
        geLink.graphics.endFill();

        let baiText = ToolMrg.getText(28,144,20,0xffffff,40);
        this._mContain.addChild(baiText);
        baiText.height = 180;
        baiText.textAlign = egret.HorizontalAlign.CENTER;
        baiText.verticalAlign = egret.VerticalAlign.MIDDLE;
        baiText.lineSpacing = 4;
        baiText.text = "百\n位";

        let shiText = ToolMrg.getText(28,380,20,0xffffff,40);
        this._mContain.addChild(shiText);
        shiText.height = 180;
        shiText.textAlign = egret.HorizontalAlign.CENTER;
        shiText.verticalAlign = egret.VerticalAlign.MIDDLE;
        shiText.lineSpacing = 4;
        shiText.text = "十\n位";

        let geText = ToolMrg.getText(28,618,20,0xffffff,40);
        this._mContain.addChild(geText);
        geText.height = 180;
        geText.textAlign = egret.HorizontalAlign.CENTER;
        geText.verticalAlign = egret.VerticalAlign.MIDDLE;
        geText.lineSpacing = 4;
        geText.text = "个\n位";

        for(let i=0;i<10;i++){
            let obj = new Circle(i,0);
            this._mContain.addChild(obj);
            this._baiItem.Gput(i,obj);
            if(i<5){
                obj.y = 144+40;
                obj.x = 116+120*i+40;
            }else{
                obj.y = 244+40;
                obj.x = 116+120*(i-5)+40;
            }
        }

        for(let i=0;i<10;i++){
            let obj = new Circle(i,1);
            this._mContain.addChild(obj);
            this._shiItem.Gput(i,obj);
            if(i<5){
                obj.y = 380+40;
                obj.x = 116+120*i+40;
            }else{
                obj.y = 480+40;
                obj.x = 116+120*(i-5)+40;
            }
        }

        for(let i=0;i<10;i++){
            let obj = new Circle(i,2);
            this._mContain.addChild(obj);
            this._geItem.Gput(i,obj);
            if(i<5){
                obj.y = 618+40;
                obj.x = 116+120*i+40;
            }else{
                obj.y = 718+40;
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
        let num=0;
        if(this._scroView.height>910)
            num = this._scroView.height;
        else 
            num = 910;
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,num);
        this._mShareC.graphics.endFill();
		this._mContain.addChildAt(this._mShareC, 0);
    }
}