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
/**篮球 大小分 */
var B4Wnd = (function (_super) {
    __extends(B4Wnd, _super);
    function B4Wnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(B4Wnd, "getInstance", {
        get: function () {
            if (B4Wnd._mInstance == undefined)
                B4Wnd._mInstance = new B4Wnd();
            return B4Wnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    B4Wnd.prototype.GetItem = function () {
        return this._item;
    };
    B4Wnd.prototype.changeText = function (id, num) {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (id != undefined) {
                if (this._item.Gget(key).getSubItem().GhasKey(id)) {
                    this._item.Gget(key).getSubItem().Gget(id).changeText(num);
                }
            }
            else {
                for (var _b = 0, _c = this._item.Gget(key).getSubItem().keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    this._item.Gget(key).getSubItem().Gget(akey).changeText([]);
                }
            }
        }
    };
    B4Wnd.prototype.updata = function () {
        var _this = this;
        // let item = BasketballDataMrg.getInstance._mLQLBDG;
        var item = BasketballDataMrg.getInstance.getDGList(4);
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new B4infoTop();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key), key);
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        if (item.size > 0)
            ToolMrg.upItemofGHashMap(this._item, item);
        if ((this._item.size <= 0 && this._mZWSJTip != undefined)) {
            this._mZWSJTip.visible = true;
        }
        else {
            if (this._mZWSJTip == undefined) {
                this._mZWSJTip = new egret.Bitmap();
                RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", function (e) {
                    _this._mZWSJTip.$setBitmapData(e);
                    _this._mZWSJTip.x = (GameMain.getInstance.StageWidth - _this._mZWSJTip.width) * 0.5;
                    _this._mZWSJTip.y = (GameMain.getInstance.StageHeight - _this._mZWSJTip.height) * 0.5;
                }, this);
                this.addChild(this._mZWSJTip);
            }
            this._mZWSJTip.visible = false;
        }
    };
    /**之刷新数据 */
    B4Wnd.prototype.onlyFreshData = function () {
        var item = BasketballDataMrg.getInstance.getDGList(4);
        var obj;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.freshData(item.Gget(key));
            }
        }
    };
    /**滑动时更新数据 */
    B4Wnd.prototype.updateYH = function () {
        var objHeight = 0;
        var obj;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
        }
    };
    B4Wnd.prototype.screenSelect = function (data) {
        var item = data;
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new B4infoTop();
                this._item.Gput(key, obj);
            }
            obj.addInterception();
            obj.aa(item.Gget(key), key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
    };
    B4Wnd.prototype.changeItemHeight = function () {
        var objHeight = 0;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = obj.height + objHeight;
        }
    };
    B4Wnd.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.removeInterception();
            for (var _b = 0, _c = obj.getSubItem().keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                obj.getSubItem().Gget(akey).removeInterception();
            }
        }
    };
    B4Wnd.prototype.change = function (event) {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).optimization();
        }
    };
    /**获取滚动位置 */
    B4Wnd.prototype.getViewYYTop = function () {
        return this._scroView.scrollTop;
    };
    B4Wnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.updata();
        this._scroView.addEventListener(egret.Event.CHANGE, this.change, this);
    };
    B4Wnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this.removeInterception();
        }
        this._scroView.removeEventListener(egret.Event.CHANGE, this.change, this);
    };
    B4Wnd.prototype.addScoll = function () {
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    B4Wnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return B4Wnd;
}(egret.DisplayObjectContainer));
__reflect(B4Wnd.prototype, "B4Wnd");
//# sourceMappingURL=B4Wnd.js.map