class TopUI extends egret.DisplayObjectContainer{
    private _bjImg:egret.Bitmap;
    private _Img:egret.Bitmap;
    private _shape:egret.Shape;
    private _text:egret.TextField;

    constructor(text,thisy?:number,isleft?,isLogin?:string){
        super();
        if(thisy!=undefined)
            this.y = thisy;
        let num = GameValue.adaptationScreen;

        this._bjImg = new egret.Bitmap();
        this.addChild(this._bjImg);
        if(isLogin != undefined) {
            RES.getResByUrl(`resource/assets/images/ui/`+isLogin,(e)=>{
                this._bjImg.$setBitmapData(e);
            },this);
        } else {
            RES.getResByUrl(`resource/assets/images/ui/bg_nav@2x.png`,(e)=>{
                this._bjImg.$setBitmapData(e);
                this._bjImg.height = 96+num;
            },this);
        }
        

        if(isleft==undefined){
            this._Img = new egret.Bitmap();
            this.addChild(this._Img);
            RES.getResByUrl("resource/assets/images/ui/return_nav@2x.png",(e)=>{
                this._Img.$setBitmapData(e);
                this._Img.x = 26;
                this._Img.y = 28+num;
            },this);
        }

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0x1cbf4f);
        this._shape.graphics.drawRect(0,0,150,96+num);
        this._shape.graphics.endFill();
        this._shape.touchEnabled = true;
        this._shape.alpha = 0.001;

        this._text = ToolMrg.getText(0,num,36,0xffffff,750);
        this.addChild(this._text);
        this._text.textAlign = egret.HorizontalAlign.CENTER;
        this._text.height = 96;
        this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._text.text = text;
    }

    public changeTitle(str:string):void{
        this._text.text = str;
    }

    public getReturn():egret.Shape{
        return this._shape;
    }

    public getreturnSprite():egret.Bitmap{
       return this._Img;
    }
}