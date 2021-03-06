class TopUIWhite extends egret.DisplayObjectContainer {
	private _bjImg: egret.Bitmap;
	private _Img: egret.Bitmap;
	private _shape: egret.Shape;
	private _text: egret.TextField;
	private _tkrecordText: egret.TextField;//提款记录text

	constructor(text, thisy?: number, isleft?, isLogin?: string) {
		super();
		if (thisy != undefined)
			this.y = thisy;
		let num = GameValue.adaptationScreen;

		this._bjImg = new egret.Bitmap();
		this.addChild(this._bjImg);
		var rect:egret.Rectangle = new egret.Rectangle(0,0,0,96);
        this._bjImg.scale9Grid =rect;
		// if (isLogin != undefined) {
		// 	RES.getResByUrl(`resource/assets/images/ui/` + isLogin, (e) => {
		// 		this._bjImg.$setBitmapData(e);
		// 	}, this);
		// } else {
		RES.getResByUrl(`resource/assets/images/ui/bg2_nav@2x.png`, (e) => {
			this._bjImg.$setBitmapData(e);
			this._bjImg.height = 96 + num;
		}, this);
		// }
		// let link = new egret.Shape();
		// this.addChild(link);
		// link.graphics.beginFill(0xffffff);
		// link.graphics.drawRect(0, 0, 750, 96 + num);
		// link.graphics.endFill();
		// link.alpha = 1;


		if (isleft == undefined) {
			this._Img = new egret.Bitmap();
			this.addChild(this._Img);
			RES.getResByUrl("resource/assets/images/ui/returnWhite.png", (e) => {
				this._Img.$setBitmapData(e);
				this._Img.x = 26;
				this._Img.y = 28 + num;
			}, this);
		}

		this._shape = new egret.Shape();
		this.addChild(this._shape);
		this._shape.graphics.beginFill(0x1cbf4f);
		this._shape.graphics.drawRect(0, 0, 150, 96 + num);
		this._shape.graphics.endFill();
		this._shape.touchEnabled = true;
		this._shape.alpha = 0.001;

		this._text = ToolMrg.getText(0, num, 36, 0x333333, 750);
		this.addChild(this._text);
		this._text.textAlign = egret.HorizontalAlign.CENTER;
		this._text.height = 96;
		this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._text.text = text;
		this._text.bold = true;


		this._tkrecordText = ToolMrg.getText(614, num, 28, 0x333333, 160);
		this.addChild(this._tkrecordText);
		this._tkrecordText.height = 96;
		this._tkrecordText.verticalAlign = egret.VerticalAlign.MIDDLE;
		this._tkrecordText.text = text;
		this._tkrecordText.bold = true;
		this._tkrecordText.text = "提款记录";
		this._tkrecordText.touchEnabled = true;
	}

	public changeTitle(str: string): void {
		this._text.text = str;
	}

	public getReturn(): egret.Shape {
		return this._shape;
	}

	public getreturnSprite(): egret.Bitmap {
		return this._Img;
	}

	/**提款记录text按钮 */
	public gettkrecordBnt(): egret.TextField {
		return this._tkrecordText;
	}

	public hideTxText():void{
		this._tkrecordText.visible = false;
	}
}