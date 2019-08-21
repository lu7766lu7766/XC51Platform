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
/**切换 排3 */
var QTthree = (function (_super) {
    __extends(QTthree, _super);
    function QTthree() {
        var _this = _super.call(this) || this;
        _this._item = new GHashMap();
        _this._bj = new egret.Bitmap();
        _this.addChild(_this._bj);
        _this._bj.y = 96 + GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/xlabg_home@2x.png", function (e) {
            _this._bj.$setBitmapData(e);
            _this._bj.x = (750 - _this._bj.width) * 0.5;
        }, _this);
        _this._bj.touchEnabled = true;
        var _item = ThreeBox.getInstance.titleItem;
        var _loop_1 = function (i) {
            var obj = new ThreeQTInfo(i, _item[i]);
            this_1._item.Gput(i, obj);
            obj.x = 296;
            obj.y = 96 + GameValue.adaptationScreen + 15 + 20 + 62 * i;
            this_1.addChild(obj);
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (obj.id == ThreeBox.getInstance.titleIndex) {
                    _this.hide();
                    return;
                }
                ThreeBox.getInstance.ClickClear();
                ThreeBox.getInstance.titleIndex = obj.id;
                ThreeBox.getInstance.changeText();
                _this.hide();
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < _item.length; i++) {
            _loop_1(i);
        }
        _this.setDB();
        return _this;
    }
    Object.defineProperty(QTthree, "getInstance", {
        get: function () {
            if (QTthree._mInstance == undefined)
                QTthree._mInstance = new QTthree();
            return QTthree._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    QTthree.prototype.changeList = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == ThreeBox.getInstance.titleIndex) {
                this._item.Gget(key).selectInfo();
            }
            else {
                this._item.Gget(key).noselectInfo();
            }
        }
    };
    QTthree.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.changeList();
    };
    QTthree.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**适配处理 */
    QTthree.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 0.01);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, function (e) { _this.hide(); }, this);
    };
    return QTthree;
}(egret.DisplayObjectContainer));
__reflect(QTthree.prototype, "QTthree");
var ThreeQTInfo = (function (_super) {
    __extends(ThreeQTInfo, _super);
    function ThreeQTInfo(id, text) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this._text = ToolMrg.getText(0, 0, 28, 0xffffff, 160);
        _this.addChild(_this._text);
        _this._text.height = 52;
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._text.text = text;
        _this.setDB();
        return _this;
    }
    ThreeQTInfo.prototype.selectInfo = function () {
        this._text.textColor = 0xf72e52;
        this._mShareC.graphics.clear();
        this._mShareC.graphics.beginFill(0x333333, 1);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52, 20);
        this._mShareC.graphics.endFill();
    };
    ThreeQTInfo.prototype.noselectInfo = function () {
        this._text.textColor = 0xffffff;
        this._mShareC.graphics.clear();
        this._mShareC.graphics.beginFill(0x333333, 0.01);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52, 20);
        this._mShareC.graphics.endFill();
    };
    /**适配处理 */
    ThreeQTInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x333333, 0.01);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52, 20);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ThreeQTInfo;
}(egret.DisplayObjectContainer));
__reflect(ThreeQTInfo.prototype, "ThreeQTInfo");
//# sourceMappingURL=QTthree.js.map