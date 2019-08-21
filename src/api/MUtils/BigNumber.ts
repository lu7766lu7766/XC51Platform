class BigNumber {
	public static get zero():BigNumber{
		let temp:BigNumber = new BigNumber();
		temp.init(0,1);
		return temp;
	}

	private static _ten:BigNumber = null;
	public static get ten():BigNumber{
		if(BigNumber._ten != null)
			return BigNumber._ten;
		BigNumber._ten = new BigNumber();
		BigNumber._ten.init(10,2);
		return BigNumber._ten;
	}

	private static _max:BigNumber = null;
	public static get max():BigNumber{
		if(BigNumber._max != null)
			return BigNumber._max;
		BigNumber._max = new BigNumber();
		BigNumber._max.init(999999999,1000);
		return BigNumber._max;
	}

	public static getBigNum(value:number,len:number):BigNumber{
		if(len <= 0)
			return BigNumber.zero;
		let temp:BigNumber = new BigNumber();
		temp.init(value,len);
		return temp;
	}

	public static getBigNumByStr(str:string):BigNumber{
		let temp:BigNumber = new BigNumber();
		temp.initByStr(str);
		return temp;
	}

	private _value:number;
	private _len:number;
	public constructor() {
	}

	private init(value:number,len:number){
		this._value = Math.floor(value);
		this._len = len;
	}

	private initByStr(str:string){
		this._len = str.length;
		if(this._len <= 9)
			this._value = Number(str);
		else
			this._value = Number(str.slice(0,9));
	}

	/**
	 * 与目标对象比较大小 当前对象大于目标对象 返回1  相等返回0 否则返回 -1
	 */
	public compareTo(res:BigNumber):number{
		if(this._len == res._len && this._value == res._value)
			return 0;
		if(this._len > res._len || (this._len == res._len && this._value > res._value) )
			return 1;
		return -1;
	}

	/**将目标对象赋值于自身 */
	public write(v:BigNumber){
		this._value = v._value;
		this._len = v._len;
	}

	/**复制当前对象有值生成新的对象 */
	public clone():BigNumber{
		let temp:BigNumber = new BigNumber();
		temp._value = this._value;
		temp._len = this._len;
		return temp;
	}

	private static _temp:BigNumber = BigNumber.zero;

	public add(res:BigNumber):void{
		if(this.compareTo(res) == -1){
			BigNumber._temp.write(this);
			this.write(res);			
			res = BigNumber._temp;
		}
		let len:number = this._len;
		let value:number = this._value;
		if( (this._len <=9 && res._len <= 9) || this._len == res._len ){
			this._value += res._value;
			this.repair(len,value);
		}else if(this._len >= (res._len + 9)){//如果二者相差9位数 则直接退出
			return;
		}else if(this._len <= (res._len - 9)){
			this._len = res._len;
			this._value = res._value;
			return;
		}else{
			let l:number = Math.abs( len - this._value.toString().length - (res._len - res._value.toString().length)  );
			let cv:number = this._value,resv:number = res._value;
			if(len > res._len){
				resv = res._value / Math.pow(10,l);
			}else{
				cv = this._value / Math.pow(10,l);
			}
			this._value = cv + resv;
			this.repair(len,value);
		}

		
	}

	public sub(res:BigNumber){
		if(this.compareTo(res) <= 0){
			this._len = 1;
			this._value = 0;
			return;
		}
		if((this._len - res._len) >= 9)
			return;
		let len:number = this._len;
		let value:number = this._value;
		
		let subL:number = this._len - this._value.toString().length - (res._len - res._value.toString().length);
		let resv:number = res._value;
		if(subL > 0){
			resv = res._value/Math.pow(10,subL);
		}
		this._value -= resv;
		this.repair(len,value);
	}

	private static _zero:BigNumber = BigNumber.zero;
	public mult(res:BigNumber){
		if(res.compareTo(BigNumber._zero) <= 0){
			this._len = 1;
			this._value = 0;
			return;
		}
			
		let len:number = this._len;
		let value:number = this._value;

		this._len += (res._len - Math.floor(res._value).toString().length);
		this._value = Math.floor(this._value * res._value);

		this.repair(len,value);
	}

	public sqrt(){
		if(this._len <= 9){
			this.initByStr(Math.floor(Math.sqrt(this._value)).toString());
			return;
		}

		let len:number = this._len - 9;		
		let isOdd:boolean = !((len % 2 ) == 0);
		len = (isOdd ? len - 1 : len) / 2;
		let value:number = isOdd ? this._value * 10 : this._value;
		value = Math.sqrt(value);

		let newLen:number = Math.floor(value).toString().length;
		if(len <= (9-newLen)){
			value *= Math.pow(10,len);
			this.initByStr(Math.floor(value).toString());
			return;
		}else{
			len -= (9 - newLen);
			value *= Math.pow(10,9-newLen);
			this.init(value,len + 9);
		}
	}

	public multFromNum(value:number):void{
		value = Math.floor(value);
		let temp:BigNumber = BigNumber._temp;
		if(value > 999999999)
			temp.initByStr(value.toString(10));
		else
			temp.init(value,value.toString(10).length);
		this.mult(temp);
	}

	public divFromNum(value:number):void{
		value = Math.floor(value);
		let temp:BigNumber = BigNumber._temp;
		if(value > 999999999)
			temp.initByStr(value.toString(10));
		else
			temp.init(value,value.toString(10).length);
		this.div(temp);
	}

	public div(res:BigNumber):void{
		if(res.compareTo(BigNumber._zero) <= 0){
			this._len = this._value = 0;
			return;
		}


		let len:number = this._len;
		let value:number = this._value;

		let cl:number = this._len - this._value.toString(10).length - (res._len - res._value.toString(10).length);
		let div:number =this._value / res._value;
		if(div < 1){
			let y:number = cl <= 9 ? cl : 9;
			div *= Math.pow(10,y);
			cl -= y;
		}else if(div < 100000000 && cl > 0){ //如果商不够9位 并且还可以补0

			let temp:number = Math.floor(div).toString(10).length;
			let y:number = cl <= (9-temp) ? cl : (9-temp);
			div *= Math.pow(10,y);
			cl -= y;
		}
		

		div = Math.floor(div);
		this._len = cl + div.toString(10).length;
		this._value = div;
		//this.repair(len,value);

	}

	private static powMaxNum:number = 999999999;
	private static _powRes:BigNumber = BigNumber.zero;
	private static _powAddv:BigNumber = BigNumber.zero;
	public static pow(x:number,y:number):BigNumber{
		let addV:BigNumber = BigNumber._powAddv;
		let resV:BigNumber = BigNumber._powRes;
		resV.init(1,1);
		addV.init(0,1);
		if(x >= BigNumber.powMaxNum){			
			egret.error("求次幂的原值不得大于999999999");
		}
		let total:number = 0;
		let ct:number = x;
		while(true){
			ct = x;total++;
			for(; total < y; ){
				ct *= x;
				total ++;
				if(ct >= 999999999999999999)
					break;
			}
			addV.initByStr(Math.floor(ct).toString(10));
			if(resV._value == 1)
				resV.write(addV);
			else{
				let fix = Number(ct.toFixed(7)) - Math.floor(ct);
				addV._value += fix;
				resV.mult(addV);
			}
			if(total >= y)
				break;
		}
		return resV;
	}

	private repair(oldlen:number,oldvalue:number):void{
		let cv =  this._value = Math.floor(this._value);
		let ol:number = Math.floor(oldvalue).toString().length;
		let nl:number = cv.toString().length;		
		this._len = this._len - (ol - nl);
		if(nl > 9){
			this._value = Number( cv.toString().slice(0,9));
		}
		if(nl < 9 && this._len >= 9 ){
			this._value = this._value * Math.pow(10,9 - nl);
		}
		let valueLen = this._value.toString().length;
		if(valueLen < 9  && valueLen < this._len){
			this._value *= Math.pow(10,this._len - valueLen);
		}
	}

	public get value():number{
		return this._value;		
	}

	public get lenth():number{
		return this._len;
	}
}