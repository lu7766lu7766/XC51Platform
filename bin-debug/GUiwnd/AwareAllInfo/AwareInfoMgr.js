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
/**开奖信息管理类 */
var AwareInfoMgr = (function (_super) {
    __extends(AwareInfoMgr, _super);
    function AwareInfoMgr() {
        var _this = _super.call(this) || this;
        _this.line = 4;
        _this.y = GameValue.adaptationScreen;
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("开奖信息");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.setDB();
        _this.touchEnabled = true;
        _this._mList = new GHashMap();
        _this._mListObj = new GHashMap();
        _this._mListObj2 = new GHashMap();
        return _this;
    }
    Object.defineProperty(AwareInfoMgr, "getInstance", {
        get: function () {
            if (AwareInfoMgr._mInstance == undefined)
                AwareInfoMgr._mInstance = new AwareInfoMgr();
            return AwareInfoMgr._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    AwareInfoMgr.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this.initAllgameInfo();
    };
    AwareInfoMgr.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    AwareInfoMgr.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 96 + GameValue.adaptationScreen - this.y;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 200;
        scroView.bounces = true;
    };
    /**适配处理 */
    AwareInfoMgr.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**显示游戏信息*/
    AwareInfoMgr.prototype.initAllgameInfo = function () {
        var datada;
        var dataObj;
        var listName = ["排列三", "排列五", "竞彩足球", "竞彩篮球"];
        var list = [1, 2, 3];
        for (var i = 1; i <= this.line; i++) {
            datada = AwareInfoData.getInstance.getInfo(i);
            if (i <= 2) {
                dataObj = this._mListObj.Gget(i);
                if (dataObj == undefined) {
                    dataObj = new AwareGameItem1();
                    this._mListObj.Gput(i, dataObj);
                }
                dataObj.setTayile(listName[i - 1]);
                if (datada != undefined) {
                    list = datada.getAwareList();
                    dataObj.setgameInfo(listName[i - 1], datada.qs + "", datada.time, "");
                    if (list != undefined) {
                        dataObj.initAllRedBg(list);
                    }
                }
            }
            else {
                dataObj = this._mListObj2.Gget(i);
                if (dataObj == undefined) {
                    dataObj = new AwareGameItem2();
                    this._mListObj2.Gput(i, dataObj);
                }
                if (i == 3) {
                    dataObj.setBallIcon(1);
                }
                else {
                    dataObj.setBallIcon(2);
                }
                dataObj.setTayile(listName[i - 1]);
                if (datada != undefined) {
                    dataObj.setinfo(datada.teamstr, listName[i - 1]);
                    dataObj.setTimer(datada.time);
                }
            }
            dataObj.setID(i);
            dataObj.setPoint(0, (i - 1) * 157);
            this._mContainQB.addChild(dataObj);
        }
    };
    return AwareInfoMgr;
}(egret.DisplayObjectContainer));
__reflect(AwareInfoMgr.prototype, "AwareInfoMgr");
//# sourceMappingURL=AwareInfoMgr.js.map