/**选择头像item */
class selectHeadIconItem extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this.touchEnabled = true;

		this.headIcon = new egret.Bitmap();
		this.headIcon.x = 0;
		this.headIcon.y = 0;
		this.headIcon.width = 120;
		this.headIcon.height = 120;
		this.addChild(this.headIcon);
		// RES.getResByUrl("resource/assets/images/ui/tou20.png", this.bgck, this, RES.ResourceItem.TYPE_IMAGE);

		this.seleIcon = new egret.Bitmap();
		this.seleIcon.x = 80;
		this.seleIcon.y = 80;
		this.seleIcon.width = 40;
		this.seleIcon.height = 40;
		this.addChild(this.seleIcon);
		RES.getResByUrl("resource/assets/images/ui/txxz_mine@2x.png", this.bgck1, this, RES.ResourceItem.TYPE_IMAGE);
		this.seleIcon.visible = false;

		selectHeadIconData.getInstance;


		this.addevent();
	}

	private headIcon: egret.Bitmap;//头像
	private myid: number = 0;//自身id
	private seleIcon: egret.Bitmap;//选择勾

	private bgck(data: any, url: string): void {
		if (data != undefined && this.headIcon != undefined) {
			this.headIcon.$setBitmapData(data);
			this.decideIcon = true;
		}
	}

	private decideIcon1: boolean = false;
	private bgck1(data: any, url: string): void {
		if (this.decideIcon1 == true) return;
		if (data != undefined && this.seleIcon != undefined) {
			this.seleIcon.$setBitmapData(data);
			this.decideIcon1 = true;
		}
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		selectHeadIconData.selectheadIconID = this.myid;
		selectHeadIconData.setlectHeadIcon();
	}

	public setID(id: number): void {
		this.myid = id;
		this.setIcon();
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	private decideIcon: boolean = false;
	/**设置头像 */
	private setIcon() {
		if (this.decideIcon == true) return;
		RES.getResByUrl("resource/assets/images/ui/tou" + this.myid + ".png", this.bgck, this, RES.ResourceItem.TYPE_IMAGE);
	}

	/**选择勾*/
	public selectIcon(boo: boolean): void {
		if (this.seleIcon == undefined) return;
		this.seleIcon.visible = boo;
	}
}