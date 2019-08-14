/**温馨提示界面 */
class TsView extends egret.DisplayObjectContainer {
	private static _mInstance: TsView;
	public static get getInstance(): TsView {
		if (TsView._mInstance == undefined)
			TsView._mInstance = new TsView();
		return TsView._mInstance;
	}

	private _mContain: egret.DisplayObjectContainer;
	private _title: egret.TextField;
	private _leftBtn: egret.Bitmap;


	constructor() {
		super();
		this.touchEnabled = true;
		this._mContain = new egret.DisplayObjectContainer();
		this.addChild(this._mContain);

		// let shape = new egret.Shape();
		// this._mContain.addChild(shape);
		// shape.graphics.beginFill(0xffffff);
		// shape.graphics.drawRoundRect(0, 0, 600, 240, 33);
		// shape.graphics.endFill();
		// shape.touchEnabled = true;

		let BBG = new egret.Bitmap();
		this._mContain.addChild(BBG);
		RES.getResByUrl("resource/assets/images/ui/tsbg_home@2x.png", (e) => {
			BBG.$setBitmapData(e);
			BBG.x = 0;
			BBG.y = 0;
		}, this);

		this._title = ToolMrg.getText(0, 30, 36, 0x333333, 496);
		this._mContain.addChild(this._title);
		this._title.textAlign = egret.HorizontalAlign.CENTER;
		this._title.text = "温馨提示";
		this._title.bold = true;
		this._title.fontFamily = "微软雅黑";


		this._leftBtn = new egret.Bitmap();
		this._mContain.addChild(this._leftBtn);
		RES.getResByUrl("resource/assets/images/ui/scdd_home@2x.png", (e) => {
			this._leftBtn.$setBitmapData(e);
			this._leftBtn.x = 436;
			this._leftBtn.y =20;
			this._leftBtn.scaleX=1.3;
			this._leftBtn.scaleY=1.3;
		}, this);
		this._leftBtn.touchEnabled = true;
		this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);



		let leftText = ToolMrg.getText(40, 100,22, 0x333333, 496);
		this._mContain.addChild(leftText);
		leftText.textAlign = egret.HorizontalAlign.LEFT;
		leftText.fontFamily = "微软雅黑";
		leftText.text="亲爱的彩友，根据国家竞彩销售时间的规\n定，以下时段，暂停售竞足、竞篮玩法：\n"+
		"周一至周五：22:00-9:00;"+"\n周六至周日：23:00-9:00;"+"\n超级竞彩仍可正常下注，祝您游戏愉快！";
		leftText.lineSpacing = 15;

		this.setDB();
	}

	private touchDown(e: egret.TouchEvent): void {
		this.hide();
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5+20;
		this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5-50;
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this.addChildAt(this._mShareC, 0);
		this._mShareC.touchEnabled = true;
		// this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
	}
}