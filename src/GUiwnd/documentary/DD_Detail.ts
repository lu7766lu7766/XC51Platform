/**方案详情 */
class DD_Detail extends egret.DisplayObjectContainer{
    private _item:GHashMap<DetailInfo>;
    private _shape:egret.Shape;
    private _text:egret.TextField;

    // private objList:GSlideObj;

    constructor(){
        super();
        this.hide();

        // this.objList = new GSlideObj();
        this._item = new GHashMap<DetailInfo>();

        let text1 = ToolMrg.getText(160,12,24,0x999999);
        this.addChild(text1);
        text1.height = 40;
        text1.verticalAlign = egret.VerticalAlign.MIDDLE;
        text1.text = "场次";

        let text2 = ToolMrg.getText(448,12,24,0x999999);
        this.addChild(text2);
        text2.height = 40;
        text2.verticalAlign = egret.VerticalAlign.MIDDLE;
        text2.text = "投注项";

        let text3 = ToolMrg.getText(656,12,24,0x999999);
        this.addChild(text3);
        text3.height = 40;
        text3.verticalAlign = egret.VerticalAlign.MIDDLE;
        text3.text = "赛果";

        let link = new egret.Shape();
        this.addChild(link);
        link.graphics.beginFill(0xdedede);
        link.graphics.drawRect(0,62.5,750,1.5);
        link.graphics.endFill();

        this._shape = new egret.Shape();
        this.addChild(this._shape);
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0,0,750,90);
        this._shape.graphics.endFill();

        //
        this._text = ToolMrg.getText(28,26,22,0x999999);
        this.addChild(this._text);
        this._text.lineSpacing = 18;
        this._text.text = "注：全场90分钟(含伤停补时，不含加时赛及点球大战)，页面奖金仅\n供参考，实际奖金以投注成功为准。";

        this.setDB();
    }

    public updata(data:GD_DetailData):void{
        if(data == undefined)
            data = new GD_DetailData();
            
        let item = data.GD_detailItem;

        let objHeight = 64;
        for(let key of item.keys){
            let obj:DetailInfo;
            if(this._item.GhasKey(key)){
                obj = this._item.Gget(key);
            }else{
                obj = new DetailInfo();
                this._item.Gput(key,obj);
            }
            obj.aa(item.Gget(key),data.k,data.model,data.id);
            obj.y = objHeight;
            objHeight = objHeight + obj.height;
            if(obj.parent==undefined)
                this.addChild(obj);
        }

        this._shape.graphics.clear();
        this._shape.graphics.beginFill(0xffffff);
        this._shape.graphics.drawRect(0,objHeight,750,90);
        this._shape.graphics.endFill();

        this._text.y = objHeight + 24;
        // let str = "";
        // if(data._type==1){
        //     str = "单关";
        // }else{
        //     str = `${data._type}串1`;
        // }
        // this._text.text = `过关方式：${str}`;
        ToolMrg.upItemofGHashMap(this._item,item);
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

class DetailInfo extends egret.DisplayObjectContainer{
    private _time:egret.TextField;
    private _type:egret.TextField;
    private _team1:egret.TextField;
    private _team2:egret.TextField;
    private _content1:egret.TextField;
    private _content2:egret.TextField;

    constructor(){
        super();

        this._time = ToolMrg.getText(28,45,18,0x333333);
        this.addChild(this._time);
        this._time.height = 40;
        this._time.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._time.lineSpacing = 5;
        

        this._type = ToolMrg.getText(28,8,20,0x333333);
        this.addChild(this._type);
        this._type.height = 40;
        this._type.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._team1 = ToolMrg.getText(170,16,22,0x333333);
        this.addChild(this._team1);
        this._team1.height = 32;
        this._team1.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._team2 = ToolMrg.getText(170,52,22,0x333333);
        this.addChild(this._team2);
        this._team2.height = 32;
        this._team2.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._content1 = ToolMrg.getText(360,0,20,0x333333,250);
        this.addChild(this._content1);
        this._content1.height = 100;
        this._content1.lineSpacing = 4;
        this._content1.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._content1.textAlign = egret.HorizontalAlign.CENTER;

        this._content2 = ToolMrg.getText(610,0,22,0x333333,140);
        this.addChild(this._content2);
        this._content2.height = 100;
        this._content2.lineSpacing = 8;
        this._content2.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._content2.textAlign = egret.HorizontalAlign.CENTER;

        let zShape = new egret.Shape();
        this.addChild(zShape);
        zShape.graphics.beginFill(0xcacaca);
        zShape.graphics.drawEllipse(142,20,24,24);
        zShape.graphics.endFill();

        let kShape = new egret.Shape();
        this.addChild(kShape);
        kShape.graphics.beginFill(0xcacaca);
        kShape.graphics.drawEllipse(142,56,24,24);
        kShape.graphics.endFill();

        let zText = ToolMrg.getText(142,20,16,0xffffff,24);
        this.addChild(zText);
        zText.height = 24;
        zText.textAlign = egret.HorizontalAlign.CENTER;
        zText.verticalAlign = egret.VerticalAlign.MIDDLE;
        zText.text = "主";

        let kText = ToolMrg.getText(142,56,16,0xffffff,24);
        this.addChild(kText);
        kText.height = 24;
        kText.textAlign = egret.HorizontalAlign.CENTER;
        kText.verticalAlign = egret.VerticalAlign.MIDDLE;
        kText.text = "客";

        let shape1 = new egret.Shape();
        this.addChild(shape1);
        shape1.graphics.beginFill(0xdedede);
        shape1.graphics.drawRect(0,99,750,1.5);
        shape1.graphics.endFill();

        let shape2 = new egret.Shape();
        this.addChild(shape2);
        shape2.graphics.beginFill(0xdedede);
        shape2.graphics.drawRect(360,0,1.5,101);
        shape2.graphics.endFill();
        
        let shape3 = new egret.Shape();
        this.addChild(shape3);
        shape3.graphics.beginFill(0xdedede);
        shape3.graphics.drawRect(610,0,1.5,101);
        shape3.graphics.endFill();
        this.setDB();
    }

    private _data:GD_detailSubdata;

    /**对象 是否公开 是否保密 发单人id */
    public aa(data:GD_detailSubdata,num:number,ofnum:number,id):void{
        this._data = data;

        this._time.text = `${ToolMrg.getTime5(data._time)}`;
        this._type.text = `${data.len_name}`;
        this._team1.text = `${data.team_a_name}`;
        this._team2.text = `${data.team_b_name}`;

        if (id == UserData.getInstance.userId) {//自己
            let contentStr = "";
            let contentIndex = 0;
            for (let i = 0; i < data.want.length; i++) {
                if (i > 2) break;
                contentStr = contentStr + data.want[i] + "\n";
                contentIndex += 1;
            }
            if (contentIndex > 2) {
                contentStr = contentStr + "...";
            } else {
                contentStr = contentStr.substring(0, contentStr.length - 1);
            }
            this._content1.text = `${contentStr}`;
        } else {//别人
            if (ofnum == 1) {
                let contentStr = "";
                let contentIndex = 0;
                for (let i = 0; i < data.want.length; i++) {
                    if (i > 2) break;
                    contentStr = contentStr + data.want[i] + "\n";
                    contentIndex += 1;
                }
                if (contentIndex > 2) {
                    contentStr = contentStr + "...";
                } else {
                    contentStr = contentStr.substring(0, contentStr.length - 1);
                }
                this._content1.text = `${contentStr}`;
            } else {
                if (ofnum == 2) {
                    this._content1.text = `保密`;
                    // this._content2.text = "保密";
                } else {
                    this._content1.text = `保密`;
                    // this._content2.text = "保密";
                }
            }
        }
        //赛果
        if (data._static == 1 || data._static == 2){
            if(data._static==1)
                this._content2.text = "未开赛";
            else
                this._content2.text = "进行中";
        }else {
            let resultStr = "";
            let resultIndex = 0;
            for (let i = 0; i < data.result.length; i++) {
                if (i > 2) break;
                resultStr = resultStr + data.result[i] + "\n";
                resultIndex += 1;
            }
            if (resultIndex > 2) {
                resultStr = resultStr + "...";
            } else {
                resultStr = resultStr.substring(0, resultStr.length - 2);
            }
            this._content2.text = resultStr;
        }
    }

    private _mShareC: egret.Shape;
	/**适配处理 */
	private setDB(): void {
		this._mShareC = new egret.Shape();
		this._mShareC.graphics.beginFill(0xF5F5F7, 1);
		this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 101);
        this._mShareC.graphics.endFill();
		this.addChildAt(this._mShareC, 0);
	}
}