var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 地址: /p/pl.php


res:0 	//0成功
"lst_pay":[	//转账支付类型 列表
    {
        "way_type":"2",	//支付方式
        "way_name":"微信转账支付",//支付名称
        "amt_minimum":"50",			//支付最小金额
        "amt_maximum":"3,000"		//支付最大金额
    }
]
"lst_qrcode":[
    {
        "way_type":"0",
        "way_name":"支付宝扫码",
        "amt_minimum":"50",
        "amt_maximum":"3,000"
    }
]
 */
var PayPL = (function () {
    function PayPL() {
        this.data = new HttpData();
        this.data.mKey = "PayPL";
    }
    Object.defineProperty(PayPL, "getInstance", {
        get: function () {
            if (PayPL._mInstance == undefined)
                PayPL._mInstance = new PayPL();
            return PayPL._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * 注数列表
     */
    PayPL.prototype.sendHttp = function () {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/p/pl.php";
        var content = "id=" + UserData.getInstance.userId + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    PayPL.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            if (text["res"] != "0") {
                Alertpaner.getInstance.show(text["msg"]);
            }
            else {
                RCway_Mrg.getInstance.clear();
                var lst_pay = text["info"];
                var rCway_Data = void 0;
                for (var i = 0; i < lst_pay.length; i++) {
                    rCway_Data = new RCway_Data();
                    rCway_Data.id = i;
                    rCway_Data._title = lst_pay[i]["name"];
                    rCway_Data._type = lst_pay[i]["type"];
                    rCway_Data.small = ToolMrg.getStrNum("" + lst_pay[i]["min"]);
                    rCway_Data.max = ToolMrg.getStrNum("" + lst_pay[i]["max"]);
                    rCway_Data.money = [];
                    for (var j = 0; j < lst_pay[i]["money"].length; j++) {
                        rCway_Data.money[j] = ToolMrg.getStrNum("" + lst_pay[i]["money"][j]);
                    }
                    rCway_Data.payType = 0;
                    RCway_Mrg.getInstance.addItem(i, rCway_Data);
                }
                // let lst_qrcode:Array<any> = text["lst_qrcode"];
                // let begin:number = RCway_Mrg.getInstance.getItem().size;
                // for(let i=0;i<lst_qrcode.length;i++) {
                // 	rCway_Data = new RCway_Data();
                // 	rCway_Data._title = lst_qrcode[i]["way_name"];
                // 	rCway_Data._type = lst_qrcode[i]["way_type"];
                // 	rCway_Data.small = ToolMrg.getStrNum(""+lst_qrcode[i]["amt_minimum"]);
                // 	rCway_Data.max = ToolMrg.getStrNum(""+lst_qrcode[i]["amt_maximum"]);
                // 	rCway_Data.payType = 1;
                // 	RCway_Mrg.getInstance.addItem(i+begin, rCway_Data);
                // }
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_payList);
            }
        }
    };
    return PayPL;
}());
__reflect(PayPL.prototype, "PayPL", ["IProHandle"]);
//# sourceMappingURL=PayPL.js.map