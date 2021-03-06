/**排三方案详情界面 */
class FathreeViewMrg extends egret.DisplayObjectContainer {
	private static _mInstance: FathreeViewMrg;
	public static get getInstance(): FathreeViewMrg {
		if (FathreeViewMrg._mInstance == undefined)
			FathreeViewMrg._mInstance = new FathreeViewMrg();
		return FathreeViewMrg._mInstance;
	}
	private _topUI: TopUI;
	private _return: egret.Shape;

	public topObj: FathreeItemTop;//顶部对象
	public centerobj: FathreeItemCenter;//中部对象
	private dataObj: MyLotteryData;//数据对象

	public constructor() {
		super();
		this.touchEnabled = true;
		this.y = 96 + GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("方案详情");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		this.topObj = new FathreeItemTop();
		this.addChild(this.topObj);


		this.centerobj = new FathreeItemCenter();
		this.addChild(this.centerobj);
		this.centerobj.y = this.topObj.height;

		this.setDB();
	}

	public show(data: MyLotteryData): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		this.dataObj = data;
		this.setTopConnet();
		this.setcenter();

		FathreeItemLow.getInstance.show(this.topObj.height + this.centerobj.height,this.dataObj);
	}

	/**设置顶部内容*/
	public setTopConnet(): void {
		if (this.dataObj != undefined) {
			if (this.dataObj.threeOrFive != undefined) {
				this.topObj.settzgold(this.dataObj.xzMoney, this.dataObj.threeOrFive.doubleNum, this.dataObj.xjMoney);
				this.topObj.setdefaultTatle(this.dataObj.title, this.dataObj.threeOrFive.qs, this.dataObj.statue,this.dataObj);
				this.topObj.setddNum(this.dataObj.id + "", this.dataObj.time);
				this.topObj.setIcon(this.dataObj.type);
			}
		}
	}

	/**设置中部*/
	public setcenter() {
		if (this.dataObj != undefined) {
			this.centerobj.initAllRedBg(this.dataObj.threeOrFive.kjNumList, this.dataObj.threeOrFive.openStr);
		}
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		FathreeItemLow.getInstance.hide();
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

}