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
var MultiplierDetail = (function (_super) {
    __extends(MultiplierDetail, _super);
    function MultiplierDetail() {
        var _this = _super.call(this) || this;
        /**进来时 类型为 0足球 1篮球 2超级足彩 3超级篮球 */
        _this._comeType = 0;
        /**选中 保存几串几 */
        _this._strandItem = [];
        /**倍数 */
        _this._mBS = 1;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._svContain = new egret.DisplayObjectContainer();
        _this._mItem = new GHashMap();
        _this.GSlideOb = new GSlideObj();
        _this._topUI = new TopUI("倍数优化");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._tipLink = new egret.Shape();
        _this.addChild(_this._tipLink);
        _this._tipLink.graphics.beginFill(0xF5F5F7);
        _this._tipLink.graphics.drawRect(0, 96 + GameValue.adaptationScreen, 750, 80);
        _this._tipLink.graphics.endFill();
        var tipText = ToolMrg.getText(26, 96 + GameValue.adaptationScreen, 28, 0x999999);
        _this.addChild(tipText);
        tipText.height = 80;
        tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tipText.text = "如果您的方案是一个倍投的复试方案或倍投的组合…";
        var tipBtn = new egret.Bitmap();
        _this.addChild(tipBtn);
        tipBtn.x = 690;
        tipBtn.y = 96 + GameValue.adaptationScreen + 22;
        RES.getResByUrl("resource/assets/images/ui/wenti_home@2x.png", function (e) { tipBtn.$setBitmapData(e); }, _this);
        _this.addChild(_this._mContain);
        _this.addScoll();
        _this.joinCenter();
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(MultiplierDetail, "getInstance", {
        get: function () {
            if (MultiplierDetail._mInstance == undefined)
                MultiplierDetail._mInstance = new MultiplierDetail();
            return MultiplierDetail._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取全部下注倍数 */
    MultiplierDetail.prototype.getBS = function () {
        var num = 0;
        var data;
        for (var _i = 0, _a = this._mItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mItem.Gget(key);
            if (data.parent != undefined)
                num += data.getXZJE();
        }
        return num;
    };
    /**获取下注金额 */
    MultiplierDetail.prototype.getJJ = function () {
        var max = 0;
        var data;
        for (var _i = 0, _a = this._mItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._mItem.Gget(key);
            if (data.parent != undefined) {
                // if(max < data.getJJ()) {
                //     max = data.getJJ()
                // }
                max += data.getJJ();
            }
        }
        max = Math.round(max * 100);
        max /= 100;
        return max;
    };
    MultiplierDetail.prototype.updata = function () {
        var list = GuessingFootballMrg.getInstance.getStrandList(this._data, this._strandItem, this._comeType, this.isDanGuan);
        var objHeight = 0;
        var data;
        for (var key = 0; key < list.length; key++) {
            var obj = void 0;
            if (this._mItem.GhasKey(key)) {
                obj = this._mItem.Gget(key);
            }
            else {
                obj = new MlContentInfo();
                this._mItem.Gput(key, obj);
            }
            data = list[key];
            obj.addInterception();
            obj.setBS(this._mBS);
            obj.aa(key, this._data, data, this._comeType);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this._svContain.addChild(obj);
        }
        // this.GSlideOb.showDataByMap(15, 160, this._scroView, this._svContain, this._mItem);
        this.changeMultiplier();
    };
    /**倍数更变时 金额和最高奖金变化 */
    MultiplierDetail.prototype.changeMultiplier = function () {
        // let money = 0;
        // let bonus = 0;
        // for(let key of this._mItem.keys){//计算
        //     let obj = this._mItem.Gget(key);
        //     bonus = bonus + obj.getMoney();
        //     money = money + obj.getMultiplier()*2;
        // }
        this._downTitle.text = "\uFFE5" + this.getBS() * 2;
        this._downContent.text = "\uFFE5" + this.getJJ().toFixed(2);
    };
    MultiplierDetail.prototype.show = function (data, strandItem, comeType, payData, isDanGuan, bs) {
        GUIManager.getInstance.tipLay.addChild(this);
        this._data = data;
        this._comeType = comeType;
        this._strandItem = strandItem;
        this._mBS = bs;
        this._mPayData = payData;
        this.isDanGuan = isDanGuan;
        this.updata();
        this.addInterception();
    };
    MultiplierDetail.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._scroView.setScrollTop(0);
            this.removeInterception();
            var obj = void 0;
            for (var _i = 0, _a = this._mItem.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                obj = this._mItem.Gget(key);
                obj.removeInterception();
                if (obj.parent != undefined) {
                    obj.parent.removeChild(obj);
                }
            }
        }
    };
    MultiplierDetail.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._tipLink) {
        }
        else if (e.target == this._goBtn) {
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            if (this.isDanGuan == false) {
                if (this.getBS() * 2 > 100000) {
                    Alertpaner.getInstance.show("串关下注上限为10万");
                    return;
                }
            }
            else {
                if (this.getBS() * 2 > 200000) {
                    Alertpaner.getInstance.show("单关下注上限为20万");
                    return;
                }
            }
            if (this.getJJ() > 500000) {
                Alertpaner.getInstance.show("最高赔付上限为50万");
                return;
            }
            this._mPayData.xzM = this.getBS() * 2;
            PaymentWnd.getInstance.show(this._mPayData);
        }
    };
    MultiplierDetail.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    MultiplierDetail.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tipLink.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**适配处理 */
    MultiplierDetail.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    MultiplierDetail.prototype.joinCenter = function () {
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 96 + GameValue.adaptationScreen + 80;
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
        centerText2.text = "倍数";
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
    MultiplierDetail.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) { bj.$setBitmapData(e); }, this);
        var downTitle = ToolMrg.getText(28, 18, 32, 0x333333);
        this._downContain.addChild(downTitle);
        downTitle.bold = true;
        downTitle.text = "投注金额：";
        var downContent = ToolMrg.getText(28, 65, 22, 0x333333);
        this._downContain.addChild(downContent);
        downContent.text = "预测最高奖金：";
        this._downTitle = ToolMrg.getText(25 + downTitle.textWidth, 18, 32, 0xfa294e);
        this._downContain.addChild(this._downTitle);
        // this._downTitle.text = "￥1000000元";
        this._downContent = ToolMrg.getText(25 + downContent.textWidth, 65, 22, 0xfa294e);
        this._downContain.addChild(this._downContent);
        // this._downContent.text = "￥1000000元";
        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        this._goBtn.x = 556;
        this._goBtn.y = 10;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) { _this._goBtn.$setBitmapData(e); }, this);
        var goBtnText = ToolMrg.getText(612, 34, 32, 0xffffff);
        this._downContain.addChild(goBtnText);
        goBtnText.text = "投注";
    };
    MultiplierDetail.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 80 + 100;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._svContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
        this.addChild(this._scroView);
    };
    return MultiplierDetail;
}(egret.DisplayObjectContainer));
__reflect(MultiplierDetail.prototype, "MultiplierDetail");
//# sourceMappingURL=MultiplierDetail.js.map