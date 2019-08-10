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
/**
 * 历史开奖
 */
var HistoryAwardsWnd = (function (_super) {
    __extends(HistoryAwardsWnd, _super);
    function HistoryAwardsWnd() {
        var _this = _super.call(this) || this;
        _this._mFirst = true;
        _this._mFirst1 = true;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("历史开奖");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.setDB();
        _this.touchEnabled = true;
        _this._mListObj = new GHashMap();
        return _this;
    }
    Object.defineProperty(HistoryAwardsWnd, "getInstance", {
        get: function () {
            if (HistoryAwardsWnd._mInstance == undefined)
                HistoryAwardsWnd._mInstance = new HistoryAwardsWnd();
            return HistoryAwardsWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    HistoryAwardsWnd.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 96 + GameValue.adaptationScreen - this.y;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 94 - GameValue.adaptationScreen;
    };
    /**适配处理 */
    HistoryAwardsWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    HistoryAwardsWnd.prototype.touchDown = function (e) {
        if (e.target instanceof HistoryAwardsObj) {
            var data = e.target;
            if (data.data != undefined) {
                HistoryAwardsXQWnd.getInstance.show(data.data, this._mType);
            }
        }
    };
    HistoryAwardsWnd.prototype.show = function (type) {
        this._mType = type;
        GUIManager.getInstance.tipLay.addChild(this);
        if (type == 3 && this._mFirst == true) {
            Result_One.getInstance.sendHttp(1);
            this._mFirst = false;
        }
        if (type == 5 && this._mFirst1 == true) {
            Result_One.getInstance.sendHttp(2);
            this._mFirst1 = false;
        }
        this.update();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_PSPW_List, this.update, this);
    };
    HistoryAwardsWnd.prototype.update = function () {
        var data;
        var obj;
        var list = this._mType == 3 ? HistoryAwardsDataMrg.getInstance.getHistory3List() : HistoryAwardsDataMrg.getInstance.getHistory5List();
        for (var i = 0; i < list.size; i++) {
            data = list.Gget(i);
            if (data != undefined) {
                obj = this._mListObj.Gget(i);
                if (obj == undefined) {
                    obj = HistoryAwardsObj.getObj();
                    this._mListObj.Gput(i, obj);
                }
                obj.init(data);
                obj.y = i * 152;
                this._mContainQB.addChild(obj);
                obj.touchEnabled = true;
                obj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            }
        }
    };
    HistoryAwardsWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        var obj;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._mListObj.Gget(key);
            GObjPool.getInstance.Gadd2Pool(obj);
            obj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
        }
        this._mListObj.clear();
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_PSPW_List, this.update, this);
    };
    return HistoryAwardsWnd;
}(egret.DisplayObjectContainer));
__reflect(HistoryAwardsWnd.prototype, "HistoryAwardsWnd");
var HistoryAwardsData = (function () {
    function HistoryAwardsData() {
        /**开奖结果 */
        this.kjjg = [];
        /**sz */
        this.sz = [];
        /**时间 */
        this.time = "";
    }
    return HistoryAwardsData;
}());
__reflect(HistoryAwardsData.prototype, "HistoryAwardsData");
var HistoryAwardsObj = (function (_super) {
    __extends(HistoryAwardsObj, _super);
    function HistoryAwardsObj() {
        var _this = _super.call(this) || this;
        _this._mInit = false;
        _this.touchEnabled = true;
        _this._mListBG = new GHashMap();
        _this._mListText = new GHashMap();
        RES.getResByUrl("resource/assets/images/ui/hmbg_home@2x.png", function (e) {
            _this._mBitmapData = e;
            _this._mInit = true;
            _this.init(_this.data);
        }, _this);
        return _this;
    }
    HistoryAwardsObj.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(HistoryAwardsObj);
        if (obj == null)
            obj = new HistoryAwardsObj();
        return obj;
    };
    HistoryAwardsObj.prototype.init = function (data) {
        this.data = data;
        if (this._mInit == false) {
            return;
        }
        if (this._mBg == undefined) {
            this._mBg = new egret.Shape();
            this.addChild(this._mBg);
            this._mBg.graphics.beginFill(0xffffff);
            this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 150);
            this._mBg.graphics.endFill();
            var link = new egret.Shape();
            this.addChild(link);
            link.graphics.beginFill(0xF5F5F7);
            link.graphics.drawRect(0, 148, GameMain.getInstance.StageWidth, 4);
            link.graphics.endFill();
        }
        if (this._mTitle == undefined)
            this._mTitle = ToolMrg.getText(38, 20, 32, 0x333333, 200);
        this._mTitle.text = "第" + this.data.qs + "期";
        this.addChild(this._mTitle);
        if (this._mTime == undefined)
            this._mTime = ToolMrg.getText(574, 32, 24, 0x999999, 150);
        this._mTime.text = this.data.time;
        this.addChild(this._mTime);
        var bit;
        var txt;
        for (var i = 0; i < data.kjjg.length; i++) {
            if (this._mListBG.GhasKey(i)) {
                bit = this._mListBG.Gget(i);
            }
            else {
                bit = new egret.Bitmap();
                this._mListBG.Gput(i, bit);
            }
            bit.$setBitmapData(this._mBitmapData);
            bit.width = 44;
            bit.height = 44;
            bit.x = 42 + i * 56;
            bit.y = 78;
            this.addChild(bit);
            if (this._mListText.GhasKey(i)) {
                txt = this._mListText.Gget(i);
            }
            else {
                txt = ToolMrg.getText(0, 0, 28, 0xFFFFFF, 44);
                txt.height = 44;
                txt.textAlign = egret.HorizontalAlign.CENTER;
                txt.verticalAlign = egret.VerticalAlign.MIDDLE;
                this._mListText.Gput(i, txt);
            }
            txt.x = 42 + i * 56;
            txt.y = 78;
            txt.text = "" + data.kjjg[i];
            this.addChild(txt);
        }
    };
    HistoryAwardsObj.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._mTitle.text = "";
        this._mTime.text = "";
        var bit;
        for (var _i = 0, _a = this._mListBG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            bit = this._mListBG.Gget(key);
            if (bit.parent != undefined) {
                bit.parent.removeChild(bit);
            }
            bit.$setBitmapData(undefined);
        }
        var txt;
        for (var _b = 0, _c = this._mListText.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            txt = this._mListText.Gget(key);
            txt.text = "";
            if (txt.parent != undefined) {
                txt.parent.removeChild(txt);
            }
        }
    };
    return HistoryAwardsObj;
}(egret.DisplayObjectContainer));
__reflect(HistoryAwardsObj.prototype, "HistoryAwardsObj", ["GIObjPool"]);
//# sourceMappingURL=HistoryAwardsWnd.js.map