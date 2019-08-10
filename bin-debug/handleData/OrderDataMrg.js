var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var OrderDataMrg = (function () {
    function OrderDataMrg() {
        this._mAllList = new GHashMap();
        this._mDaiFuKuanList = new GHashMap();
        this._mDaiFaKuoList = new GHashMap();
        this._mYWCList = new GHashMap();
    }
    Object.defineProperty(OrderDataMrg, "getInstance", {
        get: function () {
            if (OrderDataMrg._mInstance == undefined)
                OrderDataMrg._mInstance = new OrderDataMrg();
            return OrderDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加列表 */
    OrderDataMrg.prototype.addOrderData = function (orderId, data) {
        this._mAllList.Gput(orderId, data);
        if (data.statue == 1) {
            this._mDaiFuKuanList.Gput(orderId, data);
        }
        else if (data.statue == 2) {
            this._mDaiFaKuoList.Gput(orderId, data);
        }
        else if (data.statue == 3) {
            this._mYWCList.Gput(orderId, data);
        }
    };
    /**获取订单数据 */
    OrderDataMrg.prototype.getOrderData = function (orderId) {
        return this._mAllList.Gget(orderId);
    };
    /**
     * 获取订单列表
     * [0:全部订单,1:待付款,2:待收货,3:已完成]
    */
    OrderDataMrg.prototype.getOrderList = function (statue) {
        if (statue == 0) {
            return this._mAllList;
        }
        else if (statue == 1) {
            return this._mDaiFuKuanList;
        }
        else if (statue == 2) {
            return this._mDaiFaKuoList;
        }
        else if (statue == 3) {
            return this._mYWCList;
        }
    };
    OrderDataMrg.prototype.clean = function () {
        this._mAllList.clear();
        this._mDaiFuKuanList.clear();
        this._mDaiFaKuoList.clear();
        this._mYWCList.clear();
    };
    return OrderDataMrg;
}());
__reflect(OrderDataMrg.prototype, "OrderDataMrg");
//# sourceMappingURL=OrderDataMrg.js.map