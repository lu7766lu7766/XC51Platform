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
/**软键盘 */
var keyboard = (function (_super) {
    __extends(keyboard, _super);
    function keyboard() {
        var _this = _super.call(this) || this;
        _this._size = 0;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.touchEnabled = true;
        var bj = new egret.Shape();
        _this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight + 100, 30);
        bj.graphics.endFill();
        _this._strText = ToolMrg.getText(30, 30, 30, 0x000000);
        _this._mContain.addChild(_this._strText);
        _this._strText.width = GameMain.getInstance.StageWidth - _this._strText.x * 2;
        _this._strText.height = 80;
        _this._strText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._return = new egret.Shape();
        _this._mContain.addChild(_this._return);
        _this._return.graphics.beginFill(0x000000);
        _this._return.graphics.drawRect(10, 0, 80, 50);
        _this._return.graphics.endFill();
        _this._return.touchEnabled = true;
        // this._return.alpha = 0.001;
        _this._sure = new egret.Shape();
        _this._mContain.addChild(_this._sure);
        _this._sure.graphics.beginFill(0xf72e52);
        _this._sure.graphics.drawRect(90, 0, 80, 50);
        _this._sure.graphics.endFill();
        _this._sure.touchEnabled = true;
        // this._sure.alpha = 0.001;
        _this._returnImg = new egret.Bitmap();
        _this._mContain.addChild(_this._returnImg);
        _this._sureImg = new egret.Bitmap();
        _this._mContain.addChild(_this._sureImg);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(keyboard, "getInstance", {
        get: function () {
            if (keyboard._mInstance == undefined)
                keyboard._mInstance = new keyboard();
            return keyboard._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**传入对象 size为文本最多长度 Y为此键盘二级页面距离舞台y，空则为最顶部 */
    keyboard.prototype.show = function (data, size, Y) {
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
            var num = 0;
            if (Y != undefined)
                num = Y;
            this._mContain.y = GameMain.getInstance.StageHeight;
            egret.Tween.get(this._mContain).to({ y: num }, 300, egret.Ease.circOut);
        }
        if (size != undefined)
            this._size = size;
        this._data = data;
        this._strText.text = data.str;
        this._strText.type = egret.TextFieldType.INPUT;
        this._strText.inputType = egret.TextFieldInputType.TEXT;
        //键盘侦听
        document.addEventListener("keydown", this.keyboard);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this._sure.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    keyboard.prototype.keyboard = function (event) {
        var that = this;
        var num = event.keyCode;
        if (num == 13) {
            keyboard.getInstance._strText.type = egret.TextFieldType.DYNAMIC;
            keyboard.getInstance.touchDown(null);
        }
    };
    /**确认  */
    keyboard.prototype.touchDown = function (e) {
        if (this._strText.text.length > this._size) {
            Alertpaner.getInstance.show("\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7" + this._size + "\u4E2A\u6587\u5B57");
            this._strText.type = egret.TextFieldType.INPUT;
            this._strText.inputType = egret.TextFieldInputType.TEXT;
            return;
        }
        this._data.strText.text = this._strText.text;
        this._data.backFun.call(this._data.thisObj);
        this.hide();
    };
    keyboard.prototype.hide = function () {
        var _this = this;
        document.removeEventListener("keydown", this.keyboard);
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.hide, this);
        this._sure.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._size = 0;
        if (this.parent != undefined) {
            egret.Tween.get(this._mContain).to({ y: GameMain.getInstance.StageHeight }, 300, egret.Ease.circInOut).call(function () {
                _this.parent.removeChild(_this);
                _this._strText.text = "";
            });
        }
    };
    /**适配处理 */
    keyboard.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.4);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return keyboard;
}(egret.DisplayObjectContainer));
__reflect(keyboard.prototype, "keyboard");
//# sourceMappingURL=keyboard.js.map