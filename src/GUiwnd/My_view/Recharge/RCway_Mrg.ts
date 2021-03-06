class RCway_Mrg{
    private static _mInstance: RCway_Mrg;
    public static get getInstance(): RCway_Mrg {
        if (RCway_Mrg._mInstance == undefined)
            RCway_Mrg._mInstance = new RCway_Mrg();
        return RCway_Mrg._mInstance;
    }

    private _infoItem:GHashMap<RCway_Data>;

    constructor(){
        this._infoItem = new GHashMap<RCway_Data>();

        // let a = new RCway_Data();
        // a.id = 1;
        // a._title = "支付宝";
        // a._content = "支付宝";
        // a.small = 10;
        // a.max = 200;
        // a._type = 1;
        // this._infoItem.Gput(0,a);

        // let b = new RCway_Data();
        // b.id = 2;
        // b._title = "微信";
        // b._content = "支付宝";
        // b.small = 10;
        // b.max = 300;
        // b._type = 2;
        // this._infoItem.Gput(1,b);

        // let c = new RCway_Data();
        // c.id = 3;
        // c._title = "银联";
        // c._content = "支付宝";
        // c.small = 100;
        // c.max = 300;
        // c._type = 3;
        // this._infoItem.Gput(2,c);
    }

    /** key必须从0开始 */
    public addItem(id,data:RCway_Data):void{
        this._infoItem.Gput(id,data);
    }

    public getItem():GHashMap<RCway_Data>{
        return this._infoItem;
    }

    public getItemClassList() {
        const res = []
        for(const key of this._infoItem.keys) {
            const item = this._infoItem[key]
            if(res.indexOf(item.class) === -1) {
                res.push(item.class)
            }
        }
        return res
    }

    public clear():void{
        this._infoItem.clear();
    }
}

class RCway_Data{
    public id;
    public _title:string;
    public _content:string;
    /**卡类型 */
    public _type:number;
    /** 0字体颜色 0x999999 1:0xF72E52 */
    public contentType:number;
    /**可点击1 不可点击0 */
    public _titleType:number;
    /**最小值 */
    public small:number;
    /**最大值 */
    public max:number;
    public money:number[] = []

    /**支付类型 0转账 1扫码 */
    public payType:number;

    public class: string;
    public description: string;
    public bank_card_id: string;
    public bank_name: string;
}