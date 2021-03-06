class screenInfo extends egret.DisplayObjectContainer{
    public selectType = false;
    /** 0足球 1篮球 2超级足彩 3超级篮彩  */
    private _type:number;

    private _box:egret.Shape;
    // private _boxShape:egret.Shape;
    private _content:egret.TextField;

    constructor(){
        super();

        let bj = new egret.Bitmap();
        this.addChild(bj);
        bj.height = 92;
        bj.width = 208;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{bj.$setBitmapData(e); },this);

        this._box = new egret.Shape();
        this.addChild(this._box);
        this._box.graphics.beginFill(0xf5f5f8);
        this._box.graphics.drawRoundRect(0,0,160,72,20);
        this._box.graphics.endFill();
        this._box.touchEnabled = false;

        // this._boxShape = new egret.Shape();
        // this.addChild(this._boxShape);
        // this._boxShape.graphics.beginFill(0xF5F5F7);
        // this._boxShape.graphics.drawRoundRect(2,2,156,68,20);
        // this._boxShape.graphics.endFill();

        this._content = ToolMrg.getText(0,0,28,0x999999,160);
        this.addChild(this._content);
        this._content.height = 72;
        this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        this._content.touchEnabled = true;
    }

    private str:string;
    public aa(data:string,type:number):void{
        this.str = data;
        this._type = type;
        this._content.text = data;
    }

    public getDataId():string{
        return this.str;
    }

    public changeCss():void{
        this._box.graphics.clear();
        if(this.selectType){//选中
            this._box.graphics.beginFill(0xff004c);
            // this._boxShape.alpha = 1;
            this._content.textColor = 0xffffff;
        }else{//未选中
            this._box.graphics.beginFill(0xf5f5f8);
            // this._boxShape.alpha = 0.98;
            this._content.textColor = 0x999999;
        }
        this._box.graphics.drawRoundRect(0,0,160,72,20);
        this._box.graphics.endFill();
    }

    private touchDown(e:egret.TouchEvent){
        this.selectType = !this.selectType;
        this.changeCss();
        if(this._type==0){//回调足球
            FBscreen.getInstance.addOfremoveToSelectItem(this.str,this.selectType);
        }else if(this._type==1){//回调篮球
            BasketScreen.getInstance.addOfremoveToSelectItem(this.str,this.selectType);
        }else if(this._type==2){//回调超级足彩
            SPFBscreen.getInstance.addOfremoveToSelectItem(this.str,this.selectType);
        }else if(this._type==3){//回调超级足彩
            SPBasketScreen.getInstance.addOfremoveToSelectItem(this.str,this.selectType);
        }
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this._content.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        if(this._isInterception){
            this._content.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }

}

class screenMrg{
    private static _mInstance: screenMrg;
	public static get getInstance(): screenMrg {
		if (screenMrg._mInstance == undefined)
			screenMrg._mInstance = new screenMrg();
		return screenMrg._mInstance;
	}

    public _fbSelectItem:GHashMap<screenData>;

    constructor(){
        this._fbSelectItem = new GHashMap<screenData>();
        
        let obj = new screenData();
        obj.id = "1";
        obj.titile = "女世界杯";
        this._fbSelectItem.Gput(0,obj);

        let a = new screenData();
        a.id = "2";
        a.titile = "美洲杯";
        this._fbSelectItem.Gput(1,a);

        let b = new screenData();
        b.id = "3";
        b.titile = "日职";
        this._fbSelectItem.Gput(2,b);

        let c = new screenData();
        c.id = "4";
        c.titile = "非洲杯";
        this._fbSelectItem.Gput(3,c);

        let d = new screenData();
        d.id = "5";
        d.titile = "挪威";
        this._fbSelectItem.Gput(4,d);
    }   

}

class screenData{
    public id:string;
    public titile:string;
}