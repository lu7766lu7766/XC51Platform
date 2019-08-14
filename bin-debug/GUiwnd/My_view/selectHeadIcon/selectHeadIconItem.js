var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**选择头像item */
var selectHeadIconItem = (function (_super) {
    __extends(selectHeadIconItem, _super);
    function selectHeadIconItem() {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.decideIcon1 = false;
        _this.decideIcon = false;
        _this.touchEnabled = true;
        _this.headIcon = new egret.Bitmap();
        _this.headIcon.x = 0;
        _this.headIcon.y = 0;
        _this.headIcon.width = 120;
        _this.headIcon.height = 120;
        _this.addChild(_this.headIcon);
        // RES.getResByUrl("resource/assets/images/ui/tou20.png", this.bgck, this, RES.ResourceItem.TYPE_IMAGE);
        _this.seleIcon = new egret.Bitmap();
        _this.seleIcon.x = 80;
        _this.seleIcon.y = 80;
        _this.seleIcon.width = 40;
        _this.seleIcon.height = 40;
        _this.addChild(_this.seleIcon);
        RES.getResByUrl("resource/assets/images/ui/txxz_mine@2x.png", _this.bgck1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.seleIcon.visible = false;
        selectHeadIconData.getInstance;
        _this.addevent();
        return _this;
    }
    selectHeadIconItem.prototype.bgck = function (data, url) {
        if (data != undefined && this.headIcon != undefined) {
            this.headIcon.$setBitmapData(data);
            this.decideIcon = true;
        }
    };
    selectHeadIconItem.prototype.bgck1 = function (data, url) {
        if (this.decideIcon1 == true)
            return;
        if (data != undefined && this.seleIcon != undefined) {
            this.seleIcon.$setBitmapData(data);
            this.decideIcon1 = true;
        }
    };
    selectHeadIconItem.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    selectHeadIconItem.prototype.onTouch = function () {
        selectHeadIconData.selectheadIconID = this.myid;
        selectHeadIconData.setlectHeadIcon();
    };
    selectHeadIconItem.prototype.setID = function (id) {
        this.myid = id;
        this.setIcon();
    };
    selectHeadIconItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置头像 */
    selectHeadIconItem.prototype.setIcon = function () {
        if (this.decideIcon == true)
            return;
        RES.getResByUrl("resource/assets/images/ui/tou" + this.myid + ".png", this.bgck, this, RES.ResourceItem.TYPE_IMAGE);
    };
    /**选择勾*/
    selectHeadIconItem.prototype.selectIcon = function (boo) {
        if (this.seleIcon == undefined)
            return;
        this.seleIcon.visible = boo;
    };
    return selectHeadIconItem;
}(egret.DisplayObjectContainer));
__reflect(selectHeadIconItem.prototype, "selectHeadIconItem");
//# sourceMappingURL=selectHeadIconItem.js.map