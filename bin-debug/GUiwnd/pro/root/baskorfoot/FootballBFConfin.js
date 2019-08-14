var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *

http://192.168.20.23/ticket/api/P10900.php
足球即时显示数据
返回t和数据列表
 */
var FootballBFConfin = (function () {
    function FootballBFConfin() {
        this.data = new HttpData();
        this.data.mKey = "FootballBFConfin";
    }
    Object.defineProperty(FootballBFConfin, "getInstance", {
        get: function () {
            if (FootballBFConfin._mInstance == undefined)
                FootballBFConfin._mInstance = new FootballBFConfin();
            return FootballBFConfin._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    FootballBFConfin.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'ft_Time.php';
        var content = "id=" + UserData.getInstance.userId + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    FootballBFConfin.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var listlistArray = text['data'];
            // FootballConfinData.getInstance.hideData();
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
                    mainBBfen = "半场" + bcFena + ":" + bcFenb;
                }
                var bstimer = objdata["to"];
                var team_a_red_card = objdata["team_a_red_card"];
                var team_b_red_card = objdata["team_b_red_card"];
                var team_a_yellow_card = objdata["team_a_yellow_card"];
                var team_b_yellow_card = objdata["team_b_yellow_card"];
                var isAppoint = objdata["isAppoint"];
                var day = objdata["day"];
                var clolr = objdata["color"];
                data1.type = objdata["type"];
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
                data1.color = clolr;
                FootballConfinData.getInstance.getlist().Gput(i, data1);
            }
            football1.getInstance.initallInfo();
            BakorfallViewMrg.getInstance.setGUSN();
        }
    };
    return FootballBFConfin;
}());
__reflect(FootballBFConfin.prototype, "FootballBFConfin", ["IProHandle"]);
//# sourceMappingURL=FootballBFConfin.js.map