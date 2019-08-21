var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CustEventType = (function () {
    function CustEventType() {
    }
    /**用户数据 */
    CustEventType.EventType_User = "EventType_User";
    /**金币刷新 */
    CustEventType.EventType_GoldFresh = "EventType_GoldFresh";
    /**更新联赛数据 */
    CustEventType.EventType_UpdateLianSai = "EventType_UpdateLianSai";
    CustEventType.EventType_UpdateLianSaisc = "EventType_UpdateLianSaisc";
    /**取消赛事，预约赛事刷新*/
    CustEventType.EventType_appoint = "EventType_appoint";
    /**足球信息列表 */
    CustEventType.EventType_FT_List = "EventType_FT_List";
    CustEventType.EventType_CJFT_List = "EventType_CJFT_List";
    CustEventType.EventType_FTDG_List = "EventType_FTDG_List";
    CustEventType.EventType_CJFTDG_List = "EventType_CJFTDG_List";
    /**足球更多信息列表 */
    CustEventType.EventType_FT_List_More = "EventType_FT_List_More";
    /**足球历史记录 */
    CustEventType.EventType_FT_List_HH = "EventType_FT_List_HH";
    /**篮球信息列表*/
    CustEventType.EventType_BK_List = "EventType_BK_List";
    CustEventType.EventType_BK_CJList = "EventType_BK_CJList";
    CustEventType.EventType_BKDG_List = "EventType_BKDG_List";
    CustEventType.EventType_BKDG_CJList = "EventType_BKDG_CJList";
    /**篮球更多信息列表 */
    CustEventType.EventType_BK_List_More = "EventType_BK_List_More";
    CustEventType.EventType_BK_CJList_More = "EventType_BK_CJList_More";
    /**篮球历史记录 */
    CustEventType.EventType_BK_List_HH = "EventType_BK_List_HH";
    /**关注成功*/
    CustEventType.EventType_gzSuccess = "EventType_gzSuccess";
    /**取消关注*/
    CustEventType.EventType_gzdefeated = "EventType_gzdefeated";
    /**订单事件 */
    CustEventType.EventType_orderList = "EventType_orderList";
    /**排三排五列表 */
    CustEventType.EventType_PSPW_List = "EventType_PSPW_List";
    /**支付回调 */
    CustEventType.EventType_payList = "EventType_payList";
    return CustEventType;
}());
__reflect(CustEventType.prototype, "CustEventType");
//# sourceMappingURL=CustEventType.js.map