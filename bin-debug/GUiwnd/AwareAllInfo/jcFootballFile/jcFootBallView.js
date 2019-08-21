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
/**竞彩足球开奖详情界面*/
var jcFootBallView = (function (_super) {
    __extends(jcFootBallView, _super);
    function jcFootBallView() {
        var _this = _super.call(this) || this;
        _this.ifshow = false; //是否通过show进来  
        _this._mFirst = true;
        _this.GSlideOb = new GSlideObj();
        _this._mListObj = new GHashMap();
        _this.touchEnabled = true;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("竞彩足球开奖");
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
        _this.xianText.text = "*官方开售截止赔率非中奖赔率，用户奖金以出票赔率为准";
        _this.xianText.touchEnabled = true;
        _this.selectOBJ = new selectqq();
        _this.addChild(_this.selectOBJ);
        _this.selectOBJ.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            selectDayFootballData.ifshow = !selectDayFootballData.ifshow;
            if (selectDayFootballData.ifshow == true) {
                selectDayFootball.getInstance.show();
            }
            else {
                selectDayFootball.getInstance.hide();
            }
        }, _this);
        _this.selectOBJ.y = 60;
        _this.qqbfXianObj = new qqbfXian();
        _this.addChild(_this.qqbfXianObj);
        _this.qqbfXianObj.y = 150;
        return _this;
    }
    Object.defineProperty(jcFootBallView, "getInstance", {
        get: function () {
            if (jcFootBallView._mInstance == undefined)
                jcFootBallView._mInstance = new jcFootBallView();
            return jcFootBallView._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取本类层*/
    jcFootBallView.prototype.getconnet = function () {
        return this;
    };
    jcFootBallView.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        if (this._mFirst == true) {
            Result_One.getInstance.sendHttp(3);
            this._mFirst = false;
        }
        this.ifshow = true;
        this.initallInfo();
        this.setqq();
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_FT_List_HH, this.initallInfo, this);
    };
    jcFootBallView.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        selectDayFootball.getInstance.hide();
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List_HH, this.initallInfo, this);
    };
    jcFootBallView.prototype.addScoll = function (contain, scroView) {
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
    jcFootBallView.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**初始化所有数据*/
    jcFootBallView.prototype.initallInfo = function () {
        var list = JCFootBallDataMrg.getInstance.getList();
        var dataObj;
        var data;
        this.cleanall();
        for (var i = 0; i < list.size; i++) {
            data = list.Gget(i);
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                // dataObj = new jcFootBallItem();
                dataObj = jcFootBallItem.getObj();
                this._mListObj.Gput(i, dataObj);
            }
            if (data != undefined) {
                dataObj.setID(data);
                dataObj.visible = true;
            }
            else {
                dataObj.visible = false;
            }
            dataObj.setPoint(0, 1 + i * 260);
            // if (dataObj.parent == undefined) {
            // 	this._mContainQB.addChild(dataObj);
            // }
        }
        // if (this.ifshow == true) {
        this._scroViewQB.setScrollTop(20);
        this.ifshow = false;
        // }
        this.GSlideOb.showDataByMap(5, 260, this._scroViewQB, this._mContainQB, this._mListObj);
    };
    /**设置日期*/
    jcFootBallView.prototype.setqq = function () {
        if (this.selectOBJ == undefined)
            return;
        var str = selectDayFootballData.selectDay[selectDayFootballData.defaultselectNum - 1] + "";
        str = ToolMrg.getTime6(Number(str));
        this.selectOBJ.setqq(str);
    };
    /**清除所有对象*/
    jcFootBallView.prototype.cleanall = function () {
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
    return jcFootBallView;
}(egret.DisplayObjectContainer));
__reflect(jcFootBallView.prototype, "jcFootBallView");
/**选择期数*/
var selectqq = (function (_super) {
    __extends(selectqq, _super);
    function selectqq() {
        var _this = _super.call(this) || this;
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xffffff);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 80);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 80, GameMain.getInstance.StageWidth, 10);
        link1.graphics.endFill();
        _this.touchEnabled = true;
        _this.xianText = ToolMrg.getText(38, 25, 28, 0x333333, 300);
        _this.addChild(_this.xianText);
        _this.xianText.bold = true;
        _this.xianText.text = "选择期次";
        _this.jiantou = new egret.Bitmap();
        _this.jiantou.x = 698;
        _this.jiantou.y = 36;
        _this.jiantou.width = 24;
        _this.jiantou.height = 12;
        _this.addChild(_this.jiantou);
        RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.selectqq = ToolMrg.getText(385, 31, 24, 0x333333, 300);
        _this.addChild(_this.selectqq);
        _this.selectqq.textAlign = egret.HorizontalAlign.RIGHT;
        _this.selectqq.text = "20190606期";
        return _this;
        // this.addevent();
    }
    selectqq.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.jiantou != undefined) {
            this.jiantou.$setBitmapData(data);
        }
    };
    selectqq.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    selectqq.prototype.onTouch = function () {
        // selectDayFootballData.ifshow = !selectDayFootballData.ifshow;
        // if (selectDayFootballData.ifshow == true) {
        // 	selectDayFootball.getInstance.show();
        // } else {
        // 	selectDayFootball.getInstance.hide();
        // }
    };
    /**设置期数*/
    selectqq.prototype.setqq = function (num) {
        this.selectqq.text = num + "期";
    };
    return selectqq;
}(egret.DisplayObjectContainer));
__reflect(selectqq.prototype, "selectqq");
var qqbfXian = (function (_super) {
    __extends(qqbfXian, _super);
    function qqbfXian() {
        var _this = _super.call(this) || this;
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xffffff);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 82);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 82, GameMain.getInstance.StageWidth, 2);
        link1.graphics.endFill();
        _this.xianText = ToolMrg.getText(0, 27.5, 28, 0x999999, 750);
        _this.addChild(_this.xianText);
        _this.xianText.textAlign = egret.HorizontalAlign.LEFT;
        _this.xianText.text = "        胜平负   让球胜平负    比分        总进球      半全场 ";
        _this.xianText.touchEnabled = true;
        return _this;
    }
    return qqbfXian;
}(egret.DisplayObjectContainer));
__reflect(qqbfXian.prototype, "qqbfXian");
//# sourceMappingURL=jcFootBallView.js.map