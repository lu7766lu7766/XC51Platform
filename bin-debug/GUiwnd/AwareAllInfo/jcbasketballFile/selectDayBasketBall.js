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
/**篮球选择日期 */
var selectDayBasketBall = (function (_super) {
    __extends(selectDayBasketBall, _super);
    function selectDayBasketBall() {
        var _this = _super.call(this) || this;
        _this.y = 141;
        _this.touchEnabled = true;
        _this._mListBGBGBG = new GHashMap();
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xFFFFFF);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 420);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0x000000);
        link1.graphics.drawRect(0, 420, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight - 420);
        link1.graphics.endFill();
        link1.alpha = 0.3;
        return _this;
    }
    Object.defineProperty(selectDayBasketBall, "getInstance", {
        get: function () {
            if (selectDayBasketBall._mInstance == undefined)
                selectDayBasketBall._mInstance = new selectDayBasketBall();
            return selectDayBasketBall._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    selectDayBasketBall.prototype.getlist = function () {
        return this._mListBGBGBG;
    };
    selectDayBasketBall.prototype.show = function () {
        if (this.parent == undefined) {
            jcbasketBallView.getInstance.getconnet().addChild(this);
        }
        this.initAllRedBg();
    };
    selectDayBasketBall.prototype.hide = function () {
        if (this.parent != undefined) {
            if (this.parent != undefined) {
                this.parent.removeChild(this);
            }
        }
    };
    /**初始化所有选者号码*/
    selectDayBasketBall.prototype.initAllRedBg = function () {
        var len = 10;
        var obj;
        var ypoin = 0;
        for (var i = 1; i <= len; i++) {
            if (this._mListBGBGBG.GhasKey(i)) {
                obj = this._mListBGBGBG.Gget(i);
            }
            else {
                obj = new selectdayItem1();
                this._mListBGBGBG.Gput(i, obj);
            }
            obj.setid(i);
            var timer = selectDayBasketBallData.selectDay[i - 1] + "";
            timer = ToolMrg.getTime6(Number(timer));
            obj.setQQ(timer + "期");
            var type = (i - 1) % 3;
            if (i != 1) {
                if (type == 0)
                    ypoin++;
            }
            obj.setPoint(54 + (type) * 232, 28 + ypoin * 100);
            if (obj.parent == undefined) {
                this.addChild(obj);
            }
        }
        selectDayBasketBallData.getInstance.selectqq();
    };
    return selectDayBasketBall;
}(egret.DisplayObjectContainer));
__reflect(selectDayBasketBall.prototype, "selectDayBasketBall");
var selectdayItem1 = (function (_super) {
    __extends(selectdayItem1, _super);
    function selectdayItem1() {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.qqID = 0; //期数id
        _this.touchEnabled = true;
        _this.bgIcon = new egret.Bitmap();
        _this.bgIcon.x = 0;
        _this.bgIcon.y = 0;
        _this.bgIcon.width = 180;
        _this.bgIcon.height = 60;
        _this.addChild(_this.bgIcon);
        RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.qqday = ToolMrg.getText(0, 0, 24, 0x333333, 180);
        _this.addChild(_this.qqday);
        _this.qqday.height = 60;
        _this.qqday.textAlign = egret.HorizontalAlign.CENTER;
        _this.qqday.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.qqday.text = "20190606";
        _this.addevent();
        return _this;
    }
    selectdayItem1.prototype.setid = function (id) {
        this.myid = id;
    };
    /**设置自身坐标*/
    selectdayItem1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    selectdayItem1.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.bgIcon != undefined) {
            this.bgIcon.$setBitmapData(data);
        }
    };
    /**选择(1 选 2不选)*/
    selectdayItem1.prototype.selcet = function (type) {
        if (type == 1) {
            RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
            this.qqday.textColor = 0xF72E52;
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
            this.qqday.textColor = 0x333333;
        }
    };
    /**设置期数*/
    selectdayItem1.prototype.setQQ = function (type) {
        this.qqday.text = type;
    };
    selectdayItem1.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    selectdayItem1.prototype.onTouch = function () {
        selectDayBasketBallData.defaultselectNum = this.myid;
        selectDayBasketBallData.getInstance.selectqq();
        selectDayBasketBallData.ifshow = false;
        selectDayBasketBall.getInstance.hide();
        var timer = selectDayBasketBallData.selectDay[this.myid - 1];
        selectResultConf.getInstance.sendHttp(2, timer + "");
    };
    return selectdayItem1;
}(egret.DisplayObjectContainer));
__reflect(selectdayItem1.prototype, "selectdayItem1");
//# sourceMappingURL=selectDayBasketBall.js.map