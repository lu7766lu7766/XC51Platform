class ToolMrg {
	/**k(3) m(6) b(9) t(12) aa(15) ab(18) ac(21) ad(24) ae(27) af(30) ag(33) ah(36) ai(39) aj(42) ak(45) ...*/
	private static nick: string[] = ["k", "m", "b", "t", "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj", "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at", "au", "av", "aw", "ax", "ay", "az",
		"ba", "bb", "bc", "bd", "be", "bf", "bg", "bh", "bi", "bj", "bk", "bl", "bm", "bn", "bo", "bp", "bq", "br", "bs", "bt", "bu", "bv", "bw", "bx", "by", "bz",
		"ca", "cb", "cc", "cd", "ce", "cf", "cg", "ch", "ci", "cj", "ck", "cl", "cm", "cn", "co", "cp", "cq", "cr", "cs", "ct", "cu", "cv", "cw", "cx", "cy", "cz",
		"da", "db", "dc", "dd", "de", "df", "dg", "dh", "di", "dj", "dk", "dl", "dm", "dn", "do", "dp", "dq", "dr", "ds", "dt", "du", "dv", "dw", "dx", "dy", "dz",
		"ea", "eb", "ec", "ed", "ee", "ef", "eg", "eh", "ei", "ej", "ek", "el", "em", "en", "eo", "ep", "eq", "er", "es", "et", "eu", "ev", "ew", "ex", "ey", "ez",
		"fa", "fb", "fc", "fd", "fe", "ff", "fg", "fh", "fi", "fj", "fk", "fl", "fm", "fn", "fo", "fp", "fq", "fr", "fs", "ft", "fu", "fv", "fw", "fx", "fy", "fz",
		"ga", "gb", "gc", "gd", "ge", "gf", "gg", "gh", "gi", "gj", "gk", "gl", "gm", "gn", "go", "gp", "gq", "gr", "gs", "gt", "gu", "gv", "gw", "gx", "gy", "gz",
		"ha", "hb", "hc", "hd", "he", "hf", "hg", "hh", "hi", "hj", "hk", "hl", "hm", "hn", "ho", "hp", "hq", "hr", "hs", "ht", "hu", "hv", "hw", "hx", "hy", "hz",
		"ia", "ib", "ic", "id", "ie", "if", "ig", "ih", "ii", "ij", "ik", "il", "im", "in", "io", "ip", "iq", "ir", "is", "it", "iu", "iv", "iw", "ix", "iy", "iz",
	];

	/**间隔 */
	private static _mJG: number = 9;
	/**返回显示 */
	private static showTip(num: number, len: number): string {
		if (num < 1000) {
			return "" + num;
		}
		let tempNum = ("" + num);

		let nn = Math.floor((len - 1) / 3) - 1;
		let str = ToolMrg.nick[nn];
		return (this.numBack(num, len) + str);
	}

	public static showBigNum(value: BigNumber): string {
		return ToolMrg.showTip(value.value, value.lenth);
	}

	/**返回几位小数 */
	private static numBack(num: number, len: number): string {
		let tempNum = ("" + num);
		let max: number = 4;
		let zsLen: number = len - Math.floor((len - 1) / 3) * 3;
		let xs: string;
		if (zsLen >= len) {
			xs = "0";
		} else {
			xs = tempNum.substring(zsLen, zsLen + 2);
			if (xs == "0") {
				xs = "0";
			}
		}
		return tempNum.substring(0, zsLen) + "." + xs;
	}

	/**获取min-max的随机数
	 * @param min 起始数 从哪个数开始
	 * @param max 结束数 到哪个数结束
	 */
	public static randomNum(min: number, max: number): number {
		var c = max - min + 1;
		return Math.floor(Math.random() * c + min);
	}

	/**设置缩放中心点 */
	public static setZoom(btn: egret.DisplayObject, x?: number, y?: number): void {
		btn.anchorOffsetX = btn.width / 2;
		btn.anchorOffsetY = btn.height / 2;
		if (x != undefined) {
			btn.x = x + btn.width / 2;
		} else {
			btn.x = btn.x + btn.width / 2;
		}
		if (y != undefined) {
			btn.y = y + btn.height / 2;
		} else {
			btn.y = btn.y + btn.height / 2;
		}
	}

	public static initByStr(str: string): BigNumber {
		str = str.toString();
		let len: number = str.length;
		let big: BigNumber;
		if (len <= 9) {
			big = BigNumber.getBigNum(Number(str), (len == 0 ? 1 : len));
		} else {
			big = BigNumber.getBigNum(Number(str.substring(0, 9)), len);
		}
		return big;
	}

	/**等级小于200 指数用程序指数方式取整保留 */
	public static getPowNum(lv: number, zs: number, js: BigNumber): BigNumber {
		let big: BigNumber = BigNumber.getBigNum(1, 1);
		let jb1: BigNumber = BigNumber.getBigNum(js.value, js.lenth);
		if (lv < 100) {
			let num: number = Math.pow(zs, lv - 1);
			num = Math.floor(num * 100);
			let jb2: BigNumber = BigNumber.getBigNum(num, ("" + num).length);
			big.mult(jb1);
			big.mult(jb2);
			big.divFromNum(100);
		} else {
			let jb2: BigNumber = BigNumber.pow(zs, lv - 1);
			big.mult(jb1);
			big.mult(jb2);
		}
		return big;
	}
	public static getTime(n: number): string {
		let hour: string = "0";
		let min: string = "0";
		let second: string = "0";
		let b: string = "0";
		if (n >= 3600) {
			hour = (Math.floor(n / 3600)).toString();
			if (Number(hour) < 10) {
				hour = b + hour;
			}
			min = (Math.floor((n - Number(hour) * 3600) / 60)).toString();
			if (Number(min) < 10) {
				min = b + min;
			}
			second = (n - Number(hour) * 3600 - Number(min) * 60).toString();
			if (Number(second) < 10) {
				second = b + second;
			}
		} else {
			hour = "00";
			min = (Math.floor(n / 60)).toString();
			if (Number(min) < 10) {
				min = b + min;
			}
			second = (n - Number(min) * 60).toString();
			if (Number(second) < 10) {
				second = b + second;
			}
			if (n < 60) {
				second = n.toString();
				if (Number(second) < 10) {
					second = b + second;
				}
			}
		}
		let str: string = hour + "" + "小时" + min + "分" + second + "秒";
		return str;
	}
	/**单参 与本地时间对比 双参 与服务器时间对比
	 * 相差 60s 刚刚 <1小时 分钟 >1小时 小时
	 */
	public static getDisparity(t: number, ft?: number): string {
		if (t == undefined) return;
		let time;
		if (ft != undefined) {
			time = ft * 1000;
		} else {
			time = new Date().getTime();
		}

		time = (time - t * 1000) / 1000;
		// egret.log(new Date(t*1000).getMonth()+1 + " - " + new Date(t*1000).getDate());

		let cDay = time / 3600 / 24;
		if (cDay > 1.5) {
			let mDate = new Date(t * 1000);
			return `${this.getNumberDate(mDate.getMonth() + 1)}-${this.getNumberDate(mDate.getDate())}`;
		} else if (cDay < 1.5 && cDay > 1) {
			return "昨天";
			// let mDate = new Date(t*1000);
			// return this.getNumberDate(mDate.getMonth() + 1) + ' -' + this.getNumberDate(mDate.getDate());
		}

		if (time > 60 * 60 * 2) {
			return "昨天";
		} else if (time > 60 * 60 && time < 60 * 60 * 2) {
			time = time / 60 / 60;
			return `${Math.floor(time)}小时前`;
		} else if (time > 60 && time < 60 * 60) {//1小时内
			time = time / 60;
			// egret.log(time)
			return `${Math.floor(time)}分钟前`;
		} else if (time < 60 || time == 0) {//60s内
			return "刚刚";
		}
		return "";
	}

	/**刷新数组 传入GHashMap info实体类 data数据类 */
	public static upItemofGHashMap(infoItem: GHashMap<any>, dataItem: GHashMap<any>): void {
		let str = [];
		for (let key of infoItem.keys) {//保存该数组不存在的值
			if (!dataItem[key]) {
				str = str.concat(key);
			}
		}

		if (str != []) {//如果有不存在值，则删除
			for (let i = 0; i < str.length; i++) {
				if (infoItem.GhasKey(str[i])) {
					let obj = infoItem.Gget(str[i]);
					if (obj.parent != undefined)
						obj.parent.removeChild(obj);
					infoItem.GremoveByKey(str[i]);
				}
			}
		}
	}

	/**刷新数组 传入GHashMap info实体类 data数据类 */
	public static upItemofArray(infoItem: GHashMap<any>, dataItem: any[]): void {
		let str = [];
		for (let key of infoItem.keys) {//保存该数组不存在的值
			if (dataItem[key] == undefined) {
				str = str.concat(key);
			}
		}

		if (str != []) {//如果有不存在值，则删除
			for (let i = 0; i < str.length; i++) {
				if (infoItem.GhasKey(str[i])) {
					let obj = infoItem.Gget(str[i]);
					if (obj.parent != undefined)
						obj.parent.removeChild(obj);
					infoItem.GremoveByKey(str[i]);
				}
			}
		}
	}

	/**名字太长，显示... */
	public static nameMode(len: number, n: string): string {
		if (n == null || n == undefined)
			n = "";
		let str: string;
		if (n.length >= len) {
			str = n.substring(0, len - 1) + "...";
		} else {
			str = n;
		}
		return str;
	}

	/**名字太长，显示指定长度*/
	public static nameMode2(len: number, n: string): string {
		if (n == null || n == undefined)
			n = "";
		let str: string;
		if (n.length >= len) {
			str = n.substring(0, len - 1) + "…";
		} else {
			str = n;
		}
		return str;
	}

	public static getText(x: number, y: number, size: number, color: number, width?: number, isbold?: boolean): JacText {
		let text = new JacText();
		// if(isbold!=undefined&&isbold==true){
		// 	text.fontFamily = "text";
		// 	text.bold = isbold;
		// }else{
		// 	text.bold = false;
		// 	text.fontFamily = "text";
		// }
		text.x = x;
		text.y = y;
		text.size = size;
		text.textColor = color;
		if (width != undefined)
			text.width = width;
		return text;
	}

	public static getLink(w, h, color, a = 1): egret.Shape {
		let link = new egret.Shape();
		link.graphics.beginFill(color, a);
		link.graphics.drawRect(0, 0, w, h);
		link.graphics.endFill();
		return link;
	}

	public static getRoundRect(x, y, w, h, a = 1, ew, eh, color): egret.Shape {
		let link = new egret.Shape();
		link.graphics.beginFill(color, a);
		link.graphics.drawRoundRect(x, y, w, h, ew, eh);
		link.graphics.endFill();
		return link;
	}

	/** 根据时间戳获取时间串
 * t:	时间戳（秒）
 */
	public static getTime1(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() + '-' +
			this.getNumberDate(mDate.getMonth() + 1) + '-' +
			this.getNumberDate(mDate.getDate()) + ' ' +
			this.getNumberDate(mDate.getHours()) + ':' +
			this.getNumberDate(mDate.getMinutes());

		return time;
	}

	/** 根据时间戳获取时间串
* t:	获取年月日 时分秒
*/
	public static getTime11(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() + '-' +
			this.getNumberDate(mDate.getMonth() + 1) + '-' +
			this.getNumberDate(mDate.getDate()) + ' ' +
			this.getNumberDate(mDate.getHours()) + ':' +
			this.getNumberDate(mDate.getMinutes()) + ":" +
			this.getNumberDate(mDate.getSeconds());

		return time;
	}

	/** 根据时间戳获取时间串
 * t:	时间戳（秒）
 */
	public static getTime2(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() + '.' +
			this.getNumberDate(mDate.getMonth() + 1) + '.' +
			this.getNumberDate(mDate.getDate()) + ' ' +
			this.getNumberDate(mDate.getHours()) + ':' +
			this.getNumberDate(mDate.getMinutes()) + ':' +
			this.getNumberDate(mDate.getSeconds());

		return time;
	}

	/** 根据时间戳获取时间串
 * t:	时间戳(年月日)
 */
	public static getTime3(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() + '.' +
			this.getNumberDate(mDate.getMonth() + 1) + '.' +
			this.getNumberDate(mDate.getDate());
		return time;
	}

	/** 根据时间戳获取时间串
 * t:	时间戳(年月日)+一个月
 */
	public static getTime4(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() + '.' +
			this.getNumberDate(mDate.getMonth() + 2) + '.' +
			this.getNumberDate(mDate.getDate());
		return time;
	}

	/** 根据时间戳获取时间串
 * t:	时间戳 毫秒  返回 ： 06-17\n21:45
 */
	public static getTime5(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = this.getNumberDate(mDate.getMonth() + 1) + '-' +
			this.getNumberDate(mDate.getDate()) + '\n' +
			this.getNumberDate(mDate.getHours()) + ':' +
			this.getNumberDate(mDate.getMinutes());
		return time;
	}

	/** 根据时间戳获取时间串
* t:	时间戳(年月日)
*/
	public static getTime6(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = mDate.getFullYear() +
			this.getNumberDate(mDate.getMonth() + 1) +
			this.getNumberDate(mDate.getDate());
		return time;
	}

		/** 根据时间戳获取时间串
 * t:	时间戳 毫秒  返回 ： 06-17 21:45
 */
	public static getTime7(t: number): string {
		let mDate = new Date(t * 1000);
		let time: string = this.getNumberDate(mDate.getMonth() + 1) + '-' +
			this.getNumberDate(mDate.getDate()) + ' ' +
			this.getNumberDate(mDate.getHours()) + ':' +
			this.getNumberDate(mDate.getMinutes());
		return time;
	}

	/**如果数字小于10就在前面补个0 */
	private static getNumberDate(num: number): any {
		let mouth;
		if (num < 10) {
			mouth = '0' + num;
			return mouth;
		} else {
			return num;
		}
	}

	/**返回当前时间戳 秒 */
	private static _mData;
	public static getNowTime(): number {
		this._mData = new Date();
		return Date.parse(ToolMrg._mData.toString()) / 1000;
	}

	/**json解析 */
	public static AnalysisJson(httpObj: egret.HttpRequest): any {
		let text: any;
		try {
			text = JSON.parse(httpObj.response);
		} catch (error) {
			Alertpaner.getInstance.show("获取失败");
		}
	}

	/**取几位小数 
	 * temp 当前数
	 * ws 位数
	*/
	public static getDecimal(temp: number, ws: number): number {
		let ttt: number = 1;
		for (let i = 0; i < ws; i++) {
			ttt *= 10;
		}
		temp = Math.round(temp * ttt);
		temp /= ttt;
		return temp;
	}

	/**取字符串数字 */
	public static getStrNum(str:string):number {
		let strT:string = "";
		for(let i=0;i<str.length;i++) {
			if(Number(str[i]) >= 0) {
				strT += str[i];
			}
		}

		if(strT.length <= 0) {
			return 0;
		} else {
			return Number(strT);
		}
	}
}

interface iObject {
	x: number
	y: number
	width: number
	height: number
}

class PositionTool {
	public static getBelow(obj: iObject) {
		return obj.y + obj.height
	}

	public static getRight(obj: iObject) {
		return obj.x + obj.width
	}
}

class JacText extends egret.TextField
{
	private _placholder: string
	private _color: number
	private _initColor: number = 0xaaaaaa
	
	public set placeholder(_text) {
		this._placholder = _text
		this._color = this.textColor
		this.placeholderInit()
		this.touchEnabled = true
		this.addEventListener(egret.TouchEvent.FOCUS_IN, this.focus, this)
		this.addEventListener(egret.TouchEvent.FOCUS_OUT, this.blur, this)
	}

	constructor() {
		super()
	}

	private placeholderInit() {
		this.text = this._placholder
		this.textColor = this._initColor
	}

	private startInput() {
		this.text = ''
		this.textColor = this._color
	}

	private focus(e: egret.TouchEvent): void {
		if (this.text === this._placholder) {
			this.startInput()
		}
	}

	private blur(e: egret.TouchEvent): void {
		if (this.text === '') {
			this.placeholderInit()
		}
	}

	public getText() {
		if (this.text === this._placholder) {
			return ''
		} 
		return this.text
	}
}

class CopyBtn extends egret.TextField 
{
    private copyTxt: string

    constructor(size, copyTxt) {
        super()
        this.copyTxt = copyTxt
        this.size = size
        this.height = size + 16
        this.width = size * 2 + 33
        this.textAlign = egret.HorizontalAlign.CENTER
        this.verticalAlign = egret.VerticalAlign.MIDDLE
        this.text = '复制'
        this.textColor = 0x18a1db
        this.border = true
        this.borderColor = 0x333333
        this.touchEnabled = true
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchDown, this)
    }

    private touchDown(e: egret.TouchEvent) {
        this.copy(this.copyTxt)
        Alertpaner.getInstance.show("复制成功");
    }

    private copy(text:string) {
        let copy = document.createElement("input");
        copy.value = text;
        document.body.appendChild(copy);
        copy.select();
        copy.setSelectionRange(0,copy.value.length);
        document.execCommand('Copy');
        document.body.removeChild(copy);
        copy.setAttribute('readOnly','readOnly');
    }
}