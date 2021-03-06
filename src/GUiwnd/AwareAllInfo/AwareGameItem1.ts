/**游戏排列三或排列五 */
class AwareGameItem1 extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.touchEnabled = true;
		this._mListBGBGBG = new GHashMap<gameRedIcon>();

		if (this._mBg == undefined) {
			this._mBg = new egret.Shape();
			this.addChild(this._mBg);
			this._mBg.graphics.beginFill(0xffffff);
			this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 150);
			this._mBg.graphics.endFill()

			let link = new egret.Shape();
			this.addChild(link);
			link.graphics.beginFill(0xF5F5F7);
			link.graphics.drawRect(0, 148, GameMain.getInstance.StageWidth, 10);
			link.graphics.endFill();
		}

		if (this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(38, 20, 28, 0x333333, 150);
		this._mTitle.text = "";
		this._mTitle.fontFamily = "微软雅黑";
		this.addChild(this._mTitle);

		this._mTq = ToolMrg.getText(138, 28, 20, 0x999999, 150);
		this._mTq.text = "";
		this._mTq.fontFamily = "微软雅黑";
		this.addChild(this._mTq);

		this._mTime = ToolMrg.getText(250, 28, 20, 0x999999, 200);
		this._mTime.text = "";
		this._mTime.fontFamily = "微软雅黑";
		this.addChild(this._mTime);

		this._mTday = ToolMrg.getText(370, 28, 20, 0x999999, 200);
		this._mTday.text = "";
		this._mTday.fontFamily = "微软雅黑";
		this.addChild(this._mTday);

		this._jtIcon = new egret.Bitmap();
		this._jtIcon.x = 708;
		this._jtIcon.y = 62;
		this.addChild(this._jtIcon);
		RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);

		this.addevent();

	}
	private myID: number = 0;//自身id
	private _mBg: egret.Shape;//背景
	private _mTitle: egret.TextField;//游戏标题
	private _mTime: egret.TextField;//时间
	private _mTq: egret.TextField;//开奖期数
	private _mTday: egret.TextField;//星期几
	private _jtIcon: egret.Bitmap;//箭头图片

	/**中奖结果列表 */
	private _mListBGBGBG: GHashMap<gameRedIcon>;

	/**设置id*/
	public setID(id: number): void {
		this.myID = id;
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this._jtIcon != undefined) {
			this._jtIcon.$setBitmapData(data);
		}
	}

	/**设置自身坐标*/
	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**设置信息
	 * 
	*/
	public setgameInfo(gameName: string, _mTq: string, _mTime: string, _mTday: string) {
		if (gameName == undefined || _mTq == undefined || _mTime == undefined || _mTday == undefined) return;
		this._mTitle.text = "" + gameName;
		this._mTq.text = "第" + _mTq + "期";
		this._mTime.text = _mTime;
		this._mTday.text = _mTday;
	}

	/**设置标题*/
	public setTayile(gameName: string): void {
		this._mTitle.text = "" + gameName;
	}

	/**初始化开奖号码*/
	public initAllRedBg(data: number[]): void {
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
			obj.x = 42 + (i - 1) * 56;
			obj.y = 78;
			this.addChild(obj);
		}
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		if (this.myID == 1) {
			HistoryAwardsWnd.getInstance.show(3);
		} else if (this.myID == 2) {
			HistoryAwardsWnd.getInstance.show(5);
		}

	}


	/**清除所有*/
	public cleanAll(): void {
		let obj: gameRedIcon;
		for (let key of this._mListBGBGBG.keys) {
			obj = this._mListBGBGBG.Gget(key);
			if (obj.parent != undefined) {
				obj.parent.removeChild(obj);
			}
		}
		if (this._mTitle != undefined) {
			this._mTitle.text = "";
			this._mTq.text = "";
			this._mTime.text = "";
			this._mTday.text = "";
		}
	}
}