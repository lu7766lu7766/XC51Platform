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
/**二维码 */
var CodeWndphoto = (function (_super) {
    __extends(CodeWndphoto, _super);
    function CodeWndphoto() {
        var _this = _super.call(this) || this;
        _this.setDB();
        return _this;
    }
    Object.defineProperty(CodeWndphoto, "getInstance", {
        get: function () {
            if (CodeWndphoto._mInstance == undefined)
                CodeWndphoto._mInstance = new CodeWndphoto();
            return CodeWndphoto._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    CodeWndphoto.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.mostLay.addChild(this);
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            Alertpaner.getInstance.show("请截图保存，并分享给好友");
        }
    };
    CodeWndphoto.prototype.touchDown = function (e) {
        if (e.target == this._mShareC) {
            this.hide();
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    CodeWndphoto.prototype.hide = function () {
        this.clearCode();
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    CodeWndphoto.prototype.showCode = function () {
        if (this._codeRect2 == undefined) {
            this._codeRect2 = new egret.Rectangle(570, 395 + 382 + 160, 170, 170);
        }
        if (this._codeImg2 == undefined) {
            var gameDiv = document.getElementById("gameDiv");
            this._codeImg2 = document.createElement("img");
            if (GameValue.isDebug == false) {
                this._codeImg2.src = "data:image/png;base64," + GetShare.getInstance.imgs;
            }
            else {
                //this._codeImg2.src = "resource/assets/images/ui/kfCode.png";
                // this._codeImg2.src = "resource/assets/images/ui/ewm_online_mine.png";
            }
            this._codeImg2.style.position = "absolute";
            gameDiv.appendChild(this._codeImg2);
        }
        this._codeImg2.style.display = "inline";
        this.onResize();
        GameMain.getInstance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    CodeWndphoto.prototype.clearCode = function () {
        if (this._codeImg2) {
            this._codeImg2.style.display = "none";
        }
        GameMain.getInstance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
    };
    CodeWndphoto.prototype.onResize = function () {
        if (this._codeImg2 && this._codeRect2) {
            var wScale = document.body.clientWidth / 750;
            var hScale = document.body.clientHeight / GameMain.getInstance.StageHeight;
            this._codeImg2.style.width = this._codeRect2.width * wScale + "px";
            this._codeImg2.style.height = this._codeRect2.height * hScale + "px";
            this._codeImg2.style.left = this._codeRect2.x * wScale + "px";
            this._codeImg2.style.top = this._codeRect2.y * hScale + "px";
        }
    };
    /**适配处理 */
    CodeWndphoto.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this._mShareC.touchEnabled = true;
        // this.addChildAt(this._mShareC, 0);
    };
    return CodeWndphoto;
}(egret.DisplayObjectContainer));
__reflect(CodeWndphoto.prototype, "CodeWndphoto");
//# sourceMappingURL=CodeWndphoto.js.map