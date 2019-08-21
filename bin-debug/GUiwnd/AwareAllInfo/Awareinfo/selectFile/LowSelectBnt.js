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
/**下方确定按钮类 */
var LowSelectBnt = (function (_super) {
    __extends(LowSelectBnt, _super);
    function LowSelectBnt() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.allselectBg = new egret.Bitmap();
        _this.allselectBg.x = 28;
        _this.allselectBg.y = 18;
        _this.allselectBg.width = 210;
        _this.allselectBg.height = 64;
        _this.addChild(_this.allselectBg);
        ToolMrg.setZoom(_this.allselectBg);
        RES.getResByUrl("resource/assets/images/ui/qiehuan_match@2x.png", _this.bgBack3, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.allText = ToolMrg.getText(28, 0, 28, 0xF72E52, 105);
        _this.allText.text = "全选";
        _this.allText.fontFamily = "微软雅黑";
        _this.allText.height = 100;
        _this.allText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.allText.textAlign = egret.HorizontalAlign.CENTER;
        _this.allText.bold = true;
        _this.allText.touchEnabled = true;
        _this.addChild(_this.allText);
        _this.fanSelect = ToolMrg.getText(134, 0, 28, 0x333333, 105);
        _this.fanSelect.text = "反选";
        _this.fanSelect.fontFamily = "微软雅黑";
        _this.fanSelect.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.fanSelect.textAlign = egret.HorizontalAlign.CENTER;
        _this.fanSelect.height = 100;
        _this.fanSelect.bold = true;
        _this.fanSelect.touchEnabled = true;
        _this.addChild(_this.fanSelect);
        _this.hideText = ToolMrg.getText(0, 0, 24, 0x999999, 750);
        _this.hideText.text = "隐藏了多少场比赛";
        _this.hideText.fontFamily = "微软雅黑";
        _this.hideText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.hideText.textAlign = egret.HorizontalAlign.CENTER;
        _this.hideText.height = 100;
        _this.hideText.bold = true;
        _this.addChild(_this.hideText);
        _this.decideBnt = new egret.Bitmap();
        _this.decideBnt.x = 564;
        _this.decideBnt.y = 18;
        _this.decideBnt.width = 160;
        _this.decideBnt.height = 72;
        _this.addChild(_this.decideBnt);
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", _this.bgBack2, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.decideBnt.touchEnabled = true;
        _this.decideText = ToolMrg.getText(_this.decideBnt.x, 0, 32, 0xFFFFFF, 160);
        _this.decideText.text = "确定";
        _this.decideText.fontFamily = "微软雅黑";
        _this.decideText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.decideText.textAlign = egret.HorizontalAlign.CENTER;
        _this.decideText.height = 100;
        _this.decideText.bold = true;
        _this.addChild(_this.decideText);
        _this.setDB();
        _this.addevent();
        return _this;
    }
    Object.defineProperty(LowSelectBnt, "getInstance", {
        get: function () {
            if (LowSelectBnt._mInstance == undefined)
                LowSelectBnt._mInstance = new LowSelectBnt();
            return LowSelectBnt._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    LowSelectBnt.prototype.bgBack3 = function (data, url) {
        if (data != undefined && this.allselectBg != undefined) {
            this.allselectBg.$setBitmapData(data);
        }
    };
    LowSelectBnt.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this.decideBnt != undefined) {
            this.decideBnt.$setBitmapData(data);
        }
    };
    /**适配处理 */
    LowSelectBnt.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    LowSelectBnt.prototype.show = function () {
        if (this.parent == undefined) {
            SelectMrg.getInstance.addChild(this);
        }
        LowSelectBnt.selectID = 1;
        this.setselect();
    };
    LowSelectBnt.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    LowSelectBnt.prototype.addevent = function () {
        this.allText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.fanSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.decideBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    LowSelectBnt.prototype.onTouch = function (e) {
        var target = e.target;
        if (target == this.allText) {
            LowSelectBnt.selectID = 1;
        }
        else if (target == this.fanSelect) {
            LowSelectBnt.selectID = 2;
        }
        else if (target == this.decideBnt) {
            var type = BakorfallViewMrg.stateIndex;
            var listll = selectFileData.getInstance.setList();
            if (listll.length <= 0)
                return;
            if (type == 0) {
                if (listll.length > 0) {
                    FootballConfinData.getInstance.selectafterList(listll);
                    football1.getInstance.show(FootballConfinData.getInstance.getselectlist());
                    BakorfallViewMrg.inIndex = 2;
                    BakorfallData.getInstance.redxdecide();
                    SelectMrg.getInstance.hide();
                    this.hide();
                }
            }
            else {
                if (listll.length > 0) {
                    BasketballConfinData.getInstance.selectafterList(listll);
                    basketball1.getInstance.show(BasketballConfinData.getInstance.getselectlist());
                    BakorfallViewMrg.inIndex = 2;
                    BakorfallData.getInstance.redxdecide();
                    SelectMrg.getInstance.hide();
                    this.hide();
                }
            }
        }
        this.setselect();
        this.setHideBS(selectFileData.getInstance.gethideNum());
    };
    /**设置全选或反选(全选 2反选)*/
    LowSelectBnt.prototype.setselect = function () {
        var type = LowSelectBnt.selectID;
        if (type == 1) {
            this.allselectBg.scaleX = 1;
            this.allText.textColor = 0xF72E52;
            this.fanSelect.textColor = 0x333333;
        }
        else if (type == 2) {
            this.allselectBg.scaleX = -1;
            this.allText.textColor = 0x333333;
            this.fanSelect.textColor = 0xF72E52;
        }
        selectFileData.getInstance.selectall(type);
    };
    /**初始设全选*/
    LowSelectBnt.prototype.initSelect = function () {
        var type = LowSelectBnt.selectID = 1;
        if (type == 1) {
            this.allselectBg.scaleX = 1;
            this.allText.textColor = 0xF72E52;
            this.fanSelect.textColor = 0x333333;
        }
        else if (type == 2) {
            this.allselectBg.scaleX = -1;
            this.allText.textColor = 0x333333;
            this.fanSelect.textColor = 0xF72E52;
        }
    };
    /**设置隐藏了多少场比赛*/
    LowSelectBnt.prototype.setHideBS = function (num) {
        if (this.hideText == undefined)
            return;
        this.hideText.text = "隐藏了" + num + "场比赛";
        var decide = selectFileData.getInstance.ifholdss();
        if (this.decideBnt != undefined) {
            if (decide == true) {
                this.decideBnt.alpha = 1;
            }
            else {
                this.decideBnt.alpha = 0.2;
            }
        }
    };
    /**设置确定按钮状态*/
    LowSelectBnt.prototype.setdecideBnt = function () {
        var decide = selectFileData.getInstance.ifholdss();
        if (this.decideBnt != undefined) {
            if (decide == true) {
                this.decideBnt.alpha = 1;
            }
            else {
                this.decideBnt.alpha = 0.2;
            }
        }
    };
    LowSelectBnt.selectID = 1; //1 全选 2反选
    return LowSelectBnt;
}(egret.DisplayObjectContainer));
__reflect(LowSelectBnt.prototype, "LowSelectBnt");
//# sourceMappingURL=LowSelectBnt.js.map