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
/**修改昵称 */
var AmendName = (function (_super) {
    __extends(AmendName, _super);
    function AmendName() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        var whileBG = new egret.Shape();
        whileBG.graphics.beginFill(0xFFFFFF, 1);
        whileBG.graphics.drawRect((GameMain.getInstance.StageWidth - 640) / 2, (GameMain.getInstance.StageHeight - 360) / 2, 640, 360);
        whileBG.graphics.endFill();
        _this.addChild(whileBG);
        _this.selectIcon = new egret.Bitmap();
        _this.addChild(_this.selectIcon);
        _this.selectIcon.width = 560;
        _this.selectIcon.height = 80;
        _this.selectIcon.x = 94;
        _this.selectIcon.y = (GameMain.getInstance.StageHeight - 360) / 2 + 114;
        RES.getResByUrl("resource/assets/images/ui/kuan@2x.png", function (e) { _this.selectIcon.$setBitmapData(e); }, _this);
        var _selectTypeText = ToolMrg.getText(0, (GameMain.getInstance.StageHeight - 360) / 2 + 32, 36, 0x333333, 750);
        _selectTypeText.text = "修改昵称";
        _selectTypeText.bold = true;
        _selectTypeText.textAlign = egret.HorizontalAlign.CENTER;
        _selectTypeText.fontFamily = "微软雅黑";
        _this.addChild(_selectTypeText);
        _this.closeBnt = new egret.Bitmap();
        _this.addChild(_this.closeBnt);
        _this.closeBnt.width = 260;
        _this.closeBnt.height = 72;
        _this.closeBnt.x = 94;
        _this.closeBnt.y = (GameMain.getInstance.StageHeight - 360) / 2 + 246;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@3x.png", function (e) { _this.closeBnt.$setBitmapData(e); }, _this);
        _this.closeBnt.touchEnabled = true;
        _this.decideBnt = new egret.Bitmap();
        _this.addChild(_this.decideBnt);
        _this.decideBnt.width = 260;
        _this.decideBnt.height = 72;
        _this.decideBnt.x = 396;
        _this.decideBnt.y = (GameMain.getInstance.StageHeight - 360) / 2 + 246;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@3x.png", function (e) { _this.decideBnt.$setBitmapData(e); }, _this);
        _this.decideBnt.touchEnabled = true;
        var closeText = ToolMrg.getText(190, (GameMain.getInstance.StageHeight - 360) / 2 + 260, 32, 0x333333);
        closeText.text = "取消";
        closeText.bold = true;
        closeText.fontFamily = "微软雅黑";
        _this.addChild(closeText);
        var decideText = ToolMrg.getText(494, (GameMain.getInstance.StageHeight - 360) / 2 + 260, 32, 0xFFFFFF);
        decideText.text = "确定";
        decideText.bold = true;
        decideText.fontFamily = "微软雅黑";
        _this.addChild(decideText);
        _this.inputText = ToolMrg.getText(134, (GameMain.getInstance.StageHeight - 360) / 2 + 134, 28, 0x000000, 500);
        _this.addChild(_this.inputText);
        _this.inputText.height = 50;
        _this.inputText.text = "请输入2~8位昵称";
        _this.inputText.type = egret.TextFieldType.INPUT;
        _this.inputText.fontFamily = "微软雅黑";
        _this.inputText.touchEnabled = true;
        _this.addevent();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(AmendName, "getInstance", {
        get: function () {
            if (AmendName._mInstance == undefined)
                AmendName._mInstance = new AmendName();
            return AmendName._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**适配处理 */
    AmendName.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x000000, 0.3);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    AmendName.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.topLay.addChild(this);
        }
        this.inputText.text = "请输入2~8位昵称";
        this.inputText.textColor = 0xCACACA;
    };
    AmendName.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    AmendName.prototype.addevent = function () {
        this.closeBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        this.decideBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
    };
    AmendName.prototype.onclick = function (e) {
        var target = e.target;
        if (target == this.closeBnt) {
            this.hide();
        }
        else if (target == this.decideBnt) {
            if (this.inputText.text == "请输入2~8位昵称" || this.inputText.text == "") {
                Alertpaner.getInstance.show("名字不能为空");
                this.inputText.text = "请输入2~8位昵称";
                this.inputText.textColor = 0xCACACA;
                return;
            }
            // if (this.inputText.text.length > 16 || this.inputText.text.length < 5) {
            // 	Alertpaner.getInstance.show("请输入5~16位");
            // 	this.inputText.text = "请输入5~16位";
            // 	this.inputText.textColor = 0xCACACA;
            // 	return;
            // }
            // let speail: boolean = this.checheal(this.inputText.text);
            // if (speail == true) {
            // 	Alertpaner.getInstance.show("不能包含特殊字符");
            // 	this.inputText.text = "请输入5~16位名字";
            // 	this.inputText.textColor = 0xCACACA;
            // 	return;
            // }
            ResetName.getInstance.sendHttp(this.inputText.text);
        }
    };
    AmendName.prototype.textInput = function () {
        this.inputText.text;
        if (this.inputText != undefined && this.inputText.text == "请输入2~8位昵称") {
            this.inputText.text = "";
            this.inputText.textColor = 0x000000;
            this.inputText.alpha = 1;
        }
        else if (this.inputText != undefined && this.inputText.text == "") {
            this.inputText.text = "请输入2~8位昵称";
            this.inputText.textColor = 0xCACACA;
            return;
        }
        else {
        }
    };
    AmendName.prototype.checheal = function (str) {
        var decideall = this.ceckeall(str);
        return decideall;
    };
    AmendName.prototype.ceckeall = function (str) {
        var reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im;
        var reg1 = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
        if (reg.test(str) == true || reg1.test(str) == true) {
            return true;
        }
        return false;
    };
    return AmendName;
}(egret.DisplayObjectContainer));
__reflect(AmendName.prototype, "AmendName");
//# sourceMappingURL=AmendName.js.map