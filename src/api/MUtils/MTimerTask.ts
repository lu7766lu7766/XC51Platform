namespace MUtils {
	export class MTimerTask implements GIObjPool {
		public mName:string;
		public mTotal:number;
		public mCurrentTime:number;
		private _mDelayed:number;
		private _mDeplete:number;
		private _mCallFun:Function;
		private _mThisObj:any;
		public constructor() {
		}

		public Minit(name:string,total:number,delayed:number,callFun:Function,thisObj:any):void{
			this.mName = name;
			this.mTotal = total;
			this._mDeplete = this._mDelayed = delayed;
			this._mCallFun = callFun;
			this._mThisObj = thisObj;
			this.mCurrentTime  = 0;
		}

		public Mupdate(it:number):void{
			this._mDeplete -= it;
			if(this._mDeplete <= 0){
				this.mCurrentTime ++;
				this._mCallFun.call(this._mThisObj,this);
				this._mDeplete = this._mDelayed;
				if(this.mCurrentTime >= this.mTotal)
					GTimerMag.getInstance.GremoveTimerTask(this.mName);
			}

		}

		public clean():void{

		}
	}
}