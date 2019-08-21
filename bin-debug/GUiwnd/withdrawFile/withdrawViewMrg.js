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
/**提现界面*/
var withdrawViewMrg = (function (_super) {
    __extends(withdrawViewMrg, _super);
    function withdrawViewMrg() {
        var _this = _super.call(this) || this;
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._mListObj = new GHashMap();
        _this._mListObj1 = new GHashMap();
        _this._topUI = new TopUIWhite("", -_this.y);
        _this._topUI.changeTitle("提款申请");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._txrecord = _this._topUI.gettkrecordBnt();
        _this._txrecord.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            CapitalWnd.getInstance.show(3);
        }, _this);
        // let link = new egret.Shape();
        // this.addChild(link);
        // link.graphics.beginFill(0xf5f5f7);
        // link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 5);
        // link.graphics.endFill();
        var link1 = new egret.Shape();
        _this._mContain.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 257, GameMain.getInstance.StageWidth, 10);
        link1.graphics.endFill();
        _this._selectTypeText = ToolMrg.getText(40, 47, 28, 0x333333, 300);
        _this._selectTypeText.text = "选择提款类型：";
        _this._selectTypeText.textAlign = egret.HorizontalAlign.CENTER;
        _this._selectTypeText.fontFamily = "微软雅黑";
        _this._mContain.addChild(_this._selectTypeText);
        _this._decideobj = new decideTKObj();
        _this._mContain.addChild(_this._decideobj);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(withdrawViewMrg, "getInstance", {
        get: function () {
            if (withdrawViewMrg._mInstance == undefined)
                withdrawViewMrg._mInstance = new withdrawViewMrg();
            return withdrawViewMrg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取零钱或佣金列表*/
    withdrawViewMrg.prototype.getlist1 = function () {
        return this._mListObj1;
    };
    /**获取数据对象列表*/
    withdrawViewMrg.prototype.getlist = function () {
        return this._mListObj;
    };
    withdrawViewMrg.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.topLay.addChild(this);
        }
        decideTKObj.canTiXian = true;
        this.initallInfo();
        this.initallInfo1();
    };
    withdrawViewMrg.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
        decideTKObj.canTiXian = true;
    };
    /**适配处理 */
    withdrawViewMrg.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**初始化所有数据*/
    withdrawViewMrg.prototype.initallInfo = function () {
        var len = 3;
        var dataObj;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new bgxianTx(i);
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i);
            dataObj.setPoint(0, 267 + (i - 1) * 109);
            if (dataObj.parent == undefined) {
                this._mContain.addChild(dataObj);
            }
        }
        withdrawData.getInstance.setAllMoney();
        this.setconne();
    };
    /**初始化佣金零钱*/
    withdrawViewMrg.prototype.initallInfo1 = function () {
        var len = 2;
        var dataObj;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj1.Gget(i);
            if (dataObj == undefined) {
                dataObj = new withdrawObj(i);
                this._mListObj1.Gput(i, dataObj);
            }
            dataObj.setID(i);
            if (i == 1) {
                dataObj.setmongtext(UserData.getInstance.getGold());
            }
            else if (i == 2) {
                dataObj.setmongtext(UserData.getInstance.getYJGold());
            }
            dataObj.setPoint(40 + (i - 1) * 390, 107);
            if (dataObj.parent == undefined) {
                this._mContain.addChild(dataObj);
            }
        }
        withdrawData.getInstance.selectdecide();
    };
    withdrawViewMrg.prototype.addevent = function () {
        // this.nextBnt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
    };
    withdrawViewMrg.prototype.onclick = function () {
    };
    /**设置银行和卡号*/
    withdrawViewMrg.prototype.setconne = function () {
        var list = SelectDataMrg.getInstance.getItem();
        var data = list.Gget(selectBankData.selectID - 1);
        if (data != undefined) {
            var obj1 = this._mListObj.Gget(1);
            var obj2 = this._mListObj.Gget(2);
            if (obj1 != undefined) {
                obj1.setInpText(data.BankName);
            }
            if (obj2 != undefined) {
                obj2.setInpText(data.cardNum);
            }
        }
    };
    withdrawViewMrg.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 0;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - this._scroView.y;
        this.addChild(this._scroView);
    };
    return withdrawViewMrg;
}(egret.DisplayObjectContainer));
__reflect(withdrawViewMrg.prototype, "withdrawViewMrg");
var bgxianTx = (function (_super) {
    __extends(bgxianTx, _super);
    function bgxianTx(id) {
        var _this = _super.call(this) || this;
        _this.myid = 1; //自身id
        _this.touchEnabled = true;
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
        _this.tatleText.touchEnabled = true;
        _this.tatleText.bold = true;
        _this.inputText = ToolMrg.getText(230, 0, 28, 0x999999, 400);
        _this.addChild(_this.inputText);
        _this.inputText.height = 108;
        _this.inputText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.inputText.text = "";
        _this.inputText.fontFamily = "微软雅黑";
        _this.inputText.touchEnabled = true;
        _this.myid = id;
        if (id == 1) {
            var jts_1 = new egret.Bitmap();
            _this.addChild(jts_1);
            jts_1.x = 692;
            jts_1.y = 30;
            RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
                jts_1.$setBitmapData(e);
            }, _this);
        }
        if (id == 3) {
            _this.meiText = ToolMrg.getText(230, 40, 28, 0x333333, 50);
            _this.addChild(_this.meiText);
            _this.meiText.text = "￥";
            _this.meiText.bold = true;
            _this.inputText.x = 264;
            _this.inputText.type = egret.TextFieldType.INPUT;
            _this.inputText.textColor = 0x999999;
        }
        else {
            _this.inputText.textColor = 0x333333;
        }
        _this.allzc = ToolMrg.getText(602, 40, 28, 0xFF7000, 120);
        _this.addChild(_this.allzc);
        _this.allzc.height = 40;
        _this.allzc.touchEnabled = true;
        _this.allzc.text = "全部转出";
        _this.allzc.bold = true;
        if (id == 3) {
            _this.allzc.visible = true;
        }
        else {
            _this.allzc.visible = false;
        }
        _this.addevent();
        return _this;
    }
    bgxianTx.prototype.getStr = function () {
        return this.inputText.text;
    };
    bgxianTx.prototype.setInpText = function (str) {
        if (this.inputText == undefined)
            return;
        this.inputText.text = str;
    };
    bgxianTx.prototype.setcolor = function () {
        if (this.inputText == undefined)
            return;
        this.inputText.textColor = 0x999999;
    };
    bgxianTx.prototype.settatleText = function (str) {
        if (this.tatleText == undefined)
            return;
        this.tatleText.text = str;
    };
    bgxianTx.prototype.setID = function (id) {
        this.myid = id;
        if (id == 1) {
            if (this.inputText.text == "") {
                this.setInpText(bgxianTx.namelist[id - 1]);
            }
            this.settatleText("开户银行");
        }
        else if (id == 2) {
            if (this.inputText.text == "") {
                this.setInpText(bgxianTx.namelist[id - 1]);
            }
            this.settatleText("银行卡号");
        }
        else if (id == 3) {
            if (this.inputText.text == "") {
                this.setInpText(bgxianTx.namelist[id - 1]);
            }
            this.settatleText("提取金额");
        }
    };
    bgxianTx.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    bgxianTx.prototype.addevent = function () {
        this.inputText.addEventListener(egret.Event.FOCUS_IN, this.textInput, this);
        this.inputText.addEventListener(egret.Event.FOCUS_OUT, this.textInput, this);
        this.allzc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        if (this.myid == 1) {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onclick, this);
        }
    };
    bgxianTx.prototype.onclick = function () {
        if (this.myid == 1) {
            selectBankcard.getInstance.show();
        }
    };
    bgxianTx.prototype.onTouch = function () {
        var type = withdrawData.defauleid;
        if (type == 1) {
            var str = Math.floor(UserData.getInstance.getGold());
            this.inputText.text = "" + str;
            withdrawData.bangtk = str + "";
        }
        else {
            var str = Math.floor(UserData.getInstance.getYJGold());
            this.inputText.text = "" + str;
            withdrawData.bangtk = str + "";
        }
        this.inputText.textColor = 0x000000;
    };
    bgxianTx.prototype.textInput = function () {
        var strtx = withdrawData.getInstance.getAllMoney();
        this.inputText.text;
        if (this.inputText != undefined && this.inputText.text == strtx || this.inputText.text == bgxianTx.namelist[0] || this.inputText.text == bgxianTx.namelist[0]) {
            this.inputText.text = "";
            this.inputText.textColor = 0x000000;
            this.inputText.alpha = 1;
        }
        else if (this.inputText != undefined && this.inputText.text == "") {
            if (this.myid == 1) {
                this.inputText.text = bgxianTx.namelist[this.myid - 1];
                this.inputText.textColor = 0xA9A9A9;
                this.inputText.alpha = 1;
                // } else if (this.myid == 2) {
                // 	this.inputText.text = bgxianTx.namelist[this.myid - 1];
                // 	this.inputText.textColor = 0xA9A9A9;
                // 	this.inputText.alpha = 1;
                //
            }
            else if (this.myid == 3) {
                this.inputText.text = strtx;
                this.inputText.textColor = 0xA9A9A9;
                this.inputText.alpha = 1;
            }
        }
        else {
            // if (this.myid == 2) {//检验银行卡号
            // 	let oneche: boolean = bankcardCheck.getInstance.onecheck(this.inputText.text);
            // 	let twoche: boolean = bankcardCheck.getInstance.twocheck(this.inputText.text);
            // 	if (oneche == false || twoche == false) {//银行卡号不正确
            // 		Alertpaner.getInstance.show("银行卡号不正确");
            // 		this.inputText.text = bgxianTx.namelist[this.myid - 1];
            // 		this.inputText.textColor = 0x999999;
            // 	} else {
            // 	}
            // } else 
            if (this.myid == 1) {
                var ifName = bankcardCheck.getInstance.checkName(this.inputText.text);
                if (ifName == false) {
                    Alertpaner.getInstance.show("不能填写数字");
                    this.inputText.text = bgxianTx.namelist[this.myid - 1];
                    this.inputText.textColor = 0x999999;
                }
                else {
                }
            }
            else if (this.myid == 3) {
                var type = withdrawData.defauleid;
                var ifNo = bankcardCheck.getInstance.checkAllNum(this.inputText.text);
                if (ifNo == false) {
                    Alertpaner.getInstance.show("只能填写数字");
                    withdrawData.getInstance.setAllMoney();
                    this.inputText.textColor = 0x999999;
                    withdrawData.bangtk = "";
                }
                else {
                    var inpNum = this.inputText.text;
                    if (type == 1) {
                        if (Number(inpNum) > UserData.getInstance.getGold()) {
                            this.inputText.text = UserData.getInstance.getGold() + "";
                        }
                        withdrawData.bangtk = this.inputText.text;
                    }
                    else {
                        if (Number(inpNum) > UserData.getInstance.getYJGold()) {
                            this.inputText.text = UserData.getInstance.getYJGold() + "";
                        }
                        withdrawData.bangtk = this.inputText.text;
                    }
                    if (Number(withdrawData.bangtk + "".length) > 1) {
                        var moneyOne = Number(withdrawData.bangtk + "".slice(0, 1));
                        if (moneyOne == 0) {
                            Alertpaner.getInstance.show("填写不规范");
                            withdrawData.getInstance.setAllMoney();
                            this.inputText.textColor = 0x999999;
                            this.inputText.text = strtx;
                            withdrawData.bangtk = "";
                        }
                    }
                }
            }
        }
    };
    bgxianTx.namelist = ["11", "62812.....22565", "可提取金额"];
    return bgxianTx;
}(egret.DisplayObjectContainer));
__reflect(bgxianTx.prototype, "bgxianTx");
//# sourceMappingURL=withdrawViewMrg.js.map