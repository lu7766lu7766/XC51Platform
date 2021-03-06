class SelectInfo extends egret.DisplayObjectContainer {
    private _bj: egret.Bitmap;
    private _BankText: egret.TextField;
    private _typeCard: egret.TextField;

    constructor() {
        super();

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xf5f5f7);
        shape.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 140);
        shape.graphics.endFill();

        this._bj = new egret.Bitmap();
        this.addChild(this._bj);
        this._bj.touchEnabled = true;
        this._bj.x = 28;
        RES.getResByUrl("resource/assets/images/ui/bdbg_mine@2x.png", (e) => { this._bj.$setBitmapData(e); }, this);

        this._BankText = ToolMrg.getText(54, 0, 28, 0x333333);
        this.addChild(this._BankText);
        this._BankText.height = 100;
        this._BankText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._BankText.bold = true;

        this._typeCard = ToolMrg.getText(422 + 84, 0, 28, 0x333333, 200);
        this.addChild(this._typeCard);
        this._typeCard.height = 100;
        this._typeCard.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._typeCard.textAlign = egret.HorizontalAlign.RIGHT;

    }

    private _data: SelectData_card;
    public aa(data: SelectData_card): void {
        this._data = data;

        let of4 = "";
        if (data.cardNum.length > 4)
            of4 = data.cardNum.substring(data.cardNum.length - 4, data.cardNum.length);
        else
            of4 = data.cardNum;

        this._BankText.text = `${data.BankName}(${of4})`;
        this._typeCard.text = `${data.typeName}`;
    }

    private touchDown(): void {
        egret.log(this._data);
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
}

class SelectDataMrg {
    private static _mInstance: SelectDataMrg;
    public static get getInstance(): SelectDataMrg {
        if (SelectDataMrg._mInstance == undefined)
            SelectDataMrg._mInstance = new SelectDataMrg();
        return SelectDataMrg._mInstance;
    }

    private _bankDataItem: GHashMap<SelectData_card>;

    constructor() {
        this._bankDataItem = new GHashMap<SelectData_card>();
    }

    public clearItem(): void {
        this._bankDataItem.clear();
    }

    public getItem(): GHashMap<SelectData_card> {
        return this._bankDataItem;
    }

    public addDataToItem(id, obj: SelectData_card): void {
        this._bankDataItem.Gput(id, obj);
    }
}

class SelectData_card {
    public id;
    /**分类 */
    public typeName: string;
    /**银行 */
    public BankName: string;
    /**卡号 */
    public cardNum: string;
    /**用户姓名*/
    public userName: string;
}