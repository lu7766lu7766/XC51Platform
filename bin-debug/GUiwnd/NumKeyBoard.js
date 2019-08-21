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
/**传入数据对象（键盘） */
var NumKeyData = (function () {
    function NumKeyData() {
    }
    return NumKeyData;
}());
__reflect(NumKeyData.prototype, "NumKeyData");
/**数字键盘 */
var NumKeyBoard = (function (_super) {
    __extends(NumKeyBoard, _super);
    function NumKeyBoard() {
        var _this = _super.call(this) || this;
        _this._str = "1";
        _this.topStr = [5, 10, 50, 100, 200];
        _this.numStr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
        _this.touchEnabled = true;
        _this._topItem = new GHashMap();
        _this._numItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.touchEnabled = true;
        _this.init();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(NumKeyBoard, "getInstance", {
        get: function () {
            if (NumKeyBoard._mInstance == undefined)
                NumKeyBoard._mInstance = new NumKeyBoard();
            return NumKeyBoard._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    NumKeyBoard.prototype.setTop = function (num) {
        this._str = num + "";
        this.changeCss();
    };
    //保存按钮
    NumKeyBoard.prototype.setBtn = function (num) {
        if (this._str.length > 5) {
            this._str = "999999";
        }
        else {
            if (this._str.length == 0) {
                if (num == 0)
                    this._str = "1";
                else
                    this._str = "" + num;
            }
            else {
                this._str = this._str + num.toString();
            }
        }
        this.changeCss();
    };
    NumKeyBoard.prototype.changeCss = function () {
        this._strText.text = "\u6295" + this._str + "\u500D";
    };
    /**NumKeyData */
    NumKeyBoard.prototype.show = function (mData) {
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
            this.y = this._mContain.height;
            egret.Tween.get(this).to({ "y": 0 }, 300, egret.Ease.circOut);
        }
        this._mData = mData;
        this._str = this._mData.str;
        this.changeCss();
        this.addEvent();
    };
    NumKeyBoard.prototype.hide = function () {
        if (this.parent != undefined) {
            egret.Tween.get(this).to({ "y": this._mContain.height }, 300, egret.Ease.circInOut).call(function () {
                this.parent.removeChild(this);
            });
            this.removeEvent();
        }
    };
    NumKeyBoard.prototype.touchDown = function (e) {
        if (e.target == this._return || e.target == this._mShareC) {
            this.hide();
        }
        else if (e.target == this._delete) {
            if (this._str.length > 0) {
                this._str = this._str.substring(0, this._str.length - 1);
                this.changeCss();
            }
        }
        else if (e.target == this._goBtn) {
            var str = this._str;
            if (str == "0" || str == "")
                str = "1";
            this._mData.strText.text = str;
            this._mData.backFun.call(this._mData.thisObj);
            this.hide();
        }
    };
    NumKeyBoard.prototype.addEvent = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._delete.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._topItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topItem.Gget(key).addEvent();
        }
        for (var _b = 0, _c = this._numItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._numItem.Gget(key).addEvent();
        }
    };
    NumKeyBoard.prototype.removeEvent = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._delete.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._topItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._topItem.Gget(key).removeEvent();
        }
        for (var _b = 0, _c = this._numItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._numItem.Gget(key).removeEvent();
        }
    };
    NumKeyBoard.prototype.init = function () {
        var _this = this;
        this._bj = new egret.Bitmap();
        this._mContain.addChild(this._bj);
        this._bj.width = GameMain.getInstance.StageWidth;
        this._bj.height = 580;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { _this._bj.$setBitmapData(e); }, this);
        var link = new egret.Shape();
        this._mContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 2);
        link.graphics.endFill();
        this._strText = ToolMrg.getText(306 + 122, 24, 32, 0x333333, 300);
        this._mContain.addChild(this._strText);
        this._strText.textAlign = egret.HorizontalAlign.RIGHT;
        this._strText.text = "投1倍";
        this._return = new egret.Bitmap();
        this._mContain.addChild(this._return);
        this._return.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { _this._return.$setBitmapData(e); }, this);
        this._return.width = 100;
        this._return.height = 80;
        var _return = new egret.Bitmap();
        this._mContain.addChild(_return);
        _return.x = 24;
        _return.y = 28;
        RES.getResByUrl("resource/assets/images/ui/xiala1_home@2x.png", function (e) { _return.$setBitmapData(e); }, this);
        var toplink = new egret.Shape();
        this._mContain.addChild(toplink);
        toplink.graphics.beginFill(0xdedede);
        toplink.graphics.drawRect(0, 79, GameMain.getInstance.StageWidth, 2);
        toplink.graphics.endFill();
        var objTop;
        for (var i = 0; i < this.topStr.length; i++) {
            objTop = new NumKeyBoardTopInfo(this.topStr[i]);
            this._mContain.addChild(objTop);
            this._topItem.Gput(i, objTop);
            objTop.y = 100;
            objTop.x = 24 + 144 * i;
        }
        var objBtnWidth = GameMain.getInstance.StageWidth / 3;
        var objBtn;
        var objwidth = 0;
        var objheight = 180;
        for (var i = 0; i < this.numStr.length; i++) {
            objBtn = new NumKeyBoardBtnInfo(this.numStr[i], objBtnWidth);
            this._mContain.addChild(objBtn);
            this._numItem.Gput(i, objBtn);
            if (this.numStr[i] == 0) {
                objBtn.x = objBtnWidth;
                objBtn.y = 180 + 300;
            }
            else {
                objBtn.x = objwidth;
                objBtn.y = objheight;
                if (this.numStr[i] % 3 == 0) {
                    objheight = objheight + 100;
                    objwidth = 0;
                }
                else {
                    objwidth = objBtn.width + objwidth;
                }
            }
        }
        this._delete = new egret.Shape();
        this._mContain.addChild(this._delete);
        this._delete.graphics.beginFill(0xffffff);
        this._delete.graphics.drawRect(0, 180 + 300, objBtnWidth, 100);
        this._delete.graphics.endFill();
        this._delete.touchEnabled = true;
        var deleteBtn = new egret.Bitmap();
        this._mContain.addChild(deleteBtn);
        RES.getResByUrl("resource/assets/images/ui/sjyw_home@2x.png", function (e) {
            deleteBtn.$setBitmapData(e);
            deleteBtn.x = (objBtnWidth - deleteBtn.width) * 0.5;
            deleteBtn.y = 480 + (100 - deleteBtn.height) * 0.5;
        }, this);
        this._goBtn = ToolMrg.getText(2 * objBtnWidth, 480, 36, 0x333333, objBtnWidth);
        this._mContain.addChild(this._goBtn);
        this._goBtn.height = 100;
        this._goBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._goBtn.textAlign = egret.HorizontalAlign.CENTER;
        this._goBtn.touchEnabled = true;
        // this._goBtn.bold = true;
        this._goBtn.text = "确定";
        //补线
        var downLink1 = new egret.Shape();
        this._mContain.addChild(downLink1);
        downLink1.graphics.beginFill(0xdedede);
        downLink1.graphics.drawRect(0, 179, GameMain.getInstance.StageWidth, 2);
        downLink1.graphics.endFill();
        var downLink2 = new egret.Shape();
        this._mContain.addChild(downLink2);
        downLink2.graphics.beginFill(0xdedede);
        downLink2.graphics.drawRect(0, 179 + 100, GameMain.getInstance.StageWidth, 2);
        downLink2.graphics.endFill();
        var downLink3 = new egret.Shape();
        this._mContain.addChild(downLink3);
        downLink3.graphics.beginFill(0xdedede);
        downLink3.graphics.drawRect(0, 179 + 200, GameMain.getInstance.StageWidth, 2);
        downLink3.graphics.endFill();
        var downLink4 = new egret.Shape();
        this._mContain.addChild(downLink4);
        downLink4.graphics.beginFill(0xdedede);
        downLink4.graphics.drawRect(0, 179 + 300, GameMain.getInstance.StageWidth, 2);
        downLink4.graphics.endFill();
        var downLink5 = new egret.Shape();
        this._mContain.addChild(downLink5);
        downLink5.graphics.beginFill(0xdedede);
        downLink5.graphics.drawRect(GameMain.getInstance.StageWidth / 3 - 1, 180, 2, 402);
        downLink5.graphics.endFill();
        var downLink6 = new egret.Shape();
        this._mContain.addChild(downLink6);
        downLink6.graphics.beginFill(0xdedede);
        downLink6.graphics.drawRect(GameMain.getInstance.StageWidth / 3 * 2 - 1, 180, 2, 402);
        downLink6.graphics.endFill();
        this._mContain.y = GameMain.getInstance.StageHeight - this._mContain.height;
    };
    /**适配处理 */
    NumKeyBoard.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 0.01);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return NumKeyBoard;
}(egret.DisplayObjectContainer));
__reflect(NumKeyBoard.prototype, "NumKeyBoard");
/**头部info按钮模块 */
var NumKeyBoardTopInfo = (function (_super) {
    __extends(NumKeyBoardTopInfo, _super);
    function NumKeyBoardTopInfo(num) {
        var _this = _super.call(this) || this;
        _this._num = num;
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0xdedede);
        _this._shape.graphics.drawRect(0, 0, 128, 64);
        _this._shape.graphics.endFill();
        _this._shapeText = ToolMrg.getText(0, 0, 32, 0x333333, 128);
        _this.addChild(_this._shapeText);
        _this._shapeText.height = 64;
        _this._shapeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._shapeText.textAlign = egret.HorizontalAlign.CENTER;
        _this._shapeText.text = num + "\u500D";
        _this._shapeText.touchEnabled = true;
        return _this;
    }
    NumKeyBoardTopInfo.prototype.touchDown = function (e) {
        NumKeyBoard.getInstance.setTop(this._num);
    };
    NumKeyBoardTopInfo.prototype.addEvent = function () {
        this._shapeText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    NumKeyBoardTopInfo.prototype.removeEvent = function () {
        this._shapeText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return NumKeyBoardTopInfo;
}(egret.DisplayObjectContainer));
__reflect(NumKeyBoardTopInfo.prototype, "NumKeyBoardTopInfo");
/** 0~9按钮 */
var NumKeyBoardBtnInfo = (function (_super) {
    __extends(NumKeyBoardBtnInfo, _super);
    function NumKeyBoardBtnInfo(num, width) {
        var _this = _super.call(this) || this;
        _this._num = num;
        _this._width = width;
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0xffffff);
        _this._shape.graphics.drawRect(0, 0, width, 100);
        _this._shape.graphics.endFill();
        _this._numText = ToolMrg.getText(0, 0, 48, 0x333333, width);
        _this.addChild(_this._numText);
        _this._numText.height = 100;
        _this._numText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._numText.textAlign = egret.HorizontalAlign.CENTER;
        _this._numText.text = "" + num;
        _this._numText.touchEnabled = true;
        return _this;
    }
    NumKeyBoardBtnInfo.prototype.begin = function () {
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xf5f5f2);
        this._shape.graphics.drawRect(0, 0, this._width, 100);
        this._shape.graphics.endFill();
    };
    NumKeyBoardBtnInfo.prototype.touchDown = function () {
        NumKeyBoard.getInstance.setBtn(this._num);
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0, 0, this._width, 100);
        this._shape.graphics.endFill();
    };
    NumKeyBoardBtnInfo.prototype.addEvent = function () {
        this._numText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._numText.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
    };
    NumKeyBoardBtnInfo.prototype.removeEvent = function () {
        this._numText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._numText.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.begin, this);
    };
    return NumKeyBoardBtnInfo;
}(egret.DisplayObjectContainer));
__reflect(NumKeyBoardBtnInfo.prototype, "NumKeyBoardBtnInfo");
//# sourceMappingURL=NumKeyBoard.js.map