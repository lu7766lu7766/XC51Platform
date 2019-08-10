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
/**推荐提示item */
var WorldTip = (function (_super) {
    __extends(WorldTip, _super);
    function WorldTip() {
        var _this = _super.call(this) || this;
        /**提示数组 */
        _this.arr = ["用户&***&跟单了足彩大神的专家方案", "用户&***&在排列三直选中的1040元", "用户&***&在排列三组三中的346元", "用户&***&在排列三组六中的173元"];
        _this._mDHHM = ["133", "132", "134", "135", "136", "138", "139", "188", "186", "189", "178", "183", "159", "158", "157", "152", "150", "158"];
        _this._status = 1;
        _this._lastTime = 0;
        _this.num = 1;
        _this.arrItem = new GHashMap();
        _this._mGGxxList = new Array();
        _this.text1 = ToolMrg.getText(0, 0, 24, 0x292929, 750);
        // this.text1.text = this.arr[0];
        _this.text1.text = "";
        _this.text2 = ToolMrg.getText(0, 0, 24, 0x292929, 750);
        _this.addChild(_this.text1);
        _this.addChild(_this.text2);
        // this._lastTime = egret.getTimer();
        _this.mask = new egret.Rectangle(0, -6, 590, 40);
        _this.addEventListener(egret.Event.ENTER_FRAME, _this.onEnterFrame, _this);
        return _this;
    }
    Object.defineProperty(WorldTip, "getInstance", {
        get: function () {
            if (WorldTip._mInstance == undefined)
                WorldTip._mInstance = new WorldTip();
            return WorldTip._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**添加公告 */
    WorldTip.prototype.addGGxxList = function (data) {
        this._mGGxxList.push(data);
    };
    /**取数据 */
    WorldTip.prototype.getList = function () {
        if (this._mGGxxList.length == 2) {
            NoticePhp.getInstance.sendHttp();
        }
        if (this._mGGxxList.length <= 0) {
            var data = new NoticeData();
            data.id = 1;
            data.conten = "全新51彩店震撼来袭，返奖快，返水高，易查询。";
            NoticePhp.getInstance.sendHttp();
            return data;
        }
        else {
            return this._mGGxxList.pop();
        }
    };
    WorldTip.prototype.onEnterFrame = function (e) {
        if (this.stage == null)
            return;
        if (egret.getTimer() - this._lastTime < 2500)
            return;
        if (this._status == 2) {
            this.update();
            return;
        }
        this.change();
    };
    WorldTip.prototype.update = function () {
        this._f.y -= 0.5;
        this._s.y -= 0.5;
        if (this._s.y <= 0) {
            this._status = 1;
            this._f.visible = false;
            this._s.y = 0;
            this._lastTime = egret.getTimer();
        }
    };
    WorldTip.prototype.change = function () {
        // if(this.arrItem.size==0)return;
        this._status = 2;
        this._f = this.text1.visible ? this.text1 : this.text2;
        this._s = this.text1 == this._f ? this.text2 : this.text1;
        this._f.visible = this._s.visible = true;
        this._s.y = 40;
        var str = this.arr[this.num].split("&");
        this._s.text = str[0] + GUtilMath.randomNum(1, 19) + str[1] + (GUtilMath.randomNum(10, 99)) + str[2];
        // this._s.text = this.getList().conten;
        this.num += 1;
        if (this.num == this.arr.length)
            this.num = 0;
    };
    return WorldTip;
}(egret.DisplayObjectContainer));
__reflect(WorldTip.prototype, "WorldTip");
var ReTextData = (function () {
    function ReTextData() {
    }
    return ReTextData;
}());
__reflect(ReTextData.prototype, "ReTextData");
var NoticeData = (function () {
    function NoticeData() {
        /**id */
        this.id = 1;
        /**str */
        this.conten = "";
    }
    return NoticeData;
}());
__reflect(NoticeData.prototype, "NoticeData");
//# sourceMappingURL=WorldTip.js.map