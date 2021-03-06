/**竞彩篮球开奖详情item */
class jcbasketBallItem extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): jcbasketBallItem {
		let obj = GObjPool.getInstance.GgetObj(jcbasketBallItem);
		if (obj == null)
			obj = new jcbasketBallItem();
		return obj;
	}
	public constructor() {
		super();
		this._mListObj = new GHashMap<xianxian1>();
		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xffffff);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 250);
		link.graphics.endFill();

		let link1 = new egret.Shape();
		this.addChild(link1);
		link1.graphics.beginFill(0xF5F5F7);
		link1.graphics.drawRect(0, 250, GameMain.getInstance.StageWidth, 10);
		link1.graphics.endFill();

		this.dayandLsName = ToolMrg.getText(38, 22, 20, 0x999999, 300);
		this.addChild(this.dayandLsName);
		this.dayandLsName.text = "周二001  韩职";

		this.teama = ToolMrg.getText(132, 66, 28, 0x333333, 300);
		this.addChild(this.teama);
		this.teama.text = "江源FC";
		this.teama.bold = true;

		this.teamb = ToolMrg.getText(520, 66, 28, 0x333333, 300);
		this.addChild(this.teamb);
		this.teamb.text = "无敌FC";
		this.teamb.bold = true;

		this.bbFen = ToolMrg.getText(0, 68, 24, 0xFF7000, 750);
		this.addChild(this.bbFen);
		this.bbFen.textAlign = egret.HorizontalAlign.CENTER;
		this.bbFen.textFlow = <Array<egret.ITextElement>>[
			{ "text": "4:0", style: { "textColor": 0xF72E52, size: 24 } }
		];
		this.bbFen.touchEnabled = true;
	}

	private dayandLsName: egret.TextField;//日期和联赛名字
	private teama: egret.TextField;//队a名字
	private teamb: egret.TextField;//队b名字
	private bbFen: egret.TextField;//比分
	private _mListObj: GHashMap<xianxian1>;//数据列表

	private _mData: JCBasketBallData;
	public setID(data: JCBasketBallData): void {
		this._mData = data;
		this.initallInfo();
		this.setteamandBF();
		this.setdayandLsName();
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**设置日期和联赛名字*/
	public setdayandLsName() {
		this.dayandLsName.text = this._mData.time + " " + this._mData.league_name;
	}

	/**设置队名 a b 和比分 */
	public setteamandBF(): void {
		this.teama.text = this._mData.team_a_name;
		this.teamb.text = this._mData.team_b_name;
		let color: number = 0x333333;
		if (this._mData.color == 1) {
			color = 0xF72E52;
		} else if (this._mData.color == 2) {
			color = 0x17B22C;
		}
		this.bbFen.textFlow = <Array<egret.ITextElement>>[
			{ "text": "" + this._mData.fen, style: { "textColor": color, size: 24 } }
		];
	}

	/**初始化所有数据*/
	public initallInfo(): void {
		let dataObj: xianxian1;
		for (let i = 0; i < this._mData.form.length; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new xianxian1(i);
				this._mListObj.Gput(i, dataObj);
			}
			dataObj.setID(i);
			dataObj.setconnet(this._mData.form[i]);
			if (i < 4) {
				dataObj.setPoint(40 + (i) * 167.5, 124);
				if (i > 0) {
					dataObj.leftline.visible = false;
					dataObj.rightline1.visible = false;
					if (i == 3) {
						dataObj.rightline1.visible = true;
						dataObj.rightline2.visible = false;
					}
				} else {
					dataObj.rightline1.visible = false;
					dataObj.rightline2.visible = true;
				}
			} else {
				dataObj.setPoint(40 + (i - 4) * 167.5, 124 + 49);
				if (i > 4) {
					dataObj.leftline.visible = false;
					dataObj.rightline1.visible = false;
					if (i == 7) {
						dataObj.rightline1.visible = true;
						dataObj.rightline2.visible = false;
					}
				} else {
					dataObj.rightline1.visible = false;
					dataObj.rightline2.visible = true;
				}
			}

			if (dataObj.parent == undefined) {
				this.addChild(dataObj);
			}
		}
	}

	public clean(): void {

	}
}

class xianxian1 extends egret.DisplayObjectContainer {

	public constructor(id: number) {
		super();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xffffff);
		link.graphics.drawRect(0, 0, 167.5, 50);
		link.graphics.endFill();

		let linkTop = new egret.Shape();
		this.addChild(linkTop);
		linkTop.graphics.beginFill(0xCACACA);
		linkTop.graphics.drawRect(0, 0, 166.5, 1);
		linkTop.graphics.endFill();

		let linklow = new egret.Shape();
		this.addChild(linklow);
		linklow.graphics.beginFill(0xCACACA);
		linklow.graphics.drawRect(0, 49, 166.5, 1);
		linklow.graphics.endFill();

		this.leftline = new egret.Shape();
		this.addChild(this.leftline);
		this.leftline.graphics.beginFill(0xCACACA);
		this.leftline.graphics.drawRect(0, 0, 1, 49);
		this.leftline.graphics.endFill();

		this.rightline1 = new egret.Shape();
		this.addChild(this.rightline1);
		this.rightline1.graphics.beginFill(0xCACACA);
		this.rightline1.graphics.drawRect(166.5, 0, 1, 50);
		this.rightline1.graphics.endFill();

		this.rightline2 = new egret.Shape();
		this.addChild(this.rightline2);
		this.rightline2.graphics.beginFill(0xCACACA);
		this.rightline2.graphics.drawRect(166.5, 10, 1, 32);
		this.rightline2.graphics.endFill();

		this.connet = ToolMrg.getText(0, 0, 24, 0x333333, 167.5);
		this.addChild(this.connet);
		this.connet.height = 50;
		this.connet.textAlign = egret.HorizontalAlign.CENTER;
		this.connet.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.connet.text = "主主胜";
		this.connet.touchEnabled = true;
		this.connet.bold = true;


	}

	public leftline: egret.Shape;//左线
	public rightline1: egret.Shape;//右线1
	public rightline2: egret.Shape;//右线2
	private myid: number = 0;//自身id
	private connet: egret.TextField;//显示内容

	public setID(id: number): void {
		this.myid = id;
	}

	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**设置显示内容*/
	public setconnet(str: string): void {
		this.connet.text = str;
	}

}