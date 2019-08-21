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
/**我的页面 */
var MyViewWnd = (function (_super) {
    __extends(MyViewWnd, _super);
    function MyViewWnd() {
        var _this = _super.call(this) || this;
        _this._downContent = ["个人详细信息", "查看资金流向", "查看跟单记录", "分享赚彩金", "代理加盟计划", "在线问题反馈", "查询开奖信息", "建议反馈"];
        _this._downSrc = ["个人信息", "资金明细", "跟单记录", "分享赚钱", "合营计划", "联系客服", "开奖信息", "更多选项"];
        _this._downImgsrc = ["zhxx_mine@2x", "yjmx_mine@2x", "gdjl_mine@2x", "laxin_mine@2x", "hyjh_mine@2x", "kefu_mine@2x", "kjxx_mine@2x", "gdxx_mine@2x"];
        // private _hbText: egret.BitmapText;
        /**center 充值 提款 vip等级 发单佣金 */
        _this._cenStr = ["充值", "提款", "vip等级", "发单佣金"];
        _this._cenSrc = ["cz_mine@2x", "tixian_mine@2x", "levelzx_mine@2x", "yj_mine@2x"];
        _this._srcItem = ["待开奖", "未中奖", "已中奖"];
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this._cenItem = new GHashMap();
        _this._downItem = new GHashMap();
        var myImgTop = new egret.Bitmap();
        _this._mContain.addChild(myImgTop);
        RES.getResByUrl("resource/assets/images/ui/bg_mine@2x.png", function (e) { myImgTop.$setBitmapData(e); }, _this);
        _this._setUp = new egret.Bitmap();
        _this._mContain.addChild(_this._setUp);
        _this._setUp.x = 666;
        _this._setUp.y = 100;
        _this._setUp.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/kefu2_mine@2x.png", function (e) {
            _this._setUp.$setBitmapData(e);
        }, _this);
        // this._News = new egret.Bitmap();
        // this._mContain.addChild(this._News);
        // this._News.x = 666;
        // this._News.y = 28+40;
        // this._News.touchEnabled = true;
        // RES.getResByUrl("resource/assets/images/ui/xiaoxi_mine@2x.png",(e)=>{
        //     this._News.$setBitmapData(e);  
        // },this);
        _this._txzz = new egret.Shape();
        _this._mContain.addChild(_this._txzz);
        _this._txzz.graphics.beginFill(0xffffff);
        _this._txzz.graphics.drawEllipse(40, 90, 96, 96);
        _this._txzz.graphics.endFill();
        _this._tx = new egret.Bitmap();
        _this._mContain.addChild(_this._tx);
        _this._tx.width = 88;
        _this._tx.height = 88;
        _this._tx.x = 44;
        _this._tx.y = 94;
        _this._tx.touchEnabled = true;
        // RES.getResByUrl("resource/assets/images/ui/user1_default.png", (e) => {
        //     this._tx.$setBitmapData(e);
        // }, this);
        _this._txName = ToolMrg.getText(162, 100, 36, 0xffffff);
        _this._mContain.addChild(_this._txName);
        _this._txName.touchEnabled = true;
        // let lvShape = new egret.Shape();
        // this._mContain.addChild(lvShape);
        // lvShape.graphics.beginFill(0xffffff);
        // lvShape.graphics.drawRoundRect(162, 154, 74, 24, 30);
        // lvShape.graphics.endFill();
        _this._LvImg = new egret.Bitmap();
        _this._mContain.addChild(_this._LvImg);
        _this._LvImg.y = 155;
        _this._LvImg.x = 162;
        RES.getResByUrl("resource/assets/images/ui/level_mine@2x.png", function (e) { _this._LvImg.$setBitmapData(e); }, _this);
        _this._LvText = ToolMrg.getText(190, 155, 18, 0xFF8D33);
        _this._mContain.addChild(_this._LvText);
        _this._LvText.text = "Lv 0";
        _this._LvText.height = 24;
        _this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._userIdText = ToolMrg.getText(250, 158, 18, 0xffffff);
        _this._mContain.addChild(_this._userIdText);
        var yeText = ToolMrg.getText(0, 268, 20, 0xffffff, 250);
        _this._mContain.addChild(yeText);
        yeText.textAlign = egret.HorizontalAlign.CENTER;
        yeText.text = "余额";
        var yhqText = ToolMrg.getText(250, 268, 20, 0xffffff, 250);
        _this._mContain.addChild(yhqText);
        yhqText.textAlign = egret.HorizontalAlign.CENTER;
        yhqText.text = "发单佣金";
        var fsText = ToolMrg.getText(250 * 2, 268, 20, 0xffffff, 250);
        _this._mContain.addChild(fsText);
        fsText.textAlign = egret.HorizontalAlign.CENTER;
        fsText.text = "代理佣金";
        // let hbText = ToolMrg.getText(187.5 * 3, 268, 20, 0xffffff, 187.5);
        // this._mContain.addChild(hbText);
        // hbText.textAlign = egret.HorizontalAlign.CENTER;
        // hbText.text = "代理佣金";
        _this._yeText = FontMgr.getText(FontMgr.FONT_2);
        _this._mContain.addChild(_this._yeText);
        _this._yeText.y = 218;
        _this._yeText.x = 0;
        _this._yeText.width = 250;
        _this._yeText.textAlign = egret.HorizontalAlign.CENTER;
        _this._yhqText = FontMgr.getText(FontMgr.FONT_2);
        _this._mContain.addChild(_this._yhqText);
        _this._yhqText.y = 218;
        _this._yhqText.x = 250;
        _this._yhqText.width = 250;
        _this._yhqText.textAlign = egret.HorizontalAlign.CENTER;
        _this._fsText = FontMgr.getText(FontMgr.FONT_2);
        _this._mContain.addChild(_this._fsText);
        _this._fsText.y = 218;
        _this._fsText.x = 250 * 2;
        _this._fsText.width = 250;
        _this._fsText.textAlign = egret.HorizontalAlign.CENTER;
        // this._hbText = FontMgr.getText(FontMgr.FONT_2);
        // this._mContain.addChild(this._hbText);
        // this._hbText.y = 218;
        // this._hbText.x = 187.5 * 3;
        // this._hbText.width = 187.5;
        // this._hbText.textAlign = egret.HorizontalAlign.CENTER;
        _this.addCenter();
        _this.addDown();
        _this.addScoll();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(MyViewWnd, "getInstance", {
        get: function () {
            if (MyViewWnd._mInstance == undefined)
                MyViewWnd._mInstance = new MyViewWnd();
            return MyViewWnd._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**刷新金额数据 */
    MyViewWnd.prototype.freshData = function () {
        var _this = this;
        // this._money.text = "余额："+(UserData.getInstance.getGold()/100)+"元";
        this._yeText.text = "" + UserData.getInstance.getGold();
        this._yhqText.text = "" + UserData.getInstance.getYJGold();
        this._fsText.text = "" + UserData.getInstance.getDLGold();
        // this._hbText.text = `${UserData.getInstance.getDLGold()}`;
        if (UserData.getInstance.isLogin() == false) {
            this._userIdText.text = "";
            RES.getResByUrl("resource/assets/images/ui/user1_default.png", function (e) { _this._tx.$setBitmapData(e); }, this);
        }
        else {
            this.setHeadIcon();
            this._userIdText.text = "id:" + UserData.getInstance.userId;
        }
        this._txName.text = UserData.getInstance.userName;
        this._LvText.text = "vip " + UserData.getInstance.getLv(); //vip等级
    };
    MyViewWnd.prototype.addCenter = function () {
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 320;
        var centerShape1 = new egret.Shape();
        this._centerContain.addChild(centerShape1);
        centerShape1.graphics.beginFill(0xffffff);
        centerShape1.graphics.drawRoundRect(28, 0, 696, 140, 30);
        centerShape1.graphics.endFill();
        var centerShape2 = new egret.Shape();
        this._centerContain.addChild(centerShape2);
        centerShape2.graphics.beginFill(0xffffff);
        centerShape2.graphics.drawRoundRect(28, 166, 696, 230, 30);
        centerShape2.graphics.endFill();
        var num = 696 / 4;
        var _loop_1 = function (i) {
            var objShape = new egret.Shape();
            objShape.graphics.beginFill(0xffffff, 0.01);
            objShape.graphics.drawRect(28 + i * num, 0, num, 140);
            objShape.graphics.endFill();
            this_1._centerContain.addChild(objShape);
            this_1._cenItem.Gput(i, objShape);
            objShape.touchEnabled = true;
            var objImg = new egret.Bitmap();
            this_1._centerContain.addChild(objImg);
            objImg.x = 28 + i * num + (num - 44) * 0.5;
            objImg.y = 30;
            RES.getResByUrl("resource/assets/images/ui/" + this_1._cenSrc[i] + ".png", function (e) { objImg.$setBitmapData(e); }, this_1);
            var objText = ToolMrg.getText(28 + i * num, 87, 24, 0x333333, num);
            this_1._centerContain.addChild(objText);
            objText.textAlign = egret.HorizontalAlign.CENTER;
            objText.text = this_1._cenStr[i];
        };
        var this_1 = this;
        for (var i = 0; i < this._cenStr.length; i++) {
            _loop_1(i);
        }
        this._myTicket = new egret.Shape();
        this._centerContain.addChild(this._myTicket);
        this._myTicket.graphics.beginFill(0xffffff, 0.01);
        this._myTicket.graphics.drawRect(28, 166, 696, 100);
        this._myTicket.graphics.endFill();
        this._myTicket.touchEnabled = true;
        var ticketImg = new egret.Bitmap();
        this._centerContain.addChild(ticketImg);
        ticketImg.x = 68;
        RES.getResByUrl("resource/assets/images/ui/caip_mine@2x.png", function (e) {
            ticketImg.$setBitmapData(e);
            ticketImg.y = 166 + (100 - ticketImg.height) * 0.5;
        }, this);
        var ticketText = ToolMrg.getText(132, 166, 32, 0x333333);
        this._centerContain.addChild(ticketText);
        ticketText.height = 100;
        ticketText.verticalAlign = egret.VerticalAlign.MIDDLE;
        ticketText.text = "我的彩票";
        var allText = ToolMrg.getText(622, 166, 24, 0x999999);
        this._centerContain.addChild(allText);
        allText.height = 100;
        allText.verticalAlign = egret.VerticalAlign.MIDDLE;
        allText.text = "全部";
        var allImg = new egret.Bitmap();
        this._centerContain.addChild(allImg);
        allImg.x = 680;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            allImg.$setBitmapData(e);
            allImg.y = 166 + (100 - allImg.height) * 0.5;
        }, this);
        var shape1 = new egret.Shape();
        this._centerContain.addChild(shape1);
        shape1.graphics.beginFill(0xdedede);
        shape1.graphics.drawRect(68, 166 + 100, 624, 2);
        shape1.graphics.endFill();
        for (var i = 0; i < this._srcItem.length; i++) {
            var shape = new egret.Shape();
            shape.graphics.beginFill(0xffffff, 0.01);
            shape.graphics.drawRect(28 + i * 232, 124 + 166 + 10, 250, 128);
            shape.graphics.endFill();
            shape.touchEnabled = true;
            this._centerContain.addChild(shape);
            this._item.Gput(i, shape);
            var text = ToolMrg.getText(28 + i * 232, 172 + 166 + 10, 24, 0x292929, 232);
            text.textAlign = egret.HorizontalAlign.CENTER;
            this._centerContain.addChild(text);
            text.text = this._srcItem[i];
        }
        this._t1 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t1);
        this._t1.y = 300;
        this._t1.x = 28;
        this._t1.width = 232;
        this._t1.textAlign = egret.HorizontalAlign.CENTER;
        this._t2 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t2);
        this._t2.y = 300;
        this._t2.x = 28 + 232;
        this._t2.width = 232;
        this._t2.textAlign = egret.HorizontalAlign.CENTER;
        this._t3 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t3);
        this._t3.y = 300;
        this._t3.x = 28 + 232 * 2;
        this._t3.width = 232;
        this._t3.textAlign = egret.HorizontalAlign.CENTER;
    };
    MyViewWnd.prototype.freshJJData = function () {
        this._t1.text = "" + MyLotteryDataMrg.getInstance.getDKJDataList().length;
        this._t2.text = "" + MyLotteryDataMrg.getInstance.getYKJDataList().length;
        this._t3.text = "" + MyLotteryDataMrg.getInstance.getYZJDataList().length;
    };
    MyViewWnd.prototype.touchDown = function (e) {
        if (e.target == this._myTicket) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(0);
        }
        else if (e.target == this._item.Gget(0)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(1);
        }
        else if (e.target == this._item.Gget(1)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(2);
        }
        else if (e.target == this._item.Gget(2)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(3);
        }
        else if (e.target == this._tx || e.target == this._txName) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                PSWnd.getInstance.show();
        }
        else if (e.target == this._setUp) {
            // SetUpWnd.getInstance.show();
            // KeFuWnd.getInstance.show();
            if (window["go2Url"]) {
                window["go2Url"](GameValue.kfUrl);
            }
        }
        else if (e.target == this._cenItem.Gget(0)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                RechargeWnd.getInstance.show();
        }
        else if (e.target == this._cenItem.Gget(1)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else if (UserData.getInstance.getused() == 0)
                realnameTest.getInstance.show();
            else
                withdrawData.getInstance.show();
        }
        else if (e.target == this._cenItem.Gget(2)) {
            LvWnd.getInstance.show();
        }
        else if (e.target == this._cenItem.Gget(3)) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                // CapitalWnd.getInstance.show(4);
                SCWnd.getInstance.show();
        }
    };
    MyViewWnd.prototype.addInterception = function () {
        this._myTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._setUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        for (var _b = 0, _c = this._downItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._downItem.Gget(key).addInterception();
        }
        for (var _d = 0, _e = this._cenItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._cenItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    MyViewWnd.prototype.removeInterception = function () {
        this._myTicket.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._setUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            this._item.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        for (var _b = 0, _c = this._downItem.keys; _b < _c.length; _b++) {
            var key = _c[_b];
            this._downItem.Gget(key).removeInterception();
        }
        for (var _d = 0, _e = this._cenItem.keys; _d < _e.length; _d++) {
            var key = _e[_d];
            this._cenItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    };
    MyViewWnd.prototype.addDown = function () {
        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._downContain);
        this._downContain.y = 360 + 378;
        var downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xffffff);
        downShape.graphics.drawRoundRect(28, 0, 696, 592, 30);
        downShape.graphics.endFill();
        var downLink1 = new egret.Shape();
        this._downContain.addChild(downLink1);
        downLink1.graphics.beginFill(0xdedede);
        downLink1.graphics.drawRect(376, 0, 2, 592);
        downLink1.graphics.endFill();
        var downLink2 = new egret.Shape();
        this._downContain.addChild(downLink2);
        downLink2.graphics.beginFill(0xdedede);
        downLink2.graphics.drawRect(28, 148, 696, 2);
        downLink2.graphics.endFill();
        var downLink3 = new egret.Shape();
        this._downContain.addChild(downLink3);
        downLink3.graphics.beginFill(0xdedede);
        downLink3.graphics.drawRect(28, 298, 696, 2);
        downLink3.graphics.endFill();
        var downLink4 = new egret.Shape();
        this._downContain.addChild(downLink4);
        downLink4.graphics.beginFill(0xdedede);
        downLink4.graphics.drawRect(28, 448, 696, 2);
        downLink4.graphics.endFill();
        var objNum = 0;
        var objHeight = 0;
        for (var i = 0; i < this._downSrc.length; i++) {
            var obj = new MyViewInfo(this._downImgsrc[i], this._downSrc[i], this._downContent[i], i);
            obj.x = 28 + objNum * 348;
            obj.y = objHeight;
            this._downContain.addChild(obj);
            this._downItem.Gput(i, obj);
            if (objNum == 1) {
                objNum = 0;
                objHeight = objHeight + 150;
            }
            else {
                objNum += 1;
            }
        }
        var downZZ = new egret.Shape();
        this._downContain.addChildAt(downZZ, 0);
        downZZ.graphics.beginFill(0xF5F5F7);
        downZZ.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._downContain.height + 54);
        downZZ.graphics.endFill();
    };
    MyViewWnd.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_GoldFresh, this.freshData, this);
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_orderList, this.freshJJData, this);
    };
    MyViewWnd.prototype.show = function () {
        GUIManager.getInstance.bgLay.addChild(this);
        this.addInterception();
        this.freshData();
        this.freshJJData();
        if (UserData.getInstance.isLogin() == true) {
            Order_List.getInstance.sendHttp();
            UserInfoPhp.getInstance.sendHttp();
        }
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_GoldFresh, this.freshData, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_orderList, this.freshJJData, this);
    };
    /**刷新数据*/
    MyViewWnd.prototype.refreshallInfo = function () {
        this.addInterception();
        this.freshData();
        this.freshJJData();
    };
    /**设置头像*/
    MyViewWnd.prototype.setHeadIcon = function () {
        RES.getResByUrl("resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
    };
    MyViewWnd.prototype.headIcon = function (data, url) {
        if (data != undefined && this._tx != undefined) {
            this._tx.$setBitmapData(data);
        }
    };
    MyViewWnd.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = GameValue.adaptationScreen - 40;
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
    MyViewWnd.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return MyViewWnd;
}(egret.DisplayObjectContainer));
__reflect(MyViewWnd.prototype, "MyViewWnd");
var MyViewInfo = (function (_super) {
    __extends(MyViewInfo, _super);
    function MyViewInfo(imgSrc, text, content, id) {
        var _this = _super.call(this) || this;
        _this._id = id;
        _this.touchEnabled = true;
        _this._img = new egret.Bitmap();
        _this.addChild(_this._img);
        _this._img.x = 40;
        RES.getResByUrl("resource/assets/images/ui/" + imgSrc + ".png", function (e) {
            _this._img.$setBitmapData(e);
            _this._img.y = (150 - _this._img.height) * 0.5;
        }, _this);
        _this._text = ToolMrg.getText(112, 42, 28, 0x333333);
        _this.addChild(_this._text);
        _this._text.text = text;
        _this._content = ToolMrg.getText(112, 87, 22, 0x999999);
        _this.addChild(_this._content);
        _this._content.text = content;
        _this.setDB();
        return _this;
    }
    MyViewInfo.prototype.touchDown = function (e) {
        if (this._id == 0) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                PSWnd.getInstance.show();
        }
        else if (this._id == 1) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                CapitalWnd.getInstance.show();
        }
        else if (this._id == 2) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                GDRecordWnd.getInstance.show();
        }
        else if (this._id == 3) {
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                ShareWnd.getInstance.show();
        }
        else if (this._id == 4) {
            PlanWnd.getInstance.show();
        }
        else if (this._id == 5) {
            // KeFuWnd.getInstance.show();
            if (window["go2Url"]) {
                window["go2Url"](GameValue.kfUrl);
            }
        }
        else if (this._id == 6) {
            AwareInfoMgr.getInstance.show();
            OpenAwareConfin.getInstance.sendHttp();
        }
        else if (this._id == 7) {
            SetUpWnd.getInstance.show();
        }
    };
    /**适配处理 */
    MyViewInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 0.01);
        this._mShareC.graphics.drawRect(0, 0, 348, 150);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    MyViewInfo.prototype.addInterception = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    MyViewInfo.prototype.removeInterception = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return MyViewInfo;
}(egret.DisplayObjectContainer));
__reflect(MyViewInfo.prototype, "MyViewInfo");
//# sourceMappingURL=MyViewWnd.js.map