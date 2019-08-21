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
/**确认提款按钮和 文字提示 */
var decideTKObj = (function (_super) {
    __extends(decideTKObj, _super);
    function decideTKObj() {
        var _this = _super.call(this) || this;
        _this.y = 592;
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._mContainQB);
        _this._mContainQB.y = 180;
        // this.addScoll(this._mContainQB, this._scroViewQB);
        _this.nextBnt = new egret.Bitmap();
        _this.nextBnt.x = 20;
        _this.nextBnt.y = 38;
        _this.addChild(_this.nextBnt);
        ToolMrg.setZoom(_this.nextBnt);
        _this.nextBnt.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.nextText = ToolMrg.getText(0, 73, 32, 0xffffff, 750);
        _this.addChild(_this.nextText);
        _this.nextText.textAlign = egret.HorizontalAlign.CENTER;
        _this.nextText.text = "确定提款";
        _this.nextText.bold = true;
        // this.xsText1 = ToolMrg.getText(72, 180 - 180, 24, 0xffffff, 610);
        // this._mContainQB.addChild(this.xsText1);//0xF72E52
        // this.xsText1.textFlow = <Array<egret.ITextElement>>[
        // 	{ "text": "1. 中奖金额在", style: { "textColor": 0x333333 } },
        // 	{ "text": "1小时", style: { "textColor": 0xF72E52 } },
        // 	{ "text": "后方可提现;", style: { "textColor": 0x333333 } }
        // ];
        // this.xsText1.bold = true;
        _this.xsText2 = ToolMrg.getText(72, 220 - 180 - 30, 24, 0xffffff, 610);
        _this._mContainQB.addChild(_this.xsText2);
        _this.xsText2.textFlow = [
            { "text": "1. 为防止恶意提款、洗钱等不法行为，充值资金必须", style: { "textColor": 0x333333 } },
            { "text": "\0" + "用于实际消费;", style: { "textColor": 0x333333 } },
        ];
        _this.xsText2.bold = true;
        _this.xsText2.lineSpacing = 10;
        _this.xsText3 = ToolMrg.getText(72, 290 - 180 - 30, 24, 0xffffff, 610);
        _this._mContainQB.addChild(_this.xsText3);
        _this.xsText3.textFlow = [
            { "text": "2. 为了保障您的提款能及时到账，需流水一倍以上才可提现，", style: { "textColor": 0x333333 } },
            { "text": "\0" + "每日提款次数不得超过3次;", style: { "textColor": 0xF72E52 } },
        ];
        _this.xsText3.bold = true;
        _this.xsText3.lineSpacing = 10;
        _this.xsText4 = ToolMrg.getText(72, 360 - 180 - 30, 24, 0xffffff, 610);
        _this._mContainQB.addChild(_this.xsText4);
        _this.xsText4.textFlow = [
            { "text": "3. 为了保障您的资金安全，我们将审核您的提款申请后，再汇款至您的银行卡；", style: { "textColor": 0x333333 } },
        ];
        _this.xsText4.bold = true;
        _this.xsText4.lineSpacing = 10;
        _this.xsText5 = ToolMrg.getText(72, 430 - 180 - 30, 24, 0xffffff, 610);
        _this._mContainQB.addChild(_this.xsText5);
        _this.xsText5.textFlow = [
            { "text": "4. 如您在提款时遇到问题，请联系在线客服；", style: { "textColor": 0x333333 } },
        ];
        _this.xsText5.bold = true;
        _this.xsText5.lineSpacing = 10;
        _this.xsText6 = ToolMrg.getText(72, 470 - 180 - 30, 24, 0xffffff, 610);
        _this._mContainQB.addChild(_this.xsText6);
        _this.xsText6.textFlow = [
            { "text": "5. 网站加奖金额只能用于购彩，不可提现。（加奖金额指 网站额外赠送的购彩金，包括加奖和充值红包等。）", style: { "textColor": 0x333333 } },
        ];
        _this.xsText6.bold = true;
        _this.xsText6.lineSpacing = 10;
        _this.setDB();
        _this.addevent();
        return _this;
    }
    Object.defineProperty(decideTKObj, "getInstance", {
        get: function () {
            if (decideTKObj._mInstance == undefined)
                decideTKObj._mInstance = new decideTKObj();
            return decideTKObj._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    decideTKObj.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.nextBnt != undefined) {
            this.nextBnt.$setBitmapData(data);
        }
    };
    /**适配处理 */
    decideTKObj.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -180, GameMain.getInstance.StageWidth, 1334 - this.y - 100);
        this._mShareC.graphics.endFill();
        this._mContainQB.addChildAt(this._mShareC, 0);
    };
    decideTKObj.prototype.addevent = function () {
        this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    decideTKObj.prototype.onclick = function () {
        var xzGLmoney = UserData.getInstance.getLSxzmoney();
        var defultmoney = UserData.getInstance.getLSDefaultmoney();
        var showText = Math.floor(xzGLmoney - defultmoney);
        if (withdrawData.defauleid == 1) {
            if (defultmoney < xzGLmoney) {
                Alertpaner.getInstance.show("需要1倍流水,差额￥" + showText);
                return;
            }
        }
        if (withdrawData.bangtk == "" || withdrawData.bangtk == "0") {
            Alertpaner.getInstance.show("提现余额不足");
        }
        else {
            if (Number(withdrawData.bangtk) < 100) {
                Alertpaner.getInstance.show("最少提款100元起");
                return;
            }
            var money = Number(withdrawData.bangtk) * 100;
            var list = SelectDataMrg.getInstance.getItem();
            var data = list.Gget(selectBankData.selectID - 1);
            if (data != undefined) {
                if (decideTKObj.canTiXian == false) {
                    return;
                }
                decideTKObj.canTiXian = false;
                // egret.Tween.get(this.nextBnt).wait(3000).call(() => {
                // 	decideTKObj.canTiXian = true;
                // })
                withdrawConf.getInstance.sendHttp(money, data.cardNum + "", withdrawData.defauleid);
            }
        }
    };
    decideTKObj.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 180;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - this.y - 300;
        scroView.bounces = true;
    };
    decideTKObj.canTiXian = true;
    return decideTKObj;
}(egret.DisplayObjectContainer));
__reflect(decideTKObj.prototype, "decideTKObj");
//# sourceMappingURL=decideTKObj.js.map