class DownWnd extends egret.DisplayObjectContainer {
    private static _mInstance: DownWnd;
    public static get getInstance(): DownWnd {
        if (DownWnd._mInstance == undefined)
            DownWnd._mInstance = new DownWnd();
        return DownWnd._mInstance;
    }

    // private _imgSrc = ["home_","expert_","mine_"];
    private _imgSrc = ["home_", "match_", "expert_", "find_", "mine_"];
    private _downImg: GHashMap<DownImg>;
    /**初始下标 */
    private _index = 0;

    constructor() {
        super();

        this.y = GameMain.getInstance.StageHeight - 100;
        this._downImg = new GHashMap<DownImg>();

        let bj = new egret.Bitmap();
        this.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png", (e) => {
            bj.$setBitmapData(e);
        }, this);

        this.addImg();
        this.setDB();
    }

    private addImg(): void {
        for (let i = 0; i < this._imgSrc.length; i++) {
            let obj = new DownImg(this._imgSrc[i], i);
            this.addChild(obj);
            obj.x = i * 150;
            // obj.x = i*250;
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
                if (this._index == obj.id) return;
                // if(obj.id == 2){
                //     Alertpaner.getInstance.show("该用户等级不足");
                //     return;
                // }
                this._index = obj.id;
                this.changeSelect();
            }, this);
            this._downImg.Gput(i, obj);
        }
        this.changeSelect();
    }

    private changeSelect(): void {
        for (let key of this._downImg.keys) {
            if (key == this._index) {
                this._downImg.Gget(key).selectImg();
            } else {
                this._downImg.Gget(key).noselectImg();
            }
        }

        if (this._index == 0) {//购彩
            WorldWnd.getInstance.show();
            DmWnd_2.getInstance.hide();
            MyViewWnd.getInstance.hide();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        } else if (this._index == 1) {//比分
            BakorfallViewMrg.getInstance.show();
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.hide();
            FindWnd.getInstance.hide();
            MyViewWnd.getInstance.hide();
        } else if (this._index == 2) {//跟单
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.show();
            MyViewWnd.getInstance.hide();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        } else if (this._index == 3) {//发现
            FindWnd.getInstance.show();
            WorldWnd.getInstance.hide();
            DmWnd_2.getInstance.hide();
            MyViewWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        } else if (this._index = 4) {//我的
            WorldWnd.getInstance.hide();
            DmWnd.getInstance.hide();
            MyViewWnd.getInstance.show();
            FindWnd.getInstance.hide();
            BakorfallViewMrg.getInstance.hide();
        }
    }

    /**跳转跟单 */
    public toGD():void{
        this._index = 2;
        this.changeSelect();
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 1);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }

    public show(): void {
        GUIManager.getInstance.topLay.addChild(this);
    }

    public hide(): void {
        if (this.parent != undefined) {
            this.parent.removeChild(this);
        }
    }
}

class DownImg extends egret.DisplayObjectContainer {
    private _img: egret.Bitmap;
    public id;
    private _src = "";

    constructor(src, id) {
        super();

        this.id = id;
        this._src = src;

        let zz = new egret.Shape();
        this.addChild(zz);
        zz.graphics.beginFill(0xffffff);
        zz.graphics.drawRect(0, 0, 150, 100);
        zz.graphics.endFill();

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        RES.getResByUrl(`resource/assets/images/ui/${src}nor_tabbar@2x.png`, (e) => {
            this._img.$setBitmapData(e);
            this._img.x = (150 - this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            this._img.y = 100 - 7 - this._img.height;
        }, this);

    }

    public selectImg(): void {
        RES.getResByUrl(`resource/assets/images/ui/${this._src}tabbar@2x.png`, (e) => {
            this._img.$setBitmapData(e);
            this._img.x = (150 - this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            this._img.y = 100 - 7 - this._img.height;
        }, this);
    }

    public noselectImg(): void {
        RES.getResByUrl(`resource/assets/images/ui/${this._src}nor_tabbar@2x.png`, (e) => {
            this._img.$setBitmapData(e);
            this._img.x = (150 - this._img.width) * 0.5;
            // this._img.x = (250-this._img.width)*0.5;
            this._img.y = 100 - 7 - this._img.height;
        }, this);
    }
}