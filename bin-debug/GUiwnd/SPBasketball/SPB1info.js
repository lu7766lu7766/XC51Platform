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
var SPB1infoTop = (function (_super) {
    __extends(SPB1infoTop, _super);
    function SPB1infoTop() {
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
    SPB1infoTop.prototype.aa = function (data, key) {
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
                obj = new SPB1info_subInfo();
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
    /**之刷新数据 */
    SPB1infoTop.prototype.freshData = function (data) {
        var obj;
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key));
            }
        }
    };
    /**列表优化 == 滑动列表*/
    SPB1infoTop.prototype.optimization = function () {
        var data;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._item.Gget(key);
            if (this._type == false) {
                var yy = (this.y + data.y) - SPB1Wnd.getInstance.getViewYYTop();
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
    //收起 展开显示
    SPB1infoTop.prototype.changeUpDown = function () {
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
        // SPB1Wnd.getInstance.changeItemHeight();
        this.changeImg();
        SPB1Wnd.getInstance.updateYH();
    };
    SPB1infoTop.prototype.changeImg = function () {
        var _this = this;
        if (this._type)
            RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
        else
            RES.getResByUrl("resource/assets/images/ui/shouqi_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
    };
    SPB1infoTop.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = true;
        }
    };
    SPB1infoTop.prototype.removeInterception = function () {
        this._type = false;
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = false;
        }
    };
    SPB1infoTop.prototype.getSubItem = function () {
        return this._item;
    };
    /**适配处理 */
    SPB1infoTop.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return SPB1infoTop;
}(egret.DisplayObjectContainer));
__reflect(SPB1infoTop.prototype, "SPB1infoTop");
var SPB1info_subInfo = (function (_super) {
    __extends(SPB1info_subInfo, _super);
    function SPB1info_subInfo() {
        var _this = _super.call(this) || this;
        _this.addedge();
        _this._shapeItem = new GHashMap();
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
        _this._vs = ToolMrg.getText(342 + 14 + 60, 57, 24, 0xf72e52, 100);
        _this._vs.textAlign = egret.HorizontalAlign.CENTER;
        _this.addChild(_this._vs);
        _this._vs.text = "";
        var zhu = ToolMrg.getText(394 + 60, 135, 24, 0xf72e52);
        _this.addChild(zhu);
        zhu.text = "主";
        _this._rangeText = ToolMrg.getText(355 + 60, 162, 20, 0xf72e52, 100);
        _this.addChild(_this._rangeText);
        _this._rangeText.textAlign = egret.HorizontalAlign.CENTER;
        var shape1 = new egret.Shape();
        _this.addChild(shape1);
        shape1.graphics.beginFill(0xFF8548);
        shape1.graphics.drawRoundRect(140 + 60, 28, 40, 80, 20);
        shape1.graphics.endFill();
        var shape2 = new egret.Shape();
        _this.addChild(shape2);
        shape2.graphics.beginFill(0x6EC858);
        shape2.graphics.drawRoundRect(140 + 60, 116, 40, 80, 20);
        shape2.graphics.endFill();
        var text1 = ToolMrg.getText(140 + 60, 28, 20, 0xffffff, 40);
        _this.addChild(text1);
        text1.height = 80;
        text1.bold = true;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.text = "大\n小\n分";
        var text2 = ToolMrg.getText(140 + 60, 116, 20, 0xffffff, 40);
        _this.addChild(text2);
        text2.lineSpacing = 10;
        text2.height = 80;
        text2.bold = true;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.text = "让\n分";
        for (var i = 16; i < 18; i++) {
            var obj = new SPBasketballBlock(i, 0, 160, 80, null, 7, 45);
            _this._shapeItem.Gput(i, obj);
            _this.addChild(obj);
            obj.x = 196 + (i - 16) * 260 + 60;
            obj.y = 28;
        }
        for (var i = 2; i < 4; i++) {
            var obj = new SPBasketballBlock(i, 1, 160, 80, null, 7, 45);
            _this._shapeItem.Gput(i, obj);
            _this.addChild(obj);
            obj.x = 196 + (i - 2) * 260 + 60;
            obj.y = 116;
        }
        //--边
        _this.setDB();
        return _this;
    }
    SPB1info_subInfo.prototype.aa = function (data) {
        this._data = data;
        this.id = data.id;
        this._vs.text = data.dxFAll + "";
        this._typeText.text = "" + data.league_name;
        this._dayOfcodeText.text = data.day + " " + data.code;
        this._endTime.text = "\u622A\u6B62 " + data.stop;
        if (data.lot_lose > 0)
            this._rangeText.textColor = 0xf72e52;
        else
            this._rangeText.textColor = 0x1BA22E;
        this._rangeText.text = "" + data.lot_lose;
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).addInterception();
        }
        this._tipText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._shapeItem.Gget(16).aa(data.id, data.listSX[16], ToolMrg.nameMode2(7, data.team_a_name), "\u5927\u5206" + data.listSX[16]);
        this._shapeItem.Gget(17).aa(data.id, data.listSX[17], ToolMrg.nameMode2(7, data.team_b_name), "\u5C0F\u5206" + data.listSX[17]);
        this._shapeItem.Gget(2).aa(data.id, data.listSX[2], ToolMrg.nameMode2(7, data.team_a_name), "\u5BA2\u80DC" + data.listSX[2]);
        this._shapeItem.Gget(3).aa(data.id, data.listSX[3], ToolMrg.nameMode2(7, data.team_b_name), "\u4E3B\u80DC" + data.listSX[3]);
    };
    SPB1info_subInfo.prototype.clear = function () {
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).clear();
        }
    };
    SPB1info_subInfo.prototype.changeText = function (num) {
        var _this = this;
        this.clear();
        for (var i = 0; i < num.length; i++) {
            if (num[i] == 2 || num[i] == 3 || num[i] == 16 || num[i] == 17) {
                this._shapeItem.Gget(num[i]).selectType = true;
                this._shapeItem.Gget(num[i]).changeCss();
            }
        }
        var str = "";
        if (num.length > 0) {
            this._tipText.text = "\u5DF2\u9009\n\u4E2D" + num.length + "\n\u9879";
            // this._tipText.textColor = 0xffffff;
            str = "bk.png";
        }
        else {
            this._tipText.text = "\u5168\u90E8\n\u9009\u9879";
            // this._tipText.textColor = 0x72e52;
            str = "bk_nor.png";
        }
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._boxShape.$setBitmapData(e); }, this);
    };
    SPB1info_subInfo.prototype.touchDown = function (e) {
        if (e.target == this._tipText) {
            SPB1more.getInstance.show(this._data.id);
        }
    };
    /**边 117高度 */
    SPB1info_subInfo.prototype.addedge = function () {
        var _this = this;
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 223.5, 750, 1.5);
        shape.graphics.endFill();
        this._boxShape = new egret.Bitmap();
        // this.addChild(this._boxShape);
        this._boxShape.x = 644;
        this._boxShape.y = 28;
        RES.getResByUrl("resource/assets/images/ui/bk_nor.png", function (e) { _this._boxShape.$setBitmapData(e); }, this);
        this._tipText = ToolMrg.getText(644, 28, 20, 0x72e52, 80);
        this._tipText.touchEnabled = true;
        // this.addChild(this._tipText);
        this._tipText.height = 168;
        this._tipText.lineSpacing = 8;
        this._tipText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._tipText.textAlign = egret.HorizontalAlign.CENTER;
        this._tipText.text = "全部\n选项";
        RES.getResByUrl("resource/assets/images/ui/gdwf_home@2x.png", function (e) { }, this);
    };
    /**适配处理 */
    SPB1info_subInfo.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 225;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
            _this._mShareC.$setBitmapData(e);
        }, this);
        this.addChildAt(this._mShareC, 0);
    };
    SPB1info_subInfo.prototype.removeInterception = function () {
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).removeInterception();
            this._tipText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    return SPB1info_subInfo;
}(egret.DisplayObjectContainer));
__reflect(SPB1info_subInfo.prototype, "SPB1info_subInfo");
//# sourceMappingURL=SPB1info.js.map