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
/**篮球即时显示信息*/
var basketball1 = (function (_super) {
    __extends(basketball1, _super);
    function basketball1() {
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
    Object.defineProperty(basketball1, "getInstance", {
        get: function () {
            if (basketball1._mInstance == undefined)
                basketball1._mInstance = new basketball1();
            return basketball1._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    basketball1.prototype.addScoll = function (contain, scroView) {
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
    basketball1.prototype.show = function (list11) {
        var connet = BasketViewMrg.getInstance.getconnet();
        if (this.parent == undefined) {
            connet.addChild(this);
        }
        this.ifshow = true;
        this.initallInfo(list11);
    };
    basketball1.prototype.hide = function () {
        if (this == undefined)
            return;
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**初始化所有数据*/
    basketball1.prototype.initallInfo = function (list11) {
        this.hideData();
        this._scroViewQB.setScrollTop(20);
        var len = 0;
        var dataObj;
        len = BasketballConfinData.getInstance.getlist().size;
        var list;
        list = BasketballConfinData.getInstance.getlist();
        if (list11 != undefined && list11.size > 0) {
            len = list11.size;
            list = list11;
        }
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new basketballitem1();
                this._mListObj.Gput(i, dataObj);
            }
            var data = BasketballConfinData.getInstance.getInfo(i);
            if (data != undefined) {
                dataObj.setConnetInfo(data.name, data.timer, data.leftname, data.rightname, data.getstatus());
                dataObj.setxingxing(data.ifgz);
                dataObj.setmainEvray(data.rf, data.zhujie1, data.zhujie2, data.zhujie3, data.zhujie4);
                dataObj.setkeEvray("", data.kejie1, data.kejie2, data.kejie3, data.kejie4);
                dataObj.totalFen(data.bfText, data.team_a_score, data.team_b_score, data.fc);
                dataObj.setColor(data.color);
                dataObj.setssID(data.id);
            }
            dataObj.setID(i);
            dataObj.setPoint(0, 10 + (i - 1) * 155);
            // if (dataObj.parent == undefined) {
            // 	this._mContainQB.addChild(dataObj);
            // }
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
        this.GSlideOb.showDataByMap(13, 155, this._scroViewQB, this._mContainQB, this._mListObj);
    };
    //清除对象数组
    basketball1.prototype.hideData = function () {
        for (var _i = 0, _a = this._mListObj.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var data = this._mListObj.Gget(key);
            if (data != undefined) {
                if (data.parent != undefined) {
                    data.parent.removeChild(data);
                }
            }
        }
        this._mListObj.clear();
    };
    return basketball1;
}(egret.DisplayObjectContainer));
__reflect(basketball1.prototype, "basketball1");
var basketballitem1 = (function (_super) {
    __extends(basketballitem1, _super);
    function basketballitem1() {
        var _this = _super.call(this) || this;
        _this.ssid = 0; //赛事id
        _this.myid = 0; //自身id
        if (_this._mBg == undefined) {
            // this._mBg = new egret.Shape();
            // this.addChild(this._mBg);
            // this._mBg.graphics.beginFill(0xffffff);
            // this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 152);
            // this._mBg.graphics.endFill()
            // let link = new egret.Shape();
            // this.addChild(link);
            // link.graphics.beginFill(0xF5F5F7);
            // link.graphics.drawRect(0, 152, GameMain.getInstance.StageWidth, 3);
            // link.graphics.endFill();
            _this._mBg = new egret.Bitmap();
            _this._mBg.x = 0;
            _this._mBg.y = 0;
            _this._mBg.width = 750;
            _this._mBg.height = 152;
            _this.addChild(_this._mBg);
            RES.getResByUrl("resource/assets/images/ui/bai.png", _this.bgBackwhite, _this, RES.ResourceItem.TYPE_IMAGE);
            _this._bglowxian = new egret.Bitmap();
            _this._bglowxian.x = 0;
            _this._bglowxian.y = 152;
            _this._bglowxian.width = 750;
            _this._bglowxian.height = 3;
            _this.addChild(_this._bglowxian);
            RES.getResByUrl("resource/assets/images/ui/hui.png", _this.bgBackhui, _this, RES.ResourceItem.TYPE_IMAGE);
            _this.name1 = ToolMrg.getText(28, 16, 20, 0xFF7000, 150);
            _this.name1.text = "女欧国杯";
            _this.name1.fontFamily = "微软雅黑";
            _this.name1.bold = true;
            _this.addChild(_this.name1);
            _this.timer = ToolMrg.getText(144, 16, 20, 0x999999, 150);
            _this.timer.text = "19 : 20";
            _this.timer.fontFamily = "微软雅黑";
            _this.timer.bold = true;
            _this.addChild(_this.timer);
            _this.countryzhu = ToolMrg.getText(28, 58, 20, 0xFF7000, 280);
            _this.countryzhu.fontFamily = "微软雅黑";
            _this.countryzhu.bold = true;
            _this.countryzhu.textFlow = [
                { "text": "意大利女篮", style: { "textColor": 0x333333, size: 24 } },
                { "text": "[主]", style: { "textColor": 0x999999, size: 18 } }
            ];
            _this.addChild(_this.countryzhu);
            _this.countryke = ToolMrg.getText(28, 98, 20, 0xFF7000, 280);
            _this.countryke.fontFamily = "微软雅黑";
            _this.countryke.bold = true;
            _this.countryke.textFlow = [
                { "text": "维鲁斯女篮", style: { "textColor": 0x333333, size: 24 } },
                { "text": "[客]", style: { "textColor": 0x999999, size: 18 } }
            ];
            _this.addChild(_this.countryke);
            _this.defaultText = ToolMrg.getText(0, 16, 20, 0xF72E52, 750);
            _this.defaultText.text = "第2节 8:30";
            _this.defaultText.fontFamily = "微软雅黑";
            _this.defaultText.textAlign = egret.HorizontalAlign.CENTER;
            _this.defaultText.bold = true;
            _this.addChild(_this.defaultText);
            _this.bfmainText1 = ToolMrg.getText(0, 62, 20, 0x333333, 750);
            _this.bfmainText1.text = "12.5";
            _this.bfmainText1.fontFamily = "微软雅黑";
            _this.bfmainText1.textAlign = egret.HorizontalAlign.CENTER;
            _this.bfmainText1.bold = true;
            _this.addChild(_this.bfmainText1);
            _this.bfmainText2 = ToolMrg.getText(418, 62, 20, 0x999999, 100);
            _this.bfmainText2.text = "10";
            _this.bfmainText2.fontFamily = "微软雅黑";
            _this.bfmainText2.bold = true;
            _this.addChild(_this.bfmainText2);
            _this.bfmainText3 = ToolMrg.getText(459, 62, 20, 0x999999, 100);
            _this.bfmainText3.text = "10";
            _this.bfmainText3.fontFamily = "微软雅黑";
            _this.bfmainText3.bold = true;
            _this.addChild(_this.bfmainText3);
            _this.bfmainText4 = ToolMrg.getText(500, 62, 20, 0x999999, 100);
            _this.bfmainText4.text = "10";
            _this.bfmainText4.fontFamily = "微软雅黑";
            _this.bfmainText4.bold = true;
            _this.addChild(_this.bfmainText4);
            _this.bfmainText5 = ToolMrg.getText(541, 62, 20, 0x999999, 100);
            _this.bfmainText5.text = "10";
            _this.bfmainText5.fontFamily = "微软雅黑";
            _this.bfmainText5.bold = true;
            _this.addChild(_this.bfmainText5);
            _this.bfguestText1 = ToolMrg.getText(0, 100, 20, 0x333333, 750);
            _this.bfguestText1.text = "12.5";
            _this.bfguestText1.fontFamily = "微软雅黑";
            _this.bfguestText1.textAlign = egret.HorizontalAlign.CENTER;
            _this.bfguestText1.bold = true;
            _this.addChild(_this.bfguestText1);
            _this.bfguestText2 = ToolMrg.getText(418, 102, 20, 0x999999, 100);
            _this.bfguestText2.text = "10";
            _this.bfguestText2.fontFamily = "微软雅黑";
            _this.bfguestText2.bold = true;
            _this.addChild(_this.bfguestText2);
            _this.bfguestText3 = ToolMrg.getText(459, 102, 20, 0x999999, 100);
            _this.bfguestText3.text = "10";
            _this.bfguestText3.fontFamily = "微软雅黑";
            _this.bfguestText3.bold = true;
            _this.addChild(_this.bfguestText3);
            _this.bfguestText4 = ToolMrg.getText(500, 102, 20, 0x999999, 100);
            _this.bfguestText4.text = "10";
            _this.bfguestText4.fontFamily = "微软雅黑";
            _this.bfguestText4.bold = true;
            _this.addChild(_this.bfguestText4);
            _this.bfguestText5 = ToolMrg.getText(541, 102, 20, 0x999999, 100);
            _this.bfguestText5.text = "10";
            _this.bfguestText5.fontFamily = "微软雅黑";
            _this.bfguestText5.bold = true;
            _this.addChild(_this.bfguestText5);
            _this.fenNumText = ToolMrg.getText(536, 16, 20, 0x999999, 100);
            _this.fenNumText.text = "分差:-6";
            _this.fenNumText.fontFamily = "微软雅黑";
            _this.fenNumText.bold = true;
            _this.addChild(_this.fenNumText);
            _this.zongFen = ToolMrg.getText(623, 16, 20, 0x999999, 100);
            _this.zongFen.text = "总分: 142";
            _this.zongFen.fontFamily = "微软雅黑";
            _this.zongFen.bold = true;
            _this.addChild(_this.zongFen);
            _this.mainfenText = ToolMrg.getText(623, 62, 20, 0xF72E52, 100);
            _this.mainfenText.text = "70";
            _this.mainfenText.fontFamily = "微软雅黑";
            _this.mainfenText.bold = true;
            _this.addChild(_this.mainfenText);
            _this.kefenText = ToolMrg.getText(623, 102, 20, 0xF72E52, 100);
            _this.kefenText.text = "90";
            _this.kefenText.fontFamily = "微软雅黑";
            _this.kefenText.bold = true;
            _this.addChild(_this.kefenText);
            _this.xingOnclick = new egret.Shape();
            _this.addChild(_this.xingOnclick);
            _this.xingOnclick.graphics.beginFill(0xffffff);
            _this.xingOnclick.graphics.drawRoundRect(675, 70, 60, 60, 2);
            _this.xingOnclick.graphics.endFill();
            _this.xingOnclick.touchEnabled = true;
            _this.xingxing = new egret.Bitmap();
            _this.xingxing.x = 685;
            _this.xingxing.y = 80;
            _this.xingxing.width = 32;
            _this.xingxing.height = 32;
            _this.addChild(_this.xingxing);
            RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", _this.bgBack3, _this, RES.ResourceItem.TYPE_IMAGE);
            _this.addevent();
        }
        return _this;
    }
    basketballitem1.prototype.setID = function (id) {
        this.myid = id;
    };
    basketballitem1.prototype.setssID = function (id) {
        this.ssid = id;
    };
    basketballitem1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    basketballitem1.prototype.bgBack3 = function (data, url) {
        if (data != undefined && this.xingxing != undefined) {
            this.xingxing.$setBitmapData(data);
        }
    };
    basketballitem1.prototype.bgBackwhite = function (data, url) {
        if (data != undefined && this._mBg != undefined) {
            this._mBg.$setBitmapData(data);
        }
    };
    basketballitem1.prototype.bgBackhui = function (data, url) {
        if (data != undefined && this._bglowxian != undefined) {
            this._bglowxian.$setBitmapData(data);
        }
    };
    /**设置星星是否关注了(1 已关注 0未关注) */
    basketballitem1.prototype.setxingxing = function (type) {
        if (type == 1) {
            RES.getResByUrl("resource/assets/images/ui/follow_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    /**设置联赛名字颜色*/
    basketballitem1.prototype.setColor = function (color) {
        this.name1.textColor = Number("0x" + color);
    };
    /**设置国家主客信息*/
    basketballitem1.prototype.setConnetInfo = function (name1, timer, maincountry, countryke, jieText) {
        this.name1.text = "" + name1;
        this.timer.text = "" + timer;
        this.countryzhu.textFlow = [
            { "text": "" + maincountry, style: { "textColor": 0x333333, size: 24 } },
            { "text": "[主]", style: { "textColor": 0x999999, size: 18 } }
        ];
        this.countryke.textFlow = [
            { "text": "" + countryke, style: { "textColor": 0x333333, size: 24 } },
            { "text": "[客]", style: { "textColor": 0x999999, size: 18 } }
        ];
        this.defaultText.text = jieText;
    };
    /**设置主每节分数*/
    basketballitem1.prototype.setmainEvray = function (fen1, fen2, fen3, fen4, fen5) {
        this.bfmainText1.text = "" + fen1;
        this.bfmainText2.text = "" + fen2;
        this.bfmainText3.text = "" + fen3;
        this.bfmainText4.text = "" + fen4;
        this.bfmainText5.text = "" + fen5;
    };
    /**设置客每节分数*/
    basketballitem1.prototype.setkeEvray = function (fen1, fen2, fen3, fen4, fen5) {
        this.bfguestText1.text = "" + fen1;
        this.bfguestText2.text = "" + fen2;
        this.bfguestText3.text = "" + fen3;
        this.bfguestText4.text = "" + fen4;
        this.bfguestText5.text = "" + fen5;
    };
    /**设置总分 主客总分 分差*/
    basketballitem1.prototype.totalFen = function (allfen, mainfen, kefen, fc) {
        this.zongFen.text = "总分: " + allfen;
        this.mainfenText.text = "" + mainfen;
        this.kefenText.text = kefen;
        this.fenNumText.text = "分差:" + fc;
    };
    basketballitem1.prototype.addevent = function () {
        this.xingOnclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzSuccess, this.updata, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzdefeated, this.updata1, this);
    };
    basketballitem1.prototype.onTouch = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = BasketballConfinData.getInstance.getssInfo(this.ssid);
        }
        else if (type == 3) {
            data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
        }
        if (data != undefined) {
            if (UserData.getInstance.isLogin() == true) {
                BasketFootGZConfin.getInstance.sendHttp(data.id, 2);
            }
            else {
                Alertpaner.getInstance.show("登录之后才可以进行关注操作");
            }
        }
    };
    basketballitem1.prototype.updata = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = BasketballConfinData.getInstance.getssInfo(this.ssid);
        }
        else if (type == 3) {
            data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
        }
        if (data != undefined) {
            if (data.id == BasketFootGZConfin.uid) {
                this.setxingxing(1);
                data.ifgz = 1;
                if (type == 2) {
                    BasketballConfinData.getInstance.getlist3().Gput(data.id, data);
                }
            }
        }
    };
    basketballitem1.prototype.updata1 = function () {
        var type = BakorfallViewMrg.inIndex;
        var data;
        if (type == 2) {
            data = BasketballConfinData.getInstance.getssInfo(this.ssid);
        }
        else if (type == 3) {
            data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
        }
        if (data != undefined) {
            if (data.id == BasketFootGZConfin.uid) {
                this.setxingxing(0);
                data.ifgz = 0;
                var jsdata = BasketballConfinData.getInstance.getssInfo(this.ssid);
                if (jsdata != undefined) {
                    jsdata.ifgz = 0;
                }
                if (BasketballConfinData.getInstance.getssInfo3(this.ssid) != undefined) {
                    BasketballConfinData.getInstance.removeInfo33(this.ssid);
                }
                else {
                    var keyid = BasketballConfinData.getInstance.getInfo33(data.id);
                    BasketballConfinData.getInstance.getlist3().GremoveByKey(keyid);
                }
            }
        }
    };
    return basketballitem1;
}(egret.DisplayObjectContainer));
__reflect(basketballitem1.prototype, "basketballitem1");
//# sourceMappingURL=basketball1.js.map