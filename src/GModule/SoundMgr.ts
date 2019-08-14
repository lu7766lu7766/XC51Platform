class SoundMgr {
	/**音效：点击抓 */
	public static SOUND_CLICK: string = 'resource/assets/sound/click.mp3';
	private static _mInstance: SoundMgr;

	/**是否开启音效 */
	public static playSound:boolean = true;
	/**是否黑屏 */
	public static playSound_hp:boolean = true;
	
	public static get getInstance(): SoundMgr {
		if (SoundMgr._mInstance == undefined)
			SoundMgr._mInstance = new SoundMgr();
		return SoundMgr._mInstance;
	}

	public constructor() {
	}
	public static preloadRes(loadMod: GLoadModule): void {
		
	}

	private back(data: any):void {
		if(data != undefined && data.url != undefined) {	
			this.play(data.url, 1);
		}
	}
	
	/**
	 * 播放音效
	 * @param name       音效名
	 * @param loops      循序次数，默认是0,循环播放
	 * @param vol        音量 0-1, 默认是最大1
	 * @param startTime  开始播放的初始位置（以秒为单位），默认值是 0
	 * 
	 * @returns egret.SoundChannel
	 */
	public play(name: string, loops?: number, vol?: number, startTime?: number, ): egret.SoundChannel {
		if(SoundMgr.playSound == false || SoundMgr.playSound_hp == false) return;
		/**使用时再加载音效 */
		let res = GResCache.getRes(name);
		if(res == undefined) {
			GResCache.loadResByUrl(name, this.back, this);
			return;
		}
		try {
			var sound: egret.Sound = res;
			var channel: egret.SoundChannel = sound.play(startTime, loops);
			channel.volume = vol == undefined ? 1 : vol;
			return channel;
		} catch (error) {
			return;
		}
	}

	/**界面背景音乐 */
	private _mBG: egret.SoundChannel;
	public static isOpen:boolean = true;
	private num:number=0;

	/**背景音乐切换 0是界面背景音效 1是游戏背景音效 */
	public playBgMusic(num?:number): egret.SoundChannel {
		if(num == undefined)//记忆当前在哪个页面
			num = this.num;
		else
			this.num=num;
		this.stopBgMusic();
		if(SoundMgr.isOpen==false) return;//不打开音效
		let sound:egret.Sound;
		if(num == 0)
			sound = GResCache.getRes("resource/assets/sound/pai/hall_bj.mp3");
		else
			sound = GResCache.getRes("resource/assets/sound/pai/game_bj.mp3");
		this._mBG = sound.play();

		return this._mBG;
	}

	/**界面背景停止 */
	private stopBgMusic(): void {
		if (this._mBG != undefined) {
			this._mBG.stop();
		}
	}

}