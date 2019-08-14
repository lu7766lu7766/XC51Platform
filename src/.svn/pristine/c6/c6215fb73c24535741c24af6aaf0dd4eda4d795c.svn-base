/**发单数字键盘 */
class DryNumKey extends egret.DisplayObjectContainer{
    private static _mInstance: DryNumKey;
    public static get getInstance(): DryNumKey {
        if (DryNumKey._mInstance == undefined)
            DryNumKey._mInstance = new DryNumKey();
        return DryNumKey._mInstance;
    }

    private _mContain:egret.DisplayObjectContainer;
    private _bj:egret.Bitmap;
    private _strText:egret.TextField;
    private _str="1";
    private _return:egret.Bitmap;

    private topStr = [1,3,5,8,10];
    private _topItem:GHashMap<DryNumKeyTopInfo>;

    private numStr = [1,2,3,4,5,6,7,8,9,0];
    private _numItem:GHashMap<DryNumKeyBtnInfo>;

    /**删除 */
    private _delete:egret.Shape;
    /**确定 */
    private _goBtn:egret.TextField;

    constructor(){
        super();

        this.touchEnabled = true;

        this._topItem = new GHashMap<DryNumKeyTopInfo>();
        this._numItem = new GHashMap<DryNumKeyBtnInfo>();
        this._mContain = new egret.DisplayObjectContainer();
        this.addChild(this._mContain);
        this._mContain.touchEnabled = true;

        this.init();
        this.setDB();
    }

    public setTop(num:number){
        if(GameValue.fsRate<num)
            num = GameValue.fsRate;
        this._str = num+"";
        this.changeCss();
    }

    //保存按钮
    public setBtn(num:number):void{
        let a = this._str+num.toString();
        if(Number(a)>GameValue.fsRate){
            this._str = GameValue.fsRate+"";
        }else{
            // if(this._str.length==1 && this._str=="0"){
            //       this._str = `${num}`;
            // }else{
            //     this._str = this._str + num.toString();
            // }
            if(this._str.length==0){
                if(num==0)
                    this._str = "1";
                else
                    this._str = `${num}`;
            }else{
                this._str = this._str + num.toString();
            }
        }
        this.changeCss();
    }

    private changeCss():void{
        // this._strText.text = `盈利提成${this._str}%`;
        this._strText.textFlow = <Array<egret.ITextElement>>[
            {"text":"盈利提成",style:{"textColor":0x333333}},
            {"text":this._str,style:{"textColor":0xff0000}},
            {"text":"%",style:{"textColor":0x333333}},
        ]
    }

    private _mData:NumKeyData;
    /**NumKeyData */
    public show(mData:NumKeyData):void{
        if(this.parent==undefined){
            GUIManager.getInstance.mostLay.addChild(this);
            this.y = this._mContain.height;
            egret.Tween.get(this).to({"y":0},300,egret.Ease.circOut);
        }
        this._mData = mData;
        this._str =  this._mData.str;
        this.changeCss();
        this.addEvent();
    }   

    public hide():void{
        if(this.parent!=undefined){
            egret.Tween.get(this).to({"y":this._mContain.height},300,egret.Ease.circInOut).call(function(){
                this.parent.removeChild(this);
            });
            this.removeEvent();
        }
    }

    private touchDown(e:egret.TouchEvent):void{
        if(e.target == this._return || e.target == this._mShareC){
            this.hide();
        }else if(e.target == this._delete){//删除
            if(this._str.length>0){
                this._str = this._str.substring(0,this._str.length-1);
                this.changeCss();
            }
        }else if(e.target == this._goBtn){//确认
            let str = this._str;
            if(str=="0"||str=="")
                str="1";
            this._mData.strText.text = str; 
            this._mData.backFun.call(this._mData.thisObj);
            this.hide();
        }
    }

    private addEvent():void{
        this._return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._delete.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._mShareC.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        
        for(let key of this._topItem.keys)
            this._topItem.Gget(key).addEvent();
        for(let key of this._numItem.keys)
            this._numItem.Gget(key).addEvent();
    }
    private removeEvent():void{
        this._return.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._delete.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._goBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._mShareC.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);

        for(let key of this._topItem.keys)
            this._topItem.Gget(key).removeEvent();
        for(let key of this._numItem.keys)
            this._numItem.Gget(key).removeEvent();
    }

    private init():void{
        this._bj = new egret.Bitmap();
        this._mContain.addChild(this._bj);
        this._bj.width = GameMain.getInstance.StageWidth;
        this._bj.height = 580;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{this._bj.$setBitmapData(e);},this);

        let link = new egret.Shape();
        this._mContain.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,0,GameMain.getInstance.StageWidth,2);
        link.graphics.endFill();

        this._strText = ToolMrg.getText(306+122,24,32,0x333333,300);
        this._mContain.addChild(this._strText);
        this._strText.textAlign = egret.HorizontalAlign.RIGHT;
        // this._strText.text = "投1倍";

        this._return = new egret.Bitmap();
        this._mContain.addChild(this._return);
        this._return.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{this._return.$setBitmapData(e); },this);
        this._return.width = 100;
        this._return.height = 80;

        let _return = new egret.Bitmap();
        this._mContain.addChild(_return);
        _return.x = 24;
        _return.y = 28;
        RES.getResByUrl("resource/assets/images/ui/xiala1_home@2x.png",(e)=>{_return.$setBitmapData(e); },this);

        let toplink = new egret.Shape();
        this._mContain.addChild(toplink);
        toplink.graphics.beginFill(0xdedede);
        toplink.graphics.drawRect(0,79,GameMain.getInstance.StageWidth,2);
        toplink.graphics.endFill();

        let objTop:DryNumKeyTopInfo;
        for(let i=0;i<this.topStr.length;i++){
            objTop = new DryNumKeyTopInfo(this.topStr[i]);
            this._mContain.addChild(objTop);
            this._topItem.Gput(i,objTop);
            objTop.y = 100;
            objTop.x = 24+144*i;
        }

        let objBtnWidth = GameMain.getInstance.StageWidth/3;
        let objBtn:DryNumKeyBtnInfo;
        let objwidth=0;
        let objheight=180;
        for(let i=0;i<this.numStr.length;i++){
            objBtn = new DryNumKeyBtnInfo(this.numStr[i],objBtnWidth);
            this._mContain.addChild(objBtn);
            this._numItem.Gput(i,objBtn);
            if(this.numStr[i]==0){
                objBtn.x = objBtnWidth;
                objBtn.y = 180+300;
            }else{
                objBtn.x = objwidth;
                objBtn.y = objheight;
                if(this.numStr[i]%3==0){
                    objheight = objheight + 100;
                    objwidth = 0;
                }else{
                    objwidth = objBtn.width + objwidth;
                }
            }
        }

        this._delete = new egret.Shape();
        this._mContain.addChild(this._delete);
        this._delete.graphics.beginFill(0xffffff);
        this._delete.graphics.drawRect(0,180+300,objBtnWidth,100);
        this._delete.graphics.endFill();
        this._delete.touchEnabled = true;

        let deleteBtn = new egret.Bitmap();
        this._mContain.addChild(deleteBtn);
        RES.getResByUrl("resource/assets/images/ui/sjyw_home@2x.png",(e)=>{
            deleteBtn.$setBitmapData(e); 
            deleteBtn.x = (objBtnWidth - deleteBtn.width)*0.5;
            deleteBtn.y = 480+(100-deleteBtn.height)*0.5;   
        },this);

        this._goBtn = ToolMrg.getText(2*objBtnWidth,480,36,0x333333,objBtnWidth);
        this._mContain.addChild(this._goBtn);
        this._goBtn.height = 100;
        this._goBtn.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._goBtn.textAlign = egret.HorizontalAlign.CENTER;
        this._goBtn.touchEnabled = true;
        // this._goBtn.bold = true;
        this._goBtn.text = "确定";

        //补线
        let downLink1 = new egret.Shape();
        this._mContain.addChild(downLink1);
        downLink1.graphics.beginFill(0xdedede);
        downLink1.graphics.drawRect(0,179,GameMain.getInstance.StageWidth,2);
        downLink1.graphics.endFill();

        let downLink2 = new egret.Shape();
        this._mContain.addChild(downLink2);
        downLink2.graphics.beginFill(0xdedede);
        downLink2.graphics.drawRect(0,179+100,GameMain.getInstance.StageWidth,2);
        downLink2.graphics.endFill();

        let downLink3 = new egret.Shape();
        this._mContain.addChild(downLink3);
        downLink3.graphics.beginFill(0xdedede);
        downLink3.graphics.drawRect(0,179+200,GameMain.getInstance.StageWidth,2);
        downLink3.graphics.endFill();

        let downLink4 = new egret.Shape();
        this._mContain.addChild(downLink4);
        downLink4.graphics.beginFill(0xdedede);
        downLink4.graphics.drawRect(0,179+300,GameMain.getInstance.StageWidth,2);
        downLink4.graphics.endFill();

        let downLink5 = new egret.Shape();
        this._mContain.addChild(downLink5);
        downLink5.graphics.beginFill(0xdedede);
        downLink5.graphics.drawRect(GameMain.getInstance.StageWidth/3-1,180,2,402);
        downLink5.graphics.endFill();

        let downLink6 = new egret.Shape();
        this._mContain.addChild(downLink6);
        downLink6.graphics.beginFill(0xdedede);
        downLink6.graphics.drawRect(GameMain.getInstance.StageWidth/3*2-1,180,2,402);
        downLink6.graphics.endFill();

        this._mContain.y = GameMain.getInstance.StageHeight - this._mContain.height;
    }

    private _mShareC: egret.Shape;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Shape();
        this._mShareC.graphics.beginFill(0xffffff, 0.01);
        this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, GameMain.getInstance.StageHeight);
        this._mShareC.graphics.endFill();
        this.addChildAt(this._mShareC, 0);
        this._mShareC.touchEnabled = true;
    }
}

/**头部info按钮模块 */
class DryNumKeyTopInfo extends egret.DisplayObjectContainer{

    private _shape:egret.Shape;
    private _shapeText:egret.TextField;
    private _num:number;

    constructor(num:number){
        super();

        this._num = num;

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0xdedede);
        this._shape.graphics.drawRect(0,0,128,64);
        this._shape.graphics.endFill();

        this._shapeText = ToolMrg.getText(0,0,32,0x333333,128);
        this.addChild(this._shapeText);
        this._shapeText.height = 64;
        this._shapeText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._shapeText.textAlign = egret.HorizontalAlign.CENTER;
        this._shapeText.text = `${num}%`
        this._shapeText.touchEnabled = true;   
    }

    private touchDown(e:egret.TouchEvent):void{
        DryNumKey.getInstance.setTop(this._num);
    }

    public addEvent():void{
        this._shapeText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }

    public removeEvent():void{
        this._shapeText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
    }
}

/** 0~9按钮 */
class DryNumKeyBtnInfo extends egret.DisplayObjectContainer{

    private _numText:egret.TextField;
    private _num:number;
    private _shape:egret.Shape;

    /**保存高度 */
    private _width:number;

    constructor(num:number,width:number){
        super();
        this._num = num;
        this._width = width;

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0,0,width,100);
        this._shape.graphics.endFill();

        this._numText = ToolMrg.getText(0,0,48,0x333333,width);
        this.addChild(this._numText);
        this._numText.height = 100;
        this._numText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._numText.textAlign = egret.HorizontalAlign.CENTER;
        this._numText.text = `${num}`;
        this._numText.touchEnabled = true;
    }

    private begin():void{
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xf5f5f2);
        this._shape.graphics.drawRect(0,0,this._width,100);
        this._shape.graphics.endFill();
    }

    private touchDown():void{
        DryNumKey.getInstance.setBtn(this._num);
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0,0,this._width,100);
        this._shape.graphics.endFill();
    }

    public addEvent():void{
        this._numText.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._numText.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
    }

    public removeEvent():void{
        this._numText.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
        this._numText.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.begin,this);
    }
}