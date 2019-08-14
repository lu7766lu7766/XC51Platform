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
/**篮球开奖详细界面显示 */
var BasketViewMrg = (function (_super) {
    __extends(BasketViewMrg, _super);
    function BasketViewMrg() {
        var _this = _super.call(this) || this;
        _this.y = 200;
        _this.connetyq = new egret.DisplayObjectContainer();
        _this.addChild(_this.connetyq);
        return _this;
    }
    Object.defineProperty(BasketViewMrg, "getInstance", {
        get: function () {
            if (BasketViewMrg._mInstance == undefined)
                BasketViewMrg._mInstance = new BasketViewMrg();
            return BasketViewMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    BasketViewMrg.prototype.getconnet = function () {
        return this.connetyq;
    };
    BasketViewMrg.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.bgLay.addChild(this);
        }
        this.showconnet();
    };
    BasketViewMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        // BakorfallViewMrg.inIndex = 1;
        this.cleanall();
    };
    /**足球数据显示*/
    BasketViewMrg.prototype.showconnet = function () {
        var id = BakorfallViewMrg.inIndex;
        if (id == 1) {
            basketball1.getInstance.hide();
            basketball2.getInstance.show();
            basketball3.getInstance.hide();
            basketball4.getInstance.hide();
        }
        else if (id == 2) {
            basketball1.getInstance.show();
            basketball2.getInstance.hide();
            basketball3.getInstance.hide();
            basketball4.getInstance.hide();
        }
        else if (id == 3) {
            basketball1.getInstance.hide();
            basketball2.getInstance.hide();
            basketball3.getInstance.hide();
            basketball4.getInstance.show();
        }
        else {
            basketball1.getInstance.hide();
            basketball2.getInstance.hide();
            basketball3.getInstance.show();
            basketball4.getInstance.hide();
        }
    };
    /**清除所有*/
    BasketViewMrg.prototype.cleanall = function () {
        basketball1.getInstance.hide();
        basketball2.getInstance.hide();
        basketball3.getInstance.hide();
        basketball4.getInstance.hide();
    };
    return BasketViewMrg;
}(egret.DisplayObjectContainer));
__reflect(BasketViewMrg.prototype, "BasketViewMrg");
//# sourceMappingURL=BasketViewMrg.js.map