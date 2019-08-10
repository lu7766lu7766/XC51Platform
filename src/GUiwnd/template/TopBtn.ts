/**
 * 置顶按钮
 */
class TopBtn extends egret.Bitmap {
	private static _mInstance: TopBtn;
	public static get getInstance(): TopBtn {
		if (TopBtn._mInstance == undefined)
			TopBtn._mInstance = new TopBtn();
		return TopBtn._mInstance;
	}

	private scroll: egret.ScrollView;

	public constructor() {
		super();
		GResCache.loadResByUrl("resource/assets/images/ui/today_match@2x.png", this.onLoaded, this);
	}

	private onLoaded(data: any, url: string): void {
		if (data == undefined)
			return;
		this.texture = GResCache.getRes(url);
	}

	public show(parent: egret.DisplayObjectContainer, scroll: egret.ScrollView, y?): void {
		if (this.parent != parent)
			parent.addChild(this);
		this.scroll = scroll;
		// this.x = GameMain.getInstance.StageWidth - 63;
		this.x=304;
		this.y = y != undefined ? y : GameMain.getInstance.StageHeight - 320;
		this.touchEnabled = true;
		this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtn, this);
		this.scroll.addEventListener(egret.Event.CHANGE, this.onScrollChange, this);
		this.visible = false;
	}

	public hide(): void {
		if (this.parent)
			this.parent.removeChild(this);
		this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBtn, this);
		if (this.scroll) {
			this.scroll.removeEventListener(egret.Event.CHANGE, this.onScrollChange, this);
			this.scroll = null;
		}
	}

	private touchBtn(e: egret.TouchEvent): void {
		if (this.scroll)
			this.scroll.setScrollTop(0, 300);
	}

	private onScrollChange(e: egret.Event): void {
		if (this.scroll)
			this.visible = this.scroll.scrollTop > 200;
	}

}