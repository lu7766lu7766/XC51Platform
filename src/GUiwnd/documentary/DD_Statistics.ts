/**战绩 近几中几 */
class DD_Statistics extends egret.DisplayObjectContainer{
    private _content:egret.TextField;
    private _link:egret.Shape;
    private _item:GHashMap<StatisticsInfo>;

    constructor(){
        super();
        this._item = new GHashMap<StatisticsInfo>();

        this._content = ToolMrg.getText(0,4,24,0x999999);
        this.addChild(this._content);
        
        this._link = new egret.Shape();
        this.addChild(this._link);
        this._link.graphics.beginFill(0xcacaca);
        this._link.graphics.drawRect(106,10,192,2);
        this._link.graphics.endFill();
    }

    /** 最近场数 最近中场数 7场结果 */
    public updata(ji,zh,arr:number[]):void{
        // this._content.text = "";
        if(arr.length>0)
            this._link.visible = true;
        else
            this._link.visible = false;

        this._content.textFlow = <Array<egret.ITextElement>>[
            {"text":"近",style:{"textColor":0x999999}},
            {"text":`${ji}中${zh}`,style:{"textColor":0xF72F53}}
        ];

        let objWidth = 76+18;
        for(let i=0;i<arr.length;i++){
            let obj:StatisticsInfo;
            if(this._item.GhasKey(i)){
                obj = this._item.Gget(i);
            }else{
                obj = new StatisticsInfo();
                this._item.Gput(i,obj);
            }
            obj.aa(arr[i]);
            obj.y = 0;
            obj.x = objWidth;
            objWidth = objWidth + obj.width + 4;
            if(obj.parent==undefined)
                this.addChild(obj);
        }
        
    }

}

class StatisticsInfo extends egret.DisplayObjectContainer{
    private _shape:egret.Shape;
    private _content:egret.TextField;

    constructor(){
        super();

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0xcacaca);
        this._shape.graphics.drawEllipse(0,0,25,25);
        this._shape.graphics.endFill();

        this._content = ToolMrg.getText(0,0,16,0xffffff,25);
        this.addChild(this._content);
        this._content.height = 25;
        this._content.textAlign = egret.HorizontalAlign.CENTER;
        this._content.verticalAlign = egret.VerticalAlign.MIDDLE;
    }

    public aa(num:number):void{
        this._shape.graphics.clear();
        if(num==1){
            this._shape.graphics.beginFill(0xE72E52);
            this._content.text = "赢";
        }else{
            this._shape.graphics.beginFill(0xcacaca);
            this._content.text = "输";
        }
        this._shape.graphics.drawEllipse(0,0,25,25);
        this._shape.graphics.endFill();
    }
}