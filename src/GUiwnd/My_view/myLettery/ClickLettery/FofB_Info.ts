/**投注信息 子类 高度118px */
class FofB_Info extends egret.DisplayObjectContainer {
    /**类型 003 */
    private _dateText: egret.TextField;
    private _team1: egret.TextField;
    private _team2: egret.TextField;
    /**日期 */
    private _time:egret.TextField;

    /**投注内容 */
    private _contentText: egret.TextField;
    /**赛果 */
    private _resultText: egret.TextField;

    constructor() {
        super();

        let bj = new egret.Bitmap();
        this.addChild(bj);
        bj.width = GameMain.getInstance.StageWidth;
        bj.height = 118;
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { bj.$setBitmapData(e); }, this);

        let shape1 = new egret.Bitmap();
        this.addChild(shape1);
        shape1.y = 116;
        shape1.width = GameMain.getInstance.StageWidth;
        shape1.height = 2;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { shape1.$setBitmapData(e); }, this);

        let shape2 = new egret.Bitmap();
        this.addChild(shape2);
        shape2.x = 100;
        shape2.width = 2;
        shape2.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { shape2.$setBitmapData(e); }, this);

        let shape3 = new egret.Bitmap();
        this.addChild(shape3);
        shape3.x = 374;
        shape3.width = 2;
        shape3.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { shape3.$setBitmapData(e); }, this);

        let shape4 = new egret.Bitmap();
        this.addChild(shape4);
        shape4.x = 610;
        shape4.width = 2;
        shape4.height = 118;
        RES.getResByUrl("resource/assets/images/ui/hui.png", (e) => { shape4.$setBitmapData(e); }, this);

        let team1Shape = new egret.Shape();
        this.addChild(team1Shape);
        team1Shape.graphics.beginFill(0xCACACA);
        team1Shape.graphics.drawEllipse(168, 28, 24, 24);
        team1Shape.graphics.endFill();

        let team2Shape = new egret.Shape();
        this.addChild(team2Shape);
        team2Shape.graphics.beginFill(0xCACACA);
        team2Shape.graphics.drawEllipse(168, 66, 24, 24);
        team2Shape.graphics.endFill();

        let team1Text = ToolMrg.getText(172, 33, 16, 0xffffff);
        this.addChild(team1Text);
        team1Text.text = "主";

        let team2Text = ToolMrg.getText(172, 71, 16, 0xffffff);
        this.addChild(team2Text);
        team2Text.text = "客";

        this._dateText = ToolMrg.getText(0, 22, 20, 0x999999, 100);
        this.addChild(this._dateText);
        // this._dateText.height = 118;
        this._dateText.textAlign = egret.HorizontalAlign.CENTER;
        // this._dateText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._dateText.lineSpacing = 18;

        this._time = ToolMrg.getText(0, 59, 18, 0x999999, 100);
        this.addChild(this._time);
        this._time.textAlign = egret.HorizontalAlign.CENTER;
        this._time.lineSpacing = 5;

        this._team1 = ToolMrg.getText(196, 26 + 5, 22, 0x333333);
        this.addChild(this._team1);

        this._team2 = ToolMrg.getText(196, 62 + 5, 22, 0x333333);
        this.addChild(this._team2);

        this._contentText = ToolMrg.getText(375, 0, 22, 0x333333, 236);
        this.addChild(this._contentText);
        this._contentText.height = 118;
        this._contentText.lineSpacing = 5;
        this._contentText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._contentText.textAlign = egret.HorizontalAlign.CENTER;

        this._resultText = ToolMrg.getText(610, 0, 24, 0x333333, 140);
        this.addChild(this._resultText);
        this._resultText.height = 118;
        this._resultText.lineSpacing = 18;
        this._resultText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._resultText.textAlign = egret.HorizontalAlign.CENTER;
    }

    public aa(): void {

        this._dateText.text = `周三`;
        this._team1.text = `皇家马德里`;
        this._team2.text = `拜仁慕尼黑`;

        let str = "";
        let contentIndex = 0;//>2 break
        let resultIndex = 0;//>2 break
        //字符串拼接 最多显示3条
        // for()

        // this._contentText.text = "1:0(6.28)\n让球客胜(2.22)\n2:0(3.36)";
        // this._resultText.text = "2:3\n半场0:0";
    }

    /**设置day 和两队名字 */
    public setdayName(day: string, id: number, teama: string, teamb: string,_time:number): void {
        this._dateText.text = ToolMrg.nameMode2(5,day);
        this._team1.text = ToolMrg.nameMode2(8,teama);
        this._team2.text = ToolMrg.nameMode2(8,teamb);
        this._time.text = ToolMrg.getTime5(_time);
    }

    /**设置投注项*/
    public setAllX(list: string[][]): void {

        
        let len = list.length;
        if (len > 3) {
            len = 3;
        }
        // let str: string = "";
        // for (let i = 0; i < len; i++) {
        //     if (i == len - 1) {
        //         str += list[i];
        //     } else {
        //         str += list[i] + "\n";
        //     }
        // }

        let tt:Array<egret.ITextElement> = new Array<egret.ITextElement>();
        let text:egret.ITextElement;
        for(let i=0;i<len;i++) {
            if (i == len - 1) {//最后一个不加\n
                if(list[i][1]=="0")
                    text = { text: `${list[i][0]}`, style: { "textColor": 0x333333 } };
                else 
                    text = { text: `${list[i][0]}`, style: { "textColor": 0xf72e52 } };
            } else {
               if(list[i][1]=="0")
                    text = { text: `${list[i][0]}\n`, style: { "textColor": 0x333333 } };
                else 
                    text = { text: `${list[i][0]}\n`, style: { "textColor": 0xf72e52 } };
            }
            tt.push(text);
        }
        if(list.length>len){
            text = { text: `\n......`, style: { "textColor": 0x333333 } };
            tt.push(text);
        }

		this._contentText.textFlow = tt;

        // this._contentText.text = str;
    }

    /**设置比分*/
    public setBf(item:string[], type: number) {
        if (type == 1||type==5) {
            this._resultText.text = item[0] + "\n" + "半场" + item[1];
        } else if (type == 2 || type==6) {
            this._resultText.text = item[0];
        }
    }

    public setBFF(str:number) {
        if(str==undefined || str==1)
            this._resultText.text = "未开赛";
        else
            this._resultText.text = "进行中";
    }



    public cleanall() {
        this._dateText.text = ``;
        this._team1.text = ``;
        this._team2.text = ``;
        this._contentText.text = "";
        this._resultText.text = "";
        this._time.text = "";
    }

}