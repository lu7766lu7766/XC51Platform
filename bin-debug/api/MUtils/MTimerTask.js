var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var MUtils;
(function (MUtils) {
    var MTimerTask = (function () {
        function MTimerTask() {
        }
        MTimerTask.prototype.Minit = function (name, total, delayed, callFun, thisObj) {
            this.mName = name;
            this.mTotal = total;
            this._mDeplete = this._mDelayed = delayed;
            this._mCallFun = callFun;
            this._mThisObj = thisObj;
            this.mCurrentTime = 0;
        };
        MTimerTask.prototype.Mupdate = function (it) {
            this._mDeplete -= it;
            if (this._mDeplete <= 0) {
                this.mCurrentTime++;
                this._mCallFun.call(this._mThisObj, this);
                this._mDeplete = this._mDelayed;
                if (this.mCurrentTime >= this.mTotal)
                    GTimerMag.getInstance.GremoveTimerTask(this.mName);
            }
        };
        MTimerTask.prototype.clean = function () {
        };
        return MTimerTask;
    }());
    MUtils.MTimerTask = MTimerTask;
    __reflect(MTimerTask.prototype, "MUtils.MTimerTask", ["GIObjPool"]);
})(MUtils || (MUtils = {}));
//# sourceMappingURL=MTimerTask.js.map