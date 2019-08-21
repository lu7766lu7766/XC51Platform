namespace MDisplay{
export class MParticleData {
	private _lifeTime:number;
	private _XStep:number;
	private _YStep:number;
	private _AlphaStep:number;
	private _startTime:number;
	private _scaleXStep:number;
	private _scaleYStep:number;

	private _bitMap:egret.Bitmap;
	private _lastTime:number;
	public constructor(texture:egret.Texture,life:number,xstep:number,ystep:number,alphaStep:number,scaleXstep:number,scaleYstep:number) {
		this._startTime = this._lastTime = egret.getTimer();
		this._bitMap = new egret.Bitmap();
		this._bitMap.$setBitmapData(texture);
		this._lifeTime = life;
		this._XStep = xstep;
		this._YStep = ystep;
		this._AlphaStep = alphaStep;
		this._scaleXStep = scaleXstep;
		this._scaleYStep = scaleYstep;
	}

	public init(x:number,y:number,alpha:number,scalex:number,scaley:number){
		this._bitMap.x = x;
		this._bitMap.y = y;
		this._bitMap.alpha = alpha;
		this._bitMap.scaleX = scalex;
		this._bitMap.scaleY = scaley;
	}

	public get bitMap():egret.Bitmap{
		return this._bitMap;
	}

	public update(currentT:number):boolean{
		if((currentT - this._startTime ) > this._lifeTime)
			return false;
		let it:number = currentT - this._lastTime;
		this._bitMap.x += this._XStep * it;
		this._bitMap.y += this._YStep * it;
		this._bitMap.alpha += this._AlphaStep * it;
		this._bitMap.scaleX += this._scaleXStep  * it;
		this._bitMap.scaleY += this._scaleYStep  * it;
		this._lastTime = currentT;
		return true;
	}

	public clean(){
		this._bitMap.$setBitmapData(null);
		if(this._bitMap.parent != undefined)
			this._bitMap.parent.removeChild(this._bitMap);
	}
}
}