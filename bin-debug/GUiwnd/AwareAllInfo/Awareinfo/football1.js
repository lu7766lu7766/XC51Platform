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
/**足球即时数据显示*/
var football1 = (function (_super) {
    __extends(football1, _super);
    function football1() {
        var _this = _super.call(this) || this;
        _this.ifshow = false; //是否通过show进来  
        _this.y = -40 + GameValue.adaptationScreen;
        _this._mListObj = new GHashMap();
        _this._mContainQB = new egret.DisplayObjectContainer();
        _this._scroViewQB = new egret.ScrollView();
        _this.addChild(_this._scroViewQB);
        _this.addScoll(_this._mContainQB, _this._scroViewQB);
        _this.GSlideOb = new GSlideObj();
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xF5F5F7);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 10);
        link.graphics.endFill();
        return _this;
    }
    Object.defineProperty(football1, "getInstance", {
        get: function () {
            if (football1._mInstance == undefined)
                football1._mInstance = new football1();
            return football1._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    football1.prototype.addScoll = function (contain, scroView) {
        scroView.x = 0;
        scroView.y = 10;
        scroView.scrollSpeed = 0.4;
        //设置滚动内容
        scroView.setContent(contain);
        scroView.bounces = false;
        scroView.verticalScrollPolicy = 'on';
        scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        scroView.width = GameMain.getInstance.StageWidth;
        scroView.height = GameMain.getInstance.StageHeight - 320 - this.y;
        scroView.bounces = true;
    };
    football1.prototype.show = function (list11) {
        var connet = FallViewMrg.getInstance.getconnet();
        if (this.parent == undefined) {
            connet.addChild(this);
        }
        this.ifshow = true;
        this.initallInfo(list11);
    };
    football1.prototype.hide = function () {
        if (this == undefined)
            return;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        this.hideData();
    };
    /**初始化所有数据*/
    football1.prototype.initallInfo = function (list11) {
        this.hideData();
        this._scroViewQB.setScrollTop(20);
        var len = 0;
        var list;
        len = FootballConfinData.getInstance.getlist().size;
        list = FootballConfinData.getInstance.getlist();
        if (list11 != undefined && list11.size > 0) {
            len = list11.size;
            list = list11;
        }
        var dataObj;
        for (var i = 0; i < len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = footballitem1.getObj();
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i + 1);
            dataObj.ssetjiqoqNum(0, 0);
            // let data: footballCofObj = FootballConfinData.getInstance.getInfo(i + 1);
            var data = list.Gget(i + 1);
            if (data != undefined) {
                dataObj.setInfo1(data.name, data.timer, data.leftname, data.bfText, data.bcBF, data.rightname);
                if (dataObj.ifsetIcon == false) {
                    dataObj.setIcon(data.leftIcon);
                    dataObj.setIconright(data.rightIcon);
                    dataObj.ifsetIcon = true;
                }
                dataObj.setLeft(data.leftyellownum, data.leftrednum);
                dataObj.setright(data.rightyellownum, data.rightrednum);
                dataObj.setxingxing(data.ifgz);
                dataObj.setcolor(data.color);
                var status_1 = data.status;
                if (status_1 == 1 || status_1 == 2 || status_1 == 3 || status_1 == 4 || status_1 == 5) {
                    dataObj.resultTextset(1, data.touding);
                }
                else {
                    if (status_1 == 0) {
                        dataObj.resultTextset(3, data.getstatus());
                    }
                    else {
                        dataObj.resultTextset(1, data.getstatus());
                    }
                }
                dataObj.setmothday(data.rqday);
                dataObj.setssID(data.id);
            }
            dataObj.setPoint(0, 10 + (i) * 125);
            if (list11 != undefined) {
                if (dataObj.parent == undefined) {
                    this._mContainQB.addChild(dataObj);
                }
            }
        }
        if (len > 0) {
            BakorfallViewMrg.getInstance.setDecide(false);
        }
        else {
            BakorfallViewMrg.getInstance.setDecide(true);
        }
        if (this.ifshow == true) {
            this._scroViewQB.setScrollTop(20);
            this.ifshow = false;
        }
        if (list11 == undefined) {
            this.GSlideOb.showDataByMap(15, 125, this._scroViewQB, this._mContainQB, this._mListObj);
        }
    };
    //清除对象数组
    football1.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                data.ifsetIcon = false;
                GObjPool.getInstance.Gadd2Pool(data);
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
        this._mListObj.clear();
    };
    return football1;
}(egret.DisplayObjectContainer));
__reflect(football1.prototype, "football1");
var footballitem1 = (function (_super) {
    __extends(footballitem1, _super);
    function footballitem1() {
        var _this = _super.call(this) || this;
        _this.ifsetIcon = false; //是否设置过头像
        _this.myid = 0; //自身id
        _this.ssid = 0; //赛事id
        if (_this._mBg == undefined) {
            // this._mBg = new egret.Shape();
            // this.addChild(this._mBg);
            // this._mBg.graphics.beginFill(0xffffff);
            // this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 122);
            // this._mBg.graphics.endFill()
            // let link = new egret.Shape();
            // this.addChild(link);
            // link.graphics.beginFill(0xF5F5F7);
            // link.graphics.drawRect(0, 122, GameMain.getInstance.StageWidth, 3);
            // link.graphics.endFill();
            _this._mBg = new egret.Bitmap();
            _this._mBg.x = 0;
            _this._mBg.y = 0;
            _this._mBg.width = 750;
            _this._mBg.height = 122;
            _this.addChild(_this._mBg);
            RES.getResByUrl("resource/assets/images/ui/bai.png", _this.bgBackwhite, _this, RES.ResourceItem.TYPE_IMAGE);
            _this._bglowxian = new egret.Bitmap();
            _this._bglowxian.x = 0;
            _this._bglowxian.y = 122;
            _this._bglowxian.width = 750;
            _this._bglowxian.height = 3;
            _this.addChild(_this._bglowxian);
            RES.getResByUrl("resource/assets/images/ui/hui.png", _this.bgBackhui, _this, RES.ResourceItem.TYPE_IMAGE);
        }
        _this.name1 = ToolMrg.getText(28, 16, 20, 0xFF7000, 150);
        _this.name1.text = "欧洲冠杯";
        _this.name1.fontFamily = "微软雅黑";
        _this.name1.bold = true;
        _this.addChild(_this.name1);
        _this.timer = ToolMrg.getText(28, 50, 20, 0x999999, 150);
        _this.timer.text = "19 : 20";
        _this.timer.fontFamily = "微软雅黑";
        _this.timer.bold = true;
        _this.addChild(_this.timer);
        _this.countryleftIcon = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
        _this.countryleftIcon.x = 120;
        _this.countryleftIcon.y = 44;
        _this.countryleftIcon.width = 40;
        _this.countryleftIcon.height = 40;
        _this.addChild(_this.countryleftIcon);
        _this.countryleftName = ToolMrg.getText(170, 51, 24, 0x333333, 165);
        _this.countryleftName.text = "王家马德里";
        _this.countryleftName.fontFamily = "微软雅黑";
        _this.countryleftName.bold = true;
        _this.addChild(_this.countryleftName);
        _this.biNumText = ToolMrg.getText(0, 44, 28, 0x333333, 750);
        _this.biNumText.text = "5 : 8";
        _this.biNumText.textAlign = egret.HorizontalAlign.CENTER;
        _this.biNumText.fontFamily = "微软雅黑";
        _this.biNumText.bold = true;
        _this.addChild(_this.biNumText);
        _this.baNumText = ToolMrg.getText(0, 82, 18, 0x999999, 750);
        _this.baNumText.text = "半场 1:0";
        _this.baNumText.textAlign = egret.HorizontalAlign.CENTER;
        _this.baNumText.fontFamily = "微软雅黑";
        _this.addChild(_this.baNumText);
        _this.redleftbg = new egret.Bitmap();
        _this.redleftbg.x = 246;
        _this.redleftbg.y = 88;
        _this.redleftbg.width = 18;
        _this.redleftbg.height = 18;
        _this.addChild(_this.redleftbg);
        RES.getResByUrl("resource/assets/images/ui/red_match@2x.png", _this.bgBackleftred, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.yellowleftbg = new egret.Bitmap();
        _this.yellowleftbg.x = 270;
        _this.yellowleftbg.y = 88;
        _this.yellowleftbg.width = 18;
        _this.yellowleftbg.height = 18;
        _this.addChild(_this.yellowleftbg);
        RES.getResByUrl("resource/assets/images/ui/yelllow_match@2x.png", _this.bgBackleftyellow, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.reNum = ToolMrg.getText(_this.redleftbg.x, _this.redleftbg.y, 16, 0xffffff, 18);
        _this.reNum.text = "1";
        _this.reNum.height = 18;
        _this.reNum.textAlign = egret.HorizontalAlign.CENTER;
        _this.reNum.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.reNum.fontFamily = "微软雅黑";
        _this.addChild(_this.reNum);
        _this.yellowleft = ToolMrg.getText(_this.yellowleftbg.x, _this.yellowleftbg.y, 16, 0xffffff, 18);
        _this.yellowleft.text = "2";
        _this.yellowleft.height = 18;
        _this.yellowleft.textAlign = egret.HorizontalAlign.CENTER;
        _this.yellowleft.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.yellowleft.fontFamily = "微软雅黑";
        _this.addChild(_this.yellowleft);
        _this.countryrightIcon = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
        _this.countryrightIcon.x = 456;
        _this.countryrightIcon.y = 44;
        _this.countryrightIcon.width = 40;
        _this.countryrightIcon.height = 40;
        _this.addChild(_this.countryrightIcon);
        // RES.getResByUrl("resource/assets/images/ui/qd_default@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);
        _this.countryrightName = ToolMrg.getText(504, 51, 24, 0x333333, 165);
        _this.countryrightName.text = "王家马德里";
        _this.countryrightName.fontFamily = "微软雅黑";
        _this.countryrightName.bold = true;
        _this.addChild(_this.countryrightName);
        _this.redrightbg = new egret.Bitmap();
        _this.redrightbg.x = 484;
        _this.redrightbg.y = 88;
        _this.redrightbg.width = 18;
        _this.redrightbg.height = 18;
        _this.addChild(_this.redrightbg);
        RES.getResByUrl("resource/assets/images/ui/red_match@2x.png", _this.bgBackrightred, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.yellowrightbg = new egret.Bitmap();
        _this.yellowrightbg.x = 460;
        _this.yellowrightbg.y = 88;
        _this.yellowrightbg.width = 18;
        _this.yellowrightbg.height = 18;
        _this.addChild(_this.yellowrightbg);
        RES.getResByUrl("resource/assets/images/ui/yelllow_match@2x.png", _this.bgBackrightyellow, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.reNumright = ToolMrg.getText(_this.redrightbg.x, _this.redrightbg.y, 16, 0xffffff, 18);
        _this.reNumright.text = "1";
        _this.reNumright.height = 18;
        _this.reNumright.textAlign = egret.HorizontalAlign.CENTER;
        _this.reNumright.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.reNumright.fontFamily = "微软雅黑";
        _this.addChild(_this.reNumright);
        _this.yellowright = ToolMrg.getText(_this.yellowrightbg.x, _this.yellowrightbg.y, 16, 0xffffff, 18);
        _this.yellowright.text = "2";
        _this.yellowright.height = 18;
        _this.yellowright.textAlign = egret.HorizontalAlign.CENTER;
        _this.yellowright.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.yellowright.fontFamily = "微软雅黑";
        _this.addChild(_this.yellowright);
        _this.xingOnclick = new egret.Shape();
        _this.addChild(_this.xingOnclick);
        _this.xingOnclick.graphics.beginFill(0xffffff);
        _this.xingOnclick.graphics.drawRoundRect(670, 37, 60, 60, 2);
        _this.xingOnclick.graphics.endFill();
        _this.xingOnclick.touchEnabled = true;
        _this.xingxing = new egret.Bitmap();
        _this.xingxing.x = 685;
        _this.xingxing.y = 44;
        _this.xingxing.width = 32;
        _this.xingxing.height = 32;
        _this.addChild(_this.xingxing);
        RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", _this.bgBack3, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.resultText = ToolMrg.getText(0, 18, 20, 0x999999, 750);
        _this.resultText.text = "未开";
        _this.resultText.textAlign = egret.HorizontalAlign.CENTER;
        _this.resultText.fontFamily = "微软雅黑";
        _this.resultText.bold = true;
        _this.addChild(_this.resultText);
        _this.nianmothTimer = ToolMrg.getText(30, 86, 20, 0x999999, 300);
        _this.nianmothTimer.text = "";
        _this.nianmothTimer.fontFamily = "微软雅黑";
        // this.addChild(this.nianmothTimer);
        _this.jqleft = new egret.Bitmap();
        _this.jqleft.x = 262;
        _this.jqleft.y = 22;
        _this.jqleft.width = 14;
        _this.jqleft.height = 14;
        _this.addChild(_this.jqleft);
        RES.getResByUrl("resource/assets/images/ui/borld.png", function (e) { _this.jqleft.$setBitmapData(e); }, _this);
        _this.jqright = new egret.Bitmap();
        _this.jqright.x = 462;
        _this.jqright.y = 22;
        _this.jqright.width = 14;
        _this.jqright.height = 14;
        _this.addChild(_this.jqright);
        RES.getResByUrl("resource/assets/images/ui/borld.png", function (e) { _this.jqright.$setBitmapData(e); }, _this);
        _this.jqleftText = ToolMrg.getText(278, 16, 20, 0xA9A9A9, 200);
        _this.jqleftText.text = "15";
        _this.jqleftText.fontFamily = "微软雅黑";
        _this.jqleftText.bold = true;
        _this.addChild(_this.jqleftText);
        _this.jqrightText = ToolMrg.getText(478, 16, 20, 0xA9A9A9, 200);
        _this.jqrightText.text = "15";
        _this.jqrightText.fontFamily = "微软雅黑";
        _this.jqrightText.bold = true;
        _this.addChild(_this.jqrightText);
        _this.addevent();
        return _this;
    }
    footballitem1.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(footballitem1);
        if (obj == null)
            obj = new footballitem1();
        return obj;
    };
    footballitem1.prototype.setID = function (id) {
        this.myid = id;
    };
    footballitem1.prototype.setssID = function (id) {
        this.ssid = id;
    };
    footballitem1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置联赛名字颜色*/
    footballitem1.prototype.setcolor = function (color) {
        if (color == undefined)
            return;
        this.name1.textColor = Number("0x" + color);
    };
    footballitem1.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.countryleftIcon != undefined) {
            this.countryleftIcon.$setBitmapData(data);
            console.log("本地头像");
        }
    };
    footballitem1.prototype.bgBack2 = function (data, url) {
        if (data != undefined && this.countryrightIcon != undefined) {
            this.countryrightIcon.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBack3 = function (data, url) {
        if (data != undefined && this.xingxing != undefined) {
            this.xingxing.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackwhite = function (data, url) {
        if (data != undefined && this._mBg != undefined) {
            this._mBg.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackhui = function (data, url) {
        if (data != undefined && this._bglowxian != undefined) {
            this._bglowxian.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackleftred = function (data, url) {
        if (data != undefined && this.redleftbg != undefined) {
            this.redleftbg.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackleftyellow = function (data, url) {
        if (data != undefined && this.yellowleftbg != undefined) {
            this.yellowleftbg.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackrightred = function (data, url) {
        if (data != undefined && this.redrightbg != undefined) {
            this.redrightbg.$setBitmapData(data);
        }
    };
    footballitem1.prototype.bgBackrightyellow = function (data, url) {
        if (data != undefined && this.yellowrightbg != undefined) {
            this.yellowrightbg.$setBitmapData(data);
        }
    };
    /**设置信息*/
    footballitem1.prototype.setInfo1 = function (name1, timer, leftname, centerb, banb, name2) {
        this.name1.text = ToolMrg.nameMode(7, name1);
        this.timer.text = timer;
        this.countryleftName.text = ToolMrg.nameMode(7, leftname);
        if (centerb == "") {
            this.biNumText.text = "vs";
            this.biNumText.size = 34;
        }
        else {
            this.biNumText.text = centerb;
            this.biNumText.size = 28;
        }
        this.baNumText.text = banb;
        this.countryrightName.text = ToolMrg.nameMode(7, name2);
    };
    /**设置黄红排左 */
    footballitem1.prototype.setLeft = function (yellow, red) {
        this.yellowleft.text = yellow + "";
        this.reNum.text = red + "";
        if (yellow > 0) {
            this.yellowleftbg.visible = true;
        }
        else {
            this.yellowleftbg.visible = false;
        }
        if (red > 0) {
            this.redleftbg.visible = true;
        }
        else {
            this.redleftbg.visible = false;
        }
    };
    /**设置黄红排右*/
    footballitem1.prototype.setright = function (yellow, red) {
        this.yellowright.text = yellow + "";
        this.reNumright.text = red + "";
        if (yellow > 0) {
            this.yellowrightbg.visible = true;
        }
        else {
            this.yellowrightbg.visible = false;
        }
        if (red > 0) {
            this.redrightbg.visible = true;
        }
        else {
            this.redrightbg.visible = false;
        }
    };
    /**设置赛果 1 有分数 2 完场 3未开  */
    footballitem1.prototype.resultTextset = function (type, result) {
        if (type == 1 || type == 2) {
            this.resultText.textColor = 0xF72E52;
            this.resultText.y = 18;
        }
        else {
            this.resultText.textColor = 0x999999;
            this.resultText.y = 16;
        }
        this.resultText.text = result + "";
    };
    /**设置国家头像左 */
    footballitem1.prototype.setIcon = function (ul) {
        if (ul != undefined && ul != "") {
            LoadNetPic.getLoadNetPic.loadPic(ul, this.imgEvent_, this);
        }
        else {
            this.countryleftIcon.$setBitmapData(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
        }
        //this.countryleftIcon.$setBitmapData(GResCache.getRes(ul));
    };
    footballitem1.prototype.imgEvent_ = function (e) {
        try {
            if (this.countryleftIcon == undefined)
                return;
            this.countryleftIcon.$setTexture(e);
            this.countryleftIcon.width = 40;
            this.countryleftIcon.height = 40;
            console.log("网络头像");
        }
        catch (error) {
        }
    };
    /**设置国家头像右 */
    footballitem1.prototype.setIconright = function (ul) {
        if (ul != undefined && ul != "") {
            LoadNetPic.getLoadNetPic.loadPic(ul, this.imgEvent_1, this);
        }
        else {
            this.countryrightIcon.$setBitmapData(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
        }
    };
    footballitem1.prototype.imgEvent_1 = function (e) {
        try {
            if (this.countryrightIcon == undefined)
                return;
            this.countryrightIcon.$setTexture(e);
            this.countryrightIcon.width = 40;
            this.countryrightIcon.height = 40;
        }
        catch (error) {
        }
    };
    /**设置星星是否关注了(1 已关注 0未关注) */
    footballitem1.prototype.setxingxing = function (type) {
        if (type == 1) {
            RES.getResByUrl("resource/assets/images/ui/follow_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    /**设置年月日时间 */
    footballitem1.prototype.setmothday = function (str) {
        this.nianmothTimer.text = str;
    };
    /**设置角球数量*/
    footballitem1.prototype.ssetjiqoqNum = function (leftNum, rightNum) {
        if (leftNum == 0) {
            this.jqleft.visible = false;
            this.jqleftText.text = "";
        }
        else {
            this.jqleft.visible = true;
            this.jqleftText.text = "" + leftNum;
        }
        if (rightNum == 0) {
            this.jqright.visible = false;
            this.jqrightText.text = "";
        }
        else {
            this.jqright.visible = true;
            this.jqrightText.text = "" + rightNum;
        }
    };
    footballitem1.prototype.addevent = function () {
        this.xingOnclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzSuccess, this.updata, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzdefeated, this.updata1, this);
    };
    footballitem1.prototype.onTouch = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = FootballConfinData.getInstance.getInfoss(this.ssid);
        }
        else if (type == 3) {
            data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
        }
        if (data != undefined) {
            if (UserData.getInstance.isLogin() == true) {
                BasketFootGZConfin.getInstance.sendHttp(data.id, 1);
            }
            else {
                Alertpaner.getInstance.show("登录之后才可以进行关注操作");
            }
        }
    };
    footballitem1.prototype.updata = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = FootballConfinData.getInstance.getInfoss(this.ssid);
        }
        else if (type == 3) {
            data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
        }
        if (data != undefined) {
            if (data.id == BasketFootGZConfin.uid) {
                this.setxingxing(1);
                data.ifgz = 1;
                if (type == 2) {
                    FootballConfinData.getInstance.getlist3().Gput(data.id, data);
                }
            }
        }
    };
    footballitem1.prototype.updata1 = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = FootballConfinData.getInstance.getInfoss(this.ssid);
        }
        else if (type == 3) {
            data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
        }
        if (data != undefined) {
            if (data.id == BasketFootGZConfin.uid) {
                this.setxingxing(0);
                data.ifgz = 0;
                var jsdata = FootballConfinData.getInstance.getInfoss(this.ssid);
                if (jsdata != undefined) {
                    jsdata.ifgz = 0;
                }
                if (FootballConfinData.getInstance.getInfo3ss(this.ssid) != undefined) {
                    FootballConfinData.getInstance.removInfo3ss(this.ssid);
                }
                else {
                    var keyid = FootballConfinData.getInstance.getInfo33(data.id);
                    FootballConfinData.getInstance.getlist3().GremoveByKey(keyid);
                }
            }
        }
    };
    footballitem1.prototype.clean = function () {
        this.ifsetIcon = false;
        this.countryleftIcon.$setBitmapData("");
        this.countryrightIcon.$setBitmapData("");
    };
    return footballitem1;
}(egret.DisplayObjectContainer));
__reflect(footballitem1.prototype, "footballitem1", ["GIObjPool"]);
//# sourceMappingURL=football1.js.map