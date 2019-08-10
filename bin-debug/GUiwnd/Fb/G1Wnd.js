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
/**过关 */
var G1Wnd = (function (_super) {
    __extends(G1Wnd, _super);
    function G1Wnd() {
        var _this = _super.call(this) || this;
        /**为所选数组 */
        _this._arr = [];
        _this.touchEnabled = true;
        _this.allItem = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this.addScoll();
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(G1Wnd, "getInstance", {
        get: function () {
            if (G1Wnd._mInstance == undefined)
                G1Wnd._mInstance = new G1Wnd();
            return G1Wnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    //测试数据
    G1Wnd.prototype.test = function () {
        var id = 0;
        for (var i = 0; i < 3; i++) {
            var fb = new GHashMap();
            for (var k = 0; k < 3; k++) {
                var dd = new FootballData();
                dd.code = "5";
                dd.id = id;
                dd.time = "2019-06-06 周五";
                for (var j = 0; j < 9; j++) {
                    dd.listSX[j] = j;
                }
                dd.day = "周三";
                dd.league_name = "欧冠杯";
                dd.lot_lose = -1;
                dd.no_lose = 0;
                dd.team_a_name = "皇家马德里";
                dd.team_b_name = "巴塞罗那";
                dd.stop = "20:50";
                fb.Gput(dd.id, dd);
                id += 1;
            }
            FootballDataMrg.getInstance._mZQLB.Gput("2019-06-0" + (3 + i) + " \u5468\u4E94", fb);
        }
    };
    /**获取当前所选数组长度 */
    G1Wnd.prototype.getArrSize = function () {
        return this._arr;
    };
    G1Wnd.prototype.ClickRemove = function (id) {
        if (id != undefined) {
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                var item = this._item.Gget(key).getSubItem();
                for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    if (item.Gget(akey).id == id)
                        item.Gget(akey).clear();
                }
            }
            var arr = [];
            for (var i = 0; i < this._arr.length; i++) {
                if (this._arr[i].dlxId != id)
                    arr = arr.concat(this._arr[i]);
            }
            this._arr = arr;
            this._selectText.text = "" + arr.length;
            if (this.allItem.GhasKey(id))
                this.allItem.GremoveByKey(id);
        }
        else {
            this.clearAllData();
        }
    };
    G1Wnd.prototype.updata = function () {
        var _this = this;
        var item = FootballDataMrg.getInstance._mZQLB;
        var objHeight = 0;
        var obj;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new G1infoTop();
                this._item.Gput(key, obj);
            }
            obj.addInterception();
            obj.aa(item.Gget(key), key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
        if (item.size <= 0 && this._mZWSJTip != undefined) {
            this._mZWSJTip.visible = true;
        }
        else {
            if (this._mZWSJTip == undefined) {
                this._mZWSJTip = new egret.Bitmap();
                RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", function (e) {
                    _this._mZWSJTip.$setBitmapData(e);
                    _this._mZWSJTip.x = (GameMain.getInstance.StageWidth - _this._mZWSJTip.width) * 0.5;
                    _this._mZWSJTip.y = (GameMain.getInstance.StageHeight - _this._mZWSJTip.height) * 0.5;
                }, this);
                this.addChild(this._mZWSJTip);
            }
            this._mZWSJTip.visible = false;
        }
    };
    /**滑动时更新数据 */
    G1Wnd.prototype.updateYH = function () {
        var objHeight = 0;
        var obj;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
        }
    };
    /**之刷新数据 */
    G1Wnd.prototype.onlyFreshData = function () {
        var item = FootballDataMrg.getInstance._mZQLB;
        var obj;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
                obj.freshData(item.Gget(key));
            }
        }
    };
    G1Wnd.prototype.screenSelect = function (data) {
        var item = data;
        var objHeight = 0;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new G1infoTop();
                this._item.Gput(key, obj);
            }
            obj.addInterception();
            obj.aa(item.Gget(key), key);
            obj.y = objHeight;
            objHeight = objHeight + obj.hheight;
            obj.optimization();
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, item);
    };
    G1Wnd.prototype.changeItemHeight = function () {
        var objHeight = 0;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            obj.y = objHeight;
            objHeight = obj.hheight + objHeight;
        }
    };
    /**获取滚动位置 */
    G1Wnd.prototype.getViewYYTop = function () {
        return this._scroView.scrollTop;
    };
    /**清除G1所有数据 */
    G1Wnd.prototype.clearAllData = function () {
        var data;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            data = this._item.Gget(key);
            var item = data.getSubItem();
            for (var _b = 0, _c = item.keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                item.Gget(akey).clear();
            }
        }
        this._arr = [];
        this._selectText.text = "0";
        this.allItem.clear();
    };
    /**id:赛事id */
    G1Wnd.prototype.upChangeSubMore = function (id, data) {
        var obj = new zqObjData();
        obj.dlxId = id;
        obj.xlxIdList = [];
        for (var _i = 0, _a = data.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            obj.xlxIdList = obj.xlxIdList.concat(data.Gget(key));
        }
        this.allItem.Gput(id, obj);
        this.setitemToArr();
        for (var _b = 0, _c = this._item.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            var obj_1 = this._item.Gget(key);
            for (var _d = 0, _e = obj_1.getSubItem().keys; _d < _e.length; _d++) {
                var akey = _e[_d];
                if (akey == id) {
                    obj_1.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
        }
    };
    /**传入当前id 以及足球表对象 */
    G1Wnd.prototype.changeTextAndData = function (id, index, isboom) {
        if (isboom) {
            var obj = void 0;
            if (this.allItem.GhasKey(id)) {
                obj = this.allItem.Gget(id);
            }
            else {
                obj = new zqObjData();
                obj.dlxId = id;
                this.allItem.Gput(id, obj);
            }
            if (obj.xlxIdList.length > 0) {
                obj.xlxIdList = obj.xlxIdList.concat(index);
            }
            else {
                obj.xlxIdList = [index];
            }
        }
        else {
            if (this.allItem.Gget(id)) {
                var obj = this.allItem.Gget(id);
                if (obj.xlxIdList.length > 0) {
                    var arr = [];
                    for (var i = 0; i < obj.xlxIdList.length; i++) {
                        if (obj.xlxIdList[i] != index)
                            arr = arr.concat(obj.xlxIdList[i]);
                    }
                    obj.xlxIdList = arr;
                }
            }
        }
        this.setitemToArr();
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = this._item.Gget(key);
            for (var _b = 0, _c = obj.getSubItem().keys; _b < _c.length; _b++) {
                var akey = _c[_b];
                if (akey == id) {
                    obj.getSubItem().Gget(akey).changeText(this.allItem.Gget(id).xlxIdList);
                }
            }
        }
    };
    /**map转换arr */
    G1Wnd.prototype.setitemToArr = function () {
        var arr = [];
        for (var _i = 0, _a = this.allItem.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            if (this.allItem.Gget(key).xlxIdList.length != 0)
                arr = arr.concat(this.allItem.Gget(key));
        }
        this._arr = arr;
        this._selectText.text = "" + this._arr.length;
    };
    G1Wnd.prototype.GoChange = function (e) {
        if (e.target == this._clearBtn) {
            this.clearAllData();
        }
        else if (e.target == this._goBtn) {
            if (this._arr != undefined && this._arr.length > 1 && this._arr.length < 9) {
                this._data = GuessingFootballMrg.getInstance.getGuessingList(this._arr);
                GoFBBuy.getInstance.show(this._data, this._arr, 0);
            }
            else
                Alertpaner.getInstance.show("请选择2场以上赛事");
        }
    };
    G1Wnd.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._downContain);
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
            bj.y = -10;
        }, this);
        this._clearBtn = new egret.Bitmap();
        this._downContain.addChild(this._clearBtn);
        this._clearBtn.x = 26;
        this._clearBtn.y = 20;
        this._clearBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png", function (e) {
            _this._clearBtn.$setBitmapData(e);
        }, this);
        var downT1 = ToolMrg.getText(0, 10, 32, 0x333333, 750);
        this._downContain.addChild(downT1);
        downT1.textAlign = egret.HorizontalAlign.CENTER;
        downT1.text = "已选择   场比赛";
        this._selectText = ToolMrg.getText(0, 10, 32, 0xF72E52, 750);
        this._downContain.addChild(this._selectText);
        this._selectText.textAlign = egret.HorizontalAlign.CENTER;
        this._selectText.text = "0";
        var downT2 = ToolMrg.getText(0, 58, 24, 0x999999, 750);
        this._downContain.addChild(downT2);
        downT2.textAlign = egret.HorizontalAlign.CENTER;
        downT2.text = "请至少选择2场比赛";
        this._selectBtn = new egret.Bitmap();
        this._downContain.addChild(this._selectBtn);
        this._goBtn = new egret.Bitmap();
        this._downContain.addChild(this._goBtn);
        this._goBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) {
            _this._goBtn.$setBitmapData(e);
            _this._goBtn.x = 556;
            _this._goBtn.y = 8;
        }, this);
        var goText = ToolMrg.getText(556, 28, 32, 0xFFFFFF, 176);
        this._downContain.addChild(goText);
        goText.height = 44;
        goText.verticalAlign = egret.VerticalAlign.MIDDLE;
        goText.textAlign = egret.HorizontalAlign.CENTER;
        goText.text = "选好了";
        this._clearBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.GoChange, this);
    };
    /**刷新所有赛事数据 */
    G1Wnd.prototype.httpUpdata = function (e) {
        if (e.data != undefined) {
            if (e.data.cf == 1) {
                this.clearAllData();
                this.updata();
            }
            else if (e.data.value == 1 && this._item.size > 0) {
                this.onlyFreshData();
            }
            else {
                this.updata();
            }
        }
    };
    G1Wnd.prototype.show = function () {
        GUIManager.getInstance.topLay.addChild(this);
        this.updata();
        FT_List.getInstance.sendHttp(this);
        this._scroView.addEventListener(egret.Event.CHANGE, this.change, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_FT_List, this.httpUpdata, this);
    };
    G1Wnd.prototype.change = function (event) {
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).optimization();
        }
    };
    G1Wnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._data = [];
            this.clearAllData();
            this._scroView.setScrollTop(0);
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                this._item.Gget(key).removeInterception();
                for (var _b = 0, _c = this._item.Gget(key).getSubItem().keys; _b < _c.length; _b++) {
                    var akey = _c[_b];
                    this._item.Gget(key).getSubItem().Gget(akey).removeInterception();
                }
            }
        }
        this._scroView.removeEventListener(egret.Event.CHANGE, this.change, this);
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List, this.httpUpdata, this);
    };
    G1Wnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    G1Wnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return G1Wnd;
}(egret.DisplayObjectContainer));
__reflect(G1Wnd.prototype, "G1Wnd");
//# sourceMappingURL=G1Wnd.js.map