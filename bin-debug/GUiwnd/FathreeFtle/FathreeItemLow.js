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
/**底部投注内容显示 */
var FathreeItemLow = (function (_super) {
    __extends(FathreeItemLow, _super);
    function FathreeItemLow() {
        var _this = _super.call(this) || this;
        _this.setDB();
        _this.GSlideOb = new GSlideObj();
        _this._mListObj = new GHashMap();
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.Icon = new egret.Bitmap();
        _this.Icon.x = 28;
        _this.Icon.y = 22;
        _this.addChild(_this.Icon);
        RES.getResByUrl("resource/assets/images/ui/kjnr_mine@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        var awareNum = ToolMrg.getText(62, 23, 28, 0x333333, 150);
        awareNum.text = "投注内容";
        // awareNum.fontFamily = "微软雅黑";
        // awareNum.bold = true;
        _this.addChild(awareNum);
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xDEDEDE);
        link1.graphics.drawRect(0, 76, 750, 2);
        link1.graphics.endFill();
        return _this;
    }
    Object.defineProperty(FathreeItemLow, "getInstance", {
        get: function () {
            if (FathreeItemLow._mInstance == undefined)
                FathreeItemLow._mInstance = new FathreeItemLow();
            return FathreeItemLow._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FathreeItemLow.prototype.show = function (y, datao) {
        if (this.parent == undefined) {
            FathreeViewMrg.getInstance.addChild(this);
        }
        this.y = y;
        this.initallInfo(datao);
    };
    FathreeItemLow.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this.cleanall();
    };
    /**适配处理 */
    FathreeItemLow.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - 500);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    FathreeItemLow.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.Icon != undefined) {
            this.Icon.$setBitmapData(data);
        }
    };
    FathreeItemLow.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 78;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 542;
        scroView.bounces = true;
    };
    /**初始化所有数据*/
    FathreeItemLow.prototype.initallInfo = function (datao) {
        var len = 0;
        // this.cleanall();
        var datalist;
        if (datao != undefined) {
            datalist = datao.threeOrFive.gettzList();
            len = datalist.length;
        }
        var dataObj;
        for (var i = 0; i < len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = tzItem.getObj();
                this._mListObj.Gput(i, dataObj);
            }
            if (datalist[i] != undefined) {
                dataObj.setNum(datalist[i][0], datalist[i][1]);
            }
            dataObj.setID(i);
            dataObj.setPoint(0, 0 + (i) * 80);
            // if (dataObj.parent == undefined) {
            // 	this._mContainQB.addChild(dataObj);
            // }
            this.GSlideOb.showDataByMap(15, 80, this._scroViewQB, this._mContainQB, this._mListObj);
        }
    };
    /**清除列表*/
    FathreeItemLow.prototype.cleanall = function () {
        var dataObj;
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            dataObj = this._mListObj.Gget(key);
            if (dataObj != undefined) {
                GObjPool.getInstance.Gadd2Pool(dataObj);
            }
        }
        this._mListObj.clear();
    };
    return FathreeItemLow;
}(egret.DisplayObjectContainer));
__reflect(FathreeItemLow.prototype, "FathreeItemLow");
/**投注内容item */
var tzItem = (function (_super) {
    __extends(tzItem, _super);
    function tzItem() {
        var _this = _super.call(this) || this;
        _this.myid = 0;
        _this._mBg = new egret.Bitmap();
        _this._mBg.x = 0;
        _this._mBg.y = 0;
        _this._mBg.width = 750;
        _this._mBg.height = 80;
        _this.addChild(_this._mBg);
        RES.getResByUrl("resource/assets/images/ui/bai.png", _this.bgBackwhite, _this, RES.ResourceItem.TYPE_IMAGE);
        _this._bglowxian = new egret.Bitmap();
        _this._bglowxian.x = 0;
        _this._bglowxian.y = 78;
        _this._bglowxian.width = 750;
        _this._bglowxian.height = 2;
        _this.addChild(_this._bglowxian);
        RES.getResByUrl("resource/assets/images/ui/hui.png", _this.bgBackhui, _this, RES.ResourceItem.TYPE_IMAGE);
        _this._NumText = ToolMrg.getText(62, 0, 28, 0x333333);
        _this._NumText.text = "7 , 2 , 1 (标准复式)";
        _this._NumText.height = 80;
        _this._NumText.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this._NumText.fontFamily = "微软雅黑";
        // this._NumText.bold = true;
        _this.addChild(_this._NumText);
        return _this;
    }
    tzItem.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(tzItem);
        if (obj == null)
            obj = new tzItem();
        return obj;
    };
    tzItem.prototype.setNum = function (num, num1) {
        // this._NumText.text = num;
        this._NumText.textFlow = [
            { text: num + " ", style: { "textColor": 0xff004c } },
            { text: num1 + "", style: { "textColor": 0x333333 } }
        ];
    };
    tzItem.prototype.setID = function (id) {
        this.myid = id;
    };
    tzItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    tzItem.prototype.bgBackwhite = function (data, url) {
        if (data != undefined && this._mBg != undefined) {
            this._mBg.$setBitmapData(data);
        }
    };
    tzItem.prototype.bgBackhui = function (data, url) {
        if (data != undefined && this._bglowxian != undefined) {
            this._bglowxian.$setBitmapData(data);
        }
    };
    tzItem.prototype.clean = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return tzItem;
}(egret.DisplayObjectContainer));
__reflect(tzItem.prototype, "tzItem", ["GIObjPool"]);
//# sourceMappingURL=FathreeItemLow.js.map