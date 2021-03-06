/**
 * 开奖详情
 */
class HistoryAwardsXQWnd extends egret.DisplayObjectContainer{
    private static _mInstance: HistoryAwardsXQWnd;
	public static get getInstance(): HistoryAwardsXQWnd {
		if (HistoryAwardsXQWnd._mInstance == undefined)
			HistoryAwardsXQWnd._mInstance = new HistoryAwardsXQWnd();
		return HistoryAwardsXQWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;
	private _mObj:HistoryAwardsObj;
	private _srcItem = ["奖项","中奖注数","单注奖金"];
	private _LsrcItem3 = ["直选","组三","组六"];
	private _LsrcItem5 = ["一等奖"];
	private _mList:GHashMap<TiaoBoj>;

    constructor(){
        super();
		this._mList = new GHashMap<TiaoBoj>();
        this.y = 96+GameValue.adaptationScreen;
        this._topUI = new TopUI("",-this.y);
		this._topUI.changeTitle("开奖详情");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

		this.setDB()
		this.touchEnabled = true;

		let link = new egret.Shape();
		link.graphics.beginFill(0xF5F5F7);
		link.graphics.drawRect(0,286 - 40 - 96,GameMain.getInstance.StageWidth,10);
		link.graphics.endFill();
		this.addChild(link);
		
		for(let i=0;i<this._srcItem.length;i++){
            let text:egret.TextField = ToolMrg.getText(i*250,296 - 40 - 96,32,0x999999,250);
			text.height = 90;
            text.textAlign = egret.HorizontalAlign.CENTER;
			text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.text = this._srcItem[i];
			this.addChild(text);
			text.touchEnabled = true;
        }

		let link1 = new egret.Shape();
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0,396 - 40 - 96,GameMain.getInstance.StageWidth,2);
		link1.graphics.endFill();
		this.addChild(link1);
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

    public show(data:HistoryAwardsData,type:number):void{
        GUIManager.getInstance.tipLay.addChild(this);

		if(this._mObj == undefined)
			this._mObj = HistoryAwardsObj.getObj();
		this._mObj.init(data);
		// this._mObj.y = 96+GameValue.adaptationScreen - 40 - 96;
		this.addChildAt(this._mObj,1);
		
		let list:string[] = this._LsrcItem3;
		if(type == 5) {
			list = this._LsrcItem5;
		}
		let obj:TiaoBoj;
		for(let i=0;i<list.length;i++) {
			if(this._mList.GhasKey(i)) {
				obj = this._mList.Gget(i);
			} else {
				obj = TiaoBoj.getObj();
				this._mList.Gput(i,obj);
			}
			obj.init(list[i],data.sz[i*2],data.sz[(i)*2+1]);
			obj.y = 406 - 40 - 96 + i*100;
			this.addChild(obj);
		}
    }

    public hide():void{
		GObjPool.getInstance.Gadd2Pool(this._mObj);
		if(this._mObj.parent != undefined) {
			this._mObj.parent.removeChild(this._mObj);
		}
		let obj:TiaoBoj;
		for(let key of this._mList.keys) {
			obj = this._mList.Gget(key);
			if(obj.parent != undefined) {
				obj.parent.removeChild(obj);
			}
		}
		this._mObj = undefined;

        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }
}

/**一条对象 */
class TiaoBoj extends egret.DisplayObjectContainer implements GIObjPool{
	public static getObj(): TiaoBoj {
		let obj = GObjPool.getInstance.GgetObj(TiaoBoj);
		if (obj == null)
			obj = new TiaoBoj();
		return obj;
	}

	/**标题 */
	private _mTitle:egret.TextField;
	/**下注 */
	private _mXZ:egret.TextField;
	/**钱 */
	private _mJQ:egret.TextField;

	private constructor() {
		super();
		this.touchEnabled = true;
		let link2 = new egret.Shape();
		link2.graphics.beginFill(0xffffff);
		link2.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,100);
		link2.graphics.endFill();
		this.addChild(link2);

		let link1 = new egret.Shape();
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(20,98,GameMain.getInstance.StageWidth - 40,2);
		link1.graphics.endFill();
		this.addChild(link1);
	}

	public init(str:string, zs:number,m:number):void {
		if(this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(100,26,32,0x333333,200);
		this._mTitle.text = str;
		this.addChild(this._mTitle);

		if(this._mXZ == undefined) 
			this._mXZ = ToolMrg.getText(274,32,24,0x333333,200);
		this._mXZ.textAlign = egret.HorizontalAlign.CENTER;
		this._mXZ.text = ""+zs;
		this.addChild(this._mXZ);

		if(this._mJQ == undefined) 
			this._mJQ = ToolMrg.getText(524,32,24,0xF72E52,200);
		this._mJQ.textAlign = egret.HorizontalAlign.CENTER;
		this._mJQ.text = ""+m;
		this.addChild(this._mJQ);

	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._mTitle.text = "";
		this._mXZ.text = "";
		this._mJQ.text = "";
	}
}