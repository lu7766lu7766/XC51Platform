class GoodsDataMrg {
	private static _mInstance: GoodsDataMrg;
	public static get getInstance(): GoodsDataMrg {
		if (GoodsDataMrg._mInstance == undefined)
			GoodsDataMrg._mInstance = new GoodsDataMrg();
		return GoodsDataMrg._mInstance;
	}
	/**物品管理列表 */
	private _mList:GHashMap<GoodsData>;
	public static goodsList;

	private constructor() {
		this._mList = new GHashMap<GoodsData>();

		this.init();
	}

	/**读取配置 */
	private init():void {
		let text = GoodsDataMrg.goodsList;
		let goodsData:GoodsData = new GoodsData();
		goodsData.gid = Number(text["gid"]);
		goodsData.type = Number(text["type"]);
		goodsData.title = text["title"];

		//类型
		let a: Array<any> = text["style"];
		if(a != undefined && a.length > 0) {
			for (let i=0;i<a.length;i++) {
				goodsData.style[i] = a[i];
			}
		}

		//性别
		a = text["sex"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.sex[i] = a[i];
			}
		}

		//颜色
		a = text["color"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.color[i] = a[i];
			}
		}

		//码数
		a = text["size"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.size[i] = a[i];
			}
		}

		goodsData.desc = text["desc"];
		goodsData.price = Number(text["price"]);
		goodsData.deltime = text["deltime"];
		goodsData.stock = text["stock"];
		//商品图片
		a = text["thumbImg"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.thumbImg[i] = a[i];
			}
		}

		//商品图片
		a = text["bigImg"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.bigImg[i] = a[i];
			}
		}

		//商品详情图片
		a = text["detail"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.detail[i] = a[i];
			}
		}

		a = text["detailHeight"];
		if(a) {
			for (let i=0;i<a.length;i++) {
				goodsData.detailHeight[i] = a[i];
			}
		}

		this.addGoodsData(goodsData.gid, goodsData.type, goodsData);
		// PreSaleWnd.getInstance.show();
		// PreSaleWnd.getInstance.initData(goodsData.gid,goodsData.type);
	}

	/**添加列表 */
	public addGoodsData(gid:number, type:number, data:GoodsData):void {
		let key:string = gid+"_"+type;
		this._mList.Gput(key, data);
	}

	/**获取商品数据 */
	public getGoodsData(gid:number, type:number):GoodsData {
		let key:string = gid+"_"+type;
		return this._mList.Gget(key);
	}

	/**通过商品id 和 颜色取对应的 图片路径*/
	public getThumbImg(goodId:number, type:number, orderData: OrderData):string {
		let key:string = goodId+"_"+type;
		if(this._mList.GhasKey(key)) {
			let goodsData:GoodsData = this._mList.Gget(key);
			let index:number = 0;
			for(let i=0;i<goodsData.color.length;i++) {
				if(orderData.color == goodsData.color[i]) {
					if(orderData.sex == "1") {//男
						 index = i + 4;
					} else {
						index = i;
					}
					break;
				}
			}

			return goodsData.thumbImg[index];
		}
		return "";
	}

}