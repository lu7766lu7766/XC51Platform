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
/**方案详情 */
var DD_Detail = (function (_super) {
    __extends(DD_Detail, _super);
    function DD_Detail() {
        var _this = _super.call(this) || this;
        _this.hide();
        _this._item = new GHashMap();
        var text1 = ToolMrg.getText(160, 12, 24, 0x999999);
        _this.addChild(text1);
        text1.height = 40;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.text = "场次";
        var text2 = ToolMrg.getText(448, 12, 24, 0x999999);
        _this.addChild(text2);
        text2.height = 40;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.text = "投注项";
        var text3 = ToolMrg.getText(656, 12, 24, 0x999999);
        _this.addChild(text3);
        text3.height = 40;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.text = "赛果";
        var link = new egret.Shape();
        _this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0, 62.5, 750, 1.5);
        link.graphics.endFill();
        _this._shape = new egret.Shape();
        _this.addChild(_this._shape);
        _this._shape.graphics.beginFill(0xffffff);
        _this._shape.graphics.drawRect(0, 0, 750, 90);
        _this._shape.graphics.endFill();
        //
        _this._text = ToolMrg.getText(28, 26, 22, 0x999999);
        _this.addChild(_this._text);
        _this._text.lineSpacing = 18;
        _this._text.text = "注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅\n供参考，实际奖金以投注成功为准。";
        _this.setDB();
        return _this;
    }
    DD_Detail.prototype.updata = function (data) {
        if (data == undefined)
            data = new GD_DetailData();
        var item = data.GD_detailItem;
        var objHeight = 64;
        for (var _i = 0, _a = item.keys; _i < _a.length; _i++) {
            var key = _a[_i];
            var obj = void 0;
            if (this._item.GhasKey(key)) {
                obj = this._item.Gget(key);
            }
            else {
                obj = new DetailInfo();
                this._item.Gput(key, obj);
            }
            obj.aa(item.Gget(key), data.k, data.model, data.id);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if (obj.parent == undefined)
                this.addChild(obj);
        }
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0, objHeight, 750, 90);
        this._shape.graphics.endFill();
        this._text.y = objHeight + 24;
        // let str = "";
        // if(data._type==1){
        //     str = "单关";
        // }else{
        //     str = `${data._type}串1`;
        // }
        // this._text.text = `过关方式：${str}`;
        ToolMrg.upItemofGHashMap(this._item, item);
    };
    DD_Detail.prototype.show = function (data) {
        this.visible = true;
        this.updata(data);
    };
    DD_Detail.prototype.hide = function () {
        this.visible = false;
    };
    DD_Detail.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 300);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return DD_Detail;
}(egret.DisplayObjectContainer));
__reflect(DD_Detail.prototype, "DD_Detail");
var DetailInfo = (function (_super) {
    __extends(DetailInfo, _super);
    function DetailInfo() {
        var _this = _super.call(this) || this;
        _this._time = ToolMrg.getText(28, 45, 18, 0x333333);
        _this.addChild(_this._time);
        _this._time.height = 40;
        _this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._time.lineSpacing = 5;
        _this._type = ToolMrg.getText(28, 8, 20, 0x333333);
        _this.addChild(_this._type);
        _this._type.height = 40;
        _this._type.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._team1 = ToolMrg.getText(170, 16, 22, 0x333333);
        _this.addChild(_this._team1);
        _this._team1.height = 32;
        _this._team1.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._team2 = ToolMrg.getText(170, 52, 22, 0x333333);
        _this.addChild(_this._team2);
        _this._team2.height = 32;
        _this._team2.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._content1 = ToolMrg.getText(360, 0, 20, 0x333333, 250);
        _this.addChild(_this._content1);
        _this._content1.height = 100;
        _this._content1.lineSpacing = 4;
        _this._content1.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._content1.textAlign = egret.HorizontalAlign.CENTER;
        _this._content2 = ToolMrg.getText(610, 0, 22, 0x333333, 140);
        _this.addChild(_this._content2);
        _this._content2.height = 100;
        _this._content2.lineSpacing = 8;
        _this._content2.verticalAlign = egret.VerticalAlign.MIDDLE;
        _this._content2.textAlign = egret.HorizontalAlign.CENTER;
        var zShape = new egret.Shape();
        _this.addChild(zShape);
        zShape.graphics.beginFill(0xcacaca);
        zShape.graphics.drawEllipse(142, 20, 24, 24);
        zShape.graphics.endFill();
        var kShape = new egret.Shape();
        _this.addChild(kShape);
        kShape.graphics.beginFill(0xcacaca);
        kShape.graphics.drawEllipse(142, 56, 24, 24);
        kShape.graphics.endFill();
        var zText = ToolMrg.getText(142, 20, 16, 0xffffff, 24);
        _this.addChild(zText);
        zText.height = 24;
        zText.textAlign = egret.HorizontalAlign.CENTER;
        zText.verticalAlign = egret.VerticalAlign.MIDDLE;
        zText.text = "主";
        var kText = ToolMrg.getText(142, 56, 16, 0xffffff, 24);
        _this.addChild(kText);
        kText.height = 24;
        kText.textAlign = egret.HorizontalAlign.CENTER;
        kText.verticalAlign = egret.VerticalAlign.MIDDLE;
        kText.text = "客";
        var shape1 = new egret.Shape();
        _this.addChild(shape1);
        shape1.graphics.beginFill(0xdedede);
        shape1.graphics.drawRect(0, 99, 750, 1.5);
        shape1.graphics.endFill();
        var shape2 = new egret.Shape();
        _this.addChild(shape2);
        shape2.graphics.beginFill(0xdedede);
        shape2.graphics.drawRect(360, 0, 1.5, 101);
        shape2.graphics.endFill();
        var shape3 = new egret.Shape();
        _this.addChild(shape3);
        shape3.graphics.beginFill(0xdedede);
        shape3.graphics.drawRect(610, 0, 1.5, 101);
        shape3.graphics.endFill();
        _this.setDB();
        return _this;
    }
    /**对象 是否公开 是否保密 发单人id */
    DetailInfo.prototype.aa = function (data, num, ofnum, id) {
        this._data = data;
        this._time.text = "" + ToolMrg.getTime5(data._time);
        this._type.text = "" + data.len_name;
        this._team1.text = "" + data.team_a_name;
        this._team2.text = "" + data.team_b_name;
        if (id == UserData.getInstance.userId) {
            var contentStr = "";
            var contentIndex = 0;
            for (var i = 0; i < data.want.length; i++) {
                if (i > 2)
                    break;
                contentStr = contentStr + data.want[i] + "\n";
                contentIndex += 1;
            }
            if (contentIndex > 2) {
                contentStr = contentStr + "...";
            }
            else {
                contentStr = contentStr.substring(0, contentStr.length - 1);
            }
            this._content1.text = "" + contentStr;
        }
        else {
            if (ofnum == 1) {
                var contentStr = "";
                var contentIndex = 0;
                for (var i = 0; i < data.want.length; i++) {
                    if (i > 2)
                        break;
                    contentStr = contentStr + data.want[i] + "\n";
                    contentIndex += 1;
                }
                if (contentIndex > 2) {
                    contentStr = contentStr + "...";
                }
                else {
                    contentStr = contentStr.substring(0, contentStr.length - 1);
                }
                this._content1.text = "" + contentStr;
            }
            else {
                if (ofnum == 2) {
                    this._content1.text = "\u4FDD\u5BC6";
                    // this._content2.text = "保密";
                }
                else {
                    this._content1.text = "\u4FDD\u5BC6";
                    // this._content2.text = "保密";
                }
            }
        }
        //赛果
        if (data._static == 1 || data._static == 2) {
            if (data._static == 1)
                this._content2.text = "未开赛";
            else
                this._content2.text = "进行中";
        }
        else {
            var resultStr = "";
            var resultIndex = 0;
            for (var i = 0; i < data.result.length; i++) {
                if (i > 2)
                    break;
                resultStr = resultStr + data.result[i] + "\n";
                resultIndex += 1;
            }
            if (resultIndex > 2) {
                resultStr = resultStr + "...";
            }
            else {
                resultStr = resultStr.substring(0, resultStr.length - 2);
            }
            this._content2.text = resultStr;
        }
    };
    /**适配处理 */
    DetailInfo.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 101);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return DetailInfo;
}(egret.DisplayObjectContainer));
__reflect(DetailInfo.prototype, "DetailInfo");
//# sourceMappingURL=DD_Detail.js.map