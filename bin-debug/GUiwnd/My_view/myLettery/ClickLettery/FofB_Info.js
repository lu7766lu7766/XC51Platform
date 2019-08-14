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
/**投注信息 子类 高度118px */
var FofB_Info = (function (_super) {
    __extends(FofB_Info, _super);
    function FofB_Info() {
        var _this = _super.call(this) || this;
        var bj = new egret.Bitmap();
        _this.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 118;
        RES.getResByUrl("resource/assets/images/ui/bai.png", function (e) { bj.$setBitmapData(e); }, _this);
        var shape1 = new egret.Bitmap();
        _this.addChild(shape1);
        shape1.y = 116;
        shape1.width = GameMain.getInstance.StageWidth;
        shape1.height = 2;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { shape1.$setBitmapData(e); }, _this);
        var shape2 = new egret.Bitmap();
        _this.addChild(shape2);
        shape2.x = 100;
        shape2.width = 2;
        shape2.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { shape2.$setBitmapData(e); }, _this);
        var shape3 = new egret.Bitmap();
        _this.addChild(shape3);
        shape3.x = 374;
        shape3.width = 2;
        shape3.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { shape3.$setBitmapData(e); }, _this);
        var shape4 = new egret.Bitmap();
        _this.addChild(shape4);
        shape4.x = 610;
        shape4.width = 2;
        shape4.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { shape4.$setBitmapData(e); }, _this);
        var team1Shape = new egret.Shape();
        _this.addChild(team1Shape);
        team1Shape.graphics.beginFill(0xCACACA);
        team1Shape.graphics.drawEllipse(168, 28, 24, 24);
        team1Shape.graphics.endFill();
        var team2Shape = new egret.Shape();
        _this.addChild(team2Shape);
        team2Shape.graphics.beginFill(0xCACACA);
        team2Shape.graphics.drawEllipse(168, 66, 24, 24);
        team2Shape.graphics.endFill();
        var team1Text = ToolMrg.getText(172, 33, 16, 0xffffff);
        _this.addChild(team1Text);
        team1Text.text = "主";
        var team2Text = ToolMrg.getText(172, 71, 16, 0xffffff);
        _this.addChild(team2Text);
        team2Text.text = "客";
        _this._dateText = ToolMrg.getText(0, 22, 20, 0x999999, 100);
        _this.addChild(_this._dateText);
        // this._dateText.height = 118;
        _this._dateText.textAlign = egret.HorizontalAlign.CENTER;
        // this._dateText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._dateText.lineSpacing = 18;
        _this._time = ToolMrg.getText(0, 59, 18, 0x999999, 100);
        _this.addChild(_this._time);
        _this._time.textAlign = egret.HorizontalAlign.CENTER;
        _this._time.lineSpacing = 5;
        _this._team1 = ToolMrg.getText(196, 26 + 5, 22, 0x333333);
        _this.addChild(_this._team1);
        _this._team2 = ToolMrg.getText(196, 62 + 5, 22, 0x333333);
        _this.addChild(_this._team2);
        _this._contentText = ToolMrg.getText(375, 0, 22, 0x333333, 236);
        _this.addChild(_this._contentText);
        _this._contentText.height = 118;
        _this._contentText.lineSpacing = 5;
        _this._contentText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._contentText.textAlign = egret.HorizontalAlign.CENTER;
        _this._resultText = ToolMrg.getText(610, 0, 24, 0x333333, 140);
        _this.addChild(_this._resultText);
        _this._resultText.height = 118;
        _this._resultText.lineSpacing = 18;
        _this._resultText.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._resultText.textAlign = egret.HorizontalAlign.CENTER;
        return _this;
    }
    FofB_Info.prototype.aa = function () {
        this._dateText.text = "\u5468\u4E09";
        this._team1.text = "\u7687\u5BB6\u9A6C\u5FB7\u91CC";
        this._team2.text = "\u62DC\u4EC1\u6155\u5C3C\u9ED1";
        var str = "";
        var contentIndex = 0; //>2 break
        var resultIndex = 0; //>2 break
        //字符串拼接 最多显示3条
        // for()
        // this._contentText.text = "1:0(6.28)\n让球客胜(2.22)\n2:0(3.36)";
        // this._resultText.text = "2:3\n半场0:0";
    };
    /**设置day 和两队名字 */
    FofB_Info.prototype.setdayName = function (day, id, teama, teamb, _time) {
        this._dateText.text = ToolMrg.nameMode2(5, day);
        this._team1.text = ToolMrg.nameMode2(8, teama);
        this._team2.text = ToolMrg.nameMode2(8, teamb);
        this._time.text = ToolMrg.getTime5(_time);
    };
    /**设置投注项*/
    FofB_Info.prototype.setAllX = function (list) {
        var len = list.length;
        if (len > 3) {
            len = 3;
        }
        // let str: string = "";
        // for (let i = 0; i < len; i++) {
        //     if (i == len - 1) {
        //         str += list[i];
        //     } else {
        //         str += list[i] + "\n";
        //     }
        // }
        var tt = new Array();
        var text;
        for (var i = 0; i < len; i++) {
            if (i == len - 1) {
                if (list[i][1] == "0")
                    text = { text: "" + list[i][0], style: { "textColor": 0x333333 } };
                else
                    text = { text: "" + list[i][0], style: { "textColor": 0xf72e52 } };
            }
            else {
                if (list[i][1] == "0")
                    text = { text: list[i][0] + "\n", style: { "textColor": 0x333333 } };
                else
                    text = { text: list[i][0] + "\n", style: { "textColor": 0xf72e52 } };
            }
            tt.push(text);
        }
        if (list.length > len) {
            text = { text: "\n......", style: { "textColor": 0x333333 } };
            tt.push(text);
        }
        this._contentText.textFlow = tt;
        // this._contentText.text = str;
    };
    /**设置比分*/
    FofB_Info.prototype.setBf = function (item, type) {
        if (type == 1 || type == 5) {
            this._resultText.text = item[0] + "\n" + "半场" + item[1];
        }
        else if (type == 2 || type == 6) {
            this._resultText.text = item[0];
        }
    };
    FofB_Info.prototype.setBFF = function (str) {
        if (str == undefined || str == 1)
            this._resultText.text = "未开赛";
        else
            this._resultText.text = "进行中";
    };
    FofB_Info.prototype.cleanall = function () {
        this._dateText.text = "";
        this._team1.text = "";
        this._team2.text = "";
        this._contentText.text = "";
        this._resultText.text = "";
        this._time.text = "";
    };
    return FofB_Info;
}(egret.DisplayObjectContainer));
__reflect(FofB_Info.prototype, "FofB_Info");
//# sourceMappingURL=FofB_Info.js.map