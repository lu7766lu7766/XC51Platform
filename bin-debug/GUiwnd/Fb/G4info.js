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
/**足 比分 */
var G4infoTop = (function (_super) {
    __extends(G4infoTop, _super);
    function G4infoTop() {
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
    G4infoTop.prototype.aa = function (data, key) {
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
                obj = new G4info_subInfo();
                this._item.Gput(key_1, obj);
            }
            obj.aa(data.Gget(key_1), true);
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
    G4infoTop.prototype.optimization = function () {
        var data;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._item.Gget(key);
            if (this._type == false) {
                var yy = (this.y + data.y) - G4Wnd.getInstance.getViewYYTop();
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
    G4infoTop.prototype.freshData = function (data) {
        var obj;
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key), false);
            }
        }
    };
    //收起 展开显示
    G4infoTop.prototype.changeUpDown = function () {
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
        // G4Wnd.getInstance.changeItemHeight();
        this.changeImg();
        G4Wnd.getInstance.updateYH();
    };
    G4infoTop.prototype.changeImg = function () {
        var _this = this;
        if (this._type)
            RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
        else
            RES.getResByUrl("resource/assets/images/ui/shouqi_nav@2x.png", function (e) { _this._topImg.$setBitmapData(e); }, this);
    };
    G4infoTop.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = true;
        }
    };
    G4infoTop.prototype.removeInterception = function () {
        this._type = false;
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeUpDown, this);
            this._isInterception = false;
        }
    };
    G4infoTop.prototype.getSubItem = function () {
        return this._item;
    };
    /**适配处理 */
    G4infoTop.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 48);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    return G4infoTop;
}(egret.DisplayObjectContainer));
__reflect(G4infoTop.prototype, "G4infoTop");
var G4info_subInfo = (function (_super) {
    __extends(G4info_subInfo, _super);
    function G4info_subInfo() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this.addedge();
        _this.strMap = new GHashMap();
        var danImg = new egret.Bitmap();
        _this.addChild(danImg);
        RES.getResByUrl("resource/assets/images/ui/djb_home@2x.png", function (e) { danImg.$setBitmapData(e); }, _this);
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
        //--边
        _this.setDB();
        return _this;
    }
    G4info_subInfo.prototype.aa = function (data, isFresh) {
        this._data = data;
        this.id = data.id;
        this._typeText.text = "" + data.league_name;
        this._dayOfcodeText.text = data.day + " " + data.code;
        this._endTime.text = "\u622A\u6B62 " + data.stop;
        this._team1.text = "" + ToolMrg.nameMode2(8, data.team_a_name);
        this._team2.text = "" + ToolMrg.nameMode2(8, data.team_b_name);
        this.addInterception();
        if (isFresh == true)
            this.changeText([]);
    };
    G4info_subInfo.prototype.clear = function () {
        this.changeText([]);
    };
    G4info_subInfo.prototype.changeText = function (arr) {
        var _this = this;
        this.strMap.clear();
        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                this.strMap.Gput(arr[i], arr[i]);
            }
        }
        if (this.strMap.size > 0) {
            this._boxText.textColor = 0xffffff;
            var str_1 = "";
            var a = true;
            for (var _i = 0, _a = this.strMap.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                if (a) {
                    str_1 = FootballDataMrg.getInstance.fbNameItem[this.strMap.Gget(key)];
                }
                else {
                    str_1 = str_1 + "," + FootballDataMrg.getInstance.fbNameItem[this.strMap.Gget(key)];
                }
                a = false;
            }
            this._boxText.text = str_1;
        }
        else {
            this._boxText.textColor = 0xf72e52;
            this._boxText.text = "点击选择比分投注";
        }
        var str = this.strMap.size > 0 ? "bfbg_home@2x.png" : "bfbg_nor_home@2x.png";
        RES.getResByUrl("resource/assets/images/ui/" + str, function (e) { _this._boxShape.$setBitmapData(e); }, this);
        this._boxText.text = ToolMrg.nameMode2(12, this._boxText.text);
    };
    /**边 117高度 */
    G4info_subInfo.prototype.addedge = function () {
        var _this = this;
        this._boxShape = new egret.Bitmap();
        this.addChild(this._boxShape);
        this._boxShape.x = 214;
        this._boxShape.y = 86;
        RES.getResByUrl("resource/assets/images/ui/bfbg_nor_home@2x.png", function (e) { _this._boxShape.$setBitmapData(e); }, this);
        this._boxText = ToolMrg.getText(214, 86, 28, 0xF72E52, 420);
        this.addChild(this._boxText);
        this._boxText.height = 88;
        this._boxText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._boxText.textAlign = egret.HorizontalAlign.CENTER;
        this._boxText.text = "点击选择比分投注";
        var shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0, 223.5, 750, 1.5);
        shape.graphics.endFill();
        this._boxShape.touchEnabled = true;
    };
    G4info_subInfo.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._boxShape.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    G4info_subInfo.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._boxShape.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    G4info_subInfo.prototype.touchDown = function (e) {
        G4more.getInstance.show(this._data, this.strMap);
    };
    /**适配处理 */
    G4info_subInfo.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 225;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
            _this._mShareC.$setBitmapData(e);
        }, this);
        this.addChildAt(this._mShareC, 0);
    };
    return G4info_subInfo;
}(egret.DisplayObjectContainer));
__reflect(G4info_subInfo.prototype, "G4info_subInfo");
//# sourceMappingURL=G4info.js.map