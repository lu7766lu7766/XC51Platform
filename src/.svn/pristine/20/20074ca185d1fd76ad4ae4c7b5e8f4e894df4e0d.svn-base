/**推荐提示item */
class WorldTip extends egret.DisplayObjectContainer {
    private static _mInstance: WorldTip;
	public static get getInstance(): WorldTip {
		if (WorldTip._mInstance == undefined)
			WorldTip._mInstance = new WorldTip();
		return WorldTip._mInstance;
	}
	/**提示数组 */
    public arr:Array<string>=["用户&***&跟单了足彩大神的专家方案","用户&***&在排列三直选中的1040元","用户&***&在排列三组三中的346元","用户&***&在排列三组六中的173元"];
    private _mDHHM:string[] = ["133","132","134","135","136","138","139","188","186","189","178","183","159","158","157","152","150","158"];
    /**提示数组 */
    public arrItem:GHashMap<ReTextData>;

    /**公告信息 */
    private _mGGxxList:Array<NoticeData>;

    /**文本1 */
    private text1:egret.TextField;
    /**文本2 */
    private text2:egret.TextField;

    private _status:number = 1;
    private _lastTime:number = 0;

	public constructor() {
		super();
        this.arrItem = new GHashMap<ReTextData>();
        this._mGGxxList = new Array<NoticeData>();

        this.text1 = ToolMrg.getText(0,0,24,0x292929,750);
        // this.text1.text = this.arr[0];
        this.text1.text = "";

        this.text2 = ToolMrg.getText(0,0,24,0x292929,750);

        this.addChild(this.text1);
        this.addChild(this.text2);
        // this._lastTime = egret.getTimer();

        this.mask = new egret.Rectangle(0,-6,590,40);
        this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
	}

    /**添加公告 */
    public addGGxxList(data:NoticeData) {
        this._mGGxxList.push(data);
    }

    /**取数据 */
    public getList():NoticeData {
        if(this._mGGxxList.length == 2) {
            NoticePhp.getInstance.sendHttp();
        }  
        if(this._mGGxxList.length <= 0) {
            let data:NoticeData = new NoticeData();
            data.id = 1;
            data.conten = "全新51彩店震撼来袭，返奖快，返水高，易查询。";

            NoticePhp.getInstance.sendHttp();
            return data;
        } else {
            return this._mGGxxList.pop();
        }
    }

    private onEnterFrame(e:egret.Event):void{
        if(this.stage == null)
            return;
        if(egret.getTimer()-this._lastTime<2500)//停止秒数
            return;
        if(this._status == 2){
            this.update();
            return;
        }
        this.change();
    }

    private _f:egret.TextField;
    private _s:egret.TextField;
    private update():void{
        this._f.y -= 0.5;
        this._s.y -= 0.5;
        if(this._s.y <= 0){
            this._status = 1;
            this._f.visible = false;
            this._s.y = 0;
            this._lastTime = egret.getTimer();
        }

    }
    private num:number=1;
    private change():void{
        // if(this.arrItem.size==0)return;
        this._status = 2;
        this._f =  this.text1.visible ? this.text1 : this.text2;
        this._s =  this.text1 == this._f ? this.text2 : this.text1;

        this._f.visible = this._s.visible = true;
        this._s.y = 40;
        let str:string[] =  this.arr[this.num].split("&");
        this._s.text = str[0] + GUtilMath.randomNum(1,19) + str[1] + (GUtilMath.randomNum(10,99)) + str[2];
        // this._s.text = this.getList().conten;
        this.num+=1;
        if(this.num==this.arr.length)
            this.num=0;
    }
}

class ReTextData{
    public id;
    public title:String;
    public content:string;
    public creatrTime:number;
}

class NoticeData {
    /**id */
    public id:number = 1;
    /**str */
    public conten:string = "";

}