/**活动8388红利 */
class activityone extends egret.DisplayObjectContainer {
	private static _mInstance: activityone;
	public static get getInstance(): activityone {
		if (activityone._mInstance == undefined)
			activityone._mInstance = new activityone();
		return activityone._mInstance;
	}
	private _topUI: TopUI;
	private _return: egret.Shape;

	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;

	private icon1: egret.Bitmap;
	private icon2: egret.Bitmap;

	public constructor() {
		super();
		this.y = 96+GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("首存8388元红利");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);


		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);

		this.icon1 = new egret.Bitmap();
		this._mContainQB.addChild(this.icon1);
		this.icon1.x = 0;
		this.icon1.y = 0;
		RES.getResByUrl("resource/assets/images/ui/sc1_find@2x.png", (e) => {
			this.icon1.$setBitmapData(e);
		}, this);

		this.icon2 = new egret.Bitmap();
		this._mContainQB.addChild(this.icon2);
		this.icon2.x = 0;
		this.icon2.y = 709;
		RES.getResByUrl("resource/assets/images/ui/sc2_find@2x.png", (e) => {
			this.icon2.$setBitmapData(e);
		}, this);

		this.setDB();
	}


	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		this._scroViewQB.setScrollTop(0);
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 0;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 96+GameValue.adaptationScreen;
		// scroView.bounces = true;
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