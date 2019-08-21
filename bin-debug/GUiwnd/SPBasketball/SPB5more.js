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
/**更多玩法 串关 篮球 */
var SPB5more = (function (_super) {
    __extends(SPB5more, _super);
    function SPB5more() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._numItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.touchEnabled = true;
        var bj = new egret.Shape();
        _this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0, 0, 720, 480, 24);
        bj.graphics.endFill();
        _this._mContain.x = (GameMain.getInstance.StageWidth - _this._mContain.width) * 0.5;
        _this._mContain.y = (GameMain.getInstance.StageHeight - _this._mContain.height) * 0.5;
        var shape1 = new egret.Shape();
        _this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26, 110, 40, 100, 15);
        shape1.graphics.endFill();
        var text1 = ToolMrg.getText(26, 110, 20, 0xffffff, 40);
        _this._mContain.addChild(text1);
        text1.height = 100;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "客胜";
        var shape2 = new egret.Shape();
        _this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26, 218, 40, 100, 15);
        shape2.graphics.endFill();
        var text2 = ToolMrg.getText(26, 218, 20, 0xffffff, 40);
        _this._mContain.addChild(text2);
        text2.height = 100;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "主胜";
        var vs = ToolMrg.getText(346, 44, 24, 0x999999);
        _this._mContain.addChild(vs);
        vs.text = "VS";
        _this._team1 = ToolMrg.getText(70, 38, 32, 0x333333, 200);
        _this._mContain.addChild(_this._team1);
        _this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        _this._team1.bold = true;
        _this._team2 = ToolMrg.getText(454, 38, 32, 0x333333);
        _this._mContain.addChild(_this._team2);
        _this._team2.bold = true;
        _this._cancelBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._cancelBtn);
        _this._cancelBtn.touchEnabled = true;
        _this._cancelBtn.x = 66;
        _this._cancelBtn.y = 362;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, _this);
        _this._defineBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._defineBtn);
        _this._defineBtn.touchEnabled = true;
        _this._defineBtn.x = 382;
        _this._defineBtn.y = 362;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, _this);
        var cancelText = ToolMrg.getText(74, 387, 32, 0x333333, 276);
        _this._mContain.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(382, 387, 32, 0xffffff, 276);
        _this._mContain.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";
        _this.joinBlock();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SPB5more, "getInstance", {
        get: function () {
            if (SPB5more._mInstance == undefined)
                SPB5more._mInstance = new SPB5more();
            return SPB5more._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPB5more.prototype.show = function (id) {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this._id = id;
        this.upThisValue();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_List, this.upThisValue, this);
    };
    //进入时显示选中
    SPB5more.prototype.startDataOfCss = function () {
        for (var _i = 0, _a = this._numItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    };
    SPB5more.prototype.upThisValue = function () {
        this._numItem.clear();
        var item = BasketballDataMrg.getInstance._mLQLBDG;
        var data;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var keys = _a[_i];
            for (var _b = 0, _c = item.Gget(keys).keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                if (akey == this._id) {
                    data = item.Gget(keys).Gget(this._id);
                }
            }
        }
        for (var i = 4; i < 16; i++) {
            this._item.Gget(i).aa(this._id, data.listSX[i], BasketballDataMrg.getInstance.BasketballList[i], "" + data.listSX[i]);
        }
        this._team1.text = data.team_a_name;
        this._team2.text = data.team_b_name;
        for (var _d = 0, _e = this._item.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._item.Gget(key).addInterception();
        }
        var selectItem = [];
        for (var _f = 0, _g = BasketBallWnd.getInstance.allItem.keys; _f < _g.length; _f++) {
            var key = _g[_f];
            if (key == this._id) {
                selectItem = BasketBallWnd.getInstance.allItem.Gget(key).xlxIdList;
            }
        }
        for (var i = 0; i < selectItem.length; i++) {
            if (this._item.GhasKey(selectItem[i])) {
                this._item.Gget(selectItem[i]).selectType = true;
                this._item.Gget(selectItem[i]).changeCss();
                this._numItem.Gput(selectItem[i], selectItem[i]);
            }
        }
    };
    SPB5more.prototype.addData = function (index, isSelect) {
        if (isSelect) {
            this._numItem.Gput(index, index);
        }
        else {
            if (this._numItem.GhasKey(index))
                this._numItem.GremoveByKey(index);
        }
    };
    SPB5more.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this.clearDataOfCss();
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).aa(null, null, null, "");
                this._item.Gget(key).removeInterception();
            }
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_List, this.upThisValue, this);
    };
    //hide时清理数值
    SPB5more.prototype.clearDataOfCss = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = false;
            obj.changeCss();
        }
        this._numItem.clear();
    };
    /**适配处理 */
    SPB5more.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    SPB5more.prototype.joinBlock = function () {
        //4 - 9
        for (var i = 4; i < 10; i++) {
            var obj = new SPBasketballBlock(i, 1, 100, 100, 1);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 76 + (i - 4) * (100 + 4);
            obj.y = 110;
        }
        //10 - 15
        for (var i = 10; i < 16; i++) {
            var obj = new SPBasketballBlock(i, 1, 100, 100, 1);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 76 + (i - 10) * (100 + 4);
            obj.y = 218;
        }
        for (var i = 4; i < 16; i++) {
            this._item.Gget(i).aa(this._id, null, BasketballDataMrg.getInstance.BasketballList[i]);
        }
    };
    SPB5more.prototype.touchDown = function (e) {
        if (e.target == this._defineBtn) {
            var arr = [];
            for (var _i = 0, _a = this._numItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                arr = arr.concat(this._numItem.Gget(key));
            }
            SPBasketBallWnd.getInstance.upChangeSubMore(this._id, arr);
        }
        this.hide();
    };
    SPB5more.prototype.addInterception = function () {
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SPB5more.prototype.removeInterception = function () {
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return SPB5more;
}(egret.DisplayObjectContainer));
__reflect(SPB5more.prototype, "SPB5more");
//# sourceMappingURL=SPB5more.js.map