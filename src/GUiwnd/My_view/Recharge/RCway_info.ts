/**支付方式 */
class RCway_info extends egret.DisplayObjectContainer{

    private _title:egret.TextField;
    private _content:egret.TextField;
    private _link:egret.Bitmap;
    private _click:egret.Bitmap;

    constructor(){
        super();

        let bj = new egret.Bitmap();
        this.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 140;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{bj.$setBitmapData(e);},this);
        
        this._link = new egret.Bitmap();
        this.addChild(this._link);
        this._link.x = 40;
        this._link.touchEnabled = true;
        RES.getResByUrl("resource/assets/images/ui/kuang2_mine@2x.png",(e)=>{this._link.$setBitmapData(e);},this);

        this._click = new egret.Bitmap();
        this.addChild(this._click);
        this._click.x = 590;
        this._click.y = 40;
        // RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{this._click.$setBitmapData(e); },this);
        // RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{},this);

        this._title = ToolMrg.getText(80,14+6,28,0x333333);
        this.addChild(this._title);

        this._content = ToolMrg.getText(80,75,24,0xf72e52);
        this.addChild(this._content);
    }

    public select():void{
        RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{this._click.$setBitmapData(e); },this);
    }

    public noselect():void{
        RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{this._click.$setBitmapData(e); },this);
    }

    public getData():RCway_Data{
        return this._data;
    }

    private _id:number;
    private _data:RCway_Data;
    public aa(data:RCway_Data,id):void{
        this._data = data;
        this._id = id;
        
        this._title.text = data._title;
        this._content.text = `充值范围${data.small}元~${data.max}元`;
    }

    private touchDown():void{
        if(this._data._titleType==0)return;
        RechargeWnd.getInstance.changeWayNum(this._id);
    }

    private _isEvent = false;
    public addEvent():void{
        if(!this._isEvent){
            this._link.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isEvent = true;
        }
    }

    public removeEvent():void{
        if(this._isEvent){
            this._link.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isEvent = false;
        }
    }
}

/**支付方式 */
class PayWay extends egret.DisplayObjectContainer{

    private _title:egret.TextField;
    private _bg:egret.Bitmap;
    private _icon:egret.Bitmap;
    private _type: string;

    private get iconUrl() {
        let imageNuumber: string
        switch(this._type) {
            //支付寶
            case 'AliPay':
                imageNuumber = '1'
            break
            //微信支付
            case 'WeChatPay':
            imageNuumber = '5'
            break
            //銀聯支付
            case 'unionPay':
            imageNuumber = '3'
            break
            //京東支付
            case 'JDPay':
            imageNuumber = '4'
            break
             //QQ支付
            case 'QQPay':
            imageNuumber = '6'
            break
            //銀行轉帳
            case 'BankPay':
            imageNuumber = '2'
            break
        }
        return 'resource/assets/images/pay/ic_pay' + imageNuumber + '.png'
    }

    constructor(type){
        super();
        this._type = type
        let bj = new egret.Bitmap();
        this.addChild(bj);
        bj.width = 200;
        bj.height = 110;
        RES.getResByUrl("resource/assets/images/ui/bai.png",(e)=>{bj.$setBitmapData(e);},this);
        
        this._bg = new egret.Bitmap();
        this.addChild(this._bg);
        this._bg.x = 40;
        RES.getResByUrl("resource/assets/images/ui/kuang2_mine@2x.png",(e)=>{this._bg.$setBitmapData(e);},this);

        this._icon = new egret.Bitmap();
        this.addChild(this._icon);
        this._icon.x = 100;
        this._icon.y = 20;
        this._icon.width = 40
        this._icon.height = 40
        RES.getResByUrl(this.iconUrl, (e)=>{this._bg.$setBitmapData(e);},this);

        this._title = ToolMrg.getText(80,14+6,28,0x333333);
        this.addChild(this._title);
    }

    public select():void{
        RES.getResByUrl("resource/assets/images/ui/select_home@2x.png",(e)=>{this._bg.$setBitmapData(e); },this);
    }

    public noselect():void{
        RES.getResByUrl("resource/assets/images/ui/select_nor_home@2x.png",(e)=>{this._bg.$setBitmapData(e); },this);
    }

    public getData():RCway_Data{
        return this._data;
    }

    private _id:number;
    private _data:RCway_Data;
    public aa(data:RCway_Data,id):void{
        this._data = data;
        this._id = id;
        
        this._title.text = data._title;
    }

    private touchDown():void{
        if(this._data._titleType==0)return;
        RechargeWnd.getInstance.changeWayNum(this._id);
    }

    private _isEvent = false;
    public addEvent():void{
        if(!this._isEvent){
            // this._link.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isEvent = true;
        }
    }

    public removeEvent():void{
        if(this._isEvent){
            // this._link.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.touchDown,this);
            this._isEvent = false;
        }
    }
}