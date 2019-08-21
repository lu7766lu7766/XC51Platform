var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GStatus;
(function (GStatus) {
    var CommonStatus = (function () {
        function CommonStatus() {
        }
        Object.defineProperty(CommonStatus, "getInstance", {
            get: function () {
                if (CommonStatus._mInstance == undefined)
                    CommonStatus._mInstance = new CommonStatus();
                return CommonStatus._mInstance;
            },
            enumerable: true,
            configurable: true
        });
        CommonStatus.prototype.enterStatus = function () {
        };
        CommonStatus.prototype.update = function (it) {
        };
        CommonStatus.prototype.exitStatus = function () {
        };
        return CommonStatus;
    }());
    GStatus.CommonStatus = CommonStatus;
    __reflect(CommonStatus.prototype, "GStatus.CommonStatus", ["GIGameStatus"]);
})(GStatus || (GStatus = {}));
//# sourceMappingURL=CommonStatus.js.map