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
/**详情顶部显示对象 */
var FathreeItemTop = (function (_super) {
    __extends(FathreeItemTop, _super);
    function FathreeItemTop() {
        var _this = _super.call(this) || this;
        _this.ddstr = "";
        _this.icon = new egret.Bitmap();
        _this.icon.x = 28;
        _this.icon.y = 24;
        _this.icon.width = 32;
        _this.icon.height = 32;
        _this.icon.touchEnabled = true;
        _this.addChild(_this.icon);
        RES.getResByUrl("resource/assets/images/ui/paithreeIcon.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.tatleText = ToolMrg.getText(68, 24, 28, 0x333333);
        _this.tatleText.text = "排列三";
        // this.tatleText.fontFamily = "微软雅黑";
        // this.tatleText.bold = true;
        _this.addChild(_this.tatleText);
        _this.qsText = ToolMrg.getText(172, 26, 24, 0x333333, 150);
        _this.qsText.text = "1997001期";
        // this.qsText.fontFamily = "微软雅黑";
        // this.qsText.bold = true;
        _this.addChild(_this.qsText);
        _this.defaultText = ToolMrg.getText(650, 24, 24, 0xE72E52, 100);
        _this.defaultText.text = "已中奖";
        // this.defaultText.fontFamily = "微软雅黑";
        // this.defaultText.bold = true;
        _this.addChild(_this.defaultText);
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xDEDEDE);
        link.graphics.drawRect(28, 84, 694, 2);
        link.graphics.endFill();
        var tzaware = ToolMrg.getText(88, 146, 28, 0x333333, 152);
        tzaware.text = "投注金额";
        _this.addChild(tzaware);
        _this.tzawareNum = ToolMrg.getText(64, 104, 28, 0x333333, 152);
        _this.tzawareNum.text = "￥30";
        _this.tzawareNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.tzawareNum);
        var tzaware1 = ToolMrg.getText(352, 146, 28, 0x333333, 96);
        tzaware1.text = "倍数";
        _this.addChild(tzaware1);
        _this.doubleNum = ToolMrg.getText(328, 104, 28, 0x333333, 96);
        _this.doubleNum.text = "10";
        _this.doubleNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.doubleNum);
        var tzaware2 = ToolMrg.getText(552, 146, 28, 0x333333, 152);
        tzaware2.text = "中奖金额";
        _this.addChild(tzaware2);
        _this.awareNum = ToolMrg.getText(528, 104, 28, 0xE82C2B, 152);
        _this.awareNum.text = "¥000";
        _this.awareNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this.awareNum);
        _this.ddhaoText = ToolMrg.getText(28, 220, 28, 0xE82C2B);
        _this.ddhaoText.textFlow = [
            { "text": "订单号: ", style: { "textColor": 0x333333, size: 20 } },
            { "text": "29929189192912", style: { "textColor": 0x999999, size: 20 } }
        ];
        _this.addChild(_this.ddhaoText);
        _this.redbg = new egret.Bitmap();
        _this.redbg.x = 284;
        _this.redbg.y = 218;
        _this.redbg.width = 52;
        _this.redbg.height = 26;
        _this.addChild(_this.redbg);
        RES.getResByUrl("resource/assets/images/ui/fzhiBnt.png", _this.bgBack2, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.redbg.touchEnabled = true;
        _this.rqday = ToolMrg.getText(576 - 90, 220, 20, 0x999999);
        _this.rqday.text = "19-02-06 15:24";
        _this.rqday.width = 250;
        _this.rqday.textAlign = egret.HorizontalAlign.RIGHT;
        _this.addChild(_this.rqday);
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 266, 750, 10);
        link1.graphics.endFill();
        _this.addevent();
        _this.setDB();
        return _this;
    }
    FathreeItemTop.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.icon != undefined) {
            this.icon.$setBitmapData(data);
        }
    };
    FathreeItemTop.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this.redbg != undefined) {
            this.redbg.$setBitmapData(data);
        }
    };
    /**设置标题 期数 和中奖状态*/
    FathreeItemTop.prototype.setdefaultTatle = function (tatle, qs, status, dataT) {
        this.tatleText.text = tatle;
        this.qsText.text = qs + "期";
        if (status == 1) {
            this.defaultText.text = "待开奖";
            if (dataT.threeOrFive.tzList != undefined && dataT.threeOrFive.tzList.length > 0) {
                this.defaultText.text = "待结算";
                this.awareNum.text = "---";
            }
            else {
                this.defaultText.text = "待开奖";
            }
        }
        else if (status == 2) {
            this.defaultText.text = "未中奖";
        }
        else if (status == 3) {
            this.defaultText.text = "已中奖";
        }
    };
    /**设置投注金额 倍数 中奖金额 */
    FathreeItemTop.prototype.settzgold = function (num1, num2, num3) {
        this.tzawareNum.text = "￥" + num1;
        this.doubleNum.text = "" + num2;
        this.awareNum.text = "¥" + num3;
    };
    /**设置订单号和日期*/
    FathreeItemTop.prototype.setddNum = function (dd, timer) {
        this.ddhaoText.textFlow = [
            { "text": "订单号: ", style: { "textColor": 0x333333, size: 20 } },
            { "text": "" + dd, style: { "textColor": 0x999999, size: 20 } }
        ];
        this.rqday.text = ToolMrg.getTime2(timer);
        this.redbg.x = this.ddhaoText.x + this.ddhaoText.width + 12;
    };
    /**设置图标*/
    FathreeItemTop.prototype.setIcon = function (type) {
        if (type == 3) {
            RES.getResByUrl("resource/assets/images/ui/paithreeIcon.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else if (type == 4) {
            RES.getResByUrl("resource/assets/images/ui/pl5_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    /**适配处理 */
    FathreeItemTop.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 276);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    FathreeItemTop.prototype.addevent = function () {
        this.redbg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    FathreeItemTop.prototype.onTouch = function () {
        //生成可复制input
        var input = document.createElement("input");
        //需复制内容
        input.value = this.ddhaoText.text;
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length),
            document.execCommand('Copy');
        document.body.removeChild(input);
        Alertpaner.getInstance.show("复制成功");
    };
    return FathreeItemTop;
}(egret.DisplayObjectContainer));
__reflect(FathreeItemTop.prototype, "FathreeItemTop");
//# sourceMappingURL=FathreeItemTop.js.map