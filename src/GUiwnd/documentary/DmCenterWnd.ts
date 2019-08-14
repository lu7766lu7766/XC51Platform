class DmCenterWnd extends egret.DisplayObjectContainer{
    private _id;
    private _item:GHashMap<DmC_info>;

    constructor(){
        super();

        this._item = new GHashMap<DmC_info>();
        //send协议

    }

    public getItem():GHashMap<DmC_info>{
        return this._item;
    }

    public upData():void{
        let item = DmC_infoMsg.getInstance.item;

        let objHeight = 0;
        for(let key of item.keys){
            let obj:DmC_info;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new DmC_info();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key));
            obj.addInterception();
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this.addChild(obj);
        }
        ToolMrg.upItemofGHashMap(this._item,item);
    }

}