var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MDisplay;
(function (MDisplay) {
    var MDisplayConfig = (function () {
        function MDisplayConfig(path, bn, r, sx, sy, x, y, skx, sky, alpha, name) {
            if (alpha === void 0) { alpha = 1; }
            this.mImagePath = path;
            this.mBlendName = bn;
            this.mRotation = r;
            this.mScaleX = sx;
            this.mScaleY = sy;
            this.mX = x;
            this.mY = y;
            this.mSkewX = skx;
            this.mSkewY = sky;
            this.mAlpha = alpha;
            this.mName = name;
        }
        return MDisplayConfig;
    }());
    MDisplay.MDisplayConfig = MDisplayConfig;
    __reflect(MDisplayConfig.prototype, "MDisplay.MDisplayConfig");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MDisplayConfig.js.map