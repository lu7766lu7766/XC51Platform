/**更多玩法 串关 */
class G1more extends egret.DisplayObjectContainer{
    private static _mInstance: G1more;
	public static get getInstance(): G1more {
		if (G1more._mInstance == undefined)
			G1more._mInstance = new G1more();
		return G1more._mInstance;
	}

    private _topUI:TopUI;
    private _return:egret.Shape;

    private _mContain:egret.DisplayObjectContainer;
    private _scroView:egret.ScrollView;
    private _item:GHashMap<Block>;

    private _numItem:GHashMap<number>;
    private _downContain:egret.DisplayObjectContainer;

    constructor(){
        super();

        this.touchEnabled = true;
        this._numItem = new GHashMap<number>();
        this._item = new GHashMap<Block>();
        this._topUI = new TopUI("");
        this.addChild(this._topUI);
        this._return = this._topUI.getReturn();
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
            this.hide();
        },this);

        this._mContain = new egret.DisplayObjectContainer();
        this.addScoll();
        this.joinBlock();
        this.joinCenter();
        this.joinDown();

        this.setDB();
    }

    /**如果返回id与点进id不匹配则不刷新 */
    public upThisValue(id,data:number[]):void{
        if(id!=this._id){
            Alertpaner.getInstance.show("返回比赛id不匹配");
            this.hide();
            return;
        }
        this._item.Gget(0).aa(this._obj.id,data[0],`胜 ${data[0]}`);
        this._item.Gget(1).aa(this._obj.id,data[1],`平 ${data[1]}`);
        this._item.Gget(2).aa(this._obj.id,data[2],`负 ${data[2]}`);
        this._item.Gget(3).aa(this._obj.id,data[3],`胜 ${data[3]}`);
        this._item.Gget(4).aa(this._obj.id,data[4],`平 ${data[4]}`);
        this._item.Gget(5).aa(this._obj.id,data[5],`负 ${data[5]}`);

        for(let i=6;i<data.length;i++){
            this._item.Gget(i).aa(this._obj.id,null,null,null,data[i]);
        }

    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._Define){//同步数据
            G1Wnd.getInstance.upChangeSubMore(this._id,this._numItem);
        }
        this.hide();
    }

    //进入时显示选中
    private startDataOfCss():void{
        for(let key of this._numItem.keys){
            let obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    }

    private _rang:number;
    private _id;
    private _obj:FootballData;
    /**传入id:id 已选中数组:GHashMap<number> 和比赛队伍标题:xxx vs xxx 让球数:-1 */
    public show(obj:FootballData,data:GHashMap<number>):void{
        GUIManager.getInstance.tipLay.addChild(this);
        for(let key of data.keys){//不能直接=，会导致地址一样
            this._numItem.Gput(key,data.Gget(key));
        }
        this._obj = obj;
        this._id = obj.id;
        this._topUI.changeTitle(`${obj.team_a_name} vs ${obj.team_b_name}`);
        this._rangShape.graphics.clear();
        this._rang = obj.lot_lose;
        if(this._rang==undefined||this._rang==0){
            this._rangText.text = "";
        }else{
            this._rangShape.graphics.beginFill(0x6ec858);
            this._rangShape.graphics.drawRect(40,84,40,56);
            this._rangText.text = ""+this._rang;
        }
        this._rangShape.graphics.endFill();
        this.startDataOfCss();
        this.upThisValue(obj.id,obj.listSX);
        this.addInterception();

        //请求一次更多信息
        FT_List_More.getInstance.sendHttp(obj.id);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_FT_List_More, this.updateData, this);

    }

    private updateData():void {
        if(this._obj != undefined)
            this.upThisValue(this._obj.id,this._obj.listSX);
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.clearDataOfCss();
            this.removeInterception();
            this._scroView.setScrollTop(0);
            for(let key of this._item.keys){
                this._item.Gget(key).aa(this._obj.id,null,null,null,"");
            }
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_FT_List_More, this.updateData, this);
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

    private addScoll(): void {
		this._scroView = new egret.ScrollView();
		this._scroView.x = 0;
		this._scroView.y = 96+GameValue.adaptationScreen;
		this._scroView.scrollSpeed = 0.4;
		//设置滚动内容
		this._scroView.setContent(this._mContain);
		this._scroView.bounces = false;
		this._scroView.verticalScrollPolicy = 'on';
		this._scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		this._scroView.width = GameMain.getInstance.StageWidth;
		this._scroView.height = GameMain.getInstance.StageHeight - this.y - 100 - this._scroView.y;
		this.addChild(this._scroView);
	}

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);

        let mShape = new egret.Shape();
        mShape.graphics.beginFill(0xffffff, 1);
		mShape.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,1100);
        mShape.graphics.endFill();
		this._mContain.addChildAt(mShape, 0);
    }

    private _rangShape:egret.Shape;
    private _rangText:egret.TextField;
    private joinCenter():void{
        this._rangShape = new egret.Shape();
        this._mContain.addChild(this._rangShape);
        this._rangShape.graphics.beginFill(0x6ec858);
        this._rangShape.graphics.drawRoundRect(40,84,40,56,18);
        this._rangShape.graphics.endFill();

        this._rangText = ToolMrg.getText(40,84,20,0xffffff,40);
        this._mContain.addChild(this._rangText);
        this._rangText.height = 56;
        this._rangText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._rangText.textAlign = egret.HorizontalAlign.CENTER;

        let bfShape = new egret.Shape();
        this._mContain.addChild(bfShape);
        bfShape.graphics.beginFill(0xff8548);
        bfShape.graphics.drawRoundRect(40,200,40,458,18);
        bfShape.graphics.endFill();

        let bfText = ToolMrg.getText(40,200,20,0xffffff,40);
        this._mContain.addChild(bfText);
        bfText.lineSpacing = 8;
        bfText.textAlign = egret.HorizontalAlign.CENTER;
        bfText.height = 458;
        bfText.verticalAlign = egret.VerticalAlign.MIDDLE;
        bfText.text = "比\n分";

        let zjqShape = new egret.Shape();
        this._mContain.addChild(zjqShape);
        zjqShape.graphics.beginFill(0x6ec858);
        zjqShape.graphics.drawRoundRect(40,714,40,128,18);
        zjqShape.graphics.endFill();

        let zjqText = ToolMrg.getText(40,714,20,0xffffff,40);
        this._mContain.addChild(zjqText);
        zjqText.height = 128;
        zjqText.lineSpacing = 8;
        zjqText.verticalAlign = egret.VerticalAlign.MIDDLE;
        zjqText.textAlign = egret.HorizontalAlign.CENTER;
        zjqText.text = "总\n进\n球"

        let bqcShape = new egret.Shape();
        this._mContain.addChild(bqcShape);
        bqcShape.graphics.beginFill(0xff8548);
        bqcShape.graphics.drawRoundRect(40,900,40,128,18);
        bqcShape.graphics.endFill();

        let bqcText = ToolMrg.getText(40,900,20,0xffffff,40);
        this._mContain.addChild(bqcText);
        bqcText.height = 128;
        bqcText.verticalAlign = egret.VerticalAlign.MIDDLE;
        bqcText.textAlign = egret.HorizontalAlign.CENTER;
        bqcText.text = "半\n全\n场";

        let linkShape1 = new egret.Shape();
        this._mContain.addChild(linkShape1);
        linkShape1.graphics.beginFill(0xdedede);
        linkShape1.graphics.drawRect(0,168,750,1.5);
        linkShape1.graphics.endFill();

        let linkShape2 = new egret.Shape();
        this._mContain.addChild(linkShape2);
        linkShape2.graphics.beginFill(0xdedede);
        linkShape2.graphics.drawRect(0,680,750,1.5);
        linkShape2.graphics.endFill();

        let linkShape3 = new egret.Shape();
        this._mContain.addChild(linkShape3);
        linkShape3.graphics.beginFill(0xdedede);
        linkShape3.graphics.drawRect(0,864,750,1.5);
        linkShape3.graphics.endFill();
    }

    /**取消 */
    private _Cancel:egret.Bitmap;
    /**确定 */
    private _Define:egret.Bitmap;
    private joinDown():void{
        this._downContain = new egret.DisplayObjectContainer();
        this.addChild(this._downContain);
        this._downContain.y = GameMain.getInstance.StageHeight - 100;

        let bj = new egret.Bitmap();
        this._downContain.addChild(bj);
        bj.y = -10;
        RES.getResByUrl("resource/assets/images/ui/bg_tabbar@2x.png",(e)=>{bj.$setBitmapData(e); },this);

        this._Cancel = new egret.Bitmap();
        this._downContain.addChild(this._Cancel);
        this._Cancel.x = 70;
        this._Cancel.y = 10;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._Cancel.$setBitmapData(e); },this);

        this._Define = new egret.Bitmap();
        this._downContain.addChild(this._Define);
        this._Define.x = 406;
        this._Define.y = 10;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._Define.$setBitmapData(e); },this);

        let cancel = ToolMrg.getText(70,0,32,0x333333,276);
        this._downContain.addChild(cancel);
        cancel.height = 100;
        cancel.verticalAlign = egret.VerticalAlign.MIDDLE;
        cancel.textAlign = egret.HorizontalAlign.CENTER;
        cancel.text = "取消";

        let define = ToolMrg.getText(406,0,32,0xffffff,276);
        this._downContain.addChild(define);
        define.height = 100;
        define.verticalAlign = egret.VerticalAlign.MIDDLE;
        define.textAlign = egret.HorizontalAlign.CENTER;
        define.text = "确定";

        this._Cancel.touchEnabled = true;
        this._Define.touchEnabled = true;
    }

    /**加入块样式 */
    private joinBlock():void{
        //0-5
        for(let i=0;i<6;i++){
            let obj = new Block(i,202,56,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(i<3){
                obj.x = 92+206*i;
                obj.y = 26;
            }else{
                obj.x = 92+206*(i-3);
                obj.y = 86;
            }
        }
        //6-17
        let bjTop=0;
        for(let i=6;i<18;i++){
            let obj = new Block(i,120,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(bjTop<5){
                obj.y = 200;
                obj.x = 92+124*bjTop;
            }else if(bjTop<10){
                obj.y = 266;
                obj.x = 92+124*(bjTop-5);
            }else{
                obj.y = 332;
                obj.x = 92+124*(bjTop-10);
            }
            bjTop+=1;
        }
        //18
        let obj18 = new Block(18,368,62,null,null,0);
        obj18.x = 340;
        obj18.y = 332;
        this._mContain.addChild(obj18);
        this._item.Gput(obj18.index,obj18);

        //19-23
        for(let i=19;i<24;i++){
            let obj = new Block(i,120,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            obj.y = 398;
            obj.x = 92+124*(i-19);
        }
        //24-35
        let bjDown=0;
        for(let i=24;i<36;i++){
            let obj = new Block(i,120,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(bjDown<5){
                obj.y = 464;
                obj.x = 92+124*bjDown;
            }else if(bjDown<10){
                obj.y = 530;
                obj.x = 92+124*(bjDown-5);
            }else{
                obj.y = 596;
                obj.x = 92+124*(bjDown-10);
            }
            bjDown+=1;
        }
        //36
        let obj36 = new Block(36,369,62,null,null,0);
        obj36.x = 340;
        obj36.y = 596;
        this._mContain.addChild(obj36);
        this._item.Gput(obj36.index,obj36);

        //总进球开始 37-44
        for(let i=37;i<45;i++){
            let obj = new Block(i,152,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            if(i<41){
                obj.x = 92+156*(i-37);
                obj.y = 714;
            }else{
                obj.x = 92+156*(i-41);
                obj.y = 780;
            }
        }
        //45 - 48
        for(let i=45;i<49;i++){
            let obj = new Block(i,120,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            obj.x = 92+124*(i-45);
            obj.y = 900;
        }
        //49
        let obj49 = new Block(49,120,128,40,70,0);
        this._mContain.addChild(obj49);
        this._item.Gput(obj49.index,obj49);
        obj49.x = 588;
        obj49.y = 900;

        //50 - 53
        for(let i=50;i<54;i++){
            let obj = new Block(i,120,62,null,null,0);
            this._mContain.addChild(obj);
            this._item.Gput(obj.index,obj);
            obj.x = 92+124*(i-50);
            obj.y = 966;
        }
        this.changeTextOf6_53();
    }

    private changeTextOf6_53():void{
        for(let i=6;i<54;i++){
            this._item.Gget(i).aa(null,null,null,FootballDataMrg.getInstance.fbNameItem[i]);
        }
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
        this._Cancel.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._Define.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).addInterception();
        }
    }

    private removeInterception():void{
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._Cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._Define.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        for(let key of this._item.keys){
            this._item.Gget(key).removeInterception();
        }
    }

}