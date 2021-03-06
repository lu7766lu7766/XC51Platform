/**我的页面 */
class MyViewWnd extends egret.DisplayObjectContainer {
    private static _mInstance: MyViewWnd;
    public static get getInstance(): MyViewWnd {
        if (MyViewWnd._mInstance == undefined)
            MyViewWnd._mInstance = new MyViewWnd();
        return MyViewWnd._mInstance;
    }
    private _mContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;

    private _centerContain: egret.DisplayObjectContainer;
    private _downContain: egret.DisplayObjectContainer;
    private _downInfo: GHashMap<MyViewInfo>;
    private _downContent = ["个人详细信息", "查看资金流向", "查看跟单记录", "分享赚彩金", "在线问题反馈", "查询开奖信息", "建议反馈"];
    private _downSrc = ["个人信息", "资金明细", "跟单记录", "分享赚钱", "联系客服", "开奖信息", "更多选项"];
    private _downImgsrc = ["zhxx_mine@2x", "yjmx_mine@2x", "gdjl_mine@2x", "laxin_mine@2x", "kefu_mine@2x", "kjxx_mine@2x", "gdxx_mine@2x"];
    private _downItem: GHashMap<MyViewInfo>;

    private _txzz: egret.Shape;
    private _storeImg: egret.Bitmap;
    private _storeName: egret.TextField;
    private _setUp: egret.Bitmap;
    private _News: egret.Bitmap;
    private _tx: egret.Bitmap;
    private _txName: egret.TextField;
    private _money: egret.TextField;

    private _yeText: egret.BitmapText;
    private _yhqText: egret.BitmapText;
    private _fsText: egret.BitmapText;
    // private _hbText: egret.BitmapText;


    /**center 充值 提款 vip等级 发单佣金 */
    private _cenStr = ["充值", "提款", "vip等级", "发单佣金"];
    private _cenSrc = ["cz_mine@2x", "tixian_mine@2x", "levelzx_mine@2x", "yj_mine@2x"];
    private _cenItem: GHashMap<egret.Shape>;

    /**中间从左到右 */
    private _t1: egret.BitmapText;
    private _t2: egret.BitmapText;
    private _t3: egret.BitmapText;
    private _srcItem = ["待开奖", "未中奖", "已中奖"];
    private _item: GHashMap<egret.Shape>;

    /**vip等级 */
    private _LvText: egret.TextField;
    /**用户id */
    private _userIdText: egret.TextField;
    private _LvImg: egret.Bitmap;

    constructor() {
        super();

        this.touchEnabled = true;
        this._mContain = new egret.DisplayObjectContainer();
        this._item = new GHashMap<egret.Shape>();
        this._cenItem = new GHashMap<egret.Shape>();
        this._downItem = new GHashMap<MyViewInfo>();

        let myImgTop = new egret.Bitmap();
        this._mContain.addChild(myImgTop);
        RES.getResByUrl("resource/assets/images/ui/bg_mine@2x.png", (e) => { myImgTop.$setBitmapData(e); }, this);

        this._setUp = new egret.Bitmap();
        this._mContain.addChild(this._setUp);
        this._setUp.x = 666;
        this._setUp.y = 100;
        this._setUp.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/kefu2_mine@2x.png", (e) => {
            this._setUp.$setBitmapData(e);
        }, this);

        // this._News = new egret.Bitmap();
        // this._mContain.addChild(this._News);
        // this._News.x = 666;
        // this._News.y = 28+40;
        // this._News.touchEnabled = true;
        // RES.getResByUrl("resource/assets/images/ui/xiaoxi_mine@2x.png",(e)=>{
        //     this._News.$setBitmapData(e);  
        // },this);

        this._txzz = new egret.Shape();
        this._mContain.addChild(this._txzz);
        this._txzz.graphics.beginFill(0xffffff);
        this._txzz.graphics.drawEllipse(40, 90, 96, 96);
        this._txzz.graphics.endFill();

        this._tx = new egret.Bitmap();
        this._mContain.addChild(this._tx);
        this._tx.width = 88;
        this._tx.height = 88;
        this._tx.x = 44;
        this._tx.y = 94;
        this._tx.touchEnabled = true;
        // RES.getResByUrl("resource/assets/images/ui/user1_default.png", (e) => {
        //     this._tx.$setBitmapData(e);
        // }, this);

        this._txName = ToolMrg.getText(162, 100, 36, 0xffffff);
        this._mContain.addChild(this._txName);
        this._txName.touchEnabled = true;

        // let lvShape = new egret.Shape();
        // this._mContain.addChild(lvShape);
        // lvShape.graphics.beginFill(0xffffff);
        // lvShape.graphics.drawRoundRect(162, 154, 74, 24, 30);
        // lvShape.graphics.endFill();

        this._LvImg = new egret.Bitmap();
        this._mContain.addChild(this._LvImg);
        this._LvImg.y = 155;
        this._LvImg.x = 162;
        RES.getResByUrl("resource/assets/images/ui/level_mine@2x.png", (e) => { this._LvImg.$setBitmapData(e); }, this);

        this._LvText = ToolMrg.getText(190, 155, 18, 0xFF8D33);
        this._mContain.addChild(this._LvText);
        this._LvText.text = "Lv 0";
        this._LvText.height = 24;
        this._LvText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._userIdText = ToolMrg.getText(250, 158, 18, 0xffffff);
        this._mContain.addChild(this._userIdText);

        let yeText = ToolMrg.getText(0, 268, 20, 0xffffff,250);
        this._mContain.addChild(yeText);
        yeText.textAlign = egret.HorizontalAlign.CENTER;
        yeText.text = "余额";

        let yhqText = ToolMrg.getText(250, 268, 20, 0xffffff,250);
        this._mContain.addChild(yhqText);
        yhqText.textAlign = egret.HorizontalAlign.CENTER;
        yhqText.text = "发单佣金";

        let fsText = ToolMrg.getText(250 * 2, 268, 20, 0xffffff,250);
        this._mContain.addChild(fsText);
        fsText.textAlign = egret.HorizontalAlign.CENTER;
        fsText.text = "代理佣金";

        // let hbText = ToolMrg.getText(187.5 * 3, 268, 20, 0xffffff, 187.5);
        // this._mContain.addChild(hbText);
        // hbText.textAlign = egret.HorizontalAlign.CENTER;
        // hbText.text = "代理佣金";

        this._yeText = FontMgr.getText(FontMgr.FONT_2);
        this._mContain.addChild(this._yeText);
        this._yeText.y = 218;
        this._yeText.x = 0;
        this._yeText.width =250;
        this._yeText.textAlign = egret.HorizontalAlign.CENTER;

        this._yhqText = FontMgr.getText(FontMgr.FONT_2);
        this._mContain.addChild(this._yhqText);
        this._yhqText.y = 218;
        this._yhqText.x =250;
        this._yhqText.width =250;
        this._yhqText.textAlign = egret.HorizontalAlign.CENTER;

        this._fsText = FontMgr.getText(FontMgr.FONT_2);
        this._mContain.addChild(this._fsText);
        this._fsText.y = 218;
        this._fsText.x =250 * 2;
        this._fsText.width =250;
        this._fsText.textAlign = egret.HorizontalAlign.CENTER;

        // this._hbText = FontMgr.getText(FontMgr.FONT_2);
        // this._mContain.addChild(this._hbText);
        // this._hbText.y = 218;
        // this._hbText.x = 187.5 * 3;
        // this._hbText.width = 187.5;
        // this._hbText.textAlign = egret.HorizontalAlign.CENTER;

        this.addCenter();
        this.addDown();
        this.addScoll();

        this.setDB();
    }

    /**刷新金额数据 */
    private freshData(): void {
        // this._money.text = "余额："+(UserData.getInstance.getGold()/100)+"元";
        this._yeText.text = `${UserData.getInstance.getGold()}`;
        this._yhqText.text = `${UserData.getInstance.getYJGold()}`;
        this._fsText.text = `${UserData.getInstance.getDLGold()}`;
        // this._hbText.text = `${UserData.getInstance.getDLGold()}`;
        if (UserData.getInstance.isLogin() == false) {
            this._userIdText.text = "";
            RES.getResByUrl("resource/assets/images/ui/user1_default.png", (e) => { this._tx.$setBitmapData(e); }, this);
        } else {
            this.setHeadIcon();
            this._userIdText.text = "id:" + UserData.getInstance.userId;
        }
        this._txName.text = UserData.getInstance.userName;
        this._LvText.text = `vip ${UserData.getInstance.getLv()}`;//vip等级
    }

    /**票 */
    private _myTicket: egret.Shape;
    private addCenter(): void {
        this._centerContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 320;

        let centerShape1 = new egret.Shape();
        this._centerContain.addChild(centerShape1);
        centerShape1.graphics.beginFill(0xffffff);
        centerShape1.graphics.drawRoundRect(28, 0, 696, 140, 30);
        centerShape1.graphics.endFill();

        let centerShape2 = new egret.Shape();
        this._centerContain.addChild(centerShape2);
        centerShape2.graphics.beginFill(0xffffff);
        centerShape2.graphics.drawRoundRect(28, 166, 696, 230, 30);
        centerShape2.graphics.endFill();

        let num = 696 / 4;
        for (let i = 0; i < this._cenStr.length; i++) {
            let objShape = new egret.Shape();
            objShape.graphics.beginFill(0xffffff, 0.01);
            objShape.graphics.drawRect(28 + i * num, 0, num, 140);
            objShape.graphics.endFill();

            this._centerContain.addChild(objShape);
            this._cenItem.Gput(i, objShape);
            objShape.touchEnabled = true;

            let objImg = new egret.Bitmap();
            this._centerContain.addChild(objImg);
            objImg.x = 28 + i * num + (num - 44) * 0.5;
            objImg.y = 30;
            RES.getResByUrl(`resource/assets/images/ui/${this._cenSrc[i]}.png`, (e) => { objImg.$setBitmapData(e); }, this);

            let objText = ToolMrg.getText(28 + i * num, 87, 24, 0x333333, num);
            this._centerContain.addChild(objText);
            objText.textAlign = egret.HorizontalAlign.CENTER;
            objText.text = this._cenStr[i];
        }

        this._myTicket = new egret.Shape();
        this._centerContain.addChild(this._myTicket);
        this._myTicket.graphics.beginFill(0xffffff, 0.01);
        this._myTicket.graphics.drawRect(28, 166, 696, 100);
        this._myTicket.graphics.endFill();
        this._myTicket.touchEnabled = true;

        let ticketImg = new egret.Bitmap();
        this._centerContain.addChild(ticketImg);
        ticketImg.x = 68;
        RES.getResByUrl("resource/assets/images/ui/caip_mine@2x.png", (e) => {
            ticketImg.$setBitmapData(e);
            ticketImg.y = 166 + (100 - ticketImg.height) * 0.5;
        }, this);

        let ticketText = ToolMrg.getText(132, 166, 32, 0x333333);
        this._centerContain.addChild(ticketText);
        ticketText.height = 100;
        ticketText.verticalAlign = egret.VerticalAlign.MIDDLE;
        ticketText.text = "我的彩票";

        let allText = ToolMrg.getText(622, 166, 24, 0x999999);
        this._centerContain.addChild(allText);
        allText.height = 100;
        allText.verticalAlign = egret.VerticalAlign.MIDDLE;
        allText.text = "全部";

        let allImg = new egret.Bitmap();
        this._centerContain.addChild(allImg);
        allImg.x = 680;
        RES.getResByUrl("resource/assets/images/ui/xq1_nav@2x.png", (e) => {
            allImg.$setBitmapData(e);
            allImg.y = 166 + (100 - allImg.height) * 0.5;
        }, this);

        let shape1 = new egret.Shape();
        this._centerContain.addChild(shape1);
        shape1.graphics.beginFill(0xdedede);
        shape1.graphics.drawRect(68, 166 + 100, 624, 2);
        shape1.graphics.endFill();

        for (let i = 0; i < this._srcItem.length; i++) {
            let shape = new egret.Shape();
            shape.graphics.beginFill(0xffffff, 0.01);
            shape.graphics.drawRect(28 + i * 232, 124 + 166 + 10, 250, 128);
            shape.graphics.endFill();
            shape.touchEnabled = true;
            this._centerContain.addChild(shape);
            this._item.Gput(i, shape);

            let text = ToolMrg.getText(28 + i * 232, 172 + 166 + 10, 24, 0x292929, 232);
            text.textAlign = egret.HorizontalAlign.CENTER;
            this._centerContain.addChild(text);
            text.text = this._srcItem[i];
        }

        this._t1 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t1);
        this._t1.y = 300;
        this._t1.x = 28;
        this._t1.width = 232;
        this._t1.textAlign = egret.HorizontalAlign.CENTER;

        this._t2 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t2);
        this._t2.y = 300;
        this._t2.x = 28 + 232;
        this._t2.width = 232;
        this._t2.textAlign = egret.HorizontalAlign.CENTER;

        this._t3 = FontMgr.getText(FontMgr.FONT_1);
        this._centerContain.addChild(this._t3);
        this._t3.y = 300;
        this._t3.x = 28 + 232 * 2;
        this._t3.width = 232;
        this._t3.textAlign = egret.HorizontalAlign.CENTER;

    }

    private freshJJData(): void {
        this._t1.text = "" + MyLotteryDataMrg.getInstance.getDKJDataList().length;
        this._t2.text = "" + MyLotteryDataMrg.getInstance.getYKJDataList().length;
        this._t3.text = "" + MyLotteryDataMrg.getInstance.getYZJDataList().length;
    }

    private touchDown(e: egret.TouchEvent): void {
        if (e.target == this._myTicket) {//我的注单
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(0);
        } else if (e.target == this._item.Gget(0)) {//待出票
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(1);
        } else if (e.target == this._item.Gget(1)) {//待开奖
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(2);
        } else if (e.target == this._item.Gget(2)) {//已中奖
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                MyLotteryWnd.getInstance.show(3);
        } else if (e.target == this._tx || e.target == this._txName) {//个人信息
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                PSWnd.getInstance.show();
        }
        else if (e.target == this._setUp) {//客服
            // SetUpWnd.getInstance.show();
            // KeFuWnd.getInstance.show();
            // if(window["go2Url"]) {
            //     window["go2Url"](GameValue.kfUrl);
            // }
            CallApp.openUrl(GameValue.kfUrl);
        }
        else if (e.target == this._cenItem.Gget(0)) {//充值
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                RechargeWnd.getInstance.show();
        } else if (e.target == this._cenItem.Gget(1)) {//提款
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else if (UserData.getInstance.getused() == 0)
                realnameTest.getInstance.show();
            else
                withdrawData.getInstance.show();
        } else if (e.target == this._cenItem.Gget(2)) {//vip等级
            LvWnd.getInstance.show();
        } else if (e.target == this._cenItem.Gget(3)) {//发单佣金
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                // CapitalWnd.getInstance.show(4);
                SCWnd.getInstance.show();
        }
    }

    public addInterception(): void {
        this._myTicket.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._setUp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txName.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (let key of this._item.keys) {
            this._item.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        for (let key of this._downItem.keys) {
            this._downItem.Gget(key).addInterception();
        }
        for (let key of this._cenItem.keys) {
            this._cenItem.Gget(key).addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    }

    public removeInterception(): void {
        this._myTicket.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._tx.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._setUp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._txName.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (let key of this._item.keys) {
            this._item.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
        for (let key of this._downItem.keys) {
            this._downItem.Gget(key).removeInterception();
        }
        for (let key of this._cenItem.keys) {
            this._cenItem.Gget(key).removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        }
    }

    private addDown(): void {
        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._downContain);
        this._downContain.y = 360 + 378;

        let downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xffffff);
        downShape.graphics.drawRoundRect(28, 0, 696, 592, 30);
        downShape.graphics.endFill();

        let downLink1 = new egret.Shape();
        this._downContain.addChild(downLink1);
        downLink1.graphics.beginFill(0xdedede);
        downLink1.graphics.drawRect(376, 0, 2, 592);
        downLink1.graphics.endFill();

        let downLink2 = new egret.Shape();
        this._downContain.addChild(downLink2);
        downLink2.graphics.beginFill(0xdedede);
        downLink2.graphics.drawRect(28, 148, 696, 2);
        downLink2.graphics.endFill();

        let downLink3 = new egret.Shape();
        this._downContain.addChild(downLink3);
        downLink3.graphics.beginFill(0xdedede);
        downLink3.graphics.drawRect(28, 298, 696, 2);
        downLink3.graphics.endFill();

        let downLink4 = new egret.Shape();
        this._downContain.addChild(downLink4);
        downLink4.graphics.beginFill(0xdedede);
        downLink4.graphics.drawRect(28, 448, 696, 2);
        downLink4.graphics.endFill();

        let objNum = 0;
        let objHeight = 0;
        for (let i = 0; i < this._downSrc.length; i++) {
            let obj = new MyViewInfo(this._downImgsrc[i], this._downSrc[i], this._downContent[i], i);
            obj.x = 28 + objNum * 348;
            obj.y = objHeight;
            this._downContain.addChild(obj);
            this._downItem.Gput(i, obj);
            if (objNum == 1) {
                objNum = 0;
                objHeight = objHeight + 150;
            } else {
                objNum += 1;
            }
        }

        let downZZ = new egret.Shape();
        this._downContain.addChildAt(downZZ, 0);
        downZZ.graphics.beginFill(0xF5F5F7);
        downZZ.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, this._downContain.height + 54);
        downZZ.graphics.endFill();
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }

        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_GoldFresh, this.freshData, this);
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_orderList, this.freshJJData, this);
    }

    public show(): void {
        GUIManager.getInstance.bgLay.addChild(this);
        this.addInterception();
        this.freshData();
        this.freshJJData();

        if (UserData.getInstance.isLogin() == true) {
            Order_List.getInstance.sendHttp();
            UserInfoPhp.getInstance.sendHttp();
        }
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_GoldFresh, this.freshData, this);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_orderList, this.freshJJData, this);
    }

    /**刷新数据*/
    public refreshallInfo(): void {
        this.addInterception();
        this.freshData();
        this.freshJJData();
    }

    /**设置头像*/
    public setHeadIcon() {
        RES.getResByUrl("resource/assets/images/ui/tou" + selectHeadIconData.userIconID + ".png", this.headIcon, this, RES.ResourceItem.TYPE_IMAGE);
    }

    private headIcon(data: any, url: string): void {
        if (data != undefined && this._tx != undefined) {
            this._tx.$setBitmapData(data);
        }
    }

    private addScoll(): void {

        this._scroView = new egret.ScrollView();
        this._scroView.x = 0;
        this._scroView.y = GameValue.adaptationScreen - 40;
        this._scroView.scrollSpeed = 0.4;
        //设置滚动内容
        this._scroView.setContent(this._mContain);
        this._scroView.bounces = false;
        this._scroView.verticalScrollPolicy = 'on';
        this._scroView.horizontalScrollPolicy = 'off';
        //设置滚动区域宽高
        this._scroView.width = GameMain.getInstance.StageWidth;
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
        this.addChild(this._scroView);
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}

class MyViewInfo extends egret.DisplayObjectContainer {
    private _id;
    private _img: egret.Bitmap;
    private _text: egret.TextField;
    private _content: egret.TextField;

    constructor(imgSrc, text, content, id) {
        super();
        this._id = id;
        this.touchEnabled = true;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.x = 40;
        RES.getResByUrl(`resource/assets/images/ui/${imgSrc}.png`, (e) => {
            this._img.$setBitmapData(e);
            this._img.y = (150 - this._img.height) * 0.5;
        }, this);

        this._text = ToolMrg.getText(112, 42, 28, 0x333333);
        this.addChild(this._text);
        this._text.text = text

        this._content = ToolMrg.getText(112, 87, 22, 0x999999);
        this.addChild(this._content);
        this._content.text = content

        this.setDB();
    }

    private touchDown(e: egret.TouchEvent): void {
        if (this._id == 0) {//账户信息
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                PSWnd.getInstance.show();
        } else if (this._id == 1) {//资金明细
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                CapitalWnd.getInstance.show();
        } else if (this._id == 2) {//跟单记录
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                GDRecordWnd.getInstance.show();
        } else if (this._id == 3) {//分享
            if (UserData.getInstance.isLogin() == false)
                LoginWnd.getInstance.show();
            else
                ShareWnd.getInstance.show();
        } else if (this._id == 4) {//联系客服
            // KeFuWnd.getInstance.show();
            // if(window["go2Url"]) {
            //     window["go2Url"](GameValue.kfUrl);
            // }
            CallApp.openUrl(GameValue.kfUrl);
        } else if (this._id == 5) {//开奖信息
            AwareInfoMgr.getInstance.show();
            OpenAwareConfin.getInstance.sendHttp();
        } else if (this._id == 6) {//更多信息
            SetUpWnd.getInstance.show(); 
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 0.01);
        this._mShareC.graphics.drawRect(0, 0, 348, 150);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }

    public addInterception(): void {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }

    public removeInterception(): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
    }
}