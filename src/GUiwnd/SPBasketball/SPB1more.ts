/**更多玩法 串关 篮球 */
class SPB1more extends egret.DisplayObjectContainer{
    private static _mInstance: SPB1more;
	public static get getInstance(): SPB1more {
		if (SPB1more._mInstance == undefined)
			SPB1more._mInstance = new SPB1more();
		return SPB1more._mInstance;
	}
    
    private _downText:egret.TextField;
    private _rangText:egret.TextField;
    private _mContain:egret.DisplayObjectContainer;
    private _vs:egret.TextField;
    private _cancelBtn:egret.Bitmap;
    private _defineBtn:egret.Bitmap;
    private _item:GHashMap<SPBasketballBlock>;

    private _numItem:GHashMap<number>;

    constructor(){
        super();

        this.touchEnabled = true;
        this._item = new GHashMap<SPBasketballBlock>();
        this._numItem = new GHashMap<number>();

        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.touchEnabled = true;

        let bj = new egret.Shape();
        this._mContain.addChild(bj);
        bj.graphics.beginFill(0xffffff);
        bj.graphics.drawRoundRect(0,0,720,720,24);
        bj.graphics.endFill()

        this._mContain.x = (GameMain.getInstance.StageWidth - this._mContain.width)*0.5;
        this._mContain.y = (GameMain.getInstance.StageHeight - this._mContain.height)*0.5;

        let shape1 = new egret.Shape();
        this._mContain.addChild(shape1);
        shape1.graphics.beginFill(0xff8548);
        shape1.graphics.drawRoundRect(26,40,40,100,15);
        shape1.graphics.endFill()

        let text1 = ToolMrg.getText(26,40,20,0xffffff,40);
        this._mContain.addChild(text1);
        text1.height = 100;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.textAlign = egret.HorizontalAlign.CENTER;
        text1.text = "非让";

        let shape2 = new egret.Shape();
        this._mContain.addChild(shape2);
        shape2.graphics.beginFill(0x3e96ec);
        shape2.graphics.drawRoundRect(26,148,40,100,15);
        shape2.graphics.endFill()

        let text2 = ToolMrg.getText(26,148,20,0xffffff,40);
        this._mContain.addChild(text2);
        text2.height = 100;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.textAlign = egret.HorizontalAlign.CENTER;
        text2.text = "让分";

        let shape3 = new egret.Shape();
        this._mContain.addChild(shape3);
        shape3.graphics.beginFill(0x3E96EC);
        shape3.graphics.drawRoundRect(26,256,40,100,15);
        shape3.graphics.endFill()

        let text3 = ToolMrg.getText(26,256,20,0xffffff,40);
        this._mContain.addChild(text3);
        text3.height = 100;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.textAlign = egret.HorizontalAlign.CENTER;
        text3.text = "客\n胜";

        let shape4 = new egret.Shape();
        this._mContain.addChild(shape4);
        shape4.graphics.beginFill(0xFF8548);
        shape4.graphics.drawRoundRect(26,364,40,100,15);
        shape4.graphics.endFill()

        let text4 = ToolMrg.getText(26,364,20,0xffffff,40);
        this._mContain.addChild(text4);
        text4.height = 100;
        text4.verticalAlign = egret.VerticalAlign.MIDDLE;
        text4.textAlign = egret.HorizontalAlign.CENTER;
        text4.text = "主\n胜";

        let shape5 = new egret.Shape();
        this._mContain.addChild(shape5);
        shape5.graphics.beginFill(0x6EC858);
        shape5.graphics.drawRoundRect(26,474,40,100,15);
        shape5.graphics.endFill()

        let text5 = ToolMrg.getText(26,474,20,0xffffff,40);
        this._mContain.addChild(text5);
        text5.height = 100;
        text5.verticalAlign = egret.VerticalAlign.MIDDLE;
        text5.textAlign = egret.HorizontalAlign.CENTER;
        text5.text = "大\n小\n分";

        this._vs = ToolMrg.getText(374,76,24,0x999999);
        this._mContain.addChild(this._vs);
        this._vs.bold = true;
        this._vs.text = "VS";

        let zhu = ToolMrg.getText(378,175,24,0xf72e52);
        this._mContain.addChild(zhu);
        zhu.text = "主";

        this._rangText = ToolMrg.getText(270+50,202,20,0x1ba22e,38+100);
        this._mContain.addChild(this._rangText)
        this._rangText.textAlign = egret.HorizontalAlign.CENTER;
        this._rangText.text = "-1.5";

        this._downText = ToolMrg.getText(270+50,513,24,0xF72E52,38+100);
        this._mContain.addChild(this._downText)
        this._downText.textAlign = egret.HorizontalAlign.CENTER;
        this._downText.text = "152.5";

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

    /**获取赛事对应id */
    private _id;
    public show(id):void{
        GUIManager.getInstance.tipLay.addChild(this);
        this.addInterception();
        this._id = id;
        this.upThisValue();

        //请求一次更多信息
        BK_List_More.getInstance.sendHttp(id);
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BK_CJList_More, this.upThisValue, this);
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
        let item = BasketballDataMrg.getInstance._mCJLQLB;
        let data:BasketballData;
        for(let keys of item.keys){
            for(let akey of item.Gget(keys).keys){
                if(akey == this._id){
                    data = item.Gget(keys).Gget(this._id);
                }
            }
        }

        this._item.Gget(0).aa(this._id,data.listSX[0],data.team_a_name,`客胜${data.listSX[0]}`);
        this._item.Gget(1).aa(this._id,data.listSX[1],data.team_b_name,`主胜${data.listSX[1]}`);
        this._item.Gget(2).aa(this._id,data.listSX[2],data.team_a_name,`客胜${data.listSX[2]}`);
        this._item.Gget(3).aa(this._id,data.listSX[3],data.team_b_name,`主胜${data.listSX[3]}`);

        this._item.Gget(16).aa(this._id,data.listSX[16],data.team_a_name,`大分${data.listSX[16]}`);
        this._item.Gget(17).aa(this._id,data.listSX[17],data.team_b_name,`小分${data.listSX[17]}`);

        for(let i=4;i<16;i++){
            this._item.Gget(i).aa(this._id,data.listSX[i],BasketballDataMrg.getInstance.BasketballList[i],`${data.listSX[i]}`);
        }

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
        CustEventMrg.getInstance.addEventListener(CustEventType.EventType_BK_CJList_More, this.upThisValue, this);
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
		this._mShareC.graphics.endFill()
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }

    private joinBlock():void{
        //0 - 1
        for(let i=0;i<2;i++){
            let obj = new SPBasketballBlock(i,0,240,100,0,19,57);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 78 + i*(138+240);
            obj.y = 40;
        }

        //2 - 3
        for(let i=2;i<4;i++){
            let obj = new SPBasketballBlock(i,1,240,100,0,19,57);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 78 + (i-2)*(138+240);
            obj.y = 148;
        }

        //4 - 9
        for(let i=4;i<10;i++){
            let obj = new SPBasketballBlock(i,1,100,100,0);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 76 + (i-4)*(100+4);
            obj.y = 256;
        }

        //10 - 15
        for(let i=10;i<16;i++){
            let obj = new SPBasketballBlock(i,1,100,100,0);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 76 + (i-10)*(100+4);
            obj.y = 364;
        }

        //16 - 17
        for(let i=16;i<18;i++){
            let obj = new SPBasketballBlock(i,1,240,100,0,19,57);
            this._mContain.addChild(obj);
            this._item.Gput(i,obj);
            obj.x = 78 + (i-16)*(138+240);
            obj.y = 472;
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
            SPBasketBallWnd.getInstance.upChangeSubMore(this._id,arr);
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