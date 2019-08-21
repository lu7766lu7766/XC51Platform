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
/**直选 */
var zxWnd = (function (_super) {
    __extends(zxWnd, _super);
    function zxWnd() {
        var _this = _super.call(this) || this;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._baiItem = new GHashMap();
        _this._shiItem = new GHashMap();
        _this._geItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this.joinCss();
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
        text.text = "每位至少选择1个号码，奖金1040元";
        _this._randomBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._randomBtn);
        RES.getResByUrl("resource/assets/images/ui/jxyz_home@2x.png", function (e) {
            _this._randomBtn.$setBitmapData(e);
            _this._randomBtn.x = GameMain.getInstance.StageWidth - _this._randomBtn.width;
            _this._randomBtn.y = 58;
        }, _this);
        _this._randomBtn.touchEnabled = true;
        _this._randomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.randomNum, _this);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(zxWnd, "getInstance", {
        get: function () {
            if (zxWnd._mInstance == undefined)
                zxWnd._mInstance = new zxWnd();
            return zxWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    //随机
    zxWnd.prototype.randomNum = function () {
        ThreeBox.getInstance.ClickClear();
        var a = Math.floor(Math.random() * 10);
        var b = Math.floor(Math.random() * 10);
        var c = Math.floor(Math.random() * 10);
        // egret.log(`${a} : ${b} : ${c}`);
        // let item = [a,b,c];
        // for(let i=0;i<item.length;i++){
        // let obj:Circle = new Circle(item[i],i);
        // obj.y
        // }
        this._baiItem.Gget(a).selectInfo();
        this._shiItem.Gget(b).selectInfo();
        this._geItem.Gget(c).selectInfo();
    };
    zxWnd.prototype.clearItem = function () {
        for (var _i = 0, _a = this._baiItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._baiItem.Gget(key).clearInfo();
        }
        for (var _b = 0, _c = this._shiItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._shiItem.Gget(key).clearInfo();
        }
        for (var _d = 0, _e = this._geItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._geItem.Gget(key).clearInfo();
        }
    };
    //查看历史记录
    zxWnd.prototype.changeBox = function () {
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
    zxWnd.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
        this.addInterception();
        this._boxImg.rotation = 0;
        this._boxImg.x = 363;
        this._boxImg.y = 14;
    };
    zxWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._scroView.y = 0;
            this._boxImg.rotation = 0;
        }
    };
    zxWnd.prototype.addInterception = function () {
        for (var _i = 0, _a = this._baiItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._baiItem.Gget(key).addInterception();
        }
        for (var _b = 0, _c = this._shiItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._shiItem.Gget(key).addInterception();
        }
        for (var _d = 0, _e = this._geItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._geItem.Gget(key).addInterception();
        }
    };
    zxWnd.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._baiItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._baiItem.Gget(key).removeInterception();
        }
        for (var _b = 0, _c = this._shiItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._shiItem.Gget(key).removeInterception();
        }
        for (var _d = 0, _e = this._geItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._geItem.Gget(key).removeInterception();
        }
    };
    zxWnd.prototype.joinCss = function () {
        var bai = new egret.Shape();
        this._mContain.addChild(bai);
        bai.graphics.beginFill(0x3894ef);
        bai.graphics.drawRoundRect(28, 144, 40, 180, 15);
        bai.graphics.endFill();
        var shi = new egret.Shape();
        this._mContain.addChild(shi);
        shi.graphics.beginFill(0x6EC858);
        shi.graphics.drawRoundRect(28, 380, 40, 180, 15);
        shi.graphics.endFill();
        var ge = new egret.Shape();
        this._mContain.addChild(ge);
        ge.graphics.beginFill(0xFF8548);
        ge.graphics.drawRoundRect(28, 618, 40, 180, 15);
        ge.graphics.endFill();
        var baiLink = new egret.Shape();
        this._mContain.addChild(baiLink);
        baiLink.graphics.beginFill(0xdedede);
        baiLink.graphics.drawRect(27, 352, 696, 1.5);
        baiLink.graphics.endFill();
        var shiLink = new egret.Shape();
        this._mContain.addChild(shiLink);
        shiLink.graphics.beginFill(0xdedede);
        shiLink.graphics.drawRect(27, 588, 696, 1.5);
        shiLink.graphics.endFill();
        var geLink = new egret.Shape();
        this._mContain.addChild(geLink);
        geLink.graphics.beginFill(0xdedede);
        geLink.graphics.drawRect(27, 826, 696, 1.5);
        geLink.graphics.endFill();
        var baiText = ToolMrg.getText(28, 144, 20, 0xffffff, 40);
        this._mContain.addChild(baiText);
        baiText.height = 180;
        baiText.textAlign = egret.HorizontalAlign.CENTER;
        baiText.verticalAlign = egret.VerticalAlign.MIDDLE;
        baiText.lineSpacing = 4;
        baiText.text = "百\n位";
        var shiText = ToolMrg.getText(28, 380, 20, 0xffffff, 40);
        this._mContain.addChild(shiText);
        shiText.height = 180;
        shiText.textAlign = egret.HorizontalAlign.CENTER;
        shiText.verticalAlign = egret.VerticalAlign.MIDDLE;
        shiText.lineSpacing = 4;
        shiText.text = "十\n位";
        var geText = ToolMrg.getText(28, 618, 20, 0xffffff, 40);
        this._mContain.addChild(geText);
        geText.height = 180;
        geText.textAlign = egret.HorizontalAlign.CENTER;
        geText.verticalAlign = egret.VerticalAlign.MIDDLE;
        geText.lineSpacing = 4;
        geText.text = "个\n位";
        for (var i = 0; i < 10; i++) {
            var obj = new Circle(i, 0);
            this._mContain.addChild(obj);
            this._baiItem.Gput(i, obj);
            if (i < 5) {
                obj.y = 144 + 40;
                obj.x = 116 + 120 * i + 40;
            }
            else {
                obj.y = 244 + 40;
                obj.x = 116 + 120 * (i - 5) + 40;
            }
        }
        for (var i = 0; i < 10; i++) {
            var obj = new Circle(i, 1);
            this._mContain.addChild(obj);
            this._shiItem.Gput(i, obj);
            if (i < 5) {
                obj.y = 380 + 40;
                obj.x = 116 + 120 * i + 40;
            }
            else {
                obj.y = 480 + 40;
                obj.x = 116 + 120 * (i - 5) + 40;
            }
        }
        for (var i = 0; i < 10; i++) {
            var obj = new Circle(i, 2);
            this._mContain.addChild(obj);
            this._geItem.Gput(i, obj);
            if (i < 5) {
                obj.y = 618 + 40;
                obj.x = 116 + 120 * i + 40;
            }
            else {
                obj.y = 718 + 40;
                obj.x = 116 + 120 * (i - 5) + 40;
            }
        }
    };
    zxWnd.prototype.addScoll = function () {
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
    zxWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        var num = 0;
        if (this._scroView.height > 910)
            num = this._scroView.height;
        else
            num = 910;
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, num);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
    };
    return zxWnd;
}(egret.DisplayObjectContainer));
__reflect(zxWnd.prototype, "zxWnd");
//# sourceMappingURL=zxWnd.js.map