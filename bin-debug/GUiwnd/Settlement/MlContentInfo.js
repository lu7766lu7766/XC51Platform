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
/**投注内容 new */
var MlContentInfo = (function (_super) {
    __extends(MlContentInfo, _super);
    function MlContentInfo() {
        var _this = _super.call(this) || this;
        _this._money = 0;
        _this._Multiplier = 1;
        _this._isInterception = false;
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xDEDEDE);
        link1.graphics.drawRect(0, 158.5, 750, 1.5);
        link1.graphics.endFill();
        var link2 = new egret.Shape();
        _this.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(372, 0, 1.5, 160);
        link2.graphics.endFill();
        var link3 = new egret.Shape();
        _this.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(592, 0, 1.5, 160);
        link3.graphics.endFill();
        _this._topText = ToolMrg.getText(20, 0, 24, 0xff7000, 40);
        _this.addChild(_this._topText);
        _this._topText.lineSpacing = 4;
        _this._topText.height = 160;
        _this._topText.textAlign = egret.HorizontalAlign.CENTER;
        _this._topText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._centerText = ToolMrg.getText(48, 0, 22, 0x333333, 326);
        _this.addChild(_this._centerText);
        _this._centerText.lineSpacing = 5;
        _this._centerText.height = 160;
        _this._centerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._centerText.textAlign = egret.HorizontalAlign.CENTER;
        _this._moneyText = ToolMrg.getText(592, 0, 32, 0xf72e52, 158);
        _this.addChild(_this._moneyText);
        _this._moneyText.height = 160;
        _this._moneyText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._moneyText.textAlign = egret.HorizontalAlign.CENTER;
        var control = new egret.Bitmap();
        _this.addChild(control);
        control.x = 394;
        control.y = 52;
        RES.getResByUrl("resource/assets/images/ui/bsjj_home@2x.png", function (e) { control.$setBitmapData(e); }, _this);
        _this._MultiplierText = ToolMrg.getText(434, 52, 32, 0x333333, 100);
        _this.addChild(_this._MultiplierText);
        _this._MultiplierText.height = 60;
        _this._MultiplierText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._MultiplierText.textAlign = egret.HorizontalAlign.CENTER;
        _this._MultiplierText.text = "1";
        _this._MultiplierText.type = egret.TextFieldType.INPUT;
        _this._MultiplierText.inputType = egret.TextFieldInputType.TEXT;
        _this._jianBtn = new egret.Shape();
        _this.addChild(_this._jianBtn);
        _this._jianBtn.graphics.beginFill(0x1f1f1f, 0.001);
        _this._jianBtn.graphics.drawRect(394, 52, 40, 60);
        _this._jianBtn.graphics.endFill();
        _this._jianBtn.touchEnabled = true;
        _this._jiaBtn = new egret.Shape();
        _this.addChild(_this._jiaBtn);
        _this._jiaBtn.graphics.beginFill(0x1f1f1f, 0.001);
        _this._jiaBtn.graphics.drawRect(394 + 140, 52, 40, 60);
        _this._jiaBtn.graphics.endFill();
        _this._jiaBtn.touchEnabled = true;
        _this.setDB();
        return _this;
    }
    /**适配处理 */
    MlContentInfo.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        // this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        // this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,160);
        // this._mShareC.graphics.endFill();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 160;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { _this._mShareC.$setBitmapData(e); }, this);
        this.addChildAt(this._mShareC, 0);
    };
    /**设置倍数 */
    MlContentInfo.prototype.setBS = function (bs) {
        this._MultiplierText.text = "" + bs;
        this._Multiplier = bs;
    };
    MlContentInfo.prototype.aa = function (id, listStrand, bsYHData, comeType) {
        this._id = id;
        this._listStrand = listStrand;
        this._bsYHData = bsYHData;
        this._comeType = comeType;
        this._topText.text = bsYHData.cType + "\n串\n1";
        var str = "";
        var objData;
        var bs = 1;
        var typeList;
        //选中对应类型数组
        if (comeType == 0 || comeType == 2)
            typeList = FootballDataMrg.getInstance.fbNameItem;
        else if (comeType == 1 || comeType == 3)
            typeList = BasketballDataMrg.getInstance.BasketballList;
        for (var i = 0; i < bsYHData.list.length; i++) {
            objData = bsYHData.list[i];
            if (i < 5)
                str += objData.obj.team_a_name + "=" + typeList[objData.xb] + "[" + objData.obj.listSX[objData.xb] + "] \n";
            bs *= objData.obj.listSX[objData.xb];
        }
        if (bsYHData.list.length > 5) {
            str = str + "......";
        }
        else {
            str = str.substring(0, str.length - 2);
        }
        this._centerText.text = str;
        bs = Math.round(bs * 100 * this._Multiplier);
        bs /= 100;
        this._moneyText.text = "" + bs * 2;
        this._money = Number(this._moneyText.text);
    };
    MlContentInfo.prototype.changeText = function () {
        this._Multiplier = Math.floor(Number(this._MultiplierText.text));
        if (this._Multiplier > 1) {
            if (this._bsYHData != undefined) {
                GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, this._Multiplier);
            }
            this.aa(this._id, this._listStrand, this._bsYHData, this._comeType);
        }
        MultiplierDetail.getInstance.changeMultiplier();
    };
    /**获取下注倍数 */
    MlContentInfo.prototype.getXZJE = function () {
        return this._Multiplier;
    };
    /**获取奖金 */
    MlContentInfo.prototype.getJJ = function () {
        return this._money;
    };
    MlContentInfo.prototype.textInput2 = function () {
        if (this._Multiplier < 1) {
            this._Multiplier = 1;
        }
        this._MultiplierText.text = "" + this._Multiplier;
        GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, this._Multiplier);
        this.aa(this._id, this._listStrand, this._bsYHData, this._comeType);
        MultiplierDetail.getInstance.changeMultiplier();
    };
    MlContentInfo.prototype.touchDown = function (e) {
        if (e.target == this._jianBtn) {
            if (this._MultiplierText.text == "1")
                return;
            this._MultiplierText.text = "" + (Number(this._MultiplierText.text) - 1);
        }
        else if (e.target == this._jiaBtn) {
            this._MultiplierText.text = "" + (Number(this._MultiplierText.text) + 1);
        }
        this.changeText();
        if (this._MultiplierText.text == "1") {
            this.textInput2();
        }
    };
    MlContentInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._MultiplierText.addEventListener(egret.TouchEvent.CHANGE, this.changeText, this);
            this._MultiplierText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
            this._jiaBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._jianBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    MlContentInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._Multiplier = 1;
            this._MultiplierText.text = "" + this._Multiplier;
            GuessingFootballMrg.getInstance.setYHBS(this._listStrand, this._bsYHData, 1);
            this._MultiplierText.removeEventListener(egret.TouchEvent.CHANGE, this.changeText, this);
            this._MultiplierText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
            this._jiaBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._jianBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return MlContentInfo;
}(egret.DisplayObjectContainer));
__reflect(MlContentInfo.prototype, "MlContentInfo");
//# sourceMappingURL=MlContentInfo.js.map