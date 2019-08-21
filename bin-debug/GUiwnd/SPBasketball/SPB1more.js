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
var SPB1more = (function (_super) {
    __extends(SPB1more, _super);
    function SPB1more() {
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
        bj.graphics.drawRoundRect(0, 0, 720, 720, 24);
        bj.graphics.endFill();
        _this._mContain.x = (GameMain.getInstance.StageWidth - _this._mContain.width) * 0.5;
        _this._mContain.y = (GameMain.getInstance.StageHeight - _this._mContain.height) * 0.5;
        var shape1 = new egret.Shape();
        _this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26, 40, 40, 100, 15);
        shape1.graphics.endFill();
        var text1 = ToolMrg.getText(26, 40, 20, 0xffffff, 40);
        _this._mContain.addChild(text1);
        text1.height = 100;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "非让";
        var shape2 = new egret.Shape();
        _this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26, 148, 40, 100, 15);
        shape2.graphics.endFill();
        var text2 = ToolMrg.getText(26, 148, 20, 0xffffff, 40);
        _this._mContain.addChild(text2);
        text2.height = 100;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "让分";
        var shape3 = new egret.Shape();
        _this._mContain.addChild(shape3);
        shape3.graphics.beginFill(0x3E96EC);
        shape3.graphics.drawRoundRect(26, 256, 40, 100, 15);
        shape3.graphics.endFill();
        var text3 = ToolMrg.getText(26, 256, 20, 0xffffff, 40);
        _this._mContain.addChild(text3);
        text3.height = 100;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.textAlign = egret.HorizontalAlign.CENTER;
        text3.text = "客\n胜";
        var shape4 = new egret.Shape();
        _this._mContain.addChild(shape4);
        shape4.graphics.beginFill(0xFF8548);
        shape4.graphics.drawRoundRect(26, 364, 40, 100, 15);
        shape4.graphics.endFill();
        var text4 = ToolMrg.getText(26, 364, 20, 0xffffff, 40);
        _this._mContain.addChild(text4);
        text4.height = 100;
        text4.verticalAlign = egret.VerticalAlign.MIDDLE;
        text4.textAlign = egret.HorizontalAlign.CENTER;
        text4.text = "主\n胜";
        var shape5 = new egret.Shape();
        _this._mContain.addChild(shape5);
        shape5.graphics.beginFill(0x6EC858);
        shape5.graphics.drawRoundRect(26, 474, 40, 100, 15);
        shape5.graphics.endFill();
        var text5 = ToolMrg.getText(26, 474, 20, 0xffffff, 40);
        _this._mContain.addChild(text5);
        text5.height = 100;
        text5.verticalAlign = egret.VerticalAlign.MIDDLE;
        text5.textAlign = egret.HorizontalAlign.CENTER;
        text5.text = "大\n小\n分";
        _this._vs = ToolMrg.getText(374, 76, 24, 0x999999);
        _this._mContain.addChild(_this._vs);
        _this._vs.bold = true;
        _this._vs.text = "VS";
        var zhu = ToolMrg.getText(378, 175, 24, 0xf72e52);
        _this._mContain.addChild(zhu);
        zhu.text = "主";
        _this._rangText = ToolMrg.getText(270 + 50, 202, 20, 0x1ba22e, 38 + 100);
        _this._mContain.addChild(_this._rangText);
        _this._rangText.textAlign = egret.HorizontalAlign.CENTER;
        _this._rangText.text = "-1.5";
        _this._downText = ToolMrg.getText(270 + 50, 513, 24, 0xF72E52, 38 + 100);
        _this._mContain.addChild(_this._downText);
        _this._downText.textAlign = egret.HorizontalAlign.CENTER;
        _this._downText.text = "152.5";
        _this._cancelBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._cancelBtn);
        _this._cancelBtn.touchEnabled = true;
        _this._cancelBtn.x = 66;
        _this._cancelBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, _this);
        _this._defineBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._defineBtn);
        _this._defineBtn.touchEnabled = true;
        _this._defineBtn.x = 382;
        _this._defineBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, _this);
        var cancelText = ToolMrg.getText(74, 627, 32, 0x333333, 276);
        _this._mContain.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(382, 627, 32, 0xffffff, 276);
        _this._mContain.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";
        _this.joinBlock();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(SPB1more, "getInstance", {
        get: function () {
            if (SPB1more._mInstance == undefined)
                SPB1more._mInstance = new SPB1more();
            return SPB1more._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SPB1more.prototype.show = function (id) {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this._id = id;
        this.upThisValue();
        //请求一次更多信息
        BK_List_More.getInstance.sendHttp(id);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BK_CJList_More, this.upThisValue, this);
    };
    //进入时显示选中
    SPB1more.prototype.startDataOfCss = function () {
        for (var _i = 0, _a = this._numItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    };
    SPB1more.prototype.upThisValue = function () {
        this._numItem.clear();
        var item = BasketballDataMrg.getInstance._mCJLQLB;
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
        this._item.Gget(0).aa(this._id, data.listSX[0], data.team_a_name, "\u5BA2\u80DC" + data.listSX[0]);
        this._item.Gget(1).aa(this._id, data.listSX[1], data.team_b_name, "\u4E3B\u80DC" + data.listSX[1]);
        this._item.Gget(2).aa(this._id, data.listSX[2], data.team_a_name, "\u5BA2\u80DC" + data.listSX[2]);
        this._item.Gget(3).aa(this._id, data.listSX[3], data.team_b_name, "\u4E3B\u80DC" + data.listSX[3]);
        this._item.Gget(16).aa(this._id, data.listSX[16], data.team_a_name, "\u5927\u5206" + data.listSX[16]);
        this._item.Gget(17).aa(this._id, data.listSX[17], data.team_b_name, "\u5C0F\u5206" + data.listSX[17]);
        for (var i = 4; i < 16; i++) {
            this._item.Gget(i).aa(this._id, data.listSX[i], BasketballDataMrg.getInstance.BasketballList[i], "" + data.listSX[i]);
        }
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
    SPB1more.prototype.addData = function (index, isSelect) {
        if (isSelect) {
            this._numItem.Gput(index, index);
        }
        else {
            if (this._numItem.GhasKey(index))
                this._numItem.GremoveByKey(index);
        }
    };
    SPB1more.prototype.hide = function () {
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
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BK_CJList_More, this.upThisValue, this);
    };
    //hide时清理数值
    SPB1more.prototype.clearDataOfCss = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = false;
            obj.changeCss();
        }
        this._numItem.clear();
    };
    /**适配处理 */
    SPB1more.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    SPB1more.prototype.joinBlock = function () {
        //0 - 1
        for (var i = 0; i < 2; i++) {
            var obj = new SPBasketballBlock(i, 0, 240, 100, 0, 19, 57);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 78 + i * (138 + 240);
            obj.y = 40;
        }
        //2 - 3
        for (var i = 2; i < 4; i++) {
            var obj = new SPBasketballBlock(i, 1, 240, 100, 0, 19, 57);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 78 + (i - 2) * (138 + 240);
            obj.y = 148;
        }
        //4 - 9
        for (var i = 4; i < 10; i++) {
            var obj = new SPBasketballBlock(i, 1, 100, 100, 0);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 76 + (i - 4) * (100 + 4);
            obj.y = 256;
        }
        //10 - 15
        for (var i = 10; i < 16; i++) {
            var obj = new SPBasketballBlock(i, 1, 100, 100, 0);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 76 + (i - 10) * (100 + 4);
            obj.y = 364;
        }
        //16 - 17
        for (var i = 16; i < 18; i++) {
            var obj = new SPBasketballBlock(i, 1, 240, 100, 0, 19, 57);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            obj.x = 78 + (i - 16) * (138 + 240);
            obj.y = 472;
        }
        for (var i = 4; i < 16; i++) {
            this._item.Gget(i).aa(this._id, null, BasketballDataMrg.getInstance.BasketballList[i]);
        }
    };
    SPB1more.prototype.touchDown = function (e) {
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
    SPB1more.prototype.addInterception = function () {
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    SPB1more.prototype.removeInterception = function () {
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return SPB1more;
}(egret.DisplayObjectContainer));
__reflect(SPB1more.prototype, "SPB1more");
//# sourceMappingURL=SPB1more.js.map