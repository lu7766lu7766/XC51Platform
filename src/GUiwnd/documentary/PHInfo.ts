/**个人主页实体类 */
class PHInfo extends egret.DisplayObjectContainer{
    private _typeImg:egret.Bitmap;
    private _typeText:egret.TextField;
    private _time:egret.TextField;
    private _yjhb:egret.TextField;
    private _zgje:egret.TextField;
    private _gdrs:egret.TextField;
    private _zjjj:egret.TextField;
    private _gdBtn:egret.Bitmap;
    private _isImg:egret.Bitmap;

    constructor(){
        super();
        
        this._typeImg = new egret.Bitmap();
        this.addChild(this._typeImg);
        this._typeImg.width = 32;
        this._typeImg.height = 32;
        this._typeImg.x = 26;
        this._typeImg.y = 28;

        this._typeText = ToolMrg.getText(66,16,28,0x333333);
        this.addChild(this._typeText);
        this._typeText.height = 50;
        this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._time = ToolMrg.getText(558,28,20,0x999999);
        this.addChild(this._time);
        this._time.height = 28;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._yjhb = ToolMrg.getText(30,90,24,0x999999);
        this.addChild(this._yjhb);
        this._yjhb.height = 34;
        this._yjhb.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._zgje = ToolMrg.getText(30,128,24,0x999999);
        this.addChild(this._zgje);
        this._zgje.height = 34;
        this._zgje.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._gdrs = ToolMrg.getText(310,90,24,0x999999);
        this.addChild(this._gdrs);
        this._gdrs.height = 34;
        this._gdrs.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._zjjj = ToolMrg.getText(310,128,24,0x999999);
        this.addChild(this._zjjj);
        this._zjjj.height = 34;
        this._zjjj.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._gdBtn = new egret.Bitmap();
        this.addChild(this._gdBtn);
        this._gdBtn.x = 624;
        this._gdBtn.y = 94;

        this._isImg = new egret.Bitmap();
        this.addChild(this._isImg);
        this._isImg.x = 566;
        this._isImg.y = 68;

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xF5F5F7);
        shape.graphics.drawRect(0,188,750,10);
        shape.graphics.endFill();

        this.setDB();
    }

    public aa():void{
        this._typeText.text = "竞足串关";
        this._time.text = `06-23 22:00 截止`;
        RES.getResByUrl("resource/assets/images/ui/jzcg_home@2x.png",(e)=>{this._typeImg.$setBitmapData(e); },this)
        RES.getResByUrl("resource/assets/images/ui/gd_expert@2x.png",(e)=>{this._gdBtn.$setBitmapData(e); },this);
        RES.getResByUrl("resource/assets/images/ui/wzj_expert@2x.png",(e)=>{this._isImg.$setBitmapData(e); },this);

        let textColor = 0xF72F53;

        this._yjhb.textFlow = <Array<egret.ITextElement>>[
            {"text":"预计回报：",style:{"textColor":0x999999}},
            {"text":`41.82倍`,style:{"textColor":textColor}}
        ];

        this._zgje.textFlow = <Array<egret.ITextElement>>[
            {"text":"自购金额：",style:{"textColor":0x999999}},
            {"text":`500元`,style:{"textColor":textColor}}
        ];

        this._gdrs.textFlow = <Array<egret.ITextElement>>[
            {"text":"跟单人数：",style:{"textColor":0x999999}},
            {"text":`238人`,style:{"textColor":textColor}}
        ];

        this._zjjj.textFlow = <Array<egret.ITextElement>>[
            {"text":"中奖奖金：",style:{"textColor":0x999999}},
            {"text":`29045.54元`,style:{"textColor":textColor}}
        ];
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        if(this._isInterception){
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._mShareC){
            DmC_infoMsg.dmdetail = new DmDetails();
            DmC_infoMsg.dmdetail.show(null,null,null);
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 198);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true
    }

}