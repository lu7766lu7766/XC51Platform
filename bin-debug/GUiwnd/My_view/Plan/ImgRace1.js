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
var ImgRace1 = (function (_super) {
    __extends(ImgRace1, _super);
    function ImgRace1() {
        var _this = _super.call(this) || this;
        /**经过move方法时false */
        _this._isClick = true;
        _this._index = 0;
        _this.imgSrc = ["page4", "page1", "page2", "page3"];
        /**是否在移动过程中 */
        _this._isMove = false;
        /**手指是否点在 */
        _this._isTouch = false;
        _this.beginIndex = 0;
        _this._centerNumX = 0;
        RES.getResByUrl("resource/assets/images/ui/point_g.png", function (e) { }, _this);
        _this.touchEnabled = true;
        _this._imgItem = new GHashMap();
        _this._spotItem = new GHashMap();
        _this.initialize();
        _this.setDB();
        _this._mShareC.touchEnabled = true;
        _this._mShareC.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this._begin, _this);
        _this._mShareC.addEventListener(egret.TouchEvent.TOUCH_END, _this._end, _this);
        _this._mShareC.addEventListener(egret.TouchEvent.TOUCH_MOVE, _this._move, _this);
        var shareC = new egret.Shape();
        shareC.graphics.beginFill(0xffffff, 1);
        shareC.graphics.drawRect(0, GameMain.getInstance.StageHeight - 141, GameMain.getInstance.StageWidth, 141);
        shareC.graphics.endFill();
        _this.addChildAt(shareC, 2);
        if (_this.bnt == undefined) {
            _this.bnt = new egret.Bitmap();
            _this.bnt.x = 211;
            _this.bnt.y = GameMain.getInstance.StageHeight - 106;
            RES.getResByUrl("resource/assets/images/ui/btn_join.png", function (e) { _this.bnt.$setBitmapData(e); }, _this);
        }
        _this.bnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onclick, _this);
        _this.bnt.touchEnabled = true;
        _this.addChild(_this.bnt);
        _this._mBGMove = new egret.Bitmap();
        _this._mBGMove.y = -136;
        RES.getResByUrl('resource/assets/images/ui/join_bg.jpg', function (e) { _this._mBGMove.$setBitmapData(e); }, _this);
        _this.addChildAt(_this._mBGMove, 1);
        return _this;
        // this.freshUpdate();
    }
    Object.defineProperty(ImgRace1, "getInstance", {
        get: function () {
            if (ImgRace1._mInstance == undefined)
                ImgRace1._mInstance = new ImgRace1();
            return ImgRace1._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**适配处理 */
    ImgRace1.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    ImgRace1.prototype.onclick = function () {
        KeFuWnd.getInstance.show(true);
    };
    // private _keepTime = 0;
    // /**更新   无限循环，一直执行，相当于17毫秒执行一次*/
    // private freshUpdate(): void {
    // 	GTimerMag.getInstance.addTimerTask("recommendleftSlip", 99999999, 1000, () => {
    //         if(egret.getTimer()-this._keepTime>2500 && this._isTouch==false)
    // 		    this.leftSlip();
    //             // this.rightSlip();
    // 	}, this);
    // }
    ImgRace1.prototype._move = function (e) {
        this._isClick = false;
    };
    ImgRace1.prototype._begin = function (e) {
        this.beginIndex = e.localX;
        if (!this._isMove)
            this._isTouch = true;
    };
    ImgRace1.prototype._end = function (e) {
        if (!this._isMove) {
            if (this.beginIndex - e.localX > 100) {
                this.leftSlip();
            }
            else if (this.beginIndex - e.localX < -100) {
                this.rightSlip();
            }
            if (this.beginIndex - e.localX < 100 && this.beginIndex - e.localX > -100) {
                // this._keepTime = egret.getTimer();
                this._isTouch = false;
            }
        }
        // this._shape.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);
        this.beginIndex = 0;
    };
    /**初始化 */
    ImgRace1.prototype.initialize = function () {
        var _loop_1 = function (i) {
            var obj;
            if (this_1._imgItem.GhasKey(i)) {
                obj = this_1._imgItem.Gget(i);
            }
            else {
                obj = new imgInfo();
                this_1._imgItem.Gput(i, obj);
            }
            obj.touchEnabled = false;
            LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this_1.imgSrc[i] + ".png", function (e) {
                obj.img.$setBitmapData(e);
            }, this_1);
            obj.x = -750 + 750 * i;
            obj.y = -136;
            if (obj.parent == undefined)
                this_1.addChild(obj);
        };
        var this_1 = this;
        //刷新图片
        for (var i = 0; i < this.imgSrc.length; i++) {
            _loop_1(i);
        }
        this._centerNumX = (GameMain.getInstance.StageWidth - this.imgSrc.length * 20) * 0.5;
        this._index = 0;
        var _loop_2 = function (i) {
            var img;
            if (this_2._spotItem.GhasKey(i)) {
                img = this_2._spotItem.Gget(i);
            }
            else {
                img = new egret.Bitmap();
                this_2._spotItem.Gput(i, img);
            }
            RES.getResByUrl("resource/assets/images/ui/point_g.png", function (e) {
                img.$setBitmapData(e);
            }, this_2);
            img.x = this_2._centerNumX + 60 * i - 60;
            img.y = GameMain.getInstance.StageHeight - 404 + 200;
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
    ImgRace1.prototype.changeSpot = function () {
        var item = this._spotItem;
        var isBig = false;
        var index = 0;
        var _loop_3 = function (key) {
            if (isBig) {
                item.Gget(key).x = this_3._centerNumX + index * 60 - 60;
            }
            else {
                item.Gget(key).x = this_3._centerNumX + index * 60 - 60;
            }
            if (key == this_3._index) {
                isBig = true;
                RES.getResByUrl("resource/assets/images/ui/point_r.png", function (e) {
                    item.Gget(key).$setBitmapData(e);
                }, this_3);
            }
            else {
                RES.getResByUrl("resource/assets/images/ui/point_g.png", function (e) {
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
    ImgRace1.prototype.leftSlip = function () {
        var _this = this;
        this._isMove = true;
        var _loop_4 = function (key) {
            var obj = this_4._imgItem.Gget(key);
            egret.Tween.get(obj).to({ x: obj.x - 750 }, 400).call(function (e) {
                if (obj.x < -760) {
                    obj.x = 750 * (_this.imgSrc.length - 2);
                }
                // this._keepTime = egret.getTimer();
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
    ImgRace1.prototype.rightSlip = function () {
        var _this = this;
        this._isMove = true;
        var _loop_5 = function (key) {
            var obj = this_5._imgItem.Gget(key);
            egret.Tween.get(obj).to({ x: obj.x + 750 }, 400).call(function () {
                if (obj.x > 750 * (_this.imgSrc.length - 2)) {
                    obj.x = -750;
                }
                // this._keepTime = egret.getTimer();
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
    ImgRace1.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.topLay.addChild(this);
        }
    };
    //隐藏
    ImgRace1.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return ImgRace1;
}(egret.DisplayObjectContainer));
__reflect(ImgRace1.prototype, "ImgRace1");
//# sourceMappingURL=ImgRace1.js.map