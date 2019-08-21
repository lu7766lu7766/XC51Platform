var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MDisplay;
(function (MDisplay) {
    var MFramData = (function () {
        function MFramData(index, eventStr) {
            this._mDisplays = new Array();
            this._mIndex = index;
            this._mEventStr = eventStr;
        }
        MFramData.prototype.MaddDisplay = function (sprite) {
            this._mDisplays.push(sprite);
        };
        Object.defineProperty(MFramData.prototype, "displays", {
            get: function () {
                return this._mDisplays;
            },
            enumerable: true,
            configurable: true
        });
        return MFramData;
    }());
    MDisplay.MFramData = MFramData;
    __reflect(MFramData.prototype, "MDisplay.MFramData");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MFramData.js.map