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
var DownWnd = (function (_super) {
    __extends(DownWnd, _super);
    function DownWnd() {
        var _this = _super.call(this) || this;
        // private _imgSrc = ["home_","expert_","mine_"];
        _this._imgSrc = ["home_", "match_", "expert_", "find_", "mine_"];
        /**初始下标 */
        _this._index = 0;
        _this.y = GameMain.getInstance.StageHeight - 100;
        _this._downImg = new GHashMap();
        var bj = new egret.Bitmap();
        _this.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
        }, _this);
        _this.addImg();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(DownWnd, "getInstance", {
        get: function () {
            if (DownWnd._mInstance == undefined)
                DownWnd._mInstance = new DownWnd();
            return DownWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    DownWnd.prototype.addImg = function () {
        var _this = this;
        var _loop_1 = function (i) {
            var obj = new DownImg(this_1._imgSrc[i], i);
            this_1.addChild(obj);
            obj.x = i * 150;
            // obj.x = i*250;
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                if (_this._index == obj.id)
                    return;
                // if(obj.id == 2){
                //     Alertpaner.getInstance.show("该用户等级不足");
                //     return;
                // }
                _this._index = obj.id;
                _this.changeSelect();
            }, this_1);
            this_1._downImg.Gput(i, obj);
        };
        var this_1 = this;
        for (var i = 0; i < this._imgSrc.length; i++) {
            _loop_1(i);
        }
        this.changeSelect();
    };
    DownWnd.prototype.changeSelect = function () {
        for (var _i = 0, _a = this._downImg.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (key == this._index) {
                this._downImg.Gget(key).selectImg();
            }
            else {
                this._downImg.Gget(key).noselectImg();
            }
        }
        if (this._index == 0) {
            WorldWnd.getInstance.show();
            DmWnd_2.getInstance.hide();
            MyViewWnd.getInstance.hide();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        }
        else if (this._index == 1) {
            BakorfallViewMrg.getInstance.show();
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.hide();
            FindWnd.getInstance.hide();
            MyViewWnd.getInstance.hide();
        }
        else if (this._index == 2) {
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.show();
            MyViewWnd.getInstance.hide();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        }
        else if (this._index == 3) {
            FindWnd.getInstance.show();
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.hide();
            MyViewWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        }
        else if (this._index = 4) {
            WorldWnd.getInstance.hide();
            DmWnd.getInstance.hide();
            MyViewWnd.getInstance.show();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        }
    };
    /**跳转跟单 */
    DownWnd.prototype.toGD = function () {
        this._index = 2;
        this.changeSelect();
    };
    /**适配处理 */
    DownWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    DownWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
    };
    DownWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return DownWnd;
}(egret.DisplayObjectContainer));
__reflect(DownWnd.prototype, "DownWnd");
var DownImg = (function (_super) {
    __extends(DownImg, _super);
    function DownImg(src, id) {
        var _this = _super.call(this) || this;
        _this._src = "";
        _this.id = id;
        _this._src = src;
        var zz = new egret.Shape();
        _this.addChild(zz);
        zz.graphics.beginFill(0xffffff);
        zz.graphics.drawRect(0, 0, 150, 100);
        zz.graphics.endFill();
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        RES.getResByUrl("resource/assets/images/ui/" + src + "nor_tabbar@2x.png", function (e) {
            _this._img.$setBitmapData(e);
            _this._img.x = (150 - _this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            _this._img.y = 100 - 7 - _this._img.height;
        }, _this);
        return _this;
    }
    DownImg.prototype.selectImg = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/" + this._src + "tabbar@2x.png", function (e) {
            _this._img.$setBitmapData(e);
            _this._img.x = (150 - _this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            _this._img.y = 100 - 7 - _this._img.height;
        }, this);
    };
    DownImg.prototype.noselectImg = function () {
        var _this = this;
        RES.getResByUrl("resource/assets/images/ui/" + this._src + "nor_tabbar@2x.png", function (e) {
            _this._img.$setBitmapData(e);
            _this._img.x = (150 - _this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            _this._img.y = 100 - 7 - _this._img.height;
        }, this);
    };
    return DownImg;
}(egret.DisplayObjectContainer));
__reflect(DownImg.prototype, "DownImg");
//# sourceMappingURL=DownWnd.js.map