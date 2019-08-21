class GObjPool {
	public static mIsCheck:boolean = true;
	private static _mInstance:GObjPool;
	public static get getInstance():GObjPool{
		if(GObjPool._mInstance == undefined)
			GObjPool._mInstance = new GObjPool();
		return GObjPool._mInstance;
	}
	
	private constructor() {
	}

	public Gadd2Pool(obj:any):void{
		if(obj == undefined)
			return;
		let type:string = egret.getQualifiedClassName(obj);
		if(type.length == 0)
			return;
		let arr:Array<any> = this[type];
		if(arr == undefined){
			arr = new Array<any>();
			this[type] = arr;
		}
		if(GObjPool.mIsCheck){//根据开关参数 检查是否重复插入对象池
			let index:number = arr.indexOf(obj);
			if(index > -1){
				egret.error("重复向对象池插入相同对象实例 类型:" + type);
				return;
			}
		}
		if(egret.is(obj,'GIObjPool')){
			(<GIObjPool>obj).clean();
		}
		arr.push(obj);
	}

	public GgetObj(obj:any):any{
		if(obj == undefined)
			return null;
		let type:string = egret.getQualifiedClassName(obj);
		if(type.length == 0)
			return null;
		let arr:Array<any> = this[type];
		if(arr == undefined || arr.length <= 0)
			return null;
		return arr.pop();			
	}

	/////////////////////////快速从对象池获取对象  如果对象池中没有该对象,则新建
	public static GgetMCObj():MDisplay.MMovieClip{
		let temp:MDisplay.MMovieClip = GObjPool.getInstance.GgetObj(MDisplay.MMovieClip);
		if(temp == null)
			temp = new MDisplay.MMovieClip();
		return temp;
	}

	public static GgetBmObj():egret.Bitmap{
		let temp:egret.Bitmap = GObjPool.getInstance.GgetObj(egret.Bitmap);
		if(temp == null)
			temp = new egret.Bitmap();
		return temp;
	}

	public static GgetTimerTaskObj():MUtils.MTimerTask{
		let temp:MUtils.MTimerTask = GObjPool.getInstance.GgetObj(MUtils.MTimerTask);
		if(temp == null)
			temp = new MUtils.MTimerTask();
		return temp;
	}
	

	
}
