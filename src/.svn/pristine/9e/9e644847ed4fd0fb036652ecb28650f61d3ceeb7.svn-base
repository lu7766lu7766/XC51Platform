class HorseObj extends egret.DisplayObjectContainer {

	private static _mInstance: HorseObj;
	public static get getInstance(): HorseObj {
		if (HorseObj._mInstance == undefined)
			HorseObj._mInstance = new HorseObj();
		return HorseObj._mInstance;
	}
	public _mImg: egret.Bitmap;
	public _mText: egret.TextField;

	public constructor() {
		super();

		this._mImg = new egret.Bitmap();
		this.addChild(this._mImg)

		this._mText = ToolMrg.getText(0, 328, 34,0xffffff,630);
		this._mText.text = "谁是你心中五大联赛的最佳11人？投票吧";
		this.addChild(this._mText);
		this._mText.textAlign = egret.HorizontalAlign.CENTER;
	}

	public setText(str: string) {
		this._mText.text = ToolMrg.nameMode(20, str);
	}
}

/**公告跑马灯 */
class HorseRace extends egret.DisplayObjectContainer {
	private static _mInstance: HorseRace;
	public static get getInstance(): HorseRace {
		if (HorseRace._mInstance == undefined)
			HorseRace._mInstance = new HorseRace();
		return HorseRace._mInstance;
	}
	/**滑动触摸屏 */
	private _mBGMove: egret.Bitmap;

	/** 宣传图层*/
	private _mPropagGroup: egret.DisplayObjectContainer;

	/** 点图层*/
	private _mSpotGroup: egret.DisplayObjectContainer;

	/**跑马灯宣传图列表 */
	private propagandaMap: GHashMap<HorseObj>;
	/**跑马灯点图列表 */
	private spotMap: GHashMap<egret.Bitmap>;

	/**跑马灯文字 */
	private _mTextList: Array<string> = ["谁是你心中五大联赛的最佳11人？投票吧", "NBA：哈登疯狂个人表现秀？", "粤语西决G2勇士VS火箭队", "年轻国王换边再战亦难挡火箭", "【战报】欧文37+6+7塔图姆26分", "欧冠之王！C罗攻入欧冠125球"];
	/**跑马灯总张数 */
	private _mBitList: Array<string> = ["banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png", "banner_home.png"];
	/**下标图片*/
	private _mBitXBList: Array<string> = ["yd_down_home.png", "yd_nor_home.png"];
	/**跑马灯间隔时间3秒*/
	private _mSpaceTime: number = 1500;
	private _mSpaceTimeTemp: number = 1500;

	/**当前播放张数 */
	private _mIndex: number = 1;
	/**首次进入 */
	private isFirst: boolean = true;

	/**进行点击 定时器不能滑动*/
	private isTouch: boolean = false;

	private constructor() {
		super();

		this._mPropagGroup = new egret.DisplayObjectContainer();
		this._mSpotGroup = new egret.DisplayObjectContainer();

		this.propagandaMap = new GHashMap<HorseObj>();
		this.spotMap = new GHashMap<egret.Bitmap>();
		this.initMap();

		this._mBGMove = new egret.Bitmap();
		LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this._mBitList[0], this.loadImgBack1, this);
		this.addChild(this._mBGMove);
		this._mBGMove.alpha = 0.01;

		this.freshUpdate();
		this.addChild(this._mPropagGroup);
		this.addChild(this._mSpotGroup);
		//----
		// this.isTouch = false;
		// this.changePage();
		// this.addMove();

		// this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
	}

	private loadImgBack1(e: egret.Texture, obj): void {
		this._mBGMove.$setTexture(e);
		this._mBGMove.width = 750;
		this._mBGMove.height = 376;
	}


	/**更新   无限循环，一直执行，相当于17毫秒执行一次*/
	private freshUpdate(): void {
		GTimerMag.getInstance.addTimerTask("freshUpdate", 99999999, 17, () => {
			this.update(17);
		}, this);
	}

	/**添加滑动事件 */
	private addMove(): void {
		this._mBGMove.touchEnabled = true;
		this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBEGIN, this);
		this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMOVE, this);
		this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
		this._mBGMove.addEventListener(egret.TouchEvent.TOUCH_END, this.onFinish, this);
	}

	/**移除滑动事件 */
	private removeMove(): void {
		this._mBGMove.touchEnabled = false;
		this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBEGIN, this);
		this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onMOVE, this);
		this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.enterGame, this);
		this._mBGMove.removeEventListener(egret.TouchEvent.TOUCH_END, this.onFinish, this);
	}

	/**偏移量x */
	private deviationX: number;
	/**转折点位置 */
	private tranX: number = 0;
	/**上次位置 */
	private lastX: number = 0;
	/**1左滑 2右滑*/
	private direction: number = 1;

	/**点击下时 */
	private onBEGIN(event: egret.TouchEvent) {
		this.deviationX = event.stageX;
		this.tranX = 0;
		this.lastX = 0;

		this.isTouch = true;
	}

	/**滑动过程 */
	private onMOVE(event: egret.TouchEvent): void {
		let xx: number = (event.stageX - this.deviationX);
		xx = Math.floor(xx);
		if (this.lastX == xx) {
			return;
		}

		this.movePage(xx - this.lastX);
		this.lastX = xx;
	}

	/**当前滑动宣传对象 */
	private bitmapP1: HorseObj;
	/**当前滑动宣传对象 */
	private bitmapP2: HorseObj;

	/**移动偏移量 */
	private movePage(xx: number) {
		if (this.parent == undefined || this._mBitList.length == 1) {
			return;
		}
		if (this.isFirst == true) {
			this.isFirst = false;
			return;
		}

		this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
		this.bitmapP1.x += xx;
		if (xx > 0) {//右滑动
			this.direction = 2;
		} else if (xx < 0) {//左滑动
			this.direction = 1;
		}

		this.bitmapP2 = this.nextMove();
		this.bitmapP2.x += xx;
	}

	/**获取当前显示对象 */
	private nextMove(): HorseObj {
		let temp: HorseObj;

		if (this.direction == 2) {//右滑动
			if (this.bitmapP1.x <= 0 && this.bitmapP2 != undefined && this.bitmapP2.parent != undefined) {
				temp = this.bitmapP2;
			} else {
				if (this._mIndex == 1) {
					temp = this.propagandaMap.Gget(this._mBitList.length - 1);

					if (this._mBitList.length == 2) {
						if (temp.x >= GameMain.getInstance.StageWidth) {
							this.removeLash(this._mIndex);
						}
					} else {
						this.removeLash(this._mIndex);
					}
				} else {
					temp = this.propagandaMap.Gget(this._mIndex - 2);

					if (this._mIndex == this._mBitList.length) {
						if (this._mBitList.length == 2) {
							if (temp.x >= GameMain.getInstance.StageWidth) {
								this.removeLash(0);
							}
						} else {
							this.removeLash(0);
						}
					} else {
						this.removeLash(this._mIndex);
					}
				}
				if (temp.parent == undefined) {
					temp.x = -GameMain.getInstance.StageWidth;
					this._mPropagGroup.addChild(temp);
				}
			}
		} else if (this.direction == 1) {//左滑动
			if (this.bitmapP1.x >= 0 && this.bitmapP2 != undefined && this.bitmapP2.parent != undefined) {
				temp = this.bitmapP2;
			} else {
				if (this._mIndex == this._mBitList.length) {
					temp = this.propagandaMap.Gget(0);

					if (this._mBitList.length == 2) {
						if (temp.x <= 0) {
							this.removeLash(this._mIndex - 2);
						}
					} else {
						this.removeLash(this._mIndex - 2);
					}
				} else {
					temp = this.propagandaMap.Gget(this._mIndex);

					if (this._mIndex == 1) {
						if (this._mBitList.length == 2) {
							if (temp.x <= 0) {
								this.removeLash(this._mBitList.length - 1);
							}
						} else {
							this.removeLash(this._mBitList.length - 1);
						}
					} else {
						this.removeLash(this._mIndex - 2);
					}
				}
				if (temp.parent == undefined) {
					temp.x = GameMain.getInstance.StageWidth;
					this._mPropagGroup.addChild(temp);
				}
			}
		}

		return temp;
	}

	/**移除显示上次宣传对象图 */
	private removeLash(num: number) {
		let tempRemove: HorseObj;
		if (this.propagandaMap.GhasKey(num)) {
			tempRemove = this.propagandaMap.Gget(num);
			if (tempRemove.parent != undefined) {
				tempRemove.parent.removeChild(tempRemove);
			}
		}
	}

	/**滑动结束 */
	private onFinish(event: egret.TouchEvent): void {
		if (this.parent == undefined || this._mBitList.length == 1 ||
			this.bitmapP1 == undefined || this.bitmapP2 == undefined) {
			return;
		}

		if (this.direction == 1) {//左滑动
			egret.Tween.get(this.bitmapP1).to({ x: -GameMain.getInstance.StageWidth }, 200).call(this.changeIndex, this);
			egret.Tween.get(this.bitmapP2).to({ x: 0 }, 200);
		} else if (this.direction == 2) {//右滑动
			egret.Tween.get(this.bitmapP1).to({ x: GameMain.getInstance.StageWidth }, 200);
			egret.Tween.get(this.bitmapP2).to({ x: 0 }, 200).call(this.changeIndex, this);
		}

		this.isTouch = false;
		this._mSpaceTimeTemp = this._mSpaceTime;
	}

	/**滑动结束后进行换页 */
	private changeIndex(): void {
		if (this.direction == 1) {//左滑动
			if (this._mIndex >= this._mBitList.length) {
				this._mIndex = 1;
			} else {
				this._mIndex++;
			}
		} else if (this.direction == 2) {
			if (this._mIndex <= 1) {
				this._mIndex = this._mBitList.length;
			} else {
				this._mIndex--;
			}
		}
		if (this.bitmapP1.parent != undefined) {
			this.bitmapP1.parent.removeChild(this.bitmapP1);
		}
		this.bitmapP1 = this.bitmapP2;
		this.bitmapP2 = undefined;
		this.changePage();
	}
	/**图片 */
	private bitmapP: HorseObj;
	/**点 */
	private bitmapS: egret.Bitmap;

	/**初始化列表 */
	private initMap(): void {

		for (let i = 0; i < this._mBitList.length; i++) {
			// this.bitmapP = new egret.Bitmap();
			this.bitmapP = new HorseObj();
			this.bitmapP.x = 0;

			let thisObj = this;
			let bitmapP: HorseObj = this.bitmapP;
			if (thisObj._mIndex == i + 1) {
				thisObj._mPropagGroup.addChild(bitmapP);
			}
			thisObj.propagandaMap.Gput(i, this.bitmapP);
			LoadNetPic.getLoadNetPic.loadPic('resource/assets/images/ui/' + this._mBitList[i], (e) => {

				bitmapP._mImg.$setTexture(e);
				bitmapP._mImg.width = 750;
				bitmapP._mImg.height = 376;

			}, this);

			/**文字 */
			bitmapP.setText(this._mTextList[i]);

			this.bitmapS = new egret.Bitmap(GResCache.getRes('resource/assets/images/ui/' + this._mBitXBList[0]));
			this.bitmapS.x = i * 20 + 300;
			this.bitmapS.y = 350;
			this._mSpotGroup.addChild(this.bitmapS);
			this.spotMap.Gput(i, this.bitmapS);


		}

		this._mSpotGroup.x = (GameMain.getInstance.StageWidth - this._mSpotGroup.width) * 0.5;
	}

	private qd(data: any, url: string): void  {
		if (data  !=  undefined)  {
			this.bitmapS.$setBitmapData(data);
		}
	}


	public show(parent, x?, y?): void {
		this.y = 125;
		if (x != undefined) this.x = x;
		if (y != undefined) this.y = y;

		if (this.parent != parent) {
			parent.addChild(this);
		}
		// parent.addChildAt(this);
		this.isTouch = false;
		this.changePage();
		this.addMove();

		this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
	}

	public update(it: number): void {
		if (this.isTouch == false) {
			this._mSpaceTimeTemp -= it;
			if (this._mSpaceTimeTemp <= 0) {
				this._mSpaceTimeTemp = this._mSpaceTime;
				this.timeMoveBegin();
			}
		}
	}

	/**进行滑动 */
	private timeMoveBegin(): void {
		if (this.isTouch == true) {
			return;
		}
		this.direction = 1;
		this.bitmapP1 = this.propagandaMap.Gget(this._mIndex - 1);
		if (this._mIndex == this._mBitList.length) {
			this.bitmapP2 = this.propagandaMap.Gget(0);
		} else {
			this.bitmapP2 = this.propagandaMap.Gget(this._mIndex);
		}
		if (this.bitmapP2.parent == undefined) {
			this.bitmapP2.x = GameMain.getInstance.StageWidth;
			this._mPropagGroup.addChild(this.bitmapP2);
		}

		if (this.direction == 1) {//左滑动
			egret.Tween.get(this.bitmapP1).to({ x: -GameMain.getInstance.StageWidth }, 500).call(this.changeIndex, this);
			egret.Tween.get(this.bitmapP2).to({ x: 0 }, 500);
		} else if (this.direction == 2) {//右滑动
			egret.Tween.get(this.bitmapP1).to({ x: GameMain.getInstance.StageWidth }, 500);
			egret.Tween.get(this.bitmapP2).to({ x: 0 }, 500).call(this.changeIndex, this);
		}

		this.changePage();
	}

	/**页码切换 */
	private changePage(): void {
		let bitmapS: egret.Bitmap;
		for (let i = 0; i < this._mBitList.length; i++) {
			if (this.spotMap.GhasKey(i)) {
				bitmapS = this.spotMap.Gget(i);
				if (i == this._mIndex - 1) {
					bitmapS.$setBitmapData(GResCache.getRes('resource/assets/images/ui/' + this._mBitXBList[0]));
				} else {
					bitmapS.$setBitmapData(GResCache.getRes('resource/assets/images/ui/' + this._mBitXBList[1]));
				}
			}
		}
	}

	/**点击图片进入游戏 */
	private enterGame(): void {
		if (this.bitmapP1 != undefined) {
			if (this.bitmapP1.x != 0) {
				return;
			}
			if (this._mIndex == 1) {
				
			} else if (this._mIndex == 2) {
				this.isTouch = false;
			} else if (this._mIndex == 3) {
				this.isTouch = false;
			}
		}
	}


	//隐藏
	public hide(): void {
		this.removeMove();

		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
	}
}