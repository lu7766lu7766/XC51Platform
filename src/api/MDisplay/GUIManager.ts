class GUIManager extends egret.DisplayObjectContainer {

	private static _mInstance:GUIManager;
	public static get getInstance():GUIManager{
		if(GUIManager._mInstance == undefined)
			GUIManager._mInstance = new GUIManager();
		return GUIManager._mInstance;
	}

	private readonly _mUITop:egret.DisplayObjectContainer;
	private readonly _mUITips:egret.DisplayObjectContainer;
	private readonly _mUIBg:egret.DisplayObjectContainer;
	private readonly _mUIMost:egret.DisplayObjectContainer;
	private constructor() {
		super();
		this._mUIBg = new egret.DisplayObjectContainer();
		this._mUITop = new egret.DisplayObjectContainer();
		this._mUITips = new egret.DisplayObjectContainer();
		this._mUIMost = new egret.DisplayObjectContainer();
		this.addChild(this._mUIBg);
		this.addChild(this._mUITop);
		this.addChild(this._mUITips);
		this.addChild(this._mUIMost);
	}

	public get bgLay():egret.DisplayObjectContainer{
		return this._mUIBg;
	}

	public get topLay():egret.DisplayObjectContainer{
		return this._mUITop;
	}

	public get tipLay():egret.DisplayObjectContainer{
		return this._mUITips;
	}

	public get mostLay():egret.DisplayObjectContainer{
		return this._mUIMost;
	}
}