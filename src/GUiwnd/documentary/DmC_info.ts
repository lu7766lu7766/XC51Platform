class DmC_info extends egret.DisplayObjectContainer {
    private _tx: egret.Bitmap;
    private _txName: egret.TextField;

    private _time: egret.TextField;
    private _multiple: egret.BitmapText;
    private _multipleText: egret.TextField;
    /** % */
    private _lll: egret.TextField;
    /**红色背景 */
    private _redBox: egret.Bitmap;
    /**近几中几 */
    private _jzText: egret.TextField;
    /**宣言 */
    private _content: egret.TextField;
    /**跟单按钮 */
    private _nowBtn: egret.Bitmap;
    /**自购金额 */
    private _psBuy: egret.TextField;
    /**跟单人数 */
    private _GD_pNum: egret.TextField;
    /**跟投金额 */
    private _GT_aNum: egret.TextField;

    private _item: GHashMap<DmC_infoLink>;

    private _vipContain: egret.DisplayObjectContainer;
    private _vipBtn: egret.Bitmap;
    /**vip */
    private _LvText: egret.TextField;

    /**遮罩图 */
    private _imgBJ: egret.Bitmap;
    private _downLink: egret.Bitmap;

    private _data: DmC_infoData;
    constructor() {
        super();

        this._vipContain = new egret.DisplayObjectContainer();
        this._item = new GHashMap<DmC_infoLink>();

        this._imgBJ = new egret.Bitmap();
        this.addChild(this._imgBJ);
        this._imgBJ.x = 28;
        this._imgBJ.y = 192;
        RES.getResByUrl("resource/assets/images/ui/ssk_expert@2x.png", (e) => { this._imgBJ.$setBitmapData(e); }, this);
        var rect: egret.Rectangle = new egret.Rectangle(0, 30, 0, 10);
        this._imgBJ.scale9Grid = rect;

        this.addChild(this._vipContain);
        this._vipContain.y = 34;

        this._vipBtn = new egret.Bitmap();
        this._vipContain.addChild(this._vipBtn);
        RES.getResByUrl("resource/assets/images/ui/hydj_expert@2x.png", (e) => { this._vipBtn.$setBitmapData(e); }, this);

        this._LvText = ToolMrg.getText(30, 0, 16, 0xffffff);
        this._vipContain.addChild(this._LvText);
        this._LvText.height = 24;
        this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._LvText.text = "Lv 1";
        // this._LvText.bold = true;

        this._redBox = new egret.Bitmap();
        this.addChild(this._redBox);
        this._redBox.x = 128;
        this._redBox.y = 80;
        RES.getResByUrl("resource/assets/images/ui/gdzs_expert@2x.png", (e) => { this._redBox.$setBitmapData(e); }, this);
        var rect: egret.Rectangle = new egret.Rectangle(30, 0, 30, 0);
        this._redBox.scale9Grid = rect;

        this._tx = new egret.Bitmap();
        this.addChild(this._tx);
        this._tx.touchEnabled = false;
        this._tx.width = 80;
        this._tx.height = 80;
        this._tx.x = 28;
        this._tx.y = 32;

        this._txName = ToolMrg.getText(128, 30, 28, 0x333333);
        this.addChild(this._txName);

        this._content = ToolMrg.getText(26, 137, 24, 0x333333);
        this.addChild(this._content);

        this._time = ToolMrg.getText(28, 292, 24, 0x999999);
        this.addChild(this._time);

        this._multiple = FontMgr.getText(FontMgr.FONT_3);
        this.addChild(this._multiple);
        this._multiple.x = 548;
        this._multiple.y = 30;
        this._multiple.width = 158;
        this._multiple.textAlign = egret.HorizontalAlign.RIGHT;
        // this._multiple.textColor = 0xf72e52;
        // this._multiple.size = 48;

        this._lll = ToolMrg.getText(708, 48, 18, 0xf72e52);
        this.addChild(this._lll);
        this._lll.text = "%";

        this._jzText = ToolMrg.getText(138, 80, 20, 0xF72E52);
        this._jzText.height = 30;
        // this._jzText.textAlign = egret.HorizontalAlign.CENTER;
        this._jzText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(this._jzText);

        this._psBuy = ToolMrg.getText(26, 140, 24, 0x333333);
        this.addChild(this._psBuy);

        this._GD_pNum = ToolMrg.getText(334 + 48 - 150, 140, 24, 0x333333, 300);
        this.addChild(this._GD_pNum);
        this._GD_pNum.textAlign = egret.HorizontalAlign.CENTER;

        this._GT_aNum = ToolMrg.getText(202 + 120, 140, 24, 0x333333, 400);
        this.addChild(this._GT_aNum);
        this._GT_aNum.textAlign = egret.HorizontalAlign.RIGHT;

        this._nowBtn = new egret.Bitmap();
        this.addChild(this._nowBtn);
        this._nowBtn.x = 578;
        this._nowBtn.y = 282;
        // RES.getResByUrl("resource/assets/images/ui/ljcd_expert@2x.png",(e)=>{this._nowBtn.$setBitmapData(e); },this);

        this._downLink = new egret.Bitmap();
        this._downLink.height = 10;
        this._downLink.width = GameMain.getInstance.StageWidth;
        this.addChildAt(this._downLink, 0);
        this._downLink.y = 390;
        this._downLink.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { this._downLink.$setBitmapData(e); }, this);

        this._multipleText = ToolMrg.getText(638, 78, 20, 0xF72E52, 104);
        this.addChild(this._multipleText);
        // this._multipleText.textAlign = egret.HorizontalAlign.CENTER;
        this._multipleText.text = "命中率";

        this.setDB();
    }

    public aa(data: DmC_infoData): void {
        this._data = data;
        let imgSrc = "";
        if (data.id == UserData.getInstance.userId || data._status == 1) {
            // this._nowBtn.visible =false;
            imgSrc = "ckfa_expert@2x";
        } else {
            // this._nowBtn.visible = true;
            imgSrc = "ljcd_expert@2x";
        }

        RES.getResByUrl(`resource/assets/images/ui/${imgSrc}.png`, (e) => { this._nowBtn.$setBitmapData(e); }, this);
        if (data.txSrc != undefined && data.txSrc != "") {
            // LoadNetPic.getLoadNetPic.loadPic(data.txSrc,(e)=>{this._tx.$setBitmapData(e); },this);
            RES.getResByUrl(`resource/assets/images/ui/tou${data.txSrc}.png`, (e) => { this._tx.$setBitmapData(e); }, this);
        } else {
            RES.getResByUrl(`resource/assets/images/ui/user1_default.png`, (e) => { this._tx.$setBitmapData(e); }, this);
        }
        this._txName.text = data.txName;
        this._vipContain.x = this._txName.x + this._txName.textWidth + 8;

        this._LvText.text = `Lv ${data.vip}`;
        this._content.text = ToolMrg.nameMode2(53, data.content);
        this._jzText.text = `近7日 ${data.ticke}中${data.z}`;

        this._redBox.width = this._jzText.textWidth + 20;

        this._psBuy.textFlow = <Array<egret.ITextElement>>[
            { text: "自购", style: { "textColor": 0x999999 } },
            { text: ToolMrg.getDecimal(data.money / 100, 2) + "元", style: { "textColor": 0x333333 } }
        ];

        this._GD_pNum.textFlow = <Array<egret.ITextElement>>[
            { text: "跟单", style: { "textColor": 0x999999 } },
            { text: data.num + "人", style: { "textColor": 0x333333 } }
        ];

        this._GT_aNum.textFlow = <Array<egret.ITextElement>>[
            { text: "跟投", style: { "textColor": 0x999999 } },
            { text: ToolMrg.getDecimal(data.GD_money / 100, 2) + "元", style: { "textColor": 0x333333 } }
        ];

        let obj: DmC_infoLink;
        let objheight = 192;
        for (let i of data.teamItem.keys) {
            if (this._item.Gget(i)) {
                obj = this._item.Gget(i);
            } else {
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
        this._time.text = `截止  ${ToolMrg.getTime7(data.time)}`;

        let toF = Number(data.multiple);
        this._multiple.text = toF == 0 ? "0.00" : ToolMrg.getDecimal(toF, 2).toFixed(2);

        // this._lll.x = 654 + this._multiple.textWidth/2;

        this._mShareC.height = objheight + 102;
        this._downLink.y = this._mShareC.height - 10;
    }

    private _isInterception = false;
    public addInterception(): void {
        if (!this._isInterception) {
            this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    }

    public removeInterception(): void {
        if (this._isInterception) {
            this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    }

    private _mShareC: egret.Bitmap;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Bitmap();
        this._mShareC.height = 400;
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { this._mShareC.$setBitmapData(e); }, this);
    }

    private touchDown(e: egret.TouchEvent): void {
        if (WorldWnd.getInstance.parent != undefined) {
            WorldWnd.getInstance.hide();
            WorldWnd._worldState = 1;
        }

        if (e.target == this._mShareC) {
            // if(this._data.id == UserData.getInstance.userId) {
            //     return;
            // }

            DmC_infoMsg.dmdetail = new DmDetails();
            if (this._data.time * 1000 < new Date().getTime())//截止
                DmC_infoMsg.dmdetail.show(this._data.oid, this._data.mold, this._data.id, 1);
            else
                DmC_infoMsg.dmdetail.show(this._data.oid, this._data.mold, this._data.id);
            GD_detail.getInstance.sendHttp(this._data.oid, this._data.model);
        } else if (e.target == this._tx) {
            // DmC_infoMsg.personalHome = new PersonalHome();
            // DmC_infoMsg.personalHome.show();
        }
    }

}

class DmC_infoLink extends egret.DisplayObjectContainer {
    //-----
    /**时间 赛事类型 */
    private _dateText: egret.TextField;
    /** 队伍 */
    private _teamVS: egret.TextField;
    /**分割线 */
    private _btnLink: egret.Shape;
    /**状态 */
    private _typeContent: egret.TextField;
    /**锁 */
    private _lockBtn: egret.Bitmap;
    /**锁描述  保密方案，截止投注后显示详情 */
    private _lockText: egret.TextField;

    constructor() {
        super();

        let link = new egret.Bitmap();
        this.addChild(link);
        link.x = 28;
        // link.y = 192;
        RES.getResByUrl("resource/assets/images/ui/ssk_expert@2x.png", (e) => { link.$setBitmapData(e); }, this);

        this._dateText = ToolMrg.getText(48, 12 + 13, 24, 0x999999);
        this.addChild(this._dateText);

        this._teamVS = ToolMrg.getText(270 + (216 / 2 - 200)+24, 12 + 13, 24, 0x333333, 400);
        this.addChild(this._teamVS);
        this._teamVS.textAlign = egret.HorizontalAlign.CENTER;

        this._btnLink = new egret.Shape();
        this.addChild(this._btnLink);
        this._btnLink.graphics.beginFill(0xA9A9A9);
        this._btnLink.graphics.drawRect(604, 20, 2, 24);
        this._btnLink.graphics.endFill();
        // RES.getResByUrl("resource/assets/images/ui/hui.png",(e)=>{this._btnLink.$setBitmapData(e); },this); 
        // this._btnLink.x = 604;
        // this._btnLink.y = 246;
        // this._btnLink.width = 2;
        // this._btnLink.height = 24;

        this._typeContent = ToolMrg.getText(604, 0, 24, 0x999999, 118);
        this.addChild(this._typeContent);
        this._typeContent.height = 72;
        this._typeContent.textAlign = egret.HorizontalAlign.CENTER;
        this._typeContent.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._typeContent.text = "公开";

        this._lockBtn = new egret.Bitmap();
        this.addChild(this._lockBtn);
        this._lockBtn.y = 20;
        // this._lockBtn.y = 100;
        this._lockBtn.x = 172;
        RES.getResByUrl("resource/assets/images/ui/suo_expert@2x.png", (e) => { this._lockBtn.$setBitmapData(e); }, this);

        this._lockText = ToolMrg.getText(208, 0, 24, 0x999999);
        this.addChild(this._lockText);
        this._lockText.height = 72;
        this._lockText.verticalAlign = egret.VerticalAlign.MIDDLE;
    }

    private _data: DmC_infoData_team;
    public aa(data: DmC_infoData_team, str: string): void {
        this._data = data;

        if (str == "1") {
            this._btnLink.visible = true;
            this._lockBtn.visible = false;
            this._lockText.text = "";

            this._dateText.text = `${data.day} ${data.len_name}`;
            let teamOne: string = ToolMrg.nameMode(7, data.team_a_name);
            let teamTwo: string = ToolMrg.nameMode(7, data.team_b_name);
            this._teamVS.text = `${teamOne} vs ${teamTwo}`;
            this._typeContent.text = "公开";
        } else {
            this._btnLink.visible = true;
            this._lockBtn.visible = false;
            this._lockText.text = "";
            let teamOne: string = ToolMrg.nameMode(7, data.team_a_name);
            let teamTwo: string = ToolMrg.nameMode(7, data.team_b_name);
            this._dateText.text = `${data.day} ${data.len_name}`;
            this._teamVS.text = `${teamOne} vs ${teamTwo}`;
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

    }
}

class DmC_infoMsg {
    private static _mInstance: DmC_infoMsg;
    public static get getInstance(): DmC_infoMsg {
        if (DmC_infoMsg._mInstance == undefined)
            DmC_infoMsg._mInstance = new DmC_infoMsg();
        return DmC_infoMsg._mInstance;
    }
    public item: GHashMap<DmC_infoData>;

    /**方案详情页 */
    public static dmdetail: DmDetails;
    /**方案详情页id */
    public static dmdID;
    /**个人主页 */
    public static personalHome: PersonalHome;
    /**个人主页ID 记录上一个个人主页的id */

    public static phID;

    constructor() {
        this.item = new GHashMap<DmC_infoData>();
    }
}

class DmC_infoData {
    /**单子id */
    public oid: string;
    /**用户id  */
    public id;
    public txSrc: string;
    public txName: string;
    /**类型 */
    public type: string;
    /**宣言 */
    public content: string;
    /**自购金额 */
    public money: number;
    /**时间 */
    public time: number;
    /**预计回报倍数(命中率) */
    public multiple: string;
    /**回报率 */
    public lv: string;
    /**单数 */
    public ticke: string;
    /**mold："竞彩足球 单关" */
    public mold: string;
    /**跟单人数 */
    public num: string;
    /**跟单金额 */
    public GD_money: number;
    /**类型： 0不公开 1:公开 2:截止后公开 3:保密 */
    public _type: string;
    /**赛事 */
    public one: string;
    /**赛事类型： 欧洲杯 */
    public oneType: string;
    /**model 回传类型 1=>足球 2=>篮球 */
    public model: string;
    /**vip等级 */
    public vip: string;
    /**中奖单数 */
    public z: number;
    /**是否已跟单 1已跟单 0跟单 */
    public _status: number;

    public teamItem: GHashMap<DmC_infoData_team>;

    constructor() {
        this.teamItem = new GHashMap<DmC_infoData_team>();
    }
}

class DmC_infoData_team {
    public team_a_name: string;
    public team_b_name: string;
    /**周几 */
    public day: string;
    /**联赛 */
    public len_name: string;
}