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
/**资金明细 */
var CapitalWnd = (function (_super) {
    __extends(CapitalWnd, _super);
    function CapitalWnd() {
        var _this = _super.call(this) || this;
        _this.str = ["购彩", "充值", "派奖", "提取", "佣金", "返水", "奖励"];
        _this._index = 0;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._CDItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._topContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._topContain);
        _this._topContain.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("资金明细");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this.addScoll();
        _this.joinTop();
        _this._tipText = new egret.Bitmap();
        _this._tipText.visible = false;
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._tipText.$setBitmapData(e);
            _this._tipText.x = (GameMain.getInstance.StageWidth - _this._tipText.width) * 0.5;
            _this._tipText.y = (GameMain.getInstance.StageHeight - _this._tipText.height) * 0.5;
        }, _this);
        _this.addChild(_this._tipText);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(CapitalWnd, "getInstance", {
        get: function () {
            if (CapitalWnd._mInstance == undefined)
                CapitalWnd._mInstance = new CapitalWnd();
            return CapitalWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    CapitalWnd.prototype.upData = function (tool) {
        var item = CDMrg.getInstance._AllZJ;
        var num = 0;
        var dataItem;
        if (this._index == 0) {
            num = -item.b;
            dataItem = item.bItem;
        }
        else if (this._index == 1) {
            num = item.p;
            dataItem = item.pItem;
        }
        else if (this._index == 2) {
            num = item.j;
            dataItem = item.jItem;
        }
        else if (this._index == 3) {
            num = -item.t;
            dataItem = item.tItem;
        }
        else if (this._index == 4) {
            num = item.w;
            dataItem = item.wItem;
        }
        else if (this._index == 5) {
            num = item.f;
            dataItem = item.fItem;
        }
        else if (this._index == 6) {
            num = item.o;
            dataItem = item.oItem;
        }
        var objHeight = 0;
        for (var _i = 0, _a = dataItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._CDItem.Gget(key)) {
                obj = this._CDItem.Gget(key);
            }
            else {
                obj = new CDInfo();
                this._CDItem.Gput(key, obj);
            }
            obj.aa(dataItem.Gget(key), this._index);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
            this._scroView.setScrollTop(0);
        }
        ToolMrg.upItemofGHashMap(this._CDItem, dataItem);
        if (dataItem.size > 0 || tool) {
            this._tipText.visible = false;
            this._topContent.textFlow = [
                { "text": "\u603B" + this.str[this._index] + "\uFF1A", style: { "textColor": 0x333333 } },
                { "text": (num / 100).toFixed(2) + "\u5143", style: { "textColor": 0x17B22C } }
            ];
        }
        else {
            this._tipText.visible = true;
            this._topContent.textFlow = [
                { "text": "\u603B" + this.str[this._index] + "\uFF1A", style: { "textColor": 0x333333 } },
                { "text": "0\u5143", style: { "textColor": 0x17B22C } }
            ];
        }
    };
    /**从0开始 从左往右 */
    CapitalWnd.prototype.show = function (setIndex) {
        if (setIndex != undefined)
            this._index = setIndex;
        GUIManager.getInstance.topLay.addChild(this);
        CD_List.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.changeText(true);
    };
    CapitalWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    CapitalWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
            this._index = 0;
        }
    };
    CapitalWnd.prototype.changeText = function (tool) {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._index == key) {
                this._item.Gget(key).textColor = 0xF72E52;
            }
            else {
                this._item.Gget(key).textColor = 0x333333;
            }
        }
        egret.Tween.get(this._topShape).to({ "x": this._index * this.num }, 300, egret.Ease.circOut);
        this.upData(tool);
    };
    CapitalWnd.prototype.selectToInfo = function (e) {
        if (e.target == this._item.Gget(0)) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._item.Gget(1)) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        else if (e.target == this._item.Gget(2)) {
            if (this._index == 2)
                return;
            this._index = 2;
        }
        else if (e.target == this._item.Gget(3)) {
            if (this._index == 3)
                return;
            this._index = 3;
        }
        else if (e.target == this._item.Gget(4)) {
            if (this._index == 4)
                return;
            this._index = 4;
        }
        else if (e.target == this._item.Gget(5)) {
            if (this._index == 5)
                return;
            this._index = 5;
        }
        else if (e.target == this._item.Gget(6)) {
            if (this._index == 6)
                return;
            this._index = 6;
        }
        this.changeText();
    };
    CapitalWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectToInfo, this);
        }
    };
    CapitalWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectToInfo, this);
        }
    };
    CapitalWnd.prototype.joinTop = function () {
        var topShape1 = new egret.Shape();
        this._topContain.addChild(topShape1);
        topShape1.graphics.beginFill(0xffffff);
        topShape1.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        topShape1.graphics.endFill();
        this.num = GameMain.getInstance.StageWidth / this.str.length;
        for (var i = 0; i < this.str.length; i++) {
            var obj = ToolMrg.getText(i * this.num, 0, 28, 0x333333, this.num);
            obj.height = 80;
            obj.verticalAlign = egret.VerticalAlign.MIDDLE;
            obj.textAlign = egret.HorizontalAlign.CENTER;
            obj.text = this.str[i];
            this._topContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.touchEnabled = true;
        }
        this._topShape = new egret.Shape();
        this._topContain.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect((this.num - 48) / 2, 76, 48, 4, 8);
        this._topShape.graphics.endFill();
        var topShape2 = new egret.Shape();
        this._topContain.addChild(topShape2);
        topShape2.graphics.beginFill(0xdedede);
        topShape2.graphics.drawRect(0, 80, GameMain.getInstance.StageWidth, 2);
        topShape2.graphics.endFill();
        var topShape3 = new egret.Shape();
        this._topContain.addChild(topShape3);
        topShape3.graphics.beginFill(0xF5F5F7);
        topShape3.graphics.drawRect(0, 82, GameMain.getInstance.StageWidth, 78);
        topShape3.graphics.endFill();
        this._topContent = ToolMrg.getText(26, 80, 24, 0x333333);
        this._topContain.addChild(this._topContent);
        this._topContent.height = 80;
        this._topContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._topContent.textAlign = egret.HorizontalAlign.CENTER;
    };
    CapitalWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 160;
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
    CapitalWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return CapitalWnd;
}(egret.DisplayObjectContainer));
__reflect(CapitalWnd.prototype, "CapitalWnd");
//# sourceMappingURL=CapitalWnd.js.map