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
/**篮球赛果显示信息*/
var basketball2 = (function (_super) {
    __extends(basketball2, _super);
    function basketball2() {
        var _this = _super.call(this) || this;
        _this.y = -40 + GameValue.adaptationScreen;
        _this._mListObj = new GHashMap();
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xF5F5F7);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
        link.graphics.endFill();
        _this._dayQQ = ToolMrg.getText(0, 16, 18, 0x333333, 480);
        _this._dayQQ.text = "2019-05-03 星期四  共4场";
        _this._dayQQ.textAlign = egret.HorizontalAlign.RIGHT;
        _this._dayQQ.fontFamily = "微软雅黑";
        _this.addChild(_this._dayQQ);
        _this._heicon = new egret.Bitmap();
        _this._heicon.x = 496;
        _this._heicon.y = 15;
        _this._heicon.width = 24;
        _this._heicon.height = 22;
        _this.addChild(_this._heicon);
        RES.getResByUrl("resource/assets/images/ui/calendar_match@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        return _this;
    }
    Object.defineProperty(basketball2, "getInstance", {
        get: function () {
            if (basketball2._mInstance == undefined)
                basketball2._mInstance = new basketball2();
            return basketball2._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    basketball2.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 50;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 340 - this.y;
        scroView.bounces = true;
    };
    basketball2.prototype.show = function () {
        var connet = BasketViewMrg.getInstance.getconnet();
        if (this.parent == undefined) {
            connet.addChild(this);
        }
        this.initallInfo();
    };
    basketball2.prototype.hide = function () {
        if (this == undefined)
            return;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    basketball2.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this._heicon != undefined) {
            this._heicon.$setBitmapData(data);
        }
    };
    /**初始化所有数据*/
    basketball2.prototype.initallInfo = function () {
        var len = 2;
        var dataObj;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new basketballitem1();
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i);
            dataObj.setPoint(0, 10 + (i - 1) * 125);
            if (dataObj.parent == undefined) {
                this._mContainQB.addChild(dataObj);
            }
        }
        this._scroViewQB.setScrollTop(20);
    };
    //清除对象数组
    basketball2.prototype.hideData = function () {
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
    return basketball2;
}(egret.DisplayObjectContainer));
__reflect(basketball2.prototype, "basketball2");
//# sourceMappingURL=basketball2.js.map