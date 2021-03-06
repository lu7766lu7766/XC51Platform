/**足球即时数据显示*/
class football1 extends egret.DisplayObjectContainer {
	private static _mInstance: football1;
	public static get getInstance(): football1 {
		if (football1._mInstance == undefined)
			football1._mInstance = new football1();
		return football1._mInstance;
	}
	public constructor() {
		super();
		this.y = -40 + GameValue.adaptationScreen;
		this._mListObj = new GHashMap<footballitem1>();
		this._mContainQB = new egret.DisplayObjectContainer();
		this._scroViewQB = new egret.ScrollView();
		this.addChild(this._scroViewQB)
		this.addScoll(this._mContainQB, this._scroViewQB);
		this.GSlideOb = new GSlideObj();

		let link = new egret.Shape();
		this.addChild(link);
		link.graphics.beginFill(0xF5F5F7);
		link.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 10);
		link.graphics.endFill();

	}
	private GSlideOb: GSlideObj;
	/**全部信息 滚动 */
	private _mContainQB: egret.DisplayObjectContainer;
	private _scroViewQB: egret.ScrollView;
	private _mListObj: GHashMap<footballitem1>;//数据列表

	private addScoll(contain: egret.DisplayObjectContainer, scroView: egret.ScrollView): void {
		scroView.x = 0;
		scroView.y = 10;
		scroView.scrollSpeed = 0.4;
		//设置滚动内容
		scroView.setContent(contain);
		scroView.bounces = false;
		scroView.verticalScrollPolicy = 'on';
		scroView.horizontalScrollPolicy = 'off';
		//设置滚动区域宽高
		scroView.width = GameMain.getInstance.StageWidth;
		scroView.height = GameMain.getInstance.StageHeight - 320 - this.y;
		scroView.bounces = true;
	}

	private ifshow: boolean = false;//是否通过show进来  
	public show(list11?: GHashMap<footballCofObj>) {
		let connet: egret.DisplayObjectContainer = FallViewMrg.getInstance.getconnet();
		if (this.parent == undefined) {
			connet.addChild(this);
		}
		this.ifshow = true;
		this.initallInfo(list11);
	}

	public hide(): void {
		if (this == undefined) return;
		if (this.parent != undefined) {
			this.parent.removeChild(this);
		}
		this.hideData();
	}

	/**初始化所有数据*/
	public initallInfo(list11?: GHashMap<footballCofObj>): void {
		this.hideData();
		this._scroViewQB.setScrollTop(20);
		let len: number = 0;
		let list: GHashMap<footballCofObj>;
		len = FootballConfinData.getInstance.getlist().size;
		list = FootballConfinData.getInstance.getlist();
		if (list11 != undefined && list11.size > 0) {
			len = list11.size;
			list = list11;
		}
		let dataObj: footballitem1;
		for (let i = 0; i < len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = footballitem1.getObj();
				this._mListObj.Gput(i, dataObj);
			}
			dataObj.setID(i + 1);
			dataObj.ssetjiqoqNum(0, 0);
			// let data: footballCofObj = FootballConfinData.getInstance.getInfo(i + 1);
			let data: footballCofObj = list.Gget(i + 1);
			if (data != undefined) {
				dataObj.setInfo1(data.name, data.timer, data.leftname, data.bfText, data.bcBF, data.rightname);
				if (dataObj.ifsetIcon == false) {
					dataObj.setIcon(data.leftIcon);
					dataObj.setIconright(data.rightIcon);
					dataObj.ifsetIcon = true;
				}
				dataObj.setLeft(data.leftyellownum, data.leftrednum);
				dataObj.setright(data.rightyellownum, data.rightrednum);
				dataObj.setxingxing(data.ifgz);
				dataObj.setcolor(data.color);
				let status: number = data.status;
				if (status == 1 || status == 2 || status == 3 || status == 4 || status == 5) {
					dataObj.resultTextset(1, data.touding);
				} else {
					if (status == 0) {
						dataObj.resultTextset(3, data.getstatus());
					} else {
						dataObj.resultTextset(1, data.getstatus());
					}
				}
				dataObj.setmothday(data.rqday);
				dataObj.setssID(data.id);
			}
			dataObj.setPoint(0, 10 + (i) * 125);
			if (list11 != undefined) {
				if (dataObj.parent == undefined) {
					this._mContainQB.addChild(dataObj);
				}
			}
		}

		if (len > 0) {
			BakorfallViewMrg.getInstance.setDecide(false);
		} else {
			BakorfallViewMrg.getInstance.setDecide(true);
		}
		if (this.ifshow == true) {
			this._scroViewQB.setScrollTop(20);
			this.ifshow = false;
		}
		if (list11 == undefined) {
			this.GSlideOb.showDataByMap(15, 125, this._scroViewQB, this._mContainQB, this._mListObj);
		}

	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: footballitem1 = this._mListObj.Gget(key);
			if (data != undefined) {
				data.ifsetIcon = false;
				GObjPool.getInstance.Gadd2Pool(data);
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
		this._mListObj.clear();
	}
}

class footballitem1 extends egret.DisplayObjectContainer implements GIObjPool {
	public static getObj(): footballitem1 {
		let obj = GObjPool.getInstance.GgetObj(footballitem1);
		if (obj == null)
			obj = new footballitem1();
		return obj;
	}

	public constructor() {
		super();
		if (this._mBg == undefined) {
			// this._mBg = new egret.Shape();
			// this.addChild(this._mBg);
			// this._mBg.graphics.beginFill(0xffffff);
			// this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 122);
			// this._mBg.graphics.endFill()

			// let link = new egret.Shape();
			// this.addChild(link);
			// link.graphics.beginFill(0xF5F5F7);
			// link.graphics.drawRect(0, 122, GameMain.getInstance.StageWidth, 3);
			// link.graphics.endFill();
			this._mBg = new egret.Bitmap();
			this._mBg.x = 0;
			this._mBg.y = 0;
			this._mBg.width = 750;
			this._mBg.height = 122;
			this.addChild(this._mBg);
			RES.getResByUrl("resource/assets/images/ui/bai.png", this.bgBackwhite, this, RES.ResourceItem.TYPE_IMAGE);

			this._bglowxian = new egret.Bitmap();
			this._bglowxian.x = 0;
			this._bglowxian.y = 122;
			this._bglowxian.width = 750;
			this._bglowxian.height = 3;
			this.addChild(this._bglowxian);
			RES.getResByUrl("resource/assets/images/ui/hui.png", this.bgBackhui, this, RES.ResourceItem.TYPE_IMAGE);

		}

		this.name1 = ToolMrg.getText(28, 16, 20, 0xFF7000, 150);
		this.name1.text = "欧洲冠杯";
		this.name1.fontFamily = "微软雅黑";
		this.name1.bold = true;
		this.addChild(this.name1);

		this.timer = ToolMrg.getText(28, 50, 20, 0x999999, 150);
		this.timer.text = "19 : 20";
		this.timer.fontFamily = "微软雅黑";
		this.timer.bold = true;
		this.addChild(this.timer);

		this.countryleftIcon = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
		this.countryleftIcon.x = 120;
		this.countryleftIcon.y = 44;
		this.countryleftIcon.width = 40;
		this.countryleftIcon.height = 40;
		this.addChild(this.countryleftIcon);


		this.countryleftName = ToolMrg.getText(170, 51, 24, 0x333333, 165);
		this.countryleftName.text = "王家马德里";
		this.countryleftName.fontFamily = "微软雅黑";
		this.countryleftName.bold = true;
		this.addChild(this.countryleftName);

		this.biNumText = ToolMrg.getText(0, 44, 28, 0x333333, 750);
		this.biNumText.text = "5 : 8";
		this.biNumText.textAlign = egret.HorizontalAlign.CENTER;
		this.biNumText.fontFamily = "微软雅黑";
		this.biNumText.bold = true;
		this.addChild(this.biNumText);


		this.baNumText = ToolMrg.getText(0, 82, 18, 0x999999, 750);
		this.baNumText.text = "半场 1:0";
		this.baNumText.textAlign = egret.HorizontalAlign.CENTER;
		this.baNumText.fontFamily = "微软雅黑";
		this.addChild(this.baNumText);

		this.redleftbg = new egret.Bitmap();
		this.redleftbg.x = 246;
		this.redleftbg.y = 88;
		this.redleftbg.width = 18;
		this.redleftbg.height = 18;
		this.addChild(this.redleftbg);
		RES.getResByUrl("resource/assets/images/ui/red_match@2x.png", this.bgBackleftred, this, RES.ResourceItem.TYPE_IMAGE);

		this.yellowleftbg = new egret.Bitmap();
		this.yellowleftbg.x = 270;
		this.yellowleftbg.y = 88;
		this.yellowleftbg.width = 18;
		this.yellowleftbg.height = 18;
		this.addChild(this.yellowleftbg);
		RES.getResByUrl("resource/assets/images/ui/yelllow_match@2x.png", this.bgBackleftyellow, this, RES.ResourceItem.TYPE_IMAGE);

		this.reNum = ToolMrg.getText(this.redleftbg.x, this.redleftbg.y, 16, 0xffffff, 18);
		this.reNum.text = "1";
		this.reNum.height = 18;
		this.reNum.textAlign = egret.HorizontalAlign.CENTER;
		this.reNum.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.reNum.fontFamily = "微软雅黑";
		this.addChild(this.reNum);

		this.yellowleft = ToolMrg.getText(this.yellowleftbg.x, this.yellowleftbg.y, 16, 0xffffff, 18);
		this.yellowleft.text = "2";
		this.yellowleft.height = 18;
		this.yellowleft.textAlign = egret.HorizontalAlign.CENTER;
		this.yellowleft.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.yellowleft.fontFamily = "微软雅黑";
		this.addChild(this.yellowleft);

		this.countryrightIcon = new egret.Bitmap(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
		this.countryrightIcon.x = 456;
		this.countryrightIcon.y = 44;
		this.countryrightIcon.width = 40;
		this.countryrightIcon.height = 40;
		this.addChild(this.countryrightIcon);
		// RES.getResByUrl("resource/assets/images/ui/qd_default@2x.png", this.bgBack2, this, RES.ResourceItem.TYPE_IMAGE);

		this.countryrightName = ToolMrg.getText(504, 51, 24, 0x333333, 165);
		this.countryrightName.text = "王家马德里";
		this.countryrightName.fontFamily = "微软雅黑";
		this.countryrightName.bold = true;
		this.addChild(this.countryrightName);


		this.redrightbg = new egret.Bitmap();
		this.redrightbg.x = 484;
		this.redrightbg.y = 88;
		this.redrightbg.width = 18;
		this.redrightbg.height = 18;
		this.addChild(this.redrightbg);
		RES.getResByUrl("resource/assets/images/ui/red_match@2x.png", this.bgBackrightred, this, RES.ResourceItem.TYPE_IMAGE);

		this.yellowrightbg = new egret.Bitmap();
		this.yellowrightbg.x = 460;
		this.yellowrightbg.y = 88;
		this.yellowrightbg.width = 18;
		this.yellowrightbg.height = 18;
		this.addChild(this.yellowrightbg);
		RES.getResByUrl("resource/assets/images/ui/yelllow_match@2x.png", this.bgBackrightyellow, this, RES.ResourceItem.TYPE_IMAGE);


		this.reNumright = ToolMrg.getText(this.redrightbg.x, this.redrightbg.y, 16, 0xffffff, 18);
		this.reNumright.text = "1";
		this.reNumright.height = 18;
		this.reNumright.textAlign = egret.HorizontalAlign.CENTER;
		this.reNumright.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.reNumright.fontFamily = "微软雅黑";
		this.addChild(this.reNumright);

		this.yellowright = ToolMrg.getText(this.yellowrightbg.x, this.yellowrightbg.y, 16, 0xffffff, 18);
		this.yellowright.text = "2";
		this.yellowright.height = 18;
		this.yellowright.textAlign = egret.HorizontalAlign.CENTER;
		this.yellowright.verticalAlign = egret.VerticalAlign.MIDDLE;
		this.yellowright.fontFamily = "微软雅黑";
		this.addChild(this.yellowright);

		this.xingOnclick = new egret.Shape();
		this.addChild(this.xingOnclick);
		this.xingOnclick.graphics.beginFill(0xffffff);
		this.xingOnclick.graphics.drawRoundRect(670, 37, 60, 60, 2);
		this.xingOnclick.graphics.endFill()
		this.xingOnclick.touchEnabled = true;

		this.xingxing = new egret.Bitmap();
		this.xingxing.x = 685;
		this.xingxing.y = 44;
		this.xingxing.width = 32;
		this.xingxing.height = 32;
		this.addChild(this.xingxing);
		RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);

		this.resultText = ToolMrg.getText(0, 18, 20, 0x999999, 750);
		this.resultText.text = "未开";
		this.resultText.textAlign = egret.HorizontalAlign.CENTER;
		this.resultText.fontFamily = "微软雅黑";
		this.resultText.bold = true;
		this.addChild(this.resultText);

		this.nianmothTimer = ToolMrg.getText(30, 86, 20, 0x999999, 300);
		this.nianmothTimer.text = "";
		this.nianmothTimer.fontFamily = "微软雅黑";
		// this.addChild(this.nianmothTimer);


		this.jqleft = new egret.Bitmap();
		this.jqleft.x = 262;
		this.jqleft.y = 22;
		this.jqleft.width = 14;
		this.jqleft.height = 14;
		this.addChild(this.jqleft);
		RES.getResByUrl("resource/assets/images/ui/borld.png", (e) => { this.jqleft.$setBitmapData(e); }, this);

		this.jqright = new egret.Bitmap();
		this.jqright.x = 462;
		this.jqright.y = 22;
		this.jqright.width = 14;
		this.jqright.height = 14;
		this.addChild(this.jqright);
		RES.getResByUrl("resource/assets/images/ui/borld.png", (e) => { this.jqright.$setBitmapData(e); }, this);

		this.jqleftText = ToolMrg.getText(278, 16, 20, 0xA9A9A9, 200);
		this.jqleftText.text = "15";
		this.jqleftText.fontFamily = "微软雅黑";
		this.jqleftText.bold = true;
		this.addChild(this.jqleftText);

		this.jqrightText = ToolMrg.getText(478, 16, 20, 0xA9A9A9, 200);
		this.jqrightText.text = "15";
		this.jqrightText.fontFamily = "微软雅黑";
		this.jqrightText.bold = true;
		this.addChild(this.jqrightText);

		this.addevent();

	}
	public ifsetIcon: boolean = false;//是否设置过头像
	private _mBg: egret.Bitmap;//背景
	private _bglowxian: egret.Bitmap;//线
	// private _mBg: egret.Shape;//背景
	private name1: egret.TextField;//世界杯名字
	private timer: egret.TextField;//时间
	private myid: number = 0;//自身id
	private ssid: number = 0;//赛事id
	private countryleftIcon: egret.Bitmap;//国家左图标
	private countryleftName: egret.TextField;//国家左名字
	private biNumText: egret.TextField;//国家分数比
	private baNumText: egret.TextField;//半场比
	private redleftbg: egret.Bitmap;//红左
	private yellowleftbg: egret.Bitmap;//黄色左
	private reNum: egret.TextField;//红左数字
	private yellowleft: egret.TextField;//黄左
	private countryrightIcon: egret.Bitmap;//国家右图标
	private countryrightName: egret.TextField;//国家右名字
	private redrightbg: egret.Bitmap;//红右
	private yellowrightbg: egret.Bitmap;//黄色右
	private reNumright: egret.TextField;//红右数字
	private yellowright: egret.TextField;//黄右
	private xingxing: egret.Bitmap;//星星
	private xingOnclick: egret.Shape;//星星点击
	private resultText: egret.TextField;//结果比分或完场 未公开
	private nianmothTimer: egret.TextField;//年月日时间

	private jqleft: egret.Bitmap;//角球左图标
	private jqright: egret.Bitmap;//角球右图标
	private jqleftText: egret.TextField;//角球数量左
	private jqrightText: egret.TextField;//角球数量右


	public setID(id: number): void {
		this.myid = id;
	}

	public setssID(id: number): void {
		this.ssid = id;
	}


	public setPoint(x: number, y: number): void {
		this.x = x;
		this.y = y;
	}

	/**设置联赛名字颜色*/
	public setcolor(color: string): void {
		if (color == undefined) return;
		this.name1.textColor = Number("0x" + color);
	}

	private bgBack1(data: any, url: string): void {
		if (data != undefined && this.countryleftIcon != undefined) {
			this.countryleftIcon.$setBitmapData(data);
			console.log("本地头像");
		}
	}

	private bgBack2(data: any, url: string): void {
		if (data != undefined && this.countryrightIcon != undefined) {
			this.countryrightIcon.$setBitmapData(data);
		}
	}

	private bgBack3(data: any, url: string): void {
		if (data != undefined && this.xingxing != undefined) {
			this.xingxing.$setBitmapData(data);
		}
	}

	private bgBackwhite(data: any, url: string): void {
		if (data != undefined && this._mBg != undefined) {
			this._mBg.$setBitmapData(data);
		}
	}

	private bgBackhui(data: any, url: string): void {
		if (data != undefined && this._bglowxian != undefined) {
			this._bglowxian.$setBitmapData(data);
		}
	}
	private bgBackleftred(data: any, url: string): void {
		if (data != undefined && this.redleftbg != undefined) {
			this.redleftbg.$setBitmapData(data);
		}
	}

	private bgBackleftyellow(data: any, url: string): void {
		if (data != undefined && this.yellowleftbg != undefined) {
			this.yellowleftbg.$setBitmapData(data);
		}
	}

	private bgBackrightred(data: any, url: string): void {
		if (data != undefined && this.redrightbg != undefined) {
			this.redrightbg.$setBitmapData(data);
		}
	}
	private bgBackrightyellow(data: any, url: string): void {
		if (data != undefined && this.yellowrightbg != undefined) {
			this.yellowrightbg.$setBitmapData(data);
		}
	}


	/**设置信息*/
	public setInfo1(name1: string, timer: string, leftname: string, centerb: string, banb: string, name2: string): void {
		this.name1.text = ToolMrg.nameMode(7, name1);
		this.timer.text = timer;
		this.countryleftName.text = ToolMrg.nameMode(7, leftname);
		if (centerb == "") {
			this.biNumText.text = "vs";
			this.biNumText.size = 34;
		} else {
			this.biNumText.text = centerb;
			this.biNumText.size = 28;
		}
		this.baNumText.text = banb;
		this.countryrightName.text = ToolMrg.nameMode(7, name2);
	}

	/**设置黄红排左 */
	public setLeft(yellow: number, red: number): void {
		this.yellowleft.text = yellow + "";
		this.reNum.text = red + "";
		if (yellow > 0) {
			this.yellowleftbg.visible = true;
		} else {
			this.yellowleftbg.visible = false;
		}

		if (red > 0) {
			this.redleftbg.visible = true;
		} else {
			this.redleftbg.visible = false;
		}
	}

	/**设置黄红排右*/
	public setright(yellow: number, red: number): void {
		this.yellowright.text = yellow + "";
		this.reNumright.text = red + "";
		if (yellow > 0) {
			this.yellowrightbg.visible = true;
		} else {
			this.yellowrightbg.visible = false;
		}

		if (red > 0) {
			this.redrightbg.visible = true;
		} else {
			this.redrightbg.visible = false;
		}
	}

	/**设置赛果 1 有分数 2 完场 3未开  */
	public resultTextset(type: number, result: string): void {
		if (type == 1 || type == 2) {
			this.resultText.textColor = 0xF72E52;
			this.resultText.y = 18;
		} else {
			this.resultText.textColor = 0x999999;
			this.resultText.y = 16;
		}
		this.resultText.text = result + "";
	}


	/**设置国家头像左 */
	public setIcon(ul: string) {
		if (ul != undefined && ul != "") {
			LoadNetPic.getLoadNetPic.loadPic(ul, this.imgEvent_, this);
		} else {
			this.countryleftIcon.$setBitmapData(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
		}
		//this.countryleftIcon.$setBitmapData(GResCache.getRes(ul));
	}
	private imgEvent_(e: egret.Texture): void {
		try {
			if (this.countryleftIcon == undefined) return;
			this.countryleftIcon.$setTexture(e);
			this.countryleftIcon.width = 40;
			this.countryleftIcon.height = 40;
			console.log("网络头像");
		} catch (error) {

		}
	}

	/**设置国家头像右 */
	public setIconright(ul: string) {
		if (ul != undefined && ul != "") {
			LoadNetPic.getLoadNetPic.loadPic(ul, this.imgEvent_1, this);
		} else {
			this.countryrightIcon.$setBitmapData(GResCache.getRes("resource/assets/images/ui/qd_default@2x.png"));
		}
	}
	private imgEvent_1(e: egret.Texture): void {
		try {
			if (this.countryrightIcon == undefined) return;
			this.countryrightIcon.$setTexture(e);
			this.countryrightIcon.width = 40;
			this.countryrightIcon.height = 40;
		} catch (error) {

		}

	}

	/**设置星星是否关注了(1 已关注 0未关注) */
	public setxingxing(type: number): void {
		if (type == 1) {
			RES.getResByUrl("resource/assets/images/ui/follow_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
		} else {
			RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	/**设置年月日时间 */
	public setmothday(str: string): void {
		this.nianmothTimer.text = str;
	}

	/**设置角球数量*/
	public ssetjiqoqNum(leftNum: number, rightNum: number): void {
		if (leftNum == 0) {
			this.jqleft.visible = false;
			this.jqleftText.text = "";
		} else {
			this.jqleft.visible = true;
			this.jqleftText.text = "" + leftNum;
		}

		if (rightNum == 0) {
			this.jqright.visible = false;
			this.jqrightText.text = "";
		} else {
			this.jqright.visible = true;
			this.jqrightText.text = "" + rightNum;
		}
	}

	private addevent(): void {
		this.xingOnclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzSuccess, this.updata, this);
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzdefeated, this.updata1, this);
	}

	private onTouch() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: footballCofObj
		if (type == 2) {//即时列表
			data = FootballConfinData.getInstance.getInfoss(this.ssid);
		} else if (type == 3) {//关注列表
			data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
		}
		if (data != undefined) {
			if (UserData.getInstance.isLogin() == true) {
				BasketFootGZConfin.getInstance.sendHttp(data.id, 1);
			} else {
				Alertpaner.getInstance.show("登录之后才可以进行关注操作");
			}
		}

	}

	private updata() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: footballCofObj
		if (type == 2) {//即时列表
			data = FootballConfinData.getInstance.getInfoss(this.ssid);
		} else if (type == 3) {//关注列表
			data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
		}
		if (data != undefined) {
			if (data.id == BasketFootGZConfin.uid) {
				this.setxingxing(1);
				data.ifgz = 1;
				if (type == 2) {
					FootballConfinData.getInstance.getlist3().Gput(data.id, data);
				}
			}
		}
	}

	private updata1() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: footballCofObj
		if (type == 2) {//即时列表
			data = FootballConfinData.getInstance.getInfoss(this.ssid);
		} else if (type == 3) {//关注列表
			data = FootballConfinData.getInstance.getInfo3ss(this.ssid);
		}
		if (data != undefined) {
			if (data.id == BasketFootGZConfin.uid) {
				this.setxingxing(0);
				data.ifgz = 0;

				let jsdata: footballCofObj = FootballConfinData.getInstance.getInfoss(this.ssid);
				if (jsdata != undefined) {
					jsdata.ifgz = 0;
				}
				if (FootballConfinData.getInstance.getInfo3ss(this.ssid) != undefined) {
					FootballConfinData.getInstance.removInfo3ss(this.ssid);
				} else {
					let keyid: number = FootballConfinData.getInstance.getInfo33(data.id);
					FootballConfinData.getInstance.getlist3().GremoveByKey(keyid);
				}
			}
		}
	}

	public clean(): void {
		this.ifsetIcon = false;
		this.countryleftIcon.$setBitmapData("");
		this.countryrightIcon.$setBitmapData("");
	}
}