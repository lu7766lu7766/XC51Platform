/**
 * 重置密码
 */
class ResetPassWnd extends egret.DisplayObjectContainer{
    private static _mInstance: ResetPassWnd;
	public static get getInstance(): ResetPassWnd {
		if (ResetPassWnd._mInstance == undefined)
			ResetPassWnd._mInstance = new ResetPassWnd();
		return ResetPassWnd._mInstance;
	}

	private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _topUI:TopUI;
    private _return:egret.Shape;

	/**账号图标 */
	private _mZHIcon:egret.Bitmap;
    /**密码图标 */
	private _mMMIcon:egret.Bitmap;
	/**密码图标 */
	private _mMMIcon1:egret.Bitmap;
	/**密码图标 */
	private _mMMIcon2:egret.Bitmap;
    /**登陆图标 */
	private _mDLIcon:egret.Bitmap;
    /**登陆 */
    private _mQRZF:egret.TextField;

    /**账号输入文本 */
    private _mDLSR:egret.TextField;
    /**旧密码输入文本 */
	private _mMMSR:egret.TextField;
    private _mTipMMSR:egret.TextField;

    /**新密码输入文本 */
	private _mMMSR1:egret.TextField;
    private _mTipMMSR1:egret.TextField;

	 /**确认密码输入文本 */
	private _mMMSR2:egret.TextField;
    private _mTipMMSR2:egret.TextField;

    constructor(){
        super();
		this._mContain = new egret.DisplayObjectContainer();
        this.y = GameValue.adaptationScreen;
        this._topUI = new TopUI("",0,undefined,"bg_login@2x.png");
		this._topUI.changeTitle("重置密码");
        this._mContain.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

		this.init();
		this.setDB()
		this.addScoll();
		this.touchEnabled = true;
    }

	private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = -this.y;
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

	private init():void {
        let link = new egret.Shape();
        this._mContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(94,568 - this.y,560,2);
		link.graphics.endFill();

        let link1 = new egret.Shape();
        this._mContain.addChild(link1);
        link1.graphics.beginFill(0xdedede);
        link1.graphics.drawRect(94,688 - this.y,560,2);
		link1.graphics.endFill();

		let link2 = new egret.Shape();
        this._mContain.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(94,808 - this.y,560,2);
		link2.graphics.endFill();

		let link3 = new egret.Shape();
        this._mContain.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(94,928 - this.y,560,2);
		link3.graphics.endFill();

        this._mZHIcon = new egret.Bitmap();
        this.setBit(this._mZHIcon, "phone_login@2x.png", 94,508 - this.y);

        this._mMMIcon = new egret.Bitmap();
        this.setBit(this._mMMIcon, "password_login@2x.png", 94,628 - this.y);

		this._mMMIcon1 = new egret.Bitmap();
        this.setBit(this._mMMIcon1, "password_login@2x.png", 94,748 - this.y);

		this._mMMIcon2 = new egret.Bitmap();
        this.setBit(this._mMMIcon2, "password_login@2x.png", 94,868 - this.y);

        this._mDLIcon = new egret.Bitmap();
        this._mDLIcon.touchEnabled = true;
        this.setBit(this._mDLIcon, "button_login@2x.png", 90,1074 - this.y);

        if(this._mQRZF == undefined)
			this._mQRZF = ToolMrg.getText(250,1106 - this.y,36,0xFFFFFF,250);
        this._mQRZF.textAlign = egret.HorizontalAlign.CENTER;
		this._mQRZF.text = "重置";
		this._mContain.addChild(this._mQRZF);
		
		this._mDLSR = this.setTxt(this._mDLSR, 140,486 - this.y,"输入账号");
        // this._mDLSR.type = egret.TextFieldType.INPUT;

		this._mMMSR = this.setTxt(this._mMMSR, 140,606 - this.y,"输入旧密码");
		this._mMMSR.alpha = 0.01;
		this._mMMSR.inputType = egret.TextFieldInputType.PASSWORD;
        this._mMMSR.displayAsPassword = true;
        this._mMMSR.type = egret.TextFieldType.INPUT;
		this._mTipMMSR = this.setTxt(this._mTipMMSR, 140,606 - this.y,"输入旧密码");

		this._mMMSR1 = this.setTxt(this._mMMSR1, 140,726 - this.y,"输入新密码");
		this._mMMSR1.alpha = 0.01;
		this._mMMSR1.inputType = egret.TextFieldInputType.PASSWORD;
        this._mMMSR1.displayAsPassword = true;
        this._mMMSR1.type = egret.TextFieldType.INPUT;
		this._mTipMMSR1 = this.setTxt(this._mTipMMSR1, 140,726 - this.y,"输入新密码");

		this._mMMSR2 = this.setTxt(this._mMMSR2, 140,846 - this.y,"确认新密码");
		this._mMMSR2.alpha = 0.01;
		this._mMMSR2.inputType = egret.TextFieldInputType.PASSWORD;
        this._mMMSR2.displayAsPassword = true;
        this._mMMSR2.type = egret.TextFieldType.INPUT;
		this._mTipMMSR2 = this.setTxt(this._mTipMMSR2, 140,846 - this.y,"确认新密码");

	}

    private touchDown(e:egret.TouchEvent):void{
		if(e.target == this._mDLIcon) {
            if(this._mDLSR.text == "输入账号") {
                Alertpaner.getInstance.show("请输入账号");
            } else if(this._mMMSR.text == "输入旧密码") {
                Alertpaner.getInstance.show("输入旧密码");
            } else if(this._mMMSR1.text == "输入新密码") {
                Alertpaner.getInstance.show("输入新密码");
            } else if(this._mMMSR2.text == "确认新密码") {
                Alertpaner.getInstance.show("确认新密码");
            } else if(this._mMMSR2.text != this._mMMSR1.text) {
                Alertpaner.getInstance.show("两次输入密码不一致");
            } else {
				ResetPassPhp.getInstance.sendHttp(this._mMMSR.text, this._mMMSR1.text);
			}
		}
    }

    private setBit(icon:egret.Bitmap,str:string,x,y):void {
        RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{
			icon.$setBitmapData(e);
			icon.x = x;
			icon.y = y;
		},this);
		this._mContain.addChild(icon);
    }

	private setTxt(txt:egret.TextField,x,y,str:string):egret.TextField {
		if(txt == undefined)
			txt = ToolMrg.getText(x,y,28,0xA9A9A9,500);
        txt.height = 80;
        txt.verticalAlign = egret.VerticalAlign.MIDDLE;
		txt.text = ""+str;
		this._mContain.addChild(txt);
		return txt;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		let sss = new egret.Shape();
		sss.graphics.beginFill(0xffffff, 1);
		sss.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,1334);
		sss.graphics.endFill();
		this._mContain.addChildAt(sss, 0);

		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);

		this._mDLSR.text = UserData.getInstance.account;

        this._mDLIcon.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._mDLSR.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		this._mDLSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);

        this._mMMSR.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
		this._mMMSR.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);

		this._mMMSR1.addEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
		this._mMMSR1.addEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);

		this._mMMSR1.addEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
		this._mMMSR1.addEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);

		this._mMMSR2.addEventListener(egret.Event.FOCUS_IN, this.textInput4, this);
		this._mMMSR2.addEventListener(egret.Event.FOCUS_OUT, this.textInput4, this);

		this.textInput();
		this.textInput3();
		this.textInput4();
    }

    private textInput2() {
		if (this._mDLSR != undefined && this._mDLSR.text == "输入账号") {
			this._mDLSR.text = "";
            this._mDLSR.textColor = 0x000000;
		} else if (this._mDLSR != undefined && this._mDLSR.text == "") {
			this._mDLSR.text = "输入账号";
            this._mDLSR.textColor = 0xA9A9A9;
		}
	}

    private textInput() {
		if (this._mMMSR != undefined && this._mMMSR.text == "输入旧密码") {
			this._mMMSR.text = "";
            this._mMMSR.textColor = 0x000000;
            this._mMMSR.alpha = 1;
            this._mTipMMSR.text = "";
		} else if (this._mMMSR != undefined && this._mMMSR.text == "") {
			this._mMMSR.text = "输入旧密码";
            this._mMMSR.textColor = 0xA9A9A9;
            this._mMMSR.alpha = 0.01;
            this._mTipMMSR.text = "输入旧密码";
		}
	}

	private textInput3() {
		if (this._mMMSR1 != undefined && this._mMMSR1.text == "输入新密码") {
			this._mMMSR1.text = "";
            this._mMMSR1.textColor = 0x000000;
            this._mMMSR1.alpha = 1;
            this._mTipMMSR1.text = "";
		} else if (this._mMMSR1 != undefined && this._mMMSR1.text == "") {
			this._mMMSR1.text = "输入新密码";
            this._mMMSR1.textColor = 0xA9A9A9;
            this._mMMSR1.alpha = 0.01;
            this._mTipMMSR1.text = "输入新密码";
		}
	}

	private textInput4() {
		if (this._mMMSR2 != undefined && this._mMMSR2.text == "确认新密码") {
			this._mMMSR2.text = "";
            this._mMMSR2.textColor = 0x000000;
            this._mMMSR2.alpha = 1;
            this._mTipMMSR2.text = "";
		} else if (this._mMMSR2 != undefined && this._mMMSR2.text == "") {
			this._mMMSR2.text = "确认新密码";
            this._mMMSR2.textColor = 0xA9A9A9;
            this._mMMSR2.alpha = 0.01;
            this._mTipMMSR2.text = "确认新密码";
		}
	}

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }

        this._mDLIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._mDLSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		this._mDLSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);

        this._mMMSR.removeEventListener(egret.Event.FOCUS_IN, this.textInput, this);
		this._mMMSR.removeEventListener(egret.Event.FOCUS_OUT, this.textInput, this);

		this._mMMSR1.removeEventListener(egret.Event.FOCUS_IN, this.textInput3, this);
		this._mMMSR1.removeEventListener(egret.Event.FOCUS_OUT, this.textInput3, this);

		this._mMMSR2.removeEventListener(egret.Event.FOCUS_IN, this.textInput4, this);
		this._mMMSR2.removeEventListener(egret.Event.FOCUS_OUT, this.textInput4, this);

		this._mMMSR.text = "";
		this._mMMSR1.text = "";
		this._mMMSR2.text = "";

    }
}