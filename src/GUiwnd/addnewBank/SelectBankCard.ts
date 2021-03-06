/**选择银行卡 */
class selectBankcard extends egret.DisplayObjectContainer {
	private static _mInstance: selectBankcard;
	public static get getInstance(): selectBankcard {
		if (selectBankcard._mInstance == undefined)
			selectBankcard._mInstance = new selectBankcard();
		return selectBankcard._mInstance;
	}
	public constructor() {
		super();

		this._mContain = new egret.DisplayObjectContainer();
		this.addScoll();

		this._mListObj = new GHashMap<selectBankItem>();
		this.y = 96 + GameValue.adaptationScreen;
		this.touchEnabled = true;

		this._topUI = new TopUIWhite("", -this.y);
		this._topUI.changeTitle("选择银行卡");
		this.addChild(this._topUI);
		this._topUI.gettkrecordBnt().visible = false;
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		// let bglinkxian = new egret.Shape();
		// bglinkxian.graphics.beginFill(0xDEDEDE, 1);
		// bglinkxian.graphics.drawRect(0, 0, 750, 3);
		// bglinkxian.graphics.endFill();
		// this.addChild(bglinkxian);


		this._accountText = ToolMrg.getText(40, 23, 28, 0x333333, 300);
		this._accountText.text = "到账银行卡";
		this._accountText.fontFamily = "微软雅黑";
		this._accountText.bold = true;
		this.addChild(this._accountText);

		this.setDB();
	}

	private _topUI: TopUIWhite;
	private _return: egret.Shape;
	private _accountText: egret.TextField;//到账银行text
	private _mListObj: GHashMap<selectBankItem>;//数据列表

	private _mContain: egret.DisplayObjectContainer;
	private _scroView: egret.ScrollView;
	/**获取列表*/
	public getList(): GHashMap<selectBankItem> {
		return this._mListObj;
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.tipLay.addChild(this);
		}
		GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
		this.initallInfo();
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}


	/**初始化所有数据*/
	public initallInfo(): void {
		let list = SelectDataMrg.getInstance.getItem();
		let len: number = list.size;
		len = len + 1;
		let dataObj: selectBankItem;
		let data: SelectData_card;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			data = list.Gget(i - 1);
			let type: boolean = true;
			if (i == len) type = false;
			if (dataObj == undefined) {
				dataObj = new selectBankItem(type);
				this._mListObj.Gput(i, dataObj);
			}
			if (type == true) {
				dataObj.setID(i, 1, type);
			} else {
				dataObj.setID(i, 2, type);
			}
			if (i == len) {
				dataObj.settatleName("使用新卡提现");
			} else {
				if (data != undefined) {
					dataObj.settatleName(data.userName + "  " + data.BankName + "(" + data.cardNum + ")");
				}
			}

			dataObj.setPoint(0, (i - 1) * 122);
			if (dataObj.parent == undefined) {
				this._mContain.addChild(dataObj);
			}
		}
		selectBankData.getInstance.selectBank();
	}

	private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 86;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - 86;
		this.addChild(this._scroView);
	}

}

class selectBankItem extends egret.DisplayObjectContainer {
	public constructor(boo: boolean) {
		super();

		this.touchEnabled = true;
		let bglink = new egret.Shape();
		bglink.graphics.beginFill(0xFFFFFF, 1);
		bglink.graphics.drawRect(0, 0, 750, 100);
		bglink.graphics.endFill();
		this.addChildAt(bglink, 0);


		let bglinkxian = new egret.Shape();
		bglinkxian.graphics.beginFill(0xDEDEDE, 1);
		bglinkxian.graphics.drawRect(0, 97, 750, 3);
		bglinkxian.graphics.endFill();
		this.addChild(bglinkxian);

		this.bankName = ToolMrg.getText(20, 0, 28, 0x333333);
		this.bankName.text = "中国银行卡";
		this.bankName.fontFamily = "微软雅黑";
		this.bankName.height = 100;
		this.bankName.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.bankName.bold = true;
		this.addChild(this.bankName);

		this.selecticon = new egret.Bitmap();
		this.addChild(this.selecticon);
		this.selecticon.x = 670;
		this.selecticon.y = 30;
		// RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png", (e) => {
		// 	this.selecticon.$setBitmapData(e);
		// }, this);

		this.jiantouicon = new egret.Bitmap();
		this.addChild(this.jiantouicon);
		this.jiantouicon.x = 694;
		this.jiantouicon.y = 34;
		RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", (e) => {
			this.jiantouicon.$setBitmapData(e);
		}, this);

		if (boo == true) {
			this.selecticon.visible = true;
			this.jiantouicon.visible = false;
		} else {
			this.selecticon.visible = false;
			this.jiantouicon.visible = true;
		}

		this.addevent();

	}
	private bankName: egret.TextField;//名字
	private myid: number = 0;//自身id
	private typeid: number = 0;//1 选择银行卡 2添加新的银行卡
	private selecticon: egret.Bitmap;//勾
	private jiantouicon: egret.Bitmap;//箭头
	private typeinfo: boolean = false;


	/**设置名字*/
	public settatleName(namestr: string): void {
		if (this.bankName == undefined) return;
		this.bankName.text = namestr;
	}

	/**设置箭头图片(1色彩勾 2灰色勾)*/
	public setjtSprite(num: number): void {
		if (num == 1) {
			RES.getResByUrl("resource/assets/images/ui/select_home@2x.png", this.back1, this, RES.ResourceItem.TYPE_IMAGE);
		} else {
			RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png", this.back1, this, RES.ResourceItem.TYPE_IMAGE);
		}

	}

	private back1(data: any, url: string): void {
		if (data != undefined && this.selecticon != undefined) {
			this.selecticon.$setBitmapData(data);
		}
	}

	/**左箭头和勾勾的显示*/
	public setjtgg(): void {
		if (this.typeinfo == true) {
			this.selecticon.visible = true;
			this.jiantouicon.visible = false;
		} else {
			this.selecticon.visible = false;
			this.jiantouicon.visible = true;
		}
	}

	public setID(id: number, type: number, typeinfo: boolean): void {
		this.myid = id;
		this.typeid = type;
		this.typeinfo = typeinfo;
		if (id == 1) {
			this.setjtSprite(1);
		} else {
			this.setjtSprite(2);
		}
		this.setjtgg();
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	private addevent(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	private onTouch() {
		if (this.typeid == 1) {//选择银行
			selectBankData.selectID = this.myid;
			selectBankData.getInstance.selectBank();
			selectBankcard.getInstance.hide();
		} else {//新加银行
			let list = SelectDataMrg.getInstance.getItem();
			if (list != undefined && list.size < 3) {
				AddBankCard.getInstance.show();
			} else {
				Alertpaner.getInstance.show("最多只能绑定三张银行卡");
			}
		}
	}
}