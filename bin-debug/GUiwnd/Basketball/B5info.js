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
/**篮 串关 */
var B5infoTop = (function (_super) {
    __extends(B5infoTop, _super);
    function B5infoTop() {
        var _this = _super.call(this) || this;
        /**true收起 false展开 默认展开形式 */
        _this._type = false;
        /**用于列表显示优化当前高度 */
        _this.hheight = 0;
        _this.hheightTTT = 0;
        _this._topImgX = 0;
        _this._isInterception = false;
        _this._item = new GHashMap();
        _this._title = ToolMrg.getText(244 + 5, 0, 20, 0x333333);
        _this.addChild(_this._title);
        _this._title.height = 48;
        _this._title.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._topImg = new egret.Bitmap();
        _this.addChild(_this._topImg);
        _this._topImg.x = 484 + 5;
        _this._topImg.y = 20;
        // RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png",(e)=>{
        //     this._topImg.$setBitmapData(e);
        // },this);
        _this.setDB();
        return _this;
    }
    B5infoTop.prototype.aa = function (data, key) {
        this._data = data;
        this._type = false;
        this._title.text = key + "  \u5171" + data.size + "\u573A";
        this._topImg.x = this._title.x + this._title.textWidth + 8;
        this._topImgX = this._topImg.x; //记录当前x
        var objHeight = 48;
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key_1 = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key_1)) {
                obj = this._item.Gget(key_1);
            }
            else {
                obj = new B5info_subInfo();
                this._item.Gput(key_1, obj);
            }
            obj.aa(data.Gget(key_1));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            // if(obj.parent==undefined)
            //     this.addChild(obj);
        }
        if (this._type == false) {
            this.hheight = objHeight;
            this.hheightTTT = objHeight;
        }
        else {
            this.hheight = this.height;
        }
        ToolMrg.upItemofGHashMap(this._item, data);
        this.changeImg();
    };
    /**列表优化 == 滑动列表*/
    B5infoTop.prototype.optimization = function () {
        var data;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._item.Gget(key);
            if (this._type == false) {
                var yy = (this.y + data.y) - B5Wnd.getInstance.getViewYYTop();
                if (yy > -300 && yy < GameMain.getInstance.StageHeight + 300) {
                    if (data.parent == undefined)
                        this.addChild(data);
                }
                else if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
    };
    /**之刷新数据 */
    B5infoTop.prototype.freshData = function (data) {
        var obj;
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key));
            }
        }
    };
    //收起 展开显示
    B5infoTop.prototype.changeUpDown = function () {
        if (this._type) {
            this._type = false;
            this.hheight = this.hheightTTT;
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var obj = this._item.Gget(key);
                if (obj.parent == undefined)
                    this.addChild(obj);
            }
        }
        else {
            this._type = true;
            this.hheight = 48;
            for (var _b = 0, _c = this._item.keys; _b < _c.length; _b++) {
                var key = _c[_b];
                var obj = this._item.Gget(key);
                if (obj.parent != undefined)
                    this.removeChild(obj);
            }
        }
        // B5Wnd.getInstance.changeItemHeight();
        B5Wnd.getInstance.updateYH();
        this.changeImg();
    };
    B5infoTop.prototype.changeImg = function () {
        var _this = this;
        if (this._type)
            RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
        else
            RES.getResByUrl("resource/assets/images/ui/shouqi_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
    };
    B5infoTop.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = true;
        }
    };
    B5infoTop.prototype.removeInterception = function () {
        this._type = false;
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = false;
        }
    };
    B5infoTop.prototype.getSubItem = function () {
        return this._item;
    };
    /**适配处理 */
    B5infoTop.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return B5infoTop;
}(egret.DisplayObjectContainer));
__reflect(B5infoTop.prototype, "B5infoTop");
var B5info_subInfo = (function (_super) {
    __extends(B5info_subInfo, _super);
    function B5info_subInfo() {
        var _this = _super.call(this) || this;
        _this.addedge();
        _this._typeText = ToolMrg.getText(26, 24, 24, 0xff7000);
        _this.addChild(_this._typeText);
        _this._typeText.height = 34;
        _this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._dayOfcodeText = ToolMrg.getText(26, 86, 20, 0x999999);
        _this.addChild(_this._dayOfcodeText);
        _this._dayOfcodeText.height = 28;
        _this._dayOfcodeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._endTime = ToolMrg.getText(26, 140, 20, 0x999999);
        _this.addChild(_this._endTime);
        _this._endTime.height = 28;
        _this._endTime.verticalAlign = egret.VerticalAlign.MIDDLE;
        var vs = ToolMrg.getText(410, 25, 24, 0x999999);
        _this.addChild(vs);
        vs.text = "VS";
        _this._team1 = ToolMrg.getText(82 + 3 * 24, 27, 24, 0x333333, 200);
        _this.addChild(_this._team1);
        _this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        _this._team1.bold = true;
        _this._team2 = ToolMrg.getText(492, 27, 24, 0x333333);
        _this.addChild(_this._team2);
        _this._team2.bold = true;
        //--边
        _this.setDB();
        return _this;
    }
    B5info_subInfo.prototype.aa = function (data) {
        this._data = data;
        this.id = data.id;
        this._typeText.text = "" + data.league_name;
        this._dayOfcodeText.text = data.day + " " + data.code;
        this._endTime.text = "\u622A\u6B62 " + data.stop;
        this._team1.text = data.team_a_name;
        this._team2.text = data.team_b_name;
        this._tipText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    B5info_subInfo.prototype.clear = function () {
        this._tipText.text = "\u70B9\u51FB\u9009\u62E9\u6BD4\u5206\u6295\u6CE8";
        this._tipText.textColor = 0x72e52;
        this._boxShape.graphics.clear();
        this._boxShape.graphics.beginFill(0xf5f5f7);
        this._boxShape.graphics.drawRoundRect(215.5, 85.5, 417, 85, 20);
        this._boxShape.graphics.endFill();
    };
    B5info_subInfo.prototype.changeText = function (num) {
        this._boxShape.graphics.clear();
        if (num.length > 0) {
            this._tipText.textColor = 0xffffff;
            this._boxShape.graphics.beginFill(0xF72E52);
            this._boxShape.graphics.drawRoundRect(214, 84, 420, 88, 20);
            this._boxShape.graphics.endFill();
            var a = "";
            var one = true;
            for (var i = 0; i < num.length; i++) {
                if (one)
                    a = BasketballDataMrg.getInstance.BasketballList[num[i]];
                else
                    a = a + "," + BasketballDataMrg.getInstance.BasketballList[num[i]];
                one = false;
            }
            this._tipText.text = ToolMrg.nameMode2(12, a);
        }
        else {
            this._tipText.text = "\u70B9\u51FB\u9009\u62E9\u6BD4\u5206\u6295\u6CE8";
            this._tipText.textColor = 0x72e52;
            this._boxShape.graphics.beginFill(0xf5f5f7);
            this._boxShape.graphics.drawRoundRect(215.5, 85.5, 417, 85, 20);
            this._boxShape.graphics.endFill();
        }
    };
    B5info_subInfo.prototype.touchDown = function (e) {
        if (e.target == this._tipText) {
            B5more.getInstance.show(this._data.id);
        }
    };
    /**边 117高度 */
    B5info_subInfo.prototype.addedge = function () {
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 198.5, 750, 1.5);
        shape.graphics.endFill();
        var box = new egret.Shape();
        this.addChild(box);
        box.graphics.beginFill(0x979797);
        box.graphics.drawRoundRect(214, 84, 420, 88, 20);
        this._boxShape = new egret.Shape();
        this.addChild(this._boxShape);
        this._boxShape.graphics.beginFill(0xf5f5f7);
        this._boxShape.graphics.drawRoundRect(215.5, 85.5, 417, 85, 20);
        this._boxShape.graphics.endFill();
        this._tipText = ToolMrg.getText(214, 84, 28, 0x72e52, 420);
        this._tipText.touchEnabled = true;
        this.addChild(this._tipText);
        this._tipText.height = 88;
        this._tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._tipText.textAlign = egret.HorizontalAlign.CENTER;
        this._tipText.text = "点击选择比分投注";
    };
    /**适配处理 */
    B5info_subInfo.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 200;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
            _this._mShareC.$setBitmapData(e);
        }, this);
        this.addChildAt(this._mShareC, 0);
    };
    B5info_subInfo.prototype.removeInterception = function () {
        this._tipText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return B5info_subInfo;
}(egret.DisplayObjectContainer));
__reflect(B5info_subInfo.prototype, "B5info_subInfo");
//# sourceMappingURL=B5info.js.map