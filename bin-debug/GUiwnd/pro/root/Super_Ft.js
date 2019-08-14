var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 足球：
http://192.168.20.23/ticket/test/Super_Ft.php
           "time": "2019-07-03 周三",  //日期
            "list": [   //列表数组
                {
                    "0": "4.4",  //不让球的赢赔率
                    "1": "2.37", //不让球的平赔率
                    "2": "1.96", //不让球的负赔率
                    "3": "1.57",  //让球的赢赔率
                    "4": "3.35",  //让球的平赔率
                    "5": "4.5",   //让球的负赔率
                    "id": "1702572",   //赛事ID
                    "day": "周三",      //周几
                    "league_name": "非洲杯",  //联赛昵称
                    "lot_lose": "1",      //让球数
                     "no_lose": "0",      //不让球数
                    "team_a_name": "贝宁",  //队伍A昵称
                    "team_b_name": "喀麦隆",  //队伍B昵称
                    "stop": "23:50"。        //停止销售的时间
                },
 */
var Super_Ft = (function () {
    function Super_Ft() {
        var _this = this;
        /**是否可以发送 5秒请求一次*/
        this._mIsSend = true;
        /** 只保存刷新前数组 */
        this.listSX = new GHashMap();
        this.data = new HttpData();
        this.data.mKey = "Super_Ft";
        GTimerMag.getInstance.addTimerTask("Super_Ft", 9999999, GameValue.httpSendTime, function () {
            _this._mIsSend = true;
            _this.sendHttp(_this._mParent, true);
        }, this);
    }
    Object.defineProperty(Super_Ft, "getInstance", {
        get: function () {
            if (Super_Ft._mInstance == undefined)
                Super_Ft._mInstance = new Super_Ft();
            return Super_Ft._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Super_Ft.prototype.sendHttp = function (obj, bool) {
        this._mParent = obj;
        if (obj == undefined || this._mParent.parent == undefined || (this._mIsSend == false && FootballDataMrg.getInstance._mZQLB.size > 0)) {
            return;
        }
        if (FootballDataMrg.getInstance._mZQLB.size <= 0)
            LoadtoWaitWnd.getInstance.show(true);
        if (bool == true) {
            this.data.mValue = 1;
        }
        else {
            this.data.mValue = 0;
        }
        this._mIsSend = false;
        var url = HTTPRequest.getInstance.httpHeadUrl + "/super_Ft.php";
        var content = "t=" + 1 + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Super_Ft.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var cf = 0;
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                var map = text["map"];
                cf = FT_List.isSame(FootballDataMrg.getInstance._mCJZQLB, map);
                //先抽取数组里的listSX保存,再清除数组
                this.listSX.clear();
                for (var _i = 0, _a = FootballDataMrg.getInstance._mCJZQLB.keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    var obj = FootballDataMrg.getInstance._mCJZQLB.Gget(key);
                    for (var _b = 0, _c = obj.keys; _b < _c.length; _b++) {
                        var akey = _c[_b];
                        this.listSX.Gput(obj.Gget(akey).id, obj.Gget(akey));
                    }
                }
                FootballDataMrg.getInstance._mCJZQLB.clear();
                var fb = void 0;
                var dd = void 0;
                for (var k = 0; k < map.length; k++) {
                    var time = map[k]["time"];
                    var arr = map[k]["list"];
                    fb = FootballDataMrg.getInstance.getCJDataByTime(time);
                    if (fb == undefined) {
                        fb = new GHashMap();
                    }
                    for (var i = 0; i < arr.length; i++) {
                        dd = FootballDataMrg.getInstance.getCJData(time, arr[i]["id"]);
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
                        var iList = [];
                        //刷新保存之前listSX值再替换 刷新只会刷新0-5 6-53不会变
                        for (var _d = 0, _e = this.listSX.keys; _d < _e.length; _d++) {
                            var key = _e[_d];
                            if (this.listSX.Gget(key).id == dd.id)
                                iList = this.listSX.Gget(key).listSX;
                        }
                        for (var j = 0; j < 6; j++) {
                            iList[j] = arr[i][j];
                        }
                        dd.listSX = iList;
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
                    FootballDataMrg.getInstance.addCJData(time, fb);
                }
            }
            CustEventMrg.getInstance.dispatch(CustEventType.EventType_CJFT_List, { value: data.mValue, cf: cf });
        }
        LoadtoWaitWnd.getInstance.hide();
    };
    return Super_Ft;
}());
__reflect(Super_Ft.prototype, "Super_Ft", ["IProHandle"]);
//# sourceMappingURL=Super_Ft.js.map