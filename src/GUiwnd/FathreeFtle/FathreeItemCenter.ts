/**中部 */
class FathreeItemCenter extends egret.DisplayObjectContainer {
	public constructor() {
		super();
		this._mListBGBGBG = new GHashMap<gameRedIcon>();
		this.awareIcon = new egret.Bitmap();
		this.awareIcon.x = 30;
		this.awareIcon.y = 22;
		this.addChild(this.awareIcon);
		RES.getResByUrl("resource/assets/images/ui/kjjg_mine@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);

		let awareNum: egret.TextField = ToolMrg.getText(64, 25,28, 0x333333, 150);
		awareNum.text = "开奖号码";
		// awareNum.fontFamily = "微软雅黑";
		// awareNum.bold = true;
		this.addChild(awareNum);

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xDEDEDE);
		link.graphics.drawRect(0, 78, 750, 2);
		link.graphics.endFill();

		this.awareNum = ToolMrg.getText(64, 104, 24, 0x333333);
		this.awareNum.text = "预计今天20:30开奖";
		// this.awareNum.fontFamily = "微软雅黑";
		// this.awareNum.bold = true;
		this.addChild(this.awareNum);


		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 156, 750, 10);
		link1.graphics.endFill();

		this.setDB();
	}

	private awareIcon: egret.Bitmap;//奖杯图标
	private awareNum: egret.TextField;//开奖号码或开奖时间
	/**中奖结果列表 */
	private _mListBGBGBG: GHashMap<gameRedIcon>;

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 166);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this.awareIcon != undefined) {
			this.awareIcon.$setBitmapData(data);
		}
	}

	/**初始化开奖号码*/
	public initAllRedBg(data: number[],str:string): void {
		this.cleall();
		if (data != undefined) {
			if (data.length > 0) {
				this.awareNum.visible = false;
			} else {
				this.awareNum.visible = true;
				this.setTimer(str);
			}
		}
		if (data == undefined) return;
		let len: number = data.length;
		let obj: gameRedIcon;
		for (let i = 1; i <= len; i++) {
			if (this._mListBGBGBG.GhasKey(i)) {
				obj = this._mListBGBGBG.Gget(i);
			} else {
				obj = new gameRedIcon();
				this._mListBGBGBG.Gput(i, obj);
			}
			obj.setNumText(data[i - 1]);
			obj.x = 64 + (i - 1) * 56;
			obj.y = 96;
			this.addChild(obj);
		}
	}

	/**设置时间*/
	public setTimer(timer: string): void {
		this.awareNum.text = "预计" + timer + "截止";
	}

	public cleall() {
		let obj: gameRedIcon;
		for (let key of this._mListBGBGBG.keys) {
			obj = this._mListBGBGBG.Gget(key);
			if (obj != undefined) {
				if (obj.parent != undefined) {
					obj.parent.removeChild(obj);
				}
			}
		}
	}
}