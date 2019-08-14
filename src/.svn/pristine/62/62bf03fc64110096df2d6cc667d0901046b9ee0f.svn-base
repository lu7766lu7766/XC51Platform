class SCInfo extends egret.DisplayObjectContainer{
    private _img:egret.Bitmap;
    private _chuanText:egret.TextField;
    private _title:egret.TextField;
    private _dateText:egret.TextField;
    /**跟单人数 */
    private _GDNumText:egret.TextField;
    /**比例 */
    private _rateText:egret.TextField;
    /**跟单金额 */
    private _GDmoney:egret.TextField;
    /**佣金 */
    private _CMmoney:egret.TextField;

    constructor(){
        super();

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = 28;
        this._img.height = 28;
        this._img.x = 28;
        this._img.y = 20;

        this._title = ToolMrg.getText(62,8+11,28,0x333333);
        this.addChild(this._title);

        this._chuanText = ToolMrg.getText(130,16+5,24,0x999999);
        this.addChild(this._chuanText);

        this._dateText = ToolMrg.getText(28,66+4,20,0x999999);
        this.addChild(this._dateText);

        this._GDNumText = ToolMrg.getText(236 + 42,20+4,20,0x333333,200);
        this.addChild(this._GDNumText);
        this._GDNumText.textAlign = egret.HorizontalAlign.CENTER;

        this._rateText = ToolMrg.getText(236 + 42,70,20,0x999999,200);
        this.addChild(this._rateText);
        this._rateText.textAlign = egret.HorizontalAlign.CENTER;

        this._GDmoney = ToolMrg.getText(378 + 148,20+4,20,0x333333,200);
        this.addChild(this._GDmoney);
        this._GDmoney.textAlign = egret.HorizontalAlign.RIGHT;

        this._CMmoney = ToolMrg.getText(350+126,59+5,24,0xF72E52,250);
        this.addChild(this._CMmoney);
        this._CMmoney.textAlign = egret.HorizontalAlign.RIGHT;

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,108,GameMain.getInstance.StageWidth,2);
        shape.graphics.endFill();
        this.setDB();
    }

    public _data:SCData;
    public aa(data:SCData):void{
        this._data = data;

        let str = "";
        if(data._type==1){
            str = "jzcg_home@2x";
            this._title.text = `竞足`;
            this._chuanText.text = `单关`;
        }else if(data._type==2){
            str = "jzdg_home@2x";
            this._title.text = `竞足`;
            this._chuanText.text = `串关`;
        }else if(data._type==3){
            str = "jlcg_home@2x";
            this._title.text = `竞篮`;
            this._chuanText.text = `串关`;
        }else if(data._type==4){
            str = "jldg_home@2x";
            this._title.text = `竞篮`;
            this._chuanText.text = `单关`;
        }
        RES.getResByUrl(`resource/assets/images/ui/${str}.png`,(e)=>{this._img.$setBitmapData(e); },this);

        this._dateText.text = ToolMrg.getTime11(data._dateTime);
        this._GDNumText.text = `${data._GDNum}人跟单`;
        this._rateText.text = `佣金比例：${data._rate}%`;
        this._GDmoney.text = `跟单金额：${ToolMrg.getDecimal(data._GDmoney/100,2)}元`;
        this._CMmoney.text = `佣金：${ToolMrg.getDecimal(data._CMmoney/100,2)}元`;

    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,110);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}

class SCData{
    public id;
    /**类型 1竞足串关 2竞足单关 3竞篮串关 4竞篮单关 */
    public _type:number;
    /**串数 */
    public _chuan:string;
    /**日期 */
    public _dateTime:number;
    /**跟单人数 */
    public _GDNum:number;
    /**比例 ：5% */
    public _rate:string;
    /**跟单金额 */
    public _GDmoney:number;
    /**佣金 */
    public _CMmoney:number;
}