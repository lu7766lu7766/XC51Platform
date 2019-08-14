// TypeScript file
class Alertpaner extends egret.DisplayObjectContainer {
	private static _mInstance: Alertpaner;
	public static get getInstance(): Alertpaner {
		if (Alertpaner._mInstance == undefined)
			Alertpaner._mInstance = new Alertpaner();
		return Alertpaner._mInstance;
	}
	private alertGroup: egret.DisplayObjectContainer;
	private text: egret.TextField;
	private shape:egret.Shape;
	private constructor() {
		super();
		this.onInit();
	}
	protected onInit(): void {
		this.alertGroup = new egret.DisplayObjectContainer();
		this.alertGroup.x = (GameMain.getInstance.StageWidth - 348)*0.5;
		this.alertGroup.y = (GameMain.getInstance.StageHeight - 98)*0.5;
		this.alertGroup.width = 348;
		this.alertGroup.height = 98;
		this.addChild(this.alertGroup);

		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(0x949494, 0.9);
		this.shape.graphics.drawRoundRect(0, 0, 348, 98, 10, 10);
		this.shape.graphics.endFill();
		this.text = this.getText(0, 0, 24, 0xffffff, 348);
		this.text.bold = true;
		this.text.height = 98;
		this.text.textAlign = egret.HorizontalAlign.CENTER;
		this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.text.lineSpacing=10;
		this.alertGroup.addChild(this.shape)
		this.alertGroup.addChild(this.text)
	}
	//显示
	public show(str:string): void {
		if(this.parent == undefined) {
			GUIManager.getInstance.mostLay.addChild(this);

			setTimeout(function () {
            	Alertpaner.getInstance.hide()
        	}, 1300);
		}

		this.text.text = str;
	}

	private getText(x: number, y: number, size: number, color: number, width?: number): egret.TextField {
		let text = new egret.TextField();
		text.x = x - this.x;
		text.y = y - this.y;
		text.fontFamily = "微软雅黑";
		text.size = size;
		text.textColor = color;
		if (width != undefined)
			text.width = width;
		return text;
	}
	//隐藏
	public hide(): void {
		if(this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}
}