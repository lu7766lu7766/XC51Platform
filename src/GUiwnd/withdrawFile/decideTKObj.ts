/**确认提款按钮和 文字提示 */
class decideTKObj extends egret.DisplayObjectContainer {
	private static _mInstance: decideTKObj;
	public static get getInstance(): decideTKObj {
		if (decideTKObj._mInstance == undefined)
			decideTKObj._mInstance = new decideTKObj();
		return decideTKObj._mInstance;
	}
	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;

	public constructor() {
		super();

		this.y = 592;

		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._mContainQB)
		this._mContainQB.y = 180;
		// this.addScoll(this._mContainQB, this._scroViewQB);

		this.nextBnt = new egret.Bitmap();
		this.nextBnt.x = 20;
		this.nextBnt.y = 38;
		this.addChild(this.nextBnt);
		ToolMrg.setZoom(this.nextBnt);
		this.nextBnt.touchEnabled = true;
		RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.nextText = ToolMrg.getText(0, 73, 32, 0xffffff, 750);
		this.addChild(this.nextText);
		this.nextText.textAlign = egret.HorizontalAlign.CENTER;
		this.nextText.text = "确定提款";
		this.nextText.bold = true;

		// this.xsText1 = ToolMrg.getText(72, 180 - 180, 24, 0xffffff, 610);
		// this._mContainQB.addChild(this.xsText1);//0xF72E52
		// this.xsText1.textFlow = <Array<egret.ITextElement>>[
		// 	{ "text": "1. 中奖金额在", style: { "textColor": 0x333333 } },
		// 	{ "text": "1小时", style: { "textColor": 0xF72E52 } },
		// 	{ "text": "后方可提现;", style: { "textColor": 0x333333 } }
		// ];
		// this.xsText1.bold = true;

		this.xsText2 = ToolMrg.getText(72, 220 - 180 - 30, 24, 0xffffff, 610);
		this._mContainQB.addChild(this.xsText2);
		this.xsText2.textFlow = <Array<egret.ITextElement>>[
			{ "text": "1. 为防止恶意提款、洗钱等不法行为，充值资金必须", style: { "textColor": 0x333333 } },
			{ "text": "\0" + "用于实际消费;", style: { "textColor": 0x333333 } },
		];
		this.xsText2.bold = true;
		this.xsText2.lineSpacing = 10;

		this.xsText3 = ToolMrg.getText(72, 290 - 180 - 30, 24, 0xffffff, 610);
		this._mContainQB.addChild(this.xsText3);
		this.xsText3.textFlow = <Array<egret.ITextElement>>[
			{ "text": "2. 为了保障您的提款能及时到账，需流水一倍以上才可提现，", style: { "textColor": 0x333333 } },
			{ "text": "\0" + "每日提款次数不得超过3次;", style: { "textColor": 0xF72E52 } },
		];
		this.xsText3.bold = true;
		this.xsText3.lineSpacing = 10;

		this.xsText4 = ToolMrg.getText(72, 360 - 180 - 30, 24, 0xffffff, 610);
		this._mContainQB.addChild(this.xsText4);
		this.xsText4.textFlow = <Array<egret.ITextElement>>[
			{ "text": "3. 为了保障您的资金安全，我们将审核您的提款申请后，再汇款至您的银行卡；", style: { "textColor": 0x333333 } },
		];
		this.xsText4.bold = true;
		this.xsText4.lineSpacing = 10;

		this.xsText5 = ToolMrg.getText(72, 430 - 180 - 30, 24, 0xffffff, 610);
		this._mContainQB.addChild(this.xsText5);
		this.xsText5.textFlow = <Array<egret.ITextElement>>[
			{ "text": "4. 如您在提款时遇到问题，请联系在线客服；", style: { "textColor": 0x333333 } },
		];
		this.xsText5.bold = true;
		this.xsText5.lineSpacing = 10;

		this.xsText6 = ToolMrg.getText(72, 470 - 180 - 30, 24, 0xffffff, 610);
		this._mContainQB.addChild(this.xsText6);
		this.xsText6.textFlow = <Array<egret.ITextElement>>[
			{ "text": "5. 网站加奖金额只能用于购彩，不可提现。（加奖金额指 网站额外赠送的购彩金，包括加奖和充值红包等。）", style: { "textColor": 0x333333 } },
		];
		this.xsText6.bold = true;
		this.xsText6.lineSpacing = 10;



		this.setDB();
		this.addevent();
	}

	private nextBnt: egret.Bitmap;//确定按钮
	private nextText: egret.TextField;//确定提款text

	private xsText1: egret.TextField;//文本显示1
	private xsText2: egret.TextField;//文本显示2
	private xsText3: egret.TextField;//文本显示3
	private xsText4: egret.TextField;//文本显示4
	private xsText5: egret.TextField;//文本显示5
	private xsText6: egret.TextField;//文本显示6

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.nextBnt != undefined) {
			this.nextBnt.$setBitmapData(data);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -180, GameMain.getInstance.StageWidth, 1334 - this.y - 100);
		this._mShareC.graphics.endFill();
		this._mContainQB.addChildAt(this._mShareC, 0);
	}

	private addevent() {
		this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}

	public static canTiXian:boolean = true;
	private onclick(): void {
		let xzGLmoney: number = UserData.getInstance.getLSxzmoney();
		let defultmoney: number = UserData.getInstance.getLSDefaultmoney();
		let showText: number = Math.floor(xzGLmoney - defultmoney);
		if (withdrawData.defauleid == 1) {
			if (defultmoney < xzGLmoney) {
				Alertpaner.getInstance.show("需要1倍流水,差额￥" + showText);
				return;
			}
		}
		if (withdrawData.bangtk == "" || withdrawData.bangtk == "0") {
			Alertpaner.getInstance.show("提现余额不足");
		} else {
			if (Number(withdrawData.bangtk) < 100) {
				Alertpaner.getInstance.show("最少提款100元起");
				return;
			}
			let money: number = Number(withdrawData.bangtk) * 100;
			let list = SelectDataMrg.getInstance.getItem();
			let data: SelectData_card = list.Gget(selectBankData.selectID - 1);
			if (data != undefined) {
				if (decideTKObj.canTiXian == false) {
					return;
				}
				decideTKObj.canTiXian = false;
				// egret.Tween.get(this.nextBnt).wait(3000).call(() => {
				// 	decideTKObj.canTiXian = true;
				// })
				withdrawConf.getInstance.sendHttp(money, data.cardNum + "", withdrawData.defauleid);
			}
		}


	}
	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 180;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - this.y - 300;
		scroView.bounces = true;
	}

}