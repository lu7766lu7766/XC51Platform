class GDRecordInfo extends egret.DisplayObjectContainer{
    private _img:egret.Bitmap;
    private _typeText:egret.TextField;
    private _buyText:egret.TextField;
    private _sendNameText:egret.TextField;
    private _isWin:egret.TextField;
    private _timeText:egret.TextField;

    constructor(){
        super();

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = 28;
        this._img.height = 28;
        this._img.x = 28;
        this._img.y = 20;

        this._typeText = ToolMrg.getText(62,19,28,0x333333);
        this.addChild(this._typeText);
        
        this._buyText = ToolMrg.getText(202,20,28,0x72e52);
        this.addChild(this._buyText);

        this._sendNameText = ToolMrg.getText(28,66,20,0x999999);
        this.addChild(this._sendNameText);

        this._isWin = ToolMrg.getText(404+72,20,24,0xff7000,250);
        this.addChild(this._isWin);
        this._isWin.textAlign = egret.HorizontalAlign.RIGHT;

        this._timeText = ToolMrg.getText(404+72,70,20,0x999999,250);
        this.addChild(this._timeText);
        this._timeText.textAlign = egret.HorizontalAlign.RIGHT;

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,108,GameMain.getInstance.StageWidth,2);
        shape.graphics.endFill();

        this.setDB();
    }

    public _data:GDRecordData;
    public aa(data:GDRecordData):void{
        this._data = data;

        let str = "";
        if(data._type==1){
            str = "jzcg_home@2x.png"
            this._typeText.text = "竞足串关";
        }else if(data._type==2){
            str = "jzdg_home@2x.png";
            this._typeText.text = "竞足单关";
        }else if(data._type==3){
            str = "jlcg_home@2x.png";
            this._typeText.text = "竞篮串关";
        }else if(data._type==4){
            str = "jldg_home@2x.png";
            this._typeText.text = "竞篮单关";
        }     
        RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{this._img.$setBitmapData(e); },this);

        if(data._isWin==1){//待开奖
            this._isWin.textColor = 0xff7000;
            this._isWin.text = "待开奖";
        }else if(data._isWin==2){//未中奖
            this._isWin.textColor = 0x999999;
            this._isWin.text = "未中奖";
        }else if(data._isWin==3){//已中奖
            this._isWin.textColor = 0xF72E52;
            this._isWin.text = "已中奖";
        }

        this._buyText.text = `${(data.buyMoney/100).toFixed(2)}元`;
        this._sendNameText.text = `发单者：${ToolMrg.nameMode2(6,data.sendName)}`; 
        this._timeText.text = `${ToolMrg.getTime1(data.day)}`;
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, 110);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}
}

class GDRecordMrg{
    private static _mInstance: GDRecordMrg;
	public static get getInstance(): GDRecordMrg {
		if (GDRecordMrg._mInstance == undefined)
			GDRecordMrg._mInstance = new GDRecordMrg();
		return GDRecordMrg._mInstance;
	}

    public GDRItem:GHashMap<GDRecordData>;

    constructor(){
        this.GDRItem = new GHashMap<GDRecordData>();
    }
}

class GDRecordData{
    public id;
    /**发单者 */
    public sendName:string;
    /**类型 竞足串关 竞足单关 竞篮串关 竞篮单关 */
    public _type;
    /**是否中奖 1待开奖 2未中奖 3已中奖 */
    public _isWin:number;
    /***中奖金额 */
    public winMoney:number;
    /**购买金额 */
    public buyMoney:number;
    /**时间 */
    public day:number;

    /**订单id */
    public order_id:string;
}