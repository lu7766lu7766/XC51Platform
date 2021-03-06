/**切换 排3 */
class QTthree extends egret.DisplayObjectContainer{
    private static _mInstance: QTthree;
	public static get getInstance(): QTthree {
		if (QTthree._mInstance == undefined)
			QTthree._mInstance = new QTthree();
		return QTthree._mInstance;
	}

    private _bj:egret.Bitmap;
    private _item:GHashMap<ThreeQTInfo>;

    constructor(){
        super();
        this._item = new GHashMap<ThreeQTInfo>();

        this._bj = new egret.Bitmap();
        this.addChild(this._bj);
        this._bj.y = 96+GameValue.adaptationScreen;
        RES.getResByUrl("resource/assets/images/ui/xlabg_home@2x.png",(e)=>{
            this._bj.$setBitmapData(e);
        this._bj.x = (750 - this._bj.width)*0.5;
        },this);
        this._bj.touchEnabled = true;

        let _item = ThreeBox.getInstance.titleItem;
        for(let i=0;i<_item.length;i++){
            let obj = new ThreeQTInfo(i,_item[i]);
            this._item.Gput(i,obj);
            obj.x = 296;
            obj.y = 96+GameValue.adaptationScreen+15+20+62*i;
            this.addChild(obj);
            obj.touchEnabled = true;
            obj.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
                if(obj.id == ThreeBox.getInstance.titleIndex){
                    this.hide();
                    return;
                }
                ThreeBox.getInstance.ClickClear();
                ThreeBox.getInstance.titleIndex = obj.id;
                ThreeBox.getInstance.changeText();
                this.hide();
            },this);
        }

        this.setDB();
    }

    private changeList():void{
        for(let key of this._item.keys){
            if(key == ThreeBox.getInstance.titleIndex){
                this._item.Gget(key).selectInfo();
            }else{
                this._item.Gget(key).noselectInfo();
            }
        }

    }

    public show():void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.changeList();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 0.01);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,(e)=>{this.hide(); },this);
    }
}

class ThreeQTInfo extends egret.DisplayObjectContainer{
    private _text:egret.TextField;
    public id;
    constructor(id,text){
        super();
        this.id = id;
        this._text = ToolMrg.getText(0,0,28,0xffffff,160);
        this.addChild(this._text);
        this._text.height = 52;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._text.text = text;

        this.setDB();
    }

    public selectInfo():void{
        this._text.textColor = 0xf72e52;
        this._mShareC.graphics.clear();
        this._mShareC.graphics.beginFill(0x333333, 1);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52,20);
        this._mShareC.graphics.endFill();
    }

    public noselectInfo():void{
        this._text.textColor = 0xffffff;
        this._mShareC.graphics.clear();
        this._mShareC.graphics.beginFill(0x333333, 0.01);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52,20);
        this._mShareC.graphics.endFill();
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x333333, 0.01);
        this._mShareC.graphics.drawRoundRect(0, 0, 160, 52,20);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}