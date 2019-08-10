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
/**赛事数据等待加载 */
var LoadtoWaitWnd = (function (_super) {
    __extends(LoadtoWaitWnd, _super);
    function LoadtoWaitWnd() {
        var _this = _super.call(this) || this;
        _this.waitImg = new egret.Bitmap();
        _this.addChild(_this.waitImg);
        RES.getResByUrl("resource/assets/images/ui/hsjjz_default@2x.png", function (e) {
            _this.waitImg.$setBitmapData(e);
            _this.waitImg.x = (GameMain.getInstance.StageWidth - _this.waitImg.width) * 0.5;
            _this.waitImg.y = (GameMain.getInstance.StageHeight - _this.waitImg.height) * 0.5;
        }, _this);
        return _this;
    }
    Object.defineProperty(LoadtoWaitWnd, "getInstance", {
        get: function () {
            if (LoadtoWaitWnd._mInstance == undefined)
                LoadtoWaitWnd._mInstance = new LoadtoWaitWnd();
            return LoadtoWaitWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    LoadtoWaitWnd.prototype.show = function (isboom) {
        var _this = this;
        if (this.parent == undefined) {
            this.visible = false;
            GUIManager.getInstance.mostLay.addChild(this);
            egret.Tween.get(this).wait(500).call(function () {
                _this.visible = false;
            });
        }
    };
    LoadtoWaitWnd.prototype.hide = function () {
        this.visible = true;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return LoadtoWaitWnd;
}(egret.DisplayObjectContainer));
__reflect(LoadtoWaitWnd.prototype, "LoadtoWaitWnd");
//# sourceMappingURL=LoadtoWaitWnd.js.map