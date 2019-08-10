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
/**足球或篮球比分详情界面 */
var BakorfallViewMrg = (function (_super) {
    __extends(BakorfallViewMrg, _super);
    function BakorfallViewMrg() {
        var _this = _super.call(this) || this;
        _this.iffirst = true;
        _this._topStr = ["赛果", "即时", "关注", "赛程"];
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.visible = false;
        _this._topUI.getreturnSprite().visible = false;
        _this._return.visible = false;
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._topContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._topContain);
        _this.setDB();
        _this.touchEnabled = true;
        _this.addTop();
        _this.TopBntsecet();
        _this.xianshi();
        return _this;
    }
    Object.defineProperty(BakorfallViewMrg, "getInstance", {
        get: function () {
            if (BakorfallViewMrg._mInstance == undefined)
                BakorfallViewMrg._mInstance = new BakorfallViewMrg();
            return BakorfallViewMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    ; //页面下标
    BakorfallViewMrg.prototype.gettopList = function () {
        return this._topInfo;
    };
    /**头顶筛选按钮*/
    BakorfallViewMrg.prototype.TopBntsecet = function () {
        this._topInfo = new GHashMap();
        for (var i = 0; i < this._topStr.length; i++) {
            var obj = new TopInfo(this._topStr[i]);
            this._topInfo.Gput(i + 1, obj);
            obj.x = 187.5 * i;
            obj.y = 95;
            obj.setmyID(i + 1);
            obj.touchEnabled = true;
            this.addChild(obj);
        }
        this._topShape = new egret.Shape();
        this.addChild(this._topShape);
        this._topShape.graphics.beginFill(0xf96d67);
        this._topShape.graphics.drawRoundRect(73.5, 155, 48, 4, 8);
        this._topShape.graphics.endFill();
        this.yuanquan = new egret.Shape(); //关注圆圈
        this.addChild(this.yuanquan);
        this.yuanquan.graphics.beginFill(0xFCB21A);
        this.yuanquan.graphics.drawCircle(509, 120, 12);
        this.yuanquan.graphics.endFill();
        this.guanzText = ToolMrg.getText(497, 108.5, 16, 0xffffff, 24);
        this.guanzText.text = "";
        this.guanzText.height = 24;
        // this.guanzText.border = true;
        this.guanzText.textAlign = egret.HorizontalAlign.CENTER;
        this.guanzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.guanzText.fontFamily = "微软雅黑";
        this.addChild(this.guanzText);
    };
    /**红线移动*/
    BakorfallViewMrg.prototype.redXXTween = function () {
        var movex = 187.5;
        if (BakorfallViewMrg.inIndex == 2)
            movex = 183.5;
        egret.Tween.get(this._topShape).to({ x: movex * (BakorfallViewMrg.inIndex - 1) }, 200, egret.Ease.circOut);
        this.hideSelectBnt();
    };
    BakorfallViewMrg.prototype.addTop = function () {
        var _this = this;
        this.addChild(this._topContain);
        this._topContain.y = 16;
        var bjBox = new egret.Bitmap();
        this._topContain.addChild(bjBox);
        RES.getResByUrl("resource/assets/images/ui/wk_button@2x.png", function (e) {
            bjBox.$setBitmapData(e);
            bjBox.x = 256;
            bjBox.y = 0;
        }, this);
        this._screen = new egret.Bitmap();
        this._topContain.addChild(this._screen);
        RES.getResByUrl("resource/assets/images/ui/shaix_nav@2x.png", function (e) {
            _this._screen.$setBitmapData(e);
            _this._screen.y = 12;
            _this._screen.x = 680;
        }, this);
        this._screen.touchEnabled = true;
        this._screen.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            SelectMrg.getInstance.show();
        }, this);
        this._gShape = new egret.Shape();
        this._topContain.addChild(this._gShape);
        this._gShape.graphics.beginFill(0xffffff);
        this._gShape.graphics.drawRoundRect(256, 0, 120, 64, 33);
        this._gShape.graphics.endFill();
        this._g1 = ToolMrg.getText(256, 0, 32, 0xffffff, 120);
        this._g1.height = 64;
        this._topContain.addChild(this._g1);
        this._g1.textAlign = egret.HorizontalAlign.CENTER;
        this._g1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g1.text = "足球";
        this._g1.touchEnabled = true;
        this._g2 = ToolMrg.getText(256 + 120, 0, 32, 0xffffff, 120);
        this._g2.height = 64;
        this._topContain.addChild(this._g2);
        this._g2.textAlign = egret.HorizontalAlign.CENTER;
        this._g2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._g2.text = "篮球";
        this._g2.touchEnabled = true;
        this._g1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._g2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    BakorfallViewMrg.prototype.touchDown = function (e) {
        if (e.target == this._g1) {
            if (BakorfallViewMrg.stateIndex == 0)
                return;
            BakorfallViewMrg.stateIndex = 0;
        }
        else if (e.target == this._g2) {
            if (BakorfallViewMrg.stateIndex == 1)
                return;
            BakorfallViewMrg.stateIndex = 1;
        }
        this.changeTop();
        this.setGUSN();
    };
    BakorfallViewMrg.prototype.changeTop = function () {
        if (BakorfallViewMrg.stateIndex == 0) {
            this._g1.textColor = 0xF72F52;
            this._g2.textColor = 0xffffff;
            egret.Tween.get(this._gShape).to({ x: 0 }, 200);
            BakorfallViewMrg.inIndex = 2;
            BakorfallData.getInstance.redxdecide();
            BasketViewMrg.getInstance.hide();
            FallViewMrg.getInstance.show();
        }
        else if (BakorfallViewMrg.stateIndex == 1) {
            this._g1.textColor = 0xffffff;
            this._g2.textColor = 0xF72F52;
            egret.Tween.get(this._gShape).to({ x: 120 }, 200);
            BakorfallViewMrg.inIndex = 2;
            BakorfallData.getInstance.redxdecide();
            FallViewMrg.getInstance.hide();
            BasketViewMrg.getInstance.show();
        }
    };
    BakorfallViewMrg.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.bgLay.addChild(this);
        }
        this.changeTop();
        this.redXXTween();
        // if (UserData.getInstance.isLogin() == false)
        // 	LoginWnd.getInstance.show();
        this.setGUSN();
        BakorfallViewMrg.decideshow = true;
        if (this.iffirst == true) {
            BakorfallData.getInstance.sendsynchronizationInfo();
            this.iffirst = false;
        }
    };
    BakorfallViewMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        BakorfallViewMrg.stateIndex = 0;
        FallViewMrg.getInstance.hide();
        BasketViewMrg.getInstance.hide();
        BakorfallViewMrg.decideshow = false;
    };
    /**适配处理 */
    BakorfallViewMrg.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**设置关注个数*/
    BakorfallViewMrg.prototype.setGUSN = function () {
        var type = BakorfallViewMrg.stateIndex;
        var yuanNum = 0;
        if (type == 0) {
            yuanNum = FootballConfinData.getInstance.getlist3().size;
        }
        else {
            yuanNum = BasketballConfinData.getInstance.getlist3().size;
        }
        if (this.guanzText == undefined)
            return;
        this.guanzText.text = "" + yuanNum;
        if (yuanNum == 0) {
            this.yuanquan.visible = false;
            this.guanzText.visible = false;
        }
        else {
            this.yuanquan.visible = true;
            this.guanzText.visible = true;
        }
    };
    /**刷新篮球或足球对应即时和关注数据*/
    BakorfallViewMrg.prototype.refreshallInfo = function () {
        if (BakorfallViewMrg.stateIndex == 0) {
            if (BakorfallViewMrg.inIndex == 2) {
                football1.getInstance.initallInfo();
            }
            else if (BakorfallViewMrg.inIndex == 3) {
                football4.getInstance.initallInfo();
            }
        }
        else if (BakorfallViewMrg.stateIndex == 1) {
            if (BakorfallViewMrg.inIndex == 2) {
                basketball1.getInstance.initallInfo();
            }
            else if (BakorfallViewMrg.inIndex == 3) {
                basketball4.getInstance.initallInfo();
            }
        }
        this.setGUSN();
    };
    /**刷新关注列表*/
    BakorfallViewMrg.prototype.refreshlist = function () {
        if (BakorfallViewMrg.stateIndex == 0) {
            football4.getInstance.initallInfo();
        }
        else if (BakorfallViewMrg.stateIndex == 1) {
            basketball4.getInstance.initallInfo();
        }
        this.setGUSN();
    };
    /**暂时无数据 */
    BakorfallViewMrg.prototype.xianshi = function () {
        var _this = this;
        this._mZWSJTip = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", function (e) {
            _this._mZWSJTip.$setBitmapData(e);
            _this._mZWSJTip.x = (GameMain.getInstance.StageWidth - _this._mZWSJTip.width) * 0.5;
            _this._mZWSJTip.y = (GameMain.getInstance.StageHeight - _this._mZWSJTip.height) * 0.5;
        }, this);
        this._mZWSJTip.visible = false;
        this.addChild(this._mZWSJTip);
    };
    /**是否有数据 */
    BakorfallViewMrg.prototype.setDecide = function (boo) {
        var _this = this;
        if (this._mZWSJTip == undefined)
            return;
        if (boo == true) {
            egret.Tween.removeTweens(this._mZWSJTip);
            egret.Tween.get(this._mZWSJTip).wait(800).call(function () {
                _this._mZWSJTip.visible = true;
            });
        }
        else {
            egret.Tween.removeTweens(this._mZWSJTip);
            this._mZWSJTip.visible = false;
        }
    };
    /**是否隐藏筛选按钮*/
    BakorfallViewMrg.prototype.hideSelectBnt = function () {
        if (BakorfallViewMrg.inIndex == 2) {
            this._screen.visible = true;
        }
        else {
            this._screen.visible = false;
        }
    };
    BakorfallViewMrg.decideshow = false; //是否有打开比分界面
    BakorfallViewMrg.stateIndex = 0; //页面状态(0足球 1篮球 )
    BakorfallViewMrg.inIndex = 2;
    return BakorfallViewMrg;
}(egret.DisplayObjectContainer));
__reflect(BakorfallViewMrg.prototype, "BakorfallViewMrg");
var TopInfo = (function (_super) {
    __extends(TopInfo, _super);
    function TopInfo(str) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.setDB();
        _this._title = ToolMrg.getText(0, 0, 28, 0x333333, 187.5);
        _this.addChild(_this._title);
        _this._title.height = 64;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._title.text = str;
        _this.addevent();
        return _this;
    }
    TopInfo.prototype.selectInfo = function () {
        this._title.textColor = 0xF72F52;
    };
    TopInfo.prototype.noselectInfo = function () {
        this._title.textColor = 0x333333;
    };
    /**设置自身id*/
    TopInfo.prototype.setmyID = function (myid) {
        this.myid = myid;
        if (this.myid == 1 || this.myid == 4) {
            this._title.visible = false;
        }
    };
    /**适配处理 */
    TopInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, 187.5, 64);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    TopInfo.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    TopInfo.prototype.onTouch = function () {
        if (this.myid == 1 || this.myid == 4) {
            return;
        }
        BakorfallViewMrg.inIndex = this.myid;
        if (BakorfallViewMrg.stateIndex == 0) {
            BakorfallData.getInstance.redxdecide();
            FallViewMrg.getInstance.show();
        }
        else {
            BakorfallData.getInstance.redxdecide();
            BasketViewMrg.getInstance.show();
        }
    };
    return TopInfo;
}(egret.DisplayObjectContainer));
__reflect(TopInfo.prototype, "TopInfo");
//# sourceMappingURL=BakorfallViewMrg.js.map