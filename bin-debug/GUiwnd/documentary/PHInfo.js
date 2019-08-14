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
/**个人主页实体类 */
var PHInfo = (function (_super) {
    __extends(PHInfo, _super);
    function PHInfo() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this._typeImg = new egret.Bitmap();
        _this.addChild(_this._typeImg);
        _this._typeImg.width = 32;
        _this._typeImg.height = 32;
        _this._typeImg.x = 26;
        _this._typeImg.y = 28;
        _this._typeText = ToolMrg.getText(66, 16, 28, 0x333333);
        _this.addChild(_this._typeText);
        _this._typeText.height = 50;
        _this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._time = ToolMrg.getText(558, 28, 20, 0x999999);
        _this.addChild(_this._time);
        _this._time.height = 28;
        _this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._yjhb = ToolMrg.getText(30, 90, 24, 0x999999);
        _this.addChild(_this._yjhb);
        _this._yjhb.height = 34;
        _this._yjhb.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._zgje = ToolMrg.getText(30, 128, 24, 0x999999);
        _this.addChild(_this._zgje);
        _this._zgje.height = 34;
        _this._zgje.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._gdrs = ToolMrg.getText(310, 90, 24, 0x999999);
        _this.addChild(_this._gdrs);
        _this._gdrs.height = 34;
        _this._gdrs.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._zjjj = ToolMrg.getText(310, 128, 24, 0x999999);
        _this.addChild(_this._zjjj);
        _this._zjjj.height = 34;
        _this._zjjj.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._gdBtn = new egret.Bitmap();
        _this.addChild(_this._gdBtn);
        _this._gdBtn.x = 624;
        _this._gdBtn.y = 94;
        _this._isImg = new egret.Bitmap();
        _this.addChild(_this._isImg);
        _this._isImg.x = 566;
        _this._isImg.y = 68;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xF5F5F7);
        shape.graphics.drawRect(0, 188, 750, 10);
        shape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    PHInfo.prototype.aa = function () {
        var _this = this;
        this._typeText.text = "竞足串关";
        this._time.text = "06-23 22:00 \u622A\u6B62";
        RES.getResByUrl("resource/assets/images/ui/jzcg_home@2x.png", function (e) { _this._typeImg.$setBitmapData(e); }, this);
        RES.getResByUrl("resource/assets/images/ui/gd_expert@2x.png", function (e) { _this._gdBtn.$setBitmapData(e); }, this);
        RES.getResByUrl("resource/assets/images/ui/wzj_expert@2x.png", function (e) { _this._isImg.$setBitmapData(e); }, this);
        var textColor = 0xF72F53;
        this._yjhb.textFlow = [
            { "text": "预计回报：", style: { "textColor": 0x999999 } },
            { "text": "41.82\u500D", style: { "textColor": textColor } }
        ];
        this._zgje.textFlow = [
            { "text": "自购金额：", style: { "textColor": 0x999999 } },
            { "text": "500\u5143", style: { "textColor": textColor } }
        ];
        this._gdrs.textFlow = [
            { "text": "跟单人数：", style: { "textColor": 0x999999 } },
            { "text": "238\u4EBA", style: { "textColor": textColor } }
        ];
        this._zjjj.textFlow = [
            { "text": "中奖奖金：", style: { "textColor": 0x999999 } },
            { "text": "29045.54\u5143", style: { "textColor": textColor } }
        ];
    };
    PHInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    PHInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    PHInfo.prototype.touchDown = function (e) {
        if (e.target == this._mShareC) {
            DmC_infoMsg.dmdetail = new DmDetails();
            DmC_infoMsg.dmdetail.show(null, null, null);
        }
    };
    /**适配处理 */
    PHInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 198);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return PHInfo;
}(egret.DisplayObjectContainer));
__reflect(PHInfo.prototype, "PHInfo");
//# sourceMappingURL=PHInfo.js.map