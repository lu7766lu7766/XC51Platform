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
/**赛事筛选界面 */
var SelectMrg = (function (_super) {
    __extends(SelectMrg, _super);
    function SelectMrg() {
        var _this = _super.call(this) || this;
        _this._topStr = ["全部", "一级", "竞彩", "足彩", "单场"];
        _this.pointList = [130, 290, 440, 590];
        _this.touchEnabled = true;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("赛事筛选", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._topUI.getreturnSprite().visible = true;
        _this._return.touchEnabled = true;
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._topContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._topContain);
        _this.setDB();
        _this.Topinit();
        return _this;
    }
    Object.defineProperty(SelectMrg, "getInstance", {
        get: function () {
            if (SelectMrg._mInstance == undefined)
                SelectMrg._mInstance = new SelectMrg();
            return SelectMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SelectMrg.prototype.gettopList = function () {
        return this._topInfo;
    };
    /**获取本类容器*/
    SelectMrg.prototype.getConnet = function () {
        return this;
    };
    SelectMrg.prototype.Topinit = function () {
        this._topInfo = new GHashMap();
        for (var i = 0; i < this._topStr.length; i++) {
            var obj = new TopInfoThree(this._topStr[i]);
            this._topInfo.Gput(i + 1, obj);
            obj.x = 150 * i;
            obj.y = 95;
            obj.setmyID(i + 1);
            obj.touchEnabled = true;
            this.addChild(obj);
        }
        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect(55, 155, 48, 4, 8);
        this._topShape.graphics.endFill();
    };
    SelectMrg.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        selectFileData.getInstance.shouhide();
        this.redXXTween();
        AllSelectSS.getInstance.show();
        LowSelectBnt.getInstance.show();
        LowSelectBnt.getInstance.y = GameMain.getInstance.StageHeight - this.y - 100;
    };
    SelectMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        SelectMrg.inIndex = 1;
        selectFileData.getInstance.resetAllredx();
    };
    /**红线移动*/
    SelectMrg.prototype.redXXTween = function () {
        var movex = 150;
        if (SelectMrg.inIndex == 1)
            movex = 130;
        egret.Tween.get(this._topShape).to({ x: movex * (SelectMrg.inIndex - 1) }, 200, egret.Ease.circOut);
        LowSelectBnt.getInstance.setdecideBnt();
    };
    /**适配处理 */
    SelectMrg.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    SelectMrg.inIndex = 1; //页面下标
    return SelectMrg;
}(egret.DisplayObjectContainer));
__reflect(SelectMrg.prototype, "SelectMrg");
var TopInfoThree = (function (_super) {
    __extends(TopInfoThree, _super);
    function TopInfoThree(str) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.decideonclick = true; //是否可以点击
        _this.setDB();
        _this._title = ToolMrg.getText(0, 0, 28, 0x333333, 150);
        _this.addChild(_this._title);
        _this._title.height = 64;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = str;
        _this.addevent();
        return _this;
    }
    TopInfoThree.prototype.selectInfo = function () {
        this._title.textColor = 0xF72F52;
    };
    TopInfoThree.prototype.noselectInfo = function () {
        this._title.textColor = 0x333333;
    };
    /**设置自身id*/
    TopInfoThree.prototype.setmyID = function (myid) {
        this.myid = myid;
    };
    /**获取标题*/
    TopInfoThree.prototype.gettatile = function () {
        return this._title;
    };
    /**设置是否可以点击 */
    TopInfoThree.prototype.setonclick = function (decide) {
        this.decideonclick = decide;
    };
    /**适配处理 */
    TopInfoThree.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, 187.5, 64);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    TopInfoThree.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    TopInfoThree.prototype.onTouch = function () {
        if (this.decideonclick == false)
            return;
        SelectMrg.inIndex = this.myid;
        selectFileData.getInstance.redxdecide();
    };
    return TopInfoThree;
}(egret.DisplayObjectContainer));
__reflect(TopInfoThree.prototype, "TopInfoThree");
//# sourceMappingURL=SelectMrg.js.map