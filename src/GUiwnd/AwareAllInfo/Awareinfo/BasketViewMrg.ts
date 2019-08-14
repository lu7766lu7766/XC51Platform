/**篮球开奖详细界面显示 */
class BasketViewMrg extends egret.DisplayObjectContainer {
	private static _mInstance: BasketViewMrg;
	public static get getInstance(): BasketViewMrg {
		if (BasketViewMrg._mInstance == undefined)
			BasketViewMrg._mInstance = new BasketViewMrg();
		return BasketViewMrg._mInstance;
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
		if (id == 1) {// 赛果 
			basketball1.getInstance.hide();
			basketball2.getInstance.show();
			basketball3.getInstance.hide();
			basketball4.getInstance.hide();
		} else if (id == 2) {//即时
			basketball1.getInstance.show();
			basketball2.getInstance.hide();
			basketball3.getInstance.hide();
			basketball4.getInstance.hide();
		} else if (id == 3) {//关注 
			basketball1.getInstance.hide();
			basketball2.getInstance.hide();
			basketball3.getInstance.hide();
			basketball4.getInstance.show();
		} else {//赛程
			basketball1.getInstance.hide();
			basketball2.getInstance.hide();
			basketball3.getInstance.show();
			basketball4.getInstance.hide();
		}
	}

	/**清除所有*/
	public cleanall(): void {
		basketball1.getInstance.hide();
		basketball2.getInstance.hide();
		basketball3.getInstance.hide();
		basketball4.getInstance.hide();
	}
}