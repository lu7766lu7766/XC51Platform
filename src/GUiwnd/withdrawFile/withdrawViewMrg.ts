/**提现界面*/
class withdrawViewMrg extends egret.DisplayObjectContainer {
	private static _mInstance: withdrawViewMrg;
	public static get getInstance(): withdrawViewMrg {
		if (withdrawViewMrg._mInstance == undefined)
			withdrawViewMrg._mInstance = new withdrawViewMrg();
		return withdrawViewMrg._mInstance;
	}

	private _mContain: egret.DisplayObjectContainer;
	private _scroView: egret.ScrollView;

	public constructor() {
		super();
		this.y = 96 + GameValue.adaptationScreen;
		this.touchEnabled = true;
		this._mListObj = new GHashMap<bgxianTx>();
		this._mListObj1 = new GHashMap<withdrawObj>();

		this._topUI = new TopUIWhite("", -this.y);
		this._topUI.changeTitle("提款申请");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		this._mContain = new egret.DisplayObjectContainer();
		this.addScoll();

		this._txrecord = this._topUI.gettkrecordBnt();
		this._txrecord.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {//提款记录
			CapitalWnd.getInstance.show(3);
		}, this);

		// let link = new egret.Shape();
		// this.addChild(link);
		// link.graphics.beginFill(0xf5f5f7);
		// link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 5);
		// link.graphics.endFill();

		let link1 = new egret.Shape();
		this._mContain.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 257, GameMain.getInstance.StageWidth, 10);
		link1.graphics.endFill();

		this._selectTypeText = ToolMrg.getText(40, 47, 28, 0x333333, 300);
		this._selectTypeText.text = "选择提款类型：";
		this._selectTypeText.textAlign = egret.HorizontalAlign.CENTER;
		this._selectTypeText.fontFamily = "微软雅黑";
		this._mContain.addChild(this._selectTypeText);

		this._decideobj = new decideTKObj();
		this._mContain.addChild(this._decideobj);

		this.setDB();
	}

	private _topUI: TopUIWhite;
	private _return: egret.Shape;
	private _selectTypeText: egret.TextField;//选择提现类型text
	private _mListObj: GHashMap<bgxianTx>;//数据列表
	private _mListObj1: GHashMap<withdrawObj>;//佣金或零钱对象列表
	private _decideobj: decideTKObj;//确认提款按钮和显示文本内容
	private _txrecord: egret.TextField;//提款记录


	/**获取零钱或佣金列表*/
	public getlist1(): GHashMap<withdrawObj> {
		return this._mListObj1;
	}

	/**获取数据对象列表*/
	public getlist(): GHashMap<bgxianTx> {
		return this._mListObj;
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.topLay.addChild(this);
		}
		decideTKObj.canTiXian = true;
		this.initallInfo();
		this.initallInfo1();

	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		decideTKObj.canTiXian = true;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}


	/**初始化所有数据*/
	public initallInfo(): void {
		let len: number = 3;
		let dataObj: bgxianTx;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new bgxianTx(i);
				this._mListObj.Gput(i, dataObj);
			}
			dataObj.setID(i);
			dataObj.setPoint(0, 267 + (i - 1) * 109);
			if (dataObj.parent == undefined) {
				this._mContain.addChild(dataObj);
			}
		}
		withdrawData.getInstance.setAllMoney();
		this.setconne();
	}

	/**初始化佣金零钱*/
	public initallInfo1(): void {
		let len: number = 2;
		let dataObj: withdrawObj;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj1.Gget(i);
			if (dataObj == undefined) {
				dataObj = new withdrawObj(i);
				this._mListObj1.Gput(i, dataObj);
			}
			dataObj.setID(i);
			if (i == 1) {
				dataObj.setmongtext(UserData.getInstance.getGold());
			} else if (i == 2) {
				dataObj.setmongtext(UserData.getInstance.getYJGold());
			}
			dataObj.setPoint(40 + (i - 1) * 390, 107);
			if (dataObj.parent == undefined) {
				this._mContain.addChild(dataObj);
			}
		}

		withdrawData.getInstance.selectdecide();
	}



	private addevent() {
		// this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}

	private onclick(): void {

	}


	/**设置银行和卡号*/
	public setconne(): void {
		let list = SelectDataMrg.getInstance.getItem();
		let data: SelectData_card = list.Gget(selectBankData.selectID - 1);
		if (data != undefined) {
			let obj1: bgxianTx = this._mListObj.Gget(1);
			let obj2: bgxianTx = this._mListObj.Gget(2);
			if (obj1 != undefined) {
				obj1.setInpText(data.BankName);
			}
			if (obj2 != undefined) {
				obj2.setInpText(data.cardNum);
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
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
		this.addChild(this._scroView);
	}
}

class bgxianTx extends egret.DisplayObjectContainer {
	public constructor(id?: number) {
		super();
		this.touchEnabled = true;

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xffffff);
		link1.graphics.drawRect(0, 2, GameMain.getInstance.StageWidth, 104);
		link1.graphics.endFill();

		this.lowSP = new egret.Shape();
		this.addChild(this.lowSP);
		this.lowSP.graphics.beginFill(0xDEDEDE);
		this.lowSP.graphics.drawRect(0, 105, GameMain.getInstance.StageWidth, 2);
		this.lowSP.graphics.endFill();

		this.tatleText = ToolMrg.getText(26, 0, 28, 0x333333, 200);
		this.addChild(this.tatleText);
		this.tatleText.height = 108;
		this.tatleText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.tatleText.text = "真实姓名";
		this.tatleText.touchEnabled = true;
		this.tatleText.bold = true;

		this.inputText = ToolMrg.getText(230, 0, 28, 0x999999, 400);
		this.addChild(this.inputText);
		this.inputText.height = 108;
		this.inputText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.inputText.text = "";
		this.inputText.fontFamily = "微软雅黑";
		this.inputText.touchEnabled = true;
		this.myid = id;
		if (id == 1) {
			let jts: egret.Bitmap = new egret.Bitmap();
			this.addChild(jts);
			jts.x = 692;
			jts.y = 30;
			RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", (e) => {
				jts.$setBitmapData(e);
			}, this);

		}

		if (id == 3) {
			this.meiText = ToolMrg.getText(230, 40, 28, 0x333333, 50);
			this.addChild(this.meiText);
			this.meiText.text = "￥";
			this.meiText.bold = true;
			this.inputText.x = 264;

			this.inputText.type = egret.TextFieldType.INPUT;
			this.inputText.textColor = 0x999999;
		} else {
			this.inputText.textColor = 0x333333;
		}

		this.allzc = ToolMrg.getText(602, 40, 28, 0xFF7000, 120);
		this.addChild(this.allzc);
		this.allzc.height = 40;
		this.allzc.touchEnabled = true;
		this.allzc.text = "全部转出";
		this.allzc.bold = true;
		if (id == 3) {
			this.allzc.visible = true;
		} else {
			this.allzc.visible = false;
		}

		this.addevent();

	}

	private lowSP: egret.Shape;
	private tatleText: egret.TextField;//标题
	private myid: number = 1;//自身id
	private inputText: egret.TextField;//输入文本
	private meiText: egret.TextField;//美元符号
	private allzc: egret.TextField;//全部转出text
	public static namelist: string[] = ["11", "62812.....22565", "可提取金额"];

	public getStr(): string {
		return this.inputText.text;
	}

	public setInpText(str: string) {
		if (this.inputText == undefined) return;
		this.inputText.text = str;
	}

	public setcolor(): void {
		if (this.inputText == undefined) return;
		this.inputText.textColor = 0x999999;
	}

	public settatleText(str: string) {
		if (this.tatleText == undefined) return;
		this.tatleText.text = str;
	}

	public setID(id: number): void {
		this.myid = id;
		if (id == 1) {
			if (this.inputText.text == "") {
				this.setInpText(bgxianTx.namelist[id - 1]);
			}
			this.settatleText("开户银行");
		} else if (id == 2) {
			if (this.inputText.text == "") {
				this.setInpText(bgxianTx.namelist[id - 1]);
			}
			this.settatleText("银行卡号");
		} else if (id == 3) {
			if (this.inputText.text == "") {
				this.setInpText(bgxianTx.namelist[id - 1]);
			}
			this.settatleText("提取金额");
		}
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}


	private addevent() {

		this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
		this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
		this.allzc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		if (this.myid == 1) {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		}
	}

	private onclick(): void {
		if (this.myid == 1) {
			selectBankcard.getInstance.show();
		}
	}

	private onTouch() {
		let type: number = withdrawData.defauleid;
		if (type == 1) {//余额
			let str: number = Math.floor(UserData.getInstance.getGold());
			this.inputText.text = "" + str;
			withdrawData.bangtk = str + "";
		} else {//佣金
			let str: number = Math.floor(UserData.getInstance.getYJGold());
			this.inputText.text = "" + str;
			withdrawData.bangtk = str + "";
		}
		this.inputText.textColor = 0x000000;
	}

	private textInput() {
		let strtx: string = withdrawData.getInstance.getAllMoney();
		this.inputText.text;
		if (this.inputText != undefined && this.inputText.text == strtx || this.inputText.text == bgxianTx.namelist[0] || this.inputText.text == bgxianTx.namelist[0]) {
			this.inputText.text = "";
			this.inputText.textColor = 0x000000;
			this.inputText.alpha = 1;
		} else if (this.inputText != undefined && this.inputText.text == "") {
			if (this.myid == 1) {
				this.inputText.text = bgxianTx.namelist[this.myid - 1];
				this.inputText.textColor = 0xA9A9A9;
				this.inputText.alpha = 1;
				// } else if (this.myid == 2) {
				// 	this.inputText.text = bgxianTx.namelist[this.myid - 1];
				// 	this.inputText.textColor = 0xA9A9A9;
				// 	this.inputText.alpha = 1;
				//
			} else if (this.myid == 3) {
				this.inputText.text = strtx;
				this.inputText.textColor = 0xA9A9A9;
				this.inputText.alpha = 1;
			}

		} else {
			// if (this.myid == 2) {//检验银行卡号
			// 	let oneche: boolean = bankcardCheck.getInstance.onecheck(this.inputText.text);
			// 	let twoche: boolean = bankcardCheck.getInstance.twocheck(this.inputText.text);
			// 	if (oneche == false || twoche == false) {//银行卡号不正确
			// 		Alertpaner.getInstance.show("银行卡号不正确");
			// 		this.inputText.text = bgxianTx.namelist[this.myid - 1];
			// 		this.inputText.textColor = 0x999999;
			// 	} else {

			// 	}
			// } else 
			if (this.myid == 1) {//银行卡名字
				let ifName: boolean = bankcardCheck.getInstance.checkName(this.inputText.text);
				if (ifName == false) {
					Alertpaner.getInstance.show("不能填写数字");
					this.inputText.text = bgxianTx.namelist[this.myid - 1];
					this.inputText.textColor = 0x999999;
				} else {

				}

			} else if (this.myid == 3) {//提取金额
				let type: number = withdrawData.defauleid;
				let ifNo: boolean = bankcardCheck.getInstance.checkAllNum(this.inputText.text);
				if (ifNo == false) {
					Alertpaner.getInstance.show("只能填写数字");
					withdrawData.getInstance.setAllMoney()
					this.inputText.textColor = 0x999999;
					withdrawData.bangtk = ""
				} else {
					let inpNum: string = this.inputText.text;
					if (type == 1) {//余额
						if (Number(inpNum) > UserData.getInstance.getGold()) {
							this.inputText.text = UserData.getInstance.getGold() + "";
						}
						withdrawData.bangtk = this.inputText.text;

					} else {//佣金
						if (Number(inpNum) > UserData.getInstance.getYJGold()) {
							this.inputText.text = UserData.getInstance.getYJGold() + "";
						}
						withdrawData.bangtk = this.inputText.text;
					}
					if (Number(withdrawData.bangtk + "".length) > 1) {//检验金额》2位时，首位是否为零
						let moneyOne: number = Number(withdrawData.bangtk + "".slice(0, 1));
						if (moneyOne == 0) {
							Alertpaner.getInstance.show("填写不规范");
							withdrawData.getInstance.setAllMoney()
							this.inputText.textColor = 0x999999;
							this.inputText.text = strtx;
							withdrawData.bangtk = "";
						}
					}


				}
			}
		}
	}
}