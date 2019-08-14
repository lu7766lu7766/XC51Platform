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
/**客服 */
var KeFuWnd = (function (_super) {
    __extends(KeFuWnd, _super);
    function KeFuWnd() {
        var _this = _super.call(this) || this;
        _this.QQ = "";
        _this.Skype = "caizhan51";
        _this.sugram = "964940779";
        _this.touchEnabled = true;
        _this._topUI = new TopUI("联系客服");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._btn1 = new egret.Bitmap();
        _this.addChild(_this._btn1);
        _this._btn1.y = 182;
        _this._link1 = new egret.Bitmap();
        _this.addChild(_this._link1);
        _this._link1.touchEnabled = true;
        _this._link1.y = 634;
        // RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png",(e)=>{
        //     this._link1.$setBitmapData(e); 
        //     this._link1.x = (GameMain.getInstance.StageWidth - this._link1.width)*0.5;
        // },this);
        _this._link2 = new egret.Bitmap();
        _this.addChild(_this._link2);
        _this._link2.touchEnabled = true;
        _this._link2.y = 774;
        RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png", function (e) {
            _this._link2.$setBitmapData(e);
            _this._link2.x = (GameMain.getInstance.StageWidth - _this._link2.width) * 0.5;
        }, _this);
        _this._link3 = new egret.Bitmap();
        _this.addChild(_this._link3);
        _this._link3.touchEnabled = true;
        _this._link3.y = 914;
        RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png", function (e) {
            _this._link3.$setBitmapData(e);
            _this._link3.x = (GameMain.getInstance.StageWidth - _this._link3.width) * 0.5;
        }, _this);
        _this._img1 = new egret.Bitmap();
        _this.addChild(_this._img1);
        RES.getResByUrl("resource/assets/images/ui/kfqq_mine@2x.png", function (e) {
            _this._img1.$setBitmapData(e);
            _this._img1.y = 664;
        }, _this);
        _this._img1.x = 166;
        _this._img2 = new egret.Bitmap();
        _this.addChild(_this._img2);
        _this._img2.x = 166;
        RES.getResByUrl("resource/assets/images/ui/skype_mine@2x.png", function (e) {
            _this._img2.$setBitmapData(e);
            _this._img2.y = 800;
        }, _this);
        _this._img3 = new egret.Bitmap();
        _this.addChild(_this._img3);
        _this._img3.x = 166;
        RES.getResByUrl("resource/assets/images/ui/sugram_mine@2x.png", function (e) {
            _this._img3.$setBitmapData(e);
            _this._img3.y = 940;
        }, _this);
        _this._text1 = ToolMrg.getText(234, 660 + 7, 36, 0xF72E52, 560);
        _this.addChild(_this._text1);
        // wx.textAlign = egret.HorizontalAlign.CENTER;
        _this._text1.text = "QQ：2842774615";
        _this._text2 = ToolMrg.getText(234, 800 + 7, 36, 0xF72E52, 560);
        _this.addChild(_this._text2);
        // qq.textAlign = egret.HorizontalAlign.CENTER;
        _this._text2.text = "Skype：" + _this.Skype;
        _this._text3 = ToolMrg.getText(234, 940 + 7, 36, 0xF72E52, 560);
        _this.addChild(_this._text3);
        // phone.textAlign = egret.HorizontalAlign.CENTER;
        _this._text3.text = "sugram：" + _this.sugram;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(KeFuWnd, "getInstance", {
        get: function () {
            if (KeFuWnd._mInstance == undefined)
                KeFuWnd._mInstance = new KeFuWnd();
            return KeFuWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    KeFuWnd.prototype.show = function (tool) {
        var _this = this;
        this._mBool = tool;
        if (this.parent == undefined)
            GUIManager.getInstance.mostLay.addChild(this);
        this.addInterception();
        if (tool == undefined) {
            this._link2.visible = false;
            this._link3.visible = false;
            this._text2.visible = false;
            this._text3.visible = false;
            this._img2.visible = false;
            this._img3.visible = false;
            // this._text1.text = "QQ：710992037";
            this.QQ = "710992037";
            RES.getResByUrl("resource/assets/images/ui/kftx_mine@2x1.png", function (e) {
                _this._btn1.$setBitmapData(e);
                _this._btn1.x = (GameMain.getInstance.StageWidth - _this._btn1.width) * 0.5;
            }, this);
            RES.getResByUrl("resource/assets/images/ui/qwzxkf_mine@2x.png", function (e) {
                _this._link1.$setBitmapData(e);
                _this._link1.x = (GameMain.getInstance.StageWidth - _this._link1.width) * 0.5;
            }, this);
            this._text1.text = "";
            this._img1.visible = false;
        }
        else {
            this._link2.visible = true;
            this._link3.visible = true;
            this._text2.visible = true;
            this._text3.visible = true;
            this._img2.visible = true;
            this._img3.visible = true;
            // this._text1.text = "QQ：312288881";
            this.QQ = "312288881";
            RES.getResByUrl("resource/assets/images/ui/kftx_mine@2x.png", function (e) {
                _this._btn1.$setBitmapData(e);
                _this._btn1.x = (GameMain.getInstance.StageWidth - _this._btn1.width) * 0.5;
            }, this);
            RES.getResByUrl("resource/assets/images/ui/kfbt2_mine@2x.png", function (e) {
                _this._link1.$setBitmapData(e);
                _this._link1.x = (GameMain.getInstance.StageWidth - _this._link1.width) * 0.5;
            }, this);
            this._text1.text = "QQ：" + this.QQ;
            this._img1.visible = true;
        }
    };
    KeFuWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    KeFuWnd.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
        else if (e.target == this._link1) {
            if (this._mBool == undefined) {
                if (window["go2Url"]) {
                    window["go2Url"](GameValue.kfUrl);
                }
                // window.open("https://vm.providesupport.com/0o9t1ktmxghcq1oagixycxoww1");
            }
            else {
                //生成可复制input
                var input = document.createElement("input");
                //需复制内容
                input.value = this.QQ;
                document.body.appendChild(input);
                input.select();
                input.setSelectionRange(0, input.value.length),
                    document.execCommand('Copy');
                document.body.removeChild(input);
                Alertpaner.getInstance.show("复制成功");
            }
        }
        else if (e.target == this._link2) {
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this.Skype;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            Alertpaner.getInstance.show("复制成功");
        }
        else if (e.target == this._link3) {
            //生成可复制input
            var input = document.createElement("input");
            //需复制内容
            input.value = this.sugram;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, input.value.length),
                document.execCommand('Copy');
            document.body.removeChild(input);
            Alertpaner.getInstance.show("复制成功");
        }
    };
    KeFuWnd.prototype.addInterception = function () {
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link3.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    KeFuWnd.prototype.removeInterception = function () {
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link1.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._link3.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    /**适配处理 */
    KeFuWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return KeFuWnd;
}(egret.DisplayObjectContainer));
__reflect(KeFuWnd.prototype, "KeFuWnd");
//# sourceMappingURL=KeFuWnd.js.map