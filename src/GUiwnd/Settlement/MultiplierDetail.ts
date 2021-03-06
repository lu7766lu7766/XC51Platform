/**倍数优化 */
class MultiplierDetail extends egret.DisplayObjectContainer{
    private static _mInstance: MultiplierDetail;
	public static get getInstance(): MultiplierDetail {
		if (MultiplierDetail._mInstance == undefined)
			MultiplierDetail._mInstance = new MultiplierDetail();
		return MultiplierDetail._mInstance;
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
    private _goBtn:egret.Bitmap;
    /**投注金额 */
    private _downTitle:egret.TextField;
    /**最高金额 */
    private _downContent:egret.TextField;

    private _mItem:GHashMap<MlContentInfo>;
    /**进来时 类型为 0足球 1篮球 2超级足彩 3超级篮球 */
    private _comeType=0;
    /**选中 */
    private _data:Strand[];
    private isDanGuan:boolean;
    /**选中 保存几串几 */
    private _strandItem:number[] = [];
    /**支付参数 */
    private _mPayData:PaymentData;
    /**倍数 */
    private _mBS:number = 1;

    private GSlideOb: GSlideObj;

    constructor(){
        super();

        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this._svContain = new egret.DisplayObjectContainer();
        this._mItem = new GHashMap<MlContentInfo>();
        this.GSlideOb = new GSlideObj();

        this._topUI = new TopUI("倍数优化");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._tipLink = new egret.Shape();
        this.addChild(this._tipLink);
        this._tipLink.graphics.beginFill(0xF5F5F7);
        this._tipLink.graphics.drawRect(0,96+GameValue.adaptationScreen,750,80);
        this._tipLink.graphics.endFill();

        let tipText = ToolMrg.getText(26,96+GameValue.adaptationScreen,28,0x999999);
        this.addChild(tipText);
        tipText.height = 80;
        tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tipText.text = "如果您的方案是一个倍投的复试方案或倍投的组合…";

        let tipBtn = new egret.Bitmap();
        this.addChild(tipBtn);
        tipBtn.x = 690;
        tipBtn.y = 96+GameValue.adaptationScreen+22;
        RES.getResByUrl("resource/assets/images/ui/wenti_home@2x.png",(e)=>{tipBtn.$setBitmapData(e); },this)

        this.addChild(this._mContain);
        this.addScoll();
        this.joinCenter();
        this.joinDown();

        this.setDB();
    }

    /**获取全部下注倍数 */
    private getBS():number {
        let num:number = 0;
        let data:MlContentInfo;
        for(let key of this._mItem.keys) {
            data = this._mItem.Gget(key);
            if(data.parent!=undefined)
                num += data.getXZJE();
        }
        return num;
    }

    /**获取下注金额 */
    public getJJ():number {
        let max:number = 0;
        let data:MlContentInfo;
        for(let key of this._mItem.keys) {
            data = this._mItem.Gget(key);
            if(data.parent != undefined) {
                // if(max < data.getJJ()) {
                //     max = data.getJJ()
                // }
                max += data.getJJ()
            }
        }
        max = Math.round(max*100);
		max /= 100;
        return max;
    }

    private updata():void{
        let list:Array<BSYHData> = GuessingFootballMrg.getInstance.getStrandList(this._data, this._strandItem, this._comeType,this.isDanGuan);
        
        let objHeight = 0;
        let data:BSYHData;
        for(let key=0;key<list.length;key++){
            let obj:MlContentInfo;
            if(this._mItem.GhasKey(key)){
                obj = this._mItem.Gget(key);
            }else{
                obj = new MlContentInfo();
                this._mItem.Gput(key,obj);
            }
            data = list[key];
            obj.addInterception();
            obj.setBS(this._mBS);
            obj.aa(key,this._data,data,this._comeType);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this._svContain.addChild(obj);
        }

        // this.GSlideOb.showDataByMap(15, 160, this._scroView, this._svContain, this._mItem);
        this.changeMultiplier();
    }

    /**倍数更变时 金额和最高奖金变化 */
    public changeMultiplier():void{
        // let money = 0;
        // let bonus = 0;
        // for(let key of this._mItem.keys){//计算
        //     let obj = this._mItem.Gget(key);
        //     bonus = bonus + obj.getMoney();
        //     money = money + obj.getMultiplier()*2;
        // }
        this._downTitle.text = `￥${this.getBS()*2}`;
        this._downContent.text = `￥${this.getJJ().toFixed(2)}`;
    }

    public show(data:Strand[],strandItem:number[],comeType:number,payData:PaymentData,isDanGuan:boolean,bs:number):void{
        GUIManager.getInstance.tipLay.addChild(this);

        this._data = data;
        this._comeType = comeType;
        this._strandItem = strandItem;
        this._mBS = bs;

        this._mPayData = payData;
        this.isDanGuan = isDanGuan;
        this.updata();
        this.addInterception();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this.removeInterception();
            let obj:MlContentInfo;
            for(let key of this._mItem.keys){
                obj = this._mItem.Gget(key)
                obj.removeInterception();
                if(obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._tipLink){//打开提示页面

        }else if(e.target == this._goBtn){//前往 直接进行支付
            if(UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }

            if(this.isDanGuan==false){//串关
                if(this.getBS()*2>100000){
                    Alertpaner.getInstance.show("串关下注上限为10万");
                    return;
                }
            }else{//单关
                if(this.getBS()*2>200000){
                    Alertpaner.getInstance.show("单关下注上限为20万");
                    return;
                }
            }

            if(this.getJJ()>500000){
                Alertpaner.getInstance.show("最高赔付上限为50万");
                return;
            }
            
            this._mPayData.xzM = this.getBS() * 2;
            PaymentWnd.getInstance.show(this._mPayData);
        }
    }

    private addInterception():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
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
        this._centerContain.y = 96+GameValue.adaptationScreen+80;

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
        centerText2.text = "倍数";

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
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;

        let bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{bj.$setBitmapData(e); },this);

        let downTitle = ToolMrg.getText(28,18,32,0x333333);
        this._downContain.addChild(downTitle);
        downTitle.bold = true;
        downTitle.text = "投注金额：";

        let downContent = ToolMrg.getText(28,65,22,0x333333);
        this._downContain.addChild(downContent);
        downContent.text = "预测最高奖金：";

        this._downTitle = ToolMrg.getText(25+downTitle.textWidth,18,32,0xfa294e);
        this._downContain.addChild(this._downTitle);
        // this._downTitle.text = "￥1000000元";


        this._downContent = ToolMrg.getText(25+downContent.textWidth,65,22,0xfa294e);
        this._downContain.addChild(this._downContent);
        // this._downContent.text = "￥1000000元";

        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        this._goBtn.x = 556;
        this._goBtn.y = 10;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png",(e)=>{this._goBtn.$setBitmapData(e); },this);

        let goBtnText = ToolMrg.getText(612,34,32,0xffffff);
        this._downContain.addChild(goBtnText);
        goBtnText.text = "投注";
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen+80+100;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._svContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
		this.addChild(this._scroView);
	}
}