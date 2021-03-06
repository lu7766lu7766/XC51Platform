/**
 * 历史开奖
 */
class HistoryAwardsWnd extends egret.DisplayObjectContainer{
    private static _mInstance: HistoryAwardsWnd;
	public static get getInstance(): HistoryAwardsWnd {
		if (HistoryAwardsWnd._mInstance == undefined)
			HistoryAwardsWnd._mInstance = new HistoryAwardsWnd();
		return HistoryAwardsWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

	/**全部信息 滚动 */
	private _mContainQB:egret.DisplayObjectContainer;
    private _scroViewQB:egret.ScrollView;

	private _mListObj:GHashMap<HistoryAwardsObj>;

    constructor(){
        super();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("",-this.y);
		this._topUI.changeTitle("历史开奖");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
        this.addScoll(this._mContainQB,this._scroViewQB);

		this.setDB()
		this.touchEnabled = true;

		this._mListObj = new GHashMap<HistoryAwardsObj>();
    }

	private addScoll(contain:egret.DisplayObjectContainer,scroView:egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 96+GameValue.adaptationScreen - this.y;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 94 - GameValue.adaptationScreen;
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

    private touchDown(e:egret.TouchEvent):void{
		if(e.target instanceof HistoryAwardsObj) {
			let data:HistoryAwardsObj = e.target
			if(data.data != undefined) {
				HistoryAwardsXQWnd.getInstance.show(data.data, this._mType);
			}
		}
    }
	private _mType:number;
	
	private _mFirst:boolean = true;
	private _mFirst1:boolean = true;
    public show(type:number):void{
		this._mType = type;
        GUIManager.getInstance.tipLay.addChild(this);
		if(type == 3 && this._mFirst == true) {
			Result_One.getInstance.sendHttp(1);
			this._mFirst = false;
		}

		if(type == 5 && this._mFirst1 == true) {
			Result_One.getInstance.sendHttp(2);
			this._mFirst1 = false;
		}
		this.update();

		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_PSPW_List, this.update, this);
    }

	private update():void {
		let data:HistoryAwardsData;
		let obj:HistoryAwardsObj;
		let list:GHashMap<HistoryAwardsData> = this._mType == 3 ? HistoryAwardsDataMrg.getInstance.getHistory3List():HistoryAwardsDataMrg.getInstance.getHistory5List();
		
		for(let i=0;i<list.size;i++) {
			data = list.Gget(i);
			if(data != undefined) {
				obj = this._mListObj.Gget(i)
				if(obj == undefined) {
					obj = HistoryAwardsObj.getObj();
					this._mListObj.Gput(i,obj);
				}
				obj.init(data);
				obj.y = i * 152;
				this._mContainQB.addChild(obj);
				obj.touchEnabled = true;
				obj.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
			}
		}
	}

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }

		let obj:HistoryAwardsObj;
		for(let key of this._mListObj.keys) {
			obj = this._mListObj.Gget(key);
			GObjPool.getInstance.Gadd2Pool(obj);
			obj.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
			if(obj.parent != undefined) {
				obj.parent.removeChild(obj);
			}
		}

		this._mListObj.clear();
		CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_PSPW_List, this.update, this);
    }
}

class HistoryAwardsData {
	/**id */
	public id:number;
	/**第几期 */
	public qs:number;
	/**开奖结果 */
	public kjjg:number[] = [];
	/**sz */
	public sz:number[] = [];
	/**时间 */
	public time:string = "";
}

class HistoryAwardsObj extends egret.DisplayObjectContainer implements GIObjPool{
	public static getObj(): HistoryAwardsObj {
		let obj = GObjPool.getInstance.GgetObj(HistoryAwardsObj);
		if (obj == null)
			obj = new HistoryAwardsObj();
		return obj;
	}

	/**背景 */
	private _mBg:egret.Shape;
	/**标题 */
	private _mTitle:egret.TextField;
	/**时间 */
	private _mTime:egret.TextField;
	/**中奖结果背景列表 */
	private _mListBG:GHashMap<egret.Bitmap>;
	/**中奖结果文字列表 */
	private _mListText:GHashMap<egret.TextField>;
	/**数据对象 */
	public data:HistoryAwardsData;

	private _mBitmapData;
	private _mInit:boolean = false;

	private constructor() {
		super();
		this.touchEnabled = true;
		this._mListBG = new GHashMap<egret.Bitmap>();
		this._mListText = new GHashMap<egret.TextField>();

		RES.getResByUrl("resource/assets/images/ui/hmbg_home@2x.png",(e)=>{
			this._mBitmapData = e;
			this._mInit = true;
			this.init(this.data);
		},this);
	}

	public init(data:HistoryAwardsData):void {
		this.data = data;
		if(this._mInit == false) {
			return;
		}
		if(this._mBg == undefined) {
			this._mBg = new egret.Shape();
			this.addChild(this._mBg);
			this._mBg.graphics.beginFill(0xffffff);
			this._mBg.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,150);
			this._mBg.graphics.endFill();

			let link = new egret.Shape();
			this.addChild(link);
			link.graphics.beginFill(0xF5F5F7);
			link.graphics.drawRect(0,148,GameMain.getInstance.StageWidth,4);
			link.graphics.endFill();
		}

		if(this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(38,20,32,0x333333,200);
		this._mTitle.text = "第" + this.data.qs +"期";
		this.addChild(this._mTitle);

		if(this._mTime == undefined) 
			this._mTime = ToolMrg.getText(574,32,24,0x999999,150);
		this._mTime.text = this.data.time;
		this.addChild(this._mTime);

		let bit:egret.Bitmap;
		let txt:egret.TextField;
		for(let i=0;i<data.kjjg.length;i++) {
			if(this._mListBG.GhasKey(i)) {
				bit = this._mListBG.Gget(i);
			} else {
				bit = new egret.Bitmap();
				this._mListBG.Gput(i, bit);
			}
			bit.$setBitmapData(this._mBitmapData);
			bit.width = 44;
			bit.height = 44;
			bit.x = 42 + i*56;
			bit.y = 78;
			this.addChild(bit);

			if(this._mListText.GhasKey(i)) {
				txt = this._mListText.Gget(i);
			} else {
				txt = ToolMrg.getText(0,0,28,0xFFFFFF,44);
				txt.height = 44;
				txt.textAlign = egret.HorizontalAlign.CENTER;
				txt.verticalAlign = egret.VerticalAlign.MIDDLE;
				this._mListText.Gput(i, txt);
			}
			txt.x = 42 + i*56;
			txt.y = 78;
			txt.text = ""+data.kjjg[i]
			this.addChild(txt);
		}
	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._mTitle.text = "";
		this._mTime.text = "";

		let bit:egret.Bitmap;
		for(let key of this._mListBG.keys) {
			bit = this._mListBG.Gget(key);
			if(bit.parent != undefined) {
				bit.parent.removeChild(bit);
			}
			bit.$setBitmapData(undefined);
		}

		let txt:egret.TextField;
		for(let key of this._mListText.keys) {
			txt = this._mListText.Gget(key);
			txt.text = "";
			if(txt.parent != undefined) {
				txt.parent.removeChild(txt);
			}
		}
	}
}