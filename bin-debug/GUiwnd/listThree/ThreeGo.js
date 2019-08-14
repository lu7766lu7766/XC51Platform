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
/**列3列五 前往 根据this._type判断 倍数为_multipleNum */
var ThreeGo = (function (_super) {
    __extends(ThreeGo, _super);
    function ThreeGo() {
        var _this = _super.call(this) || this;
        _this._srcItem = [];
        /**倍数 */
        _this._multipleNum = 1;
        /**注数 */
        _this._XZNum = 0;
        /**下注金额 */
        _this._XZMNNum = 0;
        _this.touchEnabled = true;
        _this._item = new GHashMap();
        _this._mContain = new egret.DisplayObjectContainer();
        _this._downContain = new egret.DisplayObjectContainer();
        //支付时传该对象
        _this._mPayData = new PaymentData();
        //键盘
        _this._mData = new NumKeyData();
        _this.addScoll();
        _this._topUI = new TopUI("排列三投注");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        var topShape = new egret.Shape();
        _this.addChild(topShape);
        topShape.graphics.beginFill(0xffffff);
        topShape.graphics.drawRect(0, 96 + GameValue.adaptationScreen, 750, 100);
        topShape.graphics.endFill();
        _this._handSelect = new egret.Bitmap();
        _this.addChild(_this._handSelect);
        _this._handSelect.touchEnabled = true;
        _this._handSelect.x = 28;
        RES.getResByUrl("resource/assets/images/ui/sx_home@2x.png", function (e) {
            _this._handSelect.$setBitmapData(e);
            _this._handSelect.y = 96 + GameValue.adaptationScreen + (100 - _this._handSelect.height) * 0.5;
        }, _this);
        _this._randomSelect = new egret.Bitmap();
        _this.addChild(_this._randomSelect);
        _this._randomSelect.touchEnabled = true;
        _this._randomSelect.x = 404;
        RES.getResByUrl("resource/assets/images/ui/jx_home@2x.png", function (e) {
            _this._randomSelect.$setBitmapData(e);
            _this._randomSelect.y = 96 + GameValue.adaptationScreen + (100 - _this._randomSelect.height) * 0.5;
        }, _this);
        _this.joinDown();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(ThreeGo, "getInstance", {
        get: function () {
            if (ThreeGo._mInstance == undefined)
                ThreeGo._mInstance = new ThreeGo();
            return ThreeGo._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    ThreeGo.prototype.select = function (e) {
        if (e.target == this._handSelect) {
            this.hide();
        }
        else if (e.target == this._randomSelect) {
            this.randomAddList();
        }
    };
    ThreeGo.prototype.randomAddList = function () {
        var data = new InjectionCode();
        var aa = [], bb = [], cc = [], dd = [], ee = [], a = 0, b = 0, c = 0, d = 0, e = 0;
        if (this._type == 0) {
            if (ThreeBox.getInstance.titleIndex == 0) {
                a = Math.floor(Math.random() * 10);
                b = Math.floor(Math.random() * 10);
                c = Math.floor(Math.random() * 10);
                aa = aa.concat(a);
                bb = bb.concat(b);
                cc = cc.concat(c);
                data = GroupDataMrg.getInstance.group3(aa, bb, cc);
            }
            else if (ThreeBox.getInstance.titleIndex == 1) {
                a = Math.floor(Math.random() * 10);
                b = Math.floor(Math.random() * 10);
                if (a == b) {
                    if (a == 0) {
                        b += 1;
                    }
                    else {
                        b -= 1;
                    }
                }
                aa = aa.concat(a, b);
                data = GroupDataMrg.getInstance.group3double(aa);
            }
            else if (ThreeBox.getInstance.titleIndex == 2) {
                var src = "0123456789";
                a = Math.floor(Math.random() * src.length);
                aa = aa.concat(Number(src.charAt(a)));
                src = src.replace(src.charAt(a), "");
                b = Math.floor(Math.random() * src.length);
                aa = aa.concat(Number(src.charAt(b)));
                src = src.replace(src.charAt(b), "");
                c = Math.floor(Math.random() * src.length);
                aa = aa.concat(Number(src.charAt(c)));
                data = GroupDataMrg.getInstance.group3Six(aa);
            }
        }
        else if (this._type == 1) {
            if (FiveBox.getInstance.titleIndex == 0) {
                a = Math.floor(Math.random() * 10);
                b = Math.floor(Math.random() * 10);
                c = Math.floor(Math.random() * 10);
                d = Math.floor(Math.random() * 10);
                e = Math.floor(Math.random() * 10);
                aa = aa.concat(a);
                bb = bb.concat(b);
                cc = cc.concat(c);
                dd = dd.concat(d);
                ee = ee.concat(e);
                data = GroupDataMrg.getInstance.group5(aa, bb, cc, dd, ee);
            }
        }
        this._srcItem = this._srcItem.concat(data);
        this.upData();
    };
    ThreeGo.prototype.touchDown = function (e) {
        if (e.target == this._goBnt) {
            if (!bankcardCheck.getInstance.checkAllNum(this._multipleText.text)) {
                Alertpaner.getInstance.show("倍数必须为整数");
                return;
            }
            if (this._srcItem == []) {
                Alertpaner.getInstance.show("请添加号码");
                return;
            }
            if (UserData.getInstance.isLogin() == false) {
                LoginWnd.getInstance.show();
                return;
            }
            if (this._type == 0) {
                //弹出支付界面
                this._mPayData.type = PaymentData.z3Type;
                this._mPayData.title = "排列三支付";
                this._mPayData.typeDesc = "排列三";
                this._mPayData.iconUrl = "pl3_home@2x.png";
                // this._mPayData.tz = this._XZNum;
                // this._mPayData.bs = this._multipleNum;
                this._mPayData.xzM = this._XZMNNum;
                this._mPayData.qs = GameValue.threeQS;
                this._mPayData.thisObj = this;
                this._mPayData.backFun = this.back;
                PaymentWnd.getInstance.show(this._mPayData);
            }
            else if (this._type == 1) {
                //弹出支付界面
                this._mPayData.type = PaymentData.z5Type;
                this._mPayData.title = "排列五支付";
                this._mPayData.typeDesc = "排列五";
                this._mPayData.iconUrl = "pl5_home@2x.png";
                // this._mPayData.tz = this._XZNum;
                // this._mPayData.bs = this._multipleNum;
                this._mPayData.xzM = this._XZMNNum;
                this._mPayData.qs = GameValue.fiveQS;
                this._mPayData.thisObj = this;
                this._mPayData.backFun = this.back;
                PaymentWnd.getInstance.show(this._mPayData);
            }
        }
        else if (e.target == this._cleatBtn) {
            isDelect.getInstance.show();
        }
        else if (e.target == this._return) {
            if (this._srcItem.length == 0)
                this.hide();
            else
                isDelect.getInstance.show("hide");
        }
    };
    /**支付回调 */
    ThreeGo.prototype.back = function () {
        if (this._type == 0) {
            Arrangement_Three.getInstance.sendHttp(this._srcItem, this._multipleNum, this._mPayData.mStr);
        }
        else if (this._type == 1) {
            Arrangement_Five.getInstance.sendHttp(this._srcItem, this._multipleNum, this._mPayData.mStr);
        }
    };
    ThreeGo.prototype.show = function (data, type) {
        this._type = type;
        this._multipleText.text = this._multipleNum + "";
        if (type == 0)
            this._topUI.changeTitle("排列三投注");
        else if (type == 1)
            this._topUI.changeTitle("排列五投注");
        if (data == undefined && this._srcItem.length == 0) {
            //不打开此页面
            //if(...) alert("每位至少选x个号码")
        }
        else {
            if (data != undefined)
                this._srcItem = this._srcItem.concat(data);
            GUIManager.getInstance.tipLay.addChild(this);
            this.upData();
        }
        this.addInterception();
    };
    ThreeGo.prototype.upData = function () {
        var index = 1;
        for (var i = 0; i < this._srcItem.length; i++) {
            var obj = void 0;
            if (this._item.GhasKey(i)) {
                obj = this._item.Gget(i);
            }
            else {
                obj = new ThreeGoInfo();
                this._item.Gput(i, obj);
            }
            obj.aa(this._srcItem[i], i);
            obj.y = 130 * (this._srcItem.length - index);
            index += 1;
            if (obj.parent == undefined)
                this._mContain.addChild(obj);
        }
        ToolMrg.upItemofArray(this._item, this._srcItem);
        var num = 0;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            num = num + this._item.Gget(key).getZhuNum();
        }
        this.changeDownText(num);
    };
    ThreeGo.prototype.removeSome = function (id) {
        var aa = [];
        for (var i = 0; i < this._srcItem.length; i++) {
            if (i != id)
                aa = aa.concat(this._srcItem[i]);
        }
        // egret.log(aa);
        this._srcItem = aa;
        this.upData();
    };
    /**清除本次数据 */
    ThreeGo.prototype.removeAll = function () {
        this._srcItem = [];
        this.upData();
    };
    ThreeGo.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
            this._multipleNum = 1;
        }
    };
    ThreeGo.prototype.changeText = function () {
        this._multipleNum = Number(this._multipleText.text);
        var num = 0;
        for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            num = num + this._item.Gget(key).getZhuNum();
        }
        this.changeDownText(num);
        // keyboard.getInstance.updata(this._multipleText.text);
    };
    ThreeGo.prototype.textInput2 = function () {
        if (this._multipleNum < 1) {
            this._multipleNum = 1;
            this._multipleText.text = "" + this._multipleNum;
            var num = 0;
            for (var _i = 0, _a = this._item.keys; _i < _a.length; _i++) {
                var key = _a[_i];
                num = num + this._item.Gget(key).getZhuNum();
            }
            this.changeDownText(num);
        }
        // this._multipleText.type = egret.TextFieldType.INPUT;
        document.removeEventListener("keydown", this.keyboard);
        keyboard.getInstance.hide();
    };
    ThreeGo.prototype.open = function () {
        keyboard.getInstance.show(null);
        document.addEventListener("keydown", this.keyboard);
    };
    /**键盘侦听 */
    ThreeGo.prototype.keyboard = function (event) {
        var that = this;
        var num = event.keyCode;
        if (num == 13) {
            // ThreeGo.getInstance._multipleText.type = egret.TextFieldType.DYNAMIC;
            ThreeGo.getInstance.textInput2();
        }
    };
    ThreeGo.prototype.addInterception = function () {
        this._randomSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
        this._handSelect.addEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cleatBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._multipleText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._multipleText.addEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.addEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    ThreeGo.prototype.removeInterception = function () {
        this._randomSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
        this._handSelect.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.select, this);
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._goBnt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._cleatBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._multipleText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.textClick, this);
        // this._multipleText.removeEventListener(egret.TouchEvent.CHANGE,this.changeText,this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_OUT, this.textInput2, this);
        // this._multipleText.removeEventListener(egret.Event.FOCUS_IN, this.open, this);
    };
    ThreeGo.prototype.textClick = function () {
        this._mData.str = this._multipleText.text;
        this._mData.strText = this._multipleText;
        this._mData.thisObj = this;
        this._mData.backFun = this.changeText;
        NumKeyBoard.getInstance.show(this._mData);
    };
    ThreeGo.prototype.joinDown = function () {
        var _this = this;
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - this.y - 200;
        var bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", function (e) {
            bj.$setBitmapData(e);
        }, this);
        var bjShape = new egret.Shape();
        this._downContain.addChild(bjShape);
        bjShape.graphics.beginFill(0xF5F5F7);
        bjShape.graphics.drawRect(0, 99, 750, 1.5);
        bjShape.graphics.endFill();
        this._cleatBtn = new egret.Bitmap();
        this._downContain.addChild(this._cleatBtn);
        this._cleatBtn.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/clear_nav@2x.png", function (e) {
            _this._cleatBtn.$setBitmapData(e);
            _this._cleatBtn.x = 26;
            _this._cleatBtn.y = 120;
        }, this);
        this._goBnt = new egret.Bitmap();
        this._downContain.addChild(this._goBnt);
        RES.getResByUrl("resource/assets/images/ui/xhl_button@2x.png", function (e) {
            _this._goBnt.$setBitmapData(e);
            _this._goBnt.x = 572;
            _this._goBnt.y = 110;
        }, this);
        this._goBnt.touchEnabled = true;
        var tzText = ToolMrg.getText(572, 100, 32, 0xffffff, 176);
        this._downContain.addChild(tzText);
        tzText.height = 100;
        tzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        tzText.textAlign = egret.HorizontalAlign.CENTER;
        tzText.text = "投注";
        this._allMoney = ToolMrg.getText(0, 114, 32, 0xf72e52, 750);
        this._downContain.addChild(this._allMoney);
        this._allMoney.textAlign = egret.HorizontalAlign.CENTER;
        this._allMoney.text = "34元";
        this._contentText = ToolMrg.getText(0, 164, 20, 0x999999, 750);
        this._downContain.addChild(this._contentText);
        this._contentText.textAlign = egret.HorizontalAlign.CENTER;
        this._contentText.text = "17注1期1倍";
        var downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xcacaca);
        downShape.graphics.drawRoundRect(298, 22, 160, 60, 12);
        downShape.graphics.endFill();
        var downShapeBJ = new egret.Shape();
        this._downContain.addChild(downShapeBJ);
        downShapeBJ.graphics.beginFill(0xffffff);
        downShapeBJ.graphics.drawRoundRect(299.5, 23.5, 157, 57, 12);
        downShapeBJ.graphics.endFill();
        var downText1 = ToolMrg.getText(266, 22, 28, 0x333333);
        this._downContain.addChild(downText1);
        downText1.height = 60;
        downText1.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText1.text = "投";
        var downText2 = ToolMrg.getText(266 + 160 + 38, 22, 28, 0x333333);
        this._downContain.addChild(downText2);
        downText2.height = 60;
        downText2.verticalAlign = egret.VerticalAlign.MIDDLE;
        downText2.text = "倍";
        this._multipleText = ToolMrg.getText(298, 22, 32, 0x333333, 160);
        this._downContain.addChild(this._multipleText);
        this._multipleText.height = 60;
        this._multipleText.textAlign = egret.HorizontalAlign.CENTER;
        this._multipleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._multipleText.touchEnabled = true;
        this._multipleText.text = "1";
        // this._multipleText.type = egret.TextFieldType.INPUT;
        // this._multipleText.inputType = egret.TextFieldInputType.TEXT;
    };
    ThreeGo.prototype.changeDownText = function (num) {
        this._XZNum = num;
        this._XZMNNum = num * this._multipleNum * 2;
        this._allMoney.text = this._XZMNNum + "\u5143";
        if (this._type == 0) {
            this._contentText.text = num + "\u6CE8" + GameValue.threeQS + "\u671F" + this._multipleNum + "\u500D";
        }
        else {
            this._contentText.text = num + "\u6CE8" + GameValue.fiveQS + "\u671F" + this._multipleNum + "\u500D";
        }
    };
    /**空true  */
    ThreeGo.prototype.getListIsEmpty = function () {
        if (this._srcItem.length == 0)
            return true;
        else
            return false;
    };
    /**只清除数组 不刷新 */
    ThreeGo.prototype.clearSrcItem = function () {
        this._srcItem = [];
    };
    ThreeGo.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen + 100;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y - 200;
        this.addChild(this._scroView);
    };
    /**适配处理 */
    ThreeGo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._scroView.height);
        this._mShareC.graphics.endFill();
        this._mContain.addChildAt(this._mShareC, 0);
        var downZZ = new egret.Shape();
        this._downContain.addChildAt(downZZ, 0);
        downZZ.graphics.beginFill(0xffffff);
        downZZ.graphics.drawRect(0, 0, 750, 200);
        downZZ.graphics.endFill();
    };
    return ThreeGo;
}(egret.DisplayObjectContainer));
__reflect(ThreeGo.prototype, "ThreeGo");
var ThreeGoInfo = (function (_super) {
    __extends(ThreeGoInfo, _super);
    function ThreeGoInfo() {
        var _this = _super.call(this) || this;
        var shape = new egret.Shape();
        _this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0, 0, 750, 10);
        shape.graphics.endFill();
        _this._text = ToolMrg.getText(28, 26, 28, 0xf72e52);
        _this.addChild(_this._text);
        _this._text.height = 40;
        _this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._typeText = ToolMrg.getText(28, 70, 24, 0x333333);
        _this.addChild(_this._typeText);
        _this._typeText.height = 34;
        _this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._closeBtn = new egret.Bitmap();
        _this.addChild(_this._closeBtn);
        _this._closeBtn.x = 694;
        RES.getResByUrl("resource/assets/images/ui/scdd_home@2x.png", function (e) {
            _this._closeBtn.$setBitmapData(e);
            _this._closeBtn.y = 10 + (120 - _this._closeBtn.height) * 0.5;
        }, _this);
        _this._closeBtn.touchEnabled = true;
        _this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.removeSome, _this);
        _this.setDB();
        return _this;
    }
    ThreeGoInfo.prototype.aa = function (data, id) {
        this._data = data;
        this._id = id;
        this._text.text = "";
        var arr = data.result.split(",");
        for (var i = 0; i < arr.length; i++) {
            this._text.text = "" + this._text.text + arr[i] + " ";
        }
        var typeText = "";
        //类型 直选:1 组3单式:2 组三复式:3 组六:4
        if (data.type == 1)
            typeText = "直选";
        else if (data.type == 2)
            typeText = "组三单式";
        else if (data.type == 3)
            typeText = "组三复式";
        else if (data.type)
            typeText = "组六";
        this._typeText.textFlow = [
            { "text": typeText + " " + data.injectionNum + "\u6CE8 ", style: { "textColor": 0x333333 } },
            { "text": data.injectionNum * 2 + "\u5143", style: { "textColor": 0xff7000 } }
        ];
    };
    /**获取注数 */
    ThreeGoInfo.prototype.getZhuNum = function () {
        return this._data.injectionNum;
    };
    ThreeGoInfo.prototype.removeSome = function () {
        // ThreeGo.getInstance.removeSome(this._id);
        isDelect.getInstance.show(this._id);
    };
    /**适配处理 */
    ThreeGoInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 130);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ThreeGoInfo;
}(egret.DisplayObjectContainer));
__reflect(ThreeGoInfo.prototype, "ThreeGoInfo");
/**是否删除号码或者清空 */
var isDelect = (function (_super) {
    __extends(isDelect, _super);
    function isDelect() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addChild(_this._mContain);
        var shape = new egret.Shape();
        _this._mContain.addChild(shape);
        shape.graphics.beginFill(0xffffff);
        shape.graphics.drawRoundRect(0, 0, 600, 240, 33);
        shape.graphics.endFill();
        shape.touchEnabled = true;
        _this._title = ToolMrg.getText(0, 37, 36, 0x333333, 600);
        _this._mContain.addChild(_this._title);
        _this._title.textAlign = egret.HorizontalAlign.CENTER;
        _this._leftBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._leftBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png", function (e) {
            _this._leftBtn.$setBitmapData(e);
            _this._leftBtn.x = 14;
            _this._leftBtn.y = 132;
        }, _this);
        _this._leftBtn.touchEnabled = true;
        _this._leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        _this._rightBtn = new egret.Bitmap();
        _this._mContain.addChild(_this._rightBtn);
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png", function (e) {
            _this._rightBtn.$setBitmapData(e);
            _this._rightBtn.x = 312;
            _this._rightBtn.y = 132;
        }, _this);
        _this._rightBtn.touchEnabled = true;
        _this._rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touchDown, _this);
        var leftText = ToolMrg.getText(14, 132, 32, 0x333333, 276);
        _this._mContain.addChild(leftText);
        leftText.height = 88;
        leftText.textAlign = egret.HorizontalAlign.CENTER;
        leftText.verticalAlign = egret.VerticalAlign.MIDDLE;
        leftText.text = "取消";
        var rightText = ToolMrg.getText(312, 132, 32, 0xffffff, 276);
        _this._mContain.addChild(rightText);
        rightText.height = 88;
        rightText.textAlign = egret.HorizontalAlign.CENTER;
        rightText.verticalAlign = egret.VerticalAlign.MIDDLE;
        rightText.text = "确定";
        _this.setDB();
        return _this;
    }
    Object.defineProperty(isDelect, "getInstance", {
        get: function () {
            if (isDelect._mInstance == undefined)
                isDelect._mInstance = new isDelect();
            return isDelect._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    isDelect.prototype.touchDown = function (e) {
        if (e.target == this._rightBtn) {
            if (this._id == "five") {
                FiveBox.getInstance.hide();
                ThreeGo.getInstance.clearSrcItem();
            }
            else if (this._id == "three") {
                ThreeBox.getInstance.hide();
                ThreeGo.getInstance.clearSrcItem();
            }
            else if (this._id == "hide") {
                ThreeGo.getInstance.removeAll();
                ThreeGo.getInstance.hide();
            }
            else if (this._id == undefined)
                ThreeGo.getInstance.removeAll();
            else
                ThreeGo.getInstance.removeSome(this._id);
        }
        this.hide();
    };
    isDelect.prototype.show = function (id) {
        this._id = id;
        if (id == undefined) {
            this._title.text = "您是否清除本次号码？";
        }
        else if (id == "hide" || id == "three" || id == "five") {
            this._title.text = "您是否放弃本次购买？";
        }
        else {
            this._title.text = "您是否要删除此号码？";
        }
        GUIManager.getInstance.mostLay.addChild(this);
        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width) * 0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height) * 0.5;
    };
    isDelect.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**适配处理 */
    isDelect.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    return isDelect;
}(egret.DisplayObjectContainer));
__reflect(isDelect.prototype, "isDelect");
//# sourceMappingURL=ThreeGo.js.map