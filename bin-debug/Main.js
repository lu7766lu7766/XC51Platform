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
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.call(this) || this;
        _this.once(egret.Event.ADDED_TO_STAGE, _this.init, _this);
        return _this;
    }
    Main.prototype.init = function (e) {
        egret.ImageLoader.crossOrigin = "anonymous";
        if (GameValue.isDebug == false) {
            HTTPRequest.getInstance.httpHeadUrl = window["getSUrl"]();
        }
        // this.keyListen();
        // this.iosUpDown();
        var game = new GameMain();
        this.addChild(game);
    };
    //键盘侦听
    Main.prototype.keyListen = function () {
        var that = this;
        //13
        document.addEventListener("keydown", function (event) {
            // let num = event.keyCode;
            // if(num == 13){
            //     if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
            //         ConsultMsg.detailsWnd.sendText();
            //     }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
            //         TalkofMsg.talkDetail.sendText();
            //     }
            // }
        });
    };
    //ios键盘弹出收起侦听
    Main.prototype.iosUpDown = function () {
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
            // var clientHeight = document.documentElement.clientHeight;
            // window["alertMsg"](clientHeight);
            // document.addEventListener("focusin",function(){//软键盘弹出
            // if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
            //     ConsultMsg.detailsWnd.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40 - clientHeight;
            // }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
            //     TalkofMsg.talkDetail.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40 - clientHeight;
            // }
            // });
            // document.addEventListener("focusout",function(){//软键盘收起
            //      if(GameValue.keydownNum==1 && ConsultMsg.detailsWnd.parent!=undefined){
            //         ConsultMsg.detailsWnd.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40;
            //     }else if(GameValue.keydownNum==2 && TalkofMsg.talkDetail.parent!=undefined){
            //         TalkofMsg.talkDetail.bottomContain.y = GameMain.getInstance.StageHeight - 100 - 40;
            //     }
            // });
        }
    };
    return Main;
}(egret.DisplayObjectContainer));
__reflect(Main.prototype, "Main");
//# sourceMappingURL=Main.js.map