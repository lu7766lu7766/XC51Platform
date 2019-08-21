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
/**个人主页 */
var PersonalHome = (function (_super) {
    __extends(PersonalHome, _super);
    function PersonalHome() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this.fan = new FanWnd();
        _this.like = new LikeWnd();
        _this._bj = new egret.Bitmap();
        _this.addChild(_this._bj);
        RES.getResByUrl("resource/assets/images/ui/grbg_expert@2x.png", function (e) { _this._bj.$setBitmapData(e); }, _this);
        _this._returnShape = new egret.Shape();
        _this.addChild(_this._returnShape);
        _this._returnShape.graphics.beginFill(0x1cbf4f);
        _this._returnShape.graphics.drawRect(0, 30, 110, 110);
        _this._returnShape.graphics.endFill();
        _this._returnShape.touchEnabled = true;
        _this._returnShape.alpha = 0.001;
        var returnBtn = new egret.Bitmap();
        _this.addChild(returnBtn);
        returnBtn.x = 26;
        returnBtn.y = 68;
        RES.getResByUrl("resource/assets/images/ui/return_nav@2x.png", function (e) { returnBtn.$setBitmapData(e); }, _this);
        var phTitle = ToolMrg.getText(0, 60, 36, 0xffffff, 750);
        _this.addChild(phTitle);
        phTitle.height = 50;
        phTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        phTitle.textAlign = egret.HorizontalAlign.CENTER;
        phTitle.text = "个人主页";
        var txBox = new egret.Shape();
        _this.addChild(txBox);
        txBox.graphics.beginFill(0xffffff);
        txBox.graphics.drawEllipse(28, 156, 96, 96);
        txBox.graphics.endFill();
        _this._tx = new egret.Bitmap();
        _this.addChild(_this._tx);
        _this._tx.width = 88;
        _this._tx.height = 88;
        _this._tx.x = 32;
        _this._tx.y = 160;
        RES.getResByUrl("resource/assets/images/ui/user_default@2x.png", function (e) { _this._tx.$setBitmapData(e); }, _this);
        _this._txName = ToolMrg.getText(144, 148, 32, 0xffffff);
        _this.addChild(_this._txName);
        _this._txName.height = 44;
        _this._txName.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._txContent = ToolMrg.getText(146, 202, 20, 0xffffff, 400);
        _this.addChild(_this._txContent);
        _this._txContent.lineSpacing = 5;
        _this._lookNum = ToolMrg.getText(146, 272, 20, 0xffffff);
        _this.addChild(_this._lookNum);
        _this._lookNum.height = 28;
        _this._lookNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._lookNum.touchEnabled = true;
        _this._fanNum = ToolMrg.getText(270, 272, 20, 0xffffff);
        _this.addChild(_this._fanNum);
        _this._fanNum.height = 28;
        _this._fanNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._fanNum.touchEnabled = true;
        _this._likeBtn = new egret.Bitmap();
        _this.addChild(_this._likeBtn);
        _this._likeBtn.x = 624;
        _this._likeBtn.y = 184;
        _this.statistics = new DD_Statistics();
        _this.addChild(_this.statistics);
        _this.statistics.y = 362;
        _this.statistics.x = 28;
        var sevenText = ToolMrg.getText(528, 362, 24, 0x999999);
        _this.addChild(sevenText);
        sevenText.height = 34;
        sevenText.verticalAlign = egret.VerticalAlign.MIDDLE;
        sevenText.text = "7单回报率";
        _this._rate = ToolMrg.getText(642, 360, 32, 0xf72e52);
        _this.addChild(_this._rate);
        var cShape = new egret.Shape();
        _this.addChild(cShape);
        cShape.graphics.beginFill(0xf5f5f7);
        cShape.graphics.drawRect(0, 76 + 342, 750, 10);
        cShape.graphics.endFill();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    PersonalHome.prototype.updata = function () {
        var _this = this;
        this._txName.text = "金陵数据方案";
        this._txContent.text = "通过人机理性分析胜负平、大小球走向，同路请加关注。";
        this._lookNum.text = "\u5173\u6CE8 12";
        this._fanNum.text = "\u7C89\u4E1D 116";
        RES.getResByUrl("resource/assets/images/ui/gz2_expert@2x.png", function (e) { _this._likeBtn.$setBitmapData(e); }, this);
        this._rate.textFlow = [
            { "text": "245", "style": { "size": 32 } },
            { "text": "%", "style": { "size": 28 } }
        ];
        var objHeight = 0;
        for (var key = 0; key < 7; key++) {
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new PHInfo();
                this._item.Gput(key, obj);
            }
            obj.aa();
            obj.addInterception();
            obj.y = objHeight;
            objHeight = obj.height + objHeight;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
    };
    PersonalHome.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.addInterception();
        this.updata();
    };
    PersonalHome.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            DmC_infoMsg.personalHome = null;
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).removeInterception();
            }
        }
    };
    PersonalHome.prototype.addInterception = function () {
        this._fanNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._lookNum.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._returnShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    PersonalHome.prototype.removeInterception = function () {
        this._fanNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._lookNum.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._returnShape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    PersonalHome.prototype.touchDown = function (e) {
        if (e.target == this._fanNum) {
            this.fan.show();
        }
        else if (e.target == this._lookNum) {
            this.like.show();
        }
        else if (e.target == this._returnShape) {
            this.hide();
        }
    };
    PersonalHome.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 342 + 86;
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
    PersonalHome.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return PersonalHome;
}(egret.DisplayObjectContainer));
__reflect(PersonalHome.prototype, "PersonalHome");
//# sourceMappingURL=PersonalHome.js.map