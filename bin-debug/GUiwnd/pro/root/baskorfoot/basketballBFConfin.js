var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *

http://192.168.20.23/ticket/api/P10900.php
篮球即时显示数据
返回t和数据列表
 */
var basketballBFConfin = (function () {
    function basketballBFConfin() {
        this.data = new HttpData();
        this.data.mKey = "basketballBFConfin";
    }
    Object.defineProperty(basketballBFConfin, "getInstance", {
        get: function () {
            if (basketballBFConfin._mInstance == undefined)
                basketballBFConfin._mInstance = new basketballBFConfin();
            return basketballBFConfin._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    basketballBFConfin.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'bk_Time.php';
        var content = "id=" + UserData.getInstance.userId + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    basketballBFConfin.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var listlistArray = text['data'];
            // BasketballConfinData.getInstance.hideData();
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
                var color = objdata["color"];
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
                data1.color = color;
                data1.zhujie1 = a1;
                data1.zhujie2 = a2;
                data1.zhujie3 = a3;
                data1.zhujie4 = a4;
                data1.kejie1 = b1;
                data1.kejie2 = b2;
                data1.kejie3 = b3;
                data1.kejie4 = b4;
                BasketballConfinData.getInstance.getlist().Gput(i, data1);
            }
            basketball1.getInstance.initallInfo();
            BakorfallViewMrg.getInstance.setGUSN();
        }
    };
    return basketballBFConfin;
}());
__reflect(basketballBFConfin.prototype, "basketballBFConfin", ["IProHandle"]);
//# sourceMappingURL=basketballBFConfin.js.map