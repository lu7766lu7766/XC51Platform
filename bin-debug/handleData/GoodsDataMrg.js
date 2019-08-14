var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoodsDataMrg = (function () {
    function GoodsDataMrg() {
        this._mList = new GHashMap();
        this.init();
    }
    Object.defineProperty(GoodsDataMrg, "getInstance", {
        get: function () {
            if (GoodsDataMrg._mInstance == undefined)
                GoodsDataMrg._mInstance = new GoodsDataMrg();
            return GoodsDataMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**读取配置 */
    GoodsDataMrg.prototype.init = function () {
        var text = GoodsDataMrg.goodsList;
        var goodsData = new GoodsData();
        goodsData.gid = Number(text["gid"]);
        goodsData.type = Number(text["type"]);
        goodsData.title = text["title"];
        //类型
        var a = text["style"];
        if (a != undefined && a.length > 0) {
            for (var i = 0; i < a.length; i++) {
                goodsData.style[i] = a[i];
            }
        }
        //性别
        a = text["sex"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.sex[i] = a[i];
            }
        }
        //颜色
        a = text["color"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.color[i] = a[i];
            }
        }
        //码数
        a = text["size"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.size[i] = a[i];
            }
        }
        goodsData.desc = text["desc"];
        goodsData.price = Number(text["price"]);
        goodsData.deltime = text["deltime"];
        goodsData.stock = text["stock"];
        //商品图片
        a = text["thumbImg"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.thumbImg[i] = a[i];
            }
        }
        //商品图片
        a = text["bigImg"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.bigImg[i] = a[i];
            }
        }
        //商品详情图片
        a = text["detail"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.detail[i] = a[i];
            }
        }
        a = text["detailHeight"];
        if (a) {
            for (var i = 0; i < a.length; i++) {
                goodsData.detailHeight[i] = a[i];
            }
        }
        this.addGoodsData(goodsData.gid, goodsData.type, goodsData);
        // PreSaleWnd.getInstance.show();
        // PreSaleWnd.getInstance.initData(goodsData.gid,goodsData.type);
    };
    /**添加列表 */
    GoodsDataMrg.prototype.addGoodsData = function (gid, type, data) {
        var key = gid + "_" + type;
        this._mList.Gput(key, data);
    };
    /**获取商品数据 */
    GoodsDataMrg.prototype.getGoodsData = function (gid, type) {
        var key = gid + "_" + type;
        return this._mList.Gget(key);
    };
    /**通过商品id 和 颜色取对应的 图片路径*/
    GoodsDataMrg.prototype.getThumbImg = function (goodId, type, orderData) {
        var key = goodId + "_" + type;
        if (this._mList.GhasKey(key)) {
            var goodsData = this._mList.Gget(key);
            var index = 0;
            for (var i = 0; i < goodsData.color.length; i++) {
                if (orderData.color == goodsData.color[i]) {
                    if (orderData.sex == "1") {
                        index = i + 4;
                    }
                    else {
                        index = i;
                    }
                    break;
                }
            }
            return goodsData.thumbImg[index];
        }
        return "";
    };
    return GoodsDataMrg;
}());
__reflect(GoodsDataMrg.prototype, "GoodsDataMrg");
//# sourceMappingURL=GoodsDataMrg.js.map