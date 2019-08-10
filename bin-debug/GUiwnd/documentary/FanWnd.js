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
/**他的粉丝 */
var FanWnd = (function (_super) {
    __extends(FanWnd, _super);
    function FanWnd() {
        var _this = _super.call(this) || this;
        _this.y = GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._fanItem = new GHashMap();
        _this._topUI = new TopUI("他的粉丝", -_this.y);
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    FanWnd.prototype.updata = function () {
        var objHeight = 0;
        for (var key = 0; key < 5; key++) {
            var obj = void 0;
            if (this._fanItem.GhasKey(key)) {
                obj = this._fanItem.Gget(key);
            }
            else {
                obj = new FanofLikeInfo();
            }
            obj.aa();
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
    };
    FanWnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.updata();
    };
    FanWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            for (var _i = 0, _a = this._fanItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._fanItem.Gget(key).removeInterception();
            }
        }
    };
    FanWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    FanWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    FanWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    FanWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    FanWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return FanWnd;
}(egret.DisplayObjectContainer));
__reflect(FanWnd.prototype, "FanWnd");
var FanofLikeInfo = (function (_super) {
    __extends(FanofLikeInfo, _super);
    function FanofLikeInfo() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this._tx = new egret.Bitmap;
        _this.addChild(_this._tx);
        _this._tx.width = 84;
        _this._tx.height = 84;
        _this._tx.x = 26;
        _this._tx.y = 28;
        _this._tx.touchEnabled = true;
        _this._txNane = ToolMrg.getText(128, 20, 32, 0x333333);
        _this.addChild(_this._txNane);
        _this._likeBtn = new egret.Bitmap;
        _this.addChild(_this._likeBtn);
        _this._likeBtn.x = 622;
        _this._likeBtn.y = 28;
        _this._likeBtn.touchEnabled = true;
        _this._l = new egret.Bitmap();
        _this.addChild(_this._l);
        _this._l.x = 692,
            _this._l.y = 88;
        _this.statistics = new DD_Statistics();
        _this.addChild(_this.statistics);
        _this.statistics.y = 84;
        _this.statistics.x = 128;
        _this._rate = ToolMrg.getText(128, 138, 24, 0x999999);
        _this.addChild(_this._rate);
        _this._likeImg = new egret.Bitmap();
        _this.addChild(_this._likeImg);
        _this._likeImg.x = 521;
        _this._likeImg.y = 145;
        RES.getResByUrl("resource/assets/images/ui/fss_expert@2x.png", function (e) { _this._likeImg.$setBitmapData(e); }, _this);
        _this._lookImg = new egret.Bitmap();
        _this.addChild(_this._lookImg);
        _this._lookImg.x = 600;
        _this._lookImg.y = 146;
        RES.getResByUrl("resource/assets/images/ui/gzs_expert@2x.png", function (e) { _this._lookImg.$setBitmapData(e); }, _this);
        _this._img3 = new egret.Bitmap();
        _this.addChild(_this._img3);
        _this._img3.x = 683;
        _this._img3.y = 145;
        RES.getResByUrl("resource/assets/images/ui/fas_expert@2x.png", function (e) { _this._img3.$setBitmapData(e); }, _this);
        _this._likeText = ToolMrg.getText(546, 143, 20, 0xa9a9a9);
        _this.addChild(_this._likeText);
        _this._lookText = ToolMrg.getText(628, 143, 20, 0xa9a9a9);
        _this.addChild(_this._lookText);
        _this._text3 = ToolMrg.getText(704, 143, 20, 0xa9a9a9);
        _this.addChild(_this._text3);
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0, 192, 750, 10);
        shape.graphics.endFill();
        _this.setDB();
        return _this;
    }
    FanofLikeInfo.prototype.aa = function () {
        var _this = this;
        this._txNane.text = "红红火火";
        RES.getResByUrl("resource/assets/images/ui/user_default@2x.png", function (e) { _this._tx.$setBitmapData(e); }, this);
        RES.getResByUrl("resource/assets/images/ui/gz1_expert@2x.png", function (e) { _this._likeBtn.$setBitmapData(e); }, this);
        // RES.getResByUrl("resource/assets/images/ui/liao_expert@2x.png",(e)=>{this._l.$setBitmapData(e); },this);
        this._rate.textFlow = [
            { "text": "\u4E03\u5355\u56DE\u62A5\u7387 ", "style": { "textColor": 0x999999, "size": 24 } },
            { "text": "2459%", "style": { "textColor": 0xF72E52, "size": 32 } }
        ];
        this._likeText.text = "128";
        this._lookText.text = "12";
        this._text3.text = "123";
    };
    /**适配处理 */
    FanofLikeInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 202);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    FanofLikeInfo.prototype.touchDown = function (e) {
        if (e.target == this._mShareC) {
            DmC_infoMsg.personalHome = new PersonalHome();
            DmC_infoMsg.personalHome.show();
        }
        else if (e.target == this._likeBtn) {
        }
    };
    FanofLikeInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._likeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    FanofLikeInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._likeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    return FanofLikeInfo;
}(egret.DisplayObjectContainer));
__reflect(FanofLikeInfo.prototype, "FanofLikeInfo");
//# sourceMappingURL=FanWnd.js.map