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
/**跟单记录 */
var GDRecordWnd = (function (_super) {
    __extends(GDRecordWnd, _super);
    function GDRecordWnd() {
        var _this = _super.call(this) || this;
        _this._str = ["全部", "未中奖", "已中奖"];
        /** 0全部 1未中奖 2已中奖 */
        _this._index = 0;
        _this.touchEnabled = true;
        _this._textItem = new GHashMap();
        _this._item = new GHashMap();
        _this._topUI = new TopUI("跟单记录");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRect(0, 96 + GameValue.adaptationScreen, GameMain.getInstance.StageWidth, 80);
        shape.graphics.endFill();
        var num = GameMain.getInstance.StageWidth / 3;
        for (var i = 0; i < _this._str.length; i++) {
            var objText = ToolMrg.getText(i * num, 96 + GameValue.adaptationScreen + 0, 28, 0x333333, num);
            _this.addChild(objText);
            objText.height = 80;
            objText.textAlign = egret.HorizontalAlign.CENTER;
            objText.verticalAlign = egret.VerticalAlign.MIDDLE;
            objText.text = _this._str[i];
            _this._textItem.Gput(i, objText);
            objText.touchEnabled = true;
        }
        _this._topShape = new egret.Shape();
        _this.addChild(_this._topShape);
        _this._topShape.graphics.beginFill(0xf96d67);
        _this._topShape.graphics.drawRect(101, 96 + GameValue.adaptationScreen + 78.5 - 4, 48, 4);
        _this._topShape.graphics.endFill();
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 96 + GameValue.adaptationScreen + 78.5, GameMain.getInstance.StageWidth, 1.5);
        link.graphics.endFill();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._unText = new egret.Bitmap();
        _this._unText.visible = false;
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._unText.$setBitmapData(e);
            _this._unText.x = (GameMain.getInstance.StageWidth - _this._unText.width) * 0.5;
            _this._unText.y = (GameMain.getInstance.StageHeight - _this._unText.height) * 0.5;
        }, _this);
        _this.addChild(_this._unText);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(GDRecordWnd, "getInstance", {
        get: function () {
            if (GDRecordWnd._mInstance == undefined)
                GDRecordWnd._mInstance = new GDRecordWnd();
            return GDRecordWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GDRecordWnd.prototype.updata = function (bool) {
        var item = GDRecordMrg.getInstance.GDRItem;
        var selectItem = new GHashMap();
        if (this._index == 0) {
            selectItem = item;
        }
        else if (this._index == 1) {
            for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                if (item.Gget(key)._isWin == 2)
                    selectItem.Gput(key, item.Gget(key));
            }
        }
        else if (this._index == 2) {
            for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                var key = _c[_b];
                if (item.Gget(key)._isWin == 3)
                    selectItem.Gput(key, item.Gget(key));
            }
        }
        var objHeight = 0;
        for (var _d = 0, _e = selectItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new GDRecordInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(selectItem.Gget(key));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            obj.touchEnabled = true;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDownSelect, this);
        }
        ToolMrg.upItemofGHashMap(this._item, selectItem);
        this._scroView.setScrollTop(0);
        if (selectItem.size > 0 || bool == true) {
            this._unText.visible = false;
        }
        else {
            this._unText.visible = true;
        }
    };
    GDRecordWnd.prototype.changeText = function (bool) {
        for (var _i = 0, _a = this._textItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == this._index)
                this._textItem.Gget(key).textColor = 0xF72F52;
            else
                this._textItem.Gget(key).textColor = 0x333333;
        }
        egret.Tween.get(this._topShape).to({ "x": this._index * 250 }, 200, egret.Ease.circOut);
        this.updata(bool);
    };
    GDRecordWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.changeText(true);
        GD_RecordList.getInstance.sendHttp(UserData.getInstance.userId, 1);
    };
    GDRecordWnd.prototype.hide = function () {
        var obj;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._item.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDownSelect, this);
        }
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._index = 0;
        }
    };
    GDRecordWnd.prototype.touchDownSelect = function (e) {
        if (e.target instanceof GDRecordInfo) {
            var data = e.target;
            if (data._data != undefined) {
                // Gen_Info.getInstance.sendHttp(data._data.order_id, data._data._type,1);
                Order_ListT.getInstance.sendHttp(data._data.order_id, 1);
            }
        }
    };
    GDRecordWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    GDRecordWnd.prototype.clickTopText = function (e) {
        if (e.target == this._textItem.Gget(0)) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._textItem.Gget(1)) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        else if (e.target == this._textItem.Gget(2)) {
            if (this._index == 2)
                return;
            this._index = 2;
        }
        this.changeText();
    };
    GDRecordWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._textItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._textItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTopText, this);
        }
    };
    GDRecordWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._textItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._textItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickTopText, this);
        }
    };
    GDRecordWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 80;
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
    GDRecordWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return GDRecordWnd;
}(egret.DisplayObjectContainer));
__reflect(GDRecordWnd.prototype, "GDRecordWnd");
//# sourceMappingURL=GDRecordWnd.js.map