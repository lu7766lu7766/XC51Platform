/**大神验证界面 */
class Identityverify extends egret.DisplayObjectContainer {
	private static _mInstance: Identityverify;
	public static get getInstance(): Identityverify {
		if (Identityverify._mInstance == undefined)
			Identityverify._mInstance = new Identityverify();
		return Identityverify._mInstance;
	}

	private _topUI: TopUI;
	private _return: egret.Shape;

	private personalText: egret.TextField;//个人信息text
	private _mListObj: GHashMap<bgxian>;//数据列表
	private nextBnt: egret.Bitmap;//下一步按钮
	private nextText: egret.TextField;//下一步text

	public constructor() {
		super();
		this.y = 96+GameValue.adaptationScreen;
		this.setDB();
		this.touchEnabled = true;
		this._mListObj = new GHashMap<bgxian>();

		this._topUI = new TopUI("", -this.y);
		this._topUI.changeTitle("身份认证");
		this.addChild(this._topUI);
		this._return = this._topUI.getReturn();
		this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.hide();
		}, this);

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xF5F5F7);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 60);
		link.graphics.endFill();

		this.personalText = ToolMrg.getText(0, 18, 28, 0x333333, 750);
		this.addChild(this.personalText);
		this.personalText.textAlign = egret.HorizontalAlign.CENTER;
		this.personalText.text = "个人信息";
		this.personalText.touchEnabled = true;

		this.nextBnt = new egret.Bitmap();
		this.nextBnt.x = 20;
		this.nextBnt.y = 500;
		this.addChild(this.nextBnt);
		ToolMrg.setZoom(this.nextBnt);
		this.nextBnt.touchEnabled = true;
		RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);


		this.nextText = ToolMrg.getText(0, 535, 32, 0xffffff, 750);
		this.addChild(this.nextText);
		this.nextText.textAlign = egret.HorizontalAlign.CENTER;
		this.nextText.text = "下一步";
		this.nextText.bold = true;

		this.addevent();

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
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		let len: number = 2;
		let dataObj: bgxian;
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new bgxian();
				this._mListObj.Gput(i, dataObj);
			}
			dataObj.setID(i);
			dataObj.setPoint(0, 60 + (i - 1) * 109);
			if (dataObj.parent == undefined) {
				this.addChild(dataObj);
			}
		}
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

	private addevent() {
		this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
	}

	private onclick(): void {
		if (IdentityverifyData.realName == "" || IdentityverifyData.identitNum == "") {
			Alertpaner.getInstance.show("请填写身份证号码和姓名");
		} else {
			
			identitycardConf.getInstance.sendHttp(IdentityverifyData.identitNum.toString(), IdentityverifyData.realName);
		}
	}
}


class bgxian extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xDEDEDE);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 2);
		link.graphics.endFill();

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

		this.inputText = ToolMrg.getText(170, 0, 28, 0x999999, 400);
		this.addChild(this.inputText);
		this.inputText.height = 108;
		this.inputText.type = egret.TextFieldType.INPUT;
		this.inputText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.inputText.text = "提交后不可修改";
		this.inputText.touchEnabled = true;

		this.addevent();

	}

	private lowSP: egret.Shape;
	private tatleText: egret.TextField;//标题
	private myid: number = 0;//自身id
	private inputText: egret.TextField;//输入文本
	public static strList: string[] = ["提交后不可修改", "请输入2到8位姓名","15或18位，提交后不可修改"];

	public getStr(): string {
		return this.inputText.text;
	}

	public setInpText(str: string) {
		if (this.inputText == undefined) return;
		this.inputText.text = str;
	}

	public settatleText(str: string) {
		if (this.tatleText == undefined) return;
		this.tatleText.text = str;
	}

	public setID(id: number): void {
		this.myid = id;
		if (this.myid == 1) {
			this.lowSP.visible = false;
		}
		if (id == 1) {
			if (this.inputText.text == "") {
				this.setInpText(bgxian.strList[id - 1]);
			}
			this.settatleText("真实姓名");
		} else {
			if (this.inputText.text == "") {
				this.setInpText(bgxian.strList[id - 1]);
			}
			this.settatleText("身份证号");
		}
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}


	private addevent() {
		this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
		this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
	}

	private textInput() {
		if (this.inputText != undefined && this.inputText.text == bgxian.strList[0] || this.inputText.text == bgxian.strList[1]) {
			this.inputText.text = "";
			this.inputText.textColor = 0x000000;
			this.inputText.alpha = 1;
			this.inputText.text = "";
		} else if (this.inputText != undefined && this.inputText.text == "") {
			if (this.myid == 1) {
				this.inputText.textColor = 0xA9A9A9;
				this.inputText.alpha = 1;
				this.inputText.text = bgxian.strList[this.myid - 1];
			} else {
				this.inputText.textColor = 0xA9A9A9;
				this.inputText.alpha = 1;
				this.inputText.text = bgxian.strList[this.myid - 1];
			}
		} else {
			if (this.myid == 1) {//姓名
				let namedecid: boolean = IdentityverifyObj.getInstance.checkName(this.inputText.text);
				if (namedecid == true) {
					IdentityverifyData.realName = this.inputText.text;
				} else {
					Alertpaner.getInstance.show("请填写正确的姓名");
					this.inputText.text = bgxian.strList[this.myid - 1];
					IdentityverifyData.realName = "";
					this.inputText.textColor = 0xA9A9A9;
				}
			} else if (this.myid == 2) {//身份证号码
				let yx: boolean = IdentityverifyObj.getInstance.IdCardValidate(this.inputText.text);
				if (yx == true) {
					IdentityverifyData.identitNum =this.inputText.text;
				} else {
					Alertpaner.getInstance.show("身份证号码不正确");
					this.inputText.text = bgxian.strList[this.myid - 1];
					IdentityverifyData.identitNum = "";
					this.inputText.textColor = 0xA9A9A9;
				}
			}
		}
	}
}