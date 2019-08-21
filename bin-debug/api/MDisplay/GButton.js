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
var MDisplay;
(function (MDisplay) {
    var GButton = (function (_super) {
        __extends(GButton, _super);
        /**
         * 设置位图内容  及是否自动缩放 默认为自动缩放
         */
        function GButton(data, isAutoZoon) {
            var _this = _super.call(this, data) || this;
            _this._isAutoZoon = true;
            _this._touchBeginFun = undefined;
            _this._touchBeginThisObj = undefined;
            _this._isSetZoon = false;
            if (isAutoZoon != undefined) {
                _this._isAutoZoon = isAutoZoon;
            }
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onClick, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.touchEnd, _this);
            _this.touchEnabled = true;
            return _this;
        }
        /**
         * 添加单击事件
         * @param fun:事件回调的方法
         * @param thisObj:事件回调依附的对象
         */
        GButton.prototype.addTouchBeginEvent = function (fun, thisObj) {
            this._touchBeginFun = fun;
            this._touchBeginThisObj = thisObj;
        };
        GButton.prototype.touchEnd = function (e) {
            if (e.currentTarget == this) {
                if (this._isAutoZoon) {
                    GButton.upstep(this, this._touchBeginFun, this._touchBeginThisObj, e);
                }
                else if (this._touchBeginFun != undefined && this._touchBeginThisObj != undefined)
                    this._touchBeginFun.call(this._touchBeginThisObj, e);
            }
            e.stopImmediatePropagation;
        };
        GButton.prototype.onClick = function (e) {
            if (e.currentTarget == this) {
                if (this._isAutoZoon) {
                    GButton.minify(this);
                }
                else
                    this._touchBeginFun.call(this._touchBeginThisObj, e);
            }
            e.stopImmediatePropagation;
        };
        /**
         * 设置居中缩放锚点
         * 因为锚点跟X Y坐标有关联 如果当前锚点已经居中 则此方法不会做任何修改
         */
        GButton.setZoom = function (obj) {
            var offsetX = Math.floor(obj.width / 2 + 0.5);
            if (obj.$anchorOffsetX != 0)
                return;
            var offsetY = Math.floor(obj.height / 2 + 0.5);
            obj.anchorOffsetX = offsetX;
            obj.anchorOffsetY = offsetY;
            obj.x += obj.anchorOffsetX;
            obj.y += obj.$anchorOffsetY;
        };
        /**
         * 缓动缩小 并且设置锚点为正中心
         */
        GButton.minify = function (obj) {
            GButton.setZoom(obj);
            egret.Tween.get(obj).to({ scaleX: 0.9, scaleY: 0.9 }, 80);
        };
        /**
         * 缓动放大 并且设置锚点为正中心 当缓动结束后 调用指定回调方法
         * @param obj  要进行缓动的显示对象
         * @param fun	缓动结束的回调方法
         * @param funThisObj 回调方法对应的This对象
         * @param data		回调方法需要传递的对象
         */
        GButton.upstep = function (obj, fun, funThisObj, data) {
            GButton.setZoom(obj);
            egret.Tween.get(obj).to({ scaleX: 1.1, scaleY: 1.1 }, 110).to({ scaleX: 1, scaleY: 1 }, 100).call(function () {
                if (fun != undefined && funThisObj != undefined) {
                    if (data != undefined)
                        fun.call(funThisObj, data);
                    else
                        fun.call(funThisObj);
                }
            }, funThisObj);
        };
        return GButton;
    }(egret.Bitmap));
    MDisplay.GButton = GButton;
    __reflect(GButton.prototype, "MDisplay.GButton");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=GButton.js.map