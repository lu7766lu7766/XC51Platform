namespace MDisplay {
	export class MDisplayConfig {
		public readonly mImagePath:string;
		public readonly mBlendName:string;
		public readonly mRotation:number;
		public readonly mScaleX:number;
		public readonly mScaleY:number;
		public readonly mX:number;
		public readonly mY:number;
		public readonly mSkewX:number;
		public readonly mSkewY:number;
		public readonly	mAlpha:number;
		public readonly	mName:string;
		public constructor(path:string,bn:string,r:number,sx:number,sy:number,x:number,y:number,skx:number,sky:number,alpha:number = 1,name:string) {
			this.mImagePath = path;
			this.mBlendName = bn;
			this.mRotation = r;
			this.mScaleX = sx;
			this.mScaleY = sy;
			this.mX = x;
			this.mY = y;
			this.mSkewX = skx;
			this.mSkewY = sky;
			this.mAlpha = alpha;
			this.mName = name;
		}
	}
}