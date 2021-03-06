/**选择几串几 */
class FBselect extends egret.DisplayObjectContainer{
    private static _mInstance: FBselect;
	public static get getInstance(): FBselect {
		if (FBselect._mInstance == undefined)
			FBselect._mInstance = new FBselect();
		return FBselect._mInstance;
	}

    private _mContain:egret.DisplayObjectContainer;
    private _topContain:egret.DisplayObjectContainer;
    private _centerContain:egret.DisplayObjectContainer;
    private _downContain:egret.DisplayObjectContainer;
    private _mShape:egret.Shape;

    public numItem:GHashMap<number>;
    private _mitem:GHashMap<FBselectInfo>;

    constructor(){
        super();

        this.numItem = new GHashMap<number>();
        this._mitem = new GHashMap<FBselectInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);

        this._mShape = new egret.Shape();
        this._mContain.addChild(this._mShape);
        this._mShape.touchEnabled = true;

        this._topContain = new egret.DisplayObjectContainer();
        this._centerContain = new egret.DisplayObjectContainer();
        this._downContain = new egret.DisplayObjectContainer();
        this._mContain.addChild(this._topContain);
        this._mContain.addChild(this._centerContain);
        this._mContain.addChild(this._downContain);
        this._centerContain.y = 112;

        this.joinTop();
        this.joinDown();
        this.setDB();
    }

    private touchDown(e:egret.TouchEvent){
        if(e.target == this._defineBtn){
            GoFBBuy.getInstance.saveLeftText(this.numItem);
        }
        this.hide();
    }

    private updata():void{
        let obj:FBselectInfo;
        for(let i=0;i<this._allSelect.length;i++){//生成模块按钮：几串几
            if(this._mitem.GhasKey(i)){
                obj = this._mitem.Gget(i);
            }else{
                obj = new FBselectInfo();
                this._mitem.Gput(i,obj);
            }
            obj.aa(this._allSelect[i],this._allSelect[i]);
            if(i<3){
                obj.x = 52+i*208;
                obj.y = 42;
            }else if(i<6){
                obj.x = 52+(i-3)*208;
                obj.y = 42+1*100;
            }else{
                obj.x = 52+(i-6)*208;
                obj.y = 42+2*100;
            }
            if(obj.parent==undefined)
                this._centerContain.addChild(obj);
        }
        ToolMrg.upItemofArray(this._mitem,this._allSelect);
        for(let key of this._mitem.keys){
            let obj = this._mitem.Gget(key);
            if(this.numItem.GhasKey(obj.id))
                obj.selectType = true;
            else
                obj.selectType = false;
            obj.changeCss();
        }

        let num = 0;
        if(this._mitem.size<4)
            num=1;
        else if(this._mitem.size<7)
            num=2;
        else    
            num=3;
        this._downContain.y = 112+num*100+42;

        this._mShape.graphics.clear();
        this._mShape.graphics.beginFill(0xffffff);
        this._mShape.graphics.drawRoundRect(0,0,680,112+num*100+42+154,25);

        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;
    }

    private _allSelect:number[];
    public show(allSelect:number[],selectData:number[]):void{
        GUIManager.getInstance.tipLay.addChild(this);
        this._allSelect = allSelect;
        
        for(let i=0;i<selectData.length;i++){
            this.numItem.Gput(selectData[i],selectData[i]);
        }
        this.updata();
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.numItem.clear();
        }
    }

    private joinTop():void{
        let topTitle = ToolMrg.getText(0,37,36,0x333333,680);
        this._topContain.addChild(topTitle);
        topTitle.textAlign = egret.HorizontalAlign.CENTER;
        topTitle.text = "串关选择";

        let topShape = new egret.Shape();
        this._topContain.addChild(topShape);
        topShape.graphics.beginFill(0xdedede);
        topShape.graphics.drawRect(52,110.5,576,1.5);
        topShape.graphics.endFill();
    }

    private _cancelBtn:egret.Bitmap;
    private _defineBtn:egret.Bitmap;
    private joinDown():void{
        let downShape = new egret.Shape();
        this._downContain.addChild(downShape);
        downShape.graphics.beginFill(0xdedede);
        downShape.graphics.drawRect(52,0,576,1.5);
        downShape.graphics.endFill();

        this._cancelBtn = new egret.Bitmap();
        this._downContain.addChild(this._cancelBtn);
        this._cancelBtn.x = 44;
        this._cancelBtn.y = 34;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._cancelBtn.$setBitmapData(e); },this);

        this._defineBtn = new egret.Bitmap();
        this._downContain.addChild(this._defineBtn);
        this._defineBtn.x = 360;
        this._defineBtn.y = 34;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._defineBtn.$setBitmapData(e); },this);
        
        let cancelText = ToolMrg.getText(44,56,32,0x333333,276);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        this._downContain.addChild(cancelText);
        cancelText.text = "取消";

        let defineText = ToolMrg.getText(360,56,32,0xffffff,276);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        this._downContain.addChild(defineText);
        defineText.text = "确定";

        this._cancelBtn.touchEnabled = true;
        this._defineBtn.touchEnabled = true;
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}

class FBselectInfo extends egret.DisplayObjectContainer{
    public id:number;
    private _box:egret.Shape;
    private _boxShape:egret.Shape;
    private _content:egret.TextField;
    public selectType = false;

    constructor(){
        super();

        this._box = new egret.Shape();
        this.addChild(this._box);
        this._box.graphics.beginFill(0x979797);
        this._box.graphics.drawRoundRect(0,0,160,72,20);
        this._box.graphics.endFill();

        this._boxShape = new egret.Shape();
        this.addChild(this._boxShape);
        this._boxShape.graphics.beginFill(0xf5f5f7);
        this._boxShape.graphics.drawRoundRect(1.5,1.5,157,69,20);
        this._boxShape.graphics.endFill();

        this._content = ToolMrg.getText(0,0,28,0x999999,160);
        this.addChild(this._content);
        this._content.height = 72;
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        this._content.verticalAlign = egret.VerticalAlign.MIDDLE;

        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private touchDown(e:egret.TouchEvent):void{
        let item = FBselect.getInstance.numItem;
        this.selectType = !this.selectType;
        if(this.selectType)
            item.Gput(this.id,this.id);
        else{
            if(item.GhasKey(this.id))
                item.GremoveByKey(this.id);
        }

        this.changeCss();
    }

    public aa(content,id):void{
        this.id = id;
        if(content==0)
            this._content.text = `单关`;
        else
            this._content.text = `${content+1}串1`;
    }

    public changeCss():void{
        this._boxShape.graphics.clear();
        if(this.selectType){
            this._content.textColor = 0xffffff;
            this._boxShape.graphics.beginFill(0xF72E52);
            this._boxShape.graphics.drawRoundRect(0,0,160,72,20);
        }else{
            this._content.textColor = 0x999999;
            this._boxShape.graphics.beginFill(0xf5f5f7);
            this._boxShape.graphics.drawRoundRect(1.5,1.5,157,69,20);
        }
        this._boxShape.graphics.endFill();
    }

}