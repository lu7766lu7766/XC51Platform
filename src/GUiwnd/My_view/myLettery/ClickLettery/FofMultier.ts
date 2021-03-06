/**倍数优化 */
class FofMultier extends egret.DisplayObjectContainer{
    private static _mInstance: FofMultier;
	public static get getInstance(): FofMultier {
		if (FofMultier._mInstance == undefined)
			FofMultier._mInstance = new FofMultier();
		return FofMultier._mInstance;
	}
    private _topUI:TopUI;
    private _return:egret.Shape;
    private _tipLink:egret.Shape;
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _centerContain:egret.DisplayObjectContainer;
    private _svContain:egret.DisplayObjectContainer;
    private _downContain:egret.DisplayObjectContainer;
    /**前往投注 */
    // private _goBtn:egret.Bitmap;
    /**投注金额 */
    // private _downTitle:egret.TextField;
    /**最高金额 */
    // private _downContent:egret.TextField;

    private _mItem:GHashMap<FofMultier_info>;
    /**进来时 类型为 0足球 1篮球 2超级足彩 3超级篮球 */
    private _comeType=0;
    /**选中 */
    // private _data:Strand[];
    /**是否单关 */
    private isDanGuan:boolean;

    private GSlideOb: GSlideObj;

    constructor(){
        super();

        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this._svContain = new egret.DisplayObjectContainer();
        this._mItem = new GHashMap<FofMultier_info>();
        this.GSlideOb = new GSlideObj();

        this._topUI = new TopUI("奖金方案");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        // this._tipLink = new egret.Shape();
        // this.addChild(this._tipLink);
        // this._tipLink.graphics.beginFill(0xF5F5F7);
        // this._tipLink.graphics.drawRect(0,96+GameValue.adaptationScreen,750,80);
        // this._tipLink.graphics.endFill();

        // let tipText = ToolMrg.getText(26,96+GameValue.adaptationScreen,28,0x999999);
        // this.addChild(tipText);
        // tipText.height = 80;
        // tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        // tipText.text = "如果您的方案是一个倍投的复试方案或倍投的组合…";

        // let tipBtn = new egret.Bitmap();
        // this.addChild(tipBtn);
        // tipBtn.x = 690;
        // tipBtn.y = 96+GameValue.adaptationScreen+22;
        // RES.getResByUrl("resource/assets/images/ui/wenti_home@2x.png",(e)=>{tipBtn.$setBitmapData(e); },this)

        this.addChild(this._mContain);
        this.addScoll();

        // let bit = new egret.Bitmap();
        // this._svContain.addChild(bit);
        // bit.width = GameMain.getInstance.StageWidth;
        // bit.height = this._scroView.height;
        // RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{bit.$setBitmapData(e); },this);

        this.joinCenter();
        this.joinDown();

        this.setDB();
    }

    private updata():void{
        let list:Array<RewardData>;
        if(this._data!=undefined)
            list = this._data;
        else 
            return;
        
        let objHeight = 0;
        let data:RewardData;
        for(let key=0;key<list.length;key++){
            let obj:FofMultier_info;
            if(this._mItem.GhasKey(key)){
                obj = this._mItem.Gget(key);
            }else{
                obj = new FofMultier_info();
                this._mItem.Gput(key,obj);
            }
            data = list[key];
            obj.aa(data);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._svContain.addChild(obj);
        }

        // this.GSlideOb.showDataByMap(15, 160, this._scroView, this._svContain, this._mItem);
        //文本y判断改变
        if(objHeight<this._scroView.height)
            this._downContain.y = objHeight+96+GameValue.adaptationScreen+100;
        else
            this._downContain.y = GameMain.getInstance.StageHeight-300;;
    }

    private _data:Array<RewardData> = [];
    public show(data:Array<RewardData>):void{
        GUIManager.getInstance.tipLay.addChild(this);

        this._data = data;

        this.updata();
        this.addInterception();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this.removeInterception();
            let obj:FofMultier_info;
            for(let key of this._mItem.keys){
                obj = this._mItem.Gget(key)
                if(obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }

    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }
        // else if(e.target == this._tipLink){//打开提示页面

        // }
        // else if(e.target == this._goBtn){//前往 直接进行支付
        //     if(UserData.getInstance.isLogin() == false) {
        //         LoginWnd.getInstance.show();
        //         return;
        //     }
            
        //     this._mPayData.xzM = this.getBS() * 2;
        //     PaymentWnd.getInstance.show(this._mPayData);
        // }
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        // this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        // this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }

    private joinCenter():void{
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 96+GameValue.adaptationScreen;

        let centerShape = new egret.Shape();
        this._centerContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xffffff);
        centerShape.graphics.drawRect(0,0,750,100);
        centerShape.graphics.endFill();

        let centerText1 = ToolMrg.getText(122,0,28,0x999999);
        this._centerContain.addChild(centerText1);
        centerText1.height = 100;
        centerText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText1.text = "投注内容";

        let centerText2 = ToolMrg.getText(454,0,28,0x999999);
        this._centerContain.addChild(centerText2);
        centerText2.height = 100;
        centerText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText2.text = "注数";

        let centerText3 = ToolMrg.getText(626,0,24,0x999999);
        this._centerContain.addChild(centerText3);
        centerText3.height = 100;
        centerText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText3.text = "奖金(元)";

        let centerLink = new egret.Shape();
        this._centerContain.addChild(centerLink);
        centerLink.graphics.beginFill(0xdedede);
        centerLink.graphics.drawRect(0,98.5,750,1.5);
        centerLink.graphics.endFill();
    }

    private joinDown():void{
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight-300;

        let link = new egret.Shape();
        this._downContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,1.5);
        link.graphics.endFill();

        let shape = new egret.Bitmap();
        this._downContain.addChild(shape);
        shape.width = GameMain.getInstance.StageWidth;
        shape.height = 80;
        RES.getResByUrl("resource/assets/images/ui/hui.png",(e)=>{shape.$setBitmapData(e); },this);

        let text = ToolMrg.getText(0,32,24,0x999999,GameMain.getInstance.StageWidth);
        this._downContain.addChild(text);
        text.height = 34;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "*预计奖金仅供参考，请以实际开奖奖金为准。";

    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen+100;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._svContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 300;
		this.addChild(this._scroView);
	}
}