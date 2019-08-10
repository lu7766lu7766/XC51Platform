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
/**选择头像管理类 */
var selectHeadIconMrf = (function (_super) {
    __extends(selectHeadIconMrf, _super);
    function selectHeadIconMrf() {
        var _this = _super.call(this) || this;
        _this._mListObj = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this.touchEnabled = true;
        _this._topUI = new TopUI("更换头像");
        _this._topUI.y = -_this.y;
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._defauIcon = new egret.Bitmap();
        _this._defauIcon.x = 590;
        _this._defauIcon.y = 40;
        _this._defauIcon.width = 120;
        _this._defauIcon.height = 120;
        _this._mContain.addChild(_this._defauIcon);
        // RES.getResByUrl("resource/assets/images/ui/tou20.png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
        var text1 = ToolMrg.getText(36, 72, 28, 0x333333);
        _this._mContain.addChild(text1);
        text1.text = "当前头像";
        text1.bold = true;
        var text2 = ToolMrg.getText(38, 182, 28, 0x333333);
        _this._mContain.addChild(text2);
        text2.text = "可选的头像:";
        text2.bold = true;
        _this.nextBnt = new egret.Bitmap();
        _this.nextBnt.x = 20;
        _this.nextBnt.y = GameMain.getInstance.StageHeight - 220;
        _this._mContain.addChild(_this.nextBnt);
        ToolMrg.setZoom(_this.nextBnt);
        _this.nextBnt.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.nextText = ToolMrg.getText(0, _this.nextBnt.y + 35, 32, 0xffffff, 750);
        _this._mContain.addChild(_this.nextText);
        _this.nextText.textAlign = egret.HorizontalAlign.CENTER;
        _this.nextText.text = "更换";
        _this.nextText.bold = true;
        _this.setDB();
        _this.addevent();
        return _this;
    }
    Object.defineProperty(selectHeadIconMrf, "getInstance", {
        get: function () {
            if (selectHeadIconMrf._mInstance == undefined)
                selectHeadIconMrf._mInstance = new selectHeadIconMrf();
            return selectHeadIconMrf._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取数组最长长度*/
    selectHeadIconMrf.prototype.getlistLen = function () {
        return this._mListObj.size;
    };
    /**获取数组*/
    selectHeadIconMrf.prototype.getlistList = function () {
        return this._mListObj;
    };
    selectHeadIconMrf.prototype.headIcon = function (data, url) {
        if (data != undefined && this._defauIcon != undefined) {
            this._defauIcon.$setBitmapData(data);
        }
    };
    /**设置当前头像*/
    selectHeadIconMrf.prototype.setdefaultIcon = function (id) {
        RES.getResByUrl("resource/assets/images/ui/tou" + id + ".png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
    };
    selectHeadIconMrf.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.nextBnt != undefined) {
            this.nextBnt.$setBitmapData(data);
        }
    };
    selectHeadIconMrf.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this.initallInfo();
        this.setdefaultIcon(selectHeadIconData.userIconID);
    };
    selectHeadIconMrf.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**初始化所有数据*/
    selectHeadIconMrf.prototype.initallInfo = function () {
        var len = 9;
        var shu = 1;
        var heng = 1;
        var dataObj;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new selectHeadIconItem();
                this._mListObj.Gput(i, dataObj);
            }
            if (i != 1) {
                if (i % 4 == 0) {
                    heng = 4;
                }
                else {
                    heng = i % 4;
                    if (i % 4 - 1 == 0) {
                        shu++;
                    }
                }
            }
            dataObj.setID(i);
            dataObj.setPoint(40 + (heng - 1) * 184, 280 + (shu - 1) * 160);
            if (dataObj.parent == undefined) {
                this._mContain.addChild(dataObj);
            }
        }
        selectHeadIconData.getInstance.setlectHeadIcon1();
    };
    //清除对象数组
    selectHeadIconMrf.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
    };
    selectHeadIconMrf.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 0;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    selectHeadIconMrf.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFFFFFF, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
        this.setDB1();
    };
    /**适配处理 */
    selectHeadIconMrf.prototype.setDB1 = function () {
        this._mShareC1 = new egret.Shape();
        this._mShareC1.graphics.beginFill(0xFFFFFF, 1);
        this._mShareC1.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC1.graphics.endFill();
        this.addChildAt(this._mShareC1, 0);
    };
    selectHeadIconMrf.prototype.addevent = function () {
        this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    selectHeadIconMrf.prototype.onclick = function () {
        if (selectHeadIconData.selectheadIconID == selectHeadIconData.userIconID)
            return;
        selectHeadIconData.userIconID = selectHeadIconData.selectheadIconID;
        SelectHeadIconPhP.getInstance.sendHttp(selectHeadIconData.userIconID);
    };
    return selectHeadIconMrf;
}(egret.DisplayObjectContainer));
__reflect(selectHeadIconMrf.prototype, "selectHeadIconMrf");
//# sourceMappingURL=selectHeadIconMrf.js.map