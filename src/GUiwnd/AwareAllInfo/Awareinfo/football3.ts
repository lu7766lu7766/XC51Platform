/**足球赛程数据显示*/
class football3 extends egret.DisplayObjectContainer {
	private static _mInstance: football3;
	public static get getInstance(): football3 {
		if (football3._mInstance == undefined)
			football3._mInstance = new football3();
		return football3._mInstance;
	}
	public constructor() {
		super();
		this.y = -40 + GameValue.adaptationScreen;
		this._mListObj = new GHashMap<footballitem1>();
		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xF5F5F7);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
		link.graphics.endFill();

		this._dayQQ = ToolMrg.getText(0, 16, 18, 0x333333, 480);
		// this._dayQQ.text = "2019-05-03 星期四  共4场";
		this._dayQQ.textAlign = egret.HorizontalAlign.RIGHT;
		this._dayQQ.fontFamily = "微软雅黑";
		this.addChild(this._dayQQ);

		this._heicon = new egret.Bitmap();
		this._heicon.x = 496;
		this._heicon.y = 15;
		this._heicon.width = 24;
		this._heicon.height = 22;
		// this.addChild(this._heicon);
		RES.getResByUrl("resource/assets/images/ui/calendar_match@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
	}

	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;
	private _mListObj: GHashMap<footballitem1>;//数据列表
	private _dayQQ: egret.TextField;//赛程日期 和 场数
	private _heicon: egret.Bitmap;//头图标

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 50;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight -340 - this.y;
		scroView.bounces = true;
	}

	public show() {
		let connet: egret.DisplayObjectContainer = FallViewMrg.getInstance.getconnet();
		if (this.parent == undefined) {
			connet.addChild(this);
		}
		this.initallInfo();
	}

	public hide(): void {
		if(this==undefined)return;
		if ( this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}


	private bgBack1(data: any, url: string): void {
		if (data != undefined && this._heicon != undefined) {
			this._heicon.$setBitmapData(data);
		}
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		let len: number = 2;
		let dataObj: footballitem1;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new footballitem1();
				this._mListObj.Gput(i, dataObj);
			}
			dataObj.setID(i);
			dataObj.setPoint(0, + (i - 1) * 125);
			if (dataObj.parent == undefined) {
				this._mContainQB.addChild(dataObj);
			}
		}
		this._scroViewQB.setScrollTop(20);
	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: footballitem1 = this._mListObj.Gget(key);
			if (data != undefined) {
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
	}
}

