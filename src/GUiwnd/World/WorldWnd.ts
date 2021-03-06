class WorldWnd extends egret.DisplayObjectContainer {
    private static _mInstance: WorldWnd;
    public static get getInstance(): WorldWnd {
        if (WorldWnd._mInstance == undefined)
            WorldWnd._mInstance = new WorldWnd();
        return WorldWnd._mInstance;
    }

    private _imgSrc = ["jzcg_home@2x", "jzdg_home@2x", "jlcg_home@2x", "jldg_home@2x", "cjzc_home@2x", "cjjl_home@2x", "pl3_home@2x", "pl5_home@2x"];
    private _imgTitle = ["竞足串关", "竞足单关", "竞篮串关", "竞篮单关", "超级足彩", "超级篮彩", "排列三", "排列五"];
    private _imgContent = ["足球赛事竞彩", "赛事多，返奖高", "篮球赛事竞彩", "投注简单，返奖高", "热门赛事，奖金多", "竞彩篮球联赛", "轻松赢千元大奖", "最高奖金10万元"];
    private _mContain: egret.DisplayObjectContainer;
    private _scroView: egret.ScrollView;
    private _tip: WorldTip;

    private _moreText: egret.TextField;

    private _item: GHashMap<DmC_info>;

    /**开奖 */
    // private _kjBtn: egret.Bitmap;
    // /**联系客服 */
    // private _kfBtn: egret.Bitmap;

    private _imgItem: GHashMap<WorldActivity>;
    private _imgContain: egret.DisplayObjectContainer;
    private _centerContain: egret.DisplayObjectContainer;
    private _downContain: egret.DisplayObjectContainer;

    private _topContain: egret.DisplayObjectContainer;
    private _banner: egret.Bitmap;
    /**状态 0：关闭其他页面不打开首页 1关闭其他二级页面打开首页  show时赋值0 */
    public static _worldState = 0;

    constructor() {
        super();

        this.y = GameValue.adaptationScreen;
        this._imgItem = new GHashMap<WorldActivity>();
        this._mContain = new egret.DisplayObjectContainer();
        this._imgContain = new egret.DisplayObjectContainer();
        this._centerContain = new egret.DisplayObjectContainer();
        this._downContain = new egret.DisplayObjectContainer();
        this._topContain = new egret.DisplayObjectContainer();

        let topShape = new egret.Bitmap();
        this._topContain.addChild(topShape);
        topShape.y = -this.y;
        RES.getResByUrl("resource/assets/images/ui/bg2_nav@2x.png", (e) => {
            topShape.$setBitmapData(e);
        }, this);
        topShape.height = 96 + this.y;


        this._item = new GHashMap<DmC_info>();

        // this._kjBtn = new egret.Bitmap();
        // this._topContain.addChild(this._kjBtn);
        // this._kjBtn.x = 28;
        // this._kjBtn.y = 28;
        // RES.getResByUrl("resource/assets/images/ui/kjxx_nav@2x.png", (e) => {
        //     this._kjBtn.$setBitmapData(e);
        // }, this);
        // this._kjBtn.touchEnabled = true;

        // this._kfBtn = new egret.Bitmap();
        // this._topContain.addChild(this._kfBtn);
        // this._kfBtn.x = 678;
        // this._kfBtn.y = 28;
        // RES.getResByUrl("resource/assets/images/ui/kefu_nav@2x.png", (e) => {
        //     this._kfBtn.$setBitmapData(e);
        // }, this);
        // this._kfBtn.touchEnabled = true;

        let titleImg = new egret.Bitmap();
        this._topContain.addChild(titleImg);
        titleImg.y = 34;
        RES.getResByUrl("resource/assets/images/ui/51cd_home@2x.png", (e) => {
            titleImg.$setBitmapData(e);
            titleImg.x = (750 - titleImg.width) * 0.5;
        }, this);

        // this.imgBox = WorldTopImg.getInstance;
        // this._imgContain.addChild(this.imgBox);
        this._imgContain.addChild(ImgRace.getInstance);

        this._tip = WorldTip.getInstance;
        this._centerContain.addChild(this._tip);
        this._tip.y = 32;
        this._tip.x = 76;

        let tipImg = new egret.Bitmap();
        this._centerContain.addChild(tipImg);
        tipImg.x = 30;
        tipImg.y = 30;
        RES.getResByUrl(`resource/assets/images/ui/tz_home@2x.png`, (e) => {
            tipImg.$setBitmapData(e);
        }, this);

        let wlink1 = new egret.Shape();
        this._centerContain.addChild(wlink1);
        wlink1.graphics.beginFill(0xf3f3f3);
        wlink1.graphics.drawRect(0, 80, 750, 10);
        wlink1.graphics.endFill();

        this.addScoll();

        this.addChild(this._imgContain);

        this._imgContain.y = 0;
        this._mContain.y = -96;
        this._mContain.addChild(this._centerContain);
        this._centerContain.y = 300 + 96;

        this._mContain.addChild(this._downContain);
        this.addActivity();
        this.joinDown();

        // this.addChild(this._topContain);
        this.setDB();
    }

    /**动态图 */
    private _dtBg: egret.Bitmap;
    private _dtDong: egret.Bitmap;
    private _dtWZ: egret.Bitmap;
    private head_mask1: egret.Shape;

    /**动态图 */
    private _dtBg1: egret.Bitmap;
    private _dtDong1: egret.Bitmap;
    private _dtWZ1: egret.Bitmap;
    private head_mask11: egret.Shape;

    private dtt(): void {
        // if (this._dtBg == undefined) {
        //     this._dtBg = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/diceng.png`, (e) => {
        //         this._dtBg.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtBg);
        // this._dtBg.x = 168;
        // this._dtBg.y = 505 - this.y - this._centerContain.y + GameValue.adaptationScreen;

        // if (this._dtDong == undefined) {
        //     this._dtDong = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/guang.png`, (e) => {
        //         this._dtDong.$setBitmapData(e);
        //     }, this);

        //     this.head_mask1 = new egret.Shape();
        //     this.head_mask1.graphics.beginFill(0x000000, 1);
        //     this.head_mask1.graphics.drawRoundRect(168, 505 - this.y - this._centerContain.y + GameValue.adaptationScreen, 95, 23, 10);
        //     this.head_mask1.graphics.endFill();
        //     this.head_mask1.alpha = 1;
        //     this._centerContain.addChild(this.head_mask1);
        //     this._dtDong.mask = this.head_mask1;
        //     this._dtDong.x = 168 - 68;
        //     this._dtDong.y = 505 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        //     egret.Tween.get(this._dtDong, { loop: true }).to({ x: 168 + 90 }, 1000).wait(300).call(() => {
        //         if (this._dtDong != undefined)
        //             this._dtDong.x = 168 - 68;
        //     })
        // }
        // this._centerContain.addChild(this._dtDong);

        // if (this._dtWZ == undefined) {
        //     this._dtWZ = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/wenzi.png`, (e) => {
        //         this._dtWZ.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtWZ);
        // this._dtWZ.x = 174;
        // this._dtWZ.y = 507 - this.y - this._centerContain.y + GameValue.adaptationScreen;

        /**************** 暂时偷懒篮球 ******************/
        // if (this._dtBg1 == undefined) {
        //     this._dtBg1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/diceng.png`, (e) => {
        //         this._dtBg1.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtBg1);
        // this._dtBg1.x = 168;
        // this._dtBg1.y = 641 - this.y - this._centerContain.y + GameValue.adaptationScreen;

        // if (this._dtDong1 == undefined) {
        //     this._dtDong1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/guang.png`, (e) => {
        //         this._dtDong1.$setBitmapData(e);
        //     }, this);

        //     this.head_mask11 = new egret.Shape();
        //     this.head_mask11.graphics.beginFill(0x000000, 1);
        //     this.head_mask11.graphics.drawRoundRect(168, 641 - this.y - this._centerContain.y + GameValue.adaptationScreen, 95, 23, 10);
        //     this.head_mask11.graphics.endFill();
        //     this.head_mask11.alpha = 1;
        //     this._centerContain.addChild(this.head_mask11);
        //     this._dtDong1.mask = this.head_mask11;
        //     this._dtDong1.x = 168 - 68;
        //     this._dtDong1.y = 641 - this.y - this._centerContain.y + GameValue.adaptationScreen;
        //     egret.Tween.get(this._dtDong1, { loop: true }).to({ x: 168 + 90 }, 1000).wait(300).call(() => {
        //         if (this._dtDong1 != undefined)
        //             this._dtDong1.x = 168 - 68;
        //     })
        // }
        // this._centerContain.addChild(this._dtDong1);

        // if (this._dtWZ1 == undefined) {
        //     this._dtWZ1 = new egret.Bitmap();
        //     RES.getResByUrl(`resource/assets/images/ui/wenzi.png`, (e) => {
        //         this._dtWZ1.$setBitmapData(e);
        //     }, this);
        // }
        // this._centerContain.addChild(this._dtWZ1);
        // this._dtWZ1.x = 174;
        // this._dtWZ1.y = 643 - this.y - this._centerContain.y + GameValue.adaptationScreen;

        new JJTiao(this._centerContain, 168, 505 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168, 641 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168, 777 - this.y - this._centerContain.y + GameValue.adaptationScreen);
        new JJTiao(this._centerContain, 168 + 374, 777 - this.y - this._centerContain.y + GameValue.adaptationScreen);
    }

    private addActivity(): void {
        let objNum = 0;
        let objHeight = 90 + 20;
        for (let i = 0; i < this._imgTitle.length; i++) {
            let obj = new WorldActivity(this._imgSrc[i], this._imgTitle[i], this._imgContent[i], i);
            this._imgItem.Gput(i, obj);
            obj.y = objHeight;
            obj.x = 375 * objNum;
            this._centerContain.addChild(obj);
            if (objNum == 1) {
                objNum = 0;
                objHeight = objHeight + 136;
            } else {
                objNum += 1;
            }
        }


        this._banner = new egret.Bitmap();
        this._centerContain.addChild(this._banner);
        this._banner.touchEnabled = true;
        this._banner.y = objHeight + 20;
        // this._banner.y = objHeight + 20 + 136;
        RES.getResByUrl("resource/assets/images/ui/haibao_home@2x.png", (e) => {
            this._banner.$setBitmapData(e);
            this._banner.x = (GameMain.getInstance.StageWidth - this._banner.width) * 0.5;
        }, this)
        // RES.getResByUrl("resource/assets/images/51ad/ic_ad.png", (e) => {
        //     this._banner.$setBitmapData(e);
        //     this._banner.x = (GameMain.getInstance.StageWidth - this._banner.width) * 0.5;
        // }, this)

        this._downContain.y = this._centerContain.y + objHeight + 20 + 140 + 34;

        this.dtt();
    }

    private touchDown(e: egret.TouchEvent) {
        WorldWnd._worldState = 1;
        // if (e.target == this._kfBtn) {//联系客服
        //     KeFuWnd.getInstance.show();
        // } else if (e.target == this._kjBtn) {//开奖
        //     AwareInfoMgr.getInstance.show();
        //     OpenAwareConfin.getInstance.sendHttp();
        // } else 
        if (e.target == this._banner) {//10%
            // activitytwo.getInstance.show();
            ID1.getInstance.show();
        }
        this.hide();
    }

    private toGD(e: egret.TouchEvent): void {
        if (e.target == this._moreText) {//更多 跳转跟单
            DownWnd.getInstance.toGD();
        }
    }

    public upDownData(): void {
        let item = DmC_infoMsg.getInstance.item;
        if (item == undefined || item.size < 1) {
            this._downContain.visible = false;
        } else {
            this._downContain.visible = true;
            let index = 0;
            let objHeight = 97.5;
            for (let key of item.keys) {
                if (index > 7) break;//最多两条
                let obj: DmC_info;
                if (this._item.GhasKey(key)) {
                    obj = this._item.Gget(key);
                } else {
                    obj = new DmC_info();
                    this._item.Gput(key, obj);
                }
                obj.aa(item.Gget(key));
                obj.addInterception();
                obj.y = objHeight;
                objHeight = objHeight + obj.height;
                index += 1;
                if (obj.parent == undefined)
                    this._downContain.addChild(obj);
            }
            ToolMrg.upItemofGHashMap(this._item, item);
        }
    }

    public show(): void {
        if (this.parent == undefined)
            GUIManager.getInstance.bgLay.addChild(this);
        WorldWnd._worldState = 0;
        GD_List.getInstance.sendHttp();
        this.addInterception();
        this.upDownData();
        this.moveImg(null);
    }

    public hide(): void {
        let obj: DmC_info;
        for (let key of this._item.keys) {
            obj = this._item.Gget(key);
            if (obj.parent != undefined) {
                obj.parent.removeChild(obj);
            }
        }

        if (this.parent != undefined) {
            this.parent.removeChild(this);
            this.removeInterception();
        }

    }

    private addScoll(): void {
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
        this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100;
        this.addChild(this._scroView);
    }

    private addInterception(): void {
        this._moreText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toGD, this);
        this._scroView.addEventListener(egret.TouchEvent.CHANGE, this.moveImg, this);
        // this._kjBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._kfBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._banner.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (let key of this._imgItem.keys) {
            this._imgItem.Gget(key).addInterception();
        }
    }

    private removeInterception(): void {
        this._moreText.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.toGD, this);
        this._scroView.removeEventListener(egret.TouchEvent.CHANGE, this.moveImg, this);
        // this._kjBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        // this._kfBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        this._banner.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
        for (let key of this._imgItem.keys) {
            this._imgItem.Gget(key).removeInterception();
        }
    }

    private moveImg(e: egret.TouchEvent): void {
        this._imgContain.y = - this._scroView.scrollTop;
    }

    private joinDown(): void {
        let downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xf5f5f7);
        downShape.graphics.drawRect(0, 0, 750, 10);
        downShape.graphics.endFill();

        let downShape2 = new egret.Shape();
        this._downContain.addChild(downShape2);
        downShape2.graphics.beginFill(0xffffff);
        downShape2.graphics.drawRect(0, 10, 750, 86);
        downShape2.graphics.endFill();

        let downTitle = ToolMrg.getText(28, 10, 32, 0x333333);
        this._downContain.addChild(downTitle);
        downTitle.bold = true;
        downTitle.height = 86;
        downTitle.verticalAlign = egret.VerticalAlign.MIDDLE;
        downTitle.text = "热门抄单";

        this._moreText = ToolMrg.getText(GameMain.getInstance.StageWidth - 48 * 2, 10, 24, 0x999999, 120);
        this._downContain.addChild(this._moreText);
        // this._moreText.bold = true;
        this._moreText.height = 86;
        // this._moreText.textAlign = egret.HorizontalAlign.CENTER;
        this._moreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moreText.touchEnabled = true;
        this._moreText.text = "更多";

        let rightBtn = new egret.Bitmap();
        this._downContain.addChild(rightBtn);
        RES.getResByUrl("resource/assets/images/ui/xq2_nav@2x.png", (e) => {
            rightBtn.$setBitmapData(e);
            rightBtn.y = 10 + (86 - rightBtn.height) * 0.5;
            rightBtn.x = 710;
        }, this);

        let downShape3 = new egret.Shape();
        this._downContain.addChild(downShape3);
        downShape3.graphics.beginFill(0xDEDEDE);
        downShape3.graphics.drawRect(0, 96, 750, 1.5);
        downShape3.graphics.endFill();
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);

        let mShareC = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { mShareC.$setBitmapData(e); }, this);
        mShareC.width = GameMain.getInstance.StageWidth;
        mShareC.height = 1200;
        this._mContain.addChildAt(mShareC, 0);
    }
}

class JJTiao extends egret.DisplayObjectContainer {
    /**动态图 */
    private _dtBg: egret.Bitmap;
    private _dtDong: egret.Bitmap;
    private _dtWZ: egret.Bitmap;
    private head_mask1: egret.Shape;

    constructor(parent: egret.DisplayObjectContainer, x: number, y: number) {
        super();
        parent.addChild(this);

        if (this._dtBg == undefined) {
            this._dtBg = new egret.Bitmap();
            RES.getResByUrl(`resource/assets/images/ui/diceng.png`, (e) => {
                this._dtBg.$setBitmapData(e);
            }, this);
        }
        this.addChild(this._dtBg);
        this._dtBg.x = x;
        this._dtBg.y = y;

        if (this._dtDong == undefined) {
            this._dtDong = new egret.Bitmap();
            RES.getResByUrl(`resource/assets/images/ui/guang.png`, (e) => {
                this._dtDong.$setBitmapData(e);
            }, this);

            this.head_mask1 = new egret.Shape();
            this.head_mask1.graphics.beginFill(0x000000, 1);
            this.head_mask1.graphics.drawRoundRect(x, y, 95, 23, 10);
            this.head_mask1.graphics.endFill();
            this.head_mask1.alpha = 1;
            this.addChild(this.head_mask1);
            this._dtDong.mask = this.head_mask1;
            this._dtDong.x = x - 68;
            this._dtDong.y = y;
            egret.Tween.get(this._dtDong, { loop: true }).to({ x: x + 90 }, 1000).wait(300).call(() => {
                if (this._dtDong != undefined)
                    this._dtDong.x = x - 68;
            })
        }
        this.addChild(this._dtDong);

        if (this._dtWZ == undefined) {
            this._dtWZ = new egret.Bitmap();
            RES.getResByUrl(`resource/assets/images/ui/wenzi.png`, (e) => {
                this._dtWZ.$setBitmapData(e);
            }, this);
            // RES.getResByUrl(`resource/assets/images/ui/wenzi5.png`, (e) => {
            //     this._dtWZ.$setBitmapData(e);
            // }, this);
        }
        this.addChild(this._dtWZ);
        this._dtWZ.x = x + 6;
        this._dtWZ.y = y + 2;
    }
}

class WorldActivity extends egret.DisplayObjectContainer {
    private _id;
    private _img: egret.Bitmap;
    private _title: egret.TextField;
    private _content: egret.TextField;

    constructor(imgsrc, title, content, id) {
        super();
        this._id = id;

        this._img = new egret.Bitmap();
        this._img.x = 40;
        this.addChild(this._img);
        this._img.y = 20;
        RES.getResByUrl(`resource/assets/images/ui/${imgsrc}.png`, (e) => {
            this._img.$setBitmapData(e);
        }, this);

        this._title = ToolMrg.getText(164, 20 + 8, 32, 0x333333);
        this.addChild(this._title);
        this._title.text = title;

        if (title == "更多玩法")
            this._title.y = 48;

        this._content = ToolMrg.getText(164, 20 + 54, 24, 0x999999);
        this.addChild(this._content);
        this._content.text = content;

        this.setDB();
    }

    private _isInterception = false;
    public addInterception(): void {
        if (!this._isInterception) {
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    }

    public removeInterception(): void {
        if (this._isInterception) {
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    }
    private touchDown(e: egret.TouchEvent): void {
        WorldWnd._worldState = 1;
        if (this._id == 0) {//足球串关
            if(GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                TsView.getInstance.show();
                return;
            }
            FbWnd.getInstance.show();
        } else if (this._id == 1) {//足球单关
            if(GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                 TsView.getInstance.show();
                return;
            }
            FbWnd.getInstance._index = 1;
            FbWnd.getInstance.show();
        } else if (this._id == 2) {//篮球串关
            if(GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                 TsView.getInstance.show();
                return;
            }
            BasketBallWnd.getInstance.show();
        } else if (this._id == 3) {//篮球单关
            if(GameValue.isJ <= 0) {
                // Alertpaner.getInstance.show("该时间段不可购买");
                 TsView.getInstance.show();
                return;
            }
            BasketBallWnd.getInstance._index = 1;
            BasketBallWnd.getInstance.show();
        } else if (this._id == 4) {//超级足彩
            SPFbWnd.getInstance.show();
        } else if (this._id == 5) {//超级篮彩
            SPBasketBallWnd.getInstance.show();
        } else if (this._id == 6) {//列三
            ThreeBox.getInstance.show();
        } else if (this._id == 7) {//列五
            FiveBox.getInstance.show();
        }
        WorldWnd.getInstance.hide();
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);

        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth / 2, 96 + 40);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }
}