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
/**全部赛事*/
var AllSelectSS = (function (_super) {
    __extends(AllSelectSS, _super);
    function AllSelectSS() {
        var _this = _super.call(this) || this;
        _this.y = 150;
        _this._mListObj = new GHashMap();
        _this._spriteList = new GHashMap();
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.GSlideOb = new GSlideObj();
        _this._mShareC = new egret.Shape();
        _this.xianshi();
        return _this;
    }
    Object.defineProperty(AllSelectSS, "getInstance", {
        get: function () {
            if (AllSelectSS._mInstance == undefined)
                AllSelectSS._mInstance = new AllSelectSS();
            return AllSelectSS._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**返回数据列表*/
    AllSelectSS.prototype.getlist = function () {
        return this._mListObj;
    };
    AllSelectSS.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 10;
        scroView.scrollSpeed = 0.2;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 100 - this.y;
        // scroView.bounces = true;
    };
    /**初始化所有数据*/
    AllSelectSS.prototype.initallInfo = function () {
        this._mContainQB.removeChildren();
        var len = 0;
        var list;
        if (BakorfallViewMrg.stateIndex == 0) {
            FootballConfinData.getInstance.selectList(SelectMrg.inIndex - 1);
            list = selectFootInfoData.getInstance.getlist();
            len = list.size;
        }
        else {
            BasketballConfinData.getInstance.selectList(SelectMrg.inIndex - 1);
            list = selectBaketInfoData.getInstance.getlist();
            len = list.size;
        }
        if (list.size == 0) {
            this._mZWSJTip.visible = true;
            this.addChild(this._mZWSJTip);
        }
        else {
            this._mZWSJTip.visible = false;
            if (this._mZWSJTip.parent != undefined) {
                this._mZWSJTip.parent.removeChild(this._mZWSJTip);
            }
        }
        // this.initallbg(len);
        this.hideData();
        var dataObj;
        var dataInfo;
        var pointx = 0;
        var pointy = 0;
        for (var i = 0; i < len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new selectssItem();
                this._mListObj.Gput(i, dataObj);
            }
            if (i != 0) {
                if (i % 3 == 0) {
                    pointy++;
                }
            }
            dataInfo = list.Gget(i + 1);
            pointx = i % 3;
            dataObj.setPoint(28 + pointx * 240, 28 + pointy * 100);
            dataObj.setID(i + 1);
            dataObj.setSTatusID(1);
            if (dataInfo != undefined) {
                dataObj.setName(dataInfo.name);
                dataObj.setssID(dataInfo.id);
            }
            if (dataObj.parent == undefined) {
                this._mContainQB.addChild(dataObj);
            }
        }
        this.setDB(this._mContainQB.height);
    };
    AllSelectSS.prototype.initallbg = function (l) {
        var lenn = Math.ceil(l / 3);
        var _loop_1 = function (i) {
            var speite = this_1._spriteList.Gget(i);
            if (speite == undefined) {
                speite = new egret.Bitmap();
                RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
                    speite.$setBitmapData(e);
                    speite.width = 750;
                    speite.height = 100;
                }, this_1);
                this_1._spriteList.Gput(i, speite);
            }
            speite.x = 0;
            speite.y = 28 + i * 100;
            speite.alpha = 0.1;
            if (i == lenn - 1) {
                speite.height = 120;
            }
            if (speite.parent == undefined) {
                this_1._mContainQB.addChild(speite);
            }
        };
        var this_1 = this;
        for (var i = 0; i < lenn + 1; i++) {
            _loop_1(i);
        }
    };
    AllSelectSS.prototype.show = function () {
        if (this.parent == undefined) {
            SelectMrg.getInstance.addChild(this);
        }
        this._scroViewQB.scrollTop = 10;
        this.initallInfo();
    };
    AllSelectSS.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this._mContainQB.removeChildren();
    };
    /**暂时无数据 */
    AllSelectSS.prototype.xianshi = function () {
        var _this = this;
        this._mZWSJTip = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/wjl_default@2x.png", function (e) {
            _this._mZWSJTip.$setBitmapData(e);
            _this._mZWSJTip.x = (GameMain.getInstance.StageWidth - _this._mZWSJTip.width) * 0.5;
            _this._mZWSJTip.y = (GameMain.getInstance.StageHeight - _this._mZWSJTip.height) * 0.5;
        }, this);
        this._mZWSJTip.visible = false;
    };
    //清除对象数组
    AllSelectSS.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
    };
    /**适配处理 */
    AllSelectSS.prototype.setDB = function (heighr) {
        var _this = this;
        if (this.bgdian == undefined) {
            this.bgdian = new egret.Bitmap();
            RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) {
                _this.bgdian.$setBitmapData(e);
            }, this);
        }
        this.bgdian.width = 750;
        this.bgdian.alpha = 0.1;
        this.bgdian.height = heighr + 50;
        if (this.bgdian.parent == undefined) {
            this._mContainQB.addChildAt(this.bgdian, 0);
        }
        // this._mShareC.graphics.clear();
        // this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        // this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, heighr + 80);
        // this._mShareC.graphics.endFill();
        // this._mContainQB.addChildAt(this._mShareC, 0);
    };
    return AllSelectSS;
}(egret.DisplayObjectContainer));
__reflect(AllSelectSS.prototype, "AllSelectSS");
/**筛选赛事item*/
var selectssItem = (function (_super) {
    __extends(selectssItem, _super);
    function selectssItem() {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.statusID = 1; //状态id(1 为选中 2没有选中) 
        _this.ssID = 0; //赛事id
        _this.touchEnabled = true;
        _this.BG = new egret.Bitmap();
        _this.BG.x = 0;
        _this.BG.y = 0;
        _this.BG.width = 212;
        _this.BG.height = 80;
        _this.addChild(_this.BG);
        // RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);
        _this.ssName = ToolMrg.getText(0, 0, 24, 0x333333);
        _this.ssName.text = "白露西亚";
        _this.ssName.width = 212;
        _this.ssName.height = 80;
        _this.ssName.textAlign = egret.HorizontalAlign.CENTER;
        _this.ssName.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.ssName.bold = true;
        _this.ssName.fontFamily = "微软雅黑";
        _this.addChild(_this.ssName);
        _this.addevent();
        return _this;
    }
    selectssItem.prototype.setID = function (id) {
        this.myid = id;
    };
    /**获取是否选中id*/
    selectssItem.prototype.getstatusID = function () {
        return this.statusID;
    };
    selectssItem.prototype.setSTatusID = function (type) {
        this.statusID = type;
        if (this.statusID == 1) {
            RES.getResByUrl("resource/assets/images/ui/sxk1_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else if (this.statusID == 2) {
            RES.getResByUrl("resource/assets/images/ui/sxk2_home@2x.png", this.bgBack, this, RES.ResourceItem.TYPE_IMAGE);
        }
        LowSelectBnt.getInstance.setHideBS(selectFileData.getInstance.gethideNum());
    };
    selectssItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    selectssItem.prototype.bgBack = function (data, url) {
        if (data != undefined && this.BG != undefined) {
            this.BG.$setBitmapData(data);
        }
    };
    /**设置赛事id */
    selectssItem.prototype.setssID = function (id) {
        this.ssID = id;
    };
    selectssItem.prototype.getssID = function () {
        return this.ssID;
    };
    /**获取赛事名字*/
    selectssItem.prototype.getssName = function () {
        return this.ssName.text;
    };
    selectssItem.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    selectssItem.prototype.onTouch = function () {
        if (this.statusID == 1) {
            this.statusID = 2;
        }
        else {
            this.statusID = 1;
        }
        this.setSTatusID(this.statusID);
    };
    /**设置名字*/
    selectssItem.prototype.setName = function (str) {
        this.ssName.text = str;
    };
    return selectssItem;
}(egret.DisplayObjectContainer));
__reflect(selectssItem.prototype, "selectssItem");
//# sourceMappingURL=AllSelectSS.js.map