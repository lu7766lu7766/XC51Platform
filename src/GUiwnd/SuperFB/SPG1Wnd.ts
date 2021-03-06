/**过关 */
class SPG1Wnd extends egret.DisplayObjectContainer{
    private static _mInstance: SPG1Wnd;
	public static get getInstance(): SPG1Wnd {
		if (SPG1Wnd._mInstance == undefined)
			SPG1Wnd._mInstance = new SPG1Wnd();
		return SPG1Wnd._mInstance;
	}

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _item:GHashMap<SPG1infoTop>;
    public allItem:GHashMap<zqObjData>;
    /**保存此data 选好返回 */
    private _data:Array<Strand>;
    /**为所选数组 */
    private _arr:Array<zqObjData>=[];

    //测试数据
    private test():void{
        let id = 0;
        for(let i=0;i<3;i++){
            let fb = new GHashMap<FootballData>();
            for(let k=0;k<3;k++){
                let dd = new FootballData();
                dd.code = "5";
                dd.id = id;
                dd.time = "2019-06-06 周五";
                for(let j=0;j<9;j++) {
                    dd.listSX[j] = j;
                }
                dd.day = "周三";
                dd.league_name = "欧冠杯";
                dd.lot_lose = -1;
                dd.no_lose = 0;
                dd.team_a_name = "皇家马德里";
                dd.team_b_name = "巴塞罗那";
                dd.stop = "20:50";
                fb.Gput(dd.id, dd);

                id+=1;
            }
            FootballDataMrg.getInstance._mZQLB.Gput(`2019-06-0${3+i} 周五`,fb);
        }
    }

    constructor(){
        super();

		this.touchEnabled = true;
        this.allItem = new GHashMap<zqObjData>();
        this._mContain = new egret.DisplayObjectContainer();
        this._item = new GHashMap<SPG1infoTop>();

        this.addScoll();
		this.joinDown();
        this.setDB();

    }

    /**获取当前所选数组长度 */
    public getArrSize():zqObjData[]{
        return this._arr;
    }

    public ClickRemove(id?:number){
        if(id!=undefined){
            for(let key of this._item.keys){
                let item = this._item.Gget(key).getSubItem();
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
    /**暂无数据提示 */
	private _mZWSJTip:egret.Bitmap;
    public updata():void{
        let item = FootballDataMrg.getInstance._mCJZQLB;
        let objHeight=0;
        let obj:SPG1infoTop;
        for(let key of item.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SPG1infoTop();
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
        if(item.size <= 0 && this._mZWSJTip != undefined) {
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
        let obj:SPG1infoTop;
        for(let key of this._item.keys){
            obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
        }
    }

    /**之刷新数据 */
    public onlyFreshData():void {
        let item = FootballDataMrg.getInstance._mCJZQLB;
        let obj:SPG1infoTop;
        for(let key of item.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
                obj.freshData(item.Gget(key));
            }
        }
    }

    public screenSelect(data:GHashMap<GHashMap<FootballData>>):void{
        let item = data;
        let objHeight=0;
        for(let key of item.keys){
            let obj:SPG1infoTop;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SPG1infoTop();
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

    /**获取滚动位置 */
    public getViewYYTop():number {
        return this._scroView.scrollTop;
    }

    /**清除G1所有数据 */
    public clearAllData():void{
        let data:SPG1infoTop;
        for(let key of this._item.keys){
            data = this._item.Gget(key);
            let item = data.getSubItem();
            for(let akey of item.keys){
                item.Gget(akey).clear();
            }
        }
        this._arr = [];
        this._selectText.text = "0";
        this.allItem.clear();
    }

    /**清除G1所有数据 */
    public clearSPAllData():void{
        let data:SPG1infoTop;
        for(let key of this._item.keys){
            data = this._item.Gget(key);
            let item = data.getSubItem();
            for(let akey of item.keys){
                item.Gget(akey).clear();
            }
        }
        this._selectText.text = "0";
        this.allItem.clear();
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
        for(let key of this._item.keys){
            let obj = this._item.Gget(key);
            for(let akey of obj.getSubItem().keys){
                if(akey == id){
                    obj.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
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

        for(let key of this._item.keys){
            let obj = this._item.Gget(key);
            for(let akey of obj.getSubItem().keys){
                if(akey == id){
                    obj.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
        }
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
    }

	private GoChange(e:egret.TouchEvent):void{
        if(e.target == this._clearBtn){//清除数据
            this.clearAllData();
        }else if(e.target == this._goBtn){
            if(this._arr != undefined && this._arr.length>1 && this._arr.length<9){
                this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr);
                GoFBBuy.getInstance.show(this._data,this._arr,2);
            }else 
                Alertpaner.getInstance.show("请选择2场以上赛事");
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
        downT2.text = "请至少选择2场比赛";

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

    private httpUpdata(e):void {
        if(e.data != undefined) {
            if(e.data.cf == 1) {
                // this.clearAllData();
                this.updata();
            } else if(e.data.value == 1 && this._item.size > 0) {
                this.onlyFreshData();
            } else {
                this.updata();
            }
        }
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        
        this.updata();
		Super_Ft.getInstance.sendHttp(this);
        this._scroView.addEventListener(egret.Event.CHANGE,this.change,this);
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_CJFT_List, this.httpUpdata, this);
    }

    private change(event?:egret.Event){
        for(let key of this._item.keys){
            this._item.Gget(key).optimization();
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._data = [];
            this.clearAllData();
            this._scroView.setScrollTop(0);
            
            for(let key of this._item.keys){
                this._item.Gget(key).removeInterception();
                for(let akey of this._item.Gget(key).getSubItem().keys){
                    this._item.Gget(key).getSubItem().Gget(akey).removeInterception();
                }
            }
        }
        this._scroView.removeEventListener(egret.Event.CHANGE,this.change,this);
		CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_CJFT_List, this.httpUpdata, this);
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