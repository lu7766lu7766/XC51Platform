class SPOnePass extends egret.DisplayObjectContainer{
    private static _mInstance: SPOnePass;
	public static get getInstance(): SPOnePass {
		if (SPOnePass._mInstance == undefined)
			SPOnePass._mInstance = new SPOnePass();
		return SPOnePass._mInstance;
	}
    private _topStr = ["胜平负","进球数","比分","半全场"];
    private _topInfo:GHashMap<SPOnePassTopInfo>;
    private _topShape:egret.Shape;

    /**当前下标 默认0 0胜平负 1进球数 2比分 3半全场 */
    private _index=0;
    /** map 当前所有选中的数组（转换 Array<zqObjData>） */
    public allItem:GHashMap<zqObjData>;
    /**保存此data 选好返回 */
    private _data:Array<Strand>;
    /**所选数组 */
    private _arr:Array<zqObjData>=[];

    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;

        this.allItem = new GHashMap<zqObjData>();
        this._topInfo = new GHashMap<SPOnePassTopInfo>();

        for(let i=0;i<this._topStr.length;i++){
            let obj = new SPOnePassTopInfo(this._topStr[i]);
            this._topInfo.Gput(i,obj);
            obj.x = 187.5*i;
            obj.touchEnabled = true;
            // this.addChild(obj);
        }
        this._topShape = new egret.Shape();
        // this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect(74.5,76,48,4,8);
        this._topShape.graphics.endFill();

        let topShape = new egret.Shape();
        // this.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0,78.5,750,1.5);
        topShape.graphics.endFill();

        this.joinDown();
        // this.setDB();
    }

    public getArrSize():zqObjData[]{
        return this._arr;
    }

    public ClickRemove(id?:number){
        if(id!=undefined){
            let mitem;
            if(SPFbWnd.inIndex==1){//胜平负
                mitem = SPG2Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==2){//进球数
                mitem = SPG3Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==3){//比分
               mitem = SPG4Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==4){//半全场
                mitem = SPG5Wnd.getInstance.GetItem(); 
            }
            for(let key of mitem.keys){
                let item = mitem.Gget(key).getSubItem();
                for(let akey of item.keys){
                    if(item.Gget(akey).id==id)
                        item.Gget(akey).clear();
                }
            }
            let arr:zqObjData[] = [];
            for(let i=0;i<this._arr.length;i++){
                if(this._arr[i].dlxId!=id)
                    arr = arr.concat(this._arr[i]);
            }
            this._arr = arr;
            this._selectText.text = `${arr.length}`;
            if(this.allItem.GhasKey(id))
                this.allItem.GremoveByKey(id);
        }else{
            this.clearAllData();
        }
    }

    /**传入当前id 以及足球表对象 */
    public changeTextAndData(id,index:number,isboom:boolean):void{
        if(isboom){//添加
            let obj:zqObjData;
            if(this.allItem.GhasKey(id)){
                obj = this.allItem.Gget(id);
            }else{
                obj = new zqObjData();
                obj.dlxId = id;
                this.allItem.Gput(id,obj);
            }
            if(obj.xlxIdList.length>0){
                obj.xlxIdList = obj.xlxIdList.concat(index);
            }else{
                obj.xlxIdList = [index];
            }
        }else{//删除
            if(this.allItem.Gget(id)){
                let obj = this.allItem.Gget(id);
                if(obj.xlxIdList.length>0){
                    let arr = [];
                    for(let i=0;i<obj.xlxIdList.length;i++){
                        if(obj.xlxIdList[i]!=index)
                        arr = arr.concat(obj.xlxIdList[i]);
                    }
                    obj.xlxIdList = arr;
                }
            }
        }
        this.setitemToArr();
    }

    /**map转换arr */
    private setitemToArr():void{
        let arr:Array<zqObjData> = [];
        for(let key of this.allItem.keys){
            if(this.allItem.Gget(key).xlxIdList.length!=0)//数组添加
                arr = arr.concat(this.allItem.Gget(key));
        }
        this._arr = arr;
        this._selectText.text = ""+this._arr.length;

        // egret.log(this.allItem);
        // egret.log(this._arr);
    }

    /**id:赛事id */
    public upChangeSubMore(id,data:GHashMap<number>):void{
        let obj = new zqObjData();
        obj.dlxId = id;
        obj.xlxIdList = [];
        for(let key of data.keys){
            obj.xlxIdList = obj.xlxIdList.concat(data.Gget(key));
        }
        this.allItem.Gput(id,obj);

        this.setitemToArr();
        for(let key of SPG4Wnd.getInstance.GetItem().keys){
            let obj = SPG4Wnd.getInstance.GetItem().Gget(key);
            for(let akey of obj.getSubItem().keys){
                if(akey == id){
                    obj.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
        }
    }

    /**清除G1所有数据 */
    public clearAllData():void{
        let mitem:any;
        if(SPFbWnd.inIndex==1){//胜平负
            mitem = SPG2Wnd.getInstance.GetItem(); 
        }else if(SPFbWnd.inIndex==2){//进球数
            mitem = SPG3Wnd.getInstance.GetItem(); 
        }else if(SPFbWnd.inIndex==3){//比分
            mitem = SPG4Wnd.getInstance.GetItem(); 
        }else if(SPFbWnd.inIndex==4){//半全场
            mitem = SPG5Wnd.getInstance.GetItem(); 
        }
        this._arr = [];
        this._selectText.text = "0";
        this.allItem.clear();
        if(mitem!=undefined){
        for(let key of mitem.keys){
            let item = mitem.Gget(key).getSubItem();
                for(let akey of item.keys){
                    item.Gget(akey).clear();
                }
            }
        }
    }

    private GoChange(e:egret.TouchEvent):void{
        if(e.target == this._clearBtn){//清除数据
            this.clearAllData();
        }else if(e.target == this._goBtn){
            if(this._arr != undefined && this._arr.length>0 && this._arr.length<9){
                this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr,true);

                GoFBBuy.getInstance.show(this._data,this._arr,2);
            }else
                Alertpaner.getInstance.show("请选择1场以上赛事");
        }
    }

    /**获取单场数据列表 */
    public getDGList(id?:number):GHashMap<any> {
         let mitem;
        if(id==2){//胜平负
            mitem = SPG2Wnd.getInstance.GetItem(); 
        }else if(id==3){//进球数
            mitem = SPG3Wnd.getInstance.GetItem(); 
        }else if(id==4){//比分
            mitem = SPG4Wnd.getInstance.GetItem(); 
        }else if(id==5){//半全场
            mitem = SPG5Wnd.getInstance.GetItem(); 
        }
        return mitem;
    }

    private updata(e):void {
        if(e.data != undefined) {
            let mitem;
            if(SPFbWnd.inIndex==1){//胜平负
                mitem = SPG2Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==2){//进球数
                mitem = SPG3Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==3){//比分
               mitem = SPG4Wnd.getInstance.GetItem(); 
            }else if(SPFbWnd.inIndex==4){//半全场
                mitem = SPG5Wnd.getInstance.GetItem(); 
            }
            if(e.data.cf == 1) {
                // this.clearAllData();
                this.showWnd();
            } else if(e.data.value == 1 && mitem.size > 0) {
                this.freshNow();
            } else {
                this.showWnd();
            }
        }
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.showWnd();
        this.requestData(this._index+2);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_CJFTDG_List, this.updata, this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
            this._data = [];
            this.clearAllData();
            this._topShape.x = 0;
            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_CJFTDG_List, this.updata, this);
    }

    private requestData(type:number):void {
        SPFT_One.getInstance.sendHttp(type,this._mContern);
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

    private _mContern:egret.DisplayObjectContainer;
    private showWnd():void{
        this.clearAllData();
        if(this._index==0){
            this._mContern = SPG2Wnd.getInstance;
            SPG2Wnd.getInstance.show();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }else if(this._index==1){
            this._mContern = SPG3Wnd.getInstance;

            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.show();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.hide();
        }else if(this._index==2){
            this._mContern = SPG4Wnd.getInstance;

            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.show();
            SPG5Wnd.getInstance.hide();
        }else if(this._index==3){
            this._mContern = SPG5Wnd.getInstance;

            SPG2Wnd.getInstance.hide();
            SPG3Wnd.getInstance.hide();
            SPG4Wnd.getInstance.hide();
            SPG5Wnd.getInstance.show();
        }
        egret.Tween.get(this._topShape).to({x:187.5*this._index},200,egret.Ease.circOut);
        SPFbWnd.inIndex = this._index+1;
    }

    /**不清除刷新界面 */
    private freshNow():void {
        if(this._index==0){
            SPG2Wnd.getInstance.onlyFreshData();
        }else if(this._index==1){
            SPG3Wnd.getInstance.onlyFreshData();
        }else if(this._index==2){
            SPG4Wnd.getInstance.onlyFreshData();
        }else if(this._index==3){
            SPG5Wnd.getInstance.onlyFreshData();
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

    private _downContain:egret.DisplayObjectContainer;
	private _clearBtn:egret.Bitmap;
    private _goBtn:egret.Bitmap;
    private _selectText:egret.TextField;
    private _selectBtn:egret.Bitmap;
	private joinDown():void{
		this._downContain = new egret.DisplayObjectContainer();

        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._downContain);
        let bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{
            bj.$setBitmapData(e);
            bj.y = -10;
        },this);

        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.x = 26;
        this._clearBtn.y = 20;
        this._clearBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png",(e)=>{
            this._clearBtn.$setBitmapData(e);
        },this);

        let downT1 = ToolMrg.getText(0,10,32,0x333333,750);
        this._downContain.addChild(downT1);
        downT1.textAlign = egret.HorizontalAlign.CENTER;
        downT1.text = "已选择   场比赛";

        this._selectText = ToolMrg.getText(0,10,32,0xF72E52,750);
        this._downContain.addChild(this._selectText);
        this._selectText.textAlign = egret.HorizontalAlign.CENTER;
        this._selectText.text = "0";

        let downT2 = ToolMrg.getText(0,58,24,0x999999,750);
        this._downContain.addChild(downT2);
        downT2.textAlign = egret.HorizontalAlign.CENTER;
        downT2.text = "请至少选择1场比赛";

        this._selectBtn = new egret.Bitmap();
        this._downContain.addChild(this._selectBtn);

        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png",(e)=>{
            this._goBtn.$setBitmapData(e);
            this._goBtn.x = 556;
            this._goBtn.y = 8;
        },this);

        let goText = ToolMrg.getText(556,28,32,0xFFFFFF,176);
        this._downContain.addChild(goText);
        goText.height = 44;
        goText.verticalAlign = egret.VerticalAlign.MIDDLE;
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "选好了";

        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
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

class SPOnePassTopInfo extends egret.DisplayObjectContainer{
    private _title:egret.TextField;
    private _titleShape:egret.Shape;

    constructor(str:string){
        super();

        this._title = ToolMrg.getText(0,0,28,0x333333,187.5);
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