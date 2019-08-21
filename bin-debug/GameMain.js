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
var GameMain = (function (_super) {
    __extends(GameMain, _super);
    function GameMain() {
        var _this = _super.call(this) || this;
        _this._mIsInit = false;
        _this._mFrameIndex = 0;
        GameMain._mInstance = _this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.callFun, _this);
        return _this;
    }
    Object.defineProperty(GameMain, "getInstance", {
        get: function () {
            return GameMain._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    GameMain.prototype.callFun = function (e) {
        this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
        this.stage.addEventListener(egret.Event.ACTIVATE, this.onActivite, this);
    };
    GameMain.prototype.init = function () {
        this._mIsInit = true;
        GResCache.mResGroupConfig = ResGroup.resGroupConfig;
        RES.setMaxLoadingThread(5);
        this.addChild(GUIManager.getInstance);
        // this.stage.dirtyRegionPolicy = "off";
        this.setGameState(GStatus.LoadingStatus.getInstance);
    };
    //状态机切换
    GameMain.prototype.setGameState = function (gs) {
        if (this._mCurrentState == gs || gs == undefined)
            return;
        if (this._mCurrentState != undefined)
            this._mCurrentState.exitStatus();
        this._mCurrentState = gs;
        this._mCurrentState.enterStatus();
    };
    GameMain.prototype.onEnterFrame = function (e) {
        if (this._mIsInit == false && this._mFrameIndex > 2)
            this.init();
        var it = GTimerMag.getInstance.update();
        GMovieMag.getInstance.GonEnterFrame();
        if (this._mCurrentState != undefined) {
            this._mCurrentState.update(it);
        }
        this._mFrameIndex++;
    };
    Object.defineProperty(GameMain.prototype, "StageWidth", {
        get: function () {
            return this.stage.stageWidth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GameMain.prototype, "StageHeight", {
        get: function () {
            return this.stage.$stageHeight;
        },
        enumerable: true,
        configurable: true
    });
    GameMain.prototype.onActivite = function () {
        if (keyboard.getInstance.parent != undefined)
            keyboard.getInstance.hide();
    };
    GameMain.prototype.onDEACTIVATE = function () {
    };
    Object.defineProperty(GameMain.prototype, "getCurrState", {
        get: function () {
            return this._mCurrentState;
        },
        enumerable: true,
        configurable: true
    });
    return GameMain;
}(egret.DisplayObjectContainer));
__reflect(GameMain.prototype, "GameMain");
//# sourceMappingURL=GameMain.js.map