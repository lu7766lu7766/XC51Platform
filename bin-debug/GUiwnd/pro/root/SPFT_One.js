var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
足球单关
http://192.168.20.23/ticket/test/SPFT_One.php?t=   //2=>单关胜平负 3=>单关进球数 4=>单关比分 5=>单关半全场

返回t和数据列表
 */
var SPFT_One = (function () {
    function SPFT_One() {
        var _this = this;
        /**type*/
        this._mtype = 2;
        /**是否可以发送 5秒请求一次*/
        this._mIsSend = [0, 0, 0, 0, 0, 0];
        /**父类对象 */
        this._mParent = new GHashMap();
        this.data = new HttpData();
        this.data.mKey = "SPFT_One";
        GTimerMag.getInstance.addTimerTask("SPFT_One", 9999999, GameValue.httpSendTime, function () {
            _this._mIsSend[_this._mtype] = 0;
            _this.sendHttp(_this._mtype, _this._mParent[_this._mtype], true);
        }, this);
    }
    Object.defineProperty(SPFT_One, "getInstance", {
        get: function () {
            if (SPFT_One._mInstance == undefined)
                SPFT_One._mInstance = new SPFT_One();
            return SPFT_One._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     * 2=>单关胜平负 3=>单关进球数 4=>单关比分 5=>单关半全场
     */
    SPFT_One.prototype.sendHttp = function (type, obj, bool) {
        this._mtype = type;
        if (obj == undefined || obj.parent == undefined || (this._mIsSend[type] == 1 && FootballDataMrg.getInstance.getCJDGList(type).size > 0)) {
            return;
        }
        if (SPOnePass.getInstance.getDGList(type).size <= 0)
            LoadtoWaitWnd.getInstance.show(true);
        this._mIsSend[type] = 1;
        this._mParent.Gput(type, obj);
        if (bool == true) {
            this.data.mValue = 1;
        }
        else {
            this.data.mValue = 0;
        }
        var url = HTTPRequest.getInstance.httpHeadUrl + "/super_Ft.php";
        var content = "t=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    SPFT_One.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var type = 2;
            var cf = 0;
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                var map = text["map"];
                // cf = FT_List.isSame(FootballDataMrg.getInstance._mCJZQLBDG, map);
                FootballDataMrg.getInstance._mCJZQLBDG.clear();
                var fb = void 0;
                var dd = void 0;
                type = text["type"];
                for (var k = 0; k < map.length; k++) {
                    var time = map[k]["time"];
                    var arr = map[k]["list"];
                    fb = FootballDataMrg.getInstance.getCJDGDataByTime(time);
                    if (fb == undefined) {
                        fb = new GHashMap();
                    }
                    for (var i = 0; i < arr.length; i++) {
                        dd = FootballDataMrg.getInstance.getCJDGData(time, arr[i]["id"]);
                        if (dd == undefined) {
                            dd = new FootballData();
                        }
                        var str = "" + (i + 1);
                        if (str.length == 1)
                            str = "00" + str;
                        else if (str.length == 2)
                            str = "0" + str;
                        dd.code = str;
                        dd.id = arr[i]["id"];
                        dd.time = time;
                        for (var j = text["min"]; j <= text["max"]; j++) {
                            dd.listSX[j] = arr[i][j];
                        }
                        dd.day = arr[i]["day"];
                        dd.league_name = arr[i]["league_name"];
                        dd.lot_lose = arr[i]["lot_lose"];
                        dd.no_lose = arr[i]["no_lose"];
                        dd.team_a_name = arr[i]["team_a_name"];
                        dd.team_b_name = arr[i]["team_b_name"];
                        dd.stop = arr[i]["stop"];
                        dd.stopT = arr[i]["t"];
                        fb.Gput(dd.id, dd);
                    }
                    FootballDataMrg.getInstance.addCJDGData(time, fb);
                }
            }
            CustEventMrg.getInstance.dispatch(CustEventType.EventType_CJFTDG_List, { type: type, value: data.mValue, cf: cf });
        }
        LoadtoWaitWnd.getInstance.hide();
    };
    return SPFT_One;
}());
__reflect(SPFT_One.prototype, "SPFT_One", ["IProHandle"]);
//# sourceMappingURL=SPFT_One.js.map