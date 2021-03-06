/**足球或篮球比分详情界面 */
class BakorfallViewMrg extends egret.DisplayObjectContainer {
	private static _mInstance: BakorfallViewMrg;
	public static get getInstance(): BakorfallViewMrg {
		if (BakorfallViewMrg._mInstance == undefined)
			BakorfallViewMrg._mInstance = new BakorfallViewMrg();
		return BakorfallViewMrg._mInstance;
	}
	private _topUI: TopUI;
	private _return: egret.Shape;
	private _topContain: egret.DisplayObjectContainer;
	public static decideshow: boolean = false;//是否有打开比分界面
	private iffirst: boolean = true;

	/**筛选 */
	private _screen: egret.Bitmap;
	/**足球 */
	private _g1: egret.TextField;
	/**篮球 */
	private _g2: egret.TextField;
	private _gShape: egret.Shape;

	public static stateIndex: number = 0;//页面状态(0足球 1篮球 )
	public static inIndex = 2;;//页面下标

	private _topStr = ["赛果", "即时", "关注", "赛程"];
	private _topInfo: GHashMap<TopInfo>;
	private _topShape: egret.Shape;//红线
	private yuanquan: egret.Shape;//圆圈
	private guanzText: egret.TextField;//关注个数
	private _mZWSJTip: egret.Bitmap;//暂时没有数据


	public gettopList(): GHashMap<TopInfo> {
		return this._topInfo;
	}

	public constructor() {
		super();
		this.y = GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.visible = false;
		this._topUI.getreturnSprite().visible = false;
		this._return.visible = false;
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);


		this._topContain = new egret.DisplayObjectContainer();
		this.addChild(this._topContain);

		this.setDB()
		this.touchEnabled = true;
		this.addTop();

		this.TopBntsecet();

		this.xianshi();
	}

	/**头顶筛选按钮*/
	private TopBntsecet(): void {
		this._topInfo = new GHashMap<TopInfo>();
		for (let i = 0; i < this._topStr.length; i++) {
			let obj = new TopInfo(this._topStr[i]);
			this._topInfo.Gput(i + 1, obj);
			obj.x = 187.5 * i;
			obj.y = 95;
			obj.setmyID(i + 1);
			obj.touchEnabled = true;
			this.addChild(obj);
		}
		this._topShape = new egret.Shape();
		this.addChild(this._topShape);
		this._topShape.graphics.beginFill(0xf96d67);
		this._topShape.graphics.drawRoundRect(73.5, 155, 48, 4, 8);
		this._topShape.graphics.endFill()

		this.yuanquan = new egret.Shape();//关注圆圈
		this.addChild(this.yuanquan);
		this.yuanquan.graphics.beginFill(0xFCB21A);
		this.yuanquan.graphics.drawCircle(509, 120, 12);
		this.yuanquan.graphics.endFill();

		this.guanzText = ToolMrg.getText(497, 108.5, 16, 0xffffff, 24);
		this.guanzText.text = "";
		this.guanzText.height = 24;
		// this.guanzText.border = true;
		this.guanzText.textAlign = egret.HorizontalAlign.CENTER;
		this.guanzText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.guanzText.fontFamily = "微软雅黑";
		this.addChild(this.guanzText);

	}

	/**红线移动*/
	public redXXTween(): void {
		let movex: number = 187.5;
		if (BakorfallViewMrg.inIndex == 2) movex = 183.5;
		egret.Tween.get(this._topShape).to({ x: movex * (BakorfallViewMrg.inIndex - 1) }, 200, egret.Ease.circOut);
		this.hideSelectBnt();
	}

	private addTop(): void {
		this.addChild(this._topContain);
		this._topContain.y = 16;

		let bjBox = new egret.Bitmap();
		this._topContain.addChild(bjBox);
		RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png", (e) => {
			bjBox.$setBitmapData(e);
			bjBox.x = 256;
			bjBox.y = 0;
		}, this);

		this._screen = new egret.Bitmap();
		this._topContain.addChild(this._screen);
		RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png", (e) => {
			this._screen.$setBitmapData(e);
			this._screen.y = 12;
			this._screen.x = 680;
		}, this);
		this._screen.touchEnabled = true;
		this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			SelectMrg.getInstance.show();
		}, this);

		this._gShape = new egret.Shape();
		this._topContain.addChild(this._gShape);
		this._gShape.graphics.beginFill(0xffffff);
		this._gShape.graphics.drawRoundRect(256, 0, 120, 64, 33);
		this._gShape.graphics.endFill()

		this._g1 = ToolMrg.getText(256, 0, 32, 0xffffff, 120);
		this._g1.height = 64;
		this._topContain.addChild(this._g1);
		this._g1.textAlign = egret.HorizontalAlign.CENTER;
		this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._g1.text = "足球";
		this._g1.touchEnabled = true;

		this._g2 = ToolMrg.getText(256 + 120, 0, 32, 0xffffff, 120);
		this._g2.height = 64;
		this._topContain.addChild(this._g2);
		this._g2.textAlign = egret.HorizontalAlign.CENTER;
		this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._g2.text = "篮球";
		this._g2.touchEnabled = true;

		this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
		this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
	}

	private touchDown(e: egret.TouchEvent): void {
		if (e.target == this._g1) {
			if (BakorfallViewMrg.stateIndex == 0) return;
			BakorfallViewMrg.stateIndex = 0;
		} else if (e.target == this._g2) {
			if (BakorfallViewMrg.stateIndex == 1) return;
			BakorfallViewMrg.stateIndex = 1;
		}
		this.changeTop();
		this.setGUSN();
	}

	private changeTop(): void {
		if (BakorfallViewMrg.stateIndex == 0) {
			this._g1.textColor = 0xF72F52;
			this._g2.textColor = 0xffffff;
			egret.Tween.get(this._gShape).to({ x: 0 }, 200);

			BakorfallViewMrg.inIndex = 2;
			BakorfallData.getInstance.redxdecide();
			BasketViewMrg.getInstance.hide();
			FallViewMrg.getInstance.show();
		} else if (BakorfallViewMrg.stateIndex == 1) {
			this._g1.textColor = 0xffffff;
			this._g2.textColor = 0xF72F52;
			egret.Tween.get(this._gShape).to({ x: 120 }, 200);

			BakorfallViewMrg.inIndex = 2;
			BakorfallData.getInstance.redxdecide();
			FallViewMrg.getInstance.hide();
			BasketViewMrg.getInstance.show();
		}
	}


	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.bgLay.addChild(this);
		}
		this.changeTop();
		this.redXXTween();
		// if (UserData.getInstance.isLogin() == false)
		// 	LoginWnd.getInstance.show();
		this.setGUSN();
		BakorfallViewMrg.decideshow = true;

		if (this.iffirst == true) {
			BakorfallData.getInstance.sendsynchronizationInfo();
			this.iffirst = false;
		}
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		BakorfallViewMrg.stateIndex = 0;
		FallViewMrg.getInstance.hide();
		BasketViewMrg.getInstance.hide();
		BakorfallViewMrg.decideshow = false;
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

	/**设置关注个数*/
	public setGUSN(): void {
		let type: number = BakorfallViewMrg.stateIndex;
		let yuanNum: number = 0;
		if (type == 0) {//足球
			yuanNum = FootballConfinData.getInstance.getlist3().size;
		} else {//篮球
			yuanNum = BasketballConfinData.getInstance.getlist3().size;
		}

		if (this.guanzText == undefined) return;
		this.guanzText.text = "" + yuanNum;
		if (yuanNum == 0) {
			this.yuanquan.visible = false;
			this.guanzText.visible = false;
		} else {
			this.yuanquan.visible = true;
			this.guanzText.visible = true;
		}
	}

	/**刷新篮球或足球对应即时和关注数据*/
	public refreshallInfo() {
		if (BakorfallViewMrg.stateIndex == 0) {//足球
			if (BakorfallViewMrg.inIndex == 2) {//即时
				football1.getInstance.initallInfo();
			} else if (BakorfallViewMrg.inIndex == 3) {//关注
				football4.getInstance.initallInfo();
			}
		} else if (BakorfallViewMrg.stateIndex == 1) {//篮球
			if (BakorfallViewMrg.inIndex == 2) {//即时
				basketball1.getInstance.initallInfo();
			} else if (BakorfallViewMrg.inIndex == 3) {//关注
				basketball4.getInstance.initallInfo();
			}
		}
		this.setGUSN();
	}

	/**刷新关注列表*/
	public refreshlist(): void {
		if (BakorfallViewMrg.stateIndex == 0) {
			football4.getInstance.initallInfo();
		} else if (BakorfallViewMrg.stateIndex == 1) {
			basketball4.getInstance.initallInfo();
		}
		this.setGUSN();
	}

	/**暂时无数据 */
	public xianshi() {
		this._mZWSJTip = new egret.Bitmap();
		RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", (e) => {
			this._mZWSJTip.$setBitmapData(e);
			this._mZWSJTip.x = (GameMain.getInstance.StageWidth - this._mZWSJTip.width) * 0.5;
			this._mZWSJTip.y = (GameMain.getInstance.StageHeight - this._mZWSJTip.height) * 0.5
		}, this);
		this._mZWSJTip.visible = false;
		this.addChild(this._mZWSJTip);
	}

	/**是否有数据 */
	public setDecide(boo: boolean): void {
		if (this._mZWSJTip == undefined) return;
		if (boo == true) {
			egret.Tween.removeTweens(this._mZWSJTip);
			egret.Tween.get(this._mZWSJTip).wait(800).call(() => {
				this._mZWSJTip.visible = true;
			})
		} else {
			egret.Tween.removeTweens(this._mZWSJTip);
			this._mZWSJTip.visible = false;
		}
	}

	/**是否隐藏筛选按钮*/
	public hideSelectBnt(): void {
		if (BakorfallViewMrg.inIndex == 2) {//显示筛选按钮
			this._screen.visible = true;
		} else {
			this._screen.visible = false;
		}
	}
}

class TopInfo extends egret.DisplayObjectContainer {
	private _title: egret.TextField;
	private _titleShape: egret.Shape;
	private myid: number = 0;//自身id
	constructor(str: string) {
		super();
		this.setDB();
		this._title = ToolMrg.getText(0, 0, 28, 0x333333, 187.5);
		this.addChild(this._title);
		this._title.height = 64;
		this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._title.textAlign = egret.HorizontalAlign.CENTER;
		this._title.text = str;

		this.addevent();
	}

	public selectInfo(): void {
		this._title.textColor = 0xF72F52;
	}

	public noselectInfo(): void {
		this._title.textColor = 0x333333;
	}
	/**设置自身id*/
	public setmyID(myid: number): void {
		this.myid = myid;
		if (this.myid == 1 || this.myid == 4) {
			this._title.visible = false;
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, 187.5, 64);
		this._mShareC.graphics.endFill()
		this.addChildAt(this._mShareC, 0);
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		if (this.myid == 1 || this.myid == 4) {
			return;
		}
		BakorfallViewMrg.inIndex = this.myid;
		if (BakorfallViewMrg.stateIndex == 0) {//足球
			BakorfallData.getInstance.redxdecide();
			FallViewMrg.getInstance.show();
		} else {//篮球
			BakorfallData.getInstance.redxdecide();
			BasketViewMrg.getInstance.show();
		}

	}
}