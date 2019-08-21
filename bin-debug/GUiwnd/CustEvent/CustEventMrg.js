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
/**
 * 自定义事件
 */
var CustEventMrg = (function (_super) {
    __extends(CustEventMrg, _super);
    function CustEventMrg() {
        return _super.call(this) || this;
    }
    Object.defineProperty(CustEventMrg, "getInstance", {
        get: function () {
            if (this.mInstance == undefined)
                this.mInstance = new CustEventMrg();
            return this.mInstance;
        },
        enumerable: true,
        configurable: true
    });
    CustEventMrg.prototype.addEvent = function (type, listener, thisObject, useCapture, priority) {
        if (CustEventMrg.getInstance.hasEventListener(type)) {
            return;
        }
        CustEventMrg.getInstance.addEventListener(type, listener, thisObject, useCapture, priority);
    };
    CustEventMrg.prototype.removeEvent = function (type, listener, thisObject, useCapture) {
        if (!CustEventMrg.getInstance.hasEventListener(type)) {
            return;
        }
        CustEventMrg.getInstance.removeEventListener(type, listener, thisObject, useCapture);
    };
    /**
     * 派发一个带数据的事件。
     * @param type {string} 事件类型
     * @param data {any} 事件data
     * @param bubbles {boolean} 确定 Event 对象是否参与事件流的冒泡阶段。默认值为 false。
     * @param cancelable {boolean} 确定是否可以取消 Event 对象。默认值为 false。
     */
    CustEventMrg.prototype.dispatch = function (type, data, bubbles, cancelable) {
        CustEventMrg.getInstance.dispatchEventWith(type, bubbles, data, cancelable);
        return true;
    };
    return CustEventMrg;
}(egret.EventDispatcher));
__reflect(CustEventMrg.prototype, "CustEventMrg");
//# sourceMappingURL=CustEventMrg.js.map