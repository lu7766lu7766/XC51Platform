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
/**篮球筛选 */
var BasketScreen = (function (_super) {
    __extends(BasketScreen, _super);
    function BasketScreen() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._selectItem = new GHashMap();
        _this._item = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._topContain = new egret.DisplayObjectContainer();
        _this._centerContain = new egret.DisplayObjectContainer();
        _this._downContain = new egret.DisplayObjectContainer();
        _this._mZZ = new egret.Shape();
        _this._mContain.addChild(_this._mZZ);
        _this._mZZ.touchEnabled = true;
        _this._mZZ.graphics.beginFill(0xffffff);
        _this._mZZ.graphics.drawRoundRect(0, 0, 680, 190 + 166 + 300, 20);
        _this._mZZ.graphics.endFill();
        _this.addChild(_this._mContain);
        _this._mContain.addChild(_this._topContain);
        // this._mContain.addChild(this._centerContain);
        _this._mContain.addChild(_this._downContain);
        _this._downContain.y = 170 + 300;
        // this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;
        // this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        _this._mContain.y = (GameMain.getInstance.StageHeight - (190 + 166 + 300)) * 0.5;
        _this._mContain.x = (GameMain.getInstance.StageWidth - 680) * 0.5;
        _this.joinTop();
        _this.joinDown();
        _this.addScoll();
        // this._tipText = ToolMrg.getText((GameMain.getInstance.StageWidth-200)*0.5,GameMain.getInstance.StageHeight*0.45,30,0x000000,200);
        _this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", function (e) {
            _this._tipText.$setBitmapData(e);
            _this._tipText.x = (GameMain.getInstance.StageWidth - _this._tipText.width) * 0.5;
            _this._tipText.y = (GameMain.getInstance.StageHeight - _this._tipText.height) * 0.5;
        }, _this);
        _this.addChild(_this._tipText);
        _this._tipText.visible = false;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(BasketScreen, "getInstance", {
        get: function () {
            if (BasketScreen._mInstance == undefined)
                BasketScreen._mInstance = new BasketScreen();
            return BasketScreen._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    BasketScreen.prototype.updata = function () {
        var item = new GHashMap();
        var data;
        if (BasketBallWnd.inIndex == 0) {
            data = BasketballDataMrg.getInstance._mLQLB;
        }
        else {
            data = BasketballDataMrg.getInstance.getDGList(BasketBallWnd.inIndex + 1);
            // data = BasketballDataMrg.getInstance._mLQLBDG;
        }
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            for (var _b = 0, _c = data.Gget(key).keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                item.Gput(data.Gget(key).Gget(akey).league_name, data.Gget(key).Gget(akey).league_name);
            }
        }
        var objNum = 0;
        var objHeight = 0;
        for (var _d = 0, _e = item.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new screenInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key), 1);
            obj.addInterception();
            obj.y = objHeight;
            obj.x = 54 + objNum * 208;
            if (objNum == 2) {
                objHeight = objHeight + 92;
                objNum = 0;
            }
            else {
                objNum += 1;
            }
            if (obj.parent == undefined)
                this._centerContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
        if (item.size > 0) {
            this._tipText.visible = false;
        }
        else {
            this._tipText.visible = true;
        }
    };
    BasketScreen.prototype.show = function () {
        GUIManager.getInstance.mostLay.addChild(this);
        this.addInterception();
        this.updata();
    };
    BasketScreen.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._selectItem.clear();
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).selectType = false;
                this._item.Gget(key).changeCss();
                this._item.Gget(key).removeInterception();
            }
        }
    };
    BasketScreen.prototype.addOfremoveToSelectItem = function (data, isboom) {
        if (isboom) {
            this._selectItem.Gput(data, data);
        }
        else {
            if (this._selectItem.GhasKey(data))
                this._selectItem.GremoveByKey(data);
        }
    };
    BasketScreen.prototype.selectBtnofItem = function (e) {
        if (e.target == this._allSelect) {
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._selectItem.Gput(this._item.Gget(key).getDataId(), this._item.Gget(key).getDataId());
                this._item.Gget(key).selectType = true;
                this._item.Gget(key).changeCss();
            }
        }
        else if (e.target == this._turnSelect) {
            this._selectItem.clear();
            for (var _b = 0, _c = this._item.keys; _b < _c.length; _b++) {
                var key = _c[_b];
                var obj = this._item.Gget(key);
                if (!obj.selectType)
                    this._selectItem.Gput(obj.getDataId(), obj.getDataId());
                obj.selectType = !obj.selectType;
                obj.changeCss();
            }
        }
    };
    BasketScreen.prototype.touchDown = function (e) {
        if (e.target == this._defineBtn) {
            if (this._selectItem.size < 1) {
                Alertpaner.getInstance.show("必须选择一种联赛");
                return;
            }
            BasketBallWnd.getInstance.clearAllData();
            var item = void 0;
            if (BasketBallWnd.inIndex == 0) {
                item = BasketballDataMrg.getInstance._mLQLB;
            }
            else {
                item = BasketballDataMrg.getInstance._mLQLBDG;
            }
            var data = new GHashMap();
            for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var obj = item.Gget(key);
                var objSub = new GHashMap();
                for (var _b = 0, _c = obj.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    for (var _d = 0, _e = this._selectItem.keys; _d < _e.length; _d++) {
                        var skey = _e[_d];
                        if (skey == obj.Gget(akey).league_name) {
                            objSub.Gput(akey, obj.Gget(akey));
                            data.Gput(key, objSub);
                        }
                    }
                }
            }
            if (BasketBallWnd.inIndex == 0) {
                B1Wnd.getInstance.screenSelect(data);
            }
            else if (BasketBallWnd.inIndex == 1) {
                B2Wnd.getInstance.screenSelect(data);
            }
            else if (BasketBallWnd.inIndex == 2) {
                B3Wnd.getInstance.screenSelect(data);
            }
            else if (BasketBallWnd.inIndex == 3) {
                B4Wnd.getInstance.screenSelect(data);
            }
            else if (BasketBallWnd.inIndex == 4) {
                B5Wnd.getInstance.screenSelect(data);
            }
        }
        this.hide();
    };
    BasketScreen.prototype.addInterception = function () {
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._allSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBtnofItem, this);
        this._turnSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBtnofItem, this);
    };
    BasketScreen.prototype.removeInterception = function () {
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._allSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBtnofItem, this);
        this._turnSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.selectBtnofItem, this);
    };
    /**适配处理 */
    BasketScreen.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    BasketScreen.prototype.addScoll = function () {
        this._linkView = new egret.ScrollView();
        this._linkView.x = 0;
        this._linkView.y = 190;
        this._linkView.scrollSpeed = 0.4;
        //设置滚动内容
        this._linkView.setContent(this._centerContain);
        this._linkView.bounces = false;
        this._linkView.verticalScrollPolicy = 'on';
        this._linkView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._linkView.width = this._mContain.width;
        this._linkView.height = 300;
        this._mContain.addChild(this._linkView);
    };
    BasketScreen.prototype.joinTop = function () {
        var title = ToolMrg.getText(0, 27, 36, 0x333333, 680);
        this._topContain.addChild(title);
        title.textAlign = egret.HorizontalAlign.CENTER;
        title.text = "选择联赛";
        this._allSelect = new egret.Shape();
        this._topContain.addChild(this._allSelect);
        this._allSelect.graphics.beginFill(0xffffff, 0.001);
        this._allSelect.graphics.drawRect(54, 98, 288, 72);
        this._allSelect.graphics.endFill();
        this._allSelect.touchEnabled = true;
        this._turnSelect = new egret.Shape();
        this._topContain.addChild(this._turnSelect);
        this._turnSelect.graphics.beginFill(0xffffff, 0.001);
        this._turnSelect.graphics.drawRect(54 + 288, 98, 288, 72);
        this._turnSelect.graphics.endFill();
        this._turnSelect.touchEnabled = true;
        var selectBtn = new egret.Bitmap();
        this._topContain.addChild(selectBtn);
        selectBtn.y = 98;
        RES.getResByUrl("resource/assets/images/ui/qfx_home@2x.png", function (e) {
            selectBtn.$setBitmapData(e);
            selectBtn.x = (680 - selectBtn.width) * 0.5;
        }, this);
    };
    BasketScreen.prototype.joinDown = function () {
        var _this = this;
        this._cancelBtn = new egret.Bitmap();
        this._downContain.addChild(this._cancelBtn);
        this._cancelBtn.x = 44;
        this._cancelBtn.y = 48;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, this);
        this._cancelBtn.touchEnabled = true;
        this._defineBtn = new egret.Bitmap();
        this._downContain.addChild(this._defineBtn);
        this._defineBtn.x = 360;
        this._defineBtn.y = 48;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, this);
        this._defineBtn.touchEnabled = true;
        var cancelText = ToolMrg.getText(150, 72, 32, 0x333333);
        this._downContain.addChild(cancelText);
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(466, 72, 32, 0xffffff);
        this._downContain.addChild(defineText);
        defineText.text = "确定";
    };
    return BasketScreen;
}(egret.DisplayObjectContainer));
__reflect(BasketScreen.prototype, "BasketScreen");
//# sourceMappingURL=BasketScreen.js.map