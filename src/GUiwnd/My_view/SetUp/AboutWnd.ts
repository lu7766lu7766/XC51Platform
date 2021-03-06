/**关于 */
class AboutWnd extends egret.DisplayObjectContainer{
    private static _mInstance: AboutWnd;
	public static get getInstance(): AboutWnd {
		if (AboutWnd._mInstance == undefined)
			AboutWnd._mInstance = new AboutWnd();
		return AboutWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    constructor(){
        super();

        this.touchEnabled = true;
        this._topUI = new TopUI("关于51彩站");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.joinContain();
        this.addScoll();
        this.setDB();
    }

    private _text:egret.TextField;
    private joinContain():void{
        let img = new egret.Bitmap();
        this._mContain.addChild(img);
        img.y = 55;
        RES.getResByUrl("resource/assets/images/ui/51_mine@2x.png",(e)=>{
            img.$setBitmapData(e); 
            img.x = (GameMain.getInstance.StageWidth - img.width)*0.5;
        },this);

        this._text = ToolMrg.getText(64,250,28,0x333333,644);
        this._mContain.addChild(this._text);
        this._text.lineSpacing = 22;
        this._text.text = "“51彩站”是一款专注于移动互联网的彩票应用软件，我们致力于打造安全、诚信、专业、全方位的互联网彩票技术服务平台。\n【购彩便捷、玩法丰富】\n"
        +"“51彩站”现提供全国主流福彩和体彩等多种玩法，您只需注册一个账户，投注、兑奖都可轻松完成。\n【自身团队、确保服务专业】\n"
        +"团队均有资深行业从业经验和强大的技术背景优势，"
        +"为用户提供专业、高效、和便捷的交易环境。确保平台能7天24小时持续运营，为客户提供不间断专业化服务。\n【充值提款均不收取手续费】\n"
        +"推出“网银零手续费”服务标准，您可以选择网上支付，所产生的转账费用由我们承担。只要你满足消费要求，本站也不收取任何提款手续费。\n【多层账号安全、确保购彩无忧】\n"
        +"每个账户需要绑定真实的身份信息和银行卡信息方可"
        +"提款，一旦绑定后不允许自行修改，多层次技术比对，可确保账户资金安全。\nCopyright 2019 51彩站. All rights reserved.";
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
        }
    }

    private touchDown(e:egret.TouchEvent){
        if(e.target == this._return){
            this.hide();
        }
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen;
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

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);

        let mZZ = new egret.Shape();
        this._mContain.addChildAt(mZZ,0);
        mZZ.graphics.beginFill(0xffffff);
        mZZ.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,this._text.textHeight + 270);
        mZZ.graphics.endFill();
	}
}