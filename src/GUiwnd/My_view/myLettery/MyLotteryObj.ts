class MyLotteryObj extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): MyLotteryObj {
		let obj = GObjPool.getInstance.GgetObj(MyLotteryObj);
		if (obj == null)
			obj = new MyLotteryObj();
		return obj;
	}
	/**背景 */
	private _mBg: egret.Shape;
	/**icon图标 */
	private _mIconBit: egret.Bitmap;
	/**标题 */
	private _mTitle: egret.TextField;
	/**下注金额 */
	private _mXZMoney: egret.TextField;
	/**中奖情况 */
	private _mZJ: egret.TextField;
	/**下注id情况 */
	private _mID: egret.TextField;
	/**时间 */
	private _mTime: egret.TextField;
	/**发单跟单情况 */
	public _typeImg:egret.Bitmap;

	/**数据对象 */
	private _mData: MyLotteryData;
	private constructor() {
		super();
		this.touchEnabled = true;
	}

	public init(data: MyLotteryData): void {
		this._mData = data;
		if (this._mBg == undefined) {
			this._mBg = new egret.Shape();
			this.addChild(this._mBg);
			this._mBg.graphics.beginFill(0xffffff);
			this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
			this._mBg.graphics.endFill();

			let link = new egret.Shape();
			this.addChild(link);
			link.graphics.beginFill(0xdedede);
			link.graphics.drawRect(0, 108, 750, 1.5);
			link.graphics.endFill();
		}

		if (this._mIconBit == undefined)
			this._mIconBit = new egret.Bitmap();
		RES.getResByUrl("resource/assets/images/ui/" + this._mData.url, this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);

		if (this._mTitle == undefined)
			this._mTitle = ToolMrg.getText(62, 8, 26, 0x333333, 150);
		this._mTitle.height = 50;
		this._mTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._mTitle.text = data.title;
		this.addChild(this._mTitle);

		if (this._mXZMoney == undefined)
			this._mXZMoney = ToolMrg.getText(62, 58, 24, 0x333333, 150);
		this._mXZMoney.height = 34;
		this._mXZMoney.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._mXZMoney.text = data.xzMoney + "元";
		this.addChild(this._mXZMoney);

		if (this._mZJ == undefined)
			this._mZJ = ToolMrg.getText(0, 60, 24, 0xFF7000, GameMain.getInstance.StageWidth);
		this._mZJ.height = 34;
		this._mZJ.textAlign = egret.HorizontalAlign.CENTER;
		this._mZJ.verticalAlign = egret.VerticalAlign.MIDDLE;

		let src = "";

		if (data.statue == 1) {
			this._mZJ.textColor = 0xFF7000;
			this._mZJ.text = "待开奖";
			if(data.lotteryType==1)//跟单
				src = "cd_mine@2x";
			else if(data.lotteryType==2)//发单
				src = "dg_mine@2x";

		} else if (data.statue == 2) {
			this._mZJ.textColor = 0x999999;
			this._mZJ.text = "未中奖";
			if(data.lotteryType==1)//跟单
				src = "cd_nor_mine@2x";
			else if(data.lotteryType==2)
				src = "dg_nor_mine@2x";

		} else if (data.statue == 3) {
			this._mZJ.textColor = 0xF72E52;
			this._mZJ.text = "中奖" + data.xjMoney + "元";
			if(data.lotteryType==1)//跟单
				src = "cd_mine@2x";
			else if(data.lotteryType==2)
				src = "dg_mine@2x";

		}
		this.addChild(this._mZJ);

		if(this._typeImg == undefined)
			this._typeImg = new egret.Bitmap();
		if(data.type!=3 && data.type!=4){
			if(data.lotteryType==2 || data.lotteryType==1)
			RES.getResByUrl("resource/assets/images/ui/"+src+".png",this.setTypeImg,this,RES.ResourceItem.TYPE_IMAGE);
		}
		this.addChild(this._typeImg);

		if (this._mID == undefined)
			this._mID = ToolMrg.getText(325, 25, 20, 0x999999, 400);
		this._mID.textAlign = egret.HorizontalAlign.RIGHT;
		// this._mID.text = "订单编号:" + data.id;
		this.addChild(this._mID);

		if (this._mTime == undefined)
			this._mTime = ToolMrg.getText(546, 66, 20, 0x999999,200);
		this._mTime.height = 28;
		this._mTime.verticalAlign = egret.VerticalAlign.MIDDLE;
		// this._mTime.text = "19-02-06 15:24";
		this._mTime.text = ToolMrg.getTime11(data.time);
		this.addChild(this._mTime);
	}


	private setTypeImg(data: any, url: string): void {
		if (data != undefined && this._typeImg != undefined) {
			this._typeImg.$setBitmapData(data);
			this._typeImg.x = 664;
			this._typeImg.y = 18;
			this.addChild(this._typeImg);
		}
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this._mIconBit != undefined) {
			this._mIconBit.$setBitmapData(data);
			this._mIconBit.width = 28;
			this._mIconBit.height = 28;
			this._mIconBit.x = 28;
			this._mIconBit.y = 20;
			this.addChild(this._mIconBit);
		}
	}

	public clean(): void {
		egret.Tween.removeTweens(this);
		this._mIconBit.$setBitmapData(undefined);
		this._typeImg.$setBitmapData(undefined);
		this._mTitle.text = "";
		this._mXZMoney.text = "";
		this._mZJ.text = "";
		this._mTime.text = "";

		this.removeEvent();
	}

	//打开二级页面
	private touchDown(e: egret.TouchEvent): void {
		if (this._mData.type == 1 || this._mData.type == 2 || this._mData.type == 5 || this._mData.type ==6) {
			// FofBDetail.getInstance.show(this._mData);
			if(this._mData.lotteryType==undefined||this._mData.lotteryType==0)
				Order_ListO.getInstance.sendHttp(this._mData.id,this._mData.lotteryType);
			else
				Order_ListT.getInstance.sendHttp(this._mData.id,this._mData.lotteryType);
		} else if (this._mData.type == 3 || this._mData.type == 4) {//列三列五
			// FathreeViewMrg.getInstance.show(this._mData);
			Order_ListO.getInstance.sendHttp(this._mData.id,this._mData.lotteryType);
		}


	}

	private _isEvent = false;
	public addEvent(): void {
		if (!this._isEvent) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
			this._isEvent = true;
		}
	}

	public removeEvent(): void {
		if (this._isEvent) {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
			this._isEvent = false;
		}
	}
}