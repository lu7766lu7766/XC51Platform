/**修改昵称 */
class AmendName extends egret.DisplayObjectContainer {
	private static _mInstance: AmendName;
	public static get getInstance(): AmendName {
		if (AmendName._mInstance == undefined)
			AmendName._mInstance = new AmendName();
		return AmendName._mInstance;
	}

	public constructor() {
		super();
		this.touchEnabled = true;
		let whileBG: egret.Shape = new egret.Shape();
		whileBG.graphics.beginFill(0xFFFFFF, 1);
		whileBG.graphics.drawRect((GameMain.getInstance.StageWidth - 640) / 2, (GameMain.getInstance.StageHeight - 360) / 2, 640, 360);
		whileBG.graphics.endFill();
		this.addChild(whileBG);

		this.selectIcon = new egret.Bitmap();
		this.addChild(this.selectIcon);
		this.selectIcon.width = 560;
		this.selectIcon.height = 80;
		this.selectIcon.x = 94;
		this.selectIcon.y = (GameMain.getInstance.StageHeight - 360) / 2 + 114;
		RES.getResByUrl("resource/assets/images/ui/kuan@2x.png", (e) => { this.selectIcon.$setBitmapData(e); }, this);


		let _selectTypeText = ToolMrg.getText(0, (GameMain.getInstance.StageHeight - 360) / 2 + 32, 36, 0x333333, 750);
		_selectTypeText.text = "修改昵称";
		_selectTypeText.bold = true;
		_selectTypeText.textAlign = egret.HorizontalAlign.CENTER;
		_selectTypeText.fontFamily = "微软雅黑";
		this.addChild(_selectTypeText);

		this.closeBnt = new egret.Bitmap();
		this.addChild(this.closeBnt);
		this.closeBnt.width = 260;
		this.closeBnt.height = 72;
		this.closeBnt.x = 94;
		this.closeBnt.y = (GameMain.getInstance.StageHeight - 360) / 2 + 246;
		RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@3x.png", (e) => { this.closeBnt.$setBitmapData(e); }, this);
		this.closeBnt.touchEnabled = true;

		this.decideBnt = new egret.Bitmap();
		this.addChild(this.decideBnt);
		this.decideBnt.width = 260;
		this.decideBnt.height = 72;
		this.decideBnt.x = 396;
		this.decideBnt.y = (GameMain.getInstance.StageHeight - 360) / 2 + 246;
		RES.getResByUrl("resource/assets/images/ui/bg2_button@3x.png", (e) => { this.decideBnt.$setBitmapData(e); }, this);
		this.decideBnt.touchEnabled = true;


		let closeText = ToolMrg.getText(190, (GameMain.getInstance.StageHeight - 360) / 2 + 260, 32, 0x333333);
		closeText.text = "取消";
		closeText.bold = true;
		closeText.fontFamily = "微软雅黑";
		this.addChild(closeText);

		let decideText = ToolMrg.getText(494, (GameMain.getInstance.StageHeight - 360) / 2 + 260, 32, 0xFFFFFF);
		decideText.text = "确定";
		decideText.bold = true;
		decideText.fontFamily = "微软雅黑";
		this.addChild(decideText);

		this.inputText = ToolMrg.getText(134, (GameMain.getInstance.StageHeight - 360) / 2 + 134, 28, 0x000000, 500);
		this.addChild(this.inputText);
		this.inputText.height = 50;
		this.inputText.text = "请输入2~8位昵称";
		this.inputText.type = egret.TextFieldType.INPUT;
		this.inputText.fontFamily = "微软雅黑";
		this.inputText.touchEnabled = true;

		this.addevent();
		this.setDB();
	}

	private selectIcon: egret.Bitmap;//选择地图
	private closeBnt: egret.Bitmap;//取消按钮
	private decideBnt: egret.Bitmap;//确定按钮
	private inputText: egret.TextField;//输入文本

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x000000, 0.3);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.topLay.addChild(this);
		}
		this.inputText.text = "请输入2~8位昵称";
		this.inputText.textColor = 0xCACACA;
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

	private addevent() {
		this.closeBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		this.decideBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
		this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
		this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
	}

	private onclick(e: egret.TouchEvent) {
		let target = e.target;
		if (target == this.closeBnt) {
			this.hide();
		} else if (target == this.decideBnt) {
			if (this.inputText.text == "请输入2~8位昵称" || this.inputText.text == "") {
				Alertpaner.getInstance.show("名字不能为空");
				this.inputText.text = "请输入2~8位昵称";
				this.inputText.textColor = 0xCACACA;
				return;
			}
			// if (this.inputText.text.length > 16 || this.inputText.text.length < 5) {
			// 	Alertpaner.getInstance.show("请输入5~16位");
			// 	this.inputText.text = "请输入5~16位";
			// 	this.inputText.textColor = 0xCACACA;
			// 	return;
			// }
			// let speail: boolean = this.checheal(this.inputText.text);
			// if (speail == true) {
			// 	Alertpaner.getInstance.show("不能包含特殊字符");
			// 	this.inputText.text = "请输入5~16位名字";
			// 	this.inputText.textColor = 0xCACACA;
			// 	return;
			// }
			ResetName.getInstance.sendHttp(this.inputText.text);
		}
	}

	private textInput() {
		this.inputText.text;
		if (this.inputText != undefined && this.inputText.text == "请输入2~8位昵称") {
			this.inputText.text = "";
			this.inputText.textColor = 0x000000;
			this.inputText.alpha = 1;
		} else if (this.inputText != undefined && this.inputText.text == "") {
			this.inputText.text = "请输入2~8位昵称";
			this.inputText.textColor = 0xCACACA;
			return;
		} else {

		}
	}

	public checheal(str: string): boolean {
		let decideall: boolean = this.ceckeall(str);
		return decideall;
	}


	private ceckeall(str: string) {
		let reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
		let reg1 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
		if (reg.test(str) == true || reg1.test(str) == true) {
			return true;
		}
		return false;
	}

}