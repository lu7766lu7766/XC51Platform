class ImgRace1 extends egret.DisplayObjectContainer{
    private static _mInstance: ImgRace1;
	public static get getInstance(): ImgRace1 {
		if (ImgRace1._mInstance == undefined)
			ImgRace1._mInstance = new ImgRace1();
		return ImgRace1._mInstance;
	}

    /**经过move方法时false */
    private _isClick=true;
    private _index = 0;

    private _imgItem:GHashMap<imgInfo>;
    private _spotItem:GHashMap<egret.Bitmap>;
    public imgSrc:string[] = ["page4","page1","page2","page3"];

    private bg: egret.Bitmap;
	private bnt: egret.Bitmap;

    /**滑动触摸屏 */
	private _mBGMove: egret.Bitmap;

    constructor(){
        super();
        RES.getResByUrl(`resource/assets/images/ui/point_g.png`, (e) => {},this);
        this.touchEnabled = true;
        this._imgItem = new GHashMap<imgInfo>();
        this._spotItem = new GHashMap<egret.Bitmap>();
        
        this.initialize();
        this.setDB();
        this._mShareC.touchEnabled = true;
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this._begin,this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_END,this._end,this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);

        let shareC = new egret.Shape();
		shareC.graphics.beginFill(0xffffff, 1);
		shareC.graphics.drawRect(0, GameMain.getInstance.StageHeight - 141, GameMain.getInstance.StageWidth, 141);
		shareC.graphics.endFill();
		this.addChildAt(shareC, 2);

		if (this.bnt == undefined) {
			this.bnt = new egret.Bitmap();
			this.bnt.x = 211;
			this.bnt.y = GameMain.getInstance.StageHeight - 106;
			RES.getResByUrl("resource/assets/images/ui/btn_join.png", (e) => { this.bnt.$setBitmapData(e); }, this);
		}
		this.bnt.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onclick, this);
		this.bnt.touchEnabled=true;
		this.addChild(this.bnt);

        this._mBGMove = new egret.Bitmap();
        this._mBGMove.y = -136;
		RES.getResByUrl('resource/assets/images/ui/join_bg.jpg', (e) => { this._mBGMove.$setBitmapData(e); }, this);
		this.addChildAt(this._mBGMove, 1);
        // this.freshUpdate();
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, -this.y, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
		this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
	}

    private onclick() {
        KeFuWnd.getInstance.show(true);
	}

    // private _keepTime = 0;
    // /**更新   无限循环，一直执行，相当于17毫秒执行一次*/
	// private freshUpdate(): void {
	// 	GTimerMag.getInstance.addTimerTask("recommendleftSlip", 99999999, 1000, () => {
    //         if(egret.getTimer()-this._keepTime>2500 && this._isTouch==false)
	// 		    this.leftSlip();
    //             // this.rightSlip();
	// 	}, this);
	// }

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
                // this._keepTime = egret.getTimer();
                this._isTouch = false;
            }
        }
        // this._shape.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this._move,this);
        this.beginIndex = 0;
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
            obj.touchEnabled = false;
            LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this.imgSrc[i]+".png", (e) => {
				obj.img.$setBitmapData(e);
			}, this);
            obj.x = -750+750*i;
            obj.y = -136;
            if(obj.parent==undefined)
                this.addChild(obj);
        }

        this._centerNumX = (GameMain.getInstance.StageWidth - this.imgSrc.length*20)*0.5;
        this._index=0;
        //刷新index下标图片
        for(let i=0;i<this.imgSrc.length;i++){
            let img:egret.Bitmap;
            if(this._spotItem.GhasKey(i)){
                img = this._spotItem.Gget(i);
            }else {
                img = new egret.Bitmap();
                this._spotItem.Gput(i,img);
            }
            RES.getResByUrl(`resource/assets/images/ui/point_g.png`, (e) => {
                img.$setBitmapData(e);
            },this);
            img.x = this._centerNumX+60*i - 60;
            img.y = GameMain.getInstance.StageHeight - 404 + 200
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
                item.Gget(key).x = this._centerNumX + index*60  - 60;
            }else{
                item.Gget(key).x = this._centerNumX + index*60  - 60; 
            }
            if(key == this._index){
                isBig = true;
                RES.getResByUrl(`resource/assets/images/ui/point_r.png`, (e) => {
                    item.Gget(key).$setBitmapData(e);
                },this);
            }else{
                RES.getResByUrl(`resource/assets/images/ui/point_g.png`, (e) => {
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
                // this._keepTime = egret.getTimer();
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
                // this._keepTime = egret.getTimer();
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

    public show():void {
        if (this.parent == undefined) {
            GUIManager.getInstance.topLay.addChild(this); 
        }
    }

    //隐藏
	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}

}