var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *

http://192.168.20.23/ticket/api/self_Appoint.php
足球和篮球 关注显示数据
返回t和数据列表
 */
var FootandBaskGZConfin = (function () {
    function FootandBaskGZConfin() {
        this.data = new HttpData();
        this.data.mKey = "FootandBaskGZConfin";
    }
    Object.defineProperty(FootandBaskGZConfin, "getInstance", {
        get: function () {
            if (FootandBaskGZConfin._mInstance == undefined)
                FootandBaskGZConfin._mInstance = new FootandBaskGZConfin();
            return FootandBaskGZConfin._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * type 1 足球 2篮球
     */
    FootandBaskGZConfin.prototype.sendHttp = function (type) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'self_Appoint.php';
        var content = "id=" + UserData.getInstance.userId + "&type=" + type + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    FootandBaskGZConfin.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var listlistArray = text['data'];
            var type = Number(text['type']);
            if (type == 1) {
                FootballConfinData.getInstance.hideData3();
                for (var i = 1; i <= listlistArray.length; i++) {
                    var objdata = listlistArray[i - 1];
                    var data1 = new footballCofObj();
                    var id = Number(objdata['id']);
                    var timer = objdata["time"];
                    var leftname = objdata["team_a_name"];
                    var leftteam_a_icon = objdata["team_a_icon"];
                    var rightname = objdata["team_b_name"];
                    var rightteam_a_icon = objdata["team_b_icon"];
                    var bfa = objdata["team_a_score"];
                    var bfb = objdata["team_b_score"];
                    var zbfen = "";
                    if (bfa != "-" || bfb != "-") {
                        zbfen = bfa + ":" + bfb;
                    }
                    else {
                        zbfen = "";
                    }
                    var lsaiName = objdata["league_name"];
                    var statezt = Number(objdata["status"]);
                    var mainBBfen = "";
                    var bcFena = objdata["h_score_a"];
                    var bcFenb = objdata["h_score_b"];
                    if (bcFena != "" && bcFenb != "") {
                        mainBBfen = bcFena + ":" + bcFenb;
                    }
                    var bstimer = objdata["to"];
                    var team_a_red_card = objdata["team_a_red_card"];
                    var team_b_red_card = objdata["team_b_red_card"];
                    var team_a_yellow_card = objdata["team_a_yellow_card"];
                    var team_b_yellow_card = objdata["team_b_yellow_card"];
                    var isAppoint = objdata["isAppoint"];
                    var day = objdata["day"];
                    data1.id = id;
                    data1.timer = timer;
                    data1.name = lsaiName;
                    data1.leftIcon = leftteam_a_icon;
                    data1.rightIcon = rightteam_a_icon;
                    data1.leftname = leftname;
                    data1.rightname = rightname;
                    data1.bfText = zbfen;
                    data1.status = statezt;
                    data1.touding = bstimer;
                    data1.bcBF = mainBBfen;
                    data1.leftrednum = team_a_red_card;
                    data1.leftyellownum = team_a_yellow_card;
                    data1.rightrednum = team_b_red_card;
                    data1.rightyellownum = team_b_yellow_card;
                    data1.ifgz = isAppoint;
                    data1.rqday = day;
                    FootballConfinData.getInstance.getlist3().Gput(i, data1);
                }
            }
            else {
                BasketballConfinData.getInstance.hideData3();
                for (var i = 1; i <= listlistArray.length; i++) {
                    var objdata = listlistArray[i - 1];
                    var data1 = new basketballCofObj();
                    var id = Number(objdata['id']);
                    var timer = objdata["time"];
                    var team_a_name = objdata["team_a_name"];
                    var team_b_name = objdata["team_b_name"];
                    var team_a_score = objdata["team_a_score"];
                    var team_b_score = objdata["team_b_score"];
                    var total_score = objdata["total_score"];
                    var fc = objdata["fc"];
                    var lot_lose = objdata["lot_lose"];
                    if (team_a_score == "-") {
                        team_a_score = "";
                    }
                    if (team_b_score == "-") {
                        team_b_score = "";
                    }
                    var league_name = objdata["league_name"];
                    var status_1 = Number(objdata["status"]);
                    var isAppoint = objdata["isAppoint"];
                    var a1 = objdata["team_a_1_score"];
                    if (a1 == "0")
                        a1 = "";
                    var a2 = objdata["team_a_2_score"];
                    if (a2 == "0")
                        a2 = "";
                    var a3 = objdata["team_a_3_score"];
                    if (a3 == "0")
                        a3 = "";
                    var a4 = objdata["team_a_4_score"];
                    if (a4 == "0")
                        a4 = "";
                    var b1 = objdata["team_a_1_score"];
                    if (b1 == "0")
                        b1 = "";
                    var b2 = objdata["team_a_2_score"];
                    if (b2 == "0")
                        b2 = "";
                    var b3 = objdata["team_a_3_score"];
                    if (b3 == "0")
                        b3 = "";
                    var b4 = objdata["team_a_4_score"];
                    if (b4 == "0")
                        b4 = "";
                    data1.id = id;
                    data1.timer = timer;
                    data1.name = league_name;
                    data1.leftname = team_a_name;
                    data1.rightname = team_b_name;
                    data1.team_a_score = team_a_score;
                    data1.team_b_score = team_b_score;
                    data1.bfText = total_score;
                    data1.fc = fc;
                    data1.rf = lot_lose;
                    data1.ifgz = Number(isAppoint);
                    data1.status = Number(status_1);
                    data1.zhujie1 = a1;
                    data1.zhujie2 = a2;
                    data1.zhujie3 = a3;
                    data1.zhujie4 = a4;
                    data1.kejie1 = b1;
                    data1.kejie2 = b2;
                    data1.kejie3 = b3;
                    data1.kejie4 = b4;
                    BasketballConfinData.getInstance.getlist3().Gput(i, data1);
                }
            }
        }
        BakorfallViewMrg.getInstance.refreshallInfo();
    };
    return FootandBaskGZConfin;
}());
__reflect(FootandBaskGZConfin.prototype, "FootandBaskGZConfin", ["IProHandle"]);
//# sourceMappingURL=FootandBaskGZConfin.js.map