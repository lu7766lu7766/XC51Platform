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
/**足球关注数据显示*/
var football4 = (function (_super) {
    __extends(football4, _super);
    function football4() {
        var _this = _super.call(this) || this;
        _this.ifshow = false; //是否通过show进来  
        _this.y = -40 + GameValue.adaptationScreen;
        _this._mListObj = new GHashMap();
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xF5F5F7);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 10);
        link.graphics.endFill();
        _this._dayQQ = ToolMrg.getText(0, 16, 18, 0x333333, 480);
        _this._dayQQ.text = "2019-05-03 星期四  共4场";
        _this._dayQQ.textAlign = egret.HorizontalAlign.RIGHT;
        _this._dayQQ.fontFamily = "微软雅黑";
        // this.addChild(this._dayQQ);
        _this._heicon = new egret.Bitmap();
        _this._heicon.x = 496;
        _this._heicon.y = 15;
        _this._heicon.width = 24;
        _this._heicon.height = 22;
        // this.addChild(this._heicon);
        RES.getResByUrl("resource/assets/images/ui/calendar_match@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        return _this;
    }
    Object.defineProperty(football4, "getInstance", {
        get: function () {
            if (football4._mInstance == undefined)
                football4._mInstance = new football4();
            return football4._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    football4.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 10;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 320 - this.y;
        scroView.bounces = true;
    };
    football4.prototype.show = function () {
        var connet = FallViewMrg.getInstance.getconnet();
        if (this.parent == undefined) {
            connet.addChild(this);
        }
        this.ifshow = true;
        this.initallInfo();
    };
    football4.prototype.hide = function () {
        if (this == undefined)
            return;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    football4.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this._heicon != undefined) {
            this._heicon.$setBitmapData(data);
        }
    };
    /**初始化所有数据*/
    football4.prototype.initallInfo = function () {
        this.hideData();
        var id = 1;
        var dataObj;
        var len = FootballConfinData.getInstance.getlist3().size;
        for (var _i = 0, _a = FootballConfinData.getInstance.getlist3().keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataObj = this._mListObj.Gget(Number(key));
            if (dataObj == undefined) {
                dataObj = new footballitem1();
                this._mListObj.Gput(Number(key), dataObj);
            }
            dataObj.setID(Number(key));
            dataObj.ssetjiqoqNum(0, 0);
            dataObj.setPoint(0, 10 + (id - 1) * 125);
            id++;
            if (dataObj.parent == undefined) {
                this._mContainQB.addChild(dataObj);
            }
            var data = FootballConfinData.getInstance.getInfo3(Number(key));
            if (data != undefined) {
                dataObj.setInfo1(data.name, data.timer, data.leftname, data.bfText, data.bcBF, data.rightname);
                if (dataObj.ifsetIcon == false) {
                    dataObj.setIcon(data.leftIcon);
                    dataObj.setIconright(data.rightIcon);
                    dataObj.ifsetIcon = true;
                }
                dataObj.setLeft(data.leftyellownum, data.leftrednum);
                dataObj.setright(data.rightyellownum, data.rightrednum);
                dataObj.setxingxing(1);
                dataObj.setcolor(data.color);
                var status_1 = data.status;
                if (status_1 == 1 || status_1 == 2 || status_1 == 3 || status_1 == 4 || status_1 == 5) {
                    dataObj.resultTextset(1, data.touding);
                }
                else {
                    if (status_1 == 0) {
                        dataObj.resultTextset(3, data.getstatus());
                    }
                    else {
                        dataObj.resultTextset(1, data.getstatus());
                    }
                }
                dataObj.setmothday(data.rqday);
                dataObj.setssID(data.id);
            }
        }
        if (this.ifshow == true) {
            this._scroViewQB.setScrollTop(20);
            this.ifshow = false;
        }
        if (len > 0) {
            BakorfallViewMrg.getInstance.setDecide(false);
        }
        else {
            BakorfallViewMrg.getInstance.setDecide(true);
        }
    };
    //清除对象数组
    football4.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                data.ifsetIcon = false;
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
    };
    return football4;
}(egret.DisplayObjectContainer));
__reflect(football4.prototype, "football4");
//# sourceMappingURL=football4.js.map