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
var HorseObj = (function (_super) {
    __extends(HorseObj, _super);
    function HorseObj() {
        var _this = _super.call(this) || this;
        _this._mImg = new egret.Bitmap();
        _this.addChild(_this._mImg);
        _this._mText = ToolMrg.getText(0, 328, 34, 0xffffff, 630);
        _this._mText.text = "谁是你心中五大联赛的最佳11人？投票吧";
        _this.addChild(_this._mText);
        _this._mText.textAlign = egret.HorizontalAlign.CENTER;
        return _this;
    }
    Object.defineProperty(HorseObj, "getInstance", {
        get: function () {
            if (HorseObj._mInstance == undefined)
                HorseObj._mInstance = new HorseObj();
            return HorseObj._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    HorseObj.prototype.setText = function (str) {
        this._mText.text = ToolMrg.nameMode(20, str);
    };
    return HorseObj;
}(egret.DisplayObjectContainer));
__reflect(HorseObj.prototype, "HorseObj");
/**公告跑马灯 */
var HorseRace = (function (_super) {
    __extends(HorseRace, _super);
    function HorseRace() {
        var _this = _super.call(this) || this;
        /**跑马灯文字 */
        _this._mTextList = ["谁是你心中五大联赛的最佳11人？投票吧", "NBA：哈登疯狂个人表现秀？", "粤语西决G2勇士VS火箭队", "年轻国王换边再战亦难挡火箭", "【战报】欧文37+6+7塔图姆26分", "欧冠之王！C罗攻入欧冠125球"];
        /**跑马灯总张数 */
        _this._mBitList = ["banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png"];
        /**下标图片*/
        _this._mBitXBList = ["yd_down_home.png", "yd_nor_home.png"];
        /**跑马灯间隔时间3秒*/
        _this._mSpaceTime = 1500;
        _this._mSpaceTimeTemp = 1500;
        /**当前播放张数 */
        _this._mIndex = 1;
        /**首次进入 */
        _this.isFirst = true;
        /**进行点击 定时器不能滑动*/
        _this.isTouch = false;
        /**转折点位置 */
        _this.tranX = 0;
        /**上次位置 */
        _this.lastX = 0;
        /**1左滑 2右滑*/
        _this.direction = 1;
        _this._mPropagGroup = new egret.DisplayObjectContainer();
        _this._mSpotGroup = new egret.DisplayObjectContainer();
        _this.propagandaMap = new GHashMap();
        _this.spotMap = new GHashMap();
        _this.initMap();
        _this._mBGMove = new egret.Bitmap();
        LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + _this._mBitList[0], _this.loadImgBack1, _this);
        _this.addChild(_this._mBGMove);
        _this._mBGMove.alpha = 0.01;
        _this.freshUpdate();
        _this.addChild(_this._mPropagGroup);
        _this.addChild(_this._mSpotGroup);
        return _this;
        //----
        // this.isTouch = false;
        // this.changePage();
        // this.addMove();
        // this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
    }
    Object.defineProperty(HorseRace, "getInstance", {
        get: function () {
            if (HorseRace._mInstance == undefined)
                HorseRace._mInstance = new HorseRace();
            return HorseRace._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    HorseRace.prototype.loadImgBack1 = function (e, obj) {
        this._mBGMove.$setTexture(e);
        this._mBGMove.width = 750;
        this._mBGMove.height = 376;
    };
    /**更新   无限循环，一直执行，相当于17毫秒执行一次*/
    HorseRace.prototype.freshUpdate = function () {
        var _this = this;
        GTimerMag.getInstance.addTimerTask("freshUpdate", 99999999, 17, function () {
            _this.update(17);
        }, this);
    };
    /**添加滑动事件 */
    HorseRace.prototype.addMove = function () {
        this._mBGMove.touchEnabled = true;
        this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBEGIN, this);
        this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMOVE, this);
        this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
        this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_END, this.onFinish, this);
    };
    /**移除滑动事件 */
    HorseRace.prototype.removeMove = function () {
        this._mBGMove.touchEnabled = false;
        this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBEGIN, this);
        this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMOVE, this);
        this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
        this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_END, this.onFinish, this);
    };
    /**点击下时 */
    HorseRace.prototype.onBEGIN = function (event) {
        this.deviationX = event.stageX;
        this.tranX = 0;
        this.lastX = 0;
        this.isTouch = true;
    };
    /**滑动过程 */
    HorseRace.prototype.onMOVE = function (event) {
        var xx = (event.stageX - this.deviationX);
        xx = Math.floor(xx);
        if (this.lastX == xx) {
            return;
        }
        this.movePage(xx - this.lastX);
        this.lastX = xx;
    };
    /**移动偏移量 */
    HorseRace.prototype.movePage = function (xx) {
        if (this.parent == undefined || this._mBitList.length == 1) {
            return;
        }
        if (this.isFirst == true) {
            this.isFirst = false;
            return;
        }
        this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
        this.bitmapP1.x += xx;
        if (xx > 0) {
            this.direction = 2;
        }
        else if (xx < 0) {
            this.direction = 1;
        }
        this.bitmapP2 = this.nextMove();
        this.bitmapP2.x += xx;
    };
    /**获取当前显示对象 */
    HorseRace.prototype.nextMove = function () {
        var temp;
        if (this.direction == 2) {
            if (this.bitmapP1.x <= 0 && this.bitmapP2 != undefined && this.bitmapP2.parent != undefined) {
                temp = this.bitmapP2;
            }
            else {
                if (this._mIndex == 1) {
                    temp = this.propagandaMap.Gget(this._mBitList.length - 1);
                    if (this._mBitList.length == 2) {
                        if (temp.x >= GameMain.getInstance.StageWidth) {
                            this.removeLash(this._mIndex);
                        }
                    }
                    else {
                        this.removeLash(this._mIndex);
                    }
                }
                else {
                    temp = this.propagandaMap.Gget(this._mIndex - 2);
                    if (this._mIndex == this._mBitList.length) {
                        if (this._mBitList.length == 2) {
                            if (temp.x >= GameMain.getInstance.StageWidth) {
                                this.removeLash(0);
                            }
                        }
                        else {
                            this.removeLash(0);
                        }
                    }
                    else {
                        this.removeLash(this._mIndex);
                    }
                }
                if (temp.parent == undefined) {
                    temp.x = -GameMain.getInstance.StageWidth;
                    this._mPropagGroup.addChild(temp);
                }
            }
        }
        else if (this.direction == 1) {
            if (this.bitmapP1.x >= 0 && this.bitmapP2 != undefined && this.bitmapP2.parent != undefined) {
                temp = this.bitmapP2;
            }
            else {
                if (this._mIndex == this._mBitList.length) {
                    temp = this.propagandaMap.Gget(0);
                    if (this._mBitList.length == 2) {
                        if (temp.x <= 0) {
                            this.removeLash(this._mIndex - 2);
                        }
                    }
                    else {
                        this.removeLash(this._mIndex - 2);
                    }
                }
                else {
                    temp = this.propagandaMap.Gget(this._mIndex);
                    if (this._mIndex == 1) {
                        if (this._mBitList.length == 2) {
                            if (temp.x <= 0) {
                                this.removeLash(this._mBitList.length - 1);
                            }
                        }
                        else {
                            this.removeLash(this._mBitList.length - 1);
                        }
                    }
                    else {
                        this.removeLash(this._mIndex - 2);
                    }
                }
                if (temp.parent == undefined) {
                    temp.x = GameMain.getInstance.StageWidth;
                    this._mPropagGroup.addChild(temp);
                }
            }
        }
        return temp;
    };
    /**移除显示上次宣传对象图 */
    HorseRace.prototype.removeLash = function (num) {
        var tempRemove;
        if (this.propagandaMap.GhasKey(num)) {
            tempRemove = this.propagandaMap.Gget(num);
            if (tempRemove.parent != undefined) {
                tempRemove.parent.removeChild(tempRemove);
            }
        }
    };
    /**滑动结束 */
    HorseRace.prototype.onFinish = function (event) {
        if (this.parent == undefined || this._mBitList.length == 1 ||
            this.bitmapP1 == undefined || this.bitmapP2 == undefined) {
            return;
        }
        if (this.direction == 1) {
            egret.Tween.get(this.bitmapP1).to({ x: -GameMain.getInstance.StageWidth }, 200).call(this.changeIndex, this);
            egret.Tween.get(this.bitmapP2).to({ x: 0 }, 200);
        }
        else if (this.direction == 2) {
            egret.Tween.get(this.bitmapP1).to({ x: GameMain.getInstance.StageWidth }, 200);
            egret.Tween.get(this.bitmapP2).to({ x: 0 }, 200).call(this.changeIndex, this);
        }
        this.isTouch = false;
        this._mSpaceTimeTemp = this._mSpaceTime;
    };
    /**滑动结束后进行换页 */
    HorseRace.prototype.changeIndex = function () {
        if (this.direction == 1) {
            if (this._mIndex >= this._mBitList.length) {
                this._mIndex = 1;
            }
            else {
                this._mIndex++;
            }
        }
        else if (this.direction == 2) {
            if (this._mIndex <= 1) {
                this._mIndex = this._mBitList.length;
            }
            else {
                this._mIndex--;
            }
        }
        if (this.bitmapP1.parent != undefined) {
            this.bitmapP1.parent.removeChild(this.bitmapP1);
        }
        this.bitmapP1 = this.bitmapP2;
        this.bitmapP2 = undefined;
        this.changePage();
    };
    /**初始化列表 */
    HorseRace.prototype.initMap = function () {
        var _loop_1 = function (i) {
            // this.bitmapP = new egret.Bitmap();
            this_1.bitmapP = new HorseObj();
            this_1.bitmapP.x = 0;
            var thisObj = this_1;
            var bitmapP = this_1.bitmapP;
            if (thisObj._mIndex == i + 1) {
                thisObj._mPropagGroup.addChild(bitmapP);
            }
            thisObj.propagandaMap.Gput(i, this_1.bitmapP);
            LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this_1._mBitList[i], function (e) {
                bitmapP._mImg.$setTexture(e);
                bitmapP._mImg.width = 750;
                bitmapP._mImg.height = 376;
            }, this_1);
            /**文字 */
            bitmapP.setText(this_1._mTextList[i]);
            this_1.bitmapS = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/' + this_1._mBitXBList[0]));
            this_1.bitmapS.x = i * 20 + 300;
            this_1.bitmapS.y = 350;
            this_1._mSpotGroup.addChild(this_1.bitmapS);
            this_1.spotMap.Gput(i, this_1.bitmapS);
        };
        var this_1 = this;
        for (var i = 0; i < this._mBitList.length; i++) {
            _loop_1(i);
        }
        this._mSpotGroup.x = (GameMain.getInstance.StageWidth - this._mSpotGroup.width) * 0.5;
    };
    HorseRace.prototype.qd = function (data, url) {
        if (data != undefined) {
            this.bitmapS.$setBitmapData(data);
        }
    };
    HorseRace.prototype.show = function (parent, x, y) {
        this.y = 125;
        if (x != undefined)
            this.x = x;
        if (y != undefined)
            this.y = y;
        if (this.parent != parent) {
            parent.addChild(this);
        }
        // parent.addChildAt(this);
        this.isTouch = false;
        this.changePage();
        this.addMove();
        this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
    };
    HorseRace.prototype.update = function (it) {
        if (this.isTouch == false) {
            this._mSpaceTimeTemp -= it;
            if (this._mSpaceTimeTemp <= 0) {
                this._mSpaceTimeTemp = this._mSpaceTime;
                this.timeMoveBegin();
            }
        }
    };
    /**进行滑动 */
    HorseRace.prototype.timeMoveBegin = function () {
        if (this.isTouch == true) {
            return;
        }
        this.direction = 1;
        this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
        if (this._mIndex == this._mBitList.length) {
            this.bitmapP2 = this.propagandaMap.Gget(0);
        }
        else {
            this.bitmapP2 = this.propagandaMap.Gget(this._mIndex);
        }
        if (this.bitmapP2.parent == undefined) {
            this.bitmapP2.x = GameMain.getInstance.StageWidth;
            this._mPropagGroup.addChild(this.bitmapP2);
        }
        if (this.direction == 1) {
            egret.Tween.get(this.bitmapP1).to({ x: -GameMain.getInstance.StageWidth }, 500).call(this.changeIndex, this);
            egret.Tween.get(this.bitmapP2).to({ x: 0 }, 500);
        }
        else if (this.direction == 2) {
            egret.Tween.get(this.bitmapP1).to({ x: GameMain.getInstance.StageWidth }, 500);
            egret.Tween.get(this.bitmapP2).to({ x: 0 }, 500).call(this.changeIndex, this);
        }
        this.changePage();
    };
    /**页码切换 */
    HorseRace.prototype.changePage = function () {
        var bitmapS;
        for (var i = 0; i < this._mBitList.length; i++) {
            if (this.spotMap.GhasKey(i)) {
                bitmapS = this.spotMap.Gget(i);
                if (i == this._mIndex - 1) {
                    bitmapS.$setBitmapData(GResCache.getRes('resource/assets/images/ui/' + this._mBitXBList[0]));
                }
                else {
                    bitmapS.$setBitmapData(GResCache.getRes('resource/assets/images/ui/' + this._mBitXBList[1]));
                }
            }
        }
    };
    /**点击图片进入游戏 */
    HorseRace.prototype.enterGame = function () {
        if (this.bitmapP1 != undefined) {
            if (this.bitmapP1.x != 0) {
                return;
            }
            if (this._mIndex == 1) {
            }
            else if (this._mIndex == 2) {
                this.isTouch = false;
            }
            else if (this._mIndex == 3) {
                this.isTouch = false;
            }
        }
    };
    //隐藏
    HorseRace.prototype.hide = function () {
        this.removeMove();
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    return HorseRace;
}(egret.DisplayObjectContainer));
__reflect(HorseRace.prototype, "HorseRace");
//# sourceMappingURL=HorseRace.js.map