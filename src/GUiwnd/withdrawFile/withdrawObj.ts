/**佣金或者钱包obj */
class withdrawObj extends egret.DisplayObjectContainer {
	public constructor(id: number) {
		super();
		this.touchEnabled = true;

		this.bgIcon = new egret.Bitmap();
		this.bgIcon.x = 0;
		this.bgIcon.y = 0;
		this.bgIcon.width = 280;
		this.bgIcon.height = 120;
		this.addChild(this.bgIcon);
		RES.getResByUrl("", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.tatleText = ToolMrg.getText(0, 18, 28, 0x333333, 280);
		this.tatleText.text = "未开";
		this.tatleText.textAlign = egret.HorizontalAlign.CENTER;
		this.tatleText.fontFamily = "微软雅黑";
		this.addChild(this.tatleText);

		if (id == 1) {
			this.tatleText.text = "余额";
		} else if (id == 2) {
			this.tatleText.text = "发单佣金";
		}
		this.selectSprite(id);

		this.yemoneyText = ToolMrg.getText(0, 68, 24, 0xF72E52, 280);
		this.yemoneyText.text = "余额：0元";
		this.yemoneyText.textAlign = egret.HorizontalAlign.CENTER;
		this.yemoneyText.fontFamily = "微软雅黑";
		this.addChild(this.yemoneyText);

		this.addevent();
	}

	private yemoneyText: egret.TextField;//钱包余额或者佣金余额
	private tatleText: egret.TextField;//钱包或者佣金标题
	private bgIcon: egret.Bitmap;//背景
	private myid: number = 0;
	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.bgIcon != undefined) {
			this.bgIcon.$setBitmapData(data);
		}
	}

	public setID(id: number): void {
		this.myid = id;
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**设置佣金或零钱余额*/
	public setmongtext(num: number): void {
		this.yemoneyText.text = "余额：" + num + "元";
	}

	/**选择框显示(1 红框 2默认)*/
	public selectSprite(type: number): void {
		if (type == 1) {
			RES.getResByUrl("resource/assets/images/ui/czxz_mine@3x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
		} else if (type == 2) {
			RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@3x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		withdrawData.defauleid = this.myid;
		if (withdrawData.defauleid == 1) {
			withdrawData.getInstance.selectdecide();
		} else if (withdrawData.defauleid == 2) {
			withdrawData.getInstance.selectdecide();
		}
	}
}