/**篮球即时显示信息*/
class basketball1 extends egret.DisplayObjectContainer {
	private static _mInstance: basketball1;
	public static get getInstance(): basketball1 {
		if (basketball1._mInstance == undefined)
			basketball1._mInstance = new basketball1();
		return basketball1._mInstance;
	}
	public constructor() {
		super();
		this.y = -40 + GameValue.adaptationScreen;
		this._mListObj = new GHashMap<basketballitem1>();
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
	private _mListObj: GHashMap<basketballitem1>;//数据列表

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
	public show(list11?: GHashMap<basketballCofObj>) {
		let connet: egret.DisplayObjectContainer = BasketViewMrg.getInstance.getconnet();
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
	}

	/**初始化所有数据*/
	public initallInfo(list11?: GHashMap<basketballCofObj>): void {
		this.hideData();
		this._scroViewQB.setScrollTop(20);
		let len: number = 0;
		let dataObj: basketballitem1;
		len = BasketballConfinData.getInstance.getlist().size;
		let list: GHashMap<basketballCofObj>;
		list = BasketballConfinData.getInstance.getlist();
		if (list11 != undefined && list11.size > 0) {
			len = list11.size;
			list = list11;
		}
		for (let i = 1; i <= len; i++) {
			dataObj = this._mListObj.Gget(i);
			if (dataObj == undefined) {
				dataObj = new basketballitem1();
				this._mListObj.Gput(i, dataObj);
			}
			let data: basketballCofObj = BasketballConfinData.getInstance.getInfo(i);
			if (data != undefined) {
				dataObj.setConnetInfo(data.name, data.timer, data.leftname, data.rightname, data.getstatus());
				dataObj.setxingxing(data.ifgz);
				dataObj.setmainEvray(data.rf, data.zhujie1, data.zhujie2, data.zhujie3, data.zhujie4);
				dataObj.setkeEvray("", data.kejie1, data.kejie2, data.kejie3, data.kejie4);
				dataObj.totalFen(data.bfText, data.team_a_score, data.team_b_score, data.fc);
				dataObj.setColor(data.color);
				dataObj.setssID(data.id);
			}
			dataObj.setID(i);
			dataObj.setPoint(0, 10 + (i - 1) * 155);
			// if (dataObj.parent == undefined) {
			// 	this._mContainQB.addChild(dataObj);
			// }
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
		this.GSlideOb.showDataByMap(13, 155, this._scroViewQB, this._mContainQB, this._mListObj);
	}

	//清除对象数组
	public hideData(): void {
		for (let key of this._mListObj.keys) {
			let data: basketballitem1 = this._mListObj.Gget(key);
			if (data != undefined) {
				if (data.parent != undefined) {
					data.parent.removeChild(data);
				}
			}
		}
		this._mListObj.clear();
	}


}

class basketballitem1 extends egret.DisplayObjectContainer {
	public constructor() {
		super();

		if (this._mBg == undefined) {
			// this._mBg = new egret.Shape();
			// this.addChild(this._mBg);
			// this._mBg.graphics.beginFill(0xffffff);
			// this._mBg.graphics.drawRect(0, 0, GameMain.getInstance.StageWidth, 152);
			// this._mBg.graphics.endFill()

			// let link = new egret.Shape();
			// this.addChild(link);
			// link.graphics.beginFill(0xF5F5F7);
			// link.graphics.drawRect(0, 152, GameMain.getInstance.StageWidth, 3);
			// link.graphics.endFill();

			this._mBg = new egret.Bitmap();
			this._mBg.x = 0;
			this._mBg.y = 0;
			this._mBg.width = 750;
			this._mBg.height = 152;
			this.addChild(this._mBg);
			RES.getResByUrl("resource/assets/images/ui/bai.png", this.bgBackwhite, this, RES.ResourceItem.TYPE_IMAGE);

			this._bglowxian = new egret.Bitmap();
			this._bglowxian.x = 0;
			this._bglowxian.y = 152;
			this._bglowxian.width = 750;
			this._bglowxian.height = 3;
			this.addChild(this._bglowxian);
			RES.getResByUrl("resource/assets/images/ui/hui.png", this.bgBackhui, this, RES.ResourceItem.TYPE_IMAGE);

			this.name1 = ToolMrg.getText(28, 16, 20, 0xFF7000, 150);
			this.name1.text = "女欧国杯";
			this.name1.fontFamily = "微软雅黑";
			this.name1.bold = true;
			this.addChild(this.name1);

			this.timer = ToolMrg.getText(144, 16, 20, 0x999999, 150);
			this.timer.text = "19 : 20";
			this.timer.fontFamily = "微软雅黑";
			this.timer.bold = true;
			this.addChild(this.timer);

			this.countryzhu = ToolMrg.getText(28, 58, 20, 0xFF7000, 280);
			this.countryzhu.fontFamily = "微软雅黑";
			this.countryzhu.bold = true;
			this.countryzhu.textFlow = <Array<egret.ITextElement>>[
				{ "text": "意大利女篮", style: { "textColor": 0x333333, size: 24 } },
				{ "text": "[主]", style: { "textColor": 0x999999, size: 18 } }
			];
			this.addChild(this.countryzhu);

			this.countryke = ToolMrg.getText(28, 98, 20, 0xFF7000, 280);
			this.countryke.fontFamily = "微软雅黑";
			this.countryke.bold = true;
			this.countryke.textFlow = <Array<egret.ITextElement>>[
				{ "text": "维鲁斯女篮", style: { "textColor": 0x333333, size: 24 } },
				{ "text": "[客]", style: { "textColor": 0x999999, size: 18 } }
			];
			this.addChild(this.countryke);

			this.defaultText = ToolMrg.getText(0, 16, 20, 0xF72E52, 750);
			this.defaultText.text = "第2节 8:30";
			this.defaultText.fontFamily = "微软雅黑";
			this.defaultText.textAlign = egret.HorizontalAlign.CENTER;
			this.defaultText.bold = true;
			this.addChild(this.defaultText);

			this.bfmainText1 = ToolMrg.getText(0, 62, 20, 0x333333, 750);
			this.bfmainText1.text = "12.5";
			this.bfmainText1.fontFamily = "微软雅黑";
			this.bfmainText1.textAlign = egret.HorizontalAlign.CENTER;
			this.bfmainText1.bold = true;
			this.addChild(this.bfmainText1);

			this.bfmainText2 = ToolMrg.getText(418, 62, 20, 0x999999, 100);
			this.bfmainText2.text = "10";
			this.bfmainText2.fontFamily = "微软雅黑";
			this.bfmainText2.bold = true;
			this.addChild(this.bfmainText2);

			this.bfmainText3 = ToolMrg.getText(459, 62, 20, 0x999999, 100);
			this.bfmainText3.text = "10";
			this.bfmainText3.fontFamily = "微软雅黑";
			this.bfmainText3.bold = true;
			this.addChild(this.bfmainText3);

			this.bfmainText4 = ToolMrg.getText(500, 62, 20, 0x999999, 100);
			this.bfmainText4.text = "10";
			this.bfmainText4.fontFamily = "微软雅黑";
			this.bfmainText4.bold = true;
			this.addChild(this.bfmainText4);

			this.bfmainText5 = ToolMrg.getText(541, 62, 20, 0x999999, 100);
			this.bfmainText5.text = "10";
			this.bfmainText5.fontFamily = "微软雅黑";
			this.bfmainText5.bold = true;
			this.addChild(this.bfmainText5);

			this.bfguestText1 = ToolMrg.getText(0, 100, 20, 0x333333, 750);
			this.bfguestText1.text = "12.5";
			this.bfguestText1.fontFamily = "微软雅黑";
			this.bfguestText1.textAlign = egret.HorizontalAlign.CENTER;
			this.bfguestText1.bold = true;
			this.addChild(this.bfguestText1);

			this.bfguestText2 = ToolMrg.getText(418, 102, 20, 0x999999, 100);
			this.bfguestText2.text = "10";
			this.bfguestText2.fontFamily = "微软雅黑";
			this.bfguestText2.bold = true;
			this.addChild(this.bfguestText2);

			this.bfguestText3 = ToolMrg.getText(459, 102, 20, 0x999999, 100);
			this.bfguestText3.text = "10";
			this.bfguestText3.fontFamily = "微软雅黑";
			this.bfguestText3.bold = true;
			this.addChild(this.bfguestText3);

			this.bfguestText4 = ToolMrg.getText(500, 102, 20, 0x999999, 100);
			this.bfguestText4.text = "10";
			this.bfguestText4.fontFamily = "微软雅黑";
			this.bfguestText4.bold = true;
			this.addChild(this.bfguestText4);

			this.bfguestText5 = ToolMrg.getText(541, 102, 20, 0x999999, 100);
			this.bfguestText5.text = "10";
			this.bfguestText5.fontFamily = "微软雅黑";
			this.bfguestText5.bold = true;
			this.addChild(this.bfguestText5);

			this.fenNumText = ToolMrg.getText(536, 16, 20, 0x999999, 100);
			this.fenNumText.text = "分差:-6";
			this.fenNumText.fontFamily = "微软雅黑";
			this.fenNumText.bold = true;
			this.addChild(this.fenNumText);

			this.zongFen = ToolMrg.getText(623, 16, 20, 0x999999, 100);
			this.zongFen.text = "总分: 142";
			this.zongFen.fontFamily = "微软雅黑";
			this.zongFen.bold = true;
			this.addChild(this.zongFen);

			this.mainfenText = ToolMrg.getText(623, 62, 20, 0xF72E52, 100);
			this.mainfenText.text = "70";
			this.mainfenText.fontFamily = "微软雅黑";
			this.mainfenText.bold = true;
			this.addChild(this.mainfenText);

			this.kefenText = ToolMrg.getText(623, 102, 20, 0xF72E52, 100);
			this.kefenText.text = "90";
			this.kefenText.fontFamily = "微软雅黑";
			this.kefenText.bold = true;
			this.addChild(this.kefenText);

			this.xingOnclick = new egret.Shape();
			this.addChild(this.xingOnclick);
			this.xingOnclick.graphics.beginFill(0xffffff);
			this.xingOnclick.graphics.drawRoundRect(675, 70, 60, 60, 2);
			this.xingOnclick.graphics.endFill()
			this.xingOnclick.touchEnabled = true;

			this.xingxing = new egret.Bitmap();
			this.xingxing.x = 685;
			this.xingxing.y = 80;
			this.xingxing.width = 32;
			this.xingxing.height = 32;
			this.addChild(this.xingxing);
			RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);

			this.addevent();

		}
	}
	private ssid: number = 0;//赛事id
	private myid: number = 0;//自身id
	// private _mBg: egret.Shape;//背景
	private _mBg: egret.Bitmap;//背景
	private _bglowxian: egret.Bitmap;//线
	private name1: egret.TextField;//世界杯名字
	private timer: egret.TextField;//时间
	private countryzhu: egret.TextField;//国家主
	private countryke: egret.TextField;//国家客
	private defaultText: egret.TextField;//节时间 或完场

	private bfmainText1: egret.TextField;//主分数节数1
	private bfmainText2: egret.TextField;//主分数节数2
	private bfmainText3: egret.TextField;//主分数节数3
	private bfmainText4: egret.TextField;//主分数节数4
	private bfmainText5: egret.TextField;//主分数节数5

	private bfguestText1: egret.TextField;//客分数节数1
	private bfguestText2: egret.TextField;//客分数节数2
	private bfguestText3: egret.TextField;//客分数节数3
	private bfguestText4: egret.TextField;//客分数节数4
	private bfguestText5: egret.TextField;//客分数节数5

	private fenNumText: egret.TextField;//分数差
	private zongFen: egret.TextField;//总分
	private mainfenText: egret.TextField;//主总分
	private kefenText: egret.TextField;//客总分

	private xingxing: egret.Bitmap;//星星
	private xingOnclick: egret.Shape;//星星点击

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

	/**设置星星是否关注了(1 已关注 0未关注) */
	public setxingxing(type: number): void {
		if (type == 1) {
			RES.getResByUrl("resource/assets/images/ui/follow_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
		} else {
			RES.getResByUrl("resource/assets/images/ui/follow_nor_match@2x.png", this.bgBack3, this, RES.ResourceItem.TYPE_IMAGE);
		}
	}

	/**设置联赛名字颜色*/
	public setColor(color: string): void {
		this.name1.textColor = Number("0x" + color);
	}

	/**设置国家主客信息*/
	public setConnetInfo(name1: string, timer: string, maincountry: string, countryke: string, jieText: string) {
		this.name1.text = "" + name1;
		this.timer.text = "" + timer;
		this.countryzhu.textFlow = <Array<egret.ITextElement>>[
			{ "text": "" + maincountry, style: { "textColor": 0x333333, size: 24 } },
			{ "text": "[主]", style: { "textColor": 0x999999, size: 18 } }
		];

		this.countryke.textFlow = <Array<egret.ITextElement>>[
			{ "text": "" + countryke, style: { "textColor": 0x333333, size: 24 } },
			{ "text": "[客]", style: { "textColor": 0x999999, size: 18 } }
		];
		this.defaultText.text = jieText;
	}

	/**设置主每节分数*/
	public setmainEvray(fen1: string, fen2: string, fen3: string, fen4: string, fen5: string): void {
		this.bfmainText1.text = "" + fen1;
		this.bfmainText2.text = "" + fen2;
		this.bfmainText3.text = "" + fen3;
		this.bfmainText4.text = "" + fen4;
		this.bfmainText5.text = "" + fen5;
	}

	/**设置客每节分数*/
	public setkeEvray(fen1: string, fen2: string, fen3: string, fen4: string, fen5: string): void {
		this.bfguestText1.text = "" + fen1;
		this.bfguestText2.text = "" + fen2;
		this.bfguestText3.text = "" + fen3;
		this.bfguestText4.text = "" + fen4;
		this.bfguestText5.text = "" + fen5;
	}

	/**设置总分 主客总分 分差*/
	public totalFen(allfen: string, mainfen: string, kefen: string, fc: string): void {
		this.zongFen.text = "总分: " + allfen;
		this.mainfenText.text = "" + mainfen;
		this.kefenText.text = kefen;
		this.fenNumText.text = "分差:" + fc;
	}

	private addevent(): void {
		this.xingOnclick.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzSuccess, this.updata, this);
		CustEventMrg.getInstance.addEventListener(CustEventType.EventType_gzdefeated, this.updata1, this);
	}

	private onTouch() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: basketballCofObj
		if (type == 2) {//即时列表
			data = BasketballConfinData.getInstance.getssInfo(this.ssid);
		} else if (type == 3) {//关注列表
			data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
		}
		if (data != undefined) {
			if (UserData.getInstance.isLogin() == true) {
				BasketFootGZConfin.getInstance.sendHttp(data.id, 2);
			} else {
				Alertpaner.getInstance.show("登录之后才可以进行关注操作");
			}
		}

	}

	private updata() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: basketballCofObj
		if (type == 2) {//即时列表
			data = BasketballConfinData.getInstance.getssInfo(this.ssid);
		} else if (type == 3) {//关注列表
			data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
		}
		if (data != undefined) {
			if (data.id == BasketFootGZConfin.uid) {
				this.setxingxing(1);
				data.ifgz = 1;
				if (type == 2) {
					BasketballConfinData.getInstance.getlist3().Gput(data.id, data);
				}
			}
		}
	}

	private updata1() {
		let type: number = BakorfallViewMrg.inIndex;
		let data: basketballCofObj
		if (type == 2) {//即时列表
			data = BasketballConfinData.getInstance.getssInfo(this.ssid);
		} else if (type == 3) {//关注列表
			data = BasketballConfinData.getInstance.getssInfo3(this.ssid);
		}
		if (data != undefined) {
			if (data.id == BasketFootGZConfin.uid) {

				this.setxingxing(0);
				data.ifgz = 0;
				let jsdata: basketballCofObj = BasketballConfinData.getInstance.getssInfo(this.ssid);
				if (jsdata != undefined) {
					jsdata.ifgz = 0;
				}
				if (BasketballConfinData.getInstance.getssInfo3(this.ssid) != undefined) {
					BasketballConfinData.getInstance.removeInfo33(this.ssid);
				} else {
					let keyid: number = BasketballConfinData.getInstance.getInfo33(data.id);
					BasketballConfinData.getInstance.getlist3().GremoveByKey(keyid);
				}

			}
		}
	}

}