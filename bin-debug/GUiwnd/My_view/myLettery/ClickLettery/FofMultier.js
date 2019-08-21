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
/**倍数优化 */
var FofMultier = (function (_super) {
    __extends(FofMultier, _super);
    function FofMultier() {
        var _this = _super.call(this) || this;
        /**进来时 类型为 0足球 1篮球 2超级足彩 3超级篮球 */
        _this._comeType = 0;
        _this._data = [];
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._svContain = new egret.DisplayObjectContainer();
        _this._mItem = new GHashMap();
        _this.GSlideOb = new GSlideObj();
        _this._topUI = new TopUI("奖金方案");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        // this._tipLink = new egret.Shape();
        // this.addChild(this._tipLink);
        // this._tipLink.graphics.beginFill(0xF5F5F7);
        // this._tipLink.graphics.drawRect(0,96+GameValue.adaptationScreen,750,80);
        // this._tipLink.graphics.endFill();
        // let tipText = ToolMrg.getText(26,96+GameValue.adaptationScreen,28,0x999999);
        // this.addChild(tipText);
        // tipText.height = 80;
        // tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        // tipText.text = "如果您的方案是一个倍投的复试方案或倍投的组合…";
        // let tipBtn = new egret.Bitmap();
        // this.addChild(tipBtn);
        // tipBtn.x = 690;
        // tipBtn.y = 96+GameValue.adaptationScreen+22;
        // RES.getResByUrl("resource/assets/images/ui/wenti_home@2x.png",(e)=>{tipBtn.$setBitmapData(e); },this)
        _this.addChild(_this._mContain);
        _this.addScoll();
        // let bit = new egret.Bitmap();
        // this._svContain.addChild(bit);
        // bit.width = GameMain.getInstance.StageWidth;
        // bit.height = this._scroView.height;
        // RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{bit.$setBitmapData(e); },this);
        _this.joinCenter();
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(FofMultier, "getInstance", {
        get: function () {
            if (FofMultier._mInstance == undefined)
                FofMultier._mInstance = new FofMultier();
            return FofMultier._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    FofMultier.prototype.updata = function () {
        var list;
        if (this._data != undefined)
            list = this._data;
        else
            return;
        var objHeight = 0;
        var data;
        for (var key = 0; key < list.length; key++) {
            var obj = void 0;
            if (this._mItem.GhasKey(key)) {
                obj = this._mItem.Gget(key);
            }
            else {
                obj = new FofMultier_info();
                this._mItem.Gput(key, obj);
            }
            data = list[key];
            obj.aa(data);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._svContain.addChild(obj);
        }
        // this.GSlideOb.showDataByMap(15, 160, this._scroView, this._svContain, this._mItem);
        //文本y判断改变
        if (objHeight < this._scroView.height)
            this._downContain.y = objHeight + 96 + GameValue.adaptationScreen + 100;
        else
            this._downContain.y = GameMain.getInstance.StageHeight - 300;
        ;
    };
    FofMultier.prototype.show = function (data) {
        GUIManager.getInstance.tipLay.addChild(this);
        this._data = data;
        this.updata();
        this.addInterception();
    };
    FofMultier.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this.removeInterception();
            var obj = void 0;
            for (var _i = 0, _a = this._mItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                obj = this._mItem.Gget(key);
                if (obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    FofMultier.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        // else if(e.target == this._tipLink){//打开提示页面
        // }
        // else if(e.target == this._goBtn){//前往 直接进行支付
        //     if(UserData.getInstance.isLogin() == false) {
        //         LoginWnd.getInstance.show();
        //         return;
        //     }
        //     this._mPayData.xzM = this.getBS() * 2;
        //     PaymentWnd.getInstance.show(this._mPayData);
        // }
    };
    FofMultier.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    };
    FofMultier.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    };
    /**适配处理 */
    FofMultier.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    FofMultier.prototype.joinCenter = function () {
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 96 + GameValue.adaptationScreen;
        var centerShape = new egret.Shape();
        this._centerContain.addChild(centerShape);
        centerShape.graphics.beginFill(0xffffff);
        centerShape.graphics.drawRect(0, 0, 750, 100);
        centerShape.graphics.endFill();
        var centerText1 = ToolMrg.getText(122, 0, 28, 0x999999);
        this._centerContain.addChild(centerText1);
        centerText1.height = 100;
        centerText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText1.text = "投注内容";
        var centerText2 = ToolMrg.getText(454, 0, 28, 0x999999);
        this._centerContain.addChild(centerText2);
        centerText2.height = 100;
        centerText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText2.text = "注数";
        var centerText3 = ToolMrg.getText(626, 0, 24, 0x999999);
        this._centerContain.addChild(centerText3);
        centerText3.height = 100;
        centerText3.verticalAlign = egret.VerticalAlign.MIDDLE;
        centerText3.text = "奖金(元)";
        var centerLink = new egret.Shape();
        this._centerContain.addChild(centerLink);
        centerLink.graphics.beginFill(0xdedede);
        centerLink.graphics.drawRect(0, 98.5, 750, 1.5);
        centerLink.graphics.endFill();
    };
    FofMultier.prototype.joinDown = function () {
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - 300;
        var link = new egret.Shape();
        this._downContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 1.5);
        link.graphics.endFill();
        var shape = new egret.Bitmap();
        this._downContain.addChild(shape);
        shape.width = GameMain.getInstance.StageWidth;
        shape.height = 80;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { shape.$setBitmapData(e); }, this);
        var text = ToolMrg.getText(0, 32, 24, 0x999999, GameMain.getInstance.StageWidth);
        this._downContain.addChild(text);
        text.height = 34;
        text.verticalAlign = egret.VerticalAlign.MIDDLE;
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "*预计奖金仅供参考，请以实际开奖奖金为准。";
    };
    FofMultier.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 100;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._svContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 300;
        this.addChild(this._scroView);
    };
    return FofMultier;
}(egret.DisplayObjectContainer));
__reflect(FofMultier.prototype, "FofMultier");
//# sourceMappingURL=FofMultier.js.map