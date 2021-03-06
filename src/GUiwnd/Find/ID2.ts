class ID2 extends egret.DisplayObjectContainer{
    private static _mInstance: ID2;
    public static get getInstance(): ID2 {
        if (ID2._mInstance == undefined)
            ID2._mInstance = new ID2();
        return ID2._mInstance;
    }

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;

    private _topUI:TopUI;
    private _return:egret.Shape;
    private _btn:egret.Bitmap;

    private imgItem = [];

    constructor(){
        super();

        this._topUI = new TopUI("活动详情");
        
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        this._btn = new egret.Bitmap();
        this.addChild(this._btn);
        this._btn.y = GameMain.getInstance.StageHeight-120;
        this._btn.touchEnabled = true;
        RES.getResByUrl(`resource/assets/images/ui/bg_button@2x.png`,(e)=>{
            this._btn.$setBitmapData(e); 
            this._btn.x = (GameMain.getInstance.StageWidth - this._btn.width)*0.5;
        },this);

        let text = ToolMrg.getText(0,GameMain.getInstance.StageHeight-120+30,34,0xffffff,GameMain.getInstance.StageWidth);
        this.addChild(text);
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "申请活动优惠";

        this.init();
        this.setDB();
    }

    private init():void{
        let btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        RES.getResByUrl(`resource/assets/images/ui/zhuli1.png`,(e)=>{btn1.$setBitmapData(e); },this);

        let text = ToolMrg.getText(44,410,24,0x333333);
        this._mContain.addChild(text);
        text.lineSpacing = 15;
        // text.text = "活动对象：51彩站首存会员\n活动开始时间：2019-06-31 00:00:00开始\n活动结束时间：2022-06-31 00:00:00"
        // +"\n\n上一周竞彩自然有效投注额≥RMB 20,000，续存送10%，彩\n金上限388,3倍流水。\n上一周竞彩自然有效投注额≥RMB 100,000，"
        // +"续存送20%，彩\n金上限888,3倍流水。\n\n申请方式：\n\n申请续存优惠的会员，如若不清楚上一周有效投注额，可在\n“资金明细”内"
        // +"查询或咨询24小时在线客服。符合申请条件的会\n元请完成存款后未投注前，点击【申请活动优惠】，系统收到\n您的请求后，会于5分钟之内审核"
        // +"并添加完毕。\n\n\n活动细则：\n\n1.每周一00:00:00至周日00:00:00统计竞足/竞篮期间流水\n总额，符合要求即可申请。要求完成本金加红利3倍"
        // +"流水即可\n提款，例如：上周有效流水达到20000，本周存款1000申请\n10%续存红利，那么提款流水要求为（1000+100）*3=3300元\n有效投注。"
        // +"\n\n2.周竞彩自然有效投注额=（总有效投注额-任何存送优惠活动\n需要完成的有效投注额）。\n\n3.本活动与【返水优惠】共享，不与其他任何优惠共享。\n"
        // +"\n4.若发现有套利客户，对赌或不诚实获取盈利之行为，将取消\n其优惠资格。\n\n5.每位有效玩家、每一个手机号码、电子邮箱、IP地址、相同\n"
        // +"银行卡、同一电脑只能享受一次优惠，如发现有违规用户，\n我们将保留无限期审核扣回红利及所产生利润的权利。\n\n6.此活动遵循51彩站一般规则与条款。";
        text.textFlow = <Array<egret.ITextElement>>[
            { "text": "活动对象：51彩站首存会员\n活动开始时间：2019-06-31 00:00:00开始\n活动结束时间：2022-06-31 00:00:00"
        +"\n\n上一周竞彩自然有效投注额≥RMB 20,000，续存送10%，彩\n金上限388,3倍流水。\n上一周竞彩自然有效投注额≥RMB 100,000，"
        +"续存送20%，彩\n金上限888,3倍流水。\n\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "申请方式：", style: { "textColor": 0x333333, size: 24 , bold: true} },
            { "text": "\n\n申请续存优惠的会员，如若不清楚上一周有效投注额，可在\n“资金明细”内"
        +"查询或咨询24小时在线客服。符合申请条件的会\n员请完成存款后未投注前，点击【申请活动优惠】，系统收到\n您的请求后，会于5分钟之内审核"
        +"并添加完毕。\n\n\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动细则：", style: { "textColor": 0x333333, size: 24 , bold: true} },
            { "text": "\n\n1.每周一00:00:00至周日00:00:00统计竞足/竞篮期间流水\n总额，符合要求即可申请。要求完成本金加红利3倍"
        +"流水即可\n提款，例如：上周有效流水达到20000，本周存款1000申请\n10%续存红利，那么提款流水要求为（1000+100）*3=3300元\n有效投注。"
        +"\n\n2.周竞彩自然有效投注额=（总有效投注额-任何存送优惠活动\n需要完成的有效投注额）。\n\n3.本活动与【返水优惠】共享，不与其他任何优惠共享。\n"
        +"\n4.若发现有套利客户，对赌或不诚实获取盈利之行为，将取消\n其优惠资格。\n\n5.每位有效玩家、每一个手机号码、电子邮箱、IP地址、相同\n"
        +"银行卡、同一电脑只能享受一次优惠，如发现有违规用户，\n我们将保留无限期审核扣回红利及所产生利润的权利。\n\n6.此活动遵循51彩站一般规则与条款。", style: { "textColor": 0x333333, size: 24 } },
            
        ];
}

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return){
            this.hide();
        }else if(e.target == this._btn){
            // KeFuWnd.getInstance.show();
            // if(window["go2Url"]) {
            //     window["go2Url"](GameValue.kfUrl);
            // }
            CallApp.openUrl(GameValue.kfUrl);
        }
    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

            this._scroView.setScrollTop(0);
            if(WorldWnd._worldState==1){
                WorldWnd.getInstance.show();
            }
        }
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 150;
        this.addChild(this._scroView);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}