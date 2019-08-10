class GameMain extends egret.DisplayObjectContainer {
	private static _mInstance: GameMain;
	public static get getInstance(): GameMain {
		return GameMain._mInstance;
	}

	public constructor() {
		super();
		GameMain._mInstance = this;
		this.once(egret.Event.ADDED_TO_STAGE, this.callFun, this);
	}

	private _mIsInit: boolean = false;
	private _mFrameIndex: number = 0;

	//当前状态机
	private _mCurrentState: GIGameStatus;
	private _mLastState: GIGameStatus;

	private callFun(e: egret.Event): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
		this.stage.addEventListener(egret.Event.ACTIVATE, this.onActivite, this);
	}

	private init(): void {
		this._mIsInit = true;
		GResCache.mResGroupConfig = ResGroup.resGroupConfig;
		RES.setMaxLoadingThread(5);
		this.addChild(GUIManager.getInstance);
		// this.stage.dirtyRegionPolicy = "off";
		this.setGameState(GStatus.LoadingStatus.getInstance);
	}

	//状态机切换
	public setGameState(gs: GIGameStatus): void {
		if (this._mCurrentState == gs || gs == undefined)
			return;
		if (this._mCurrentState != undefined)
			this._mCurrentState.exitStatus();
		this._mCurrentState = gs;
		this._mCurrentState.enterStatus();
	}

	private onEnterFrame(e: egret.Event): void {
		if (this._mIsInit == false && this._mFrameIndex > 2)
			this.init();
		let it: number = GTimerMag.getInstance.update();
		GMovieMag.getInstance.GonEnterFrame();
		if (this._mCurrentState != undefined) {
			this._mCurrentState.update(it);
		}
		this._mFrameIndex++;
	}

	public get StageWidth(): number {
		return this.stage.stageWidth;
	}

	public get StageHeight(): number {
		return this.stage.$stageHeight;
	}

	private onActivite(): void {
		if(keyboard.getInstance.parent != undefined)
			keyboard.getInstance.hide();
	}

	private onDEACTIVATE(): void {
		
	}

	public get getCurrState():GIGameStatus{
		return this._mCurrentState;
	}
}