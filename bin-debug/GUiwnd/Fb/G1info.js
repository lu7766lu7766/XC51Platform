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
/**足 串关 */
var G1infoTop = (function (_super) {
    __extends(G1infoTop, _super);
    function G1infoTop() {
        var _this = _super.call(this) || this;
        /**true收起 false展开 默认展开形式 */
        _this._type = false;
        /**用于列表显示优化当前高度 */
        _this.hheight = 0;
        _this.hheightTTT = 0;
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
    G1infoTop.prototype.aa = function (data, key) {
        this._data = data;
        this._type = false;
        this._title.text = key + "  \u5171" + data.size + "\u573A";
        this._topImg.x = this._title.x + this._title.textWidth + 8;
        var objHeight = 48;
        this.hheight = 0;
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key_1 = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key_1)) {
                obj = this._item.Gget(key_1);
            }
            else {
                obj = new G1info_subInfo();
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
    G1infoTop.prototype.freshData = function (data) {
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
    G1infoTop.prototype.optimization = function () {
        var data;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._item.Gget(key);
            if (this._type == false) {
                var yy = (this.y + data.y) - G1Wnd.getInstance.getViewYYTop();
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
    G1infoTop.prototype.changeUpDown = function () {
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
        this.changeImg();
        // G1Wnd.getInstance.changeItemHeight();
        G1Wnd.getInstance.updateYH();
    };
    G1infoTop.prototype.changeImg = function () {
        var _this = this;
        if (this._type)
            RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
        else
            RES.getResByUrl("resource/assets/images/ui/shouqi_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
    };
    G1infoTop.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = true;
        }
    };
    G1infoTop.prototype.removeInterception = function () {
        this._type = false;
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = false;
        }
    };
    G1infoTop.prototype.getSubItem = function () {
        return this._item;
    };
    /**适配处理 */
    G1infoTop.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return G1infoTop;
}(egret.DisplayObjectContainer));
__reflect(G1infoTop.prototype, "G1infoTop");
var G1info_subInfo = (function (_super) {
    __extends(G1info_subInfo, _super);
    function G1info_subInfo() {
        var _this = _super.call(this) || this;
        _this.addedge();
        _this.strMap = new GHashMap();
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
        var vs = ToolMrg.getText(408, 27, 24, 0x999999);
        _this.addChild(vs);
        vs.text = "VS";
        _this._team1 = ToolMrg.getText(102, 20, 26, 0x333333, 250);
        _this.addChild(_this._team1);
        _this._team1.height = 34;
        _this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        _this._team1.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._team2 = ToolMrg.getText(490, 20, 26, 0x333333);
        _this.addChild(_this._team2);
        _this._team2.height = 34;
        _this._team2.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._team1.bold = true;
        _this._team2.bold = true;
        _this._lBtn = new egret.Bitmap();
        _this.addChild(_this._lBtn);
        _this._lBtn.x = 692;
        _this._lBtn.y = 18;
        // RES.getResByUrl("resource/assets/images/ui/liao_expert@2x.png",(e)=>{this._lBtn.$setBitmapData(e); },this);
        _this._norangText = ToolMrg.getText(160, 70, 20, 0xffffff, 40);
        _this.addChild(_this._norangText);
        _this._norangText.height = 56;
        _this._norangText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._norangText.textAlign = egret.HorizontalAlign.CENTER;
        _this._rangText = ToolMrg.getText(160, 130, 20, 0xffffff, 40);
        _this.addChild(_this._rangText);
        _this._rangText.height = 56;
        _this._rangText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._rangText.textAlign = egret.HorizontalAlign.CENTER;
        for (var i = 0; i < 6; i++) {
            var obj = new Block(i, 136, 56);
            _this.addChild(obj);
            if (i < 3) {
                obj.x = 212 + 140 * i;
                obj.y = 70;
            }
            else {
                obj.y = 130;
                obj.x = 212 + 140 * (i - 3);
            }
            _this._shapeItem.Gput(i, obj);
        }
        //--边
        _this.setDB();
        return _this;
    }
    G1info_subInfo.prototype.dynamicFun = function (id) {
        if (this._shapeItem.GhasKey(id))
            this._shapeItem.Gget(id).dynamicFun();
    };
    G1info_subInfo.prototype.removeInterception = function () {
        this._moreShape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).removeInterception();
        }
    };
    G1info_subInfo.prototype.touchDown = function (e) {
        if (e.target == this._moreShape) {
            G1more.getInstance.show(this._data, this.strMap);
        }
    };
    G1info_subInfo.prototype.aa = function (data) {
        this._data = data;
        this.id = data.id;
        this._typeText.text = "" + data.league_name;
        this._dayOfcodeText.text = data.day + " " + data.code;
        this._endTime.text = "\u622A\u6B62 " + data.stop;
        this._team1.text = "" + ToolMrg.nameMode2(8, data.team_a_name);
        this._team2.text = "" + ToolMrg.nameMode2(8, data.team_b_name);
        this._rangText.text = "" + data.lot_lose;
        this._norangText.text = "" + data.no_lose;
        this._shapeItem.Gget(0).aa(this._data.id, data.listSX[0], "\u80DC " + data.listSX[0]);
        this._shapeItem.Gget(1).aa(this._data.id, data.listSX[1], "\u5E73 " + data.listSX[1]);
        this._shapeItem.Gget(2).aa(this._data.id, data.listSX[2], "\u8D1F " + data.listSX[2]);
        this._shapeItem.Gget(3).aa(this._data.id, data.listSX[3], "\u80DC " + data.listSX[3]);
        this._shapeItem.Gget(4).aa(this._data.id, data.listSX[4], "\u5E73 " + data.listSX[4]);
        this._shapeItem.Gget(5).aa(this._data.id, data.listSX[5], "\u8D1F " + data.listSX[5]);
        this._moreShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).addInterception();
        }
    };
    /**改变样式 */
    G1info_subInfo.prototype.changeText = function (arr) {
        var _this = this;
        this.strMap.clear();
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).clear();
        }
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                this.strMap.Gput(arr[i], arr[i]);
                if (this._shapeItem.Gget(arr[i])) {
                    this._shapeItem.Gget(arr[i]).selectType = true;
                    this._shapeItem.Gget(arr[i]).changeCss();
                }
            }
        }
        if (this.strMap.size > 0) {
            this._moreText.text = "\u5DF2\u9009\n\u4E2D" + this.strMap.size + "\n\u9879";
            // this._moreText.textColor = 0xffffff;
        }
        else {
            this._moreText.text = "\u5168\u90E8\n\u9009\u9879";
            // this._moreText.textColor = 0x333333;
        }
        var str = this.strMap.size > 0 ? "gdwf_home@2x.png" : "gdwf_nor_home@2x.png";
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._moreShape.$setBitmapData(e); }, this);
    };
    G1info_subInfo.prototype.clear = function () {
        for (var _i = 0, _a = this._shapeItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._shapeItem.Gget(key).clear();
        }
        this.strMap.clear();
        this.changeText([]);
    };
    /**边 117高度 */
    G1info_subInfo.prototype.addedge = function () {
        var _this = this;
        var norangShape = new egret.Bitmap();
        this.addChild(norangShape);
        norangShape.x = 160;
        norangShape.y = 70;
        RES.getResByUrl("resource/assets/images/ui/sqiu_home@2x.png", function (e) { norangShape.$setBitmapData(e); }, this);
        this._rangShape = new egret.Bitmap();
        this.addChild(this._rangShape);
        this._rangShape.x = 160;
        this._rangShape.y = 130;
        RES.getResByUrl("resource/assets/images/ui/rqiu_home@2x.png", function (e) { _this._rangShape.$setBitmapData(e); }, this);
        this._moreShape = new egret.Bitmap();
        this.addChild(this._moreShape);
        this._moreShape.touchEnabled = true;
        this._moreShape.x = 644;
        this._moreShape.y = 70;
        RES.getResByUrl("resource/assets/images/ui/gdwf_nor_home@2x.png", function (e) { _this._moreShape.$setBitmapData(e); }, this);
        RES.getResByUrl("resource/assets/images/ui/gdwf_home@2x.png", function (e) { }, this);
        this._moreText = ToolMrg.getText(644, 70, 20, 0xF72E52, 80);
        this.addChild(this._moreText);
        this._moreText.height = 116;
        this._moreText.lineSpacing = 15;
        this._moreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moreText.textAlign = egret.HorizontalAlign.CENTER;
        this._moreText.text = "全部\n选项";
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 208.5, 750, 1.5);
        shape.graphics.endFill();
    };
    /**适配处理 */
    G1info_subInfo.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 210;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
            _this._mShareC.$setBitmapData(e);
        }, this);
        this.addChildAt(this._mShareC, 0);
    };
    return G1info_subInfo;
}(egret.DisplayObjectContainer));
__reflect(G1info_subInfo.prototype, "G1info_subInfo");
//# sourceMappingURL=G1info.js.map