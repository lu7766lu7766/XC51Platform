/**跟单用户 */
class DD_user extends egret.DisplayObjectContainer{
    private _item:GHashMap<UserInfo>;
    private _tipText:egret.Bitmap;

    constructor(){
        super();
        this.hide();

        this._item = new GHashMap<UserInfo>();

        this._tipText = new egret.Bitmap();
        RES.getResByUrl("resource/assets/images/ui/zwjl.png",(e)=>{
            this._tipText.$setBitmapData(e); 
            this._tipText.x = (GameMain.getInstance.StageWidth - this._tipText.width)*0.5;
            this._tipText.y = 100;
        },this);
        // this._tipText = ToolMrg.getText(0,200,30,0x000000);
        this.addChild(this._tipText);
        this._tipText.visible = false;

        this.setDB();
    }

    public updata(data:GD_DetailData):void{
        if(data == undefined)
            data = new GD_DetailData();
        let item = data.GD_UserItem;

        let objheight = 0;
        for(let key of item.keys){
            let obj:UserInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new UserInfo();
                this._item.Gput(key,obj);
            }
            
            obj.aa(item.Gget(key));
            obj.y = objheight;
            objheight = objheight + obj.height;
            if(obj.parent==undefined)
                this.addChild(obj);
        }

        ToolMrg.upItemofGHashMap(this._item,item);
        if(item.size>0){
            this._tipText.visible = false;
        }else{
            this._tipText.visible = true;
        }
    }

    public show(data:GD_DetailData):void{
        this.visible = true;
        this.updata(data);
    }

    public hide():void{
        this.visible = false;
    }

    private _mShareC:egret.Shape;
    private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 300);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}

class UserInfo extends egret.DisplayObjectContainer{
    private _userName:egret.TextField;
    private _money:egret.TextField;
    private _time:egret.TextField;
    private _tx:egret.Bitmap;

    constructor(){
        super();

        this._tx = new egret.Bitmap();
        this.addChild(this._tx);
        this._tx.x = 28;
        this._tx.y = 32;
        this._tx.width = 36;
        this._tx.height = 36;

        this._userName = ToolMrg.getText(68,0,28,0x333333);
        this.addChild(this._userName);
        this._userName.height = 100;
        this._userName.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._money = ToolMrg.getText(304,0,28,0xff7000);
        this.addChild(this._money);
        this._money.height = 100;
        this._money.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._time = ToolMrg.getText(480,0,24,0x999999);
        this.addChild(this._time);
        this._time.height = 100;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        
        let link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,98.5,750,1.5);
        link.graphics.endFill();

        this.setDB();
    }

    private _data:GD_UserList;
    public aa(data:GD_UserList):void{
        this._data = data;

        RES.getResByUrl(`resource/assets/images/ui/tou${data.tx}.png`,(e)=>{this._tx.$setBitmapData(e); },this);
        this._userName.text = `${data.userName}`;
        this._money.text = `${ToolMrg.getDecimal(data.userMoney/100,2)}元`;
        this._time.text = `${ToolMrg.getTime1(data.timeNum)}`;
    }

    private _mShareC:egret.Shape;
    private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xffffff, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 100);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
    }
}