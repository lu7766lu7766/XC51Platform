class ID4 extends egret.DisplayObjectContainer {
    private static _mInstance: ID4;
    public static get getInstance(): ID4 {
        if (ID4._mInstance == undefined)
            ID4._mInstance = new ID4();
        return ID4._mInstance;
    }

    private _mContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;

    private _topUI: TopUI;
    private _return: egret.Shape;

    private imgItem = [];

    constructor() {
        super();

        this._topUI = new TopUI("活动详情");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();

        let activeText1 = ToolMrg.getText(44,400, 28, 0x333333);
        activeText1.text = "活动对象:  51彩站首存会员";
        activeText1.textFlow = <Array<egret.ITextElement>>[
            { "text": "活动对象:  51彩站首存会员" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动开始时间:  2019-03-31 00:00:00开始" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动结束时间:  2022-03-31 00:00:00" + "\n" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText1.lineSpacing = 15;
        activeText1.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText1);

        let btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        btn1.y=80;
        RES.getResByUrl(`resource/assets/images/ui/sc5888_find1.png`, (e) => { btn1.$setBitmapData(e); }, this);

        let btn2 = new egret.Bitmap();
        this._mContain.addChild(btn2);
        btn2.y =567;
        RES.getResByUrl(`resource/assets/images/ui/sc5888_find2.png`, (e) => { btn2.$setBitmapData(e); }, this);

        this.initText();

        this.setDB();
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._return) {
            this.hide();
        }
    }

    public show(): void {
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);

            this._scroView.setScrollTop(0);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    }

    private addScoll(): void {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
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
        this._mShareC.graphics.beginFill(0xf5f5f7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }

    private initText() {
        let _mShareC = new egret.Shape();
        _mShareC.graphics.beginFill(0xFEF9F9, 1);
        _mShareC.graphics.drawRect(0, 1058, GameMain.getInstance.StageWidth, 1002);
        _mShareC.graphics.endFill();
        this._mContain.addChild(_mShareC);

        let allheight: number = 0;
        let activeText1 = ToolMrg.getText(44, 1080, 28, 0x333333);
        activeText1.textFlow = <Array<egret.ITextElement>>[
            { "text": "申请方式:" + "\n" + "\n", style: { "textColor": 0x000000, size: 24, bold: true } },
            { "text": "存款后为投注前，点击 【申请活动优惠】, 系统收到您的请求" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "后，会于5分钟之内审核并添加完毕", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText1.lineSpacing = 15;
        activeText1.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText1);

        allheight += activeText1.height + 60;


        let activeText22 = ToolMrg.getText(44, 1080 + activeText1.height + 60, 28, 0x333333);
        activeText22.textFlow = <Array<egret.ITextElement>>[
            { "text": "活动细则:", style: { "textColor": 0x000000, size: 24, bold: true } },
        ];
        activeText22.lineSpacing = 15;
        activeText22.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText22);

        allheight += activeText22.height + 39;



        let activeText2 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText2.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "1.本活动为首存优惠需绑定手机号码仅可领取一次，需存款后" +
                "\n" + "未投注前进行领取，有效投注额达到【(本金+红利)x16倍流水】" +
                "\n" + "即可提款；例如：会员存款1000元，则需要有效投注" +
                "\n" + "(10000+188)x16=19008元的投注额即可申请提款。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText2.lineSpacing = 15;
        activeText2.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText2);

        allheight += activeText2.height + 39;


        let activeText3 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText3.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "2.本活动与【返水优惠】共享，不与其他任何优惠共享。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText3.lineSpacing = 14;
        activeText3.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText3);

        allheight += activeText3.height + 39;


        let activeText4 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText4.textFlow = <Array<egret.ITextElement>>[
            { "text": "3.本活动仅计算竞猜足球与篮球投注。", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText4.lineSpacing = 15;
        activeText4.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText4);

        allheight += activeText4.height + 39;

        let activeText5 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText5.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "4.若发现有套利客户，对赌或不诚实获取盈利之行为，将取消" +
                "\n" + "其优惠资格。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText5.lineSpacing = 15;
        activeText5.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText5);

        allheight += activeText5.height + 39;

        let activeText6 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText6.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "5.每位有效玩家、每一个手机号码、电子邮箱、IP地址、相同" +
                "\n" + "银行卡、同一台电脑只能享受一次优惠，如发现违规用户，" +
                "\n" + "我们将保留无限期审核扣回红利及所产生利润的权利。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText6.lineSpacing = 15;
        activeText6.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText6);

        allheight += activeText6.height + 39;

        let activeText7 = ToolMrg.getText(44, 1080 + allheight, 28, 0x333333);
        activeText7.textFlow = <Array<egret.ITextElement>>[
            { "text": "6.此活动遵循51彩站一般规则与条款。" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText7.lineSpacing = 15;
        activeText7.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText7);

    }
}