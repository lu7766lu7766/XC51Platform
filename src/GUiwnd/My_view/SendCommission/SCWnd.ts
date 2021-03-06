/**发单佣金 */
class SCWnd extends egret.DisplayObjectContainer{
    private static _mInstance: SCWnd;
	public static get getInstance(): SCWnd {
		if (SCWnd._mInstance == undefined)
			SCWnd._mInstance = new SCWnd();
		return SCWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _topShape:egret.Shape;
    private str = ["全部","未中奖","已中奖"];
    private _strItem:GHashMap<egret.TextField>;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _index = 0;

    private _tipText:egret.Bitmap;
    private _item:GHashMap<SCInfo>;

    private num=0;

    constructor(){
        super();

        this.y = 96+GameValue.adaptationScreen;
        this.touchEnabled = true;
        this._topUI = new TopUI("发单佣金",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        let bjShape = new egret.Shape();
        this.addChild(bjShape);
        bjShape.graphics.beginFill(0xffffff);
        bjShape.graphics.drawRect(0,0.5,GameMain.getInstance.StageWidth,80);
        bjShape.graphics.endFill();

        this._strItem = new GHashMap<egret.TextField>();
        this._item = new GHashMap<SCInfo>();
        this._mContain = new egret.DisplayObjectContainer();

        this.num = GameMain.getInstance.StageWidth/this.str.length;
        for(let i=0;i<this.str.length;i++){
            let obj = ToolMrg.getText(i*this.num,0,28,0x333333,this.num);
            obj.height = 80;
            this.addChild(obj);
            obj.verticalAlign = egret.VerticalAlign.MIDDLE;
            obj.textAlign = egret.HorizontalAlign.CENTER;
            obj.text = this.str[i];
            obj.touchEnabled = true;
            this._strItem.Gput(i,obj);
        }

        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRect((this.num-48)/2,78.5-4,48,4);
        this._topShape.graphics.endFill();

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,78.5,GameMain.getInstance.StageWidth,1.5);
        shape.graphics.endFill();

        this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
            this._tipText.$setBitmapData(e); 
            this._tipText.x = (GameMain.getInstance.StageWidth - this._tipText.width)*0.5;
            this._tipText.y = (GameMain.getInstance.StageHeight - this._tipText.height) * 0.5
        },this);
        this.addChild(this._tipText);
        this._tipText.visible = false;

        this.addScoll();

        this.setDB();
    }

    public updata():void{
        let item:GHashMap<SCData>;
        if(this._index==0)
            item = SCMrg.getInstance.getAllSCitem();
        else if(this._index==1)
            item = SCMrg.getInstance.getunScItem();
        else if(this._index==2)
            item = SCMrg.getInstance.getzScItem();

        let objHeight = 0;
        for(let key of item.keys){
            let obj:SCInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SCInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key));
            obj.y = objHeight;
            obj.touchEnabled = true;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDownSelect,this);
        }

        if(item.size==0)
            this._tipText.visible = true;
        else
            this._tipText.visible = false;

        ToolMrg.upItemofGHashMap(this._item,item);
        this._scroView.setScrollTop(0);
    }

    private touchDownSelect(e:egret.TouchEvent):void{
        if(e.target instanceof SCInfo) {
			let data:SCInfo = e.target
			if(data._data != undefined) {
                // Gen_Info.getInstance.sendHttp(data._data.id, data._data._type,2);
                Order_ListT.getInstance.sendHttp(data._data.id,2);
			}
		}
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        GetSC_Data.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.changeTop();
    }

    public hide():void{
        let obj:SCInfo;
        for(let key of this._item.keys) {
            obj = this._item.Gget(key);
            if(obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDownSelect,this);
        }

        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.hide();
            this.removeInterception();   
        }

    }

    private changeTop():void{
        for(let key of this._strItem.keys){
            if(key == this._index)
                this._strItem.Gget(key).textColor = 0xF72F52;
            else
                this._strItem.Gget(key).textColor = 0x333333;
        }
        egret.Tween.get(this._topShape).to({x:this.num*this._index},200,egret.Ease.circOut);
        this.updata();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
    }

    private topClick(e:egret.TouchEvent){
        if(e.target == this._strItem.Gget(0)){
            if(this._index==0)return;
            this._index = 0;
        }else if(e.target == this._strItem.Gget(1)){
            if(this._index==1)return;
            this._index = 1;
        }else if(e.target == this._strItem.Gget(2)){
            if(this._index==2)return;
            this._index = 2;
        }
        this.changeTop();
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._strItem.keys){
            this._strItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        }
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._strItem.keys){
            this._strItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        }
    }
    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 80;
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
}