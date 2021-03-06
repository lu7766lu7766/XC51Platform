/**更多玩法 串关 篮球 */
class B5more extends egret.DisplayObjectContainer{
    private static _mInstance: B5more;
	public static get getInstance(): B5more {
		if (B5more._mInstance == undefined)
			B5more._mInstance = new B5more();
		return B5more._mInstance;
	}
    
    private _mContain:egret.DisplayObjectContainer;
    private _team1:egret.TextField;
    private _team2:egret.TextField;
    private _cancelBtn:egret.Bitmap;
    private _defineBtn:egret.Bitmap;
    private _item:GHashMap<BasketballBlock>;

    private _numItem:GHashMap<number>;

    constructor(){
        super();

        this.touchEnabled = true;
        this._item = new GHashMap<BasketballBlock>();
        this._numItem = new GHashMap<number>();

        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.touchEnabled = true;

        let bj = new egret.Shape();
        this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0,0,720,480,24);
        bj.graphics.endFill();

        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;

        let shape1 = new egret.Shape();
        this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26,110,40,100,15);
        shape1.graphics.endFill();

        let text1 = ToolMrg.getText(26,110,20,0xffffff,40);
        this._mContain.addChild(text1);
        text1.height = 100;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "客胜";

        let shape2 = new egret.Shape();
        this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26,218,40,100,15);
        shape2.graphics.endFill();

        let text2 = ToolMrg.getText(26,218,20,0xffffff,40);
        this._mContain.addChild(text2);
        text2.height = 100;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "主胜";

        let vs = ToolMrg.getText(346,44,24,0x999999);
        this._mContain.addChild(vs);
        vs.text = "VS";

        this._team1 = ToolMrg.getText(70,38,32,0x333333,200);
        this._mContain.addChild(this._team1);
        this._team1.textAlign = egret.HorizontalAlign.RIGHT;
        this._team1.bold = true;

        this._team2 = ToolMrg.getText(454,38,32,0x333333);
        this._mContain.addChild(this._team2);
        this._team2.bold = true;

        this._cancelBtn = new egret.Bitmap();
        this._mContain.addChild(this._cancelBtn);
        this._cancelBtn.touchEnabled = true;
        this._cancelBtn.x = 66;
        this._cancelBtn.y = 362;
        RES.getResByUrl("resource/assets/images/ui/bg2_nor_button@2x.png",(e)=>{this._cancelBtn.$setBitmapData(e); },this);

        this._defineBtn = new egret.Bitmap();
        this._mContain.addChild(this._defineBtn);
        this._defineBtn.touchEnabled = true;
        this._defineBtn.x = 382;
        this._defineBtn.y = 362;
        RES.getResByUrl("resource/assets/images/ui/bg2_button@2x.png",(e)=>{this._defineBtn.$setBitmapData(e); },this);

        let cancelText = ToolMrg.getText(74,387,32,0x333333,276);
        this._mContain.addChild(cancelText);
        cancelText.textAlign = egret.HorizontalAlign.CENTER;
        cancelText.text = "取消";

        let defineText = ToolMrg.getText(382,387,32,0xffffff,276);
        this._mContain.addChild(defineText);
        defineText.textAlign = egret.HorizontalAlign.CENTER;
        defineText.text = "确定";

        this.joinBlock();
        this.setDB();
    }

    /**获取赛事对应id */
    private _id;
    public show(id):void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this._id = id;
        this.upThisValue();

        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BKDG_List, this.upThisValue, this);
     }

    //进入时显示选中
    private startDataOfCss():void{
        for(let key of this._numItem.keys){
            let obj = this._item.Gget(key);
            obj.selectType = true;
            obj.changeCss();
        }
    }

    public upThisValue():void{
        this._numItem.clear();
        let item = BasketballDataMrg.getInstance._mLQLBDG;
        let data:BasketballData;
        for(let keys of item.keys){
            for(let akey of item.Gget(keys).keys){
                if(akey == this._id){
                    data = item.Gget(keys).Gget(this._id);
                }
            }
        }

        for(let i=4;i<16;i++){
            this._item.Gget(i).aa(this._id,data.listSX[i],BasketballDataMrg.getInstance.BasketballList[i],`${data.listSX[i]}`);
        }
        
        this._team1.text = data.team_a_name;
        this._team2.text = data.team_b_name;

        for(let key of this._item.keys){
            this._item.Gget(key).addInterception();
        }

        let selectItem:number[] = [];
        for(let key of BasketBallWnd.getInstance.allItem.keys){
            if(key == this._id){
                selectItem = BasketBallWnd.getInstance.allItem.Gget(key).xlxIdList;
            }
        }

        for(let i=0;i<selectItem.length;i++){
            if(this._item.GhasKey(selectItem[i])){
                this._item.Gget(selectItem[i]).selectType = true;
                this._item.Gget(selectItem[i]).changeCss();

                this._numItem.Gput(selectItem[i],selectItem[i]);
            }

        }
    }

    public addData(index:number,isSelect:boolean):void{
        if(isSelect){//添加
            this._numItem.Gput(index,index);
        }else{//删除
            if(this._numItem.GhasKey(index))
                this._numItem.GremoveByKey(index);
        }
    }

    public hide():void{
        if(this.parent!=undefined){
            this.parent.removeChild(this);
            this.removeInterception();
            this.clearDataOfCss();
            for(let key of this._item.keys){
                this._item.Gget(key).aa(null,null,null,"");
                this._item.Gget(key).removeInterception();
            }
        }
        CustEventMrg.getInstance.removeEventListener(CustEventType.EventType_BKDG_List, this.upThisValue, this);
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

        //4 - 9
        for(let i=4;i<10;i++){
            let obj = new BasketballBlock(i,1,100,100,1);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 76 + (i-4)*(100+4);
            obj.y = 110;
        }

        //10 - 15
        for(let i=10;i<16;i++){
            let obj = new BasketballBlock(i,1,100,100,1);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 76 + (i-10)*(100+4);
            obj.y = 218;
        }

        for(let i=4;i<16;i++){
            this._item.Gget(i).aa(this._id,null,BasketballDataMrg.getInstance.BasketballList[i]);
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._defineBtn){
            let arr:number[] = [];
            for(let key of this._numItem.keys){
                arr = arr.concat(this._numItem.Gget(key))
            }
            BasketBallWnd.getInstance.upChangeSubMore(this._id,arr);
        }
        this.hide();
    }

    private addInterception():void{
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    private removeInterception():void{
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._defineBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}