/**底部投注内容显示 */
class FathreeItemLow extends egret.DisplayObjectContainer {
	private static _mInstance: FathreeItemLow;
	public static get getInstance(): FathreeItemLow {
		if (FathreeItemLow._mInstance == undefined)
			FathreeItemLow._mInstance = new FathreeItemLow();
		return FathreeItemLow._mInstance;
	}
	public constructor() {
		super();
		this.setDB();

		this.GSlideOb = new GSlideObj();
		this._mListObj = new GHashMap<tzItem>();
		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);

		let _mBg = new egret.Bitmap();
		_mBg.x = 0;
		_mBg.y = 0;
		_mBg.width = 750;
		_mBg.height =80;
		this.addChild(_mBg);
		RES.getResByUrl("resource/assets/images/ui/bai.png",((e)=>{
         _mBg.$setBitmapData(e);
		}), this, RES.ResourceItem.TYPE_IMAGE);

		this.Icon = new egret.Bitmap();
		this.Icon.x = 28;
		this.Icon.y = 22;
		this.addChild(this.Icon);
		RES.getResByUrl("resource/assets/images/ui/kjnr_mine@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		let awareNum: egret.TextField = ToolMrg.getText(62, 23, 28, 0x333333, 150);
		awareNum.text = "投注内容";
		// awareNum.fontFamily = "微软雅黑";
		// awareNum.bold = true;
		this.addChild(awareNum);

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xDEDEDE);
		link1.graphics.drawRect(0, 76, 750, 2);
		link1.graphics.endFill();

	}
	private GSlideOb: GSlideObj;
	private Icon: egret.Bitmap;//内容图标
	private tzConnet: egret.TextField;//投注内容
	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;
	private _mListObj: GHashMap<tzItem>;//数据列表

	public show(y: number, datao: MyLotteryData): void {
		if (this.parent == undefined) {
			FathreeViewMrg.getInstance.addChild(this);
		}
		this.y = y;
		this.initallInfo(datao);
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		this.cleanall();
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - 500);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}


	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.Icon != undefined) {
			this.Icon.$setBitmapData(data);
		}
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 78;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 542;
		scroView.bounces = true;
	}

	/**初始化所有数据*/
	public initallInfo(datao: MyLotteryData): void {
		let len: number = 0;
		// this.cleanall();
		let datalist: string[][];
		if (datao != undefined) {
			datalist = datao.threeOrFive.gettzList();
			len = datalist.length
		}

		let dataObj: tzItem;
		for (let i = 0; i < len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = tzItem.getObj();
				this._mListObj.Gput(i, dataObj);
			}
			if (datalist[i] != undefined) {
				dataObj.setNum(datalist[i][0], datalist[i][1]);
			}
			dataObj.setID(i);
			dataObj.setPoint(0, 0 + (i) * 80);
			// if (dataObj.parent == undefined) {
			// 	this._mContainQB.addChild(dataObj);
			// }
			this.GSlideOb.showDataByMap(15, 80, this._scroViewQB, this._mContainQB, this._mListObj);
		}
	}

	/**清除列表*/
	public cleanall() {
		let dataObj: tzItem;
		for (let key of this._mListObj.keys) {
			dataObj = this._mListObj.Gget(key);
			if (dataObj != undefined) {
				GObjPool.getInstance.Gadd2Pool(dataObj);
			}
		}
		this._mListObj.clear();
	}
}
/**投注内容item */
class tzItem extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): tzItem {
		let obj = GObjPool.getInstance.GgetObj(tzItem);
		if (obj == null)
			obj = new tzItem();
		return obj;
	}

	private constructor() {
		super();

		this._mBg = new egret.Bitmap();
		this._mBg.x = 0;
		this._mBg.y = 0;
		this._mBg.width = 750;
		this._mBg.height = 80;
		this.addChild(this._mBg);
		RES.getResByUrl("resource/assets/images/ui/bai.png", this.bgBackwhite, this, RES.ResourceItem.TYPE_IMAGE);


		this._bglowxian = new egret.Bitmap();
		this._bglowxian.x = 0;
		this._bglowxian.y = 78;
		this._bglowxian.width = 750;
		this._bglowxian.height = 2;
		this.addChild(this._bglowxian);
		RES.getResByUrl("resource/assets/images/ui/hui.png", this.bgBackhui, this, RES.ResourceItem.TYPE_IMAGE);

		this._NumText = ToolMrg.getText(62, 0, 28, 0x333333);
		this._NumText.text = "7 , 2 , 1 (标准复式)";
		this._NumText.height = 80;
		this._NumText.verticalAlign = egret.VerticalAlign.MIDDLE;
		// this._NumText.fontFamily = "微软雅黑";
		// this._NumText.bold = true;
		this.addChild(this._NumText);
	}

	private _mBg: egret.Bitmap;//背景
	private _bglowxian: egret.Bitmap;//线
	private _NumText: egret.TextField;//中奖号码
	private myid: number = 0;

	public setNum(num: string, num1: string): void {
		// this._NumText.text = num;
		this._NumText.textFlow = <Array<egret.ITextElement>>[
			{ text: num + " ", style: { "textColor": 0xff004c } },
			{ text: num1 + "", style: { "textColor": 0x333333 } }
		];
	}

	public setID(id: number): void {
		this.myid = id;
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}


	private bgBackwhite(data: any, url: string): void {
		if (data != undefined && this._mBg != undefined) {
			this._mBg.$setBitmapData(data);
		}
	}

	private bgBackhui(data: any, url: string): void {
		if (data != undefined && this._bglowxian != undefined) {
			this._bglowxian.$setBitmapData(data);
		}
	}

	public clean(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}
}