var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MDisplay;
(function (MDisplay) {
    var MParticleData = (function () {
        function MParticleData(texture, life, xstep, ystep, alphaStep, scaleXstep, scaleYstep) {
            this._startTime = this._lastTime = egret.getTimer();
            this._bitMap = new egret.Bitmap();
            this._bitMap.$setBitmapData(texture);
            this._lifeTime = life;
            this._XStep = xstep;
            this._YStep = ystep;
            this._AlphaStep = alphaStep;
            this._scaleXStep = scaleXstep;
            this._scaleYStep = scaleYstep;
        }
        MParticleData.prototype.init = function (x, y, alpha, scalex, scaley) {
            this._bitMap.x = x;
            this._bitMap.y = y;
            this._bitMap.alpha = alpha;
            this._bitMap.scaleX = scalex;
            this._bitMap.scaleY = scaley;
        };
        Object.defineProperty(MParticleData.prototype, "bitMap", {
            get: function () {
                return this._bitMap;
            },
            enumerable: true,
            configurable: true
        });
        MParticleData.prototype.update = function (currentT) {
            if ((currentT - this._startTime) > this._lifeTime)
                return false;
            var it = currentT - this._lastTime;
            this._bitMap.x += this._XStep * it;
            this._bitMap.y += this._YStep * it;
            this._bitMap.alpha += this._AlphaStep * it;
            this._bitMap.scaleX += this._scaleXStep * it;
            this._bitMap.scaleY += this._scaleYStep * it;
            this._lastTime = currentT;
            return true;
        };
        MParticleData.prototype.clean = function () {
            this._bitMap.$setBitmapData(null);
            if (this._bitMap.parent != undefined)
                this._bitMap.parent.removeChild(this._bitMap);
        };
        return MParticleData;
    }());
    MDisplay.MParticleData = MParticleData;
    __reflect(MParticleData.prototype, "MDisplay.MParticleData");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MParticleData.js.map