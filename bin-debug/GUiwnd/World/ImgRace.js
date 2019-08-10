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
var ImgRace = (function (_super) {
    __extends(ImgRace, _super);
    function ImgRace() {
        var _this = _super.call(this) || this;
        /**经过move方法时false */
        _this._isClick = true;
        _this._index = 0;
        _this.imgSrc = ["xyh750", "dnn750", "vip750", "jiaj750px"];
        _this._keepTime = 0;
        /**是否在移动过程中 */
        _this._isMove = false;
        /**手指是否点在 */
        _this._isTouch = false;
        _this.beginIndex = 0;
        _this._centerNumX = 0;
        RES.getResByUrl("resource/assets/images/ui/bdxz1_home@2x.png", function (e) { }, _this);
        _this.touchEnabled = true;
        _this._imgItem = new GHashMap();
        _this._spotItem = new GHashMap();
        _this.initialize();
        _this._shape = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/banner_home.png"));
        _this._shape.width = 750;
        _this._shape.height = 300;
        // this._shape.graphics.beginFill(0x444444);
        // this._shape.graphics.drawRect(0,0,750,376);
        _this.addChild(_this._shape);
        _this._shape.touchEnabled = true;
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._begin, _this);
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_TAP, _this._touchDown, _this);
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_END, _this._end, _this);
        _this._shape.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this._move, _this);
        _this.freshUpdate();
        return _this;
    }
    Object.defineProperty(ImgRace, "getInstance", {
        get: function () {
            if (ImgRace._mInstance == undefined)
                ImgRace._mInstance = new ImgRace();
            return ImgRace._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**更新   无限循环，一直执行，相当于17毫秒执行一次*/
    ImgRace.prototype.freshUpdate = function () {
        var _this = this;
        GTimerMag.getInstance.addTimerTask("recommendleftSlip", 99999999, 1000, function () {
            if (egret.getTimer() - _this._keepTime > 2500 && _this._isTouch == false)
                _this.leftSlip();
            // this.rightSlip();
        }, this);
    };
    ImgRace.prototype._move = function (e) {
        this._isClick = false;
    };
    ImgRace.prototype._begin = function (e) {
        this.beginIndex = e.localX;
        if (!this._isMove)
            this._isTouch = true;
    };
    ImgRace.prototype._end = function (e) {
        if (!this._isMove) {
            if (this.beginIndex - e.localX > 100) {
                this.leftSlip();
            }
            else if (this.beginIndex - e.localX < -100) {
                this.rightSlip();
            }
            if (this.beginIndex - e.localX < 100 && this.beginIndex - e.localX > -100) {
                this._keepTime = egret.getTimer();
                this._isTouch = false;
            }
        }
        // this._shape.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);
        this.beginIndex = 0;
    };
    ImgRace.prototype._touchDown = function () {
        if (this._isClick) {
            WorldWnd.getInstance.hide();
            WorldWnd._worldState = 1;
            if (this._index == 0) {
                ID5.getInstance.show();
            }
            else if (this._index == 1) {
                ID4.getInstance.show();
            }
            else if (this._index == 2) {
                ID6.getInstance.show();
            }
            else if (this._index == 3) {
                ID1.getInstance.show();
            }
        }
        this._isClick = true;
    };
    /**初始化 */
    ImgRace.prototype.initialize = function () {
        var _loop_1 = function (i) {
            var obj;
            if (this_1._imgItem.GhasKey(i)) {
                obj = this_1._imgItem.Gget(i);
            }
            else {
                obj = new imgInfo();
                this_1._imgItem.Gput(i, obj);
            }
            LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this_1.imgSrc[i] + ".png", function (e) {
                obj.img.$setBitmapData(e);
                obj.img.width = 750;
                obj.img.height = 300;
            }, this_1);
            obj.x = -750 + 750 * i;
            if (obj.parent == undefined)
                this_1.addChild(obj);
        };
        var this_1 = this;
        //刷新图片
        for (var i = 0; i < this.imgSrc.length; i++) {
            _loop_1(i);
        }
        this._centerNumX = (GameMain.getInstance.StageWidth - this.imgSrc.length * 20) * 0.5;
        this._index = 1;
        var _loop_2 = function (i) {
            var img;
            if (this_2._spotItem.GhasKey(i)) {
                img = this_2._spotItem.Gget(i);
            }
            else {
                img = new egret.Bitmap();
                this_2._spotItem.Gput(i, img);
            }
            RES.getResByUrl("resource/assets/images/ui/bdxz2_home@2x.png", function (e) {
                img.$setBitmapData(e);
            }, this_2);
            img.y = 274;
            img.x = this_2._centerNumX + 20 * i;
            if (img.parent == undefined)
                this_2.addChild(img);
        };
        var this_2 = this;
        //刷新index下标图片
        for (var i = 0; i < this.imgSrc.length; i++) {
            _loop_2(i);
        }
        this.changeSpot();
    };
    /**点根据index变化 */
    ImgRace.prototype.changeSpot = function () {
        var item = this._spotItem;
        var isBig = false;
        var index = 0;
        var _loop_3 = function (key) {
            if (isBig) {
                item.Gget(key).x = this_3._centerNumX + index * 20;
            }
            else {
                item.Gget(key).x = this_3._centerNumX + index * 20;
            }
            if (key == this_3._index) {
                isBig = true;
                RES.getResByUrl("resource/assets/images/ui/bdxz1_home@2x.png", function (e) {
                    item.Gget(key).$setBitmapData(e);
                }, this_3);
            }
            else {
                RES.getResByUrl("resource/assets/images/ui/bdxz2_home@2x.png", function (e) {
                    item.Gget(key).$setBitmapData(e);
                }, this_3);
            }
            index += 1;
        };
        var this_3 = this;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_3(key);
        }
    };
    /**左滑  ++ */
    ImgRace.prototype.leftSlip = function () {
        var _this = this;
        this._isMove = true;
        var _loop_4 = function (key) {
            var obj = this_4._imgItem.Gget(key);
            egret.Tween.get(obj).to({ x: obj.x - 750 }, 400).call(function (e) {
                if (obj.x < -760) {
                    obj.x = 750 * (_this.imgSrc.length - 2);
                }
                _this._keepTime = egret.getTimer();
                _this._isTouch = false;
                _this._isMove = false;
            });
        };
        var this_4 = this;
        for (var _i = 0, _a = this._imgItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_4(key);
        }
        if (this._index == this._imgItem.size - 1) {
            this._index = 0;
        }
        else {
            this._index += 1;
        }
        this.changeSpot();
    };
    /**右滑  -- */
    ImgRace.prototype.rightSlip = function () {
        var _this = this;
        this._isMove = true;
        var _loop_5 = function (key) {
            var obj = this_5._imgItem.Gget(key);
            egret.Tween.get(obj).to({ x: obj.x + 750 }, 400).call(function () {
                if (obj.x > 750 * (_this.imgSrc.length - 2)) {
                    obj.x = -750;
                }
                _this._keepTime = egret.getTimer();
                _this._isTouch = false;
                _this._isMove = false;
            });
        };
        var this_5 = this;
        for (var _i = 0, _a = this._imgItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            _loop_5(key);
        }
        if (this._index == 0) {
            this._index = this._imgItem.size - 1;
        }
        else {
            this._index -= 1;
        }
        this.changeSpot();
    };
    return ImgRace;
}(egret.DisplayObjectContainer));
__reflect(ImgRace.prototype, "ImgRace");
var imgInfo = (function (_super) {
    __extends(imgInfo, _super);
    function imgInfo() {
        var _this = _super.call(this) || this;
        _this.img = new egret.Bitmap();
        _this.addChild(_this.img);
        return _this;
    }
    return imgInfo;
}(egret.DisplayObjectContainer));
__reflect(imgInfo.prototype, "imgInfo");
//# sourceMappingURL=ImgRace.js.map