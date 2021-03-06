/**发单或跟单投注信息(底部信息) */
class TwofaView extends egret.DisplayObjectContainer {
	private static _mInstance: TwofaView;
	public static get getInstance(): TwofaView {
		if (TwofaView._mInstance == undefined)
			TwofaView._mInstance = new TwofaView();
		return TwofaView._mInstance;
	}
	private connetop: egret.DisplayObjectContainer;
	private mtext7Img: egret.Bitmap;//场数红bg
	private mtext8Img: egret.Bitmap;//串黄bg
	private mtextNum1: egret.TextField;//过关方式（几串几）
	private yjaware2: egret.TextField;//预测开奖金额
	/**查看奖金方案 */
	private _checkBtn: egret.Bitmap;
	public constructor() {
		super();
		this.touchEnabled = true;
		this.connetop = new egret.DisplayObjectContainer();
		this.addChild(this.connetop);

		let link2 = new egret.Bitmap();
		this.connetop.addChild(link2);
		link2.x = 0;
		link2.y = 0;
		link2.height = 10;
		link2.width = 750;
		RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { link2.$setBitmapData(e); }, this);

		let mtext7 = ToolMrg.getText(28, 32, 24, 0x333333);
		this.connetop.addChild(mtext7);
		mtext7.text = "投注信息:";

		let mtext9 = ToolMrg.getText(28, 116 - 50, 24, 0x333333);
		this.connetop.addChild(mtext9);
		mtext9.height = 50;
		mtext9.verticalAlign = egret.VerticalAlign.MIDDLE;
		mtext9.text = "预测奖金:";

		this.yjaware2 = ToolMrg.getText(mtext9.x + mtext9.width + 10, mtext9.y, 20, 0x999999);
		this.connetop.addChild(this.yjaware2);
		this.yjaware2.height = mtext9.height;
		this.yjaware2.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.yjaware2.text = "1000元";


		this.mtext7Img = new egret.Bitmap();
		this.connetop.addChild(this.mtext7Img);
		this.mtext7Img.x = 152;
		this.mtext7Img.y = 33;
		this.mtext7Img.width = 72;
		this.mtext7Img.height = 24;
		RES.getResByUrl("resource/assets/images/ui/fshi_mine@2x.png", (e) => {
			this.mtext7Img.$setBitmapData(e);
		}, this);

		let link = new egret.Shape();
		this.connetop.addChild(link);
		link.graphics.beginFill(0xdedede);
		link.graphics.drawRect(0,130,GameMain.getInstance.StageWidth,1.5);
		link.graphics.endFill();

		let text = ToolMrg.getText(28,27+130,22,0x999999);
		this.connetop.addChild(text);
		text.lineSpacing = 8;
		text.text="注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅\n供参考，实际奖金以投注成功为准。";

		this.mtextNum1 = ToolMrg.getText(this.mtext7Img.x, this.mtext7Img.y, 20, 0xFF7000);
		this.connetop.addChild(this.mtextNum1);
		this.mtextNum1.height = this.mtext7Img.height;
		this.mtextNum1.width = this.mtext7Img.width;
		this.mtextNum1.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.mtextNum1.textAlign = egret.HorizontalAlign.CENTER;
		this.mtextNum1.text = "3场";

		this._checkBtn = new egret.Bitmap();
		this.connetop.addChild(this._checkBtn);
		this._checkBtn.touchEnabled = true;
		RES.getResByUrl("resource/assets/images/ui/checkDetail.png", (e) => {
			this._checkBtn.$setBitmapData(e);
			this._checkBtn.x = 584;
			this._checkBtn.y = 33;
		}, this);

		this.setDB();
	}

	private _data: MyLotteryData;
	public show(present: egret.DisplayObjectContainer, data: MyLotteryData, pointy: number): void {
		this.y = pointy;
		this._data = data;
		if (this.parent == undefined) {
			present.addChild(this);
		}
		if (data != undefined) {
			if (data.lotteryType == 1) {//跟单
				Topcc.getInstance.hide();
				this.connetop.y = 0;
			} else if (data.lotteryType==2) {//发单
				Topcc.getInstance.show(this);
				this.connetop.y = 80;
			}
			Topcc.getInstance.setzhi(data.numGD + "", data.gtMoney + "");
		}

		this.setaware();
		this.addEvent();
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		Topcc.getInstance.hide();
		this.removeEvent();
	}

	private addEvent(): void {
		this._checkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
	}

	private removeEvent():void{
		this._checkBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
	}

	private touchDown(e: egret.TouchEvent): void {

		if (e.target == this._checkBtn) {//前往奖金方案
			RewardPhp.getInstance.sendHttp(this._data.id, this._data.type);
		}
	}



	/**设置预测金额*/
	public setaware() {
		let priceList: number[] = this._data.yePriceList;
		if (priceList != undefined) {
			if (priceList.length <= 0) {
				this.yjaware2.text = "";
			} else {
				this.yjaware2.text = `${ToolMrg.getDecimal(priceList[0] / 100, 2)}~${ToolMrg.getDecimal(priceList[1] / 100, 2)}元(以实际结果为准)`;
			}
			this.setPass(this._data.passList);
		}
	}

	/**设置过关方式*/
	public setPass(str: string): void {
		let strN: string = "";
		let one: string[] = [];
		one = str.split(",");

		if (one.length > 1) {
			for (let i = 0; i < one.length; i++) {
				strN += this.getStr(Number(one[i])) + " ";
			}
		} else {
			strN += this.getStr(Number(one[0])) + "";
		}

		this.mtextNum1.text = strN;
	}

	public getStr(type: number): string {
		if (type == 1) {
			return "单关";
		} else {
			return type + "串1";
		}
	}


	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 292 - 50);
		this._mShareC.graphics.endFill();
		this.connetop.addChildAt(this._mShareC, 0);
	}

}

class Topcc extends egret.DisplayObjectContainer {
	private static _mInstance: Topcc;
	public static get getInstance(): Topcc {
		if (Topcc._mInstance == undefined)
			Topcc._mInstance = new Topcc();
		return Topcc._mInstance;
	}
	public constructor() {
		super();
		this.touchEnabled = true;
		let link1 = new egret.Bitmap();
		this.addChild(link1);
		link1.x = 0;
		link1.y = 0;
		link1.height = 2;
		link1.width = 750;
		RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { link1.$setBitmapData(e); }, this);

		this.gedNum = ToolMrg.getText(26, 0, 24, 0x999999);
		this.addChild(this.gedNum);
		// this.gedNum.width = 750;
		this.gedNum.height = 80;
		// this.gedNum.textAlign = egret.HorizontalAlign.CENTER;
		this.gedNum.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.gedNum.text = "跟单1500人";

		this.gedgoldnum = ToolMrg.getText(750 - 300 - 24, 0, 24, 0x999999);
		this.addChild(this.gedgoldnum);
		this.gedgoldnum.width = 300;
		this.gedgoldnum.height = 80;
		this.gedgoldnum.textAlign = egret.HorizontalAlign.RIGHT;
		this.gedgoldnum.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.gedgoldnum.text = "跟头9000元";
		this.setDB();
	}

	private gedNum: egret.TextField;//跟单人数
	private gedgoldnum: egret.TextField;//跟单金额

	/**设置跟单人数和跟单金额*/
	public setzhi(one: string, two: string): void {
		this.gedNum.text = "跟单" + one + "人";
		this.gedgoldnum.text = "跟投" + two + "元";
	}


	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	public show(present: egret.DisplayObjectContainer): void {
		if (this.parent == undefined) {
			present.addChild(this);
		}
	}
	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}
}