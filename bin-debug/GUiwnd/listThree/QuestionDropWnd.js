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
var QuestionDropWnd = (function (_super) {
    __extends(QuestionDropWnd, _super);
    function QuestionDropWnd() {
        var _this = _super.call(this) || this;
        _this._mList = new GHashMap();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(QuestionDropWnd, "getInstance", {
        get: function () {
            if (QuestionDropWnd._mInstance == undefined)
                QuestionDropWnd._mInstance = new QuestionDropWnd();
            return QuestionDropWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    QuestionDropWnd.prototype.show = function (strList) {
        this._mListStr = strList;
        GUIManager.getInstance.tipLay.addChild(this);
        var data;
        for (var i = 0; i < strList.length; i++) {
            if (this._mList.GhasKey(i)) {
                data = this._mList.Gget(i);
            }
            else {
                data = new QuestionDrop();
                this._mList.Gput(i, data);
            }
            this.addChild(data);
            data.setStr(strList[i], i);
            data.touchEnabled = true;
            data.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    /**适配处理 */
    QuestionDropWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x000000, 0.1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChild(this._mShareC);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    QuestionDropWnd.prototype.touchDown = function (e) {
        if (e.target == this._mShareC) {
            this.hide();
        }
        else if (e.target instanceof QuestionDrop) {
            this.hide();
            var touch = e.target;
            if (touch.str == this._mListStr[0]) {
                HistoryAwardsWnd.getInstance.show(3);
            }
        }
    };
    QuestionDropWnd.prototype.hide = function () {
        var data;
        for (var _i = 0, _a = this._mList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mList.Gget(key);
            data.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            if (data.parent != undefined) {
                data.parent.removeChild(data);
            }
        }
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return QuestionDropWnd;
}(egret.DisplayObjectContainer));
__reflect(QuestionDropWnd.prototype, "QuestionDropWnd");
var QuestionDrop = (function (_super) {
    __extends(QuestionDrop, _super);
    function QuestionDrop() {
        var _this = _super.call(this) || this;
        _this.ww = 180;
        _this.hh = 60;
        _this.str = "";
        _this.init();
        return _this;
    }
    QuestionDrop.prototype.init = function () {
        this._mHei = new egret.Shape();
        this.addChild(this._mHei);
        this._mHei.graphics.beginFill(0x646464);
        this._mHei.graphics.drawRect(0, 0, this.ww, this.hh);
        this._mHei.graphics.endFill();
        this._mNR = ToolMrg.getText(0, 0, 24, 0xffffff, this.ww);
        this._mNR.height = this.hh;
        this._mNR.textAlign = egret.HorizontalAlign.CENTER;
        this._mNR.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mNR.text = "";
        this.addChild(this._mNR);
        this._mXHX = new egret.Shape();
        this.addChild(this._mXHX);
        this._mXHX.graphics.beginFill(0xF5F5F7);
        this._mXHX.graphics.drawRect(0, this.hh, this.ww, 1.5);
        this._mXHX.graphics.endFill();
    };
    /**设置内容 */
    QuestionDrop.prototype.setStr = function (str, i) {
        this.str = str;
        if (this._mNR != undefined) {
            this._mNR.text = str;
            this.x = GameMain.getInstance.StageWidth - this.ww;
            this.y = 138 + i * (this.hh + 2);
        }
    };
    return QuestionDrop;
}(egret.DisplayObjectContainer));
__reflect(QuestionDrop.prototype, "QuestionDrop");
//# sourceMappingURL=QuestionDropWnd.js.map