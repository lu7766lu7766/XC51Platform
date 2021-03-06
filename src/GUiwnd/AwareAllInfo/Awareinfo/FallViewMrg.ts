/**足球开奖详细界面显示 */
class FallViewMrg extends egret.DisplayObjectContainer {
	private static _mInstance: FallViewMrg;
	public static get getInstance(): FallViewMrg {
		if (FallViewMrg._mInstance == undefined)
			FallViewMrg._mInstance = new FallViewMrg();
		return FallViewMrg._mInstance;
	}
	public constructor() {
		super();
		this.y = 200;
		this.connetyq = new egret.DisplayObjectContainer();
		this.addChild(this.connetyq);

	}

	
	private connetyq: egret.DisplayObjectContainer;//显示容器
	public getconnet(): egret.DisplayObjectContainer {
		return this.connetyq;
	}

	public show(): void {
		if (this.parent == undefined) {
			GUIManager.getInstance.bgLay.addChild(this);
		}
		this.showconnet();
	}

	public hide(): void {
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		// BakorfallViewMrg.inIndex = 1;
		this.cleanall();
	}

	/**足球数据显示*/
	public showconnet(): void {
		let id: number = BakorfallViewMrg.inIndex;
		if (id == 1) {//赛果 
			football1.getInstance.hide();
			football2.getInstance.show();
			football3.getInstance.hide();
			football4.getInstance.hide();
		} else if (id == 2) {// 即时
			football1.getInstance.show();
			football2.getInstance.hide();
			football3.getInstance.hide();
			football4.getInstance.hide();
		} else if (id == 3) {//关注
			football1.getInstance.hide();
			football2.getInstance.hide();
			football3.getInstance.hide();
			football4.getInstance.show();
		} else {//赛程 
			football1.getInstance.hide();
			football2.getInstance.hide();
			football3.getInstance.show();
			football4.getInstance.hide();
		}
	}

	/**清除所有*/
	public cleanall(): void {
		football1.getInstance.hide();
		football2.getInstance.hide();
		football3.getInstance.hide();
		football4.getInstance.hide();
	}

	
}