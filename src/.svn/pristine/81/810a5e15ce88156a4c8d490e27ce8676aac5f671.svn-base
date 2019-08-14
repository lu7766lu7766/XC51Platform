/**全部赛事*/
class AllSelectSS extends egret.DisplayObjectContainer {
	private static _mInstance: AllSelectSS;
	public static get getInstance(): AllSelectSS {
		if (AllSelectSS._mInstance == undefined)
			AllSelectSS._mInstance = new AllSelectSS();
		return AllSelectSS._mInstance;
	}
	public constructor() {
		super();
		this.y = 150;
		this._mListObj = new GHashMap<selectssItem>();
		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);
		this.GSlideOb = new GSlideObj();

		this._mShareC = new egret.Shape();

		this.xianshi();
	}
	private GSlideOb: GSlideObj;
	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;
	private _mListObj: GHashMap<selectssItem>;//数据列表
	private _mZWSJTip: egret.Bitmap;//暂时没有数据

	/**返回数据列表*/
	public getlist(): GHashMap<selectssItem> {
		return this._mListObj;
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 10;
		scroView.scrollSpeed = 0.2;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 100 - this.y;
		// scroView.bounces = true;
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		this._mContainQB.removeChildren();
		let len: number = 0;
		let list: GHashMap<bfinfo>;
		if (BakorfallViewMrg.stateIndex == 0) {//足球
			FootballConfinData.getInstance.selectList(SelectMrg.inIndex - 1);
			list = selectFootInfoData.getInstance.getlist();
			len = list.size;
		} else {//篮球
			BasketballConfinData.getInstance.selectList(SelectMrg.inIndex - 1);
			list = selectBaketInfoData.getInstance.getlist();
			len = list.size;
		}
		if (list.size == 0) {
			this._mZWSJTip.visible = true;
			this.addChild(this._mZWSJTip);
		} else {
			this._mZWSJTip.visible = false;
			if (this._mZWSJTip.parent != undefined) {
				this._mZWSJTip.parent.removeChild(this._mZWSJTip);
			}
		}

		this.hideData();
		let dataObj: selectssItem;
		let dataInfo: bfinfo;
		let pointx: number = 0;
		let pointy: number = 0;
		for (let i = 0; i < len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new selectssItem();
				this._mListObj.Gput(i, dataObj);
			}
			if (i != 0) {
				if (i % 3 == 0) {
					pointy++;
				}
			}
			dataInfo = list.Gget(i + 1);
			pointx = i % 3;
			dataObj.setPoint(28 + pointx * 240, 28 + pointy * 100);
			dataObj.setID(i + 1);
			dataObj.setSTatusID(1);
			if (dataInfo != undefined) {
				dataObj.setName(dataInfo.name);
				dataObj.setssID(dataInfo.id);
			}

			if (dataObj.parent == undefined) {
				this._mContainQB.addChild(dataObj);
			}
		}

		this.setDB(this._mContainQB.height);
	}

	public show(): void {
		if (this.parent == undefined) {
			SelectMrg.getInstance.addChild(this);
		}
		this._scroViewQB.scrollTop = 10;
		this.initallInfo();

	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
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
	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: selectssItem = this._mListObj.Gget(key);
			if (data != undefined) {
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(heighr: number): void {
		this._mShareC.graphics.clear();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, heighr + 80);
		this._mShareC.graphics.endFill();
		this._mContainQB.addChildAt(this._mShareC, 0);
	}
}

/**筛选赛事item*/
class selectssItem extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		this.touchEnabled = true;
		this.BG = new egret.Bitmap();
		this.BG.x = 0;
		this.BG.y = 0;
		this.BG.width = 212;
		this.BG.height = 80;
		this.addChild(this.BG);
		// RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);

		this.ssName = ToolMrg.getText(0, 0, 24, 0x333333);
		this.ssName.text = "白露西亚";
		this.ssName.width = 212;
		this.ssName.height = 80;
		this.ssName.textAlign = egret.HorizontalAlign.CENTER;
		this.ssName.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.ssName.bold = true;
		this.ssName.fontFamily = "微软雅黑";
		this.addChild(this.ssName);
		this.addevent();
	}

	private BG: egret.Bitmap;//背景
	private ssName: egret.TextField;//名字
	private myid: number = 0;//自身id
	private statusID: number = 1;//状态id(1 为选中 2没有选中) 
	private ssID: number = 0;//赛事id
	public setID(id: number): void {
		this.myid = id;
	}

	/**获取是否选中id*/
	public getstatusID(): number {
		return this.statusID;
	}

	public setSTatusID(type: number): void {
		this.statusID = type;
		if (this.statusID == 1) {//选中
			RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);
		} else if (this.statusID == 2) {//没有选中
			RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);
		}
		LowSelectBnt.getInstance.setHideBS(selectFileData.getInstance.gethideNum());
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	private bgBack(data: any, url: string): void {
		if (data != undefined && this.BG != undefined) {
			this.BG.$setBitmapData(data);
		}
	}

	/**设置赛事id */
	public setssID(id: number): void {
		this.ssID = id;
	}

	public getssID(): number {
		return this.ssID;
	}

	/**获取赛事名字*/
	public getssName(): string {
		return this.ssName.text;
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}
	private onTouch(): void {
		if (this.statusID == 1) {
			this.statusID = 2;
		} else {
			this.statusID = 1;
		}
		this.setSTatusID(this.statusID);
	}

	/**设置名字*/
	public setName(str: string): void {
		this.ssName.text = str;
	}
}
