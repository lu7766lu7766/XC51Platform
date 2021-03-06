class FindWnd extends egret.DisplayObjectContainer {
    private static _mInstance: FindWnd;
    public static get getInstance(): FindWnd {
        if (FindWnd._mInstance == undefined)
            FindWnd._mInstance = new FindWnd();
        return FindWnd._mInstance;
    }

    private _mContain:egret.DisplayObjectContainer;
    private _centerContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _item:GHashMap<FindInfo>;

    constructor() {
        super();

        this._item = new GHashMap<FindInfo>();

        this._mContain = new egret.DisplayObjectContainer();
        this._centerContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        // this._mContain.addChild(this._centerContain);
        this._mContain.y = GameValue.adaptationScreen;
        // this._centerContain.y = 96;

        let title = ToolMrg.getText(0,0,36,0xf72f52,750);
        this._mContain.addChild(title);
        title.height = 96;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.text = "优惠活动";

        let topShape = new egret.Shape();
        this._mContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0,94,750,2);
        topShape.graphics.endFill();

        this.addScoll();

        this.setDB();
    }


    private upData() {
        let item = FindMrg.getInstance._findItem;

        let objHeight=30;
        for(let key of item.keys){
            let obj:FindInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new FindInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + 358;
            if(obj.parent==undefined)
                this._centerContain.addChild(obj);
        }

    }


    public show(): void {
        GUIManager.getInstance.bgLay.addChild(this);
        this.upData();
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);

            for(let key of this._item.keys){
                this._item.Gget(key).removeInterception();
            }
        }
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96+this._mContain.y;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._centerContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 100;
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

        let mZZ = new egret.Shape();
        this._centerContain.addChild(mZZ);
        mZZ.graphics.beginFill(0xF5F5F7);
        mZZ.graphics.drawRect(0,0,GameMain.getInstance.StageHeight,this._scroView.height-96);
        mZZ.graphics.endFill();
    }
}