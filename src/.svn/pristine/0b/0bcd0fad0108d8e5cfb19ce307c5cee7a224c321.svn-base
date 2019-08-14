/**选择头像管理类 */
class selectHeadIconMrf extends egret.DisplayObjectContainer {
	private static _mInstance: selectHeadIconMrf;
	public static get getInstance(): selectHeadIconMrf {
		if (selectHeadIconMrf._mInstance == undefined)
			selectHeadIconMrf._mInstance = new selectHeadIconMrf();
		return selectHeadIconMrf._mInstance;
	}
	public constructor() {
		super();
		this._mListObj = new GHashMap<selectHeadIconItem>();
		this._mContain = new egret.DisplayObjectContainer();
		this.addScoll();
		this.y = 96 + GameValue.adaptationScreen;
		this.touchEnabled = true;

		this.touchEnabled = true;
		this._topUI = new TopUI("更换头像");
		this._topUI.y = -this.y;
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		this._defauIcon = new egret.Bitmap();
		this._defauIcon.x = 590;
		this._defauIcon.y = 40;
		this._defauIcon.width = 120;
		this._defauIcon.height = 120;
		this._mContain.addChild(this._defauIcon);
		// RES.getResByUrl("resource/assets/images/ui/tou20.png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);


		let text1 = ToolMrg.getText(36, 72, 28, 0x333333);
		this._mContain.addChild(text1);
		text1.text = "当前头像";
		text1.bold = true;

		let text2 = ToolMrg.getText(38, 182, 28, 0x333333);
		this._mContain.addChild(text2);
		text2.text = "可选的头像:";
		text2.bold = true;

		this.nextBnt = new egret.Bitmap();
		this.nextBnt.x = 20;
		this.nextBnt.y = GameMain.getInstance.StageHeight -220;
		this._mContain.addChild(this.nextBnt);
		ToolMrg.setZoom(this.nextBnt);
		this.nextBnt.touchEnabled = true;
		RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.nextText = ToolMrg.getText(0, this.nextBnt.y + 35, 32, 0xffffff, 750);
		this._mContain.addChild(this.nextText);
		this.nextText.textAlign = egret.HorizontalAlign.CENTER;
		this.nextText.text = "更换";
		this.nextText.bold = true;



		this.setDB();
		this.addevent();
	}
	private _topUI: TopUI;
	private _return: egret.Shape;
	private _mContain: egret.DisplayObjectContainer;
	private _scroView: egret.ScrollView;

	private _mListObj: GHashMap<selectHeadIconItem>;//数据列表
	private _defauIcon: egret.Bitmap;//当前头像

	private nextBnt: egret.Bitmap;//确定按钮
	private nextText: egret.TextField;//确定text
	/**获取数组最长长度*/
	public getlistLen(): number {
		return this._mListObj.size;
	}

	/**获取数组*/
	public getlistList(): GHashMap<selectHeadIconItem> {
		return this._mListObj;
	}

	private headIcon(data: any, url: string): void {
		if (data != undefined && this._defauIcon != undefined) {
			this._defauIcon.$setBitmapData(data);
		}
	}

	/**设置当前头像*/
	public setdefaultIcon(id: number) {
		RES.getResByUrl("resource/assets/images/ui/tou" + id + ".png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
	}

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.nextBnt != undefined) {
			this.nextBnt.$setBitmapData(data);
		}
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		this.initallInfo();
		this.setdefaultIcon(selectHeadIconData.userIconID);
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		let len: number = 9;
		let shu: number = 1;
		let heng: number = 1;
		let dataObj: selectHeadIconItem;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new selectHeadIconItem();
				this._mListObj.Gput(i, dataObj);
			}
			if (i != 1) {
				if (i % 4 == 0) {
					heng = 4;
				} else {
					heng = i % 4;
					if (i % 4 - 1 == 0) {
						shu++;
					}
				}
			}
			dataObj.setID(i);
			dataObj.setPoint(40 + (heng - 1) * 184, 280 + (shu - 1) * 160);
			if (dataObj.parent == undefined) {
				this._mContain.addChild(dataObj);
			}
		}
		selectHeadIconData.getInstance.setlectHeadIcon1();
	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: selectHeadIconItem = this._mListObj.Gget(key);
			if (data != undefined) {
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
	}

	private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 0;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y;
		this.addChild(this._scroView);
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xFFFFFF, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this._mContain.addChildAt(this._mShareC, 0);

		this.setDB1();
	}


	private _mShareC1: egret.Shape;
	/**适配处理 */
	private setDB1(): void {
		this._mShareC1 = new egret.Shape();
		this._mShareC1.graphics.beginFill(0xFFFFFF, 1);
		this._mShareC1.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC1.graphics.endFill();
		this.addChildAt(this._mShareC1, 0);
	}

	private addevent() {
		this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}

	private onclick(): void {
		if (selectHeadIconData.selectheadIconID == selectHeadIconData.userIconID) return;
		selectHeadIconData.userIconID = selectHeadIconData.selectheadIconID;
		SelectHeadIconPhP.getInstance.sendHttp(selectHeadIconData.userIconID);
	}
}