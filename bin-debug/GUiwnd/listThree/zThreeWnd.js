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
/**组三 */
var zThreeWnd = (function (_super) {
    __extends(zThreeWnd, _super);
    function zThreeWnd() {
        var _this = _super.call(this) || this;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._downBox = new egret.Bitmap;
        _this._mContain.addChild(_this._downBox);
        _this._downBox.y = -1;
        RES.getResByUrl("resource/assets/images/ui/xla_home@2x.png", function (e) {
            _this._downBox.$setBitmapData(e);
            _this._downBox.x = (750 - _this._downBox.width) * 0.5;
        }, _this);
        _this._downBox.touchEnabled = true;
        _this._downBox.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.changeBox, _this);
        _this._boxImg = new egret.Bitmap();
        _this._mContain.addChild(_this._boxImg);
        RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) {
            _this._boxImg.$setBitmapData(e);
            _this._boxImg.x = 363;
            _this._boxImg.y = 14;
        }, _this);
        var text = ToolMrg.getText(20, 66, 28, 0x333333);
        _this._mContain.addChild(text);
        text.text = "每位至少选择2个号码，奖金346元";
        _this._randomBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._randomBtn);
        RES.getResByUrl("resource/assets/images/ui/jxyz_home@2x.png", function (e) {
            _this._randomBtn.$setBitmapData(e);
            _this._randomBtn.x = GameMain.getInstance.StageWidth - _this._randomBtn.width;
            _this._randomBtn.y = 58;
        }, _this);
        _this._randomBtn.touchEnabled = true;
        _this._randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.randomNum, _this);
        _this.joinCss();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(zThreeWnd, "getInstance", {
        get: function () {
            if (zThreeWnd._mInstance == undefined)
                zThreeWnd._mInstance = new zThreeWnd();
            return zThreeWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    //随机
    zThreeWnd.prototype.randomNum = function () {
        ThreeBox.getInstance.ClickClear();
        var a = Math.floor(Math.random() * 10);
        var b = Math.floor(Math.random() * 10);
        if (a == b) {
            if (a == 0) {
                b += 1;
            }
            else {
                b -= 1;
            }
        }
        // let c = Math.floor(Math.random()*10);
        // egret.log(`${a} : ${b} : ${c}`);
        // let item = [a,b,c];
        // for(let i=0;i<item.length;i++){
        // let obj:Circle = new Circle(item[i],i);
        // obj.y
        // }
        this._item.Gget(a).selectInfo();
        this._item.Gget(b).selectInfo();
        // this._geItem.Gget(c).selectInfo();
    };
    zThreeWnd.prototype.clearItem = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).clearInfo();
        }
    };
    //查看历史记录
    zThreeWnd.prototype.changeBox = function () {
        if (ThreeBox.historyType) {
            egret.Tween.get(this._scroView).to({ y: 0 }, 300, egret.Ease.circInOut);
            egret.Tween.get(this._boxImg).to({ rotation: 0, x: 363, y: 14 }, 300, egret.Ease.circInOut);
            ThreeBox.getInstance.hideHistoryList();
        }
        else {
            egret.Tween.get(this._scroView).to({ y: 502 }, 300, egret.Ease.circInOut);
            egret.Tween.get(this._boxImg).to({ rotation: 180, x: 385, y: 26 }, 300, egret.Ease.circInOut);
            ThreeBox.getInstance.showHistoryList();
        }
    };
    zThreeWnd.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
        this.addInterception();
        this._boxImg.rotation = 0;
        this._boxImg.x = 363;
        this._boxImg.y = 14;
    };
    zThreeWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._scroView.y = 0;
            this._boxImg.rotation = 0;
        }
    };
    zThreeWnd.prototype.addInterception = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).addInterception();
        }
    };
    zThreeWnd.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).removeInterception();
        }
    };
    zThreeWnd.prototype.joinCss = function () {
        for (var i = 0; i < 10; i++) {
            var obj = new Circle(i, 0);
            this._mContain.addChild(obj);
            this._item.Gput(i, obj);
            if (i < 5) {
                obj.y = 144 + 40;
                obj.x = 116 + 120 * i + 40;
            }
            else {
                obj.y = 244 + 40;
                obj.x = 116 + 120 * (i - 5) + 40;
            }
        }
    };
    zThreeWnd.prototype.addScoll = function () {
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 195;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    zThreeWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._scroView.height);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    };
    return zThreeWnd;
}(egret.DisplayObjectContainer));
__reflect(zThreeWnd.prototype, "zThreeWnd");
//# sourceMappingURL=zThreeWnd.js.map