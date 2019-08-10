var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var GoodsData = (function () {
    function GoodsData() {
        /**款式 */
        this.style = [];
        /**性别属性 */
        this.sex = [];
        /**颜色 */
        this.color = [];
        /**尺码 */
        this.size = [];
        /**商品描述 */
        this.desc = [];
        /**商品缩略图 */
        this.thumbImg = [];
        /**商品图片 */
        this.bigImg = [];
        /**商品详情图片 */
        this.detail = [];
        /**商品详情图片高度 */
        this.detailHeight = [];
    }
    return GoodsData;
}());
__reflect(GoodsData.prototype, "GoodsData");
//# sourceMappingURL=GoodsData.js.map