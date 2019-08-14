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
/**排三方案详情界面 */
var FathreeViewMrg = (function (_super) {
    __extends(FathreeViewMrg, _super);
    function FathreeViewMrg() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.y = 96 + GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("方案详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this.topObj = new FathreeItemTop();
        _this.addChild(_this.topObj);
        _this.centerobj = new FathreeItemCenter();
        _this.addChild(_this.centerobj);
        _this.centerobj.y = _this.topObj.height;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(FathreeViewMrg, "getInstance", {
        get: function () {
            if (FathreeViewMrg._mInstance == undefined)
                FathreeViewMrg._mInstance = new FathreeViewMrg();
            return FathreeViewMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FathreeViewMrg.prototype.show = function (data) {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this.dataObj = data;
        this.setTopConnet();
        this.setcenter();
        FathreeItemLow.getInstance.show(this.topObj.height + this.centerobj.height, this.dataObj);
    };
    /**设置顶部内容*/
    FathreeViewMrg.prototype.setTopConnet = function () {
        if (this.dataObj != undefined) {
            if (this.dataObj.threeOrFive != undefined) {
                this.topObj.settzgold(this.dataObj.xzMoney, this.dataObj.threeOrFive.doubleNum, this.dataObj.xjMoney);
                this.topObj.setdefaultTatle(this.dataObj.title, this.dataObj.threeOrFive.qs, this.dataObj.statue, this.dataObj);
                this.topObj.setddNum(this.dataObj.id + "", this.dataObj.time);
                this.topObj.setIcon(this.dataObj.type);
            }
        }
    };
    /**设置中部*/
    FathreeViewMrg.prototype.setcenter = function () {
        if (this.dataObj != undefined) {
            this.centerobj.initAllRedBg(this.dataObj.threeOrFive.kjNumList, this.dataObj.threeOrFive.openStr);
        }
    };
    FathreeViewMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        FathreeItemLow.getInstance.hide();
    };
    /**适配处理 */
    FathreeViewMrg.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return FathreeViewMrg;
}(egret.DisplayObjectContainer));
__reflect(FathreeViewMrg.prototype, "FathreeViewMrg");
//# sourceMappingURL=FathreeViewMrg.js.map