/**足球选择日期 */
class selectDayFootball extends egret.DisplayObjectContainer {
	private static _mInstance: selectDayFootball;
	public static get getInstance(): selectDayFootball {
		if (selectDayFootball._mInstance == undefined)
			selectDayFootball._mInstance = new selectDayFootball();
		return selectDayFootball._mInstance;
	}

	/**选择列表 */
	private _mListBGBGBG: GHashMap<selectdayItem>;
	public getlist(): GHashMap<selectdayItem> {
		return this._mListBGBGBG;
	}
	public constructor() {
		super();

		this.y = 141;
		this.touchEnabled = true;
		this._mListBGBGBG = new GHashMap<selectdayItem>();
		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xFFFFFF);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 420);
		link.graphics.endFill();

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0x000000);
		link1.graphics.drawRect(0, 420, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - 420);
		link1.graphics.endFill();
		link1.alpha = 0.3;
	}

	public show(): void {
		if (this.parent == undefined) {
			jcFootBallView.getInstance.getconnet().addChild(this);
		}
		this.initAllRedBg();
	}

	public hide(): void {
		if (this.parent != undefined) {
			if (this.parent != undefined) {
				this.parent.removeChild(this);
			}
		}
	}

	/**初始化所有选者号码*/
	public initAllRedBg(): void {
		let len: number =selectDayFootballData.selectDay.length;
		let obj: selectdayItem;
		let ypoin: number = 0;
		for (let i = 1; i <= len; i++) {
			if (this._mListBGBGBG.GhasKey(i)) {
				obj = this._mListBGBGBG.Gget(i);
			} else {
				obj = new selectdayItem();
				this._mListBGBGBG.Gput(i, obj);
			}
			obj.setid(i);
			let timer: string = selectDayFootballData.selectDay[i - 1] + "";
			timer = ToolMrg.getTime6(Number(timer));
			obj.setQQ(timer + "期");
			let type: number = (i - 1) % 3;
			if (i != 1) {
				if (type == 0) ypoin++;
			}
			obj.setPoint(54 + (type) * 232, 28 + ypoin * 100);

			if (obj.parent == undefined) {
				this.addChild(obj);
			}
		}
		selectDayFootballData.getInstance.selectqq()
	}
}

class selectdayItem extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.touchEnabled = true;
		this.bgIcon = new egret.Bitmap();
		this.bgIcon.x = 0;
		this.bgIcon.y = 0;
		this.bgIcon.width = 180;
		this.bgIcon.height = 60;
		this.addChild(this.bgIcon);
		RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.qqday = ToolMrg.getText(0, 0, 24, 0x333333, 180);
		this.addChild(this.qqday);
		this.qqday.height = 60;
		this.qqday.textAlign = egret.HorizontalAlign.CENTER;
		this.qqday.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.qqday.text = "20190606";

		this.addevent();

	}

	private bgIcon: egret.Bitmap;//底图
	private qqday: egret.TextField;//期数
	private myid: number = 0;//自身id
	private qqID: number = 0;//期数id

	public setid(id: number) {
		this.myid = id;
	}

	/**设置自身坐标*/
	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.bgIcon != undefined) {
			this.bgIcon.$setBitmapData(data);
		}
	}

	/**选择(1 选 2不选)*/
	public selcet(type: number): void {
		if (type == 1) {
			RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
			this.qqday.textColor = 0xF72E52;
		} else {
			RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
			this.qqday.textColor = 0x333333;
		}
	}

	/**设置期数*/
	public setQQ(type: string): void {
		this.qqday.text = type;
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		selectDayFootballData.defaultselectNum = this.myid;
		selectDayFootballData.getInstance.selectqq();
		selectDayFootballData.ifshow = false;
		selectDayFootball.getInstance.hide();
		let timer: number = selectDayFootballData.selectDay[this.myid - 1];
		selectResultConf.getInstance.sendHttp(1, timer + "");
	}

}
