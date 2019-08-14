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
var ID1 = (function (_super) {
    __extends(ID1, _super);
    function ID1() {
        var _this = _super.call(this) || this;
        _this.imgItem = [];
        _this._topUI = new TopUI("活动详情");
        _this.addChild(_this._topUI);
        _this._return = _this._topUI.getReturn();
        _this._mContain = new egret.DisplayObjectContainer();
        _this.addScoll();
        // let btn2 = new egret.Bitmap();
        // this._mContain.addChild(btn2);
        // btn2.y = 585;
        // RES.getResByUrl(`resource/assets/images/ui/jqs2_find@2x.png`,(e)=>{btn2.$setBitmapData(e); },this);
        // let btn3 = new egret.Bitmap();
        // this._mContain.addChild(btn3);
        // btn3.y = 642+456;
        // RES.getResByUrl(`resource/assets/images/ui/ybs3_find.png`,(e)=>{btn3.$setBitmapData(e); },this);
        _this.init();
        _this.setDB();
        return _this;
    }
    Object.defineProperty(ID1, "getInstance", {
        get: function () {
            if (ID1._mInstance == undefined)
                ID1._mInstance = new ID1();
            return ID1._mInstance;
        },
        enumerable: true,
        configurable: true
    });
    ID1.prototype.init = function () {
        var btn1 = new egret.Bitmap();
        this._mContain.addChild(btn1);
        RES.getResByUrl("resource/assets/images/ui/jqs1_find@2x.png", function (e) { btn1.$setBitmapData(e); }, this);
        var text = ToolMrg.getText(44, 410, 24, 0x333333);
        this._mContain.addChild(text);
        text.lineSpacing = 15;
        // text.text = "活动对象：51彩站首存会员\n活动开始时间：2019-06-11 11:00:00开始\n活动结束时间：2022-06-30 00:00:00\n\n\n"
        // +"申请方式：\n\n竞彩足球与竞彩篮球2串1或以上的串关，茶馆赔率在1.75以上\n的单注盈利上加奖10%，加奖奖金不封顶无上限，符合要求的\n"
        // +"单注系统自动派奖无需申请。\n例如：A队对战B队，C队对战D队，选择A让胜串C让负，赔率\n为5.8，下注金额为100元，赢得580元，另外加奖"
        // +"10%为58元，\n最终实际赢得638元彩金，计算公式为：\n (100*5.8)+(100*5.8*10%)=638元彩金。\n\n\n活动细则：\n\n1.本活动适用于51彩站全体会员。\n\n2.本活动奖励与【返水优惠】共享"
        // +"，不与其他任何优惠共享。\n\n3.若发现有套利客户，对赌或不诚实获取盈利之行为，将取\n消其优惠资格。"
        // +"\n\n4."
        // +"此活动遵循51彩站一般规则和条款。";
        text.textFlow = [
            { "text": "活动对象：51彩站首存会员\n活动开始时间：2019-06-11 11:00:00开始\n活动结束时间：2022-06-30 00:00:00\n\n\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "申请方式：", style: { "textColor": 0x333333, size: 24, bold: true } },
            { "text": "\n\n竞彩足球与竞彩篮球2串1或以上的串关，串关赔率在1.75以上\n的单注盈利上加奖10%，加奖奖金不封顶无上限，符合要求的\n"
                    + "单注系统自动派奖无需申请。\n例如：A队对战B队，C队对战D队，选择A让胜串C让负，赔率\n为5.8，下注金额为100元，赢得580元，另外加奖"
                    + "10%为58元，\n最终实际赢得638元彩金，计算公式为：\n (100*5.8)+(100*5.8*10%)=638元彩金。\n\n\n", style: { "textColor": 0x333333, size: 24 } },
            { "text": "活动细则：", style: { "textColor": 0x333333, size: 24, bold: true } },
            { "text": "\n\n1.本活动适用于51彩站全体会员。\n\n2.每位有效玩家"
                    + "，均可享受每次盈利自动派发的加奖福利。\n\n3.若发现有套利客户，对赌或不诚实获取盈利之行为，将取\n消其优惠资格。"
                    + "\n\n4."
                    + "此活动遵循51彩站一般规则和条款。", style: { "textColor": 0x333333, size: 24 } },
        ];
        var bj = new egret.Bitmap();
        this._mContain.addChild(bj);
        bj.y = text.y + text.textHeight;
        bj.height = 50;
        bj.width = GameMain.getInstance.StageWidth;
        RES.getResByUrl("resource/assets/images/ui/hui.png", function (e) { bj.$setBitmapData(e); }, this);
    };
    ID1.prototype.touchDown = function (e) {
        if (e.target == this._return) {
            this.hide();
        }
    };
    ID1.prototype.show = function () {
        GUIManager.getInstance.tipLay.addChild(this);
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    };
    ID1.prototype.hide = function () {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._scroView.setScrollTop(0);
            if (WorldWnd._worldState == 1) {
                WorldWnd.getInstance.show();
            }
        }
    };
    ID1.prototype.addScoll = function () {
        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = 96 + GameValue.adaptationScreen;
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
    /**适配处理 */
    ID1.prototype.setDB = function () {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xFEF9F9, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    };
    return ID1;
}(egret.DisplayObjectContainer));
__reflect(ID1.prototype, "ID1");
//# sourceMappingURL=ID1.js.map