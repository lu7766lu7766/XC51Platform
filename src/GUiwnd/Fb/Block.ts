/**方块id 长度 高度 居中内容 上、下内容 上内容y轴 下内容y轴 */
class Block extends egret.DisplayObjectContainer{
    public id;
    public index:number;
    public selectType = false;
    private _text:egret.TextField;
    private _topText:egret.TextField;
    private _downText:egret.TextField;
    private _img:egret.Bitmap;
    private _height;
    private _width;
    /**特殊引用 */
    private _special:number;

    private _typeImg:number;

    constructor(index:number,width:number,height:number,topY?,downY?,special?:number,typeImg?:number){
        super();
        this.touchEnabled = true;
        this.index = index;
        this._width = width;
        this._height = height;
        this._special = special;

        // this._typeImg = typeImg;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = width;
        this._img.height = height;
        var rect:egret.Rectangle = new egret.Rectangle(20,27,380,50);
        this._img.scale9Grid =rect;

        if(this._typeImg==undefined)
            RES.getResByUrl("resource/assets/images/ui/bfbg_nor_home@2x.png",(e)=>{this._img.$setBitmapData(e); },this);
        else
            RES.getResByUrl("resource/assets/images/ui/xx_nor_home@2x.png",(e)=>{this._img.$setBitmapData(e); },this);
        RES.getResByUrl("resource/assets/images/ui/bfbg_home@2x.png",(e)=>{ },this);

        this._text = ToolMrg.getText(1.5,1.5,24,0x333333,width-3);
        this.addChild(this._text);
        this._text.height = height-3;
        this._text.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._text.textAlign = egret.HorizontalAlign.CENTER;
    
        this._topText = ToolMrg.getText(1.5,7,24,0x333333,width-3);
        this.addChild(this._topText);
        this._topText.textAlign = egret.HorizontalAlign.CENTER;
        if(topY!=undefined)
            this._topText.y = topY;

        this._downText = ToolMrg.getText(1.5,36,20,0x333333,width-3);
        this.addChild(this._downText);
        this._downText.textAlign = egret.HorizontalAlign.CENTER;
        if(downY!=undefined)
            this._downText.y = downY;

        // this.anchorOffsetX = this.width*0.5;
        // this.anchorOffsetY = this.height*0.5;
    }

    //值发生变化的展示动态效果
    public dynamicFun():void{
        egret.Tween.get(this).to({scaleX:0.8,scaleY:0.8},200).call(function(){
            egret.Tween.get(this).to({scaleX:1,scaleY:1},200);
        });
    }

    /**如果是0 提示暂未开盘 */
    private _dataNum:number;
    public aa(id,num,text?,top?,down?):void{
        this._dataNum = num;
        this.id = id;
        if(text!=undefined)
            this._text.text = text;
        if(top!=undefined)
            this._topText.text = top;
        if(down!=undefined)
            this._downText.text = down;
    }

    public clear():void{
        this.selectType = false;
        this.changeCss();
    }

    public changeCss():void{
        // this.dynamicFun();
        let num:number;
        if(this.selectType){//选中
            num = 0xffffff;
        }else{//未选中
            num = 0x333333;
        }
        let str = "";

        if(this.selectType){
            str = "bfbg_home@2x.png";
        }else{
            if(this._typeImg!=undefined){
                str = "xx_nor_home@2x.png";
            }else{
                str = "bfbg_nor_home@2x.png";
            }
        }

        RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{this._img.$setBitmapData(e); },this);
        this._topText.textColor = num;
        this._downText.textColor = num;
        this._text.textColor = num;
    }

    private touchDown(e:egret.TouchEvent):void{
        if(this._dataNum==0){
            Alertpaner.getInstance.show("暂未开盘");
            return;
        }
        
        let item1 = G1Wnd.getInstance.getArrSize();
        let item2 = OnePass.getInstance.getArrSize();
        let aa = true;
        for(let i=0;i<item1.length;i++){
            if(this.id==item1[i].dlxId)
                aa = false;
        }
        for(let i=0;i<item2.length;i++){
            if(this.id==item2[i].dlxId)
                aa = false;
        }
        if(item1.length==8 || item2.length==8){
            if(aa){
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
        }

        this.selectType = !this.selectType;
        this.changeCss();
        if(this._special==0){
            G1more.getInstance.changeNumItem(this.index,this.selectType);
        }else if(this._special==1){
            G4more.getInstance.changeNumItem(this.index,this.selectType);
        }else if(this._special == null){
            if(FbWnd.inIndex==0){//足球串关更多玩法
                G1Wnd.getInstance.changeTextAndData(this.id,this.index,this.selectType);
            }else{//单关 进球数 半全场
                OnePass.getInstance.changeTextAndData(this.id,this.index,this.selectType);
            }
        }
        // }else if(this._toGo==1){//胜分差
        //     B5more.getInstance.addData(this._blockIndex,this.selectType);
        // }else
            // BasketBallWnd.getInstance.changeTextAndData(this._id,this._blockIndex,this.selectType);
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception(){
        if(this._isInterception){
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }
}