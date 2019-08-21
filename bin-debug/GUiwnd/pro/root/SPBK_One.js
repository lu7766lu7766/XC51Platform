var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
篮球单关
http://192.168.20.23/ticket/test/bk_One.php?t=   //2=>让分胜负 3=>胜负 4=>大小分 5=>胜分差

返回t和数据列表
 */
var SPBK_One = (function () {
    function SPBK_One() {
        var _this = this;
        /**type*/
        this._mtype = 2;
        /**是否可以发送 5秒请求一次*/
        this._mIsSend = [0, 0, 0, 0, 0, 0];
        /**父类对象 */
        this._mParent = new GHashMap();
        this.data = new HttpData();
        this.data.mKey = "SPBK_One";
        GTimerMag.getInstance.addTimerTask("SPBK_One", 9999999, GameValue.httpSendTime, function () {
            _this._mIsSend[_this._mtype] = 0;
            _this.sendHttp(_this._mtype, _this._mParent[_this._mtype], true);
        }, this);
    }
    Object.defineProperty(SPBK_One, "getInstance", {
        get: function () {
            if (SPBK_One._mInstance == undefined)
                SPBK_One._mInstance = new SPBK_One();
            return SPBK_One._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     * 2=>让分胜负 3=>胜负 4=>大小分 5=>胜分差
     */
    SPBK_One.prototype.sendHttp = function (type, obj, bool) {
        this._mtype = type;
        if (obj == undefined || obj.parent == undefined || (this._mIsSend[type] == 1 && BasketballDataMrg.getInstance.getCJDGList(type).size > 0)) {
            return;
        }
        if (SPBtOnePass.getInstance.getDGList(type).size <= 0)
            LoadtoWaitWnd.getInstance.show(true);
        this._mIsSend[type] = 1;
        this._mParent.Gput(type, obj);
        if (bool == true) {
            this.data.mValue = 1;
        }
        else {
            this.data.mValue = 0;
        }
        var url = HTTPRequest.getInstance.httpHeadUrl + "/super_Bk_One.php";
        var content = "t=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    SPBK_One.prototype.backHTTP = function (res, httpObj, data) {
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
                // cf = FT_List.isSame(BasketballDataMrg.getInstance._mCJLQLBDG, map);
                BasketballDataMrg.getInstance._mCJLQLBDG.clear();
                var fb = void 0;
                var dd = void 0;
                type = text["type"];
                for (var k = 0; k < map.length; k++) {
                    var time = map[k]["time"];
                    var arr = map[k]["list"];
                    fb = BasketballDataMrg.getInstance.getCJDGDataByTime(time);
                    if (fb == undefined) {
                        fb = new GHashMap();
                    }
                    for (var i = 0; i < arr.length; i++) {
                        dd = BasketballDataMrg.getInstance.getCJDGData(time, arr[i]["id"]);
                        if (dd == undefined) {
                            dd = new BasketballData();
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
                        if (type == 2 || type == 3)
                            dd.lot_lose = arr[i]["lot_lose"];
                        else if (type == 4)
                            dd.dxFAll = arr[i]["mid"];
                        dd.no_lose = arr[i]["no_lose"];
                        dd.team_a_name = arr[i]["team_a_name"];
                        dd.team_b_name = arr[i]["team_b_name"];
                        dd.stop = arr[i]["stop"];
                        dd.stopT = arr[i]["t"];
                        fb.Gput(dd.id, dd);
                    }
                    BasketballDataMrg.getInstance.addCJDGData(time, fb);
                }
            }
            CustEventMrg.getInstance.dispatch(CustEventType.EventType_BKDG_CJList, { type: type, value: data.mValue, cf: cf });
        }
        LoadtoWaitWnd.getInstance.hide();
    };
    return SPBK_One;
}());
__reflect(SPBK_One.prototype, "SPBK_One", ["IProHandle"]);
//# sourceMappingURL=SPBK_One.js.map