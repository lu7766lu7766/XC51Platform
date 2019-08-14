var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**银行卡转账活动界面 */
var ID7 = (function (_super) {
    __extends(ID7, _super);
    function ID7() {
        var _this = _super.call(this) || this;
        _this.imgItem = [];
        _this._topUI = new TopUI("活动详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        var btn1 = new egret.Bitmap();
        _this._mContain.addChild(btn1);
        RES.getResByUrl("resource/assets/images/ui/bbb2@2x.png", function (e) { btn1.$setBitmapData(e); }, _this);
        _this.setDB();
        _this.initText();
        return _this;
    }
    Object.defineProperty(ID7, "getInstance", {
        get: function () {
            if (ID7._mInstance == undefined)
                ID7._mInstance = new ID7();
            return ID7._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    ID7.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    ID7.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    ID7.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._scroView.setScrollTop(0);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    ID7.prototype.initText = function () {
        var _mShareC = new egret.Shape();
        _mShareC.graphics.beginFill(0xfef9f9, 1);
        _mShareC.graphics.drawRect(0, 390, GameMain.getInstance.StageWidth, 1300);
        _mShareC.graphics.endFill();
        this._mContain.addChild(_mShareC);
        var allheight = 0;
        var activeText1 = ToolMrg.getText(44, 430, 28, 0x333333);
        activeText1.textFlow = [
            { "text": "活动对象:  51彩站首存会员" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动开始时间:  2019-02-10 00:00:00开始" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动结束时间:  待定" + "\n" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText1.lineSpacing = 15;
        activeText1.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText1);
        allheight += activeText1.height;
        var activeText11 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText11.textFlow = [
            { "text": "活动内容:" + "\n" + "\n", style: { "textColor": 0x000000, size: 24, bold: true } },
            { "text": "凡是使用公司入款方式 （银行卡转账，支付宝转账，微信转银行" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "卡）进行入款，每笔可获得1%入款返利优惠无上限。" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "为提供给广大玩家更多的支付渠道和支付方式，网站开通多渠" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "道支付方式，均可实现快速到账。" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText11.lineSpacing = 15;
        activeText11.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText11);
        allheight += activeText11.height + 20;
        var activeText111 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText111.textFlow = [
            { "text": "申请方式:" + "\n" + "\n", style: { "textColor": 0x000000, size: 24, bold: true } },
            { "text": "成功转账至本站提供的收款卡后前往网站前台页面提交入款申" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "请，并选择入款优惠1%一并提交，系统收到您的请求后，会于" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "5分钟之内审核并添加完毕。" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText111.lineSpacing = 15;
        activeText111.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText111);
        allheight += activeText111.height + 60;
        var activeText2 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText2.textFlow = [
            { "text": "活动细则:" + "\n", style: { "textColor": 0x000000, size: 24, bold: true } },
        ];
        activeText2.lineSpacing = 25;
        activeText2.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText2);
        allheight += activeText2.height;
        var activeText3 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText3.textFlow = [
            { "text": "1.本活动51彩站全体用户皆可参与，此优惠公司入款的每一笔" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "均可申请，返利无上限，不限游戏，仅需一倍流水，计算方式" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "为（本金+红利）*流水倍数。" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "例如：公司入款=10000元申请1%入款返利；" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "红利=10000x1%=100元；" + "\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "如提款需下注（10000+100）x1=10100。", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText3.lineSpacing = 15;
        activeText3.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText3);
        allheight += activeText3.height + 39;
        var activeText4 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText4.textFlow = [
            { "text": "2.本活动与【返水优惠】共享，不与其他任何优惠共享。", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText4.lineSpacing = 15;
        activeText4.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText4);
        allheight += activeText4.height + 39;
        var activeText5 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText5.textFlow = [
            {
                "text": "3.若发现有套利客户，对赌或不诚实获取盈利之行为，将取消" +
                    "\n" + "其优惠资格。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText5.lineSpacing = 15;
        activeText5.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText5);
        allheight += activeText5.height + 39;
        var activeText6 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText6.textFlow = [
            {
                "text": "4.每位有效玩家、每一个手机号码、电子邮箱、IP地址、相同" +
                    "\n" + "银行卡、同一台电脑只能享受一次优惠，如发现违规用户，" +
                    "\n" + "我们将保留无限期审核扣回红利及所产生利润的权利。", style: { "textColor": 0x333333, size: 24 }
            },
        ];
        activeText6.lineSpacing = 15;
        activeText6.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText6);
        allheight += activeText6.height + 39;
        var activeText7 = ToolMrg.getText(44, 430 + allheight, 28, 0x333333);
        activeText7.textFlow = [
            { "text": "5.此活动遵循51彩站一般规则与条款。" + "\n", style: { "textColor": 0x333333, size: 24 } },
        ];
        activeText7.lineSpacing = 15;
        activeText7.fontFamily = "微软雅黑";
        this._mContain.addChild(activeText7);
    };
    ID7.prototype.addScoll = function () {
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
    };
    /**适配处理 */
    ID7.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ID7;
}(egret.DisplayObjectContainer));
__reflect(ID7.prototype, "ID7");
//# sourceMappingURL=ID7.js.map