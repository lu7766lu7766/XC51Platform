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
/**足球开奖详细界面显示 */
var FallViewMrg = (function (_super) {
    __extends(FallViewMrg, _super);
    function FallViewMrg() {
        var _this = _super.call(this) || this;
        _this.y = 200;
        _this.connetyq = new egret.DisplayObjectContainer();
        _this.addChild(_this.connetyq);
        return _this;
    }
    Object.defineProperty(FallViewMrg, "getInstance", {
        get: function () {
            if (FallViewMrg._mInstance == undefined)
                FallViewMrg._mInstance = new FallViewMrg();
            return FallViewMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FallViewMrg.prototype.getconnet = function () {
        return this.connetyq;
    };
    FallViewMrg.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.bgLay.addChild(this);
        }
        this.showconnet();
    };
    FallViewMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        // BakorfallViewMrg.inIndex = 1;
        this.cleanall();
    };
    /**足球数据显示*/
    FallViewMrg.prototype.showconnet = function () {
        var id = BakorfallViewMrg.inIndex;
        if (id == 1) {
            football1.getInstance.hide();
            football2.getInstance.show();
            football3.getInstance.hide();
            football4.getInstance.hide();
        }
        else if (id == 2) {
            football1.getInstance.show();
            football2.getInstance.hide();
            football3.getInstance.hide();
            football4.getInstance.hide();
        }
        else if (id == 3) {
            football1.getInstance.hide();
            football2.getInstance.hide();
            football3.getInstance.hide();
            football4.getInstance.show();
        }
        else {
            football1.getInstance.hide();
            football2.getInstance.hide();
            football3.getInstance.show();
            football4.getInstance.hide();
        }
    };
    /**清除所有*/
    FallViewMrg.prototype.cleanall = function () {
        football1.getInstance.hide();
        football2.getInstance.hide();
        football3.getInstance.hide();
        football4.getInstance.hide();
    };
    return FallViewMrg;
}(egret.DisplayObjectContainer));
__reflect(FallViewMrg.prototype, "FallViewMrg");
//# sourceMappingURL=FallViewMrg.js.map