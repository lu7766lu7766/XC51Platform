/**下方确定按钮类 */
class LowSelectBnt extends egret.DisplayObjectContainer {
	private static _mInstance: LowSelectBnt;
	public static get getInstance(): LowSelectBnt {
		if (LowSelectBnt._mInstance == undefined)
			LowSelectBnt._mInstance = new LowSelectBnt();
		return LowSelectBnt._mInstance;
	}
	public constructor() {
		super();
		this.touchEnabled = true;
		this.allselectBg = new egret.Bitmap();
		this.allselectBg.x = 28;
		this.allselectBg.y = 18;
		this.allselectBg.width = 210;
		this.allselectBg.height = 64;
		this.addChild(this.allselectBg);
		ToolMrg.setZoom(this.allselectBg);
		RES.getResByUrl("resource/assets/images/ui/qiehuan_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);

		this.allText = ToolMrg.getText(28, 0, 28, 0xF72E52, 105);
		this.allText.text = "全选";
		this.allText.fontFamily = "微软雅黑";
		this.allText.height = 100;
		this.allText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.allText.textAlign = egret.HorizontalAlign.CENTER;
		this.allText.bold = true;
		this.allText.touchEnabled = true;
		this.addChild(this.allText);

		this.fanSelect = ToolMrg.getText(134, 0, 28, 0x333333, 105);
		this.fanSelect.text = "反选";
		this.fanSelect.fontFamily = "微软雅黑";
		this.fanSelect.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.fanSelect.textAlign = egret.HorizontalAlign.CENTER;
		this.fanSelect.height = 100;
		this.fanSelect.bold = true;
		this.fanSelect.touchEnabled = true;
		this.addChild(this.fanSelect);

		this.hideText = ToolMrg.getText(0, 0, 24, 0x999999, 750);
		this.hideText.text = "隐藏了多少场比赛";
		this.hideText.fontFamily = "微软雅黑";
		this.hideText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.hideText.textAlign = egret.HorizontalAlign.CENTER;
		this.hideText.height = 100;
		this.hideText.bold = true;
		this.addChild(this.hideText);

		this.decideBnt = new egret.Bitmap();
		this.decideBnt.x = 564;
		this.decideBnt.y = 18;
		this.decideBnt.width = 160;
		this.decideBnt.height = 72;
		this.addChild(this.decideBnt);
		RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
		this.decideBnt.touchEnabled = true;

		this.decideText = ToolMrg.getText(this.decideBnt.x, 0, 32, 0xFFFFFF, 160);
		this.decideText.text = "确定";
		this.decideText.fontFamily = "微软雅黑";
		this.decideText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.decideText.textAlign = egret.HorizontalAlign.CENTER;
		this.decideText.height = 100;
		this.decideText.bold = true;
		this.addChild(this.decideText);

		this.setDB();

		this.addevent();
	}

	private allselectBg: egret.Bitmap;//全选和反选背景
	private allText: egret.TextField;//全选text
	private fanSelect: egret.TextField;//反选text
	private hideText: egret.TextField;//隐藏了多少场比赛
	private decideBnt: egret.Bitmap;//确定按钮
	private decideText: egret.TextField;//确定text
	public static selectID: number = 1;//1 全选 2反选

	private bgBack3(data: any, url: string): void {
		if (data != undefined && this.allselectBg != undefined) {
			this.allselectBg.$setBitmapData(data);
		}
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this.decideBnt != undefined) {
			this.decideBnt.$setBitmapData(data);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	public show(): void {
		if (this.parent == undefined) {
			SelectMrg.getInstance.addChild(this);
		}
		LowSelectBnt.selectID = 1;
		this.setselect();
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	private addevent(): void {
		this.allText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.fanSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		this.decideBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(e: egret.TouchEvent): void {
		let target = e.target;
		if (target == this.allText) {//全选
			LowSelectBnt.selectID = 1;
		} else if (target == this.fanSelect) {//反选
			LowSelectBnt.selectID = 2;
		} else if (target == this.decideBnt) {//确定按钮
			let type = BakorfallViewMrg.stateIndex;
			let listll: string[] = selectFileData.getInstance.setList();
			if (listll.length <= 0) return;
			if (type == 0) {//足球
				if (listll.length > 0) {
					FootballConfinData.getInstance.selectafterList(listll);
					football1.getInstance.show(FootballConfinData.getInstance.getselectlist());
					BakorfallViewMrg.inIndex = 2;
					BakorfallData.getInstance.redxdecide();
					SelectMrg.getInstance.hide();
					this.hide();
				}
			} else {//篮球
				if (listll.length > 0) {
					BasketballConfinData.getInstance.selectafterList(listll);
					basketball1.getInstance.show(BasketballConfinData.getInstance.getselectlist());
					BakorfallViewMrg.inIndex = 2;
					BakorfallData.getInstance.redxdecide();
					SelectMrg.getInstance.hide();
					this.hide();
				}
			}

		}
		this.setselect();
		this.setHideBS(selectFileData.getInstance.gethideNum());
	}

	/**设置全选或反选(全选 2反选)*/
	public setselect(): void {
		let type = LowSelectBnt.selectID;
		if (type == 1) {
			this.allselectBg.scaleX = 1;
			this.allText.textColor = 0xF72E52;
			this.fanSelect.textColor = 0x333333;
		} else if (type == 2) {
			this.allselectBg.scaleX = -1;
			this.allText.textColor = 0x333333;
			this.fanSelect.textColor = 0xF72E52;
		}
		selectFileData.getInstance.selectall(type);
	}

	/**初始设全选*/
	public initSelect(): void {
		let type = LowSelectBnt.selectID = 1;
		if (type == 1) {
			this.allselectBg.scaleX = 1;
			this.allText.textColor = 0xF72E52;
			this.fanSelect.textColor = 0x333333;
		} else if (type == 2) {
			this.allselectBg.scaleX = -1;
			this.allText.textColor = 0x333333;
			this.fanSelect.textColor = 0xF72E52;
		}
	}

	/**设置隐藏了多少场比赛*/
	public setHideBS(num: number) {
		if (this.hideText == undefined) return;
		this.hideText.text = "隐藏了" + num + "场比赛"
		let decide: boolean = selectFileData.getInstance.ifholdss();
		if (this.decideBnt != undefined) {
			if (decide == true) {
				this.decideBnt.alpha = 1;
			} else {
				this.decideBnt.alpha = 0.2;
			}
		}
	}

	/**设置确定按钮状态*/
	public setdecideBnt(): void {
		let decide: boolean = selectFileData.getInstance.ifholdss();
		if (this.decideBnt != undefined) {
			if (decide == true) {
				this.decideBnt.alpha = 1;
			} else {
				this.decideBnt.alpha = 0.2;
			}
		}
	}
}