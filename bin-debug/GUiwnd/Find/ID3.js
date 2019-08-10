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
var ID3 = (function (_super) {
    __extends(ID3, _super);
    function ID3() {
        var _this = _super.call(this) || this;
        _this.imgItem = [];
        _this._topUI = new TopUI("活动详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        var btn1 = new egret.Bitmap();
        _this._mContain.addChild(btn1);
        RES.getResByUrl("resource/assets/images/ui/hphy1.png", function (e) { btn1.$setBitmapData(e); }, _this);
        var btn2 = new egret.Bitmap();
        _this._mContain.addChild(btn2);
        btn2.y = 1110;
        RES.getResByUrl("resource/assets/images/ui/hphy2.png", function (e) { btn2.$setBitmapData(e); }, _this);
        // let btn3 = new egret.Bitmap();
        // this._mContain.addChild(btn3);
        // btn3.y = 744+626;
        // RES.getResByUrl(`resource/assets/images/ui/zhuli3.png`,(e)=>{btn3.$setBitmapData(e); },this);
        _this._btn = new egret.Bitmap();
        _this._mContain.addChild(_this._btn);
        _this._btn.y = 2162 - 155;
        _this._btn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", function (e) {
            _this._btn.$setBitmapData(e);
            _this._btn.x = (GameMain.getInstance.StageWidth - _this._btn.width) * 0.5;
        }, _this);
        var text = ToolMrg.getText(0, 2162 - 155 + 30, 34, 0xffffff, GameMain.getInstance.StageWidth);
        _this._mContain.addChild(text);
        text.textAlign = egret.HorizontalAlign.CENTER;
        text.text = "复制分享链接";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(ID3, "getInstance", {
        get: function () {
            if (ID3._mInstance == undefined)
                ID3._mInstance = new ID3();
            return ID3._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    ID3.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._btn) {
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this._link;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            Alertpaner.getInstance.show("复制成功");
        }
    };
    ID3.prototype.setLink = function (str) {
        this._link = str;
    };
    ID3.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        Share_Link.getInstance.sendHttp(UserData.getInstance.userId);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    ID3.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._scroView.setScrollTop(0);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    ID3.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
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
    ID3.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xf5f5f7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ID3;
}(egret.DisplayObjectContainer));
__reflect(ID3.prototype, "ID3");
//# sourceMappingURL=ID3.js.map