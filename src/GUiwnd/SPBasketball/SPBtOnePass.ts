class SPBtOnePass extends egret.DisplayObjectContainer{
    private static _mInstance: SPBtOnePass;
	public static get getInstance(): SPBtOnePass {
		if (SPBtOnePass._mInstance == undefined)
			SPBtOnePass._mInstance = new SPBtOnePass();
		return SPBtOnePass._mInstance;
	}
    // private _topStr = ["让分胜负","胜负","大小分","胜分差"];
    private _topStr = ["让分胜负","大小分"];
    private _topInfo:GHashMap<SPBtOnePassTopInfo>;
    private _topShape:egret.Shape;

    /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
    private _index=0;

    private num = 0;
    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;

        this._topInfo = new GHashMap<SPBtOnePassTopInfo>();

        this.num = GameMain.getInstance.StageWidth/this._topStr.length;
        for(let i=0;i<this._topStr.length;i++){
            let obj = new SPBtOnePassTopInfo(this._topStr[i]);
            // if()
            this._topInfo.Gput(i,obj);
            obj.x = this.num*i;
            obj.touchEnabled = true;
            this.addChild(obj);
        }

        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect((this.num - 48)/2,76,48,4,8);
        this._topShape.graphics.endFill();

        let topShape = new egret.Shape();
        this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0,78.5,750,1.5);
        topShape.graphics.endFill();

        this.setDB();
    }

    public show():void{
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_CJList, this.updata, this);
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.showWnd();
        this.requestData(this._index+2);
    }

    public hide():void{
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_CJList, this.updata, this);
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._topShape.x = 0;
            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }
    }

    private requestData(type:number):void {
        SPBK_One.getInstance.sendHttp(type,this._mContern);
    }

    private selectOn(e:egret.TouchEvent):void{
        if(e.target == this._topInfo.Gget(0)){
            if(this._index==0)return;
            this._index = 0;
        }else if(e.target == this._topInfo.Gget(1)){//大小分
             if(this._index==2)return;
            this._index = 2;
        }
        
        // else if(e.target == this._topInfo.Gget(1)){
        //     if(this._index==1)return;
        //     this._index = 1;
        // }else if(e.target == this._topInfo.Gget(2)){
        //     if(this._index==2)return;
        //     this._index = 2;
        // }else if(e.target == this._topInfo.Gget(3)){
        //     if(this._index==3)return;
        //     this._index = 3;
        // }
        this.showWnd();
        this.requestData(this._index+2);
    }

    /**获取单场数据列表 */
    public getDGList(id?:number):GHashMap<any> {
         let mitem;
        if(id==2){//胜平负
            mitem = SPB2Wnd.getInstance.GetItem(); 
        }else if(id==3){//进球数
            mitem = SPB3Wnd.getInstance.GetItem(); 
        }else if(id==4){//比分
            mitem = SPB4Wnd.getInstance.GetItem(); 
        }else if(id==5){//半全场
            mitem = SPB5Wnd.getInstance.GetItem(); 
        }
        return mitem;
    }

    private updata(e):void {
        if(e.data != undefined) {
            let mitem;
            if(SPBasketBallWnd.inIndex==1){//让分胜负
                mitem = SPB2Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==2){//胜负
                mitem = SPB3Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==3){//大小分
                mitem = SPB4Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==4){//胜分差
                mitem = SPB5Wnd.getInstance.GetItem();
            }
            if(e.data.cf == 1) {
                // SPBasketBallWnd.getInstance.clearAllData();
                this.showWnd();
            } else if(e.data.value == 1 && mitem.size > 0) {
                this.freshNow();
            } else {
                this.showWnd();
            }
        }
    }
    private _mContern:egret.DisplayObjectContainer;

    private showWnd():void{
        SPBasketBallWnd.getInstance.clearAllData();
        if(this._index==0){
            this._mContern = SPB2Wnd.getInstance;

            SPB2Wnd.getInstance.show();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }else if(this._index==1){
            this._mContern = SPB3Wnd.getInstance;

            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.show();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.hide();
        }else if(this._index==2){
            this._mContern = SPB4Wnd.getInstance;

            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.show();
            SPB5Wnd.getInstance.hide();
        }else if(this._index==3){
            this._mContern = SPB5Wnd.getInstance;

            SPB2Wnd.getInstance.hide();
            SPB3Wnd.getInstance.hide();
            SPB4Wnd.getInstance.hide();
            SPB5Wnd.getInstance.show();
        }
        if(this._index==0)
            egret.Tween.get(this._topShape).to({x:this.num*this._index},200,egret.Ease.circOut);
        else 
            egret.Tween.get(this._topShape).to({x:this.num*(this._index-1)},200,egret.Ease.circOut);

        SPBasketBallWnd.inIndex = this._index+1;
    }

    /**不清除刷新界面 */
    private freshNow():void {
        if(this._index==0){
            SPB2Wnd.getInstance.onlyFreshData();
        }else if(this._index==1){
            SPB3Wnd.getInstance.onlyFreshData();
        }else if(this._index==2){
            SPB4Wnd.getInstance.onlyFreshData();
        }else if(this._index==3){
            SPB5Wnd.getInstance.onlyFreshData();
        }
    }

    private addInterception():void{
        for(let key of this._topInfo.keys){
            this._topInfo.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP,this.selectOn,this);
        }
    }

    private removeInterception():void{
        for(let key of this._topInfo.keys){
            this._topInfo.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP,this.selectOn,this);
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,80);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}


class SPBtOnePassTopInfo extends egret.DisplayObjectContainer{
    private _title:egret.TextField;
    private _titleShape:egret.Shape;

    constructor(str:string){
        super();

        this._title = ToolMrg.getText(0,0,28,0x333333,375);
        this.addChild(this._title);
        this._title.height = 80;
        this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        this._title.text = str;

    }

    public selectInfo():void{
        this._title.textColor = 0xF72F52;
    }

    public noselectInfo():void{
        this._title.textColor = 0x333333;
    }
}