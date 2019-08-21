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
/**跟 documentary 现在用DmWnd_2类 */
var DmWnd = (function (_super) {
    __extends(DmWnd, _super);
    function DmWnd() {
        var _this = _super.call(this) || this;
        _this._strItem = ["金额", "热门", "回报率", "发单时间", "关注方案"];
        _this._index = 0;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("跟单", -_this.y, 1);
        _this.addChild(_this._topUI);
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._question = new egret.Bitmap();
        _this.addChild(_this._question);
        _this._question.x = 676;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png", function (e) {
            _this._question.$setBitmapData(e);
            _this._question.y = (96 - _this._question.height) * 0.5;
        }, _this);
        _this.addContain();
        _this.addCenter();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(DmWnd, "getInstance", {
        get: function () {
            if (DmWnd._mInstance == undefined)
                DmWnd._mInstance = new DmWnd();
            return DmWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DmWnd.prototype.addContain = function () {
        var _this = this;
        this._leftBox = new egret.Shape();
        this._mContain.addChild(this._leftBox);
        this._leftBox.graphics.beginFill(0xffffff);
        this._leftBox.graphics.drawRect(0, 0, 375, 152);
        this._leftBox.graphics.endFill();
        this._leftBox.touchEnabled = true;
        this._rightBox = new egret.Shape();
        this._mContain.addChild(this._rightBox);
        this._rightBox.graphics.beginFill(0xffffff);
        this._rightBox.graphics.drawRect(375, 0, 375, 152);
        this._rightBox.graphics.endFill();
        this._rightBox.touchEnabled = true;
        var centerShape = new egret.Shape();
        this._mContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xdedede);
        centerShape.graphics.drawRect(374.5, 0, 1.5, 152);
        centerShape.graphics.endFill();
        this._leftImg = new egret.Bitmap();
        this._mContain.addChild(this._leftImg);
        RES.getResByUrl("resource/assets/images/ui/zph_expert@2x.png", function (e) {
            _this._leftImg.$setBitmapData(e);
            _this._leftImg.y = 28;
            _this._leftImg.x = 68;
        }, this);
        this._rightImg = new egret.Bitmap();
        this._mContain.addChild(this._rightImg);
        RES.getResByUrl("resource/assets/images/ui/yph_expert@2x.png", function (e) {
            _this._rightImg.$setBitmapData(e);
            _this._rightImg.y = 28;
            _this._rightImg.x = 375 + 68;
        }, this);
        this._leftText = ToolMrg.getText(186, 0, 36, 0x333333);
        this._mContain.addChild(this._leftText);
        this._leftText.height = 152;
        this._leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._leftText.text = "周排行";
        this._rightText = ToolMrg.getText(375 + 186, 0, 36, 0x333333);
        this._mContain.addChild(this._rightText);
        this._rightText.height = 152;
        this._rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._rightText.text = "周排行";
        var pShape = new egret.Shape();
        this._mContain.addChild(pShape);
        pShape.graphics.beginFill(0xf5f5f7);
        pShape.graphics.drawRect(0, 152, 750, 10);
        pShape.graphics.endFill();
        var title = ToolMrg.getText(28, 182, 32, 0x333333);
        this._mContain.addChild(title);
        title.bold = true;
        title.text = "推荐大神";
        var checkImg = new egret.Bitmap();
        this._mContain.addChild(checkImg);
        checkImg.y = 186;
        checkImg.x = 190;
        RES.getResByUrl("resource/assets/images/ui/search_expert@2x.png", function (e) {
            checkImg.$setBitmapData(e);
        }, this);
        var tShape = new egret.Shape();
        this._mContain.addChild(tShape);
        tShape.graphics.beginFill(0xdedede);
        tShape.graphics.drawRect(0, 246, 750, 1.5);
        tShape.graphics.endFill();
        var lShape = new egret.Shape();
        this._mContain.addChild(lShape);
        lShape.graphics.beginFill(0xf5f5f7);
        lShape.graphics.drawRect(0, 710, 750, 10);
        lShape.graphics.endFill();
        this._leftBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._leftBox.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    DmWnd.prototype.touchDown = function (e) {
        if (e.target == this._leftBox) {
        }
        else if (e.target == this._rightBox) {
        }
    };
    DmWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    DmWnd.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
    };
    DmWnd.prototype.addCenter = function () {
        var _this = this;
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 720;
        this._item = new GHashMap();
        var objWidth = 0;
        var _loop_1 = function (i) {
            var obj = new DmCenter(this_1._strItem[i], i);
            this_1._centerContain.addChild(obj);
            obj.x = objWidth;
            objWidth = obj.width + objWidth;
            this_1._item.Gput(i, obj);
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this._index == obj.id)
                    return;
                _this._index = obj.id;
                _this.changeCenter();
            }, this_1);
        };
        var this_1 = this;
        for (var i = 0; i < this._strItem.length; i++) {
            _loop_1(i);
        }
        this.changeCenter();
        var cShape = new egret.Shape();
        this._centerContain.addChild(cShape);
        cShape.graphics.beginFill(0xdedede);
        cShape.graphics.drawRect(0, 86, 750, 1.5);
        cShape.graphics.endFill();
    };
    DmWnd.prototype.changeCenter = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._index == key) {
                this._item.Gget(key).selectStyle();
            }
            else {
                this._item.Gget(key).noselectStyle();
            }
        }
        if (this._index == 0) {
        }
        else if (this._index == 1) {
        }
        else if (this._index == 2) {
        }
        else if (this._index == 3) {
        }
        else if (this._index == 4) {
        }
    };
    DmWnd.prototype.addScoll = function () {
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
    DmWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - this.y - 206);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    };
    return DmWnd;
}(egret.DisplayObjectContainer));
__reflect(DmWnd.prototype, "DmWnd");
var DmCenter = (function (_super) {
    __extends(DmCenter, _super);
    function DmCenter(str, id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this._text = ToolMrg.getText(0, 20, 28, 0x999999);
        _this._text.text = str;
        _this.addChild(_this._text);
        _this._text.width = str.length * 13 + _this._text.textWidth;
        _this._text.textAlign = egret.HorizontalAlign.CENTER;
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0xf72d52);
        _this._shape.graphics.drawRoundRect(_this._text.width / 2 - 16, 68, 32, 4, 10);
        _this._shape.graphics.endFill();
        _this._shape.visible = false;
        return _this;
    }
    DmCenter.prototype.selectStyle = function () {
        this._shape.visible = true;
        this._text.textColor = 0xF72E52;
    };
    DmCenter.prototype.noselectStyle = function () {
        this._shape.visible = false;
        this._text.textColor = 0x999999;
    };
    return DmCenter;
}(egret.DisplayObjectContainer));
__reflect(DmCenter.prototype, "DmCenter");
//# sourceMappingURL=DmWnd.js.map