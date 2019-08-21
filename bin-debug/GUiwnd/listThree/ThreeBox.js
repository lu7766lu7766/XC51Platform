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
var ThreeBox = (function (_super) {
    __extends(ThreeBox, _super);
    function ThreeBox() {
        var _this = _super.call(this) || this;
        _this.titleItem = ["直选", "组三", "组六"];
        _this.titleIndex = 0;
        _this.oneItem = [];
        _this.twoItem = [];
        _this.threeItem = [];
        /** true更新协议 false不更新 hide的时候值改为true  */
        _this._isChangeHttp = true;
        _this._mFirst = true;
        _this.touchEnabled = true;
        _this._historyItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._mLink = new egret.Shape();
        _this._mContain.addChild(_this._mLink);
        _this._topUI = new TopUI("", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._titleText = ToolMrg.getText(100, 62 - 40 + GameValue.adaptationScreen, 36, 0xffffff, 550);
        _this._titleText.height = 50;
        _this._titleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._titleText.textAlign = egret.HorizontalAlign.CENTER;
        _this._titleText.touchEnabled = true;
        _this.addChild(_this._titleText);
        _this._titleImg = new egret.Bitmap();
        _this._titleImg.touchEnabled = true;
        _this.addChild(_this._titleImg);
        _this._titleImg.y = 84 - 40 + GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/xiala_home@2x.png", function (e) { _this._titleImg.$setBitmapData(e); }, _this);
        _this._history = new egret.Bitmap();
        _this._history.touchEnabled = true;
        _this.addChild(_this._history);
        _this._history.x = 604;
        _this._history.y = 65 - 40 + GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/kjls_nav@2x.png", function (e) { _this._history.$setBitmapData(e); }, _this);
        _this._question = new egret.Bitmap();
        _this._question.touchEnabled = true;
        _this.addChild(_this._question);
        _this._question.x = 676;
        _this._question.y = 64 - 40 + GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/wenti_nav@2x.png", function (e) {
            _this._question.$setBitmapData(e);
        }, _this);
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(ThreeBox, "getInstance", {
        get: function () {
            if (ThreeBox._mInstance == undefined)
                ThreeBox._mInstance = new ThreeBox();
            return ThreeBox._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**计算截止时间  */
    ThreeBox.prototype.EndOfTime = function () {
        if (this == undefined || this.parent == undefined)
            return;
        if (GameValue.typeQS == 0) {
            this._theNum.text = "\u8DDD" + GameValue.fiveQS + "\u671F\u5F00\u59CB";
        }
        else {
            this._theNum.text = "\u8DDD" + GameValue.fiveQS + "\u671F\u622A\u6B62";
        }
        var a = GameValue.stopTime - Math.floor(new Date().getTime() / 1000);
        if (a < 0) {
            this._hour.text = "-";
            this._min.text = "-";
            this._second.text = "-";
            if (this._isChangeHttp) {
                QsPhp.getInstance.sendHttp();
                this._isChangeHttp = false;
            }
        }
        else {
            //时
            var hours = Math.floor(a / 3600);
            var hourss = hours < 10 ? "0" + hours : hours + "";
            //分
            a = a % 3600;
            var mins = Math.floor(a / 60);
            var minss = mins < 10 ? "0" + mins : mins + "";
            //秒
            var secs = a % 60;
            var secss = secs < 10 ? "0" + secs : secs + "";
            this._hour.text = hourss;
            this._min.text = minss;
            this._second.text = secss;
        }
    };
    ThreeBox.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - 200;
        var downbj = new egret.Bitmap();
        this._downContain.addChild(downbj);
        downbj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) { downbj.$setBitmapData(e); }, this);
        this._theNum = ToolMrg.getText(45, 32, 28, 0x333333, 300);
        this._downContain.addChild(this._theNum);
        this._theNum.height = 40;
        this._theNum.textAlign = egret.HorizontalAlign.RIGHT;
        this._theNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._theNum.text = "\u8DDD" + GameValue.threeQS + "\u671F\u622A\u6B62";
        var hmsText1 = ToolMrg.getText(400, 32, 28, 0x333333);
        this._downContain.addChild(hmsText1);
        hmsText1.height = 40;
        hmsText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText1.text = "时";
        var hmsText2 = ToolMrg.getText(480, 32, 28, 0x333333);
        this._downContain.addChild(hmsText2);
        hmsText2.height = 40;
        hmsText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText2.text = "分";
        var hmsText3 = ToolMrg.getText(560, 32, 28, 0x333333);
        this._downContain.addChild(hmsText3);
        hmsText3.height = 40;
        hmsText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        hmsText3.text = "秒";
        var downImg1 = new egret.Shape();
        this._downContain.addChild(downImg1);
        downImg1.graphics.beginFill(0xff7000);
        downImg1.graphics.drawRoundRect(352, 34, 44, 36, 10);
        downImg1.graphics.endFill();
        var downImg2 = new egret.Shape();
        this._downContain.addChild(downImg2);
        downImg2.graphics.beginFill(0xff7000);
        downImg2.graphics.drawRoundRect(432, 34, 44, 36, 10);
        downImg2.graphics.endFill();
        var downImg3 = new egret.Shape();
        this._downContain.addChild(downImg3);
        downImg3.graphics.beginFill(0xff7000);
        downImg3.graphics.drawRoundRect(514, 34, 44, 36, 10);
        downImg3.graphics.endFill();
        this._hour = ToolMrg.getText(352, 34, 28, 0xffffff, 44);
        this._downContain.addChild(this._hour);
        this._hour.height = 36;
        this._hour.textAlign = egret.HorizontalAlign.CENTER;
        this._hour.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._hour.text = "03";
        this._min = ToolMrg.getText(432, 34, 28, 0xffffff, 44);
        this._downContain.addChild(this._min);
        this._min.height = 36;
        this._min.textAlign = egret.HorizontalAlign.CENTER;
        this._min.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._min.text = "59";
        this._second = ToolMrg.getText(514, 34, 28, 0xffffff, 44);
        this._downContain.addChild(this._second);
        this._second.height = 36;
        this._second.textAlign = egret.HorizontalAlign.CENTER;
        this._second.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._second.text = "37";
        var downLink = new egret.Shape();
        this._downContain.addChild(downLink);
        downLink.graphics.beginFill(0xdedede);
        downLink.graphics.drawRect(0, 99.5, 750, 1.5);
        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.touchEnabled = true;
        this._clearBtn.x = 26;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png", function (e) {
            _this._clearBtn.$setBitmapData(e);
            _this._clearBtn.y = 100 + (100 - _this._clearBtn.height) * 0.5;
        }, this);
        this._goBnt = new egret.Bitmap();
        this._downContain.addChild(this._goBnt);
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) {
            _this._goBnt.$setBitmapData(e);
            _this._goBnt.x = 572;
            _this._goBnt.y = 110;
        }, this);
        this._goBnt.touchEnabled = true;
        var tzText = ToolMrg.getText(572, 100, 32, 0xffffff, 176);
        this._downContain.addChild(tzText);
        tzText.height = 100;
        tzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tzText.textAlign = egret.HorizontalAlign.CENTER;
        tzText.text = "投注";
        this._downTipText = ToolMrg.getText(0, 100, 32, 0x333333, 750);
        this._downContain.addChild(this._downTipText);
        this._downTipText.height = 100;
        this._downTipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._downTipText.textAlign = egret.HorizontalAlign.CENTER;
        this._downTipText.text = ToolMrg.nameMode2(20, "0\u6CE8 \u5171 0 \u5143");
    };
    ThreeBox.prototype.changeItem = function () {
        this._data;
        if (this.titleIndex == 0) {
            this._data = GroupDataMrg.getInstance.group3(this.oneItem, this.twoItem, this.threeItem);
        }
        else if (this.titleIndex == 1) {
            this._data = GroupDataMrg.getInstance.group3double(this.oneItem);
        }
        else if (this.titleIndex == 2) {
            this._data = GroupDataMrg.getInstance.group3Six(this.oneItem);
        }
        if (this._data != undefined)
            this._downTipText.text = ToolMrg.nameMode2(20, this._data.injectionNum + "\u6CE8 \u5171 " + this._data.injectionNum * 2 + " \u5143");
        else
            this._downTipText.text = ToolMrg.nameMode2(20, "0\u6CE8 \u5171 0 \u5143");
    };
    ThreeBox.prototype.ClickClear = function () {
        if (this.titleIndex == 0) {
            zxWnd.getInstance.clearItem();
        }
        else if (this.titleIndex == 1) {
            zThreeWnd.getInstance.clearItem();
        }
        else if (this.titleIndex == 2) {
            zSixWnd.getInstance.clearItem();
        }
        this.oneItem = [];
        this.twoItem = [];
        this.threeItem = [];
        this.changeItem();
    };
    ThreeBox.prototype.touchDown = function (e) {
        if (e.target == this._titleText || e.target == this._titleImg) {
            QTthree.getInstance.show();
        }
        else if (e.target == this._goBnt) {
            if (GameValue.typeQS == 0) {
                Alertpaner.getInstance.show("暂未开赛");
                return;
            }
            if (ThreeGo.getInstance.getListIsEmpty()) {
                if (this._data == undefined) {
                    if (this.titleIndex == 0)
                        Alertpaner.getInstance.show("每位至少选择1个号码");
                    else if (this.titleIndex == 1)
                        Alertpaner.getInstance.show("每位至少选择2个号码");
                    else
                        Alertpaner.getInstance.show("每位至少选择3个号码");
                    return;
                }
            }
            ThreeGo.getInstance.show(this._data, 0);
            this.ClickClear();
        }
        else if (e.target == this._clearBtn) {
            this.ClickClear();
        }
        else if (e.target == this._question) {
            ListThreeExplain.getInstance.show();
        }
        else if (e.target == this._history) {
            HistoryAwardsWnd.getInstance.show(3);
        }
        else if (e.target == this._return) {
            if (ThreeGo.getInstance.getListIsEmpty())
                this.hide();
            else
                isDelect.getInstance.show("three");
        }
    };
    ThreeBox.prototype.updataHistory = function () {
        var objHeight = 0;
        var index = 0;
        var item = HistoryAwardsDataMrg.getInstance.getHistory3List();
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (index > 9)
                return;
            var obj = void 0;
            if (this._historyItem.GhasKey(key)) {
                obj = this._historyItem.Gget(key);
            }
            else {
                obj = new ThreeHistoryInfo();
                this._historyItem.Gput(key, obj);
            }
            obj.aa(item.Gget(key));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
            index += 1;
        }
        this._mLink.graphics.clear();
        this._mLink.graphics.beginFill(0xdedede);
        if (objHeight < 501)
            objHeight = 500.5;
        this._mLink.graphics.drawRect(0, objHeight, 750, 1.5);
        this._mLink.graphics.endFill();
    };
    ThreeBox.prototype.showHistoryList = function () {
        ThreeBox.historyType = true;
        egret.Tween.get(this._scroView).to({ y: 96 + GameValue.adaptationScreen }, 300, egret.Ease.circInOut);
    };
    ThreeBox.prototype.hideHistoryList = function () {
        ThreeBox.historyType = false;
        egret.Tween.get(this._scroView).to({ y: 96 + GameValue.adaptationScreen - 502 }, 300, egret.Ease.circInOut);
    };
    ThreeBox.prototype.changeText = function () {
        if (ThreeBox.historyType)
            this.hideHistoryList();
        this._titleText.text = "排列三-" + this.titleItem[this.titleIndex];
        this._titleImg.x = 375 + this._titleText.textWidth / 2 + 10;
        // ["直选","组三","组六"]
        if (this.titleIndex == 0) {
            zxWnd.getInstance.show();
            zThreeWnd.getInstance.hide();
            zSixWnd.getInstance.hide();
        }
        else if (this.titleIndex == 1) {
            zxWnd.getInstance.hide();
            zThreeWnd.getInstance.show();
            zSixWnd.getInstance.hide();
        }
        else if (this.titleIndex == 2) {
            zxWnd.getInstance.hide();
            zThreeWnd.getInstance.hide();
            zSixWnd.getInstance.show();
        }
    };
    /**排三支付成功回调 关闭支付界面 单开订单*/
    ThreeBox.prototype.zfBack = function () {
        PaymentWnd.getInstance.hide();
        ThreeGo.getInstance.removeAll();
        ThreeGo.getInstance.hide();
        this.ClickClear();
        UserInfoPhp.getInstance.sendHttp();
        Order_List.getInstance.sendHttp();
        MyLotteryWnd.getInstance.show(1);
    };
    ThreeBox.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.changeText();
        Result_One.getInstance.sendHttp(1);
        if (UserData.getInstance.isLogin() == false && this._mFirst == true) {
            LoginWnd.getInstance.show();
            this._mFirst = false;
        }
        // this.showHistoryList();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_PSPW_List, this.updataHistory, this);
        this._theNum.text = "\u8DDD" + GameValue.threeQS + "\u671F\u622A\u6B62";
    };
    ThreeBox.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            zxWnd.getInstance.hide();
            zThreeWnd.getInstance.hide();
            zSixWnd.getInstance.hide();
            this.ClickClear();
            this.titleIndex = 0;
            this._isChangeHttp = true;
            CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_PSPW_List, this.updataHistory, this);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    ThreeBox.prototype.addInterception = function () {
        this._titleImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._history.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._question.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._titleText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    ThreeBox.prototype.removeInterception = function () {
        this._titleImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._history.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._question.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._clearBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBnt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._titleText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    ThreeBox.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen - 502;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = 502;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    ThreeBox.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 200);
        this._mShareC.graphics.endFill();
        this._downContain.addChildAt(this._mShareC, 0);
        var mShareC = new egret.Shape();
        mShareC.graphics.beginFill(0xffffff, 1);
        mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 502);
        mShareC.graphics.endFill();
        this._mContain.addChildAt(mShareC, 0);
    };
    ThreeBox.historyType = false;
    return ThreeBox;
}(egret.DisplayObjectContainer));
__reflect(ThreeBox.prototype, "ThreeBox");
var ThreeHistoryInfo = (function (_super) {
    __extends(ThreeHistoryInfo, _super);
    function ThreeHistoryInfo() {
        var _this = _super.call(this) || this;
        _this._text = ToolMrg.getText(28, 0, 32, 0x333333);
        _this.addChild(_this._text);
        _this._text.height = 70;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.setDB();
        return _this;
    }
    ThreeHistoryInfo.prototype.aa = function (data) {
        data.qs;
        var str = "";
        for (var i = 0; i < data.kjjg.length; i++) {
            str = str + " " + data.kjjg[i];
        }
        this._text.text = data.qs + "\u671F " + str;
    };
    /**适配处理 */
    ThreeHistoryInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 70);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ThreeHistoryInfo;
}(egret.DisplayObjectContainer));
__reflect(ThreeHistoryInfo.prototype, "ThreeHistoryInfo");
var Circle = (function (_super) {
    __extends(Circle, _super);
    function Circle(id, type) {
        var _this = _super.call(this) || this;
        _this._numType = false;
        _this._isInterception = false;
        _this.touchEnabled = true;
        _this._id = id;
        _this.type = type;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        // RES.getResByUrl("resource/assets/images/ui/hmbg_nor_home@2x.png",(e)=>{this._img.$setBitmapData(e);},this);
        _this._num = ToolMrg.getText(0, 0, 36, 0xF72E52, 80);
        _this.addChild(_this._num);
        _this._num.height = 80;
        _this._num.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._num.textAlign = egret.HorizontalAlign.CENTER;
        _this._num.text = id + "";
        _this.anchorOffsetX = _this.width * 0.5;
        _this.anchorOffsetY = _this.height * 0.5;
        RES.getResByUrl("resource/assets/images/ui/hmbg_home@2x.png", function (e) { }, _this);
        _this.setBtn();
        return _this;
    }
    Circle.prototype.changeItem = function () {
        if (this.type < 10) {
            if (this.type == 0) {
                var item = ThreeBox.getInstance.oneItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    ThreeBox.getInstance.oneItem = aa;
                }
            }
            else if (this.type == 1) {
                var item = ThreeBox.getInstance.twoItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    ThreeBox.getInstance.twoItem = aa;
                }
            }
            else if (this.type == 2) {
                var item = ThreeBox.getInstance.threeItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    ThreeBox.getInstance.threeItem = aa;
                }
            }
            ThreeBox.getInstance.changeItem();
        }
        else {
            if (this.type == 10) {
                var item = FiveBox.getInstance.oneItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    FiveBox.getInstance.oneItem = aa;
                }
            }
            else if (this.type == 11) {
                var item = FiveBox.getInstance.twoItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    FiveBox.getInstance.twoItem = aa;
                }
            }
            else if (this.type == 12) {
                var item = FiveBox.getInstance.threeItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    FiveBox.getInstance.threeItem = aa;
                }
            }
            else if (this.type == 13) {
                var item = FiveBox.getInstance.fourItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    FiveBox.getInstance.fourItem = aa;
                }
            }
            else if (this.type == 14) {
                var item = FiveBox.getInstance.fiveItem;
                if (this._numType)
                    item.push(this._id);
                else {
                    var aa = [];
                    for (var i = 0; i < item.length; i++) {
                        if (item[i] != this._id)
                            aa = aa.concat(item[i]);
                    }
                    FiveBox.getInstance.fiveItem = aa;
                }
            }
            FiveBox.getInstance.changeItem();
        }
    };
    //反选
    Circle.prototype.touchDown = function () {
        if (this._numType) {
            this.clearInfo();
        }
        else {
            this.selectInfo();
            this.changeSome();
        }
    };
    //选中
    Circle.prototype.selectInfo = function () {
        this._numType = true;
        this._num.textColor = 0xffffff;
        this.changeItem();
        this.setBtn();
    };
    //不选中
    Circle.prototype.clearInfo = function () {
        this._numType = false;
        this._num.textColor = 0xF72E52;
        this.changeItem();
        this.setBtn();
    };
    /**改变图片 */
    Circle.prototype.setBtn = function () {
        var _this = this;
        var str = this._numType ? "hmbg_home@2x.png" : "hmbg_nor_home@2x.png";
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._img.$setBitmapData(e); }, this);
    };
    Circle.prototype.changeSome = function () {
        var _this = this;
        this._img.scaleX;
        this._img.touchEnabled = false;
        egret.Tween.get(this).to({ scaleX: 0.8, scaleY: 0.8 }, 100).call(function (e) {
            egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1 }, 200, egret.Ease.circInOut).call(function () {
                _this._img.touchEnabled = true;
            });
        });
    };
    Circle.prototype.addInterception = function () {
        if (!this._isInterception) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    Circle.prototype.removeInterception = function () {
        if (this._isInterception) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return Circle;
}(egret.DisplayObjectContainer));
__reflect(Circle.prototype, "Circle");
//# sourceMappingURL=ThreeBox.js.map