var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GStatus;
(function (GStatus) {
    var GameStatus = (function () {
        function GameStatus() {
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
                GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
            }
            TenConfon.getInstance.sentConnt();
            DownWnd.getInstance.show();
            QsPhp.getInstance.sendHttp();
            GD_List.getInstance.sendHttp();
        };
        GameStatus.prototype.update = function (it) {
            FiveBox.getInstance.EndOfTime();
            ThreeBox.getInstance.EndOfTime();
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