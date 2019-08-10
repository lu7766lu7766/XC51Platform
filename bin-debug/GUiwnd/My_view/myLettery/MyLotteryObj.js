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
var MyLotteryObj = (function (_super) {
    __extends(MyLotteryObj, _super);
    function MyLotteryObj() {
        var _this = _super.call(this) || this;
        _this._isEvent = false;
        _this.touchEnabled = true;
        return _this;
    }
    MyLotteryObj.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(MyLotteryObj);
        if (obj == null)
            obj = new MyLotteryObj();
        return obj;
    };
    MyLotteryObj.prototype.init = function (data) {
        this._mData = data;
        if (this._mBg == undefined) {
            this._mBg = new egret.Shape();
            this.addChild(this._mBg);
            this._mBg.graphics.beginFill(0xffffff);
            this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 108);
            this._mBg.graphics.endFill();
            var link = new egret.Shape();
            this.addChild(link);
            link.graphics.beginFill(0xdedede);
            link.graphics.drawRect(0, 108, 750, 1.5);
            link.graphics.endFill();
        }
        if (this._mIconBit == undefined)
            this._mIconBit = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/" + this._mData.url, this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
        if (this._mTitle == undefined)
            this._mTitle = ToolMrg.getText(62, 8, 26, 0x333333, 150);
        this._mTitle.height = 50;
        this._mTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mTitle.text = data.title;
        this.addChild(this._mTitle);
        if (this._mXZMoney == undefined)
            this._mXZMoney = ToolMrg.getText(62, 58, 24, 0x333333, 150);
        this._mXZMoney.height = 34;
        this._mXZMoney.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._mXZMoney.text = data.xzMoney + "元";
        this.addChild(this._mXZMoney);
        if (this._mZJ == undefined)
            this._mZJ = ToolMrg.getText(0, 60, 24, 0xFF7000, GameMain.getInstance.StageWidth);
        this._mZJ.height = 34;
        this._mZJ.textAlign = egret.HorizontalAlign.CENTER;
        this._mZJ.verticalAlign = egret.VerticalAlign.MIDDLE;
        if (data.statue == 1) {
            this._mZJ.textColor = 0xFF7000;
            this._mZJ.text = "待开奖";
        }
        else if (data.statue == 2) {
            this._mZJ.textColor = 0x999999;
            this._mZJ.text = "未中奖";
        }
        else if (data.statue == 3) {
            this._mZJ.textColor = 0xF72E52;
            this._mZJ.text = "中奖" + data.xjMoney + "元";
        }
        this.addChild(this._mZJ);
        if (this._mID == undefined)
            this._mID = ToolMrg.getText(325, 25, 20, 0x999999, 400);
        this._mID.textAlign = egret.HorizontalAlign.RIGHT;
        this._mID.text = "订单编号:" + data.id;
        this.addChild(this._mID);
        if (this._mTime == undefined)
            this._mTime = ToolMrg.getText(546, 66, 20, 0x999999, 200);
        this._mTime.height = 28;
        this._mTime.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this._mTime.text = "19-02-06 15:24";
        this._mTime.text = ToolMrg.getTime11(data.time);
        this.addChild(this._mTime);
    };
    MyLotteryObj.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this._mIconBit != undefined) {
            this._mIconBit.$setBitmapData(data);
            this._mIconBit.width = 28;
            this._mIconBit.height = 28;
            this._mIconBit.x = 28;
            this._mIconBit.y = 20;
            this.addChild(this._mIconBit);
        }
    };
    MyLotteryObj.prototype.clean = function () {
        egret.Tween.removeTweens(this);
        this._mIconBit.$setBitmapData(undefined);
        this._mTitle.text = "";
        this._mXZMoney.text = "";
        this._mZJ.text = "";
        this._mTime.text = "";
        this.removeEvent();
    };
    //打开二级页面
    MyLotteryObj.prototype.touchDown = function (e) {
        if (this._mData.type == 1 || this._mData.type == 2 || this._mData.type == 5 || this._mData.type == 6) {
            // FofBDetail.getInstance.show(this._mData);
            Order_ListO.getInstance.sendHttp(this._mData.id);
        }
        else if (this._mData.type == 3 || this._mData.type == 4) {
            // FathreeViewMrg.getInstance.show(this._mData);
            Order_ListO.getInstance.sendHttp(this._mData.id);
        }
    };
    MyLotteryObj.prototype.addEvent = function () {
        if (!this._isEvent) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEvent = true;
        }
    };
    MyLotteryObj.prototype.removeEvent = function () {
        if (this._isEvent) {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isEvent = false;
        }
    };
    return MyLotteryObj;
}(egret.DisplayObjectContainer));
__reflect(MyLotteryObj.prototype, "MyLotteryObj", ["GIObjPool"]);
//# sourceMappingURL=MyLotteryObj.js.map