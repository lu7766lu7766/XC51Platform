/**红色数字类 */
class gameRedIcon extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.redBg = new egret.Bitmap();
		this.redBg.width = 44;
		this.redBg.height = 44;
		this.redBg.x = 0;
		this.redBg.y = 0;
		this.addChild(this.redBg);
		RES.getResByUrl("resource/assets/images/ui/hmbg_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);

		this.numText = ToolMrg.getText(0, 0, 28, 0xffffff);
		this.numText.width = 44;
		this.numText.height = 44;
		this.numText.textAlign = egret.HorizontalAlign.CENTER;
		this.numText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.numText.text = "";
		this.numText.fontFamily = "微软雅黑";
		this.addChild(this.numText);
	}
	private redBg: egret.Bitmap;//红色bg
	private numText: egret.TextField;//数字

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this.redBg != undefined) {
			this.redBg.$setBitmapData(data);
		}
	}

	/**设置号码 */
	public setNumText(num: number): void {
		this.numText.text = "" + num;
	}

}