namespace MDisplay {
	export class GParticle extends egret.Sprite {
		private _xMin:number;
		private _xMax:number;
		private _YMin:number;
		private _YMax:number;
		private _AlphaMin:number;
		private _AlphaMax:number;
		private _scaleXMin:number;
		private _scaleXMax:number;
		private _scaleYMin:number;
		private _scaleYMax:number;

		private _xResMin:number;
		private _xResMax:number;
		private _YResMin:number;
		private _YResMax:number;
		private _AlphaResMin:number;
		private _AlphaResMax:number;
		private _scaleXResMin:number;
		private _scaleXResMax:number;
		private _scaleYResMin:number;
		private _scaleYResMax:number;


		private _lifeMin:number;
		private _lifeMax:number;

		private _interval:number;
		private _Max:number;
		private _texture:egret.Texture;

		private _lastAddTime:number = 0;
		private _itemArr:MDisplay.MParticleData[];

		private _pause:boolean;

		/**
		 * 新建粒子对象
		 * @param texture		粒子对象显示的贴图对象
		 * @param lifeMin		单个粒子生命周期最小值
		 * @param lifeMax		单个粒子生命周期最大值
		 * @param it			单个粒子出现的间隔时间(毫秒)
		 * @param max			同时存在最大的粒子数
		 * @param xmin			初始化X坐标最小值
		 * @param xmax			初始化X坐标最大值
		 * @param xResMin		粒子生命结束时X的最小偏移量 在初始X坐标基础上+此增量
		 * @param xResMax		粒子生命结束时X的最大偏移量 在初始X坐标基础上+此增量
		 * @param ymin			初始化Y坐标最小值
		 * @param ymax			初始化Y坐标最大值
		 * @param yResMin		粒子生命结束时Y的最小偏移量 在初始Y坐标基础上+此增量
		 * @param yResMax		粒子生命结束时Y的最大偏移量 在初始Y坐标基础上+此增量
		 * @param alphaMin		初始化alpha最小值
		 * @param alphaMax		初始化alpha最大值
		 * @param alphaResMin	粒子生命结束时alpha的最小偏移量 在初始alpha基础上+此增量
		 * @param alphaResMax	粒子生命结束时alpha的最大偏移量 在初始alpha基础上+此增量
		 * @param scaleXMin		初始化scaleX最小值
		 * @param scaleXMax		初始化scaleX最大值
		 * @param scaleXResMin	粒子生命结束时scaleX的最小偏移量 在初始scaleX基础上+此增量
		 * @param scaleXResMax	粒子生命结束时scaleX的最大偏移量 在初始scaleX基础上+此增量
		 * @param scaleYMin		初始化scaleY最小值
		 * @param scaleYMax		初始化scaleY最大值
		 * @param scaleYResMin	粒子生命结束时scaleY的最小偏移量 在初始scaleY基础上+此增量
		 * @param scaleYResMax	粒子生命结束时scaleY的最大偏移量 在初始scaleY基础上+此增量
		 */
		public constructor(texture:egret.Texture,lifeMin:number, lifeMax:number,it:number,max:number,
						 xmin:number,xmax:number,xResMin:number,xResMax:number,
						 ymin:number,ymax:number,yResMin:number,yResMax:number,
						 alphaMin:number,alphaMax:number,alphaResMin:number,alphaResMax:number,
						 scaleXMin?:number,scaleXMax?:number,scaleXResMin?:number,scaleXResMax?:number,
						 scaleYMin?:number,scaleYMax?:number,scaleYResMin?:number,scaleYResMax?:number						 
						 ) {
			super();
			this._texture = texture;
			this._lifeMin = lifeMin;	this._lifeMax = lifeMax;
			this._interval = it;	this._Max = max;
			this._xMin = xmin;	this._xMax = xmax; this._xResMin = xResMin; this._xResMax = xResMax;
			this._YMin = ymin;	this._YMax = ymax; this._YResMin = yResMin; this._YResMax = yResMax;
			this._AlphaMin = alphaMin!= undefined ? alphaMin : 1;
			this._AlphaMax = alphaMax!= undefined ? alphaMax : 1; 
			this._AlphaResMin = alphaResMin!= undefined ? alphaResMin : 1; 
			this._AlphaResMax = alphaResMax!= undefined ? alphaResMax : 1;
			this._scaleXMin = scaleXMin != undefined ? scaleXMin : 1; 
			this._scaleXMax = scaleXMax!= undefined ? scaleXMax : 1; 
			this._scaleXResMin = scaleXResMin!= undefined ? scaleXResMin : 1; 
			this._scaleXResMax = scaleXResMax!= undefined ? scaleXResMax : 1; 
			this._scaleYMin = scaleYMin!= undefined ? scaleYMin : 1; 
			this._scaleYMax = scaleYMax!= undefined ? scaleYMax : 1; 
			this._scaleYResMin = scaleYResMin!= undefined ? scaleYResMin : 1; 
			this._scaleYResMax = scaleYResMax!= undefined ? scaleYResMax : 1; 
			this._lastAddTime = egret.getTimer();
			this._itemArr = [];
			this.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
		}

		private onEnterFrame(e:egret.Event){
			if(this._pause)	return;
			let ct:number = egret.getTimer();
			this.add(ct);
			this.update(ct);
		}

		private add(ct:number){
			if(this._itemArr.length >= this._Max || (ct - this._lastAddTime) < this._interval )
				return;
			let life = this._lifeMin + Math.floor(Math.random() * (this._lifeMax - this._lifeMin) + 0.5);
			let x = this._xMin + Math.floor(Math.random() * (this._xMax - this._xMin) + 0.5);
			let y = this._YMin + Math.floor(Math.random() * (this._YMax - this._YMin) + 0.5);
			let xRes = x + this._xResMin + Math.floor(Math.random() * (this._xResMax - this._xResMin) + 0.5);
			let yRes = y + this._YResMin + Math.floor(Math.random() * (this._YResMax - this._YResMin) + 0.5);
			let alpha = this._AlphaMin + Math.random() * (this._AlphaMax - this._AlphaMin);
			let alphaRes = this._AlphaResMin + Math.random() * (this._AlphaResMax - this._AlphaResMin);
			let scaleX = this._scaleXMin + Math.random() * (this._scaleXMax - this._scaleXMin);
			let scaley = this._scaleYMin + Math.random() * (this._scaleYMax - this._scaleYMin);
			let scaleXRes = this._scaleXResMin +Math.random() * (this._scaleXResMax - this._scaleXResMin);
			let scaleYRes = this._scaleYResMin + Math.random() * (this._scaleYResMax - this._scaleYResMin);
			let xstep = (xRes - x) / life;
			let ystep = (yRes - y) / life;
			let alphaStep = alphaRes == alpha ? 0 : (alphaRes - alpha) / life;
			let scaleXStep = scaleXRes == scaleX ? 0 : (scaleXRes - scaleX) / life;
			let scaleYStep = scaleYRes == scaley ? 0 : (scaleYRes - scaley) / life;
			let temp:MDisplay.MParticleData = new MParticleData(this._texture,life,xstep,ystep,alphaStep,scaleXStep,scaleYStep);
			temp.init(x,y,alpha,scaleX,scaley);
			this.addChild(temp.bitMap);
			this._itemArr.push(temp);

		}

		private update(ct:number){			
			for(let i:number = this._itemArr.length - 1; i >= 0 ; i--){
				let temp:MParticleData = this._itemArr[i];
				if(temp.update(ct) == false){
					temp.clean();
					this._itemArr.splice(i,1);
				}
			}
		}

		public setPause(pause:boolean){
			this._pause = pause;
		}

		public get pause():boolean{
			return this._pause;
		}

		public clear(){
			this.setPause(true);
			this.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame,this);
			for(let i:number = this._itemArr.length - 1; i >= 0 ; i--){
				this._itemArr[i].clean();
			}
			this._itemArr.splice(0,this._itemArr.length);
			if(this.parent != undefined)
				this.parent.removeChild(this);
		}

		
	}
}