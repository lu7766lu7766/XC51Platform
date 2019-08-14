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
/**中部 */
var FathreeItemCenter = (function (_super) {
    __extends(FathreeItemCenter, _super);
    function FathreeItemCenter() {
        var _this = _super.call(this) || this;
        _this._mListBGBGBG = new GHashMap();
        _this.awareIcon = new egret.Bitmap();
        _this.awareIcon.x = 30;
        _this.awareIcon.y = 22;
        _this.addChild(_this.awareIcon);
        RES.getResByUrl("resource/assets/images/ui/kjjg_mine@2x.png", _this.bgBack2, _this, RES.ResourceItem.TYPE_IMAGE);
        var awareNum = ToolMrg.getText(64, 25, 28, 0x333333, 150);
        awareNum.text = "开奖号码";
        // awareNum.fontFamily = "微软雅黑";
        // awareNum.bold = true;
        _this.addChild(awareNum);
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xDEDEDE);
        link.graphics.drawRect(0, 78, 750, 2);
        link.graphics.endFill();
        _this.awareNum = ToolMrg.getText(64, 104, 24, 0x333333);
        _this.awareNum.text = "预计今天20:30开奖";
        // this.awareNum.fontFamily = "微软雅黑";
        // this.awareNum.bold = true;
        _this.addChild(_this.awareNum);
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 156, 750, 10);
        link1.graphics.endFill();
        _this.setDB();
        return _this;
    }
    /**适配处理 */
    FathreeItemCenter.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 166);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    FathreeItemCenter.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this.awareIcon != undefined) {
            this.awareIcon.$setBitmapData(data);
        }
    };
    /**初始化开奖号码*/
    FathreeItemCenter.prototype.initAllRedBg = function (data, str) {
        this.cleall();
        if (data != undefined) {
            if (data.length > 0) {
                this.awareNum.visible = false;
            }
            else {
                this.awareNum.visible = true;
                this.setTimer(str);
            }
        }
        if (data == undefined)
            return;
        var len = data.length;
        var obj;
        for (var i = 1; i <= len; i++) {
            if (this._mListBGBGBG.GhasKey(i)) {
                obj = this._mListBGBGBG.Gget(i);
            }
            else {
                obj = new gameRedIcon();
                this._mListBGBGBG.Gput(i, obj);
            }
            obj.setNumText(data[i - 1]);
            obj.x = 64 + (i - 1) * 56;
            obj.y = 96;
            this.addChild(obj);
        }
    };
    /**设置时间*/
    FathreeItemCenter.prototype.setTimer = function (timer) {
        this.awareNum.text = "预计" + timer + "截止";
    };
    FathreeItemCenter.prototype.cleall = function () {
        var obj;
        for (var _i = 0, _a = this._mListBGBGBG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._mListBGBGBG.Gget(key);
            if (obj != undefined) {
                if (obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    return FathreeItemCenter;
}(egret.DisplayObjectContainer));
__reflect(FathreeItemCenter.prototype, "FathreeItemCenter");
//# sourceMappingURL=FathreeItemCenter.js.map