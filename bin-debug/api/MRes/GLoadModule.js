var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GLoadModule = (function () {
    function GLoadModule() {
        this._mLoadArr = new Array();
        this._mLoadSheetArr = new Array();
    }
    GLoadModule.prototype.GaddItem = function (Url) {
        if (GResCache.getRes(Url) != null)
            return;
        this._mLoadArr.push(Url);
    };
    GLoadModule.prototype.GaddGroupRes = function (groupName, type) {
        if (type != undefined && type == GLoadModule.GroupType_SheetFlash) {
            this._mLoadSheetArr.push(GSheet.pathSheetFlash + groupName);
        }
        else if (type != undefined && type == GLoadModule.GroupType_SheetUI) {
            this._mLoadSheetArr.push(GSheet.pathSheetUI + groupName);
        }
        else {
            var data = GResCache.getResGroupConfig(groupName);
            if (data == null) {
                egret.error('加载组资源时出错 不存在对应命名的配置:' + groupName);
                return false;
            }
            var images = data['images'];
            var baseUrl = data['base'];
            for (var _i = 0, images_1 = images; _i < images_1.length; _i++) {
                var image = images_1[_i];
                this.GaddItem(baseUrl + image);
            }
            if (type == GLoadModule.GroupType_UI) {
                this.GaddItem(MDisplay.MUISprite.UIConfigUrl + groupName);
            }
            else if (type == GLoadModule.GroupType_Flash)
                this.GaddItem(MDisplay.MMovieClipData.configFileBaseUrl + groupName);
        }
        return true;
    };
    GLoadModule.prototype.removeItem = function (Url) {
        var index = this._mLoadArr.indexOf(Url);
        if (index > -1)
            this._mLoadArr.splice(index, 1);
    };
    /**移除大图列表 */
    GLoadModule.prototype.removeSheetItem = function (Url) {
        Url = Url.replace(GLoadModule.loadBaseUrl, '');
        var index = this._mLoadSheetArr.indexOf(Url);
        if (index > -1)
            this._mLoadSheetArr.splice(index, 1);
    };
    GLoadModule.prototype.Gbegin = function (callFun, thisObj) {
        this._mCallBackFun = callFun;
        this._mThisObj = thisObj;
        this._mLoadTotal = this._mLoadArr.length + this._mLoadSheetArr.length;
        if (this._mLoadTotal == 0) {
            this._mCallBackFun.call(this._mThisObj);
            return;
        }
        this.loadSheet();
    };
    /**优先处理 预加载大图 */
    GLoadModule.prototype.loadSheet = function () {
        var total = 0;
        for (var _i = 0, _a = this._mLoadSheetArr; _i < _a.length; _i++) {
            var temp = _a[_i];
            GSheet.getInstance().getResByUrl(temp, this.onLoadSheet, this);
            total++;
        }
        if (total == 0)
            this.checkIsEndSheet();
    };
    /**大图加载完毕 回调*/
    GLoadModule.prototype.onLoadSheet = function (data, url) {
        if (data == undefined)
            return;
        if (url.indexOf("flash") >= 0) {
            //存储大图
            for (var key in data._textureMap) {
                GSheet.getInstance().saveFlash(key, data._textureMap[key]);
            }
        }
        if (url.indexOf("ui") >= 0) {
            //存储大图
            for (var key in data._textureMap) {
                GSheet.getInstance().saveUi(key, data._textureMap[key]);
            }
        }
        this.removeSheetItem(url);
        this.checkIsEndSheet();
    };
    /**大图加载完毕检测 */
    GLoadModule.prototype.checkIsEndSheet = function () {
        if (this._mLoadSheetArr.length <= 0 && this._mCallBackFun !== undefined) {
            this.loadOrdinary();
        }
    };
    /**普通加载 */
    GLoadModule.prototype.loadOrdinary = function () {
        var total = 0;
        var temp;
        for (var i = this._mLoadArr.length - 1; i >= 0; i--) {
            temp = this._mLoadArr[i];
            if (GResCache.getRes(temp) != null) {
                this.removeItem(temp);
            }
            else {
                GResCache.loadResByUrl(temp, this.onLoaded, this);
                total++;
            }
        }
        if (total == 0)
            this.checkIsEnd();
    };
    GLoadModule.prototype.onLoaded = function (data, url) {
        if (data == undefined)
            return;
        url = url.replace(GLoadModule.loadBaseUrl, '');
        this.removeItem(url);
        this.checkIsEnd();
    };
    GLoadModule.prototype.checkIsEnd = function () {
        if (this._mLoadArr.length <= 0 && this._mCallBackFun !== undefined) {
            this._mLoadTotal = 0;
            this._mCallBackFun.call(this._mThisObj);
        }
    };
    Object.defineProperty(GLoadModule.prototype, "loadTotal", {
        get: function () {
            return this._mLoadTotal;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GLoadModule.prototype, "loadOverplus", {
        /**
         * 当前还剩待加载的资源数
        * @returns  		剩待加载的资源数
        */
        get: function () {
            return this._mLoadArr.length + this._mLoadSheetArr.length;
        },
        enumerable: true,
        configurable: true
    });
    GLoadModule.GroupType_UI = 'GroupLoadType_UI';
    GLoadModule.GroupType_Flash = 'GroupLoadType_Flash';
    GLoadModule.GroupType_SheetFlash = 'GroupLoadType_SheetFlash';
    GLoadModule.GroupType_SheetUI = 'GroupLoadType_SheetUI';
    GLoadModule.loadBaseUrl = '';
    return GLoadModule;
}());
__reflect(GLoadModule.prototype, "GLoadModule");
//# sourceMappingURL=GLoadModule.js.map