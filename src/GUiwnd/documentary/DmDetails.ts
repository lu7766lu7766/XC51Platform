/**方案详情 */
class DmDetails extends egret.DisplayObjectContainer{
    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _topUI:TopUI;
    private _return:egret.Shape;

    private _tx:egret.Bitmap;
    private _txName:egret.TextField;
    /**vip背景 */
    private _vipBtn:egret.Bitmap;
    /**vip等级 距离背景x轴30px */
    private _LvText:egret.TextField;
    /**回报率 */
    private _rate:egret.BitmapText;
    private _rateText:egret.TextField;
    private _rateA:egret.TextField;
    /**类型图标 */
    private _typeImg:egret.Bitmap;
    /**类型 */
    private _typeText:egret.TextField;
    /** 过关方式背景 */
    private _guoBJ:egret.Bitmap;
    /**过关方式 */
    private _moneyTake:egret.TextField;
    
    private _content:egret.TextField;
    private _zgje:egret.TextField;
    private _gdje:egret.TextField;
    private _yjhb:egret.TextField;
    private _gdyj:egret.TextField;
    private _gdyjImg:egret.Bitmap;
    /**截止时间 */
    private _endTime:egret.TextField;
    /**是否开奖 且是否中奖 */
    private _staticImg:egret.Bitmap;
    /**中奖金额 */
    private _staticText:egret.TextField;

    private _centerContain:egret.DisplayObjectContainer;
    private _downContain:egret.DisplayObjectContainer;
    /**战绩 */
    public statistics:DD_Statistics;
    /**方案详情 */
    public details:DD_Detail;
    /**跟单用户 */
    public user:DD_user;

    /**单倍跟单金额 */
    private _money:number;
    /**倍数 */
    private _multiple:number;

    /**支付参数 */
    private _mPayData:PaymentData;

    /**0方案详情 1跟单用户 */
    private _index = 0;
    /**分享 */
    private _share:egret.Bitmap;

    constructor(){
        super();

        this._mData = new NumKeyData();
        this._mPayData = new PaymentData();
        this.y = GameValue.adaptationScreen;
        this.touchEnabled = true;

        this._topUI = new TopUI("方案详情",-this.y);
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        this._tx = new egret.Bitmap();
        this._mContain.addChild(this._tx);
        this._tx.touchEnabled = true;
        this._tx.width = 84;
        this._tx.height = 84;
        this._tx.x = 28;
        this._tx.y = 30;

        this._txName = ToolMrg.getText(130,24,32,0x333333);
        this._mContain.addChild(this._txName);

        this._vipBtn = new egret.Bitmap();
        this._mContain.addChild(this._vipBtn);
        this._vipBtn.y = 30;
        this._vipBtn.x = 360;
        RES.getResByUrl("resource/assets/images/ui/hydj_expert@2x.png",(e)=>{this._vipBtn.$setBitmapData(e);},this);

        this._LvText = ToolMrg.getText(150, 30, 16, 0xffffff);
        this._mContain.addChild(this._LvText);
        this._LvText.height = 24;
        this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._LvText.text = "Lv 1";

        // this._rate = ToolMrg.getText(378+128,22,48,0xf72e52,200);
        // this._mContain.addChild(this._rate);
        // this._rate.textAlign = egret.HorizontalAlign.RIGHT;

        this._rate = FontMgr.getText(FontMgr.FONT_3);
        this._mContain.addChild(this._rate);
        this._rate.x = 378+128;
        this._rate.y = 30;
        this._rate.width = 200;
        this._rate.textAlign = egret.HorizontalAlign.RIGHT;
        
        this._rateA = ToolMrg.getText(708,46,20,0xf72e52);
        this._mContain.addChild(this._rateA);
        this._rateA.text = "%";

        this._rateText = ToolMrg.getText(622,78,20,0xF72E52);
        this._mContain.addChild(this._rateText);
        this._rateText.text = "命中率";

        this.statistics = new DD_Statistics();
        this._mContain.addChild(this.statistics);
        this.statistics.y = 86;
        this.statistics.x = 130;

        let topShape = new egret.Shape();
        this._mContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0,142,750,1.5);
        topShape.graphics.endFill();

        this._typeImg = new egret.Bitmap();
        this._mContain.addChild(this._typeImg);
        this._typeImg.width = 32;
        this._typeImg.height = 32;
        this._typeImg.x = 28;
        this._typeImg.y = 170;

        this._typeText = ToolMrg.getText(66,166,28,0x333333);
        this._mContain.addChild(this._typeText);
        this._typeText.height = 50;
        this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._guoBJ = new egret.Bitmap();
        this._mContain.addChild(this._guoBJ);
        this._guoBJ.x = 196;
        this._guoBJ.y = 174;
        RES.getResByUrl("resource/assets/images/ui/czbg_expert@2x.png",(e)=>{this._guoBJ.$setBitmapData(e); },this);

        this._moneyTake = ToolMrg.getText(196,174,20,0xFF7000,72);
        this._mContain.addChild(this._moneyTake);
        this._moneyTake.height = 24;
        this._moneyTake.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moneyTake.textAlign = egret.HorizontalAlign.CENTER;
        // this._moneyTake.text = "过关方式：";

        this._content = ToolMrg.getText(28,226,24,0x333333,694);
        this._mContain.addChild(this._content);
        this._content.lineSpacing = 14;

        this._zgje = ToolMrg.getText(28,268,24,0x333333);
        this._mContain.addChild(this._zgje);
        this._zgje.height = 34;
        this._zgje.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._zgje.text = "自购金额：";

        this._gdje = ToolMrg.getText(368,268,24,0x333333);
        this._mContain.addChild(this._gdje);
        this._gdje.height = 34;
        this._gdje.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._gdje.text = "跟单金额：";

        this._yjhb = ToolMrg.getText(28,310,24,0x333333);
        this._mContain.addChild(this._yjhb);
        this._yjhb.height = 34;
        this._yjhb.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._yjhb.text = "预计回报：";

        this._gdyj = ToolMrg.getText(368,310,24,0x333333);
        this._mContain.addChild(this._gdyj);
        this._gdyj.height = 34;
        this._gdyj.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._gdyj.text = "跟单佣金：";

        this._endTime = ToolMrg.getText(308+168,174,20,0x999999,250);
        this._mContain.addChild(this._endTime);
        this._endTime.textAlign = egret.HorizontalAlign.RIGHT;

        this._gdyjImg = new egret.Bitmap();
        this._mContain.addChild(this._gdyjImg);
        RES.getResByUrl("resource/assets/images/ui/wt_expert@2x.png",(e)=>{
            this._gdyjImg.$setBitmapData(e); 
        },this);
        this._gdyjImg.touchEnabled = true;
        // this._gdyjImg.visible = false;
        this._gdyjImg.x = 526;
        this._gdyjImg.y = 314;

        this._staticImg = new egret.Bitmap();
        this._mContain.addChild(this._staticImg);
        this._staticImg.x = 546;
        this._staticImg.y = 120;

        this._staticText = ToolMrg.getText(519,126,20,0xf72e52,150);
        this._mContain.addChild(this._staticText);
        this._staticText.height = 94;
        this._staticText.textAlign = egret.HorizontalAlign.CENTER;
        this._staticText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._staticText.skewY = -23.5;
        this._staticText.skewX = -23.5;

        this.joinCenter();
        this.joinDown();

        this._share = new egret.Bitmap();
        this.addChild(this._share); 
        this._share.y = 28+GameValue.adaptationScreen;
       	this._share.x = 670;
        RES.getResByUrl("resource/assets/images/ui/share_nav@2x.png", (e) => { this._share.$setBitmapData(e); }, this);
        this._share.touchEnabled = true;

        this.setDB();
    }

    private _data:GD_DetailData;
    public updata(data:GD_DetailData):void{
        if(this._oid!=data.oid)return;

        this._data = data;
        if(data.txSrc==undefined || data.txSrc == "")
            RES.getResByUrl("resource/assets/images/ui/user1_default.png",(e)=>{this._tx.$setBitmapData(e); },this);
        else
            // LoadNetPic.getLoadNetPic.loadPic(`${data.txSrc}`,(e)=>{this._tx.$setTexture(e); },this);
            RES.getResByUrl(`resource/assets/images/ui/tou${data.txSrc}.png`,(e)=>{this._tx.$setTexture(e); },this);

        this.statistics.updata(data.ji,data.zh,data.endArr);

        this._txName.text = data.txName;
        this._vipBtn.x = this._txName.x + this._txName.textWidth+8;
        this._LvText.x = this._txName.x + this._txName.textWidth+8+30;
        this._LvText.text = `vip ${data.vip}`;
        this._endTime.text = `截止 ${ToolMrg.getTime7(data.endTime)}`;

        let str = "";
        if(data._type==1){
            str = "单关";
        }else{
            str = `${data._type}串1`;
        }
        this._moneyTake.text = str;

        data.model
        if(data._typeStatic==1){
            this._typeText.text = "竞足串关";
            RES.getResByUrl("resource/assets/images/ui/jzcg_home@2x.png",(e)=>{this._typeImg.$setBitmapData(e); },this);
        }else if(data._typeStatic==2){
            this._typeText.text = "竞足单关";
            RES.getResByUrl("resource/assets/images/ui/jzdg_home@2x.png",(e)=>{this._typeImg.$setBitmapData(e); },this);
        }else if(data._typeStatic==4){
            this._typeText.text = "竞篮单关";
            RES.getResByUrl("resource/assets/images/ui/jldg_home@2x.png",(e)=>{this._typeImg.$setBitmapData(e); },this);
        }else if(data._typeStatic==3){
            this._typeText.text = "竞篮串关";
            RES.getResByUrl("resource/assets/images/ui/jlcg_home@2x.png",(e)=>{this._typeImg.$setBitmapData(e); },this);
        }

        let toF = Number(data.lv);
        this._rate.text = toF==0?"0.00":ToolMrg.getDecimal(toF,2).toFixed(2);
        // this._rate.text = data.lv;

        this._content.text = ToolMrg.nameMode2(60,data.declare);;

        this._money = ToolMrg.getDecimal(data.total/100/data._b,2);
        this._multiple = 1;

        this._zgje.y = this._content.y+this._content.textHeight+10;
        this._yjhb.y = this._content.y+this._content.textHeight+52;
        this._gdje.y = this._content.y+this._content.textHeight+10;
        this._gdyj.y = this._content.y+this._content.textHeight+52;
        this._centerContain.y = this._content.y+this._content.textHeight+108;

        this._zgje.textFlow = <Array<egret.ITextElement>>[
            {"text":"自购金额：",style:{"textColor":0x333333}},
            {"text":`${ToolMrg.getDecimal((data.total/100),2).toFixed(0)}元`,style:{"textColor":0xf72f53}}
        ];
        this._gdje.textFlow = <Array<egret.ITextElement>>[
            {"text":"跟单金额：",style:{"textColor":0x333333}},
            {"text":`${ToolMrg.getDecimal((data.g_total/100),2)}元`,style:{"textColor":0xf72f53}}
        ];
        this._yjhb.textFlow = <Array<egret.ITextElement>>[
            {"text":"预计回报：",style:{"textColor":0x333333}},
            {"text":`${ToolMrg.getDecimal((data.hr/100),2).toFixed(0)}元`,style:{"textColor":0xf72f53}}
        ];
        this._gdyj.textFlow = <Array<egret.ITextElement>>[
            {"text":"跟单佣金：",style:{"textColor":0x333333}},
            {"text":`${data.rate}%`,style:{"textColor":0xf72f53}}
        ];
        this._gdyjImg.y = this._gdyj.y+4;

        this._gdyjImg.x = this._gdyj.x + this._gdyj.textWidth + 10;

        /**跟单用户数 */
        this._withNum.text = `${data.num}`;

        this.changeTextCss();

        if(this.details.visible)
            this.details.updata(data);
        if(this.user.visible)
            this.user.updata(data);

        if(data.t==0){
            RES.getResByUrl(null,(e)=>{this._staticImg.$setBitmapData(e); },this);
            this._staticText.text = "";
        }else if(data.t==1){
            RES.getResByUrl("resource/assets/images/ui/wzj_expert@2x.png",(e)=>{this._staticImg.$setBitmapData(e); },this);
            this._staticText.text = "";
        }else if(data.t==2){
            RES.getResByUrl("resource/assets/images/ui/yzj_expert@2x.png",(e)=>{this._staticImg.$setBitmapData(e); },this);
            this._staticText.text = `${(data.money/100).toFixed(2)}元`;
        }
    }

    private _oid:string;
    /**1:足球串关    2:足球单关   3:篮球串关   4:篮球单关 */
    private _type:string;
    /**订单号 类型 是否截止购买：有参就为截止 传入发单人个人 */
    public show(oid:string,type,psId,isEnd?):void{
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this._oid = oid;
        this._type = type;
        // this.updata();
        this.changeCenter();

        if(isEnd!=undefined){
            this._downContain.visible = false;
            this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        }else{
            if(psId == UserData.getInstance.userId){//发单人是自己
                this._downContain.visible = false;
                this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
                this._share.visible = true;
            }else{//发单人不是自己
                this._downContain.visible = true;
                this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 218;
                this._share.visible = false;
            }
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();

            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._gdyjImg){//跟单佣金提示
            DmDetailTip.getInstance.show();
        }else if(e.target == this._return){
            this.hide();
        }else if(e.target == this._share){//分享
            let toF = Number(this._data.lv);
            LotteryShare.getInstance.show(toF==0?"0.00":ToolMrg.getDecimal(toF,2).toFixed(2));
        }else if(e.target == this._tx){//打开个人详情
            // if(DmC_infoMsg.phID!=undefined && this._data.id!=DmC_infoMsg.phID){
            //     this.hide();
            // }else{
            //     DmC_infoMsg.personalHome = new PersonalHome();
            //     DmC_infoMsg.personalHome.show();
            // }
        }else if(e.target == this._downClick){//果断跟单
            if(UserData.getInstance.isLogin() == false){
                LoginWnd.getInstance.show();
                return;
            }
            if(!bankcardCheck.getInstance.checkAllNum(this._downRightText.text)){
                Alertpaner.getInstance.show("倍数必须为整数");
                return;
            }
            if(this._data._typeStatic==2 || this._data._typeStatic==4){//单关
                if((this._money)*this._multiple>200000){
                    Alertpaner.getInstance.show("单关下注上限为20万");
                    return;
                }
            }else{//串关跟单
                if((this._money)*this._multiple>100000){
                    Alertpaner.getInstance.show("串关下注上限为10万");
                    return;
                }
            }
            
            
            this._multiple//当前倍数
            this._money//当前单倍跟单金额
            if(this._data._typeStatic==1){
                this._mPayData.type=1;
                this._mPayData.title = "竞足串关支付";
                this._mPayData.typeDesc = "竞足串关";
                this._mPayData.iconUrl = "jzcg_home@2x.png";
            }else if(this._data._typeStatic==2){
                this._mPayData.type=1;
                this._mPayData.title = "竞足单关支付";
                this._mPayData.typeDesc = "竞足单关";
                this._mPayData.iconUrl = "jzdg_home@2x.png";
            }else if(this._data._typeStatic==3){
                this._mPayData.type=2;
                this._mPayData.title = "篮球串关支付";
                this._mPayData.typeDesc = "篮球串关";
                this._mPayData.iconUrl = "jlcg_home@2x.png";
            }else if(this._data._typeStatic==4){
                this._mPayData.type=2;
                this._mPayData.title = "篮球单关支付";
                this._mPayData.typeDesc = "篮球单关";
                this._mPayData.iconUrl = "jldg_home@2x.png";
            }

            this._mPayData.xzM = ToolMrg.getDecimal(this._money*this._multiple,2);
            if(this._mPayData.xzM < 30) {
                Alertpaner.getInstance.show("跟单金额最低30元起");
                return ;
            }

            this._mPayData.qs = 0;
            this._mPayData.thisObj = this;
            this._mPayData.backFun = this.gdback;

            PaymentWnd.getInstance.show(this._mPayData);
        }
    }

    /**跟单回调支付 */
    private gdback():void{
        let num:number;
        if(this._data._typeStatic==1 || this._data._typeStatic == 2)//足球串关单关
            num=1;
        else if(this._data._typeStatic==3 || this._data._typeStatic == 4)//篮球串关单关
            num=2;
        else if(this._data._typeStatic==5)
            num=3;
        else 
            num=4;
        SetGD_Buy.getInstance.sendHttp(UserData.getInstance.userId,num,this._data.oid,this._multiple,this._money*100*this._multiple,this._mPayData.mStr);
    }

    public addInterception():void{
        this._detail.addEventListener(egret.TouchEvent.TOUCH_TAP,this.centerClick,this);
        this._user.addEventListener(egret.TouchEvent.TOUCH_TAP,this.centerClick,this);
        this._gdyjImg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._downClick.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._share.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        // this._downRightText.addEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        this._downRightText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.textClick,this);
        // this._downRightText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);

        // this._downRightText.addEventListener(egret.Event.FOCUS_IN, this.open, this);
    }

    public removeInterception():void{
        this._detail.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.centerClick,this);
        this._user.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.centerClick,this);
        this._gdyjImg.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._downClick.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._share.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        // this._downRightText.removeEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        this._downRightText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.textClick,this);
        // this._downRightText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);

        // this._downRightText.removeEventListener(egret.Event.FOCUS_IN, this.open, this);
    }

    private _mData:NumKeyData;
    private textClick():void{
        this._mData.str = this._downRightText.text;
        this._mData.strText = this._downRightText;
        this._mData.thisObj = this;
        this._mData.backFun = this.changeTextCss;
        NumKeyBoard.getInstance.show(this._mData);
    }

    private changeText():void{
        this.changeTextCss();
        // keyboard.getInstance.updata(this._downRightText.text);
    }

    private textInput2():void{
        if(this._multiple<1){
            this._multiple=1;
            this._downRightText.text = `${this._multiple}`;
            this.changeTextCss();
        }
        // this._downRightText.type = egret.TextFieldType.INPUT;
        document.removeEventListener("keydown",this.keyboard);
        keyboard.getInstance.hide();
    }

    /**键盘侦听 */
    public keyboard(event:KeyboardEvent):void{
        var that = this;
        let num = event.keyCode;
        if(num == 13){
            // DmC_infoMsg.dmdetail._downRightText.type = egret.TextFieldType.DYNAMIC;
            DmC_infoMsg.dmdetail.textInput2();
        }
    }

    private changeTextCss():void{
        this._multiple = Number(this._downRightText.text);
        this._downLetfText.textFlow = <Array<egret.ITextElement>>[
            {"text":`${this._multiple}倍, `,"style":{"textColor":0x333333}},
            {"text":`${((this._money)*this._multiple).toFixed(2)}元`,"style":{"textColor":0xf72e52}}
        ];
    }

    private _user:egret.TextField;
    private _detail:egret.TextField;
    private _centerLink:egret.Shape;
    /**跟单用户数 */
    private _withNum:egret.TextField;
    private _withShape:egret.Shape;
    private joinCenter():void{
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 366;

        let centerShape = new egret.Shape();
        this._centerContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xf5f5f7);
        centerShape.graphics.drawRect(0,0,750,10);
        centerShape.graphics.endFill();

        this._detail = ToolMrg.getText(0,10,28,0x999999,375);
        this._centerContain.addChild(this._detail);
        this._detail.height = 64;
        this._detail.textAlign = egret.HorizontalAlign.CENTER;
        this._detail.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._detail.text = "方案详情";
        this._detail.touchEnabled = true;

        this._user = ToolMrg.getText(375,10,28,0x999999,375);
        this._centerContain.addChild(this._user);
        this._user.height = 64;
        this._user.textAlign = egret.HorizontalAlign.CENTER;
        this._user.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._user.text = "跟单用户";
        this._user.touchEnabled = true;

        this._centerLink = new egret.Shape();
        this._centerContain.addChild(this._centerLink);
        this._centerLink.graphics.beginFill(0xF96D67);
        this._centerLink.graphics.drawRoundRect(133.5,60,108,4,4);
        this._centerLink.graphics.endFill();

        this._withShape = new egret.Shape();
        this._centerContain.addChild(this._withShape);
        this._withShape.graphics.beginFill(0xF72E52);
        this._withShape.graphics.drawEllipse(622,18,26,26);
        this._withShape.graphics.endFill();

        this._withNum = ToolMrg.getText(622,18,16,0xffffff);
        this._centerContain.addChild(this._withNum);
        this._withNum.bold = true;
        this._withNum.width = 26;
        this._withNum.height = 26;
        this._withNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._withNum.textAlign = egret.HorizontalAlign.CENTER;
        this._withNum.text = "0"

        let ctLink = new egret.Shape();
        this._centerContain.addChild(ctLink);
        ctLink.graphics.beginFill(0xdedede);
        ctLink.graphics.drawRect(0,64,750,1.5);
        ctLink.graphics.endFill();

        this.details = new DD_Detail();
        this._centerContain.addChild(this.details);
        this.details.y = 65.5;

        this.user = new DD_user();
        this._centerContain.addChild(this.user);
        this.user.y = 65.5;
    }

    private centerClick(e:egret.TouchEvent):void{
        if(e.target == this._detail){
            if(this._index==0)return;
            this._index=0;
        }else if(e.target == this._user){
            if(this._index==1)return;
            this._index=1;
        }
        this.changeCenter();
    }

    private changeCenter():void{
        if(this._index == 0){
            this._detail.textColor = 0xf72d52;
            this._user.textColor = 0x999999;
            this._centerLink.x = 0;
            this.details.show(this._data);
            this.user.hide();
            this._mContain.height = 426 + this.details.height;
        }else if(this._index == 1){
            this._detail.textColor = 0x999999;
            this._user.textColor = 0xf72d52;
            this._centerLink.x = 375;
            this.details.hide();
            this.user.show(this._data);
            this._mContain.height = 426 + this.user.height+20;
        }

    }
    /** n倍，x元 */
    private _downLetfText:egret.TextField;
    /**设置倍数 */
    private _downRightText:egret.TextField;
    private _downClick:egret.Bitmap;
    private _downBtnText:egret.TextField;
    private joinDown():void{
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 218;

        let bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{
            bj.$setBitmapData(e);
            var rect:egret.Rectangle = new egret.Rectangle(0,50,750,60);
            bj.scale9Grid = rect;
            bj.y = -10;
            bj.height = 218;
        },this);

        this._downLetfText = ToolMrg.getText(28,28,28,0x333333,500);
        this._downContain.addChild(this._downLetfText);
        this._downLetfText.textFlow = <Array<egret.ITextElement>>[
            {"text":"1倍, ","style":{"textColor":0x333333}},
            {"text":" 元","style":{"textColor":0xf72e52}}
        ];

        let downText1 = ToolMrg.getText(544,28,28,0x333333);
        this._downContain.addChild(downText1);
        downText1.text = "投";

        let downText2 = ToolMrg.getText(544+112+38,28,28,0x333333);
        this._downContain.addChild(downText2);
        downText2.text = "倍";

        let downBox = new egret.Shape();
        this._downContain.addChild(downBox);
        downBox.graphics.beginFill(0xdedede);
        downBox.graphics.drawRoundRect(578,22,112,40,15);
        downBox.graphics.endFill();

        let downBoxZZ = new egret.Shape();
        this._downContain.addChild(downBoxZZ);
        downBoxZZ.graphics.beginFill(0xffffff);
        downBoxZZ.graphics.drawRoundRect(579.5,23.5,109,37,15);
        downBoxZZ.graphics.endFill();

        this._downClick = new egret.Bitmap();
        this._downContain.addChild(this._downClick);
        this._downClick.touchEnabled = true;
        this._downClick.y = 92;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png",(e)=>{
            this._downClick.$setBitmapData(e);
            this._downClick.x = (750-this._downClick.width)*0.5;
        },this);

        this._downRightText = ToolMrg.getText(578,22,28,0x333333,112);
        this._downContain.addChild(this._downRightText);
        this._downRightText.height = 40;
        this._downRightText.textAlign = egret.HorizontalAlign.CENTER;
        this._downRightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._downRightText.text = "1";
        // this._downRightText.type = egret.TextFieldType.INPUT;
        // this._downRightText.inputType = egret.TextFieldInputType.TEXT;
        this._downRightText.touchEnabled = true;

        this._downBtnText = ToolMrg.getText(0,122,36,0xffffff,750);
        this._downContain.addChild(this._downBtnText);
        this._downBtnText.textAlign = egret.HorizontalAlign.CENTER;
        this._downBtnText.text = "果断跟单";
    }

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96;
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
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 400);
        this._mShareC.graphics.endFill();
		this._mContain.addChildAt(this._mShareC, 0);

        let zz = new egret.Shape();
        this.addChildAt(zz,0);
        zz.graphics.beginFill(0xffffff);
        zz.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        zz.graphics.endFill();
	}
}