/**投注内容 new */
class FofMultier_info extends egret.DisplayObjectContainer {
    /**内容 */
    private _topText: egret.TextField;//1串1
    private _centerText: egret.TextField;//全北现代=让胜[2.37]
    /**预测奖金 */
    private _moneyText: egret.TextField;

    /**倍数(文字) 默认1 */
    private _MultiplierText: egret.TextField;



    private _isInterception = false;

    constructor() {
        super();

        let link1 = new egret.Shape();
        this.addChild(link1);
        link1.graphics.beginFill(0xDEDEDE);
        link1.graphics.drawRect(0, 158.5, 750, 1.5);
        link1.graphics.endFill();

        let link2 = new egret.Shape();
        this.addChild(link2);
        link2.graphics.beginFill(0xdedede);
        link2.graphics.drawRect(372, 0, 1.5, 160);
        link2.graphics.endFill();

        let link3 = new egret.Shape();
        this.addChild(link3);
        link3.graphics.beginFill(0xdedede);
        link3.graphics.drawRect(592, 0, 1.5, 160);
        link3.graphics.endFill();

        this._topText = ToolMrg.getText(20, 0, 24, 0xff7000, 40);
        this.addChild(this._topText);
        this._topText.lineSpacing = 4;
        this._topText.height = 160;
        this._topText.textAlign = egret.HorizontalAlign.CENTER;
        this._topText.verticalAlign = egret.VerticalAlign.MIDDLE;

        this._centerText = ToolMrg.getText(48, 0, 22, 0x333333, 326);
        this.addChild(this._centerText);
        this._centerText.lineSpacing = 5;
        this._centerText.height = 160;
        this._centerText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._centerText.textAlign = egret.HorizontalAlign.CENTER;

        this._moneyText = ToolMrg.getText(592, 0, 32, 0xf72e52, 158);
        this.addChild(this._moneyText);
        this._moneyText.height = 160;
        this._moneyText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._moneyText.textAlign = egret.HorizontalAlign.CENTER;

        this._MultiplierText = ToolMrg.getText(394, 52, 32, 0x333333, 180);
        this.addChild(this._MultiplierText);
        this._MultiplierText.height = 60;
        this._MultiplierText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._MultiplierText.textAlign = egret.HorizontalAlign.CENTER;
        this._MultiplierText.text = "1";

        this.setDB();
    }

    private _mShareC: egret.Bitmap;
    /**适配处理 */
    private setDB(): void {
        this._mShareC = new egret.Bitmap();
        // this._mShareC.graphics.beginFill(0xF5F5F7, 1);
        // this._mShareC.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth,160);
        // this._mShareC.graphics.endFill();
        this._mShareC.width = GameMain.getInstance.StageWidth;
        this._mShareC.height = 160;
        RES.getResByUrl("resource/assets/images/ui/bai.png", (e) => { this._mShareC.$setBitmapData(e); }, this)
        this.addChildAt(this._mShareC, 0);
    }

    private _data: RewardData;
    /** listType传入足篮类型 1 5足 2 6篮 */
    public aa(data: RewardData): void {
        let list: string[] = [];
        if (data.m == 1 || data.m == 5) {//足球
            list = FootballDataMrg.getInstance.fbNameItem;
        } else if (data.m == 2 || data.m == 6) {//篮球
            list = BasketballDataMrg.getInstance.BasketballList;
        }

        this._data = data;
        if (data.type == 1)
            this._topText.text = "单\n关";
        else
            this._topText.text = data.type + "\n串\n1";

        let str = "";
        for (let i = 0; i < data.team.length; i++) {
            data.team[i][1];
            str = `${str}${ToolMrg.nameMode2(6, data.team[i][0])}=${list[Number(data.team[i][1])]}[${data.team[i][2]}]\n`;
        }

        if (data.team.length > 5) {
            str = "......";
        } else {
            str = str.substring(0, str.length - 1);
        }
        this._centerText.text = str;

        this._moneyText.text = ToolMrg.getDecimal(data.reward / 100, 2) + "元";
        this._MultiplierText.text = data.b + "倍";
        this.setclore();
    }

    /**设置投注内容颜色*/
    private setclore(): void {
        if (this._data.awareType == 1) {
            this._centerText.textColor = 0xf72e52;
            this._MultiplierText.textColor = 0xf72e52;
            this._moneyText.textColor=0xf72e52;
        } else {
            this._centerText.textColor = 0x333333;
            this._MultiplierText.textColor = 0x333333;
              this._moneyText.textColor=0x333333;
        }

    }

}