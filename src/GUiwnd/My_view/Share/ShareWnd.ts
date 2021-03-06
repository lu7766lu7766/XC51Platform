/**分享 会员拉新 */
class ShareWnd extends egret.DisplayObjectContainer{
    private static _mInstance: ShareWnd;
	public static get getInstance(): ShareWnd {
		if (ShareWnd._mInstance == undefined)
			ShareWnd._mInstance = new ShareWnd();
		return ShareWnd._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _startTime = "2019-06-31 00:00:00";
    private _endTime = "2020-06-30 00:00:00";

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _box:egret.Bitmap;
    private _btn:egret.Bitmap;
    private _linkText:egret.TextField;

    private _downContain:egret.DisplayObjectContainer;

    private _downBtn:egret.Shape;
    private _share:egret.Bitmap;

    constructor(){
        super();
        this.touchEnabled = true;

        this._topUI = new TopUI("会员拉新活动");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._downContain);
        this._downContain.y = 1500+500;//1400

        this.addScoll();

        this.joinContent();
        this.joinDown();
        
        this._box = new egret.Bitmap();
        this._mContain.addChild(this._box);
        this._box.x = 28;
        this._box.y = 808+400;
        RES.getResByUrl("resource/assets/images/ui/srk_mine@2x.png",(e)=>{this._box.$setBitmapData(e); },this);
        var rect:egret.Rectangle = new egret.Rectangle(0,10,0,5);
        this._box.scale9Grid = rect;
        this._box.height = 130;

        this._btn = new egret.Bitmap();
        this._mContain.addChild(this._btn);
        this._btn.x = 566;
        this._btn.y = 818+400;
        RES.getResByUrl("resource/assets/images/ui/fuzhi_mine@2x.png",(e)=>{this._btn.$setBitmapData(e); },this);
        this._btn.touchEnabled = true;

        let btnText = ToolMrg.getText(566,823+400,20,0xffffff,152);
        // this._mContain.addChild(btnText);
        btnText.height = 60;
        btnText.textAlign = egret.HorizontalAlign.CENTER;
        btnText.verticalAlign = egret.VerticalAlign.MIDDLE;
        btnText.text = "复制";

        this._linkText = ToolMrg.getText(48,808+400,20,0x333333,474);
        this._mContain.addChild(this._linkText);
        this._linkText.height = 130;
        this._linkText.lineSpacing = 8;
        this._linkText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._linkText.text = "";

        this._share = new egret.Bitmap();
        this.addChild(this._share); 
        this._share.y = 28+GameValue.adaptationScreen;
       	this._share.x = 670;
        RES.getResByUrl("resource/assets/images/ui/share_nav@2x.png", (e) => { this._share.$setBitmapData(e); }, this);
        this._share.touchEnabled = true;

        this.setDB();
    }

    public upLink(str):void{
        this._linkText.text = str;
    }

    public show():void{
        GUIManager.getInstance.topLay.addChild(this);
        //链接
        Share_Link.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            CodeWndphoto.getInstance.hide();
            this._scroView.setScrollTop(0);

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target ==this._btn){//复制
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this._linkText.text;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);

            Alertpaner.getInstance.show("复制成功");
        }else if(e.target == this._share || e.target == this._downBtn){//分享
            shareView.getInstance.show();
        }
    }

    private change(e:egret.TouchEvent):void{
        // if(CodeWndphoto.getInstance!=undefined && CodeWndphoto.getInstance.parent!=undefined){
            // CodeWndphoto.getInstance.y = 1732+96+40 - this._scroView.scrollTop;
        //     CodeWndphoto.getInstance.changeY(this._scroView.scrollTop);
        // }
    }

    public addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._downBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    
        // this._scroView.addEventListener(egret.TouchEvent.CHANGE,this.change,this);
    }

    public removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._downBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        // this._scroView.removeEventListener(egret.TouchEvent.CHANGE,this.change,this);
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
		this._mShareC.graphics.beginFill(0xF8F8F8, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
	}

    private joinContent():void{
        let img1 = new egret.Bitmap();
        this._mContain.addChild(img1);
        RES.getResByUrl("resource/assets/images/ui/hphy1.png",(e)=>{img1.$setBitmapData(e); },this);

        let img1_2 = new egret.Bitmap();
        this._mContain.addChild(img1_2);
        img1_2.y = 540;
        RES.getResByUrl("resource/assets/images/ui/hphy1_2.png",(e)=>{img1_2.$setBitmapData(e); },this);

        // let img2 = new egret.Bitmap();
        // this._mContain.addChild(img2);
        // img2.y = 436;
        // RES.getResByUrl("resource/assets/images/ui/by1_mine@2x.png",(e)=>{
        //     img2.$setBitmapData(e); 
        // img2.x = (GameMain.getInstance.StageWidth - img2.width)*0.5;
        // },this);

        // let text1 = ToolMrg.getText(66,156+400,24,0xf72f52);
        // this._mContain.addChild(text1);
        // text1.lineSpacing = 10;
        // text1.height = 104;
        // text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        // text1.text = `活动对象：51彩站全体成员\n活动开始时间：${this._startTime}\n活动结束时间：${this._endTime}`;

        // let img3 = new egret.Bitmap();
        // this._mContain.addChild(img3);
        // img3.y = 280+400;
        // RES.getResByUrl("resource/assets/images/ui/bge_mine@2x.png",(e)=>{
        //     img3.$setBitmapData(e); 
        //     img3.x = (GameMain.getInstance.StageWidth - img3.width)*0.5;
        // },this);
        
        let img4 = new egret.Bitmap();
        this._mContain.addChild(img4);
        img4.y = 748+400;
        img4.x = 28;
        RES.getResByUrl("resource/assets/images/ui/by2_mine@2x.png",(e)=>{
            img4.$setBitmapData(e);
        },this);

        let img5 = new egret.Bitmap();
        this._mContain.addChild(img5);
        img5.y = 978+400;
        RES.getResByUrl("resource/assets/images/ui/ewmbg_mine@2x.png",(e)=>{
            img5.$setBitmapData(e); 
            img5.x = (GameMain.getInstance.StageWidth - img5.width)*0.5;
        },this);

        let text2 = ToolMrg.getText(0,1527+400,24,0x333333,GameMain.getInstance.StageWidth);
        // this._mContain.addChild(text2);
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "活动推广素材";

        this._downBtn = new egret.Shape();
        this._mContain.addChild(this._downBtn);
        this._downBtn.graphics.beginFill(0xF73554);
        this._downBtn.graphics.drawRect(0,0,480,72);
        this._downBtn.graphics.endFill();
        this._downBtn.y = 1592+300;
        this._downBtn.touchEnabled = true;
        this._downBtn.x = (GameMain.getInstance.StageWidth - this._downBtn.width)*0.5;

        let text3 = ToolMrg.getText(0,1592+300,28,0xffffff,GameMain.getInstance.StageWidth);
        this._mContain.addChild(text3);
        text3.height = 72;
        text3.textAlign = egret.HorizontalAlign.CENTER;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.text = "点击分享图片";

        let mZZ = new egret.Shape();
        this._mContain.addChildAt(mZZ,0);
        mZZ.graphics.beginFill(0xF8F8F8);
        mZZ.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,1724+400);
        mZZ.graphics.endFill();
    }

    private joinDown():void{
        let downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xffffff);
        downShape.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,20);
        downShape.graphics.endFill();

        let downImg1 = new egret.Bitmap();
        this._downContain.addChild(downImg1);
        downImg1.y = 58;
        RES.getResByUrl("resource/assets/images/ui/sqfs_mine@2x.png",(e)=>{
            downImg1.$setBitmapData(e); 
            downImg1.x = (GameMain.getInstance.StageWidth - downImg1.width)*0.5;
        },this);

        let downText1 = ToolMrg.getText(44,124,24,0x333333);
        this._downContain.addChild(downText1);
        downText1.lineSpacing = 10;
        downText1.textFlow = <Array<egret.ITextElement>>[
            {"text":"点击此页面上方","style":{"textColor":0x333333}},
            {"text":"【用户推荐链接】","style":{"textColor":0xf72e52}},
            {"text":"，新用户成功注册并进行存款\n后，联系在线客服申请即可。","style":{"textColor":0x333333}}
        ];

        let downImg2 = new egret.Bitmap();
        this._downContain.addChild(downImg2);
        downImg2.y = 240;
        RES.getResByUrl("resource/assets/images/ui/hdnr_mine@2x.png",(e)=>{
            downImg2.$setBitmapData(e); 
            downImg2.x = (GameMain.getInstance.StageWidth - downImg2.width)*0.5;
        },this);

        let downText2 = ToolMrg.getText(40,340+6-40,28,0xf72e52);
        this._downContain.addChild(downText2);
        downText2.text = "1.";

        let downText3 = ToolMrg.getText(40,472+6-40,28,0xf72e52);
        this._downContain.addChild(downText3);
        downText3.text = "2.";

        let downText4 = ToolMrg.getText(40,568+6-40,28,0xf72e52);
        this._downContain.addChild(downText4);
        downText4.text = "3.";

        let downText5 = ToolMrg.getText(40,628+6-40,28,0xf72e52);
        this._downContain.addChild(downText5);
        downText5.text = "4.";

        let downText6 = ToolMrg.getText(40,792+6-40,28,0xf72e52);
        this._downContain.addChild(downText6);
        downText6.text = "5.";

        let down2Text = ToolMrg.getText(70,344-40,24,0x333333);
        this._downContain.addChild(down2Text);
        down2Text.lineSpacing = 10;
        down2Text.height = 104;
        down2Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        down2Text.text = "本活动51彩站全体用户皆可参与，用户点击推荐链接分享给\n新用户注册并进行存款后即可获得对应推荐彩金，被推荐用\n户无需填写推荐码。";
            
        let down3Text = ToolMrg.getText(70,476-40,24,0x333333);
        this._downContain.addChild(down3Text);
        down3Text.lineSpacing = 10;
        down3Text.height = 68;
        down3Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        down3Text.text = "每推荐一个新用户注册并存款皆可获得一次对应用户首存金\n额的推荐彩金。";
        
        let down4Text = ToolMrg.getText(70,577-40,24,0x333333);
        this._downContain.addChild(down4Text);
        down4Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        down4Text.textFlow = <Array<egret.ITextElement>>[
            {"text":"本活动与","style":{"textColor":0x333333}},
            {"text":"【返水优惠】","style":{"textColor":0xF72E52}},
            {"text":"共享，不与其它任何优惠共享。","style":{"textColor":0x333333}}
        ];
    
        let down5Text = ToolMrg.getText(70,632-40,24,0x333333);
        this._downContain.addChild(down5Text);
        down5Text.lineSpacing = 10;
        down5Text.height = 136;
        down5Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        down5Text.text = "每位被推荐用户需满足：每一个手机号码、电子邮箱、IP地\n址、相同银行卡、同一台电脑仅可注册一个51彩站会员账号，\n如发现有违规用户，我们将保留无限期审核扣回红利及所有\n产生利润的权利。";
    
        let down6Text = ToolMrg.getText(70,796-40,24,0x333333);
        this._downContain.addChild(down6Text);
        down6Text.lineSpacing = 10;
        down6Text.height = 34;
        down6Text.verticalAlign = egret.VerticalAlign.MIDDLE;
        down6Text.text = "此活动遵循51彩站一般规则与条款。";
        
        let downZZ = new egret.Shape();
        this._downContain.addChildAt(downZZ,0);
        downZZ.graphics.beginFill(0xF8F8F8);
        downZZ.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,940);
        downZZ.graphics.endFill();
    }
}
