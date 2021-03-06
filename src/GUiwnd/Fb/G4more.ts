/**更多玩法 比分 */
class G4more extends egret.DisplayObjectContainer{
    private static _mInstance: G4more;
	public static get getInstance(): G4more {
		if (G4more._mInstance == undefined)
			G4more._mInstance = new G4more();
		return G4more._mInstance;
	}
    
    private _mContain:egret.DisplayObjectContainer;
    private _team1:egret.TextField;
    private _team2:egret.TextField;
    private _vs:egret.TextField;
    private _cancelBtn:egret.Bitmap;
    private _defineBtn:egret.Bitmap;
    private _item:GHashMap<Block>;

    private _numItem:GHashMap<number>;

    constructor(){
        super();

        this.touchEnabled = true;
        this._item = new GHashMap<Block>();
        this._numItem = new GHashMap<number>();

        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.touchEnabled = true;

        let bj = new egret.Shape();
        this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0,0,720,720,24);
        bj.graphics.endFill();

        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;

        let shape1 = new egret.Shape();
        this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26,118,40,192,20);
        shape1.graphics.endFill();

        let text1 = ToolMrg.getText(26,118,20,0xffffff,40);
        this._mContain.addChild(text1);
        text1.height = 192;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "胜";

        let shape2 = new egret.Shape();
        this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26,316,40,62,20);
        shape2.graphics.endFill();

        let text2 = ToolMrg.getText(26,316,20,0xffffff,40);
        this._mContain.addChild(text2);
        text2.height = 62;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "平";

        let shape3 = new egret.Shape();
        this._mContain.addChild(shape3);
        shape3.graphics.beginFill(0x6EC858);
        shape3.graphics.drawRoundRect(26,384,40,192,20);
        shape3.graphics.endFill();

        let text3 = ToolMrg.getText(26,384,20,0xffffff,40);
        this._mContain.addChild(text3);
        text3.height = 192;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.textAlign = egret.HorizontalAlign.CENTER;
        text3.text = "负";

        this._team1 = ToolMrg.getText(70,38,32,0x333333,200);
        this._mContain.addChild(this._team1);
        this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        this._team1.bold = true;

        this._team2 = ToolMrg.getText(454,38,32,0x333333);
        this._mContain.addChild(this._team2);
        this._team2.bold = true;

        this._vs = ToolMrg.getText(346,45,24,0x999999);
        this._mContain.addChild(this._vs);
        this._vs.bold = true;
        this._vs.text = "VS";

        this._cancelBtn = new egret.Bitmap();
        this._mContain.addChild(this._cancelBtn);
        this._cancelBtn.touchEnabled = true;
        this._cancelBtn.x = 66;
        this._cancelBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._cancelBtn.$setBitmapData(e); },this);

        this._defineBtn = new egret.Bitmap();
        this._mContain.addChild(this._defineBtn);
        this._defineBtn.touchEnabled = true;
        this._defineBtn.x = 382;
        this._defineBtn.y = 602;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._defineBtn.$setBitmapData(e); },this);

        let cancelText = ToolMrg.getText(74,627,32,0x333333,276);
        this._mContain.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";

        let defineText = ToolMrg.getText(382,627,32,0xffffff,276);
        this._mContain.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";

        this.joinBlock();
        this.setDB();
    }

    private _rang:number;
    private _id;
    private _obj:FootballData;
    public show(obj:FootballData,data:GHashMap<number>):void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        for(let key of data.keys){//不能直接=，会导致地址一样
            this._numItem.Gput(key,data.Gget(key));
        }
        this._obj = obj;
        this._id = obj.id;
        this._team1.text = this._obj.team_a_name;
        this._team2.text = this._obj.team_b_name;

        this.startDataOfCss();
        this.upThisValue(obj.id,obj.listSX);
     }

    //进入时显示选中
    private startDataOfCss():void{
        for(let key of this._numItem.keys){
            let obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    }

     /**如果返回id与点进id不匹配则不刷新 */
    public upThisValue(id,data:number[]):void{
        if(id!=this._id){
            Alertpaner.getInstance.show("返回比赛id不匹配");
            this.hide();
            return;
        }

        for(let i=6;i<37;i++){
            this._item.Gget(i).aa(this._obj.id,data[i],null,null,data[i]);
        }

    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this.clearDataOfCss();
            for(let key of this._item.keys){
                this._item.Gget(key).aa(this._obj.id,null,null,null,"");
            }
        }
        // CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List_More, this.updateData, this);
    }

    //hide时清理数值
    private clearDataOfCss():void{
        for(let key of this._item.keys){
            let obj = this._item.Gget(key);
            obj.selectType = false;
            obj.changeCss();
        }
        this._numItem.clear();
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0x1f1f1f, 0.5);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }

    private joinBlock():void{
        //6-17
        let bjTop=0;
        for(let i=6;i<18;i++){
            let obj = new Block(i,120,62,null,null,1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(bjTop<5){
                obj.y = 118;
                obj.x = 78+124*bjTop;
            }else if(bjTop<10){
                obj.y = 184;
                obj.x = 78+124*(bjTop-5);
            }else{
                obj.y = 250;
                obj.x = 78+124*(bjTop-10);
            }
            bjTop+=1;
        }
        //18
        let obj18 = new Block(18,368,62,null,null,1);
        obj18.x = 326;
        obj18.y = 250;
        this._mContain.addChild(obj18);
        this._item.Gput(obj18.index,obj18);
        //19-23
        for(let i=19;i<24;i++){
            let obj = new Block(i,120,62,null,null,1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            obj.y = 316;
            obj.x = 78+124*(i-19);
        }
        //24-35
        let bjDown=0;
        for(let i=24;i<36;i++){
            let obj = new Block(i,120,62,null,null,1);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(bjDown<5){
                obj.y = 382;
                obj.x = 78+124*bjDown;
            }else if(bjDown<10){
                obj.y = 448;
                obj.x = 78+124*(bjDown-5);
            }else{
                obj.y = 514;
                obj.x = 78+124*(bjDown-10);
            }
            bjDown+=1;
        }
        //36
        let obj36 = new Block(36,368,62,null,null,1);
        obj36.x = 326;
        obj36.y = 514;
        this._mContain.addChild(obj36);
        this._item.Gput(obj36.index,obj36);

        for(let i=6;i<37;i++){
            this._item.Gget(i).aa(null,null,null,FootballDataMrg.getInstance.fbNameItem[i]);
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._defineBtn){
            OnePass.getInstance.upChangeSubMore(this._id,this._numItem);
        }
        this.hide();
    }

    public changeNumItem(index:number,isboom:Boolean):void{
        if(isboom){//添加
            this._numItem.Gput(index,index);
        }else{//删除
            if(this._numItem.GhasKey(index))
                this._numItem.GremoveByKey(index);
        }
    }

    private addInterception():void{
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).addInterception();
        }
    }

    private removeInterception():void{
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).removeInterception();
        }
    }
}