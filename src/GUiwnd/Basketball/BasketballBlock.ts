/**篮球引用 方块Block */
class BasketballBlock extends egret.DisplayObjectContainer{
    private _title:egret.TextField;
    private _content:egret.TextField;
    private _img:egret.Bitmap;
    private _boxColor:number;
    private _boxShapeColor:number;
    /**不直接返回BasketBallWnd */
    private _toGo:number;
    /**是否侦听 */
    private _isInterception=false;
    /**是否选中 */
    public selectType = false;
    /**当前模块所属下标 */
    public _blockIndex = 0;
    /**当前所属id */
    private _id;

    /** 0:lqan2_home@2x.png 1:lqan3_home@2x.png */
    private _typeColor:number;

    private _width = 0;
    private _height = 0;
    /** 当前所属下标 颜色类型 宽度 高度 toGo点击传递数据页面 titley不填默认 contenty不填默认 */
    constructor(index:number,typeColor:number,width:number,height:number,toGo?:number,titleTop?:number,contentTop?:number){
        super();
        this.touchEnabled = true;
        this._height = height;
        this._width = width;
        this._blockIndex = index;
        this._typeColor = typeColor;

        this._img = new egret.Bitmap();
        this.addChild(this._img);
        this._img.width = width;
        this._img.height = height;
        var rect:egret.Rectangle = new egret.Rectangle(10,10,140,60);
        this._img.scale9Grid = rect;

        this._title = ToolMrg.getText(0,21,24,0x333333,width);
        this.addChild(this._title);
        this._title.textAlign = egret.HorizontalAlign.CENTER;
        if(titleTop!=undefined)
            this._title.y = titleTop;

        this._content = ToolMrg.getText(0,55,24,0x999999,width);
        this.addChild(this._content);
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        if(contentTop!=undefined)
            this._content.y = contentTop;

        if(toGo!=null)
            this._toGo = toGo;
        RES.getResByUrl("resource/assets/images/ui/lqan1_home@2x.png",(e)=>{},this);
        this.changeCss();
    }

    /** 0未开盘 */
    private _dataNum:number;
    /**当前所属id */
    public aa(id,num,topText?:string,downText?:string):void{
        this._id = id;
        this._dataNum = num;
        
        if(topText!=null)
            this._title.text = topText;
        if(downText!=null)
            this._content.text = downText;
    }

    public changeCss():void{
        let str = "";
        if(this.selectType){//当前选中
            this._title.textColor = 0xffffff;
            this._content.textColor = 0xffffff;
            str = "lqan1_home@2x.png";
        }else{
            this._title.textColor = 0x333333;
            this._content.textColor = 0x999999;
            str = this._typeColor==0?"lqan2_home@2x.png":"lqan3_home@2x.png";
            // str = "lqan2_home@2x.png";
        }
        RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{this._img.$setBitmapData(e); },this);
    }

    public clear():void{
        this.selectType = false;
        this.changeCss();
    }

    private touchDown(e:egret.TouchEvent):void{
        if(this._dataNum==0){
            Alertpaner.getInstance.show("暂未开盘");
            return;
        }

        let item1 = BasketBallWnd.getInstance.getArrSize();
        let aa = true;
        for(let i=0;i<item1.length;i++){
            if(this._id==item1[i].dlxId)
                aa = false;
        }
        if(item1.length==8){
            if(aa){
                Alertpaner.getInstance.show("最多选择8场赛事");
                return;
            }
        }

        this.selectType = !this.selectType;
        if(this._toGo==0){//篮球串关更多玩法
            B1more.getInstance.addData(this._blockIndex,this.selectType);
        }else if(this._toGo==1){//胜分差
            B5more.getInstance.addData(this._blockIndex,this.selectType);
        }else
            BasketBallWnd.getInstance.changeTextAndData(this._id,this._blockIndex,this.selectType);

        this.changeCss();
    }

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