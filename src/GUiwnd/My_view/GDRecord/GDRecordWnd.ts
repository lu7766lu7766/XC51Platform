/**跟单记录 */
class GDRecordWnd extends egret.DisplayObjectContainer{
    private static _mInstance: GDRecordWnd;
	public static get getInstance(): GDRecordWnd {
		if (GDRecordWnd._mInstance == undefined)
			GDRecordWnd._mInstance = new GDRecordWnd();
		return GDRecordWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _str = ["全部","待开奖","未中奖","已中奖"];
    private _textItem:GHashMap<egret.TextField>;
    private _topShape:egret.Shape;
    /** 0全部 1未中奖 2已中奖 */
    private _index = 0;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _item:GHashMap<GDRecordInfo>;

    private _unText:egret.Bitmap;
    private num:number;

    constructor(){
        super();

        this.touchEnabled = true;
        this._textItem = new GHashMap<egret.TextField>();
        this._item = new GHashMap<GDRecordInfo>();

        this._topUI = new TopUI("跟单记录");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRect(0,96+GameValue.adaptationScreen,GameMain.getInstance.StageWidth,80);
        shape.graphics.endFill();

        this.num = GameMain.getInstance.StageWidth/this._str.length;
        for(let i=0;i<this._str.length;i++){
            let objText = ToolMrg.getText(i*this.num,96+GameValue.adaptationScreen+0,28,0x333333,this.num);
            this.addChild(objText);
            objText.height = 80;
            objText.textAlign = egret.HorizontalAlign.CENTER;
            objText.verticalAlign = egret.VerticalAlign.MIDDLE;
            objText.text = this._str[i];
            this._textItem.Gput(i,objText);
            objText.touchEnabled = true;
        }

        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRect((this.num - 48)/2,96+GameValue.adaptationScreen+78.5-4,48,4);
        this._topShape.graphics.endFill();

        let link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,96+GameValue.adaptationScreen+78.5,GameMain.getInstance.StageWidth,1.5);
        link.graphics.endFill();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        this._unText = new egret.Bitmap();
        this._unText.visible = false;
        RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
            this._unText.$setBitmapData(e); 
            this._unText.x = (GameMain.getInstance.StageWidth - this._unText.width)*0.5;
            this._unText.y = (GameMain.getInstance.StageHeight - this._unText.height) * 0.5
        },this);
        this.addChild(this._unText);

        this.setDB();
    }

    public updata(bool?:boolean):void{
        let item = GDRecordMrg.getInstance.GDRItem;

        let selectItem = new GHashMap<GDRecordData>();
        if(this._index==0){//全部
            selectItem = item;
        }else if(this._index==1){//待开奖
            for(let key of item.keys){
                if(item.Gget(key)._isWin==1)
                    selectItem.Gput(key,item.Gget(key));
            }
        }else if(this._index==2){//未中奖
            for(let key of item.keys){
                if(item.Gget(key)._isWin==2)
                    selectItem.Gput(key,item.Gget(key));
            }
        }else if(this._index==3){//已中奖
            for(let key of item.keys){
                if(item.Gget(key)._isWin==3)
                    selectItem.Gput(key,item.Gget(key));
            }
        }

        let objHeight = 0;
        for(let key of selectItem.keys){
            let obj:GDRecordInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new GDRecordInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(selectItem.Gget(key));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            obj.touchEnabled = true;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDownSelect,this);
        }
        ToolMrg.upItemofGHashMap(this._item,selectItem);
        this._scroView.setScrollTop(0);

        if(selectItem.size>0 || bool == true){
            this._unText.visible = false;
        }else{
            this._unText.visible = true;
        }
    }

    private changeText(bool?:boolean):void{
        for(let key of this._textItem.keys){
            if(key == this._index)
                this._textItem.Gget(key).textColor = 0xF72F52;
            else
                this._textItem.Gget(key).textColor = 0x333333;
        }
        egret.Tween.get(this._topShape).to({"x":this._index*this.num},200,egret.Ease.circOut);
        this.updata(bool);
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.changeText(true);
        GD_RecordList.getInstance.sendHttp(UserData.getInstance.userId,1);
    }

    public hide():void{
        let obj:GDRecordInfo;
        for(let key of this._item.keys) {
            obj = this._item.Gget(key);
            if(obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDownSelect,this);
        }
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._index=0;
        }
    }

    private touchDownSelect(e:egret.TouchEvent):void{
        if(e.target instanceof GDRecordInfo) {
			let data:GDRecordInfo = e.target
			if(data._data != undefined) {
                // Gen_Info.getInstance.sendHttp(data._data.order_id, data._data._type,1);
                Order_ListT.getInstance.sendHttp(data._data.order_id,1);
			}
		}
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
    }

    private clickTopText(e:egret.TouchEvent):void{
        if(e.target == this._textItem.Gget(0)){
            if(this._index==0)return;
            this._index=0;
        }else if(e.target == this._textItem.Gget(1)){
            if(this._index==1)return;
            this._index=1;
        }else if(e.target == this._textItem.Gget(2)){
            if(this._index==2)return;
            this._index=2;
        }else if(e.target == this._textItem.Gget(3)){
            if(this._index==3)return;
            this._index=3;
        }
        this.changeText();
    }

    public addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._textItem.keys){
            this._textItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickTopText,this);
        }
    }

    public removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._textItem.keys){
            this._textItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickTopText,this);
        }
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen+80;
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