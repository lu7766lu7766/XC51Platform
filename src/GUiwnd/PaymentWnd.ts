/**
 * 支付界面
 */
class PaymentWnd extends egret.DisplayObjectContainer {
	private static _mInstance: PaymentWnd;
	public static get getInstance(): PaymentWnd {
		if (PaymentWnd._mInstance == undefined)
			PaymentWnd._mInstance = new PaymentWnd();
		return PaymentWnd._mInstance;
	}

	private _topUI: TopUI;
	private _return: egret.Shape;

	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;

	/**列表 */
	private _mList: GHashMap<HistoryAwardsData>;

	/**背景 */
	private _mBg: egret.Shape;
	/**标题 */
	private _mTitle: egret.TextField;
	/**下注信息 */
	private _mXZDesc: egret.TextField;
	/**下注总金额 */
	// private _xzAllGold: egret.TextField;
	/**可使用抵扣 */
	private _mCanDK: egret.TextField;
	/**我已满18周岁并同意《彩票代购协议》 */
	// private _mTip: egret.TextField;

	/**期号信息 */
	private _mQH: egret.TextField;
	/**icon */
	private _mIcon: egret.Bitmap;
	// private _mGou: egret.Bitmap;
	// private _LsrcItem3 = ["实际支付: "];
	private _mTiao1: TiaoBoj1;

	// private _LsrcItem4 = ["余额: ", "奖金: ", "红包: "];
	private _LsrcItem4 = [""];
	private _mListTiao1: GHashMap<TiaoBoj2>;

	/**确定支付按钮背景 */
	private _mBuyBG: egret.Bitmap;
	/**确认支付 */
	private _mQRZF: egret.TextField;

	/**用户选中 */
	private _mYHXZ: number[] = [];
	private _mAllPay: number = 0;

	public static canPay: boolean = true;
	constructor() {
		super();
		this.y = 96 + GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		// this._mContainQB = new egret.DisplayObjectContainer();
		// this._scroViewQB = new egret.ScrollView();
		// this.addChild(this._scroViewQB)
		// this.addScoll(this._mContainQB,this._scroViewQB);

		this.setDB()
		this.touchEnabled = true;

		this._mList = new GHashMap<HistoryAwardsData>();
		this._mListTiao1 = new GHashMap<TiaoBoj2>();

		this._mBg = new egret.Shape();
		this.addChild(this._mBg);
		this._mBg.graphics.beginFill(0xffffff);
		this._mBg.graphics.drawRect(0, 136 - 40 - 96, GameMain.getInstance.StageWidth, 178);
		this._mBg.graphics.endFill();

		// this._mGou = new egret.Bitmap();
		// this.addChild(this._mGou);
		this._mIcon = new egret.Bitmap();
		this.addChild(this._mIcon);
		this._mBuyBG = new egret.Bitmap();
		this._mBuyBG.touchEnabled = true;
		this.addChild(this._mBuyBG);

		// RES.getResByUrl("resource/assets/images/ui/select2_home@2x.png", (e) => {
		// 	this._mGou.$setBitmapData(e);
		// 	this._mGou.x = 32;
		// 	this._mGou.y = 1002 - 40 - 96;
		// }, this);
		RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", (e) => {
			this._mBuyBG.$setBitmapData(e);
			this._mBuyBG.x = 20;
			this._mBuyBG.y = 1064 - 40 - 96;
		}, this);
		// if (this._mTip == undefined)
		// 	this._mTip = ToolMrg.getText(62, 1002 - 40 - 96, 24, 0x333333, 500);
		// this._mTip.textFlow = <Array<egret.ITextElement>>[
		// 	{ text: "我已满18周岁并同意", style: { "textColor": 0x333333 } },
		// 	{ text: "《彩票代购协议》", style: { "textColor": 0xff0000 } }
		// ];
		// this.addChild(this._mTip);
		if (this._mQRZF == undefined)
			this._mQRZF = ToolMrg.getText(304, 1094 - 40 - 96, 36, 0xFFFFFF, 184);
		this._mQRZF.text = "确认支付";
		this.addChild(this._mQRZF);
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 0;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = 1334;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	private touchDown(e: egret.TouchEvent): void {
		if (e.target == this._mBuyBG) {
			if (PaymentWnd.canPay == false) {
				Alertpaner.getInstance.show("正在下单中...");
				return;
			}
			let num: number = Math.round(100 * (this._mData.xzM - this._mAllPay));
			if (num > 0) {
				// Alertpaner.getInstance.show("余额不足");
				TipWindow.getInstance.show("当前余额不足,请前往充值", 1);
				return;
			}
			PaymentWnd.canPay = false;
			// egret.Tween.get(this._mBuyBG).wait(3000).call(() => {
			// 	PaymentWnd.canPay = true;
			// })
			this._mData.mStr = "";
			for (let i = 0; i < this._mYHXZ.length; i++) {
				if (this._mYHXZ[i] != undefined) {
					this._mData.mStr += this._mYHXZ[i]
					if (i < this._mYHXZ.length - 1) {
						this._mData.mStr += ",";
					}
				}
			}
			// this._mData.mStr=this._mData.mStr.substring(0,this._mData.mStr.lastIndexOf(','));
			this._mData.backFun.call(this._mData.thisObj);
		} else if (e.target instanceof TiaoBoj2) {
			let obj: TiaoBoj2 = e.target;
			this.changeType(obj.id);
		}
	}

	/**条选中切换 */
	private changeType(index: number): void {
		this._mAllPay = 0;
		if (this._mYHXZ[index] == undefined) {
			let nowMoney: number = this.getMoneyById(index);
			if (nowMoney >= this._mData.xzM) {
				this._mYHXZ.length = 0;
				this._mYHXZ[index] = index;
			} else {
				let money: number = 0;
				for (let i = 0; i < this._mYHXZ.length; i++) {
					money += this.getMoneyById(this._mYHXZ[i]);
				}
				if (this.getMoneyById(index) == 0) {
					return;
				} else {
					if (money >= this._mData.xzM) {
						this._mYHXZ.length = 0;
					}
					this._mYHXZ[index] = index;
				}
			}
		} else {
			if(this.getMoneyById(index) >= this._mData.xzM) {
				return;
			}
			this._mYHXZ[index] = undefined;
		}

		let obj111: TiaoBoj2;
		for (let key of this._mListTiao1.keys) {
			obj111 = this._mListTiao1.Gget(key);
			if (this._mYHXZ[obj111.id] != undefined) {
				let money: number = this.xhMoney(obj111.id)
				this._mAllPay += money
				// obj111.select(true, this.getMoneyById(obj111.id) - money);
				obj111.select(true, money);
			} else {
				obj111.select(false, 0);
			}
		}

		this.freshPay();
	}

	/**通过下标算出消耗多少钱 */
	private xhMoney(index: number): number {
		let yxh: number = 0;
		for (let i = 0; i < 3; i++) {
			if (this._mYHXZ[i] != undefined) {
				if (this._mYHXZ[index] != undefined && i == index) {
					let now: number = this.getMoneyById(i);
					if (now >= this._mData.xzM - yxh) {
						return this._mData.xzM - yxh;
					} else if (now < this._mData.xzM - yxh) {
						return now;
					}
				}
				yxh += this.getMoneyById(this._mYHXZ[i]);
			}
		}

		return 0;
	}

	/**通过下标获取金额 */
	private getMoneyById(index): number {
		if (index == 0) {
			return UserData.getInstance.getGold();
		} else if (index == 1) {
			return UserData.getInstance.getBonus();
		} else if (index == 2) {
			return UserData.getInstance.getDJQGold();
		}
		return 0;
	}

	private _mData: PaymentData;
	public show(data: PaymentData): void {
		if (data == undefined) {
			return;
		}
		PaymentWnd.canPay = true;
		if (this._mTiao1 == undefined) {
			this._mTiao1 = TiaoBoj1.getObj();
			this._mTiao1.init("实际支付: ");
			// this._mTiao1.y = 856 - 40 - 96;
			this._mTiao1.y = 414 - 40 - 96 + 140;
		}
		this.addChild(this._mTiao1);

		this._mData = data;
		this._mData.mStr = "";
		this._topUI.changeTitle(this._mData.title);
		RES.getResByUrl("resource/assets/images/ui/" + this._mData.iconUrl, (e) => {
			this._mIcon.$setBitmapData(e);
			this._mIcon.width = 96;
			this._mIcon.height = 96;
			this._mIcon.x = 28;
			this._mIcon.y = 178 - 40 - 96;
		}, this);

		if (this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(144, 213 - 40 - 96, 32, 0x333333, 200);
		this._mTitle.text = this._mData.typeDesc;
		this.addChild(this._mTitle);
		if (this._mXZDesc == undefined)
			this._mXZDesc = ToolMrg.getText(144, 234 - 40 - 96, 28, 0x999999, 200);
		// this._mXZDesc.text = this._mData.tz +"注 "+this._mData.bs+"倍 共￥"+this._mData.xzM;
		this.addChild(this._mXZDesc);
		if (this._mCanDK == undefined)
			this._mCanDK = ToolMrg.getText(26, 360 - 40 - 96, 28, 0x333333, 200);
		this._mCanDK.text = "可用余额:";
		this.addChild(this._mCanDK);

		// if (this._xzAllGold == undefined)
		// 	this._xzAllGold = ToolMrg.getText(520, 213 - 40 - 92, 28, 0x333333, 200);
		// this._xzAllGold.textFlow = <Array<egret.ITextElement>>[
		// 	{ "text": "", style: { "textColor": 0xF72F53, size: 28 } },
		// 	{ "text": "元", style: { "textColor": 0x999999, size: 26 } }
		// ];
		// this._xzAllGold.textAlign = egret.HorizontalAlign.RIGHT;
		// this.addChild(this._xzAllGold);


		if (this._mQH == undefined)
			this._mQH = ToolMrg.getText(250, 213 - 40 - 92, 26, 0x999999, 300);
		this._mQH.textAlign = egret.HorizontalAlign.LEFT;
		if (this._mData.qs > 0) {
			this._mQH.text = "期号: 第" + this._mData.qs + "期";
		} else {
			this._mQH.text = "";
		}

		this.addChild(this._mQH);

		let obj111: TiaoBoj2;
		for (let i = 0; i < this._LsrcItem4.length; i++) {
			if (this._mListTiao1.GhasKey(i)) {
				obj111 = this._mListTiao1.Gget(i);
			} else {
				obj111 = TiaoBoj2.getObj();
				this._mListTiao1.Gput(i, obj111);
			}
			obj111.init(this._LsrcItem4[i], i, this.getMoneyById(i));
			obj111.y = 414 - 40 - 96 + 140 * i;
			this.addChild(obj111);
			// obj111.touchEnabled = true;
			// obj111.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
		}
		this.changeType(0);
		this.freshPay();
		this._mBuyBG.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this.setAllGold();
		GUIManager.getInstance.tipLay.addChild(this);
	}

	/**刷新实质支付 */
	private freshPay(): void {
		// let num: number = Math.round(100 * (this._mData.xzM - this._mAllPay));
		let num: number = Math.round(100 * (this._mData.xzM));
		num = num < 0 ? 0 : num;
		num = num / 100;
		this._mTiao1.freshData(num);
	}

	public hide(): void {
		this._mBuyBG.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
		this._mYHXZ.length = 0;
		this._mAllPay = 0;
		let obj111: TiaoBoj2;
		for (let key of this._mListTiao1.keys) {
			obj111 = this._mListTiao1.Gget(key);
			obj111.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
		}

		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	/**设置下注总金额 */
	public setAllGold(): void {
		if (this._mData != undefined) {
			// this._xzAllGold.textFlow = <Array<egret.ITextElement>>[
			// 	{ "text":this._mData.xzM+" ", style: { "textColor": 0xF72F53, size: 28 } },
			// 	{ "text": "元", style: { "textColor": 0x999999, size: 28 } }
			// ];
		}
	}


}

/**支付数据类 */
class PaymentData {
	/**足球支付类型 */
	public static zqType: number = 1;
	/**篮球支付类型 */
	public static lqType: number = 2;
	/**组3支付类型 */
	public static z3Type: number = 3;
	/**组5支付类型 */
	public static z5Type: number = 4;

	/**类型 */
	public type: number;
	/**标题 */
	public title: string;
	/**类型描述 */
	public typeDesc: string;
	/**icon名 */
	public iconUrl: string;
	// /**投注 */
	// public tz:number;
	// /**倍数 */
	// public bs:number;
	/**下注金额 */
	public xzM: number;
	/**期数 */
	public qs: number;
	/**下单类型 */
	public mStr: string = "";

	thisObj: any;
	backFun: Function;
}

/**一条对象 */
class TiaoBoj1 extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): TiaoBoj1 {
		let obj = GObjPool.getInstance.GgetObj(TiaoBoj1);
		if (obj == null)
			obj = new TiaoBoj1();
		return obj;
	}

	/**标题 */
	private _mTitle: egret.TextField;
	/**钱 */
	private _mJQ: egret.TextField;

	private constructor() {
		super();
		this.touchEnabled = true;
		let link2 = new egret.Shape();
		link2.graphics.beginFill(0xffffff);
		link2.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
		link2.graphics.endFill();
		this.addChild(link2);
	}

	public init(str: string): void {
		if (this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(26, 38, 28, 0x333333, 200);
		this._mTitle.text = str;
		this.addChild(this._mTitle);

		if (this._mJQ == undefined)
			this._mJQ = ToolMrg.getText(526, 40, 24, 0xF72E52, 200);
		this._mJQ.textAlign = egret.HorizontalAlign.RIGHT;
		this.addChild(this._mJQ);

	}

	/**刷新金额 */
	public freshData(m: number): void {
		if (m > 0) {
			this._mJQ.textColor = 0xF72E52;
		} else {
			this._mJQ.textColor = 0x333333;
		}
		this._mJQ.text = "￥" + m + "元";
	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._mTitle.text = "";
		this._mJQ.text = "";
	}
}

/**一条对象 */
class TiaoBoj2 extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): TiaoBoj2 {
		let obj = GObjPool.getInstance.GgetObj(TiaoBoj2);
		if (obj == null)
			obj = new TiaoBoj2();
		return obj;
	}

	/**余额 */
	private _mYEText: egret.TextField;
	/**剩余 */
	private _mShengYText: egret.TextField;
	/**勾 */
	private _mGou: egret.Bitmap;

	public id: number = 0;

	private constructor() {
		super();
		this.touchEnabled = true;
		let link2 = new egret.Shape();
		link2.graphics.beginFill(0xffffff);
		link2.graphics.drawRect(28, 0, 696, 120);
		link2.graphics.endFill();
		this.addChild(link2);

		this._mGou = new egret.Bitmap();
		this._mGou.x = 644;
		this._mGou.y = 40;
		this.addChild(this._mGou);

		if (this._mShengYText == undefined)
			this._mShengYText = ToolMrg.getText(68, 76, 24, 0xF72E52, 300);
		// this._mShengYText.text = "剩余可用100元";
		// this.addChild(this._mShengYText);
	}

	public init(ye: string, id: number, mn: number): void {
		this.id = id;
		if (this._mYEText == undefined)
			this._mYEText = ToolMrg.getText(68, 43, 28, 0x333333, 300);
		this._mYEText.text = ye + (mn) + "元";
		this.addChild(this._mYEText);

		this.select(false, 0);
	}

	/**是否选中 */
	public select(isSelec: boolean, mn: number): void {
		if (isSelec == true) {
			// this._mShengYText.text = "剩余可用" + mn + "元";
			this._mShengYText.text = "可抵扣" + mn + "元";
			this._mGou.$setBitmapData(GResCache.getRes("resource/assets/images/ui/select_home@2x.png"));
			// RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{
			// 	this._mGou.$setBitmapData(e);
			// 	this._mGou.x = 644;
			// 	this._mGou.y = 40;
			// },this);
		} else {
			this._mShengYText.text = "";
			this._mGou.$setBitmapData(GResCache.getRes("resource/assets/images/ui/select_nor_home@2x.png"));
			// RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{
			// 	this._mGou.$setBitmapData(e);
			// },this);
		}
	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._mYEText.text = "";
		this._mShengYText.text = "";
	}
}
