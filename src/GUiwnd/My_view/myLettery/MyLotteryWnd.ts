/**
 * 我的彩票
 */
class MyLotteryWnd extends egret.DisplayObjectContainer{
    private static _mInstance: MyLotteryWnd;
	public static get getInstance(): MyLotteryWnd {
		if (MyLotteryWnd._mInstance == undefined)
			MyLotteryWnd._mInstance = new MyLotteryWnd();
		return MyLotteryWnd._mInstance;
	}
	/**全部信息 滚动 */
	private _mContainQB:egret.DisplayObjectContainer;
    private _scroViewQB:egret.ScrollView;
	/**待开奖信息 滚动 */
	private _mContainDKJ:egret.DisplayObjectContainer;
    private _scroViewQBDKJ:egret.ScrollView;
	/**已开奖信息 滚动 */
	private _mContainYKJ:egret.DisplayObjectContainer;
    private _scroViewQBYKJ:egret.ScrollView;
	/**已中奖信息 滚动 */
	private _mContainYZJ:egret.DisplayObjectContainer;
    private _scroViewQBYZJ:egret.ScrollView;

    private _topUI:TopUI;
    private _return:egret.Shape;
	/**当前选中 */
	private _mXZLink:egret.Shape;

	/**暂无数据提示 */
	private _mZWSJTip:egret.Bitmap;

	private _srcItem = ["全部","待开奖","未中奖","已中奖"];
    private _index = 0;

	private _mObjList:GHashMap<MyLotteryObj>;
	private _mGSlideObj:GSlideObj;
    constructor(){
        super();
        this.y = 96+GameValue.adaptationScreen;
		this._mGSlideObj = new GSlideObj();
        this._topUI = new TopUI("",-this.y);
		this._topUI.changeTitle("我的彩票");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
        this.addScoll(this._mContainQB,this._scroViewQB);

		this._mContainDKJ = new egret.DisplayObjectContainer();
		this._scroViewQBDKJ = new egret.ScrollView();
        this.addScoll(this._mContainDKJ,this._scroViewQBDKJ);

		this._mContainYKJ = new egret.DisplayObjectContainer();
		this._scroViewQBYKJ = new egret.ScrollView();
        this.addScoll(this._mContainYKJ,this._scroViewQBYKJ);

		this._mContainYZJ = new egret.DisplayObjectContainer();
		this._scroViewQBYZJ = new egret.ScrollView();
        this.addScoll(this._mContainYZJ,this._scroViewQBYZJ);

		this.init();
		this.setDB()

		this.touchEnabled = true;

		this._mZWSJTip = new egret.Bitmap();
		RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
			this._mZWSJTip.$setBitmapData(e); 
			this._mZWSJTip.x = (GameMain.getInstance.StageWidth - this._mZWSJTip.width)*0.5;
			this._mZWSJTip.y = (GameMain.getInstance.StageHeight - this._mZWSJTip.height) * 0.5
		},this);
		this.addChild(this._mZWSJTip);

		this._mObjList = new GHashMap<MyLotteryObj>();
    }

	private addScoll(contain:egret.DisplayObjectContainer,scroView:egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 178 - GameValue.adaptationScreen - 96;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 176 - GameValue.adaptationScreen;
	}

	private init():void {
		let link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,78.5,750,1.5);
		link.graphics.endFill();

		this._mXZLink = new egret.Shape();
        this.addChild(this._mXZLink);
        this._mXZLink.graphics.beginFill(0xF72D52);
        this._mXZLink.graphics.drawRect(71,212 - 40 - 96,48,4);
		this._mXZLink.graphics.endFill();

		for(let i=0;i<this._srcItem.length;i++){
            let text:egret.TextField = ToolMrg.getText(i*187.5,136 - 40 - 96,26,0x292929,187.5);
			text.height = 80;
            text.textAlign = egret.HorizontalAlign.CENTER;
			text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.text = this._srcItem[i];
			this.addChild(text);
			text.touchEnabled = true;
			text.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        }
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

	/**切换按钮 */
	public changeWnd(index:number):void {
		this._index = index;
		// this._mXZLink.x = index * 150
		egret.Tween.removeTweens(this._mXZLink)
		egret.Tween.get(this._mXZLink).to({x:index * 187.5},100);
		if(index == 0) {
			this.showOrHide(true, false, false, false);

			this.showData(MyLotteryDataMrg.getInstance.getAllList(), this._scroViewQB, this._mContainQB);
		} else if(index == 1) {
			this.showOrHide(false, true, false, false);

			this.showData(MyLotteryDataMrg.getInstance.getDKJDataList(), this._scroViewQBDKJ , this._mContainDKJ);
		} else if(index == 2) {
			this.showOrHide(false, false, true, false);

			this.showData(MyLotteryDataMrg.getInstance.getYKJDataList(), this._scroViewQBYKJ , this._mContainYKJ);
		} else if(index == 3) {
			this.showOrHide(false, false, false, true);

			this.showData(MyLotteryDataMrg.getInstance.getYZJDataList(), this._scroViewQBYZJ , this._mContainYZJ);
		}
		this._scroViewQB.setScrollTop(0);
		this._scroViewQBDKJ.setScrollTop(0);
		this._scroViewQBYKJ.setScrollTop(0);
		this._scroViewQBYZJ.setScrollTop(0);
	}

	/**展示或移除 */
	private showOrHide(qb:boolean, dkj:boolean, ykj:boolean, yzj:boolean):void {
		if(qb == true) {
			this.addChildAt(this._scroViewQB,1);
		} else {
			if(this._scroViewQB.parent != undefined) {
				this._scroViewQB.parent.removeChild(this._scroViewQB);
			}
		}

		if(dkj == true) {
			this.addChildAt(this._scroViewQBDKJ,1);
		} else {
			if(this._scroViewQBDKJ.parent != undefined) {
				this._scroViewQBDKJ.parent.removeChild(this._scroViewQBDKJ);
			}
		}

		if(ykj == true) {
			this.addChildAt(this._scroViewQBYKJ,1);
		} else {
			if(this._scroViewQBYKJ.parent != undefined) {
				this._scroViewQBYKJ.parent.removeChild(this._scroViewQBYKJ);
			}
		}

		if(yzj == true) {
			this.addChildAt(this._scroViewQBYZJ,1);
		} else {
			if(this._scroViewQBYZJ.parent != undefined) {
				this._scroViewQBYZJ.parent.removeChild(this._scroViewQBYZJ);
			}
		}

		this.cleanData();
	}

	private cleanData():void {
		let obj:MyLotteryObj;
		for(let key of this._mObjList.keys) {
			obj = this._mObjList.Gget(key);
			if(obj.parent != undefined) {
				obj.parent.removeChild(obj);
			}
			GObjPool.getInstance.Gadd2Pool(obj);
		}
		this._mObjList.clear();
	}

	private _mList:GHashMap<MyLotteryObj>;
	/**展示对应的数据 */
	public showData(listData:Array<MyLotteryData>, scroView:egret.ScrollView,contain:egret.DisplayObjectContainer):void {
		if(this._mList == undefined) {
			this._mList = new GHashMap<MyLotteryObj>();
		}
		this._mList.clear();
		for(let i=0;i<listData.length;i++) {
			if(listData[i] != undefined) {
				let obj:MyLotteryObj = MyLotteryObj.getObj();
				obj.init(listData[i]);
				obj.y = i*110;
				// contain.addChild(obj);
				obj.touchEnabled = true;
				obj.addEvent();
				this._mObjList.Gput(i, obj);
				this._mList.Gput(i, obj);
			}
		}
		
		this._mGSlideObj.showDataByMap(15, 110, scroView, contain, this._mList);
		if(listData.length <= 0) {
			this._mZWSJTip.visible = true;
		} else {
			this._mZWSJTip.visible = false
		}
	}

    private touchDown(e:egret.TouchEvent):void{
		if(e.target instanceof egret.TextField) {
			let touch:egret.TextField = e.target;
			if(touch.text == this._srcItem[0]) {//全部
				this.changeWnd(0);
			} else if(touch.text == this._srcItem[1]) {//待开奖
				this.changeWnd(1);
			} else if(touch.text == this._srcItem[2]) {//未中奖
				this.changeWnd(2);
			} else if(touch.text == this._srcItem[3]) {//已中奖
				this.changeWnd(3);
			}
		}
    }

	private httpShow():void {
		this.changeWnd(this._index);
	}

	public static first:boolean = true;
    public show(index?:number):void{
        GUIManager.getInstance.tipLay.addChild(this);
		if(index != undefined) {
			this.changeWnd(index);
		} else {
			index = 0;
			this.changeWnd(0);
		}

		if(MyLotteryWnd.first == true && UserData.getInstance.isLogin() == true) {
			Order_List.getInstance.sendHttp();
		}
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_orderList, this.httpShow, this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
		this.cleanData();
		CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_orderList, this.httpShow, this);
    }
}