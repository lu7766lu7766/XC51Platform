/**竞彩足球开奖详情界面*/
class jcFootBallView extends egret.DisplayObjectContainer {
	private static _mInstance: jcFootBallView;
	public static get getInstance(): jcFootBallView {
		if (jcFootBallView._mInstance == undefined)
			jcFootBallView._mInstance = new jcFootBallView();
		return jcFootBallView._mInstance;
	}
	private GSlideOb: GSlideObj;
	private _topUI: TopUI;
	private _return: egret.Shape;

	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;
	private _mListObj: GHashMap<jcFootBallItem>;//数据列表

	private xianText: egret.TextField;//头顶广告
	public selectOBJ: selectqq;//选择期数对象
	public qqbfXianObj: qqbfXian;//显示对象

	/**获取本类层*/
	public getconnet(): egret.DisplayObjectContainer {
		return this;
	}

	public constructor() {
		super();
		this.GSlideOb = new GSlideObj();
		this._mListObj = new GHashMap<jcFootBallItem>();
		this.touchEnabled = true;
		this.y = 96 + GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("竞彩足球开奖");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);

		this.setDB();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xfff7f0);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 60);
		link.graphics.endFill();

		this.xianText = ToolMrg.getText(0, 18, 24, 0xFF7000, 750);
		this.addChild(this.xianText);
		this.xianText.textAlign = egret.HorizontalAlign.CENTER;
		this.xianText.text = "*官方开售截止赔率非中奖赔率，用户奖金以出票赔率为准";
		this.xianText.touchEnabled = true;

		this.selectOBJ = new selectqq();
		this.addChild(this.selectOBJ);
		this.selectOBJ.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			selectDayFootballData.ifshow = !selectDayFootballData.ifshow;
			if (selectDayFootballData.ifshow == true) {
				selectDayFootball.getInstance.show();
			} else {
				selectDayFootball.getInstance.hide();
			}
		}, this);
		this.selectOBJ.y = 60;

		this.qqbfXianObj = new qqbfXian();
		this.addChild(this.qqbfXianObj);
		this.qqbfXianObj.y = 150;
	}
	private ifshow: boolean = false;//是否通过show进来  
	private _mFirst: boolean = true;
	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		if (this._mFirst == true) {
			Result_One.getInstance.sendHttp(3);
			this._mFirst = false;
		}
		this.ifshow = true;
		this.initallInfo();
		this.setqq();
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_FT_List_HH, this.initallInfo, this);
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		selectDayFootball.getInstance.hide();
		CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List_HH, this.initallInfo, this);
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 235;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 235 - 96 -GameValue.adaptationScreen;
		scroView.bounces = true;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		let list: GHashMap<JCFootBallData> = JCFootBallDataMrg.getInstance.getList();
		let dataObj: jcFootBallItem;
		let data: JCFootBallData;
		this.cleanall();
		for (let i = 0; i < list.size; i++) {
			data = list.Gget(i);
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				// dataObj = new jcFootBallItem();
				dataObj = jcFootBallItem.getObj();
				this._mListObj.Gput(i, dataObj);
			}
			if (data != undefined) {
				dataObj.setID(data);
				dataObj.visible = true;
			} else {
				dataObj.visible = false;
			}

			dataObj.setPoint(0, 1 + i * 260);
			// if (dataObj.parent == undefined) {
			// 	this._mContainQB.addChild(dataObj);
			// }
		}
		// if (this.ifshow == true) {
		this._scroViewQB.setScrollTop(20);
		this.ifshow = false;
		// }
		this.GSlideOb.showDataByMap(5, 260, this._scroViewQB, this._mContainQB, this._mListObj);
	}

	/**设置日期*/
	public setqq(): void {
		if (this.selectOBJ == undefined) return;
		let str: string = selectDayFootballData.selectDay[selectDayFootballData.defaultselectNum - 1] + "";
		str = ToolMrg.getTime6(Number(str));
		this.selectOBJ.setqq(str);
	}

	/**清除所有对象*/
	public cleanall(): void {
		let data: jcFootBallItem;
		for (let key of this._mListObj.keys) {
			data = this._mListObj.Gget(key);
			if (data != undefined) {
				GObjPool.getInstance.Gadd2Pool(data);
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
		this._mListObj.clear();
	}
}

/**选择期数*/
class selectqq extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xffffff);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
		link.graphics.endFill();

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 80, GameMain.getInstance.StageWidth, 10);
		link1.graphics.endFill();

		this.touchEnabled = true;
		this.xianText = ToolMrg.getText(38, 25, 28, 0x333333, 300);
		this.addChild(this.xianText);
		this.xianText.bold = true;
		this.xianText.text = "选择期次";

		this.jiantou = new egret.Bitmap();
		this.jiantou.x = 698;
		this.jiantou.y = 36;
		this.jiantou.width = 24;
		this.jiantou.height = 12;
		this.addChild(this.jiantou);
		RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);

		this.selectqq = ToolMrg.getText(385, 31, 24, 0x333333, 300);
		this.addChild(this.selectqq);
		this.selectqq.textAlign = egret.HorizontalAlign.RIGHT;
		this.selectqq.text = "20190606期";

		// this.addevent();
	}

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.jiantou != undefined) {
			this.jiantou.$setBitmapData(data);
		}
	}

	private xianText: egret.TextField;//选择期数text
	private selectqq: egret.TextField;//选择期数
	private jiantou: egret.Bitmap;//箭头

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch(): void {
		// selectDayFootballData.ifshow = !selectDayFootballData.ifshow;
		// if (selectDayFootballData.ifshow == true) {
		// 	selectDayFootball.getInstance.show();
		// } else {
		// 	selectDayFootball.getInstance.hide();
		// }
	}

	/**设置期数*/
	public setqq(num: string): void {
		this.selectqq.text = num + "期";
	}
}

class qqbfXian extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xffffff);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 82);
		link.graphics.endFill();

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 82, GameMain.getInstance.StageWidth, 2);
		link1.graphics.endFill();

		this.xianText = ToolMrg.getText(0, 27.5, 28, 0x999999, 750);
		this.addChild(this.xianText);
		this.xianText.textAlign = egret.HorizontalAlign.LEFT;
		this.xianText.text = "        胜平负   让球胜平负    比分        总进球      半全场 ";
		this.xianText.touchEnabled = true;

	}

	private xianText: egret.TextField;//显示text
}