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
/**竞彩篮球开奖详情item */
var jcbasketBallItem = (function (_super) {
    __extends(jcbasketBallItem, _super);
    function jcbasketBallItem() {
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
            { "text": "4:0", style: { "textColor": 0xF72E52, size: 24 } }
        ];
        _this.bbFen.touchEnabled = true;
        return _this;
    }
    jcbasketBallItem.getObj = function () {
        var obj = GObjPool.getInstance.GgetObj(jcbasketBallItem);
        if (obj == null)
            obj = new jcbasketBallItem();
        return obj;
    };
    jcbasketBallItem.prototype.setID = function (data) {
        this._mData = data;
        this.initallInfo();
        this.setteamandBF();
        this.setdayandLsName();
    };
    jcbasketBallItem.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置日期和联赛名字*/
    jcbasketBallItem.prototype.setdayandLsName = function () {
        this.dayandLsName.text = this._mData.time + " " + this._mData.league_name;
    };
    /**设置队名 a b 和比分 */
    jcbasketBallItem.prototype.setteamandBF = function () {
        this.teama.text = this._mData.team_a_name;
        this.teamb.text = this._mData.team_b_name;
        var color = 0x333333;
        if (this._mData.color == 1) {
            color = 0xF72E52;
        }
        else if (this._mData.color == 2) {
            color = 0x17B22C;
        }
        this.bbFen.textFlow = [
            { "text": "" + this._mData.fen, style: { "textColor": color, size: 24 } }
        ];
    };
    /**初始化所有数据*/
    jcbasketBallItem.prototype.initallInfo = function () {
        var dataObj;
        for (var i = 0; i < this._mData.form.length; i++) {
            dataObj = this._mListObj.Gget(i);
            if (dataObj == undefined) {
                dataObj = new xianxian1(i);
                this._mListObj.Gput(i, dataObj);
            }
            dataObj.setID(i);
            dataObj.setconnet(this._mData.form[i]);
            if (i < 4) {
                dataObj.setPoint(40 + (i) * 167.5, 124);
                if (i > 0) {
                    dataObj.leftline.visible = false;
                    dataObj.rightline1.visible = false;
                    if (i == 3) {
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
                dataObj.setPoint(40 + (i - 4) * 167.5, 124 + 49);
                if (i > 4) {
                    dataObj.leftline.visible = false;
                    dataObj.rightline1.visible = false;
                    if (i == 7) {
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
    jcbasketBallItem.prototype.clean = function () {
    };
    return jcbasketBallItem;
}(egret.DisplayObjectContainer));
__reflect(jcbasketBallItem.prototype, "jcbasketBallItem", ["GIObjPool"]);
var xianxian1 = (function (_super) {
    __extends(xianxian1, _super);
    function xianxian1(id) {
        var _this = _super.call(this) || this;
        _this.myid = 0; //自身id
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xffffff);
        link.graphics.drawRect(0, 0, 167.5, 50);
        link.graphics.endFill();
        var linkTop = new egret.Shape();
        _this.addChild(linkTop);
        linkTop.graphics.beginFill(0xCACACA);
        linkTop.graphics.drawRect(0, 0, 166.5, 1);
        linkTop.graphics.endFill();
        var linklow = new egret.Shape();
        _this.addChild(linklow);
        linklow.graphics.beginFill(0xCACACA);
        linklow.graphics.drawRect(0, 49, 166.5, 1);
        linklow.graphics.endFill();
        _this.leftline = new egret.Shape();
        _this.addChild(_this.leftline);
        _this.leftline.graphics.beginFill(0xCACACA);
        _this.leftline.graphics.drawRect(0, 0, 1, 49);
        _this.leftline.graphics.endFill();
        _this.rightline1 = new egret.Shape();
        _this.addChild(_this.rightline1);
        _this.rightline1.graphics.beginFill(0xCACACA);
        _this.rightline1.graphics.drawRect(166.5, 0, 1, 50);
        _this.rightline1.graphics.endFill();
        _this.rightline2 = new egret.Shape();
        _this.addChild(_this.rightline2);
        _this.rightline2.graphics.beginFill(0xCACACA);
        _this.rightline2.graphics.drawRect(166.5, 10, 1, 32);
        _this.rightline2.graphics.endFill();
        _this.connet = ToolMrg.getText(0, 0, 24, 0x333333, 167.5);
        _this.addChild(_this.connet);
        _this.connet.height = 50;
        _this.connet.textAlign = egret.HorizontalAlign.CENTER;
        _this.connet.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this.connet.text = "主主胜";
        _this.connet.touchEnabled = true;
        _this.connet.bold = true;
        return _this;
    }
    xianxian1.prototype.setID = function (id) {
        this.myid = id;
    };
    xianxian1.prototype.setPoint = function (x, y) {
        this.x = x;
        this.y = y;
    };
    /**设置显示内容*/
    xianxian1.prototype.setconnet = function (str) {
        this.connet.text = str;
    };
    return xianxian1;
}(egret.DisplayObjectContainer));
__reflect(xianxian1.prototype, "xianxian1");
//# sourceMappingURL=jcbasketBallItem.js.map