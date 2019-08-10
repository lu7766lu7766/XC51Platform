/**银行卡号验证类 */
class bankcardCheck {
	private static _mInstance: bankcardCheck;
	public static get getInstance(): bankcardCheck {
		if (bankcardCheck._mInstance == undefined)
			bankcardCheck._mInstance = new bankcardCheck();
		return bankcardCheck._mInstance;
	}
	public constructor() {

	}


	/**bankno为银行卡号 */

	public onecheck(bankno: string): boolean {
		let lastNum = bankno.substr(bankno.length - 1, 1);//取出最后一位
		let first15Num = bankno.substr(0, bankno.length - 1);//前15或18位
		let newArr = new Array();

		for (let i = first15Num.length - 1; i > -1; i--) {    //前15或18位倒序存进数组
			newArr.push(first15Num.substr(i, 1));
		}

		let arrJiShu = new Array();  //奇数位*2的积 <9
		let arrJiShu2 = new Array(); //奇数位*2的积 >9
		let arrOuShu = new Array();  //偶数位数组

		for (let j = 0; j < newArr.length; j++) {
			if ((j + 1) % 2 == 1) {//奇数位
				if (parseInt(newArr[j]) * 2 < 9)
					arrJiShu.push(parseInt(newArr[j]) * 2);
				else
					arrJiShu2.push(parseInt(newArr[j]) * 2);
			}
			else //偶数位
				arrOuShu.push(newArr[j]);
		}

		let jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
		let jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
		for (let h = 0; h < arrJiShu2.length; h++) {
			jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
			jishu_child2.push(parseInt(arrJiShu2[h]) / 10);

		}

		let sumJiShu = 0; //奇数位*2 < 9 的数组之和
		let sumOuShu = 0; //偶数位数组之和
		let sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
		let sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
		let sumTotal = 0;
		for (let m = 0; m < arrJiShu.length; m++) {
			sumJiShu = sumJiShu + parseInt(arrJiShu[m]);

		}

		for (let n = 0; n < arrOuShu.length; n++) {
			sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
		}

		for (let p = 0; p < jishu_child1.length; p++) {
			sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
			sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
		}

		//计算总和
		sumTotal = sumJiShu + sumOuShu + sumJiShuChild1 + sumJiShuChild2;

		//计算luhn值
		let k = sumTotal % 10 == 0 ? 10 : sumTotal % 10;
		let luhn = 10 - k;

		if (Number(lastNum) == luhn) {
			console.log("验证通过");
			return true;
		} else {
			console.log("银行卡号必须符合luhn校验");
			return false;
		}

	}

	public twocheck(bankno: string): boolean {
		let banknoret: string = bankno.replace(/\s/g, '');
		if (banknoret == "") {
			return false;
		}
		if (banknoret.length < 16 || banknoret.length > 19) {
			return false;
		}
		let num = /^\d*$/;//全数字
		if (!num.exec(banknoret)) {
			return false;
		}
		return true;
	}


	/*************************************************************** */
	/**检验前缀是否为数字*/
	public checkNum(input: string): boolean {
		if (parseFloat(input).toString() == "NaN") {
			//alert("请输入数字……");注掉，放到调用时，由调用者弹出提示。
			return false;
		} else {
			return true;
		}
	}

	/**检查是否为纯数字*/
	public checkAllNum(obj: string): boolean {
		var reg = /^[0-9]*$/;
		return reg.test(obj);
	}

	/**验证中文*/
	public checkName(name: string): boolean {
		// let reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
		let reg = /^[\u4e00-\u9fa5 ]{2,20}$/;
		return reg.test(name);
	}
	
}