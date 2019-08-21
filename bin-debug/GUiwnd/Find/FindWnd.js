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
var FindWnd = (function (_super) {
    __extends(FindWnd, _super);
    function FindWnd() {
        var _this = _super.call(this) || this;
        _this._item = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._centerContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        // this._mContain.addChild(this._centerContain);
        _this._mContain.y = GameValue.adaptationScreen;
        // this._centerContain.y = 96;
        var title = ToolMrg.getText(0, 0, 36, 0xf72f52, 750);
        _this._mContain.addChild(title);
        title.height = 96;
        title.verticalAlign = egret.VerticalAlign.MIDDLE;
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.text = "优惠活动";
        var topShape = new egret.Shape();
        _this._mContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(0, 94, 750, 2);
        topShape.graphics.endFill();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(FindWnd, "getInstance", {
        get: function () {
            if (FindWnd._mInstance == undefined)
                FindWnd._mInstance = new FindWnd();
            return FindWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FindWnd.prototype.upData = function () {
        var item = FindMrg.getInstance._findItem;
        var objHeight = 30;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new FindInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + 358;
            if (obj.parent == undefined)
                this._centerContain.addChild(obj);
        }
    };
    FindWnd.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
        this.upData();
    };
    FindWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).removeInterception();
            }
        }
    };
    FindWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + this._mContain.y;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._centerContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 100;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    FindWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        var mZZ = new egret.Shape();
        this._centerContain.addChild(mZZ);
        mZZ.graphics.beginFill(0xF5F5F7);
        mZZ.graphics.drawRect(0, 0, GameMain.getInstance.StageHeight, this._scroView.height - 96);
        mZZ.graphics.endFill();
    };
    return FindWnd;
}(egret.DisplayObjectContainer));
__reflect(FindWnd.prototype, "FindWnd");
//# sourceMappingURL=FindWnd.js.map