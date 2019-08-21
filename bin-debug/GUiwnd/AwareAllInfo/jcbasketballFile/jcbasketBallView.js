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
/**竞彩篮球开奖详情界面*/
var jcbasketBallView = (function (_super) {
    __extends(jcbasketBallView, _super);
    function jcbasketBallView() {
        var _this = _super.call(this) || this;
        _this.ifshow = false; //是否通过show进来  
        _this._mFirst = true;
        _this.GSlideOb = new GSlideObj();
        _this._mListObj = new GHashMap();
        _this.touchEnabled = true;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("竞彩篮球开奖");
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
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xfff7f0);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 60);
        link.graphics.endFill();
        _this.xianText = ToolMrg.getText(0, 18, 24, 0xFF7000, 750);
        _this.addChild(_this.xianText);
        _this.xianText.textAlign = egret.HorizontalAlign.CENTER;
        _this.xianText.text = "官方开售截止赔率非中奖赔率，用户奖金以出票赔率为准";
        _this.xianText.touchEnabled = true;
        _this.selectOBJ = new selectqq();
        _this.addChild(_this.selectOBJ);
        _this.selectOBJ.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            selectDayBasketBallData.ifshow = !selectDayBasketBallData.ifshow;
            if (selectDayBasketBallData.ifshow == true) {
                selectDayBasketBall.getInstance.show();
            }
            else {
                selectDayBasketBall.getInstance.hide();
            }
        }, _this);
        _this.selectOBJ.y = 60;
        _this.qqbfXianObj = new qqbfXian();
        _this.addChild(_this.qqbfXianObj);
        _this.qqbfXianObj.y = 150;
        return _this;
    }
    Object.defineProperty(jcbasketBallView, "getInstance", {
        get: function () {
            if (jcbasketBallView._mInstance == undefined)
                jcbasketBallView._mInstance = new jcbasketBallView();
            return jcbasketBallView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取本类层*/
    jcbasketBallView.prototype.getconnet = function () {
        return this;
    };
    jcbasketBallView.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        if (this._mFirst == true) {
            Result_One.getInstance.sendHttp(4);
            this._mFirst = false;
        }
        this.ifshow = true;
        this.initallInfo();
        this.setqq();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BK_List_HH, this.initallInfo, this);
    };
    jcbasketBallView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BK_List_HH, this.initallInfo, this);
    };
    jcbasketBallView.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 235;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 235 - 96 - GameValue.adaptationScreen;
        scroView.bounces = true;
    };
    /**适配处理 */
    jcbasketBallView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**初始化所有数据*/
    jcbasketBallView.prototype.initallInfo = function () {
        var list = JCBasketBallDataMrg.getInstance.getList();
        var dataObj;
        var data;
        this.cleanall();
        for (var i = 0; i < list.size; i++) {
            data = list.Gget(i);
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                // dataObj = new jcbasketBallItem();
                dataObj = jcbasketBallItem.getObj();
                this._mListObj.Gput(i, dataObj);
            }
            if (data != undefined) {
                dataObj.setID(data);
                dataObj.visible = true;
            }
            else {
                dataObj.visible = false;
            }
            dataObj.setPoint(0, 1 + (i) * 260);
            // if (dataObj.parent == undefined) {
            // 	this._mContainQB.addChild(dataObj);
            // }
        }
        // if (this.ifshow == true) {
        this._scroViewQB.setScrollTop(20);
        // 	this.ifshow = false;
        // }
        this.GSlideOb.showDataByMap(5, 260, this._scroViewQB, this._mContainQB, this._mListObj);
    };
    /**设置日期*/
    jcbasketBallView.prototype.setqq = function () {
        if (this.selectOBJ == undefined)
            return;
        var str = selectDayBasketBallData.selectDay[selectDayBasketBallData.defaultselectNum - 1] + "";
        str = ToolMrg.getTime6(Number(str));
        this.selectOBJ.setqq(str);
    };
    /**清除所有对象*/
    jcbasketBallView.prototype.cleanall = function () {
        var data;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mListObj.Gget(key);
            if (data != undefined) {
                GObjPool.getInstance.Gadd2Pool(data);
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
        this._mListObj.clear();
    };
    return jcbasketBallView;
}(egret.DisplayObjectContainer));
__reflect(jcbasketBallView.prototype, "jcbasketBallView");
//# sourceMappingURL=jcbasketBallView.js.map