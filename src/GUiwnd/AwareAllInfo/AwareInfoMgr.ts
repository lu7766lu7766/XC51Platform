/**开奖信息管理类 */
class AwareInfoMgr extends egret.DisplayObjectContainer {
	private static _mInstance: AwareInfoMgr;
	public static get getInstance(): AwareInfoMgr {
		if (AwareInfoMgr._mInstance == undefined)
			AwareInfoMgr._mInstance = new AwareInfoMgr();
		return AwareInfoMgr._mInstance;
	}
	private _topUI: TopUI;
	private _return: egret.Shape;

	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;

	/**列表 */
	private _mList: GHashMap<AwareGameInfoData>;
	private _mListObj: GHashMap<AwareGameItem1>;//游戏对象列表(排三或排五)
	private _mListObj2: GHashMap<AwareGameItem2>;//游戏对象列表(竞彩足球或竞彩篮球)

	public constructor() {
		super();

		this.y = GameValue.adaptationScreen;
		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("开奖信息");
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
		this.touchEnabled = true;

		this._mList = new GHashMap<AwareGameInfoData>();
		this._mListObj = new GHashMap<AwareGameItem1>();
		this._mListObj2 = new GHashMap<AwareGameItem2>();
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		this.initAllgameInfo();
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);

			if (WorldWnd._worldState == 1) {
				WorldWnd.getInstance.show();
			}
		}
	}

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 96 + GameValue.adaptationScreen - this.y;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 200;
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

	private line: number = 4;
	/**显示游戏信息*/
	public initAllgameInfo(): void {
		let datada: AwareGameInfoData;
		let dataObj: AwareGameItem1 | AwareGameItem2;
		let listName: string[] = ["排列三", "排列五", "竞彩足球", "竞彩篮球"];
		let list: number[] = [1, 2, 3];
		for (let i = 1; i <= this.line; i++) {
			datada = AwareInfoData.getInstance.getInfo(i);
			if (i <= 2) {
				dataObj = this._mListObj.Gget(i);
				if (dataObj == undefined) {
					dataObj = new AwareGameItem1();
					this._mListObj.Gput(i, dataObj);
				}
				dataObj.setTayile(listName[i - 1]);
				if (datada != undefined) {
					list = datada.getAwareList();
					dataObj.setgameInfo(listName[i - 1], datada.qs + "", datada.time, "");
					if (list != undefined) {
						dataObj.initAllRedBg(list);
					}
				}

			} else {
				dataObj = this._mListObj2.Gget(i);
				if (dataObj == undefined) {
					dataObj = new AwareGameItem2();
					this._mListObj2.Gput(i, dataObj);
				}
				if (i == 3) {//足球
					dataObj.setBallIcon(1);
				} else {//篮球
					dataObj.setBallIcon(2);
				}
				dataObj.setTayile(listName[i - 1]);
				if (datada != undefined) {
					dataObj.setinfo(datada.teamstr, listName[i - 1]);
					dataObj.setTimer(datada.time);
				}
			}
			dataObj.setID(i);
			dataObj.setPoint(0, (i - 1) * 157);
			this._mContainQB.addChild(dataObj);
		}

	}
}