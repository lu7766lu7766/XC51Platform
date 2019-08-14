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
/**实名验证界面 */
var realnameTest = (function (_super) {
    __extends(realnameTest, _super);
    function realnameTest() {
        var _this = _super.call(this) || this;
        _this.touchEnabled = true;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.setDB();
        _this._mListObj = new GHashMap();
        _this._topUI = new TopUI("", -_this.y);
        _this._topUI.changeTitle("实名认证");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xF5F5F7);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 60);
        link.graphics.endFill();
        _this.personalText = ToolMrg.getText(0, 18, 24, 0xF72E52, 750);
        _this.addChild(_this.personalText);
        _this.personalText.textAlign = egret.HorizontalAlign.CENTER;
        _this.personalText.text = "真实姓名是领取奖金的唯一凭证，提交后不可更改";
        _this.personalText.touchEnabled = true;
        _this.personalText.bold = true;
        _this.nextBnt = new egret.Bitmap();
        _this.nextBnt.x = 20;
        _this.nextBnt.y = 500;
        _this.addChild(_this.nextBnt);
        ToolMrg.setZoom(_this.nextBnt);
        _this.nextBnt.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bg_button@2x.png", _this.bgBack1, _this, RES.ResourceItem.TYPE_IMAGE);
        _this.nextText = ToolMrg.getText(0, 535, 32, 0xffffff, 750);
        _this.addChild(_this.nextText);
        _this.nextText.textAlign = egret.HorizontalAlign.CENTER;
        _this.nextText.text = "确定";
        _this.nextText.bold = true;
        _this.addevent();
        return _this;
    }
    Object.defineProperty(realnameTest, "getInstance", {
        get: function () {
            if (realnameTest._mInstance == undefined)
                realnameTest._mInstance = new realnameTest();
            return realnameTest._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    realnameTest.prototype.bgBack1 = function (data, url) {
        if (data != undefined && this.nextBnt != undefined) {
            this.nextBnt.$setBitmapData(data);
        }
    };
    realnameTest.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        this.initallInfo();
    };
    realnameTest.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**初始化所有数据*/
    realnameTest.prototype.initallInfo = function () {
        var len = 2;
        var dataObj;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new bgxian1(i);
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i);
            dataObj.setPoint(0, 60 + (i - 1) * 109);
            if (dataObj.parent == undefined) {
                this.addChild(dataObj);
            }
        }
    };
    /**适配处理 */
    realnameTest.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    realnameTest.prototype.addevent = function () {
        this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    realnameTest.prototype.onclick = function () {
        // if (realnameData.realName == "" || realnameData.identitNum == "") {
        // 	Alertpaner.getInstance.show("请填写身份证号码和姓名");
        // if (realnameData.realName == "") {
        // 	// Alertpaner.getInstance.show("请填写姓名");
        // }
        // // } 
        // else {
        // realNameConf.getInstance.sendHttp(realnameData.identitNum.toString(), realnameData.realName);
        realNameConf.getInstance.sendHttp("", realnameData.realName);
        // }
    };
    return realnameTest;
}(egret.DisplayObjectContainer));
__reflect(realnameTest.prototype, "realnameTest");
var bgxian1 = (function (_super) {
    __extends(bgxian1, _super);
    function bgxian1(id) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xDEDEDE);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 2);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xffffff);
        link1.graphics.drawRect(0, 2, GameMain.getInstance.StageWidth, 104);
        link1.graphics.endFill();
        _this.lowSP = new egret.Shape();
        _this.addChild(_this.lowSP);
        _this.lowSP.graphics.beginFill(0xDEDEDE);
        _this.lowSP.graphics.drawRect(0, 105, GameMain.getInstance.StageWidth, 2);
        _this.lowSP.graphics.endFill();
        _this.tatleText = ToolMrg.getText(26, 0, 28, 0x333333, 200);
        _this.addChild(_this.tatleText);
        _this.tatleText.height = 108;
        _this.tatleText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.tatleText.text = "真实姓名";
        _this.tatleText.bold = true;
        _this.inputText = ToolMrg.getText(170, 0, 28, 0x999999, 400);
        _this.addChild(_this.inputText);
        _this.inputText.height = 108;
        _this.inputText.fontFamily = "微软雅黑";
        _this.inputText.verticalAlign = egret.VerticalAlign.MIDDLE;
        if (id != 1) {
            _this.inputText.type = egret.TextFieldType.INPUT;
            _this.inputText.text = "提交后不可修改";
            _this.inputText.touchEnabled = true;
        }
        else {
            _this.inputText.textColor = 0x000000;
        }
        _this.addevent();
        return _this;
    }
    bgxian1.prototype.getStr = function () {
        return this.inputText.text;
    };
    bgxian1.prototype.setInpText = function (str) {
        if (this.inputText == undefined)
            return;
        this.inputText.text = str;
    };
    bgxian1.prototype.settatleText = function (str) {
        if (this.tatleText == undefined)
            return;
        this.tatleText.text = str;
    };
    bgxian1.prototype.setID = function (id) {
        this.myid = id;
        if (this.myid == 1) {
            this.lowSP.visible = false;
        }
        if (id == 1) {
            var namestr = UserData.getInstance.userName;
            namestr = realnameData.getInstance.getstr(namestr);
            this.setInpText(namestr);
            this.settatleText(bgxian1.strnamelist[this.myid - 1]);
        }
        else if (id == 2) {
            this.setInpText(bgxian1.inptList[this.myid - 1]);
            this.settatleText(bgxian1.strnamelist[this.myid - 1]);
        }
        else {
            this.setInpText(bgxian1.inptList[this.myid - 1]);
            this.settatleText(bgxian1.strnamelist[this.myid - 1]);
        }
    };
    bgxian1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    bgxian1.prototype.addevent = function () {
        this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
    };
    bgxian1.prototype.onclick = function () {
    };
    bgxian1.prototype.textInput = function () {
        if (this.myid == 1)
            return;
        if (this.inputText != undefined && this.inputText.text == bgxian1.inptList[1] || this.inputText.text == bgxian1.inptList[2]) {
            this.inputText.text = "";
            this.inputText.textColor = 0xA9A9A9;
            this.inputText.alpha = 1;
            this.inputText.text = "";
        }
        else if (this.inputText != undefined && this.inputText.text == "") {
            if (this.myid == 2) {
                this.inputText.text = bgxian1.inptList[this.myid - 1];
                this.inputText.textColor = 0xA9A9A9;
                this.inputText.alpha = 1;
            }
            else if (this.myid == 3) {
                this.inputText.text = bgxian1.inptList[this.myid - 1];
                this.inputText.textColor = 0xA9A9A9;
                this.inputText.alpha = 1;
            }
        }
        else {
            if (this.myid == 2) {
                // if (this.inputText.text.length > 8 || this.inputText.text.length < 2) {
                // 	Alertpaner.getInstance.show("请输入2到8位姓名");
                // 	this.inputText.text = bgxian.strList[this.myid - 1];
                // 	realnameData.realName = "";
                // 	this.inputText.textColor = 0xA9A9A9;
                // 	return;
                // }
                // let namedecid: boolean = IdentityverifyObj.getInstance.checkName(this.inputText.text);
                // if (namedecid == true) {
                // 	realnameData.realName = this.inputText.text;
                // } else {
                // 	Alertpaner.getInstance.show("请填写正确的姓名");
                // 	this.inputText.text = bgxian.strList[this.myid - 1];
                // 	realnameData.realName = "";
                // 	this.inputText.textColor = 0xA9A9A9;
                // }
                realnameData.realName = this.inputText.text;
            }
            else if (this.myid == 3) {
                var yx = IdentityverifyObj.getInstance.IdCardValidate(this.inputText.text);
                if (yx == true) {
                    realnameData.identitNum = this.inputText.text;
                }
                else {
                    Alertpaner.getInstance.show("身份证号码不正确");
                    this.inputText.text = bgxian.strList[this.myid - 1];
                    realnameData.identitNum = "";
                    this.inputText.textColor = 0xA9A9A9;
                }
            }
        }
    };
    bgxian1.strnamelist = ["用户名", "真实姓名", "身份证号"];
    bgxian1.inptList = ["", "请输入2到8位姓名", "15或18位，提交后不可修改"];
    return bgxian1;
}(egret.DisplayObjectContainer));
__reflect(bgxian1.prototype, "bgxian1");
//# sourceMappingURL=realnameTest.js.map