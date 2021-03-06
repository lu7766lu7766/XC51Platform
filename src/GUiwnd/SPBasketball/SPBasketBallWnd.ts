/**篮球 */
class SPBasketBallWnd extends egret.DisplayObjectContainer{
    private static _mInstance: SPBasketBallWnd;
	public static get getInstance(): SPBasketBallWnd {
		if (SPBasketBallWnd._mInstance == undefined)
			SPBasketBallWnd._mInstance = new SPBasketBallWnd();
		return SPBasketBallWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;
    private _topContain:egret.DisplayObjectContainer;

    /**默认打开串关 0串关 1单关 */
    public _index=0;
    /**当前所在页面 0过关 1让分胜负 2胜负 3大小分 4胜分差 */
    public static inIndex = 0;
    /** map 当前所有选中的数组（转换 Array<zqObjData>） */
    public allItem:GHashMap<zqObjData>;
    /**保存此data 选好返回 */
    private _data:Array<Strand>;
    /**所选数组 */
    private _arr:Array<zqObjData>=[];

    //测试数据
    private test():void{
        let id = 0;
        for(let i=0;i<3;i++){
            let fb = new GHashMap<BasketballData>();
            for(let k=0;k<3;k++){
                let dd = new BasketballData();
                dd.code = "5";
                dd.id = id;
                dd.time = "2019-06-06 周五";
                for(let j=0;j<9;j++) {
                    dd.listSX[j] = j;
                }
                dd.day = "周三";
                dd.league_name = "美职女篮";
                dd.lot_lose = -1;
                dd.no_lose = 0;
                dd.team_a_name = "火花";
                dd.team_b_name = "风暴";
                dd.stop = "20:50";
                fb.Gput(dd.id, dd);

                id+=1;
            }
            BasketballDataMrg.getInstance._mLQLB.Gput(`2019-06-0${3+i} 周五`,fb);
        }
    }

    constructor(){
        super();

        // this.test();
        
        this.y = GameValue.adaptationScreen;
        this.allItem = new GHashMap<zqObjData>();
        this._topUI = new TopUI("",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        this._topContain = new egret.DisplayObjectContainer();
        this.addTop();
        this.joinDown();

        // this.setDB();
    }

    public getArrSize():zqObjData[]{
        return this._arr;
    }

    /**more回调 */
    public upChangeSubMore(id,data:number[]):void{
        let obj = new zqObjData();
        obj.dlxId = id;
        obj.xlxIdList = data;

        this.allItem.Gput(id,obj);
        this.setitemToArr();
        this.changeText(id);
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

    /**赛事id 下标 true为选中 false取消选中 */
    public changeTextAndData(id,index,isboom:boolean):void{
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
        this.changeText(id);

        this.setitemToArr();

        // egret.log(this.allItem);
        // egret.log(this._arr);
    }

    private changeText(id):void{
        let num:number[] = [];
        if(this.allItem.GhasKey(id)){
            if(this.allItem.Gget(id).xlxIdList!=undefined){
                num = this.allItem.Gget(id).xlxIdList;
            }
        }
        if(SPBasketBallWnd.inIndex==0){//串关
            SPB1Wnd.getInstance.changeText(id,num);
        }else if(SPBasketBallWnd.inIndex==4){
            SPB5Wnd.getInstance.changeText(id,num);
        }
    }

    //投注点击删除

    public ClickRemove(id?:number){
        if(id!=undefined){
            let mitem;
            if(SPBasketBallWnd.inIndex==0){//串关
                mitem = SPB1Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==1){//让分胜负
                mitem = SPB2Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==2){//胜负
                mitem = SPB3Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==3){//大小分
                mitem = SPB4Wnd.getInstance.GetItem(); 
            }else if(SPBasketBallWnd.inIndex==4){//胜分差
                mitem = SPB5Wnd.getInstance.GetItem();
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
            this.changeText(id);
        }else{
            this.clearAllData();
        }
    }

    /**清除所有数据 */
    public clearAllData():void{
        let mitem:any;
        if(SPBasketBallWnd.inIndex==0){//串关
            mitem = SPB1Wnd.getInstance.GetItem(); 
        }else if(SPBasketBallWnd.inIndex==1){//让分胜负
            mitem = SPB2Wnd.getInstance.GetItem(); 
        }else if(SPBasketBallWnd.inIndex==2){//胜负
            mitem = SPB3Wnd.getInstance.GetItem(); 
        }else if(SPBasketBallWnd.inIndex==3){//大小分
            mitem = SPB4Wnd.getInstance.GetItem(); 
        }else if(SPBasketBallWnd.inIndex==4){//胜分差
            mitem = SPB5Wnd.getInstance.GetItem(); 
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
        this.changeText(null);
    }

    private GoChange(e:egret.TouchEvent):void{
        if(e.target == this._clearBtn){//清除数据
            this.clearAllData();
        }else if(e.target == this._goBtn){//选好了 前往
            if(this._arr.length>9){
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
            if(SPBasketBallWnd.inIndex==0){//串关
                if(this._arr != undefined && this._arr.length>1){
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr);
                    GoFBBuy.getInstance.show(this._data,this._arr,3);
                }else{
                    Alertpaner.getInstance.show("请选择2场以上赛事");
                }
            }else{//单关
                if(this._arr != undefined && this._arr.length>0){
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr,true);
                    GoFBBuy.getInstance.show(this._data,this._arr,3);
                }else{
                    Alertpaner.getInstance.show("请选择1场以上赛事");
                }
            }
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._questions){//说明
            SPBkExplain.getInstance.show();
        }else if(e.target == this._screen){//筛选
            SPBasketScreen.getInstance.show();
        }
    }

    /**篮球支付成功回调 关闭支付界面 单开订单*/
    public zfBack():void {
        MultiplierDetail.getInstance.hide();
        PaymentWnd.getInstance.hide();
        GoFBBuy.getInstance.hide();
        this.changeTop();
        
        UserInfoPhp.getInstance.sendHttp();
        Order_List.getInstance.sendHttp();
        MyLotteryWnd.getInstance.show(1);
    }

    private _mFirst:boolean = true;
    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.changeTop();
        if(UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._index = 0;
            SPBasketBallWnd.inIndex = 0;
            this.removeInterception();
            this.clearAllData();

            SPBtOnePass.getInstance.hide();
            SPB1Wnd.getInstance.hide();

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    private topClick(e:egret.TouchEvent):void{
        // Alertpaner.getInstance.show("暂未开盘");
        if(e.target == this._g1){
            if(this._index==0)return;
            this._index = 0;
        }else if(e.target == this._g2){
            if(this._index==1)return;
            this._index = 1;
        }
        this.changeTop();
    }

    private changeTop():void{
        this.clearAllData();
        if(this._index==0){
            this._g1.textColor = 0xF72F52;
            this._g2.textColor = 0xffffff;
            egret.Tween.get(this._gShape).to({x:0},200);
            SPBasketBallWnd.inIndex=0;
            SPB1Wnd.getInstance.show();
            SPBtOnePass.getInstance.hide();
            this._downT2.text = "请至少选择2场比赛";
        }else if(this._index==1){
            this._g1.textColor = 0xffffff;
            this._g2.textColor = 0xF72F52;
            egret.Tween.get(this._gShape).to({x:120},200);
            SPB1Wnd.getInstance.hide();
            SPBtOnePass.getInstance.show();
            this._downT2.text = "请至少选择1场比赛";
        }


    }

    private addInterception():void{
        this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._questions.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
    }

    private removeInterception():void{
        this._g1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        this._g2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.topClick,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._screen.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._questions.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._clearBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.GoChange,this);
    }

    /**筛选 */
    private _screen:egret.Bitmap;
    /**问题 */
    private _questions:egret.Bitmap;
    /**串关 */
    private _g1:egret.TextField;
    /**单关 */
    private _g2:egret.TextField;
    private _gShape:egret.Shape;

    private addTop():void{
        this.addChild(this._topContain);
        this._topContain.y = 16;

        let bjBox = new egret.Bitmap();
        this._topContain.addChild(bjBox);
        RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png",(e)=>{
            bjBox.$setBitmapData(e);
            bjBox.x = 256;
            bjBox.y = 0;
        },this);

        this._screen = new egret.Bitmap();
        this._topContain.addChild(this._screen);
        this._screen.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png",(e)=>{
            this._screen.$setBitmapData(e);
            this._screen.y = 12;
            this._screen.x = 604;
        },this);

        this._questions = new egret.Bitmap();
        this._topContain.addChild(this._questions);
        this._questions.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png",(e)=>{
            this._questions.$setBitmapData(e);
            this._questions.y = 8;
            this._questions.x = 676;
        },this);

        this._gShape = new egret.Shape();
        this._topContain.addChild(this._gShape);
        this._gShape.graphics.beginFill(0xffffff);
        this._gShape.graphics.drawRoundRect(256,0,120,64,33);
        this._gShape.graphics.endFill();

        this._g1 = ToolMrg.getText(256,0,32,0xffffff,120);
        this._g1.height = 64;
        this._topContain.addChild(this._g1);
        this._g1.textAlign = egret.HorizontalAlign.CENTER;
        this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g1.text = "串关";
        this._g1.touchEnabled = true;

        this._g2 = ToolMrg.getText(256+120,0,32,0xffffff,120);
        this._g2.height = 64;
        this._topContain.addChild(this._g2);
        this._g2.textAlign = egret.HorizontalAlign.CENTER;
        this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g2.text = "单关";
        this._g2.touchEnabled = true;
    }

    private _downContain:egret.DisplayObjectContainer;
	private _clearBtn:egret.Bitmap;
    private _goBtn:egret.Bitmap;
    private _selectText:egret.TextField;
    private _selectBtn:egret.Bitmap;
    private _downT2:egret.TextField;
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

        this._downT2 = ToolMrg.getText(0,58,24,0x999999,750);
        this._downContain.addChild(this._downT2);
        this._downT2.textAlign = egret.HorizontalAlign.CENTER;
        this._downT2.text = "请至少选择1场比赛";

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
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}