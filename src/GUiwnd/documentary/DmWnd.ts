/**跟 documentary 现在用DmWnd_2类 */
class DmWnd extends egret.DisplayObjectContainer{
    private static _mInstance: DmWnd;
	public static get getInstance(): DmWnd {
		if (DmWnd._mInstance == undefined)
			DmWnd._mInstance = new DmWnd();
		return DmWnd._mInstance;
	}

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _leftImg:egret.Bitmap;
    private _leftText:egret.TextField;
    private _leftBox:egret.Shape;

    private _rightImg:egret.Bitmap;
    private _rightText:egret.TextField;
    private _rightBox:egret.Shape;

    private _topUI:TopUI;
    private _question:egret.Bitmap;

    private _centerContain:egret.DisplayObjectContainer;
    private _item:GHashMap<DmCenter>;
    private _strItem = ["金额","热门","回报率","发单时间","关注方案"];
    private _index=0;

    constructor(){
        super();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("跟单",-this.y,1);
        this.addChild(this._topUI);

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        this._question = new egret.Bitmap();
        this.addChild(this._question);
        this._question.x = 676;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png",(e)=>{
            this._question.$setBitmapData(e);
            this._question.y = (96-this._question.height)*0.5;
        },this);

        this.addContain();
        this.addCenter();
        this.setDB();
    }

    private addContain():void{
        this._leftBox = new egret.Shape();
        this._mContain.addChild(this._leftBox);
        this._leftBox.graphics.beginFill(0xffffff);
        this._leftBox.graphics.drawRect(0,0,375,152);
        this._leftBox.graphics.endFill();
        this._leftBox.touchEnabled = true;

        this._rightBox = new egret.Shape();
        this._mContain.addChild(this._rightBox);
        this._rightBox.graphics.beginFill(0xffffff);
        this._rightBox.graphics.drawRect(375,0,375,152);
        this._rightBox.graphics.endFill();
        this._rightBox.touchEnabled = true;

        let centerShape = new egret.Shape();
        this._mContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xdedede);
        centerShape.graphics.drawRect(374.5,0,1.5,152);
        centerShape.graphics.endFill();

        this._leftImg = new egret.Bitmap();
        this._mContain.addChild(this._leftImg);
        RES.getResByUrl("resource/assets/images/ui/zph_expert@2x.png",(e)=>{
            this._leftImg.$setBitmapData(e);
            this._leftImg.y = 28;
            this._leftImg.x = 68;
        },this);

        this._rightImg = new egret.Bitmap();
        this._mContain.addChild(this._rightImg);
        RES.getResByUrl("resource/assets/images/ui/yph_expert@2x.png",(e)=>{
            this._rightImg.$setBitmapData(e);
            this._rightImg.y = 28;
            this._rightImg.x = 375+68;
        },this);

        this._leftText = ToolMrg.getText(186,0,36,0x333333);
        this._mContain.addChild(this._leftText);
        this._leftText.height = 152;
        this._leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._leftText.text = "周排行";


        this._rightText = ToolMrg.getText(375+186,0,36,0x333333);
        this._mContain.addChild(this._rightText);
        this._rightText.height = 152;
        this._rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._rightText.text = "周排行";

        let pShape = new egret.Shape();
        this._mContain.addChild(pShape);
        pShape.graphics.beginFill(0xf5f5f7);
        pShape.graphics.drawRect(0,152,750,10);
        pShape.graphics.endFill();

        let title = ToolMrg.getText(28,182,32,0x333333);
        this._mContain.addChild(title);
        title.bold = true;
        title.text = "推荐大神";

        let checkImg = new egret.Bitmap();
        this._mContain.addChild(checkImg);
        checkImg.y = 186;
        checkImg.x = 190;
        RES.getResByUrl("resource/assets/images/ui/search_expert@2x.png",(e)=>{
            checkImg.$setBitmapData(e);
        },this);

        let tShape = new egret.Shape();
        this._mContain.addChild(tShape);
        tShape.graphics.beginFill(0xdedede);
        tShape.graphics.drawRect(0,246,750,1.5);
        tShape.graphics.endFill();

        let lShape = new egret.Shape();
        this._mContain.addChild(lShape);
        lShape.graphics.beginFill(0xf5f5f7);
        lShape.graphics.drawRect(0,710,750,10);
        lShape.graphics.endFill();

        this._leftBox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._leftBox.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target==this._leftBox){//周排

        }else if(e.target==this._rightBox){//月排

        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }

    public show():void{
        GUIManager.getInstance.bgLay.addChild(this);
    }

    private addCenter():void{
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 720;
        this._item = new GHashMap<DmCenter>();

        let objWidth = 0;
        for(let i=0;i<this._strItem.length;i++){
            let obj = new DmCenter(this._strItem[i],i);
            this._centerContain.addChild(obj);
            obj.x = objWidth;
            objWidth = obj.width + objWidth;
            this._item.Gput(i,obj);

            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                if(this._index == obj.id)return;
                this._index = obj.id;
                this.changeCenter();
            },this);
        }
        this.changeCenter();

        let cShape = new egret.Shape();
        this._centerContain.addChild(cShape);
        cShape.graphics.beginFill(0xdedede);
        cShape.graphics.drawRect(0,86,750,1.5);
        cShape.graphics.endFill();
    }

    private changeCenter():void{

        for(let key of this._item.keys){
            if(this._index == key){
                this._item.Gget(key).selectStyle();
            }else{
                this._item.Gget(key).noselectStyle();
            }
        }
        if(this._index==0){

        }else if(this._index==1){

        }else if(this._index==2){
            
        }else if(this._index==3){
            
        }else if(this._index==4){
            
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
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - this.y - 206);
		this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
	}
}

class DmCenter extends egret.DisplayObjectContainer{
    private _shape:egret.Shape;
    private _text:egret.TextField;
    private _link:egret.TextField;
    public id;

    constructor(str:string,id){
        super();

        this.id = id;

        this._text = ToolMrg.getText(0,20,28,0x999999);
        this._text.text = str;
        this.addChild(this._text);
        this._text.width = str.length*13 + this._text.textWidth;
        this._text.textAlign = egret.HorizontalAlign.CENTER;

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0xf72d52);
        this._shape.graphics.drawRoundRect(this._text.width/2-16,68,32,4,10);
        this._shape.graphics.endFill();
        this._shape.visible = false;
    }

    public selectStyle():void{
        this._shape.visible = true;
        this._text.textColor = 0xF72E52;
    }

    public noselectStyle():void{
        this._shape.visible = false;
        this._text.textColor = 0x999999;
    }
}