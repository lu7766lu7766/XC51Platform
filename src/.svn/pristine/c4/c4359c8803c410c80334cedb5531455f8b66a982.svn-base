/**实名认证数据类 */
class realnameData {
	private static _mInstance: realnameData;
	public static get getInstance(): realnameData {
		if (realnameData._mInstance == undefined)
			realnameData._mInstance = new realnameData();
		return realnameData._mInstance;
	}
	public constructor() {
	}

	public static realName: string = "";//真实姓名
	public static identitNum: string = "";//身份证号码


	/**取字符串前三位和后四位*/
	public getstr(str: string): string {
		if (str.length < 8) return str;
		let str1: string = str;
		let str2: string = str;
		let result: string = "";
		str1 = str1.slice(0, 3);
		str2 = str2.slice(str2.length - 4, str2.length);
		result = str1 + "****" + str2;
		return result;
	}
}