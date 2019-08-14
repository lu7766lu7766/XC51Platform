/**足 串关 */
class SPG1infoTop extends egret.DisplayObjectContainer {
    /**true收起 false展开 默认展开形式 */
    private _type=false;
    private _title:egret.TextField;
    private _topImg:egret.Bitmap;

    /**子类info */
    private _item:GHashMap<SPG1info_subInfo>;
    /**用于列表显示优化当前高度 */
    public hheight:number = 0;
    public hheightTTT:number = 0;

    constructor(){
        super();
        this._item = new GHashMap<SPG1info_subInfo>();

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

    private _data:GHashMap<FootballData>;
    public aa(data:GHashMap<FootballData>,key):void{
        this._data = data;
        this._type = false;
        this._title.text = `${key}  共${data.size}场`;
        this._topImg.x = this._title.x + this._title.textWidth + 8;

        let objHeight = 48;
        this.hheight = 0;
        for(let key of data.keys){
            let obj:SPG1info_subInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new SPG1info_subInfo();
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

    /**之刷新数据 */
    public freshData(data:GHashMap<FootballData>) {
        let obj:SPG1info_subInfo;
        for(let key of data.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key));
            }
        }
    }

    /**列表优化 == 滑动列表*/
    public optimization():void {
        let data:SPG1info_subInfo;
        for(let key of this._item.keys) {
            data = this._item.Gget(key);
            if(this._type == false) {//展开时进行展示
                let yy =  (this.y + data.y) - SPG1Wnd.getInstance.getViewYYTop() ;
                if(yy > -300 && yy < GameMain.getInstance.StageHeight + 300) {
                    if(data.parent == undefined)
                        this.addChild(data);
                } else if(data.parent != undefined){
                    data.parent.removeChild(data);
                }
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
        this.changeImg();
        // SPG1Wnd.getInstance.changeItemHeight();
        SPG1Wnd.getInstance.updateYH();
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

    public getSubItem():GHashMap<SPG1info_subInfo>{
        return this._item;
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,48);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }
}

class SPG1info_subInfo extends egret.DisplayObjectContainer{
    private _team1:egret.TextField;
    private _team2:egret.TextField;
    private _typeText:egret.TextField;
    private _dayOfcodeText:egret.TextField;
    private _endTime:egret.TextField;
    private _lBtn:egret.Bitmap;
    private _rangShape:egret.Bitmap;
    private _norangText:egret.TextField;
    private _rangText:egret.TextField;
    // private _moreShape:egret.Bitmap;
    // private _moreText:egret.TextField;

    /**选中 */
    public strMap:GHashMap<number>;
    private _shapeItem:GHashMap<SPBlock>;

    constructor(){
        super();
        this.addedge();

        this.strMap = new GHashMap<number>();
        this._shapeItem = new GHashMap<SPBlock>();

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

        let vs = ToolMrg.getText(408,27,24,0x999999);
        this.addChild(vs);
        vs.text = "VS";

        this._team1 = ToolMrg.getText(102,20,26,0x333333,250);
        this.addChild(this._team1);
        this._team1.height = 34;
        this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        this._team1.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._team2 = ToolMrg.getText(490,20,26,0x333333);
        this.addChild(this._team2);
        this._team2.height = 34;
        this._team2.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._team1.bold = true;
        this._team2.bold = true;
        
        this._lBtn = new egret.Bitmap();
        this.addChild(this._lBtn);
        this._lBtn.x = 692;
        this._lBtn.y = 18;
        // RES.getResByUrl("resource/assets/images/ui/liao_expert@2x.png",(e)=>{this._lBtn.$setBitmapData(e); },this);

        this._norangText = ToolMrg.getText(160,70,20,0xffffff,40);
        this.addChild(this._norangText);
        this._norangText.height = 56;
        this._norangText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._norangText.textAlign = egret.HorizontalAlign.CENTER;

        this._rangText = ToolMrg.getText(160,130,20,0xffffff,40);
        this.addChild(this._rangText);
        this._rangText.height = 56;
        this._rangText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._rangText.textAlign = egret.HorizontalAlign.CENTER;

        for(let i=0;i<6;i++){
            let obj = new SPBlock(i,136,56);
            this.addChild(obj);
            if(i<3){
                obj.x = 212+140*i;
                obj.y = 70;
            }else{
                obj.y = 130;
                obj.x = 212+140*(i-3);
            }
            this._shapeItem.Gput(i,obj);
        }
        //--边
        this.setDB();
    }

    public removeInterception():void{
        // this._moreShape.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).removeInterception();
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        // if(e.target == this._moreShape){
        //      SPG1more.getInstance.show(this._data,this.strMap);
        // }
    }

    public id;
    private _data:FootballData;
    public aa(data:FootballData):void{
        this._data = data;
        this.id = data.id;

        this._typeText.text = `${data.league_name}`;
        this._dayOfcodeText.text = `${data.day} ${data.code}`;
        this._endTime.text = `截止 ${data.stop}`;
        this._team1.text = `${ToolMrg.nameMode2(8,data.team_a_name)}`;
        this._team2.text = `${ToolMrg.nameMode2(8,data.team_b_name)}`;
        this._rangText.text = `${data.lot_lose}`;
        this._norangText.text = `${data.no_lose}`;

        this._shapeItem.Gget(0).aa(this._data.id,data.listSX[0],`胜 ${data.listSX[0]}`);
        this._shapeItem.Gget(1).aa(this._data.id,data.listSX[1],`平 ${data.listSX[1]}`);
        this._shapeItem.Gget(2).aa(this._data.id,data.listSX[2],`负 ${data.listSX[2]}`);
        this._shapeItem.Gget(3).aa(this._data.id,data.listSX[3],`胜 ${data.listSX[3]}`);
        this._shapeItem.Gget(4).aa(this._data.id,data.listSX[4],`平 ${data.listSX[4]}`);
        this._shapeItem.Gget(5).aa(this._data.id,data.listSX[5],`负 ${data.listSX[5]}`);

        // this._moreShape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).addInterception();
        }
    }

    /**改变样式 */
    public changeText(arr:number[]):void{
        this.strMap.clear();
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).clear();
        }

        if(arr.length>0){
            for(let i=0;i<arr.length;i++){
                this.strMap.Gput(arr[i],arr[i]);
                if(this._shapeItem.Gget(arr[i])){
                    this._shapeItem.Gget(arr[i]).selectType = true;
                    this._shapeItem.Gget(arr[i]).changeCss();
                }
            }
        }

        if(this.strMap.size>0){
            // this._moreText.text = `已选\n中${this.strMap.size}\n项`;
            // this._moreText.textColor = 0xffffff;
        }else{
            // this._moreText.text = `全部\n选项`;
            // this._moreText.textColor = 0x333333;
        }
        let str = this.strMap.size>0?"gdwf_home@2x.png":"gdwf_nor_home@2x.png";
        // RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{this._moreShape.$setBitmapData(e); },this);
    }

    public clear():void{
        for(let key of this._shapeItem.keys){
            this._shapeItem.Gget(key).clear();
        }
        this.strMap.clear();
        this.changeText([]);
    }

    /**边 117高度 */
    private addedge():void{

        let norangShape = new egret.Bitmap();
        this.addChild(norangShape);
        norangShape.x = 160;
        norangShape.y = 70;
        RES.getResByUrl("resource/assets/images/ui/sqiu_home@2x.png",(e)=>{norangShape.$setBitmapData(e); },this);

        this._rangShape = new egret.Bitmap();
        this.addChild(this._rangShape);
        this._rangShape.x = 160;
        this._rangShape.y = 130;
        RES.getResByUrl("resource/assets/images/ui/rqiu_home@2x.png",(e)=>{this._rangShape.$setBitmapData(e); },this);

        // this._moreShape = new egret.Bitmap();
        // this.addChild(this._moreShape);
        // this._moreShape.touchEnabled = true;
        // this._moreShape.x = 644;
        // this._moreShape.y = 70; 
        // RES.getResByUrl("resource/assets/images/ui/gdwf_nor_home@2x.png",(e)=>{this._moreShape.$setBitmapData(e); },this);
        RES.getResByUrl("resource/assets/images/ui/gdwf_home@2x.png",(e)=>{ },this);

        // this._moreText = ToolMrg.getText(644,70,20,0xF72E52,80);
        // this.addChild(this._moreText);
        // this._moreText.height = 116;
        // this._moreText.lineSpacing = 15;
        // this._moreText.verticalAlign = egret.VerticalAlign.MIDDLE;
        // this._moreText.textAlign = egret.HorizontalAlign.CENTER;
        // this._moreText.text = "全部\n选项";

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,208.5,750,1.5);
        shape.graphics.endFill();
    }

    private _mShareC: egret.Bitmap;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 210;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{
            this._mShareC.$setBitmapData(e);
         },this);
		this.addChildAt(this._mShareC, 0);
    }
}