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
/**选择几串几 */
var FBselect = (function (_super) {
    __extends(FBselect, _super);
    function FBselect() {
        var _this = _super.call(this) || this;
        _this.numItem = new GHashMap();
        _this._mitem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mShape = new egret.Shape();
        _this._mContain.addChild(_this._mShape);
        _this._mShape.touchEnabled = true;
        _this._topContain = new egret.DisplayObjectContainer();
        _this._centerContain = new egret.DisplayObjectContainer();
        _this._downContain = new egret.DisplayObjectContainer();
        _this._mContain.addChild(_this._topContain);
        _this._mContain.addChild(_this._centerContain);
        _this._mContain.addChild(_this._downContain);
        _this._centerContain.y = 112;
        _this.joinTop();
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(FBselect, "getInstance", {
        get: function () {
            if (FBselect._mInstance == undefined)
                FBselect._mInstance = new FBselect();
            return FBselect._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FBselect.prototype.touchDown = function (e) {
        if (e.target == this._defineBtn) {
            GoFBBuy.getInstance.saveLeftText(this.numItem);
        }
        this.hide();
    };
    FBselect.prototype.updata = function () {
        var obj;
        for (var i = 0; i < this._allSelect.length; i++) {
            if (this._mitem.GhasKey(i)) {
                obj = this._mitem.Gget(i);
            }
            else {
                obj = new FBselectInfo();
                this._mitem.Gput(i, obj);
            }
            obj.aa(this._allSelect[i], this._allSelect[i]);
            if (i < 3) {
                obj.x = 52 + i * 208;
                obj.y = 42;
            }
            else if (i < 6) {
                obj.x = 52 + (i - 3) * 208;
                obj.y = 42 + 1 * 100;
            }
            else {
                obj.x = 52 + (i - 6) * 208;
                obj.y = 42 + 2 * 100;
            }
            if (obj.parent == undefined)
                this._centerContain.addChild(obj);
        }
        ToolMrg.upItemofArray(this._mitem, this._allSelect);
        for (var _i = 0, _a = this._mitem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj_1 = this._mitem.Gget(key);
            if (this.numItem.GhasKey(obj_1.id))
                obj_1.selectType = true;
            else
                obj_1.selectType = false;
            obj_1.changeCss();
        }
        var num = 0;
        if (this._mitem.size < 4)
            num = 1;
        else if (this._mitem.size < 7)
            num = 2;
        else
            num = 3;
        this._downContain.y = 112 + num * 100 + 42;
        this._mShape.graphics.clear();
        this._mShape.graphics.beginFill(0xffffff);
        this._mShape.graphics.drawRoundRect(0, 0, 680, 112 + num * 100 + 42 + 154, 25);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    };
    FBselect.prototype.show = function (allSelect, selectData) {
        GUIManager.getInstance.tipLay.addChild(this);
        this._allSelect = allSelect;
        for (var i = 0; i < selectData.length; i++) {
            this.numItem.Gput(selectData[i], selectData[i]);
        }
        this.updata();
    };
    FBselect.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.numItem.clear();
        }
    };
    FBselect.prototype.joinTop = function () {
        var topTitle = ToolMrg.getText(0, 37, 36, 0x333333, 680);
        this._topContain.addChild(topTitle);
        topTitle.textAlign = egret.HorizontalAlign.CENTER;
        topTitle.text = "串关选择";
        var topShape = new egret.Shape();
        this._topContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(52, 110.5, 576, 1.5);
        topShape.graphics.endFill();
    };
    FBselect.prototype.joinDown = function () {
        var _this = this;
        var downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xdedede);
        downShape.graphics.drawRect(52, 0, 576, 1.5);
        downShape.graphics.endFill();
        this._cancelBtn = new egret.Bitmap();
        this._downContain.addChild(this._cancelBtn);
        this._cancelBtn.x = 44;
        this._cancelBtn.y = 34;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, this);
        this._defineBtn = new egret.Bitmap();
        this._downContain.addChild(this._defineBtn);
        this._defineBtn.x = 360;
        this._defineBtn.y = 34;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, this);
        var cancelText = ToolMrg.getText(44, 56, 32, 0x333333, 276);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        this._downContain.addChild(cancelText);
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(360, 56, 32, 0xffffff, 276);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        this._downContain.addChild(defineText);
        defineText.text = "确定";
        this._cancelBtn.touchEnabled = true;
        this._defineBtn.touchEnabled = true;
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**适配处理 */
    FBselect.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return FBselect;
}(egret.DisplayObjectContainer));
__reflect(FBselect.prototype, "FBselect");
var FBselectInfo = (function (_super) {
    __extends(FBselectInfo, _super);
    function FBselectInfo() {
        var _this = _super.call(this) || this;
        _this.selectType = false;
        _this._box = new egret.Shape();
        _this.addChild(_this._box);
        _this._box.graphics.beginFill(0x979797);
        _this._box.graphics.drawRoundRect(0, 0, 160, 72, 20);
        _this._box.graphics.endFill();
        _this._boxShape = new egret.Shape();
        _this.addChild(_this._boxShape);
        _this._boxShape.graphics.beginFill(0xf5f5f7);
        _this._boxShape.graphics.drawRoundRect(1.5, 1.5, 157, 69, 20);
        _this._boxShape.graphics.endFill();
        _this._content = ToolMrg.getText(0, 0, 28, 0x999999, 160);
        _this.addChild(_this._content);
        _this._content.height = 72;
        _this._content.textAlign = egret.HorizontalAlign.CENTER;
        _this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.touchEnabled = true;
        _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        return _this;
    }
    FBselectInfo.prototype.touchDown = function (e) {
        var item = FBselect.getInstance.numItem;
        this.selectType = !this.selectType;
        if (this.selectType)
            item.Gput(this.id, this.id);
        else {
            if (item.GhasKey(this.id))
                item.GremoveByKey(this.id);
        }
        this.changeCss();
    };
    FBselectInfo.prototype.aa = function (content, id) {
        this.id = id;
        if (content == 0)
            this._content.text = "\u5355\u5173";
        else
            this._content.text = content + 1 + "\u4E321";
    };
    FBselectInfo.prototype.changeCss = function () {
        this._boxShape.graphics.clear();
        if (this.selectType) {
            this._content.textColor = 0xffffff;
            this._boxShape.graphics.beginFill(0xF72E52);
            this._boxShape.graphics.drawRoundRect(0, 0, 160, 72, 20);
        }
        else {
            this._content.textColor = 0x999999;
            this._boxShape.graphics.beginFill(0xf5f5f7);
            this._boxShape.graphics.drawRoundRect(1.5, 1.5, 157, 69, 20);
        }
        this._boxShape.graphics.endFill();
    };
    return FBselectInfo;
}(egret.DisplayObjectContainer));
__reflect(FBselectInfo.prototype, "FBselectInfo");
//# sourceMappingURL=FBselect.js.map