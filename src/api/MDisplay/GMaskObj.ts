module MDisplay {
	export class GMaskObj extends egret.Shape {
		private _width:number;
		private _height:number;
		public constructor(width:number,height:number) {
			super();
			this.setRec(width,height);
		}

		public setRec(width:number,height:number){
			this._width = width;
			this._height = height;
			this.graphics.clear();
			this.graphics.beginFill(0xffffff,1);
			this.graphics.drawRect(0,0,this._width,this._height);
			this.graphics.endFill();
		}
	}
}