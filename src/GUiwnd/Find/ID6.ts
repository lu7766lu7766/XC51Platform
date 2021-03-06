class ID6 extends egret.DisplayObjectContainer {
    private static _mInstance: ID6;
    public static get getInstance(): ID6 {
        if (ID6._mInstance == undefined)
            ID6._mInstance = new ID6();
        return ID6._mInstance;
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

        let btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        RES.getResByUrl(`resource/assets/images/ui/vip1.png`, (e) => { btn1.$setBitmapData(e); }, this);

        let btn2 = new egret.Bitmap();
        this._mContain.addChild(btn2);
        btn2.y = 572;
        RES.getResByUrl(`resource/assets/images/ui/vip2.png`, (e) => { btn2.$setBitmapData(e); }, this);

        // let btn3 = new egret.Bitmap();
        // this._mContain.addChild(btn3);
        // btn3.y = 572+732;
        // RES.getResByUrl(`resource/assets/images/ui/vip3.png`,(e)=>{btn3.$setBitmapData(e); },this);
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
        _mShareC.graphics.drawRect(0, 1302, GameMain.getInstance.StageWidth, 1252);
        _mShareC.graphics.endFill();
        this._mContain.addChild(_mShareC);

        let allheight: number = 0;
        let activeText1 = ToolMrg.getText(44, 1302, 28, 0x333333);
        activeText1.textFlow = <Array<egret.ITextElement>>[
            { "text": "活动的一般条款与规则:" + "\n", style: { "textColor": 0x000000, size: 24, bold: true } },
        ];
        activeText1.lineSpacing = 15;
        activeText1.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText1);

        allheight += activeText1.height;


        let activeText22 = ToolMrg.getText(44, 1302 + activeText1.height, 28, 0x333333);
        activeText22.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "1.晋升标准：会员注册当日起的累计存款以及累计有效流水达" +
                "\n" + "到相应级别的要求，即可立即晋级。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText22.lineSpacing = 15;
        activeText22.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText22);

        allheight += activeText22.height + 39;



        let activeText2 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText2.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "2.晋升顺序：星级等级达到相应的要求可每天晋升一级，但星" +
                "\n" + "级等级不可越级晋升。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText2.lineSpacing = 15;
        activeText2.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText2);

        allheight += activeText2.height + 39;


        let activeText3 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText3.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "3.保级要求：会员在达到某星级等级后，90天内投注需要完成" +
                "\n" + "保级要求。如果在此期间完成晋升，保级要求重新按照当前等" +
                "\n" + "级计算。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText3.lineSpacing = 14;
        activeText3.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText3);

        allheight += activeText3.height + 39;


        let activeText4 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText4.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "4.降级标准：如果会员在一个季度(90天计算)内没有完成相" +
                "\n" + "应的保级要求流水，系统会自动降级一个等级，相应的返水及" +
                "\n" + "其他优惠也会随之调整至降级后的等级。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText4.lineSpacing = 15;
        activeText4.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText4);

        allheight += activeText4.height + 39;

        let activeText5 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText5.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "5.特别优惠：达到相应等级的星级会员可联系在线客服进行申" +
                "\n" + "请，礼品不能折算为现金，每个级别的名贵礼品每位会员仅能" +
                "\n" + "获得1次，51彩站对活动拥有最终解释权。(名贵礼品仅针" +
                "\n" + "对6星级/7星级/8星级/9星级/10星级会员)", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText5.lineSpacing = 15;
        activeText5.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText5);

        allheight += activeText5.height + 39;

        let activeText6 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText6.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "6.升级礼金：升级礼金在会员达到该会员级别后系统自动派" +
                "\n" + "发，每个级别的升级礼金每位会员仅能获得1次。(升级礼金" +
                "\n" + "1倍流水即可提款)", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText6.lineSpacing = 15;
        activeText6.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText6);

        allheight += activeText6.height + 39;

        let activeText7 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText7.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "7.生日礼金：会员在注册三个月内过生日，今年将不能领取生日" +
                "\n" + "礼金。另注册时间大于三个月的会员需在生日当天的星级页面进" +
                "\n" + "行自助领取，每年可领取一次。(升级彩金1倍流水即可提款)", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText7.lineSpacing = 15;
        activeText7.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText7);

        allheight += activeText7.height + 39;

        let activeText8 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText8.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "8.每月红包：每月红包会在每月1号发放上个月相应等级的彩" +
                "\n" + "金。(每月红包彩金1倍流水即可提款)", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText8.lineSpacing = 15;
        activeText8.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText8);


        allheight += activeText8.height + 39;

        let activeText9 = ToolMrg.getText(44, 1302 + allheight, 28, 0x333333);
        activeText9.textFlow = <Array<egret.ITextElement>>[
            {
                "text": "9.51彩站保留对活动的修改，停止及最终解释权" +
                "\n" , style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText9.lineSpacing = 15;
        activeText9.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText9);

    }
}