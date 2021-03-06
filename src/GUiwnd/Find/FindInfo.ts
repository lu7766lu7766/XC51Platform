class FindInfo extends egret.DisplayObjectContainer {

    private _bj: egret.Bitmap;
    private _imgBtn: egret.Bitmap;
    private _titleText: egret.TextField;

    constructor() {
        super();
        this.touchEnabled = true;

        this.x = 28;
        this._bj = new egret.Bitmap();
        this._bj.touchEnabled = true;
        this.addChild(this._bj);
        RES.getResByUrl("resource/assets/images/ui/bg_find@2x.png", (e) => { this._bj.$setBitmapData(e); }, this);

        let imgZZ = new egret.Shape();
        this.addChild(imgZZ);
        imgZZ.graphics.beginFill(0xffffff);
        imgZZ.graphics.drawRoundRect(6, 6, 658, 248, 20);
        imgZZ.graphics.endFill();

        this._imgBtn = new egret.Bitmap();
        this.addChild(this._imgBtn);
        this._imgBtn.x = 6;
        this._imgBtn.y = 6;
        this._imgBtn.width = 658;
        this._imgBtn.height = 248;
        this._imgBtn.mask = imgZZ;

        this._titleText = ToolMrg.getText(44, 260, 28, 0x333333);
        this.addChild(this._titleText);
        this._titleText.height = 60;
        this._titleText.verticalAlign = egret.VerticalAlign.MIDDLE;

        let detailText = ToolMrg.getText(574, 260, 24, 0x999999);
        detailText.height = 60;
        detailText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.addChild(detailText);
        detailText.text = "查看详情";

        this.setDB();
    }

    private _data: FindData;
    public aa(data: FindData): void {
        this._data = data;
        RES.getResByUrl(`resource/assets/images/ui/${data.imgSrc}`, (e) => {
            this._imgBtn.$setBitmapData(e);
        }, this, RES.ResourceItem.TYPE_IMAGE);
        // LoadNetPic.getLoadNetPic.loadPic(`${data.imgSrc}`,(e)=>{this._imgBtn.$setBitmapData(e);},this);
        this._titleText.text = ToolMrg.nameMode2(20, data.title);
    }

    //从0开始，按顺序
    private touchDown(e: egret.TouchEvent): void {
        // if (this._data.id == 0) {//竞彩串关加奖来袭，加奖10
        //     ID1.getInstance.show();
        // } else if (this._data.id == 1) {//助力中超，周周彩金大放送
        //     ID2.getInstance.show();
        // } else if (this._data.id == 2) {//呼朋唤友一起来战斗
        //     ShareWnd.getInstance.show();
        // } else if (this._data.id == 3) {//首存5888元等你拿！
        //     ID4.getInstance.show();
        // } else if (this._data.id == 4) {//新用户注册即送18元
        //     ID5.getInstance.show();
        // } else if (this._data.id == 5) {//VIP成长礼包送不停
        //     ID6.getInstance.show();
        // } 

        if (this._data.id == 0) {//新用户注册即送18元
            ID5.getInstance.show();
        } else if (this._data.id == 1) {//首存5888元等你拿！
            ID4.getInstance.show();
        } else if (this._data.id == 2) {//VIP成长礼包送不停
            ID6.getInstance.show();
        } else if (this._data.id == 3) {//竞彩串关加奖来袭，加奖10
            ID1.getInstance.show();
        } else if (this._data.id == 4) {//助力中超，周周彩金大放送
            ID2.getInstance.show();
        } else if (this._data.id == 5) {//呼朋唤友一起来战斗
            ShareWnd.getInstance.show();
        } else if (this._data.id == 6) {//银行卡转账
            ID7.getInstance.show();
        }
    }

    private _isInterception = false;
    public addInterception(): void {
        if (!this._isInterception) {
            this._bj.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = true;
        }
    }

    public removeInterception(): void {
        if (this._isInterception) {
            this._bj.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this);
            this._isInterception = false;
        }
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        this._mShareC.graphics.drawRect(-this.x, 0, GameMain.getInstance.StageWidth, 400);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
    }
}

class FindMrg {
    private static _mInstance: FindMrg;
    public static get getInstance(): FindMrg {
        if (FindMrg._mInstance == undefined)
            FindMrg._mInstance = new FindMrg();
        return FindMrg._mInstance;
    }

    public _findItem: GHashMap<FindData>;
    //手动添加
    private _imgSrc = ["xyh750.png", "dnn750.png", "vip750.png", "jiaj750px.png" , "zhuli658.png", "hphy658.png", "rkjf658.png"]; //10//  //5//51ad2.png

    private _titleStr = ["新用户注册即送18元", "首存5888元等你拿！", "VIP成长礼包送不停", "竞彩串关加奖来袭，加奖10%无上限", "助力中超，周周彩金大放送",
        "呼朋唤友一起来战斗", "银行卡转账送1%"];

    constructor() {
        this._findItem = new GHashMap<FindData>();

        for (let i = 0; i < this._imgSrc.length; i++) {
            let obj = new FindData();
            obj.id = i;
            obj.title = this._titleStr[i];
            obj.imgSrc = this._imgSrc[i];
            this._findItem.Gput(i, obj);
        }
    }

}

class FindData {
    public id;
    public title: string;
    public imgSrc: string;
}