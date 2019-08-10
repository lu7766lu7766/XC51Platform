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
/**发单佣金 */
var SCWnd = (function (_super) {
    __extends(SCWnd, _super);
    function SCWnd() {
        var _this = _super.call(this) || this;
        _this.str = ["全部", "未中奖", "已中奖"];
        _this._index = 0;
        _this.num = 0;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("发单佣金", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        var bjShape = new egret.Shape();
        _this.addChild(bjShape);
        bjShape.graphics.beginFill(0xffffff);
        bjShape.graphics.drawRect(0, 0.5, GameMain.getInstance.StageWidth, 80);
        bjShape.graphics.endFill();
        _this._strItem = new GHashMap();
        _this._item = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.num = GameMain.getInstance.StageWidth / _this.str.length;
        for (var i = 0; i < _this.str.length; i++) {
            var obj = ToolMrg.getText(i * _this.num, 0, 28, 0x333333, _this.num);
            obj.height = 80;
            _this.addChild(obj);
            obj.verticalAlign = egret.VerticalAlign.MIDDLE;
            obj.textAlign = egret.HorizontalAlign.CENTER;
            obj.text = _this.str[i];
            obj.touchEnabled = true;
            _this._strItem.Gput(i, obj);
        }
        _this._topShape = new egret.Shape();
        _this.addChild(_this._topShape);
        _this._topShape.graphics.beginFill(0xf96d67);
        _this._topShape.graphics.drawRect((_this.num - 48) / 2, 78.5 - 4, 48, 4);
        _this._topShape.graphics.endFill();
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 78.5, GameMain.getInstance.StageWidth, 1.5);
        shape.graphics.endFill();
        _this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._tipText.$setBitmapData(e);
            _this._tipText.x = (GameMain.getInstance.StageWidth - _this._tipText.width) * 0.5;
            _this._tipText.y = (GameMain.getInstance.StageHeight - _this._tipText.height) * 0.5;
        }, _this);
        _this.addChild(_this._tipText);
        _this._tipText.visible = false;
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SCWnd, "getInstance", {
        get: function () {
            if (SCWnd._mInstance == undefined)
                SCWnd._mInstance = new SCWnd();
            return SCWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SCWnd.prototype.updata = function () {
        var item;
        if (this._index == 0)
            item = SCMrg.getInstance.getAllSCitem();
        else if (this._index == 1)
            item = SCMrg.getInstance.getunScItem();
        else if (this._index == 2)
            item = SCMrg.getInstance.getzScItem();
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new SCInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.y = objHeight;
            obj.touchEnabled = true;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDownSelect, this);
        }
        if (item.size == 0)
            this._tipText.visible = true;
        else
            this._tipText.visible = false;
        ToolMrg.upItemofGHashMap(this._item, item);
        this._scroView.setScrollTop(0);
    };
    SCWnd.prototype.touchDownSelect = function (e) {
        if (e.target instanceof SCInfo) {
            var data = e.target;
            if (data._data != undefined) {
                Gen_Info.getInstance.sendHttp(data._data.id, data._data._type);
            }
        }
    };
    SCWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        GetSC_Data.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.changeTop();
    };
    SCWnd.prototype.hide = function () {
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
            this.hide();
            this.removeInterception();
        }
    };
    SCWnd.prototype.changeTop = function () {
        for (var _i = 0, _a = this._strItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == this._index)
                this._strItem.Gget(key).textColor = 0xF72F52;
            else
                this._strItem.Gget(key).textColor = 0x333333;
        }
        egret.Tween.get(this._topShape).to({ x: this.num * this._index }, 200, egret.Ease.circOut);
        this.updata();
    };
    SCWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    SCWnd.prototype.topClick = function (e) {
        if (e.target == this._strItem.Gget(0)) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._strItem.Gget(1)) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        else if (e.target == this._strItem.Gget(2)) {
            if (this._index == 2)
                return;
            this._index = 2;
        }
        this.changeTop();
    };
    SCWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._strItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._strItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        }
    };
    SCWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._strItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._strItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        }
    };
    /**适配处理 */
    SCWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    SCWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 80;
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
    return SCWnd;
}(egret.DisplayObjectContainer));
__reflect(SCWnd.prototype, "SCWnd");
//# sourceMappingURL=SCWnd.js.map