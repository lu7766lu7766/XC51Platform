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
/**选择银行卡 */
var selectBankcard = (function (_super) {
    __extends(selectBankcard, _super);
    function selectBankcard() {
        var _this = _super.call(this) || this;
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        _this._mListObj = new GHashMap();
        _this.y = 96 + GameValue.adaptationScreen;
        _this.touchEnabled = true;
        _this._topUI = new TopUIWhite("", -_this.y);
        _this._topUI.changeTitle("选择银行卡");
        _this.addChild(_this._topUI);
        _this._topUI.gettkrecordBnt().visible = false;
        _this._return = _this._topUI.getReturn();
        _this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.hide();
        }, _this);
        // let bglinkxian = new egret.Shape();
        // bglinkxian.graphics.beginFill(0xDEDEDE, 1);
        // bglinkxian.graphics.drawRect(0, 0, 750, 3);
        // bglinkxian.graphics.endFill();
        // this.addChild(bglinkxian);
        _this._accountText = ToolMrg.getText(40, 23, 28, 0x333333, 300);
        _this._accountText.text = "到账银行卡";
        _this._accountText.fontFamily = "微软雅黑";
        _this._accountText.bold = true;
        _this.addChild(_this._accountText);
        _this.setDB();
        return _this;
    }
    Object.defineProperty(selectBankcard, "getInstance", {
        get: function () {
            if (selectBankcard._mInstance == undefined)
                selectBankcard._mInstance = new selectBankcard();
            return selectBankcard._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    /**获取列表*/
    selectBankcard.prototype.getList = function () {
        return this._mListObj;
    };
    selectBankcard.prototype.show = function () {
        if (this.parent == undefined) {
            GUIManager.getInstance.tipLay.addChild(this);
        }
        GetBank_allLIst.getInstance.sendHttp(UserData.getInstance.userId);
        this.initallInfo();
    };
    selectBankcard.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    };
    /**适配处理 */
    selectBankcard.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    /**初始化所有数据*/
    selectBankcard.prototype.initallInfo = function () {
        var list = SelectDataMrg.getInstance.getItem();
        var len = list.size;
        len = len + 1;
        var dataObj;
        var data;
        for (var i = 1; i <= len; i++) {
            dataObj = this._mListObj.Gget(i);
            data = list.Gget(i - 1);
            var type = true;
            if (i == len)
                type = false;
            if (dataObj == undefined) {
                dataObj = new selectBankItem(type);
                this._mListObj.Gput(i, dataObj);
            }
            if (type == true) {
                dataObj.setID(i, 1, type);
            }
            else {
                dataObj.setID(i, 2, type);
            }
            if (i == len) {
                dataObj.settatleName("使用新卡提现");
            }
            else {
                if (data != undefined) {
                    dataObj.settatleName(data.userName + "  " + data.BankName + "(" + data.cardNum + ")");
                }
            }
            dataObj.setPoint(0, (i - 1) * 122);
            if (dataObj.parent == undefined) {
                this._mContain.addChild(dataObj);
            }
        }
        selectBankData.getInstance.selectBank();
    };
    selectBankcard.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 86;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 86;
        this.addChild(this._scroView);
    };
    return selectBankcard;
}(egret.DisplayObjectContainer));
__reflect(selectBankcard.prototype, "selectBankcard");
var selectBankItem = (function (_super) {
    __extends(selectBankItem, _super);
    function selectBankItem(boo) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        _this.typeid = 0; //1 选择银行卡 2添加新的银行卡
        _this.typeinfo = false;
        _this.touchEnabled = true;
        var bglink = new egret.Shape();
        bglink.graphics.beginFill(0xFFFFFF, 1);
        bglink.graphics.drawRect(0, 0, 750, 100);
        bglink.graphics.endFill();
        _this.addChildAt(bglink, 0);
        var bglinkxian = new egret.Shape();
        bglinkxian.graphics.beginFill(0xDEDEDE, 1);
        bglinkxian.graphics.drawRect(0, 97, 750, 3);
        bglinkxian.graphics.endFill();
        _this.addChild(bglinkxian);
        _this.bankName = ToolMrg.getText(20, 0, 28, 0x333333);
        _this.bankName.text = "中国银行卡";
        _this.bankName.fontFamily = "微软雅黑";
        _this.bankName.height = 100;
        _this.bankName.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.bankName.bold = true;
        _this.addChild(_this.bankName);
        _this.selecticon = new egret.Bitmap();
        _this.addChild(_this.selecticon);
        _this.selecticon.x = 670;
        _this.selecticon.y = 30;
        // RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png", (e) => {
        // 	this.selecticon.$setBitmapData(e);
        // }, this);
        _this.jiantouicon = new egret.Bitmap();
        _this.addChild(_this.jiantouicon);
        _this.jiantouicon.x = 694;
        _this.jiantouicon.y = 34;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", function (e) {
            _this.jiantouicon.$setBitmapData(e);
        }, _this);
        if (boo == true) {
            _this.selecticon.visible = true;
            _this.jiantouicon.visible = false;
        }
        else {
            _this.selecticon.visible = false;
            _this.jiantouicon.visible = true;
        }
        _this.addevent();
        return _this;
    }
    /**设置名字*/
    selectBankItem.prototype.settatleName = function (namestr) {
        if (this.bankName == undefined)
            return;
        this.bankName.text = namestr;
    };
    /**设置箭头图片(1色彩勾 2灰色勾)*/
    selectBankItem.prototype.setjtSprite = function (num) {
        if (num == 1) {
            RES.getResByUrl("resource/assets/images/ui/select_home@2x.png", this.back1, this, RES.ResourceItem.TYPE_IMAGE);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png", this.back1, this, RES.ResourceItem.TYPE_IMAGE);
        }
    };
    selectBankItem.prototype.back1 = function (data, url) {
        if (data != undefined && this.selecticon != undefined) {
            this.selecticon.$setBitmapData(data);
        }
    };
    /**左箭头和勾勾的显示*/
    selectBankItem.prototype.setjtgg = function () {
        if (this.typeinfo == true) {
            this.selecticon.visible = true;
            this.jiantouicon.visible = false;
        }
        else {
            this.selecticon.visible = false;
            this.jiantouicon.visible = true;
        }
    };
    selectBankItem.prototype.setID = function (id, type, typeinfo) {
        this.myid = id;
        this.typeid = type;
        this.typeinfo = typeinfo;
        if (id == 1) {
            this.setjtSprite(1);
        }
        else {
            this.setjtSprite(2);
        }
        this.setjtgg();
    };
    selectBankItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    selectBankItem.prototype.addevent = function () {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    };
    selectBankItem.prototype.onTouch = function () {
        if (this.typeid == 1) {
            selectBankData.selectID = this.myid;
            selectBankData.getInstance.selectBank();
            selectBankcard.getInstance.hide();
        }
        else {
            var list = SelectDataMrg.getInstance.getItem();
            if (list != undefined && list.size < 3) {
                AddBankCard.getInstance.show();
            }
            else {
                Alertpaner.getInstance.show("最多只能绑定三张银行卡");
            }
        }
    };
    return selectBankItem;
}(egret.DisplayObjectContainer));
__reflect(selectBankItem.prototype, "selectBankItem");
//# sourceMappingURL=SelectBankCard.js.map