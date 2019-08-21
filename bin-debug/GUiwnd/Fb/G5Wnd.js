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
/**半全场 */
var G5Wnd = (function (_super) {
    __extends(G5Wnd, _super);
    function G5Wnd() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(G5Wnd, "getInstance", {
        get: function () {
            if (G5Wnd._mInstance == undefined)
                G5Wnd._mInstance = new G5Wnd();
            return G5Wnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    G5Wnd.prototype.GetItem = function () {
        return this._item;
    };
    G5Wnd.prototype.updata = function () {
        var _this = this;
        // let item = FootballDataMrg.getInstance._mZQLBDG;
        var item = FootballDataMrg.getInstance.getDGList(5);
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new G5infoTop();
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
    /**滑动时更新数据 */
    G5Wnd.prototype.updateYH = function () {
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
    G5Wnd.prototype.screenSelect = function (data) {
        var item = data;
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new G5infoTop();
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
    G5Wnd.prototype.changeItemHeight = function () {
        var objHeight = 0;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = obj.height + objHeight;
        }
    };
    /**获取滚动位置 */
    G5Wnd.prototype.getViewYYTop = function () {
        return this._scroView.scrollTop;
    };
    G5Wnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.updata();
        this._scroView.addEventListener(egret.Event.CHANGE, this.change, this);
    };
    /**之刷新数据 */
    G5Wnd.prototype.onlyFreshData = function () {
        // let item = FootballDataMrg.getInstance._mZQLBDG;
        var item = FootballDataMrg.getInstance.getDGList(5);
        var obj;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.freshData(item.Gget(key));
            }
        }
    };
    G5Wnd.prototype.change = function (event) {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).optimization();
        }
    };
    G5Wnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).removeInterception();
                for (var _b = 0, _c = this._item.Gget(key).getSubItem().keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    this._item.Gget(key).getSubItem().Gget(akey).removeInterception();
                }
            }
        }
        this._scroView.removeEventListener(egret.Event.CHANGE, this.change, this);
    };
    G5Wnd.prototype.addScoll = function () {
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
    G5Wnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return G5Wnd;
}(egret.DisplayObjectContainer));
__reflect(G5Wnd.prototype, "G5Wnd");
//# sourceMappingURL=G5Wnd.js.map