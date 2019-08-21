namespace MDisplay {
	export class MFramData {
		private readonly _mIndex:number;
		private readonly _mEventStr:string;
		private readonly _mDisplays:Array<MDisplayConfig>;
		public constructor(index:number,eventStr:string) {
			this._mDisplays = new Array<MDisplayConfig>();
			this._mIndex = index;
			this._mEventStr = eventStr;
		}

		public MaddDisplay(sprite:MDisplayConfig):void{
			this._mDisplays.push(sprite);
		}

		public get displays():Array<MDisplayConfig>{
			return this._mDisplays;
		}
		
	}
}