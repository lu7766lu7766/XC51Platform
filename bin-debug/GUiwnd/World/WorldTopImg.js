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
var WorldTopImg = (function (_super) {
    __extends(WorldTopImg, _super);
    function WorldTopImg() {
        var _this = _super.call(this) || this;
        _this.imgItem = ["banner_home@2x", "banner_home@2x", "banner_home@2x", "banner_home@2x", "banner_home@2x", "banner_home@2x", "banner_home@2x", "banner_home@2x"];
        /**当前下标 */
        _this._index = 1;
        _this.isMove = false;
        _this.beginIndex = 0;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this.initializeImg();
        _this._shape.graphics.beginFill(0xffffff, 0.001);
        _this._shape.graphics.drawRect(46, 18, 660, 284);
        _this._shape.graphics.endFill();
        _this._shape.touchEnabled = true;
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._begin, _this);
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this._move, _this);
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_END, _this._end, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(WorldTopImg, "getInstance", {
        get: function () {
            if (WorldTopImg._mInstance == undefined)
                WorldTopImg._mInstance = new WorldTopImg();
            return WorldTopImg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    WorldTopImg.prototype._begin = function (e) {
        this.beginIndex = e.localX;
    };
    WorldTopImg.prototype._move = function (e) {
        // egret.log(`${this.beginIndex} : ${this.beginIndex - e.localX} : ${e.localX}`);
    };
    WorldTopImg.prototype._end = function (e) {
        if (!this.isMove) {
            if (this.beginIndex - e.localX > 100) {
                this.leftSlip();
            }
            else if (this.beginIndex - e.localX < -100) {
                this.rightSlip();
            }
        }
    };
    /**左滑  ++ */
    WorldTopImg.prototype.leftSlip = function () {
        if (this._index == this._item.size - 1)
            return;
        this.isMove = true;
        this._index += 1;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            if (key == this._index) {
                egret.Tween.get(obj).to({ x: 51, height: 280, width: 648, y: (320 - 280) * 0.5 }, 400);
            }
            else {
                egret.Tween.get(obj).to({ x: obj.x - 648 * 0.94 - 36, height: 280 * 0.94, width: 648 * 0.94, y: (320 - 280 * 0.94) * 0.5 }, 400);
            }
        }
        setTimeout(function () {
            WorldTopImg.getInstance.isMove = false;
        }, 420);
    };
    /**右滑  -- */
    WorldTopImg.prototype.rightSlip = function () {
        if (this._index == 0)
            return;
        this._index -= 1;
        this.isMove = true;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            if (key == this._index) {
                egret.Tween.get(obj).to({ x: 51, height: 280, width: 648, y: (320 - 280) * 0.5 }, 400);
            }
            else {
                if (Number(key) - 1 == this._index) {
                    egret.Tween.get(obj).to({ x: obj.x + 648 + 36, height: 280 * 0.94, width: 648 * 0.94, y: (320 - 280 * 0.94) * 0.5 }, 400);
                }
                else {
                    egret.Tween.get(obj).to({ x: obj.x + 648 * 0.94 + 36, height: 280 * 0.94, width: 648 * 0.94, y: (320 - 280 * 0.94) * 0.5 }, 400);
                }
            }
        }
        setTimeout(function () {
            WorldTopImg.getInstance.isMove = false;
        }, 420);
    };
    /**初始化图片 */
    WorldTopImg.prototype.initializeImg = function () {
        var objWidth = -648 * 0.94 + 14;
        var _loop_1 = function (i) {
            var obj = new egret.Bitmap();
            RES.getResByUrl("resource/assets/images/ui/" + this_1.imgItem[i] + ".png", function (e) {
                obj.$setBitmapData(e);
            }, this_1);
            this_1.addChild(obj);
            this_1._item.Gput(i, obj);
            if (this_1._index == i) {
                obj.width = 648;
                obj.height = 280;
            }
            else {
                obj.width = 648 * 0.94;
                obj.height = 280 * 0.94;
            }
            obj.y = (320 - obj.height) * 0.5;
            obj.x = objWidth;
            objWidth = objWidth + 36 + obj.width;
        };
        var this_1 = this;
        for (var i = 0; i < this.imgItem.length; i++) {
            _loop_1(i);
        }
    };
    /**适配处理 */
    WorldTopImg.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF3F3F3, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 320);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return WorldTopImg;
}(egret.DisplayObjectContainer));
__reflect(WorldTopImg.prototype, "WorldTopImg");
var TopImg = (function (_super) {
    __extends(TopImg, _super);
    function TopImg(imgsrc, id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        RES.getResByUrl("resource/assets/images/ui/" + imgsrc + ".png", function (e) {
            _this._img.$setBitmapData(e);
        }, _this);
        return _this;
    }
    TopImg.prototype.SmallImg = function () {
        this._img.width = 648 * 0.94;
        this._img.height = 280 * 0.94;
    };
    TopImg.prototype.BigImg = function () {
        this._img.width = 648;
        this._img.height = 280;
    };
    TopImg.prototype.getImgWidth = function () {
        return this._img.width;
    };
    TopImg.prototype.getImg = function () {
        return this._img;
    };
    return TopImg;
}(egret.DisplayObjectContainer));
__reflect(TopImg.prototype, "TopImg");
//# sourceMappingURL=WorldTopImg.js.map