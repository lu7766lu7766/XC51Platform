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
/**游戏排列三或排列五 */
var AwareGameItem1 = (function (_super) {
    __extends(AwareGameItem1, _super);
    function AwareGameItem1() {
        var _this = _super.call(this) || this;
        _this.myID = 0; //自身id
        _this.touchEnabled = true;
        _this._mListBGBGBG = new GHashMap();
        if (_this._mBg == undefined) {
            _this._mBg = new egret.Shape();
            _this.addChild(_this._mBg);
            _this._mBg.graphics.beginFill(0xffffff);
            _this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 150);
            _this._mBg.graphics.endFill();
            var link = new egret.Shape();
            _this.addChild(link);
            link.graphics.beginFill(0xF5F5F7);
            link.graphics.drawRect(0, 148, GameMain.getInstance.StageWidth, 10);
            link.graphics.endFill();
        }
        if (_this._mTitle == undefined)
            _this._mTitle = ToolMrg.getText(38, 20, 28, 0x333333, 150);
        _this._mTitle.text = "";
        _this._mTitle.fontFamily = "微软雅黑";
        _this.addChild(_this._mTitle);
        _this._mTq = ToolMrg.getText(138, 28, 20, 0x999999, 150);
        _this._mTq.text = "";
        _this._mTq.fontFamily = "微软雅黑";
        _this.addChild(_this._mTq);
        _this._mTime = ToolMrg.getText(250, 28, 20, 0x999999, 200);
        _this._mTime.text = "";
        _this._mTime.fontFamily = "微软雅黑";
        _this.addChild(_this._mTime);
        _this._mTday = ToolMrg.getText(370, 28, 20, 0x999999, 200);
        _this._mTday.text = "";
        _this._mTday.fontFamily = "微软雅黑";
        _this.addChild(_this._mTday);
        _this._jtIcon = new egret.Bitmap();
        _this._jtIcon.x = 708;
        _this._jtIcon.y = 62;
        _this.addChild(_this._jtIcon);
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", _this.bgBack2, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.addevent();
        return _this;
    }
    /**设置id*/
    AwareGameItem1.prototype.setID = function (id) {
        this.myID = id;
    };
    AwareGameItem1.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this._jtIcon != undefined) {
            this._jtIcon.$setBitmapData(data);
        }
    };
    /**设置自身坐标*/
    AwareGameItem1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置信息
     *
    */
    AwareGameItem1.prototype.setgameInfo = function (gameName, _mTq, _mTime, _mTday) {
        if (gameName == undefined || _mTq == undefined || _mTime == undefined || _mTday == undefined)
            return;
        this._mTitle.text = "" + gameName;
        this._mTq.text = "第" + _mTq + "期";
        this._mTime.text = _mTime;
        this._mTday.text = _mTday;
    };
    /**设置标题*/
    AwareGameItem1.prototype.setTayile = function (gameName) {
        this._mTitle.text = "" + gameName;
    };
    /**初始化开奖号码*/
    AwareGameItem1.prototype.initAllRedBg = function (data) {
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
            obj.x = 42 + (i - 1) * 56;
            obj.y = 78;
            this.addChild(obj);
        }
    };
    AwareGameItem1.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    AwareGameItem1.prototype.onTouch = function () {
        if (this.myID == 1) {
            HistoryAwardsWnd.getInstance.show(3);
        }
        else if (this.myID == 2) {
            HistoryAwardsWnd.getInstance.show(5);
        }
    };
    /**清除所有*/
    AwareGameItem1.prototype.cleanAll = function () {
        var obj;
        for (var _i = 0, _a = this._mListBGBGBG.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._mListBGBGBG.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
        }
        if (this._mTitle != undefined) {
            this._mTitle.text = "";
            this._mTq.text = "";
            this._mTime.text = "";
            this._mTday.text = "";
        }
    };
    return AwareGameItem1;
}(egret.DisplayObjectContainer));
__reflect(AwareGameItem1.prototype, "AwareGameItem1");
//# sourceMappingURL=AwareGameItem1.js.map