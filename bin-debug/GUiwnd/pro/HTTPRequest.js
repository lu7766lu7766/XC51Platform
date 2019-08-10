var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var HTTPRequest = (function () {
    function HTTPRequest() {
        /**域名路径前缀 129.204.53.154 */
        this.httpHeadUrl = 'http://129.204.53.154/other/test/';
        this._mProHandleMap = new GHashMap();
        this.initData();
    }
    Object.defineProperty(HTTPRequest, "getInstance", {
        get: function () {
            if (HTTPRequest._mInstance == undefined)
                HTTPRequest._mInstance = new HTTPRequest();
            return HTTPRequest._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**所有协议发送通道 */
    HTTPRequest.prototype.proSend = function (url, content, data) {
        GHttpMager.getInstance.GaddHttpSend(url, content, this.proBack, this, data);
    };
    /**协议请求回调 */
    HTTPRequest.prototype.proBack = function (res, httpObj, data) {
        if (res == true && this._mProHandleMap.GhasKey(data.mKey)) {
            var proHandle = this._mProHandleMap.Gget(data.mKey);
            proHandle.backHTTP(res, httpObj, data);
        }
        else if (res == false) {
            egret.log("访问服务器返回false");
        }
        else {
            egret.log("没有注册协议");
        }
    };
    /**协议注册 */
    HTTPRequest.prototype.initData = function () {
        this._mProHandleMap.Gput("PhonePhp", PhonePhp.getInstance);
        this._mProHandleMap.Gput("RewardPhp", RewardPhp.getInstance);
        this._mProHandleMap.Gput("ResetName", ResetName.getInstance);
        this._mProHandleMap.Gput("NoticePhp", NoticePhp.getInstance);
        this._mProHandleMap.Gput("Gen_Info", Gen_Info.getInstance);
        this._mProHandleMap.Gput("Super_BK_Order_One", Super_BK_Order_One.getInstance);
        this._mProHandleMap.Gput("Super_Bk_Order", Super_Bk_Order.getInstance);
        this._mProHandleMap.Gput("SPBK_List_More", SPBK_List_More.getInstance);
        this._mProHandleMap.Gput("SPBK_One", SPBK_One.getInstance);
        this._mProHandleMap.Gput("Super_Bk", Super_Bk.getInstance);
        this._mProHandleMap.Gput("Super_Fto", Super_Fto.getInstance);
        this._mProHandleMap.Gput("Super_Ftc", Super_Ftc.getInstance);
        this._mProHandleMap.Gput("Super_Ft", Super_Ft.getInstance);
        this._mProHandleMap.Gput("PayGo", PayGo.getInstance);
        this._mProHandleMap.Gput("PayPL", PayPL.getInstance);
        this._mProHandleMap.Gput("UserInfoPhp", UserInfoPhp.getInstance);
        this._mProHandleMap.Gput("BK_List", BK_List.getInstance);
        this._mProHandleMap.Gput("BK_List_More", BK_List_More.getInstance);
        this._mProHandleMap.Gput("BK_One", BK_One.getInstance);
        this._mProHandleMap.Gput("BK_Order", BK_Order.getInstance);
        this._mProHandleMap.Gput("Order_List", Order_List.getInstance);
        this._mProHandleMap.Gput("Order_ListO", Order_ListO.getInstance);
        this._mProHandleMap.Gput("Result_One", Result_One.getInstance);
        this._mProHandleMap.Gput("BK_Order_One", BK_Order_One.getInstance);
        this._mProHandleMap.Gput("FT_Order_One", FT_Order_One.getInstance);
        this._mProHandleMap.Gput("QsPhp", QsPhp.getInstance);
        this._mProHandleMap.Gput("ResetPassPhp", ResetPassPhp.getInstance);
        this._mProHandleMap.Gput("RegistPhp", RegistPhp.getInstance);
        this._mProHandleMap.Gput("LoginPhp", LoginPhp.getInstance);
        this._mProHandleMap.Gput("FT_One", FT_One.getInstance);
        this._mProHandleMap.Gput("SPFT_One", SPFT_One.getInstance);
        this._mProHandleMap.Gput("FT_Order", FT_Order.getInstance);
        this._mProHandleMap.Gput("BK_List", BK_List.getInstance);
        this._mProHandleMap.Gput("FT_List", FT_List.getInstance);
        this._mProHandleMap.Gput("FT_List_More", FT_List_More.getInstance);
        this._mProHandleMap.Gput("Arrangement_Five", Arrangement_Five.getInstance);
        this._mProHandleMap.Gput("Arrangement_Three", Arrangement_Three.getInstance);
        this._mProHandleMap.Gput("OpenAwareConfin", OpenAwareConfin.getInstance);
        this._mProHandleMap.Gput("FootballBFConfin", FootballBFConfin.getInstance);
        this._mProHandleMap.Gput("basketballBFConfin", basketballBFConfin.getInstance);
        this._mProHandleMap.Gput("FootandBaskGZConfin", FootandBaskGZConfin.getInstance);
        this._mProHandleMap.Gput("GD_List", GD_List.getInstance);
        this._mProHandleMap.Gput("GD_detail", GD_detail.getInstance);
        this._mProHandleMap.Gput("BasketFootGZConfin", BasketFootGZConfin.getInstance);
        this._mProHandleMap.Gput("CD_List", CD_List.getInstance);
        this._mProHandleMap.Gput("GD_RecordList", GD_RecordList.getInstance);
        this._mProHandleMap.Gput("GetShare", GetShare.getInstance);
        this._mProHandleMap.Gput("identitycardConf", identitycardConf.getInstance);
        this._mProHandleMap.Gput("Share_Link", Share_Link.getInstance);
        this._mProHandleMap.Gput("GetBank_allLIst", GetBank_allLIst.getInstance);
        this._mProHandleMap.Gput("BankCard_add", BankCard_add.getInstance);
        this._mProHandleMap.Gput("realNameConf", realNameConf.getInstance);
        this._mProHandleMap.Gput("withdrawConf", withdrawConf.getInstance);
        this._mProHandleMap.Gput("TenConfon", TenConfon.getInstance);
        this._mProHandleMap.Gput("selectResultConf", selectResultConf.getInstance);
        this._mProHandleMap.Gput("GetSC_Data", GetSC_Data.getInstance);
        this._mProHandleMap.Gput("SetGD_Buy", SetGD_Buy.getInstance);
        this._mProHandleMap.Gput("SelectHeadIconPhP", SelectHeadIconPhP.getInstance);
        this._mProHandleMap.Gput("SelectBFconPhP", SelectBFconPhP.getInstance);
    };
    return HTTPRequest;
}());
__reflect(HTTPRequest.prototype, "HTTPRequest");
/**协议标识对象*/
var HttpData = (function () {
    function HttpData() {
    }
    return HttpData;
}());
__reflect(HttpData.prototype, "HttpData");
//# sourceMappingURL=HTTPRequest.js.map