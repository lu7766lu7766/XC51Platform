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
/**篮球 */
var SPBasketBallWnd = (function (_super) {
    __extends(SPBasketBallWnd, _super);
    function SPBasketBallWnd() {
        var _this = _super.call(this) || this;
        /**默认打开串关 0串关 1单关 */
        _this._index = 0;
        /**所选数组 */
        _this._arr = [];
        _this._mFirst = true;
        // this.test();
        _this.y = GameValue.adaptationScreen;
        _this.allItem = new GHashMap();
        _this._topUI = new TopUI("", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        _this._topContain = new egret.DisplayObjectContainer();
        _this.addTop();
        _this.joinDown();
        return _this;
        // this.setDB();
    }
    Object.defineProperty(SPBasketBallWnd, "getInstance", {
        get: function () {
            if (SPBasketBallWnd._mInstance == undefined)
                SPBasketBallWnd._mInstance = new SPBasketBallWnd();
            return SPBasketBallWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    //测试数据
    SPBasketBallWnd.prototype.test = function () {
        var id = 0;
        for (var i = 0; i < 3; i++) {
            var fb = new GHashMap();
            for (var k = 0; k < 3; k++) {
                var dd = new BasketballData();
                dd.code = "5";
                dd.id = id;
                dd.time = "2019-06-06 周五";
                for (var j = 0; j < 9; j++) {
                    dd.listSX[j] = j;
                }
                dd.day = "周三";
                dd.league_name = "美职女篮";
                dd.lot_lose = -1;
                dd.no_lose = 0;
                dd.team_a_name = "火花";
                dd.team_b_name = "风暴";
                dd.stop = "20:50";
                fb.Gput(dd.id, dd);
                id += 1;
            }
            BasketballDataMrg.getInstance._mLQLB.Gput("2019-06-0" + (3 + i) + " \u5468\u4E94", fb);
        }
    };
    SPBasketBallWnd.prototype.getArrSize = function () {
        return this._arr;
    };
    /**more回调 */
    SPBasketBallWnd.prototype.upChangeSubMore = function (id, data) {
        var obj = new zqObjData();
        obj.dlxId = id;
        obj.xlxIdList = data;
        this.allItem.Gput(id, obj);
        this.setitemToArr();
        this.changeText(id);
    };
    /**map转换arr */
    SPBasketBallWnd.prototype.setitemToArr = function () {
        var arr = [];
        for (var _i = 0, _a = this.allItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.allItem.Gget(key).xlxIdList.length != 0)
                arr = arr.concat(this.allItem.Gget(key));
        }
        this._arr = arr;
        this._selectText.text = "" + this._arr.length;
    };
    /**赛事id 下标 true为选中 false取消选中 */
    SPBasketBallWnd.prototype.changeTextAndData = function (id, index, isboom) {
        if (isboom) {
            var obj = void 0;
            if (this.allItem.GhasKey(id)) {
                obj = this.allItem.Gget(id);
            }
            else {
                obj = new zqObjData();
                obj.dlxId = id;
                this.allItem.Gput(id, obj);
            }
            if (obj.xlxIdList.length > 0) {
                obj.xlxIdList = obj.xlxIdList.concat(index);
            }
            else {
                obj.xlxIdList = [index];
            }
        }
        else {
            if (this.allItem.Gget(id)) {
                var obj = this.allItem.Gget(id);
                if (obj.xlxIdList.length > 0) {
                    var arr = [];
                    for (var i = 0; i < obj.xlxIdList.length; i++) {
                        if (obj.xlxIdList[i] != index)
                            arr = arr.concat(obj.xlxIdList[i]);
                    }
                    obj.xlxIdList = arr;
                }
            }
        }
        this.changeText(id);
        this.setitemToArr();
        // egret.log(this.allItem);
        // egret.log(this._arr);
    };
    SPBasketBallWnd.prototype.changeText = function (id) {
        var num = [];
        if (this.allItem.GhasKey(id)) {
            if (this.allItem.Gget(id).xlxIdList != undefined) {
                num = this.allItem.Gget(id).xlxIdList;
            }
        }
        if (SPBasketBallWnd.inIndex == 0) {
            SPB1Wnd.getInstance.changeText(id, num);
        }
        else if (SPBasketBallWnd.inIndex == 4) {
            SPB5Wnd.getInstance.changeText(id, num);
        }
    };
    //投注点击删除
    SPBasketBallWnd.prototype.ClickRemove = function (id) {
        if (id != undefined) {
            var mitem = void 0;
            if (SPBasketBallWnd.inIndex == 0) {
                mitem = SPB1Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 1) {
                mitem = SPB2Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 2) {
                mitem = SPB3Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 3) {
                mitem = SPB4Wnd.getInstance.GetItem();
            }
            else if (SPBasketBallWnd.inIndex == 4) {
                mitem = SPB5Wnd.getInstance.GetItem();
            }
            for (var _i = 0, _a = mitem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = mitem.Gget(key).getSubItem();
                for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    if (item.Gget(akey).id == id)
                        item.Gget(akey).clear();
                }
            }
            var arr = [];
            for (var i = 0; i < this._arr.length; i++) {
                if (this._arr[i].dlxId != id)
                    arr = arr.concat(this._arr[i]);
            }
            this._arr = arr;
            this._selectText.text = "" + arr.length;
            if (this.allItem.GhasKey(id))
                this.allItem.GremoveByKey(id);
            this.changeText(id);
        }
        else {
            this.clearAllData();
        }
    };
    /**清除所有数据 */
    SPBasketBallWnd.prototype.clearAllData = function () {
        var mitem;
        if (SPBasketBallWnd.inIndex == 0) {
            mitem = SPB1Wnd.getInstance.GetItem();
        }
        else if (SPBasketBallWnd.inIndex == 1) {
            mitem = SPB2Wnd.getInstance.GetItem();
        }
        else if (SPBasketBallWnd.inIndex == 2) {
            mitem = SPB3Wnd.getInstance.GetItem();
        }
        else if (SPBasketBallWnd.inIndex == 3) {
            mitem = SPB4Wnd.getInstance.GetItem();
        }
        else if (SPBasketBallWnd.inIndex == 4) {
            mitem = SPB5Wnd.getInstance.GetItem();
        }
        this._arr = [];
        this._selectText.text = "0";
        this.allItem.clear();
        if (mitem != undefined) {
            for (var _i = 0, _a = mitem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = mitem.Gget(key).getSubItem();
                for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    item.Gget(akey).clear();
                }
            }
        }
        this.changeText(null);
    };
    SPBasketBallWnd.prototype.GoChange = function (e) {
        if (e.target == this._clearBtn) {
            this.clearAllData();
        }
        else if (e.target == this._goBtn) {
            if (this._arr.length > 9) {
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
            if (SPBasketBallWnd.inIndex == 0) {
                if (this._arr != undefined && this._arr.length > 1) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr);
                    GoFBBuy.getInstance.show(this._data, this._arr, 3);
                }
                else {
                    Alertpaner.getInstance.show("请选择2场以上赛事");
                }
            }
            else {
                if (this._arr != undefined && this._arr.length > 0) {
                    this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr, true);
                    GoFBBuy.getInstance.show(this._data, this._arr, 3);
                }
                else {
                    Alertpaner.getInstance.show("请选择1场以上赛事");
                }
            }
        }
    };
    SPBasketBallWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._questions) {
            SPBkExplain.getInstance.show();
        }
        else if (e.target == this._screen) {
            SPBasketScreen.getInstance.show();
        }
    };
    /**篮球支付成功回调 关闭支付界面 单开订单*/
    SPBasketBallWnd.prototype.zfBack = function () {
        MultiplierDetail.getInstance.hide();
        PaymentWnd.getInstance.hide();
        GoFBBuy.getInstance.hide();
        this.changeTop();
        UserInfoPhp.getInstance.sendHttp();
        Order_List.getInstance.sendHttp();
        MyLotteryWnd.getInstance.show(1);
    };
    SPBasketBallWnd.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this.changeTop();
        if (UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
    };
    SPBasketBallWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._index = 0;
            SPBasketBallWnd.inIndex = 0;
            this.removeInterception();
            this.clearAllData();
            SPBtOnePass.getInstance.hide();
            SPB1Wnd.getInstance.hide();
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    SPBasketBallWnd.prototype.topClick = function (e) {
        // Alertpaner.getInstance.show("暂未开盘");
        if (e.target == this._g1) {
            if (this._index == 0)
                return;
            this._index = 0;
        }
        else if (e.target == this._g2) {
            if (this._index == 1)
                return;
            this._index = 1;
        }
        this.changeTop();
    };
    SPBasketBallWnd.prototype.changeTop = function () {
        this.clearAllData();
        if (this._index == 0) {
            this._g1.textColor = 0xF72F52;
            this._g2.textColor = 0xffffff;
            egret.Tween.get(this._gShape).to({ x: 0 }, 200);
            SPBasketBallWnd.inIndex = 0;
            SPB1Wnd.getInstance.show();
            SPBtOnePass.getInstance.hide();
            this._downT2.text = "请至少选择2场比赛";
        }
        else if (this._index == 1) {
            this._g1.textColor = 0xffffff;
            this._g2.textColor = 0xF72F52;
            egret.Tween.get(this._gShape).to({ x: 120 }, 200);
            SPB1Wnd.getInstance.hide();
            SPBtOnePass.getInstance.show();
            this._downT2.text = "请至少选择1场比赛";
        }
    };
    SPBasketBallWnd.prototype.addInterception = function () {
        this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._questions.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
    };
    SPBasketBallWnd.prototype.removeInterception = function () {
        this._g1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        this._g2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.topClick, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._screen.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._questions.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
    };
    SPBasketBallWnd.prototype.addTop = function () {
        var _this = this;
        this.addChild(this._topContain);
        this._topContain.y = 16;
        var bjBox = new egret.Bitmap();
        this._topContain.addChild(bjBox);
        RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png", function (e) {
            bjBox.$setBitmapData(e);
            bjBox.x = 256;
            bjBox.y = 0;
        }, this);
        this._screen = new egret.Bitmap();
        this._topContain.addChild(this._screen);
        this._screen.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png", function (e) {
            _this._screen.$setBitmapData(e);
            _this._screen.y = 12;
            _this._screen.x = 604;
        }, this);
        this._questions = new egret.Bitmap();
        this._topContain.addChild(this._questions);
        this._questions.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png", function (e) {
            _this._questions.$setBitmapData(e);
            _this._questions.y = 8;
            _this._questions.x = 676;
        }, this);
        this._gShape = new egret.Shape();
        this._topContain.addChild(this._gShape);
        this._gShape.graphics.beginFill(0xffffff);
        this._gShape.graphics.drawRoundRect(256, 0, 120, 64, 33);
        this._gShape.graphics.endFill();
        this._g1 = ToolMrg.getText(256, 0, 32, 0xffffff, 120);
        this._g1.height = 64;
        this._topContain.addChild(this._g1);
        this._g1.textAlign = egret.HorizontalAlign.CENTER;
        this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g1.text = "串关";
        this._g1.touchEnabled = true;
        this._g2 = ToolMrg.getText(256 + 120, 0, 32, 0xffffff, 120);
        this._g2.height = 64;
        this._topContain.addChild(this._g2);
        this._g2.textAlign = egret.HorizontalAlign.CENTER;
        this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g2.text = "单关";
        this._g2.touchEnabled = true;
    };
    SPBasketBallWnd.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._downContain);
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
            bj.y = -10;
        }, this);
        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.x = 26;
        this._clearBtn.y = 20;
        this._clearBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png", function (e) {
            _this._clearBtn.$setBitmapData(e);
        }, this);
        var downT1 = ToolMrg.getText(0, 10, 32, 0x333333, 750);
        this._downContain.addChild(downT1);
        downT1.textAlign = egret.HorizontalAlign.CENTER;
        downT1.text = "已选择   场比赛";
        this._selectText = ToolMrg.getText(0, 10, 32, 0xF72E52, 750);
        this._downContain.addChild(this._selectText);
        this._selectText.textAlign = egret.HorizontalAlign.CENTER;
        this._selectText.text = "0";
        this._downT2 = ToolMrg.getText(0, 58, 24, 0x999999, 750);
        this._downContain.addChild(this._downT2);
        this._downT2.textAlign = egret.HorizontalAlign.CENTER;
        this._downT2.text = "请至少选择1场比赛";
        this._selectBtn = new egret.Bitmap();
        this._downContain.addChild(this._selectBtn);
        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) {
            _this._goBtn.$setBitmapData(e);
            _this._goBtn.x = 556;
            _this._goBtn.y = 8;
        }, this);
        var goText = ToolMrg.getText(556, 28, 32, 0xFFFFFF, 176);
        this._downContain.addChild(goText);
        goText.height = 44;
        goText.verticalAlign = egret.VerticalAlign.MIDDLE;
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "选好了";
    };
    /**适配处理 */
    SPBasketBallWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**当前所在页面 0过关 1让分胜负 2胜负 3大小分 4胜分差 */
    SPBasketBallWnd.inIndex = 0;
    return SPBasketBallWnd;
}(egret.DisplayObjectContainer));
__reflect(SPBasketBallWnd.prototype, "SPBasketBallWnd");
//# sourceMappingURL=SPBasketBallWnd.js.map