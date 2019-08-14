class SCMrg extends egret.DisplayObjectContainer{
    private static _mInstance: SCMrg;
	public static get getInstance(): SCMrg {
		if (SCMrg._mInstance == undefined)
			SCMrg._mInstance = new SCMrg();
		return SCMrg._mInstance;
	}

    /**全部 */
    private _AllScItem:GHashMap<SCData>;
    /**未中奖 */
    private _unScItem:GHashMap<SCData>;
    /**已中奖 */
    private _zScItem:GHashMap<SCData>;

    constructor(){
        super();

        this._AllScItem = new GHashMap<SCData>();
        this._unScItem = new GHashMap<SCData>();
        this._zScItem = new GHashMap<SCData>();
    }

    public addunScItem(id,obj):void{
        this._unScItem.Gput(id,obj);
    }

    public addzScItem(id,obj):void{
        this._zScItem.Gput(id,obj);
    }

    public addAllSCitem(id,obj):void{
        this._AllScItem.Gput(id,obj);
    }

    public getAllSCitem():GHashMap<SCData>{
        return this._AllScItem;
    }
    public getzScItem():GHashMap<SCData>{
        return this._zScItem;
    }
    public getunScItem():GHashMap<SCData>{
        return this._unScItem;
    }

    public clear():void{
        this._zScItem.clear();
        this._unScItem.clear();
        this._AllScItem.clear();
    }
}