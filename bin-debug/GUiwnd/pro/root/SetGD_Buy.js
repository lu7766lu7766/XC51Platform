var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
篮球下单:
http://129.204.53.154/other/test/bk_Order.php
参数
id:用户id
s:json数组

r:利润
d:宣言
type:0:不公开  1:公开  2:截止后公开  3:保密

t：1=>篮球串关 2=>单关让分胜负 3=>单关胜负 4=>单关大小分 5=>单关胜分差
m:需要支付的金额(分)

返回
  res:0 成功下单   res等于其它都代表下单失败
 */
var SetGD_Buy = (function () {
    function SetGD_Buy() {
        this.data = new HttpData();
        this.data.mKey = "SetGD_Buy";
    }
    Object.defineProperty(SetGD_Buy, "getInstance", {
        get: function () {
            if (SetGD_Buy._mInstance == undefined)
                SetGD_Buy._mInstance = new SetGD_Buy();
            return SetGD_Buy._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    SetGD_Buy.prototype.sendHttp = function (id, type, o, b, m, mold) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/gen_Order.php";
        var content = "id=" + id + "&type=" + type + "&o=" + o + "&b=" + b + "&m=" + m + "&mold=" + mold + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    SetGD_Buy.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                Alertpaner.getInstance.show(httpObj.response);
                return;
            }
            if (text["res"] == 0) {
                DmC_infoMsg.dmdetail.hide();
                PaymentWnd.getInstance.hide();
                Order_List.getInstance.sendHttp();
                MyLotteryWnd.getInstance.show(1);
                GD_List.getInstance.sendHttp();
                UserInfoPhp.getInstance.sendHttp();
                Alertpaner.getInstance.show("跟单成功");
            }
            else {
                Alertpaner.getInstance.show(text["msg"]);
                PaymentWnd.canPay = true;
            }
        }
    };
    return SetGD_Buy;
}());
__reflect(SetGD_Buy.prototype, "SetGD_Buy", ["IProHandle"]);
//# sourceMappingURL=SetGD_Buy.js.map