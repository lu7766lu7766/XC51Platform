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
/**更多玩法 比分 */
var G4more = (function (_super) {
    __extends(G4more, _super);
    function G4more() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._numItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        _this._mContain.touchEnabled = true;
        var bj = new egret.Shape();
        _this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0, 0, 720, 720, 24);
        bj.graphics.endFill();
        _this._mContain.x = (GameMain.getInstance.StageWidth - _this._mContain.width) * 0.5;
        _this._mContain.y = (GameMain.getInstance.StageHeight - _this._mContain.height) * 0.5;
        var shape1 = new egret.Shape();
        _this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26, 118, 40, 192, 20);
        shape1.graphics.endFill();
        var text1 = ToolMrg.getText(26, 118, 20, 0xffffff, 40);
        _this._mContain.addChild(text1);
        text1.height = 192;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "胜";
        var shape2 = new egret.Shape();
        _this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26, 316, 40, 62, 20);
        shape2.graphics.endFill();
        var text2 = ToolMrg.getText(26, 316, 20, 0xffffff, 40);
        _this._mContain.addChild(text2);
        text2.height = 62;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "平";
        var shape3 = new egret.Shape();
        _this._mContain.addChild(shape3);
        shape3.graphics.beginFill(0x6EC858);
        shape3.graphics.drawRoundRect(26, 384, 40, 192, 20);
        shape3.graphics.endFill();
        var text3 = ToolMrg.getText(26, 384, 20, 0xffffff, 40);
        _this._mContain.addChild(text3);
        text3.height = 192;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.textAlign = egret.HorizontalAlign.CENTER;
        text3.text = "负";
        _this._team1 = ToolMrg.getText(70, 38, 32, 0x333333, 200);
        _this._mContain.addChild(_this._team1);
        _this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        _this._team1.bold = true;
        _this._team2 = ToolMrg.getText(454, 38, 32, 0x333333);
        _this._mContain.addChild(_this._team2);
        _this._team2.bold = true;
        _this._vs = ToolMrg.getText(346, 45, 24, 0x999999);
        _this._mContain.addChild(_this._vs);
        _this._vs.bold = true;
        _this._vs.text = "VS";
        _this._cancelBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._cancelBtn);
        _this._cancelBtn.touchEnabled = true;
        _this._cancelBtn.x = 66;
        _this._cancelBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) { _this._cancelBtn.$setBitmapData(e); }, _this);
        _this._defineBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._defineBtn);
        _this._defineBtn.touchEnabled = true;
        _this._defineBtn.x = 382;
        _this._defineBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) { _this._defineBtn.$setBitmapData(e); }, _this);
        var cancelText = ToolMrg.getText(74, 627, 32, 0x333333, 276);
        _this._mContain.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";
        var defineText = ToolMrg.getText(382, 627, 32, 0xffffff, 276);
        _this._mContain.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";
        _this.joinBlock();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(G4more, "getInstance", {
        get: function () {
            if (G4more._mInstance == undefined)
                G4more._mInstance = new G4more();
            return G4more._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    G4more.prototype.show = function (obj, data) {
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._numItem.Gput(key, data.Gget(key));
        }
        this._obj = obj;
        this._id = obj.id;
        this._team1.text = this._obj.team_a_name;
        this._team2.text = this._obj.team_b_name;
        this.startDataOfCss();
        this.upThisValue(obj.id, obj.listSX);
    };
    //进入时显示选中
    G4more.prototype.startDataOfCss = function () {
        for (var _i = 0, _a = this._numItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    };
    /**如果返回id与点进id不匹配则不刷新 */
    G4more.prototype.upThisValue = function (id, data) {
        if (id != this._id) {
            Alertpaner.getInstance.show("返回比赛id不匹配");
            this.hide();
            return;
        }
        for (var i = 6; i < 37; i++) {
            this._item.Gget(i).aa(this._obj.id, data[i], null, null, data[i]);
        }
    };
    G4more.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this.clearDataOfCss();
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).aa(this._obj.id, null, null, null, "");
            }
        }
        // CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List_More, this.updateData, this);
    };
    //hide时清理数值
    G4more.prototype.clearDataOfCss = function () {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.selectType = false;
            obj.changeCss();
        }
        this._numItem.clear();
    };
    /**适配处理 */
    G4more.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    };
    G4more.prototype.joinBlock = function () {
        //6-17
        var bjTop = 0;
        for (var i = 6; i < 18; i++) {
            var obj = new Block(i, 120, 62, null, null, 1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index, obj);
            if (bjTop < 5) {
                obj.y = 118;
                obj.x = 78 + 124 * bjTop;
            }
            else if (bjTop < 10) {
                obj.y = 184;
                obj.x = 78 + 124 * (bjTop - 5);
            }
            else {
                obj.y = 250;
                obj.x = 78 + 124 * (bjTop - 10);
            }
            bjTop += 1;
        }
        //18
        var obj18 = new Block(18, 368, 62, null, null, 1);
        obj18.x = 326;
        obj18.y = 250;
        this._mContain.addChild(obj18);
        this._item.Gput(obj18.index, obj18);
        //19-23
        for (var i = 19; i < 24; i++) {
            var obj = new Block(i, 120, 62, null, null, 1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index, obj);
            obj.y = 316;
            obj.x = 78 + 124 * (i - 19);
        }
        //24-35
        var bjDown = 0;
        for (var i = 24; i < 36; i++) {
            var obj = new Block(i, 120, 62, null, null, 1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index, obj);
            if (bjDown < 5) {
                obj.y = 382;
                obj.x = 78 + 124 * bjDown;
            }
            else if (bjDown < 10) {
                obj.y = 448;
                obj.x = 78 + 124 * (bjDown - 5);
            }
            else {
                obj.y = 514;
                obj.x = 78 + 124 * (bjDown - 10);
            }
            bjDown += 1;
        }
        //36
        var obj36 = new Block(36, 368, 62, null, null, 1);
        obj36.x = 326;
        obj36.y = 514;
        this._mContain.addChild(obj36);
        this._item.Gput(obj36.index, obj36);
        for (var i = 6; i < 37; i++) {
            this._item.Gget(i).aa(null, null, null, FootballDataMrg.getInstance.fbNameItem[i]);
        }
    };
    G4more.prototype.touchDown = function (e) {
        if (e.target == this._defineBtn) {
            OnePass.getInstance.upChangeSubMore(this._id, this._numItem);
        }
        this.hide();
    };
    G4more.prototype.changeNumItem = function (index, isboom) {
        if (isboom) {
            this._numItem.Gput(index, index);
        }
        else {
            if (this._numItem.GhasKey(index))
                this._numItem.GremoveByKey(index);
        }
    };
    G4more.prototype.addInterception = function () {
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).addInterception();
        }
    };
    G4more.prototype.removeInterception = function () {
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).removeInterception();
        }
    };
    return G4more;
}(egret.DisplayObjectContainer));
__reflect(G4more.prototype, "G4more");
//# sourceMappingURL=G4more.js.map