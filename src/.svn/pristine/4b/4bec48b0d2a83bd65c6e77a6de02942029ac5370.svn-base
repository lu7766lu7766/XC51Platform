/**资金明细 */
class CapitalWnd extends egret.DisplayObjectContainer{
    private static _mInstance: CapitalWnd;
    public static get getInstance(): CapitalWnd {
        if (CapitalWnd._mInstance == undefined)
            CapitalWnd._mInstance = new CapitalWnd();
        return CapitalWnd._mInstance;
    }
    
    private _topUI:TopUI;
    private _return:egret.Shape;
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _topContain:egret.DisplayObjectContainer;

    private str = ["购彩","充值","派奖","提取","佣金","返水","奖励"];
    private _item:GHashMap<egret.TextField>;
    private _index = 0;
    private _tipText:egret.Bitmap;

    /**总 */
    private _topContent:egret.TextField;
    /**红条 */
    private _topShape:egret.Shape;

    private _CDItem:GHashMap<CDInfo>;

    constructor(){
        super();
        this.touchEnabled = true;

        this._item = new GHashMap<egret.TextField>();
        this._CDItem = new GHashMap<CDInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this._topContain = new egret.DisplayObjectContainer();
        this.addChild(this._topContain);
        this._topContain.y = 96+GameValue.adaptationScreen;

        this._topUI = new TopUI("资金明细");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this.addScoll();
        this.joinTop();

        this._tipText = new egret.Bitmap();
        this._tipText.visible = false;
        RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
            this._tipText.$setBitmapData(e); 
            this._tipText.x = (GameMain.getInstance.StageWidth - this._tipText.width)*0.5;
            this._tipText.y = (GameMain.getInstance.StageHeight - this._tipText.height) * 0.5
        },this);
        this.addChild(this._tipText);

        this.setDB();
    }

    public upData(tool?:boolean):void{
        let item = CDMrg.getInstance._AllZJ;
        let num = 0;

        let dataItem:GHashMap<CDDataSub>;
        if(this._index==0){
            num = -item.b;
            dataItem = item.bItem;
        }else if(this._index==1){
            num = item.p;
            dataItem = item.pItem;
        }else if(this._index==2){
            num = item.j;
            dataItem = item.jItem;
        }else if(this._index==3){
            num = -item.t;
            dataItem = item.tItem;
        }else if(this._index==4){
            num = item.w;
            dataItem = item.wItem;
        }else if(this._index==5){
            num = item.f;
            dataItem = item.fItem;
        }else if(this._index==6){
            num = item.o;
            dataItem = item.oItem;
        }


        let objHeight = 0;
        for(let key of dataItem.keys){
            let obj: CDInfo;
            if (this._CDItem.Gget(key)) {
                obj = this._CDItem.Gget(key);
            } else {
                obj = new CDInfo();
                this._CDItem.Gput(key, obj);
            }
            obj.aa(dataItem.Gget(key),this._index);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
            this._scroView.setScrollTop(0);
        }

        ToolMrg.upItemofGHashMap(this._CDItem,dataItem);

        if(dataItem.size>0 || tool){
            this._tipText.visible = false;
            this._topContent.textFlow = <Array<egret.ITextElement>>[
                {"text":`总${this.str[this._index]}：`,style:{"textColor":0x333333}},
                {"text":`${(num/100).toFixed(2)}元`,style:{"textColor":0x17B22C}}
            ];
        }else{
            this._tipText.visible = true;
                this._topContent.textFlow = <Array<egret.ITextElement>>[
                {"text":`总${this.str[this._index]}：`,style:{"textColor":0x333333}},
                {"text":`0元`,style:{"textColor":0x17B22C}}
            ];
        }
    }

    /**从0开始 从左往右 */
    public show(setIndex?:number):void{
        if(setIndex!=undefined)
            this._index = setIndex;
        GUIManager.getInstance.topLay.addChild(this);
        CD_List.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.changeText(true);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
            this._index = 0;
        }
    }

    private changeText(tool?:boolean):void{
        for(let key of this._item.keys){
            if(this._index == key){
                this._item.Gget(key).textColor = 0xF72E52;
            }else{
                this._item.Gget(key).textColor = 0x333333;
            }
        }

        egret.Tween.get(this._topShape).to({"x":this._index*this.num},300,egret.Ease.circOut);
        this.upData(tool);
    }

    private selectToInfo(e:egret.TouchEvent):void{
        if(e.target == this._item.Gget(0)){
            if(this._index==0)return;
            this._index=0;
        }else if(e.target == this._item.Gget(1)){
            if(this._index==1)return;
            this._index=1;
        }else if(e.target == this._item.Gget(2)){
            if(this._index==2)return;
            this._index=2;
        }else if(e.target == this._item.Gget(3)){
            if(this._index==3)return;
            this._index=3;
        }else if(e.target == this._item.Gget(4)){
            if(this._index==4)return;
            this._index=4;
        }else if(e.target == this._item.Gget(5)){
            if(this._index==5)return;
            this._index=5;
        }else if(e.target == this._item.Gget(6)){
            if(this._index==6)return;
            this._index=6;
        }
        this.changeText();
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectToInfo,this);
        }
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectToInfo,this);
        }
    }


    private num:number;
    private joinTop():void{
        let topShape1 = new egret.Shape();
        this._topContain.addChild(topShape1);
        topShape1.graphics.beginFill(0xffffff);
        topShape1.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,80);
        topShape1.graphics.endFill();
        
        this.num = GameMain.getInstance.StageWidth/this.str.length;
        
        for(let i=0;i<this.str.length;i++){
            let obj = ToolMrg.getText(i*this.num,0,28,0x333333,this.num);
            obj.height = 80;
            obj.verticalAlign = egret.VerticalAlign.MIDDLE;
            obj.textAlign = egret.HorizontalAlign.CENTER;
            obj.text = this.str[i];
            this._topContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.touchEnabled = true;
        }

        this._topShape = new egret.Shape();
        this._topContain.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect((this.num-48)/2,76,48,4,8);
        this._topShape.graphics.endFill();

        let topShape2 = new egret.Shape();
        this._topContain.addChild(topShape2);
        topShape2.graphics.beginFill(0xdedede);
        topShape2.graphics.drawRect(0,80,GameMain.getInstance.StageWidth,2);
        topShape2.graphics.endFill();

        let topShape3 = new egret.Shape();
        this._topContain.addChild(topShape3);
        topShape3.graphics.beginFill(0xF5F5F7);
        topShape3.graphics.drawRect(0,82,GameMain.getInstance.StageWidth,78);
        topShape3.graphics.endFill();

        this._topContent = ToolMrg.getText(26,80,24,0x333333);
        this._topContain.addChild(this._topContent);
        this._topContent.height = 80;
        this._topContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._topContent.textAlign = egret.HorizontalAlign.CENTER;
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen+160;
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
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
	}

}