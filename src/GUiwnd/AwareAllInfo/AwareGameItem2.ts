/**竞彩足球或者竞彩篮球 */
class AwareGameItem2 extends egret.DisplayObjectContainer {
	public constructor() {

		super();

		this.touchEnabled = true;
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

		this._mTitle = ToolMrg.getText(38, 20, 28, 0x333333, 150);
		this._mTitle.text = "";
		this._mTitle.fontFamily = "微软雅黑";
		this.addChild(this._mTitle);

		this._mTime = ToolMrg.getText(166, 28, 20, 0x999999, 200);
		this._mTime.text = "";
		this._mTime.fontFamily = "微软雅黑";
		this.addChild(this._mTime);

		this._mTday = ToolMrg.getText(286, 28, 20, 0x999999, 200);
		this._mTday.text = "";
		this._mTday.fontFamily = "微软雅黑";
		// this.addChild(this._mTday);

		this._jtIcon = new egret.Bitmap();
		this._jtIcon.x = 708;
		this._jtIcon.y = 62;
		this.addChild(this._jtIcon);
		RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		// this._bsBG = new egret.Shape();
		// this.addChild(this._bsBG);
		// this._bsBG.graphics.beginFill(0x5CB767);
		// this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
		// this._bsBG.graphics.endFill();

		// this._bsyuan = new egret.Shape();
		// this.addChild(this._bsyuan);
		// this._bsyuan.graphics.beginFill(0x5CB767);
		// this._bsyuan.graphics.drawCircle(560, 96, 28);
		// this._bsyuan.graphics.endFill();

		this._ballIcon = new egret.Bitmap();
		this._ballIcon.x = 40;
		this._ballIcon.y = 68;
		this.addChild(this._ballIcon);
		// this._ballIcon.width = 58;
		// this._ballIcon.height = 56;
		// RES.getResByUrl("resource/assets/images/ui/jlcg_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);


		this._bsTeam = ToolMrg.getText(68, 84, 24, 0xffffff, 520);
		this._bsTeam.text = "";
		this._bsTeam.fontFamily = "微软雅黑";
		this._bsTeam.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this._bsTeam);

		this.addevent();
	}

	private myID: number = 0;//自身id
	private _mBg: egret.Shape;//背景
	private _mTitle: egret.TextField;//游戏标题
	private _mTime: egret.TextField;//日期
	private _mTday: egret.TextField;//星期几
	private _jtIcon: egret.Bitmap;//箭头图片
	private _bsBG: egret.Shape;//竞技比赛背景
	private _bsyuan: egret.Shape;//圆
	private _ballIcon: egret.Bitmap;//足球或者篮球图标
	private _bsTeam: egret.TextField;//比赛队伍

	/**设置id*/
	public setID(id: number): void {
		this.myID = id;
	}

	/**设置自身坐标*/
	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this._jtIcon != undefined) {
			this._jtIcon.$setBitmapData(data);
		}
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this._ballIcon != undefined) {
			this._ballIcon.$setBitmapData(data);
		}
	}

	/**设置图标信息(1 足球 2篮球)*/
	public setBallIcon(num: number) {
		if (num == 1) {
			RES.getResByUrl("resource/assets/images/ui/kjjczq_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
		} else {
			RES.getResByUrl("resource/assets/images/ui/kjjclq_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
		}
		this.setyuanBG(num);
	}

	/**设置圆背景*/
	public setyuanBG(num: number): void {
		// if (num == 1) {
		// 	this._bsBG.graphics.clear();
		// 	this._bsBG.graphics.beginFill(0x5CB767);
		// 	this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
		// 	this._bsBG.graphics.endFill();
		// 	this._bsyuan.graphics.clear();
		// 	this._bsyuan.graphics.beginFill(0x5CB767);
		// 	this._bsyuan.graphics.drawCircle(560, 96, 28);
		// 	this._bsyuan.graphics.endFill();
		// } else {
		// 	this._bsBG.graphics.clear();
		// 	this._bsBG.graphics.beginFill(0xFC9E2B);
		// 	this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
		// 	this._bsBG.graphics.endFill();
		// 	this._bsyuan.graphics.clear();
		// 	this._bsyuan.graphics.beginFill(0xFC9E2B);
		// 	this._bsyuan.graphics.drawCircle(560, 96, 28);
		// 	this._bsyuan.graphics.endFill();
		// }
	}
	/**设置队伍比赛信息*/
	public setinfo(info: string, name: string) {
		if (info == undefined || name == undefined) return;
		this._bsTeam.text = "" + info;
		this._mTitle.text = name;
	}

	/**设置标题*/
	public setTayile(gameName: string): void {
		this._mTitle.text = "" + gameName;
	}
	/**设置时间*/
	public setTimer(str: string): void {
		if (str == undefined) return;
		this._mTime.text = str;
	}

	/**清除所有信息*/
	public cleanall() {
		this._bsTeam.text = "";
		RES.getResByUrl("", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		if (this.myID == 3) {
			jcFootBallView.getInstance.show();
		} else {
			jcbasketBallView.getInstance.show();
		}
	}


}