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
    var GParticle = (function (_super) {
        __extends(GParticle, _super);
        /**
         * 新建粒子对象
         * @param texture		粒子对象显示的贴图对象
         * @param lifeMin		单个粒子生命周期最小值
         * @param lifeMax		单个粒子生命周期最大值
         * @param it			单个粒子出现的间隔时间(毫秒)
         * @param max			同时存在最大的粒子数
         * @param xmin			初始化X坐标最小值
         * @param xmax			初始化X坐标最大值
         * @param xResMin		粒子生命结束时X的最小偏移量 在初始X坐标基础上+此增量
         * @param xResMax		粒子生命结束时X的最大偏移量 在初始X坐标基础上+此增量
         * @param ymin			初始化Y坐标最小值
         * @param ymax			初始化Y坐标最大值
         * @param yResMin		粒子生命结束时Y的最小偏移量 在初始Y坐标基础上+此增量
         * @param yResMax		粒子生命结束时Y的最大偏移量 在初始Y坐标基础上+此增量
         * @param alphaMin		初始化alpha最小值
         * @param alphaMax		初始化alpha最大值
         * @param alphaResMin	粒子生命结束时alpha的最小偏移量 在初始alpha基础上+此增量
         * @param alphaResMax	粒子生命结束时alpha的最大偏移量 在初始alpha基础上+此增量
         * @param scaleXMin		初始化scaleX最小值
         * @param scaleXMax		初始化scaleX最大值
         * @param scaleXResMin	粒子生命结束时scaleX的最小偏移量 在初始scaleX基础上+此增量
         * @param scaleXResMax	粒子生命结束时scaleX的最大偏移量 在初始scaleX基础上+此增量
         * @param scaleYMin		初始化scaleY最小值
         * @param scaleYMax		初始化scaleY最大值
         * @param scaleYResMin	粒子生命结束时scaleY的最小偏移量 在初始scaleY基础上+此增量
         * @param scaleYResMax	粒子生命结束时scaleY的最大偏移量 在初始scaleY基础上+此增量
         */
        function GParticle(texture, lifeMin, lifeMax, it, max, xmin, xmax, xResMin, xResMax, ymin, ymax, yResMin, yResMax, alphaMin, alphaMax, alphaResMin, alphaResMax, scaleXMin, scaleXMax, scaleXResMin, scaleXResMax, scaleYMin, scaleYMax, scaleYResMin, scaleYResMax) {
            var _this = _super.call(this) || this;
            _this._lastAddTime = 0;
            _this._texture = texture;
            _this._lifeMin = lifeMin;
            _this._lifeMax = lifeMax;
            _this._interval = it;
            _this._Max = max;
            _this._xMin = xmin;
            _this._xMax = xmax;
            _this._xResMin = xResMin;
            _this._xResMax = xResMax;
            _this._YMin = ymin;
            _this._YMax = ymax;
            _this._YResMin = yResMin;
            _this._YResMax = yResMax;
            _this._AlphaMin = alphaMin != undefined ? alphaMin : 1;
            _this._AlphaMax = alphaMax != undefined ? alphaMax : 1;
            _this._AlphaResMin = alphaResMin != undefined ? alphaResMin : 1;
            _this._AlphaResMax = alphaResMax != undefined ? alphaResMax : 1;
            _this._scaleXMin = scaleXMin != undefined ? scaleXMin : 1;
            _this._scaleXMax = scaleXMax != undefined ? scaleXMax : 1;
            _this._scaleXResMin = scaleXResMin != undefined ? scaleXResMin : 1;
            _this._scaleXResMax = scaleXResMax != undefined ? scaleXResMax : 1;
            _this._scaleYMin = scaleYMin != undefined ? scaleYMin : 1;
            _this._scaleYMax = scaleYMax != undefined ? scaleYMax : 1;
            _this._scaleYResMin = scaleYResMin != undefined ? scaleYResMin : 1;
            _this._scaleYResMax = scaleYResMax != undefined ? scaleYResMax : 1;
            _this._lastAddTime = egret.getTimer();
            _this._itemArr = [];
            _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
            return _this;
        }
        GParticle.prototype.onEnterFrame = function (e) {
            if (this._pause)
                return;
            var ct = egret.getTimer();
            this.add(ct);
            this.update(ct);
        };
        GParticle.prototype.add = function (ct) {
            if (this._itemArr.length >= this._Max || (ct - this._lastAddTime) < this._interval)
                return;
            var life = this._lifeMin + Math.floor(Math.random() * (this._lifeMax - this._lifeMin) + 0.5);
            var x = this._xMin + Math.floor(Math.random() * (this._xMax - this._xMin) + 0.5);
            var y = this._YMin + Math.floor(Math.random() * (this._YMax - this._YMin) + 0.5);
            var xRes = x + this._xResMin + Math.floor(Math.random() * (this._xResMax - this._xResMin) + 0.5);
            var yRes = y + this._YResMin + Math.floor(Math.random() * (this._YResMax - this._YResMin) + 0.5);
            var alpha = this._AlphaMin + Math.random() * (this._AlphaMax - this._AlphaMin);
            var alphaRes = this._AlphaResMin + Math.random() * (this._AlphaResMax - this._AlphaResMin);
            var scaleX = this._scaleXMin + Math.random() * (this._scaleXMax - this._scaleXMin);
            var scaley = this._scaleYMin + Math.random() * (this._scaleYMax - this._scaleYMin);
            var scaleXRes = this._scaleXResMin + Math.random() * (this._scaleXResMax - this._scaleXResMin);
            var scaleYRes = this._scaleYResMin + Math.random() * (this._scaleYResMax - this._scaleYResMin);
            var xstep = (xRes - x) / life;
            var ystep = (yRes - y) / life;
            var alphaStep = alphaRes == alpha ? 0 : (alphaRes - alpha) / life;
            var scaleXStep = scaleXRes == scaleX ? 0 : (scaleXRes - scaleX) / life;
            var scaleYStep = scaleYRes == scaley ? 0 : (scaleYRes - scaley) / life;
            var temp = new MDisplay.MParticleData(this._texture, life, xstep, ystep, alphaStep, scaleXStep, scaleYStep);
            temp.init(x, y, alpha, scaleX, scaley);
            this.addChild(temp.bitMap);
            this._itemArr.push(temp);
        };
        GParticle.prototype.update = function (ct) {
            for (var i = this._itemArr.length - 1; i >= 0; i--) {
                var temp = this._itemArr[i];
                if (temp.update(ct) == false) {
                    temp.clean();
                    this._itemArr.splice(i, 1);
                }
            }
        };
        GParticle.prototype.setPause = function (pause) {
            this._pause = pause;
        };
        Object.defineProperty(GParticle.prototype, "pause", {
            get: function () {
                return this._pause;
            },
            enumerable: true,
            configurable: true
        });
        GParticle.prototype.clear = function () {
            this.setPause(true);
            this.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
            for (var i = this._itemArr.length - 1; i >= 0; i--) {
                this._itemArr[i].clean();
            }
            this._itemArr.splice(0, this._itemArr.length);
            if (this.parent != undefined)
                this.parent.removeChild(this);
        };
        return GParticle;
    }(egret.Sprite));
    MDisplay.GParticle = GParticle;
    __reflect(GParticle.prototype, "MDisplay.GParticle");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=GParticle.js.map