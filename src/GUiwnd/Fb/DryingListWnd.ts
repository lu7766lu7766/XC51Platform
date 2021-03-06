/**
 * 晒单界面
 */
class DryingListWnd extends egret.DisplayObjectContainer{
    private static _mInstance: DryingListWnd;
	public static get getInstance(): DryingListWnd {
		if (DryingListWnd._mInstance == undefined)
			DryingListWnd._mInstance = new DryingListWnd();
		return DryingListWnd._mInstance;
	}
	private _mDowmContern:egret.DisplayObjectContainer;

	private _mContern:egret.DisplayObjectContainer;
	/**方案金额 */
	private _mFAJEText:egret.TextField;
	/**单倍金额 */
	private _mDBJEText:egret.TextField;
	/**保密设置金额 */
	private _mBMSZText:egret.TextField;

	private _mYLTCContern:egret.DisplayObjectContainer;
	/**盈利提成 */
	private _mYLTCText:egret.TextField;
	/**盈利输入 */
	private _mSTBKKKK:BKKKK;
	/**盈利提示 */
	private _mYLTCTipText:egret.TextField;

	// /**方案宣言 */
	// private _mFAXYText:egret.TextField;
	// /**方案宣言提示 */
	// private _mFNSTBKKKK:XYBKKKK;

	private _mGKList:string[] = ["免费公开","保密"];
	private _mGKObjList:GHashMap<BK>;

	/**当前选中下标 */
	private _mIndex:number = 1;

	public ylz:number = 0;
	public faxy:string = "";
	
    constructor(){
        super();
		this._mDowmContern = new egret.DisplayObjectContainer();

		this._mContern = new egret.DisplayObjectContainer();
		this.addChild(this._mContern);
		this._mYLTCContern = new egret.DisplayObjectContainer();
		this._mYLTCContern.y = 252;
		this._mContern.addChild(this._mYLTCContern);

		this._mGKObjList = new GHashMap<BK>();

		this.init();

		this.touchEnabled = true;
		this.addChild(this._mDowmContern);
    }

	private _cancelBtn;
	private _defineBtn;

	private init():void {
		// this._mContern.y = GameMain.getInstance.StageHeight - 680;
		let shareBG = new egret.Shape();
		shareBG.graphics.beginFill(0xffffff, 1);
		shareBG.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,680);
		shareBG.graphics.endFill();
		this._mContern.addChildAt(shareBG, 0);

		this._mFAJEText = ToolMrg.getText(0,38,28,0x333333,375);
        this._mContern.addChild(this._mFAJEText);
		// this._mFAJEText.text = "方案金额: 10";
        this._mFAJEText.textAlign = egret.HorizontalAlign.CENTER;

		this._mDBJEText = ToolMrg.getText(375,38,28,0x333333,375);
        this._mContern.addChild(this._mDBJEText);
		// this._mDBJEText.text = "方案金额: 10";
        this._mDBJEText.textAlign = egret.HorizontalAlign.CENTER;

		this._mBMSZText= ToolMrg.getText(28,160,28,0x333333,150);
        this._mContern.addChild(this._mBMSZText);
		this._mBMSZText.text = "保密设置";

		this._mYLTCText= ToolMrg.getText(28,20,28,0x333333,500);
        this._mYLTCContern.addChild(this._mYLTCText);
		this._mYLTCText.text = "盈利提成                   %";

		this._mSTBKKKK = new BKKKK(GameValue.fsRate,120);
		this._mSTBKKKK.x = 152;
		this._mYLTCContern.addChild(this._mSTBKKKK);

		this._mYLTCTipText= ToolMrg.getText(152,90,24,0xFF7000,542);
		this._mYLTCTipText.lineSpacing = 7;
        this._mYLTCContern.addChild(this._mYLTCTipText);
		this._mYLTCTipText.text = "发单人对跟单人所跟订单的中奖奖金收取佣金，比 例为1-10%，未中奖或未获得实际盈利，不提取佣金。";

		// this._mFAXYText = ToolMrg.getText(28,680 - 218,28,0x333333,150);
        // this._mDowmContern.addChild(this._mFAXYText);
		// this._mFAXYText.text = "方案宣言"; 

		// this._mFNSTBKKKK = new XYBKKKK(540);
		// this._mFNSTBKKKK.x = 152;
		// this._mFNSTBKKKK.y = 680 - 234;
		// this._mDowmContern.addChild(this._mFNSTBKKKK);
		

		this.hx(375,0,2,100);
		this.hx(0,100,GameMain.getInstance.StageWidth,2);

		let ojb:BK;
		for(let i=0;i<this._mGKList.length;i++) {
			ojb = new BK(i,this._mGKList[i]);
			ojb.x = 152 + i*180;
			ojb.y = 138;
			this._mContern.addChild(ojb);
			this._mGKObjList.Gput(i,ojb);
		}


		this._cancelBtn = new egret.Bitmap();
        this._mDowmContern.addChild(this._cancelBtn);
        this._cancelBtn.touchEnabled = true;
        this._cancelBtn.x = 84;
        this._cancelBtn.y = this._mLength - 118;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._cancelBtn.$setBitmapData(e); },this);

        this._defineBtn = new egret.Bitmap();
        this._mDowmContern.addChild(this._defineBtn);
        this._defineBtn.touchEnabled = true;
        this._defineBtn.x = 400;
        this._defineBtn.y = this._mLength - 118;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._defineBtn.$setBitmapData(e); },this);

        let cancelText = ToolMrg.getText(90,this._mLength - 93,32,0x333333,260);
        this._mDowmContern.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";

        let defineText = ToolMrg.getText(406,this._mLength - 93,32,0xffffff,260);
        this._mDowmContern.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";
	}

	private hx(x:number,y:number,w:number,h:number):void {
		let link = new egret.Shape();
		link.graphics.beginFill(0xA9A9A9);
		link.graphics.drawRect(x,y,w,h);
		link.graphics.endFill();
		this._mContern.addChild(link);
	}

	private addScoll(contain:egret.DisplayObjectContainer,scroView:egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 96+GameValue.adaptationScreen - this.y;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 134;
	}

	private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		if(this._mShareC == undefined) {
			this._mShareC = new egret.Shape();
			this._mShareC.graphics.beginFill(0x000000, 0.7);
			this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
			this._mShareC.graphics.endFill();
		}
		GUIManager.getInstance.tipLay.addChild(this._mShareC);
    }

    private touchDown(e:egret.TouchEvent):void{
		if(e.target instanceof BK) {
			let bk:BK = e.target
			this.changeBJ(bk.id);
		} else if(e.target == this._cancelBtn) {//取消
			GoFBBuy.getInstance.changeGX(false);
			this.hide();
		} else if(e.target == this._defineBtn) {//确定
			GoFBBuy.getInstance.dryingData.type = this._mIndex + 1;
			if(GoFBBuy.getInstance.dryingData.type == 2) {//php强制性要求
				GoFBBuy.getInstance.dryingData.type = 3;
			}
			GoFBBuy.getInstance.dryingData.yltc = this.ylz;
			// GoFBBuy.getInstance.dryingData.faxy = this.faxy;
			this.hide();
		}
    }
    public show(money:number,double?:number):void{
		this._mFAJEText.textFlow  = <Array<egret.ITextElement>>[
            {"text":"方案金额: ",style:{"textColor":0x333333}},
            {"text":money,style:{"textColor":0xF72E52}}
        ];
         let doublemoney:number=money;
		 if(double!=undefined){
             doublemoney=doublemoney/double;
		 }
		this._mDBJEText.textFlow  = <Array<egret.ITextElement>>[
            {"text":"单倍金额: ",style:{"textColor":0x333333}},
            {"text":doublemoney,style:{"textColor":0xF72E52}}
        ];

		this.ylz = 0;
		this.faxy = "";
		egret.Tween.removeTweens(this);
		this.y = GameMain.getInstance.StageHeight;
		this.setDB()
        GUIManager.getInstance.tipLay.addChild(this);
		let bk:BK;
		for(let key of this._mGKObjList.keys) {
			bk = this._mGKObjList[key];
			bk.touchEnabled = true;
			bk.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		}
		this.changeBJ(this._mIndex);
		this._mSTBKKKK.enter();
		// this._mFNSTBKKKK.enter();
		egret.Tween.get(this).to({y: GameMain.getInstance.StageHeight - this._mLength},200);

		this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

	private _mLength:number = 580;

	/**切换界面 */
	public changeBJ(index:number):void {
		this._mIndex = index;
		let bk:BK;
		for(let key of this._mGKObjList.keys) {
			bk = this._mGKObjList[key];
			if(key == this._mIndex) {
				bk.changeBG(1);
			} else {
				bk.changeBG(0);
			}
		}

		if(index > 0) {
			this.changePos(true);
		} else {
			this.changePos(false);
		}
	}

	/**调整坐标 
	 * 是否显示盈利
	*/
	private changePos(isShowYL:boolean):void {
		if(isShowYL == true) {
			this._mYLTCContern.visible = true;
			this._mContern.y = 0;
		} else {
			this._mYLTCContern.visible = false;
			this._mContern.y = 200;
		}
	}

    public hide():void{
		if(this._mShareC.parent != undefined) {
			this._mShareC.parent.removeChild(this._mShareC);
		}
		this._mIndex = 1;
		let bk:BK;
		for(let key of this._mGKObjList.keys) {
			bk = this._mGKObjList[key];
			bk.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		}
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
		this._mSTBKKKK.exit();
		// this._mFNSTBKKKK.exit();

		this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}

class BK extends egret.DisplayObjectContainer{
	/**背景框 */
	private _mGXKBG:egret.Bitmap;
	/**文字描述 */
	private _mText:egret.TextField;
	/**下标 */
	public id:number = 0;

	constructor(id:number, str:string){
        super();
		this.id = id;
		this._mGXKBG = new egret.Bitmap();
        this.addChild(this._mGXKBG);

		this._mText = ToolMrg.getText(0,0,24,0x333333,180);
		this._mText.height = 72;
        this.addChild(this._mText);
		this._mText.text = str;
        this._mText.textAlign = egret.HorizontalAlign.CENTER;
		this._mText.verticalAlign = egret.VerticalAlign.MIDDLE;
	}

	/**
	 * 切换选中背景 
	 * 1选中 0未选中
	*/
	public changeBG(select:number):void {
		let str:string = "fdxz2_home@2x.png";
		if(select == 1) {
			this._mText.textColor = 0xffffff;
			str = "fdxz_home@2x.png";
		} else {
			this._mText.textColor = 0x333333;
		}
		RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{
            this._mGXKBG.$setBitmapData(e);
        },this);
	}
}

class BKKKK extends egret.DisplayObjectContainer{
	/**背景框 */
	private _mGXKBG:egret.Bitmap;
	/**文字描述 */
	public text:egret.TextField;
	/**最大值 */
	private max:number;

	constructor(max:number,www:number){
        super();
		this.max = max;
		this._mGXKBG = new egret.Bitmap();
        this.addChild(this._mGXKBG);
		RES.getResByUrl("resource/assets/images/ui/fdxz2_home@2x.png",(e)=>{
            this._mGXKBG.$setBitmapData(e);
			this._mGXKBG.scaleX = www/this._mGXKBG.width;
        },this);

		this.text = ToolMrg.getText(0,0,28,0x333333,www);
		// this.text.type = egret.TextFieldType.INPUT;
		this.text.height = 72;
        this.addChild(this.text);
		this.text.text = ""+this.max;
		this.text.touchEnabled = true;
        this.text.textAlign = egret.HorizontalAlign.CENTER;
		this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
	}

	private textInput2() {
		if (this.text != undefined) {
			let num:number = ToolMrg.getDecimal(Number(this.text.text),2);
			if(num > this.max) {
				num = this.max;
			}
			this.text.text = ""+num;
		} else if (this.text != undefined && this.text.text == "") {
			this.text.text = ""+this.max;
		}
		DryingListWnd.getInstance.ylz = Number(this.text.text);
	}

	private touchDown(e:egret.TouchEvent):void{
		let obj = new NumKeyData();
		obj.backFun = this.textInput2;
		obj.thisObj = this;
		obj.strText = this.text;
		obj.str = this.text.text;
		DryNumKey.getInstance.show(obj);
	}

	public enter():void {
		DryingListWnd.getInstance.ylz = Number(this.text.text);
		// this.text.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		// this.text.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
		// this.text.addEventListener(egret.TouchEvent.CHANGE,this.textInput2,this);
		this.text.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
	}

	public exit():void {
		// this.text.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		// this.text.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
		// this.text.removeEventListener(egret.TouchEvent.CHANGE,this.textInput2,this);
		this.text.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
		this.text.text = ""+this.max;
	}

}

class XYBKKKK extends egret.DisplayObjectContainer{
	/**背景框 */
	private _mGXKBG:egret.Bitmap;
	/**文字描述 */
	private _mText:egret.TextField;

	constructor(www:number){
        super();
		this._mGXKBG = new egret.Bitmap();
        this.addChild(this._mGXKBG);
		RES.getResByUrl("resource/assets/images/ui/fdxz2_home@2x.png",(e)=>{
            this._mGXKBG.$setBitmapData(e);
			this._mGXKBG.scaleX = www/this._mGXKBG.width;
        },this);

		this._mText = ToolMrg.getText(8,0,24,0x999999,www);
		this._mText.type = egret.TextFieldType.INPUT;
		this._mText.height = 72;
        this.addChild(this._mText);
		this._mText.text = "精彩方案宣言";
		this._mText.verticalAlign = egret.VerticalAlign.MIDDLE;
	}

	private textInput2() {
		if (this._mText != undefined && this._mText.text == "精彩方案宣言") {
			this._mText.text = "";
            this._mText.textColor = 0x333333;
		} else if (this._mText != undefined && this._mText.text == "") {
			this._mText.text = "精彩方案宣言";
            this._mText.textColor = 0x999999;
		}
		DryingListWnd.getInstance.faxy = this._mText.text;
	}

	public enter():void {
		DryingListWnd.getInstance.faxy = this._mText.text;
		this._mText.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		this._mText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
	}

	public exit():void {
		this._mText.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
		this._mText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
		this._mText.text = "精彩方案宣言";
	}

}
