class OrderDataMrg {
	private static _mInstance: OrderDataMrg;
	public static get getInstance(): OrderDataMrg {
		if (OrderDataMrg._mInstance == undefined)
			OrderDataMrg._mInstance = new OrderDataMrg();
		return OrderDataMrg._mInstance;
	}
	/**订单列表 */
	private _mAllList:GHashMap<OrderData>;
	private _mDaiFuKuanList:GHashMap<OrderData>;
	private _mDaiFaKuoList:GHashMap<OrderData>;
	private _mYWCList:GHashMap<OrderData>;
	private constructor() {
		this._mAllList = new GHashMap<OrderData>();
		this._mDaiFuKuanList = new GHashMap<OrderData>();
		this._mDaiFaKuoList = new GHashMap<OrderData>();
		this._mYWCList = new GHashMap<OrderData>();
	}

	/**添加列表 */
	public addOrderData(orderId:string, data:OrderData):void {
		this._mAllList.Gput(orderId, data);

		if(data.statue == 1) {
			this._mDaiFuKuanList.Gput(orderId, data);
		} else if(data.statue == 2) {
			this._mDaiFaKuoList.Gput(orderId, data);
		} else if(data.statue == 3) {
			this._mYWCList.Gput(orderId, data);
		}
	}

	/**获取订单数据 */
	public getOrderData(orderId:string):OrderData {
		return this._mAllList.Gget(orderId);
	}

	/**
	 * 获取订单列表 
	 * [0:全部订单,1:待付款,2:待收货,3:已完成]
	*/
	public getOrderList(statue:number):GHashMap<OrderData> {
		if(statue == 0) {
			return this._mAllList;
		} else if(statue == 1){
			return this._mDaiFuKuanList;
		} else if(statue == 2){
			return this._mDaiFaKuoList;
		} else if(statue == 3){
			return this._mYWCList;
		}
	}

	public clean():void {
		this._mAllList.clear();
		this._mDaiFuKuanList.clear();
		this._mDaiFaKuoList.clear();
		this._mYWCList.clear();
	}

}