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
var FindInfo = (function (_super) {
    __extends(FindInfo, _super);
    function FindInfo() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this.touchEnabled = true;
        _this.x = 28;
        _this._bj = new egret.Bitmap();
        _this._bj.touchEnabled = true;
        _this.addChild(_this._bj);
        RES.getResByUrl("resource/assets/images/ui/bg_find@2x.png", function (e) { _this._bj.$setBitmapData(e); }, _this);
        var imgZZ = new egret.Shape();
        _this.addChild(imgZZ);
        imgZZ.graphics.beginFill(0xffffff);
        imgZZ.graphics.drawRoundRect(6, 6, 658, 248, 20);
        imgZZ.graphics.endFill();
        _this._imgBtn = new egret.Bitmap();
        _this.addChild(_this._imgBtn);
        _this._imgBtn.x = 6;
        _this._imgBtn.y = 6;
        _this._imgBtn.width = 658;
        _this._imgBtn.height = 248;
        _this._imgBtn.mask = imgZZ;
        _this._titleText = ToolMrg.getText(44, 260, 28, 0x333333);
        _this.addChild(_this._titleText);
        _this._titleText.height = 60;
        _this._titleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        var detailText = ToolMrg.getText(574, 260, 24, 0x999999);
        detailText.height = 60;
        detailText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.addChild(detailText);
        detailText.text = "查看详情";
        _this.setDB();
        return _this;
    }
    FindInfo.prototype.aa = function (data) {
        var _this = this;
        this._data = data;
        RES.getResByUrl("resource/assets/images/ui/" + data.imgSrc, function (e) {
            _this._imgBtn.$setBitmapData(e);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        // LoadNetPic.getLoadNetPic.loadPic(`${data.imgSrc}`,(e)=>{this._imgBtn.$setBitmapData(e);},this);
        this._titleText.text = ToolMrg.nameMode2(20, data.title);
    };
    //从0开始，按顺序
    FindInfo.prototype.touchDown = function (e) {
        // if (this._data.id == 0) {//竞彩串关加奖来袭，加奖10
        //     ID1.getInstance.show();
        // } else if (this._data.id == 1) {//助力中超，周周彩金大放送
        //     ID2.getInstance.show();
        // } else if (this._data.id == 2) {//呼朋唤友一起来战斗
        //     ShareWnd.getInstance.show();
        // } else if (this._data.id == 3) {//首存5888元等你拿！
        //     ID4.getInstance.show();
        // } else if (this._data.id == 4) {//新用户注册即送18元
        //     ID5.getInstance.show();
        // } else if (this._data.id == 5) {//VIP成长礼包送不停
        //     ID6.getInstance.show();
        // } 
        if (this._data.id == 0) {
            ID5.getInstance.show();
        }
        else if (this._data.id == 1) {
            ID4.getInstance.show();
        }
        else if (this._data.id == 2) {
            ID6.getInstance.show();
        }
        else if (this._data.id == 3) {
            ID1.getInstance.show();
        }
        else if (this._data.id == 4) {
            ID2.getInstance.show();
        }
        else if (this._data.id == 5) {
            ShareWnd.getInstance.show();
        }
        else if (this._data.id == 6) {
            ID7.getInstance.show();
        }
    };
    FindInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._bj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    FindInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._bj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    /**适配处理 */
    FindInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(-this.x, 0, GameMain.getInstance.StageWidth, 400);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return FindInfo;
}(egret.DisplayObjectContainer));
__reflect(FindInfo.prototype, "FindInfo");
var FindMrg = (function () {
    function FindMrg() {
        //手动添加
        this._imgSrc = ["xyh658.png", "dnn658.png", "vip658.png", "jiaj658px.png", "zhuli658.png", "hphy658.png", "zhuanzhangact.png"];
        this._titleStr = ["新用户注册即送18元", "首存5888元等你拿！", "VIP成长礼包送不停", "竞彩串关加奖来袭，加奖10%无上限", "助力中超，周周彩金大放送",
            "呼朋唤友一起来战斗", "银行卡转账送1%"];
        this._findItem = new GHashMap();
        for (var i = 0; i < this._imgSrc.length; i++) {
            var obj = new FindData();
            obj.id = i;
            obj.title = this._titleStr[i];
            obj.imgSrc = this._imgSrc[i];
            this._findItem.Gput(i, obj);
        }
    }
    Object.defineProperty(FindMrg, "getInstance", {
        get: function () {
            if (FindMrg._mInstance == undefined)
                FindMrg._mInstance = new FindMrg();
            return FindMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    return FindMrg;
}());
__reflect(FindMrg.prototype, "FindMrg");
var FindData = (function () {
    function FindData() {
    }
    return FindData;
}());
__reflect(FindData.prototype, "FindData");
//# sourceMappingURL=FindInfo.js.map