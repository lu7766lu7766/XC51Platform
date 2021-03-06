class BtOnePass extends egret.DisplayObjectContainer{
    private static _mInstance: BtOnePass;
	public static get getInstance(): BtOnePass {
		if (BtOnePass._mInstance == undefined)
			BtOnePass._mInstance = new BtOnePass();
		return BtOnePass._mInstance;
	}
    private _topStr = ["让分胜负","胜负","大小分","胜分差"];
    private _topInfo:GHashMap<OnePassTopInfo>;
    private _topShape:egret.Shape;

    /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
    private _index=0;

    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;

        this._topInfo = new GHashMap<OnePassTopInfo>();

        for(let i=0;i<this._topStr.length;i++){
            let obj = new OnePassTopInfo(this._topStr[i]);
            this._topInfo.Gput(i,obj);
            obj.x = 187.5*i;
            obj.touchEnabled = true;
            this.addChild(obj);
        }
        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect(74.5,76,48,4,8);
        this._topShape.graphics.endFill();

        let topShape = new egret.Shape();
        this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0,78.5,750,1.5);
        topShape.graphics.endFill();

        this.setDB();
    }

    public show():void{
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_List, this.updata, this);
        GUIManager.getInstance.tipLay.addChild(this);

        this.addInterception();
        this.showWnd();
        this.requestData(this._index+2);
    }

    public hide():void{
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_List, this.updata, this);
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._topShape.x = 0;
            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }
    }

    private requestData(type:number):void {
        BK_One.getInstance.sendHttp(type,this._mContern);
    }

    private selectOn(e:egret.TouchEvent):void{
        if(e.target == this._topInfo.Gget(0)){
            if(this._index==0)return;
            this._index = 0;
        }else if(e.target == this._topInfo.Gget(1)){
            if(this._index==1)return;
            this._index = 1;
        }else if(e.target == this._topInfo.Gget(2)){
            if(this._index==2)return;
            this._index = 2;
        }else if(e.target == this._topInfo.Gget(3)){
            if(this._index==3)return;
            this._index = 3;
        }
        this.showWnd();
        this.requestData(this._index+2);
    }

    /**获取单场数据列表 */
    public getDGList(id?:number):GHashMap<any> {
         let mitem;
        if(id==2){//胜平负
            mitem = B2Wnd.getInstance.GetItem(); 
        }else if(id==3){//进球数
            mitem = B3Wnd.getInstance.GetItem(); 
        }else if(id==4){//比分
            mitem = B4Wnd.getInstance.GetItem(); 
        }else if(id==5){//半全场
            mitem = B5Wnd.getInstance.GetItem(); 
        }
        return mitem;
    }

    private updata(e):void {
        if(e.data != undefined) {
            let mitem;
            if(BasketBallWnd.inIndex==1){//让分胜负
                mitem = B2Wnd.getInstance.GetItem(); 
            }else if(BasketBallWnd.inIndex==2){//胜负
                mitem = B3Wnd.getInstance.GetItem(); 
            }else if(BasketBallWnd.inIndex==3){//大小分
                mitem = B4Wnd.getInstance.GetItem(); 
            }else if(BasketBallWnd.inIndex==4){//胜分差
                mitem = B5Wnd.getInstance.GetItem();
            }
            if(e.data.cf == 1) {
                BasketBallWnd.getInstance.clearAllData();
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
        BasketBallWnd.getInstance.clearAllData();
        if(this._index==0){
            this._mContern = B2Wnd.getInstance;

            B2Wnd.getInstance.show();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }else if(this._index==1){
            this._mContern = B3Wnd.getInstance;

            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.show();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.hide();
        }else if(this._index==2){
            this._mContern = B4Wnd.getInstance;

            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.show();
            B5Wnd.getInstance.hide();
        }else if(this._index==3){
            this._mContern = B5Wnd.getInstance;

            B2Wnd.getInstance.hide();
            B3Wnd.getInstance.hide();
            B4Wnd.getInstance.hide();
            B5Wnd.getInstance.show();
        }
        egret.Tween.get(this._topShape).to({x:187.5*this._index},200,egret.Ease.circOut);
        BasketBallWnd.inIndex = this._index+1;
    }

    /**不清除刷新界面 */
    private freshNow():void {
        if(this._index==0){
            B2Wnd.getInstance.onlyFreshData();
        }else if(this._index==1){
            B3Wnd.getInstance.onlyFreshData();
        }else if(this._index==2){
            B4Wnd.getInstance.onlyFreshData();
        }else if(this._index==3){
            B5Wnd.getInstance.onlyFreshData();
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