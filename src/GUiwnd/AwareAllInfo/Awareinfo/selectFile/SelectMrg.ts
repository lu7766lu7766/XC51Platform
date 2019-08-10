/**赛事筛选界面 */
class SelectMrg extends egret.DisplayObjectContainer {
	private static _mInstance: SelectMrg;
	public static get getInstance(): SelectMrg {
		if (SelectMrg._mInstance == undefined)
			SelectMrg._mInstance = new SelectMrg();
		return SelectMrg._mInstance;
	}
	public constructor() {
		super();
		this.touchEnabled = true;
		this.y = GameValue.adaptationScreen;
		this._topUI = new TopUI("赛事筛选", -this.y);
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._topUI.getreturnSprite().visible = true;
		this._return.touchEnabled = true;
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		this._topContain = new egret.DisplayObjectContainer();
		this.addChild(this._topContain);

		this.setDB();
		this.Topinit();
	}
	private _topStr = ["全部", "一级", "竞彩", "足彩", "单场"];
	private _topUI: TopUI;
	private _return: egret.Shape;
	private _topContain: egret.DisplayObjectContainer;
	private _topInfo: GHashMap<TopInfoThree>;//数据
	private _topShape: egret.Shape;//红线
	public static inIndex = 1;//页面下标
	public gettopList(): GHashMap<TopInfoThree> {
		return this._topInfo;
	}

	/**获取本类容器*/
	public getConnet(): egret.DisplayObjectContainer {
		return this;
	}

	private Topinit(): void {
		this._topInfo = new GHashMap<TopInfoThree>();
		for (let i = 0; i < this._topStr.length; i++) {
			let obj = new TopInfoThree(this._topStr[i]);
			this._topInfo.Gput(i + 1, obj);
			obj.x = 150 * i;
			obj.y = 95;
			obj.setmyID(i + 1);
			obj.touchEnabled = true;
			this.addChild(obj);
		}
		this._topShape = new egret.Shape();
		this.addChild(this._topShape);
		this._topShape.graphics.beginFill(0xf96d67);
		this._topShape.graphics.drawRoundRect(55, 155, 48, 4, 8);
		this._topShape.graphics.endFill()
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		selectFileData.getInstance.shouhide();
		this.redXXTween();
		AllSelectSS.getInstance.show();
		LowSelectBnt.getInstance.show();
		LowSelectBnt.getInstance.y = GameMain.getInstance.StageHeight - this.y - 100;
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		SelectMrg.inIndex = 1;
		selectFileData.getInstance.resetAllredx();
	}

	private pointList: number[] = [130, 290, 440, 590];
	/**红线移动*/
	public redXXTween(): void {
		let movex: number = 150;
		if (SelectMrg.inIndex == 1) movex = 130;
		egret.Tween.get(this._topShape).to({ x: movex * (SelectMrg.inIndex - 1) }, 200, egret.Ease.circOut);
		LowSelectBnt.getInstance.setdecideBnt();
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

}

class TopInfoThree extends egret.DisplayObjectContainer {
	private _title: egret.TextField;
	private _titleShape: egret.Shape;
	private myid: number = 0;//自身id
	private decideonclick: boolean = true;//是否可以点击
	constructor(str: string) {
		super();
		this.setDB();
		this._title = ToolMrg.getText(0, 0, 28, 0x333333, 150);
		this.addChild(this._title);
		this._title.height = 64;
		this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._title.textAlign = egret.HorizontalAlign.CENTER;
		this._title.text = str;

		this.addevent();
	}

	public selectInfo(): void {
		this._title.textColor = 0xF72F52;
	}

	public noselectInfo(): void {
		this._title.textColor = 0x333333;
	}
	/**设置自身id*/
	public setmyID(myid: number): void {
		this.myid = myid;
	}

	/**获取标题*/
	public gettatile():egret.TextField{
		return this._title;
	}

	/**设置是否可以点击 */
	public setonclick(decide: boolean): void {
		this.decideonclick = decide;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, 187.5, 64);
		this._mShareC.graphics.endFill()
		this.addChildAt(this._mShareC, 0);
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		if (this.decideonclick == false) return;
		SelectMrg.inIndex = this.myid;
		selectFileData.getInstance.redxdecide();
	}

}