class DmWnd_2 extends egret.DisplayObjectContainer{
    private static _mInstance: DmWnd_2;
	public static get getInstance(): DmWnd_2 {
		if (DmWnd_2._mInstance == undefined)
			DmWnd_2._mInstance = new DmWnd_2();
		return DmWnd_2._mInstance;
	}

    private _topUI:TopUI;
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    // private _str = ["全部","热门","回报率","发单时间","关注方案"];
    // private _textItem:GHashMap<egret.TextField>;
        private _item:GHashMap<DmC_info>;
    
    private _undefinedData:egret.Bitmap;

    constructor(){
        super();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("跟单",-this.y,1);
        this.addChild(this._topUI);

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();
        
        // this._undefinedData = ToolMrg.getText(0,(GameMain.getInstance.StageHeight - 96+GameValue.adaptationScreen)*0.45,30,0x000000,GameMain.getInstance.StageWidth);
        this._undefinedData = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
            this._undefinedData.$setBitmapData(e); 
            this._undefinedData.x = (GameMain.getInstance.StageWidth - this._undefinedData.width)*0.5;
            this._undefinedData.y = (GameMain.getInstance.StageHeight - this._undefinedData.height - 150) * 0.5
        },this);
        this._mContain.addChild(this._undefinedData);
        this._undefinedData.visible = false;

        // this._textItem = new GHashMap<egret.TextField>();
        this._item = new GHashMap<DmC_info>();



        this.setDB();
    }

    public upData():void{
        let item = DmC_infoMsg.getInstance.item;

        if(item.size<1){
            this._undefinedData.visible = true;
        }else{
            this._undefinedData.visible = false;
        }
        let objHeight = 0;
        for(let key of item.keys){
            let obj:DmC_info;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new DmC_info();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item,item);
    }

    public show():void{
        GUIManager.getInstance.bgLay.addChild(this);
        GD_List.getInstance.sendHttp();
        this.upData();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);

            for(let key of this._item.keys){
                this._item.Gget(key).removeInterception();
            }

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