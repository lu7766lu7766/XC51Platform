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
    var MUISprite = (function (_super) {
        __extends(MUISprite, _super);
        function MUISprite() {
            var _this = _super.call(this) || this;
            _this._mInit = false;
            _this._mLoadMod = new GLoadModule();
            return _this;
        }
        MUISprite.prototype.beforeLoad = function (url, type) {
            if (type != undefined && (type == GLoadModule.GroupType_UI || type == GLoadModule.GroupType_Flash
                || type == GLoadModule.GroupType_SheetUI || type == GLoadModule.GroupType_SheetFlash)) {
                this._mLoadMod.GaddGroupRes(url, type);
            }
            else
                this._mLoadMod.GaddItem(url);
        };
        MUISprite.prototype.GinitUIConfig = function (url) {
            if (url && url != "") {
                var uiName = url + '.json';
                if (this._mLoadMod.GaddGroupRes(uiName, GLoadModule.GroupType_UI)) {
                    this._mUIConfigUrl = MUISprite.UIConfigUrl + uiName;
                }
            }
            this._mLoadMod.Gbegin(this.onLoadedItems, this);
        };
        MUISprite.prototype.onLoadedItems = function () {
            this._mInit = true;
            this.initUI();
            this.onInit();
        };
        MUISprite.prototype.initUI = function () {
            if (!this._mUIConfigUrl || this._mUIConfigUrl == "")
                return;
            var configData = GResCache.getRes(this._mUIConfigUrl);
            var list = configData['list'];
            for (var i = 0, l = list.length; i < l; i++) {
                var child = new egret.Bitmap(GResCache.getRes(MUISprite.UIImageUrl + list[i]['path']));
                child.x = list[i]['x'];
                child.y = list[i]['y'];
                if (list[i]['skx'] != list[i]['sky']) {
                    child.skewX = list[i]['skx'];
                    child.skewY = list[i]['sky'];
                    child.rotation = 0;
                }
                else {
                    child.rotation = list[i]['r'];
                    child.skewX = 0;
                    child.skewY = 0;
                }
                child.scaleX = list[i]['sx'];
                child.scaleY = list[i]['sy'];
                child.name = list[i]['n'];
                this.addChild(child);
            }
        };
        MUISprite.prototype.onInit = function () {
        };
        MUISprite.UIConfigUrl = 'resource/assets/uiconfig/';
        MUISprite.UIImageUrl = 'resource/assets/images/ui/';
        return MUISprite;
    }(egret.DisplayObjectContainer));
    MDisplay.MUISprite = MUISprite;
    __reflect(MUISprite.prototype, "MDisplay.MUISprite");
})(MDisplay || (MDisplay = {}));
//# sourceMappingURL=MUISprite.js.map