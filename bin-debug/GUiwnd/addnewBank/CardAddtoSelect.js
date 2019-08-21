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
/**银行卡 */
var CardAddtoSelect = (function (_super) {
    __extends(CardAddtoSelect, _super);
    function CardAddtoSelect() {
        var _this = _super.call(this) || this;
        _this._item = new GHashMap();
        _this._topUI = new TopUIWhite("银行卡");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._topUI.hideTxText();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._addContain = new egret.DisplayObjectContainer();
        _this._addContain.x = 28;
        _this._mContain.addChild(_this._addContain);
        _this.addScoll();
        _this.joinAdd();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(CardAddtoSelect, "getInstance", {
        get: function () {
            if (CardAddtoSelect._mInstance == undefined)
                CardAddtoSelect._mInstance = new CardAddtoSelect();
            return CardAddtoSelect._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /** 0 0 修改_addContain x,y */
    CardAddtoSelect.prototype.joinAdd = function () {
        var _this = this;
        this._goBtn = new egret.Bitmap();
        this._addContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        this._goBtn.x = -6;
        RES.getResByUrl("resource/assets/images/ui/bdbg_mine@2x.png", function (e) { _this._goBtn.$setBitmapData(e); }, this);
        var addbtn = new egret.Bitmap();
        this._addContain.addChild(addbtn);
        addbtn.x = 188;
        addbtn.y = 30;
        RES.getResByUrl("resource/assets/images/ui/tianjia_mine@2x.png", function (e) { addbtn.$setBitmapData(e); }, this);
        var addText = ToolMrg.getText(250, 0, 28, 0x333333);
        this._addContain.addChild(addText);
        addText.height = 100;
        addText.verticalAlign = egret.VerticalAlign.MIDDLE;
        addText.text = "添加提款银行卡";
    };
    CardAddtoSelect.prototype.updata = function () {
        var item = SelectDataMrg.getInstance.getItem();
        var objHeight = 40;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new SelectInfo();
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
        this._addContain.y = objHeight;
    };
    CardAddtoSelect.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
        this.addInterception();
        this.updata();
    };
    CardAddtoSelect.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
    };
    CardAddtoSelect.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._goBtn) {
            AddBankCard.getInstance.show();
        }
    };
    CardAddtoSelect.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    CardAddtoSelect.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).removeInterception();
        }
    };
    /**适配处理 */
    CardAddtoSelect.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    CardAddtoSelect.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
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
    return CardAddtoSelect;
}(egret.DisplayObjectContainer));
__reflect(CardAddtoSelect.prototype, "CardAddtoSelect");
//# sourceMappingURL=CardAddtoSelect.js.map