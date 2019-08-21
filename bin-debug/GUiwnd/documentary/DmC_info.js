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
var DmC_info = (function (_super) {
    __extends(DmC_info, _super);
    function DmC_info() {
        var _this = _super.call(this) || this;
        _this._isInterception = false;
        _this._vipContain = new egret.DisplayObjectContainer();
        _this._item = new GHashMap();
        _this._imgBJ = new egret.Bitmap();
        _this.addChild(_this._imgBJ);
        _this._imgBJ.x = 28;
        _this._imgBJ.y = 192;
        RES.getResByUrl("resource/assets/images/ui/ssk_expert@2x.png", function (e) { _this._imgBJ.$setBitmapData(e); }, _this);
        var rect = new egret.Rectangle(0, 30, 0, 10);
        _this._imgBJ.scale9Grid = rect;
        _this.addChild(_this._vipContain);
        _this._vipContain.y = 34;
        _this._vipBtn = new egret.Bitmap();
        _this._vipContain.addChild(_this._vipBtn);
        RES.getResByUrl("resource/assets/images/ui/hydj_expert@2x.png", function (e) { _this._vipBtn.$setBitmapData(e); }, _this);
        _this._LvText = ToolMrg.getText(30, 0, 16, 0xffffff);
        _this._vipContain.addChild(_this._LvText);
        _this._LvText.height = 24;
        _this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._LvText.text = "Lv 1";
        // this._LvText.bold = true;
        _this._redBox = new egret.Bitmap();
        _this.addChild(_this._redBox);
        _this._redBox.x = 128;
        _this._redBox.y = 80;
        RES.getResByUrl("resource/assets/images/ui/gdzs_expert@2x.png", function (e) { _this._redBox.$setBitmapData(e); }, _this);
        var rect = new egret.Rectangle(30, 0, 30, 0);
        _this._redBox.scale9Grid = rect;
        _this._tx = new egret.Bitmap();
        _this.addChild(_this._tx);
        _this._tx.touchEnabled = false;
        _this._tx.width = 80;
        _this._tx.height = 80;
        _this._tx.x = 28;
        _this._tx.y = 32;
        _this._txName = ToolMrg.getText(128, 30, 28, 0x333333);
        _this.addChild(_this._txName);
        _this._content = ToolMrg.getText(26, 137, 24, 0x333333);
        _this.addChild(_this._content);
        _this._time = ToolMrg.getText(28, 292, 24, 0x999999);
        _this.addChild(_this._time);
        _this._multiple = FontMgr.getText(FontMgr.FONT_3);
        _this.addChild(_this._multiple);
        _this._multiple.x = 548;
        _this._multiple.y = 30;
        _this._multiple.width = 158;
        _this._multiple.textAlign = egret.HorizontalAlign.RIGHT;
        // this._multiple.textColor = 0xf72e52;
        // this._multiple.size = 48;
        _this._lll = ToolMrg.getText(708, 48, 18, 0xf72e52);
        _this.addChild(_this._lll);
        _this._lll.text = "%";
        _this._jzText = ToolMrg.getText(138, 80, 20, 0xF72E52);
        _this._jzText.height = 30;
        // this._jzText.textAlign = egret.HorizontalAlign.CENTER;
        _this._jzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.addChild(_this._jzText);
        _this._psBuy = ToolMrg.getText(26, 140, 24, 0x333333);
        _this.addChild(_this._psBuy);
        _this._GD_pNum = ToolMrg.getText(334 + 48 - 150, 140, 24, 0x333333, 300);
        _this.addChild(_this._GD_pNum);
        _this._GD_pNum.textAlign = egret.HorizontalAlign.CENTER;
        _this._GT_aNum = ToolMrg.getText(202 + 120, 140, 24, 0x333333, 400);
        _this.addChild(_this._GT_aNum);
        _this._GT_aNum.textAlign = egret.HorizontalAlign.RIGHT;
        _this._nowBtn = new egret.Bitmap();
        _this.addChild(_this._nowBtn);
        _this._nowBtn.x = 578;
        _this._nowBtn.y = 282;
        // RES.getResByUrl("resource/assets/images/ui/ljcd_expert@2x.png",(e)=>{this._nowBtn.$setBitmapData(e); },this);
        _this._downLink = new egret.Bitmap();
        _this._downLink.height = 10;
        _this._downLink.width = GameMain.getInstance.StageWidth;
        _this.addChildAt(_this._downLink, 0);
        _this._downLink.y = 390;
        _this._downLink.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { _this._downLink.$setBitmapData(e); }, _this);
        _this._multipleText = ToolMrg.getText(638, 78, 20, 0xF72E52, 104);
        _this.addChild(_this._multipleText);
        // this._multipleText.textAlign = egret.HorizontalAlign.CENTER;
        _this._multipleText.text = "命中率";
        _this.setDB();
        return _this;
    }
    DmC_info.prototype.aa = function (data) {
        var _this = this;
        this._data = data;
        var imgSrc = "";
        if (data.id == UserData.getInstance.userId || data._status == 1) {
            // this._nowBtn.visible =false;
            imgSrc = "ckfa_expert@2x";
        }
        else {
            // this._nowBtn.visible = true;
            imgSrc = "ljcd_expert@2x";
        }
        RES.getResByUrl("resource/assets/images/ui/" + imgSrc + ".png", function (e) { _this._nowBtn.$setBitmapData(e); }, this);
        if (data.txSrc != undefined && data.txSrc != "") {
            // LoadNetPic.getLoadNetPic.loadPic(data.txSrc,(e)=>{this._tx.$setBitmapData(e); },this);
            RES.getResByUrl("resource/assets/images/ui/tou" + data.txSrc + ".png", function (e) { _this._tx.$setBitmapData(e); }, this);
        }
        else {
            RES.getResByUrl("resource/assets/images/ui/user1_default.png", function (e) { _this._tx.$setBitmapData(e); }, this);
        }
        this._txName.text = data.txName;
        this._vipContain.x = this._txName.x + this._txName.textWidth + 8;
        this._LvText.text = "vip " + data.vip;
        this._content.text = ToolMrg.nameMode2(53, data.content);
        this._jzText.text = "\u8FD17\u65E5 " + data.ticke + "\u4E2D" + data.z;
        this._redBox.width = this._jzText.textWidth + 20;
        this._psBuy.textFlow = [
            { text: "自购", style: { "textColor": 0x999999 } },
            { text: ToolMrg.getDecimal(data.money / 100, 2) + "元", style: { "textColor": 0x333333 } }
        ];
        this._GD_pNum.textFlow = [
            { text: "跟单", style: { "textColor": 0x999999 } },
            { text: data.num + "人", style: { "textColor": 0x333333 } }
        ];
        this._GT_aNum.textFlow = [
            { text: "跟投", style: { "textColor": 0x999999 } },
            { text: ToolMrg.getDecimal(data.GD_money / 100, 2) + "元", style: { "textColor": 0x333333 } }
        ];
        var obj;
        var objheight = 192;
        for (var _i = 0, _a = data.teamItem.keys; _i < _a.length; _i++) {
            var i = _a[_i];
            if (this._item.Gget(i)) {
                obj = this._item.Gget(i);
            }
            else {
                obj = new DmC_infoLink();
                this._item.Gput(i, obj);
            }
            obj.aa(data.teamItem.Gget(i), data._type);
            obj.y = objheight;
            objheight = objheight + obj.height;
            if (obj.parent == undefined)
                this.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item, data.teamItem);
        this._imgBJ.height = objheight - 192;
        this._nowBtn.y = objheight + 18;
        this._time.y = objheight + 33;
        this._time.text = "\u622A\u6B62  " + ToolMrg.getTime7(data.time);
        var toF = Number(data.multiple);
        this._multiple.text = toF == 0 ? "0.00" : ToolMrg.getDecimal(toF, 2).toFixed(2);
        // this._lll.x = 654 + this._multiple.textWidth/2;
        this._mShareC.height = objheight + 102;
        this._downLink.y = this._mShareC.height - 10;
    };
    DmC_info.prototype.addInterception = function () {
        if (!this._isInterception) {
            this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    };
    DmC_info.prototype.removeInterception = function () {
        if (this._isInterception) {
            this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    };
    /**适配处理 */
    DmC_info.prototype.setDB = function () {
        var _this = this;
        this._mShareC = new egret.Bitmap();
        this._mShareC.height = 400;
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { _this._mShareC.$setBitmapData(e); }, this);
    };
    DmC_info.prototype.touchDown = function (e) {
        if (WorldWnd.getInstance.parent != undefined) {
            WorldWnd.getInstance.hide();
            WorldWnd._worldState = 1;
        }
        if (e.target == this._mShareC) {
            // if(this._data.id == UserData.getInstance.userId) {
            //     return;
            // }
            DmC_infoMsg.dmdetail = new DmDetails();
            if (this._data.time * 1000 < new Date().getTime())
                DmC_infoMsg.dmdetail.show(this._data.oid, this._data.mold, this._data.id, 1);
            else
                DmC_infoMsg.dmdetail.show(this._data.oid, this._data.mold, this._data.id);
            GD_detail.getInstance.sendHttp(this._data.oid, this._data.model);
        }
        else if (e.target == this._tx) {
            // DmC_infoMsg.personalHome = new PersonalHome();
            // DmC_infoMsg.personalHome.show();
        }
    };
    return DmC_info;
}(egret.DisplayObjectContainer));
__reflect(DmC_info.prototype, "DmC_info");
var DmC_infoLink = (function (_super) {
    __extends(DmC_infoLink, _super);
    function DmC_infoLink() {
        var _this = _super.call(this) || this;
        var link = new egret.Bitmap();
        _this.addChild(link);
        link.x = 28;
        // link.y = 192;
        RES.getResByUrl("resource/assets/images/ui/ssk_expert@2x.png", function (e) { link.$setBitmapData(e); }, _this);
        _this._dateText = ToolMrg.getText(48, 12 + 13, 24, 0x999999);
        _this.addChild(_this._dateText);
        _this._teamVS = ToolMrg.getText(270 + (216 / 2 - 200) + 24, 12 + 13, 24, 0x333333, 400);
        _this.addChild(_this._teamVS);
        _this._teamVS.textAlign = egret.HorizontalAlign.CENTER;
        _this._btnLink = new egret.Shape();
        _this.addChild(_this._btnLink);
        _this._btnLink.graphics.beginFill(0xA9A9A9);
        _this._btnLink.graphics.drawRect(604, 20, 2, 24);
        _this._btnLink.graphics.endFill();
        // RES.getResByUrl("resource/assets/images/ui/hui.png",(e)=>{this._btnLink.$setBitmapData(e); },this); 
        // this._btnLink.x = 604;
        // this._btnLink.y = 246;
        // this._btnLink.width = 2;
        // this._btnLink.height = 24;
        _this._typeContent = ToolMrg.getText(604, 0, 24, 0x999999, 118);
        _this.addChild(_this._typeContent);
        _this._typeContent.height = 72;
        _this._typeContent.textAlign = egret.HorizontalAlign.CENTER;
        _this._typeContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._typeContent.text = "公开";
        _this._lockBtn = new egret.Bitmap();
        _this.addChild(_this._lockBtn);
        _this._lockBtn.y = 20;
        // this._lockBtn.y = 100;
        _this._lockBtn.x = 172;
        RES.getResByUrl("resource/assets/images/ui/suo_expert@2x.png", function (e) { _this._lockBtn.$setBitmapData(e); }, _this);
        _this._lockText = ToolMrg.getText(208, 0, 24, 0x999999);
        _this.addChild(_this._lockText);
        _this._lockText.height = 72;
        _this._lockText.verticalAlign = egret.VerticalAlign.MIDDLE;
        return _this;
    }
    DmC_infoLink.prototype.aa = function (data, str) {
        this._data = data;
        if (str == "1") {
            this._btnLink.visible = true;
            this._lockBtn.visible = false;
            this._lockText.text = "";
            this._dateText.text = data.day + " " + data.len_name;
            var teamOne = ToolMrg.nameMode(7, data.team_a_name);
            var teamTwo = ToolMrg.nameMode(7, data.team_b_name);
            this._teamVS.text = teamOne + " vs " + teamTwo;
            this._typeContent.text = "公开";
        }
        else {
            this._btnLink.visible = true;
            this._lockBtn.visible = false;
            this._lockText.text = "";
            var teamOne = ToolMrg.nameMode(7, data.team_a_name);
            var teamTwo = ToolMrg.nameMode(7, data.team_b_name);
            this._dateText.text = data.day + " " + data.len_name;
            this._teamVS.text = teamOne + " vs " + teamTwo;
            if (str == "2")
                this._typeContent.text = "保密";
            else
                this._typeContent.text = "保密";
        }
        // else{
        //     this._btnLink.visible = false;
        //     this._lockBtn.visible = true;
        //     this._dateText.text = "";
        //     this._teamVS.text = "";
        //     this._typeContent.text = "";
        //     let strText = "";
        //     if(str=="2"){
        //         strText = "保密方案，截止投注后显示详情";
        //     }else{
        //         strText = "保密方案，赛事结束后公开";
        //     }
        //     this._lockText.text = strText;
        // }
    };
    return DmC_infoLink;
}(egret.DisplayObjectContainer));
__reflect(DmC_infoLink.prototype, "DmC_infoLink");
var DmC_infoMsg = (function () {
    function DmC_infoMsg() {
        this.item = new GHashMap();
    }
    Object.defineProperty(DmC_infoMsg, "getInstance", {
        get: function () {
            if (DmC_infoMsg._mInstance == undefined)
                DmC_infoMsg._mInstance = new DmC_infoMsg();
            return DmC_infoMsg._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    return DmC_infoMsg;
}());
__reflect(DmC_infoMsg.prototype, "DmC_infoMsg");
var DmC_infoData = (function () {
    function DmC_infoData() {
        this.teamItem = new GHashMap();
    }
    return DmC_infoData;
}());
__reflect(DmC_infoData.prototype, "DmC_infoData");
var DmC_infoData_team = (function () {
    function DmC_infoData_team() {
    }
    return DmC_infoData_team;
}());
__reflect(DmC_infoData_team.prototype, "DmC_infoData_team");
//# sourceMappingURL=DmC_info.js.map