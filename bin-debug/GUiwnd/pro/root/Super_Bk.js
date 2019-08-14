var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 篮球：
http://129.204.53.154/other/test/bk_List.php
           "time": "2019-07-03 周三",  //日期
            "list": [   //列表数组
                {
                    "0": "",  //不让分客胜
                    "1": "",  //不让分主胜
                    "2": "1.7",  //让分客胜
                    "3": "1.7",  //让分主胜
                    "id": "354638",  //赛事id
                    "day": "周二",  //周几
                    "league_name": "NBA",  //联赛
                    "lot_lose": "-1.50",    //让分
                    "team_a_name": "猛龙",   //主队昵称
                    "team_b_name": "勇士",   //客队昵称
                    "stop": "08:50"     //停止销售时间
                },
 */
var Super_Bk = (function () {
    function Super_Bk() {
        var _this = this;
        /**是否可以发送 5秒请求一次*/
        this._mIsSend = true;
        /** 只保存刷新前数组 */
        this.listSX = new GHashMap();
        this.data = new HttpData();
        this.data.mKey = "Super_Bk";
        GTimerMag.getInstance.addTimerTask("Super_Bk", 9999999, GameValue.httpSendTime, function () {
            _this._mIsSend = true;
            _this.sendHttp(_this._mParent, true);
        }, this);
    }
    Object.defineProperty(Super_Bk, "getInstance", {
        get: function () {
            if (Super_Bk._mInstance == undefined)
                Super_Bk._mInstance = new Super_Bk();
            return Super_Bk._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    Super_Bk.prototype.sendHttp = function (obj, bool) {
        this._mParent = obj;
        if (obj == undefined || this._mParent.parent == undefined || (this._mIsSend == false && BasketballDataMrg.getInstance._mLQLB.size > 0)) {
            return;
        }
        if (BasketballDataMrg.getInstance._mLQLB.size <= 0)
            LoadtoWaitWnd.getInstance.show(true);
        if (bool == true) {
            this.data.mValue = 1;
        }
        else {
            this.data.mValue = 0;
        }
        this._mIsSend = false;
        var url = HTTPRequest.getInstance.httpHeadUrl + "/super_Bk.php";
        var content = "v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    Super_Bk.prototype.backHTTP = function (res, httpObj, data) {
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
                cf = FT_List.isSame(BasketballDataMrg.getInstance._mCJLQLB, map);
                for (var _i = 0, _a = BasketballDataMrg.getInstance._mCJLQLB.keys; _i < _a.length; _i++) {
                    var key = _a[_i];
                    var obj = BasketballDataMrg.getInstance._mCJLQLB.Gget(key);
                    for (var _b = 0, _c = obj.keys; _b < _c.length; _b++) {
                        var akey = _c[_b];
                        this.listSX.Gput(obj.Gget(akey).id, obj.Gget(akey));
                    }
                }
                BasketballDataMrg.getInstance._mCJLQLB.clear();
                var fb = void 0;
                var dd = void 0;
                for (var k = 0; k < map.length; k++) {
                    var time = map[k]["time"];
                    var arr = map[k]["list"];
                    fb = BasketballDataMrg.getInstance.getCJDataByTime(time);
                    if (fb == undefined) {
                        fb = new GHashMap();
                    }
                    for (var i = 0; i < arr.length; i++) {
                        dd = BasketballDataMrg.getInstance.getCJData(time, arr[i]["id"]);
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
                        var iList = [];
                        //刷新保存之前listSX值再替换 刷新只会刷新0-5 6-53不会变
                        for (var _d = 0, _e = this.listSX.keys; _d < _e.length; _d++) {
                            var key = _e[_d];
                            if (this.listSX.Gget(key).id == dd.id)
                                iList = this.listSX.Gget(key).listSX;
                        }
                        // for(let j=0;j<4;j++) {
                        // 	iList[j] = arr[i][j];
                        // }
                        // for(let j=0;j<4;j++) {
                        // 	dd.listSX[j] = arr[i][j];
                        // }
                        iList[16] = arr[i][16];
                        iList[17] = arr[i][17];
                        iList[2] = arr[i][2];
                        iList[3] = arr[i][3];
                        dd.listSX = iList;
                        dd.dxFAll = arr[i]["mid"];
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
                    BasketballDataMrg.getInstance.addCJData(time, fb);
                }
            }
        }
        CustEventMrg.getInstance.dispatch(CustEventType.EventType_BK_CJList, { value: data.mValue });
        LoadtoWaitWnd.getInstance.hide();
    };
    return Super_Bk;
}());
__reflect(Super_Bk.prototype, "Super_Bk", ["IProHandle"]);
//# sourceMappingURL=Super_Bk.js.map