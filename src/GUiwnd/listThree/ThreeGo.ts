/**列3列五 前往 根据this._type判断 倍数为_multipleNum */
class ThreeGo extends egret.DisplayObjectContainer{
    private static _mInstance: ThreeGo;
	public static get getInstance(): ThreeGo {
		if (ThreeGo._mInstance == undefined)
			ThreeGo._mInstance = new ThreeGo();
		return ThreeGo._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    /**手选 */
    private _handSelect:egret.Bitmap;
    /**随机 */
    private _randomSelect:egret.Bitmap;
    private _srcItem:InjectionCode[] = [];
    private _item:GHashMap<ThreeGoInfo>;

    private _downContain:egret.DisplayObjectContainer;
    /**倍数 */
    private _multipleNum = 1;
    /**注数 */
    private _XZNum = 0;
    /**下注金额 */
    private _XZMNNum = 0;

    private _mData:NumKeyData;

    /**支付参数 */
    private _mPayData:PaymentData;
    constructor(){
        super();
        this.touchEnabled = true;
        this._item = new GHashMap<ThreeGoInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this._downContain = new egret.DisplayObjectContainer();
        //支付时传该对象
        this._mPayData = new PaymentData();
        //键盘
        this._mData = new NumKeyData();

        this.addScoll();

        this._topUI = new TopUI("排列三投注");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        let topShape = new egret.Shape();
        this.addChild(topShape);
        topShape.graphics.beginFill(0xffffff);
        topShape.graphics.drawRect(0,96+GameValue.adaptationScreen,750,100);
        topShape.graphics.endFill();

        this._handSelect = new egret.Bitmap();
        this.addChild(this._handSelect);
        this._handSelect.touchEnabled = true;
        this._handSelect.x = 28;
        RES.getResByUrl("resource/assets/images/ui/sx_home@2x.png",(e)=>{
            this._handSelect.$setBitmapData(e);
            this._handSelect.y = 96+GameValue.adaptationScreen+(100 - this._handSelect.height)*0.5;
        },this);

        this._randomSelect = new egret.Bitmap();
        this.addChild(this._randomSelect);
        this._randomSelect.touchEnabled = true;
        this._randomSelect.x = 404;
        RES.getResByUrl("resource/assets/images/ui/jx_home@2x.png",(e)=>{
            this._randomSelect.$setBitmapData(e);
            this._randomSelect.y = 96+GameValue.adaptationScreen+(100 - this._randomSelect.height)*0.5;
        },this);

        this.joinDown();
        this.setDB();
    }

    private select(e:egret.TouchEvent):void{
        if(e.target == this._handSelect){//手选
            this.hide();
        }else if(e.target == this._randomSelect){//随机
            this.randomAddList();
        }
    }

    private randomAddList():void{
        let data:InjectionCode = new InjectionCode();
        let aa = [],bb = [],cc = [],dd = [],ee = [],a=0,b=0,c=0,d=0,e=0;
        if(this._type==0){
            if(ThreeBox.getInstance.titleIndex==0){//直选
                a = Math.floor(Math.random()*10);
                b = Math.floor(Math.random()*10);
                c = Math.floor(Math.random()*10);
                aa = aa.concat(a);
                bb = bb.concat(b);
                cc = cc.concat(c); 
                data = GroupDataMrg.getInstance.group3(aa,bb,cc);
            }else if(ThreeBox.getInstance.titleIndex==1){//组三复式
                a = Math.floor(Math.random()*10);
                b = Math.floor(Math.random()*10);
                if(a==b){
                    if(a==0){
                        b+=1
                    }else{
                        b-=1;
                    }
                }
                aa = aa.concat(a,b);
                data = GroupDataMrg.getInstance.group3double(aa);
            }else if(ThreeBox.getInstance.titleIndex==2){//组六
                let src = "0123456789";
                a = Math.floor(Math.random()*src.length);
                aa = aa.concat(Number(src.charAt(a)));
                src = src.replace(src.charAt(a),"");

                b = Math.floor(Math.random()*src.length);
                aa = aa.concat(Number(src.charAt(b)));
                src = src.replace(src.charAt(b),"");

                c = Math.floor(Math.random()*src.length);
                aa = aa.concat(Number(src.charAt(c)));
                data = GroupDataMrg.getInstance.group3Six(aa);
            }
        }else if(this._type==1){
            if(FiveBox.getInstance.titleIndex==0){
                a = Math.floor(Math.random()*10);
                b = Math.floor(Math.random()*10);
                c = Math.floor(Math.random()*10);
                d = Math.floor(Math.random()*10);
                e = Math.floor(Math.random()*10);
                aa = aa.concat(a);
                bb = bb.concat(b);
                cc = cc.concat(c); 
                dd = dd.concat(d); 
                ee = ee.concat(e); 
                data = GroupDataMrg.getInstance.group5(aa,bb,cc,dd,ee);
            }
        }
        this._srcItem = this._srcItem.concat(data);
        this.upData();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._goBnt){//投注
            if(!bankcardCheck.getInstance.checkAllNum(this._multipleText.text)){
                Alertpaner.getInstance.show("倍数必须为整数");
                return;
            }

            if(this._srcItem==[]){
                Alertpaner.getInstance.show("请添加号码");
                return;
            }
            if(UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            if(this._type==0){
                //弹出支付界面
                this._mPayData.type = PaymentData.z3Type;
                this._mPayData.title = "排列三支付";
                this._mPayData.typeDesc = "排列三";
                this._mPayData.iconUrl = "pl3_home@2x.png";
                // this._mPayData.tz = this._XZNum;
                // this._mPayData.bs = this._multipleNum;
                this._mPayData.xzM = this._XZMNNum;
                this._mPayData.qs = GameValue.threeQS;
                this._mPayData.thisObj = this;
                this._mPayData.backFun = this.back;

                PaymentWnd.getInstance.show(this._mPayData);
            } else if(this._type==1) {
                //弹出支付界面
                this._mPayData.type = PaymentData.z5Type;
                this._mPayData.title = "排列五支付";
                this._mPayData.typeDesc = "排列五";
                this._mPayData.iconUrl = "pl5_home@2x.png";
                // this._mPayData.tz = this._XZNum;
                // this._mPayData.bs = this._multipleNum;
                this._mPayData.xzM = this._XZMNNum;
                this._mPayData.qs = GameValue.fiveQS;
                this._mPayData.thisObj = this;
                this._mPayData.backFun = this.back;
                PaymentWnd.getInstance.show(this._mPayData);
            }
        }else if(e.target == this._cleatBtn){//清除所有数组
            isDelect.getInstance.show();
        }else if(e.target == this._return){
            if(this._srcItem.length==0)
                this.hide();
            else
                isDelect.getInstance.show("hide");
        }
    }

    /**支付回调 */
    private back():void {
        if(this._type==0){
            Arrangement_Three.getInstance.sendHttp(this._srcItem,this._multipleNum,this._mPayData.mStr);
        } else if(this._type==1){
            Arrangement_Five.getInstance.sendHttp(this._srcItem,this._multipleNum,this._mPayData.mStr);
        }
    }

    /**类型 type=0排列三 type=1排列三 */
    private _type;
    public show(data:InjectionCode,type):void{
        this._type = type;
        this._multipleText.text = this._multipleNum+"";
        if(type==0)
            this._topUI.changeTitle("排列三投注");
        else if(type==1)
            this._topUI.changeTitle("排列五投注");
        if(data==undefined && this._srcItem.length==0){
            //不打开此页面
            //if(...) alert("每位至少选x个号码")
        }else{//保存data
            if(data!=undefined)
                this._srcItem = this._srcItem.concat(data);
            GUIManager.getInstance.tipLay.addChild(this);
            this.upData();
        }
        this.addInterception();
    }

    private upData():void{
        let index = 1;
        for(let i=0;i<this._srcItem.length;i++){
            let obj:ThreeGoInfo;
            if(this._item.GhasKey(i)){
                obj = this._item.Gget(i);
            }else{
                obj = new ThreeGoInfo();
                this._item.Gput(i,obj);
            }
            obj.aa(this._srcItem[i],i);
            obj.y = 130*(this._srcItem.length - index);
            index+=1;
            if(obj.parent==undefined)
                this._mContain.addChild(obj);
        }

        ToolMrg.upItemofArray(this._item,this._srcItem);
        let num = 0;
        for(let key of this._item.keys){
            num = num+this._item.Gget(key).getZhuNum();
        }
        this.changeDownText(num);
    }

    public removeSome(id):void{
        let aa:InjectionCode[] = [];
        for(let i=0;i<this._srcItem.length;i++){
            if(i!=id)
                aa = aa.concat(this._srcItem[i]);
        }
        // egret.log(aa);
        this._srcItem = aa;
        this.upData();
    }

    /**清除本次数据 */
    public removeAll():void{
        this._srcItem = [];
        this.upData();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this._multipleNum = 1;
        }
    }

    private changeText():void{
        this._multipleNum = Number(this._multipleText.text);
        let num = 0;
        for(let key of this._item.keys){
            num = num+this._item.Gget(key).getZhuNum();
        }
        this.changeDownText(num);
        // keyboard.getInstance.updata(this._multipleText.text);
    }

    private textInput2():void{
        if(this._multipleNum<1){
            this._multipleNum=1;
            this._multipleText.text = `${this._multipleNum}`;
            let num = 0;
            for(let key of this._item.keys){
                num = num+this._item.Gget(key).getZhuNum();
            }
            this.changeDownText(num);
        }
        // this._multipleText.type = egret.TextFieldType.INPUT;
        document.removeEventListener("keydown",this.keyboard);
        keyboard.getInstance.hide();
    }

    private open():void{
        keyboard.getInstance.show(null);
        document.addEventListener("keydown",this.keyboard);
    }

    /**键盘侦听 */
    public keyboard(event:KeyboardEvent):void{
        var that = this;
        let num = event.keyCode;
        if(num == 13){
            // ThreeGo.getInstance._multipleText.type = egret.TextFieldType.DYNAMIC;
            ThreeGo.getInstance.textInput2();
        }
    }

    private addInterception():void{
        this._randomSelect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.select,this);
        this._handSelect.addEventListener(egret.TouchEvent.TOUCH_TAP,this.select,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBnt.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cleatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        this._multipleText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.textClick,this);
        // this._multipleText.addEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_IN, this.open, this);
    }

    private removeInterception():void{
        this._randomSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.select,this);
        this._handSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.select,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBnt.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cleatBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        this._multipleText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.textClick,this);
        // this._multipleText.removeEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_IN, this.open, this);
    }

    private textClick():void{
        this._mData.str = this._multipleText.text;
        this._mData.strText = this._multipleText;
        this._mData.thisObj = this;
        this._mData.backFun = this.changeText;
        NumKeyBoard.getInstance.show(this._mData);
    }

    private _multipleText:egret.TextField;
    private _allMoney:egret.TextField;
    private _contentText:egret.TextField;
    private _goBnt:egret.Bitmap;
    private _cleatBtn:egret.Bitmap;
    private joinDown():void{
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 200;

        let bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{
            bj.$setBitmapData(e);
        },this);

        let bjShape = new egret.Shape();
        this._downContain.addChild(bjShape);
        bjShape.graphics.beginFill(0xF5F5F7);
        bjShape.graphics.drawRect(0,99,750,1.5);
        bjShape.graphics.endFill();

        this._cleatBtn = new egret.Bitmap();
        this._downContain.addChild(this._cleatBtn);
        this._cleatBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png",(e)=>{
            this._cleatBtn.$setBitmapData(e);
            this._cleatBtn.x = 26;
            this._cleatBtn.y = 120;
        },this);

        this._goBnt = new egret.Bitmap();
        this._downContain.addChild(this._goBnt);
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png",(e)=>{
            this._goBnt.$setBitmapData(e); 
            this._goBnt.x = 572;
            this._goBnt.y = 110;
        },this);
        this._goBnt.touchEnabled = true;

        let tzText = ToolMrg.getText(572,100,32,0xffffff,176);
        this._downContain.addChild(tzText);
        tzText.height = 100;
        tzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tzText.textAlign = egret.HorizontalAlign.CENTER;
        tzText.text = "投注";

        this._allMoney = ToolMrg.getText(0,114,32,0xf72e52,750);
        this._downContain.addChild(this._allMoney);
        this._allMoney.textAlign = egret.HorizontalAlign.CENTER;
        this._allMoney.text = "34元"
        
        this._contentText = ToolMrg.getText(0,164,20,0x999999,750);
        this._downContain.addChild(this._contentText);
        this._contentText.textAlign = egret.HorizontalAlign.CENTER;
        this._contentText.text = "17注1期1倍";

        let downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xcacaca);
        downShape.graphics.drawRoundRect(298,22,160,60,12);
        downShape.graphics.endFill();

        let downShapeBJ = new egret.Shape();
        this._downContain.addChild(downShapeBJ);
        downShapeBJ.graphics.beginFill(0xffffff);
        downShapeBJ.graphics.drawRoundRect(299.5,23.5,157,57,12);
        downShapeBJ.graphics.endFill();

        let downText1 = ToolMrg.getText(266,22,28,0x333333);
        this._downContain.addChild(downText1);
        downText1.height = 60;
        downText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText1.text = "投";

        let downText2 = ToolMrg.getText(266+160+38,22,28,0x333333);
        this._downContain.addChild(downText2);
        downText2.height = 60;
        downText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText2.text = "倍";

        this._multipleText = ToolMrg.getText(298,22,32,0x333333,160);
        this._downContain.addChild(this._multipleText);
        this._multipleText.height = 60;
        this._multipleText.textAlign = egret.HorizontalAlign.CENTER;
        this._multipleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._multipleText.touchEnabled = true;
        this._multipleText.text = "1";
        // this._multipleText.type = egret.TextFieldType.INPUT;
        // this._multipleText.inputType = egret.TextFieldInputType.TEXT;
    }

    private changeDownText(num):void{
        this._XZNum = num;
        this._XZMNNum = num*this._multipleNum*2;
        this._allMoney.text = `${this._XZMNNum}元`;
        if(this._type == 0) {
            this._contentText.text = `${num}注${GameValue.threeQS}期${this._multipleNum}倍`;
        } else {
            this._contentText.text = `${num}注${GameValue.fiveQS}期${this._multipleNum}倍`;
        }
    }

    /**空true  */
    public getListIsEmpty():boolean{
        if(this._srcItem.length==0)
            return true;
        else
            return false;
    }

    /**只清除数组 不刷新 */
    public clearSrcItem():void{
        this._srcItem = [];
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen+100;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y -this._scroView.y - 200;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._scroView.height );
		this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);

        let downZZ = new egret.Shape();
        this._downContain.addChildAt(downZZ,0);
        downZZ.graphics.beginFill(0xffffff);
        downZZ.graphics.drawRect(0,0,750,200);
        downZZ.graphics.endFill();
    }
}

class ThreeGoInfo extends egret.DisplayObjectContainer{
    private _text:egret.TextField;
    private _typeText:egret.TextField;
    private _closeBtn:egret.Bitmap;
    private _closeShape:egret.Shape;

    public _id;
    constructor(){
        super();

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0,0,750,10);
        shape.graphics.endFill();

        this._text = ToolMrg.getText(28,26,28,0xf72e52);
        this.addChild(this._text);
        this._text.height = 40;
        this._text.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._typeText = ToolMrg.getText(28,70,24,0x333333);
        this.addChild(this._typeText);
        this._typeText.height = 34;
        this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._closeBtn = new egret.Bitmap();
        this.addChild(this._closeBtn);
        this._closeBtn.x = 694;
        RES.getResByUrl("resource/assets/images/ui/scdd_home@2x.png",(e)=>{
            this._closeBtn.$setBitmapData(e); 
            this._closeBtn.y = 10+(120 - this._closeBtn.height)*0.5;
        },this);
        this._closeBtn.touchEnabled = true;
        this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.removeSome,this);

        this.setDB();
    }

    private _data:InjectionCode;
    public aa(data:InjectionCode,id):void{
        this._data = data;
        this._id = id;
        this._text.text = "";

        let arr = data.result.split(",");
        for(let i=0;i<arr.length;i++){
            this._text.text = `${this._text.text}${arr[i]} `;
        }

        let typeText = "";
        //类型 直选:1 组3单式:2 组三复式:3 组六:4
        if(data.type==1)
            typeText="直选";
        else if(data.type==2)
            typeText = "组三单式";
        else if(data.type==3)
            typeText = "组三复式";
        else if(data.type)
            typeText = "组六";
        this._typeText.textFlow = <Array<egret.ITextElement>>[
            {"text":`${typeText} ${data.injectionNum}注 `,style:{"textColor":0x333333}},
            {"text":`${data.injectionNum*2}元`,style:{"textColor":0xff7000}}
        ];

    }

    /**获取注数 */
    public getZhuNum():number{
        return this._data.injectionNum;
    }

    private removeSome():void{
        // ThreeGo.getInstance.removeSome(this._id);
        isDelect.getInstance.show(this._id);
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,130);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}

/**是否删除号码或者清空 */
class isDelect extends egret.DisplayObjectContainer{
    private static _mInstance: isDelect;
	public static get getInstance(): isDelect {
		if (isDelect._mInstance == undefined)
			isDelect._mInstance = new isDelect();
		return isDelect._mInstance;
	}
    
    private _mContain:egret.DisplayObjectContainer;
    private _title:egret.TextField;
    private _leftBtn:egret.Bitmap;
    private _rightBtn:egret.Bitmap;

    constructor(){
        super();
        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);

        let shape = new egret.Shape();
        this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0,0,600,240,33);
        shape.graphics.endFill();
        shape.touchEnabled = true;

        this._title = ToolMrg.getText(0,37,36,0x333333,600);
        this._mContain.addChild(this._title);
        this._title.textAlign = egret.HorizontalAlign.CENTER;

        this._leftBtn = new egret.Bitmap();
        this._mContain.addChild(this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{
            this._leftBtn.$setBitmapData(e);
            this._leftBtn.x = 14;
            this._leftBtn.y = 132;
        },this);
        this._leftBtn.touchEnabled = true;
        this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        this._rightBtn = new egret.Bitmap();
        this._mContain.addChild(this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{
            this._rightBtn.$setBitmapData(e);
            this._rightBtn.x = 312;
            this._rightBtn.y = 132;
        },this);
        this._rightBtn.touchEnabled = true;
        this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        let leftText = ToolMrg.getText(14,132,32,0x333333,276);
        this._mContain.addChild(leftText);
        leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "取消";

        let rightText = ToolMrg.getText(312,132,32,0xffffff,276);
        this._mContain.addChild(rightText);
        rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "确定";

        this.setDB();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._rightBtn){
            if(this._id == "five"){
                FiveBox.getInstance.hide();
                ThreeGo.getInstance.clearSrcItem();
            }else if(this._id=="three"){
                ThreeBox.getInstance.hide();
                ThreeGo.getInstance.clearSrcItem();
            }else if(this._id == "hide"){
                ThreeGo.getInstance.removeAll();
                ThreeGo.getInstance.hide();
            }else if(this._id==undefined)
                ThreeGo.getInstance.removeAll();
            else
                ThreeGo.getInstance.removeSome(this._id);
        }
        this.hide();
    }

    private _id;
    public show(id?):void{
        this._id = id;
        if(id==undefined){
            this._title.text = "您是否清除本次号码？"
        }else if(id=="hide" || id=="three" || id=="five"){
            this._title.text = "您是否放弃本次购买？"
        }else{
            this._title.text = "您是否要删除此号码？";
        }
        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f,0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}