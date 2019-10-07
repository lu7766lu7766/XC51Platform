class ImgRace extends egret.DisplayObjectContainer{
    private static _mInstance: ImgRace;
	public static get getInstance(): ImgRace {
		if (ImgRace._mInstance == undefined)
			ImgRace._mInstance = new ImgRace();
		return ImgRace._mInstance;
	}

    /**经过move方法时false */
    private _isClick=true;
    private _index = 0;

    private _shape:egret.Bitmap;

    private _imgItem:GHashMap<imgInfo>;
    private _spotItem:GHashMap<egret.Bitmap>;
    public imgSrc:string[] = ["xyh750","dnn750","vip750","jiaj750px"]; //10//   //5// 51ad2

    constructor(){
        super();
        RES.getResByUrl(`resource/assets/images/ui/bdxz1_home@2x.png`, (e) => {},this);
        this.touchEnabled = true;
        this._imgItem = new GHashMap<imgInfo>();
        this._spotItem = new GHashMap<egret.Bitmap>();

        this.initialize();

        this._shape = new egret.Bitmap(GResCache.getRes(`resource/assets/images/ui/banner_home.png`));
        this._shape.width = 750;
        this._shape.height = 300;
        // this._shape.graphics.beginFill(0x444444);
        // this._shape.graphics.drawRect(0,0,750,376);
        this.addChild(this._shape);
        this._shape.touchEnabled = true;

        this._shape.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._begin,this);
        this._shape.addEventListener(egret.TouchEvent.TOUCH_TAP,this._touchDown,this);
        this._shape.addEventListener(egret.TouchEvent.TOUCH_END,this._end,this);
        this._shape.addEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);

        this.freshUpdate();
    }

    private _keepTime = 0;
    /**更新   无限循环，一直执行，相当于17毫秒执行一次*/
	private freshUpdate(): void {
		GTimerMag.getInstance.addTimerTask("recommendleftSlip", 99999999, 1000, () => {
            if(egret.getTimer()-this._keepTime>2500 && this._isTouch==false)
			    this.leftSlip();
                // this.rightSlip();
		}, this);
	}

    private _move(e:egret.TouchEvent):void{
        this._isClick = false;
    }

    /**是否在移动过程中 */
    private _isMove=false;
    /**手指是否点在 */
    private _isTouch=false;
    private beginIndex=0;
    private _begin(e:egret.TouchEvent):void{
        this.beginIndex = e.localX;
        if(!this._isMove)
            this._isTouch = true;
    }
    private _end(e:egret.TouchEvent):void{
        if(!this._isMove){
            if(this.beginIndex - e.localX>100){
                this.leftSlip();
            }else if(this.beginIndex - e.localX<-100){
                this.rightSlip();
            }

            if(this.beginIndex - e.localX<100 && this.beginIndex - e.localX>-100){//不滑动
                this._keepTime = egret.getTimer();
                this._isTouch = false;
            }
        }
        // this._shape.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);
        this.beginIndex = 0;
    }
    private _touchDown():void{
        if(this._isClick){
            WorldWnd.getInstance.hide();
            WorldWnd._worldState=1;
            if(this._index==0){//
                ID5.getInstance.show();
            }else if(this._index==1){//
                ID4.getInstance.show();
            }else if(this._index==2){//
                ID6.getInstance.show();
            }else if(this._index==3){//
                ID1.getInstance.show();
            }
        }
        this._isClick = true;
    }

    private _centerNumX=0;
    /**初始化 */
    private initialize():void{
        //刷新图片
        for(let i=0;i<this.imgSrc.length;i++){
            let obj:imgInfo;
            if(this._imgItem.GhasKey(i)){
                obj = this._imgItem.Gget(i);
            }else{
                obj = new imgInfo();
                this._imgItem.Gput(i,obj);
            }
            LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this.imgSrc[i]+".png", (e) => {
				obj.img.$setBitmapData(e);
				obj.img.width = 750;
				obj.img.height = 300;
			}, this);
            obj.x = -750+750*i;
            if(obj.parent==undefined)
                this.addChild(obj);
        }

        this._centerNumX = (GameMain.getInstance.StageWidth - this.imgSrc.length*20)*0.5;
        this._index=1;
        //刷新index下标图片
        for(let i=0;i<this.imgSrc.length;i++){
            let img:egret.Bitmap;
            if(this._spotItem.GhasKey(i)){
                img = this._spotItem.Gget(i);
            }else {
                img = new egret.Bitmap();
                this._spotItem.Gput(i,img);
            }
            RES.getResByUrl(`resource/assets/images/ui/bdxz2_home@2x.png`, (e) => {
                img.$setBitmapData(e);
            },this);
            img.y = 274;
            img.x = this._centerNumX+20*i;
            if(img.parent==undefined)
                this.addChild(img);
        }
        this.changeSpot();
    }

    /**点根据index变化 */
    private changeSpot():void{
        let item = this._spotItem;
        let isBig=false;
        let index=0;
        for(let key of item.keys){
            if(isBig){
                item.Gget(key).x = this._centerNumX + index*20;
            }else{
                item.Gget(key).x = this._centerNumX + index*20; 
            }
            if(key == this._index){
                isBig = true;
                RES.getResByUrl(`resource/assets/images/ui/bdxz1_home@2x.png`, (e) => {
                    item.Gget(key).$setBitmapData(e);
                },this);
            }else{
                RES.getResByUrl(`resource/assets/images/ui/bdxz2_home@2x.png`, (e) => {
                    item.Gget(key).$setBitmapData(e);
                },this);
            }
            index+=1;
        }
    }

    /**左滑  ++ */
    private leftSlip():void{
        this._isMove = true;
        for(let key of this._imgItem.keys){
            let obj = this._imgItem.Gget(key);
            egret.Tween.get(obj).to({x:obj.x-750},400).call((e)=>{
                if(obj.x<-760){
                    obj.x = 750*(this.imgSrc.length-2);
                }
                this._keepTime = egret.getTimer();
                this._isTouch = false;
                this._isMove = false;
            });
        }
        if(this._index == this._imgItem.size-1){
            this._index = 0;
        }else{
            this._index+=1;
        }
        this.changeSpot();
    }

    /**右滑  -- */
    private rightSlip():void{
        this._isMove = true;
        for(let key of this._imgItem.keys){
            let obj = this._imgItem.Gget(key);
            egret.Tween.get(obj).to({x:obj.x + 750},400).call(()=>{
                if(obj.x >750*(this.imgSrc.length-2)){
                    obj.x = -750;
                }
                this._keepTime = egret.getTimer();
                this._isTouch = false;
                this._isMove = false;
            });
        }
        if(this._index == 0){
            this._index = this._imgItem.size-1;
        }else{
            this._index -= 1;
        }
        this.changeSpot();
    }

}

class imgInfo extends egret.DisplayObjectContainer{
    public img:egret.Bitmap;

    constructor(){
        super();

        this.img = new egret.Bitmap();
        this.addChild(this.img);
    }

}