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
/**篮球关注显示信息*/
var basketball4 = (function (_super) {
    __extends(basketball4, _super);
    function basketball4() {
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
    Object.defineProperty(basketball4, "getInstance", {
        get: function () {
            if (basketball4._mInstance == undefined)
                basketball4._mInstance = new basketball4();
            return basketball4._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    basketball4.prototype.addScoll = function (contain, scroView) {
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
    basketball4.prototype.show = function () {
        var connet = BasketViewMrg.getInstance.getconnet();
        if (this.parent == undefined) {
            connet.addChild(this);
        }
        this.ifshow = true;
        this.initallInfo();
    };
    basketball4.prototype.hide = function () {
        if (this == undefined)
            return;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    basketball4.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this._heicon != undefined) {
            this._heicon.$setBitmapData(data);
        }
    };
    /**初始化所有数据*/
    basketball4.prototype.initallInfo = function () {
        this.hideData();
        var id = 1;
        var dataObj;
        var len = BasketballConfinData.getInstance.getlist3().size;
        for (var _i = 0, _a = BasketballConfinData.getInstance.getlist3().keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataObj = this._mListObj.Gget(Number(key));
            if (dataObj == undefined) {
                dataObj = new basketballitem1();
                this._mListObj.Gput(Number(key), dataObj);
            }
            dataObj.setID(Number(key));
            dataObj.setPoint(0, 10 + (id - 1) * 125);
            id++;
            if (dataObj.parent == undefined) {
                this._mContainQB.addChild(dataObj);
            }
            var data = BasketballConfinData.getInstance.getInfo3(Number(key));
            if (data != undefined) {
                dataObj.setConnetInfo(data.name, data.timer, data.leftname, data.rightname, data.getstatus());
                dataObj.setxingxing(1);
                dataObj.setmainEvray(data.rf, data.zhujie1, data.zhujie2, data.zhujie3, data.zhujie4);
                dataObj.setkeEvray("", data.kejie1, data.kejie2, data.kejie3, data.kejie4);
                dataObj.totalFen(data.bfText, data.team_a_score, data.team_b_score, data.fc);
                dataObj.setColor(data.color);
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
    basketball4.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
    };
    return basketball4;
}(egret.DisplayObjectContainer));
__reflect(basketball4.prototype, "basketball4");
//# sourceMappingURL=basketball4.js.map