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
 * 我的彩票
 */
var MyLotteryWnd = (function (_super) {
    __extends(MyLotteryWnd, _super);
    function MyLotteryWnd() {
        var _this = _super.call(this) || this;
        _this._srcItem = ["全部", "待开奖", "未中奖", "已中奖"];
        _this._index = 0;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._mGSlideObj = new GSlideObj();
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("我的彩票");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this._mContainDKJ = new egret.DisplayObjectContainer();
        _this._scroViewQBDKJ = new egret.ScrollView();
        _this.addScoll(_this._mContainDKJ, _this._scroViewQBDKJ);
        _this._mContainYKJ = new egret.DisplayObjectContainer();
        _this._scroViewQBYKJ = new egret.ScrollView();
        _this.addScoll(_this._mContainYKJ, _this._scroViewQBYKJ);
        _this._mContainYZJ = new egret.DisplayObjectContainer();
        _this._scroViewQBYZJ = new egret.ScrollView();
        _this.addScoll(_this._mContainYZJ, _this._scroViewQBYZJ);
        _this.init();
        _this.setDB();
        _this.touchEnabled = true;
        _this._mZWSJTip = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png", function (e) {
            _this._mZWSJTip.$setBitmapData(e);
            _this._mZWSJTip.x = (GameMain.getInstance.StageWidth - _this._mZWSJTip.width) * 0.5;
            _this._mZWSJTip.y = (GameMain.getInstance.StageHeight - _this._mZWSJTip.height) * 0.5;
        }, _this);
        _this.addChild(_this._mZWSJTip);
        _this._mObjList = new GHashMap();
        return _this;
    }
    Object.defineProperty(MyLotteryWnd, "getInstance", {
        get: function () {
            if (MyLotteryWnd._mInstance == undefined)
                MyLotteryWnd._mInstance = new MyLotteryWnd();
            return MyLotteryWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    MyLotteryWnd.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 178 - GameValue.adaptationScreen - 96;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 176 - GameValue.adaptationScreen;
    };
    MyLotteryWnd.prototype.init = function () {
        var link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 78.5, 750, 1.5);
        link.graphics.endFill();
        this._mXZLink = new egret.Shape();
        this.addChild(this._mXZLink);
        this._mXZLink.graphics.beginFill(0xF72D52);
        this._mXZLink.graphics.drawRect(71, 212 - 40 - 96, 48, 4);
        this._mXZLink.graphics.endFill();
        for (var i = 0; i < this._srcItem.length; i++) {
            var text = ToolMrg.getText(i * 187.5, 136 - 40 - 96, 26, 0x292929, 187.5);
            text.height = 80;
            text.textAlign = egret.HorizontalAlign.CENTER;
            text.verticalAlign = egret.VerticalAlign.MIDDLE;
            text.text = this._srcItem[i];
            this.addChild(text);
            text.touchEnabled = true;
            text.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    /**适配处理 */
    MyLotteryWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**切换按钮 */
    MyLotteryWnd.prototype.changeWnd = function (index) {
        this._index = index;
        // this._mXZLink.x = index * 150
        egret.Tween.removeTweens(this._mXZLink);
        egret.Tween.get(this._mXZLink).to({ x: index * 187.5 }, 100);
        if (index == 0) {
            this.showOrHide(true, false, false, false);
            this.showData(MyLotteryDataMrg.getInstance.getAllList(), this._scroViewQB, this._mContainQB);
        }
        else if (index == 1) {
            this.showOrHide(false, true, false, false);
            this.showData(MyLotteryDataMrg.getInstance.getDKJDataList(), this._scroViewQBDKJ, this._mContainDKJ);
        }
        else if (index == 2) {
            this.showOrHide(false, false, true, false);
            this.showData(MyLotteryDataMrg.getInstance.getYKJDataList(), this._scroViewQBYKJ, this._mContainYKJ);
        }
        else if (index == 3) {
            this.showOrHide(false, false, false, true);
            this.showData(MyLotteryDataMrg.getInstance.getYZJDataList(), this._scroViewQBYZJ, this._mContainYZJ);
        }
        this._scroViewQB.setScrollTop(0);
        this._scroViewQBDKJ.setScrollTop(0);
        this._scroViewQBYKJ.setScrollTop(0);
        this._scroViewQBYZJ.setScrollTop(0);
    };
    /**展示或移除 */
    MyLotteryWnd.prototype.showOrHide = function (qb, dkj, ykj, yzj) {
        if (qb == true) {
            this.addChildAt(this._scroViewQB, 1);
        }
        else {
            if (this._scroViewQB.parent != undefined) {
                this._scroViewQB.parent.removeChild(this._scroViewQB);
            }
        }
        if (dkj == true) {
            this.addChildAt(this._scroViewQBDKJ, 1);
        }
        else {
            if (this._scroViewQBDKJ.parent != undefined) {
                this._scroViewQBDKJ.parent.removeChild(this._scroViewQBDKJ);
            }
        }
        if (ykj == true) {
            this.addChildAt(this._scroViewQBYKJ, 1);
        }
        else {
            if (this._scroViewQBYKJ.parent != undefined) {
                this._scroViewQBYKJ.parent.removeChild(this._scroViewQBYKJ);
            }
        }
        if (yzj == true) {
            this.addChildAt(this._scroViewQBYZJ, 1);
        }
        else {
            if (this._scroViewQBYZJ.parent != undefined) {
                this._scroViewQBYZJ.parent.removeChild(this._scroViewQBYZJ);
            }
        }
        this.cleanData();
    };
    MyLotteryWnd.prototype.cleanData = function () {
        var obj;
        for (var _i = 0, _a = this._mObjList.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._mObjList.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
            GObjPool.getInstance.Gadd2Pool(obj);
        }
        this._mObjList.clear();
    };
    /**展示对应的数据 */
    MyLotteryWnd.prototype.showData = function (listData, scroView, contain) {
        if (this._mList == undefined) {
            this._mList = new GHashMap();
        }
        this._mList.clear();
        for (var i = 0; i < listData.length; i++) {
            if (listData[i] != undefined) {
                var obj = MyLotteryObj.getObj();
                obj.init(listData[i]);
                obj.y = i * 110;
                // contain.addChild(obj);
                obj.touchEnabled = true;
                obj.addEvent();
                this._mObjList.Gput(i, obj);
                this._mList.Gput(i, obj);
            }
        }
        this._mGSlideObj.showDataByMap(15, 110, scroView, contain, this._mList);
        if (listData.length <= 0) {
            this._mZWSJTip.visible = true;
        }
        else {
            this._mZWSJTip.visible = false;
        }
    };
    MyLotteryWnd.prototype.touchDown = function (e) {
        if (e.target instanceof egret.TextField) {
            var touch = e.target;
            if (touch.text == this._srcItem[0]) {
                this.changeWnd(0);
            }
            else if (touch.text == this._srcItem[1]) {
                this.changeWnd(1);
            }
            else if (touch.text == this._srcItem[2]) {
                this.changeWnd(2);
            }
            else if (touch.text == this._srcItem[3]) {
                this.changeWnd(3);
            }
        }
    };
    MyLotteryWnd.prototype.httpShow = function () {
        this.changeWnd(this._index);
    };
    MyLotteryWnd.prototype.show = function (index) {
        GUIManager.getInstance.tipLay.addChild(this);
        if (index != undefined) {
            this.changeWnd(index);
        }
        else {
            index = 0;
            this.changeWnd(0);
        }
        if (MyLotteryWnd.first == true && UserData.getInstance.isLogin() == true) {
            Order_List.getInstance.sendHttp();
        }
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_orderList, this.httpShow, this);
    };
    MyLotteryWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this.cleanData();
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_orderList, this.httpShow, this);
    };
    MyLotteryWnd.first = true;
    return MyLotteryWnd;
}(egret.DisplayObjectContainer));
__reflect(MyLotteryWnd.prototype, "MyLotteryWnd");
//# sourceMappingURL=MyLotteryWnd.js.map