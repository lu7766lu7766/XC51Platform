class WorldTopImg extends egret.DisplayObjectContainer{
    private static _mInstance: WorldTopImg;
	public static get getInstance(): WorldTopImg {
		if (WorldTopImg._mInstance == undefined)
			WorldTopImg._mInstance = new WorldTopImg();
		return WorldTopImg._mInstance;
	}

    public imgItem = ["banner_home@2x","banner_home@2x","banner_home@2x","banner_home@2x","banner_home@2x","banner_home@2x","banner_home@2x","banner_home@2x"];
    private _item:GHashMap<egret.Bitmap>;
    /**当前下标 */
    private _index = 1;
    private _shape:egret.Shape;

    constructor(){
        super();
        this.touchEnabled = true;
        this._item = new GHashMap<egret.Bitmap>();

        this._shape = new egret.Shape();
        this.addChild(this._shape);

        this.initializeImg();

        this._shape.graphics.beginFill(0xffffff,0.001);
        this._shape.graphics.drawRect(46,18,660,284);
        this._shape.graphics.endFill();
        this._shape.touchEnabled = true;
        this._shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._begin,this);
        this._shape.addEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);
        this._shape.addEventListener(egret.TouchEvent.TOUCH_END,this._end,this);

        this.setDB();
    }

    public isMove=false;
    private beginIndex=0;
    private _begin(e:egret.TouchEvent):void{
        this.beginIndex = e.localX;
    }

    private _move(e:egret.TouchEvent):void{
        // egret.log(`${this.beginIndex} : ${this.beginIndex - e.localX} : ${e.localX}`);
    }

    private _end(e:egret.TouchEvent):void{
        if(!this.isMove){
            if(this.beginIndex - e.localX>100){
                this.leftSlip();
            }else if(this.beginIndex - e.localX<-100){
                this.rightSlip();
            }
        }
    }

    /**左滑  ++ */
    private leftSlip():void{
        if(this._index == this._item.size-1)return;
        this.isMove = true;
        this._index+=1;

        for(let key of this._item.keys){
            let obj = this._item.Gget(key);

            if(key == this._index){
                egret.Tween.get(obj).to({x:51,height:280,width:648,y:(320-280)*0.5},400);
            }else{
                egret.Tween.get(obj).to({x:obj.x - 648*0.94 - 36,height:280*0.94,width:648*0.94,y:(320-280*0.94)*0.5},400)
            }
        }
        setTimeout(function(){
            WorldTopImg.getInstance.isMove = false;
        }, 420);
    }

    /**右滑  -- */
    private rightSlip():void{
        if(this._index == 0)return;
        this._index-=1;
        this.isMove = true;

        for(let key of this._item.keys){
            let obj = this._item.Gget(key);

            if(key == this._index){
                egret.Tween.get(obj).to({x:51,height:280,width:648,y:(320-280)*0.5},400);
            }else{
                if(Number(key)-1 == this._index){//上一个是大图片，特殊处理
                    egret.Tween.get(obj).to({x:obj.x + 648 + 36,height:280*0.94,width:648*0.94,y:(320-280*0.94)*0.5},400)
                }else{
                    egret.Tween.get(obj).to({x:obj.x + 648*0.94 + 36,height:280*0.94,width:648*0.94,y:(320-280*0.94)*0.5},400);
                }
            }
        }
        setTimeout(function(){
            WorldTopImg.getInstance.isMove = false;
        }, 420);
    }

    /**初始化图片 */
    public initializeImg():void{
        let objWidth = -648*0.94+14;
        for(let i=0;i<this.imgItem.length;i++){
            let obj = new egret.Bitmap();
            RES.getResByUrl(`resource/assets/images/ui/${this.imgItem[i]}.png`,(e)=>{
                obj.$setBitmapData(e);
            },this);
            this.addChild(obj);
            this._item.Gput(i,obj);
            if(this._index == i){//大
                obj.width = 648;
                obj.height = 280;
            }else{//小
                obj.width = 648*0.94;
                obj.height = 280*0.94;
            }
            obj.y = (320 - obj.height)*0.5;
            obj.x = objWidth;
            objWidth = objWidth + 36 + obj.width;
        }

    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF3F3F3, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,320);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}

class TopImg extends egret.DisplayObjectContainer{
    private _img:egret.Bitmap;
    private id;

    constructor(imgsrc,id){
        super();
        this.id = id;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        RES.getResByUrl(`resource/assets/images/ui/${imgsrc}.png`,(e)=>{
            this._img.$setBitmapData(e);
        },this);
    }

    public SmallImg():void{
        this._img.width = 648*0.94;
        this._img.height = 280*0.94;
    }

    public BigImg():void{
        this._img.width = 648;
        this._img.height = 280;
    }

    public getImgWidth():number{
        return  this._img.width;
    }

    public getImg():egret.Bitmap{
        return this._img;
    }

}