/**银行卡 */
class CardAddtoSelect extends egret.DisplayObjectContainer{
    private static _mInstance: CardAddtoSelect;
    public static get getInstance(): CardAddtoSelect {
        if (CardAddtoSelect._mInstance == undefined)
            CardAddtoSelect._mInstance = new CardAddtoSelect();
        return CardAddtoSelect._mInstance;
    }

    private _topUI:TopUIWhite;
    private _return:egret.Shape;

    private _addContain:egret.DisplayObjectContainer;
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _item:GHashMap<SelectInfo>;

    constructor(){
        super();

        this._item = new GHashMap<SelectInfo>();

        this._topUI = new TopUIWhite("银行卡");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._topUI.hideTxText();

        this._mContain = new egret.DisplayObjectContainer();
        this._addContain = new egret.DisplayObjectContainer();
        this._addContain.x = 28;
        this._mContain.addChild(this._addContain);

        this.addScoll();
        this.joinAdd();

        this.setDB();
    }

    private _goBtn:egret.Bitmap;
    /** 0 0 修改_addContain x,y */
    private joinAdd():void{
        this._goBtn = new egret.Bitmap();
        this._addContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        this._goBtn.x = -6;
        RES.getResByUrl("resource/assets/images/ui/bdbg_mine@2x.png",(e)=>{this._goBtn.$setBitmapData(e); },this);
        
        let addbtn = new egret.Bitmap();
        this._addContain.addChild(addbtn);
        addbtn.x = 188;
        addbtn.y = 30;
        RES.getResByUrl("resource/assets/images/ui/tianjia_mine@2x.png",(e)=>{addbtn.$setBitmapData(e); },this);
        
        let addText = ToolMrg.getText(250,0,28,0x333333);
        this._addContain.addChild(addText);
        addText.height = 100;
        addText.verticalAlign = egret.VerticalAlign.MIDDLE;
        addText.text = "添加提款银行卡";
    }

    public updata():void{
        let item = SelectDataMrg.getInstance.getItem();

        let objHeight = 40;
        for(let key of item.keys){
            let obj:SelectInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SelectInfo();
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

        this._addContain.y = objHeight;
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.updata();
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
        }else if(e.target == this._goBtn){//添加提款银行卡
            AddBankCard.getInstance.show();
        }
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).removeInterception();
        }
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        this.addChild(this._scroView);
    }

}