/**篮 串关 */
class B3infoTop extends egret.DisplayObjectContainer{
    /**true收起 false展开 默认展开形式 */
    private _type=false;
    private _title:egret.TextField;
    private _topImg:egret.Bitmap;

    /**子类info */
    private _item:GHashMap<B3info_subInfo>;
    /**用于列表显示优化当前高度 */
    public hheight:number = 0;
    public hheightTTT:number = 0;

    constructor(){
        super();

        this._item = new GHashMap<B3info_subInfo>();

        this._title = ToolMrg.getText(244+5,0,20,0x333333);
        this.addChild(this._title);
        this._title.height = 48;
        this._title.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._topImg = new egret.Bitmap();
        this.addChild(this._topImg);
        this._topImg.x = 484+5;
        this._topImg.y = 20;
        // RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png",(e)=>{
        //     this._topImg.$setBitmapData(e);
        // },this);
        
        this.setDB();
    }

    private _topImgX=0;
    private _data:GHashMap<BasketballData>;
    public aa(data:GHashMap<BasketballData>,key):void{
        this._data = data;
        this._type = false;
        this._title.text = `${key}  共${data.size}场`;
        this._topImg.x = this._title.x + this._title.textWidth + 8;
        this._topImgX = this._topImg.x;//记录当前x

        let objHeight = 48;
        this.hheight = 0;
        for(let key of data.keys){
            let obj:B3info_subInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new B3info_subInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(data.Gget(key));
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            // if(obj.parent==undefined)
            //     this.addChild(obj);
        }
        if(this._type == false) {
            this.hheight = objHeight;
            this.hheightTTT = objHeight
        } else {
            this.hheight = this.height;
        }
        ToolMrg.upItemofGHashMap(this._item,data);
        this.changeImg();
    }

    /**列表优化 == 滑动列表*/
    public optimization():void {
        let data:B3info_subInfo;
        for(let key of this._item.keys) {
            data = this._item.Gget(key);
            if(this._type == false) {//展开时进行展示
                let yy =  (this.y + data.y) - B3Wnd.getInstance.getViewYYTop() ;
                if(yy > -300 && yy < GameMain.getInstance.StageHeight + 300) {
                    if(data.parent == undefined)
                        this.addChild(data);
                } else if(data.parent != undefined){
                    data.parent.removeChild(data);
                }
            }
        }
    }

    /**之刷新数据 */
    public freshData(data:GHashMap<BasketballData>) {
        let obj:B3info_subInfo;
        for(let key of data.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key));
            }
        }
    }

    //收起 展开显示
    private changeUpDown():void{
        if(this._type){//展开
            this._type = false;
            this.hheight = this.hheightTTT;
            for(let key of this._item.keys){
                let obj = this._item.Gget(key);
                if(obj.parent==undefined)
                    this.addChild(obj);
            }
        }else{//收起
            this._type = true;
            this.hheight = 48;
            for(let key of this._item.keys){
                let obj = this._item.Gget(key);
                if(obj.parent!=undefined)
                    this.removeChild(obj);
            }
        }
        // B3Wnd.getInstance.changeItemHeight();
        this.changeImg();
        B3Wnd.getInstance.updateYH();
    }

    private changeImg():void{
        if(this._type)
            RES.getResByUrl("resource/assets/images/ui/xiala_nav@2x.png",(e)=>{this._topImg.$setBitmapData(e);},this);
        else
            RES.getResByUrl("resource/assets/images/ui/shouqi_nav@2x.png",(e)=>{this._topImg.$setBitmapData(e);},this);
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.changeUpDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        this._type = false;
        if(this._isInterception){
            this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.changeUpDown,this);
            this._isInterception = false;
        }
    }

    public getSubItem():GHashMap<B3info_subInfo>{
        return this._item;
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,48);
        this._mShareC.graphics.endFill()
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }
}

class B3info_subInfo extends egret.DisplayObjectContainer{
    private _typeText:egret.TextField;
    private _dayOfcodeText:egret.TextField;
    private _endTime:egret.TextField;
    
    private _shapeItem:GHashMap<BasketballBlock>;

    constructor(){
        super();
        this.addedge();

        this._shapeItem = new GHashMap<BasketballBlock>();

        this._typeText = ToolMrg.getText(26,24,24,0xff7000);
        this.addChild(this._typeText);
        this._typeText.height = 34;
        this._typeText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._dayOfcodeText = ToolMrg.getText(26,86,20,0x999999);
        this.addChild(this._dayOfcodeText);
        this._dayOfcodeText.height = 28;
        this._dayOfcodeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        
        this._endTime = ToolMrg.getText(26,140,20,0x999999);
        this.addChild(this._endTime);
        this._endTime.height = 28;
        this._endTime.verticalAlign = egret.VerticalAlign.MIDDLE;

        let zhu = ToolMrg.getText(394,77,24,0x333333);
        this.addChild(zhu);
        zhu.text = "VS";

        for(let i=0;i<2;i++){
            let obj = new BasketballBlock(i,1,160,80,null,7,45);
            this._shapeItem.Gput(i,obj);
            this.addChild(obj);
            obj.x = 196+i*260;
            obj.y = 58;
        }

        //--边
        this.setDB();
    }
    public id;
    private _data:BasketballData;
    public aa(data:BasketballData):void{
        this._data = data;
        this.id = data.id;

        this._typeText.text = `${data.league_name}`;
        this._dayOfcodeText.text = `${data.day} ${data.code}`;
        this._endTime.text = `截止 ${data.stop}`;

        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).addInterception();
        }

        this._shapeItem.Gget(0).aa(data.id,data.listSX[0],data.team_a_name,`客胜${data.listSX[0]}`);
        this._shapeItem.Gget(1).aa(data.id,data.listSX[1],data.team_b_name,`主胜${data.listSX[1]}`);
    }

    public clear():void{
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).clear();
        }
    }

    public changeText(num:number[]):void{

    }

    /**边 117高度 */
    private addedge():void{
        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,203.5,750,1.5);
        shape.graphics.endFill()
    }

    private _mShareC: egret.Bitmap;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 206;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{
            this._mShareC.$setBitmapData(e);
         },this);
		this.addChildAt(this._mShareC, 0);
    }

    public removeInterception():void{
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).removeInterception();
        }
    }
}