class FiveBox extends egret.DisplayObjectContainer{
    private static _mInstance: FiveBox;
	public static get getInstance(): FiveBox {
		if (FiveBox._mInstance == undefined)
			FiveBox._mInstance = new FiveBox();
		return FiveBox._mInstance;
	}
    private _topUI:TopUI;
    private _return:egret.Shape;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _mLink:egret.Shape;

    private _downContain:egret.DisplayObjectContainer;
    private _titleText:egret.TextField;
    // private _titleImg:egret.Bitmap;
    private _history:egret.Bitmap;
    private _question:egret.Bitmap;

    // public titleItem = ["直选","组三","组六"];
    public titleIndex = 0;
    private _historyItem:GHashMap<ThreeHistoryInfo>;

    public oneItem:number[] = [];
    public twoItem:number[] = [];
    public threeItem:number[] = [];
    public fourItem:number[] = [];
    public fiveItem:number[] = [];

    public static historyType=false;

    constructor(){
        super();
        this.touchEnabled = true;

        this._historyItem = new GHashMap<ThreeHistoryInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();
        this._mLink = new egret.Shape();
        this._mContain.addChild(this._mLink);
        this._topUI = new TopUI("",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._titleText = ToolMrg.getText(100,62-40+GameValue.adaptationScreen,36,0xffffff,550);
        this._titleText.height = 50;
        this._titleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._titleText.textAlign = egret.HorizontalAlign.CENTER;
        this._titleText.touchEnabled = true;
        this.addChild(this._titleText);
        this._titleText.text = "排列五";

        // this._titleImg = new egret.Bitmap();
        // this._titleImg.touchEnabled = true;
        // this.addChild(this._titleImg);
        // this._titleImg.y = 84;
        // RES.getResByUrl("resource/assets/images/ui/xiala_home@2x.png",(e)=>{this._titleImg.$setBitmapData(e); },this);

        this._history = new egret.Bitmap();
        this.addChild(this._history);
        this._history.x = 604;
        this._history.y = 65-40+GameValue.adaptationScreen;
        this._history.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/kjls_nav@2x.png",(e)=>{this._history.$setBitmapData(e); },this);

        this._question = new egret.Bitmap();
        this._question.touchEnabled = true;
        this.addChild(this._question);
        this._question.x = 676;
        this._question.y = 64-40+GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png",(e)=>{
            this._question.$setBitmapData(e); 
        },this);

        this.joinDown();
        this.setDB();
    }

    /** true更新协议 false不更新 hide的时候值改为true  */
    private _isChangeHttp = true;

    /**计算截止时间  */
    public EndOfTime():void{
        if(this==undefined || this.parent==undefined)return;
        if(GameValue.typeQS==0){
            this._theNum.text = `距`+GameValue.fiveQS+`期开始`;
        }else{
            this._theNum.text = `距`+GameValue.fiveQS+`期截止`;
        }
        let a = GameValue.stopTime - Math.floor(new Date().getTime()/1000);
        if(a<0){
            this._hour.text = "-";
            this._min.text = "-";
            this._second.text = "-";
            if(this._isChangeHttp){
                QsPhp.getInstance.sendHttp();
                this._isChangeHttp = false;
            }
        }else{
            //时
            let hours = Math.floor(a/3600);
            let hourss = hours< 10? "0"+hours:hours+"";
            //分
            a = a%3600;
            let mins = Math.floor(a/60);
            let minss = mins<10 ? "0"+mins:mins+"";
            //秒
            let secs = a%60;
            let secss = secs<10 ? "0"+secs:secs+"";

            this._hour.text = hourss;
            this._min.text = minss;
            this._second.text = secss;
        }
    }

    private _theNum:egret.TextField;
    private _clearBtn:egret.Bitmap;
    private _goBnt:egret.Bitmap;
    private _downTipText:egret.TextField;
    //时分秒
    private _hour:egret.TextField;
    private _min:egret.TextField;
    private _second:egret.TextField;
    private joinDown():void{
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - 200;

        let downbj = new egret.Bitmap();
        this._downContain.addChild(downbj);

        downbj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{downbj.$setBitmapData(e); },this);
        
        this._theNum = ToolMrg.getText(45,32,28,0x333333, 300);
        this._downContain.addChild(this._theNum);
        this._theNum.height = 40;
        this._theNum.textAlign = egret.HorizontalAlign.RIGHT;
        this._theNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._theNum.text = `距`+GameValue.fiveQS+`期截止`;


        let hmsText1 = ToolMrg.getText(400,32,28,0x333333);
        this._downContain.addChild(hmsText1);
        hmsText1.height = 40;
        hmsText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText1.text = "时";

        let hmsText2 = ToolMrg.getText(480,32,28,0x333333);
        this._downContain.addChild(hmsText2);
        hmsText2.height = 40;
        hmsText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText2.text = "分";

        let hmsText3 = ToolMrg.getText(560,32,28,0x333333);
        this._downContain.addChild(hmsText3);
        hmsText3.height = 40;
        hmsText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText3.text = "秒";

        let downImg1 = new egret.Shape();
        this._downContain.addChild(downImg1);
        downImg1.graphics.beginFill(0xff7000);
        downImg1.graphics.drawRoundRect(352,34,44,36,10);
        downImg1.graphics.endFill();
        
        let downImg2 = new egret.Shape();
        this._downContain.addChild(downImg2);
        downImg2.graphics.beginFill(0xff7000);
        downImg2.graphics.drawRoundRect(432,34,44,36,10);
        downImg2.graphics.endFill();
        
        let downImg3 = new egret.Shape();
        this._downContain.addChild(downImg3);
        downImg3.graphics.beginFill(0xff7000);
        downImg3.graphics.drawRoundRect(514,34,44,36,10);
        downImg3.graphics.endFill();

        this._hour = ToolMrg.getText(352,34,28,0xffffff,44);
        this._downContain.addChild(this._hour);
        this._hour.height = 36;
        this._hour.textAlign = egret.HorizontalAlign.CENTER;
        this._hour.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._hour.text = "03";

        this._min = ToolMrg.getText(432,34,28,0xffffff,44);
        this._downContain.addChild(this._min);
        this._min.height = 36;
        this._min.textAlign = egret.HorizontalAlign.CENTER;
        this._min.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._min.text = "59";

        this._second = ToolMrg.getText(514,34,28,0xffffff,44);
        this._downContain.addChild(this._second);
        this._second.height = 36;
        this._second.textAlign = egret.HorizontalAlign.CENTER;
        this._second.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._second.text = "37";

        let downLink = new egret.Shape();
        this._downContain.addChild(downLink);
        downLink.graphics.beginFill(0xdedede);
        downLink.graphics.drawRect(0,99.5,750,1.5);
        downLink.graphics.endFill();

        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.touchEnabled = true;
        this._clearBtn.x = 26;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png",(e)=>{
            this._clearBtn.$setBitmapData(e); 
            this._clearBtn.y = 100 + (100 - this._clearBtn.height)*0.5;
        },this);

        this._goBnt = new egret.Bitmap();
        this._downContain.addChild(this._goBnt);
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png",(e)=>{
            this._goBnt.$setBitmapData(e); 
            this._goBnt.x = 572;
            this._goBnt.y = 110;
        },this);
        this._goBnt.touchEnabled = true;

        let tzText = ToolMrg.getText(572,100,32,0xffffff,176);
        this._downContain.addChild(tzText);
        tzText.height = 100;
        tzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tzText.textAlign = egret.HorizontalAlign.CENTER;
        tzText.text = "投注";

        this._downTipText = ToolMrg.getText(0,100,32,0x333333,750);
        this._downContain.addChild(this._downTipText);
        this._downTipText.height = 100;
        this._downTipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._downTipText.textAlign = egret.HorizontalAlign.CENTER;
        this._downTipText.text = ToolMrg.nameMode2(20,`0注 共 0 元`);
    }

    private _data:InjectionCode;
    /**排列五 list发生变化触发 */
    public changeItem():void{
        this._data;
        if(this.titleIndex==0){//列五 直选
            this._data = GroupDataMrg.getInstance.group5(this.oneItem,this.twoItem,this.threeItem,this.fourItem,this.fiveItem);
        }

        if(this._data != undefined)
            this._downTipText.text = ToolMrg.nameMode2(20,`${this._data.injectionNum}注 共 ${this._data.injectionNum*2} 元`);
        else
            this._downTipText.text = ToolMrg.nameMode2(20,`0注 共 0 元`);
    }

    public ClickClear():void{
        if(this.titleIndex==0){//清除选中
            fiveWnd.getInstance.clearItem();
        }
        this.oneItem = [];
        this.twoItem = [];
        this.threeItem = [];
        this.fourItem = [];
        this.fiveItem = [];
        this.changeItem();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._titleText){//点击标题
            
        }else if(e.target == this._goBnt){//前往
            if(GameValue.typeQS==0){
                Alertpaner.getInstance.show("暂未开赛");
                return;
            }
            if(ThreeGo.getInstance.getListIsEmpty()){
                if(this._data==undefined){
                    Alertpaner.getInstance.show("每位至少选择1个号码");
                    return;
                }
            }
            ThreeGo.getInstance.show(this._data,1);
            this.ClickClear();
        }else if(e.target == this._clearBtn){//清空
            this.ClickClear();
        } else if(e.target == this._history) {
            HistoryAwardsWnd.getInstance.show(5);
        }else if(e.target == this._return){
             if(ThreeGo.getInstance.getListIsEmpty())
                this.hide(); 
            else
                isDelect.getInstance.show("five"); 
        }else if(e.target == this._question){
            ListFiveExplain.getInstance.show();
        }
    }

    public updataHistory():void{
        let objHeight=0;
        let index = 0;
        let item = HistoryAwardsDataMrg.getInstance.getHistory5List();
        for(let key of item.keys){
            if(index>9)return;
            let obj:ThreeHistoryInfo;
            if(this._historyItem.GhasKey(key)){
                obj = this._historyItem.Gget(key);
            }else{
                obj = new ThreeHistoryInfo();
                this._historyItem.Gput(key,obj);
            }
            obj.aa(item.Gget(key));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
            index+=1;
        }

        this._mLink.graphics.clear();
        this._mLink.graphics.beginFill(0xdedede);
        if(objHeight<501)
            objHeight = 500.5;
        this._mLink.graphics.drawRect(0,objHeight,750,1.5);
        this._mLink.graphics.endFill();
    }

    public showHistoryList():void{
        FiveBox.historyType = true;
        egret.Tween.get(this._scroView).to({y:96+GameValue.adaptationScreen},300,egret.Ease.circInOut);
    }

    public hideHistoryList():void{
        FiveBox.historyType = false;
        egret.Tween.get(this._scroView).to({y:96+GameValue.adaptationScreen-502},300,egret.Ease.circInOut);
    }

    public changeText():void{
        if(FiveBox.historyType)
            this.hideHistoryList();
        // this._titleText.text = "排列三-"+this.titleItem[this.titleIndex];
        // this._titleImg.x = 375 + this._titleText.textWidth/2 + 10;
        // ["直选","组三","组六"]
        if(this.titleIndex == 0){//打开页面
            fiveWnd.getInstance.show();
        }
    }

    private _mFirst:boolean = true;
    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.changeText();
        Result_One.getInstance.sendHttp(2);
        if(UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
        // this.showHistoryList();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_PSPW_List, this.updataHistory, this);

        this._theNum.text = `距`+GameValue.fiveQS+`期截止`;
    } 

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            fiveWnd.getInstance.hide();
            this.ClickClear();
            this.titleIndex = 0;
            this._isChangeHttp = true;
            CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_PSPW_List, this.updataHistory, this);

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    public addInterception():void{
        this._history.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._question.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBnt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._titleText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public removeInterception():void{
        this._history.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._question.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._clearBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBnt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._titleText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen-502;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = 502;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 200);
        this._mShareC.graphics.endFill();
		this._downContain.addChildAt(this._mShareC, 0);

        let mShareC = new egret.Shape();
		mShareC.graphics.beginFill(0xffffff, 1);
		mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 502);
        mShareC.graphics.endFill();
		this._mContain.addChildAt(mShareC, 0);
    }
}