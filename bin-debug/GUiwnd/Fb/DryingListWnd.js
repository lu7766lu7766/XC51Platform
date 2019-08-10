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
 * 晒单界面
 */
var DryingListWnd = (function (_super) {
    __extends(DryingListWnd, _super);
    function DryingListWnd() {
        var _this = _super.call(this) || this;
        // /**方案宣言 */
        // private _mFAXYText:egret.TextField;
        // /**方案宣言提示 */
        // private _mFNSTBKKKK:XYBKKKK;
        _this._mGKList = ["公开", "保密"];
        /**当前选中下标 */
        _this._mIndex = 1;
        _this.ylz = 0;
        _this.faxy = "";
        _this._mLength = 580;
        _this._mDowmContern = new egret.DisplayObjectContainer();
        _this._mContern = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContern);
        _this._mYLTCContern = new egret.DisplayObjectContainer();
        _this._mYLTCContern.y = 252;
        _this._mContern.addChild(_this._mYLTCContern);
        _this._mGKObjList = new GHashMap();
        _this.init();
        _this.touchEnabled = true;
        _this.addChild(_this._mDowmContern);
        return _this;
    }
    Object.defineProperty(DryingListWnd, "getInstance", {
        get: function () {
            if (DryingListWnd._mInstance == undefined)
                DryingListWnd._mInstance = new DryingListWnd();
            return DryingListWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DryingListWnd.prototype.init = function () {
        var _this = this;
        // this._mContern.y = GameMain.getInstance.StageHeight - 680;
        var shareBG = new egret.Shape();
        shareBG.graphics.beginFill(0xffffff, 1);
        shareBG.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 680);
        shareBG.graphics.endFill();
        this._mContern.addChildAt(shareBG, 0);
        this._mFAJEText = ToolMrg.getText(0, 38, 28, 0x333333, 375);
        this._mContern.addChild(this._mFAJEText);
        // this._mFAJEText.text = "方案金额: 10";
        this._mFAJEText.textAlign = egret.HorizontalAlign.CENTER;
        this._mDBJEText = ToolMrg.getText(375, 38, 28, 0x333333, 375);
        this._mContern.addChild(this._mDBJEText);
        // this._mDBJEText.text = "方案金额: 10";
        this._mDBJEText.textAlign = egret.HorizontalAlign.CENTER;
        this._mBMSZText = ToolMrg.getText(28, 160, 28, 0x333333, 150);
        this._mContern.addChild(this._mBMSZText);
        this._mBMSZText.text = "保密设置";
        this._mYLTCText = ToolMrg.getText(28, 20, 28, 0x333333, 500);
        this._mYLTCContern.addChild(this._mYLTCText);
        this._mYLTCText.text = "盈利提成                   %";
        this._mSTBKKKK = new BKKKK(GameValue.fsRate, 120);
        this._mSTBKKKK.x = 152;
        this._mYLTCContern.addChild(this._mSTBKKKK);
        this._mYLTCTipText = ToolMrg.getText(152, 90, 24, 0xFF7000, 542);
        this._mYLTCTipText.lineSpacing = 7;
        this._mYLTCContern.addChild(this._mYLTCTipText);
        this._mYLTCTipText.text = "发单人对跟单人所跟订单的中奖奖金收取佣金，比 例为1-10%，未中奖或未获得实际盈利，不提取佣金。";
        // this._mFAXYText = ToolMrg.getText(28,680 - 218,28,0x333333,150);
        // this._mDowmContern.addChild(this._mFAXYText);
        // this._mFAXYText.text = "方案宣言"; 
        // this._mFNSTBKKKK = new XYBKKKK(540);
        // this._mFNSTBKKKK.x = 152;
        // this._mFNSTBKKKK.y = 680 - 234;
        // this._mDowmContern.addChild(this._mFNSTBKKKK);
        this.hx(375, 0, 2, 100);
        this.hx(0, 100, GameMain.getInstance.StageWidth, 2);
        var ojb;
        for (var i = 0; i < this._mGKList.length; i++) {
            ojb = new BK(i, this._mGKList[i]);
            ojb.x = 152 + i * 180;
            ojb.y = 138;
            this._mContern.addChild(ojb);
            this._mGKObjList.Gput(i, ojb);
        }
        this._cancelBtn = new egret.Bitmap();
        this._mDowmContern.addChild(this._cancelBtn);
        this._cancelBtn.touchEnabled = true;
        this._cancelBtn.x = 84;
        this._cancelBtn.y = this._mLength - 118;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, this);
        this._defineBtn = new egret.Bitmap();
        this._mDowmContern.addChild(this._defineBtn);
        this._defineBtn.touchEnabled = true;
        this._defineBtn.x = 400;
        this._defineBtn.y = this._mLength - 118;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, this);
        var cancelText = ToolMrg.getText(90, this._mLength - 93, 32, 0x333333, 260);
        this._mDowmContern.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(406, this._mLength - 93, 32, 0xffffff, 260);
        this._mDowmContern.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";
    };
    DryingListWnd.prototype.hx = function (x, y, w, h) {
        var link = new egret.Shape();
        link.graphics.beginFill(0xA9A9A9);
        link.graphics.drawRect(x, y, w, h);
        link.graphics.endFill();
        this._mContern.addChild(link);
    };
    DryingListWnd.prototype.addScoll = function (contain, scroView) {
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
        scroView.height = GameMain.getInstance.StageHeight - 134;
    };
    /**适配处理 */
    DryingListWnd.prototype.setDB = function () {
        if (this._mShareC == undefined) {
            this._mShareC = new egret.Shape();
            this._mShareC.graphics.beginFill(0x000000, 0.7);
            this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
            this._mShareC.graphics.endFill();
        }
        GUIManager.getInstance.tipLay.addChild(this._mShareC);
    };
    DryingListWnd.prototype.touchDown = function (e) {
        if (e.target instanceof BK) {
            var bk = e.target;
            this.changeBJ(bk.id);
        }
        else if (e.target == this._cancelBtn) {
            GoFBBuy.getInstance.changeGX(false);
            this.hide();
        }
        else if (e.target == this._defineBtn) {
            GoFBBuy.getInstance.dryingData.type = this._mIndex + 1;
            if (GoFBBuy.getInstance.dryingData.type == 2) {
                GoFBBuy.getInstance.dryingData.type = 3;
            }
            GoFBBuy.getInstance.dryingData.yltc = this.ylz;
            // GoFBBuy.getInstance.dryingData.faxy = this.faxy;
            this.hide();
        }
    };
    DryingListWnd.prototype.show = function (money, double) {
        this._mFAJEText.textFlow = [
            { "text": "方案金额: ", style: { "textColor": 0x333333 } },
            { "text": money, style: { "textColor": 0xF72E52 } }
        ];
        var doublemoney = money;
        if (double != undefined) {
            doublemoney = doublemoney / double;
        }
        this._mDBJEText.textFlow = [
            { "text": "单倍金额: ", style: { "textColor": 0x333333 } },
            { "text": doublemoney, style: { "textColor": 0xF72E52 } }
        ];
        this.ylz = 0;
        this.faxy = "";
        egret.Tween.removeTweens(this);
        this.y = GameMain.getInstance.StageHeight;
        this.setDB();
        GUIManager.getInstance.tipLay.addChild(this);
        var bk;
        for (var _i = 0, _a = this._mGKObjList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            bk = this._mGKObjList[key];
            bk.touchEnabled = true;
            bk.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        this.changeBJ(this._mIndex);
        this._mSTBKKKK.enter();
        // this._mFNSTBKKKK.enter();
        egret.Tween.get(this).to({ y: GameMain.getInstance.StageHeight - this._mLength }, 200);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**切换界面 */
    DryingListWnd.prototype.changeBJ = function (index) {
        this._mIndex = index;
        var bk;
        for (var _i = 0, _a = this._mGKObjList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            bk = this._mGKObjList[key];
            if (key == this._mIndex) {
                bk.changeBG(1);
            }
            else {
                bk.changeBG(0);
            }
        }
        if (index > 0) {
            this.changePos(true);
        }
        else {
            this.changePos(false);
        }
    };
    /**调整坐标
     * 是否显示盈利
    */
    DryingListWnd.prototype.changePos = function (isShowYL) {
        if (isShowYL == true) {
            this._mYLTCContern.visible = true;
            this._mContern.y = 0;
        }
        else {
            this._mYLTCContern.visible = false;
            this._mContern.y = 200;
        }
    };
    DryingListWnd.prototype.hide = function () {
        if (this._mShareC.parent != undefined) {
            this._mShareC.parent.removeChild(this._mShareC);
        }
        this._mIndex = 1;
        var bk;
        for (var _i = 0, _a = this._mGKObjList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            bk = this._mGKObjList[key];
            bk.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this._mSTBKKKK.exit();
        // this._mFNSTBKKKK.exit();
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return DryingListWnd;
}(egret.DisplayObjectContainer));
__reflect(DryingListWnd.prototype, "DryingListWnd");
var BK = (function (_super) {
    __extends(BK, _super);
    function BK(id, str) {
        var _this = _super.call(this) || this;
        /**下标 */
        _this.id = 0;
        _this.id = id;
        _this._mGXKBG = new egret.Bitmap();
        _this.addChild(_this._mGXKBG);
        _this._mText = ToolMrg.getText(0, 0, 24, 0x333333, 180);
        _this._mText.height = 72;
        _this.addChild(_this._mText);
        _this._mText.text = str;
        _this._mText.textAlign = egret.HorizontalAlign.CENTER;
        _this._mText.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    /**
     * 切换选中背景
     * 1选中 0未选中
    */
    BK.prototype.changeBG = function (select) {
        var _this = this;
        var str = "fdxz2_home@2x.png";
        if (select == 1) {
            this._mText.textColor = 0xffffff;
            str = "fdxz_home@2x.png";
        }
        else {
            this._mText.textColor = 0x333333;
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) {
            _this._mGXKBG.$setBitmapData(e);
        }, this);
    };
    return BK;
}(egret.DisplayObjectContainer));
__reflect(BK.prototype, "BK");
var BKKKK = (function (_super) {
    __extends(BKKKK, _super);
    function BKKKK(max, www) {
        var _this = _super.call(this) || this;
        _this.max = max;
        _this._mGXKBG = new egret.Bitmap();
        _this.addChild(_this._mGXKBG);
        RES.getResByUrl("resource/assets/images/ui/fdxz2_home@2x.png", function (e) {
            _this._mGXKBG.$setBitmapData(e);
            _this._mGXKBG.scaleX = www / _this._mGXKBG.width;
        }, _this);
        _this.text = ToolMrg.getText(0, 0, 28, 0x333333, www);
        // this.text.type = egret.TextFieldType.INPUT;
        _this.text.height = 72;
        _this.addChild(_this.text);
        _this.text.text = "" + _this.max;
        _this.text.touchEnabled = true;
        _this.text.textAlign = egret.HorizontalAlign.CENTER;
        _this.text.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    BKKKK.prototype.textInput2 = function () {
        if (this.text != undefined) {
            var num = ToolMrg.getDecimal(Number(this.text.text), 2);
            if (num > this.max) {
                num = this.max;
            }
            this.text.text = "" + num;
        }
        else if (this.text != undefined && this.text.text == "") {
            this.text.text = "" + this.max;
        }
        DryingListWnd.getInstance.ylz = Number(this.text.text);
    };
    BKKKK.prototype.touchDown = function (e) {
        var obj = new NumKeyData();
        obj.backFun = this.textInput2;
        obj.thisObj = this;
        obj.strText = this.text;
        obj.str = this.text.text;
        DryNumKey.getInstance.show(obj);
    };
    BKKKK.prototype.enter = function () {
        DryingListWnd.getInstance.ylz = Number(this.text.text);
        // this.text.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        // this.text.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this.text.addEventListener(egret.TouchEvent.CHANGE,this.textInput2,this);
        this.text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    BKKKK.prototype.exit = function () {
        // this.text.removeEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        // this.text.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this.text.removeEventListener(egret.TouchEvent.CHANGE,this.textInput2,this);
        this.text.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this.text.text = "" + this.max;
    };
    return BKKKK;
}(egret.DisplayObjectContainer));
__reflect(BKKKK.prototype, "BKKKK");
var XYBKKKK = (function (_super) {
    __extends(XYBKKKK, _super);
    function XYBKKKK(www) {
        var _this = _super.call(this) || this;
        _this._mGXKBG = new egret.Bitmap();
        _this.addChild(_this._mGXKBG);
        RES.getResByUrl("resource/assets/images/ui/fdxz2_home@2x.png", function (e) {
            _this._mGXKBG.$setBitmapData(e);
            _this._mGXKBG.scaleX = www / _this._mGXKBG.width;
        }, _this);
        _this._mText = ToolMrg.getText(8, 0, 24, 0x999999, www);
        _this._mText.type = egret.TextFieldType.INPUT;
        _this._mText.height = 72;
        _this.addChild(_this._mText);
        _this._mText.text = "精彩方案宣言";
        _this._mText.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    XYBKKKK.prototype.textInput2 = function () {
        if (this._mText != undefined && this._mText.text == "精彩方案宣言") {
            this._mText.text = "";
            this._mText.textColor = 0x333333;
        }
        else if (this._mText != undefined && this._mText.text == "") {
            this._mText.text = "精彩方案宣言";
            this._mText.textColor = 0x999999;
        }
        DryingListWnd.getInstance.faxy = this._mText.text;
    };
    XYBKKKK.prototype.enter = function () {
        DryingListWnd.getInstance.faxy = this._mText.text;
        this._mText.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
    };
    XYBKKKK.prototype.exit = function () {
        this._mText.addEventListener(egret.Event.FOCUS_IN, this.textInput2, this);
        this._mText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        this._mText.text = "精彩方案宣言";
    };
    return XYBKKKK;
}(egret.DisplayObjectContainer));
__reflect(XYBKKKK.prototype, "XYBKKKK");
//# sourceMappingURL=DryingListWnd.js.map