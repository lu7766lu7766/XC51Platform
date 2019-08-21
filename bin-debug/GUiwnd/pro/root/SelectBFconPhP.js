var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
筛选赛事界面
参数
type:1 //1=>足球 2=>篮球
返回
{
    "res": 0,
    "data": [
            {
                "id": "628", //联赛id
                "name": "挪威U19" //联赛昵称
                "type":1  // 1：一级联赛 2：竞彩 3：足彩  4：单场
            },
            {
                "id": "628",
                "name": "挪威U19"
                "type":1  // 1：一级联赛 2：竞彩 3：足彩  4：单场
            },
           ]
     "t":返回请求的type
}
 */
var SelectBFconPhP = (function () {
    function SelectBFconPhP() {
        this.data = new HttpData();
        this.data.mKey = "SelectBFconPhP";
    }
    Object.defineProperty(SelectBFconPhP, "getInstance", {
        get: function () {
            if (SelectBFconPhP._mInstance == undefined)
                SelectBFconPhP._mInstance = new SelectBFconPhP();
            return SelectBFconPhP._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    SelectBFconPhP.prototype.sendHttp = function (ntype) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/resetIcon.php";
        var content = "&type=" + ntype + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    SelectBFconPhP.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(error);
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["res"]);
            }
            else if (text["res"] == "0") {
                var type = text["t"];
                var list = text["data"];
                var datainfo = void 0;
                if (type == 1) {
                    var id1 = 1;
                    var id2 = 1;
                    var id3 = 1;
                    var id4 = 1;
                    var id5 = 1;
                    // for (let i: number = 0; i < list.length; i++) {
                    // 	datainfo = new bfinfo();
                    // 	datainfo.id = list[i]["id"];
                    // 	datainfo.name = list[i]["name"];
                    // 	datainfo.type = list[i]["type"];
                    // 	if (datainfo.type != undefined) {
                    // 		if (datainfo.type == 1) {//一级联赛
                    // 			selectFootInfoData.getInstance.getlist1().Gput(id2, datainfo);
                    // 			id2++;
                    // 		} else if (datainfo.type == 2) {//2：竞彩
                    // 			selectFootInfoData.getInstance.getlist2().Gput(id3, datainfo);
                    // 			id3++;
                    // 		} else if (datainfo.type == 3) {//3：足彩 
                    // 			selectFootInfoData.getInstance.getlist3().Gput(id4, datainfo);
                    // 			id4++;
                    // 		} else if (datainfo.type == 4) {//4：单场
                    // 			selectFootInfoData.getInstance.getlist4().Gput(id5, datainfo);
                    // 			id5++;
                    // 		}
                    // 		selectFootInfoData.getInstance.getlist().Gput(id1, datainfo);
                    // 		id1++;
                    // 	}
                    // }
                }
                else if (type == 2) {
                    for (var i = 0; i < list.length; i++) {
                        datainfo = new bfinfo();
                        datainfo.id = list[i]["id"];
                        datainfo.name = list[i]["name"];
                        datainfo.type = list[i]["type"];
                        var id1 = 1;
                        if (datainfo.type != undefined) {
                            selectBaketInfoData.getInstance.getlist().Gput(id1, datainfo);
                            id1++;
                        }
                    }
                }
            }
        }
    };
    return SelectBFconPhP;
}());
__reflect(SelectBFconPhP.prototype, "SelectBFconPhP", ["IProHandle"]);
//# sourceMappingURL=SelectBFconPhP.js.map