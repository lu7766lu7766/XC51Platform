var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
提现申请：withdraw.php
参数
id:用户ID
m:钱数（分）
c:卡号
t:1=>中奖余额 2=>发单佣金
 */
var withdrawConf = (function () {
    function withdrawConf() {
        this.data = new HttpData();
        this.data.mKey = "withdrawConf";
    }
    Object.defineProperty(withdrawConf, "getInstance", {
        get: function () {
            if (withdrawConf._mInstance == undefined)
                withdrawConf._mInstance = new withdrawConf();
            return withdrawConf._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     *
     */
    withdrawConf.prototype.sendHttp = function (money, numID, tyep) {
        var url = HTTPRequest.getInstance.httpHeadUrl + 'withdraw.php';
        var content = "id=" + UserData.getInstance.userId + "&m=" + money + "&c=" + numID + "&t=" + tyep + "&rkey=" + GameValue.orderKey + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    withdrawConf.prototype.backHTTP = function (res, httpObj, data) {
        if (res == true && httpObj.response != "") {
            var text = void 0;
            try {
                text = JSON.parse(httpObj.response);
            }
            catch (error) {
                return;
            }
            var result = Number(text['res']);
            var msg = (text['msg']);
            if (result == 0) {
                var tyep = Number(text['type']);
                var money = Number(text['money']);
                money = money / 100;
                if (tyep == 1) {
                    UserData.getInstance.setGold(money);
                }
                else {
                    UserData.getInstance.setYJGold(money);
                }
                withdrawViewMrg.getInstance.initallInfo1();
                withdrawViewMrg.getInstance.hide();
                Alertpaner.getInstance.show("申请成功，请等待审核");
                CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
            else {
                decideTKObj.canTiXian = true;
                if (msg != undefined) {
                    Alertpaner.getInstance.show(msg);
                }
            }
        }
    };
    return withdrawConf;
}());
__reflect(withdrawConf.prototype, "withdrawConf", ["IProHandle"]);
//# sourceMappingURL=withdrawConf.js.map