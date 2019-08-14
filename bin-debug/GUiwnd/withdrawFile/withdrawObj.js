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
/**佣金或者钱包obj */
var withdrawObj = (function (_super) {
    __extends(withdrawObj, _super);
    function withdrawObj(id) {
        var _this = _super.call(this) || this;
        _this.myid = 0;
        _this.touchEnabled = true;
        _this.bgIcon = new egret.Bitmap();
        _this.bgIcon.x = 0;
        _this.bgIcon.y = 0;
        _this.bgIcon.width = 280;
        _this.bgIcon.height = 120;
        _this.addChild(_this.bgIcon);
        RES.getResByUrl("", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.tatleText = ToolMrg.getText(0, 18, 28, 0x333333, 280);
        _this.tatleText.text = "未开";
        _this.tatleText.textAlign = egret.HorizontalAlign.CENTER;
        _this.tatleText.fontFamily = "微软雅黑";
        _this.addChild(_this.tatleText);
        if (id == 1) {
            _this.tatleText.text = "余额";
        }
        else if (id == 2) {
            _this.tatleText.text = "发单佣金";
        }
        _this.selectSprite(id);
        _this.yemoneyText = ToolMrg.getText(0, 68, 24, 0xF72E52, 280);
        _this.yemoneyText.text = "余额：0元";
        _this.yemoneyText.textAlign = egret.HorizontalAlign.CENTER;
        _this.yemoneyText.fontFamily = "微软雅黑";
        _this.addChild(_this.yemoneyText);
        _this.addevent();
        return _this;
    }
    withdrawObj.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.bgIcon != undefined) {
            this.bgIcon.$setBitmapData(data);
        }
    };
    withdrawObj.prototype.setID = function (id) {
        this.myid = id;
    };
    withdrawObj.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置佣金或零钱余额*/
    withdrawObj.prototype.setmongtext = function (num) {
        this.yemoneyText.text = "余额：" + num + "元";
    };
    /**选择框显示(1 红框 2默认)*/
    withdrawObj.prototype.selectSprite = function (type) {
        if (type == 1) {
            RES.getResByUrl("resource/assets/images/ui/czxz_mine@3x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else if (type == 2) {
            RES.getResByUrl("resource/assets/images/ui/czxz_nor_mine@3x.png", this.bgBack1, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    withdrawObj.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    withdrawObj.prototype.onTouch = function () {
        withdrawData.defauleid = this.myid;
        if (withdrawData.defauleid == 1) {
            withdrawData.getInstance.selectdecide();
        }
        else if (withdrawData.defauleid == 2) {
            withdrawData.getInstance.selectdecide();
        }
    };
    return withdrawObj;
}(egret.DisplayObjectContainer));
__reflect(withdrawObj.prototype, "withdrawObj");
//# sourceMappingURL=withdrawObj.js.map