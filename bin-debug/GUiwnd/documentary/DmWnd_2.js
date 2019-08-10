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
var DmWnd_2 = (function (_super) {
    __extends(DmWnd_2, _super);
    function DmWnd_2() {
        var _this = _super.call(this) || this;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("跟单", -_this.y, 1);
        _this.addChild(_this._topUI);
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        // this._undefinedData = ToolMrg.getText(0,(GameMain.getInstance.StageHeight - 96+GameValue.adaptationScreen)*0.45,30,0x000000,GameMain.getInstance.StageWidth);
        _this._undefinedData = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._undefinedData.$setBitmapData(e);
            _this._undefinedData.x = (GameMain.getInstance.StageWidth - _this._undefinedData.width) * 0.5;
            _this._undefinedData.y = (GameMain.getInstance.StageHeight - _this._undefinedData.height - 150) * 0.5;
        }, _this);
        _this._mContain.addChild(_this._undefinedData);
        _this._undefinedData.visible = false;
        // this._textItem = new GHashMap<egret.TextField>();
        _this._item = new GHashMap();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(DmWnd_2, "getInstance", {
        get: function () {
            if (DmWnd_2._mInstance == undefined)
                DmWnd_2._mInstance = new DmWnd_2();
            return DmWnd_2._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DmWnd_2.prototype.upData = function () {
        var item = DmC_infoMsg.getInstance.item;
        if (item.size < 1) {
            this._undefinedData.visible = true;
        }
        else {
            this._undefinedData.visible = false;
        }
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new DmC_info();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
    };
    DmWnd_2.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
        GD_List.getInstance.sendHttp();
        this.upData();
    };
    DmWnd_2.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).removeInterception();
            }
        }
    };
    DmWnd_2.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96;
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
    DmWnd_2.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - this.y - 206);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    };
    return DmWnd_2;
}(egret.DisplayObjectContainer));
__reflect(DmWnd_2.prototype, "DmWnd_2");
//# sourceMappingURL=DmWnd_2.js.map