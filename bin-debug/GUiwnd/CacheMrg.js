var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CacheMrg = (function () {
    function CacheMrg() {
        /**看视频次数 */
        this._mVideoKey = "ssssvideo2";
        /**永久数据 */
        this._mYJKey = "YJKey42";
        /**上次登录时间 */
        this._mLastTimeKey = "LastTime";
        this._mLastTime = 0;
        this._mVideoKeyHC = new GHashMap();
        this._mYJHC = new GHashMap();
        this.init();
        this.checkOneDate(Date.parse(new Date().toString()) / 1000);
    }
    Object.defineProperty(CacheMrg, "getInstance", {
        get: function () {
            if (CacheMrg._mInstance == undefined)
                CacheMrg._mInstance = new CacheMrg();
            return CacheMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**初始化 取缓存数据 */
    CacheMrg.prototype.init = function () {
        var vSize = egret.localStorage.getItem(this._mVideoKey);
        if (vSize != undefined) {
            for (var i = 0; i < Number(vSize); i++) {
                var val = egret.localStorage.getItem(this._mVideoKey + i);
                this._mVideoKeyHC.Gput((this._mVideoKey + i), val);
            }
        }
        var yjSize = egret.localStorage.getItem(this._mYJKey);
        if (yjSize != undefined) {
            for (var i = 0; i < Number(yjSize); i++) {
                var val = egret.localStorage.getItem(this._mYJKey + i);
                this._mYJHC.Gput((this._mYJKey + i), val);
            }
        }
        //获取上次时间戳
        this._mLastTime = Number(egret.localStorage.getItem(this._mLastTimeKey));
        this._mLastTime = this._mLastTime == undefined ? 0 : this._mLastTime;
    };
    /**保存缓存 (仅一天)*/
    CacheMrg.prototype.addVideoTime = function (val, times) {
        var bool = false;
        for (var _i = 0, _a = this._mVideoKeyHC.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._mVideoKeyHC.Gget(key) == val) {
                bool = true;
                break;
            }
        }
        if (bool == false) {
            this._mVideoKeyHC.Gput((this._mVideoKey + this._mVideoKeyHC.size), val);
            egret.localStorage.setItem(this._mVideoKey, "" + this._mVideoKeyHC.size);
            egret.localStorage.setItem((this._mVideoKey + (this._mVideoKeyHC.size - 1)), val);
        }
        egret.localStorage.setItem((this._mVideoKey + val), "" + times);
    };
    /**获取缓存 (仅一天) */
    CacheMrg.prototype.getVideoTime = function (val) {
        var key;
        for (var i = 0; i < this._mVideoKeyHC.size; i++) {
            key = this._mVideoKey + (i);
            if (this._mVideoKeyHC.GhasKey(key) && this._mVideoKeyHC.Gget(key) == val) {
                var aaa = egret.localStorage.getItem(this._mVideoKey + val);
                aaa = (aaa == undefined || aaa == "") ? "0" : aaa;
                return Number(aaa);
            }
        }
        return 0;
    };
    /**保存永久缓存 */
    CacheMrg.prototype.addYJTime = function (val, times) {
        var bool = false;
        for (var _i = 0, _a = this._mYJHC.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._mYJHC.Gget(key) == val) {
                bool = true;
                break;
            }
        }
        if (bool == false) {
            this._mYJHC.Gput((this._mYJKey + this._mYJHC.size), val);
            egret.localStorage.setItem(this._mYJKey, "" + this._mYJHC.size);
            egret.localStorage.setItem((this._mYJKey + (this._mYJHC.size - 1)), val);
        }
        egret.localStorage.setItem((this._mYJKey + val), "" + times);
    };
    /**获取永久次数 */
    CacheMrg.prototype.getYJTime = function (val) {
        var key;
        for (var i = 0; i < this._mYJHC.size; i++) {
            key = this._mYJKey + (i);
            if (this._mYJHC.GhasKey(key) && this._mYJHC.Gget(key) == val) {
                var aaa = egret.localStorage.getItem(this._mYJKey + val);
                aaa = (aaa == undefined || aaa == "") ? "0" : aaa;
                return aaa;
            }
        }
        return "0";
    };
    /**清空缓存数据(仅一天) */
    CacheMrg.prototype.cleanVideo = function () {
        var key;
        for (var i = 0; i < this._mVideoKeyHC.size; i++) {
            key = this._mVideoKey + i;
            if (this._mVideoKeyHC.GhasKey(key)) {
                egret.localStorage.removeItem(key);
                egret.localStorage.removeItem(this._mVideoKey + this._mVideoKeyHC.Gget(key));
                this._mVideoKeyHC.Gput(key, "0");
            }
        }
        egret.localStorage.removeItem(this._mVideoKey);
    };
    /**是否过了一天 */
    CacheMrg.prototype.checkOneDate = function (time) {
        var now = new Date(time * 1000).toDateString();
        var last = new Date(this._mLastTime * 1000).toDateString();
        if (this._mLastTime > 0 && now == last) {
            return false;
        }
        else {
            egret.localStorage.setItem(this._mLastTimeKey, "" + time);
            this.cleanVideo();
            return true;
        }
    };
    return CacheMrg;
}());
__reflect(CacheMrg.prototype, "CacheMrg");
//# sourceMappingURL=CacheMrg.js.map