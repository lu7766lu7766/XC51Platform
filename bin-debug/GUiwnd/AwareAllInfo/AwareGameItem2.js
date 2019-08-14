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
/**竞彩足球或者竞彩篮球 */
var AwareGameItem2 = (function (_super) {
    __extends(AwareGameItem2, _super);
    function AwareGameItem2() {
        var _this = _super.call(this) || this;
        _this.myID = 0; //自身id
        _this.touchEnabled = true;
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
        _this._mTitle = ToolMrg.getText(38, 20, 28, 0x333333, 150);
        _this._mTitle.text = "";
        _this._mTitle.fontFamily = "微软雅黑";
        _this.addChild(_this._mTitle);
        _this._mTime = ToolMrg.getText(166, 28, 20, 0x999999, 200);
        _this._mTime.text = "";
        _this._mTime.fontFamily = "微软雅黑";
        _this.addChild(_this._mTime);
        _this._mTday = ToolMrg.getText(286, 28, 20, 0x999999, 200);
        _this._mTday.text = "";
        _this._mTday.fontFamily = "微软雅黑";
        // this.addChild(this._mTday);
        _this._jtIcon = new egret.Bitmap();
        _this._jtIcon.x = 708;
        _this._jtIcon.y = 62;
        _this.addChild(_this._jtIcon);
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        // this._bsBG = new egret.Shape();
        // this.addChild(this._bsBG);
        // this._bsBG.graphics.beginFill(0x5CB767);
        // this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
        // this._bsBG.graphics.endFill();
        // this._bsyuan = new egret.Shape();
        // this.addChild(this._bsyuan);
        // this._bsyuan.graphics.beginFill(0x5CB767);
        // this._bsyuan.graphics.drawCircle(560, 96, 28);
        // this._bsyuan.graphics.endFill();
        _this._ballIcon = new egret.Bitmap();
        _this._ballIcon.x = 40;
        _this._ballIcon.y = 68;
        _this.addChild(_this._ballIcon);
        // this._ballIcon.width = 58;
        // this._ballIcon.height = 56;
        // RES.getResByUrl("resource/assets/images/ui/jlcg_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
        _this._bsTeam = ToolMrg.getText(68, 84, 24, 0xffffff, 520);
        _this._bsTeam.text = "";
        _this._bsTeam.fontFamily = "微软雅黑";
        _this._bsTeam.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this._bsTeam);
        _this.addevent();
        return _this;
    }
    /**设置id*/
    AwareGameItem2.prototype.setID = function (id) {
        this.myID = id;
    };
    /**设置自身坐标*/
    AwareGameItem2.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    AwareGameItem2.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this._jtIcon != undefined) {
            this._jtIcon.$setBitmapData(data);
        }
    };
    AwareGameItem2.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this._ballIcon != undefined) {
            this._ballIcon.$setBitmapData(data);
        }
    };
    /**设置图标信息(1 足球 2篮球)*/
    AwareGameItem2.prototype.setBallIcon = function (num) {
        if (num == 1) {
            RES.getResByUrl("resource/assets/images/ui/kjjczq_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/kjjclq_home@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
        }
        this.setyuanBG(num);
    };
    /**设置圆背景*/
    AwareGameItem2.prototype.setyuanBG = function (num) {
        // if (num == 1) {
        // 	this._bsBG.graphics.clear();
        // 	this._bsBG.graphics.beginFill(0x5CB767);
        // 	this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
        // 	this._bsBG.graphics.endFill();
        // 	this._bsyuan.graphics.clear();
        // 	this._bsyuan.graphics.beginFill(0x5CB767);
        // 	this._bsyuan.graphics.drawCircle(560, 96, 28);
        // 	this._bsyuan.graphics.endFill();
        // } else {
        // 	this._bsBG.graphics.clear();
        // 	this._bsBG.graphics.beginFill(0xFC9E2B);
        // 	this._bsBG.graphics.drawRoundRect(68, 68, 492, 56, 0);
        // 	this._bsBG.graphics.endFill();
        // 	this._bsyuan.graphics.clear();
        // 	this._bsyuan.graphics.beginFill(0xFC9E2B);
        // 	this._bsyuan.graphics.drawCircle(560, 96, 28);
        // 	this._bsyuan.graphics.endFill();
        // }
    };
    /**设置队伍比赛信息*/
    AwareGameItem2.prototype.setinfo = function (info, name) {
        if (info == undefined || name == undefined)
            return;
        this._bsTeam.text = "" + info;
        this._mTitle.text = name;
    };
    /**设置标题*/
    AwareGameItem2.prototype.setTayile = function (gameName) {
        this._mTitle.text = "" + gameName;
    };
    /**设置时间*/
    AwareGameItem2.prototype.setTimer = function (str) {
        if (str == undefined)
            return;
        this._mTime.text = str;
    };
    /**清除所有信息*/
    AwareGameItem2.prototype.cleanall = function () {
        this._bsTeam.text = "";
        RES.getResByUrl("", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
    };
    AwareGameItem2.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    AwareGameItem2.prototype.onTouch = function () {
        if (this.myID == 3) {
            jcFootBallView.getInstance.show();
        }
        else {
            jcbasketBallView.getInstance.show();
        }
    };
    return AwareGameItem2;
}(egret.DisplayObjectContainer));
__reflect(AwareGameItem2.prototype, "AwareGameItem2");
//# sourceMappingURL=AwareGameItem2.js.map