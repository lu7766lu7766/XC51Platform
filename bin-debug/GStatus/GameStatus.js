var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GStatus;
(function (GStatus) {
    var GameStatus = (function () {
        function GameStatus() {
            this._mTime = 0;
        }
        Object.defineProperty(GameStatus, "getInstance", {
            get: function () {
                if (GameStatus._mInstance == undefined)
                    GameStatus._mInstance = new GameStatus();
                return GameStatus._mInstance;
            },
            enumerable: true,
            configurable: true
        });
        GameStatus.prototype.enterStatus = function () {
            if (UserData.getInstance.isLogin() == true) {
                LoginPhp.getInstance.sendHttp(UserData.getInstance.account, UserData.getInstance.password);
            }
            TenConfon.getInstance.sentConnt();
            DownWnd.getInstance.show();
            QsPhp.getInstance.sendHttp();
            GD_List.getInstance.sendHttp();
            TimePhp.getInstance.sendHttp();
        };
        GameStatus.prototype.update = function (it) {
            FiveBox.getInstance.EndOfTime();
            ThreeBox.getInstance.EndOfTime();
            this._mTime += it;
            if (this._mTime > 1000 && GameValue.isJ > 0) {
                this._mTime = 0;
                GameValue.isJ -= 1;
            }
            else if (this._mTime > 10000) {
                this._mTime = 0;
                TimePhp.getInstance.sendHttp();
            }
        };
        GameStatus.prototype.exitStatus = function () {
            DownWnd.getInstance.hide();
        };
        return GameStatus;
    }());
    GStatus.GameStatus = GameStatus;
    __reflect(GameStatus.prototype, "GStatus.GameStatus", ["GIGameStatus"]);
})(GStatus || (GStatus = {}));
//# sourceMappingURL=GameStatus.js.map