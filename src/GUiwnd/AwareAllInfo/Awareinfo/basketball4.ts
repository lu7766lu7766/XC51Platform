/**篮球关注显示信息*/
class basketball4 extends egret.DisplayObjectContainer {
	private static _mInstance: basketball4;
	public static get getInstance(): basketball4 {
		if (basketball4._mInstance == undefined)
			basketball4._mInstance = new basketball4();
		return basketball4._mInstance;
	}
	public constructor() {
		super();
		this.y = -40 + GameValue.adaptationScreen;
		this._mListObj = new GHashMap<basketballitem1>();
		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xF5F5F7);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 10);
		link.graphics.endFill();

		this._dayQQ = ToolMrg.getText(0, 16, 18, 0x333333, 480);
		this._dayQQ.text = "2019-05-03 星期四  共4场";
		this._dayQQ.textAlign = egret.HorizontalAlign.RIGHT;
		this._dayQQ.fontFamily = "微软雅黑";
		// this.addChild(this._dayQQ);

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
	private _mListObj: GHashMap<basketballitem1>;//数据列表
	private _dayQQ: egret.TextField;//赛程日期 和 场数
	private _heicon: egret.Bitmap;//头图标


	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 10;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 320 - this.y;
		scroView.bounces = true;
	}

	private ifshow: boolean = false;//是否通过show进来  
	public show() {
		let connet: egret.DisplayObjectContainer = BasketViewMrg.getInstance.getconnet();
		if (this.parent == undefined) {
			connet.addChild(this);
		}
		this.ifshow = true;
		this.initallInfo();
	}

	public hide(): void {
		if (this == undefined) return;
		if (this.parent != undefined) {
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
		this.hideData();
		let id: number = 1;
		let dataObj: basketballitem1;
		let len: number = BasketballConfinData.getInstance.getlist3().size;
		for (let key of BasketballConfinData.getInstance.getlist3().keys) {
			dataObj = this._mListObj.Gget(Number(key));
			if (dataObj == undefined) {
				dataObj = new basketballitem1();
				this._mListObj.Gput(Number(key), dataObj);
			}
			dataObj.setID(Number(key));
			dataObj.setPoint(0, 10 + (id - 1) * 125);
			id++;
			if (dataObj.parent == undefined) {
				this._mContainQB.addChild(dataObj);
			}

			let data: basketballCofObj = BasketballConfinData.getInstance.getInfo3(Number(key));
			if (data != undefined) {
				dataObj.setConnetInfo(data.name, data.timer, data.leftname, data.rightname, data.getstatus());
				dataObj.setxingxing(1);
				dataObj.setmainEvray(data.rf, data.zhujie1, data.zhujie2, data.zhujie3, data.zhujie4);
				dataObj.setkeEvray("", data.kejie1, data.kejie2, data.kejie3, data.kejie4);
				dataObj.totalFen(data.bfText, data.team_a_score, data.team_b_score, data.fc);
				dataObj.setColor(data.color);
				dataObj.setssID(data.id);
			}
		}
		if (this.ifshow == true) {
			this._scroViewQB.setScrollTop(20);
			this.ifshow = false;
		}
		if (len > 0) {
			BakorfallViewMrg.getInstance.setDecide(false);
		} else {
			BakorfallViewMrg.getInstance.setDecide(true);
		}
	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: basketballitem1 = this._mListObj.Gget(key);
			if (data != undefined) {
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
	}


}
