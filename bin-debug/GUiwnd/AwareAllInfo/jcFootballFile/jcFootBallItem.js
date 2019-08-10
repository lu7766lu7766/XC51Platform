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
/**竞彩足球开奖详情item */
var jcFootBallItem = (function (_super) {
    __extends(jcFootBallItem, _super);
    function jcFootBallItem() {
        var _this = _super.call(this) || this;
        _this._mListObj = new GHashMap();
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xffffff);
        link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 250);
        link.graphics.endFill();
        var link1 = new egret.Shape();
        _this.addChild(link1);
        link1.graphics.beginFill(0xF5F5F7);
        link1.graphics.drawRect(0, 250, GameMain.getInstance.StageWidth, 10);
        link1.graphics.endFill();
        _this.dayandLsName = ToolMrg.getText(38, 22, 20, 0x999999, 300);
        _this.addChild(_this.dayandLsName);
        _this.dayandLsName.text = "周二001  韩职";
        _this.teama = ToolMrg.getText(132, 66, 28, 0x333333, 300);
        _this.addChild(_this.teama);
        _this.teama.text = "江源FC";
        _this.teama.bold = true;
        _this.teamb = ToolMrg.getText(520, 66, 28, 0x333333, 300);
        _this.addChild(_this.teamb);
        _this.teamb.text = "无敌FC";
        _this.teamb.bold = true;
        _this.bbFen = ToolMrg.getText(0, 68, 24, 0xFF7000, 750);
        _this.addChild(_this.bbFen);
        _this.bbFen.textAlign = egret.HorizontalAlign.CENTER;
        _this.bbFen.textFlow = [
            { "text": "4:0", style: { "textColor": 0xF72E52, size: 24 } },
            { "text": " 半(2:0)", style: { "textColor": 0x333333, size: 24 } }
        ];
        _this.bbFen.touchEnabled = true;
        return _this;
    }
    jcFootBallItem.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(jcFootBallItem);
        if (obj == null)
            obj = new jcFootBallItem();
        return obj;
    };
    jcFootBallItem.prototype.setID = function (data) {
        this._mData = data;
        this.initallInfo();
        this.setteamandBF();
        this.setdayandLsName();
    };
    jcFootBallItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置日期和联赛名字*/
    jcFootBallItem.prototype.setdayandLsName = function () {
        this.dayandLsName.text = this._mData.time + " " + this._mData.league_name;
    };
    /**设置队名 a b 和比分 */
    jcFootBallItem.prototype.setteamandBF = function () {
        this.teama.text = this._mData.team_a_name;
        this.teamb.text = this._mData.team_b_name;
        var color = 0x333333;
        if (this._mData.color == 1) {
            color = 0xF72E52;
        }
        else if (this._mData.color == 2) {
            color = 0x333333;
        }
        else if (this._mData.color == 3) {
            color = 0x17B22C;
        }
        this.bbFen.textFlow = [
            { "text": "" + this._mData.fen, style: { "textColor": color, size: 24 } },
            { "text": " 半(" + this._mData.ban + ")", style: { "textColor": color, size: 24 } }
        ];
    };
    /**初始化所有数据*/
    jcFootBallItem.prototype.initallInfo = function () {
        var dataObj;
        for (var i = 0; i < this._mData.form.length; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new xianxian(i);
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i);
            dataObj.setconnet(this._mData.form[i]);
            if (i < 5) {
                dataObj.setPoint(40 + (i) * 134, 124);
                if (i > 1) {
                    dataObj.leftline.visible = false;
                    dataObj.rightline1.visible = false;
                    if (i == 4) {
                        dataObj.rightline1.visible = true;
                        dataObj.rightline2.visible = false;
                    }
                }
                else {
                    dataObj.rightline1.visible = false;
                    dataObj.rightline2.visible = true;
                }
            }
            else {
                dataObj.setPoint(40 + (i - 5) * 134, 124 + 49);
                if (i > 5) {
                    dataObj.leftline.visible = false;
                    dataObj.rightline1.visible = false;
                    if (i == 9) {
                        dataObj.rightline1.visible = true;
                        dataObj.rightline2.visible = false;
                    }
                }
                else {
                    dataObj.rightline1.visible = false;
                    dataObj.rightline2.visible = true;
                }
            }
            if (dataObj.parent == undefined) {
                this.addChild(dataObj);
            }
        }
    };
    jcFootBallItem.prototype.clean = function () {
    };
    return jcFootBallItem;
}(egret.DisplayObjectContainer));
__reflect(jcFootBallItem.prototype, "jcFootBallItem", ["GIObjPool"]);
var xianxian = (function (_super) {
    __extends(xianxian, _super);
    function xianxian(id) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xffffff);
        link.graphics.drawRect(0, 0, 134, 50);
        link.graphics.endFill();
        var linkTop = new egret.Shape();
        _this.addChild(linkTop);
        linkTop.graphics.beginFill(0xCACACA);
        linkTop.graphics.drawRect(0, 0, 133, 1);
        linkTop.graphics.endFill();
        var linklow = new egret.Shape();
        _this.addChild(linklow);
        linklow.graphics.beginFill(0xCACACA);
        linklow.graphics.drawRect(0, 49, 133, 1);
        linklow.graphics.endFill();
        _this.leftline = new egret.Shape();
        _this.addChild(_this.leftline);
        _this.leftline.graphics.beginFill(0xCACACA);
        _this.leftline.graphics.drawRect(0, 0, 1, 49);
        _this.leftline.graphics.endFill();
        _this.rightline1 = new egret.Shape();
        _this.addChild(_this.rightline1);
        _this.rightline1.graphics.beginFill(0xCACACA);
        _this.rightline1.graphics.drawRect(133, 0, 1, 50);
        _this.rightline1.graphics.endFill();
        _this.rightline2 = new egret.Shape();
        _this.addChild(_this.rightline2);
        _this.rightline2.graphics.beginFill(0xCACACA);
        _this.rightline2.graphics.drawRect(133, 10, 1, 32);
        _this.rightline2.graphics.endFill();
        _this.connet = ToolMrg.getText(0, 0, 24, 0x333333, 134);
        _this.addChild(_this.connet);
        _this.connet.height = 50;
        _this.connet.textAlign = egret.HorizontalAlign.CENTER;
        _this.connet.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.connet.text = "主主胜";
        _this.connet.touchEnabled = true;
        _this.connet.bold = true;
        return _this;
    }
    xianxian.prototype.setID = function (id) {
        this.myid = id;
    };
    xianxian.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置显示内容*/
    xianxian.prototype.setconnet = function (str) {
        this.connet.text = str;
    };
    return xianxian;
}(egret.DisplayObjectContainer));
__reflect(xianxian.prototype, "xianxian");
//# sourceMappingURL=jcFootBallItem.js.map