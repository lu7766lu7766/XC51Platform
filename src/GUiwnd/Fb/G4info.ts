/**足 比分 */
class G4infoTop extends egret.DisplayObjectContainer{
    /**true收起 false展开 默认展开形式 */
    private _type=false;
    private _title:egret.TextField;
    private _topImg:egret.Bitmap;

    /**子类info */
    private _item:GHashMap<G4info_subInfo>;
    /**用于列表显示优化当前高度 */
    public hheight:number = 0;
    public hheightTTT:number = 0;

    constructor(){
        super();
        this._item = new GHashMap<G4info_subInfo>();

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
    private _data:GHashMap<FootballData>;
    public aa(data:GHashMap<FootballData>,key):void{
        this._data = data;
        this._type = false;
        this._title.text = `${key}  共${data.size}场`;
        this._topImg.x = this._title.x + this._title.textWidth + 8;
        this._topImgX = this._topImg.x;//记录当前x

        let objHeight = 48;
        for(let key of data.keys){
            let obj:G4info_subInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new G4info_subInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(data.Gget(key),true);
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
        let data:G4info_subInfo;
        for(let key of this._item.keys) {
            data = this._item.Gget(key);
            if(this._type == false) {//展开时进行展示
                let yy =  (this.y + data.y) - G4Wnd.getInstance.getViewYYTop() ;
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
    public freshData(data:GHashMap<FootballData>) {
        let obj:G4info_subInfo;
        for(let key of data.keys){
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
                obj.aa(data.Gget(key),false);
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
        // G4Wnd.getInstance.changeItemHeight();
        this.changeImg();
        G4Wnd.getInstance.updateYH();
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

    public getSubItem():GHashMap<G4info_subInfo>{
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

class G4info_subInfo extends egret.DisplayObjectContainer{
    private _team1:egret.TextField;
    private _team2:egret.TextField;
    private _typeText:egret.TextField;
    private _dayOfcodeText:egret.TextField;
    private _endTime:egret.TextField;
    private _lBtn:egret.Bitmap;

    private _boxShape:egret.Bitmap;
    private _boxText:egret.TextField;

    /**选中 */
    public strMap:GHashMap<number>;

    constructor(){
        super();
        this.addedge();

        this.strMap = new GHashMap<number>();

        let danImg = new egret.Bitmap();
        this.addChild(danImg);
        RES.getResByUrl("resource/assets/images/ui/djb_home@2x.png",(e)=>{danImg.$setBitmapData(e); },this);

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

        
        //--边
        this.setDB();
    }
    public id;
    private _data:FootballData;
    public aa(data:FootballData, isFresh:boolean):void{
        this._data = data;
        this.id = data.id;

        this._typeText.text = `${data.league_name}`;
        this._dayOfcodeText.text = `${data.day} ${data.code}`;
        this._endTime.text = `截止 ${data.stop}`;
        this._team1.text = `${ToolMrg.nameMode2(8,data.team_a_name)}`;
        this._team2.text = `${ToolMrg.nameMode2(8,data.team_b_name)}`;
        this.addInterception();
        if(isFresh == true)
            this.changeText([]);
    }

    public clear():void{
        this.changeText([]);
    }

    public changeText(arr:number[]):void{
        this.strMap.clear();
        if(arr.length>0){
            for(let i=0;i<arr.length;i++){
                this.strMap.Gput(arr[i],arr[i]);
            }
        }

        if(this.strMap.size>0){
            this._boxText.textColor = 0xffffff;
            let str = "";
            let a = true;
            for(let key of this.strMap.keys){
                if(a){
                    str = FootballDataMrg.getInstance.fbNameItem[this.strMap.Gget(key)];
                }else{
                    str = str+","+FootballDataMrg.getInstance.fbNameItem[this.strMap.Gget(key)];
                }
                a=false;
            }
            this._boxText.text = str;
        }else{
            this._boxText.textColor = 0xf72e52;
            this._boxText.text = "点击选择比分投注";
        }

        let str = this.strMap.size>0?"bfbg_home@2x.png":"bfbg_nor_home@2x.png";
        RES.getResByUrl("resource/assets/images/ui/"+str,(e)=>{this._boxShape.$setBitmapData(e); },this);
        this._boxText.text = ToolMrg.nameMode2(12,this._boxText.text);
    }

    /**边 117高度 */
    private addedge():void{

        this._boxShape = new egret.Bitmap();
        this.addChild(this._boxShape);
        this._boxShape.x = 214;
        this._boxShape.y = 86;
        RES.getResByUrl("resource/assets/images/ui/bfbg_nor_home@2x.png",(e)=>{this._boxShape.$setBitmapData(e); },this);

        this._boxText = ToolMrg.getText(214,86,28,0xF72E52,420);
        this.addChild(this._boxText);
        this._boxText.height = 88;
        this._boxText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._boxText.textAlign = egret.HorizontalAlign.CENTER;
        this._boxText.text = "点击选择比分投注";

        let shape = new egret.Shape();
        this.addChild(shape);
        shape.graphics.beginFill(0xdedede);
        shape.graphics.drawRect(0,223.5,750,1.5);
        shape.graphics.endFill();

        this._boxShape.touchEnabled = true;
    }

    private _isInterception = false;
    public addInterception():void{
        if(!this._isInterception){
            this._boxShape.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = true;
        }
    }

    public removeInterception():void{
        if(this._isInterception){
            this._boxShape.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isInterception = false;
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        G4more.getInstance.show(this._data,this.strMap);
    }

    private _mShareC: egret.Bitmap;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Bitmap();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 225;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{
            this._mShareC.$setBitmapData(e);
         },this);
		this.addChildAt(this._mShareC, 0);
    }
}