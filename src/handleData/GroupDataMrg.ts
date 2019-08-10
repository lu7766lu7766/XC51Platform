/**
 * 排列5 排列3 管理类
 */
class GroupDataMrg {
	private static _mInstance: GroupDataMrg;
	public static get getInstance(): GroupDataMrg {
		if (GroupDataMrg._mInstance == undefined)
			GroupDataMrg._mInstance = new GroupDataMrg();
		return GroupDataMrg._mInstance;
	}
	/**分为数组 */
	private _mListGroup:Array<Array<Number>>;

	private constructor() {
		this._mListGroup = new Array<Array<Number>>();

		this.group3double([1,2,3]);
	}

	/**排列组合5 */
	public group5(listNum1:number[],listNum2:number[],listNum3:number[],listNum4:number[],listNum5:number[]):InjectionCode {
		if(listNum1.length <= 0 || listNum2.length <= 0 || listNum3.length <= 0 || listNum4.length <= 0 || listNum5.length <= 0) {
			return undefined;
		}	
		let data:InjectionCode = new InjectionCode();
		data.type = 1;
		data.result = this.zzfc(listNum1) + "," + this.zzfc(listNum2) + "," + this.zzfc(listNum3) + "," + this.zzfc(listNum4) + "," + this.zzfc(listNum5);
		for(let i=0;i<listNum1.length;i++) {
			for(let j=0;j<listNum2.length;j++) {
				for(let k=0;k<listNum3.length;k++) {
					for(let l=0;l<listNum4.length;l++) {
						for(let m=0;m<listNum5.length;m++) {
							data.injectionNum += 1;
							data.combinationList.push([listNum1[i],listNum2[j],listNum3[k],listNum4[l],listNum5[m]]);
						}
					}
				}
			}
		}
		return data;
	}

	/**排列组合3 直选*/
	public group3(listNum1:number[],listNum2:number[],listNum3:number[]):InjectionCode {
		if(listNum1.length <= 0 || listNum2.length <= 0 || listNum3.length <= 0 ) {
			return undefined;
		}	
		let data:InjectionCode = new InjectionCode();
		data.type = 1;
		data.result = this.zzfc(listNum1) + "," + this.zzfc(listNum2) + "," + this.zzfc(listNum3);
		for(let i=0;i<listNum1.length;i++) {
			for(let j=0;j<listNum2.length;j++) {
				for(let k=0;k<listNum3.length;k++) {
					data.injectionNum += 1;
					data.combinationList.push([listNum1[i],listNum2[j],listNum3[k]]);
				}
			}
		}
		return data;
	}

	/**排列组合3 组合单式
	 * listNum1 重复的数 
	 * listNum2 不重复
	*/
	public group3Single(num1:number,num2:number):InjectionCode {
		if(num1 == undefined || num2 == undefined || num1 == num2) {
			return undefined;
		}	
		let data:InjectionCode = new InjectionCode();
		data.type = 2;
		data.result = num1 +","+num2
		data.combinationList.push([num1,num1,num2]);
		return data;
	}

	/**排列组合3 组合复式 
	 * 至少选中两个号
	*/
	public group3double(listNum1:number[]):InjectionCode {
		if(listNum1.length < 2) {
			return undefined;
		}	
		let data:InjectionCode = new InjectionCode();
		data.type = 3;
		data.result = this.zzfc(listNum1, true);
		for(let i=0;i<listNum1.length;i++) {
			for(let j=0;j<listNum1.length;j++) {
				if(i != j) {
					data.injectionNum += 1;
					data.combinationList.push([listNum1[i],listNum1[i],listNum1[j]]);
				}
			}
		}
		return data;
	}

	/**排列组合3 组六
	 * 至少选中3个号
	*/
	public group3Six(listNum1:number[]):InjectionCode {
		if(listNum1.length < 3) {
			return undefined;
		}	

		let data:InjectionCode = new InjectionCode();
		data.type = 4;
		data.result = this.zzfc(listNum1, true);
		for(let i=0;i<listNum1.length;i++) {
			for(let j=i+1;j<listNum1.length;j++) {
				for(let k=j+1;k<listNum1.length;k++) {
					if(i != j && i != k && j != k) {
						data.injectionNum += 1;
						data.combinationList.push([listNum1[i],listNum1[j],listNum1[k]]);
					}
				}
			}
		}
		return data;
	}

	/**组字符串 */
	private zzfc(list:number[], isDou?:boolean):string {
		let str:string = "";
		for(let i=0;i<list.length;i++) {
			if(isDou == true && i != 0) {
				str += ("," + list[i]);
			} else {
				str += list[i];
			}
		}
		return str;
	}
}

/**注码对象 */
class InjectionCode {
	/**注数 */
	public injectionNum:number = 0;
	/**投注倍数 默认为1*/
	public injectionMul:number = 1;
	/**类型 直选:1 组3单式:2 组三复式:3 组六:4*/
	public type:number = 1;
	/**显示结果 */
	public result:string = "";
	/**组合列表 */
	public combinationList:Array<Array<Number>> = new Array<Array<Number>>();
}