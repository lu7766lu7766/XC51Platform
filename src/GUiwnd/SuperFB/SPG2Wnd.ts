/**胜平负 */
class SPG2Wnd extends egret.DisplayObjectContainer{
    private static _mInstance: SPG2Wnd;
	public static get getInstance(): SPG2Wnd {
		if (SPG2Wnd._mInstance == undefined)
			SPG2Wnd._mInstance = new SPG2Wnd();
		return SPG2Wnd._mInstance;
	}

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
	private _item:GHashMap<SPG2infoTop>;

    constructor(){
        super();
		this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
		this._item = new GHashMap<SPG2infoTop>();

        this.addScoll();
        this.setDB();
    }

    public GetItem():GHashMap<SPG2infoTop>{
        return this._item;
    }
    /**暂无数据提示 */
	private _mZWSJTip:egret.Bitmap;

	public updata():void{
        // let item = FootballDataMrg.getInstance._mZQLBDG;
        let item = FootballDataMrg.getInstance.getCJDGList(2);
        let objHeight=0;
        for(let key of item.keys){
            let obj:SPG2infoTop;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SPG2infoTop();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key),key);
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;

            obj.optimization();
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
        }
        if(item.size>0)
            ToolMrg.upItemofGHashMap(this._item,item);
        if((this._item.size <= 0 && this._mZWSJTip != undefined)) {
			this._mZWSJTip.visible = true;
		} else {
            if(this._mZWSJTip == undefined) {
                this._mZWSJTip = new egret.Bitmap();
                RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png",(e)=>{
                    this._mZWSJTip.$setBitmapData(e); 
                    this._mZWSJTip.x = (GameMain.getInstance.StageWidth - this._mZWSJTip.width)*0.5;
                    this._mZWSJTip.y = (GameMain.getInstance.StageHeight - this._mZWSJTip.height) * 0.5
                },this);
                this.addChild(this._mZWSJTip);
            }
			this._mZWSJTip.visible = false
		}
    }

    /**滑动时更新数据 */
    public updateYH():void {
        let objHeight=0;
        let obj:SPG2infoTop;
        for(let key of this._item.keys){
            obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
        }
    }

    public screenSelect(data:GHashMap<GHashMap<FootballData>>):void{
        let item = data;
        let objHeight=0;
        for(let key of item.keys){
            let obj:SPG2infoTop;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SPG2infoTop();
                this._item.Gput(key,obj);
            }
            obj.addInterception();
            obj.aa(item.Gget(key),key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;

            obj.optimization();
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item,item);
    }

    public changeItemHeight():void{
        let objHeight = 0;
        for(let key of this._item.keys){
            let obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = obj.hheight + objHeight;
        }
    }

    private change(event?:egret.Event){
        for(let key of this._item.keys){
            this._item.Gget(key).optimization();
        }
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
		this.updata();
        this._scroView.addEventListener(egret.Event.CHANGE,this.change,this);
    }

    /**之刷新数据 */
    public onlyFreshData():void {
        // let item = FootballDataMrg.getInstance._mZQLBDG;
        let item = FootballDataMrg.getInstance.getCJDGList(2);
        let obj:SPG2infoTop;
        for(let key of item.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
                obj.freshData(item.Gget(key));
            }
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);

            for(let key of this._item.keys){
                this._item.Gget(key).removeInterception();
                for(let akey of this._item.Gget(key).getSubItem().keys){
                    this._item.Gget(key).getSubItem().Gget(akey).removeInterception();
                }
            }
        }
        this._scroView.removeEventListener(egret.Event.CHANGE,this.change,this);
    }

    /**获取滚动位置 */
    public getViewYYTop():number {
        return this._scroView.scrollTop;
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen;
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
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}