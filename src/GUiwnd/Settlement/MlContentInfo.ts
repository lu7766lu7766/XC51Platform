/**投注内容 new */
class MlContentInfo extends egret.DisplayObjectContainer{
    /**内容 */
    private _topText:egret.TextField;//1串1
    private _centerText:egret.TextField;//全北现代=让胜[2.37]
    /**奖金 */
    private _moneyText:egret.TextField;
    private _money:number=0;
    /**倍数(文字) 默认1 */
    private _MultiplierText:egret.TextField;
    private _Multiplier:number=1;

    private _jianBtn:egret.Shape;
    private _jiaBtn:egret.Shape;

    private _isInterception=false;

    constructor(){
        super();

        let link1 = new egret.Shape();
        this.addChild(link1);
        link1.graphics.beginFill(0xDEDEDE);
        link1.graphics.drawRect(0,158.5,750,1.5);
        link1.graphics.endFill();

        let link2 = new egret.Shape();
        this.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(372,0,1.5,160);
        link2.graphics.endFill();

        let link3 = new egret.Shape();
        this.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(592,0,1.5,160);
        link3.graphics.endFill();

        this._topText = ToolMrg.getText(20,0,24,0xff7000,40);
        this.addChild(this._topText);
        this._topText.lineSpacing = 4;
        this._topText.height = 160;
        this._topText.textAlign = egret.HorizontalAlign.CENTER;
        this._topText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._centerText = ToolMrg.getText(48,0,22,0x333333,326);
        this.addChild(this._centerText);
        this._centerText.lineSpacing = 5;
        this._centerText.height = 160;
        this._centerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._centerText.textAlign = egret.HorizontalAlign.CENTER;

        this._moneyText = ToolMrg.getText(592,0,32,0xf72e52,158);
        this.addChild(this._moneyText);
        this._moneyText.height = 160;
        this._moneyText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moneyText.textAlign = egret.HorizontalAlign.CENTER;

        let control = new egret.Bitmap();
        this.addChild(control);
        control.x = 394;
        control.y = 52;
        RES.getResByUrl("resource/assets/images/ui/bsjj_home@2x.png",(e)=>{control.$setBitmapData(e); },this)

        this._MultiplierText = ToolMrg.getText(434,52,32,0x333333,100);
        this.addChild(this._MultiplierText);
        this._MultiplierText.height = 60;
        this._MultiplierText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._MultiplierText.textAlign = egret.HorizontalAlign.CENTER;
        this._MultiplierText.text = "1";
        this._MultiplierText.type = egret.TextFieldType.INPUT;
        this._MultiplierText.inputType = egret.TextFieldInputType.TEXT;

        this._jianBtn = new egret.Shape();
        this.addChild(this._jianBtn);
        this._jianBtn.graphics.beginFill(0x1f1f1f,0.001);
        this._jianBtn.graphics.drawRect(394,52,40,60);
        this._jianBtn.graphics.endFill();
        this._jianBtn.touchEnabled = true;

        this._jiaBtn = new egret.Shape();
        this.addChild(this._jiaBtn);
        this._jiaBtn.graphics.beginFill(0x1f1f1f,0.001);
        this._jiaBtn.graphics.drawRect(394+140,52,40,60);
        this._jiaBtn.graphics.endFill();
        this._jiaBtn.touchEnabled = true;

        this.setDB();
    }

    private _mShareC: egret.Bitmap;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Bitmap();
		// this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		// this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,160);
        // this._mShareC.graphics.endFill();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 160;
        RES.getResByUrl("resource/assets/images/ui/hui.png",(e)=>{this._mShareC.$setBitmapData(e); },this)
		this.addChildAt(this._mShareC, 0);
    }

    private _id;
    /**选中 */
    private _listStrand:Strand[];
    private _bsYHData:BSYHData;
    /**类型 0足球 1篮球 2超级足彩 3超级篮球 */
    private _comeType:number;

    /**设置倍数 */
    public setBS(bs:number):void {
        this._MultiplierText.text = ""+bs;
        this._Multiplier = bs;
    }

    public aa(id,listStrand:Array<Strand>,bsYHData:BSYHData,comeType:number):void{
        this._id = id;
        this._listStrand = listStrand;
        this._bsYHData = bsYHData;
        this._comeType = comeType;
        this._topText.text = bsYHData.cType +"\n串\n1";
        let str:string = "";
        let objData:Subscription;
        let bs:number = 1;

        let typeList:Array<any>;
        //选中对应类型数组
        if(comeType==0||comeType==2)
            typeList = FootballDataMrg.getInstance.fbNameItem;
        else if(comeType==1||comeType==3)
            typeList = BasketballDataMrg.getInstance.BasketballList;
        
        for(let i = 0; i < bsYHData.list.length;i++) {
            objData = bsYHData.list[i];
            if(i<5)
                str += objData.obj.team_a_name +"="+typeList[objData.xb]+"["+objData.obj.listSX[objData.xb] +"] \n";
            bs *= objData.obj.listSX[objData.xb];
        }
        if(bsYHData.list.length>5){
            str = str+"......";
        }else{
            str = str.substring(0,str.length-2);
        }
        this._centerText.text = str;
        bs = Math.round(bs * 100 * this._Multiplier);
        bs /= 100;
        this._moneyText.text = ""+bs * 2;
        this._money = Number(this._moneyText.text)
    }

    private changeText():void{
        this._Multiplier = Math.floor(Number(this._MultiplierText.text));
        if(this._Multiplier > 1) {
            if(this._bsYHData != undefined) {
                GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, this._Multiplier);
            }
            this.aa(this._id, this._listStrand, this._bsYHData,this._comeType);   
        }
        MultiplierDetail.getInstance.changeMultiplier();
    }

    /**获取下注倍数 */
    public getXZJE():number {
        return this._Multiplier;
    }

    /**获取奖金 */
    public getJJ():number {
        return this._money;
    }

    private textInput2() {
		if (this._Multiplier < 1) {
            this._Multiplier = 1;
		} 
        this._MultiplierText.text = ""+this._Multiplier;
        GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, this._Multiplier);
        this.aa(this._id, this._listStrand, this._bsYHData,this._comeType);   
        MultiplierDetail.getInstance.changeMultiplier();
	}

    private touchDown(e:egret.TouchEvent){
        if(e.target == this._jianBtn){//减
            if(this._MultiplierText.text=="1")return;
            this._MultiplierText.text = `${Number(this._MultiplierText.text)-1}`
        }else if(e.target == this._jiaBtn){//加
            this._MultiplierText.text = `${Number(this._MultiplierText.text)+1}`
        }
        this.changeText();
        if(this._MultiplierText.text=="1"){
            this.textInput2();
        }
    }

    public addInterception():void{
        if(!this._isInterception){
            this._MultiplierText.addEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
            this._MultiplierText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
            this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        if(this._isInterception){
            this._Multiplier = 1;
            this._MultiplierText.text = ""+this._Multiplier;
            GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, 1);

            this._MultiplierText.removeEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
            this._MultiplierText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
            this._jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }
}