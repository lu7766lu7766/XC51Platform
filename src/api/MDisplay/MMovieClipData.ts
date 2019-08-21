namespace MDisplay {
	export class MMovieClipData{
		public mIsInit:boolean = false;		
		public mURL:string;
		public mFrameTotal:number;
		private _mLoader:GLoadModule;
		private _mIsLoading:boolean = false;
		public static readonly configFileBaseUrl:string = 'resource/assets/flashconfig/';
		public static readonly imageFileBaseUrl:string = 'resource/assets/images/flash/';		
		private readonly framesArr:Object = {};


		public constructor() {
			this._mLoader = new GLoadModule();
		}

		public MloadConfig(url:string):void{			
			if(this.mIsInit){
				return;
			}
			if(this._mIsLoading)
				return;
			this._mIsLoading = true;
			let groupName:string = url + '.json';
			if(this._mLoader.GaddGroupRes(groupName,GLoadModule.GroupType_Flash)){
				this.mURL = MMovieClipData.configFileBaseUrl + groupName;			
				this._mLoader.Gbegin(this.onLoadedImage,this);
			}
		}

		private onLoadedImage():void{
			let data:Object = GResCache.getRes(this.mURL);
			this.handleData(data);
			this.mIsInit = true;
		}

		private handleData(data:any):void{
			let imageArr:Array<Object> = data['imageArr'];
			let frameArr:Array<Object> = data['frames'];
			this.mFrameTotal = frameArr.length;
			for(let i1 = 0,l1 = frameArr.length; i1 < l1; i1++ ){
				let frame = frameArr[i1];
				let temp:MFramData = new MFramData(frame['index'],frame['eventStr']);
				for(let i = 0,l = frame['list'].length; i < l; i++){
					let display:Object = frame['list'][i];
					temp.MaddDisplay(new MDisplayConfig(
						MMovieClipData.imageFileBaseUrl + imageArr[display[0]],
						display[1],
						display[2],
						display[3],
						display[4],
						display[5],
						display[6],
						display[7],
						display[8],
						display[9],
						display[10]
					));
				}
				this.framesArr[frame['index']] = temp;
			}			
		}

		public GgetFrameData(index:number):MFramData{
			let temp:MFramData = this.framesArr[index];
			return temp == undefined ? null : temp;
		}
	}
}