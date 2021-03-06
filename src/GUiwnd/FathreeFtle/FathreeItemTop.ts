/**详情顶部显示对象 */
class FathreeItemTop extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.icon = new egret.Bitmap();
		this.icon.x = 28;
		this.icon.y = 24;
		this.icon.width = 32;
		this.icon.height = 32;
		this.icon.touchEnabled = true;
		this.addChild(this.icon);
		RES.getResByUrl("resource/assets/images/ui/paithreeIcon.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.tatleText = ToolMrg.getText(68, 24, 28, 0x333333);
		this.tatleText.text = "排列三";
		// this.tatleText.fontFamily = "微软雅黑";
		// this.tatleText.bold = true;
		this.addChild(this.tatleText);

		this.qsText = ToolMrg.getText(172, 26, 24, 0x333333, 150);
		this.qsText.text = "1997001期";
		// this.qsText.fontFamily = "微软雅黑";
		// this.qsText.bold = true;
		this.addChild(this.qsText);

		this.defaultText = ToolMrg.getText(650, 24, 24, 0xE72E52, 100);
		this.defaultText.text = "已中奖";
		// this.defaultText.fontFamily = "微软雅黑";
		// this.defaultText.bold = true;
		this.addChild(this.defaultText);

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xDEDEDE);
		link.graphics.drawRect(28, 84, 694, 2);
		link.graphics.endFill();


		let tzaware: egret.TextField = ToolMrg.getText(88, 146, 28, 0x333333, 152);
		tzaware.text = "投注金额";
		this.addChild(tzaware);

		this.tzawareNum = ToolMrg.getText(64, 104, 28, 0x333333, 152);
		this.tzawareNum.text = "￥30";
		this.tzawareNum.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.tzawareNum);

		let tzaware1: egret.TextField = ToolMrg.getText(352, 146, 28, 0x333333, 96);
		tzaware1.text = "倍数";
		this.addChild(tzaware1);

		this.doubleNum = ToolMrg.getText(328, 104, 28, 0x333333, 96);
		this.doubleNum.text = "10";
		this.doubleNum.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.doubleNum);

		let tzaware2: egret.TextField = ToolMrg.getText(552, 146, 28, 0x333333, 152);
		tzaware2.text = "中奖金额";
		this.addChild(tzaware2);

		this.awareNum = ToolMrg.getText(528, 104, 28, 0xE82C2B, 152);
		this.awareNum.text = "¥000";
		this.awareNum.textAlign = egret.HorizontalAlign.CENTER;
		this.addChild(this.awareNum);

		this.ddhaoText = ToolMrg.getText(28, 220, 28, 0xE82C2B);
		this.ddhaoText.textFlow = <Array<egret.ITextElement>>[
			{ "text": "订单号: ", style: { "textColor": 0x333333, size: 20 } },
			{ "text": "29929189192912", style: { "textColor": 0x999999, size: 20 } }
		];
		this.addChild(this.ddhaoText);

		this.redbg = new egret.Bitmap();
		this.redbg.x = 284;
		this.redbg.y = 218;
		this.redbg.width = 52;
		this.redbg.height = 26;
		this.addChild(this.redbg);
		RES.getResByUrl("resource/assets/images/ui/fzhiBnt.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
		this.redbg.touchEnabled = true;

		this.rqday = ToolMrg.getText(576 - 90, 220, 20, 0x999999);
		this.rqday.text = "19-02-06 15:24";
		this.rqday.width = 250;
		this.rqday.textAlign = egret.HorizontalAlign.RIGHT;
		this.addChild(this.rqday);

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 266, 750, 10);
		link1.graphics.endFill();

		this.addevent();

		this.setDB();
	}

	private icon: egret.Bitmap;//图标
	private tatleText: egret.TextField;//标题
	private qsText: egret.TextField;//期数
	private defaultText: egret.TextField;//中奖状态
	private tzawareNum: egret.TextField;//投注金额数量
	private doubleNum: egret.TextField;//倍数
	private awareNum: egret.TextField;//中奖金额数量
	private ddhaoText: egret.TextField;//订单号
	private redbg: egret.Bitmap;//复制bg
	private rqday: egret.TextField;//日期


	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.icon != undefined) {
			this.icon.$setBitmapData(data);
		}
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this.redbg != undefined) {
			this.redbg.$setBitmapData(data);
		}
	}

	/**设置标题 期数 和中奖状态*/
	public setdefaultTatle(tatle: string, qs: number, status: number, dataT: MyLotteryData): void {
		this.tatleText.text = tatle;
		this.qsText.text = qs + "期";
		if (status == 1) {
			this.defaultText.text = "待开奖";
			if (dataT.threeOrFive.tzList != undefined && dataT.threeOrFive.tzList.length > 0) {
				this.defaultText.text = "待结算";
				this.awareNum.text ="---";
			} else {
				this.defaultText.text = "待开奖";
			}
		} else if (status == 2) {
			this.defaultText.text = "未中奖";
		} else if (status == 3) {
			this.defaultText.text = "已中奖";
		}
	}

	/**设置投注金额 倍数 中奖金额 */
	public settzgold(num1: number, num2: number, num3: number) {
		this.tzawareNum.text = "￥" + num1;
		this.doubleNum.text = "" + num2;
		this.awareNum.text = "¥" + num3;
	}

	private ddstr: string = "";
	/**设置订单号和日期*/
	public setddNum(dd: string, timer: number): void {
		this.ddhaoText.textFlow = <Array<egret.ITextElement>>[
			{ "text": "订单号: ", style: { "textColor": 0x333333, size: 20 } },
			{ "text": "" + dd, style: { "textColor": 0x999999, size: 20 } }
		];
		this.rqday.text = ToolMrg.getTime2(timer);
		this.redbg.x = this.ddhaoText.x + this.ddhaoText.width + 12;
	}

	/**设置图标*/
	public setIcon(type: number): void {
		if (type == 3) {
			RES.getResByUrl("resource/assets/images/ui/paithreeIcon.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
		} else if (type == 4) {
			RES.getResByUrl("resource/assets/images/ui/pl5_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 276);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	private addevent(): void {
		this.redbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		//生成可复制input
		var input = document.createElement("input");
		//需复制内容
		input.value = this.ddhaoText.text;
		document.body.appendChild(input);
		input.select();
		input.setSelectionRange(0, input.value.length),
			document.execCommand('Copy');
		document.body.removeChild(input);

		Alertpaner.getInstance.show("复制成功");
	}
}