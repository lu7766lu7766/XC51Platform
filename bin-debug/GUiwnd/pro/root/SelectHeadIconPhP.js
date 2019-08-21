var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
修改头像:SelectHeadIconPhP.php
参数
id:用户id
t：头像类型id
返回
{
 res:0;
 t:1; //新的头像id
}
 */
var SelectHeadIconPhP = (function () {
    function SelectHeadIconPhP() {
        this.data = new HttpData();
        this.data.mKey = "SelectHeadIconPhP";
    }
    Object.defineProperty(SelectHeadIconPhP, "getInstance", {
        get: function () {
            if (SelectHeadIconPhP._mInstance == undefined)
                SelectHeadIconPhP._mInstance = new SelectHeadIconPhP();
            return SelectHeadIconPhP._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * user
     */
    SelectHeadIconPhP.prototype.sendHttp = function (ntype) {
        var url = HTTPRequest.getInstance.httpHeadUrl + "/resetIcon.php";
        var content = "id=" + UserData.getInstance.userId + "&t=" + ntype + "&v=" + GameValue.verPhp + "&rkey=" + GameValue.orderKey;
        HTTPRequest.getInstance.proSend(url, content, this.data);
    };
    SelectHeadIconPhP.prototype.backHTTP = function (res, httpObj, data) {
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
                selectHeadIconData.userIconID = Number(text["t"]);
                selectHeadIconMrf.getInstance.setdefaultIcon(selectHeadIconData.userIconID);
                PSWnd.getInstance.setHeadIcon();
                MyViewWnd.getInstance.setHeadIcon();
                // CustEventMrg.getInstance.dispatch(CustEventType.EventType_GoldFresh);
            }
        }
    };
    return SelectHeadIconPhP;
}());
__reflect(SelectHeadIconPhP.prototype, "SelectHeadIconPhP", ["IProHandle"]);
//# sourceMappingURL=SelectHeadIconPhP.js.map